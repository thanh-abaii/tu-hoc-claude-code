# Quiz: Hooks

## Câu 1
**Câu hỏi**: Hook trong Claude Code là gì?
A. Một loại slash command
B. Script tự động chạy khi có sự kiện cụ thể
C. Một loại subagent
D. Một loại memory
**Đáp án**: B
**Giải thích**: Hooks là các script tự động chạy trước hoặc sau các sự kiện trong Claude Code.

## Câu 2
**Câu hỏi**: Hooks được cấu hình ở đâu?
A. `.claude/settings.json` hoặc CLAUDE.md
B. Trong file `.claude/hooks/`
C. Cả A và B
D. Qua lệnh `/hooks`
**Đáp án**: C
**Giải thích**: Hooks có thể được cấu hình trong `.claude/settings.json` (project) hoặc CLAUDE.md.

## Câu 3
**Câu hỏi**: Sự kiện nào có thể trigger hook?
A. ToolUse, ToolResult, UserPrompt
B. Chỉ khi Claude khởi động
C. Chỉ khi có file mới
D. Chỉ khi user request
**Đáp án**: A
**Giải thích**: Hooks trigger trên các sự kiện như PreToolUse, PostToolUse, và Notification (khi có tool results hoặc hệ thống events).

## Câu 4
**Câu hỏi**: PreToolUse hook nghĩa là gì?
A. Chạy sau khi tool được sử dụng
B. Chạy trước khi tool được sử dụng, có thể chặn hoặc sửa hành vi
C. Chạy khi user gõ lệnh
D. Chạy khi Claude khởi động
**Đáp án**: B
**Giải thích**: PreToolUse hooks chạy TRƯỚC khi tool execute, cho phép validate, modify, hoặc block tool call.

## Câu 5
**Câu hỏi**: PostToolUse hook khác PreToolUse thế nào?
A. Chạy trước khi tool execute
B. Chạy sau khi tool execute, cho phép xử lý kết quả
C. Chạy đồng thời với tool
D. Không có khác biệt
**Đáp án**: B
**Giải thích**: PostToolUse hooks chạy SAU khi tool hoàn thành, cho phép post-process kết quả, log, hoặc trigger actions tiếp theo.

## Câu 6
**Câu hỏi**: Hook có thể trả về `preventTool: true` để làm gì?
A. Cho phép tool chạy
B. Chặn tool execution
C. Restart Claude
D. Xóa hook
**Đáp án**: B
**Giải thích**: `preventTool: true` chặn tool execution. Ví dụ: ngăn xóa files quan trọng, ngăn commit secrets.

## Câu 7
**Câu hỏi**: Khi nào hooks hữu ích nhất?
A. Khi cần tự động hóa quy trình lặp lại
B. Khi cần bảo vệ khỏi hành vi nguy hiểm
C. Khi cần logging/audit
D. Tất cả đều đúng
**Đáp án**: D
**Giải thích**: Hooks hữu ích cho nhiều use cases: validation trước execution, logging, auto-trigger workflows, safety checks.

## Câu 8
**Câu hỏi**: Hook script được viết bằng ngôn ngữ nào?
A. Chỉ bash
B. Bất kỳ ngôn ngữ nào có executable từ command line (bash, python, node, etc.)
C. Chỉ JavaScript
D. Chỉ Python
**Đáp án**: B
**Giải thích**: Hook scripts có thể viết bằng bất kỳ ngôn ngữ nào executable từ CLI. Claude Code sẽ execute script thông qua shell.

## Câu 9 (Mở)
**Câu hỏi**: Cho ví dụ về một hook bảo mật hữu ích.
**Đáp án**: Hook PreToolUse chặn các lệnh `rm -rf` trên thư mục quan trọng, hoặc chặn commit nếu phát hiện file `.env` có chứa secrets. Script grep tìm patterns như `password=`, `api_key=` trong staged files.
**Giải thích**: Hooks bảo mật rất mạnh vì chạy tự động, không cần nhớ check manual.

## Câu 10 (Mở)
**Câu hỏi**: Tại sao hooks nên chạy nhanh và lightweight?
**Đáp án**: Vì hooks chạy blocking - Claude Code chờ hook hoàn thành trước khi tiếp tục. Hook chậm sẽ làm chậm toàn bộ workflow. Hook nên xử lý đơn giản, nhanh, hoặc delegate task dài cho background process.
**Giải thích**: Performance của hooks trực tiếp affecting user experience.
