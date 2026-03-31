---
description: Stage all changes, create commit, and push to remote (use with caution)
allowed-tools: Bash(git add:*), Bash(git status:*), Bash(git commit:*), Bash(git push:*), Bash(git diff:*), Bash(git log:*), Bash(git pull:*)
---

# Commit và Push Tất Cả

⚠️ **CẢNH BÁO**: Stage TẤT CẢ thay đổi, commit và push lên remote. Chỉ dùng khi chắc chắn tất cả thay đổi thuộc cùng một nhóm.

## Quy Trình

### 1. Phân Tích Thay Đổi
Chạy song song:
- `git status` — Hiển thị file đã sửa/thêm/xóa/chưa theo dõi
- `git diff --stat` — Hiển thị thống kê thay đổi
- `git log -1 --oneline` — Hiển thị commit gần nhất để biết style message

### 2. Kiểm Tra An Toàn

**❌ DỪNG và CẢNH BÁO nếu phát hiện:**
- Secrets: `.env*`, `*.key`, `*.pem`, `credentials.json`, `secrets.yaml`, `id_rsa`, `*.p12`, `*.pfx`, `*.cer`
- API Keys: Bất kỳ biến `*_API_KEY`, `*_SECRET`, `*_TOKEN` nào có giá trị thật (không phải placeholder như `your-api-key`, `xxx`, `placeholder`)
- File lớn: `>10MB` không dùng Git LFS
- Build artifacts: `node_modules/`, `dist/`, `build/`, `__pycache__/`, `*.pyc`, `.venv/`
- File tạm: `.DS_Store`, `thumbs.db`, `*.swp`, `*.tmp`

**Xác thực API Key:**
Kiểm tra file đã sửa cho các pattern như:
```bash
OPENAI_API_KEY=sk-proj-xxxxx  # ❌ Phát hiện key thật!
AWS_SECRET_KEY=AKIA...         # ❌ Phát hiện key thật!
STRIPE_API_KEY=sk_live_...    # ❌ Phát hiện key thật!

# ✅ Placeholder chấp nhận được:
API_KEY=your-api-key-here
SECRET_KEY=placeholder
TOKEN=xxx
API_KEY=<your-key>
SECRET=${YOUR_SECRET}
```

**✅ Xác nhận:**
- `.gitignore` được cấu hình đúng
- Không có merge conflicts
- Đúng nhánh (cảnh báo nếu main/master)
- API keys chỉ là placeholder

### 3. Yêu Cầu Xác Nhận

Trình bày tóm tắt:
```
📊 Tóm Tắt Thay Đổi:
- X files đã sửa, Y đã thêm, Z đã xóa
- Tổng: +AAA dòng thêm, -BBB dòng xóa

🔒 An Toàn: ✅ Không секретов | ✅ Không file lớn | ⚠️ [cảnh báo]
🌿 Nhánh: [tên] → origin/[tên]

Sẽ thực hiện: git add . → commit → push

Gõ 'yes' để tiếp tục hoặc 'no' để hủy.
```

**CH đợi "yes" rõ ràng trước khi tiếp tục.**

### 4. Thực Thi (Sau Khi Xác Nhận)

Chạy tuần tự:
```bash
git add .
git status  # Xác nhận staging
```

### 5. Tạo Commit Message

Phân tích thay đổi và tạo conventional commit:

**Định dạng:**
```
[type]: Tóm tắt ngắn (tối đa 72 ký tự)

- Thay đổi chính 1
- Thay đổi chính 2
- Thay đổi chính 3
```

**Types:** `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`, `perf`, `build`, `ci`

**Ví dụ:**
```
docs: Cập nhật README với tài liệu toàn diện

- Thêm sơ đồ kiến trúc và bảng
- Bao gồm ví dụ thực tế
- Mở rộng phần best practices
```

### 6. Commit và Push

```bash
git commit -m "$(cat <<'EOF'
[Commit message được tạo tự động]
EOF
)"
git push  # Nếu lỗi: git pull --rebase && git push
git log -1 --oneline --decorate  # Xác nhận
```

### 7. Xác Nhận Thành Công

```
✅ Đã push thành công lên remote!

Commit: [hash] [message]
Branch: [branch] → origin/[branch]
Files đã thay đổi: X (+insertions, -deletions)
```

## Xử Lý Lỗi

- **git add lỗi**: Kiểm tra quyền, file bị khóa, xác nhận repo đã khởi tạo
- **git commit lỗi**: Sửa pre-commit hooks, kiểm tra git config (user.name/email)
- **git push lỗi**:
  - Non-fast-forward: `git pull --rebase && git push`
  - Không có remote branch: `git push -u origin [branch]`
  - Branch được bảo vệ: Dùng PR workflow thay thế

## Khi Nào Dùng

✅ **Tốt:**
- Cập nhật tài liệu nhiều file
- Tính năng kèm tests và docs
- Sửa lỗi trên nhiều file
- Định dạng/tái cấu trúc toàn dự án
- Thay đổi cấu hình

❌ **Tránh:**
- Không chắc chắn những gì đang commit
- Chứa secrets/dữ liệu nhạy cảm
- Branch được bảo vệ không review
- Có merge conflicts
- Muốn lịch sử commit chi tiết
- Pre-commit hooks đang lỗi

## Giải Pháp Thay Thế

Nếu người dùng muốn kiểm soát, gợi ý:
1. **Stage có chọn lọc**: Review/stage file cụ thể
2. **Stage tương tác**: `git add -p` để chọn patch
3. **PR workflow**: Tạo branch → push → PR (dùng lệnh `/pr`)

**⚠️ Nhớ**: Luôn review thay đổi trước khi push. Nếu không chắc, dùng lệnh git riêng lẻ để kiểm soát tốt hơn.
