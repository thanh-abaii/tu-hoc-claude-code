# Giải pháp: Plugins

## Bài 1: PR Review Plugin

### Cấu trúc thư mục
```
pr-review-plugin/
├── manifest.json
├── commands/
│   └── pr-check.md
├── agents/
│   └── pr-reviewer.md
└── hooks/
    └── pr-open.json
```

### manifest.json
```json
{
  "name": "pr-review",
  "version": "1.0.0",
  "description": "Tự động review pull requests",
  "components": {
    "commands": ["commands/pr-check.md"],
    "agents": ["agents/pr-reviewer.md"],
    "hooks": ["hooks/pr-open.json"]
  }
}
```

### pr-reviewer agent
```markdown
---
name: pr-reviewer
description: Chuyên gia review pull requests
tools: Read, Grep, Glob, Bash
model: opus
---

# PR Reviewer

Review PR theo checklist:
1. Code quality
2. Security
3. Performance
4. Test coverage
5. Documentation
```

## Bài 2: Daily Standup Plugin

### Cấu trúc
```
daily-standup-plugin/
├── manifest.json
├── commands/
│   └── standup.md
└── agents/
    └── standup-reporter.md
```

### standup agent
```markdown
---
name: standup-reporter
description: Tạo báo cáo daily standup từ git history
tools: Read, Grep, Bash
model: sonnet
---

# Standup Reporter

Thu thập:
1. Commits hôm qua
2. Files changed
3. Issues đã resolve
4. Plan hôm nay
```

## Bài 3: Test Local

### Test cài đặt
```bash
# Tạo plugin local
cd myproject
claude plugin install ./path/to/pr-review-plugin
```

### Verify
- Check slash command `/pr-check` có hoạt động
- Check subagent pr-reviewer có available
- Check hook có trigger không
