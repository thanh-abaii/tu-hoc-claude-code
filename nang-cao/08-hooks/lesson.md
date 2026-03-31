
# Hook

Hook là các kịch bản tự động thực thi để phản hồi các sự kiện cụ thể trong phiên làm việc Claude Code. Chúng hỗ trợ tự động hóa, xác thực, quản lý quyền và các quy trình tùy chỉnh.

## Tổng quan

Hook là các hành động tự động hóa (lệnh shell, webhook HTTP, prompt LLM, hoặc đánh giá subagent) thực thi tự động khi các sự kiện cụ thể xảy ra trong Claude Code. Hook nhận dữ liệu JSON đầu vào và giao tiếp kết quả qua mã thoát và đầu ra JSON.

**Tính năng chính:**
- Tự động hóa theo sự kiện
- Đầu vào/ra dựa trên JSON
- Hỗ trợ các loại hook: command, prompt, HTTP và agent
- Đối sánh mẫu cho các hook theo tool cụ thể

## Cấu hình

Hook được cấu hình trong các tệp cài đặt với cấu trúc cụ thể:

- `~/.claude/settings.json` - Cài đặt người dùng (tất cả project)
- `.claude/settings.json` - Cài đặt project (chia sẻ được, commit)
- `.claude/settings.local.json` - Cài đặt project cục bộ (không commit)
- Managed policy - Cài đặt toàn tổ chức
- Plugin `hooks/hooks.json` - Hook phạm vi plugin
- Skill/Agent frontmatter - Hook vòng đời component

### Cấu trúc cơ bản

```json
{
  "hooks": {
    "EventName": [
      {
        "matcher": "ToolPattern",
        "hooks": [
          {
            "type": "command",
            "command": "your-command-here",
            "timeout": 60
          }
        ]
      }
    ]
  }
}
```

**Trường chính:**

| Trường | Mô tả | Ví dụ |
|-------|-------------|---------|
| `matcher` | Mẫu đối sánh tên tool (phân biệt hoa/thường) | `"Write"`, `"Edit\|Write"`, `"*"` |
| `hooks` | Mảng định nghĩa hook | `[{ "type": "command", ... }]` |
| `type` | Loại hook: `"command"` (bash), `"prompt"` (LLM), `"http"` (webhook), hoặc `"agent"` (subagent) | `"command"` |
| `command` | Lệnh shell thực thi | `"$CLAUDE_PROJECT_DIR/.claude/hooks/format.sh"` |
| `timeout` | Thời gian chờ tùy chọn (giây, mặc định 60) | `30` |
| `once` | Nếu `true`, chỉ chạy hook một lần mỗi phiên | `true` |

### Mẫu Matcher

| Mẫu | Mô tả | Ví dụ |
|---------|-------------|---------|
| Chuỗi chính xác | Khớp tool cụ thể | `"Write"` |
| Mẫu regex | Khớp nhiều tool | `"Edit\|Write"` |
| Ký tự đại diện | Khớp tất cả tool | `"*"` hoặc `""` |
| MCP tool | Mẫu server và tool | `"mcp__memory__.*"` |

## Các loại hook

Claude Code hỗ trợ bốn loại hook:

### Command Hooks

Loại hook mặc định. Thực thi lệnh shell và giao tiếp qua JSON stdin/stdout và mã thoát.

```json
{
  "type": "command",
  "command": "python3 \"$CLAUDE_PROJECT_DIR/.claude/hooks/validate.py\"",
  "timeout": 60
}
```

### HTTP Hooks

> Đã thêm trong v2.1.63.

Endpoint webhook từ xa nhận cùng dữ liệu JSON đầu vào như command hook. HTTP hook gửi JSON POST đến URL và nhận phản hồi JSON. HTTP hook được định tuyến qua sandbox khi sandbox được bật. Nội suy biến môi trường trong URL yêu cầu danh sách `allowedEnvVars` tường minh để bảo mật.

```json
{
  "hooks": {
    "PostToolUse": [{
      "type": "http",
      "url": "https://my-webhook.example.com/hook",
      "matcher": "Write"
    }]
  }
}
```

**Thuộc tính chính:**
- `"type": "http"` -- xác định đây là HTTP hook
- `"url"` -- URL endpoint webhook
- Định tuyến qua sandbox khi sandbox được bật
- Yêu cầu danh sách `allowedEnvVars` tường minh cho bất kỳ nội suy biến môi trường nào trong URL

### Prompt Hooks

Prompt được LLM đánh giá, nơi nội dung hook là prompt mà Claude xử lý. Chủ yếu dùng với sự kiện `Stop` và `SubagentStop` để kiểm tra hoàn thành tác vụ thông minh.

```json
{
  "type": "prompt",
  "prompt": "Đánh giá xem Claude đã hoàn thành tất cả tác vụ được yêu cầu chưa.",
  "timeout": 30
}
```

LLM đánh giá prompt và trả về quyết định có cấu trúc (xem [Hook dựa trên Prompt](#hook-dựa-trên-prompt) để biết chi tiết).

### Agent Hooks

Hook dựa trên subagent sinh ra một agent chuyên dụng để đánh giá điều kiện hoặc thực hiện kiểm tra phức tạp. Không giống prompt hook (đánh giá LLM một lượt), agent hook có thể sử dụng tool và thực hiện suy luận nhiều bước.

```json
{
  "type": "agent",
  "prompt": "Xác minh các thay đổi mã tuân thủ hướng dẫn kiến trúc. Kiểm tra tài liệu thiết kế liên quan và so sánh.",
  "timeout": 120
}
```

**Thuộc tính chính:**
- `"type": "agent"` -- xác định đây là agent hook
- `"prompt"` -- mô tả tác vụ cho subagent
- Agent có thể sử dụng tool (Read, Grep, Bash, v.v.) để thực hiện đánh giá
- Trả về quyết định có cấu trúc tương tự prompt hook

## Sự kiện Hook

Claude Code hỗ trợ **25 sự kiện hook**:

| Sự kiện | Khi kích hoạt | Đầu vào Matcher | Có thể chặn | Công dụng phổ biến |
|-------|---------------|---------------|-----------|------------|
| **SessionStart** | Phiên bắt đầu/tiếp tục/xóa/gọn | startup/resume/clear/compact | Không | Thiết lập môi trường |
| **InstructionsLoaded** | Sau khi tải tệp CLAUDE.md hoặc rules | (không có) | Không | Sửa đổi/lọc hướng dẫn |
| **UserPromptSubmit** | Người dùng gửi prompt | (không có) | Có | Xác thực prompt |
| **PreToolUse** | Trước khi thực thi tool | Tên tool | Có (allow/deny/ask) | Xác thực, sửa đổi đầu vào |
| **PermissionRequest** | Hiển thị hộp thoại quyền | Tên tool | Có | Tự động phê duyệt/từ chối |
| **PostToolUse** | Sau khi tool thành công | Tên tool | Không | Thêm ngữ cảnh, phản hồi |
| **PostToolUseFailure** | Tool thất bại | Tên tool | Không | Xử lý lỗi, ghi nhật ký |
| **Notification** | Gửi thông báo | Loại thông báo | Không | Thông báo tùy chỉnh |
| **SubagentStart** | Subagent được sinh ra | Tên loại agent | Không | Thiết lập subagent |
| **SubagentStop** | Subagent hoàn thành | Tên loại agent | Có | Xác thực subagent |
| **Stop** | Claude hoàn thành phản hồi | (không có) | Có | Kiểm tra hoàn thành tác vụ |
| **StopFailure** | Lỗi API kết thúc lượt | (không có) | Không | Khôi phục lỗi, ghi nhật ký |
| **TeammateIdle** | Đồng đội agent team không hoạt động | (không có) | Có | Phối hợp đồng đội |
| **TaskCompleted** | Tác vụ đánh dấu hoàn thành | (không có) | Có | Hành động sau tác vụ |
| **TaskCreated** | Tác vụ tạo qua TaskCreate | (không có) | Không | Theo dõi tác vụ, ghi nhật ký |
| **ConfigChange** | Tệp cấu hình thay đổi | (không có) | Có (trừ policy) | Phản hồi cập nhật cấu hình |
| **CwdChanged** | Thay đổi thư mục làm việc | (không có) | Không | Thiết lập theo thư mục |
| **FileChanged** | Tệp được theo dõi thay đổi | (không có) | Không | Giám sát tệp, xây dựng lại |
| **PreCompact** | Trước khi nén ngữ cảnh | manual/auto | Không | Hành động trước nén |
| **PostCompact** | Sau khi nén hoàn tất | (không có) | Không | Hành động sau nén |
| **WorktreeCreate** | Worktree đang được tạo | (không có) | Có (trả về path) | Khởi tạo worktree |
| **WorktreeRemove** | Worktree đang bị xóa | (không có) | Không | Dọn dẹp worktree |
| **Elicitation** | MCP server yêu cầu nhập liệu | (không có) | Có | Xác thực nhập liệu |
| **ElicitationResult** | Người dùng phản hồi elicitation | (không có) | Có | Xử lý phản hồi |
| **SessionEnd** | Phiên kết thúc | (không có) | Không | Dọn dẹp, ghi nhật ký cuối |

### PreToolUse

Chạy sau khi Claude tạo tham số tool và trước khi xử lý. Dùng để xác thực hoặc sửa đổi đầu vào tool.

**Cấu hình:**
```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "$CLAUDE_PROJECT_DIR/.claude/hooks/validate-bash.py"
          }
        ]
      }
    ]
  }
}
```

**Matcher phổ biến:** `Task`, `Bash`, `Glob`, `Grep`, `Read`, `Edit`, `Write`, `WebFetch`, `WebSearch`

**Kiểm soát đầu ra:**
- `permissionDecision`: `"allow"`, `"deny"` hoặc `"ask"`
- `permissionDecisionReason`: Giải thích quyết định
- `updatedInput`: Tham số đầu vào tool đã sửa đổi

### PostToolUse

Chạy ngay sau khi tool hoàn thành. Dùng để xác thực, ghi nhật ký hoặc cung cấp ngữ cảnh cho Claude.

**Cấu hình:**
```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [
          {
            "type": "command",
            "command": "$CLAUDE_PROJECT_DIR/.claude/hooks/security-scan.py"
          }
        ]
      }
    ]
  }
}
```

**Kiểm soát đầu ra:**
- Quyết định `"block"` nhắc Claude với phản hồi
- `additionalContext`: Ngữ cảnh thêm cho Claude

### UserPromptSubmit

Chạy khi người dùng gửi prompt, trước khi Claude xử lý.

**Cấu hình:**
```json
{
  "hooks": {
    "UserPromptSubmit": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "$CLAUDE_PROJECT_DIR/.claude/hooks/validate-prompt.py"
          }
        ]
      }
    ]
  }
}
```

**Kiểm soát đầu ra:**
- `decision`: `"block"` để chặn xử lý
- `reason`: Giải thích nếu bị chặn
- `additionalContext`: Ngữ cảnh thêm vào prompt

### Stop và SubagentStop

Chạy khi Claude hoàn thành phản hồi (Stop) hoặc subagent hoàn thành (SubagentStop). Hỗ trợ đánh giá dựa trên prompt để kiểm tra hoàn thành tác vụ thông minh.

**Trường đầu vào bổ sung:** Cả hook `Stop` và `SubagentStop` đều nhận trường `last_assistant_message` trong JSON đầu vào, chứa thông điệp cuối cùng từ Claude hoặc subagent trước khi dừng. Điều này hữu ích để đánh giá hoàn thành tác vụ.

**Cấu hình:**
```json
{
  "hooks": {
    "Stop": [
      {
        "hooks": [
          {
            "type": "prompt",
            "prompt": "Đánh giá xem Claude đã hoàn thành tất cả tác vụ được yêu cầu chưa.",
            "timeout": 30
          }
        ]
      }
    ]
  }
}
```

### SubagentStart

Chạy khi subagent bắt đầu thực thi. Đầu vào matcher là tên loại agent, cho phép hook nhắm đến loại subagent cụ thể.

**Cấu hình:**
```json
{
  "hooks": {
    "SubagentStart": [
      {
        "matcher": "code-review",
        "hooks": [
          {
            "type": "command",
            "command": "$CLAUDE_PROJECT_DIR/.claude/hooks/subagent-init.sh"
          }
        ]
      }
    ]
  }
}
```

### SessionStart

Chạy khi phiên bắt đầu hoặc tiếp tục. Có thể duy trì biến môi trường.

**Matcher:** `startup`, `resume`, `clear`, `compact`

**Tính năng đặc biệt:** Dùng `CLAUDE_ENV_FILE` để duy trì biến môi trường (cũng có sẵn trong hook `CwdChanged` và `FileChanged`):

```bash
#!/bin/bash
if [ -n "$CLAUDE_ENV_FILE" ]; then
  echo 'export NODE_ENV=development' >> "$CLAUDE_ENV_FILE"
fi
exit 0
```

### SessionEnd

Chạy khi phiên kết thúc để thực hiện dọn dẹp hoặc ghi nhật ký cuối. Không thể chặn việc kết thúc.

**Giá trị trường `reason`:**
- `clear` - Người dùng xóa phiên
- `logout` - Người dùng đăng xuất
- `prompt_input_exit` - Người dùng thoát qua nhập prompt
- `other` - Lý do khác

**Cấu hình:**
```json
{
  "hooks": {
    "SessionEnd": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "\"$CLAUDE_PROJECT_DIR/.claude/hooks/session-cleanup.sh\""
          }
        ]
      }
    ]
  }
}
```

### Sự kiện Notification

Matcher đã cập nhật cho sự kiện notification:
- `permission_prompt` - Thông báo yêu cầu quyền
- `idle_prompt` - Thông báo trạng thái không hoạt động
- `auth_success` - Xác thực thành công
- `elicitation_dialog` - Hiển thị hộp thoại cho người dùng

## Hook phạm vi Component

Hook có thể đính kèm vào component cụ thể (skill, agent, lệnh) trong frontmatter:

**Trong SKILL.md, agent.md hoặc command.md:**

```yaml
---
name: secure-operations
description: Perform operations with security checks
hooks:
  PreToolUse:
    - matcher: "Bash"
      hooks:
        - type: command
          command: "./scripts/check.sh"
          once: true  # Chỉ chạy một lần mỗi phiên
---
```

**Sự kiện hỗ trợ cho hook component:** `PreToolUse`, `PostToolUse`, `Stop`

Điều này cho phép định nghĩa hook trực tiếp trong component sử dụng chúng, giữ mã liên quan cùng nhau.

### Hook trong Subagent Frontmatter

Khi hook `Stop` được định nghĩa trong frontmatter của subagent, nó tự động chuyển đổi thành hook `SubagentStop` phạm vi cho subagent đó. Điều này đảm bảo stop hook chỉ kích hoạt khi subagent cụ thể đó hoàn thành, thay vì khi phiên chính dừng.

```yaml
---
name: code-review-agent
description: Automated code review subagent
hooks:
  Stop:
    - hooks:
        - type: prompt
          prompt: "Xác minh việc review mã toàn diện và đầy đủ."
  # Hook Stop ở trên tự chuyển đổi thành SubagentStop cho subagent này
---
```

## Sự kiện PermissionRequest

Xử lý yêu cầu quyền với định dạng đầu ra tùy chỉnh:

```json
{
  "hookSpecificOutput": {
    "hookEventName": "PermissionRequest",
    "decision": {
      "behavior": "allow|deny",
      "updatedInput": {},
      "message": "Thông điệp tùy chỉnh",
      "interrupt": false
    }
  }
}
```

## Đầu vào và Đầu ra của Hook

### Đầu vào JSON (qua stdin)

Tất cả hook nhận đầu vào JSON qua stdin:

```json
{
  "session_id": "abc123",
  "transcript_path": "/path/to/transcript.jsonl",
  "cwd": "/current/working/directory",
  "permission_mode": "default",
  "hook_event_name": "PreToolUse",
  "tool_name": "Write",
  "tool_input": {
    "file_path": "/path/to/file.js",
    "content": "..."
  },
  "tool_use_id": "toolu_01ABC123...",
  "agent_id": "agent-abc123",
  "agent_type": "main",
  "worktree": "/path/to/worktree"
}
```

**Trường phổ biến:**

| Trường | Mô tả |
|-------|-------------|
| `session_id` | Định danh phiên duy nhất |
| `transcript_path` | Đường dẫn đến tệp nhật ký hội thoại |
| `cwd` | Thư mục làm việc hiện tại |
| `hook_event_name` | Tên sự kiện kích hoạt hook |
| `agent_id` | Định danh agent chạy hook này |
| `agent_type` | Loại agent (`"main"`, tên loại subagent, v.v.) |
| `worktree` | Đường dẫn đến git worktree, nếu agent đang chạy trong worktree |

### Mã thoát

| Mã thoát | Ý nghĩa | Hành vi |
|-----------|---------|----------|
| **0** | Thành công | Tiếp tục, phân tích JSON stdout |
| **2** | Lỗi chặn | Chặn thao tác, stderr hiển thị như lỗi |
| **Khác** | Lỗi không chặn | Tiếp tục, stderr hiển thị ở chế độ verbose |

### Đầu ra JSON (stdout, mã thoát 0)

```json
{
  "continue": true,
  "stopReason": "Thông điệp tùy chọn nếu dừng",
  "suppressOutput": false,
  "systemMessage": "Thông điệp cảnh báo tùy chọn",
  "hookSpecificOutput": {
    "hookEventName": "PreToolUse",
    "permissionDecision": "allow",
    "permissionDecisionReason": "Tệp thuộc thư mục được phép",
    "updatedInput": {
      "file_path": "/modified/path.js"
    }
  }
}
```

## Biến môi trường

| Biến | Khả dụng | Mô tả |
|----------|-------------|-------------|
| `CLAUDE_PROJECT_DIR` | Tất cả hook | Đường dẫn tuyệt đối đến gốc project |
| `CLAUDE_ENV_FILE` | SessionStart, CwdChanged, FileChanged | Đường dẫn tệp để duy trì biến env |
| `CLAUDE_CODE_REMOTE` | Tất cả hook | `"true"` nếu chạy trong môi trường từ xa |
| `${CLAUDE_PLUGIN_ROOT}` | Plugin hook | Đường dẫn đến thư mục plugin |
| `${CLAUDE_PLUGIN_DATA}` | Plugin hook | Đường dẫn đến thư mục dữ liệu plugin |
| `CLAUDE_CODE_SESSIONEND_HOOKS_TIMEOUT_MS` | SessionEnd hook | Thời gian chờ tùy chỉnh (ms) cho SessionEnd hook (ghi đè mặc định) |

## Hook dựa trên Prompt

Cho sự kiện `Stop` và `SubagentStop`, bạn có thể dùng đánh giá dựa trên LLM:

```json
{
  "hooks": {
    "Stop": [
      {
        "hooks": [
          {
            "type": "prompt",
            "prompt": "Review xem tất cả tác vụ đã hoàn thành chưa. Trả về quyết định.",
            "timeout": 30
          }
        ]
      }
    ]
  }
}
```

**LLM Response Schema:**
```json
{
  "decision": "approve",
  "reason": "All tasks completed successfully",
  "continue": false,
  "stopReason": "Task complete"
}
```

## Ví dụ

### Ví dụ 1: Trình kiểm tra lệnh Bash (PreToolUse)

**Tệp:** `.claude/hooks/validate-bash.py`

```python
#!/usr/bin/env python3
import json
import sys
import re

BLOCKED_PATTERNS = [
    (r"\brm\s+-rf\s+/", "Blocking dangerous rm -rf / command"),
    (r"\bsudo\s+rm", "Blocking sudo rm command"),
]

def main():
    input_data = json.load(sys.stdin)

    tool_name = input_data.get("tool_name", "")
    if tool_name != "Bash":
        sys.exit(0)

    command = input_data.get("tool_input", {}).get("command", "")

    for pattern, message in BLOCKED_PATTERNS:
        if re.search(pattern, command):
            print(message, file=sys.stderr)
            sys.exit(2)  # Mã thoát 2 = lỗi chặn

    sys.exit(0)

if __name__ == "__main__":
    main()
```

**Cấu hình:**
```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "python3 \"$CLAUDE_PROJECT_DIR/.claude/hooks/validate-bash.py\""
          }
        ]
      }
    ]
  }
}
```

### Ví dụ 2: Trình quét bảo mật (PostToolUse)

**Tệp:** `.claude/hooks/security-scan.py`

```python
#!/usr/bin/env python3
import json
import sys
import re

SECRET_PATTERNS = [
    (r"password\s*=\s*['\"][^'\"]+['\"]", "Potential hardcoded password"),
    (r"api[_-]?key\s*=\s*['\"][^'\"]+['\"]", "Potential hardcoded API key"),
]

def main():
    input_data = json.load(sys.stdin)

    tool_name = input_data.get("tool_name", "")
    if tool_name not in ["Write", "Edit"]:
        sys.exit(0)

    tool_input = input_data.get("tool_input", {})
    content = tool_input.get("content", "") or tool_input.get("new_string", "")
    file_path = tool_input.get("file_path", "")

    warnings = []
    for pattern, message in SECRET_PATTERNS:
        if re.search(pattern, content, re.IGNORECASE):
            warnings.append(message)

    if warnings:
        output = {
            "hookSpecificOutput": {
                "hookEventName": "PostToolUse",
                "additionalContext": f"Security warnings for {file_path}: " + "; ".join(warnings)
            }
        }
        print(json.dumps(output))

    sys.exit(0)

if __name__ == "__main__":
    main()
```

### Ví dụ 3: Tự động định dạng mã (PostToolUse)

**Tệp:** `.claude/hooks/format-code.sh`

```bash
#!/bin/bash

# Đọc JSON từ stdin
INPUT=$(cat)
TOOL_NAME=$(echo "$INPUT" | python3 -c "import sys, json; print(json.load(sys.stdin).get('tool_name', ''))")
FILE_PATH=$(echo "$INPUT" | python3 -c "import sys, json; print(json.load(sys.stdin).get('tool_input', {}).get('file_path', ''))")

if [ "$TOOL_NAME" != "Write" ] && [ "$TOOL_NAME" != "Edit" ]; then
    exit 0
fi

# Định dạng theo phần mở rộng tệp
case "$FILE_PATH" in
    *.js|*.jsx|*.ts|*.tsx|*.json)
        command -v prettier &>/dev/null && prettier --write "$FILE_PATH" 2>/dev/null
        ;;
    *.py)
        command -v black &>/dev/null && black "$FILE_PATH" 2>/dev/null
        ;;
    *.go)
        command -v gofmt &>/dev/null && gofmt -w "$FILE_PATH" 2>/dev/null
        ;;
esac

exit 0
```

### Ví dụ 4: Trình xác thực Prompt (UserPromptSubmit)

**Tệp:** `.claude/hooks/validate-prompt.py`

```python
#!/usr/bin/env python3
import json
import sys
import re

BLOCKED_PATTERNS = [
    (r"delete\s+(all\s+)?database", "Dangerous: database deletion"),
    (r"rm\s+-rf\s+/", "Dangerous: root deletion"),
]

def main():
    input_data = json.load(sys.stdin)
    prompt = input_data.get("user_prompt", "") or input_data.get("prompt", "")

    for pattern, message in BLOCKED_PATTERNS:
        if re.search(pattern, prompt, re.IGNORECASE):
            output = {
                "decision": "block",
                "reason": f"Blocked: {message}"
            }
            print(json.dumps(output))
            sys.exit(0)

    sys.exit(0)

if __name__ == "__main__":
    main()
```

### Ví dụ 5: Hook Stop thông minh (Dựa trên Prompt)

```json
{
  "hooks": {
    "Stop": [
      {
        "hooks": [
          {
            "type": "prompt",
            "prompt": "Review xem Claude đã hoàn thành tất cả tác vụ yêu cầu. Kiểm tra: 1) Tất cả tệp đã tạo/sửa đổi? 2) Có lỗi chưa giải quyết? Nếu chưa hoàn thành, giải thích phần thiếu.",
            "timeout": 30
          }
        ]
      }
    ]
  }
}
```

### Ví dụ 6: Bộ theo dõi sử dụng ngữ cảnh (Cặp Hook)

Theo dõi token tiêu thụ mỗi yêu cầu bằng cách sử dụng hook `UserPromptSubmit` (trước thông điệp) và `Stop` (sau phản hồi) cùng nhau.

**Tệp:** `.claude/hooks/context-tracker.py`

```python
#!/usr/bin/env python3
"""
Trình theo dõi sử dụng ngữ cảnh - Theo dõi số token tiêu thụ mỗi yêu cầu.

Sử dụng UserPromptSubmit làm hook "trước thông điệp" và Stop làm hook "sau phản hồi"
để tính toán chênh lệch token cho mỗi yêu cầu.

Phương pháp đếm Token:
1. Ước lượng ký tự (mặc định): ~4 ký tự/token, không phụ thuộc
2. tiktoken (tùy chọn): Chính xác hơn (~90-95%), yêu cầu: pip install tiktoken
"""
import json
import os
import sys
import tempfile

# Cấu hình
CONTEXT_LIMIT = 128000  # Cửa sổ ngữ cảnh của Claude (điều chỉnh theo model)
USE_TIKTOKEN = False    # Đặt True nếu tiktoken đã cài để chính xác hơn


def get_state_file(session_id: str) -> str:
    """Lấy đường dẫn tệp tạm để lưu số token trước thông điệp, tách biệt theo phiên."""
    return os.path.join(tempfile.gettempdir(), f"claude-context-{session_id}.json")


def count_tokens(text: str) -> int:
    """
    Đếm token trong văn bản.

    Sử dụng tiktoken với mã hóa p50k_base nếu có (~90-95% chính xác),
    nếu không dùng ước lượng ký tự (~80-90% chính xác).
    """
    if USE_TIKTOKEN:
        try:
            import tiktoken
            enc = tiktoken.get_encoding("p50k_base")
            return len(enc.encode(text))
        except ImportError:
            pass  # Dùng ước lượng thay thế

    # Ước lượng theo ký tự: ~4 ký tự mỗi token cho tiếng Anh
    return len(text) // 4


def read_transcript(transcript_path: str) -> str:
    """Đọc và ghép nội dung từ tệp nhật ký hội thoại."""
    if not transcript_path or not os.path.exists(transcript_path):
        return ""

    content = []
    with open(transcript_path, "r") as f:
        for line in f:
            try:
                entry = json.loads(line.strip())
                # Trích xuất nội dung văn bản từ nhiều định dạng thông điệp
                if "message" in entry:
                    msg = entry["message"]
                    if isinstance(msg.get("content"), str):
                        content.append(msg["content"])
                    elif isinstance(msg.get("content"), list):
                        for block in msg["content"]:
                            if isinstance(block, dict) and block.get("type") == "text":
                                content.append(block.get("text", ""))
            except json.JSONDecodeError:
                continue

    return "\n".join(content)


def handle_user_prompt_submit(data: dict) -> None:
    """Hook trước thông điệp: Lưu số token hiện tại trước yêu cầu."""
    session_id = data.get("session_id", "unknown")
    transcript_path = data.get("transcript_path", "")

    transcript_content = read_transcript(transcript_path)
    current_tokens = count_tokens(transcript_content)

    # Lưu vào tệp tạm để so sánh sau
    state_file = get_state_file(session_id)
    with open(state_file, "w") as f:
        json.dump({"pre_tokens": current_tokens}, f)


def handle_stop(data: dict) -> None:
    """Hook sau phản hồi: Tính toán và báo cáo chênh lệch token."""
    session_id = data.get("session_id", "unknown")
    transcript_path = data.get("transcript_path", "")

    transcript_content = read_transcript(transcript_path)
    current_tokens = count_tokens(transcript_content)

    # Tải số token trước thông điệp
    state_file = get_state_file(session_id)
    pre_tokens = 0
    if os.path.exists(state_file):
        try:
            with open(state_file, "r") as f:
                state = json.load(f)
                pre_tokens = state.get("pre_tokens", 0)
        except (json.JSONDecodeError, IOError):
            pass

    # Tính chênh lệch
    delta_tokens = current_tokens - pre_tokens
    remaining = CONTEXT_LIMIT - current_tokens
    percentage = (current_tokens / CONTEXT_LIMIT) * 100

    # Báo cáo mức sử dụng
    method = "tiktoken" if USE_TIKTOKEN else "estimated"
    print(f"Context ({method}): ~{current_tokens:,} tokens ({percentage:.1f}% used, ~{remaining:,} remaining)", file=sys.stderr)
    if delta_tokens > 0:
        print(f"This request: ~{delta_tokens:,} tokens", file=sys.stderr)


def main():
    data = json.load(sys.stdin)
    event = data.get("hook_event_name", "")

    if event == "UserPromptSubmit":
        handle_user_prompt_submit(data)
    elif event == "Stop":
        handle_stop(data)

    sys.exit(0)


if __name__ == "__main__":
    main()
```

**Cấu hình:**
```json
{
  "hooks": {
    "UserPromptSubmit": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "python3 \"$CLAUDE_PROJECT_DIR/.claude/hooks/context-tracker.py\""
          }
        ]
      }
    ],
    "Stop": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "python3 \"$CLAUDE_PROJECT_DIR/.claude/hooks/context-tracker.py\""
          }
        ]
      }
    ]
  }
}
```

**Cách hoạt động:**
1. `UserPromptSubmit` kích hoạt trước khi prompt được xử lý - lưu số token hiện tại
2. `Stop` kích hoạt sau khi Claude phản hồi - tính chênh lệch và báo cáo
3. Mỗi phiên được cô lập qua `session_id` trong tên tệp tạm

**Phương pháp đếm Token:**

| Phương pháp | Độ chính xác | Phụ thuộc | Tốc độ |
|--------|----------|--------------|-------|
| Ước lượng ký tự | ~80-90% | Không | <1ms |
| tiktoken (p50k_base) | ~90-95% | `pip install tiktoken` | <10ms |

> **Lưu ý:** Anthropic chưa phát hành tokenizer offline chính thức. Cả hai phương pháp đều là xấp xỉ. Nhật ký bao gồm prompt người dùng, phản hồi Claude và kết quả tool, nhưng KHÔNG bao gồm system prompt hoặc ngữ cảnh nội bộ.

### Ví dụ 7: Chế độ tự động thích nghi (PostToolUse)

Tự động học từ việc phê duyệt tool của bạn và cập nhật quyền `~/.claude/settings.json`. Mỗi lần bạn chấp nhận thực thi tool, hook sẽ khái quát hóa lệnh thành quy tắc quyền tái sử dụng -- vì vậy bạn không bao giờ phải phê duyệt cùng loại lệnh hai lần. Lệnh nguy hiểm/phá hủy **không bao giờ** được ghi nhớ.

Lần chạy đầu tiên, nó khởi tạo config với quyền tương đương chế độ auto-mode (đọc/ghi tệp, thao tác git, trình quản lý gói, công cụ CLI phổ biến).

**Tệp:** `.claude/hooks/auto-adapt-mode.py`

```python
#!/usr/bin/env python3
"""
auto-adapt-mode: Học từ phê duyệt tool và cập nhật cấu hình Claude.

Loại hook: PostToolUse
Sự kiện: Kích hoạt sau khi tool thành công (người dùng đã phê duyệt)
"""

import json
import os
import sys
import re
from pathlib import Path

SETTINGS_PATH = Path.home() / ".claude" / "settings.json"
LOG_PATH = Path.home() / ".claude" / "auto-adapt-mode.log"

# Auto-mode baseline: các thao tác an toàn, cục bộ, đảo ngược được
AUTO_MODE_BASELINE = [
    "Read(*)", "Edit(*)", "Write(*)", "Glob(*)", "Grep(*)",
    "Bash(git status:*)", "Bash(git log:*)", "Bash(git diff:*)",
    "Bash(git add:*)", "Bash(git commit:*)", "Bash(git checkout:*)",
    "Bash(npm install:*)", "Bash(npm test:*)", "Bash(npm run:*)",
    "Bash(pip install:*)", "Bash(pytest:*)",
    "Bash(ls:*)", "Bash(cat:*)", "Bash(find:*)", "Bash(mkdir:*)",
    "Bash(cp:*)", "Bash(mv:*)", "Bash(chmod:*)",
    "Bash(gh pr view:*)", "Bash(gh issue list:*)",
    "Agent(*)", "Skill(*)", "WebSearch(*)", "WebFetch(*)",
    # ... (danh sách đầy đủ gồm 70+ mẫu an toàn)
]

# Lệnh KHÔNG BAO GIỜ được tự động ghi nhớ
DANGEROUS_PATTERNS = [
    r"rm\s+(-[a-zA-Z]*r[a-zA-Z]*|--recursive)",   # rm -rf
    r"git\s+push\s+(-[a-zA-Z]*f|--force)",          # force push
    r"git\s+reset\s+--hard",                         # hard reset
    r"DROP\s+(TABLE|DATABASE)",                       # SQL phá hủy
    r"curl\s+.*\|\s*(bash|sh)",                       # pipe vào shell
    r"sudo\b",                                        # leo thang đặc quyền
    r"docker\s+(rm|rmi|system\s+prune)",              # container phá hủy
    r"kubectl\s+delete",                              # k8s phá hủy
    r"terraform\s+destroy",                           # hạ tầng phá hủy
    r"npm\s+publish",                                 # publish không đảo ngược
    r"deploy\s+.*prod",                               # triển khai production
    # ... (danh sách đầy đủ gồm 25+ mẫu)
]


def is_dangerous_command(command: str) -> bool:
    """Kiểm tra xem lệnh bash có khớp mẫu nguy hiểm không."""
    return any(re.search(p, command, re.IGNORECASE) for p in DANGEROUS_PATTERNS)


def generalize_tool_permission(tool_name: str, tool_input: dict) -> str | None:
    """Chuyển đổi lời gọi tool cụ thể thành quy tắc quyền khái quát."""
    if tool_name == "Bash":
        command = tool_input.get("command", "")
        if not command or is_dangerous_command(command):
            return None
        parts = command.strip().split()
        base = parts[0]
        # Lệnh ghép: "git push" -> "Bash(git push:*)"
        compound = ["git", "npm", "npx", "pip", "cargo", "go", "gh", "python3"]
        if base in compound and len(parts) > 1:
            sub = parts[1]
            if sub.lower() in {"rm", "delete", "destroy", "publish"}:
                return None
            return f"Bash({base} {sub}:*)"
        return f"Bash({base}:*)"
    elif tool_name == "Bash":  # Không bao giờ cho phép Bash(*) chung
        return None
    else:
        return f"{tool_name}(*)"


def main():
    try:
        hook_input = json.load(sys.stdin)
    except (json.JSONDecodeError, EOFError):
        sys.exit(0)

    tool_name = hook_input.get("tool_name", "")
    tool_input = hook_input.get("tool_input", {})
    if not tool_name:
        sys.exit(0)

    # Tải cài đặt, đảm bảo baseline, thêm quy tắc mới nếu an toàn
    settings = json.load(open(SETTINGS_PATH)) if SETTINGS_PATH.exists() else {}
    allow = settings.setdefault("permissions", {}).setdefault("allow", [])

    # Seed baseline lần đầu
    marker = Path.home() / ".claude" / ".auto-adapt-mode-initialized"
    if not marker.exists():
        existing = set(allow)
        for rule in AUTO_MODE_BASELINE:
            if rule not in existing:
                allow.append(rule)
        marker.touch()

    # Khái quát hóa và thêm quy tắc mới
    rule = generalize_tool_permission(tool_name, tool_input)
    if rule and rule not in allow:
        allow.append(rule)
        with open(SETTINGS_PATH, "w") as f:
            json.dump(settings, f, indent=2)
            f.write("\n")

    sys.exit(0)

if __name__ == "__main__":
    main()
```

**Cấu hình:**
```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "*",
        "hooks": [
          {
            "type": "command",
            "command": "python3 \"$CLAUDE_PROJECT_DIR/.claude/hooks/auto-adapt-mode.py\"",
            "timeout": 10
          }
        ]
      }
    ]
  }
}
```

**Cách hoạt động:**
1. `PostToolUse` kích hoạt sau **mỗi** lần thực thi tool thành công (bạn đã phê duyệt)
2. Hook trích xuất tên tool và đầu vào, rồi khái quát thành quy tắc quyền
3. Lệnh ghép như `git push origin main` trở thành `Bash(git push:*)` -- khớp mọi biến thể `git push`
4. Quy tắc được thêm vào `~/.claude/settings.json` \u2192 `permissions.allow` nếu chưa có
5. Lần chạy đầu tiên, khởi tạo ~70 quyền baseline tương đương auto-mode

**Đảm bảo an toàn:**
- Lệnh nguy hiểm (force push, rm -rf, sudo, DROP TABLE, v.v.) **không bao giờ** được ghi nhớ
- Thao tác không đảo ngược (npm publish, terraform destroy, triển khai prod) **luôn** bị chặn
- Lệnh trong danh sách `deny` không bao giờ bị ghi đè
- Hook không bao giờ chặn thực thi tool (luôn thoát 0)
- Tệp nhật ký tại `~/.claude/auto-adapt-mode.log` theo dõi mọi quyết định để kiểm toán

**Ví dụ khái quát hóa:**

| Bạn phê duyệt | Quy tắc thêm | Bao phủ |
|-------------|-----------|--------|
| `git push origin main` | `Bash(git push:*)` | Mọi biến thể git push |
| `npm run build` | `Bash(npm run:*)` | Mọi npm script |
| `ls -la src/` | `Bash(ls:*)` | Mọi lời gọi ls |
| `rm -rf /tmp/test` | *(chặn)* | Không bao giờ ghi nhớ |
| `git push --force` | *(chặn)* | Không bao giờ ghi nhớ |
| Tool `Write` | `Write(*)` | Mọi ghi file |

> **Mẹo:** Xóa `~/.claude/.auto-adapt-mode-initialized` để khởi tạo lại quyền baseline. Kiểm tra `~/.claude/auto-adapt-mode.log` để kiểm toán quy tắc nào được thêm và cái nào bị chặn.

## Hook Plugin

Plugin có thể bao gồm hook trong tệp `hooks/hooks.json`:

**Tệp:** `plugins/hooks/hooks.json`

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "${CLAUDE_PLUGIN_ROOT}/scripts/validate.sh"
          }
        ]
      }
    ]
  }
}
```

**Biến môi trường trong Plugin Hook:**
- `${CLAUDE_PLUGIN_ROOT}` - Đường dẫn đến thư mục plugin
- `${CLAUDE_PLUGIN_DATA}` - Đường dẫn đến thư mục dữ liệu plugin

Điều này cho phép plugin bao gồm hook xác thực và tự động hóa tùy chỉnh.

## Hook MCP Tool

MCP tool theo mẫu `mcp__<server>__<tool>`:

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "mcp__memory__.*",
        "hooks": [
          {
            "type": "command",
            "command": "echo '{\"systemMessage\": \"Memory operation logged\"}'"
          }
        ]
      }
    ]
  }
}
```

## Cân nhắc Bảo mật

### Tuyên bố miễn trừ trách nhiệm

**SỬ DỤNG TỰ CHỊU TRÁCH NHIỆM**: Hook thực thi lệnh shell tùy ý. Bạn hoàn toàn chịu trách nhiệm về:
- Lệnh bạn cấu hình
- Quyền truy cập/sửa đổi tệp
- Mất dữ liệu hoặc hỏng hệ thống tiềm ẩn
- Kiểm tra hook trong môi trường an toàn trước khi dùng production

### Lưu ý Bảo mật

- **Yêu cầu tin cậy workspace:** Các lệnh đầu ra hook `statusLine` và `fileSuggestion` nay yêu cầu chấp nhận tin cậy workspace trước khi có hiệu lực.
- **HTTP hook và biến môi trường:** HTTP hook yêu cầu danh sách `allowedEnvVars` tường minh để sử dụng nội suy biến môi trường trong URL. Điều này ngăn rò rỉ biến môi trường nhạy cảm đến endpoint từ xa.
- **Phân cấp cài đặt quản lý:** Cài đặt `disableAllHooks` nay tôn trọng phân cấp cài đặt quản lý, nghĩa là cài đặt cấp tổ chức có thể thực thi vô hiệu hóa hook mà người dùng cá nhân không thể ghi đè.

### Thực hành Tốt nhất

| Nên | Không nên |
|-----|-------|
| Xác thực và làm sạch tất cả đầu vào | Tin tưởng dữ liệu đầu vào mù quáng |
| Trích biến shell: `"$VAR"` | Dùng không trích: `$VAR` |
| Chặn path traversal (`..`) | Cho phép đường dẫn tùy ý |
| Dùng đường dẫn tuyệt đối với `$CLAUDE_PROJECT_DIR` | Hardcode đường dẫn |
| Bỏ qua tệp nhạy cảm (`.env`, `.git/`, khóa) | Xử lý mọi tệp |
| Kiểm tra hook độc lập trước | Triển khai hook chưa kiểm |
| Dùng `allowedEnvVars` tường minh cho HTTP hook | Phơi bày mọi biến env cho webhook |

## Gỡ lỗi

### Bật chế độ Debug

Chạy Claude với cờ debug để xem nhật ký hook chi tiết:

```bash
claude --debug
```

### Chế độ Verbose

Dùng `Ctrl+O` trong Claude Code để bật chế độ verbose và xem tiến trình thực thi hook.

### Kiểm tra Hook độc lập

```bash
# Kiểm tra với JSON mẫu
echo '{"tool_name": "Bash", "tool_input": {"command": "ls -la"}}' | python3 .claude/hooks/validate-bash.py

# Kiểm tra mã thoát
echo $?
```

## Ví dụ cấu hình hoàn chỉnh

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "python3 \"$CLAUDE_PROJECT_DIR/.claude/hooks/validate-bash.py\"",
            "timeout": 10
          }
        ]
      }
    ],
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [
          {
            "type": "command",
            "command": "\"$CLAUDE_PROJECT_DIR/.claude/hooks/format-code.sh\"",
            "timeout": 30
          },
          {
            "type": "command",
            "command": "python3 \"$CLAUDE_PROJECT_DIR/.claude/hooks/security-scan.py\"",
            "timeout": 10
          }
        ]
      }
    ],
    "UserPromptSubmit": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "python3 \"$CLAUDE_PROJECT_DIR/.claude/hooks/validate-prompt.py\""
          }
        ]
      }
    ],
    "SessionStart": [
      {
        "matcher": "startup",
        "hooks": [
          {
            "type": "command",
            "command": "\"$CLAUDE_PROJECT_DIR/.claude/hooks/session-init.sh\""
          }
        ]
      }
    ],
    "Stop": [
      {
        "hooks": [
          {
            "type": "prompt",
            "prompt": "Xác minh mọi tác vụ đã hoàn thành trước khi dừng.",
            "timeout": 30
          }
        ]
      }
    ]
  }
}
```

## Chi tiết Thực thi Hook

| Khía cạnh | Hành vi |
|--------|----------|
| **Thời gian chờ** | 60 giây mặc định, cấu hình được mỗi lệnh |
| **Song song** | Tất cả hook khớp chạy song song |
| **Khử trùng** | Lệnh hook giống nhau được khử trùng |
| **Môi trường** | Chạy trong thư mục hiện tại với môi trường Claude Code |

## Xử lý sự cố

### Hook không thực thi
- Kiểm tra cú pháp cấu hình JSON đúng
- Kiểm tra mẫu matcher khớp tên tool
- Đảm bảo script tồn tại và có quyền thực thi: `chmod +x script.sh`
- Chạy `claude --debug` để xem nhật ký thực thi hook
- Xác minh hook đọc JSON từ stdin (không phải tham số lệnh)

### Hook chặn không mong muốn
- Kiểm tra hook với JSON mẫu: `echo '{"tool_name": "Write", ...}' | ./hook.py`
- Kiểm tra mã thoát: phải là 0 để allow, 2 để block
- Kiểm tra đầu ra stderr (hiển thị với mã thoát 2)

### Lỗi phân tích cú pháp JSON
- Luôn đọc từ stdin, không phải tham số lệnh
- Dùng phân tích JSON đúng (không phải thao tác chuỗi)
- Xử lý trường thiếu một cách linh hoạt

## Cài đặt

### Bước 1: Tạo thư mục Hooks
```bash
mkdir -p ~/.claude/hooks
```

### Bước 2: Sao chép Hook mẫu
```bash
cp 06-hooks/*.sh ~/.claude/hooks/
chmod +x ~/.claude/hooks/*.sh
```

### Bước 3: Cấu hình trong Settings
Chỉnh sửa `~/.claude/settings.json` hoặc `.claude/settings.json` với cấu hình hook như trên.

## Khái niệm liên quan

- **[Checkpoints và Rewind](../08-checkpoints/)** - Lưu và khôi phục trạng thái hội thoại
- **[Slash Commands](../01-slash-commands/)** - Tạo slash command tùy chỉnh
- **[Skills](../03-skills/)** - Khả năng tự chủ tái sử dụng
- **[Subagents](../../trung-cap/05-subagents/)** - Thực thi tác vụ ủy quyền
- **[Plugins](../07-plugins/)** - Gói mở rộng
- **[Tính năng Nâng cao](../09-advanced-features/)** - Khám phá khả năng Claude Code nâng cao

## Tài nguyên Bổ sung

- **[Tài liệu Hook chính thức](https://code.claude.com/docs/en/hooks)** - Tham chiếu hook đầy đủ
- **[Tham chiếu CLI](https://code.claude.com/docs/en/cli-reference)** - Tài liệu giao diện dòng lệnh
- **[Hướng dẫn Memory](../02-memory/)** - Cấu hình ngữ cảnh duy trì
