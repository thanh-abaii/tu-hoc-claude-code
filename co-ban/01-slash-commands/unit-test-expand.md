---
name: Expand Unit Tests
description: Increase test coverage by targeting untested branches and edge cases
tags: testing, coverage, unit-tests
---

# Mở Rộng Unit Tests

Mở rộng unit tests phù hợp với framework kiểm thử của dự án:

1. **Phân tích coverage**: Chạy báo cáo coverage để xác định nhánh chưa test, edge case, và vùng coverage thấp
2. **Xác định khoảng trống**: Rà soát mã cho các nhánh logic, đường dẫn lỗi, điều kiện biên, đầu vào null/rỗng
3. **Viết tests** dùng framework của dự án:
   - Jest/Vitest/Mocha (JavaScript/TypeScript)
   - pytest/unittest (Python)
   - Go testing/testify (Go)
   - Rust test framework (Rust)
4. **Nhắm đến các tình huống cụ thể**:
   - Xử lý lỗi và ngoại lệ
   - Giá trị biên (min/max, rỗng, null)
   - Edge case và corner case
   - Chuyển trạng thái và side effects
5. **Xác minh cải thiện**: Chạy coverage lần nữa, xác nhận tăng measurable

Chỉ trình bày khối mã test mới. Tuân theo pattern và quy ước đặt tên test hiện có.
