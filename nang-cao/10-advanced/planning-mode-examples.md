# Ví Dụ Chế Độ Lập Kế Hoạch

Các ví dụ thực tế minh họa việc sử dụng hiệu quả chế độ lập kế hoạch trong Claude Code.

## Ví Dụ 1: Xây Dựng REST API

### Không Sử Dụng Chế Độ Lập Kế Hoạch

```
User: Build a REST API for a blog

Claude: I'll create the API...
[Bắt đầu viết mã ngay lập tức, có thể bỏ sót yêu cầu]
```

### Sử Dụng Chế Độ Lập Kế Hoạch

```
User: /plan Build a REST API for a blog

Claude: Let me create a comprehensive plan for the blog API.

## Kế Hoạch Triển Khai Blog REST API

### Giai đoạn 1: Thiết Lập Dự Án (15 phút)
1. Khởi tạo dự án Node.js với Express
2. Cấu hình TypeScript
3. Cài đặt các dependency (express, pg, jwt, joi)
4. Cấu hình biến môi trường
5. Thiết lập cấu trúc dự án

### Giai đoạn 2: Lớp Cơ Sở Dữ Liệu (30 phút)
6. Thiết kế schema cơ sở dữ liệu
   - bảng users (id, email, password_hash, created_at)
   - bảng posts (id, user_id, title, content, published, created_at, updated_at)
   - bảng comments (id, post_id, user_id, content, created_at)
7. Tạo các tệp migration
8. Thiết lập connection pool cơ sở dữ liệu
9. Triển khai model cơ sở dữ liệu

### Giai đoạn 3: Xác Thực (45 phút)
10. Triển khai endpoint đăng ký người dùng
11. Triển khai endpoint đăng nhập với JWT
12. Tạo middleware xác thực
13. Thêm mã hóa mật khẩu với bcrypt
14. Triển khai logic làm mới token

### Giai đoạn 4: Posts API (40 phút)
15. GET /api/posts - Liệt kê tất cả bài viết đã xuất bản (với phân trang)
16. GET /api/posts/:id - Lấy bài viết đơn
17. POST /api/posts - Tạo bài viết mới (cần xác thực)
18. PUT /api/posts/:id - Cập nhật bài viết (cần xác thực, kiểm quyền sở hữu)
19. DELETE /api/posts/:id - Xóa bài viết (cần xác thực, kiểm quyền sở hữu)
20. GET /api/users/:id/posts - Lấy bài viết của người dùng

### Giai đoạn 5: Comments API (30 phút)
21. GET /api/posts/:id/comments - Lấy bình luận bài viết
22. POST /api/posts/:id/comments - Thêm bình luận (cần xác thực)
23. DELETE /api/comments/:id - Xóa bình luận (cần xác thực, kiểm quyền sở hữu)

### Giai đoạn 6: Xác Thực & Xử Lý Lỗi (30 phút)
24. Thêm xác thực request với Joi
25. Triển khai bộ xử lý lỗi toàn cục
26. Thêm làm sạch đầu vào
27. Triển khai giới hạn tốc độ

### Giai đoạn 7: Kiểm Thử (60 phút)
28. Viết unit test cho model
29. Viết integration test cho endpoint xác thực
30. Viết integration test cho endpoint posts
31. Viết integration test cho endpoint comments
32. Đạt độ phủ mã nguồn 80%+

### Giai đoạn 8: Tài Liệu & Triển Khai (30 phút)
33. Tạo tài liệu API với Swagger
34. Tạo README với hướng dẫn cài đặt
35. Thêm cấu hình Docker
36. Thiết lập pipeline CI/CD

**Thời Gian Ước Tính**: 4,5 giờ
**Tệp Cần Tạo**: ~25
**Công Nghệ Chính**: Express, PostgreSQL, JWT, TypeScript

**Tổng Hợp Endpoint API**:
- Xác thực: 2 endpoint
- Posts: 6 endpoint
- Comments: 3 endpoint
- Tổng cộng: 11 endpoint

Bạn đã sẵn sàng chưa? (yes/no/modify)

User: yes

Claude: Bắt đầu Giai đoạn 1: Thiết Lập Dự Án...
[Thực hiện từng giai đoạn một cách có hệ thống]
```

## Ví Dụ 2: Di Chuyển Cơ Sở Dữ Liệu

### Sử Dụng Chế Độ Lập Kế Hoạch

```
User: /plan Migrate from MongoDB to PostgreSQL

Claude: Đây là di chuyển phức tạp. Để tôi tạo kế hoạch chi tiết.

## Kế Hoạch Di Chuyển Từ MongoDB Sang PostgreSQL

### Giai đoạn 1: Phân Tích & Chuẩn Bị (Ngày 1)
1. Phân tích schema MongoDB hiện tại
2. Xác định các quan hệ dữ liệu và ràng buộc
3. Ghi lại khối lượng dữ liệu hiện tại và tốc độ tăng trưởng
4. Thiết kế schema PostgreSQL tương đương
5. Lên kế hoạch ánh xạ kiểu dữ liệu
6. Xác định các thách thức di chuyển tiềm ẩn

### Giai đoạn 2: Thiết Lập PostgreSQL (Ngày 1)
7. Thiết lập cơ sở dữ liệu PostgreSQL
8. Tạo schema với bảng, index, ràng buộc
9. Thiết lập connection pooling
10. Cấu hình chiến lược sao lưu

### Giai đoạn 3: Triển Khai Dual-Write (Ngày 2-3)
11. Tạo lớp trừu tượng cơ sở dữ liệu
12. Triển khai dual-write sang cả hai cơ sở dữ liệu
13. Thêm kiểm tra tính nhất quán dữ liệu
14. Triển khai dual-write lên staging
15. Theo dõi các vấn đề

### Giai đoạn 4: Di Chuyển Dữ Liệu (Ngày 4)
16. Tạo kịch bản xuất dữ liệu cho MongoDB
17. Tạo kịch bản nhập dữ liệu cho PostgreSQL
18. Triển khai logic chuyển đổi dữ liệu
19. Chạy di chuyển ban đầu trên bản sao dữ liệu production
20. Xác minh tính toàn vẹn dữ liệu đã di chuyển

### Giai đoạn 5: Chuyển Đổi Dần Dần (Ngày 5-7)
21. Kích hoạt dual-write trong production
22. Di chuyển dữ liệu lịch sử theo lô
23. Liên tục xác minh tính nhất quán dữ liệu
24. Giám sát cả hai cơ sở dữ liệu
25. Sửa các vấn đề đồng bộ hóa dữ liệu

### Giai đoạn 6: PostgreSQL Chính (Ngày 8)
26. Chuyển thao tác đọc sang PostgreSQL
27. Giám sát hiệu suất truy vấn
28. Tối ưu hóa truy vấn chậm
29. Tiếp tục dual-write để an toàn

### Giai đoạn 7: Loại Bỏ MongoDB (Ngày 9-10)
30. Dừng ghi vào MongoDB
31. Giữ MongoDB làm sao lưu trong 2 tuần
32. Xóa các phụ thuộc MongoDB khỏi mã
33. Lưu trữ dữ liệu MongoDB
34. Ngưng sử dụng MongoDB instance

**Thời Gian Ước Tính**: 10 ngày
**Mức Rủi Ro**: Cao
**Chiến Lược Rollback**: Giữ MongoDB chạy với dual-write
**Tiêu Chí Thành Công**:
- Không mất dữ liệu
- <5% giảm hiệu suất
- Tất cả test vượt qua

**Rủi Ro Chính**:
1. Không nhất quán dữ liệu trong di chuyển
2. Suy giảm hiệu suất truy vấn
3. Thời gian chết ứng dụng
4. Mất dữ liệu

**Giảm Thiểu**:
- Mẫu dual-write để an toàn
- Chuyển đổi dần dần
- Giám sát liên tục
- Khả năng rollback nhanh

Tiến hành với kế hoạch này? (yes/no/modify)

User: Sửa đổi - hãy thêm kế hoạch rollback cho mỗi giai đoạn

Claude: Kế hoạch đã cập nhật với quy trình rollback cho mỗi giai đoạn...
```

## Ví Dụ 3: Tái Cấu Trúc Frontend

```
User: /plan Refactor our React app from class components to hooks

Claude: Tôi sẽ tạo kế hoạch tái cấu trúc có hệ thống.

## Kế Hoạch Chuyển Đổi React Từ Class Sang Hooks

### Giai đoạn 1: Chuẩn Bị & Phân Tích (2 giờ)
1. Kiểm kê tất cả component class (tìm tất cả tệp .jsx/.tsx)
2. Phân loại theo độ phức tạp:
   - Đơn giản (chỉ state): ~15 component
   - Trung bình (phương thức lifecycle): ~23 component
   - Phức tạp (nhiều lifecycle, refs): ~8 component
3. Xác định các thư viện bên thứ ba cần cập nhật
4. Tạo biểu đồ phụ thuộc component
5. Lên kế hoạch thứ tự di chuyển (nút lá trước)

### Giai đoạn 2: Thiết Lập & Công Cụ (1 giờ)
6. Cập nhật React lên v18+
7. Thiết lập quy tắc ESLint cho hooks
8. Tạo mẫu chuyển đổi
9. Thiết lập kiểm thử tự động
10. Tạo checkpoint trước khi bắt đầu

### Giai đoạn 3: Di Chuyển Component Đơn Giản (4 giờ)
11. Chuyển đổi component có state đơn giản (15 component)
12. Thay thế this.state bằng useState
13. Thay thế this.setState bằng state setter
14. Kiểm thử mỗi component sau khi chuyển đổi
15. Cập nhật test

### Giai đoạn 4: Di Chuyển Component Trung Bình (8 giờ)
16. Chuyển đổi component có phương thức lifecycle (23 component)
17. Thay thế componentDidMount bằng useEffect
18. Thay thế componentDidUpdate bằng useEffect
19. Thay thế componentWillUnmount bằng cleanup useEffect
20. Kiểm thử kỹ lưỡng

### Giai đoạn 5: Di Chuyển Component Phức Tạp (12 giờ)
21. Chuyển đổi component phức tạp (8 component)
22. Thay thế refs bằng useRef
23. Trích xuất custom hooks cho logic chia sẻ
24. Xử lý các trường hợp biên (nhiều useEffect)
25. Kiểm thử mở rộng

### Giai đoạn 6: Trích Xuất Logic Chia Sẻ (6 giờ)
26. Xác định logic trùng lặp giữa các component
27. Tạo custom hooks:
    - useAuth
    - useFetch
    - useLocalStorage
    - useDebounce
28. Tái cấu trúc component để sử dụng custom hooks
29. Kiểm thử custom hooks độc lập

### Giai đoạn 7: Tối Ưu Hiệu Suất (4 giờ)
30. Thêm React.memo khi cần
31. Tối ưu với useCallback
32. Tối ưu với useMemo
33. Phân tích và sửa lỗi thoái lui hiệu suất

### Giai đoạn 8: Dọn Dẹp & Tài Liệu (2 giờ)
34. Xóa các tiện ích component class không sử dụng
35. Cập nhật tài liệu
36. Cập nhật hướng dẫn viết mã
37. Tạo hướng dẫn di chuyển cho nhóm

**Thời Gian Ước Tính**: 5 ngày (39 giờ)
**Tệp Cần Sửa Đổi**: 46 component
**Mức Rủi Ro**: Trung bình

**Thứ Tự Di Chuyển**:
1. Component lá (không phụ thuộc)
2. Component mức trung
3. Component container mức cao
4. App.jsx (cuối cùng)

**Chiến Lược Kiểm Thử**:
- Unit test cho mỗi component
- Integration test cho luồng người dùng
- Kiểm thử thoái lui trực quan
- Điểm chuẩn hiệu suất

**Chỉ Số Thành Công**:
- Tất cả test vượt qua
- Không thoái lui trực quan
- Hiệu suất được duy trì hoặc cải thiện
- Kích thước bundle không tăng đáng kể

Tiến hành? (yes/no/modify)
```

## Ví Dụ 4: Triển Khai Bảo Mật

```
User: /plan Implement comprehensive security for our web app

Claude: Để tôi tạo kế hoạch triển khai bảo mật toàn diện.

## Kế Hoạch Triển Khai Bảo Mật Ứng Dụng Web

### Giai đoạn 1: Kiểm Thử Bảo Mật (Ngày 1)
1. Chạy trình quét bảo mật tự động (npm audit, Snyk)
2. Xem xét dependency cho lỗ hổng
3. Kiểm tra tuân thủ OWASP Top 10
4. Kiểm tra luồng xác thực
5. Xem xét thực hành xử lý dữ liệu
6. Ghi lại khoảng trống bảo mật hiện tại

### Giai đoạn 2: Tăng Cường Xác Thực (Ngày 2-3)
7. Triển khai yêu cầu mật khẩu mạnh
8. Thêm thanh đo độ mạnh mật khẩu
9. Triển khai giới hạn tốc độ đăng nhập
10. Thêm khóa tài khoản sau các lần thử thất bại
11. Triển khai 2FA (TOTP)
12. Thêm cải thiện quản lý phiên
13. Triển khai luồng đặt lại mật khẩu an toàn

### Giai đoạn 3: Ủy Quyền & Kiểm Soát Truy Cập (Ngày 3-4)
14. Triển khai RBAC (Kiểm Soát Truy Cập Dựa Trên Vai Trò)
15. Thêm kiểm tra quyền trên tất cả endpoint
16. Triển khai nguyên tắc đặc quyền tối thiểu
17. Thêm audit logging cho thao tác nhạy cảm
18. Triển khai quyền cấp tài nguyên

### Giai đoạn 4: Bảo Vệ Dữ Liệu (Ngày 4-5)
19. Triển khai mã hóa khi lưu trữ (trường nhạy cảm)
20. Đảm bảo TLS/SSL cho tất cả giao tiếp
21. Triển khai lưu trữ phiên an toàn
22. Thêm che dữ liệu PII trong log
23. Triển khai chính sách lưu giữ dữ liệu
24. Thêm xử lý tải tệp an toàn

### Giai đoạn 5: Xác Thực Đầu Vào & Làm Sạch (Ngày 5-6)
25. Triển khai xác thực đầu vào trên tất cả endpoint
26. Thêm bảo vệ XSS (Content Security Policy)
27. Triển khai ngăn chặn SQL injection (truy vấn tham số hóa)
28. Thêm bảo vệ CSRF
29. Triển khai giới hạn kích thước request
30. Thêm xác thực loại tệp tải lên

### Giai đoạn 6: Header Bảo Mật & Cấu Hình (Ngày 6)
31. Thêm header bảo mật:
    - Strict-Transport-Security
    - X-Content-Type-Options
    - X-Frame-Options
    - X-XSS-Protection
    - Content-Security-Policy
32. Cấu hình CORS đúng cách
33. Vô hiệu hóa phương thức HTTP không cần thiết
34. Xóa header phiên bản máy chủ

### Giai đoạn 7: Giám Sát & Ghi Log (Ngày 7)
35. Triển khai ghi log sự kiện bảo mật
36. Thêm phát hiện bất thường
37. Thiết lập phát hiện xâm nhập
38. Triển sinh cảnh báo thời gian thực
39. Tạo bảng điều khiển bảo mật

### Giai đoạn 8: Kiểm Thử & Tài Liệu (Ngày 8-9)
40. Thực hiện kiểm thử xâm nhập
41. Chạy trình quét bảo mật
42. Kiểm thử tất cả tính năng bảo mật
43. Tạo tài liệu bảo mật
44. Đào tạo nhóm về thực hành bảo mật
45. Tạo kế hoạch ứng phó sự cố

### Giai đoạn 9: Tuân Thủ & Chính Sách (Ngày 10)
46. Kiểm tra tuân thủ GDPR
47. Tạo chính sách bảo mật
48. Triển khai quyền chủ thể dữ liệu
49. Thêm đồng ý cookie
50. Tạo tài liệu chính sách bảo mật

**Thời Gian Ước Tính**: 10 ngày
**Mức Rủi Ro**: Quan Trọng
**Ưu Tiên**: Cao

**Tổng Hợp Cải Thiện Bảo Mật**:
- Xác thực: 7 cải tiến
- Ủy quyền: 5 cải tiến
- Bảo vệ dữ liệu: 6 cải tiến
- Xác thực đầu vào: 6 cải tiến
- Hạ tầng: 9 cải tiến
- Giám sát: 5 cải tiến

**Tuân Thủ**: OWASP Top 10, GDPR

**Tiêu Chí Thành Công**:
- Không lỗ hổng quan trọng
- Tất cả OWASP Top 10 được giảm thiểu
- Điểm bảo mật >90/100
- Tất cả vấn đề pen test được giải quyết

Tiến hành? (yes/no/modify)
```

## Ví Dụ 5: Tối Ưu Hiệu Suất

```
User: /plan Optimize our slow e-commerce website

Claude: Để tôi tạo kế hoạch tối ưu hiệu suất toàn diện.

## Kế Hoạch Tối Ưu Hiệu Suất Website Thương Mại Điện Tử

### Giai đoạn 1: Kiểm Thử Hiệu Suất (4 giờ)
1. Chạy kiểm thử Lighthouse
2. Phân tích hiệu suất Chrome DevTools
3. Đo Core Web Vitals:
   - LCP (Largest Contentful Paint)
   - FID (First Input Delay)
   - CLS (Cumulative Layout Shift)
4. Xác định nút thắt hiệu suất
5. Tạo chỉ số hiệu suất cơ sở

**Chỉ Số Hiện Tại**:
- LCP: 4,2s (mục tiêu: <2,5s)
- FID: 280ms (mục tiêu: <100ms)
- CLS: 0,25 (mục tiêu: <0,1)
- Tải Trang: 8,3s (mục tiêu: <3s)

### Giai đoạn 2: Tối Ưu Hình Ảnh (6 giờ)
6. Chuyển hình ảnh sang định dạng WebP
7. Triển khai hình ảnh responsive
8. Thêm lazy loading cho hình ảnh
9. Tối ưu kích thước hình ảnh (nén)
10. Triển khai CDN cho hình ảnh
11. Thêm placeholder hình ảnh

**Tác Động Dự Kiến**: -40% thời gian tải

### Giai đoạn 3: Tách Mã & Lazy Loading (8 giờ)
12. Triển khai tách mã theo route
13. Lazy load component không quan trọng
14. Tách vendor bundle
15. Tối ưu kích thước chunk
16. Triển khai import động
17. Thêm preloading cho tài nguyên quan trọng

**Tác Động Dự Kiến**: -30% kích thước bundle ban đầu

### Giai đoạn 4: Chiến Lược Cache (6 giờ)
18. Triển khai cache trình duyệt (Cache-Control)
19. Thêm service worker cho hỗ trợ offline
20. Triển khai cache phản hồi API
21. Thêm Redis cache cho truy vấn cơ sở dữ liệu
22. Triển khai stale-while-revalidate
23. Cấu hình cache CDN

**Tác Động Dự Kiến**: -50% thời gian phản hồi API

### Giai đoạn 5: Tối Ưu Cơ Sở Dữ Liệu (8 giờ)
24. Thêm index cơ sở dữ liệu
25. Tối ưu truy vấn chậm (>100ms)
26. Triển khai cache kết quả truy vấn
27. Thêm connection pooling
28. Phi chuẩn hóa khi phù hợp
29. Triển khai read replica cơ sở dữ liệu

**Tác Động Dự Kiến**: -60% thời gian truy vấn cơ sở dữ liệu

### Giai đoạn 6: Tối Ưu Frontend (10 giờ)
30. Thu nhỏ và nén JavaScript
31. Thu nhỏ và nén CSS
32. Xóa CSS không sử dụng (PurgeCSS)
33. Triển khai CSS quan trọng
34. Trì hoãn JavaScript không quan trọng
35. Giảm kích thước DOM
36. Tối ưu render React (memo, useMemo)
37. Triển khai cuộn ảo cho danh sách dài

**Tác Động Dự Kiến**: -35% thời gian thực thi JavaScript

### Giai đoạn 7: Tối Ưu Mạng (4 giờ)
38. Bật HTTP/2
39. Triển khai gợi ý tài nguyên (preconnect, prefetch)
40. Giảm số lượng request HTTP
41. Bật nén Brotli
42. Tối ưu script bên thứ ba

**Tác Động Dự Kiến**: -25% thời gian mạng

### Giai đoạn 8: Giám Sát & Kiểm Thử (4 giờ)
43. Thiết lập giám sát hiệu suất (Datadog/New Relic)
44. Thêm Giám Sát Người Dùng Thực (RUM)
45. Tạo ngân sách hiệu suất
46. Thiết lập Lighthouse CI tự động
47. Kiểm thử trên thiết bị thực

**Thời Gian Ước Tính**: 50 giờ (2 tuần)

**Chỉ Số Mục Tiêu** (phần trăm thứ 90):
- LCP: <2,0s (từ 4,2s) ✅
- FID: <50ms (từ 280ms) ✅
- CLS: <0,05 (từ 0,25) ✅
- Tải Trang: <2,5s (từ 8,3s) ✅

**Tác Động Doanh Thu Dự Kiến**:
- Nhanh hơn 100ms = tăng 1% chuyển đổi
- Mục tiêu: cải thiện 5,8s = tăng ~58% chuyển đổi
- Doanh thu bổ sung ước tính: Đáng kể

**Thứ Tự Ưu Tiên**:
1. Tối ưu hình ảnh (thắng nhanh)
2. Tách mã (tác động cao)
3. Cache (tác động cao)
4. Tối ưu cơ sở dữ liệu (quan trọng)
5. Tối ưu frontend (hoàn thiện)

Tiến hành với kế hoạch này? (yes/no/modify)
```

## Bài Học Rút Ra

### Lợi Ích Của Chế Độ Lập Kế Hoạch

1. **Rõ ràng**: Lộ trình rõ ràng trước khi bắt đầu
2. **Ước tính**: Ước tính thời gian và công sức
3. **Đánh giá rủi ro**: Xác định vấn đề tiềm ẩn sớm
4. **Ưu tiên**: Thứ tự tác vụ hợp lý
5. **Phê duyệt**: Xem xét và phê duyệt trước khi thực thi
6. **Sửa đổi**: Điều chỉnh kế hoạch dựa trên phản hồi

### Khi Nào Sử Dụng Chế Độ Lập Kế Hoạch

✅ **Luôn sử dụng cho**:
- Dự án nhiều ngày
- Hợp tác nhóm
- Thay đổi hệ thống quan trọng
- Học khái niệm mới
- Tái cấu trúc phức tạp

❌ **Không sử dụng cho**:
- Sửa lỗi
- Điều chỉnh nhỏ
- Truy vấn đơn giản
- Thử nghiệm nhanh

### Thực Hành Tốt Nhất

1. **Xem xét kế hoạch cẩn thận** trước khi phê duyệt
2. **Sửa đổi kế hoạch** khi phát hiện vấn đề
3. **Phân nhỏ** tác vụ phức tạp
4. **Ước tính thực tế** khung thời gian
5. **Bao gồm chiến lược rollback**
6. **Thêm tiêu chí thành công**
7. **Lập kế hoạch kiểm thử** ở mỗi giai đoạn
