# Giải pháp: Hooks

## Bài 1: Bảo Mật Hook

### Tạo hook trong `.claude/settings.json`
```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "(rm\\s+-rf|git\\s+push\\s+--force)",
        "hooks": [
          {
            "type": "command",
            "command": "bash -c 'echo \"{\\\"preventTool\\\": true, \\\"content\\\": \\\"Lệnh nguy hiểm bị chặn. Liên hệ admin nếu cần.\\\"}\"'"
          }
        ]
      }
    ]
  }
}
```

### Hook chặn commit .env files
```bash
#!/bin/bash
# pre-commit-hook.sh
if git diff --cached --name-only | grep -q '\.env'; then
  cat <<'EOF'
{"preventTool": true, "content": "Khong the commit file .env. Them vao .gitignore."}
EOF
fi
```

## Bài 2: Auto-Log Hook

### Cấu hình PostToolUse
```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [
          {
            "type": "command",
            "command": "bash -c 'echo \"$(date) - File modified: $CLAUDE_TOOL_INPUT\" >> .claude/activity.log'"
          }
        ]
      }
    ]
  }
}
```

## Bài 3: Pre-Commit Review Hook

### Tạo script `.claude/hooks/pre-commit-review.sh`
```bash
#!/bin/bash

# Check for secrets
SECRETS=$(git diff --cached | grep -iE '(password|api_key|secret|token)\s*[:=]')
if [ -n "$SECRETS" ]; then
  echo '{"preventTool": true, "content": "Phat hien secrets trong staged files!"}'
  exit 1
fi

# Check commit message format
MSG="$CLAUDE_TOOL_INPUT"
if ! echo "$MSG" | grep -qE '^(feat|fix|docs|style|refactor|test|chore)(\(.+\))?: .+'; then
  echo '{"preventTool": true, "content": "Commit message khong dung format conventional commits!"}'
  exit 1
fi

echo '{"content": "Pre-commit checks passed"}'
```
