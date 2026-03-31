# Template Phat Hien Code Review

Dung template nay khi tai lieu hoa moi van de tim thay trong qua trinh review ma.

---

## Van de: [TEN]

### Muc do Nghiem trong
- [ ] Nghiem trong (chan trien khai)
- [ ] Cao (nen sua truoc khi merge)
- [ ] Trung binh (nen sua som)
- [ ] Thap (tot neu co)

### Danh muc
- [ ] Bao mat
- [ ] Hieu suat
- [ ] Chat luong Ma
- [ ] Kha nang Bao tri
- [ ] Kiem thu
- [ ] Mau Thiet ke
- [ ] Tai lieu

### Vi tri
**Tep tin:** `src/components/UserCard.tsx`

**Dong:** 45-52

**Ham/Phuong thuc:** `renderUserDetails()`

### Mo ta Van de

**La gi:** Mo ta van de la gi.

**Tai sao quan trong:** Giai thich tac dong va tai sao can sua.

**Hanh vi hien tai:** Hien thi ma hoac hanh vi co van de.

**Hanh vi mong doi:** Mo ta nhung gi nen xay ra thay the.

### Vi du Ma

#### Hien tai (Co van de)

```typescript
// Hien thi van de N+1 query
const users = fetchUsers();
users.forEach(user => {
  const posts = fetchUserPosts(user.id); // Truy van moi user!
  renderUserPosts(posts);
});
```

#### Sua doi De xuat

```typescript
// Toi uu voi truy van JOIN
const usersWithPosts = fetchUsersWithPosts();
usersWithPosts.forEach(({ user, posts }) => {
  renderUserPosts(posts);
});
```

### Phan tich Tac dong

| Khia canh | Tac dong | Muc do |
|--------|--------|----------|
| Hieu suat | 100+ truy van cho 20 nguoi dung | Cao |
| Trai nghiem Nguoi dung | Tai trang cham | Cao |
| Kha nang Mo rong | Vo hieu o quy mo lon | Nghiem trong |
| Kha nang Bao tri | Kho debug | Trung binh |

### Van de Lien quan

- Van de tuong tu trong `AdminUserList.tsx` dong 120
- PR lien quan: #456
- Issue lien quan: #789

### Tai nguyen Bo sung

- [Van de N+1 Query](https://en.wikipedia.org/wiki/N%2B1_problem)
- [Tai lieu Database Join](https://docs.example.com/joins)
- [Huong dan Toi uu Hieu suat](./docs/performance.md)

### Ghi chu Nguoi Review

- Day la mau pho bien trong codebase nay
- Can xem xet them vao huong dan style ma
- Co the tao ham ho tro

### Phan hoi Tac gia (de nhan xet)

*Duoc dien boi tac gia ma:*

- [ ] Sua loi da thuc hien trong commit: `abc123`
- [ ] Trang thai sua: hoan tat / Đang tien hanh / Can thao luan
- [ ] Cau hoi hoac lo ngai: (mo ta)

---

## Thong ke Phat hien (cho Nguoi Review)

Khi review nhieu phat hien, theo doi:

- **Tong van de Tim thay:** X
- **Nghiem trong:** X
- **Cao:** X
- **Trung binh:** X
- **Thap:** X

**Khuyen nghi:** ✅ Phe duyet / ⚠️ Yeu cau Thay doi / 🔄 Can thao luan

**Chat luong Ma Tong the:** 1-5 sao
