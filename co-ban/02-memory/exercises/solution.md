# Giải pháp: Memory — Thực hành Memory

## Bài 1: Tạo Personal Memory

### Các bước thực hiện

**Bước 1**: Tạo thư mục `.claude` trong home nếu chưa có.

```bash
mkdir -p ~/.claude
```

**Bước 2**: Tạo file `~/.claude/CLAUDE.md` với nội dung cá nhân.

Ví dụ đầy đủ:

```markdown
# Sở thích phát triển của tôi

## Về tôi
- **Kinh nghiệm**: 3 năm phát triển web
- **Ngôn ngữ yêu thích**: TypeScript, Python, Go
- **Phong cách giao tiếp**: Trực tiếp, ngắn gọn, ưu tiên ví dụ code
- **Trình độ**: Intermediate

## Quy ước Code

### Code Style
- Thụt lề 2 khoảng trắng
- Độ dài dòng tối đa: 100 ký tự
- Tên file: kebab-case (user-service.ts)
- Tên hàm/biến: camelCase (getUserById)
- Tên class: PascalCase (UserService)
- Hằng số: UPPER_SNAKE_CASE (API_BASE_URL)

### Error Handling
- Luôn dùng try-catch cho async code
- Error message phải có ngữ cảnh cụ thể
- Log lỗi với prefix [ERROR] và stack trace

### Testing
- Ưu tiên TDD
- Unit test với Jest
- Test file naming: `*.test.ts`
- Coverage tối thiểu: 80%

### Git Workflow
- Branch: `feature/mo-ta` hoặc `fix/mo-ta`
- Commit message: conventional commits
- PR trước khi merge

## Cấu trúc Project yêu thích
```
project/
├── src/
│   ├── controllers/
│   ├── services/
│   ├── models/
│   └── utils/
├── tests/
├── docs/
└── docker/
```

## Tooling
- **Editor**: VS Code với Vim keybindings
- **Terminal**: Zsh + Oh-My-Zsh
- **Formatter**: Prettier
- **Linter**: ESLint
- **Test**: Jest + React Testing Library
```

**Bước 3**: Kiểm tra kết quả.

```bash
# Kiểm tra file đã tồn tại
cat ~/.claude/CLAUDE.md

# Trong Claude Code, chạy lệnh:
/memory
# Chọn "User Memory" để xem nội dung
```

---

## Bài 2: Tạo Project Memory

### Các bước thực hiện

**Cách 1: Dùng `/init`**

Trong Claude Code, tại thư mục `myproject`:

```
/init
```

Claude sẽ tự động tạo `.claude/CLAUDE.md` với template. Sau đó chỉnh sửa bổ sung.

**Cách 2: Tạo thủ công**

```bash
mkdir -p .claude
touch .claude/CLAUDE.md
```

Tạo nội dung file `.claude/CLAUDE.md`:

```markdown
# Dự án Tự Học Claude Code

## Project Overview
- **Tên**: Claude Code Self-Learning Tutorial (Tiếng Việt)
- **Mục tiêu**: Hướng dẫn sử dụng Claude Code từ cơ bản đến nâng cao
- **Ngôn ngữ tài liệu**: Tiếng Việt
- **Cấu trúc**: 3 cấp độ (Cơ bản, Trung cấp, Nâng cao)

## Cấu trúc Thư mục
```
myproject/
├── co-ban/          # Bài học cơ bản (01-10)
│   ├── 01-slash-commands/
│   ├── 02-memory/
│   ├── 03-hooks/
│   └── ...
├── trung-cap/       # Bài học trung cấp
├── nang-cao/        # Bài học nâng cao
├── docs/            # Tài liệu tham khảo
└── .claude/         # Project memory & rules
    ├── CLAUDE.md    # File này
    └── rules/       # Quy tắc mô-đun
```

## Quy ước
- **Tên file bài học**: `lesson.md`, `quiz.md`, `challenge.md`
- **Tên thư mục bài học**: `<số>-<tên-chủ-đề>` (02-memory)
- **Branch git**: `feature/<chu-de-bai-hoc>`
- **Commit message**: conventional commits
  - `feat(thu-muc): mô tả thay đổi`
  - `docs(thu-muc): cập nhật tài liệu`

## Tài liệu Tham khảo (Import)
@docs/architecture.md
@docs/api-standards.md

## Lệnh thường dùng
| Lệnh | Mục đích |
|------|----------|
| `npm run dev` | Chạy development server |
| `/init` | Khởi tạo memory dự án |
| `/memory` | Chỉnh sửa memory file |

## Best Practices
- Không lưu secrets trong CLAUDE.md
- Commit project memory vào git
- Cập nhật memory khi có thay đổi lớn
- Sử dụng import thay vì copy nội dung
```

**Bước 3**: Commit vào git.

```bash
git add .claude/CLAUDE.md
git commit -m "feat(memory): thêm project memory cho tutorial"
```

---

## Bài 3: Test Directory API Memory

### Các bước thực hiện

**Bước 1**: Tạo thư mục rules.

```bash
mkdir -p .claude/rules
```

**Bước 2**: Tạo `code-style.md`.

```bash
cat > .claude/rules/code-style.md << 'EOF'
# Quy tắc Code Style

## Chung
- Thụt lề 2 khoảng trắng
- Độ dài dòng tối đa: 100 ký tự
- Sử dụng Prettier để format
- File kết thúc bằng dòng trống

## TypeScript/JavaScript
- Dùng `async/await`, tránh promise chains
- Ưu tiên `const` > `let`, tránh `var`
- Arrow function cho callback
- Strict TypeScript mode trong tsconfig

## Markdown (tài liệu tutorial)
- Tiêu đề: Title Case
- Code block luôn chỉ định ngôn ngữ
- Link tương đối cho tài liệu trong project
EOF
```

**Bước 3**: Tạo `testing.md`.

```bash
cat > .claude/rules/testing.md << 'EOF'
# Quy tắc Testing

## Unit Testing
- Framework: Jest
- File naming: `*.test.ts`
- Arrange-Act-Assert pattern
- Mock external dependencies

## Coverage
- Tối thiểu 80%
- 100% cho critical paths
- Đo coverage với `npm test -- --coverage`

## Integration Testing
- Test API endpoints hoàn chỉnh
- Dùng test database riêng
- Cleanup sau mỗi test
EOF
```

**Bước 4**: Tạo `markdown-rules.md` với YAML frontmatter.

```bash
cat > .claude/rules/markdown-rules.md << 'EOF'
---
paths: co-ban/**/*.md
---

# Quy tắc Markdown cho Bài học Cơ bản

## Cấu trúc Bài học
Mỗi lesson.md phải có:
1. Tiêu đề bài học
2. Mục tiêu học tập
3. Nội dung chính (lý thuyết + ví dụ)
4. Link đến quiz và exercises
5. Link đến bài tiếp theo

## Định dạng
- Luôn có bảng tóm tắt lệnh khi phù hợp
- Code example phải có kết quả mong đợi
- Sử dụng emoji sparingly cho điểm nhấn
- Hình ảnh lưu trong cùng thư mục bài học

## Quiz
- 8-10 câu hỏi
- Mix multiple choice và open-ended
- Có đáp án và giải thích
EOF
```

**Bước 5**: Tạo directory-specificCLAUDE.md cho module memory.

```bash
cat > co-ban/02-memory/CLAUDE.md << 'EOF'
# Memory Module Standards

File này override root CLAUDE.md cho thư mục `co-ban/02-memory/`.

## Quy tắc riêng cho Module Memory
- Mỗi bài học về memory phải bao gồm:
  - Ví dụ thực tế với screenshot minh họa
  - So sánh table giữa các loại memory
  - Mermaid diagram minh họa kiến trúc
- Quiz phải đạt 8/10 để pass
- Exercises phải có solution chi tiết

## Tài liệu Tham chiếu
Xem @../../docs/memory-reference.md cho chi tiết kỹ thuật
EOF
```

**Bước 6**: Kiểm tra cấu trúc.

```bash
# Xem cấu trúc thư mục
find .claude/rules -type f
# Xem directory CLAUDE.md
cat co-ban/02-memory/CLAUDE.md
```

Kết quả mong đợi:
```
.claude/rules/
├── code-style.md
├── testing.md
└── markdown-rules.md   # Có frontmatter paths: co-ban/**/*.md
```

**Bước 7**: Kiểm tra trong Claude Code.

Mở Claude Code tại `myproject` và hỏi:
```
Hiển thị các memory đang được tải và rules đang active
```

Claude sẽ liệt kê:
- Project Memory từ `.claude/CLAUDE.md`
- Rules từ `.claude/rules/*.md`
- Directory-specific memory từ `co-ban/02-memory/CLAUDE.md`
- markdown-rules.md chỉ active khi làm việc với file `co-ban/**/*.md`

**Bước 8**: Commit.

```bash
git add .claude/rules/ co-ban/02-memory/CLAUDE.md
git commit -m "feat(memory): thêm directory-specific rules và module override"
```

---

## Lưu ý Chung

- Tất cả file trên là ví dụ mẫu. Hãy điều chỉnh theo thông tin thực tế của bạn.
- Không commit secrets, API keys vào CLAUDE.md.
- Sử dụng `.gitignore` cho `CLAUDE.local.md` nếu dùng.
- Review định kỳ và cập nhật memory khi dự án thay đổi.
