# Quiz: MCP (Model Context Protocol)

## Câu 1
**Câu hỏi**: MCP (Model Context Protocol) là gì?
A. Một loại plugin của Claude Code
B. Cách tiêu chuẩn hóa để Claude truy cập các công cụ bên ngoài, API và nguồn dữ liệu thời gian thực
C. Một subagent cho kết nối database
D. Một kỹ năng của Claude
**Đáp án**: B
**Giải thích**: MCP là giao thức tiêu chuẩn để Claude Code kết nối với các dịch vụ bên ngoài, cung cấp dữ liệu real-time qua kiến trúc server.

## Câu 2
**Câu hỏi**: Sự khác biệt giữa MCP và Memory là gì?
A. Không có khác biệt
B. MCP cung cấp dữ liệu real-time qua đồng bộ trực tiếp, Memory dựa trên file tĩnh
C. Memory realtime, MCP chỉ khi request
D. MCP nhanh hơn memory
**Đáp án**: B
**Giải thích**: MCP cung cấp dữ liệu real-time từ dịch vụ bên ngoài với đồng bộ trực tiếp. Memory dựa trên file tĩnh được duy trì theo thời gian.

## Câu 3
**Câu hỏi**: MCP server được cấu hình ở đâu?
A. Trong `.claude/settings.json` hoặc `claude_desktop_config.json`
B. Trong CLAUDE.md
C. Trong SKILL.md
D. Trong gitignore
**Đáp án**: A
**Giải thích**: MCP servers được cấu hình trong `.claude/settings.json` (project) hoặc `~/.claude/settings.json` (user).

## Câu 4
**Câu hỏi**: Cấu trúc của một MCP server config là gì?
A. `{ "url": "server.com", "apiKey": "key" }`
B. `"mcpServers": { "name": { "command": "...", "args": [...] } }`
C. `"mcp": [ "server1", "server2" ]`
D. `{ "servers": { "name": "config" } }`
**Đáp án**: B
**Giải thích**: MCP server config nằm trong `"mcpServers"` object, mỗi server có `command` (executable), `args` (arguments), và tùy chọn `env`.

## Câu 5
**Câu hỏi**: Ví dụ nào sau đây là MCP server phổ biến?
A. GitHub MCP Server, Firecrawl MCP
B. React, Vue, Angular
C. Jest, pytest
D. Docker, Kubernetes
**Đáp án**: A
**Giải thích**: GitHub MCP Server cho tương tác với repos, Firecrawl MCP cho web scraping. Các options khác không phải MCP servers.

## Câu 6
**Câu hỏi**: Khi nào MCP hữu ích nhất?
A. Khi cần dữ liệu real-time từ dịch vụ bên ngoài
B. Khi cần tạo file mới
C. Khi cần chạy git commit
D. Khi cần đọc file trong project
**Đáp án**: A
**Giải thích**: MCP phù hợp nhất khi cần dữ liệu real-time, dynamic từ external services (GitHub issues, database queries, web data).

## Câu 7
**Câu hỏi**: MCP có hỗ trợ authenticated access không?
A. Không, chỉ kết nối public
B. Có, qua biến môi trường và API keys trong config
C. Chỉ qua OAuth
D. Chỉ qua SSH
**Đáp án**: B
**Giải thích**: MCP hỗ trợ authenticated access qua biến môi trường (`env`) trong config, cho phép truyền API keys, tokens.

## Câu 8
**Câu hỏi**: Lệnh nào để kiểm tra MCP server status?
A. `/mcp status`
B. Có thể kiểm tra qua `/context` hoặc cài đặt
C. `claude mcp check`
D. Không có cách kiểm tra
**Đáp án**: B
**Giải thích**: `/context` command cho thấy context usage, bao gồm MCP. Cũng có thể kiểm tra trong settings UI hoặc qua server command.

## Câu 9 (Mở)
**Câu hỏi**: Khi nào bạn nên dùng MCP thay vì script Bash để lấy dữ liệu ngoài?
**Đáp án**: Dùng MCP khi: (1) cần tương tác thường xuyên với cùng dịch vụ; (2) cần structured data (không phải raw HTML/text); (3) muốn tích hợp seamless vào Claude workflow; (4) cần authentication xử lý tự động. Script Bash tốt cho one-off tasks.
**Giải thích**: MCP là giải pháp dài hạn cho external service integration; Bash script phù hợp cho quick ad-hoc tasks.

## Câu 10 (Mở)
**Câu hỏi**: Tại sao nói MCP là "kiến trúc mở rộng"?
**Đáp án**: Vì MCP cho phép thêm unlimited servers bên ngoài. Mỗi server là một plugin độc lập, có thể phát triển, deploy độc lập. Không giới hạn số lượng server hay loại service kết nối.
**Giải thích**: Kiến trúc MCP theo model server-client, mỗi server có thể phục vụ một loại service khác nhau.
