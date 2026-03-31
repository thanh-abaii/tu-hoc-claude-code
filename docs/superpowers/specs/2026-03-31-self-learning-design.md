# Design: Tự Học Claude Code — Self-Learning Experience

**Date**: 2026-03-31
**Status**: Ready for user review
**Author**: Claude Code + Dao Trung Thanh brainstorm

## Overview

Biến dự án tutorial markdown hiện tại thành trải nghiệm tự học thực sự, với quiz, bài tập thực hành, agent teacher hỗ trợ, và progress tracking.

**Target audience:** Cả người mới bắt đầu (cần hướng dẫn chi tiết từ đầu) và developer có kinh nghiệm (muốn học nhanh, sâu qua skills, subagents, hooks).

**Approach:** Pure Markdown + Skills — không cần code thêm, tận dụng Claude Code có sẵn.

## Architecture

```
co-ban/01-slash-commands/
├── lesson.md          # Nội dung học (rename từ README.md)
├── quiz.md            # 8-10 câu hỏi tự kiểm tra
├── exercises/
│   ├── challenge.md   # Đề bài thực hành
│   └── solution.md    # Đáp án tham khảo
...

trung-cap/04-skills/
├── lesson.md
├── quiz.md
├── exercises/
│   ├── challenge.md
│   └── solution.md
...

nang-cao/08-hooks/
├── lesson.md
├── quiz.md
├── exercises/
│   ├── challenge.md
│   └── solution.md
...

.claude/agents/
└── teacher.md         # Agent giáo viên

.learning-progress.md  # File theo dõi tiến độ học tập
README.md              # Trang chủ với lộ trình học rõ ràng
```

## Components

### 1. Lesson Content (`lesson.md`)

Mỗi lesson được rename từ `README.md` → `lesson.md`. Nội dung giữ nguyên (đã dịch tiếng Việt).

**Quy định học tập:**
- Người học đọc từ lesson 01 → 10 theo thứ tự
- Phải pass quiz (80%+) trước khi qua lesson tiếp theo
- Làm exercises sau khi đọc xong lesson
- Có thể xem solution sau khi đã làm xong hoặc bí quá lâu

### 2. Quiz (`quiz.md`)

Mỗi lesson có file `quiz.md` với 8-10 câu hỏi, mix multiple choice và open-ended.

**Format:**
```markdown
# Quiz: [Tên lesson]

## Câu 1
**Câu hỏi**: Slash command là gì?
**Đáp án**: A. Phím tắt điều khiển hành vi Claude
**Giải thích**: Slash commands là các lệnh bắt đầu bằng / giúp...

## Câu 2
**Câu hỏi**: ...
**Đáp án**: ...
**Giải thích**: ...
```

**Sử dụng:** Dùng `/lesson-quiz` skill để quiz người học, hoặc agent teacher tự quiz.

### 3. Exercises (`exercises/challenge.md` + `exercises/solution.md`)

**Challenge format:**
```markdown
# Thực hành: [Tên challenge]

## Mô tả
[Tính huống thực tế]

## Yêu cầu
1. Tạo skill /my-command để...
2. Viết hook để...

## Gợi ý bắt đầu
[Tips nhỏ, không cho code mẫu]

## Nộp bài
Gửi kết quả cho @teacher để review
```

**Solution format:**
```markdown
# Giải pháp: [Tên challenge]

## Bước 1: Tạo thư mục
mkdir -p .claude/skills/my-command

## Bước 2: Viết SKILL.md
...(code hoàn chỉnh)

## Giải thích
Tại sao làm thế này...
```

### 4. Teacher Agent (`.claude/agents/teacher.md`)

Agent giáo viên với 4 khả năng:

#### 4.1 Quiz Master
**Trigger:** `@teacher quiz 01` hoặc `@teacher kiểm tra bài cũ 01`

- Đọc file `co-ban/01-slash-commands/quiz.md`
- Hỏi từng câu một, chờ người học trả lời
- Chấm điểm, giải thích đáp án đúng/sai

#### 4.2 Exercise Giver
**Trigger:** `@teacher bài tập 01` hoặc `@teacher cho tôi bài tập`

- Đọc `co-ban/01-slash-commands/exercises/challenge.md`
- Present đề bài + file cần chỉnh sửa
- Theo dõi tiến độ, gợi ý khi cần

#### 4.3 Code Reviewer
**Trigger:** `@teacher review` hoặc `@teacher xem bài tôi làm`

- Đọc file người học vừa làm
- So với solution (không reveal ngay)
- Cho feedback: "Bạn làm đúng phần X, nhưng sai phần Y. Hãy thử lại với gợi ý: ..."

#### 4.4 Hint Provider
**Trigger:** `@teacher gợi ý` hoặc `@teacher hint`

- Cấp hint theo 3 level: nhẹ → trung bình → chi tiết
- **Luôn giữ nguyên tắc**: không cho đáp án trừ khi người học yêu cầu rõ ràng

**Agent file format:**
```yaml
---
name: teacher
description: Giáo viên hướng dẫn Claude Code — quiz, review bài tập, gợi ý
---

# Teacher Agent

Bạn là giáo viên hướng dẫn học Claude Code. Bạn có 4 vai trò:

1. **Quiz Master**: Kiểm tra kiến thức qua quiz
2. **Exercise Giver**: Ra bài tập thực hành
3. **Code Reviewer**: Review code người học
4. **Hint Provider**: Gợi ý khi người học bí

## Quy tắc cốt lõi
- Không cho đáp án trực tiếp (trừ khi được yêu cầu rõ ràng)
- Luôn khen trước khi chê
- Gợi ý → chờ người học thử → mới cho thêm hint
- Nếu người học nói "cho tôi đáp án" — đưa giải thích chi tiết thay vì copy-paste từ solution
- Luôn khuyến khích người học tự làm trước khi xem solution

## Cách hoạt động

### Khi người học nói "quiz [số lesson]"
1. Đọc file `quiz.md` tương ứng
2. Hỏi từng câu, chờ trả lời
3. Chấm điểm, giải thích

### Khi người học nói "bài tập [số lesson]"
1. Đọc `exercises/challenge.md` tương ứng
2. Present đề bài
3. Chờ người học làm
4. Review khi có kết quả

### Khi người học nói "review" hoặc "gợi ý"
1. Hiểu context hiện tại
2. Cho feedback cụ thể
3. Gợi ý cải thiện
```

### 5. Progress Tracking (`.learning-progress.md`)

File markdown đơn giản theo dõi tiến độ:

```markdown
# Tiến Độ Học Tập

| Lesson | Tên | Quiz Score | Bài tập | Trạng thái |
|--------|-----|-----------|---------|-----------|
| 01 | Slash Commands | 9/10 | ✅ | Hoàn thành |
| 02 | Memory | 8/10 | 🔄 Đang làm | Đang học |
| 03 | CLI | — | — | Chưa bắt đầu |
| 04 | Skills | — | — | Chưa bắt đầu |
| 05 | Subagents | — | — | Chưa bắt đầu |
| 06 | MCP | — | — | Chưa bắt đầu |
| 07 | Plugins | — | — | Chưa bắt đầu |
| 08 | Hooks | — | — | Chưa bắt đầu |
| 09 | Checkpoints | — | — | Chưa bắt đầu |
| 10 | Advanced | — | — | Chưa bắt đầu |

> Ghi chú: Cập nhật tiến độ thủ công hoặc nhờ @teacher update giúp.
```

## Implementation Plan

### Phase 1: Infrastructure
1. Rename `README.md` → `lesson.md` cho mỗi lesson
2. Tạo cấu trúc thư mục `exercises/` cho tất cả 10 lessons
3. Tạo `.claude/agents/teacher.md`
4. Tạo `.learning-progress.md`

### Phase 2: Content Generation
1. Tạo `quiz.md` cho 3 lessons đầu (01, 02, 03)
2. Tạo `exercises/challenge.md` + `solution.md` cho 3 lessons đầu
3. Test quiz + exercises

### Phase 3: Remaining Content
1. Tạo quiz + exercises cho lessons 04-10
2. Test đầy đủ flow học tập

## Success Criteria

- Người học mới có thể: đọc lesson → làm quiz → làm bài tập → nhận review
- Teacher agent hoạt động đúng 4 vai trò
- Không cần code thêm — chỉ markdown + agent config
- Progress tracking hoạt động

## Related Documents
- Spec brainstorming notes
- Vietnamese refactor design (2026-03-31)
