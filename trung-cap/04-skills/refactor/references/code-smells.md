# Danh muc Mui Code

Tai lieu tham khao toan dien ve mui code dua tren *Refactoring: Improving the Design of Existing Code* (Phien ban 2) cua Martin Fowler. Mui code la trieu chung cua van de sau hon -- chung cho thay co the co gi do sai voi thiet ke ma cua ban.

> "Mui code la dau hieu be mat thuong tuong ung voi van de sau hem trong he thong." -- Martin Fowler

---

## Bloaters

Mùi code dai dien cho thu phat trien qua lon de xu ly hieu qua.

### Ham Dai

**Dau hieu:**
- Ham vuot qua 30-50 dong
- Can phai cuon de xem toan bo ham
- Nhieu muc long nhau
- Comment giai thich cac phan lam gi

**Tai sao te:**
- Kho hieu
- Kho kiem thu doc lap
- Thay doi co hau qua ngoai y muon
- Logic trung lap an ben trong

**Ky thuat Tai cau truc:**
- Trich xuat Ham
- Thay the Bien tam bang Truy van
- Gioi thieu Doi tuong Tham so
- Thay the Phuong thuc bang Doi tuong Phuong thuc
- Phan rã Dieu kien

**Vi du (Truoc):**
```javascript
function processOrder(order) {
  // Xac thuc don hang (20 dong)
  if (!order.items) throw new Error('Khong co items');
  if (order.items.length === 0) throw new Error('Don hang rong');
  // ... them xac thuc

  // Tinh tong (30 dong)
  let subtotal = 0;
  for (const item of order.items) {
    subtotal += item.price * item.quantity;
  }
  // ... thue, van chuyen, giam gia

  // Gui thong bao (20 dong)
  // ... logic email
}
```

**Vi du (Sau):**
```javascript
function processOrder(order) {
  validateOrder(order);
  const totals = calculateOrderTotals(order);
  sendOrderNotifications(order, totals);
  return { order, totals };
}
```

---

### Class Lon

**Dau hieu:**
- Class co nhieu bien instance (>7-10)
- Class co nhieu phuong thuc (>15-20)
- Ten class mo ho (Manager, Handler, Processor)
- Phuong thuc khong dung tat ca bien instance

**Tai sao te:**
- Vi pham nguyen tac Don Trach nhiem
- Kho kiem thu
- Thaydoi lan sang tinh nang khong lien quan
- Kho tai su dung tung phan

**Ky thuat Tai cau truc:**
- Trich xuat Class
- Trich xuat Lop con
- Trich xuat Interface

**Phat hien:**
```
So dong ma > 300
So phuong thuc > 15
So truong > 10
```

---

### Am anh Kieu Nguyen thuy

**Dau hieu:**
- Dung kieu nguyen thuy cho khai niem mien (string cho email, int cho tien)
- Mang kieu nguyen thuy thay vi doi tuong
- Hang so string cho ma kieu
- So/string ky la

**Tai sao te:**
- Khong co xac thuc o cap do kieu
- Logic phan tan khap codebase
- De truyen sai gia tri
- Thieu khai niem mien

**Ky thuat Tai cau truc:**
- Thay the Kieu Nguyen thuy bang Doi tuong
- Thay the Ma Kieu bang Class
- Thay the Ma Kieu bang Lop con
- Thay the Ma Kieu bang Trang thai/Chien luoc

**Vi du (Truoc):**
```javascript
const user = {
  email: 'john@example.com',     // Chi la string
  phone: '1234567890',           // Chi la string
  status: 'active',              // String ky la
  balance: 10050                 // Cent dang integer
};
```

**Vi du (Sau):**
```javascript
const user = {
  email: new Email('john@example.com'),
  phone: new PhoneNumber('1234567890'),
  status: UserStatus.ACTIVE,
  balance: Money.cents(10050)
};
```

---

### Danh sach Tham so Dai

**Dau hieu:**
- Ham voi 4+ tham so
- Tham so luon xuat hien cung nhau
- Co lua chon doi thay doi hanh vi ham
- Thuong xuyen truyen null/undefined

**Tai sao te:**
- Kho goi dung
- Nham lan thu tu tham so
-- Ham dang lam qua nhieu
-- Kho them tham so moi

**Ky thuat Tai cau truc:**
- Gioi thieu Doi tuong Tham so
- Bao toan Doi tuong Toan ven
- Thay the Tham so bang Goi Phuong thuc
- Loai bo Tham so Co lua chon

**Vi du (Truoc):**
```javascript
function createUser(firstName, lastName, email, phone,
                    street, city, state, zip,
                    isAdmin, isActive, createdBy) {
  // ...
}
```

**Vi du (Sau):**
```javascript
function createUser(personalInfo, address, options) {
  // personalInfo: { firstName, lastName, email, phone }
  // address: { street, city, state, zip }
  // options: { isAdmin, isActive, createdBy }
}
```

---

### Cum Du lieu

**Dau hieu:**
- Cung 3+ truong xuat hien cung nhau lap lai
- Tham so luon di cung nhau
- Class co tap con truong thuoc ve cung nhau

**Tai sao te:**
- Logic xu lap trung lap
- Thieu truu tuong hoa
- Kho mo rong
-- Goi y class an

**Ky thuat Tai cau truc:**
- Trich xuat Class
- Gioi thieu Doi tuong Tham so
- Bao toan Doi tuong Toan ven

**Vi du:**
```javascript
// Cum du lieu: toa do (x, y, z)
function movePoint(x, y, z, dx, dy, dz) { }
function scalePoint(x, y, z, factor) { }
function distanceBetween(x1, y1, z1, x2, y2, z2) { }

// Trich xuat class Point3D
class Point3D {
  constructor(x, y, z) { }
  move(delta) { }
  scale(factor) { }
  distanceTo(other) { }
}
```

---

## Ke vi pham OOP

Mùi code cho thay viec su dung dung hoac khong day du nguyen tac OOP.

### Lenh Switch

**Dau hieu:**
-- Chuoi switch/case hoac if/else dai
-- Cung switch o nhieu noi
--switch tren ma kieu
-- Them case moi can thay doi khap noi

**Tai sao te:**
- Vi pham nguyen tac Dong/Mo
- Thaydoi lan sang tat ca vi tri switch
- Kho mo rong
- Thuong baoieu da hinh bi thieu

**Ky thuat Tai cau truc:**
- Thay the Dieu kien bang Da hinh
- Thay the Ma Kieu bang Lop con
- Thay the Ma Kieu bang Trang thai/Chien luoc

**Vi du (Truoc):**
```javascript
function calculatePay(employee) {
  switch (employee.type) {
    case 'hourly':
      return employee.hours * employee.rate;
    case 'salaried':
      return employee.salary / 12;
    case 'commissioned':
      return employee.sales * employee.commission;
  }
}
```

**Vi du (Sau):**
```javascript
class HourlyEmployee {
  calculatePay() {
    return this.hours * this.rate;
  }
}

class SalariedEmployee {
  calculatePay() {
    return this.salary / 12;
  }
}
```

---

### Truong Tam thoi

**Dau hieu:**
- Bien instance chi dung trong mot so phuong thuc
- Truong duoc dat co dieu kien
- Khoi tao phuc tap cho mot so truong hop

**Tai sao te:**
- Gây nhẫm lẫn -- trường tồn tại nhưng có thể null
- Kho hieu trang thai doi tuong
-- Dấu hiệu logic có điều kiện

**Ky thuat Tai cau truc:**
- Trich xuat Class
- Gioi thieu Doi tuong Null
- Thay the Truong tam thoi bang Bien cuc bo

---

### Tu choi Ke thua

**Dau hieu:**
- Lop con khong dung phuong thuc/du lieu ke thua
- Lop con ghi de de khong lam gi
- Ke thua duoc dung tai su dung ma, khong phai quan he IS-A

**Tai sao te:**
- Truu tuong hoa sai
- Vi pham nguyen tac Thay the Liskov
- Phan cap phuong huong dan

**Ky thuat Tai cau truc:**
- Day xuong Phuong thuc/Truong
- Thay the Lop con bang Uy quyet
- Thay the Ke thua bang Uy quyet

---

### Class Thay the voi Interface Khac

**Dau hieu:**
- Hai class lam nhung thu tuong tu
- Ten phuong thuc khac nhau cho cung khai niem
- Co the dung thay the nhau

**Tai sao te:**
- Trung lap trien khai
- Khong co interface chung
- Kho chuyen doi giua cac class

**Ky thuat Tai cau truc:**
- Doi ten Phuong thuc
- Di chuyen Phuong thuc
- Trich xuat Lop cha
- Trich xuat Interface

---

## Ngan can Thay doi

Mùi code lam thay doi tro nen kho khan -- thay doi mot thu yeu cau thay doi nhieu thu khac.

### Thay doi Phan tan

**Dau hieu:**
- Mot class bi thay doi vi nhieu ly do khac nhau
- Thaydoi o linh vuc khac kich hoat cung chinh sua class
- Class la "class chua"

**Tai sao te:**
- Vi pham Don Trach nhiem
- Tan suat thay doi cao
-- Xung dot merge

**Ky thuat Tai cau truc:**
- Trich xuat Class
- Trich xuat Lop cha
- Trich xuat Lop con

**Vi du:**
Mot class `User` thay doi vi:
- Thaydoi xac thuc
- Thaydoi ho so
- Thaydoi thanh toan
- Thaydoi thong bao

→ Trich xuat: `AuthService`, `ProfileService`, `BillingService`, `NotificationService`

---

### Phau mo Sung ban

**Dau hieu:**
- Mot thaydoi yeu cau chinh sua o nhieu class
- Tinh nang nho can cham 10+ tep tin
- Thaydoi phan tan, kho tim tat ca

**Tai sao te:**
- De bo sot
- Ghep noi cao
- Thaydoi de gay loi

**Ky thuat Tai cau truc:**
- Di chuyen Phuong thuc
- Di chuyen Truong
- Inline Class

**Phat hien:**
Tim: them mot truong yeu cau thaydoi o >5 tep tin.

---

### Phan cap Kep song

**Dau hieu:**
- Tao lop con o mot phan cap yeu cau lop con o phan cap khac
- Tien to class trung khop (vd: `DatabaseOrder`, `DatabaseProduct`)

**Tai sao te:**
- Bao tri gap doi
- Ghep noi giua cac phan cap
- De quen mot phia

**Ky thuat Tai cau truc:**
- Di chuyen Phuong thuc
- Di chuyen Truong
- Loai bo mot phan cap

---

## Co the Loai bo

Thu khong can thiet nen duoc loai bo.

### Comment (Qua muc)

**Dau hieu:**
- Comment giai thich code lam gi
- Code bi comment ra
- TODO/FIXME ton tai mai mai
- Loi xin loi trong comment

**Tai sao te:**
- Comment noi doi (het dong bo)
-- Code nen tu tai lieu
-- Ma chet gay nhim lan

**Ky thuat Tai cau truc:**
- Trich xuat Ham (ten giai thich dieu gi)
- Doi ten (ro rang khong can comment)
- Xoa code da comment
- Gioi thieu Khang dinh

**Comment Tot so voi Te:**
```javascript
// TE: Giai thich dieu gi
// Duyet qua nguoi dung va kiem tra neu active
for (const user of users) {
  if (user.status === 'active') { }
}

// TOT: Giai thich tai sao
// Chi nguoi dung active - nguoi dung khong active duoc xu ly boi job don dep
const activeUsers = users.filter(u => u.isActive);
```

---

### Ma Trung lap

**Dau hieu:**
- Cung ma o nhieu noi
- Ma tuong tu voi bien the nho
-- Mau copy-paste

**Tai sao te:**
-Sua loi can o nhieu noi
- Nguy co khong nhat quan
- Codebase phinh to

**Ky thuat Tai cau truc:**
- Trich xuat Ham
- Trich xuat Class
- Keo len Phuong thuc (trong phan cap)
- Tao Mau

**Quy tac Phat hien:**
Bat ky ma nao trung lap 3+ lan nen duoc trich xuat.

---

### Class Lazy

**Dau hieu:**
- Class khong lam du de bao ton su ton tai
- Wrapper khong co gia tri them vao
- Ket qua cua qua ky su

**Tai sao te:**
- Tai bao tri
-- Gom tiep khong can thiet
-- Do phuc tap khong co loi ich

**Ky thuat Tai cau truc:**
- Inline Class
- Thu he Cap bac

---

### Ma Chet

**Dau hieu:**
- Ma khong the dat toi
- Bien/phuong thuc/class khong dung
- Code bi comment ra
- Ma sau dieu kien khong the xay ra

**Tai sao te:**
- Gây nhầm lẫn
-- Ganh nang bao tri
-- Lam cham hieu biet

**Ky thuat Tai cau truc:**
- Xoa Ma Chet
- Xoa An toan

**Phat hien:**
```bash
# Tim export khong dung
# Tim function khong duoc tham chieu
# Canh bao "khong dung" cua IDE
```

---

### Tong quat Doan

**Dau hieu:**
- Class truu tuong voi mot lop con
- Tham so khong dung "cho tuong lai"
- Phuong thuc chi uy quyet
- "framework" cho mot truong hop su dung

**Tai sao te:**
-- Do phuc tap khong co loi ich
-- YAGNI (Ban se Khong Can No)
-- Kho hieu hon

**Ky thuat Tai cau truc:**
- Thu he Cap bac
- Inline Class
- Loai bo Tham so
- Doi ten Phuong thuc

---

## Bo Ghep noi

Mùi code dai dien cho viec ghep noi qua muc giua cac class.

### Ghen tich Tinh nang

**Dau hieu:**
- Phuong thuc dung du lieu cua class khac nhieu hon cua chinh no
- Nhieu loi goi getter den doi tuong khac
- Du lieu va hanh vi tach roi

**Tai sao te:**
- Vi tri sai cho hanh vi
- Dong goi kem
- Kho bao tri

**Ky thuat Tai cau truc:**
- Di chuyen Phuong thuc
- Di chuyen Truong
- Trich xuat Ham (roi di chuyen)

**Vi du (Truoc):**
```javascript
class Order {
  getDiscountedPrice(customer) {
    // Dung nhieu du lieu cua customer
    if (customer.loyaltyYears > 5) {
      return this.price * customer.discountRate;
    }
    return this.price;
  }
}
```

**Vi du (Sau):**
```javascript
class Customer {
  getDiscountedPriceFor(price) {
    if (this.loyaltyYears > 5) {
      return price * this.discountRate;
    }
    return price;
  }
}
```

---

### Than mat Khong Phu hop

**Dau hieu:**
- Cac class truy cap phan rieng tu cua nhau
- Tham chieu hai chieu
- Lop con biet qua nhieu ve cha

**Tai sao te:**
- Ghep noi cao
- Thaydoi day chuyen
- Kho sua doi cai nay ma khong anh huong cai kia

**Ky thuat Tai cau truc:**
- Di chuyen Phuong thuc
- Di chuyen Truong
- Thay doi Hai chieu thanh Mot chieu
- Trich xuat Class
- An Uy quyet

---

### Chuoi Thong diep

**Dau hieu:**
- Chuoi dai goi phuong thuc: `a.getB().getC().getD().getValue()`
- Client phu thuoc cau truc dieu huong
- Ma "tau hut"

**Tai sao te:**
- Mong manh -- bat ky thaydoi nao cung pha vo chuoi
- Vi pham Dinh luat Demeter
- Ghep noi voi cau truc

**Ky thuat Tai cau truc:**
- An Uy quyet
- Trich xuat Ham
- Di chuyen Phuong thuc

**Vi du:**
```javascript
// Te: Chuoi thong diep
const managerName = employee.getDepartment().getManager().getName();

-- Tot hon: An uy quyet
const managerName = employee.getManagerName();
```

---

### Trung gian

**Dau hieu:**
- Class chi uy quyet cho class khac
-- Nua phuong thuc la uy quyet
-- Khong co gia tri them vao

**Tai sao te:**
-- Gom tiep khong can thiet
-- Ganh nang bao tri
-- Kien truc gay nhim lan

**Ky thuat Tai cau truc:**
- Loai bo Trung gian
- Inline Phuong thuc

---

## Huong dan Muc do Nghiem trong Mui Code

| Muc do | Mo ta | Hanh dong |
|----------|-------------|--------|
| **Nghiem trong** | Chan phat trien, gay loi | Sua ngay lap tuc |
| **Cao** | Ganh nang bao tri dang ke | Sua trong sprint hien tai |
| **Trung binh** | De thay nhung quan ly duoc | Len ke hoach tuong lai gan |
| **Thap** | Bat tien nho | Sua khi co co hoi |

---

## Danh sach Kiem tra Phat hien Nhanh

Dung danh sach nay khi quet ma:

- [ ] Co ham nao > 30 dong khong?
- [ ] Co class nao > 300 dong khong?
- [ ] Co ham nao > 4 tham so khong?
- [ ] Co khoi ma trung lap nao khong?
- [ ] Co switch/case tren ma kieu khong?
- [ ] Co ma khong dung nao khong?
- [ ] Co phuong thuc nao dung nhieu du lieu cua class khac khong?
- [ ] Co chuoi dai goi phuong thuc khong?
- [ ] Co comment giai thich "la gi" thay vi "tai sao" khong?
- [ ] Co kieu nguyen thuy nen la doi tuong khong?

---

## Doc them

- Fowler, M. (2018). *Refactoring: Improving the Design of Existing Code* (Phien ban 2)
- Kerievsky, J. (2004). *Refactoring to Patterns*
- Feathers, M. (2004). *Working Effectively with Legacy Code*
