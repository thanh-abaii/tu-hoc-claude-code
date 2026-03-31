# Quiz: Advanced Features

## Câu 1
**Câu hỏi**: Planning Mode hoạt động như thế nào?
A. Claude viết code ngay lập tức
B. Claude tạo kế hoạch chi tiết trước, chờ phê duyệt rồi mới triển khai
C. Claude chỉ đưa gợi ý, không làm gì cả
D. Claude chạy test rồi mới lập kế hoạch
**Đáp án**: B
**Giải thích**: Planning Mode là two-phase approach: (1) Claude phân tích và tạo kế hoạch chi tiết, (2) Sau khi user phê duyệt, Claude thực thi kế hoạch.

## Câu 2
**Câu hỏi**: Extended Thinking dùng để làm gì?
A. Tăng tốc độ phản hồi
B. Cho phép Claude suy luận sâu hơn cho vấn đề phức tạp
C. Giảm token usage
D. Tự động fix bugs
**Đáp án**: B
**Giải thích**: Extended Thinking cho phép Claude dành nhiều thời gian hơn để phân tích vấn đề phức tạp, cải thiện chất lượng output cho tasks khó.

## Câu 3
**Câu hỏi**: Permission Mode nào cho phép Claude tự do hành động mà không hỏi?
A. `default`
B. `plan`
C. `auto` hoặc `dontAsk`
D. `acceptEdits`
**Đáp án**: C
**Giải thích**: `auto` là auto mode (có safety checks), `dontAsk` là bypass permission checks hoàn toàn. Đây là modes ít restrictive nhất.

## Câu 4
**Câu hỏi**: Print Mode (-p) dùng cho mục đích gì?
A. In tài liệu ra giấy
B. Chạy Claude Code không tương tác cho automation và CI/CD
C. In errors
D. Chạy với quyền cao hơn
**Đáp án**: B
**Giải thích**: Print mode (`claude -p`) chạy Claude Code không tương tác — Claude output kết quả mà không prompt user input. Perfect cho scripts, CI/CD.

## Câu 5
**Câu hỏi**: Background Tasks khác gì so với normal task?
A. Chạy chậm hơn
B. Chạy mà không chặn cuộc hội thoại chính, user có thể làm việc khác
C. Chạy trên server khác
D. Chỉ chạy sau khi user logout
**Đáp án**: B
**Giải thích**: Background tasks cho phép user tiếp tục conversation trong khi task chạy ngầm. User được notify khi task hoàn thành.

## Câu 6
**Câu hỏi**: Git Worktrees trong Claude Code dùng để làm gì?
A. Tăng tốc git operations
B. Tạo isolated copy của repo để làm việc song song
C. Backup repository
D. Merge branches tự động
**Đáp án**: B
**Giải thích**: Git worktrees cho phép tạo multiple working directories từ cùng repository, mỗi cái trên branch riêng — perfect cho parallel work.

## Câu 7
**Câu hỏi**: Sandboxing trong Claude Code nghĩa là gì?
A. Chạy code trong playground
B. Isolating file system và network access ở OS level
C. Chạy tests tự động
D. Tạo môi trường development
**Đáp án**: B
**Giải thích**: Sandboxing restricts Claude's access to file system và network ở operating system level, ngăn chặn unauthorized actions.

## Câu 8
**Câu hỏi**: Khi nào nên dùng Auto Mode?
A. Luôn luôn dùng
B. Cho trusted workflows đã được test kỹ
C. Cho debugging
D. Khi cần tạo plan
**Đáp án**: B
**Giải thích**: Auto Mode (experimental) tự động execute actions với safety checks. Chỉ nên dùng cho workflows bạn tin cậy và đã được test.

## Câu 9 (Mở)
**Câu hỏi**: Tại sao Planning Mode quan trọng cho complex tasks?
**Đáp án**: Vì complex tasks có nhiều moving parts, dependencies, và edge cases. Planning mode giúp Claude phân tích đầy đủ trước khi act, giảm risk của sai lầm tốn kém. User cũng có insight và control trước khi implementation bắt đầu.
**Giải thích**: Two-phase approach = better quality + user control + fewer mistakes.

## Câu 10 (Mở)
**Câu hỏi**: Sự khác biệt giữa Print Mode và headless mode (-p) là gì?
**Đáp án**: Print mode VÀ headless mode là cùng một tính năng. Khi dùng `-p` hoặc `--print`, Claude Code chạy không tương tác — nhận input từ command line, output tất cả results, không chờ user input. Perfect cho CI/CD pipelines và shell scripts.
**Giải thích**: Print mode và `-p` flag là aliases cho cùng chức năng.
