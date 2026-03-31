---
name: claude-md
description: Tao hoac cap nhat tep tin CLAUDE.md theo thuc hanh tot nhat de onboarding AI agent toi uu
---

## Dau Vao Nguoi Dung

```text
$ARGUMENTS
```

Ban **BAT BUOC** phai xem xet dau vao nguoi dung truoc khi tiep tuc (neu khong rong). Nguoi dung co the chi dinh:
- `create` - Tao CLAUDE.md moi tu dau
- `update` - Cai thien CLAUDE.md hien co
- `audit` - Phan tich va bao cao chat luong CLAUDE.md hien tai
- Duong dan cu the de tao/cap nhat (vd: `src/api/CLAUDE.md` cho huong dan theo thu muc)

## Nguyen tac Cot loi

**LLMs khong trang thai**: CLAUDE.md la tep tin duy nhat tu dong dua vao moi cuoc hoi thoai. Day la tai lieu onboarding chinh cho AI agent vao codebase.

### Quy tac Vang

1. **It la Nhieu**: Frontier LLMs co the theo doi ~150-200 huong dan. System prompt cua Claude Code da chiem ~50. Giu CLAUDE.md tap trung va ngan gon.

2. **Pho quat**: Chi dua thong tin applicable cho MOI phien. Huong dan cho tac vu cu the thuoc ve tep tin rieng.

3. **Dung dung Claude nhu Linter**: Huong dan style lam phong nganh canh va giam chat luong huong dan. Dung cong cu xac dinh (prettier, eslint, v.v.) thay the.

4. **Khong bao gio Tu Sinh**: CLAUDE.md la diem don bay cao nhat. Thu cong bien soan can than.

## Luong Thuc Hien

### 1. Phan tich Du an

Truoc tien, phan tich trang thai du an hien tai:

1. Kiem tra tep tin CLAUDE.md hien co:
   - Cap root: `./CLAUDE.md` hoac `.claude/CLAUDE.md`
   - Theo thu muc: `**/CLAUDE.md`
   - Cau hinh nguoi dung toan cuc: `~/.claude/CLAUDE.md`

2. Xac dinh cau truc du an:
   - Ngan nghe cong nghe (ngon ngu, framework)
   - Loai du an (monorepo, ung don, thu vien)
   - Cong cu phat trien (quan ly goi, he thong build, test runner)

3. Xem xet tai lieu hien co:
   - README.md
   - CONTRIBUTING.md
   - package.json, pyproject.toml, Cargo.toml, v.v.

### 2. Chien luoc Noi dung (WHAT, WHY, HOW)

Cau truc CLAUDE.md theo ba chieu:

#### WHAT - Cong nghe & Cau truc
- Tong quan ngan nghe cong nghe
- To chuc du an (dac biet quan trong voi monorepo)
- Thu muc chinh va muc dich

#### WHY - Muc dich & Boi canh
- Du an lam gi
- Tai sao quyet dinh kien truc duoc dua ra
- Moi thanh phan chiu trach nhiem gi

#### HOW - Quy trinh & Quy uoc
- Quy trinh phat trien (bun vs node, pip vs uv, v.v.)
- Thu tuc kiem thu va lenh
- Phuong phac xac minh va build
- Nhung "gotcha" quan trong hoac yeu cau khong hien nhien

### 3. Chien luoc Progressive Disclosure

Voi du an lon, khuyen nghi tao thu muc `agent_docs/`:

```
agent_docs/
  |- building_the_project.md
  |- running_tests.md
  |- code_conventions.md
  |- architecture_decisions.md
```

Trong CLAUDE.md, tham chieu tep tin voi huong dan nhu:
```markdown
De biet chi tiet cach build, tham khao `agent_docs/building_the_project.md`
```

**Quan trong**: Dung tham chieu `file:line` thay vi doan ma de tranh ngu canh qua han.

### 4. Rang Buoc Chat Luong

Khi tao hoac cap nhat CLAUDE.md:

1. **Do dai Muc tieu**: Duoi 300 dong (ly tuong duoi 100)
2. **Khong co Quy tac Style**: Loai bo bat ky huong dan lint/format nao
3. **Khong co Huong dan Tac vu Cu the**: Chuyen sang tep tin rieng
4. **Khong co Doan ma**: Dung tham chieu tep tin thay the
5. **Khong co Thong tin Trung lap**: Khong lap lai nhung gi co trong package.json hoac README

### 5. Phan Can Thiet

Mot CLAUDE.md duoc cau truc tot nen bao gom:

```markdown
# Ten Du an

Mo ta ngan mot dong.

## Tech Stack
- Ngon ngu chinh va phien ban
- Framework/thu vien chinh
- Co so du lieu/luu tru (neu co)

## Cau truc Du an
[Chi cho monorepo hoac cau truc phuc tap]
- `apps/` - Diem vao ung dung
- `packages/` - Thu vien chia se

## Lenh Phat trien
- Cai dat: `lenh`
- Test: `lenh`
- Build: `lenh`

## Quy uoc Quan trong
[Chi nhung quy uoc khong hien nhien, tac dong cao]
- Quy uoc 1 voi giai thich ngan
- Quy uoc 2 voi giai thich ngan

## Van de da Biet / Gotchas
[Nhung thu thuong gay rac roi cho developer]
- Van de 1
- Van de 2
```

### 6. Mau Nen Tranh

**KHONG bao gom:**
- Huong dan style ma (dung linter)
- Tai lieu cach dung Claude
- Giai thich dai ve mau hien nhien
- Doan ma copy-paste
- Thuc hanh tot chung chung ("viet ma sach")
- Huong dan cho tac vu cu the
- Noi dung tu sinh
- Danh sach TODO dai

### 7. Danh sach Kiem tra Xac thuc

Truoc khi hoan tat, xac minh:

- [ ] Duoi 300 dong (uu tien duoi 100)
- [ ] Moi dong ap dung cho TAT CA phien
- [ ] Khong co quy tac style/format
- [ ] Khong co doan ma (dung tham chieu tep tin)
- [ ] Lenh da duoc xac minh hoat dong
- [ ] Progressive Disclosure duoc dung cho du an phuc tap
- [ ] Cac van de quan trong da duoc tai lieu
- [ ] Khong trung lap voi README.md

## Dinh Dang Dau ra

### Cho `create` hoac mac dinh:

1. Phan tich du an
2. Thao CLAUDE.md theo cau truc tren
3. Trinh bay thao de xem xet
4. Viet vao vi tri phu hop sau khi phe duyet

### Cho `update`:

1. Doc CLAUDE.md hien co
2. Kiem tra theo thuc hanh tot nhat
3. Xac dinh:
   - Noi dung can loai bo (quy tac style, doan ma, tac vu cu the)
   - Noi dung can gom gon
   - Thong tin can thiet con thieu
4. Trinh bay thay doi de xem xet
5. Ap dung thay doi sau khi phe duyet

### Cho `audit`:

1. Doc CLAUDE.md hien co
2. Tao bao cao voi:
   - So dong hien tai so voi muc tieu
   - Phan tram noi dung applicable pho quat
   - Danh sach mau hien co
   - Khuyen nghi cai thien
3. KHONG sua doi tep tin, chi bao cao

## Xu ly AGENTS.md

Neu nguoi dung yeu cau tao/cap nhat AGENTS.md:

AGENTS.md dung de dinh nghia hanh vi agent chuyen biet. Khac voi CLAUDE.md (danh cho ngu canh du an), AGENTS.md dinh nghia:
- Vai tro va nang luc agent tuy chinh
- Huong dan va rang buoc rieng cho agent
-- Dinh nghia quy trinh cho kich ban da agent

Ap dung nguyen tac tuong tu:
- Giu tap trung va ngan gon
- Dung progressive disclosure
- Tham chieu tai lieu ngoai thay vi nhúng noi dung

## Luu y

- Luon xac minh lenh hoat dong truoc khi dua vao
- Khi nghi ngo, bo qua - it la nhieu
- System reminder bao voi Claude rang CLAUDE.md "co the hoac khong lien quan" - cang nhieu noise, cang bi bo qua
- Monorepo huong loi nhieu nhat tu cau truc WHAT/WHY/HOW ro rang
- Tep tin CLAUDE.md theo thu muc nen cang tap trung hon
