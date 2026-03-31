# Thực hành: Hooks

## Mô tả
Bạn cần tạo hooks để bảo vệ project và tự động hóa quy trình.

## Bài 1: Tạo Hook Bảo Mật

**Yêu cầu:**
1. Tạo PreToolUse hook chặn các lệnh nguy hiểm:
   - `rm -rf` trên thư mục quan trọng
   - `git push --force` lên main
   - Commit files có `.env` trong tên
2. Hook hiển thị warning khi block
3. Test hook với các lệnh bị chặn

## Bài 2: Tạo Hook Auto-Log

**Yereu cầu:**
1. Tạo PostToolUse hook log mỗi khi:
   - File được tạo mới
   - File được chỉnh sửa
   - Git commit được tạo
2. Log lưu vào file `.claude/activity.log`
3. Format: timestamp, action, file involved

## Bài 3: Tạo Hook Pre-Commit Review

**Yêu cầu:**
1. Tạo hook chạy trước khi commit
2. Kiểm tra:
   - Không có secrets trong staged files
   - File có syntax errors không (lint check)
   - Commit message theo conventional commits format
3. Nếu fail, reject commit

## Gợi ý bắt đầu
- Hook nhận context qua stdin hoặc environment variables
- Hook trả về JSON với fields như `preventTool`, `stop`, `content`
- Test hook cẩn thận để tránh false positives

## Nộp bài
Gửi kết quả cho @teacher để review
