# Thực hành: Checkpoints

## Mô tả
Bạn cần thực hành sử dụng checkpoints để làm việc an toàn với Claude Code.

## Bài 1: Tạo và Revert Checkpoint

**Yêu cầu:**
1. Tạo một số thay đổi nhỏ trong project (thêm comment vào file)
2. Sử dụng `/checkpoint` để kiểm tra state
3. Revert thay đổi sử dụng checkpoint
4. Verify file trở lại trạng thái ban đầu

## Bài 2: Refactor với Safety Net

**Yêu cầu:**
1. Tạo checkpoint trước khi bắt đầu refactor
2. Thực hiện thay đổi tên function hoặc variable
3. Chạy test để check nếu có
4. Nếu refactor ổn, giữ nguyên; nếu không, revert checkpoint

## Bài 3: Multi-Step Task với Checkpoint Strategy

**Yêu cầu:**
1. Thực hiện task 5 bước (ví dụ: thêm feature mới)
2. Tạo checkpoint sau mỗi bước quan trọng
3. Nếu bước 4 gây vấn đề, revert về checkpoint sau bước 3
4. Try approach khác từ checkpoint

## Gợi ý bắt đầu
- Sử dụng `/checkpoint` để xem trạng thái hiện tại
- Checkpoint tự động được tạo bởi Claude Code trong một số tình huống
- Có thể revert qua `/checkpoint` command

## Nộp bài
Gửi kết quả cho @teacher để review
