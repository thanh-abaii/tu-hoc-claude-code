# Changelog

## v1.1.0 — 2026-03-31

### Hệ Thống Tự Học

**Quiz & Exercises (10/10 bài):**
- Tạo quiz.md cho tất cả 10 lessons (8-10 câu mỗi bài, mix multiple choice + open-ended)
- Tạo exercises/challenge.md + solution.md cho tất cả 10 lessons (3 bài tập mỗi lesson)

**Teacher Agent:**
- `.claude/agents/teacher.md` — Giáo viên hướng dẫn với 4 vai trò: Quiz Master, Exercise Giver, Code Reviewer, Hint Provider
- Enforce prerequisite rules: phải pass lesson N mới được mở lesson N+1
- 3 chế độ reset: toàn bộ, rollback N lessons, reset 1 lesson cụ thể

**Progress Tracking:**
- `.learning-progress.md` — Bảng theo dõi tiến độ với quiz score, exercise status, overall status

**Prerequisite Enforcement:**
- Lesson N+1 chỉ unlock khi lesson N hoàn thành (quiz >= 8/10 VÀ exercise ✅)
- Teacher agent kiểm tra tiến độ trước khi cho phép học lesson mới

**Improvements:**
- Đổi tên `Claude How To` → `Tự Học Claude Code` trong tất cả docs
- Thêm `.claude/agents/` vào whitelist gitignore
- README.md cập nhật với hướng dẫn tự học chi tiết

## v1.0.0 — 2026-03-31

### Initial Release — Việt Hóa

- Dịch toàn bộ 10 module tutorial từ tiếng Anh sang tiếng Việt
- Tái cấu trúc thư mục: 3 cấp độ (Cơ Bản, Trung Cấp, Nâng Cao)
- Giữ nguyên commands, code, tên skills/plugins bằng tiếng Anh
- File names: kebab-case, không dấu

**Đóng góp**: Dao Trung Thanh

**Nguồn**: Tổng hợp từ nhiều nguồn
