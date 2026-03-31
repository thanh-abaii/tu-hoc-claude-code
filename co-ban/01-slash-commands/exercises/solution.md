# Giải pháp: Slash Commands

## Bài 1: Tạo slash command đầu tiên

### Bước 1: Tạo thư mục

```bash
mkdir -p .claude/skills/hello
```

### Bước 2: Tạo SKILL.md

Tạo file `.claude/skills/hello/SKILL.md`:

```yaml
---
name: hello
description: Chào hỏi thân thiện người mới học Claude Code
---

# Hello Command

Xin chào! Chào mừng bạn đến với Claude Code!

Hôm nay bạn học gì mới? Minh sẵn sàng hỗ trợ bạn khám phá sức mạnh của Claude Code.

Một số gợi ý để bắt đầu:
- Gõ `/help` để xem danh sách lệnh
- Gõ `/model` để chọn model phù hợp
- Gõ `/skills` để xem các skills khả dụng

Chúc bạn một ngày làm việc hiệu quả!
```

### Giải thích

- `name: hello` — Claude sẽ gọi lệnh này là `/hello`
- `description` — Mô tả ngắn giúp Claude biết khi nào nên gợi ý lệnh này
- Không cần `allowed-tools` vì lệnh này không chạy shell command
- Nội dung markdown là hướng dẫn Claude sẽ tuân theo khi lệnh được gọi

### Kiểm tra

Gõ `/hello` trong Claude Code hoặc kiểm tra `/skills` xem `hello` đã xuất hiện chưa.

---

## Bài 2: Command có arguments

### Bước 1: Tạo thư mục

```bash
mkdir -p .claude/skills/greet
```

### Bước 2: Tạo SKILL.md

Tạo file `.claude/skills/greet/SKILL.md`:

```yaml
---
name: greet
description: Chào người dùng theo tên ca nhan hoa
argument-hint: [ten-nguoi-dung]
---

# Greet Command

Chào $ARGUMENTS!

Rất vui được gặp bạn. Minh là Claude Code, trợ lý AI trong terminal của bạn.

Hôm nay mình có thể giúp gì cho bạn, $ARGUMENTS?
```

### Cách dùng

```
/greet Lan
```

Kết quả:
```
Chào Lan!
Rất vui được gặp bạn. Minh là Claude Code, trợ lý AI trong terminal của bạn.
Hôm nay mình có thể giúp gì cho bạn, Lan?
```

### Giải thích

- `$ARGUMENTS` sẽ được thay thế bằng "Lan" khi người dùng gõ `/greet Lan`
- `argument-hint: [ten-nguoi-dung]` gợi ý trong autocomplete khi người dùng gõ `/greet `

### Nâng cao: Bài 2 với $0 và $1

Dung `$0` và `$1` để tách riêng từng đối số:

```yaml
---
name: greet
description: Chào người dùng với ngôn ngữ tùy chọn
argument-hint: [ten] [ngon-ngu]
---

# Greet Command

Neu ngôn ngữ là "english" thì chào bằng tiếng Anh, ngược lại chào tiếng Việt.

Tên người được chào: $0
Ngôn ngữ được chọn: $1

Hướng dẫn: Nếu $1 là "english" hoặc "en", chào bằng tiếng Anh. Ngược lại, chào bằng tiếng Việt.
```

Cách dùng:
- `/greet Lan` — `$0`="Lan", `$1`="" → chào tiếng Việt
- `/greet Lan english` — `$0`="Lan", `$1`="english" → chào tiếng Anh

---

## Bài 3: Command với dynamic context

### Bước 1: Tạo thư mục

```bash
mkdir -p .claude/skills/today-info
```

### Bước 2: Tạo SKILL.md

Tạo file `.claude/skills/today-info/SKILL.md`:

```yaml
---
name: today-info
description: Hiển thị tổng quan nhanh: ngày giờ, git status, số lượng file
allowed-tools: Bash(date), Bash(git status *), Bash(find *), Bash(wc *)
---

# Today Info — Tổng Quan Dự Án

## Thông tin hệ thống

- Ngày giờ hiện tại: !`date`

## Trạng thái Git

- Trạng thái thay đổi: !`git status --short`

## Thống kê file

- Tổng số file trong project: !`find . -type f -not -path './.git/*' | wc -l`

## Commit gần đây

- 3 commit gần nhất: !`git log --oneline -3`

---

Hãy tóm tắt các thông tin trên và cho người dùng biết tình trạng hiện tại của project.
```

### Giải thích

- `allowed-tools`: Giới hạn các lệnh bash được phép chạy vì lý do bảo mật
  - `Bash(date)` — cho phép chạy lệnh `date`
  - `Bash(git status *)` — cho phép `git status` với mọi tham số
  - `Bash(find *)` — cho phép `find` với mọi tham số
  - `Bash(wc *)` — cho phép `wc` với mọi tham số
- Cú pháp `` !`command` `` thực thi lệnh shell và chèn kết quả vào prompt
- `` !`date` `` — lấy ngày giờ hiện tại
- `` !`git status --short` `` — lấy danh sách file thay đổi dạng tóm tắt
- `` !`find . -type f -not -path './.git/*' | wc -l` `` — đếm file (loại trừ `.git/`)
- `` !`git log --oneline -3` `` — hiển thị 3 commit mới nhất (phần nâng cao)

### Ví dụ đầu ra

Khi người dùng gõ `/today-info`, Claude sẽ nhận được prompt đã được thay thế:

```
# Today Info — Tông Quan Dự Án

## Thông tin hệ thống
- Ngày giờ hiện tại: Tue Mar 31 15:42:10 +07 2026

## Trạng thái Git
- Trạng thái thay đổi:
 M co-ban/01-slash-commands/exercises/solution.md
?? docs/superpowers/specs/2026-03-31-self-learning-design.md

## Thống kê file
- Tông số file trong project: 87

## Commit gần đây
- 3 commit gần nhất: b0345e2 Dự án Tự Học Claude Code — Phiên bản tiếng Việt
                      a1b2c3d Thêm lesson 02
                      d4e5f66 Khởi tạo dự án

---
Hãy tóm tắt các thông tin trên...
```

### Lưu ý khi thử nghiệm

- Đảm bảo bạn đang trong thư mục có git repository
- Nếu không có git, lệnh `` !`git status` `` sẽ báo lỗi — có thể thêm điều kiện kiểm tra
- Có thể đơn giản hóa `allowed-tools` thành `Bash(date), Bash(git *), Bash(find *), Bash(wc *)` để linh hoạt hơn