
# Plugin PR Review

Hoàn thiện quy trình review PR với kiểm tra bảo mật, testing và tài liệu.

## Tính năng

✅ Phân tích bảo mật
✅ Kiểm tra độ phủ test
✅ Xác minh tài liệu
✅ Đánh giá chất lượng mã nguồn
✅ Phân tích tác động hiệu năng

## Cài đặt

```bash
/plugin install pr-review
```

## Bao gồm

### Slash Commands
- `/review-pr` - Review PR toàn diện
- `/check-security` - Review tập trung bảo mật
- `/check-tests` - Phân tích độ phủ test

### Subagents
- `security-reviewer` - Phát hiện lỗ hổng bảo mật
- `test-checker` - Phân tích độ phủ test
- `performance-analyzer` - Đánh giá tác động hiệu năng

### Server MCP
- Tích hợp GitHub cho dữ liệu PR

### Hooks
- `pre-review.js` - Xác thực trước review

## Sử dụng

### Review PR cơ bản
```
/review-pr
```

### Chỉ kiểm tra bảo mật
```
/check-security
```

### Kiểm tra độ phủ test
```
/check-tests
```

## Yêu cầu

- Claude Code 1.0+
- Truy cập GitHub
- Repository Git

## Cấu hình

Thiết lập token GitHub:
```bash
export GITHUB_TOKEN="your_github_token"
```

## Quy trình ví dụ

```
Người dùng: /review-pr

Claude:
1. Chạy pre-review hook (xác thực git repo)
2. Lấy dữ liệu PR qua GitHub MCP
3. Ủy quyền review bảo mật cho subagent security-reviewer
4. Ủy quyền kiểm tra testing cho subagent test-checker
5. Ủy quyền đánh giá hiệu năng cho subagent performance-analyzer
6. Tổng hợp tất cả kết quả
7. Cung cấp báo cáo review toàn diện

Kết quả:
✅ Bảo mật: Không tìm thấy vấn đề nghiêm trọng
⚠️  Testing: Độ phủ 65%, khuyến nghị 80%+
✅ Hiệu năng: Không có tác động đáng kể
📝 Khuyến nghị: Thêm test cho các trường hợp biên
```
