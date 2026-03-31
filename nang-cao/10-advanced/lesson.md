
# Tính Năng Nâng Cao

Hướng dẫn toàn diện về các khả năng nâng cao của Claude Code bao gồm chế độ lập kế hoạch, mở rộng suy nghĩ, chế độ tự động, tác vụ nền, chế độ quyền, chế độ in (không tương tác), quản lý phiên, tính năng tương tác, kênh, nhập liệu giọng nói, điều khiển từ xa, phiên web, ứng dụng desktop, danh sách tác vụ, gợi ý lời nhắc, git worktrees, sandbox, cài đặt quản lý và cấu hình.

## Mục Lục

1. [Tổng Quan](#overview)
2. [Chế Độ Lập Kế Hoạch](#planning-mode)
3. [Mở Rộng Suy Nghĩ](#extended-thinking)
4. [Chế Độ Tự Động](#auto-mode)
5. [Tác Vụ Nền](#background-tasks)
6. [Tác Vụ Lên Lịch](#scheduled-tasks)
7. [Chế Độ Quyền](#permission-modes)
8. [Chế Độ Không Tương Tác](#headless-mode)
9. [Quản Lý Phiên](#session-management)
10. [Tính Năng Tương Tác](#interactive-features)
11. [Nhập Liệu Giọng Nói](#voice-dictation)
12. [Kênh](#channels)
13. [Tích Hợp Chrome](#chrome-integration)
14. [Điều Khiển Từ Xa](#remote-control)
15. [Phiên Web](#web-sessions)
16. [Ứng Dụng Desktop](#desktop-app)
17. [Danh Sách Tác Vụ](#task-list)
18. [Gợi Ý Lời Nhắc](#prompt-suggestions)
19. [Git Worktrees](#git-worktrees)
20. [Sandbox](#sandboxing)
21. [Cài Đặt Quản Lý (Enterprise)](#managed-settings-enterprise)
22. [Cấu Hình Và Cài Đặt](#configuration-and-settings)
23. [Thực Hành Tốt Nhất](#best-practices)
24. [Tài Nguyên Liên Quan](#related-concepts)

---

## Overview

Các tính năng nâng cao trong Claude Code mở rộng khả năng cốt lõi với lập kế hoạch, suy luận, tự động hóa và cơ chế kiểm soát. Những tính năng này cho phép các luồng công việc tinh vi cho các tác vụ phát triển phức tạp, xem xét mã nguồn, tự động hóa và quản lý đa phiên.

**Các tính năng nâng cao chính bao gồm:**
- **Planning Mode**: Tạo kế hoạch triển khai chi tiết trước khi viết mã
- **Extended Thinking**: Suy luận sâu cho các vấn đề phức tạp
- **Auto Mode**: Bộ phân loại an toàn nền xem xét mỗi hành động trước khi thực thi (Nghiên Cứu Thử Nghiệm)
- **Background Tasks**: Chạy các thao tác dài mà không chặn cuộc hội thoại
- **Permission Modes**: Kiểm soát những gì Claude có thể làm (`default`, `acceptEdits`, `plan`, `auto`, `dontAsk`, `bypassPermissions`)
- **Print Mode**: Chạy Claude Code không tương tác cho tự động hóa và CI/CD (`claude -p`)
- **Session Management**: Quản lý nhiều phiên làm việc
- **Interactive Features**: Phím tắt, nhập nhiều dòng và lịch sử lệnh
- **Voice Dictation**: Nhập giọng nói nhấn-để-nói với hỗ trợ STT 20 ngôn ngữ
- **Channels**: Máy chủ MCP đẩy tin nhắn vào phiên đang chạy (Nghiên Cứu Thử Nghiệm)
- **Remote Control**: Điều khiển Claude Code từ Claude.ai hoặc ứng dụng Claude
- **Web Sessions**: Chạy Claude Code trong trình duyệt tại claude.ai/code
- **Desktop App**: Ứng dụng độc lập cho xem xét diff trực quan và nhiều phiên
- **Task List**: Theo dõi tác vụ bền vững qua các lần nén ngữ cảnh
- **Prompt Suggestions**: Gợi ý lệnh thông minh dựa trên ngữ cảnh
- **Git Worktrees**: Các nhánh worktree cô lập cho làm việc song song
- **Sandboxing**: Cô lập hệ thống tệp và mạng ở cấp hệ điều hành
- **Managed Settings**: Triển khai Enterprise qua plist, Registry hoặc tệp quản lý
- **Configuration**: Tùy chỉnh hành vi với các tệp cấu hình JSON

---

## Planning Mode

Chế độ lập kế hoạch cho phép Claude suy nghĩ kỹ các tác vụ phức tạp trước khi triển khai chúng, tạo ra một kế hoạch chi tiết mà bạn có thể xem xét và phê duyệt.

### Chế Độ Lập Kế Hoạch Là Gì?

Chế độ lập kế hoạch là cách tiếp cận hai giai đoạn:
1. **Giai đoạn lập kế hoạch**: Claude phân tích tác vụ và tạo kế hoạch triển khai chi tiết
2. **Giai đoạn triển khai**: Sau khi được phê duyệt, Claude thực thi kế hoạch

### Khi Nào Sử Dụng Chế Độ Lập Kế Hoạch

✅ Sử dụng chế độ lập kế hoạch cho:
- Tái cấu trúc phức tạp nhiều tệp
- Triển khai tính năng mới
- Thay đổi kiến trúc
- Di chuyển cơ sở dữ liệu
- Thiết kế lại API lớn

❌ Không sử dụng chế độ lập kế hoạch cho:
- Sửa lỗi đơn giản
- Thay đổi định dạng
- Chỉnh sửa một tệp
- Truy vấn nhanh

### Kích Hoạt Chế Độ Lập Kế Hoạch

**Lệnh slash**:
```bash
/plan Implement user authentication system
```

**Cờ CLI**:
```bash
claude --permission-mode plan
```

**Đặt làm mặc định**:
```json
{
  "permissions": {
    "defaultMode": "plan"
  }
}
```

**Phím tắt**:
- `Shift + Tab` - Chuyển đổi chế độ quyền (bao gồm plan)
- `Alt + M` - Chuyển đổi chế độ quyền (Windows/Linux)

### Lợi Ích Của Chế Độ Lập Kế Hoạch

- **Cách tiếp cận triển khai có cấu trúc**: Phân tích chi tiết các bước triển khai
- **Xem xét và phê duyệt**: Phê duyệt hoặc điều chỉnh kế hoạch trước khi thực thi
- **Nhận diện rủi ro**: Xác định các vấn đề tiềm ẩn trước khi triển khai
- **Các giai đoạn rõ ràng**: Các giai đoạn và mốc triển khai được tổ chức

### Ví Dụ: Triển Khai Tính Năng

```
User: /plan Add a real-time notification system

Claude: I'll create a plan for implementing real-time notifications.

## Implementation Plan

### Phase 1: Infrastructure Setup
1. Install WebSocket libraries (socket.io)
2. Set up WebSocket server
3. Configure connection management

### Phase 2: Backend Implementation
4. Create notification service
5. Implement notification queue
6. Add database schema for notifications
7. Create API endpoints

### Phase 3: Frontend Integration
8. Set up WebSocket client
9. Create notification UI components
10. Implement notification state management
11. Add notification permissions

### Phase 4: Testing & Deployment
12. Write unit tests
13. Write integration tests
14. Update documentation
15. Deploy to staging

Estimated time: 3-4 hours
Files to modify: 12
New files to create: 8

Ready to proceed? (yes/no/modify plan)

User: yes

Claude: [Begins implementation following the plan]
```

### Sửa Đổi Kế Hoạch

```
User: Modify the plan - skip the queue for now, we'll add it later

Claude: Updated plan:
[Shows modified plan with queue removed]

User: Looks good, proceed

Claude: [Implements modified plan]
```

### Cấu Hình Chế Độ Lập Kế Hoạch

Chế độ lập kế hoạch được kích hoạt qua cờ CLI hoặc lệnh slash:

```bash
# Activate plan mode via CLI
claude --permission-mode plan

# Or use the /plan slash command inside the REPL
/plan Implement user authentication system
```

**Alias model cho lập kế hoạch**: Sử dụng `opusplan` làm alias model để dùng Opus cho lập kế hoạch và Sonnet cho thực thi:

```bash
claude --model opusplan "design and implement the new API"
```

**Chỉnh sửa kế hoạch bên ngoài**: Nhấn `Ctrl+G` để mở kế hoạch hiện tại trong trình soạn thảo bên ngoài để sửa đổi chi tiết.

---

## Extended Thinking

Mở rộng suy nghĩ cho phép Claude dành nhiều thời gian hơn để suy luận về các vấn đề phức tạp trước khi đưa ra giải pháp.

### Mở Rộng Suy Nghĩ Là Gì?

Mở rộng suy nghĩ là quá trình suy luận có chủ đích, từng bước, nơi Claude:
- Phân tích các vấn đề phức tạp
- Xem xét nhiều phương pháp tiếp cận
- Đánh giá sự đánh đổi
- Suy luận qua các trường hợp biên

### Kích Hoạt Mở Rộng Suy Nghĩ

**Phím tắt**:
- `Option + T` (macOS) / `Alt + T` (Windows/Linux) - Bật/tắt mở rộng suy nghĩ

**Kích hoạt tự động**:
- Được bật mặc định cho tất cả các model (Opus 4.6, Sonnet 4.6, Haiku 4.5)
- Opus 4.6: Suy luận thích ứng với các mức nỗ lực: `low` (○), `medium` (◐), `high` (●), `max` (chỉ Opus 4.6)
- Các model khác: Ngân sách cố định đến 31.999 token

**Phương pháp cấu hình**:
- Bật/tắt: `Alt+T` / `Option+T`, hoặc qua `/config`
- Xem suy luận: `Ctrl+O` (chế độ chi tiết)
- Đặt mức nỗ lực: lệnh `/effort` hoặc cờ `--effort`

**Ngân sách tùy chỉnh**:
```bash
export MAX_THINKING_TOKENS=1024
```

**Mức nỗ lực** (chỉ Opus 4.6):
```bash
export CLAUDE_CODE_EFFORT_LEVEL=high   # low (○), medium (◐), high (●), hoặc max (chỉ Opus 4.6)
```

**Cờ CLI**:
```bash
claude --effort high "complex architectural review"
```

**Lệnh slash**:
```
/effort high
```

> **Lưu ý:** Từ khóa "ultrathink" trong lời nhắc kích hoạt chế độ suy luận sâu. Các mức nỗ lực `low`, `medium`, `high`, và `max` (chỉ Opus 4.6) kiểm soát mức độ suy luận mà Claude thực hiện.

### Lợi Ích Của Mở Rộng Suy Nghĩ

- **Suy luận sâu**: Dành nhiều thời gian hơn để suy nghĩ về các vấn đề phức tạp
- **Quyết định kiến trúc tốt hơn**: Đưa ra lựa chọn sáng suốt với đánh giá toàn diện
- **Xem xét các trường hợp biên**: Suy nghĩ qua các vấn đề và kịch bản tiềm ẩn
- **Phân tích kỹ lưỡng**: Cách tiếp cận có cấu trúc cho giải quyết vấn đề phức tạp

### Ví Dụ: Quyết Định Kiến Trúc

```
User: /think Should we use microservices or a monolith for our e-commerce platform?

Claude: Let me think through this architectural decision carefully...

<extended_thinking>
## Context Analysis
- Team size: 5 developers
- Expected traffic: 10k daily users initially
- Need to scale to 100k+ users
- Limited DevOps resources
- 6-month timeline to MVP

## Approach 1: Microservices
Pros:
+ Independent scaling
+ Technology flexibility
+ Team independence
+ Fault isolation

Cons:
- Operational complexity
- Network overhead
- Distributed tracing needed
- Requires DevOps expertise
- Slower initial development

## Approach 2: Monolith
Pros:
+ Simpler deployment
+ Faster initial development
+ Easier debugging
+ Lower operational overhead
+ Single codebase

Cons:
- Scaling challenges later
- All-or-nothing deployments
- Technology lock-in
- Potential for tight coupling

## Decision Factors
1. Team size (5 devs) → Favors monolith
2. DevOps resources (limited) → Favors monolith
3. Timeline (6 months) → Favors monolith
4. Future scale (100k users) → Achievable with monolith + caching
5. Complexity budget → Limited

## Recommendation
Start with a **modular monolith**:
- Single deployment unit
- Clear module boundaries
- Clean interfaces between modules
- Prepare for future extraction to microservices if needed

This gives you:
✓ Fast initial development
✓ Low operational complexity
✓ Option to extract services later
✓ Clear architecture

Migration path: When you reach 50k+ users or specific modules need independent scaling, extract those modules into microservices.
</extended_thinking>

**Recommendation**: Implement a modular monolith with clean module boundaries.

This approach balances your current constraints (team size, timeline, DevOps resources) with future scalability needs. You can migrate specific modules to microservices later when there's a clear business need.
```

### Cấu Hình Mở Rộng Suy Nghĩ

Mở rộng suy nghĩ được kiểm soát qua biến môi trường, phím tắt và cờ CLI:

```bash
# Đặt ngân sách token suy nghĩ
export MAX_THINKING_TOKENS=16000

# Đặt mức nỗ lực (chỉ Opus 4.6): low (○), medium (◐), high (●), hoặc max (chỉ Opus 4.6)
export CLAUDE_CODE_EFFORT_LEVEL=high
```

Bật/tắt trong phiên với `Alt+T` / `Option+T`, đặt mức nỗ lực với `/effort`, hoặc cấu hình qua `/config`.

---

## Auto Mode

Auto Mode là chế độ quyền Nghiên Cứu Thử Nghiệm (tháng 3/2026) sử dụng bộ phân loại an toàn nền để xem xét mỗi hành động trước khi thực thi. Nó cho phép Claude làm việc tự chủ trong khi chặn các thao tác nguy hiểm.

### Yêu Cầu

- **Gói**: Team plan (Enterprise và API đang triển khai)
- **Model**: Claude Sonnet 4.6 hoặc Opus 4.6
- **Bộ phân loại**: Chạy trên Claude Sonnet 4.6 (thêm chi phí token)

### Kích Hoạt Auto Mode

```bash
# Mở khóa auto mode với cờ CLI
claude --enable-auto-mode

# Sau đó chuyển sang bằng Shift+Tab trong REPL
```

Hoặc đặt làm chế độ quyền mặc định:

```bash
claude --permission-mode auto
```

Đặt qua cấu hình:
```json
{
  "permissions": {
    "defaultMode": "auto"
  }
}
```

### Bộ Phân Loại Hoạt Động Như Thế Nào

Bộ phân loại nền đánh giá mỗi hành động theo thứ tự quyết định sau:

1. **Quy tắc cho phép/từ chối** -- Quy tắc quyền rõ ràng được kiểm tra trước
2. **Chỉ đọc/chỉnh sửa tự duyệt** -- Đọc và chỉnh sửa tệp tự động qua
3. **Bộ phân loại** -- Bộ phân loại nền xem xét hành động
4. **Dự phòng** -- Chuyển về hỏi người dùng sau 3 lần chặn liên tiếp hoặc 20 lần chặn tổng cộng

### Các Hành Động Bị Chặn Mặc Định

Auto mode chặn các mục sau theo mặc định:

| Hành Động Bị Chặn | Ví Dụ |
|----------------|---------|
| Cài đặt qua pipe-to-shell | `curl \| bash` |
| Gửi dữ liệu nhạy cảm ra ngoài | Khóa API, thông tin xác thực qua mạng |
| Triển khai production | Lệnh deploy nhắm vào production |
| Xóa hàng loạt | `rm -rf` trên thư mục lớn |
| Thay đổi IAM | Sửa đổi quyền và vai trò |
| Force push lên main | `git push --force origin main` |

### Các Hành Động Được Phép Mặc Định

| Hành Động Được Phép | Ví Dụ |
|----------------|---------|
| Thao tác tệp cục bộ | Đọc, ghi, chỉnh sửa tệp dự án |
| Cài đặt dependency khai báo | `npm install`, `pip install` từ manifest |
| HTTP chỉ đọc | `curl` để lấy tài liệu |
| Push lên nhánh hiện tại | `git push origin feature-branch` |

### Cấu Hình Auto Mode

**In quy tắc mặc định dưới dạng JSON**:
```bash
claude auto-mode defaults
```

**Cấu hình hạ tầng tin cậy** qua cài đặt quản lý `autoMode.environment` cho triển khai enterprise. Điều này cho phép quản trị viên xác định môi trường CI/CD tin cậy, mục tiêu triển khai và mẫu hạ tầng.

### Hành Vi Dự Phòng

Khi bộ phân loại không chắc chắn, auto mode chuyển về hỏi người dùng:
- Sau **3 lần chặn liên tiếp** của bộ phân loại
- Sau **20 lần chặn tổng cộng** trong một phiên

Điều này đảm bảo người dùng luôn giữ quyền kiểm soát khi bộ phân loại không thể phê duyệt hành động một cách tự tin.

---

## Background Tasks

Tác vụ nền cho phép các thao tác chạy dài thực thi mà không chặn cuộc hội thoại của bạn.

### Tác Vụ Nền Là Gì?

Tác vụ nền chạy không đồng bộ trong khi bạn tiếp tục làm việc:
- Bộ test dài
- Quá trình build
- Di chuyển cơ sở dữ liệu
- Kịch bản triển khai
- Công cụ phân tích

**Cách dùng cơ bản:**
```bash
User: Run tests in background

Claude: Started task bg-1234

/task list           # Hiện tất cả tác vụ
/task status bg-1234 # Kiểm tra tiến độ
/task show bg-1234   # Xem kết quả
/task cancel bg-1234 # Hủy tác vụ
```

### Bắt Đầu Tác Vụ Nền

```
User: Run the full test suite in the background

Claude: Starting tests in background (task-id: bg-1234)
You can continue working while tests run.

[Bạn có thể tiếp tục hội thoại]

User: Meanwhile, let's refactor the auth module

Claude: [Works on auth module while tests run in background]

[Sau đó, khi test hoàn tất]

Claude: 📢 Background task bg-1234 completed:
✅ 245 tests passed
❌ 3 tests failed
View results: /task show bg-1234
```

### Quản Lý Tác Vụ Nền

**Liệt kê tác vụ đang hoạt động**:
```
User: /task list

Active background tasks:
1. [bg-1234] Running tests (50% complete, 2min remaining)
2. [bg-1235] Building Docker image (25% complete, 8min remaining)
3. [bg-1236] Deploying to staging (90% complete, 30sec remaining)
```

**Kiểm tra trạng thái tác vụ**:
```
User: /task status bg-1234

Task bg-1234: Running tests
Status: In progress
Progress: 120/245 tests (49%)
Started: 2025-11-08 10:30:15
Estimated completion: 2025-11-08 10:34:22
```

**Xem kết quả tác vụ**:
```
User: /task show bg-1234

[Shows live output from the test run]
```

**Hủy tác vụ**:
```
User: /task cancel bg-1234

Cancelled background task bg-1234
```

### Ví Dụ: Phát Triển Song Song

```
User: Run the build in the background

Claude: Starting build... (task-id: bg-5001)

User: Also run the linter in background

Claude: Starting linter... (task-id: bg-5002)

User: While those run, let's implement the new API endpoint

Claude: [Implements API endpoint while build and linter run]

[10 minutes later]

Claude: 📢 Build completed successfully (bg-5001)
📢 Linter found 12 issues (bg-5002)

User: Show me the linter issues

Claude: [Shows linter output from bg-5002]
```

### Cấu Hình

```json
{
  "backgroundTasks": {
    "enabled": true,
    "maxConcurrentTasks": 5,
    "notifyOnCompletion": true,
    "autoCleanup": true,
    "logOutput": true
  }
}
```

---

## Scheduled Tasks

Tác Vụ Lên Lịch cho phép bạn chạy lời nhắc tự động theo lịch định kỳ hoặc làm lời nhắc một lần. Các tác vụ thuộc phạm vi phiên -- chúng chạy khi Claude Code đang hoạt động và bị xóa khi phiên kết thúc. Có sẵn từ v2.1.72+.

### Lệnh `/loop`

```bash
# Khoảng thời gian rõ ràng
/loop 5m check if the deployment finished

# Ngôn ngữ tự nhiên
/loop check build status every 30 minutes
```

Biểu thức cron 5 trường tiêu chuẩn cũng được hỗ trợ cho lập lịch chính xác.

### Lời nhắc một lần

Đặt lời nhắc kích hoạt một lần vào thời gian cụ thể:

```
remind me at 3pm to push the release branch
in 45 minutes, run the integration tests
```

### Quản lý tác vụ lên lịch

| Công cụ | Mô tả |
|------|-------------|
| `CronCreate` | Tạo tác vụ lên lịch mới |
| `CronList` | Liệt kê tất cả tác vụ lên lịch đang hoạt động |
| `CronDelete` | Xóa tác vụ lên lịch |

**Giới hạn và hành vi**:
- Tối đa **50 tác vụ lên lịch** mỗi phiên
- Thuộc phạm vi phiên -- bị xóa khi phiên kết thúc
- Tác vụ định kỳ tự hết hạn sau **3 ngày**
- Tác vụ chỉ kích hoạt khi Claude Code đang chạy -- không bù cho các lần bỏ lỡ

### Chi tiết hành vi

| Khía cạnh | Chi tiết |
|--------|--------|
| **Jitter định kỳ** | Tối đa 10% khoảng thời gian (tối đa 15 phút) |
| **Jitter một lần** | Tối đa 90 giây trên ranh giới :00/:30 |
| **Bỏ lỡ kích hoạt** | Không bù -- bỏ qua nếu Claude Code không chạy |
| **Lưu trữ** | Không lưu trữ qua các lần khởi động lại |

### Tác Vụ Lên Lịch Cloud

Sử dụng `/schedule` để tạo tác vụ lên lịch Cloud chạy trên hạ tầng Anthropic:

```
/schedule daily at 9am run the test suite and report failures
```

Tác vụ lên lịch Cloud tồn tại qua các lần khởi động lại và không yêu cầu Claude Code chạy cục bộ.

### Vô hiệu hóa tác vụ lên lịch

```bash
export CLAUDE_CODE_DISABLE_CRON=1
```

### Ví dụ: giám sát triển khai

```
/loop 5m check the deployment status of the staging environment.
        If the deploy succeeded, notify me and stop looping.
        If it failed, show the error logs.
```

> **Mẹo**: Tác vụ lên lịch thuộc phạm vi phiên. Đối với tự động hóa bền vững sống sót qua khởi động lại, hãy sử dụng pipeline CI/CD, GitHub Actions hoặc tác vụ lên lịch Desktop App.

---

## Permission Modes

Chế độ quyền kiểm soát những hành động Claude có thể thực hiện mà không cần phê duyệt rõ ràng.

### Các Chế Độ Quyền Có Sẵn

| Chế độ | Hành vi |
|---|---|
| `default` | Chỉ đọc tệp; hỏi cho tất cả hành động khác |
| `acceptEdits` | Đọc và chỉnh sửa tệp; hỏi cho lệnh |
| `plan` | Chỉ đọc tệp (chế độ nghiên cứu, không chỉnh sửa) |
| `auto` | Tất cả hành động với kiểm tra bộ phân loại an toàn nền (Nghiên Cứu Thử Nghiệm) |
| `bypassPermissions` | Tất cả hành động, không kiểm tra quyền (nguy hiểm) |
| `dontAsk` | Chỉ chạy các công cụ đã duyệt trước; tất cả công cụ khác bị từ chối |

Chuyển đổi qua các chế độ bằng `Shift+Tab` trong CLI. Đặt mặc định với cờ `--permission-mode` hoặc cài đặt `permissions.defaultMode`.

### Phương Pháp Kích Hoạt

**Phím tắt**:
```bash
Shift + Tab  # Chuyển đổi qua tất cả 6 chế độ
```

**Lệnh slash**:
```bash
/plan                  # Vào chế độ plan
```

**Cờ CLI**:
```bash
claude --permission-mode plan
claude --permission-mode auto
```

**Cài đặt**:
```json
{
  "permissions": {
    "defaultMode": "auto"
  }
}
```

### Ví Dụ Chế Độ Quyền

#### Chế Độ Default
Claude yêu cầu xác nhận cho các hành động quan trọng:

```
User: Fix the bug in auth.ts

Claude: I need to modify src/auth.ts to fix the bug.
The change will update the password validation logic.

Approve this change? (yes/no/show)
```

#### Chế Độ Plan
Xem xét kế hoạch triển khai trước khi thực thi:

```
User: /plan Implement user authentication system

Claude: I'll create a plan for implementing authentication.

## Implementation Plan
[Detailed plan with phases and steps]

Ready to proceed? (yes/no/modify)
```

#### Chế Độ Accept Edits
Tự động chấp nhận sửa đổi tệp:

```
User: acceptEdits
User: Fix the bug in auth.ts

Claude: [Makes changes without asking]
```

### Trường Hợp Sử Dụng

**Xem Xét Mã Nguồn**:
```
User: claude --permission-mode plan
User: Review this PR and suggest improvements

Claude: [Reads code, provides feedback, but cannot modify]
```

**Lập Trình Đôi**:
```
User: claude --permission-mode default
User: Let's implement the feature together

Claude: [Asks for approval before each change]
```

**Tác Vụ Tự Động**:
```
User: claude --permission-mode acceptEdits
User: Fix all linting issues in the codebase

Claude: [Auto-accepts file edits without asking]
```

---

## Headless Mode

Chế độ in (`claude -p`) cho phép Claude Code chạy không cần nhập liệu tương tác, hoàn hảo cho tự động hóa và CI/CD. Đây là chế độ không tương tác, thay thế cờ `--headless` cũ.

### Chế Độ In Là Gì?

Chế độ in cho phép:
- Thực thi kịch bản tự động
- Tích hợp CI/CD
- Xử lý hàng loạt
- Tác vụ lên lịch

### Chạy Ở Chế Độ In (Không Tương Tác)

```bash
# Chạy tác vụ cụ thể
claude -p "Run all tests"

# Xử lý nội dung pipe
cat error.log | claude -p "Analyze these errors"

# Tích hợp CI/CD (GitHub Actions)
- name: AI Code Review
  run: claude -p "Review PR"
```

### Ví Dụ Sử Dụng Chế Độ In Bổ Sung

```bash
# Chạy tác vụ cụ thể với bắt kết quả đầu ra
claude -p "Run all tests and generate coverage report"

# Với đầu ra có cấu trúc
claude -p --output-format json "Analyze code quality"

# Với đầu vào từ stdin
echo "Analyze code quality" | claude -p "explain this"
```

### Ví Dụ: Tích Hợp CI/CD

**GitHub Actions**:
```yaml
# .github/workflows/code-review.yml
name: AI Code Review

on: [pull_request]

jobs:
  review:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Install Claude Code
        run: npm install -g @anthropic-ai/claude-code

      - name: Run Claude Code Review
        env:
          ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
        run: |
          claude -p --output-format json \
            --max-turns 3 \
            "Review this PR for:
            - Code quality issues
            - Security vulnerabilities
            - Performance concerns
            - Test coverage
            Output results as JSON" > review.json

      - name: Post Review Comment
        uses: actions/github-script@v7
        with:
          script: |
            const fs = require('fs');
            const review = JSON.parse(fs.readFileSync('review.json', 'utf8'));
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: JSON.stringify(review, null, 2)
            });
```

### Cấu Hình Chế Độ In

Chế độ in (`claude -p`) hỗ trợ nhiều cờ cho tự động hóa:

```bash
# Giới hạn lượt tự chủ
claude -p --max-turns 5 "refactor this module"

# Đầu ra JSON có cấu trúc
claude -p --output-format json "analyze this codebase"

# Với xác thực schema
claude -p --json-schema '{"type":"object","properties":{"issues":{"type":"array"}}}' \
  "find bugs in this code"

# Vô hiệu hóa lưu trữ phiên
claude -p --no-session-persistence "one-off analysis"
```

---

## Session Management

Quản lý nhiều phiên Claude Code hiệu quả.

### Lệnh Quản Lý Phiên

| Lệnh | Mô tả |
|---------|-------------|
| `/resume` | Tiếp tục cuộc hội thoại theo ID hoặc tên |
| `/rename` | Đặt tên cho phiên hiện tại |
| `/fork` | Tách phiên hiện tại thành nhánh mới |
| `claude -c` | Tiếp tục cuộc hội thoại gần nhất |
| `claude -r "session"` | Tiếp tục phiên theo tên hoặc ID |

### Tiếp Tục Phiên

**Tiếp tục cuộc hội thoại cuối**:
```bash
claude -c
```

**Tiếp tục phiên đặt tên**:
```bash
claude -r "auth-refactor" "finish this PR"
```

**Đổi tên phiên hiện tại** (trong REPL):
```
/rename auth-refactor
```

### Tách Phiên

Tách phiên để thử cách tiếp cận khác mà không mất bản gốc:

```
/fork
```

Hoặc từ CLI:
```bash
claude --resume auth-refactor --fork-session "try OAuth instead"
```

### Lưu Trữ Phiên

Các phiên được tự động lưu và có thể tiếp tục:

```bash
# Tiếp tục cuộc hội thoại cuối
claude -c

# Tiếp tục phiên cụ thể theo tên hoặc ID
claude -r "auth-refactor"

# Tiếp tục và tách để thử nghiệm
claude --resume auth-refactor --fork-session "alternative approach"
```

---

## Interactive Features

### Phím Tắt

Claude Code hỗ trợ phím tắt để tăng hiệu quả. Đây là tham chiếu đầy đủ từ tài liệu chính thức:

| Phím tắt | Mô tả |
|----------|-------------|
| `Ctrl+C` | Hủy nhập/tạo hiện tại |
| `Ctrl+D` | Thoát Claude Code |
| `Ctrl+G` | Chỉnh sửa kế hoạch trong trình soạn thảo bên ngoài |
| `Ctrl+L` | Xóa màn hình terminal |
| `Ctrl+O` | Bật/tắt đầu ra chi tiết (xem suy luận) |
| `Ctrl+R` | Tìm kiếm ngược lịch sử |
| `Ctrl+T` | Bật/tắt xem danh sách tác vụ |
| `Ctrl+B` | Đưa tác vụ đang chạy xuống nền |
| `Esc+Esc` | Quay lui mã/cuộc hội thoại |
| `Shift+Tab` / `Alt+M` | Chuyển đổi chế độ quyền |
| `Option+P` / `Alt+P` | Chuyển đổi model |
| `Option+T` / `Alt+T` | Bật/tắt mở rộng suy nghĩ |

**Chỉnh Sửa Dòng (phím tắt readline tiêu chuẩn):**

| Phím tắt | Hành động |
|----------|--------|
| `Ctrl + A` | Di chuyển đến đầu dòng |
| `Ctrl + E` | Di chuyển đến cuối dòng |
| `Ctrl + K` | Cắt đến cuối dòng |
| `Ctrl + U` | Cắt đến đầu dòng |
| `Ctrl + W` | Xóa từ phía trước |
| `Ctrl + Y` | Dán (yank) |
| `Tab` | Tự động hoàn thành |
| `↑ / ↓` | Lịch sử lệnh |

### Tùy Chỉnh Phím Tắt

Tạo phím tắt tùy chỉnh bằng cách chạy `/keybindings`, mở `~/.claude/keybindings.json` để chỉnh sửa (v2.1.18+).

**Định dạng cấu hình**:

```json
{
  "$schema": "https://www.schemastore.org/claude-code-keybindings.json",
  "bindings": [
    {
      "context": "Chat",
      "bindings": {
        "ctrl+e": "chat:externalEditor",
        "ctrl+u": null,
        "ctrl+k ctrl+s": "chat:stash"
      }
    },
    {
      "context": "Confirmation",
      "bindings": {
        "ctrl+a": "confirmation:yes"
      }
    }
  ]
}
```

Đặt phím tắt thành `null` để bỏ phím tắt mặc định.

### Các Ngữ Cảnh Có Sẵn

Phím tắt được phạm vi hóa cho các ngữ cảnh UI cụ thể:

| Ngữ cảnh | Hành Động Chính |
|---------|-------------|
| **Chat** | `submit`, `cancel`, `cycleMode`, `modelPicker`, `thinkingToggle`, `undo`, `externalEditor`, `stash`, `imagePaste` |
| **Confirmation** | `yes`, `no`, `previous`, `next`, `nextField`, `cycleMode`, `toggleExplanation` |
| **Global** | `interrupt`, `exit`, `toggleTodos`, `toggleTranscript` |
| **Autocomplete** | `accept`, `dismiss`, `next`, `previous` |
| **HistorySearch** | `search`, `previous`, `next` |
| **Settings** | Điều hướng cài đặt theo ngữ cảnh |
| **Tabs** | Chuyển đổi và quản lý tab |
| **Help** | Điều hướng bảng trợ giúp |

Có tổng cộng 18 ngữ cảnh bao gồm `Transcript`, `Task`, `ThemePicker`, `Attachments`, `Footer`, `MessageSelector`, `DiffDialog`, `ModelPicker`, và `Select`.

### Hỗ Trợ Hợp Âm

Phím tắt hỗ trợ chuỗi hợp âm (kết hợp nhiều phím):

```
"ctrl+k ctrl+s"   → Chuỗi hai phím: nhấn ctrl+k, sau đó ctrl+s
"ctrl+shift+p"    → Phím bổ trợ đồng thời
```

**Cú pháp phím**:
- **Bổ trợ**: `ctrl`, `alt` (hoặc `opt`), `shift`, `meta` (hoặc `cmd`)
- **Chữ hoa ngụ ý Shift**: `K` tương đương `shift+k`
- **Phím đặc biệt**: `escape`, `enter`, `return`, `tab`, `space`, `backspace`, `delete`, phím mũi tên

### Phím Dành Riêng Và Xung Đột

| Phím | Trạng thái | Ghi chú |
|-----|--------|-------|
| `Ctrl+C` | Dành riêng | Không thể gắn lại (ngắt) |
| `Ctrl+D` | Dành riêng | Không thể gắn lại (thoát) |
| `Ctrl+B` | Xung đột terminal | Phím tiền tố tmux |
| `Ctrl+A` | Xung đột terminal | Phím tiền tố GNU Screen |
| `Ctrl+Z` | Xung đột terminal | Tạm dừng tiến trình |

> **Mẹo**: Nếu phím tắt không hoạt động, kiểm tra xung đột với trình giả lập terminal hoặc bộ đa hợp của bạn.

### Tự Động Hoàn Thành Tab

Claude Code cung cấp tự động hoàn thành thông minh:

```
User: /rew<TAB>
→ /rewind

User: /plu<TAB>
→ /plugin

User: /plugin <TAB>
→ /plugin install
→ /plugin enable
→ /plugin disable
```

### Lịch Sử Lệnh

Truy cập các lệnh trước:

```
User: <↑>  # Lệnh trước
User: <↓>  # Lệnh sau
User: Ctrl+R  # Tìm kiếm lịch sử

(reverse-i-search)`test': run all tests
```

### Nhập Nhiều Dòng

Cho truy vấn phức tạp, sử dụng chế độ nhiều dòng:

```bash
User: \
> Long complex prompt
> spanning multiple lines
> \end
```

**Ví dụ:**

```
User: \
> Implement a user authentication system
> with the following requirements:
> - JWT tokens
> - Email verification
> - Password reset
> - 2FA support
> \end

Claude: [Processes the multi-line request]
```

### Chỉnh Sửa Nội Tuyến

Chỉnh sửa lệnh trước khi gửi:

```
User: Deploy to prodcution<Backspace><Backspace>uction

[Edit in-place before sending]
```

### Chế Độ Vim

Bật phím tắt Vi/Vim cho chỉnh sửa văn bản:

**Kích hoạt**:
- Sử dụng lệnh `/vim` hoặc `/config` để bật
- Chuyển chế độ với `Esc` cho NORMAL, `i/a/o` cho INSERT

**Phím điều hướng**:
- `h` / `l` - Di chuyển trái/phải
- `j` / `k` - Di chuyển xuống/lên
- `w` / `b` / `e` - Di chuyển theo từ
- `0` / `$` - Di chuyển đến đầu/cuối dòng
- `gg` / `G` - Nhảy đến đầu/cuối văn bản

**Đối tượng văn bản**:
- `iw` / `aw` - Trong/xung quanh từ
- `i"` / `a"` - Trong/xung quanh chuỗi trích dẫn
- `i(` / `a(` - Trong/xung quanh ngoặc đơn

### Chế Độ Bash

Thực thi lệnh shell trực tiếp với tiền tố `!`:

```bash
! npm test
! git status
! cat src/index.js
```

Sử dụng cho thực thi lệnh nhanh mà không cần chuyển ngữ cảnh.

---

## Voice Dictation

Nhập Liệu Giọng Nói cung cấp nhập giọng nói nhấn-để-nói cho Claude Code, cho phép bạn nói lời nhắc thay vì gõ.

### Kích Hoạt Nhập Liệu Giọng Nói

```
/voice
```

### Tính Năng

| Tính năng | Mô tả |
|---------|-------------|
| **Nhấn-để-nói** | Giữ phím để ghi âm, thả để gửi |
| **20 ngôn ngữ** | Nhận dạng giọng nói hỗ trợ 20 ngôn ngữ |
| **Phím tắt tùy chỉnh** | Cấu hình phím nhấn-để-nói qua `/keybindings` |
| **Yêu cầu tài khoản** | Cần tài khoản Claude.ai cho xử lý STT |

### Cấu Hình

Tùy chỉnh phím tắt nhấn-để-nói trong tệp phím tắt (`/keybindings`). Nhập liệu giọng nói sử dụng tài khoản Claude.ai của bạn cho xử lý nhận dạng giọng nói.

---

## Channels

Kênh (Nghiên Cứu Thử Nghiệm) cho phép máy chủ MCP đẩy tin nhắn vào phiên Claude Code đang chạy, cho phép tích hợp thời gian thực với các dịch vụ bên ngoài.

### Đăng Ký Kênh

```bash
# Đăng ký plugin kênh khi khởi động
claude --channels discord,telegram
```

### Tích Hợp Được Hỗ Trợ

| Tích hợp | Mô tả |
|-------------|-------------|
| **Discord** | Nhận và phản hồi tin nhắn Discord trong phiên của bạn |
| **Telegram** | Nhận và phản hồi tin nhắn Telegram trong phiên của bạn |

### Cấu Hình

**Cài đặt quản lý** cho triển khai enterprise:

```json
{
  "allowedChannelPlugins": ["discord", "telegram"]
}
```

Cài đặt quản lý `allowedChannelPlugins` kiểm soát plugin kênh nào được phép trên toàn tổ chức.

### Cách Hoạt Động

1. Máy chủ MCP hoạt động như plugin kênh kết nối với dịch vụ bên ngoài
2. Tin nhắn đến được đẩy vào phiên Claude Code đang hoạt động
3. Claude có thể đọc và phản hồi tin nhắn trong ngữ cảnh phiên
4. Plugin kênh phải được phê duyệt qua cài đặt quản lý `allowedChannelPlugins`

---

## Chrome Integration

Tích Hợp Chrome kết nối Claude Code với trình duyệt Chrome hoặc Microsoft Edge của bạn cho tự động hóa web trực tiếp và gỡ lỗi. Đây là tính năng beta có sẵn từ v2.0.73+ (hỗ trợ Edge thêm vào v1.0.36+).

### Kích Hoạt Tích Hợp Chrome

**Khi khởi động**:

```bash
claude --chrome      # Bật kết nối Chrome
claude --no-chrome   # Tắt kết nối Chrome
```

**Trong phiên**:

```
/chrome
```

Chọn "Enabled by default" để kích hoạt Tích Hợp Chrome cho tất cả phiên tương lai. Claude Code chia sẻ trạng thái đăng nhập trình duyệt của bạn, vì vậy nó có thể tương tác với ứng dụng web đã xác thực.

### Khả Năng

| Khả năng | Mô tả |
|------------|-------------|
| **Gỡ lỗi trực tiếp** | Đọc log console, kiểm tra phần tử DOM, gỡ lỗi JavaScript theo thời gian thực |
| **Xác minh thiết kế** | So sánh trang render với bản mockup thiết kế |
| **Xác thực biểu mẫu** | Kiểm tra gửi biểu mẫu, xác thực đầu vào và xử lý lỗi |
| **Kiểm thử ứng dụng web** | Tương tác với ứng dụng đã xác thực (Gmail, Google Docs, Notion, v.v.) |
| **Trích xuất dữ liệu** | Thu thập và xử lý nội dung từ trang web |
| **Ghi lại phiên** | Ghi lại tương tác trình duyệt dưới dạng tệp GIF |

### Quyền theo trang

Tiện ích mở rộng Chrome quản lý quyền truy cập mỗi trang. Cấp hoặc thu hồi quyền truy cập cho các trang cụ thể bất cứ lúc nào qua popup tiện ích mở rộng. Claude Code chỉ tương tác với các trang bạn đã cho phép rõ ràng.

### Cách hoạt động

Claude Code điều khiển trình duyệt trong cửa sổ hiển thị -- bạn có thể xem các hành động xảy ra theo thời gian thực. Khi trình duyệt gặp trang đăng nhập hoặc CAPTCHA, Claude tạm dừng và chờ bạn xử lý thủ công trước khi tiếp tục.

### Hạn Chế Đã Biết

- **Hỗ trợ trình duyệt**: Chỉ Chrome và Edge -- Brave, Arc và các trình duyệt Chromium khác không được hỗ trợ
- **WSL**: Không khả dụng trên Windows Subsystem for Linux
- **Nhà cung cấp bên thứ ba**: Không hỗ trợ với nhà cung cấp API Bedrock, Vertex hoặc Foundry
- **Service worker idle**: Service worker tiện ích mở rộng Chrome có thể idle trong phiên dài

> **Mẹo**: Tích Hợp Chrome là tính năng beta. Hỗ trợ trình duyệt có thể mở rộng trong các bản phát hành tương lai.

---

## Remote Control

Điều Khiển Từ Xa cho phép bạn tiếp tục phiên Claude Code đang chạy cục bộ từ điện thoại, máy tính bảng hoặc bất kỳ trình duyệt nào. Phiên cục bộ của bạn tiếp tục chạy trên máy của bạn -- không có gì di chuyển lên cloud. Có sẵn trên gói Pro, Max, Team và Enterprise (v2.1.51+).

### Bắt Đầu Điều Khiển Từ Xa

**Từ CLI**:

```bash
# Bắt đầu với tên phiên mặc định
claude remote-control

# Bắt đầu với tên tùy chỉnh
claude remote-control --name "Auth Refactor"
```

**Từ trong phiên**:

```
/remote-control
/remote-control "Auth Refactor"
```

**Cờ có sẵn**:

| Cờ | Mô tả |
|------|-------------|
| `--name "title"` | Tên phiên tùy chỉnh để dễ nhận diện |
| `--verbose` | Hiển thị log kết nối chi tiết |
| `--sandbox` | Bật cô lập hệ thống tệp và mạng |
| `--no-sandbox` | Tắt sandbox (mặc định) |

### Kết Nối Vào Phiên

Ba cách kết nối từ thiết bị khác:

1. **URL phiên** -- In ra terminal khi phiên bắt đầu; mở trong bất kỳ trình duyệt nào
2. **Mã QR** -- Nhấn `spacebar` sau khi bắt đầu để hiển thị mã QR có thể quét
3. **Tìm theo tên** -- Duyệt phiên tại claude.ai/code hoặc trong ứng dụng Claude mobile (iOS/Android)

### Bảo Mật

- **Không mở cổng vào** trên máy của bạn
- **Chỉ HTTPS đi ra** qua TLS
- **Thông tin xác thực phạm vi** -- nhiều token ngắn hạn, phạm vi hẹp
- **Cô lập phiên** -- mỗi phiên remote độc lập

### Điều Khiển Từ Xa so với Claude Code trên Web

| Khía cạnh | Điều Khiển Từ Xa | Claude Code trên Web |
|--------|---------------|-------------------|
| **Thực thi** | Chạy trên máy của bạn | Chạy trên cloud Anthropic |
| **Công cụ cục bộ** | Truy cập đầy đủ MCP cục bộ, tệp và CLI | Không phụ thuộc cục bộ |
| **Trường hợp dùng** | Tiếp tục công việc cục bộ từ thiết bị khác | Bắt đầu mới từ bất kỳ trình duyệt nào |

### Hạn Chế

- Một phiên remote mỗi instance Claude Code
- Terminal phải mở trên máy chủ
- Phiên hết hạn sau ~10 phút nếu mạng không reachable

### Trường Hợp Sử Dụng

- Điều khiển Claude Code từ thiết bị di động hoặc máy tính bảng khi xa bàn làm việc
- Sử dụng UI claude.ai phong phú hơn trong khi duy trì thực thi công cụ cục bộ
- Xem xét mã nhanh khi di chuyển với môi trường phát triển cục bộ đầy đủ

---

## Web Sessions

Phiên Web cho phép bạn chạy Claude Code trực tiếp trong trình duyệt tại claude.ai/code, hoặc tạo phiên web từ CLI.

### Tạo Phiên Web

```bash
# Tạo phiên web mới từ CLI
claude --remote "implement the new API endpoints"
```

Điều này bắt đầu phiên Claude Code trên claude.ai mà bạn có thể truy cập từ bất kỳ trình duyệt nào.

### Tiếp Tục Phiên Web Cục Bộ

Nếu bạn bắt đầu phiên trên web và muốn tiếp tục cục bộ:

```bash
# Tiếp tục phiên web trong terminal cục bộ
claude --teleport
```

Hoặc từ REPL tương tác:
```
/teleport
```

### Trường Hợp Sử Dụng

- Bắt đầu làm việc trên máy này và tiếp tục trên máy khác
- Chia sẻ URL phiên với thành viên nhóm
- Sử dụng UI web để xem diff trực quan, sau đó chuyển sang terminal để thực thi

---

## Desktop App

Ứng Dụng Claude Code Desktop cung cấp ứng dụng độc lập với xem diff trực quan, phiên song song và trình kết nối tích hợp. Có sẵn cho macOS và Windows (gói Pro, Max, Team và Enterprise).

### Cài Đặt

Tải xuống từ [claude.ai](https://claude.ai) cho nền tảng của bạn:
- **macOS**: Universal build (Apple Silicon và Intel)
- **Windows**: Bộ cài đặt x64 và ARM64

Xem [Desktop Quickstart](https://code.claude.com/docs/en/desktop-quickstart) để biết hướng dẫn cài đặt.

### Chuyển Từ CLI

Chuyển phiên CLI hiện tại sang Ứng Dụng Desktop:

```
/desktop
```

### Tính Năng Cốt Lõi

| Tính năng | Mô tả |
|---------|-------------|
| **Diff view** | Xem xét trực quan từng tệp với bình luận nội tuyến; Claude đọc bình luận và sửa đổi |
| **App preview** | Tự động khởi động máy chủ dev với trình duyệt nhúng để xác minh trực tiếp |
| **Giám sát PR** | Tích hợp GitHub CLI với tự động sửa lỗi CI và tự động merge khi kiểm tra đạt |
| **Phiên song song** | Nhiều phiên trong sidebar với cô lập Git worktree tự động |
| **Tác vụ lên lịch** | Tác vụ định kỳ (hàng giờ, hàng ngày, ngày trong tuần, hàng tuần) chạy khi ứng dụng mở |
| **Render phong phú** | Mã, markdown và render sơ đồ với đánh dấu cú pháp |

### Cấu Hình App Preview

Cấu hình hành vi máy chủ dev trong `.claude/launch.json`:

```json
{
  "command": "npm run dev",
  "port": 3000,
  "readyPattern": "ready on",
  "persistCookies": true
}
```

### Trình Kết Nối

Kết nối dịch vụ bên ngoài cho ngữ cảnh phong phú hơn:

| Trình kết nối | Khả năng |
|-----------|------------|
| **GitHub** | Giám sát PR, theo dõi issue, xem xét mã nguồn |
| **Slack** | Thông báo, ngữ cảnh kênh |
| **Linear** | Theo dõi issue, quản lý sprint |
| **Notion** | Tài liệu, truy cập cơ sở kiến thức |
| **Asana** | Quản lý tác vụ, theo dõi dự án |
| **Calendar** | Nhận biết lịch, ngữ cảnh cuộc họp |

> **Lưu ý**: Trình kết nối không khả dụng cho phiên remote (cloud).

### Phiên Remote Và SSH

- **Phiên Remote**: Chạy trên hạ tầng cloud Anthropic; tiếp tục ngay cả khi ứng dụng đóng. Truy cập từ claude.ai/code hoặc ứng dụng Claude mobile
- **Phiên SSH**: Kết nối máy remote qua SSH với truy cập đầy đủ vào hệ thống tệp và công cụ remote. Claude Code phải được cài đặt trên máy remote

### Chế Độ Quyền Trong Desktop

Ứng Dụng Desktop hỗ trợ cùng 4 chế độ quyền như CLI:

| Chế độ | Hành vi |
|------|----------|
| **Ask permissions** (mặc định) | Xem xét và phê duyệt mỗi chỉnh sửa và lệnh |
| **Auto accept edits** | Chỉnh sửa tệp tự duyệt; lệnh cần phê duyệt thủ công |
| **Plan mode** | Xem xét cách tiếp cận trước khi thay đổi được thực hiện |
| **Bypass permissions** | Thực thi tự động (chỉ sandbox, quản trị viên kiểm soát) |

### Tính Năng Enterprise

- **Admin console**: Kiểm soát quyền truy cập tab Code và cài đặt quyền cho tổ chức
- **Triển khai MDM**: Triển khai qua MDM trên macOS hoặc MSIX trên Windows
- **Tích hợp SSO**: Yêu cầu single sign-on cho thành viên tổ chức
- **Cài đặt quản lý**: Quản lý tập trung cấu hình nhóm và khả năng model

---

## Task List

Tính năng Task List cung cấp theo dõi tác vụ bền vững sống sót qua các lần nén ngữ cảnh (khi lịch sử hội thoại được cắt ngắn để vừa với cửa sổ ngữ cảnh).

### Bật/Tắt Task List

Nhấn `Ctrl+T` để bật/tắt xem danh sách tác vụ trong phiên.

### Tác Vụ Bền Vững

Tác vụ tồn tại qua các lần nén ngữ cảnh, đảm bảo các mục công việc chạy dài không bị mất khi ngữ cảnh hội thoại được cắt ngắn. Điều này đặc biệt hữu ích cho triển khai phức tạp nhiều bước.

### Thư Mục Tác Vụ Đặt Tên

Sử dụng biến môi trường `CLAUDE_CODE_TASK_LIST_ID` để tạo thư mục tác vụ đặt tên chia sẻ qua các phiên:

```bash
export CLAUDE_CODE_TASK_LIST_ID=my-project-sprint-3
```

Điều này cho phép nhiều phiên chia sẻ cùng danh sách tác vụ, hữu ích cho luồng công việc nhóm hoặc dự án đa phiên.

---

## Prompt Suggestions

Gợi Ý Lời Nhắc hiển thị các lệnh mẫu mờ dựa trên lịch sử git và ngữ cảnh hội thoại hiện tại.

### Cách Hoạt Động

- Gợi ý xuất hiện dưới dạng văn bản mờ dưới lời nhắc nhập liệu của bạn
- Nhấn `Tab` để chấp nhận gợi ý
- Nhấn `Enter` để chấp nhận và gửi ngay
- Gợi ý nhận biết ngữ cảnh, lấy từ lịch sử git và trạng thái hội thoại

### Vô Hiệu Hóa Gợi Ý Lời Nhắc

```bash
export CLAUDE_CODE_ENABLE_PROMPT_SUGGESTION=false
```

---

## Git Worktrees

Git Worktrees cho phép bạn bắt đầu Claude Code trong worktree cô lập, cho phép làm việc song song trên các nhánh khác nhau mà không cần stash hoặc chuyển đổi.

### Bắt Đầu Trong Worktree

```bash
# Bắt đầu Claude Code trong worktree cô lập
claude --worktree
# hoặc
claude -w
```

### Vị Trí Worktree

Worktrees được tạo tại:
```
<repo>/.claude/worktrees/<name>
```

### Sparse Checkout Cho Monorepo

Sử dụng cài đặt `worktree.sparsePaths` để thực hiện sparse-checkout trong monorepo, giảm sử dụng đĩa và thời gian clone:

```json
{
  "worktree": {
    "sparsePaths": ["packages/my-package", "shared/"]
  }
}
```

### Công Cụ Và Hook Worktree

| Mục | Mô tả |
|------|-------------|
| `ExitWorktree` | Công cụ thoát và dọn dẹp worktree hiện tại |
| `WorktreeCreate` | Sự kiện hook kích hoạt khi worktree được tạo |
| `WorktreeRemove` | Sự kiện hook kích hoạt khi worktree bị xóa |

### Tự Động Dọn Dẹp

Nếu không có thay đổi nào được thực hiện trong worktree, nó được tự động dọn dẹp khi phiên kết thúc.

### Trường Hợp Sử Dụng

- Làm việc trên nhánh tính năng trong khi giữ nhánh main không đụng
- Chạy test trong môi trường cô lập mà không ảnh hưởng thư mục làm việc
- Thử thay đổi thử nghiệm trong môi trường dùng một lần
- Sparse-checkout các gói cụ thể trong monorepo để khởi động nhanh hơn

---

## Sandboxing

Sandboxing cung cấp cô lập hệ thống tệp và mạng ở cấp hệ điều hành cho các lệnh Bash được thực thi bởi Claude Code. Đây là bổ sung cho quy tắc quyền và cung cấp lớp bảo mật bổ sung.

### Kích Hoạt Sandboxing

**Lệnh slash**:
```
/sandbox
```

**Cờ CLI**:
```bash
claude --sandbox       # Bật sandboxing
claude --no-sandbox    # Tắt sandboxing
```

### Cài Đặt Cấu Hình

| Cài đặt | Mô tả |
|---------|-------------|
| `sandbox.enabled` | Bật hoặc tắt sandboxing |
| `sandbox.failIfUnavailable` | Thất bại nếu không thể kích hoạt sandboxing |
| `sandbox.filesystem.allowWrite` | Đường dẫn được phép ghi |
| `sandbox.filesystem.allowRead` | Đường dẫn được phép đọc |
| `sandbox.filesystem.denyRead` | Đường dẫn bị từ chối đọc |
| `sandbox.enableWeakerNetworkIsolation` | Bật cô lập mạng yếu hơn trên macOS |

### Ví Dụ Cấu Hình

```json
{
  "sandbox": {
    "enabled": true,
    "failIfUnavailable": true,
    "filesystem": {
      "allowWrite": ["/Users/me/project"],
      "allowRead": ["/Users/me/project", "/usr/local/lib"],
      "denyRead": ["/Users/me/.ssh", "/Users/me/.aws"]
    },
    "enableWeakerNetworkIsolation": true
  }
}
```

### Cách Hoạt Động

- Lệnh Bash chạy trong môi trường sandbox với quyền truy cập hệ thống tệp bị hạn chế
- Truy cập mạng có thể được cô lập để ngăn kết nối ngoài không mong muốn
- Hoạt động cùng quy tắc quyền cho phòng thủ theo chiều sâu
- Trên macOS, sử dụng `sandbox.enableWeakerNetworkIsolation` cho hạn chế mạng (cô lập mạng đầy đủ không có sẵn trên macOS)

### Trường Hợp Sử Dụng

- Chạy mã không tin cậy hoặc được tạo một cách an toàn
- Ngăn sửa đổi ngoài ý muốn các tệp ngoài dự án
- Hạn chế truy cập mạng trong các tác vụ tự động

---

## Managed Settings (Enterprise)

Cài Đặt Quản Lý cho phép quản trị viên enterprise triển khai cấu hình Claude Code trên toàn tổ chức bằng công cụ quản lý native nền tảng.

### Phương Pháp Triển Khai

| Nền tảng | Phương pháp | Từ |
|----------|--------|-------|
| macOS | Tệp plist quản lý (MDM) | v2.1.51+ |
| Windows | Windows Registry | v2.1.51+ |
| Đa nền tảng | Tệp cấu hình quản lý | v2.1.51+ |
| Đa nền tảng | Managed drop-ins (thư mục `managed-settings.d/`) | v2.1.83+ |

### Managed Drop-ins

Từ v2.1.83, quản trị viên có thể triển khai nhiều tệp cài đặt quản lý vào thư mục `managed-settings.d/`. Các tệp được hợp nhất theo thứ tự bảng chữ cái, cho phép cấu hình mô-đun qua các nhóm:

```
~/.claude/managed-settings.d/
  00-org-defaults.json
  10-team-policies.json
  20-project-overrides.json
```

### Cài Đặt Quản Lý Có Sẵn

| Cài đặt | Mô tả |
|---------|-------------|
| `disableBypassPermissionsMode` | Ngăn người dùng bật bypass permissions |
| `availableModels` | Hạn chế model nào người dùng có thể chọn |
| `allowedChannelPlugins` | Kiểm soát plugin kênh nào được phép |
| `autoMode.environment` | Cấu hình hạ tầng tin cậy cho auto mode |
| Chính sách tùy chỉnh | Chính sách quyền và công cụ cụ thể của tổ chức |

### Ví Dụ: macOS Plist

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN"
  "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>disableBypassPermissionsMode</key>
  <true/>
  <key>availableModels</key>
  <array>
    <string>claude-sonnet-4-6</string>
    <string>claude-haiku-4-5</string>
  </array>
</dict>
</plist>
```

---

## Configuration and Settings

### Vị Trí Tệp Cấu Hình

1. **Cấu hình toàn cục**: `~/.claude/config.json`
2. **Cấu hình dự án**: `./.claude/config.json`
3. **Cấu hình người dùng**: `~/.config/claude-code/settings.json`

### Ví Dụ Cấu Hình Đầy Đủ

**Cấu hình tính năng nâng cao cốt lõi:**

```json
{
  "permissions": {
    "mode": "default"
  },
  "hooks": {
    "PreToolUse:Edit": "eslint --fix ${file_path}",
    "PostToolUse:Write": "~/.claude/hooks/security-scan.sh"
  },
  "mcp": {
    "enabled": true,
    "servers": {
      "github": {
        "command": "npx",
        "args": ["-y", "@modelcontextprotocol/server-github"]
      }
    }
  }
}
```

**Ví dụ cấu hình mở rộng:**

```json
{
  "permissions": {
    "mode": "default",
    "allowedTools": ["Bash(git log:*)", "Read"],
    "disallowedTools": ["Bash(rm -rf:*)"]
  },

  "hooks": {
    "PreToolUse": [{ "matcher": "Edit", "hooks": ["eslint --fix ${file_path}"] }],
    "PostToolUse": [{ "matcher": "Write", "hooks": ["~/.claude/hooks/security-scan.sh"] }],
    "Stop": [{ "hooks": ["~/.claude/hooks/notify.sh"] }]
  },

  "mcp": {
    "enabled": true,
    "servers": {
      "github": {
        "command": "npx",
        "args": ["-y", "@modelcontextprotocol/server-github"],
        "env": {
          "GITHUB_TOKEN": "${GITHUB_TOKEN}"
        }
      }
    }
  }
}
```

### Biến Môi Trường

Ghi đè cấu hình với biến môi trường:

```bash
# Lựa chọn model
export ANTHROPIC_MODEL=claude-opus-4-6
export ANTHROPIC_DEFAULT_OPUS_MODEL=claude-opus-4-6
export ANTHROPIC_DEFAULT_SONNET_MODEL=claude-sonnet-4-6
export ANTHROPIC_DEFAULT_HAIKU_MODEL=claude-haiku-4-5

# Cấu hình API
export ANTHROPIC_API_KEY=sk-ant-...

# Cấu hình suy nghĩ
export MAX_THINKING_TOKENS=16000
export CLAUDE_CODE_EFFORT_LEVEL=high

# Chuyển đổi tính năng
export CLAUDE_CODE_DISABLE_AUTO_MEMORY=true
export CLAUDE_CODE_DISABLE_BACKGROUND_TASKS=true
export CLAUDE_CODE_DISABLE_CRON=1
export CLAUDE_CODE_DISABLE_GIT_INSTRUCTIONS=true
export CLAUDE_CODE_DISABLE_TERMINAL_TITLE=true
export CLAUDE_CODE_DISABLE_1M_CONTEXT=true
export CLAUDE_CODE_DISABLE_NONSTREAMING_FALLBACK=true
export CLAUDE_CODE_ENABLE_PROMPT_SUGGESTION=false
export CLAUDE_CODE_ENABLE_TASKS=true
export CLAUDE_CODE_SIMPLE=true              # Đặt bởi cờ --bare

# Cấu hình MCP
export MAX_MCP_OUTPUT_TOKENS=50000
export ENABLE_TOOL_SEARCH=true

# Quản lý tác vụ
export CLAUDE_CODE_TASK_LIST_ID=my-project-tasks

# Đội agent (thử nghiệm)
export CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=true

# Cấu hình subagent và plugin
export CLAUDE_CODE_SUBAGENT_MODEL=sonnet
export CLAUDE_CODE_PLUGIN_SEED_DIR=./my-plugins
export CLAUDE_CODE_NEW_INIT=true

# Tiến trình con và streaming
export CLAUDE_CODE_SUBPROCESS_ENV_SCRUB="SECRET_KEY,DB_PASSWORD"
export CLAUDE_AUTOCOMPACT_PCT_OVERRIDE=80
export CLAUDE_STREAM_IDLE_TIMEOUT_MS=30000
export ANTHROPIC_CUSTOM_MODEL_OPTION=my-custom-model
export SLASH_COMMAND_TOOL_CHAR_BUDGET=50000
```

### Lệnh Quản Lý Cấu Hình

```
User: /config
[Opens interactive configuration menu]
```

Lệnh `/config` cung cấp menu tương tác để bật/tắt cài đặt như:
- Mở rộng suy nghĩ bật/tắt
- Đầu ra chi tiết
- Chế độ quyền
- Lựa chọn model

### Cấu Hình Theo Dự Án

Tạo `.claude/config.json` trong dự án của bạn:

```json
{
  "hooks": {
    "PreToolUse": [{ "matcher": "Bash", "hooks": ["npm test && npm run lint"] }]
  },
  "permissions": {
    "mode": "default"
  },
  "mcp": {
    "servers": {
      "project-db": {
        "command": "mcp-postgres",
        "env": {
          "DATABASE_URL": "${PROJECT_DB_URL}"
        }
      }
    }
  }
}
```

---

## Best Practices

### Chế Độ Lập Kế Hoạch
- ✅ Sử dụng cho tác vụ phức tạp nhiều bước
- ✅ Xem xét kế hoạch trước khi phê duyệt
- ✅ Sửa đổi kế hoạch khi cần
- ❌ Không sử dụng cho tác vụ đơn giản

### Mở Rộng Suy Nghĩ
- ✅ Sử dụng cho quyết định kiến trúc
- ✅ Sử dụng cho giải quyết vấn đề phức tạp
- ✅ Xem xét quá trình suy nghĩ
- ❌ Không sử dụng cho truy vấn đơn giản

### Tác Vụ Nền
- ✅ Sử dụng cho thao tác chạy dài
- ✅ Giám sát tiến độ tác vụ
- ✅ Xử lý lỗi tác vụ một cách duyên dáng
- ❌ Không bắt đầu quá nhiều tác vụ đồng thời

### Quyền
- ✅ Sử dụng `plan` cho xem xét mã nguồn (chỉ đọc)
- ✅ Sử dụng `default` cho phát triển tương tác
- ✅ Sử dụng `acceptEdits` cho luồng công việc tự động
- ✅ Sử dụng `auto` cho công việc tự chủ với rào chắn an toàn
- ❌ Không sử dụng `bypassPermissions` trừ khi thực sự cần thiết

### Phiên
- ✅ Sử dụng phiên riêng cho từng tác vụ
- ✅ Lưu trạng thái phiên quan trọng
- ✅ Dọn dẹp phiên cũ
- ❌ Không trộn công việc không liên quan trong một phiên

---

## Additional Resources

Để biết thêm thông tin về Claude Code và các tính năng liên quan:

- [Tài Liệu Chế Độ Tương Tác Chính Thức](https://code.claude.com/docs/en/interactive-mode)
- [Tài Liệu Chế Độ Không Tương Tác Chính Thức](https://code.claude.com/docs/en/headless)
- [Tham Khảo CLI](https://code.claude.com/docs/en/cli-reference)
- [Hướng Dẫn Checkpoints](../../08-checkpoints/) - Quản lý phiên và quay lui
- [Lệnh Slash](../../01-slash-commands/) - Tham khảo lệnh
- [Hướng Dẫn Bộ Nhớ](../../02-memory/) - Ngữ cảnh bền vững
- [Hướng Dẫn Kỹ Năng](../../03-skills/) - Khả năng tự chủ
- [Hướng Dẫn Subagents](../../04-subagents/) - Thực thi tác vụ ủy quyền
- [Hướng Dẫn MCP](../../05-mcp/) - Truy cập dữ liệu bên ngoài
- [Hướng Dẫn Hook](../../06-hooks/) - Tự động hóa theo sự kiện
- [Hướng Dẫn Plugin](../../07-plugins/) - Tiện ích mở rộng đóng gói
- [Tài Liệu Tác Vụ Lên Lịch Chính Thức](https://code.claude.com/docs/en/scheduled-tasks)
- [Tài Liệu Tích Hợp Chrome Chính Thức](https://code.claude.com/docs/en/chrome)
- [Tài Liệu Điều Khiển Từ Xa Chính Thức](https://code.claude.com/docs/en/remote-control)
- [Tài Liệu Phím Tắt Chính Thức](https://code.claude.com/docs/en/keybindings)
- [Tài Liệu Ứng Dụng Desktop Chính Thức](https://code.claude.com/docs/en/desktop)
