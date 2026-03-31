# Quiz: Subagents

## Câu 1
**Câu hỏi**: Subagent là gì trong Claude Code?
A. Một phiên bản Claude nhỏ hơn
B. Trợ lý AI chuyên môn hóa mà Claude Code có thể ủy thác công việc
C. Một loại skill đặc biệt
D. Một plugin của Claude Code
**Đáp án**: B
**Giải thích**: Subagents là các trợ lý AI chuyên môn hóa, hoạt động độc lập với context window riêng biệt, được cấu hình với system prompt và công cụ tùy chỉnh.

## Câu 2
**Câu hỏi**: Lợi ích chính của subagent là gì?
A. Tiết kiệm token
B. Bảo tồn context chính, tránh ô nhiễm từ task phức tạp
C. Tạo ra nhiều Claude instances
D. Tăng tốc độ xử lý
**Đáp án**: B
**Giải thích**: Subagent hoạt động trong context riêng biệt, ngăn chặn ô nhiễm context của cuộc hội thoại chính. Điều này giúp giữ context sạch và tập trung.

## Câu 3
**Câu hỏi**: Thứ tự ưu tiên của subagent sources là gì (cao nhất)?
A. Plugin → User → Project → CLI-defined
B. CLI-defined → Project → User → Plugin
C. Project → User → Plugin → CLI-defined
D. User → Project → CLI-defined → Plugin
**Đáp án**: B
**Giải thích**: Thứ tự ưu tiên: (1) CLI-defined qua `--agents` (JSON), (2) Project subagents trong `.claude/agents/`, (3) User subagents trong `~/.claude/agents/`, (4) Plugin subagents qua plugins.

## Câu 4
**Câu hỏi**: Trường nào sau đây KHÔNG có trong YAML frontmatter của subagent?
A. `name`
B. `description`
C. `version`
D. `tools`
**Đáp án**: C
**Giải thích**: Frontmatter của subagent chứa `name`, `description`, `tools`, `model`, `permissionMode`, `maxTurns`, `skills`, `mcpServers`, `memory`, `background`, `isolation`, `initialPrompt`. Không có trường `version`.

## Câu 5
**Câu hỏi**: Khi nào subagent background hữu ích?
A. Khi cần kết quả ngay lập tức
B. Khi task dài và bạn muốn tiếp tục làm việc khác
C. Khi cần nhiều context hơn
D. Khi muốn subagent chạy nhanh hơn
**Đáp án**: B
**Giải thích**: Background subagents cho phép bạn tiếp tục làm việc khác trong khi subagent xử lý task dài. Bạn sẽ được thông báo khi subagent hoàn thành.

## Câu 6
**Câu hỏi**: Worktree isolation trong subagents dùng để làm gì?
A. Tăng tốc độ xử lý
B. Cho subagent làm việc trên isolated copy của repo
C. Bảo mật thông tin
D. Giảm token usage
**Đáp án**: B
**Giải thích**: Worktree isolation tạo một bản sao tạm thời của repo để subagent làm việc mà không ảnh hưởng đến code chính. Hữu ích cho các task thử nghiệm.

## Câu 7
**Câu hỏi**: "Chaining subagents" nghĩa là gì?
A. Chạy nhiều subagents cùng lúc
B. Subagent này gọi subagent khác
C. Kết quả của subagent này là input cho subagent khác
D. Subagents hoạt động trong thread riêng
**Đáp án**: C
**Giải thích**: Chaining subagents nghĩa là kết quả output của subagent này được dùng làm input cho subagent khác, tạo chain xử lý tuần tự.

## Câu 8
**Câu hỏi**: Trường `model` trong subagent config có giá trị nào sau đây?
A. `gpt-4`, `claude`, `gemini`
B. `sonnet`, `opus`, `haiku`, `inherit`
C. `fast`, `standard`, `detailed`
D. `auto`, `manual`
**Đáp án**: B
**Giải thích**: Trường `model` trong subagent config có thể là `sonnet`, `opus`, `haiku`, hoặc `inherit` (kế thừa từ agent chính).

## Câu 9 (Mở)
**Câu hỏi**: Khi nào nên dùng subagent thay vì làm việc trực tiếp trong context chính?
**Đáp án**: Dùng subagent khi: (1) task phức tạp, nhiều bước; (2) cần chuyên môn hóa (researcher, code reviewer, bug fixer); (3) task có thể chạy song song; (4) muốn giữ context chính sạch; (5) cần test code mà không muốn làm bẩn workspace.
**Giải thích**: Subagents hữu ích cho tasks isolated, complex, hoặc parallelizable.

## Câu 10 (Mở)
**Câu hỏi**: Tại sao subagents có context window riêng biệt quan trọng?
**Đáp án**: Vì context window có giới hạn. Nếu làm tất cả trong context chính, sẽ nhanh đầy, dẫn đến mất thông tin quan trọng. Subagents giúp phân tán workload, mỗi agent có context riêng, tránh overflow và giữ quality.
**Giải thích**: Context window management là yếu tố then chốt trong việc sử dụng Claude Code hiệu quả.
