# Cấu hình Dự án

## Tổng quan Dự án
- **Tên**: Nền tảng Thương mại Điện tử
- **Công nghệ**: Node.js, PostgreSQL, React 18, Docker
- **Quy mô Nhóm**: 5 developer
- **Hạn chót**: Q4 2025

## Kiến trúc
@docs/architecture.md
@docs/api-standards.md
@docs/database-schema.md

## Tiêu chuẩn Phát triển

### Code Style
- Sử dụng Prettier cho định dạng
- Sử dụng ESLint với airbnb config
- Chiều dài dòng tối đa: 100 ký tự
- Sử dụng thụt lề 2 khoảng trắng

### Quy ước Đặt tên
- **Tập tin**: kebab-case (user-controller.js)
- **Class**: PascalCase (UserService)
- **Hàm/Biến**: camelCase (getUserById)
- **Hằng số**: UPPER_SNAKE_CASE (API_BASE_URL)
- **Bảng cơ sở dữ liệu**: snake_case (user_accounts)

### Git Workflow
- Tên nhánh: `feature/mo-ta` hoặc `fix/mo-ta`
- Commit message: Theo conventional commits
- Bắt buộc có PR trước khi merge
- Tất cả kiểm tra CI/CD phải đạt
- Tối thiểu 1 phê duyệt

### Yêu cầu Kiểm thử
- Tối thiểu 80% code coverage
- Tất cả đường dẫn quan trọng phải có kiểm thử
- Sử dụng Jest cho unit tests
- Sử dụng Cypress cho E2E tests
- Tên tập tin kiểm thử: `*.test.ts` hoặc `*.spec.ts`

### Tiêu chuẩn API
- Chỉ sử dụng RESTful endpoints
- JSON cho request/response
- Sử dụng mã trạng thái HTTP đúng cách
- Phiên bản hóa API endpoints: `/api/v1/`
- Tài liệu hóa tất cả endpoints với ví dụ

### Cơ sở dữ liệu
- Sử dụng migrations cho thay đổi schema
- Không bao giờ hardcode credentials
- Sử dụng connection pooling
- Bật query logging trong phát triển
- Yêu cầu sao lưu thường xuyên

### Triển khai
- Triển khai dựa trên Docker
- Điều phối bằng Kubernetes
- Chiến lược blue-green deployment
- Tự động rollback khi thất bại
- Database migrations chạy trước khi deploy

## Lệnh thông dụng

| Lệnh | Mục đích |
|---------|---------|
| `npm run dev` | Khởi động development server |
| `npm test` | Chạy bộ kiểm thử |
| `npm run lint` | Kiểm tra code style |
| `npm run build` | Build cho production |
| `npm run migrate` | Chạy database migrations |

## Liên hệ Nhóm
- Tech Lead: Sarah Chen (@sarah.chen)
- Product Manager: Mike Johnson (@mike.j)
- DevOps: Alex Kim (@alex.k)

## Vấn đề đã biết và Giải pháp
- PostgreSQL connection pooling giới hạn ở 20 trong giờ cao điểm
- Giải pháp: Cài đặt hàng đợi query
- Safari 14 không tương thích với async generators
- Giải pháp: Sử dụng Babel transpiler

## Dự án liên quan
- Analytics Dashboard: `/projects/analytics`
- Mobile App: `/projects/mobile`
- Admin Panel: `/projects/admin`
