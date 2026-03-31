# Thuc hanh: CLI

Muc tieu: Thuc hanh 3 bai tap de nam vung cac tham so CLI cua Claude Code.

---

## Bai 1: Dung headless mode de tao script automation

**Mo ta**: Tao bash script dung `claude -p` de tom tat git log hom nay.

**Yeu cau**:
1. Tao script `scripts/daily-summary.sh` trong thu muc du an
2. Lay git log trong 24h qua bang `git log --since="24 hours ago" --oneline`
3. Pipe output vao `claude -p --model sonnet` voi prompt yeu cau tom tat
4. Output ket qua ra file JSON co truong `date`, `summary`, `commit_count`
5. Script co the chay duoc (`chmod +x`)

**Goi y**:
- Dung `--output-format json` de co ket qua co cau truc
- Dung `--max-turns 1` de dam bao chi mot luot xu ly
- Prompt nen yeu cau Claude tra ve JSON voi cac truong cu the

---

## Bai 2: Dung --output-format json de export data

**Mo ta**: Export danh sach file da thay doi trong 24h qua va loc theo loai file.

**Yeu cau**:
1. Dung `claude -p --output-format json` de phan tich danh sach file thay doi
2. Lay danh sach file bang `git diff --name-only HEAD~1` hoac `git log --name-only --since="24 hours ago" --format=""`
3. Parse output voi `jq` (neu co)
4. Loc ra chi cac file `.md` va `.ts`
5. Luu ket qua vao file `changed-files.json`

**Goi y**:
- Ket hop pipe voi `jq` de loc va bien doi JSON
- Dung `claude -p --output-format json --max-turns 1` de dam bao ket qua JSON sach
- Co the dung `--json-schema` de dam bao cau truc output

---

## Bai 3: Tao alias cho workflow hang ngay

**Mo ta**: Tao cac bash alias trong `~/.bashrc` (hoac file shell config) cho cac lenh hay dung.

**Yeu cau**:
1. Tao alias `cc-ask` = `claude -p --model haiku` -- cho hoi dap nhanh
2. Tao alias `cc-think` = `claude -p --model opus` -- cho tac vu phuc tap
3. Tao alias `cc-review` = `claude -p --model sonnet --output-format json --max-turns 1` -- cho review code
4. Test ca ba alias voi cac lenh don gian
5. Viet mot doan script `test-aliases.sh` de kiem tra các alias hoat dong

**Goi y**:
- Alias chi hoat dong trong interactive shell, voi script thi can dung lenh day du
- Co the dung function thay vi alias neu can truyen tham so phuc tap
- Kiem tra bang `type cc-ask` sau khi source file config

---

## Nop bai

Gửi ket qua cho @teacher để review. Bao gom:
- Link den script da tao
- Output cua tung bai tap
- Ghi chu ve nhung kho khan gap phai (neu co)
