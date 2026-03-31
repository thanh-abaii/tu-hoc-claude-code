# Giai phap: Thuc hanh CLI

Giai phap chi tiet cho ca 3 bai tap thuc hanh.

---

## Bai 1: Dung headless mode de tao script automation

### Buoc 1: Tao thu muc scripts

```bash
mkdir -p scripts
```

### Buoc 2: Tao script `scripts/daily-summary.sh`

```bash
#!/usr/bin/env bash
set -euo pipefail

# Lay git log trong 24h qua
GIT_LOG=$(git log --since="24 hours ago" --oneline 2>/dev/null || echo "Khong co commit nao trong 24h qua")

# Dem so commit
COMMIT_COUNT=$(echo "$GIT_LOG" | grep -c . || echo "0")

# Neu khong co commit, tao ket qua rong
if [ "$COMMIT_COUNT" -eq 0 ]; then
  echo '{"date":"'"$(date -Iseconds)"'","summary":"Khong co commit moi trong 24h qua","commit_count":0}'
  exit 0
fi

# Dung claude -p de tom tat, yeu cau JSON output
RESULT=$(echo "$GIT_LOG" | claude -p \
  --model sonnet \
  --max-turns 1 \
  --output-format json \
  "Tom tat cac commit git sau thanh doan van ngan gon (tieng Viet).
Tra ve JSON dung dinh dang:
{
  \"summary\": \"tom tat ngan gon cac thay doi chinh\",
  \"commit_count\": $COMMIT_COUNT
}
Chi tra ve JSON, khong them text nao khac.

Log:
$GIT_LOG")

# Parse va them truong date
echo "$RESULT" | jq '. + {date: "'$(date -Iseconds)'"}'
```

### Buoc 3: Phan quyen va chay thu

```bash
chmod +x scripts/daily-summary.sh
./scripts/daily-summary.sh
```

### Ket qua mau

```json
{
  "summary": "Hom nay team da commit 5 lan, chu yeu refactoring module authentication. Da sua loi type trong user service, them unit test cho login flow, va cap nhat tai lieu API.",
  "commit_count": 5,
  "date": "2026-03-31T10:30:00+07:00"
}
```

### Giai thich

- `git log --since="24 hours ago" --oneline` lay danh sach commit dang ngan gon
- `claude -p` chay o headless/print mode -- tra ve mot phan hoi roi thoat
- `--model sonnet` can bang giua toc do va chat luong cho viec tom tat
- `--max-turns 1` dambao Claude khong thuc them hanh dong nao (chi doc va tra ve)
- `--output-format json` giup parse ket qua de them truong `date` bang jq
- `set -euo pipefail` dam bao script dung khi co loi

---

## Bai 2: Dung --output-format json de export data

### Buoc 1: Lay danh sach file thay doi va export

```bash
#!/usr/bin/env bash
set -euo pipefail

# Lay danh sach file thay doi trong commit gan nhat
CHANGED_FILES=$(git diff --name-only HEAD~1 2>/dev/null || echo "")

if [ -z "$CHANGED_FILES" ]; then
  echo "Khong co file nao thay doi trong commit gan nhat."
  echo '{"changed_files": [], "markdown": [], "typescript": []}' > changed-files.json
  exit 0
fi

# Dung claude de phan loai file va tra ve JSON
RESULT=$(echo "$CHANGED_FILES" | claude -p \
  --model haiku \
  --max-turns 1 \
  --output-format json \
  "Phan tich danh sach file duoi day. Tra ve JSON voi cac truong:
  - changed_files: mang tat ca file thay doi
  - markdown: mang chi file .md
  - typescript: mang chi file .ts

  Chi tra ve JSON.

  Files:
  $CHANGED_FILES")

# Luu vao file
echo "$RESULT" > changed-files.json

# Hien thi thong ke
echo "=== Thong ke file thay doi ==="
echo "Tong cong: $(echo "$RESULT" | jq '.changed_files | length') files"
echo "Markdown (.md): $(echo "$RESULT" | jq '.markdown | length') files"
echo "TypeScript (.ts): $(echo "$RESULT" | jq '.typescript | length') files"

# Hien thi file Markdown
echo ""
echo "=== File Markdown ==="
echo "$RESULT" | jq -r '.markdown[]'

# Hien thi file TypeScript
echo ""
echo "=== File TypeScript ==="
echo "$RESULT" | jq -r '.typescript[]'
```

### Buoc 2: Chay script

```bash
chmod +x scripts/export-changed-files.sh
./scripts/export-changed-files.sh
```

### Ket qua mau (`changed-files.json`)

```json
{
  "changed_files": [
    "docs/api-reference.md",
    "docs/CHANGELOG.md",
    "src/auth/login.ts",
    "src/auth/register.ts",
    "src/utils/helpers.ts",
    "README.md"
  ],
  "markdown": [
    "docs/api-reference.md",
    "docs/CHANGELOG.md",
    "README.md"
  ],
  "typescript": [
    "src/auth/login.ts",
    "src/auth/register.ts",
    "src/utils/helpers.ts"
  ]
}
```

### Cach thay the: Dung jq thuan (khong can Claude)

Neu chi can loc file theo extension, co the dung jq/thuat toan don gian:

```bash
git diff --name-only HEAD~1 | while read file; do
  echo "$file"
done | jq -R -s '
  split("\n") |
  map(select(length > 0)) |
  {
    changed_files: .,
    markdown: [.[] | select(endswith(".md"))],
    typescript: [.[] | select(endswith(".ts"))]
  }
' > changed-files.json
```

**Luu y**: Cach dung Claude se huu ich khi ban can phan tich phuc tap hon (vi du: phan loai theo chuc nang, muc do quan trọng, v.v.), con dung jq thuan thi nhanh va re tien hon cho viec loc don gian.

---

## Bai 3: Tao alias cho workflow hang ngay

### Buoc 1: Them alias vao `~/.bashrc`

```bash
# Claude Code aliases
# Hoi dap nhanh -- dung haiku cho toc do
alias cc-ask='claude -p --model haiku'

# Suy nghi sau -- dung opus cho tac vu phuc tap
alias cc-think='claude -p --model opus'

# Review code -- sonnet voi JSON output
alias cc-review='claude -p --model sonnet --output-format json --max-turns 1'

# Function ho tro review file cu the
cc-review-file() {
  if [ -z "${1:-}" ]; then
    echo "Su dung: cc-review-file <duong-dan-file>"
    return 1
  fi
  cat "$1" | claude -p \
    --model sonnet \
    --output-format json \
    --max-turns 1 \
    "Review code cho file nay. Tra ve JSON voi truong: issues (mang), suggestions (mang)"
}
```

### Buoc 2: Ap dung va kiem tra

```bash
# Tai lai bashrc
source ~/.bashrc

# Kiem tra alias da duoc tai
type cc-ask
type cc-think
type cc-review
```

### Buoc 3: Tao script test `scripts/test-aliases.sh`

```bash
#!/usr/bin/env bash
set -euo pipefail

echo "===== Kiem tra Claude Code Aliases ====="
echo ""

# Kiem tra alias co ton tai khong
check_alias() {
  local name="$1"
  local expected="$2"
  if type "$name" &>/dev/null; then
    echo "[PASS] Alias '$name' ton tai"
    echo "       Gia tri: $(alias "$name" 2>/dev/null || type "$name")"
    return 0
  else
    echo "[FAIL] Alias '$name' KHONG ton tai"
    return 1
  fi
}

# Kiem tra tung alias
PASS=0
FAIL=0

if check_alias "cc-ask" "claude -p --model haiku"; then
  ((PASS++))
else
  ((FAIL++))
fi

if check_alias "cc-think" "claude -p --model opus"; then
  ((PASS++))
else
  ((FAIL++))
fi

if check_alias "cc-review" "claude -p --model sonnet --output-format json --max-turns 1"; then
  ((PASS++))
else
  ((FAIL++))
fi

# Kiem tra function
if type cc-review-file &>/dev/null; then
  echo "[PASS] Function 'cc-review-file' ton tai"
  ((PASS++))
else
  echo "[FAIL] Function 'cc-review-file' KHONG ton tai"
  ((FAIL++))
fi

echo ""
echo "===== Ket qua: $PASS PASS, $FAIL FAIL ====="

# Test thuc te (neu muon, bo comment)
# echo ""
# echo "===== Test thuc te ====="
# echo "Dang test cc-ask..."
# cc-ask "1 + 1 = ?"
```

### Buoc 4: Chay test

```bash
chmod +x scripts/test-aliases.sh
source ~/.bashrc
./scripts/test-aliases.sh
```

### Ket qua test mau

```
===== Kiem tra Claude Code Aliases =====

[PASS] Alias 'cc-ask' ton tai
       Gia tri: alias cc-ask='claude -p --model haiku'
[PASS] Alias 'cc-think' ton tai
       Gia tri: alias cc-think='claude -p --model opus'
[PASS] Alias 'cc-review' ton tai
       Gia tri: alias cc-review='claude -p --model sonnet --output-format json --max-turns 1'
[PASS] Function 'cc-review-file' ton tai

===== Ket qua: 4 PASS, 0 FAIL =====
```

### Test thuc te voi tung alias

```bash
# Test cc-ask (haiku -- nhanh)
cc-ask "Hôm nay là thứ mấy?"
# Output: Hom nay la thu Ba, ngay 31 thang 3 nam 2026.

# Test cc-think (opus -- suy nghi sau)
cc-think "Phân tích ưu nhược điểm của việc dùng PostgreSQL so với MongoDB cho e-commerce platform"
# Output: Phan tich chi tiet voi nhieu y...

# Test cc-review (sonnet + JSON)
echo 'function login(user, pass) { return db.query("SELECT * FROM users WHERE user=" + user); }' | cc-review-file /dev/stdin
# Output: {"issues": [...], "suggestions": [...]}
```

### Giai thich chi tiet

**Tai sao dung alias thay vi lenh day du?**
- Tiet kiem thoi gian go phim
- Dam bao nhat quan tham so giua cac lan dung
- De nho hon (`cc-ask` de nho hon `claude -p --model haiku`)

**Tai sao bai 3 dung function thay vi alias cho `cc-review-file`?**
- Alias khong ho tro truyen tham so linh hoat
- Function cho phep kiem tra tham so (`if [ -z "${1:-}" ]`) va xu ly phuc tap hon
- Function ho tro error handling tot hon

**Luu y quan trong**:
- Alias khong hoat dong trong bash script (chi trong interactive shell). Neu muon dung trong script, phai dung lenh day du hoac `shopt -s expand_aliases`.
- Nho `source ~/.bashrc` sau khi sua file de ap dung thay doi.
