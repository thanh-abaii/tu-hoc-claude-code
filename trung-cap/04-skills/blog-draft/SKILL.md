---
name: blog-draft
description: Thao bai blog y tuong va tai lieu. Su dung khi nguoi dung muon viet bai blog, tao noi dung tu nghien cuu, hoac thao bai viet. Huong dan qua nghien cuu, dong y tuong, lap de cuong va thao lap lai voi kiem soat phien ban.
---

## Dau Vao Nguoi Dung

```text
$ARGUMENTS
```

Ban **BAT BUOC** phai xem xet dau vao nguoi dung truoc khi tiep tuc. Nguoi dung nen cung cap:
- **Y tuong/Chu de**: Khai niem hoac chu de chinh cho bai blog
- **Tai lieu**: URL, tep tin, hoac tham chieu de nghien cuu (tuy chon nhung khuyen nghi)
- **Doi tuong doc**: Bai blog danh cho ai (tuy chon)
- **Giong dieu/Phong cach**: Trang trong, thoai mai, ky thuat, v.v. (tuy chon)

**QUAN TRONG**: Neu nguoi dung yeu cau cap nhat **bai blog da ton tai**, bo qua buoc 0-8 va bat dau truc tiep tai **Buoc 9**. Doc tep tin thao truoc tien, sau do tiep tuc voi quy trinh lap lai.

## Luong Thuc Hien

Lam theo cac buoc tuan tu. **Khong bo qua buoc hoac tiep tuc neu khong co su phe duyet cua nguoi dung.**

### Buoc 0: Tao Thu muc Du an

1. Sinh ten thu muc su dung dinh dang: `YYYY-MM-DD-ten-chu-de-ngan`
   - Dung ngay hom nay
   - Tao slug than thien URL tu chu de (chu thuong, dau gach, toi da 5 tu)

2. Tao cau truc thu muc:
   ```
   blog-posts/
   └── YYYY-MM-DD-ten-chu-de-ngan/
       └── resources/
   ```

3. Xac nhan tao thu muc voi nguoi dung truoc khi tiep tuc.

### Buoc 1: Nghien cuu & Thu thap Tai lieu

1. Tao thu muc con `resources/` trong thu muc bai blog

2. Voi moi tai lieu duoc cung cap:
   - **URLs**: Fetch va luu thong tin chinh vao `resources/` duoi dang tep markdown
   - **Tep tin**: Doc va tom tat vao `resources/`
   - **Chu de**: Dung web search de thu thap thong tin cap nhat

3. Voi moi tai lieu, tao tep tom tat trong `resources/`:
   - `resources/source-1-[ten-ngan].md`
   - `resources/source-2-[ten-ngan].md`
   - v.v.

4. Moi tep tom tat nen bao gom:
   ```markdown
   # Nguon: [Ten/URL]

   ## Diem Chinh
   - Diem 1
   - Diem 2

   ## Trich dan/Du lieu Lien quan
   - Trich dan hoac thong ke 1
   - Trich dan hoac thong ke 2

   ## Muc Lien quan den Chu de
   Giai thich ngan gon ve muc lien quan
   ```

5. Trinh bay tom tai nghien cuu cho nguoi dung.

### Buoc 2: Dong y tuong & Lam ro

1. Dua tren y tuong va tai lieu nghien cuu, trinh bay:
   - **Chu de chinh** xac dinh tu nghien cuu
   - **Huong tiep can** co the cho bai blog
   - **Diem then chot** can bao quat
   - **Lo hong** thong tin can lam ro

2. Dat cau hoi lam ro:
   - Thong diep chinh ban muon nguoi doc ghi nho la gi?
   - Co diem cu the nao tu nghien cuu ban muon nhan manh khong?
   - Do dai muc tieu? (ngan: 500-800 tu, trung binh: 1000-1500, dai: 2000+)
   - Co diem nao muon loai bo khong?

3. **Doi phan hoi cua nguoi dung truoc khi tiep tuc.**

### Buoc 3: De Xuat De Cuong

1. Tao de cuong co cau truc bao gom:

   ```markdown
   # De Cuong Bai Blog: [Tieu de]

   ## Thong tin Meta
   - **Doi tuong Doc**: [ai]
   - **Giong dieu**: [phong cach]
   - **Do dai Muc tieu**: [so tu]
   - **Thong diep Chinh**: [thong diep then chot]

   ## Cau truc De xuat

   ### Hook/Gioi thieu
   - Y tuong hook mo dau
   - Dat boi canh
   - Luan de

   ### Phan 1: [Tieu de]
   - Diem chinh A
   - Diem chinh B
   - Bang chung ho tro tu [nguon]

   ### Phan 2: [Tieu de]
   - Diem chinh A
   - Diem chinh B

   [Tiep tuc cho tat ca cac phan...]

   ### Ket luan
   - Tom tat cac diem chinh
   - Loi keu goi hanh dong hoac suy nghi cuoi cung

   ## Nguon Trich dan
   - Nguon 1
   - Nguon 2
   ```

2. Trinh bay de cuong cho nguoi dung va **yeu cau phe duyet hoac chinh sua**.

### Buoc 4: Luu De Cuong Da Phe Duyet

1. Khi nguoi dung phe duyet de cuong, luu vao `OUTLINE.md` trong thu muc bai blog.

2. Xac nhan de cuong da duoc luu.

### Buoc 5: Commit De Cuong (neu trong repo git)

1. Kiem tra thu muc hien tai co phai repo git khong.

2. Neu co:
   - Stage cac tep tin moi: thu muc bai blog, resources, va OUTLINE.md
   - Tao commit voi thong diep: `docs: Add outline for blog post - [ten-chu-de]`
   - Day len remote

3. Neu khong phai repo git, bo qua va thong bao nguoi dung.

### Buoc 6: Viet Thao

1. Dua tren de cuong da phe duyet, viet thao bai blog day du.

2. Tuan thu chinh xac cau truc tu OUTLINE.md.

3. Bao gom:
   - Mo dau thu hut voi hook
   - Tieu de phan ro rang
   - Bang chung ho tro va vi du tu nghien cuu
   - Chuyen tiep muot ma giua cac phan
   - Ket luan manh me voi thong diep
   - **Trich dan**: Tat ca so sanh, thong ke, diem du lieu, va khang dinh su that PHAI trich dan nguon goc

4. Luu thao thanh `draft-v0.1.md` trong thu muc bai blog.

5. Dinh dang:
   ```markdown
   # [Tieu de Bai Blog]

   *[Phu de hoac slogan tuy chon]*

   [Noi dung day du voi trich dan inline...]

   ---

   ## Tham khao
   - [1] Ten Nguon 1 - URL hoac Trich dan
   - [2] Ten Nguon 2 - URL hoac Trich dan
   - [3] Ten Nguon 3 - URL hoac Trich dan
   ```

6. **Yeu cau Trich dan**:
   - Moi diem du lieu, thong ke, hoac so sanh PHAI co trich dan inline
   - Dung so thu tu [1], [2], v.v., hoac trich dan theo ten [Ten Nguon]
   - Lien ket trich dan den phan Tham khat cuoi bai
   - Vi du: "Nghien cuu chi ra 65% developer thich TypeScript [1]"
   - Vi du: "React vuot Vue ve toc do render 20% [React Benchmarks 2024]"

### Buoc 7: Commit Thao (neu trong repo git)

1. Kiem tra co trong git repository khong.

2. Neu co:
   - Stage tep tin thao
   - Tao commit voi thong diep: `docs: Add draft v0.1 for blog post - [ten-chu-de]`
   - Day len remote

3. Neu khong phai repo git, bo qua va thong bao nguoi dung.

### Buoc 8: Trinh bay Thao de Review

1. Trinh bay noi dung thao cho nguoi dung.

2. Hoi phan hoi:
   - An tuong tong the?
   - Phan nao can mo rong hoac thu gon?
   - Can dieu chinh giong dieu khong?
   - Thieu thong tin gi?
   - Chinh sua hoac viet lai cu the?

3. **Doi phan hoi nguoi dung.**

### Buoc 9: Lap Lai hoac hoan tat

**Neu nguoi dung yeu cau thay doi:**
1. Ghi nhan tat ca chinh sua yeu cau
2. Quay lai Buoc 6 voi dieu chinh:
   - Tang so phien ban (v0.2, v0.3, v.v.)
   - Tich hop tat ca phan hoi
   - Luu thanh `draft-v[X.Y].md`
   - Lap lai Buoc 7-8

**Neu nguoi dung phe duyet:**
1. Xac nhan phien ban thao cuoi cung
2. Tuy chon doi ten thanh `final.md` neu nguoi dung yeu cau
3. Tom tat quy trinh tao bai blog:
   - Tong so phien ban da tao
   - Thay doi chinh giua cac phien ban
   - Tong so tu cuoi cung
   - Tep tin da tao

## Theo Doi Phien ban

Tat ca thao duoc bao ton voi danh so phien ban tang dan:
- `draft-v0.1.md` - Thao ban dau
- `draft-v0.2.md` - Sau vong phan hoi thu nhat
- `draft-v0.3.md` - Sau vong phan hoi thu hai
- v.v.

Cho phep theo doi qua trinh phat trien bai blog va khoi phuc neu can.

## Cau Truc Tep Tin Dau ra

```
blog-posts/
└── YYYY-MM-DD-ten-chu-de/
    ├── resources/
    │   ├── source-1-name.md
    │   ├── source-2-name.md
    │   └── ...
    ├── OUTLINE.md
    ├── draft-v0.1.md
    ├── draft-v0.2.md (neu co lap lai)
    └── draft-v0.3.md (neu co nhieu vong lap)
```

### Meo Chat Luong

- **Hook**: Bat dau bang cau hoi, su that bat ngo, hoac tinh huong quen thuoc
- **Luot di**: Moi doan van nen ket noi voi doan tiep theo
- **Bang chung**: Ho tro khang dinh bang du lieu tu nghien cuu
- **Trich dan**: LUON trich dan nguon cho:
  - Tat ca thong ke va diem du lieu (vd: "Theo [Nguon], 75% cua...")
  - So sanh giua san pham, dich vu, hoac cach tiep can (vd: "X nhanh hon Y gap 2 lan [Nguon]")
  - Khang dinh su that ve xu huong thi truong, ket qua nghien cuu, hoac benchmarks
  - Dung trich dan inline voi dinh dang: [Ten Nguon] hoac [Tac gia, Nam]
- **Giong noi**: Duy tri giong dieu nhat quan xuyen suot
- **Do dai**: Ton trong so tu muc tieu
- **Kha nang doc**: Dung doan van ngan, danh sach dau dong khi phu hop
- **CTA**: Ket thuc voi loi keu goi hanh dong ro rang hoac cau hoi suy ngam

## Luu y

- Luon doi phe duyet cua nguoi dung tai cac diem kiem tra da de cap
- Bao ton tat ca phien ban thao de luu lich su
- Dung web search cho thong tin cap nhat khi duoc cung cap URL
- Neu tai lieu khong du, hoi nguoi dung them hoac de xuat nghien cuu bo sung
- Dieu chinh giong dieu theo doi tuong doc (ky thuat, dai chung, kinh doanh, v.v.)
