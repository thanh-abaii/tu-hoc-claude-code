# ThựC Hành: Memory

## Bài 1: Tạo Personal Memory của bạn

**Mô tả**: Tạo file CLAUDE.md cá nhân với thông tin về bạn.

**Yêu cầu**:
1. Tạo `~/.claude/CLAUDE.md` (hoặc `.claude/CLAUDE.md` trong project nếu chưa có thư mục home)
2. Bao gồm các thông tin sau:
   - Vai trò / kinh nghiệm của bạn
   - Ngôn ngữ lập trình ưa thích
   - Phong cách giao tiếp với Claude
   - Quy ước code bạn mong muốn
   - Cấu trúc project bạn thường dùng
3. Kiểm tra bằng cách chạy `/memory` trong Claude Code và xác nhận file đã được tạo đúng

**Gợi ý cấu trúc**:
```markdown
# Sở thích phát triển của tôi

## Về tôi
- Kinh nghiệm: ...
- Ngôn ngữ yêu thích: ...

## Quy ước Code
- ...

## Giao tiếp
- ...
```

---

## Bài 2: Tạo Project Memory

**Mô tả**: Tạo memory cho dự án self-learning này (myproject).

**Yêu cầu**:
1. Chỉnh sửa file `.claude/CLAUDE.md` hiện có trong thư mục `myproject` (hoặc tạo mới tại `./CLAUDE.md`)
2. Thêm các thông tin sau:
   - Tổng quan về dự án (tên, mục tiêu học Claude Code)
   - Cấu trúc thư mục của bộ tutorial (co-ban, trung-cap, nâng-cao...)
   - Quy ước đặt tên file, nhánh git
   - Các lệnh thường dùng
   - Import tài liệu tham khảo từ các file có sẵn (dùng `@path`)
3. Sử dụng lệnh `/init` hoặc tạo thủ công

**Gợi ý**: Có thể sử dụng import để tham chiếu đến các tài liệu trong project thay vì copy lại nội dung.

---

## Bài 3: Test Directory API Memory

**Mô tả**: Tạo memory cho một module cụ thể sử dụng directory-specific memory và rules.

**Yêu cầu**:
1. Tạo thư mục `.claude/rules/` trong project
2. Tạo ít nhất 2 rules file:
   - `code-style.md` — Quy tắc code style cho toàn project
   - `testing.md` — Quy tắc testing cho toàn project
3. Tạo một file CLAUDE.md tại một thư mục con (ví dụ: `co-ban/02-memory/CLAUDE.md`) với quy tắc override riêng cho module đó
4. Tạo ít nhất 1 rules file sử dụng YAML frontmatter với glob pattern `paths` để giới hạn scope (ví dụ: chỉ áp dụng cho `*.md` trong `co-ban/`)
5. Kiểm tra bằng cách mở Claude Code và yêu cầu Claude hiển thị memory đang tải

**Gợi ý cấu trúc**:
```
myproject/
├── CLAUDE.md
└── .claude/
    ├── CLAUDE.md
    └── rules/
        ├── code-style.md
        ├── testing.md
        └── markdown-rules.md   (với frontmatter paths)
```

---

## Nộp bài

Gửi kết quả cho @teacher để review hoặc tạo commit với message mô tả các thay đổi.
