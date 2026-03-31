# Template Ke hoach Tai cau truc

Dung template nay de tai lieu hoa va theo doi qua trinh tai cau truc.

---

## Thong tin Du an

| Truong | Gia tri |
|-------|-------|
| **Du an/Module** | [Ten du an] |
| **Tep tin Mau dich** | [Danh sach tep tin can tai cau truc] |
| **Ngay tao** | [Ngay] |
| **Tac gia** | [Ten] |
| **Trang thai** | Thao / Đang xem xet / Da phe duyet / Đang tien hanh / hoan tat |

---

## Tom tat Dieu hanh

### Muc tieu
- [ ] [Muc tieu chinh: vd: Cai thien kha nang doc cua xu ly thanh toan]
- [ ] [Muc tieu phu: vd: Giam ma trung lap]
- [ ] [Muc tieu ba: vd: Cai thien kha nang kiem thu]

### Rang buoc
- [ ] [Rang buoc 1: vd: Khong the thay doi API cong khai]
- [ ] [Rang buoc 2: vd: Phai duy tri tuong thich nguoc]
- [ ] [Rang buoc 3: vd: Khong thay doi luon co so du lieu]

### Muc do Rui ro
- [ ] Thap - Thaydoi nho, ma da duoc kiem thu tot
- [ ] Trung binh - Thaydoi vua phai, co mot so rui ro
- [ ] Cao - Thaydoi dang ke, can chu y ky

---

## Danh sach Kiem tra Truoc Tai cau truc

### Danh gia Do phu Kiem thu

| Chi so | Hien tai | Muc tieu | Trang thai |
|--------|---------|--------|--------|
| Do phu Unit Test | __%  | ≥80% | |
| Integration Tests | Co/Khong | Co | |
| Tat ca Test dang dat | Co/Khong | Co | |

### Can co truoc khi Bat dau
- [ ] Tat ca test dang dat
- [ ] Ma da duoc review va hieu
- [ ] Sao luu/kiem soat phien ban da san sang
- [ ] Da nhan phe duyet nguoi dung

---

## Mui Code da Xac dinh

### Tom tat

| # | Mui | Vi tri | Muc do | Uu tien |
|---|-------|----------|----------|----------|
| 1 | [vd: Ham dai] | [tep:dong] | Cao | P1 |
| 2 | [vd: Ma trung lap] | [tep:dong] | Trung binh | P2 |
| 3 | [vd: Ghen tich Tinh nang] | [tep:dong] | Thap | P3 |

### Phan tich Chi tiet

#### Mui #1: [Ten]

**Vi tri**: `path/to/file.js:45-120`

**Mo ta**: [Mo ta chi tiet van de]

**Tac dong**:
- [Tac dong 1]
- [Tac dong 2]

**Giai phap De xuat**: [Tom tat cach sua]

---

## Cac Giai doan Tai cau truc

### Giai doan A: Thang nhanh (Rui ro thap)

**Muc tieu**: Cai thien don gian voi gia tri tuc thi

**Thaydoi Uoc tinh**: [X tep tin, Y phuong thuc]

**Can Phe duyet Nguoi dung**: Co / Khong

| # | Nhiem vu | Tep tin | Ky thuat Tai cau truc | Trang thai |
|---|------|------|-------------|--------|
| A1 | Doi ten bien `x` thanh `userCount` | utils.js:15 | Doi ten Bien | [ ] |
| A2 | Xoa `oldHandler()` khong dung | api.js:89 | Xoa Ma Chet | [ ] |
| A3 | Trich xuat xac thuc trung lap | form.js:23,67 | Trich xuat Ham | [ ] |

**Ke hoach Khoi phuc**: Revert cac commit A1-A3

---

### Giai doan B: Cai thien Cau truc (Rui ro trung binh)

**Muc tieu**: Cai thien to chuc va ro rang cua ma

**Thaydoi Uoc tinh**: [X tep tin, Y phuong thuc]

**Can Phe duyet Nguoi dung**: Co

**Phu thuoc**: Giai doan A phai hoan tat

| # | Nhiem vu | Tep tin | Ky thuat Tai cau truc | Trang thai |
|---|------|------|-------------|--------|
| B1 | Trich xuat `calculatePrice()` tu ham dai | order.js:45 | Trich xuat Ham | [ ] |
| B2 | Gioi thieu doi tuong tham so `OrderDetails` | order.js:12 | Gioi thieu Doi tuong Tham so | [ ] |
| B3 | Di chuyen `formatAddress()` sang class Address | customer.js:78 | Di chuyen Phuong thuc | [ ] |

**Ke hoach Khoi phuc**: Revert ve commit sau Giai doan A

---

### Giai doan C: Thay doi Kien truc (Rui ro cao hon)

**Muc tieu**: Giai quyet van de cau truc sau hon

**Thaydoi Uoc tinh**: [X tep tin, Y phuong thuc]

**Can Phe duyet Nguoi dung**: Co

**Phu thuoc**: Giai doan A va B phai hoan tat

| # | Nhiem vu | Tep tin | Ky thuat Tai cau truc | Trang thai |
|---|------|------|-------------|--------|
| C1 | Thay the switch gia tri bang da hinh | pricing.js:30 | Thay the Dieu kien bang Da hinh | [ ] |
| C2 | Trich xuat class `NotificationService` | user.js:100 | Trich xuat Class | [ ] |

**Ke hoach Khoi phuc**: Revert ve commit sau Giai doan B

---

## Chi tiet Cac Buoc Tai cau truc

### Nhiem vu [ID]: [Ten Nhiem vu]

**Mui da Giai quyet**: [Ten mui]

**Ky thuat Tai cau truc**: [Ten ky thuat]

**Muc do Rui ro**: Thap / Trung binh / Cao

#### Boi canh

**Truoc** (Trang thai Hien tai):
```javascript
// Dan ma hien tai vao day
```

**Sau** (Trang thai Mong doi):
```javascript
// Dan ma mong doi vao day
```

#### Co hoc Tung Buoc

1. [ ] **Buoc 1**: [Mo ta]
   - Kiem thu: Chay test sau buoc nay
   - Mong doi: Tat ca test dat

2. [ ] **Buoc 2**: [Mo ta]
   - Kiem thu: Chay test sau buoc nay
   - Mong doi: Tat ca test dat

3. [ ] **Buoc 3**: [Mo ta]
   - Kiem thu: Chay test sau buoc nay
   - Mong doi: Tat ca test dat

#### Xac minh

- [ ] Tat ca test dat
- [ ] Hanh vi khong doi
- [ ] Ma bien dich duoc
- [ ] Khong co canh bao moi

#### Thong diep Commit
```
refactor: [Mo ta viec tai cau truc]
```

---

## Theo doi Tien do

### Trang thai Giai doan

| Giai doan | Trang thai | Bat dau | hoan tat | Test dang dat |
|-------|--------|---------|-----------|---------------|
| A | Chua bat dau / Đang tien hanh / hoan tat | | | |
| B | Chua bat dau / Đang tien hanh / hoan tat | | | |
| C | Chua bat dau / Đang tien hanh / hoan tat | | | |

### Van de Gap phai

| # | Van de | Giai phap | Trang thai |
|---|-------|------------|--------|
| 1 | [Mo ta] | [Cach giai quyet] | Mo / Da giai quyet |

---

## So sanh Chi so

### Truoc Tai cau truc

| Chi so | Tep 1 | Tep 2 | Tong |
|--------|--------|--------|-------|
| So dong Ma | | | |
| Do phuc tap Cyclomatic | | | |
| Chi so Kha nang Bao tri | | | |
| So Phuong thuc | | | |
| Do dai TB Phuong thuc | | | |

### Sau Tai cau truc

| Chi so | Tep 1 | Tep 2 | Tong | Thay doi |
|--------|--------|--------|-------|--------|
| So dong Ma | | | | |
| Do phuc tap Cyclomatic | | | | |
| Chi so Kha nang Bao tri | | | | |
| So Phuong thuc | | | | |
| Do dai TB Phuong thuc | | | | |

---

## Danh sach Kiem tra Sau Tai cau truc

- [ ] Tat ca test dat
- [ ] Khong canh bao hoac loi moi
- [ ] Ma bien dich thanh cong
- [ ] Da xac minh thu cong
- [ ] Tai lieu da cap nhat (neu can)
- [ ] Ma da duoc review
- [ ] Chi so da cai thien
- [ ] Da nhan xac nhan nguoi dung

---

## Bai hoc Rut ra

### Dieu gi Tot
- [Muc 1]
- [Muc 2]

### Co the Cai thien
- [Muc 1]
- [Muc 2]

### Khuyen nghi cho Tuong lai
- [Muc 1]
- [Muc 2]

---

## Phe duyet

| Vai tro | Ten | Ngay | Chu ky |
|------|------|------|-----------|
| Nguoi tao Ke hoach | | | |
| Truong Ky thuat | | | |
| Chu san pham | | | |

---

## Phu luc

### A. Tai lieu Lien quan
- [Link den tai lieu lien quan]

### B. Tai lieu Tham khao
- [Link den danh muc mui code]
- [Link den danh muc ky thuat tai cau truc]

### C. Cong cu Su dung
- [Framework kiem thu]
- [Cong cu linting]
- [Cong cu phan tich do phuc tap]
