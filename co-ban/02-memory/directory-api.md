# Tiêu chuẩn Module API

Tập tin này thay thế CLAUDE.md gốc cho mọi thứ trong /src/api/

## Tiêu chuẩn riêng cho API

### Xác thực yêu cầu
- Sử dụng Zod cho schema validation
- Luôn xác thực input
- Trả về 400 với lỗi validation
- Bao gồm chi tiết lỗi theo trường

### Xác thực người dùng
- Tất cả endpoint yêu cầu JWT token
- Token trong Authorization header
- Token hết hạn sau 24 giờ
- Cài đặt cơ chế refresh token

### Định dạng phản hồi

Tất cả phản hồi phải tuân theo cấu trúc này:

```json
{
  "success": true,
  "data": { /* dữ liệu thực tế */ },
  "timestamp": "2025-11-06T10:30:00Z",
  "version": "1.0"
}
```

Phản hồi lỗi:
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Thông báo cho người dùng",
    "details": { /* lỗi theo trường */ }
  },
  "timestamp": "2025-11-06T10:30:00Z"
}
```

### Phân trang
- Sử dụng cursor-based pagination (không dùng offset)
- Bao gồm boolean `hasMore`
- Giới hạn page size tối đa 100
- Page size mặc định: 20

### Giới hạn tốc độ
- 1000 yêu cầu/giờ cho người dùng đã xác thực
- 100 yêu cầu/giờ cho public endpoints
- Trả về 429 khi vượt quá
- Bao gồm header retry-after

### Bộ nhớ đệm
- Sử dụng Redis cho session caching
- Thời gian cache: 5 phút mặc định
- Hủy cache trên các thao tác ghi
- Gán tag cache keys theo loại tài nguyên
