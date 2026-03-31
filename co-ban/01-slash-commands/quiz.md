# Quiz: Slash Commands — Lệnh Gạch Chéo

Mục tiêu: Đạt 8/10 để pass.

## Câu 1
**Câu hỏi**: Slash command là gì?
A. Một phím tắt để thoát Claude
B. Lệnh bắt đầu bằng "/" để điều khiển hành vi Claude trong phiên tương tác
C. Một loại script bash
D. Một cấu hình git

**Đáp án**: B
**Giải thích**: Slash commands là các lệnh bắt đầu bằng ký tự "/" giúp điều khiển hành vi, cấu hình và tác vụ của Claude Code trong phiên làm việc tương tác.

---

## Câu 2
**Câu hỏi**: Có bao nhiêu loại slash commands trong Claude Code?
A. 2 loại
B. 3 loại
C. 4 loại
D. 5 loại

**Đáp án**: C
**Giải thích**: Có 4 loại: (1) Lệnh có sẵn (built-in), (2) Skills do người dùng định nghĩa, (3) Lệnh plugin, (4) MCP prompts.

---

## Câu 3
**Câu hỏi**: Phương pháp được khuyến nghị để tạo lệnh tùy chỉnh là gì?
A. Tạo file `.claude/commands/ten-lenh.md`
B. Tạo thư mục `.claude/skills/ten-lenh/SKILL.md`
C. Chỉnh sửa file `CLAUDE.md`
D. Tạo file trong thư mục `~/.bashrc`

**Đáp án**: B
**Giải thích**: Skills trong `.claude/skills/ten-lenh/SKILL.md` là phương pháp chuẩn hiện tại. Cách cũ `.claude/commands/` vẫn hoạt động nhưng không còn được khuyến nghị.

---

## Câu 4
**Câu hỏi**: Trong SKILL.md, trường frontmatter nào dùng để mô tả chức năng của lệnh, giúp Claude biết khi nào nên sử dụng?
A. `name`
B. `argument-hint`
C. `description`
D. `summary`

**Đáp án**: C
**Giải thích**: Trường `description` chứa mô tả ngắn gọn về chức năng của lệnh, giúp Claude tự động kích hoạt skill khi ngữ cảnh phù hợp.

---

## Câu 5
**Câu hỏi**: Khi cả `.claude/commands/review.md` và `.claude/skills/review/SKILL.md` cùng tồn tại, file nào được ưu tiên?
A. File trong `.claude/commands/`
B. File trong `.claude/skills/`
C. Cả hai được trộn lại
D. Gây lỗi xung đột

**Đáp án**: B
**Giải thích**: Khi skill và lệnh có cùng tên, **skill sẽ ưu tiên hơn** (precedence).

---

## Câu 6
**Câu hỏi**: Biến nào được dùng để lấy TẤT CẢ đối số của slash command?
A. `$ALL`
B. `$ARGS`
C. `$ARGUMENTS`
D. `$0`

**Đáp án**: C
**Giải thích**: `$ARGUMENTS` chứa toàn bộ phần đối số người dùng nhập sau tên lệnh. Ngoài ra còn có `$0`, `$1`... cho từng đối số riêng lẻ.

---

## Câu 7
**Câu hỏi**: Cú pháp nào dùng để thực thi lệnh shell (bash) trong SKILL.md nhằm lấy ngữ cảnh động?
A. `` $`command` ``
B. `` !`command` ``
C. `` #`command` ``
D. `` @`command` ``

**Đáp án**: B
**Giải thích**: Tiền tố `!` trước backtick (`!`command``) cho phép thực thi lệnh shell và chèn kết quả vào prompt. Ví dụ: `` !`git status` `` lấy trạng thái git hiện tại.

---

## Câu 8
**Câu hỏi**: Trường frontmatter `disable-model-invocation: true` có tác dụng gì?
A. Vô hiệu hóa hoàn toàn lệnh
B. Chỉ cho phép Claude tự động gọi (không cho người dùng)
C. Chỉ cho phép người dùng gọi, Claude không tự động kích hoạt
D. Tắt chế độ sandbox

**Đáp án**: C
**Giải thích**: `disable-model-invocation: true` nghĩa là chỉ người dùng mới có thể gọi lệnh, Claude sẽ không tự động kích hoạt. Phù hợp cho lệnh có tác động phụ (như deploy).

---

## Câu 9 (Tự luận)
**Câu hỏi**: Giải thích sự khác biệt giữa `$ARGUMENTS` và `$0`, `$1` trong slash command. Cho ví dụ minh họa.

**Đáp án**:
- `$ARGUMENTS`: Chứa toàn bộ chuỗi đối số người dùng nhập. Ví dụ: `/fix-issue 123 critical` → `$ARGUMENTS` = `"123 critical"`
- `$0`, `$1`, `$2`...: Chia đối số thành từng phần riêng biệt theo khoảng trắng. Ví dụ: `/review-pr 456 high` → `$0` = `"456"`, `$1` = `"high"`
- Dùng `$ARGUMENTS` khi cần lấy nguyên văn đối số, dùng `$0/$1` khi cần tách từng phần.

---

## Câu 10 (Tự luận)
**Câu hỏi**: Nêu quy trình xử lý một slash command từ lúc người dùng gõ lệnh đến khi Claude trả về kết quả.

**Đáp án**: Quy trình theo vòng đời lệnh:
1. Người dùng gõ `/ten-lenh` trong Claude Code
2. Claude tìm kiếm trong `.claude/skills/` và `.claude/commands/`
3. Tìm được file `SKILL.md` tương ứng và parse frontmatter
4. Thực thi các lệnh shell (thay thế `` !`command` `` bằng kết quả)
5. Thay thế biến đối số (`$ARGUMENTS`, `$0`, `$1`...)
6. Gửi prompt hoàn chỉnh tới Claude để xử lý
7. Trả kết quả về cho người dùng
