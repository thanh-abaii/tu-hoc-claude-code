# Quiz: CLI -- Tham So Dong Lenh

Muc tieu: Dat 8/10 de pass.

## Cau 1
**Cau hoi**: Flag `-p` (alias cua `--print`) lam gi?

A. In file ra may in
B. In phan hoi cua Claude ra stdout ma khong dung interactive mode
C. In log ra terminal
D. Tao file PDF

**Dap an**: B
**Giai thich**: Flag -p (--print) cho phep Claude Code tra loi mot lan va in ket qua ra stdout, phuhop cho scripting va pipe. Khong khoi dong interactive REPL mode.

## Cau 2
**Cau hoi**: Su khac biet chinh giua Interactive Mode va Print Mode la gi?

A. Interactive Mode nhanh hon Print Mode
B. Print Mode ho tro nhieu luot hoi thoai con Interactive Mode chi mot lan
C. Interactive Mode ho tro conversation nhieu luot, tab completion, lich su, slash commands; Print Mode chi mot truy van, scriptable, pipeable
D. Print Mode yeu cau API key con Interactive Mode thi khong

**Dap an**: C
**Giai thich**: Interactive Mode (mac dinh) cung cap phien tro chuyen nhieu luot voi day du tinh nang. Print Mode (-p) duoc thiet ke cho scripting -- mot truy van, mot phan hoi, roi thoat.

## Cau 3
**Cau hoi**: Lenh nao dung de tiep tuc cuoc tro chuyen gan nhat?

A. `claude -p`
B. `claude -c`
C. `claude -w`
D. `claude -r`

**Dap an**: B
**Giai thich**: Flag -c (--continue) tai lai cuoc tro chuyen gan nhat nhat để tiếp tục làm việc. Flag -r (--resume) tiep tuc mot phien cu the theo ID/ten.

## Cau 4
**Cau hoi**: Khi nao nen dung `--output-format json`?

A. Khi muon output dep hon trong terminal
B. Khi can parse ket qua bang script (vi du su dung jq)
C. Khi muon toc do nhanh hon
D. Khi dung interactive mode

**Dap an**: B
**Giai thich**: `--output-format json` tra ve ket qua duoi dang JSON co cau truc, phuhopcho xu ly lap trinh nhu parse bang jq, tich hop CI/CD, hoac automation scripts.

## Cau 5
**Cau hoi**: Flag `--max-turns` co tac dung gi?

A. Gioi han so dong code Claude co the tao ra
B. Gioi han so luot agentic (so lan Claude co the goi tool lien tiep)
C. Gioi han thoi gian phien lam viec
D. Gioi han so file co the doc

**Dap an**: B
**Giai thich**: `--max-turns` gioi han so lan Claude co the thuc hien agentic loop (goi tool, nhan ket qua, tiep tuc). Vi du `--max-turns 3` nghia la Claude chi co the thuc hien toi da 3 luot goi tool.

## Cau 6
**Cau hoi**: Co `-w` (--worktree) duoc dung trong truong hop nao?

A. Khi muon khoi dong Claude trong mot git worktree co lap
B. Khi muon xem toan bo file trong thu muc lam viec
C. Khi muon ghi de file CLAUDE.md
D. Khi muon tat interactive mode

**Dap an**: A
**Giai thich**: `-w` (--worktree) khoi dong Claude trong mot git worktree co lap, cho phep thuc hien cong viec ma khong anh huong den branch chinh.

## Cau 7
**Cau hoi**: Ket hop `cat file.py | claude -p "review this"` hoat dong nhu the nao?

A. Noi dung file.py duoc gui qua stdin, Claude phan tich va tra ve khaon phan hoi duoi print mode
B. Claude mo file.py va chinh sua truc tiep
C. File.py duoc chay va output duoc Claude giai thich
D. Claude tao file.py neu chua ton tai

**Dap an**: A
**Giai thich**: Pipe cho phep noi dung file duoc chuyen vao stdin cua Claude khi dung print mode. Claude doc noi dung tu stdin va tra ve ket qua phan tich.

## Cau 8
**Cau hoi**: Su dung `claude -p --model opus` thay vi `claude -p --model haiku` co diem gi khac?

A. Opus nhanh hon nhung kem chinh xac hon
B. Haiku dat tien hon nhung yeu hon, Opus manh nhat cho cac tac vu phuc tap
C. Khong co su khac biet
D. Opus chi ho tro interactive mode

**Dap an**: B
**Giai thich**: Opus la model manh nhat, phuhop cho cac tac vu phuc tap nhu architectural review. Haiku la model nhanh nhat, re tien nhat, phuhopcho cac tac vu don gian. Sonnet nam giua.

## Cau 9
**Cau hoi (mo)**: Giai thich su dung co ban cua `claude -p --output-format json --max-turns 1` trong CI/CD pipeline. Tai sao can `--max-turns 1`?

**Dap an goi y**:
Ket hop nay thuong dung trong CI/CD pipeline de review code tu dong. `--output-format json` giup parse ket qua de xu ly tiep (post comment, fail build, v.v.). `--max-turns 1` dam bao Claude chi thuc hien mot luot (doc va phan tich), khong thuc hien them hanh dong nao khac nhu chinh sua file -- dieu nay quan trong trong CI/CD vi pipeline chi can ket qua phan tich, khong can thay doi file.

## Cau 10
**Cau hoi (mo)**: Ban can tao mot automation script de tu dong generate documentation cho tat ca file TypeScript trong thu muc `src/`. Hay mo ta cach tiep can su dung CLI, bao gom cac flag can thiet va luong xu ly.

**Dap an goi y**:

Co the su dung mot trong hai cach:

**Cach 1 -- Pipe toan bo**:
```bash
cat src/*.ts | claude -p --model sonnet --output-format json \
  "generate API documentation in markdown for these files" > docs/api.md
```

**Cach 2 -- Loop qua tung file**:
```bash
for file in src/*.ts; do
  echo "## $file" >> docs/api.md
  cat "$file" | claude -p --model haiku "summarize this file" >> docs/api.md
done
```

Cach 1 nhanh hon (mot goi API) nhung co the vuot context window voi nhieu file. Cach 2 an toan hon cho project lon, dung haiku de tiet kiem chi phi.
