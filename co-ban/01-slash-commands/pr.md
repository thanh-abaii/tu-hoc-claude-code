---
description: Clean up code, stage changes, and prepare a pull request
allowed-tools: Bash(git add:*), Bash(git status:*), Bash(git diff:*), Bash(npm test:*), Bash(npm run lint:*)
---

# Kiểm Tra Trước Khi Tạo Pull Request

Trước khi tạo PR, thực hiện các bước sau:

1. Chạy linting: `prettier --write .`
2. Chạy tests: `npm test`
3. Xem lại git diff: `git diff HEAD`
4. Stage các thay đổi: `git add .`
5. Tạo commit message theo định dạng conventional commits:
   - `fix:` cho sửa lỗi
   - `feat:` cho tính năng mới
   - `docs:` cho thay đổi tài liệu
   - `refactor:` cho tái cấu trúc mã
   - `test:` cho thêm kiểm tra
   - `chore:` cho tác vụ bảo trì

6. Tạo PR summary bao gồm:
   - Những gì đã thay đổi
   - Lý do thay đổi
   - Kiểm tra đã thực hiện
   - Tác động tiềm ẩn
