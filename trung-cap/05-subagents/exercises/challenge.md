# Thực hành: Subagents

## Mô tả
Bạn cần tạo các subagent chuyên biệt để hỗ trợ workflow phát triển phần mềm.

## Bài 1: Tạo Researcher Subagent

**Yêu cầu:**
1. Tạo file `.claude/agents/researcher.md`
2. Cấu hình với:
   - name: `researcher`
   - description: mô tả rõ khi nào dùng
   - tools: Read, Grep, Glob, Bash (không Write/Edit)
   - model: `sonnet`
   - Không có quyền chỉnh sửa file

## Bài 2: Tạo Code Reviewer Subagent

**Yêu cầu:**
1. Tạo file `.claude/agents/code-reviewer.md`
2. Cấu hình với:
   - name: `code-reviewer`
   - description: review code quality, security, performance
   - tools: Read, Grep, Glob, Write, Edit
   - model: `opus` (vì cần phân tích sâu)
   - maxTurns: 15

## Bài 3: Tạo Security Auditor Subagent

**Yêu cầu:**
1. Tạo file `.claude/agents/security-auditor.md`
2. Cấu hình với:
   - name: `security-auditor`
   - description: quét bảo mật codebase
   - tools: Read, Grep, Glob, Write, Edit
   - background: true (vì scan có thể lâu)
   - Chạy ở background mode

## Bài 4: Test Chạy Subagent

**Yêu cầu:**
1. Trong Claude Code, spawn researcher agent để tìm hiểu về một module
2. Spawn code-reviewer để review một file cụ thể
3. Kiểm tra kết quả trả về

## Gợi ý bắt đầu
- Description trong frontmatter rất quan trọng để Claude tự động trigger subagent
- Chọn model phù hợp: haiku cho task đơn giản, sonnet cho đa số, opus cho complex
- Background subagents hữu ích cho scan/research dài

## Nộp bài
Gửi kết quả cho @teacher để review
