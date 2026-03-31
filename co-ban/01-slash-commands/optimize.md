---
description: Analyze code for performance issues and suggest optimizations
---

# Tối Ưu Hóa Mã Nguồn

Kiểm tra mã được cung cấp theo các vấn đề sau (theo thứ tự ưu tiên):

1. **Điểm nghẽn hiệu suất** — xác định các phép toán O(n²), vòng lặp không hiệu quả
2. **Rò rỉ bộ nhớ** — tìm tài nguyên chưa được giải phóng, tham chiếu vòng
3. **Cải thiện thuật toán** — gợi ý thuật toán hoặc cấu trúc dữ liệu tốt hơn
4. **Cơ hội caching** — xác định các phép tính lặp lại
5. **Vấn đề đồng thời** — tìm race condition hoặc vấn đề threading

Định dạng phản hồi:
- Mức độ nghiêm trọng (Critical/High/Medium/Low)
- Vị trí trong mã
- Giải thích
- Khuyến nghị sửa kèm ví dụ mã
