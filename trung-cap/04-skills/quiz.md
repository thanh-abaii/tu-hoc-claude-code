# Quiz: Agent Skills

## Câu 1
**Câu hỏi**: Agent Skill là gì trong Claude Code?
A. Một prompt ngắn ghi nhớ trong 1 lần hội thoại
B. Khả năng có thể tái sử dụng, dựa trên hệ thống tập tin, mở rộng chức năng Claude
C. Một plugin cài đặt từ marketplace
D. Một subagent đặc biệt
**Đáp án**: B
**Giải thích**: Agent Skills là những khả năng modular, dựa trên hệ thống tập tin, giúp biến các agent đa dụng thành chuyên gia theo lĩnh vực. Khác với prompt, Skills được tải theo yêu cầu và tái sử dụng qua nhiều cuộc hội thoại.

## Câu 2
**Câu hỏi**: Skill hoạt động theo cơ chế "progressive disclosure" nghĩa là gì?
A. Tải toàn bộ nội dung skill ngay khi bắt đầu hội thoại
B. Claude tải thông tin theo từng giai đoạn khi cần
C. Skill tự động hiển thị gợi ý cho người dùng
D. Skill chỉ hoạt động khi có kết nối internet
**Đáp án**: B
**Giải thích**: Progressive disclosure nghĩa là Claude tải thông tin theo từng giai đoạn: (1) metadata luôn được tải, (2) hướng dẫn khi skill được kích hoạt, (3) tài nguyên khi cần thiết.

## Câu 3
**Câu hỏi**: Cấu trúc thư mục của một skill tiêu chuẩn là gì?
A. `.claude/skills/my-skill/SKILL.md`
B. `.claude/skills/my-skill.md`
C. `.claude/commands/my-skill/SKILL.md`
D. `.claude/plugins/my-skill.md`
**Đáp án**: A
**Giải thích**: Skill tiêu chuẩn nằm trong `.claude/skills/my-skill/` với file chính `SKILL.md`. Có thể có thêm tài nguyên `references/`, `scripts/`, `templates/`.

## Câu 4
**Câu hỏi**: Ba cấp độ tải của skill là gì?
A. Prompt, Function, Module
B. Metadata, Hướng dẫn, Tài nguyên
C. Local, Remote, Hybrid
D. Simple, Complex, Advanced
**Đáp án**: B
**Giải thích**: Cấp độ 1 là YAML frontmatter (metadata), Cấp độ 2 là nội dung SKILL.md (hướng dẫn), Cấp độ 3 là các file tài nguyên tham chiếu.

## Câu 5
**Câu hỏi**: Khi nào một skill được kích hoạt?
A. Chỉ khi người dùng gõ lệnh cụ thể
B. Tự động khi mô tả skill khớp với yêu cầu người dùng
C. Chỉ khi có trong system prompt
D. Tự động mỗi 5 phút
**Đáp án**: B
**Giải thích**: Skill được kích hoạt tự động khi metadata (name + description) khớp với yêu cầu của người dùng. Claude Code quét các skill có sẵn và tải skill phù hợp.

## Câu 6
**Câu hỏi**: Sự khác biệt giữa skill và slash command là gì?
A. Slash command mạnh hơn skill
B. Slash command đã được hợp nhất vào skill, skill là cách tiếp cận được khuyến nghị
C. Skill chỉ hoạt động trong headless mode
D. Slash command là tính năng mới hơn
**Đáp án**: B
**Giải thích**: Slash command tùy chỉnh đã được hợp nhất vào skills. File trong `.claude/commands/` vẫn hoạt động nhưng skill được khuyến nghị cho phát triển mới. Khi cả hai tồn tại cùng đường dẫn, skill được ưu tiên.

## Câu 7
**Câu hỏi**: Giới hạn kích thước khuyến nghị cho SKILL.md là bao nhiêu?
A. Dưới 1.000 token
B. Dưới 5.000 token
C. Dưới 20.000 token
D. Không giới hạn
**Đáp án**: B
**Giải thích**: SKILL.md nên dưới 5.000 token để tải hiệu quả. Nếu lớn hơn, nên tách tài liệu bổ sung vào file riêng và tham chiếu từ SKILL.md.

## Câu 8
**Câu hỏi**: Trường nào sau đây KHÔNG có trong YAML frontmatter của SKILL.md?
A. `name`
B. `description`
C. `version`
D. `allow file references`
**Đáp án**: C
**Giải thích**: Frontmatter của SKILL.md chứa `name`, `description`, và tùy chọn `allow file references`. Không có trường `version`.

## Câu 9 (Mở)
**Câu hỏi**: Tại sao nên dùng skill thay vì copy-paste prompt giống nhau mỗi lần?
**Đáp án**: Vì skill giúp (1) giảm lặp lại — tạo 1 lần, dùng tự động qua nhiều cuộc hội thoại; (2) chuẩn hóa khả năng — best practices được tích hợp sẵn; (3) dễ bảo trì — cập nhật 1 chỗ; (4) tái sử dụng qua nhiều dự án và nhóm.
**Giải thích**: Skill là module hóa, trong khi prompt là ephemeral (tồn tại trong 1 hội thoại).

## Câu 10 (Mở)
**Câu hỏi**: Khi nào bạn nên tạo một skill mới? Cho ví dụ cụ thể.
**Đáp án**: Tạo skill khi có quy trình/tác vụ lặp lại nhiều lần. Ví dụ: skill "code-review" tự động check coding standards, review error handling, validate security trước khi merge; hoặc skill "bugfix" giúp debug theo quy trình chuẩn: reproduce → isolate → fix → verify → test.
**Giải thích**: Skill hiệu quả nhất cho các task có quy trình cố định cần lặp lại thường xuyên.
