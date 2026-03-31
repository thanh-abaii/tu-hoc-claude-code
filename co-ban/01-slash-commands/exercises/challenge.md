# Thực hành: Slash Commands

## Bài 1: Tạo slash command đầu tiên

**Mô tả**: Tạo một slash command `/hello` in ra lời chào thân thiện cho người mới học Claude Code.

**Yêu cầu**:
1. Tạo thư mục `.claude/skills/hello/`
2. Tạo file `SKILL.md` với frontmatter đầy đủ (`name`, `description`)
3. Nội dung lời chào ngắn gọn, thân thiện, bằng tiếng Việt
4. Thử gọi lệnh `/hello` trong Claude Code (hoặc kiểm tra `/skills` xem nó đã xuất hiện chưa)

**Mẹo**: Xem lesson để biết cấu trúc frontmatter cần thiết tối thiểu.

---

## Bài 2: Command có arguments

**Mô tả**: Tạo slash command `/greet` nhận vào tên người dùng và chào họ cá nhân hóa.

**Yêu cầu**:
1. Tạo thư mục `.claude/skills/greet/` với file `SKILL.md`
2. Dùng biến `$ARGUMENTS` trong nội dung để lấy tên người dùng
3. Lời chào phải cá nhân hóa theo tên được cung cấp
4. Nếu không có tên, hiển thị lời nhắc người dùng cung cấp
5. Thử nghiệm: `/greet Lan` → chào Lan

**Yêu cầu nâng cao** (tùy chọn): Dùng `$0` để greet một người, `$1` để chỉ định ngôn ngữ chào (Vietnamese/English).

---

## Bài 3: Command với dynamic context

**Mô tả**: Tạo slash command `/today-info` hiển thị tổng quan nhanh về project: ngày giờ hiện tại, trạng thái git, và số lượng file.

**Yêu cầu**:
1. Tạo thư mục `.claude/skills/today-info/` với file `SKILL.md`
2. Dùng cú pháp `` !`command` `` để chạy shell commands:
   - `date` — hiển thị ngày giờ hiện tại
   - `git status --short` — hiển thị trạng thái git tóm tắt
   - `find . -type f -not -path './.git/*' | wc -l` — đếm số file trong project
3. Frontmatter cần có `allowed-tools` cho phép chạy các lệnh bash cần thiết
4. Định dạng đầu ra rõ ràng, dễ đọc

**Yêu cầu nâng cao** (tùy chọn): Thêm `!`git log --oneline -3`` để hiển thị 3 commit gần nhất.

---

## Nộp bài

Gửi kết quả cho người hướng dẫn để review. Đảm bảo:
- Cấu trúc thư mục đúng: `.claude/skills/<ten>/SKILL.md`
- Frontmatter có đầy đủ `name` và `description`
- Command hoạt động khi gõ `/<ten>` trong Claude Code
