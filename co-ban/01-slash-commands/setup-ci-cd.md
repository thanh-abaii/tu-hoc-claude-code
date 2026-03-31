---
name: Setup CI/CD Pipeline
description: Implement pre-commit hooks and GitHub Actions for quality assurance
tags: ci-cd, devops, automation
---

# Thiết Lập Pipeline CI/CD

Thiết lập quality gates DevOps toàn diện tùy theo loại dự án:

1. **Phân tích dự án**: Phát hiện ngôn ngữ, framework, hệ thống build, và công cụ hiện có
2. **Cấu hình pre-commit hooks** với công cụ theo ngôn ngữ:
   - Định dạng: Prettier/Black/gofmt/rustfmt/etc.
   - Linting: ESLint/Ruff/golangci-lint/Clippy/etc.
   - Bảo mật: Bandit/gosec/cargo-audit/npm audit/etc.
   - Kiểm tra kiểu: TypeScript/mypy/flow (nếu phù hợp)
   - Kiểm thử: Chạy bộ test liên quan
3. **Tạo GitHub Actions workflows** (.github/workflows/):
   - Nhân bản pre-commit checks trên push/PR
   - Multi-version/platform matrix (nếu phù hợp)
   - Build và test verification
   - Deployment steps (nếu cần)
4. **Xác minh pipeline**: Test cục bộ, tạo test PR, xác nhận tất cả checks pass

Dùng công cụ miễn phí/open-source. Tôn trọng cấu hình hiện có. Giữ execution nhanh.
