# Các Ví dụ về Checkpoint

Các ví dụ thực tế về cách sử dụng checkpoint hiệu quả trong Claude Code.

Lưu ý: Checkpoint được tạo tự động với mỗi lời nhắc của người dùng. Bạn không cần phải lưu thủ công. Để quay lại, nhấn `Esc` hai lần (`Esc+Esc`) hoặc dùng `/rewind` để mở trình duyệt checkpoint.

## Ví dụ 1: Di chuyển Cơ sở dữ liệu

### Kịch bản
Bạn cần di chuyển từ MySQL sang PostgreSQL nhưng muốn khám phá cả phương án di chuyển trực tiếp và phương án dual-write dần dần.

### Luồng làm việc

```
User: Hãy thực hiện di chuyển trực tiếp từ MySQL sang PostgreSQL
      [Checkpoint A được tạo tự động]

Claude: Tôi sẽ thực hiện di chuyển trực tiếp...
[Thay đổi driver cơ sở dữ liệu, cập nhật các truy vấn, sửa đổi schema]

User: Chạy các bài kiểm tra
      [Checkpoint B được tạo tự động]

Claude: Đang chạy bài kiểm tra...
❌ 15 bài kiểm tra thất bại - vấn đề connection pool

User: Phương án này có vấn đề. Hãy thử phương án dual-write thay thế.
[User nhấn Esc+Esc, chọn Checkpoint A, chọn "Restore code and conversation"]

User: Bây giờ hãy thực hiện dual-write pattern, ghi vào cả hai cơ sở dữ liệu

Claude: Tôi sẽ thực hiện di chuyển dual-write...
[Thực hiện lớp dual-write, chiến lược di chuyển dần dần]

User: Chạy các bài kiểm tra

Claude: Đang chạy bài kiểm tra...
✅ Tất cả bài kiểm tra đều đạt

User: Phương án dual-write rõ ràng an toàn hơn. Hãy commit kết quả này.
```

## Ví dụ 2: Tối ưu Hiệu suất

### Kịch bản
Nhiều chiến lược tối ưu hiệu suất để thử.

### Luồng làm việc

```
User: Hãy tối ưu thời gian phản hồi API. Hiện tại: 450ms
      [Checkpoint "Baseline" được tạo tự động]

Claude: Tôi sẽ thêm cache truy vấn cơ sở dữ liệu...
[Thực hiện Redis caching]

User: Chạy kiểm tra hiệu suất

Claude: Kết quả: thời gian phản hồi trung bình 280ms (cải thiện 38%)

User: Để tôi thử một phương án khác.
[User nhấn Esc+Esc, chọn checkpoint "Baseline", chọn "Restore code and conversation"]

User: Hãy thử tối ưu truy vấn cơ sở dữ liệu thay thế

Claude: Tôi sẽ tối ưu truy vấn cơ sở dữ liệu...
[Thêm indexes, tối ưu truy vấn N+1]

User: Chạy kiểm tra hiệu suất

Claude: Kết quả: thời gian phản hồi trung bình 180ms (cải thiện 60%)

User: Để tôi thử thêm phương án thứ ba.
[User nhấn Esc+Esc, chọn checkpoint "Baseline", chọn "Restore code and conversation"]

User: Hãy thử nén phản hồi và CDN

Claude: Tôi sẽ thêm nén và CDN...
[Thực hiện gzip, thiết lập CDN]

User: Chạy kiểm tra hiệu suất

Claude: Kết quả: thời gian phản hồi trung bình 320ms (cải thiện 29%)

User: Tối ưu truy vấn là tốt nhất. Hãy quay lại và kết hợp với caching.
[User nhấn Esc+Esc, chọn checkpoint sau khi tối ưu truy vấn, chọn "Restore code and conversation"]

User: Bây giờ thêm Redis caching trên các truy vấn đã tối ưu này

Claude: [Thêm Redis caching trên các truy vấn đã tối ưu]

User: Chạy kiểm tra hiệu suất

Claude: Kết quả: thời gian phản hồi trung bình 95ms (cải thiện 79%)

User: Tuyệt vời! Đây là giải pháp chiến thắng. Hãy commit.
```

## Ví dụ 3: Lặp lại UI/UX

### Kịch bản
Thử các layout khác nhau cho dashboard.

### Luồng làm việc

```
User: Hãy thiết kế lại dashboard với layout sidebar
      [Checkpoint "Start" được tạo tự động]

Claude: [Thực hiện layout sidebar]

User: Cho tôi xem ảnh chụp màn hình

Claude: [Hiển thị ảnh chụp màn hình]

User: Sidebar trông hơi chật chội. Hãy thử top navigation thay thế.
[User nhấn Esc+Esc, chọn checkpoint "Start", chọn "Restore code and conversation"]

User: Hãy thử layout top navigation

Claude: [Thực hiện top navigation]

User: Cho tôi xem ảnh chụp màn hình

Claude: [Hiển thị ảnh chụp màn hình]

User: Tốt hơn, nhưng hãy thử layout grid dạng card
[User nhấn Esc+Esc, chọn checkpoint "Start", chọn "Restore code and conversation"]

User: Hãy thử layout grid dạng card

Claude: [Thực hiện card grid]

User: Cho tôi xem ảnh chụp màn hình

Claude: [Hiển thị ảnh chụp màn hình]

User: Tuyệt! Nhưng liệu có thể kết hợp top nav với card grid không?
[User nhấn Esc+Esc, chọn checkpoint sau card grid, chọn "Restore code and conversation"]

User: Thêm top navigation vào layout card grid

Claude: [Thêm top navigation vào card grid]

User: Hoàn hảo! Đây là thiết kế cuối cùng.
```

## Ví dụ 4: Phiên Gỡ lỗi

### Kịch bản
Truy tìm một lỗi khó với nhiều giả thuyết.

### Luồng làm việc

```
User: Có memory leak trong ứng dụng
      [Checkpoint "Before debugging" được tạo tự động]

Claude: Để tôi điều tra...
[Phân tích code]

User: Tôi nghĩ nó ở event listeners. Hãy sửa những cái đó.

Claude: [Sửa việc cleanup event listener]

User: Chạy memory profiler

Claude: Vẫn rò rỉ bộ nhớ - event listeners không phải là vấn đề

User: Để tôi quay lại và thử giả thuyết khác.
[User nhấn Esc+Esc, chọn checkpoint "Before debugging", chọn "Restore code and conversation"]

User: Có thể là database connections?

Claude: [Thực hiện sửa connection pooling]

User: Chạy memory profiler

Claude: Vẫn rò rỉ - cũng không phải connections

User: Để tôi quay lại và thử hướng khác.
[User nhấn Esc+Esc, chọn checkpoint "Before debugging", chọn "Restore code and conversation"]

User: Hãy kiểm tra circular references

Claude: [Tìm và sửa circular references trong cache]

User: Chạy memory profiler

Claude: ✅ Đã sửa memory leak! Circular references trong lớp caching là thủ phạm.

User: Xuất sắc! Hãy commit bản sửa này.
```

## Ví dụ 5: Tiến hóa Thiết kế API

### Kịch bản
Thiết kế REST API với nhiều lần lặp lại.

### Luồng làm việc

```
User: Tạo REST API cho nền tảng blog
      [Checkpoint "Before API design" được tạo tự động]

Claude: [Tạo CRUD API cơ bản]

User: Đơn giản quá. Hãy thêm pagination và filtering

Claude: [Thêm pagination và filtering]

User: Chúng ta cần quan hệ resource tốt hơn

Claude: [Thực hiện HATEOAS links]

User: Thực ra, hãy thử GraphQL thay vì REST
[User nhấn Esc+Esc, chọn checkpoint "Before API design", chọn "Restore code and conversation"]

User: Thay vào đó hãy thực hiện GraphQL API cho nền tảng blog

Claude: [Thực hiện GraphQL API]

User: Tôi nghĩ REST phù hợp hơn với trường hợp của chúng ta.
[User nhấn Esc+Esc, chọn checkpoint sau HATEOAS, chọn "Restore code and conversation"]

User: Hãy hoàn thiện phương án REST.
```

## Ví dụ 6: Quản lý Cấu hình

### Kịch bản
Kiểm tra các phương án cấu hình khác nhau.

### Luồng làm việc

```
User: Di chuyển cấu hình sang environment variables
      [Checkpoint "Original config" được tạo tự động]

Claude: [Thực hiện cấu hình env var]

User: Kiểm tra trong môi trường development

Claude: Hoạt động locally nhưng có vấn đề deployment trong production

User: Để tôi thử cách khác.
[User nhấn Esc+Esc, chọn checkpoint "Original config", chọn "Restore code and conversation"]

User: Thử phương án file cấu hình với validation

Claude: [Thực hiện YAML config với JSON schema validation]

User: Kiểm tra trong môi trường development

Claude: ✅ Hoạt động tốt, lỗi validation rõ ràng

User: Chúng ta có thể hỗ trợ thêm env vars cho các giá trị nhạy cảm không?

Claude: [Thêm env var override cho secrets]

User: Kiểm tra deployment

Claude: ✅ Tất cả môi trường hoạt động bình thường

User: Hoàn hảo! Sẵn sàng cho production.
```

## Ví dụ 7: Chiến lược Kiểm thử

### Kịch bản
Thực hiện kiểm thử toàn diện.

### Luồng làm việc

```
User: Thêm unit tests cho module auth
      [Checkpoint được tạo tự động]

Claude: [Thêm Jest unit tests]

User: Chạy tests

Claude: 45 tests đạt, độ phủ 78%

User: Thêm integration tests nữa

Claude: [Thêm integration tests]

User: Chạy tests

Claude: 89 tests đạt, độ phủ 92%, nhưng tests chậm (3 phút)

User: Tests chậm quá. Hãy tối ưu.

Claude: [Tối ưu setup test, thêm thực thi song song]

User: Chạy tests

Claude: 89 tests đạt, độ phủ 92%, 35 giây ✅

User: Tuyệt! Bây giờ thêm E2E tests cho các đường dẫn quan trọng

Claude: [Thêm Playwright E2E tests]

User: Chạy tất cả tests

Claude: 112 tests đạt, độ phủ 94%, 2 phút

User: Cân bằng hoàn hảo giữa độ phủ và tốc độ!
```

## Ví dụ 8: Sử dụng Summarize từ Checkpoint

### Kịch bản
Sau một phiên gỡ lỗi dài, bạn muốn tóm tắt cuộc hội thoại trong khi vẫn bảo toàn ngữ cảnh.

### Luồng làm việc

```
User: [Sau hơn 20 tin nhắn gỡ lỗi và khám phá]

[User nhấn Esc+Esc, chọn một checkpoint sớm, chọn "Summarize from here"]
[Tùy chọn cung cấp hướng dẫn: "Tập trung vào những gì chúng ta đã thử và những gì hoạt động"]

Claude: [Tạo tóm tắt cuộc hội thoại từ thời điểm đó trở đi]
[Các tin nhắn gốc được bảo toàn trong bản ghi chép]
[Bản tóm tắt thay thế cuộc hội thoại hiển thị, giảm lượng context window sử dụng]

User: Bây giờ hãy tiếp tục với phương án đã hoạt động.
```

## Bài học Quan trọng

1. **Checkpoint tự động**: Mỗi user prompt tạo một checkpoint -- không cần lưu thủ công
2. **Dùng Esc+Esc hoặc /rewind**: Đây là hai cách để truy cập trình duyệt checkpoint
3. **Chọn tùy chọn restore phù hợp**: Restore code, conversation, cả hai, hoặc summarize tùy theo nhu cầu
4. **Đừng ngại thử nghiệm**: Checkpoint giúp việc thử các thay đổi lớn trở nên an toàn
5. **Kết hợp với git**: Dùng checkpoint để khám phá, git cho công việc đã hoàn thiện
6. **Tóm tắt phiên dài**: Dùng "Summarize from here" để giữ cuộc hội thoại gọn gàng
