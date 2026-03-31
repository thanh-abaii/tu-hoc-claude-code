# Design: Vietnamese Self-Learning Claude Code Project

**Date**: 2026-03-31
**Status**: Approved
**Author**: Claude Code (brainstorming session)

## Overview

Refactor the existing Claude Code tutorial codebase into a Vietnamese-language self-learning project. The codebase transitions from an English tutorial collection into a cohesive, Vietnamese-content learning path for mastering Claude Code.

## Target Structure

```
myproject/
├── CLAUDE.md                        # Keep as-is (English, project config)
├── README.md                        # New: Vietnamese project intro
├── docs/                            # Keep as-is (English, architecture docs)
│
├── co-ban/                          # CƠ BẢN — Nền tảng Claude Code
│   ├── 01-slash-commands/           # Slash Commands (from 01-slash-commands/)
│   ├── 02-memory/                   # Memory System (from 02-memory/)
│   └── 03-cli/                      # CLI Reference (from 10-cli/)
│
├── trung-cap/                       # TRUNG CẤP — Mở rộng khả năng
│   ├── 04-skills/                   # Agent Skills (from 03-skills/)
│   ├── 05-subagents/                # Subagents (from 04-subagents/)
│   ├── 06-mcp/                      # Model Context Protocol (from 05-mcp/)
│   └── 07-plugins/                  # Plugins (from 07-plugins/)
│
├── nang-cao/                        # NÂNG CAO — Tự động & kiểm soát
│   ├── 08-hooks/                    # Hooks (from 06-hooks/)
│   ├── 09-checkpoints/              # Checkpoints & Rewind (from 08-checkpoints/)
│   └── 10-advanced/                 # Advanced Features (from 09-advanced-features/)
│
├── scripts/                         # Keep as-is
└── .claude/                         # Keep as-is (config, agents)
```

## Content Source Mapping

| From                        | To                              | Action |
|-----------------------------|---------------------------------|--------|
| `01-slash-commands/`        | `co-ban/01-slash-commands/`     | Move + translate |
| `02-memory/`                | `co-ban/02-memory/`             | Move + translate |
| `10-cli/`                   | `co-ban/03-cli/`                | Move + translate |
| `03-skills/`                | `trung-cap/04-skills/`          | Move + translate |
| `04-subagents/`             | `trung-cap/05-subagents/`       | Move + translate |
| `05-mcp/`                   | `trung-cap/06-mcp/`             | Move + translate |
| `07-plugins/`               | `trung-cap/07-plugins/`         | Move + translate |
| `06-hooks/`                 | `nang-cao/08-hooks/`            | Move + translate |
| `08-checkpoints/`           | `nang-cao/09-checkpoints/`      | Move + translate |
| `09-advanced-features/`     | `nang-cao/10-advanced/`         | Move + translate |
| `docs/`                     | `docs/`                         | No change |
| `.claude/`                  | `.claude/`                      | No change |
| `scripts/`                  | `scripts/`                      | No change |

## Translation Rules

### What gets translated:
- ✅ All explanatory text → Vietnamese
- ✅ Headings, section titles, lesson descriptions → Vietnamese
- ✅ README.md files → Vietnamese
- ✅ `Daily_Knowledge_Companion_Roadmap.md` → Vietnamese (moved to `docs/` or kept as `huong-dan-tu-hoc.md`)

### What stays in English:
- ❌ Commands and CLI flags (`/commit`, `claude -p --output-format json`)
- ❌ Skill names, plugin names, agent names
- ❌ Function/class/variable names in code examples
- ❌ File names (kebab-case, no Vietnamese diacritics)

### Code comments:
- ✅ Comments in code examples → Vietnamese

## File Naming

- All files: kebab-case, no diacritics
- Examples: `lesson-01.md`, `slash-commands-guide.md`, `memory-basics.md`
- Lessons numbered sequentially within each topic: `lesson-01.md`, `lesson-02.md`, etc.

## Each Topic Structure

Every topic directory gets:
- `README.md` — Vietnamese overview of the topic
- `lessons/lesson-01.md`, `lesson-02.md`, ... — Individual lessons
- `practice/` — Practice exercises (if applicable, from existing `practice/` content)

## Deleted/Stale Content

- `Daily_Knowledge_Companion_Roadmap.md` → translate content, integrate or archive
- `practice-default-mode.md` → translate, move into appropriate topic
