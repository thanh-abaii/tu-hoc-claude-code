---
name: code-refactor
description: Tai cau truc ma he thong dua tren phuong phap cua Martin Fowler. Su dung khi nguoi dung yeu cau tai cau truc ma, cai thien cau truc ma, giam no ky thuat, don dep ma legacy, loai bo mui code, hoac cai thien kha nang bao tri ma. Skill nay huong dan qua cach tiep can theo giai doan voi nghien cuu, ke hoach va trien khai tang tu an toan.
---

# Skill Tai Cau Truc Ma

Cach tiep can he thong tai cau truc ma dua tren *Refactoring: Improving the Design of Existing Code* (Phien ban 2) cua Martin Fowler. Skill nay nhan manh thay doi tang tu an toan, duoc ho tro boi kiem thu.

> "Tai cau truc la qua trinh thay doi he thong phan mem sao cho khong lam thay doi hanh vi ben ngoai cua ma nhung cai thien cau truc noi bo." -- Martin Fowler

## Nguyen tac Cot loi

1. **Bao toan Hanh vi**: Hanh vi ben ngoai phai khong thay doi
2. **Buoc Nho**: Thay doi nho, kiem tra duoc
3. **Lai boi Kiem thu**: Kiem thu la luoi an toan
4. **Lien tuc**: Tai cau truc la qua trinh lien tuc, khong phai su kien mot lan
5. **Hop tac**: Can phe duyet nguoi dung o moi giai doan

## Tong quan Quy trinh

```
Giai doan 1: Nghien cuu & Phan tich
    ↓
Giai doan 2: Danh gia Do phu Kiem thu
    ↓
Giai doan 3: Nhan dien Mui Code
    ↓
Giai doan 4: Tao Ke hoach Tai cau truc
    ↓
Giai doan 5: Trien khai Tang tu
    ↓
Giai doan 6: Review & Lap lai
```

---

## Giai doan 1: Nghien cuu & Phan tich

### Muc tieu
- Hieu cau truc va muc dich codebase
- Xac dinh pham vi tai cau truc
- Thu thap boi canh ve yeu cau nghiep vu

### Cau hoi cho Nguoi dung
Truoc khi bat dau, lam ro:

1. **Pham vi**: Tep tin/module/ham nao can tai cau truc?
2. **Muc tieu**: Ban dang giai quyet van de gi? (kha nang doc, hieu suat, kha nang bao tri)
3. **Rang buoc**: Co lanh vuc nao KHONG nen thay doi khong?
4. **Ap luc thoi gian**: Viec nay co chan cong viec khac khong?
5. **Trang thai kiem thu**: Da co kiem thu chua? Co dang chay khong?

### Hanh dong
- [ ] Doc va hieu ma muc tieu
- [ ] Xac dinh phu thuoc va tich hop
- [ ] Tai lieu hoa kien truc hien tai
- [ ] Ghi chu ky hieu no ky thuat hien co (TODOs, FIXMEs)

### Dau ra
Trinh bay ket qua cho nguoi dung:
- Tom tat cau truc ma
- Lanh vuc co van de da xac dinh
- Khuyen nghi ban dau
- **Yeu cau phe duyet de tiep tuc**

---

## Giai doan 2: Danh gia Do phu Kiem thu

### Tai sao Kiem thu Quan trong
> "Tai cau truc ma khong co kiem thu giong nhu lai xe that day an toan." -- Martin Fowler

Kiem thu la **yeu to then chot** cho tai cau truc an toan. Khong co chung, ban co nguy co dua loi vao.

### Buoc Danh gia

1. **Kiem tra kiem thu hien co**
   ```bash
   # Tim kiem tep kiem thu
   find . -name "*test*" -o -name "*spec*" | head -20
   ```

2. **Chay kiem thu hien co**
   ```bash
   # JavaScript/TypeScript
   npm test

   # Python
   pytest -v

   # Java
   mvn test
   ```

3. **Kiem tra do phu (neu co)**
   ```bash
   # JavaScript
   npm run test:coverage

   # Python
   pytest --cov=.
   ```

### Diem Quyet dinh: Hoi Nguoi dung

**Neu kiem thu da ton tai va dat:**
- Tien toi Giai doan 3

**Neu kiem thu thieu hoac chua day du:**
Trinh bay lua chon:
1. Viet kiem thu truoc (khuyen nghi)
2. Them kiem thu tang tu trong qua trinh tai cau truc
3. Tien hanh ma khong co kiem thu (rui ro - can nguoi dung xac nhan)

**Neu kiem thu dang loi:**
- DUNG. Sua kiem thu loi truoc khi tai cau truc
- Hoi nguoi dung: Chung ta nen sua kiem thu truoc chu?

### Huong dan Viet Kiem thu (neu can)

Cho moi ham duoc tai cau truc, dam bao kiem thu bao quat:
- Duong hanh phuc (hoat dong binh thuong)
- Truong hop bien (dau vao rong, null, bien gioi)
- Kich ban loi (dau vao khong hop le, exception)

Dung chu ky "do-xanh-tai-cau-truc":
1. Viet kiem thu that bai (do)
2. Lam cho no dat (xanh)
3. Tai cau truc

---

## Giai doan 3: Nhan dien Mui Code

### Mui Code la gi?
Trieu chung cua van de sau hon trong ma. Chung khong phai loi, nhung la dau hieu cho thay ma co the duoc cai thien.

### Mui Code Pho bien can Kiem tra

Xem [references/code-smells.md](references/code-smells.md) cho danh muc day du.

#### Tham khao Nhanh

| Mui | Dau hieu | Tac dong |
|-------|-------|--------|
| **Ham dai** | Ham > 30-50 dong | Kho hieu, kiem thu, bao tri |
| **Ma trung lap** | Cung logic o nhieu noi | Sua loi can o nhieu cho |
| **Class lon** | Class qua nhieu trach nhiem | Vi pham Don Trach nhiem |
| **Ghen tich Tinh nang** | Phuong thuc dung du lieu class khac nhieu hon | Dong goi kem |
| **Am anh Kieu Nguyen thuy** | Dung kieu nguyen thuy qua muc thay vi doi tuong | Thieu khai niem mien |
| **Danh sach Tham so dai** | Ham voi 4+ tham so | Kho goi dung |
| **Cum Du lieu** | Cung item du lieu xuat hien cung nhau | Thieu truu tuong hoa |
| **Lenh Switch** | Chuoi switch/if-else phuc tap | Kho mo rong |
| **Tong quat Doan** | Ma "phong truong hop can" | Do phuc tap khong can thiet |
| **Ma Chet** | Ma khong dung | Nham lan, gan bau bao tri |

### Buoc Phan tich

1. **Phan tich Tu dong** (neu script co san)
   ```bash
   python scripts/detect-smells.py <tep>
   ```

2. **Review Thu cong**
   - Di qua ma mot cach he thong
   - Ghi chu moi mui voi vi tri va muc do nghiem trong
   - Phan loai theo tac dong (Nghiem trong/Cao/Trung binh/Thap)

3. **Uu tien**
   Tap trung vao mui:
   - Chan phat trien hien tai
   - Gay loi hoac nham lan
   - Anh huong duong di ma thay doi nhieu nhat

### Dau ra: Bao cao Mui

Trinh bay cho nguoi dung:
- Danh sach mui da xac dinh voi vi tri
- Danh gia muc do nghiem trong cho moi mui
- Thu tu uu tien khuyen nghi
- **Yeu cau phe duyet ve uu tien**

---

## Giai doan 4: Tao Ke hoach Tai cau truc

### Chon Ky thuat Tai cau truc

Cho moi mui, chon ky thuat tai cau truc phu hop tu danh muc.

Xem [references/refactoring-catalog.md](references/refactoring-catalog.md) cho danh sach day du.

#### Anh xa Mui sang Ky thuat Tai cau truc

| Mui Code | Ky thuat Tai cau truc Khuyen nghi |
|------------|---------------------------|
| Ham dai | Trich xuat Ham, Thay the Bien tam bang Truy van |
| Ma trung lap | Trich xuat Ham, Keo len Phuong thuc, Tao Mau |
| Class lon | Trich xuat Class, Trich xuat Lop con |
| Ghen tich Tinh nang | Di chuyen Phuong thuc, Di chuyen Truong |
| Am anh Kieu Nguyen thuy | Thay the Kieu Nguyen thuy bang Doi tuong, Thay the Ma Kieu bang Class |
| Danh sach Tham so dai | Gioi thieu Doi tuong Tham so, Bao toan Doi tuong Toan ven |
| Cum Du lieu | Trich xuat Class, Gioi thieu Doi tuong Tham so |
| Lenh Switch | Thay the Dieu kien bang Da hinh |
| Tong quat Doan | Thu he Cap bac, Inline Class, Xoa Ma Chet |
| Ma Chet | Xoa Ma Chet |

### Cau truc Ke hoach

Dung template tai [templates/refactoring-plan.md](templates/refactoring-plan.md).

Cho moi tai cau truc:
1. **Muc tieu**: Ma nao se thay doi
2. **Mui**: Van de nao dang giai quyet
3. **Ky thuat Tai cau truc**: Ap dung ky thuat nao
4. **Buoc**: Chi tiet buoc nho
5. **Rui ro**: Co gi sai
6. **Khoi phuc**: Cach huy neu can

### Cach Tiep can Theo Giai doan

**QUAN TRONG**: Gioi thieu tai cau truc dan dan theo tung giai doan.

**Giai doan A: Thang nhanh** (Rui ro thap, gia tri cao)
- Doi ten bien cho ro rang
- Trich xuat ma trung lap ro rang
- Xoa ma chet

**Giai doan B: Cai thien Cau truc** (Rui ro trung binh)
- Trich xuat phuong thuc tu ham dai
- Gioi thieu doi tuong tham so
- Di chuyen phuong thuc den class phu hop

**Giai doan C: Thay doi Kien truc** (Rui ro cao hon)
- Thay the dieu kien bang da hinh
- Trich xuat class
-- Gioi thieu mau thiet ke

### Diem Quyet dinh: Trinh bay Ke hoach cho Nguoi dung

Truoc khi trien khai:
- Hien thi ke hoach tai cau truc day du
-- Giai thich moi giai doan va rui ro
-- Nhan phe duyet ro rang cho moi giai doan
-- **Hoi**: "Toi co nen tien hanh Giai doan A khong?"

---

## Giai doan 5: Trien khai Tang tu

### Quy tac Vang
> "Thay doi → Kiem thu → Xanh? → Commit → Buoc tiep theo"

### Nhip Trien khai

Cho moi buoc tai cau truc:

1. **Kiem tra truoc**
   - Kiem thu dang dat (xanh)
   - Ma bien dich duoc

2. **Thuc Hien MOT thay doi nho**
   - Theo co hoc tu danh muc
   - Giu thay doi toi thieu

3. **Xac minh**
   - Chay kiem thu ngay lap tuc
   - Kiem tra loi bien dich

4. **Neu kiem thu dat (xanh)**
   - Commit voi thong diep mo ta
   - Tien toi buoc tiep theo

5. **Neu kiem thu that bai (do)**
   - DUNG ngay lap tuc
   - Huy thay doi
   - Phan tich co gi sai
   - Hoi nguoi dung neu khong ro

### Chien luoc Commit

Moi commit nen:
- **Nguyen tu**: Mot thay doi logic
- **Dao nguoc duoc**: De revert
- **Mo ta**: Thong diep commit ro rang

Vi du thong diep commit:
```
refactor: Trich xuat calculateTotal() tu processOrder()
refactor: Doi ten 'x' thanh 'customerCount' cho ro rang
refactor: Xoa phuong thuc validateOldFormat() khong dung
```

### Bao cao Tien do

Sau moi giai doan phu, bao cao cho nguoi dung:
- Thay doi da thuc hien
- Kiem thu van dat?
- Co van de gi gap phai
- **Hoi**: "Tiep tuc voi lot tiep theo?"

---

## Giai doan 6: Review & Lap lai

### Danh sach Kiem tra Sau Tai cau truc

- [ ] Tat ca kiem thu dat
- [ ] Khong canh bao/loi moi
- [ ] Ma bien dich thanh cong
- [ ] Hanh vi khong doi (xac minh thu cong)
- [ ] Tai lieu duoc cap nhat neu can
- [ ] Lich su commit sach

### So sanh Chi so

Chay phan tich do phuc tap truoc và sau:
```bash
python scripts/analyze-complexity.py <tep>
```

Trinh bay cai thien:
- Thay doi so dong ma
- Thay doi do phuc tap cyclomatic
- Thay doi chi so kha nang bao tri

### Nguoi dung Review

Trinh bay ket qua cuoi cung:
- Tom tat tat ca thay doi
- So sanh ma truoc/sau
- Cai thien chi so
- No ky thuat con lai
- **Hoi**: "Ban hai long voi thay doi nay khong?"

### Buoc Tiep theo

Thao luan voi nguoi dung:
- Con mui nao can giai quyet?
-- Len lich tai cau truc theo doi?
-- Ap dung thay doi tuong tu o noi khac?

---

## Huong dan Quan trong

### Khi nao DUNG va Hoi

Luon dung va tham khao nguoi dung khi:
- Khong ro ve logic nghiep vu
- Thay doi co the anh huong API ben ngoai
- Do phu kiem thu khong du
- Can quyet dinh kien truc quan trong
- Muc do rui ro tang
- Gap do phuc tap bat ngo

### Quy tac An toan

1. **Khong bao gio tai cau truc ma khong co kiem thu** (tru khi nguoi dung ro rang chap nhan rui ro)
2. **Khong bao gio thay doi lon** - chia thanh buoc nho
3. **Khong bao gio bo qua chay kiem thu** sau moi thay doi
4. **Khong bao gio tiep tuc neu kiem thu that bai** - sua hoac rollback truoc
5. **Khong bao gio gia dinh** - khi nghi ngo, hoi

### Khong nen lam

- Khong ket hop tai cau truc voi them tinh nang
- Khong tai cau truc trong tinh huong cap xuoc production
- Khong tai cau truc ma khong hieu
- Khong qua ky su - giu don gian
- Khong tai cau truc moi thu cung luc

---

## Vi du Bat dau Nhanh

### Kich ban: Ham dai voi Trung lap

**Truoc:**
```javascript
function processOrder(order) {
  // 150 dong ma voi:
  // - Logic xac thuc trung lap
  // - Phep tinh inline
  // - Trach nhiem hon hop
}
```

**Cac Buoc Tai cau truc:**

1. **Dam bao kiem thu ton tai** cho processOrder()
2. **Trich xuat** xac thuc thanh validateOrder()
3. **Kiem thu** - nen dat
4. **Trich xuat** phep tinh thanh calculateOrderTotal()
5. **Kiem thu** - nen dat
6. **Trich xuat** thong bao thanh notifyCustomer()
7. **Kiem thu** - nen dat
8. **Review** - processOrder() bay gio dieu phoi 3 ham ro rang

**Sau:**
```javascript
function processOrder(order) {
  validateOrder(order);
  const total = calculateOrderTotal(order);
  notifyCustomer(order, total);
  return { order, total };
}
```

---

## Tham khao

- [Danh muc Mui Code](references/code-smells.md) - Danh sach day du mui code
- [Danh muc Ky thuat Tai cau truc](references/refactoring-catalog.md) - Ky thuat tai cau truc
- [Template Ke hoach Tai cau truc](templates/refactoring-plan.md) - Template ke hoach

## Scripts

- `scripts/analyze-complexity.py` - Phan tich chi so do phuc tap ma
- `scripts/detect-smells.py` - Tu dong phat hien mui

## Lich su Phien ban

- v1.0.0 (2025-01-15): Phat hanh ban dau voi phuong phap Fowler, cach tiep can theo giai doan, diem tham khao nguoi dung
