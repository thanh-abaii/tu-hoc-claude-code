# Sở thích phát triển của tôi

## Về tôi
- **Trình độ kinh nghiệm**: 8 năm phát triển full-stack
- **Ngôn ngữ yêu thích**: TypeScript, Python
- **Phong cách giao tiếp**: Trực tiếp, có ví dụ minh họa
- **Phong cách học**: Sơ đồ trực quan kèm mã nguồn

## Sở thích mã nguồn

### Xử lý lỗi
Tôi ưu tiên xử lý lỗi tường minh với các khối try-catch và thông báo lỗi có ý nghĩa.
Tránh các lỗi chung chung. Luôn ghi log lỗi để debug.

### Ghi chú
Sử dụng ghi chú cho lý do TẠI SAO, không phải CÁI GÌ. Mã nguồn phải tự giải thích.
Ghi chú nên giải thích logic nghiệp vụ hoặc các quyết định không hiển nhiên.

### Kiểm thử
Tôi ưu tiên TDD (phát triển hướng kiểm thử).
Viết kiểm thử trước, sau đó mới cài đặt.
Tập trung vào hành vi, không phải chi tiết cài đặt.

### Kiến trúc
Tôi ưu tiên thiết kế mô-đun, lỏng lẻo (loosely-coupled).
Sử dụng dependency injection để dễ kiểm thử.
Tách biệt mối quan tâm (Controllers, Services, Repositories).

## Sở thích Debug
- Sử dụng console.log với tiền tố: `[DEBUG]`
- Bao gồm ngữ cảnh: tên hàm, các biến liên quan
- Sử dụng stack traces khi khả dụng
- Luôn bao gồm timestamps trong logs

## Giao tiếp
- Giải thích các khái niệm phức tạp bằng sơ đồ
- Cho ví dụ cụ thể trước khi giải thích lý thuyết
- Bao gồm các đoạn mã trước/sau khi thay đổi
- Tóm tắt các điểm chính ở cuối

## Tổ chức dự án
Tôi tổ chức dự án như sau:
```
project/
  ├── src/
  │   ├── api/
  │   ├── services/
  │   ├── models/
  │   └── utils/
  ├── tests/
  ├── docs/
  └── docker/
```

## Công cụ
- **IDE**: VS Code với vim keybindings
- **Terminal**: Zsh với Oh-My-Zsh
- **Format**: Prettier (100 ký tự mỗi dòng)
- **Linter**: ESLint với airbnb config
- **Test Framework**: Jest với React Testing Library
