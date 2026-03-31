# Vietnamese Claude Code Tutorial Refactor Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Chuyển toàn bộ 10 module tutorial Claude Code sang tiếng Việt, tổ chức lại cấu trúc 3 level (co-ban, trung-cap, nang-cao), giữ nguyên lệnh/code bằng tiếng Anh.

**Architecture:** Di chuyển file từ thư mục cũ sang thư mục mới, dịch nội dung văn bản sang tiếng Việt, quy hoạch file names theo kebab-case không dấu, tạo README.md mới cho mỗi topic.

**Tech Stack:** Markdown, Bash (mv, mkdir), Git

---

## File Structure Overview

### Files to CREATE (new directories + translated content):
- `co-ban/01-slash-commands/README.md`
- `co-ban/02-memory/README.md`
- `co-ban/03-cli/README.md`
- `trung-cap/04-skills/README.md`
- `trung-cap/05-subagents/README.md`
- `trung-cap/06-mcp/README.md`
- `trung-cap/07-plugins/README.md`
- `nang-cao/08-hooks/README.md`
- `nang-cao/09-checkpoints/README.md`
- `nang-cao/10-advanced/README.md`
- `README.md` (root — Vietnamese project intro)
- Plus all lesson/practice files within each topic

### Files to MOVE + TRANSLATE:
- All `.md` files from `01-*/` → `co-ban/01-slash-commands/`
- All `.md` files from `02-*` → `co-ban/02-memory/`
- All `.md` files from `10-*` → `co-ban/03-cli/`
- All `.md` files from `03-*` → `trung-cap/04-skills/`
- All `.md` files from `04-*` → `trung-cap/05-subagents/`
- All `.md` files from `05-*` → `trung-cap/06-mcp/`
- All `.md` files from `06-*` → `nang-cao/08-hooks/`
- All `.md` files from `07-*` → `trung-cap/07-plugins/`
- All `.md` files from `08-*` → `nang-cao/09-checkpoints/`
- All `.md` files from `09-*` → `nang-cao/10-advanced/`

### Files to DELETE after move:
- Original `01-*` through `10-*` directories

### Files UNCHANGED:
- `CLAUDE.md` (keep English)
- `docs/` (keep English)
- `.claude/` (keep as-is, config files)
- `scripts/` (keep as-is)
- `practice/`, `practice-auth/` (keep as-is)

---

### Task 1: Prepare directory structure + move files

**Files:**
- Create: `co-ban/01-slash-commands/`
- Create: `co-ban/02-memory/`
- Create: `co-ban/03-cli/`
- Create: `trung-cap/04-skills/`
- Create: `trung-cap/05-subagents/`
- Create: `trung-cap/06-mcp/`
- Create: `trung-cap/07-plugins/`
- Create: `nang-cao/08-hooks/`
- Create: `nang-cao/09-checkpoints/`
- Create: `nang-cao/10-advanced/`

- [ ] **Step 1: Create all new directories**

Run:
```bash
cd /home/dtthanh/tu-hoc-claude-code/myproject

mkdir -p co-ban/01-slash-commands
mkdir -p co-ban/02-memory
mkdir -p co-ban/03-cli
mkdir -p trung-cap/04-skills
mkdir -p trung-cap/05-subagents
mkdir -p trung-cap/06-mcp
mkdir -p trung-cap/07-plugins
mkdir -p nang-cao/08-hooks
mkdir -p nang-cao/09-checkpoints
mkdir -p nang-cao/10-advanced
```

- [ ] **Step 2: Move 01-slash-commands files**

Run:
```bash
cp -r 01-slash-commands/* co-ban/01-slash-commands/
```

- [ ] **Step 3: Move 02-memory files**

Run:
```bash
cp -r 02-memory/* co-ban/02-memory/
```

- [ ] **Step 4: Move 10-cli files**

Run:
```bash
cp -r 10-cli/* co-ban/03-cli/
```

- [ ] **Step 5: Move 03-skills files**

Run:
```bash
cp -r 03-skills/* trung-cap/04-skills/
```

- [ ] **Step 6: Move 04-subagents files**

Run:
```bash
cp -r 04-subagents/* trung-cap/05-subagents/
```

- [ ] **Step 7: Move 05-mcp files**

Run:
```bash
cp -r 05-mcp/* trung-cap/06-mcp/
```

- [ ] **Step 8: Move 07-plugins files**

Run:
```bash
cp -r 07-plugins/* trung-cap/07-plugins/
```

- [ ] **Step 9: Move 06-hooks files**

Run:
```bash
cp -r 06-hooks/* nang-cao/08-hooks/
```

- [ ] **Step 10: Move 08-checkpoints files**

Run:
```bash
cp -r 08-checkpoints/* nang-cao/09-checkpoints/
```

- [ ] **Step 11: Move 09-advanced-features files**

Run:
```bash
cp -r 09-advanced-features/* nang-cao/10-advanced/
```

- [ ] **Step 12: Verify all files moved**

Run:
```bash
echo "=== co-ban ===" && find co-ban -type f -name "*.md" | sort
echo "=== trung-cap ===" && find trung-cap -type f -name "*.md" | sort
echo "=== nang-cao ===" && find nang-cao -type f -name "*.md" | sort
```

Expected: All original files should appear in new locations.

- [ ] **Step 13: Commit file structure**

```bash
git add co-ban/ trung-cap/ nang-cao/
git commit -m "refactor: move tutorial directories to 3-level structure

Copied all 10 tutorial modules into new structure:
- co-ban/ (01-slash-commands, 02-memory, 03-cli)
- trung-cap/ (04-skills, 05-subagents, 06-mcp, 07-plugins)
- nang-cao/ (08-hooks, 09-checkpoints, 10-advanced)

Content is still English, translation follows."
```

---

### Task 2: Translate co-ban/01-slash-commands/ README.md + lesson files

**Files:**
- Modify: `co-ban/01-slash-commands/README.md`
- Modify: `co-ban/01-slash-commands/commit.md`
- Modify: `co-ban/01-slash-commands/pr.md`
- Modify: `co-ban/01-slash-commands/optimize.md`
- Modify: `co-ban/01-slash-commands/generate-api-docs.md`
- Modify: `co-ban/01-slash-commands/doc-refactor.md`
- Modify: `co-ban/01-slash-commands/setup-ci-cd.md`
- Modify: `co-ban/01-slash-commands/unit-test-expand.md`
- Modify: `co-ban/01-slash-commands/push-all.md`

**Translation rules for this topic:**
- All headings, body text, tables → Vietnamese
- Commands like `/commit`, `/pr`, `/help` → keep English
- Code blocks: comments in code → Vietnamese, code itself → English
- Built-in commands table: translate the "Purpose" column, keep "Command" column as-is
- File paths like `.claude/skills/` → keep as-is
- Internal links: update to `../trung-cap/04-skills/`, `../../co-ban/02-memory/` etc.
- External URLs: keep as-is
- Remove logo/picture references if logo file doesn't exist

- [ ] **Step 1: Translate README.md — title, overview, built-in commands section**

```markdown
<!-- co-ban/01-slash-commands/README.md — top section -->

# Slash Commands — Lệnh Gạch Chéo

## Tổng quan

Slash commands là các phím tắt điều khiển hành vi của Claude trong phiên tương tác. Có nhiều loại:

- **Built-in commands**: Claude Code cung cấp sẵn (`/help`, `/clear`, `/model`)
- **Skills**: Lệnh tùy chỉnh tạo từ file `SKILL.md` (`/optimize`, `/pr`)
- **Plugin commands**: Từ plugin đã cài (`/frontend-design:frontend-design`)
- **MCP prompts**: Từ MCP server (`/mcp__github__list_prs`)

> **Lưu ý**: Custom slash commands đã được hợp nhất vào skills. File trong `.claude/commands/` vẫn hoạt động, nhưng skills (`.claude/skills/`) là cách tiếp cận được khuyến nghị. Xem [Hướng dẫn Skills](../../trung-cap/04-skills/) để biết chi tiết.
```

- [ ] **Step 2: Translate Built-in Commands Reference table**

Translate the "Purpose" column of the 55+ built-in commands table to Vietnamese. Example rows:

| Command | Mục đích |
|---------|----------|
| `/add-dir <path>` | Thêm thư mục làm việc |
| `/agents` | Quản lý cấu hình agent |
| `/branch [name]` | Tách hội thoại sang phiên mới (bí danh: `/fork`). Lưu ý: `/fork` đổi tên thành `/branch` trong v2.1.77 |
| `/btw <question>` | Hỏi phụ không thêm vào lịch sử |
| `/clear` | Xóa hội thoại hiện tại (bí danh: `/reset`, `/new`) |
| `/compact [instructions]` | Nén hội thoại với hướng dẫn tùy chọn |
| `/config` | Mở Settings (bí danh: `/settings`) |
| `/cost` | Hiển thị thống kê token |
| `/exit` | Thoát REPL (bí danh: `/quit`) |
| `/help` | Hiển thị trợ giúp |
| `/memory` | Chỉnh sửa `CLAUDE.md`, bật/tắt auto-memory |
| `/model [model]` | Chọn model |
| `/plugin` | Quản lý plugins |
| `/rewind` | Quay lại hội thoại và/hoặc code (bí danh: `/checkpoint`) |
| `/tasks` | Liệt kê/quản lý background tasks |
... (translate ALL rows)

- [ ] **Step 3: Translate Bundled Skills, Deprecated Commands, Recent Changes sections**

Translate all table content and list items to Vietnamese. Keep command names in English.

Example:
```markdown
### Skill Đi Kèm

| Skill | Mục đích |
|-------|----------|
| `/batch <instruction>` | Điều phối thay đổi song song quy mô lớn dùng worktrees |
...

### Lệnh Đã Ngừng Hỗ Trợ

| Lệnh | Trạng thái |
|------|------------|
| `/review` | Đã ngừng — thay bằng plugin `code-review` |
...

### Thay Đổi Gần Đây

- `/fork` đổi tên thành `/branch` với `/fork` giữ làm bí danh (v2.1.77)
- ...
```

- [ ] **Step 4: Translate "Custom Commands (Now Skills)" section**

```markdown
## Lệnh Tùy Chỉnh (Bây Giờ Là Skills)

Custom slash commands đã được **hợp nhất vào skills**. Cả hai cách đều tạo lệnh gọi bằng `/command-name`:

| Cách | Vị trí | Trạng thái |
|------|--------|------------|
| **Skills (Khuyến nghị)** | `.claude/skills/<name>/SKILL.md` | Tiêu chuẩn hiện tại |
| **Legacy Commands** | `.claude/commands/<name>.md` | Vẫn hoạt động |
```

Translate all remaining sections: Migration Path, Why Skills, Creating a Custom Command, Frontmatter Reference, Arguments, Dynamic Context, File References, Plugin Commands, MCP Prompts, Command Architecture diagram (keep mermaid code as-is, translate labels), Command Lifecycle (same), Available Commands list (translate descriptions), Installation section, Creating Your Own Commands templates, Best Practices table (translate), Troubleshooting (translate), Related Guides (translate + update links).

- [ ] **Step 5: Translate individual command files**

For each file (`commit.md`, `pr.md`, `optimize.md`, etc.), translate all explanatory text to Vietnamese. Keep:
- YAML frontmatter keys (name, description, allowed-tools, etc.) as English
- The `description` field value: can be Vietnamese or English (English recommended since it's for Claude auto-invocation)
- All code blocks: keep code, translate comments

Example for `commit.md`:
```markdown
---
name: commit
description: Create a git commit with context
allowed-tools: Bash(git *), Bash(grep *), Read
---

# /commit — Tạo Git Commit Với Ngữ Cảnh

Tạo một git commit với ngữ cảnh động từ repository của bạn.

## Usage

```
/commit [tùy chọn tin nhắn]
```
...
```

- [ ] **Step 6: Update internal cross-references**

In all files under `co-ban/01-slash-commands/`, update links:
- `../03-skills/` → `../../trung-cap/04-skills/`
- `../02-memory/` → `../../co-ban/02-memory/`
- `../04-subagents/` → `../../trung-cap/05-subagents/`
- `../07-plugins/` → `../../trung-cap/07-plugins/`
- `../06-hooks/` → `../../nang-cao/08-hooks/`
- `../` → `../../`

- [ ] **Step 7: Commit**

```bash
git add co-ban/01-slash-commands/
git commit -m "feat(vi): dịch slash-commands sang tiếng Việt

- Dịch README.md + 8 file lệnh sang tiếng Việt
- Cập nhật internal links sang cấu trúc mới
- Giữ nguyên commands, code, file names bằng tiếng Anh"
```

---

### Task 3: Translate co-ban/02-memory/

**Files:**
- Modify: `co-ban/02-memory/README.md`
- Modify: `co-ban/02-memory/directory-api-CLAUDE.md`
- Modify: `co-ban/02-memory/personal-CLAUDE.md`
- Modify: `co-ban/02-memory/project-CLAUDE.md`

**Rename files (no diacritics, kebab-case):**
- `directory-api-CLAUDE.md` → `directory-api.md`
- `personal-CLAUDE.md` → `personal.md`
- `project-CLAUDE.md` → `project.md`

- [ ] **Step 1: Rename files**

```bash
cd co-ban/02-memory
mv directory-api-CLAUDE.md directory-api.md
mv personal-CLAUDE.md personal.md
mv project-CLAUDE.md project.md
```

- [ ] **Step 2: Translate README.md — Memory Guide**

Translate all content to Vietnamese:
- Overview, How memory works, Types of memory sections
- Table of memory types: translate descriptions
- `CLAUDE.md` file structure explanations
- Code examples: keep English, translate comments
- Best practices, limitations, troubleshooting

Update internal links:
- `../03-skills/` → `../../trung-cap/04-skills/`
- `../01-slash-commands/` → `../../co-ban/01-slash-commands/`

- [ ] **Step 3: Translate lesson files**

Translate `directory-api.md`, `personal.md`, `project.md`:
- All explanatory text → Vietnamese
- JSON/YAML examples → keep English
- `@memory` references → keep as-is
- Code comments → Vietnamese

- [ ] **Step 4: Update cross-references in other lesson files**

Search for `../02-memory/` across `co-ban/` and update to `../02-memory/` (relative links within co-ban should use `../02-memory/`).

- [ ] **Step 5: Commit**

```bash
git add co-ban/02-memory/
git commit -m "feat(vi): dịch memory guide sang tiếng Việt

- Dịch 4 file memory nội dung sang tiếng Việt
- Đổi tên file: bỏ CLAUDE.md suffix, dùng kebab-case"
```

---

### Task 4: Translate co-ban/03-cli/ (from original 10-cli)

**Files:**
- Modify: `co-ban/03-cli/README.md`

- [ ] **Step 1: Translate README.md — CLI Reference**

Translate all content to Vietnamese:
- CLI flags reference table (`--print`, `--max-turns`, `--model`, etc.)
- Usage examples: keep commands, translate explanations
- Output format options
- Integration examples with scripts
- Keep all actual CLI flag names (`--print`, `-p`, `--output-format`) in English

Update internal links to new structure.

- [ ] **Step 2: Commit**

```bash
git add co-ban/03-cli/
git commit -m "feat(vi): dịch CLI reference sang tiếng Việt"
```

---

### Task 5: Translate trung-cap/04-skills/

**Files:**
- Modify: `trung-cap/04-skills/README.md`
- Modify: `trung-cap/04-skills/blog-draft/SKILL.md`
- Modify: `trung-cap/04-skills/blog-draft/templates/draft-template.md`
- Modify: `trung-cap/04-skills/blog-draft/templates/outline-template.md`
- Modify: `trung-cap/04-skills/brand-voice/SKILL.md`
- Modify: `trung-cap/04-skills/brand-voice/tone-examples.md`
- Modify: `trung-cap/04-skills/claude-md/SKILL.md`
- Modify: `trung-cap/04-skills/code-review/SKILL.md`
- Modify: `trung-cap/04-skills/code-review/templates/finding-template.md`
- Modify: `trung-cap/04-skills/code-review/templates/review-checklist.md`
- Modify: `trung-cap/04-skills/doc-generator/SKILL.md`
- Modify: `trung-cap/04-skills/refactor/SKILL.md`
- Modify: `trung-cap/04-skills/refactor/references/code-smells.md`
- Modify: `trung-cap/04-skills/refactor/references/refactoring-catalog.md`
- Modify: `trung-cap/04-skills/refactor/templates/refactoring-plan.md`

- [ ] **Step 1: Translate README.md — Skills Guide**

Translate all explanatory text to Vietnamese:
- What are skills, how they work
- SKILL.md structure and frontmatter
- Auto-invocation, user-invocable, progressive disclosure
- Code examples: keep code, translate comments
- Update internal links

- [ ] **Step 2: Translate each skill directory**

For each skill (`blog-draft/`, `brand-voice/`, `claude-md/`, `code-review/`, `doc-generator/`, `refactor/`):
- Translate `SKILL.md` frontmatter: keep YAML keys, translate `description` and body text
- Translate all `.md` files in `templates/` and `references/` subdirectories
- Keep SKILL.md `name` field in English (it becomes the slash command)

- [ ] **Step 3: Commit**

```bash
git add trung-cap/04-skills/
git commit -m "feat(vi): dịch skills guide sang tiếng Việt

- Dịch README.md + 6 skill directories
- Giữ nguyên skill names (tên lệnh) bằng tiếng Anh"
```

---

### Task 6: Translate trung-cap/05-subagents/

**Files:**
- Modify: `trung-cap/05-subagents/README.md`
- Modify: `trung-cap/05-subagents/clean-code-reviewer.md`
- Modify: `trung-cap/05-subagents/code-reviewer.md`
- Modify: `trung-cap/05-subagents/data-scientist.md`
- Modify: `trung-cap/05-subagents/debugger.md`
- Modify: `trung-cap/05-subagents/documentation-writer.md`
- Modify: `trung-cap/05-subagents/implementation-agent.md`
- Modify: `trung-cap/05-subagents/secure-reviewer.md`
- Modify: `trung-cap/05-subagents/test-engineer.md`

**Rename files (remove hyphens from agent types where applicable):**
- Keep file names as-is (they are already kebab-case English)
- Example: `clean-code-reviewer.md` stays as-is

- [ ] **Step 1: Translate README.md — Subagents Guide**

Translate:
- What are subagents, when to use them
- Agent types, configuration, examples
- Update internal links
- Keep agent type names in English

- [ ] **Step 2: Translate each agent file**

For each `.md` file:
- Translate descriptions, instructions, example configurations
- Keep agent `name` fields in English
- Keep YAML frontmatter keys in English

- [ ] **Step 3: Commit**

```bash
git add trung-cap/05-subagents/
git commit -m "feat(vi): dịch subagents guide sang tiếng Việt"
```

---

### Task 7: Translate trung-cap/06-mcp/

**Files:**
- Modify: `trung-cap/06-mcp/README.md`

- [ ] **Step 1: Translate README.md — MCP Guide**

Translate:
- What is MCP, how it works
- MCP server configuration
- Examples of MCP tool usage
- Keep all MCP server names, tool names in English
- Update internal links

- [ ] **Step 2: Commit**

```bash
git add trung-cap/06-mcp/
git commit -m "feat(vi): dịch MCP guide sang tiếng Việt"
```

---

### Task 8: Translate trung-cap/07-plugins/

**Files:**
- Modify: `trung-cap/07-plugins/README.md`
- Modify: `trung-cap/07-plugins/devops-automation/README.md`
- Modify: `trung-cap/07-plugins/devops-automation/agents/alert-analyzer.md`
- Modify: `trung-cap/07-plugins/devops-automation/agents/deployment-specialist.md`
- Modify: `trung-cap/07-plugins/devops-automation/agents/incident-commander.md`
- Modify: `trung-cap/07-plugins/devops-automation/commands/deploy.md`
- Modify: `trung-cap/07-plugins/devops-automation/commands/incident.md`
- Modify: `trung-cap/07-plugins/devops-automation/commands/rollback.md`
- Modify: `trung-cap/07-plugins/devops-automation/commands/status.md`
- Modify: `trung-cap/07-plugins/documentation/README.md`
- Modify: `trung-cap/07-plugins/documentation/agents/api-documenter.md`
- Modify: `trung-cap/07-plugins/documentation/agents/code-commentator.md`
- Modify: `trung-cap/07-plugins/documentation/agents/example-generator.md`
- Modify: `trung-cap/07-plugins/documentation/commands/generate-api-docs.md`
- Modify: `trung-cap/07-plugins/documentation/commands/generate-readme.md`
- Modify: `trung-cap/07-plugins/documentation/commands/sync-docs.md`
- Modify: `trung-cap/07-plugins/documentation/commands/validate-docs.md`
- Modify: `trung-cap/07-plugins/documentation/templates/adr-template.md`
- Modify: `trung-cap/07-plugins/documentation/templates/api-endpoint.md`
- Modify: `trung-cap/07-plugins/documentation/templates/function-docs.md`
- Modify: `trung-cap/07-plugins/pr-review/README.md`
- Modify: `trung-cap/07-plugins/pr-review/agents/performance-analyzer.md`
- Modify: `trung-cap/07-plugins/pr-review/agents/security-reviewer.md`
- Modify: `trung-cap/07-plugins/pr-review/agents/test-checker.md`
- Modify: `trung-cap/07-plugins/pr-review/commands/check-security.md`
- Modify: `trung-cap/07-plugins/pr-review/commands/check-tests.md`
- Modify: `trung-cap/07-plugins/pr-review/commands/review-pr.md`

- [ ] **Step 1: Translate root README.md — Plugins Guide**

Translate plugin concept explanation, how to install/create plugins, directory structure. Keep plugin names, command names in English.

- [ ] **Step 2: Translate each plugin directory**

For each of `devops-automation/`, `documentation/`, `pr-review/`:
- Translate README.md
- Translate agent descriptions in `agents/*.md`
- Translate command descriptions in `commands/*.md`
- Translate templates
- Keep plugin command names (`/deploy`, `/incident`, etc.) in English

- [ ] **Step 3: Commit**

```bash
git add trung-cap/07-plugins/
git commit -m "feat(vi): dịch plugins guide sang tiếng Việt

- Dịch README + 3 plugin directories (devops, docs, pr-review)
- Giữ nguyên plugin/command names bằng tiếng Anh"
```

---

### Task 9: Translate nang-cao/08-hooks/

**Files:**
- Modify: `nang-cao/08-hooks/README.md`

- [ ] **Step 1: Translate README.md — Hooks Guide**

Translate:
- What are hooks, hook types (PreToolUse, PostToolUse, UserPromptSubmit, Stop)
- Hook configuration, examples
- Real-world use cases
- Keep hook type names in English
- Update internal links

- [ ] **Step 2: Commit**

```bash
git add nang-cao/08-hooks/
git commit -m "feat(vi): dịch hooks guide sang tiếng Việt"
```

---

### Task 10: Translate nang-cao/09-checkpoints/

**Files:**
- Modify: `nang-cao/09-checkpoints/README.md`
- Modify: `nang-cao/09-checkpoints/checkpoint-examples.md`

- [ ] **Step 1: Translate README.md — Checkpoints & Rewind**

Translate:
- What are checkpoints, how to use them
- Rewind examples, safety
- Keep command names (`/rewind`, `/checkpoint`) in English
- Update internal links

- [ ] **Step 2: Translate checkpoint-examples.md**

Translate example scenarios and explanations.

- [ ] **Step 3: Commit**

```bash
git add nang-cao/09-checkpoints/
git commit -m "feat(vi): dịch checkpoints guide sang tiếng Việt"
```

---

### Task 11: Translate nang-cao/10-advanced/

**Files:**
- Modify: `nang-cao/10-advanced/README.md`
- Modify: `nang-cao/10-advanced/planning-mode-examples.md`

- [ ] **Step 1: Translate README.md — Advanced Features**

Translate:
- Planning mode, extended thinking
- When to use advanced features
- Update internal links

- [ ] **Step 2: Translate planning-mode-examples.md**

Translate examples and explanations.

- [ ] **Step 3: Commit**

```bash
git add nang-cao/10-advanced/
git commit -m "feat(vi): dịch advanced features guide sang tiếng Việt"
```

---

### Task 12: Create root README.md + integrate Daily Knowledge Companion Roadmap

**Files:**
- Create: `README.md`
- Modify: `Daily_Knowledge_Companion_Roadmap.md` → translate content, move to `docs/huong-dan-tu-hoc.md`
- Modify: `practice-default-mode.md` → translate, move to `co-ban/01-slash-commands/`

- [ ] **Step 1: Translate Daily_Knowledge_Companion_Roadmap.md**

Translate the roadmap document to Vietnamese, keep all commands in English. Write to `docs/huong-dan-tu-hoc.md`.

- [ ] **Step 2: Translate practice-default-mode.md**

Translate and write to `practice-default-mode.md` in root or `co-ban/`.

- [ ] **Step 3: Create root README.md**

```markdown
# Dự Án Tự Học Claude Code

Hướng dẫn toàn diện để làm chủ Claude Code — từ cơ bản đến nâng cao.

## 📚 Lộ Trình Học

### 🟢 Cơ Bản — Nền Tảng
Dành cho người mới bắt đầu. Hiểu các khái niệm cốt lõi.

- [**01 — Slash Commands**](co-ban/01-slash-commands/) — Lệnh gạch chéo và shortcuts
- [**02 — Memory**](co-ban/02-memory/) — Hệ thống bộ nhớ và CLAUDE.md
- [**03 — CLI**](co-ban/03-cli/) — Tham số dòng lệnh và automation

### 🟡 Trung Cấp — Mở Rộng Khả Năng
Sau khi nắm vững cơ bản, khám phá sức mạnh thực sự.

- [**04 — Skills**](trung-cap/04-skills/) — Tạo và quản lý agent skills
- [**05 — Subagents**](trung-cap/05-subagents/) — Ủy thác tác vụ cho agent con
- [**06 — MCP**](trung-cap/06-mcp/) — Kết nối dữ liệu bên ngoài
- [**07 — Plugins**](trung-cap/07-plugins/) — Bundled extensions

### 🔴 Nâng Cao — Tự Động & Kiểm Soát
Cho người dùng muốn tối ưu hóa workflow.

- [**08 — Hooks**](nang-cao/08-hooks/) — Tự động hóa event-driven
- [**09 — Checkpoints**](nang-cao/09-checkpoints/) — Thử nghiệm an toàn và quay lùi
- [**10 — Advanced**](nang-cao/10-advanced/) — Planning mode, extended thinking

## 🚀 Bắt Đầu

1. Đọc bài [01 — Slash Commands](co-ban/01-slash-commands/) trước
2. Làm theo các ví dụ trong từng bài học
3. Thực hành bằng cách tạo lệnh/skill của riêng bạn

## 🎯 Yêu Cầu

- Đã cài [Claude Code](https://claude.ai/code)
- Truy cập Claude API hoặc Claude Pro/Max

---

**Tác giả**: Dao Trung Thanh
```

- [ ] **Step 4: Final cleanup — remove old directories**

```bash
git rm -r 01-slash-commands 02-memory 03-skills 04-subagents 05-mcp 06-hooks 07-plugins 08-checkpoints 09-advanced-features 10-cli
```

Verify nothing important is lost — all content should exist in new locations.

- [ ] **Step 5: Final commit**

```bash
git add README.md docs/huong-dan-tu-hoc.md
git commit -m "feat(vi): hoàn tất refactor sang tiếng Việt

- Tạo README.md tiếng Việt với lộ trình 3 level
- Dịch và move Daily Knowledge Companion Roadmap
- Xóa thư mục cũ (nội dung đã có ở vị trí mới)

Tổng cộng: 10 modules, 3 levels (co-ban, trung-cap, nang-cao)
Tất cả nội dung giải thích sang tiếng Việt
Commands, code, file names giữ nguyên tiếng Anh (kebab-case)"
```

---

### Task 13: Update MEMORY.md and cross-references

**Files:**
- Modify: memory references in remaining files
- Modify: `CLAUDE.md` — update `@docs/architecture.md` references if any changed
- Modify: `.claude/agents.md` — update any links to tutorial directories

- [ ] **Step 1: Check for remaining references to old directory names**

Search for references to old directory names across the codebase:

```bash
grep -r "01-slash-commands\|02-memory\|03-skills\|04-subagents\|05-mcp\|06-hooks\|07-plugins\|08-checkpoints\|09-advanced-features\|10-cli" --include="*.md" --include="*.json" --include="*.py" --include="*.yaml" . 2>/dev/null | grep -v "node_modules" | grep -v "co-ban/" | grep -v "trung-cap/" | grep -v "nang-cao/"
```

Update all references found to point to new locations.

- [ ] **Step 2: Update MEMORY.md if needed**

Keep the existing memory structure — it references relative paths with `../../` which are navigation-based and should still work since the files are at the same repository root level.

- [ ] **Step 3: Commit**

```bash
git add .
git commit -m "fix(vi): cập nhật tất cả cross-references sang đường dẫn mới"
```

---

## Verification Checklist

After all tasks complete:

1. **Structure check:**
```bash
echo "=== co-ban ===" && ls -la co-ban/
echo "=== trung-cap ===" && ls -la trung-cap/
echo "=== nang-cao ===" && ls -la nang-cao/
```

2. **Content check:** All README.md files should start with Vietnamese content (headings, first paragraphs)

3. **Link check:** No broken internal links (search for `../01-`, `../02-`, etc. — none should remain)

4. **Old directories removed:** `ls` should NOT show `01-slash-commands/`, etc.

5. **Git status clean:** Only expected changes, no accidental deletions
