# Thực hành: MCP

## Mô tả
Bạn cần kết nối Claude Code với các dịch vụ bên ngoài qua MCP để tăng năng suất.

## Bài 1: Cấu hình GitHub MCP Server

**Yêu cầu:**
1. Tạo cấu hình MCP server cho GitHub trong `.claude/settings.json`
2. Cấu hình với GitHub token để truy cập private repos
3. Test bằng cách query issues từ một repo

## Bài 2: Cấu hình Firecrawl MCP Server

**Yereu cầu:**
1. Cài đặt Firecrawl MCP server (web scraping)
2. Cấu hình API key
3. Test bằng cách lấy nội dung từ một URL cụ thể

## Bài 3: Cấu hình Filesystem MCP Server

**Yêu cầu:**
1. Cấu hình Filesystem MCP để làm việc với thư mục ngoài project
2. Define allowed directories
3. Test đọc file từ thư mục được phép

## Gợi ý bắt đầu
- MCP server config nằm trong `.claude/settings.json` dưới key `mcpServers`
- Mỗi server cần `command`, optional `args`, optional `env`
- API keys nên được lưu trong biến môi trường, không hardcoded

## Nộp bài
Gửi kết quả cho @teacher để review
