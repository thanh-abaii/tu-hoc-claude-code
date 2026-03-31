# Giải pháp: Checkpoints

## Bài 1: Tạo và Revert Checkpoint

### Bước 1: Tạo thay đổi
```bash
# Thêm comment vào file
echo "# Test comment" >> test-file.txt
```

### Bước 2: Kiểm tra checkpoint
```
/checkpoint
```
Claude Code sẽ hiển thị trạng thái checkpoint hiện tại.

### Bước 3: Revert
Qua `/checkpoint`, chọn revert để hoàn tác changes.

### Bước 4: Verify
```bash
cat test-file.txt
```
File nên trở lại trạng thái ban đầu.

## Bài 2: Refactor với Safety Net

### Bước 1: Tạo checkpoint
```
/checkpoint
```
Chọn tạo checkpoint mới trước khi refactor.

### Bước 2: Refactor
Yêu cầu Claude Code: "Rename function `getUser` thành `fetchUserById` trong toàn bộ project"

### Bước 3: Check
Claude Code sẽ search và replace tất cả instances.

### Bước 4: Quyết định
- Nếu refactor tốt: keep changes
- Nếu có issues: revert về checkpoint

## Bài 3: Multi-Step Strategy

### Strategy
1. Start task phức tạp
2. Claude tự động tạo checkpoints giữa chừng
3. Nếu step nào đó fail → `/checkpoint` → revert
4. Continue từ checkpoint an toàn

### Ví dụ: Thêm feature mới
1. Checkpoint: trước khi bắt đầu
2. Step 1: Tạo file structure
3. Checkpoint: sau step 1
4. Step 2: Implement logic
5. Checkpoint: sau step 2
6. Step 3: Add tests
7. Step 4: Integrate
8. Nếu step 4 fail → revert to step 3 checkpoint → try khác
