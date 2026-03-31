
# Checkpoint và Rewind

Checkpoint cho phép bạn lưu trạng thái cuộc hội thoại và quay lại các thời điểm trước trong phiên Claude Code. Điều này vô cùng hữu ích để khám phá các phương án khác nhau, khôi phục từ lỗi, hoặc so sánh các giải pháp thay thế.

## Tổng quan

Checkpoint cho phép bạn lưu trạng thái cuộc hội thoại và quay lại các thời điểm trước, cho phép thử nghiệm và khám phá nhiều phương án an toàn. Chúng là ảnh chụp nhanh trạng thái cuộc hội thoại của bạn, bao gồm:
- Tất cả tin nhắn đã trao đổi
- Các thay đổi file đã thực hiện
- Lịch sử sử dụng công cụ
- Ngữ cảnh phiên làm việc

Checkpoint vô cùng hữu ích khi khám phá các phương án khác nhau, khôi phục từ lỗi, hoặc so sánh các giải pháp thay thế.

## Các Khái niệm Chính

| Khái niệm | Mô tả |
|-----------|-------|
| **Checkpoint** | Ảnh chụp nhanh trạng thái hội thoại bao gồm tin nhắn, file và ngữ cảnh |
| **Rewind** | Quay lại một checkpoint trước đó, loại bỏ các thay đổi sau đó |
| **Branch Point** | Checkpoint mà từ đó nhiều phương án được khám phá |

## Truy cập Checkpoint

Bạn có thể truy cập và quản lý checkpoint theo hai cách chính:

### Sử dụng Phím tắt
Nhấn `Esc` hai lần (`Esc` + `Esc`) để mở giao diện checkpoint và duyệt các checkpoint đã lưu.

### Sử dụng Slash Command
Dùng lệnh `/rewind` (bí danh: `/checkpoint`) để truy cập nhanh:

```bash
# Mở giao diện rewind
/rewind

# Hoặc dùng bí danh
/checkpoint
```

## Các Tùy chọn Rewind

Khi bạn rewind, bạn sẽ được hiển thị thực đơn với năm tùy chọn:

1. **Restore code and conversation** -- Hoàn nguyên cả file và tin nhắn về checkpoint đó
2. **Restore conversation** -- Chỉ hoàn nguyên tin nhắn, giữ nguyên code hiện tại
3. **Restore code** -- Chỉ hoàn nguyên thay đổi file, giữ lại toàn bộ lịch sử hội thoại
4. **Summarize from here** -- Nén cuộc hội thoại từ thời điểm đó trở đi thành bản tóm tắt do AI tạo ra thay vì loại bỏ. Các tin nhắn gốc được bảo toàn trong bản ghi chép. Bạn có thể tùy chọn cung cấp hướng dẫn để tập trung bản tóm tắt vào các chủ đề cụ thể.
5. **Never mind** -- Hủy và quay lại trạng thái hiện tại

## Checkpoint Tự động

Claude Code tự động tạo checkpoint cho bạn:

- **Mỗi user prompt** - Một checkpoint mới được tạo với mỗi đầu vào của người dùng
- **Bền vững** - Checkpoint tồn tại qua các phiên
- **Tự động dọn dẹp** - Checkpoint được tự động dọn dẹp sau 30 ngày

Điều này có nghĩa bạn luôn có thể quay lại bất kỳ thời điểm nào trong cuộc hội thoại, từ vài phút trước đến vài ngày trước.

## Các Trường hợp Sử dụng

| Kịch bản | Luồng làm việc |
|----------|---------------|
| **Khám phá Phương án** | Lưu -> Thử A -> Lưu -> Rewind -> Thử B -> So sánh |
| **Tái cấu trúc An toàn** | Lưu -> Tái cấu trúc -> Kiểm tra -> Nếu lỗi: Rewind |
| **A/B Testing** | Lưu -> Thiết kế A -> Lưu -> Rewind -> Thiết kế B -> So sánh |
| **Khôi phục Lỗi** | Phát hiện vấn đề -> Rewind về trạng thái tốt cuối cùng |

## Sử dụng Checkpoint

### Xem và Rewind

Nhấn `Esc` hai lần hoặc dùng `/rewind` để mở trình duyệt checkpoint. Bạn sẽ thấy danh sách tất cả checkpoint có sẵn với dấu thời gian. Chọn bất kỳ checkpoint nào để quay lại trạng thái đó.

### Chi tiết Checkpoint

Mỗi checkpoint hiển thị:
- Dấu thời gian khi được tạo
- Các file đã được sửa đổi
- Số lượng tin nhắn trong cuộc hội thoại
- Các công cụ đã được sử dụng

## Ví dụ Thực tế

### Ví dụ 1: Khám phá Các Phương án Khác nhau

```
User: Hãy thêm lớp caching vào API

Claude: Tôi sẽ thêm Redis caching vào các API endpoint của bạn...
[Thực hiện thay đổi tại checkpoint A]

User: Thực ra, hãy thử in-memory caching thay thế

Claude: Tôi sẽ rewind để khám phá phương án khác...
[User nhấn Esc+Esc và rewind về checkpoint A]
[Thực hiện in-memory caching tại checkpoint B]

User: Bây giờ tôi có thể so sánh cả hai phương án
```

### Ví dụ 2: Khôi phục từ Lỗi

```
User: Tái cấu trúc module authentication để dùng JWT

Claude: Tôi sẽ tái cấu trúc module authentication...
[Thực hiện nhiều thay đổi]

User: Khoan, cái này làm hỏng OAuth integration. Hãy quay lại.

Claude: Tôi sẽ giúp bạn rewind về trước khi tái cấu trúc...
[User nhấn Esc+Esc và chọn checkpoint trước khi refactor]

User: Hãy thử phương án thận trọng hơn lần này
```

### Ví dụ 3: Thử nghiệm An toàn

```
User: Hãy thử viết lại theo phong cách functional
[Tạo checkpoint trước khi thử nghiệm]

Claude: [Thực hiện thay đổi thử nghiệm]

User: Các tests đang thất bại. Hãy rewind.
[User nhấn Esc+Esc và rewind về checkpoint]

Claude: Tôi đã hoàn nguyên thay đổi. Hãy thử phương án khác.
```

### Ví dụ 4: Phân nhánh Phương án

```
User: Tôi muốn so sánh hai thiết kế cơ sở dữ liệu
[Ghi chú checkpoint - gọi là "Start"]

Claude: Tôi sẽ tạo thiết kế đầu tiên...
[Thực hiện Schema A]

User: Bây giờ để tôi quay lại và thử phương án thứ hai
[User nhấn Esc+Esc và rewind về "Start"]

Claude: Bây giờ tôi sẽ thực hiện Schema B...
[Thực hiện Schema B]

User: Tuyệt! Bây giờ tôi có cả hai schema để chọn
```

## Lưu giữ Checkpoint

Claude Code tự động quản lý checkpoint của bạn:

- Checkpoint được tạo tự động với mỗi user prompt
- Checkpoint cũ được lưu giữ đến 30 ngày
- Checkpoint được tự động dọn dẹp để tránh tăng dung lượng lưu trữ không giới hạn

## Mẫu Luồng làm việc

### Chiến lược Phân nhánh để Khám phá

Khi khám phá nhiều phương án:

```
1. Bắt đầu với triển khai ban đầu -> Checkpoint A
2. Thử Phương án 1 -> Checkpoint B
3. Rewind về Checkpoint A
4. Thử Phương án 2 -> Checkpoint C
5. So sánh kết quả từ B và C
6. Chọn phương án tốt nhất và tiếp tục
```

### Mẫu Tái cấu trúc An toàn

Khi thực hiện thay đổi đáng kể:

```
1. Trạng thái hiện tại -> Checkpoint (tự động)
2. Bắt đầu tái cấu trúc
3. Chạy tests
4. Nếu tests đạt -> Tiếp tục làm việc
5. Nếu tests lỗi -> Rewind và thử phương án khác
```

## Thực hành Tốt nhất

Vì checkpoint được tạo tự động, bạn có thể tập trung vào công việc mà không lo lắng về việc lưu trạng thái thủ công. Tuy nhiên, hãy ghi nhớ những thực hành sau:

### Sử dụng Checkpoint Hiệu quả

✅ **Nên:**
- Rà soát các checkpoint có sẵn trước khi rewind
- Dùng rewind khi muốn khám phá các hướng đi khác nhau
- Giữ checkpoint để so sánh các phương án khác nhau
- Hiểu mỗi tùy chọn rewind làm gì (restore code and conversation, restore conversation, restore code, hoặc summarize)

❌ **Không nên:**
- Chỉ dựa vào checkpoint để bảo tồn code
- Mong đợi checkpoint theo dõi các thay đổi filesystem bên ngoài
- Dùng checkpoint thay thế cho git commit

## Cấu hình

Bạn có thể bật/tắt checkpoint tự động trong cài đặt:

```json
{
  "autoCheckpoint": true
}
```

- `autoCheckpoint`: Bật hoặc tắt tạo checkpoint tự động trên mỗi user prompt (mặc định: `true`)

## Hạn chế

Checkpoint có các hạn chế sau:

- **Thay đổi lệnh bash KHÔNG được theo dõi** - Các thao tác như `rm`, `mv`, `cp` trên filesystem không được ghi nhận trong checkpoint
- **Thay đổi bên ngoài KHÔNG được theo dõi** - Các thay đổi thực hiện ngoài Claude Code (trong editor, terminal, v.v.) không được ghi nhận
- **Không thay thế version control** - Dùng git cho các thay đổi vĩnh viễn, có kiểm chứng trên codebase

## Xử lý Sự cố

### Thiếu Checkpoint

**Vấn đề**: Không tìm thấy checkpoint mong đợi

**Giải pháp**:
- Kiểm tra xem checkpoint có bị xóa không
- Xác minh `autoCheckpoint` đã bật trong cài đặt chưa
- Kiểm tra dung lượng đĩa

### Rewind Thất bại

**Vấn đề**: Không thể rewind về checkpoint

**Giải pháp**:
- Đảm bảo không có thay đổi chưa commit xung đột
- Kiểm tra xem checkpoint có bị hỏng không
- Thử rewind về checkpoint khác

## Tích hợp với Git

Checkpoint bổ sung (nhưng không thay thế) git:

| Tính năng | Git | Checkpoint |
|-----------|-----|------------|
| Phạm vi | Filesystem | Hội thoại + file |
| Độ bền | Vĩnh viễn | Theo phiên |
| Độ chi tiết | Commit | Bất kỳ thời điểm nào |
| Tốc độ | Chậm hơn | Tức thì |
| Chia sẻ | Có | Giới hạn |

Sử dụng kết hợp cả hai:
1. Dùng checkpoint để thử nghiệm nhanh
2. Dùng git commit cho thay đổi đã hoàn thiện
3. Tạo checkpoint trước các thao tác git
4. Commit các trạng thái checkpoint thành công vào git

## Hướng dẫn Bắt đầu Nhanh

### Luồng làm việc Cơ bản

1. **Làm việc bình thường** - Claude Code tạo checkpoint tự động
2. **Muốn quay lại?** - Nhấn `Esc` hai lần hoặc dùng `/rewind`
3. **Chọn checkpoint** - Chọn từ danh sách để rewind
4. **Chọn nội dung restore** - Chọn restore code and conversation, restore conversation, restore code, summarize from here, hoặc hủy
5. **Tiếp tục làm việc** - Bạn đã quay lại thời điểm đó

### Phím tắt

- **`Esc` + `Esc`** - Mở trình duyệt checkpoint
- **`/rewind`** - Cách khác để truy cập checkpoint
- **`/checkpoint`** - Bí danh của `/rewind`

## Các Khái niệm Liên quan

- **[Tính năng Nâng cao](../../nang-cao/10-advanced/)** - Chế độ lập kế hoạch và các khả năng nâng cao khác
- **[Quản lý Bộ nhớ](../../02-memory/)** - Quản lý lịch sử hội thoại và ngữ cảnh
- **[Slash Commands](../../01-slash-commands/)** - Phím tắt do người dùng kích hoạt
- **[Hooks](../../06-hooks/)** - Tự động hóa theo sự kiện
- **[Plugins](../../07-plugins/)** - Gói mở rộng tích hợp sẵn

## Tài nguyên Bổ sung

- [Tài liệu Checkpoint Chính thức](https://code.claude.com/docs/en/checkpointing)
- **[Hướng dẫn Tính năng Nâng cao](../../nang-cao/10-advanced/)** - Tư duy mở rộng và các khả năng khác

## Tổng kết

Checkpoint là tính năng tự động trong Claude Code cho phép bạn khám phá an toàn các phương án khác nhau mà không lo mất công việc. Mỗi user prompt tạo một checkpoint mới tự động, vì vậy bạn có thể quay lại bất kỳ thời điểm nào trong phiên làm việc.

Lợi ích chính:
- Thử nghiệm không ngại với nhiều phương án
- Khôi phục nhanh từ lỗi
- So sánh các giải pháp khác nhau cạnh nhau
- Tích hợp an toàn với hệ thống version control

Hãy nhớ: checkpoint không thay thế git. Dùng checkpoint để thử nghiệm nhanh và git cho các thay đổi code vĩnh viễn.
