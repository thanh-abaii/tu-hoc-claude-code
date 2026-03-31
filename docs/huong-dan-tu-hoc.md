# Lộ Trình Ứng Dụng Kiến Thức Hàng Ngày
**Ngày**: 2026-03-29
**Cấp độ hiện tại**: Expert (20/20 điểm) 🎯
**Trọng tâm**: Xây dựng công cụ CLI thực tế hàng ngày dùng Advanced Features, Plugins, và CLI Advanced

## 🎯 Dự Án: Daily Knowledge Companion (DKC)
Hệ thống quản lý kiến thức cá nhân qua CLI cho việc viết nhật ký, theo dõi học tập, tổ chức ý tưởng và suy ngẫm hàng ngày — thiết kế cho sử dụng thực tế ngoài lập trình.

### Tại Sao Dự Án Này?
- Giải quyết vấn đề thực tế (quá tải thông tin, quên ý tưởng, viết nhật ký không đều)
- Minh họa tính năng Claude Code trong ngữ cảnh không phải lập trình
- Tạo giá trị cá nhân lâu dài
- Thiết kế module cho phép tùy chỉnh cho các lĩnh vực sống khác nhau (công việc, sức khỏe, sở thích, v.v.)

## 📋 Lộ Trình Học Tích Hợp (2 giờ)

### ⚡ Phase 1: Nền Tảng & Lập Kế Hoạch Hướng Đời (20 phút)
**Mục tiêu**: Thiết kế DKC dùng planning mode tập trung vào nhu cầu đời sống

**Hoạt động**:
1. `/plan Create a personal knowledge management system for daily journaling, learning tracking, and idea capture that helps users build a "second brain" for life`
2. Tinh chỉnh plan để bao gồm:
   - Nhật ký hàng ngày với prompts và theo dõi tâm trạng
   - Theo dõi tiến độ học tập cho kỹ năng/khóa học
   - Hệ thống thu thập và tổ chức ý tưởng
   - Suy ngẫm hàng tuần và tạo insight
3. Thực hiện plan để tạo cấu trúc cốt lõi tập trung vào utility đời sống

**Tính Năng Hướng Đời Sống**:
- Template nhật ký sáng/tối
- Tracker học kỹ năng với nhắc spaced repetition
- Inbox ý tưởng với phân loại (công việc, cá nhân, sáng tạo)
- Ghi nhận biết ơn và thành công
- Bộ sưu tập "Hôm nay tôi học được"

### 🔌 Phase 2: Kiến Trúc Plugin Cho Lĩnh Vực Đời Sống (40 phút)
**Mục tiêu**: Xây hệ thống plugin mở rộng cho các lĩnh vực đời sống khác nhau

**Hoạt động**:
1. Tạo `.claude-plugin/dkc-plugin/` với:
   - Manifest `plugin.json` (tập trung vào utility đời sống)
   - Thư mục `commands/` cho slash commands hướng đời sống:
     - `dkc-journal.md` — Viết nhật ký có hướng dẫn với prompts
     - `dkc-learn.md` — Logger và tracker phiên học
     - `dkc-idea.md` — Thu thập và tổ chức ý tưởng
     - `dkc-reflect.md` — Generator suy ngẫm hàng tuần/tháng
   - Thư mục `agents/`:
     - `life-coach.md` — Cung cấp insight và gợi ý cá nhân hóa
     - `memory-keeper.md` — Giúp tổ chức và gợi lại các entry cũ
   - Thư mục `hooks/`:
     - PostToolUse hook để gắn tag và phân loại tự động
     - UserPromptSubmit hook để gợi ý theo ngữ cảnh
2. Kiểm tra cài đặt: `/plugin install ./dkc-plugin`
3. Xác minh lệnh hướng đời sống xuất hiện: `/dkc-journal`, `/dkc-learn`, v.v.

**Ví Dụ Lĩnh Vực Đời Sống Plugin**:
- Plugin Sức khỏe & Thể dục (tập luyện, bữa ăn, giấc ngủ)
- Plugin Tài chính (theo dõi chi tiêu, mục tiêu ngân sách)
- Plugin Đọc sách (theo dõi sách, ghi chú, đánh giá)
- Plugin Du lịch (lập kế hoạch chuyến đi, danh sách đóng gói, kỷ niệm)

### ⌨️ Phase 3: CLI Advanced Cho Tự Động Hóa Hàng Ngày (40 phút)
**Mục tiêu**: Triển khai tính năng CLI nâng cao cho tự động hóa đời sống hàng ngày

**Hoạt động**:
1. Tạo script tự động hóa `scripts/dkc-daily.sh`:
   ```bash
   #!/bin/bash
   # Thói quen buổi sáng: Lấy journal prompt và gợi ý học tập
   PROMPT=$(claude -p --output-format json "Generate a thoughtful journal prompt for today")
   LEARNING=$(claude -p --output-format json "Suggest a 15-minute learning topic based on my goals")

   # Thói quen buổi tối: Export entries hôm nay để backup
   claude -p --max-turns 2 --output-format json \
     "Summarize today's journal entries and learning" > ~/daily-summary-$(date +%Y%m%d).json

   # Hàng tuần: Tạo insights về patterns
   claude -r "dkc-weekly-$WEEK" --fork-session "insights"
   ```
2. Luyện tập các flag advanced phù hợp đời sống:
   - `--output-format json` để export dữ liệu nhật ký/học tập
   - `--model haiku` cho tương tác hàng ngày nhanh (nhanh hơn, rẻ hơn)
   - `--model opus` cho suy ngẫm hàng tuần sâu
   - `--json-schema` để xác thực cấu trúc dữ liệu export
3. Tạo ví dụ tích hợp đời sống:
   - **Thói quen buổi sáng**: `alias dkc-morning='claude -p "Give me today'"'s journal prompt and learning suggestion"'`
   - **Export sang app khác**: `claude -p --output-format json "Export this week'"'s learning" | jq -r '"'"'.topics[]'"'"' > reading-list.txt`
   - **Nhật ký bằng giọng nói**: Dùng voice dictation cho entry nhanh

### 🧪 Phase 4: Xác Thực & Tích Hợp Đời Sống (20 phút)
**Mục tiêu**: Kiểm tra DKC trong các tình huống thực tế và tinh chỉnh

**Hoạt động**:
1. Kiểm tra end-to-end đời sống:
   - Sáng: Dùng `/dkc-journal` cho morning pages
   - Trưa: Ghi nhận hoạt động học với `/dkc-learn "Completed Python tutorial on APIs"`
   - Chiều: Thu thập ý tưởng với `/dkc-idea "Blog post idea: Claude Code for non-devs"`
   - Tối: Tạo reflection với `/dkc-reflect`
   - Hàng tuần: Review insights và export dữ liệu
2. Lesson quizzes để xác thực:
   - `/lesson-quiz advanced-features` (tập trung vào planning mode cho thiết kế đời sống)
   - `/lesson-quiz plugins` (tập trung vào plugins hướng đời sống)
   - `/lesson-quiz cli` (tập trung vào script tự động hóa hàng ngày)
3. Tài liệu hóa: Cách điều này cải thiện đời sống hàng ngày, gì cần cải tiến tiếp

## ✅ Tiêu Chí Thành Công Hướng Đời Sống
- [ ] Planning mode tạo cấu trúc hướng đời sống hữu ích (không chỉ plan dev)
- [ ] Plugin system cài đặt và thực thi lệnh hướng đời sống
- [ ] Flag CLI advanced cho phép tự động hóa đời sống hàng ngày (thói quen sáng/tối)
- [ ] Workflow tích hợp hỗ trợ viết nhật ký/học tập/suy ngẫm thực tế
- [ ] Điểm quiz cho thấy cải thiện áp dụng vào bối cảnh đời sống
- [ ] DKC trở thành công cụ thực sự dùng hàng ngày

## 🔍 Bước Xác Minh Hướng Đời Sống
1. Tạo journal entry buổi sáng dùng `/dkc-journal "Morning pages"`
2. Ghi nhận hoạt động học thực với `/dkc-learn`
3. Thu thập ý tưởng cá nhân (không công việc) với `/dkc-idea`
4. Tạo insight hàng tuần dùng life-coach agent
5. Export kiến thức trong tuần để chia sẻ với bạn hoặc import vào app khác
6. Trả lời: Điều này làm ngày của tôi tốt hơn thế nào? Lĩnh vực đời sống nào phục vụ nhiều nhất?

## 💡 Lệnh Quan Trọng Cho Đời Sống
- **Viết nhật ký**: `/dkc-journal`, `/dkc-reflect`, voice dictation cho entry nhanh
- **Học tập**: `/dkc-learn`, spaced repetition qua background tasks
- **Ý tưởng**: `/dkc-idea`, `/dkc-organize` (lệnh plugin)
- **Tự động hóa**: `claude -p` cho tóm tắt hàng ngày, `claude -r` cho phiên review hàng tuần
- **Insights**: `@life-coach` agent cho gợi ý cá nhân hóa
- **Xác minh**: `/lesson-quiz [topic]` với câu trả lời bối cảnh đời sống

## 🌱 Tại Sao Cái Này Tốt Hơn Luyện Tập Tập Trung Dev
1. **Giá Trị Đời Sống Ngay Lập Tức**: Bạn dùng nó hôm nay cho viết nhật ký/học thực tế
2. **Kỹ Năng Chuyển Đổi**: Cùng tính năng áp dụng cho công việc dev sau này
3. **Cá Nhân Hóa**: Thích ứng với CUỘC SỐNG của bạn, không ví dụ generic
4. **Chia Sẻ Được**: Có thể export để giúp bạn bè/gia đình với instance riêng
5. **Bền Vững**: Xây dựng thói quen, không chỉ bài tập tutorial

---

*Lưu file này làm roadmap daily companion. Xây dựng nó, sử dụng nó, cải thiện cuộc sống của bạn trong khi làm chủ Claude Code!*
