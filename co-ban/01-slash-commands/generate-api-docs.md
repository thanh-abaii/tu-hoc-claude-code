---
description: Create comprehensive API documentation from source code
---

# Trình Tạo Tài Liệu API

Tạo tài liệu API bằng cách:

1. Quét tất cả file trong `/src/api/`
2. Trích xuất chữ ký hàm số và chú thích JSDoc
3. Tổ chức theo endpoint/module
4. Tạo markdown với ví dụ
5. Bao gồm schema request/response
6. Thêm tài liệu lỗi

Định dạng đầu ra:
- File Markdown trong `/docs/api.md`
- Bao gồm curl examples cho tất cả endpoint
- Thêm TypeScript types
