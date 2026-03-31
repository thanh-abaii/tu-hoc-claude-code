---
allowed-tools: Bash(git add:*), Bash(git status:*), Bash(git commit:*), Bash(git diff:*)
argument-hint: [message]
description: Create a git commit with context
---

## Ngữ cảnh

- Trạng thái git hiện tại: !`git status`
- Git diff hiện tại: !`git diff HEAD`
- Nhánh hiện tại: !`git branch --show-current`
- Các commit gần đây: !`git log --oneline -10`

## Nhiệm vụ của bạn

Dựa trên các thay đổi trên, tạo một git commit duy nhất.

Nếu thông điệp được cung cấp qua đối số, sử dụng nó: $ARGUMENTS

Nếu không, phân tích các thay đổi và tạo thông điệp commit phù hợp theo định dạng conventional commits:
- `feat:` cho tính năng mới
- `fix:` cho sửa lỗi
- `docs:` cho thay đổi tài liệu
- `refactor:` cho tái cấu trúc mã
- `test:` cho thêm kiểm tra
- `chore:` cho tác vụ bảo trì
