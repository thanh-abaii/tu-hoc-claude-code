
# Plugin DevOps Automation

Tự động hóa DevOps hoàn chỉnh cho triển khai, giám sát và ứng phó sự cố.

## Tính năng

✅ Tự động triển khai
✅ Quy trình rollback
✅ Giám sát sức khỏe hệ thống
✅ Quy trình ứng phó sự cố
✅ Tích hợp Kubernetes

## Cài đặt

```bash
/plugin install devops-automation
```

## Bao gồm

### Slash Commands
- `/deploy` - Triển khai lên production hoặc staging
- `/rollback` - Rollback về phiên bản trước
- `/status` - Kiểm tra sức khỏe hệ thống
- `/incident` - Xử lý sự cố production

### Subagents
- `deployment-specialist` - Thao tác triển khai
- `incident-commander` - Điều phối sự cố
- `alert-analyzer` - Phân tích sức khỏe hệ thống

### Server MCP
- Tích hợp Kubernetes

### Scripts
- `deploy.sh` - Tự động triển khai
- `rollback.sh` - Tự động rollback
- `health-check.sh` - Tiện ích kiểm tra sức khỏe

### Hooks
- `pre-deploy.js` - Xác thực trước triển khai
- `post-deploy.js` - Tác vụ sau triển khai

## Sử dụng

### Triển khai lên Staging
```
/deploy staging
```

### Triển khai lên Production
```
/deploy production
```

### Rollback
```
/rollback production
```

### Kiểm tra trạng thái
```
/status
```

### Xử lý sự cố
```
/incident
```

## Yêu cầu

- Claude Code 1.0+
- Kubernetes CLI (kubectl)
- Đã cấu hình truy cập cluster

## Cấu hình

Thiết lập cấu hình Kubernetes:
```bash
export KUBECONFIG=~/.kube/config
```

## Quy trình ví dụ

```
Người dùng: /deploy production

Claude:
1. Chạy pre-deploy hook (xác thực kubectl, kết nối cluster)
2. Ủy quyền cho subagent deployment-specialist
3. Chạy script deploy.sh
4. Giám sát tiến trình triển khai qua Kubernetes MCP
5. Chạy post-deploy hook (chờ pods, smoke tests)
6. Cung cấp báo cáo triển khai

Kết quả:
✅ Triển khai hoàn tất
📦 Phiên bản: v2.1.0
🚀 Pods: 3/3 sẵn sàng
⏱️  Thời gian: 2m 34s
```
