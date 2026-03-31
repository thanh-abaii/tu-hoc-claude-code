# Thực hành: Plugins

## Mô tả
Bạn cần đóng gói các tính năng đã tạo (skills, subagents) thành một plugin hoàn chỉnh để chia sẻ cho team.

## Bài 1: Thiết Kế Plugin PR Review

**Yêu cầu:**
1. Thiết kế cấu trúc plugin `pr-review`
2. Plugin bao gồm:
   - Slash command: `/pr-check` để review PR hiện tại
   - Subagent: `pr-reviewer` chuyên review pull requests
   - Hook: tự động chạy review khi có PR mới
3. Viết manifest file cho plugin

## Bài 2: Thiết Kế Plugin Daily Standup

**Yêu cầu:**
1. Thiết kế plugin `daily-standup`
2. Plugin bao gồm:
   - Slash command: `/standup` tạo báo cáo daily
   - Subagent: `standup-reporter` thu thập thông tin từ git commits
   - Memory template cho daily report format
3. Viết manifest file

## Bài 3: Test Plugin

**Yêu cầu:**
1. Tạo cấu trúc thư mục plugin local
2. Test cài đặt qua local path
3. Verify các components hoạt động

## Gợi ý bắt đầu
- Plugin manifest định nghĩa tất cả components
- Mỗi component (command, agent, hook) có format riêng
- Test local trước khi publish

## Nộp bài
Gửi kết quả cho @teacher để review
