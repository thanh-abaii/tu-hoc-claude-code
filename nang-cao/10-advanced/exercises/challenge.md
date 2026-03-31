# Thực hành: Advanced Features

## Mô tả
Bạn cần thực hành sử dụng các tính năng nâng cao của Claude Code để tối ưu workflow.

## Bài 1: Sử dụng Planning Mode

**Yêu cầu:**
1. Kích hoạt Planning Mode trong Claude Code
2. Yêu cầu Claude tạo kế hoạch cho task: "Thêm authentication system vào project"
3. Review plan chi tiết
4. Phê duyệt hoặc điều chỉnh plan
5. Quan sát Claude triển khai sau khi phê duyệt

## Bài 2: Sử dụng Print Mode cho Automation

**Yereu cầu:**
1. Tạo script `automation.sh` chạy Claude Code với `-p` flag
2. Script yêu cầu Claude:
   - Scan codebase
   - Count lines of code per language
   - Generate report
3. Chạy script và kiểm tra output

## Bài 3: Quản lý Permission Modes

**Yêu cầu:**
1. Thử chuyển đổi giữa các permission modes:
   - `default` (hỏi trước khi action)
   - `acceptEdits` (tự động accept edits)
   - `auto` (tự động execution với safety)
2. Test mỗi mode với task đơn giản
3. Ghi nhận sự khác biệt về trải nghiệm

## Bài 4: Background Tasks

**Yêu cầu:**
1. Spawn background agent để research về một topic
2. Continue làm việc khác trong khi agent chạy
3. Check result khi agent hoàn thành

## Gợi ý bắt đầu
- Planning mode kích hoạt qua `/plan` command hoặc UI
- Print mode: `claude -p "your prompt"`
- Permission modes: `/mode` command hoặc settings
- Background tasks: Spawn agent với `run_in_background: true`

## Nộp bài
Gửi kết quả cho @teacher để review
