# Danh muc Ky thuat Tai cau truc

Mot danh muc cac ky thuat tai cau truc tu *Refactoring* (Phien ban 2) cua Martin Fowler. Moi ky thuat bao gom ly do, co hoc tung buoc, va vi du.

> "Mot ky thuat tai cau truc duoc dinh nghia boi co hoc cua no -- day la day buoc chinh xac ma ban theo doi de thuc hien thay doi." -- Martin Fowler

---

## Cach dung Danh muc nay

1. **Xac dinh mui** su dung tai lieu tham khao mui code
2. **Tim ky thuat phu hop** trong danh muc nay
3. **Theo doi co hoc** tung buoc
4. **Kiem thu sau moi buoc** de dam bao hanh vi duoc bao toan

**Quy tac Vang**: Neu bat ky buoc nao mat hon 10 phut, chia nho thanh buoc nho hon.

---

## Ky thuat Pho bien Nhat

### Trich xuat Ham

**Khi nao dung**: Ham dai, ma trung lap, can dat ten cho khai niem

**Ly do**: Bien mot doan ma thanh ham voi ten giai thich muc dich.

**Co hoc**:
1. Tao ham moi dat ten theo viec no lam (khong phai cach lam)
2. Chep doan ma vao ham moi
3. Quet bien cuc bo duoc dung trong doan
4. Truyen bien cuc bo qua tham so (hoac khai bao trong ham)
5. Xu ly gia tri tra ve phu hop
6. Thay the doan goc bang loi goi ham moi
7. Kiem thu

**Truoc**:
```javascript
function printOwing(invoice) {
  let outstanding = 0;

  console.log("***********************");
  console.log("**** Customer Owes ****");
  console.log("***********************");

  // Tinh so tien con no
  for (const order of invoice.orders) {
    outstanding += order.amount;
  }

  // In chi tiet
  console.log(`name: ${invoice.customer}`);
  console.log(`amount: ${outstanding}`);
}
```

**Sau**:
```javascript
function printOwing(invoice) {
  printBanner();
  const outstanding = calculateOutstanding(invoice);
  printDetails(invoice, outstanding);
}

function printBanner() {
  console.log("***********************");
  console.log("**** Customer Owes ****");
  console.log("***********************");
}

function calculateOutstanding(invoice) {
  return invoice.orders.reduce((sum, order) => sum + order.amount, 0);
}

function printDetails(invoice, outstanding) {
  console.log(`name: ${invoice.customer}`);
  console.log(`amount: ${outstanding}`);
}
```

---

### Inline Ham

**Khi nao dung**: Than ham ro rang nhu ten cua no, uy quyet qua muc

**Ly do**: Loai bo giam tiep khong can thiet khi ham khong them gia tri.

**Co hoc**:
1. Kiem tra ham khong phai da hinh
2. Tim tat ca loi goi den ham
3. Thay the moi loi goi bang than ham
4. Kiem thu sau moi lan thay the
5. Xoa dinh nghia ham

**Truoc**:
```javascript
function getRating(driver) {
  return moreThanFiveLateDeliveries(driver) ? 2 : 1;
}

function moreThanFiveLateDeliveries(driver) {
  return driver.numberOfLateDeliveries > 5;
}
```

**Sau**:
```javascript
function getRating(driver) {
  return driver.numberOfLateDeliveries > 5 ? 2 : 1;
}
```

---

### Trich xuat Bien

**Khi nao dung**: Bieu thuc phuc tap kho hieu

**Ly do**: Dat ten cho mot phan cua bieu thuc phuc tap.

**Co hoc**:
1. Dam bao bieu thuc khong co tac dung phu
2. Khai bao bien bat bien
3. Dat ket qua bieu thuc (hoac mot phan) vao bien
4. Thay the bieu thuc goc bang bien
5. Kiem thu

**Truoc**:
```javascript
return order.quantity * order.itemPrice -
  Math.max(0, order.quantity - 500) * order.itemPrice * 0.05 +
  Math.min(order.quantity * order.itemPrice * 0.1, 100);
```

**Sau**:
```javascript
const basePrice = order.quantity * order.itemPrice;
const quantityDiscount = Math.max(0, order.quantity - 500) * order.itemPrice * 0.05;
const shipping = Math.min(basePrice * 0.1, 100);
return basePrice - quantityDiscount + shipping;
```

---

### Inline Bien

**Khi nao dung**: Ten bien khong truyen tai nhieu hon bieu thuc

**Ly do**: Loai bo giam tiep khong can thiet.

**Co hoc**:
1. Kiem tra ve phai khong co tac dung phu
2. Neu bien khong bat bien, lam cho bat bien va kiem thu
3. Tim tham chieu dau tien va thay the bang bieu thuc
4. Kiem thu
5. Lap lai cho tat ca tham chieu
6. Xoa khai bao va phep gan
7. Kiem thu

---

### Doi ten Bien

**Khi nao dung**: Ten khong truyen dat ro rang muc dich

**Ly do**: Ten tot rat quan trong cho ma sach.

**Co hoc**:
1. Neu bien duoc dung rong, xem xet dong goi
2. Tim tat ca tham chieu
3. Thay doi moi tham chieu
4. Kiem thu

**Meo**:
- Dung ten tiet lo意图
- Tranh viet tat
- Dung thuat ngu mien

```javascript
// Te
const d = 30;
const x = users.filter(u => u.a);

// Tot
const daysSinceLastLogin = 30;
const activeUsers = users.filter(user => user.isActive);
```

---

### Thay doi Khai bao Ham

**Khi nao dung**: Ten ham khong giai thich muc dich, tham so can thay doi

**Ly do**: Ten ham tot lam ma tu tai lieu.

**Co hoc (Don gian)**:
1. Loai bo tham so khong can
2. Thay doi ten
3. Them tham so can
4. Kiem thu

**Co hoc (Di cu - cho thay doi phuc tap)**:
1. Neu loai bo tham so, dam bao khong duoc dung
2. Tao ham moi voi khai bao mong muon
3. Ham cu goi ham moi
4. Kiem thu
5. Thay doi nguoi goi dung ham moi
6. Kiem thu sau moi lan
7. Xoa ham cu

**Truoc**:
```javascript
function circum(radius) {
  return 2 * Math.PI * radius;
}
```

**Sau**:
```javascript
function circumference(radius) {
  return 2 * Math.PI * radius;
}
```

---

### Dong goi Bien

**Khi nao dung**: Truy cap truc tiep vao du lieu tu nhieu noi

**Ly do**: Cung cap diem truy cap ro rang cho thao tac du lieu.

**Co hoc**:
1. Tao ham getter va setter
2. Tim tat ca tham chieu
3. Thay the doc bang getter
4. Thay the ghi bang setter
5. Kiem thu sau moi thay doi
6. Han che quyen truy cap bien

**Truoc**:
```javascript
let defaultOwner = { firstName: "Martin", lastName: "Fowler" };

// Duoc dung o nhieu noi
spaceship.owner = defaultOwner;
```

**Sau**:
```javascript
let defaultOwnerData = { firstName: "Martin", lastName: "Fowler" };

function defaultOwner() { return defaultOwnerData; }
function setDefaultOwner(arg) { defaultOwnerData = arg; }

spaceship.owner = defaultOwner();
```

---

### Gioi thieu Doi tuong Tham so

**Khi nao dung**: Nhieu tham so thuong xuat hien cung nhau

**Ly do**: Gop nhom du lieu thuoc ve cung nhau.

**Co hoc**:
1. Tao class/cau truc moi cho tham so nhom
2. Kiem thu
3. Dung Thay doi Khai bao Ham de them doi tuong moi
4. Kiem thu
5. Voi moi tham so trong nhom, loai bo khoi ham va dung doi tuong moi
6. Kiem thu sau moi lan

**Truoc**:
```javascript
function amountInvoiced(startDate, endDate) { ... }
function amountReceived(startDate, endDate) { ... }
function amountOverdue(startDate, endDate) { ... }
```

**Sau**:
```javascript
class DateRange {
  constructor(start, end) {
    this.start = start;
    this.end = end;
  }
}

function amountInvoiced(dateRange) { ... }
function amountReceived(dateRange) { ... }
function amountOverdue(dateRange) { ... }
```

---

### Ket hop Ham thanh Class

**Khi nao dung**: Nhieu ham thao tac tren cung du lieu

**Ly do**: Gop nhom ham voi du lieu ma chung thao tac.

**Co hoc**:
1. Ap dung Dong goi Du lieu cho du lieu chung
2. Di chuyen moi ham vao class
3. Kiem thu sau moi lan di chuyen
4. Thay the doi so du lieu bang truong class

**Truoc**:
```javascript
function base(reading) { ... }
function taxableCharge(reading) { ... }
function calculateBaseCharge(reading) { ... }
```

**Sau**:
```javascript
class Reading {
  constructor(data) { this._data = data; }

  get base() { ... }
  get taxableCharge() { ... }
  get calculateBaseCharge() { ... }
}
```

---

### tach Phan

**Khi nao dung**: Ma xu ly hai thu khac nhau

**Ly do**: tach ma thanh cac phan rieng biet voi bien gioi ro rang.

**Co hoc**:
1. Tao ham thu hai cho phan thu hai
2. Kiem thu
3. Gioi thieu cau truc du lieu trung gian giua cac phan
4. Kiem thu
5. Trich xuat phan dau tien thanh ham rieng
6. Kiem thu

**Truoc**:
```javascript
function priceOrder(product, quantity, shippingMethod) {
  const basePrice = product.basePrice * quantity;
  const discount = Math.max(quantity - product.discountThreshold, 0)
    * product.basePrice * product.discountRate;
  const shippingPerCase = (basePrice > shippingMethod.discountThreshold)
    ? shippingMethod.discountedFee : shippingMethod.feePerCase;
  const shippingCost = quantity * shippingPerCase;
  return basePrice - discount + shippingCost;
}
```

**Sau**:
```javascript
function priceOrder(product, quantity, shippingMethod) {
  const priceData = calculatePricingData(product, quantity);
  return applyShipping(priceData, shippingMethod);
}

function calculatePricingData(product, quantity) {
  const basePrice = product.basePrice * quantity;
  const discount = Math.max(quantity - product.discountThreshold, 0)
    * product.basePrice * product.discountRate;
  return { basePrice, quantity, discount };
}

function applyShipping(priceData, shippingMethod) {
  const shippingPerCase = (priceData.basePrice > shippingMethod.discountThreshold)
    ? shippingMethod.discountedFee : shippingMethod.feePerCase;
  const shippingCost = priceData.quantity * shippingPerCase;
  return priceData.basePrice - priceData.discount + shippingCost;
}
```

---

## Di chuyen Tinh nang

### Di chuyen Phuong thuc

**Khi nao dung**: Phuong thuc dung dac tinh cua class khac nhieu hon class cua no

**Ly do**: Dat ham voi du lieu ma chung su dung nhieu nhat.

**Co hoc**:
1. Kiem tra tat ca phan tu chuong trinh duoc dung boi phuong thuc trong class cua no
2. Kiem tra phuong thuc co da hinh khong
3. Chep phuong thuc sang class dich
4. Dieu chinh cho boi canh moi
5. Lam cho phuong thuc goc uy quyet den dich
6. Kiem thu
7. Xem xet loai bo phuong thuc goc

---

### Di chuyen Truong

**Khi nao dung**: Truong duoc dung nhieu hon boi class khac

**Ly do**: Giu du lieu voi ham su dung no.

**Co hoc**:
1. Dong goi truong neu chua
2. Kiem thu
3. Tao truong o dich
4. Cap nhat tham chieu dung truong dich
5. Kiem thu
6. Xoa truong goc

---

### Di chuyen Lenh vao Ham

**Khi nao dung**: Cung ma luon xuat hien voi loi goi ham

**Ly do**: Loai bo trung lap bang cach di chuyen ma lap lai vao ham.

**Co hoc**:
1. Trich xuat ma lap lai thanh ham neu chua
2. Di chuyen lenh vao ham do
3. Kiem thu
4. Neu nguoi goi khong can lenh doc lap, xoa chung

---

### Di chuyen Lenh sang Nguoi goi

**Khi nao dung**: Hanh vi chung khac nhau giua nguoi goi

**Ly do**: Khi hanh vi can khac biet, di chuyen no ra khoi ham.

**Co hoc**:
1. Dung Trich xuat Ham tren ma can di chuyen
2. Dung Inline Ham tren ham goc
3. Xoa loi goi da inline
4. Di chuyen ma trich xuat sang moi nguoi goi
5. Kiem thu

---

## To chuc Du lieu

### Thay the Kieu Nguyen thuy bang Doi tuong

**Khi nao dung**: Item du lieu can nhieu hanh vi hon gia tri don gian

**Ly do**: Dong goi du lieu voi hanh vi cua no.

**Co hoc**:
1. Ap dung Dong goi Bien
2. Tao class gia tri don gian
3. Thay doi setter de tao instance moi
4. Thay doi getter de tra ve gia tri
5. Kiem thu
6. Them hanh vi phong phu hon cho class moi

**Truoc**:
```javascript
class Order {
  constructor(data) {
    this.priority = data.priority; // string: "high", "rush", v.v.
  }
}

// Su dung
if (order.priority === "high" || order.priority === "rush") { ... }
```

**Sau**:
```javascript
class Priority {
  constructor(value) {
    if (!Priority.legalValues().includes(value))
      throw new Error(`Invalid priority: ${value}`);
    this._value = value;
  }

  static legalValues() { return ['low', 'normal', 'high', 'rush']; }
  get value() { return this._value; }

  higherThan(other) {
    return Priority.legalValues().indexOf(this._value) >
           Priority.legalValues().indexOf(other._value);
  }
}

// Su dung
if (order.priority.higherThan(new Priority("normal"))) { ... }
```

---

### Thay the Bien tam bang Truy van

**Khi nao dung**: Bien tam giu ket qua cua bieu thuc

**Ly do**: Lam ma ro rang hon bang cach trich xuat bieu thuc thanh ham.

**Co hoc**:
1. Kiem tra bien chi duoc gan mot lan
2. Trich xuat ve phai phep gan thanh phuong thuc
3. Thay the tham chieu den bien tam bang goi phuong thuc
4. Kiem thu
5. Xoa khai bao va phep gan bien tam

**Truoc**:
```javascript
const basePrice = this._quantity * this._itemPrice;
if (basePrice > 1000) {
  return basePrice * 0.95;
} else {
  return basePrice * 0.98;
}
```

**Sau**:
```javascript
get basePrice() {
  return this._quantity * this._itemPrice;
}

// Trong ham
if (this.basePrice > 1000) {
  return this.basePrice * 0.95;
} else {
  return this.basePrice * 0.98;
}
```

---

### Don gian hoa Logic Dieu kien

### Phan rã Dieu kien

**Khi nao dung**: Cau lenh dieu kien phuc tap (if-then-else)

**Ly do**: Lam ro y định bang cach trich xuat dieu kien va hanh dong.

**Co hoc**:
1. Ap dung Trich xuat Ham tren dieu kien
2. Ap dung Trich xuat Ham nhanh then-branch
3. Ap dung Trich xuat Ham nhanh else-branch (neu co)

**Truoc**:
```javascript
if (!aDate.isBefore(plan.summerStart) && !aDate.isAfter(plan.summerEnd)) {
  charge = quantity * plan.summerRate;
} else {
  charge = quantity * plan.regularRate + plan.regularServiceCharge;
}
```

**Sau**:
```javascript
if (isSummer(aDate, plan)) {
  charge = summerCharge(quantity, plan);
} else {
  charge = regularCharge(quantity, plan);
}

function isSummer(date, plan) {
  return !date.isBefore(plan.summerStart) && !date.isAfter(plan.summerEnd);
}

function summerCharge(quantity, plan) {
  return quantity * plan.summerRate;
}

function regularCharge(quantity, plan) {
  return quantity * plan.regularRate + plan.regularServiceCharge;
}
```

---

### Gop bieu thuc Dieu kien

**Khi nao dung**: Nhieu dieu kien voi cung ket qua

**Ly do**: Lam ro rang rang dieu kien la mot kiem tra duy nhat.

**Co hoc**:
1. Xac minh khong tac dung phu trong dieu kien
2. Ket hop dieu kien dung `and` hoac `or`
3. Xem xuat Trich xuat Ham tren dieu kien da ket hop

**Truoc**:
```javascript
if (employee.seniority < 2) return 0;
if (employee.monthsDisabled > 12) return 0;
if (employee.isPartTime) return 0;
```

**Sau**:
```javascript
if (isNotEligibleForDisability(employee)) return 0;

function isNotEligibleForDisability(employee) {
  return employee.seniority < 2 ||
         employee.monthsDisabled > 12 ||
         employee.isPartTime;
}
```

---

### Thay the Dieu kien Long nhau bang Menh de Bao ve

**Khi nao dung**: Dieu kien long nhau sau lam luong dieu kho theo doi

**Ly do**: Dung menh de bao ve cho cac truong hop dac biet, giu luong binh thuong ro rang.

**Co hoc**:
1. Tim dieu kien truong hop dac biet
2. Thay the chung bang menh de bao ve tra ve som
3. Kiem thu sau moi thay doi

**Truoc**:
```javascript
function payAmount(employee) {
  let result;
  if (employee.isSeparated) {
    result = { amount: 0, reasonCode: "SEP" };
  } else {
    if (employee.isRetired) {
      result = { amount: 0, reasonCode: "RET" };
    } else {
      result = calculateNormalPay(employee);
    }
  }
  return result;
}
```

**Sau**:
```javascript
function payAmount(employee) {
  if (employee.isSeparated) return { amount: 0, reasonCode: "SEP" };
  if (employee.isRetired) return { amount: 0, reasonCode: "RET" };
  return calculateNormalPay(employee);
}
```

---

### Thay the Dieu kien bang Da hinh

**Khi nao dung**: switch/case dua tren kieu, logic dieu kien thay doi theo kieu

**Ly do**: De doi tuong xu ly hanh vi cua chinh no.

**Co hoc**:
1. Tao phan cap class (neu chua ton tai)
2. Dung Ham Nha may de tao doi tuong
3. Di chuyen logic dieu kien vao phuong thuc lop cha
4. Tao phuong thuc lop con cho moi truong hop
5. Loai bo khoi dieu kien goc

**Truoc**:
```javascript
function plumages(birds) {
  return birds.map(b => plumage(b));
}

function plumage(bird) {
  switch (bird.type) {
    case 'EuropeanSwallow':
      return "average";
    case 'AfricanSwallow':
      return (bird.numberOfCoconuts > 2) ? "tired" : "average";
    case 'NorwegianBlueParrot':
      return (bird.voltage > 100) ? "scorched" : "beautiful";
    default:
      return "unknown";
  }
}
```

**Sau**:
```javascript
class Bird {
  get plumage() { return "unknown"; }
}

class EuropeanSwallow extends Bird {
  get plumage() { return "average"; }
}

class AfricanSwallow extends Bird {
  get plumage() {
    return (this.numberOfCoconuts > 2) ? "tired" : "average";
  }
}

class NorwegianBlueParrot extends Bird {
  get plumage() {
    return (this.voltage > 100) ? "scorched" : "beautiful";
  }
}

function createBird(data) {
  switch (data.type) {
    case 'EuropeanSwallow': return new EuropeanSwallow(data);
    case 'AfricanSwallow': return new AfricanSwallow(data);
    case 'NorwegianBlueParrot': return new NorwegianBlueParrot(data);
    default: return new Bird(data);
  }
}
```

---

### Gioi thieu Truong hop Dac biet (Doi tuong Null)

**Khi nao dung**: Kiem tra null lap lai cho cac truong hop dac biet

**Ly do**: Tra ve doi tuong dac biet xu ly truong hop dac biet.

**Co hoc**:
1. Tao class truong hop dac biet voi interface mong doi
2. Them kiem tra isSpecialCase
3. Gioi thieu phuong thuc nha may
4. Thay the kiem tra null bang su dung doi tuong truong hop dac biet
5. Kiem thu

**Truoc**:
```javascript
const customer = site.customer;
// ... nhieu noi kiem tra
if (customer === "unknown") {
  customerName = "occupant";
} else {
  customerName = customer.name;
}
```

**Sau**:
```javascript
class UnknownCustomer {
  get name() { return "occupant"; }
  get billingPlan() { return registry.defaultPlan; }
}

// Phuong thuc nha may
function customer(site) {
  return site.customer === "unknown"
    ? new UnknownCustomer()
    : site.customer;
}

// Su dung - khong can kiem tra null
const customerName = customer.name;
```

---

### Tai cau truc API

### tach Truy van khoi Bo sua doi

**Khi nao dung**: Ham vua tra ve gia tri vua co tac dung phu

**Ly do**: Lam ro rang thao tac nao co tac dung phu.

**Co hoc**:
1. Tao ham truy van moi
2. Chep logic tra ve cua ham goc
3. Sua doi ham goc thanh void
4. Thay the loi goi dung gia tri tra ve
5. Kiem thu

**Truoc**:
```javascript
function alertForMiscreant(people) {
  for (const p of people) {
    if (p === "Don") {
      setOffAlarms();
      return "Don";
    }
    if (p === "John") {
       setOffAlarms();
      return "John";
    }
  }
  return "";
}
```

**Sau**:
```javascript
function findMiscreant(people) {
  for (const p of people) {
    if (p === "Don") return "Don";
    if (p === "John") return "John";
  }
  return "";
}

function alertForMiscreant(people) {
  if (findMiscreant(people) !== "") setOffAlarms();
}
```

---

### Tham so hoa Ham

**Khi nao dung**: Nhieu ham lam dieu tuong tu voi gia tri khac nhau

**Ly do**: Loai bo trung lap bang cach them tham so.

**Co hoc**:
1. Chon mot ham
2. Them tham so cho gia tri bien doi
3. Thaydoi than dung tham so
4. Kiem thu
5. Thay doi nguoi goi dung phien ban tham so hoa
6. Loai bo ham khong can nua

**Truoc**:
```javascript
function tenPercentRaise(person) {
  person.salary = person.salary * 1.10;
}

function fivePercentRaise(person) {
  person.salary = person.salary * 1.05;
}
```

**Sau**:
```javascript
function raise(person, factor) {
  person.salary = person.salary * (1 + factor);
}

// Su dung
raise(person, 0.10);
raise(person, 0.05);
```

---

### Loai bo Tham so Co lua chon

**Khi nao dung**: Tham so Boolean thaydoi hanh vi ham

**Ly do**: Lam hanh vi ro rang thong qua cac ham rieng biet.

**Co hoc**:
1. Tao ham ro rang cho moi gia tri co lua chon
2. Thay the moi loi goi bang ham moi phu hop
3. Kiem thu sau moi thay doi
4. Loai bo ham goc

**Truoc**:
```javascript
function bookConcert(customer, isPremium) {
  if (isPremium) {
    // logic dat ve premium
  } else {
    // logic dat ve thuong
  }
}

bookConcert(customer, true);
bookConcert(customer, false);
```

**Sau**:
```javascript
function bookPremiumConcert(customer) {
  // logic dat ve premium
}

function bookRegularConcert(customer) {
  // logic dat ve thuong
}

bookPremiumConcert(customer);
bookRegularConcert(customer);
```

---

### Xu ly Ke thua

### Keo len Phuong thuc

**Khi nao dung**: Cung phuong thuc o nhieu lop con

**Ly do**: Loai bo trung lap trong phan cap class.

**Co hoc**:
1. Kiem tra phuong thuc de dam bao giong nhau
2. Kiem tra chu ky giong nhau
3. Tao phuong thuc moi trong lop cha
4. Chep than tu mot lop con
5. Xoa phuong thuc lop con, kiem thu
6. Xoa phuong thuc lop con khac, kiem thu moi lan

---

### Day xuong Phuong thuc

**Khi nao dung**: Hanh vi chi lien quan den tap con lop con

**Ly do**: Dat phuong thuc o noi no duoc dung.

**Co hoc**:
1. Chep phuong thuc sang moi lop con can no
2. Xoa phuong thuc khoi lop cha
3. Kiem thu
4. Xoa khoi lop con khong can
5. Kiem thu

---

### Thay the Lop con bang Uy quyet

**Khi nao dung**: Ke thua duoc dung khong dung cach, can linh hoat hon

**Ly do**: Uu tien ket hop hon ke thua khi phu hop.

**Co hoc**:
1. Tao class rong cho uy quyet
2. Them truong vao class host giu uy quyet
3. Tao constructor cho uy quyet, goi tu host
4. Di chuyen tinh nang sang uy quyet
5. Kiem thu sau moi lan di chuyen
6. Thay the ke thua bang uy quyet

---

### Trich xuat Class

**Khi nao dung**: Class lon voi nhieu trach nhiem

**Ly do**: tach class de duy tri don trach nhiem.

**Co hoc**:
1. Quyet dinh cach tach trach nhiem
2. Tao class moi
3. Di chuyen truong tu goc sang class moi
4. Kiem thu
5. Di chuyen phuong thuc tu goc sang class moi
6. Kiem thu sau moi lan di chuyen
7. Xem xet va doi ten ca hai class
8. Quyet dinh cach expose class moi

**Truoc**:
```javascript
class Person {
  get name() { return this._name; }
  set name(arg) { this._name = arg; }
  get officeAreaCode() { return this._officeAreaCode; }
  set officeAreaCode(arg) { this._officeAreaCode = arg; }
  get officeNumber() { return this._officeNumber; }
  set officeNumber(arg) { this._officeNumber = arg; }

  get telephoneNumber() {
    return `(${this._officeAreaCode}) ${this._officeNumber}`;
  }
}
```

**Sau**:
```javascript
class Person {
  constructor() {
    this._telephoneNumber = new TelephoneNumber();
  }
  get name() { return this._name; }
  set name(arg) { this._name = arg; }
  get telephoneNumber() { return this._telephoneNumber.toString(); }
  get officeAreaCode() { return this._telephoneNumber.areaCode; }
  set officeAreaCode(arg) { this._telephoneNumber.areaCode = arg; }
}

class TelephoneNumber {
  get areaCode() { return this._areaCode; }
  set areaCode(arg) { this._areaCode = arg; }
  get number() { return this._number; }
  set number(arg) { this._number = arg; }
  toString() { return `(${this._areaCode}) ${this._number}`; }
}
```

---

## Tham khao Nhanh: Mui den Ky thuat Tai cau truc

| Mui Code | Ky thuat Tai cau truc Chinh | Thay the |
|------------|-------------------|-------------|
| Ham dai | Trich xuat Ham | Thay the Bien tam bang Truy van |
| Ma trung lap | Trich xuat Ham | Keo len Phuong thuc |
| Class lon | Trich xuat Class | Trich xuat Lop con |
| Danh sach Tham so dai | Gioi thieu Doi tuong Tham so | Bao toan Doi tuong Toan ven |
| Ghen tich Tinh nang | Di chuyen Phuong thuc | Trich xuat Ham + Di chuyen |
| Cum Du lieu | Trich xuat Class | Gioi thieu Doi tuong Tham so |
| Am anh Kieu Nguyen thuy | Thay the Kieu Nguyen thuy bang Doi tuong | Thay the Ma Kieu |
| Lenh Switch | Thay the Dieu kien bang Da hinh | Thay the Ma Kieu |
| Truong Tam thoi | Trich xuat Class | Gioi thieu Doi tuong Null |
| Chuoi Thong diep | An Uy quyet | Trich xuat Ham |
| Trung gian | Loai bo Trung gian | Inline Ham |
| Thay doi Phan tan | Trich xuat Class | tach Phan |
| Phau mo Sung ban | Di chuyen Phuong thuc | Inline Class |
| Ma Chet | Xoa Ma Chet | - |
| Tong quat Doan | Thu he Cap bac | Inline Class |

---

## Doc them

- Fowler, M. (2018). *Refactoring: Improving the Design of Existing Code* (Phien ban 2)
- Danh muc truc tuyen: https://refactoring.com/catalog/
