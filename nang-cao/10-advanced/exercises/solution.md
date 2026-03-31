# Giải pháp: Advanced Features

## Bài 1: Planning Mode

### Bước 1: Kích hoạt Planning Mode
```
/plan
```
Hoặc: Khi yêu cầu task phức tạp, Claude tự động đề xuất vào plan mode.

### Bước 2: Yêu cầu plan
```
Tạo kế hoạch thêm authentication system với JWT tokens
```

### Bước 3: Review plan
Claude sẽ tạo plan chi tiết với:
- Components cần tạo
- Files cần sửa
- Order of operations
- Dependencies

### Bước 4: Phê duyệt
- Nếu plan OK → Approve
- Nếu cần điều chỉnh → Feedback → Claude revise

### Bước 5: Triển khai
Sau khi approve, Claude thực thi plan step by step.

## Bài 2: Print Mode Script

### Tạo `automation.sh`
```bash
#!/bin/bash
echo "=== Code Analysis Report ==="
echo "Generated: $(date)"
echo ""

claude -p "
Analyze the codebase in current directory:
1. Count lines of code per language (use find + wc)
2. List the top 5 largest files
3. Count total files and directories
4. Generate a summary report in markdown format
"
```

### Chạy script
```bash
chmod +x automation.sh
./automation.sh > report.md
cat report.md
```

## Bài 3: Permission Modes

### Chuyển đổi modes
```
# Default mode (hỏi trước mỗi action)
/mode default

# AcceptEdits (tự chấp nhận edits)
/mode acceptEdits

# Auto mode (tự động với safety)
/mode auto
```

### So sánh
| Mode | Behavior | Use case |
|------|----------|----------|
| `default` | Hỏi trước mỗi action | Khi cần kiểm soát |
| `acceptEdits` | Auto-accept file edits | Khi tin tưởng AI |
| `auto` | Tự động execution | Trusted workflows |
| `dontAsk` | Bypass hoàn toàn | Automation scripts |

## Bài 4: Background Tasks

### Spawn background agent
```
Agent(description="Research about TypeScript best practices", prompt="Research the latest TypeScript best practices for 2026. Focus on: 1) Performance patterns, 2) Type safety improvements, 3) Architecture recommendations. Summarize top 5 findings.", subagent_type="general-purpose", run_in_background=true)
```

### Continue working
Trong khi agent chạy, bạn có thể tiếp tục conversation.

### Check result
Agent sẽ gửi notification khi hoàn thành với kết quả research.
