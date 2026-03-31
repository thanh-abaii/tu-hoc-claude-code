
# MCP (Model Context Protocol)

Thư mục này chứa tài liệu toàn diện và các ví dụ về cấu hình và sử dụng máy chủ MCP với Claude Code.

## Tổng quan

MCP (Model Context Protocol) là cách tiêu chuẩn hóa để Claude truy cập các công cụ bên ngoài, API và nguồn dữ liệu thời gian thực. Không giống như Memory, MCP cung cấp quyền truy cập trực tiếp vào dữ liệu đang thay đổi.

Đặc điểm chính:
- Truy cập thời gian thực vào dịch vụ bên ngoài
- Đồng bộ dữ liệu trực tiếp
- Kiến trúc mở rộng
- Xác thực bảo mật
- Tương tác dựa trên công cụ

## Kiến trúc MCP

```mermaid
graph TB
    A["Claude"]
    B["Máy chủ MCP"]
    C["Dịch vụ bên ngoài"]

    A -->|Yêu cầu: list_issues| B
    B -->|Truy vấn| C
    C -->|Dữ liệu| B
    B -->|Phản hồi| A

    A -->|Yêu cầu: create_issue| B
    B -->|Hành động| C
    C -->|Kết quả| B
    B -->|Phản hồi| A

    style A fill:#e1f5fe,stroke:#333,color:#333
    style B fill:#f3e5f5,stroke:#333,color:#333
    style C fill:#e8f5e9,stroke:#333,color:#333
```

## Hệ sinh thái MCP

```mermaid
graph TB
    A["Claude"] -->|MCP| B["Filesystem<br/>MCP Server"]
    A -->|MCP| C["GitHub<br/>MCP Server"]
    A -->|MCP| D["Database<br/>MCP Server"]
    A -->|MCP| E["Slack<br/>MCP Server"]
    A -->|MCP| F["Google Docs<br/>MCP Server"]

    B -->|I/O Tệp| G["Tệp cục bộ"]
    C -->|API| H["GitHub Repos"]
    D -->|Truy vấn| I["PostgreSQL/MySQL"]
    E -->|Tin nhắn| J["Slack Workspace"]
    F -->|Tài liệu| K["Google Drive"]

    style A fill:#e1f5fe,stroke:#333,color:#333
    style B fill:#f3e5f5,stroke:#333,color:#333
    style C fill:#f3e5f5,stroke:#333,color:#333
    style D fill:#f3e5f5,stroke:#333,color:#333
    style E fill:#f3e5f5,stroke:#333,color:#333
    style F fill:#f3e5f5,stroke:#333,color:#333
    style G fill:#e8f5e9,stroke:#333,color:#333
    style H fill:#e8f5e9,stroke:#333,color:#333
    style I fill:#e8f5e9,stroke:#333,color:#333
    style J fill:#e8f5e9,stroke:#333,color:#333
    style K fill:#e8f5e9,stroke:#333,color:#333
```

## Phương thức cài đặt MCP

Claude Code hỗ trợ nhiều giao thức truyền tải cho kết nối máy chủ MCP:

### HTTP Transport (Khuyến nghị)

```bash
# Kết nối HTTP cơ bản
claude mcp add --transport http notion https://mcp.notion.com/mcp

# HTTP có xác thực
claude mcp add --transport http secure-api https://api.example.com/mcp \
  --header "Authorization: Bearer your-token"
```

### Stdio Transport (Cục bộ)

Cho các máy chủ MCP chạy cục bộ:

```bash
# Máy chủ Node.js cục bộ
claude mcp add --transport stdio myserver -- npx @myorg/mcp-server

# Với biến môi trường
claude mcp add --transport stdio myserver --env KEY=value -- npx server
```

### SSE Transport (Không dùng nữa)

Giao thức Server-Sent Events đã bị không dùng nữa để ưu tiên `http` nhưng vẫn được hỗ trợ:

```bash
claude mcp add --transport sse legacy-server https://example.com/sse
```

### WebSocket Transport

Giao thức WebSocket cho kết nối hai chiều liên tục:

```bash
claude mcp add --transport ws realtime-server wss://example.com/mcp
```

### Lưu ý cho Windows

Trên Windows gốc (không phải WSL), dùng `cmd /c` cho lệnh npx:

```bash
claude mcp add --transport stdio my-server -- cmd /c npx -y @some/package
```

### Xác thực OAuth 2.0

Claude Code hỗ trợ OAuth 2.0 cho các máy chủ MCP yêu cầu. Khi kết nối đến máy chủ bật OAuth, Claude Code xử lý toàn bộ luồng xác thực:

```bash
# Kết nối máy chủ MCP bật OAuth (luồng tương tác)
claude mcp add --transport http my-service https://my-service.example.com/mcp

# Cấu hình trước thông tin OAuth cho thiết lập không tương tác
claude mcp add --transport http my-service https://my-service.example.com/mcp \
  --client-id "your-client-id" \
  --client-secret "your-client-secret" \
  --callback-port 8080
```

| Tính năng | Mô tả |
|---------|-------------|
| **OAuth tương tác** | Dùng `/mcp` để kích hoạt luồng OAuth qua trình duyệt |
| **OAuth client có sẵn** | Các OAuth client tích hợp sẵn cho dịch vụ phổ biến như Notion, Stripe và nhiều dịch vụ khác (v2.1.30+) |
| **Thông tin xác thực cấu hình trước** | Các tham số `--client-id`, `--client-secret`, `--callback-port` cho thiết lập tự động |
| **Lưu trữ token** | Token được lưu trữ an toàn trong keychain hệ thống |
| **Xác thực từng bước** | Hỗ trợ xác thực từng bước cho các thao tác đặc quyền |
| **Bộ nhớ đệm khám phá** | Dữ liệu khám phá siêu dữ liệu OAuth được lưu đệm để kết nối lại nhanh hơn |
| **Ghi đè siêu dữ liệu** | `oauth.authServerMetadataUrl` trong `.mcp.json` để ghi đè khám phá siêu dữ liệu OAuth mặc định |

#### Ghi đè Khám phá Siêu dữ liệu OAuth

Nếu máy chủ MCP trả về lỗi trên điểm cuối siêu dữ liệu OAuth tiêu chuẩn (`/.well-known/oauth-authorization-server`) nhưng cung cấp điểm cuối OIDC hoạt động, bạn có thể yêu cầu Claude Code lấy siêu dữ liệu OAuth từ URL cụ thể. Đặt `authServerMetadataUrl` trong đối tượng `oauth` của cấu hình máy chủ:

```json
{
  "mcpServers": {
    "my-server": {
      "type": "http",
      "url": "https://mcp.example.com/mcp",
      "oauth": {
        "authServerMetadataUrl": "https://auth.example.com/.well-known/openid-configuration"
      }
    }
  }
}
```

URL phải sử dụng `https://`. Tùy chọn này yêu cầu Claude Code v2.1.64 trở lên.

### Đầu nối MCP của Claude.ai

Các máy chủ MCP cấu hình trong tài khoản Claude.ai của bạn sẽ tự động khả dụng trong Claude Code. Điều này có nghĩa mọi kết nối MCP bạn thiết lập qua giao diện web Claude.ai sẽ được truy cập mà không cần cấu hình thêm.

Đầu nối MCP Claude.ai cũng khả dụng ở chế độ `--print` (v2.1.83+), cho phép sử dụng không tương tác và qua kịch bản.

Để tắt máy chủ MCP Claude.ai trong Claude Code, đặt biến môi trường `ENABLE_CLAUDEAI_MCP_SERVERS` thành `false`:

```bash
ENABLE_CLAUDEAI_MCP_SERVERS=false claude
```

> **Lưu ý:** Tính năng này chỉ khả dụng cho người dùng đăng nhập bằng tài khoản Claude.ai.

## Quy trình thiết lập MCP

```mermaid
sequenceDiagram
    participant User
    participant Claude as Claude Code
    participant Config as Tệp cấu hình
    participant Service as Dịch vụ bên ngoài

    User->>Claude: Gõ /mcp
    Claude->>Claude: Liệt kê máy chủ MCP khả dụng
    Claude->>User: Hiển thị tùy chọn
    User->>Claude: Chọn MCP GitHub
    Claude->>Config: Cập nhật cấu hình
    Config->>Claude: Kích hoạt kết nối
    Claude->>Service: Kiểm tra kết nối
    Service-->>Claude: Xác thực thành công
    Claude->>User: MCP đã kết nối!
```

## Tìm kiếm công cụ MCP

Khi mô tả công cụ MCP vượt quá 10% cửa sổ ngữ cảnh, Claude Code tự động bật tìm kiếm công cụ để chọn đúng công cụ hiệu quả mà không gây quá tải ngữ cảnh mô hình.

| Thiết lập | Giá trị | Mô tả |
|---------|-------|-------------|
| `ENABLE_TOOL_SEARCH` | `auto` (mặc định) | Tự động bật khi mô tả công cụ vượt quá 10% ngữ cảnh |
| `ENABLE_TOOL_SEARCH` | `auto:<N>` | Tự động bật tại ngưỡng tùy chỉnh `N` công cụ |
| `ENABLE_TOOL_SEARCH` | `true` | Luôn bật bất kể số lượng công cụ |
| `ENABLE_TOOL_SEARCH` | `false` | Đã tắt; tất cả mô tả công cụ được gửi đầy đủ |

> **Lưu ý:** Tìm kiếm công cụ yêu cầu Sonnet 4 trở lên hoặc Opus 4 trở lên. Các mô hình Haiku không được hỗ trợ cho tìm kiếm công cụ.

## Cập nhật công cụ động

Claude Code hỗ trợ thông báo `list_changed` của MCP. Khi máy chủ MCP thêm, xóa hoặc sửa đổi công cụ khả dụng một cách động, Claude Code nhận cập nhật và tự động điều chỉnh danh sách công cụ -- không cần kết nối lại hoặc khởi động lại.

## Hội thoại MCP (Elicitation)

Máy chủ MCP có thể yêu cầu nhập liệu có cấu trúc từ người dùng qua hộp thoại tương tác (v2.1.49+). Điều này cho phép máy chủ MCP hỏi thêm thông tin giữa luồng làm việc -- ví dụ, nhắc xác nhận, chọn từ danh sách tùy chọn hoặc điền trường bắt buộc -- tăng tính tương tác trong tương tác máy chủ MCP.

## Giới hạn Mô tả và Hướng dẫn Công cụ

Kể từ v2.1.84, Claude Code áp dụng **giới hạn 2 KB** cho mô tả và hướng dẫn công cụ trên mỗi máy chủ MCP. Điều này ngăn từng máy chủ tiêu thụ ngữ cảnh quá mức với định nghĩa công cụ quá dài, giảm phình to ngữ cảnh và giữ tương tác hiệu quả.

## Lời nhắc MCP dưới dạng Lệnh Gạch chéo

Máy chủ MCP có thể hiển thị lời nhắc xuất hiện dưới dạng lệnh gạch chéo trong Claude Code. Có thể truy cập lời nhắc bằng quy ước đặt tên:

```
/mcp__<server>__<prompt>
```

Ví dụ, nếu máy chủ tên `github` hiển thị lời nhắc `review`, bạn có thể gọi nó bằng `/mcp__github__review`.

## Khử trùng lặp Máy chủ

Khi cùng máy chủ MCP được định nghĩa ở nhiều phạm vi (cục bộ, dự án, người dùng), cấu hình cục bộ được ưu tiên. Điều này cho phép bạn ghi đè cài đặt MCP cấp dự án hoặc người dùng bằng tùy chỉnh cục bộ mà không xung đột.

## Tài nguyên MCP qua đề cập @

Bạn có thể tham chiếu tài nguyên MCP trực tiếp trong lời nhắc bằng cú pháp đề cập `@`:

```
@ten-may-chu:protocol://resource/path
```

Ví dụ, để tham chiếu tài nguyên cơ sở dữ liệu cụ thể:

```
@database:postgres://mydb/users
```

Điều này cho phép Claude lấy và chèn nội dung tài nguyên MCP trực tiếp vào ngữ cảnh hội thoại.

## Phạm vi MCP

Cấu hình MCP có thể lưu trữ ở các phạm vi khác nhau với mức chia sẻ khác nhau:

| Phạm vi | Vị trí | Mô tả | Chia sẻ với | Yêu cầu phê duyệt |
|-------|----------|-------------|-------------|------------------|
| **Cục bộ** (mặc định) | `~/.claude.json` (theo đường dẫn dự án) | Riêng tư cho người dùng hiện tại, chỉ dự án hiện tại (đã gọi là `project` trong bản cũ hơn) | Chỉ bạn | Không |
| **Dự án** | `.mcp.json` | Đưa vào kho git | Thành viên nhóm | Có (lần đầu dùng) |
| **Người dùng** | `~/.claude.json` | Khả dụng trên mọi dự án (đã gọi là `global` trong bản cũ hơn) | Chỉ bạn | Không |

### Sử dụng phạm vi Dự án

Lưu trữ cấu hình MCP cụ thể dự án trong `.mcp.json`:

```json
{
  "mcpServers": {
    "github": {
      "type": "http",
      "url": "https://api.github.com/mcp"
    }
  }
}
```

Thành viên nhóm sẽ thấy lời nhắc phê duyệt khi lần đầu sử dụng MCP dự án.

## Quản lý cấu hình MCP

### Thêm máy chủ MCP

```bash
# Thêm máy chủ HTTP
claude mcp add --transport http github https://api.github.com/mcp

# Thêm máy chủ stdio cục bộ
claude mcp add --transport stdio database -- npx @company/db-server

# Liệt kê tất cả máy chủ MCP
claude mcp list

# Xem chi tiết máy chủ cụ thể
claude mcp get github

# Xóa máy chủ MCP
claude mcp remove github

# Đặt lại các lựa chọn phê duyệt cấp dự án
claude mcp reset-project-choices

# Nhập từ Claude Desktop
claude mcp add-from-claude-desktop
```

## Bảng máy chủ MCP khả dụng

| Máy chủ MCP | Mục đích | Công cụ phổ biến | Xác thực | Thời gian thực |
|------------|---------|--------------|------|-----------|
| **Filesystem** | Thao tác tệp | read, write, delete | Quyền hệ điều hành | Có |
| **GitHub** | Quản lý kho mã | list_prs, create_issue, push | OAuth | Có |
| **Slack** | Liên lạc nhóm | send_message, list_channels | Token | Có |
| **Database** | Truy vấn SQL | query, insert, update | Thông tin xác thực | Có |
| **Google Docs** | Truy cập tài liệu | read, write, share | OAuth | Có |
| **Asana** | Quản lý dự án | create_task, update_status | API Key | Có |
| **Stripe** | Dữ liệu thanh toán | list_charges, create_invoice | API Key | Có |
| **Memory** | Bộ nhớ liên tục | store, retrieve, delete | Cục bộ | Không |

## Ví dụ thực tế

### Ví dụ 1: Cấu hình MCP cho GitHub

**Tệp:** `.mcp.json` (thư mục gốc dự án)

```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_TOKEN": "${GITHUB_TOKEN}"
      }
    }
  }
}
```

**Công cụ MCP của GitHub khả dụng:**

#### Quản lý Pull Request
- `list_prs` - Liệt kê tất cả PR trong kho mã
- `get_pr` - Xem chi tiết PR bao gồm diff
- `create_pr` - Tạo PR mới
- `update_pr` - Cập nhật mô tả/tiêu đề PR
- `merge_pr` - Gộp PR vào nhánh chính
- `review_pr` - Thêm nhận xét đánh giá

**Ví dụ yêu cầu:**
```
/mcp__github__get_pr 456

# Trả về:
Title: Add dark mode support
Author: @alice
Description: Implements dark theme using CSS variables
Status: OPEN
Reviewers: @bob, @charlie
```

#### Quản lý Issue
- `list_issues` - Liệt kê tất cả issue
- `get_issue` - Xem chi tiết issue
- `create_issue` - Tạo issue mới
- `close_issue` - Đóng issue
- `add_comment` - Thêm bình luận vào issue

#### Thông tin kho mã
- `get_repo_info` - Chi tiết kho mã
- `list_files` - Cấu trúc cây tệp
- `get_file_content` - Đọc nội dung tệp
- `search_code` - Tìm kiếm trong mã nguồn

#### Thao tác Commit
- `list_commits` - Lịch sử commit
- `get_commit` - Chi tiết commit cụ thể
- `create_commit` - Tạo commit mới

**Thiết lập**:
```bash
export GITHUB_TOKEN="your_github_token"
# Hoặc dùng trực tiếp từ CLI:
claude mcp add --transport stdio github -- npx @modelcontextprotocol/server-github
```

### Mở rộng biến môi trường trong cấu hình

Cấu hình MCP hỗ trợ mở rộng biến môi trường với giá trị mặc định. Cú pháp `${VAR}` và `${VAR:-default}` hoạt động trong các trường: `command`, `args`, `env`, `url` và `headers`.

```json
{
  "mcpServers": {
    "api-server": {
      "type": "http",
      "url": "${API_BASE_URL:-https://api.example.com}/mcp",
      "headers": {
        "Authorization": "Bearer ${API_KEY}",
        "X-Custom-Header": "${CUSTOM_HEADER:-default-value}"
      }
    },
    "local-server": {
      "command": "${MCP_BIN_PATH:-npx}",
      "args": ["${MCP_PACKAGE:-@company/mcp-server}"],
      "env": {
        "DB_URL": "${DATABASE_URL:-postgresql://localhost/dev}"
      }
    }
  }
}
```

Biến được mở rộng tại thời điểm chạy:
- `${VAR}` - Dùng biến môi trường, báo lỗi nếu chưa đặt
- `${VAR:-default}` - Dùng biến môi trường, dùng giá trị mặc định nếu chưa đặt

### Ví dụ 2: Thiết lập MCP cho Database

**Cấu hình:**

```json
{
  "mcpServers": {
    "database": {
      "command": "npx",
      "args": ["@modelcontextprotocol/server-database"],
      "env": {
        "DATABASE_URL": "postgresql://user:pass@localhost/mydb"
      }
    }
  }
}
```

**Ví dụ sử dụng:**

```markdown
User: Fetch all users with more than 10 orders

Claude: I'll query your database to find that information.

# Sử dụng công cụ MCP cơ sở dữ liệu:
SELECT u.*, COUNT(o.id) as order_count
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
GROUP BY u.id
HAVING COUNT(o.id) > 10
ORDER BY order_count DESC;

# Kết quả:
- Alice: 15 orders
- Bob: 12 orders
- Charlie: 11 orders
```

**Thiết lập**:
```bash
export DATABASE_URL="postgresql://user:pass@localhost/mydb"
# Hoặc dùng trực tiếp từ CLI:
claude mcp add --transport stdio database -- npx @modelcontextprotocol/server-database
```

### Ví dụ 3: Luồng làm việc Đa MCP

**Kịch bản: Tạo báo cáo hàng ngày**

```markdown
# Luồng báo cáo hàng ngày sử dụng nhiều MCP

## Thiết lập
1. GitHub MCP - lấy chỉ số PR
2. Database MCP - truy vấn dữ liệu doanh số
3. Slack MCP - đăng báo cáo
4. Filesystem MCP - lưu báo cáo

## Quy trình

### Bước 1: Lấy dữ liệu GitHub
/mcp__github__list_prs completed:true last:7days

Kết quả:
- Tổng PR: 42
- Thời gian merge trung bình: 2.3 giờ
- Thời gian phản hồi review: 1.1 giờ

### Bước 2: Truy vấn cơ sở dữ liệu
SELECT COUNT(*) as sales, SUM(amount) as revenue
FROM orders
WHERE created_at > NOW() - INTERVAL '1 day'

Kết quả:
- Đơn hàng: 247
- Doanh thu: $12,450

### Bước 3: Tạo báo cáo
Kết hợp dữ liệu thành báo cáo HTML

### Bước 4: Lưu vào Filesystem
Ghi report.html vào /reports/

### Bước 5: Đăng lên Slack
Gửi tóm tắt đến kênh #daily-reports

Kết quả:
Báo cáo đã được tạo và đăng
47 PR đã gộp trong tuần này
$12,450 doanh số hàng ngày
```

**Thiết lập**:
```bash
export GITHUB_TOKEN="your_github_token"
export DATABASE_URL="postgresql://user:pass@localhost/mydb"
export SLACK_TOKEN="your_slack_token"
# Thêm từng MCP server qua CLI hoặc cấu hình trong .mcp.json
```

### Ví dụ 4: Thao tác MCP Filesystem

**Cấu hình:**

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["@modelcontextprotocol/server-filesystem", "/home/user/projects"]
    }
  }
}
```

**Thao tác khả dụng:**

| Thao tác | Lệnh | Mục đích |
|-----------|---------|---------|
| Liệt kê tệp | `ls ~/projects` | Hiện nội dung thư mục |
| Đọc tệp | `cat src/main.ts` | Đọc nội dung tệp |
| Ghi tệp | `create docs/api.md` | Tạo tệp mới |
| Sửa tệp | `edit src/app.ts` | Sửa đổi tệp |
| Tìm kiếm | `grep "async function"` | Tìm kiếm trong tệp |
| Xóa | `rm old-file.js` | Xóa tệp |

**Thiết lập**:
```bash
# Dùng CLI để thêm trực tiếp:
claude mcp add --transport stdio filesystem -- npx @modelcontextprotocol/server-filesystem /home/user/projects
```

## Ma trận quyết định: MCP vs Memory

```mermaid
graph TD
    A["Cần dữ liệu bên ngoài?"]
    A -->|Không| B["Dùng Memory"]
    A -->|Có| C["Dữ liệu thay đổi thường xuyên?"]
    C -->|Không/Hiếm| B
    C -->|Có/Thường xuyên| D["Dùng MCP"]

    B -->|Lưu trữ| E["Tùy chọn<br/>Ngữ cảnh<br/>Lịch sử"]
    D -->|Truy cập| F["API trực tiếp<br/>Cơ sở dữ liệu<br/>Dịch vụ"]

    style A fill:#fff3e0,stroke:#333,color:#333
    style B fill:#e1f5fe,stroke:#333,color:#333
    style C fill:#fff3e0,stroke:#333,color:#333
    style D fill:#f3e5f5,stroke:#333,color:#333
    style E fill:#e8f5e9,stroke:#333,color:#333
    style F fill:#e8f5e9,stroke:#333,color:#333
```

## Mẫu Yêu cầu/Phản hồi

```mermaid
sequenceDiagram
    participant App as Claude
    participant MCP as Máy chủ MCP
    participant DB as Cơ sở dữ liệu

    App->>MCP: Yêu cầu: "SELECT * FROM users WHERE id=1"
    MCP->>DB: Thực thi truy vấn
    DB-->>MCP: Tập kết quả
    MCP-->>App: Trả về dữ liệu đã phân tích
    App->>App: Xử lý kết quả
    App->>App: Tiếp tục tác vụ

    Note over MCP,DB: Truy cập thời gian thực<br/>Không lưu đệm
```

## Biến môi trường

Lưu trữ thông tin xác thực nhạy cảm trong biến môi trường:

```bash
# ~/.bashrc hoặc ~/.zshrc
export GITHUB_TOKEN="ghp_xxxxxxxxxxxxx"
export DATABASE_URL="postgresql://user:pass@localhost/mydb"
export SLACK_TOKEN="xoxb-xxxxxxxxxxxxx"
```

Sau đó tham chiếu chúng trong cấu hình MCP:

```json
{
  "env": {
    "GITHUB_TOKEN": "${GITHUB_TOKEN}"
  }
}
```

## Claude làm Máy chủ MCP (`claude mcp serve`)

Claude Code có thể hoạt động như một máy chủ MCP cho các ứng dụng khác. Điều này cho phép các công cụ bên ngoài, trình soạn thảo và hệ thống tự động tận dụng khả năng của Claude qua giao thức MCP tiêu chuẩn.

```bash
# Khởi động Claude Code làm máy chủ MCP trên stdio
claude mcp serve
```

Các ứng dụng khác sau đó có thể kết nối đến máy chủ này như bất kỳ máy chủ MCP dựa trên stdio nào. Ví dụ, để thêm Claude Code làm máy chủ MCP trong một phiên bản Claude Code khác:

```bash
claude mcp add --transport stdio claude-agent -- claude mcp serve
```

Điều này hữu ích cho việc xây dựng luồng làm việc đa tác nhân nơi một phiên bản Claude điều phối phiên bản khác.

## Cấu hình MCP quản lý tập trung (Doanh nghiệp)

Cho môi trường doanh nghiệp, quản trị viên CNTT có thể thực thi chính sách máy chủ MCP qua tệp cấu hình `managed-mcp.json`. Tệp này cung cấp kiểm soát độc quyền về những máy chủ MCP được phép hoặc bị chặn trên toàn tổ chức.

**Vị trí:**
- macOS: `/Library/Application Support/ClaudeCode/managed-mcp.json`
- Linux: `~/.config/ClaudeCode/managed-mcp.json`
- Windows: `%APPDATA%\ClaudeCode\managed-mcp.json`

**Tính năng:**
- `allowedMcpServers` -- danh sách trắng máy chủ được phép
- `deniedMcpServers` -- danh sách đen máy chủ bị cấm
- Hỗ trợ khớp theo tên máy chủ, lệnh và mẫu URL
- Chính sách MCP toàn tổ chức được thực thi trước cấu hình người dùng
- Ngăn kết nối máy chủ trái phép

**Ví dụ cấu hình:**

```json
{
  "allowedMcpServers": [
    {
      "serverName": "github",
      "serverUrl": "https://api.github.com/mcp"
    },
    {
      "serverName": "company-internal",
      "serverCommand": "company-mcp-server"
    }
  ],
  "deniedMcpServers": [
    {
      "serverName": "untrusted-*"
    },
    {
      "serverUrl": "http://*"
    }
  ]
}
```

> **Lưu ý:** Khi cả `allowedMcpServers` và `deniedMcpServers` đều khớp với một máy chủ, quy tắc chặn được ưu tiên.

## Máy chủ MCP do Plugin cung cấp

Plugin có thể đóng gói máy chủ MCP riêng, giúp chúng khả dụng tự động khi plugin được cài đặt. Máy chủ MCP do plugin cung cấp có thể được định nghĩa theo hai cách:

1. **Tệp `.mcp.json` độc lập** -- Đặt tệp `.mcp.json` trong thư mục gốc của plugin
2. **Inline trong `plugin.json`** -- Định nghĩa máy chủ MCP trực tiếp trong manifest plugin

Dùng biến `${CLAUDE_PLUGIN_ROOT}` để tham chiếu đường dẫn tương đối đến thư mục cài đặt plugin:

```json
{
  "mcpServers": {
    "plugin-tools": {
      "command": "node",
      "args": ["${CLAUDE_PLUGIN_ROOT}/dist/mcp-server.js"],
      "env": {
        "CONFIG_PATH": "${CLAUDE_PLUGIN_ROOT}/config.json"
      }
    }
  }
}
```

## MCP theo phạm vi Subagent

Máy chủ MCP có thể được định nghĩa inline trong frontmatter của tác nhân bằng khóa `mcpServers:`, giới hạn chúng trong một subagent cụ thể thay vì toàn bộ dự án. Điều này hữu ích khi một tác nhân cần truy cập máy chủ MCP cụ thể mà các tác nhân khác trong luồng làm việc không cần.

```yaml
---
mcpServers:
  my-tool:
    type: http
    url: https://my-tool.example.com/mcp
---

Bạn là một tác nhân có quyền truy cập my-tool cho các thao tác chuyên biệt.
```

Máy chủ MCP theo phạm vi subagent chỉ khả dụng trong ngữ cảnh thực thi của tác nhân đó và không được chia sẻ với tác nhân cha hoặc anh em.

## Giới hạn đầu ra MCP

Claude Code áp dụng giới hạn cho đầu ra công cụ MCP để ngăn tràn ngữ cảnh:

| Giới hạn | Ngưỡng | Hành vi |
|-------|-----------|----------|
| **Cảnh báo** | 10.000 token | Hiển thị cảnh báo đầu ra quá lớn |
| **Tối đa mặc định** | 25.000 token | Đầu ra bị cắt ngắn sau ngưỡng này |
| **Lưu đĩa** | 50.000 ký tự | Kết quả công cụ vượt quá 50K ký tự được lưu vào đĩa |

Giới hạn đầu ra tối đa có thể cấu hình qua biến môi trường `MAX_MCP_OUTPUT_TOKENS`:

```bash
# Tăng giới hạn đầu ra lên 50.000 token
export MAX_MCP_OUTPUT_TOKENS=50000
```

## Giải quyết Phình to Ngữ cảnh bằng Thực thi mã

Khi việc áp dụng MCP mở rộng, kết nối đến hàng chục máy chủ với hàng trăm hoặc hàng nghìn công cụ tạo ra thách thức đáng kể: **phình to ngữ cảnh**. Đây là vấn đề lớn nhất với MCP ở quy mô lớn, và nhóm kỹ sư của Anthropic đã đề xuất giải pháp thanh lịch -- dùng thực thi mã thay vì gọi công cụ trực tiếp.

> **Nguồn**: [Code Execution with MCP: Building More Efficient Agents](https://www.anthropic.com/engineering/code-execution-with-mcp) -- Blog Kỹ thuật Anthropic

### Vấn đề: Hai nguồn lãng phí token

**1. Định nghĩa công cụ quá tải cửa sổ ngữ cảnh**

Hầu hết client MCP tải tất cả định nghĩa công cụ ngay từ đầu. Khi kết nối đến hàng nghìn công cụ, mô hình phải xử lý hàng trăm nghìn token trước khi đọc yêu cầu người dùng.

**2. Kết quả trung gian tiêu thụ token bổ sung**

Mọi kết quả công cụ trung gian đều đi qua ngữ cảnh mô hình. Ví dụ, chuyển bản ghi âm cuộc họp từ Google Drive sang Salesforce -- toàn bộ bản ghi âm đi qua ngữ cảnh **hai lần**: một lần khi đọc và một lần khi ghi đến đích. Bản ghi âm cuộc họp 2 giờ có thể có nghĩa là hơn 50.000 token bổ sung.

```mermaid
graph LR
    A["Mô hình"] -->|"Gọi công cụ: getDocument"| B["Máy chủ MCP"]
    B -->|"Toàn bộ bản ghi (50K token)"| A
    A -->|"Gọi công cụ: updateRecord<br/>(gửi lại toàn bộ bản ghi)"| B
    B -->|"Xác nhận"| A

    style A fill:#ffcdd2,stroke:#333,color:#333
    style B fill:#f3e5f5,stroke:#333,color:#333
```

### Giải pháp: Công cụ MCP dưới dạng Code API

Thay vì chuyển định nghĩa và kết quả công cụ qua cửa sổ ngữ cảnh, tác nhân **viết mã** gọi công cụ MCP như API. Mã chạy trong môi trường thực thi hộp cát, và chỉ kết quả cuối cùng trả về mô hình.

```mermaid
graph LR
    A["Mô hình"] -->|"Viết mã"| B["Môi trường<br/>Thực thi mã"]
    B -->|"Gọi công cụ trực tiếp"| C["Máy chủ MCP"]
    C -->|"Dữ liệu ở lại<br/>môi trường thực thi"| B
    B -->|"Chỉ kết quả cuối cùng<br/>(tối thiểu token)"| A

    style A fill:#c8e6c9,stroke:#333,color:#333
    style B fill:#e1f5fe,stroke:#333,color:#333
    style C fill:#f3e5f5,stroke:#333,color:#333
```

#### Cách thức hoạt động

Công cụ MCP được trình bày dưới dạng cây tệp hàm đã định kiểu:

```
servers/
├── google-drive/
│   ├── getDocument.ts
│   └── index.ts
├── salesforce/
│   ├── updateRecord.ts
│   └── index.ts
└── ...
```

Mỗi tệp công cụ chứa wrapper đã định kiểu:

```typescript
// ./servers/google-drive/getDocument.ts
import { callMCPTool } from "../../../client.js";

interface GetDocumentInput {
  documentId: string;
}

interface GetDocumentResponse {
  content: string;
}

export async function getDocument(
  input: GetDocumentInput
): Promise<GetDocumentResponse> {
  return callMCPTool<GetDocumentResponse>(
    'google_drive__get_document', input
  );
}
```

Sau đó tác nhân viết mã để điều phối công cụ:

```typescript
import * as gdrive from './servers/google-drive';
import * as salesforce from './servers/salesforce';

// Dữ liệu truyền trực tiếp giữa các công cụ -- không qua mô hình
const transcript = (
  await gdrive.getDocument({ documentId: 'abc123' })
).content;

await salesforce.updateRecord({
  objectType: 'SalesMeeting',
  recordId: '00Q5f000001abcXYZ',
  data: { Notes: transcript }
});
```

**Kết quả: Sử dụng token giảm từ ~150.000 xuống ~2.000 -- giảm 98.7%.**

### Lợi ích chính

| Lợi ích | Mô tả |
|---------|-------------|
| **Tiết lộ tiến bộ** | Tác nhân duyệt hệ thống tệp để chỉ tải định nghĩa công cụ cần thiết, thay vì tất cả ngay từ đầu |
| **Kết quả hiệu quả ngữ cảnh** | Dữ liệu được lọc/chuyển đổi trong môi trường thực thi trước khi trả về mô hình |
| **Điều khiển mạnh mẽ** | Vòng lặp, điều kiện và xử lý lỗi chạy trong mã mà không cần gửi qua lại mô hình |
| **Bảo tồn quyền riêng tư** | Dữ liệu trung gian (PII, hồ sơ nhạy cảm) ở lại môi trường thực thi; không bao giờ vào ngữ cảnh mô hình |
| **Lưu trạng thái** | Tác nhân có thể lưu kết quả trung gian vào tệp và xây dựng hàm kỹ năng tái sử dụng |

#### Ví dụ: Lọc tập dữ liệu lớn

```typescript
// Không có thực thi mã -- tất cả 10.000 hàng đi qua ngữ cảnh
// GỌI CÔNG CỤ: gdrive.getSheet(sheetId: 'abc123')
//   -> trả về 10.000 hàng trong ngữ cảnh

// Với thực thi mã -- lọc trong môi trường thực thi
const allRows = await gdrive.getSheet({ sheetId: 'abc123' });
const pendingOrders = allRows.filter(
  row => row["Status"] === 'pending'
);
console.log(`Found ${pendingOrders.length} pending orders`);
console.log(pendingOrders.slice(0, 5)); // Chỉ 5 hàng đến mô hình
```

#### Ví dụ: Vòng lặp không cần gửi qua lại

```typescript
// Thăm dò thông báo triển khai -- chạy hoàn toàn trong mã
let found = false;
while (!found) {
  const messages = await slack.getChannelHistory({
    channel: 'C123456'
  });
  found = messages.some(
    m => m.text.includes('deployment complete')
  );
  if (!found) await new Promise(r => setTimeout(r, 5000));
}
console.log('Deployment notification received');
```

### Đánh đổi cần xem xét

Thực thi mã tạo ra độ phức tạp riêng. Chạy mã do tác nhân tạo yêu cầu:

- **Môi trường thực thi hộp cát an toàn** với giới hạn tài nguyên phù hợp
- **Giám sát và nhật ký** cho mã đã thực thi
- **Chi phí hạ tầng bổ sung** so với gọi công cụ trực tiếp

Lợi ích -- giảm chi phí token, giảm độ trễ, cải thiện kết hợp công cụ -- cần được cân nhắc so với chi phí triển khai. Đối với tác nhân chỉ có vài máy chủ MCP, gọi công cụ trực tiếp có thể đơn giản hơn. Đối với tác nhân ở quy mô lớn (hàng chục máy chủ, hàng trăm công cụ), thực thi mã là cải tiến đáng kể.

### MCPorter: Môi trường thực thi cho Kết hợp Công cụ MCP

[MCPorter](https://github.com/steipete/mcporter) là môi trường thực thi TypeScript và bộ công cụ CLI giúp việc gọi máy chủ MCP trở nên thiết thực mà không cần mã mẫu -- đồng thời giúp giảm phình to ngữ cảnh qua hiển thị công cụ chọn lọc và wrapper định kiểu.

**Giải quyết vấn đề gì:** Thay vì tải tất cả định nghĩa công cụ từ mọi máy chủ MCP ngay từ đầu, MCPorter cho phép bạn khám phá, kiểm tra và gọi công cụ cụ thể theo yêu cầu -- giữ ngữ cảnh gọn nhẹ.

**Tính năng chính:**

| Tính năng | Mô tả |
|---------|-------------|
| **Khám phá không cấu hình** | Tự động khám phá máy chủ MCP từ Cursor, Claude, Codex hoặc cấu hình cục bộ |
| **Client công cụ định kiểu** | `mcporter emit-ts` tạo giao diện `.d.ts` và wrapper sẵn sàng chạy |
| **API kết hợp** | `createServerProxy()` hiển thị công cụ dưới dạng phương thức camelCase với hỗ trợ `.text()`, `.json()`, `.markdown()` |
| **Tạo CLI** | `mcporter generate-cli` chuyển đổi mọi máy chủ MCP thành CLI độc lập với lọc `--include-tools` / `--exclude-tools` |
| **Ẩn tham số** | Tham số tùy chọn được ẩn mặc định, giảm độ dài lược đồ |

**Cài đặt:**

```bash
npx mcporter list          # Không cần cài đặt -- khám phá máy chủ ngay lập tức
pnpm add mcporter          # Thêm vào dự án
brew install steipete/tap/mcporter  # macOS qua Homebrew
```

**Ví dụ -- kết hợp công cụ trong TypeScript:**

```typescript
import { createRuntime, createServerProxy } from "mcporter";

const runtime = await createRuntime();
const gdrive = createServerProxy(runtime, "google-drive");
const salesforce = createServerProxy(runtime, "salesforce");

// Dữ liệu truyền giữa các công cụ mà không đi qua ngữ cảnh mô hình
const doc = await gdrive.getDocument({ documentId: "abc123" });
await salesforce.updateRecord({
  objectType: "SalesMeeting",
  recordId: "00Q5f000001abcXYZ",
  data: { Notes: doc.text() }
});
```

**Ví dụ -- gọi công cụ từ CLI:**

```bash
# Gọi công cụ cụ thể trực tiếp
npx mcporter call linear.create_comment issueId:ENG-123 body:'Looks good!'

# Liệt kê máy chủ và công cụ khả dụng
npx mcporter list
```

MCPorter bổ sung cho cách tiếp cận thực thi mã mô tả ở trên bằng cách cung cấp hạ tầng thời gian chạy cho việc gọi công cụ MCP dưới dạng API định kiểu -- giúp dễ dàng giữ dữ liệu trung gian ngoài ngữ cảnh mô hình.

## Thực hành tốt nhất

### Cân nhắc bảo mật

#### Nên Làm
- Sử dụng biến môi trường cho mọi thông tin xác thực
- Luân chuyển token và API key thường xuyên (khuyến nghị hàng tháng)
- Dùng token chỉ đọc khi có thể
- Giới hạn phạm vi truy cập máy chủ MCP ở mức tối thiểu cần thiết
- Giám sát nhật ký sử dụng và truy cập máy chủ MCP
- Dùng OAuth cho dịch vụ bên ngoài khi khả dụng
- Triển khai giới hạn tốc độ cho yêu cầu MCP
- Kiểm tra kết nối MCP trước khi dùng sản xuất
- Tài liệu hóa tất cả kết nối MCP đang hoạt động
- Giữ gói máy chủ MCP cập nhật

#### Không Nên Làm
- Không mã cứng thông tin xác thực trong tệp cấu hình
- Không commit token hoặc bí mật lên git
- Không chia sẻ token trong chat nhóm hoặc email
- Không dùng token cá nhân cho dự án nhóm
- Không cấp quyền không cần thiết
- Không bỏ qua lỗi xác thực
- Không công khai điểm cuối MCP
- Không chạy máy chủ MCP với quyền root/admin
- Không lưu đệm dữ liệu nhạy cảm trong nhật ký
- Không vô hiệu hóa cơ chế xác thực

### Thực hành tốt nhất cấu hình

1. **Kiểm soát phiên bản**: Giữ `.mcp.json` trong git nhưng dùng biến môi trường cho bí mật
2. **Đặc quyền tối thiểu**: Cấp quyền tối thiểu cần thiết cho mỗi máy chủ MCP
3. **Cô lập**: Chạy máy chủ MCP khác nhau trong tiến trình riêng khi có thể
4. **Giám sát**: Ghi nhật ký mọi yêu cầu và lỗi MCP để kiểm tra
5. **Kiểm thử**: Kiểm tra mọi cấu hình MCP trước khi triển khai sản xuất

### Mẹo hiệu suất

- Lưu đệm dữ liệu truy cập thường xuyên ở cấp ứng dụng
- Dùng truy vấn MCP cụ thể để giảm truyền tải dữ liệu
- Giám sát thời gian phản hồi cho thao tác MCP
- Cân nhắc giới hạn tốc độ cho API bên ngoài
- Dùng gom lô khi thực hiện nhiều thao tác

## Hướng dẫn cài đặt

### Điều kiện tiên quyết
- Đã cài đặt Node.js và npm
- Đã cài đặt Claude Code CLI
- Có token/thông tin xác thực cho dịch vụ bên ngoài

### Thiết lập từng bước

1. **Thêm máy chủ MCP đầu tiên** dùng CLI (ví dụ: GitHub):
```bash
claude mcp add --transport stdio github -- npx @modelcontextprotocol/server-github
```

   Hoặc tạo tệp `.mcp.json` trong thư mục gốc dự án:
```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_TOKEN": "${GITHUB_TOKEN}"
      }
    }
  }
}
```

2. **Đặt biến môi trường:**
```bash
export GITHUB_TOKEN="your_github_personal_access_token"
```

3. **Kiểm tra kết nối:**
```bash
claude /mcp
```

4. **Sử dụng công cụ MCP:**
```bash
/mcp__github__list_prs
/mcp__github__create_issue "Title" "Description"
```

### Cài đặt cho các dịch vụ cụ thể

**GitHub MCP:**
```bash
npm install -g @modelcontextprotocol/server-github
```

**Database MCP:**
```bash
npm install -g @modelcontextprotocol/server-database
```

**Filesystem MCP:**
```bash
npm install -g @modelcontextprotocol/server-filesystem
```

**Slack MCP:**
```bash
npm install -g @modelcontextprotocol/server-slack
```

## Xử lý sự cố

### Không tìm thấy máy chủ MCP
```bash
# Xác minh máy chủ MCP đã cài đặt
npm list -g @modelcontextprotocol/server-github

# Cài đặt nếu chưa có
npm install -g @modelcontextprotocol/server-github
```

### Xác thực thất bại
```bash
# Xác minh biến môi trường đã đặt
echo $GITHUB_TOKEN

# Đặt lại nếu cần
export GITHUB_TOKEN="your_token"

# Xác minh token có đúng quyền không
# Kiểm tra scope của token GitHub tại: https://github.com/settings/tokens
```

### Hết thời gian kết nối
- Kiểm tra kết nối mạng: `ping api.github.com`
- Xác minh điểm cuối API có thể truy cập
- Kiểm tra giới hạn tốc độ trên API
- Thử tăng thời gian chờ trong cấu hình
- Kiểm tra vấn đề tường lửa hoặc proxy

### Máy chủ MCP bị lỗi
- Kiểm tra nhật ký máy chủ MCP: `~/.claude/logs/`
- Xác minh mọi biến môi trường đã được đặt
- Đảm bảo quyền tệp chính xác
- Thử cài đặt lại gói máy chủ MCP
- Kiểm tra tiến trình xung đột trên cùng cổng

## Khái niệm liên quan

### Memory vs MCP
- **Memory**: Lưu trữ dữ liệu liên tục, không thay đổi (tùy chọn, ngữ cảnh, lịch sử)
- **MCP**: Truy cập dữ liệu trực tiếp, thay đổi (API, cơ sở dữ liệu, dịch vụ thời gian thực)

### Khi nào dùng cái nào
- **Dùng Memory** cho: Tùy chọn người dùng, lịch sử hội thoại, ngữ cảnh đã học
- **Dùng MCP** cho: GitHub issue hiện tại, truy vấn cơ sở dữ liệu trực tiếp, dữ liệu thời gian thực

### Tích hợp với tính năng Claude khác
- Kết hợp MCP với Memory cho ngữ cảnh phong phú
- Dùng công cụ MCP trong lời nhắc để suy luận tốt hơn
- Tận dụng nhiều MCP cho luồng làm việc phức tạp

## Tài nguyên bổ sung

- [Tài liệu MCP chính thức](https://code.claude.com/docs/en/mcp)
- [Đặc tả giao thức MCP](https://modelcontextprotocol.io/specification)
- [Kho lưu trữ MCP trên GitHub](https://github.com/modelcontextprotocol/servers)
- [Máy chủ MCP khả dụng](https://github.com/modelcontextprotocol/servers)
- [MCPorter](https://github.com/steipete/mcporter) -- Môi trường thực thi & CLI TypeScript để gọi máy chủ MCP không cần mã mẫu
- [Thực thi mã với MCP](https://www.anthropic.com/engineering/code-execution-with-mcp) -- Blog kỹ thuật của Anthropic về giải quyết phình to ngữ cảnh
- [Tham khảo CLI Claude Code](https://code.claude.com/docs/en/cli-reference)
- [Tài liệu API Claude](https://docs.anthropic.com)
