# Thực hành: Agent Skills

## Mô tả
Bạn đang xây dựng workflow cho team phát triển. Hãy tạo các skill giúp chuẩn hóa quy trình code review và bug fixing.

## Bài 1: Tạo Skill Code Review

**Yêu cầu:**
1. Tạo thư mục `.claude/skills/code-review/`
2. Viết file `SKILL.md` với:
   - YAML frontmatter: name `code-review`, description mô tả khi nào trigger
   - Nội dung hướng dẫn review: check error handling, security, performance, naming conventions
   - Tham chiếu đến template checklist trong `references/checklist.md`
3. Tạo file `references/checklist.md` với danh sách items cần review

## Bài 2: Tạo Skill Bug Fix

**Yêu cầu:**
1. Tạo thư mục `.claude/skills/bug-fix/`
2. Viết `SKILL.md` với quy trình 5 bước:
   - Reproduce bug
   - Isolate root cause
   - Implement fix
   - Verify fix
   - Add regression test
3. Thêm trường `allow file references` để skill có thể đọc template

## Bài 3: Test Skill

**Yêu cầu:**
1. Trong Claude Code, gõ: "Review file src/auth.py về vấn đề bảo mật"
2. Kiểm tra xem skill code-review có được tự động kích hoạt không
3. Nếu không trigger, điều chỉnh description trong frontmatter để rõ hơn

## Gợi ý bắt đầu
- Description trong frontmatter là yếu tố quan trọng nhất để Claude quyết định trigger skill
- Nội dung SKILL.md nên cụ thể, có quy trình từng bước
- Dùng markdown headers để organize nội dung rõ ràng

## Nộp bài
Gửi kết quả cho @teacher để review
