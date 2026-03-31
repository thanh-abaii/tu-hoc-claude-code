# Quiz: Memory — Hệ Thống Bộ Nhớ

Mục tiêu: Đạt 8/10 để pass.

## Câu 1
**Câu hỏi**: Personal Memory (CLAUDE.md) được lưu ở đâu?
A. `./CLAUDE.md` trong thư mục dự án
B. `~/.claude/CLAUDE.md` trong thư mục home người dùng
C. `/etc/claude-code/CLAUDE.md`
D. `~/.claude/projects/<project>/memory/`
**Đáp án**: B
**Giải thích**: Personal Memory (User Memory) nằm tại `~/.claude/CLAUDE.md`, áp dụng cho mọi dự án của người dùng đó.

## Câu 2
**Câu hỏi**: Lệnh nào dùng để khởi tạo nhanh một dự án mới với CLAUDE.md?
A. `/memory`
B. `/new`
C. `/init`
D. `/create`
**Đáp án**: C
**Giải thích**: Lệnh `/init` tạo một tập tin CLAUDE.md với cấu trúc template cho dự án mới, đây là cách nhanh nhất để thiết lập project memory.

## Câu 3
**Câu hỏi**: Trong phân cấp memory, cấp nào có ưu tiên CAO NHẤT?
A. Project Memory
B. User Memory
C. Managed Policy
D. Auto Memory
**Đáp án**: C
**Giải thích**: Managed Policy có ưu tiên cao nhất (mức 1), áp dụng cho toàn tổ chức. Trên Linux/WSL vị trí là `/etc/claude-code/CLAUDE.md`.

## Câu 4
**Câu hỏi**: Auto Memory lưu ở đâu và tải như thế nào khi khởi động phiên?
A. Toàn bộ thư mục memory tải vào bộ nhớ
B. Chỉ 200 dòng đầu của MEMORY.md được tải, các file chủ đề tải theo yêu cầu
C. Chỉ tải khi Claude được yêu cầu rõ ràng
D. Tải tất cả file trong thư mục memory, không giới hạn độ dài
**Đáp án**: B
**Giải thích**: Auto Memory nằm tại `~/.claude/projects/<project>/memory/`. Khi bắt đầu phiên, chỉ 200 dòng đầu của `MEMORY.md` được tải. Các tập tin theo chủ đề (debugging.md, api-conventions.md...) được tải theo yêu cầu.

## Câu 5
**Câu hỏi**: Độ sâu lồng tối đa của cú pháp import (`@path/to/file`) là bao nhiêu?
A. 3 cấp
B. 5 cấp
C. 10 cấp
D. Không giới hạn
**Đáp án**: B
**Giải thích**: Memory import hỗ trợ đệ quy tối đa 5 cấp độ lồng. Import ngoài 5 cấp sẽ không được xử lý.

## Câu 6
**Câu hỏi**: Làm thế nào để loại trừ một số tập tin CLAUDE.md khỏi việc tải vào ngữ cảnh trong monorepo?
A. Xóa tập tin CLAUDE.md đó
B. Đặt cấu hình `claudeMdExcludes` trong settings.json
C. Dùng lệnh `/exclude`
D. Thêm comment `# ignore` vào đầu file
**Đáp án**: B
**Giải thích**: Cài đặt `claudeMdExcludes` trong `~/.claude/settings.json` hoặc `.claude/settings.json` cho phép bỏ qua các CLAUDE.md cụ thể bằng glob pattern.

## Câu 7
**Câu hỏi**(mở): Mô tả sự khác biệt giữa `/init` và `/memory`. Khi nào dùng lệnh nào?
**Đáp án gợi ý**:
- `/init`: Dùng để khởi tạo CLAUDE.md mới cho dự án. Hành động: tạo template cấu trúc mẫu. Dùng khi bắt đầu dự án mới, thiết lập lần đầu.
- `/memory`: Dùng để sửa tập tin memory hiện có. Hành động: mở editor để chỉnh sửa. Dùng khi cập nhật, tổ chức lại, hoặc xem lại nội dung memory. Đây là công cụ bảo trì liên tục.

## Câu 8
**Câu hỏi**: Biến môi trường nào dùng để tắt Auto Memory?
A. `CLAUDE_NO_MEMORY=1`
B. `CLAUDE_CODE_DISABLE_AUTO_MEMORY=1`
C. `CLAUDE_DISABLE_MEMORY=1`
D. `CLAUDE_CODE_NO_AUTO_MEMORY=1`
**Đáp án**: B
**Giải thích**: Đặt `CLAUDE_CODE_DISABLE_AUTO_MEMORY=1` sẽ tắt hoàn toàn auto memory. Giá trị `0` bắt buộc bật, không đặt thì dùng mặc định (bật).

## Câu 9
**Câu hỏi**(mở): Tại sao không nên lưu trữ bí mật (API keys, mật khẩu) trong CLAUDE.md? Hãy đề xuất cách quản lý thông tin nhạy cảm thay thế.
**Đáp án gợi ý**:
- CLAUDE.md thường được commit vào git (đặc biệt là project memory), nên bất kỳ bí mật nào cũng sẽ bị lộ trong lịch sử git.
- CLAUDE.md được tải vào ngữ cảnh Claude, không được mã hóa.
- Cách thay thế tốt: Sử dụng biến môi trường, file `.env` (đã thêm vào `.gitignore`), hoặc trình quản lý bí mật như Vault, AWS Secrets Manager. Trong CLAUDE.md chỉ nên ghi tham chiếu "Sử dụng biến môi trường cho credentials" mà không ghi giá trị thật.

## Câu 10
**Câu hỏi**(mở): Cho ví dụ một rules file sử dụng YAML frontmatter với `paths` glob pattern để áp dụng quy tắc chỉ cho file TypeScript trong thư mục `src/api/`. Giải thích cách hoạt động.
**Đáp án gợi ý**:
```markdown
---
paths: src/api/**/*.ts
---

# Quy tắc phát triển API

- Tất cả endpoint phải bao gồm xác thực đầu vào bằng Zod
- Ghi lại tham số và kiểu trả về cho mỗi handler
- Bao gồm xử lý lỗi try-catch cho mọi thao tác
```
Cách hoạt động: YAML frontmatter `paths: src/api/**/*.ts` giới hạn phạm vi áp dụng của quy tắc chỉ cho các file `.ts` nằm trong `src/api/` và các thư mục con. Pattern `**` khớp với mọi cấp thư mục con. Claude chỉ áp dụng quy tắc này khi làm việc với file khớp pattern.
