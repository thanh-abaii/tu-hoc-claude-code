---
name: api-documentation-generator
description: Sinh tai lieu API toan dien, chinh xac tu ma nguon. Su dung khi tao hoac cap nhat tai lieu API, sinh dac ta OpenAPI, hoac khi nguoi dung nhac den tai lieu API, endpoint, hoac tai lieu.
---

# Skill Sinh Tai lieu API

## Sinh ra

- Dac ta OpenAPI/Swagger
- Tai lieu endpoint API
- Vi du su dung SDK
- Huong dan tich hop
- Tham khao ma loi
- Huong dan xac thuc

## Cau truc Tai lieu

### Cho Moi Endpoint

```markdown
## GET /api/v1/users/:id

### Mo ta
Giai thich ngan gon endpoint nay lam gi

### Tham so

| Ten | Kieu | Bat buoc | Mo ta |
|------|------|----------|-------------|
| id | string | Co | ID nguoi dung |

### Phan hoi

**200 Thanh cong**
```json
{
  "id": "usr_123",
  "name": "John Doe",
  "email": "john@example.com",
  "created_at": "2025-01-15T10:30:00Z"
}
```

**404 Khong tim thay**
```json
{
  "error": "USER_NOT_FOUND",
  "message": "Nguoi dung khong ton tai"
}
```

### Vi du

**cURL**
```bash
curl -X GET "https://api.example.com/api/v1/users/usr_123" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

**JavaScript**
```javascript
const user = await fetch('/api/v1/users/usr_123', {
  headers: { 'Authorization': 'Bearer token' }
}).then(r => r.json());
```

**Python**
```python
response = requests.get(
    'https://api.example.com/api/v1/users/usr_123',
    headers={'Authorization': 'Bearer token'}
)
user = response.json()
```
```
