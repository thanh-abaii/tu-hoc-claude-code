# Giải pháp: MCP

## Bài 1: GitHub MCP Server

### Bước 1: Cấu hình trong `.claude/settings.json`
```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "your-token-here"
      }
    }
  }
}
```

### Bước 2: Kiểm tra
Sau khi config, Claude Code sẽ nhận diện các tools từ GitHub MCP:
- `list_issues` - liệt kê issues
- `create_issue` - tạo issue mới
- `get_pull_request` - lấy PR details
- `search_code` - tìm kiếm code

### Bước 3: Test
```
Agent(description="Tìm issue trong repo", prompt="Search for open issues in the this-repo/this-repo repository. List the top 5 most recently updated issues.", subagent_type="general-purpose")
```

## Bài 2: Firecrawl MCP Server

### Bước 1: Cấu hình
```json
{
  "mcpServers": {
    "firecrawl": {
      "command": "npx",
      "args": ["-y", "firecrawl-mcp-server"],
      "env": {
        "FIRECRAWL_API_KEY": "your-api-key-here"
      }
    }
  }
}
```

### Bước 2: Test
```
Agent(description="Lấy nội dung web", prompt="Use Firecrawl to scrape the content from https://docs.anthropic.com/en/docs/claude-code/overview. Extract the main sections and key points.", subagent_type="general-purpose")
```

### Bước 3: Dùng agent research
```
Agent(description="Nghiên cứu công nghệ mới", prompt="Search the web for the latest Claude Code features released in 2026. Summarize the top 3 most impactful features.", subagent_type="general-purpose")
```

## Bài 3: Filesystem MCP Server

### Bước 1: Cấu hình
```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/path/to/allowed/dir1", "/path/to/allowed/dir2"]
    }
  }
}
```

### Bước 2: Allowed directories
- Chỉ định rõ các directories MCP được access
- Không cho phép truy cập thư mục nhạy cảm (.env, credentials)
- Separate directories bằng space trong args

### Bước 3: Test
```
Agent(description="Đọc file ngoài project", prompt="Use the filesystem MCP to list the contents of /path/to/allowed/dir1. Read any .md files found there.", subagent_type="general-purpose")
```

## Lưu ý bảo mật
1. KHÔNG commit API keys vào git
2. Dùng biến môi trường hoặc `.env` (đã gitignore)
3. Limited allowed directories cho filesystem MCP
4. Review kỹ MCP server trước khi install
