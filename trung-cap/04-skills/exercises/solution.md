# Giải pháp: Agent Skills

## Bài 1: Code Review Skill

### Bước 1: Tạo thư mục
```bash
mkdir -p .claude/skills/code-review/references
```

### Bước 2: Tạo SKILL.md
```markdown
---
name: code-review
description: Use when reviewing code for quality, security, performance, or adherence to standards. Triggers on requests to "review code", "check code quality", or "audit code".
---

# Code Review Skill

## Quy trình Review

Khi được yêu cầu review code, thực hiện các bước sau:

### 1. Security Check
- Kiểm tra input validation
- Kiểm tra SQL injection, XSS vulnerabilities
- Kiểm tra hardcoded secrets, credentials
- Kiểm tra authentication/authorization logic

### 2. Error Handling
- Các function có try/catch đầy đủ
- Error messages rõ ràng, không leaked sensitive info
- Có fallback/rollback mechanism

### 3. Performance
- Không có N+1 query
- Có caching hợp lý
- Không blocking main thread unnecessarily

### 4. Code Quality
- Đặt tên biến/hàm rõ ràng
- Function không quá dài (max 30-50 dòng)
- Không duplicated code
- Có comments cho logic phức tạp

### 5. Architecture
- Đúng separation of concerns
- Không circular dependencies
- Tuân theo patterns của project

## Checklist

Tham chiếu `references/checklist.md` cho checklist đầy đủ.

## Output Format

Kết quả review nên có:
1. Tổng quan (tốt/cần cải thiện)
2. Chi tiết từng mục (Security, Error Handling, Performance, Quality)
3. Đề xuất cụ thể kèm code sample
```

### Bước 3: Tạo references/checklist.md
```markdown
# Code Review Checklist

## Security
- [ ] Input được validate trước khi xử lý
- [ ] Không có hardcoded secrets
- [ ] Không có SQL injection risk (dùng parameterized queries)
- [ ] Output được sanitize (tránh XSS)
- [ ] Authentication/authorization đúng

## Error Handling
- [ ] Try/catch ở boundary layers
- [ ] Error messages user-friendly
- [ ] Có logging cho debugging
- [ ] Graceful degradation

## Performance
- [ ] Không N+1 queries
- [ ] Có database indexes
- [ ] Cache hợp lý
- [ ] Không memory leaks

## Code Quality
- [ ] Đặt tên chuẩn convention
- [ ] Function < 50 dòng
- [ ] DRY principle
- [ ] Có docstrings/comments
```

## Bài 2: Bug Fix Skill

### Bước 1: Tạo thư mục
```bash
mkdir -p .claude/skills/bug-fix
```

### Bước 2: Tạo SKILL.md
```markdown
---
name: bug-fix
description: Use when debugging, fixing errors, or troubleshooting. Triggers on "fix bug", "debug", "troubleshoot", "why is this broken", or "investigate error".
allow file references: true
---

# Bug Fix Skill

## Quy trình 5 bước

### Bước 1: Reproduce
- Hiểu mô tả bug từ user
- Tìm steps to reproduce
- Xác nhận bug tồn tại (chạy test/input mẫu)
- Ghi lại error output / stack trace

### Bước 2: Isolate
- Tìm file và function liên quan
- Trace từ error đến root cause
- Xác định: bug do logic, data, hay config
- Thu hẹp phạm vi bug nhất có thể

### Bước 3: Implement Fix
- Viết fix tập trung vào root cause
- KHÔNG refactor code xung quanh (giữ change nhỏ)
- Giữ backwards compatibility
- Add comments giải thích fix

### Bước 4: Verify
- Chạy lại steps to reproduce → xác nhận hết bug
- Chạy tests liên quan → đảm bảo không regression
- Test edge cases tương tự

### Bước 5: Add Regression Test
- Viết test case reproduce bug
- Đảm bảo test fail trước fix, pass sau fix
- Commit test cùng với fix

## Nguyên tắc quan trọng
- Sửa gốc, không sửa triệu chứng
- Change nhỏ nhất có thể
- Test trước khi commit
- Document bug và fix trong commit message
```

## Bài 3: Test Skill

### Bước 1: Trigger test
Trong Claude Code, gõ:
```
Review file src/auth.py về vấn đề bảo mật
```

### Bước 2: Verify trigger
- Claude Code sẽ tự động load skill `code-review`
- Nếu không trigger, kiểm tra description trong frontmatter
- Description cần chứa keywords: "review code", "check code quality", "audit"

### Bước 3: Điều chỉnh (nếu cần)
Nếu skill không trigger tự động:
1. Mở `.claude/skills/code-review/SKILL.md`
2. Mở rộng description: thêm các keywords trigger
3. Thử lại với câu lệnh khác: "check code quality cho file X"
