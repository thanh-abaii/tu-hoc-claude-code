---
name: Documentation Refactor
description: Restructure project documentation for clarity and accessibility
tags: documentation, refactoring, organization
---

# Tái Cấu Trúc Tài Liệu

Tái cấu trúc tài liệu dự án tùy theo loại dự án:

1. **Phân tích dự án**: Xác định loại (thư viện/API/web app/CLI/microservices), kiến trúc, và user persona
2. **Tập trung docs**: Di chuyển tài liệu kỹ thuật vào `docs/` với cross-references phù hợp
3. **Root README.md**: Tinh gọn làm điểm vào với tổng quan, quickstart, tóm tắt module/component, license, thông tin liên hệ
4. **Component docs**: Thêm file README cho từng module/package/service với hướng dẫn cài đặt và kiểm thử
5. **Tổ chức `docs/`** theo danh mục phù hợp:
   - Kiến trúc, Tham chiếu API, Cơ sở dữ liệu, Thiết kế, Khắc phục sự cố, Triển khai, Đóng góp (tùy nhu cầu dự án)
6. **Tạo hướng dẫn** (chọn loại phù hợp):
   - Hướng dẫn người dùng: Tài liệu cho ứng dụng
   - Tài liệu API: Endpoint, xác thực, ví dụ cho APIs
   - Hướng dẫn phát triển: Cài đặt, kiểm thử, quy trình đóng góp
   - Hướng dẫn triển khai: Triển khai production cho services/apps
7. **Dùng Mermaid** cho tất cả sơ đồ (kiến trúc, luồng, schema)

Giữ tài liệu ngắn gọn, dễ quét, và phù hợp với loại dự án.
