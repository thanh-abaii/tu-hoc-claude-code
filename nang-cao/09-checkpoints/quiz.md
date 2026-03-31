# Quiz: Checkpoints

## Câu 1
**Câu hỏi**: Checkpoint trong Claude Code là gì?
A. Một bản lưu trạng thái cuộc hội thoại để rollback
B. Một loại memory vĩnh viễn
C. Một file backup của git
D. Một loại skill
**Đáp án**: A
**Giải thích**: Checkpoints cho phép lưu trạng thái cuộc hội thoại và hoàn tác các thay đổi — giống như git checkpoints cho Claude's work.

## Câu 2
**Câu hỏi**: Khi nào nên sử dụng checkpoint?
A. Trước khi thực hiện chuỗi thay đổi phức tạp
B. Mỗi khi Claude khởi động
C. Sau mỗi câu trả lời
D. Chỉ khi có lỗi
**Đáp án**: A
**Giải thích**: Checkpoints hữu ích nhất trước khi bắt đầu task phức tạp, nhiều bước, nơi bạn muốn có khả năng rollback nếu đi sai hướng.

## Câu 3
**Câu hỏi**: Sự khác biệt giữa checkpoint và git commit là gì?
A. Không khác biệt
B. Checkpoint lưu cả context hội thoại, git chỉ lưu file changes
C. Git commit lưu cả context hội thoại, checkpoint chỉ lưu file
D. Checkpoint nhanh hơn git
**Đáp án**: B
**Giải thích**: Checkpoint lưu context Claude đang làm việc với, cho phép hoàn tác actions. Git commit chỉ lưu changes trong files. Khi revert checkpoint, nó undo files và actions.

## Câu 4
**Câu hỏi**: Checkpoints hữu ích nhất trong tình huống nào?
A. Refactoring lớn
B. Debugging complex issues
C. Exploratory coding
D. Tất cả trên
**Đáp án**: D
**Giải thích**: Checkpoints useful trong mọi tình huống bạn muốn thử nghiệm mà không sợ mất work. Refactoring, debugging, exploration — tất cả benefit từ ability to rollback.

## Câu 5
**Câu hỏi**: `/checkpoint` slash command làm gì?
A. Tạo checkpoint mới
B. Hiển thị trạng thái checkpoint hiện tại và cho phép rollback
C. Xóa tất cả checkpoints
D. Export checkpoints
**Đáp án**: B
**Giải thích**: `/checkpoint` command cho phép bạn xem checkpoint hiện tại và revert về checkpoint trước đó.

## Câu 6
**Câu hỏi**: Khi revert checkpoint, điều gì xảy ra?
A. Chỉ undo Claude's actions, giữ nguyên files user tạo
B. Hoàn tác tất cả file changes và actions từ checkpoint
C. Chỉ hoàn tác git commits
D. Không undo gì cả
**Đáp án**: B
**Giải thích**: Reverting a checkpoint undoes tất cả file changes và actions Claude thực hiện từ checkpoint đó.

## Câu 7 (Mở)
**Câu hỏi**: Tại sao checkpoints quan trọng hơn trong agentic mode?
**Đáp án**: Trong agentic mode, Claude thực hiện nhiều actions tự động mà không cần user approve mỗi bước. Checkpoints cung cấp safety net — nếu agent đi sai hướng, revert và try khác.
**Giải thích**: Agentic mode = nhiều actions tự động → increased need for rollback capability.

## Câu 8 (Mở)
**Câu hỏi**: Checkpoint frequency nên như thế nào?
**Đáp án**: Không quá thường xuyên (waste overhead), nhưng đủ thường xuyên để không mất nhiều work nếu cần rollback. Good practice: checkpoint trước major changes, sau successful steps.
**Giải thích**: Balance giữa safety và efficiency.
