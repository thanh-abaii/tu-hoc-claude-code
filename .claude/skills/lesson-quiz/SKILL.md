---
name: lesson-quiz
version: 1.0.0
description: Interactive lesson-level quiz for Claude Code tutorials. Tests understanding of a specific lesson (01-10) with 8-10 questions mixing conceptual and practical knowledge. Use before a lesson to pre-test, during to check progress, or after to verify mastery. Use when asked to "quiz me on hooks", "test my knowledge of lesson 3", "lesson quiz", "practice quiz for MCP", or "do I understand skills".
---

# Lesson Quiz

Interactive learning and quiz for a specific Claude Code lesson. First presents the lesson content with clear explanations of key concepts, then optionally tests understanding with 8-10 questions. This two-phase approach ensures beginners study before attempting the quiz rather than guessing blindly.

## Instructions

### Step 1: Determine the Lesson

If the user provided a lesson as an argument (e.g., `/lesson-quiz hooks` or `/lesson-quiz 03`), map it to the lesson directory:

**Lesson mapping (3 tiers: co-ban, trung-cap, nang-cao):**

**Sơ cấp (co-ban):**
- `01`, `slash-commands`, `commands` → co-ban/01-slash-commands
- `02`, `memory` → co-ban/02-memory
- `03`, `cli`, `cli-reference` → co-ban/03-cli

**Trung cấp (trung-cap):**
- `04`, `skills` → trung-cap/04-skills
- `05`, `subagents`, `agents` → trung-cap/05-subagents
- `06`, `mcp` → trung-cap/06-mcp
- `07`, `plugins` → trung-cap/07-plugins

**Nâng cao (nang-cao):**
- `08`, `hooks` → nang-cao/08-hooks
- `09`, `checkpoints`, `checkpoint` → nang-cao/09-checkpoints
- `10`, `advanced`, `advanced-features` → nang-cao/10-advanced

If no argument was provided, present a selection prompt grouped by tier using AskUserQuestion:

**Question 1** (header: "Lesson"):
"Which tier do you want to study?"
Options:
1. "Sơ cấp (co-ban)" — Slash Commands, Memory, CLI
2. "Trung cấp (trung-cap)" — Skills, Subagents, MCP, Plugins
3. "Nâng cao (nang-cao)" — Hooks, Checkpoints, Advanced Features

**If "Sơ cấp" is selected, Question 2** (header: "Lesson"):
"Pick your lesson:"
Options:
1. "Slash Commands (01)" — Custom commands, skills, frontmatter, arguments
2. "Memory (02)" — CLAUDE.md, memory hierarchy, rules, auto memory
3. "CLI Reference (03)" — Flags, output formats, scripting, piping

**If "Trung cấp" is selected, Question 2** (header: "Lesson"): "Which lesson?"
Options:
1. "Skills (04)" — Progressive disclosure, auto-invocation, SKILL.md
2. "Subagents (05)" — Task delegation, agent config, isolation
3. "MCP (06)" — External integration, transport, servers, tool search
4. "Plugins (07)" — Bundled solutions, marketplace, plugin.json

**If "Nâng cao" is selected, Question 2** (header: "Lesson"): "Which lesson?"
Options:
1. "Hooks (08)" — Event automation, PreToolUse, exit codes, JSON I/O
2. "Checkpoints (09)" — Rewind, restore, safe experimentation
3. "Advanced Features (10)" — Planning, permissions, print mode, thinking

### Step 2: Determine What the User Wants

Ask the user what they want to do using AskUserQuestion (header: "Mode"):
"What would you like to do with this lesson?"
Options:
1. "Learn first, then quiz" — Read and understand the lesson content before being quizzed (Recommended)
2. "Just learn" — Study the lesson content without a quiz
3. "Jump straight to quiz" — Skip to the quiz (not recommended for beginners)

### Step 3: Present the Lesson Content

Read the lesson README.md file:
- Read file: `<lesson-directory>/README.md`

Present the lesson content in a structured way:
1. **Overview**: Start with a brief summary of what the lesson covers and why it matters
2. **Key concepts**: Go through the main sections of the lesson, explaining each concept clearly with simple examples. Use analogies for beginners — avoid assuming prior knowledge
3. **Practical examples**: Show real-world examples from the lesson to illustrate how things work
4. **Common pitfalls**: Mention common mistakes or misconceptions that beginners have

After presenting the lesson, ask if the user has questions. Be ready to explain any concept they found confusing.

Then ask if they want a quiz:
Use AskUserQuestion (header: "Quiz"):
"Do you feel ready for the quiz, or would you like to review anything again?"
Options:
1. "Ready for the quiz" — Proceed to Step 5 (quiz)
2. "Explain [specific topic] again" — Go deeper on that concept
3. "Not ready yet" — Let them re-read sections at their pace

If they chose "Just learn" in Step 2, skip the quiz and wrap up after answering their questions.

### Step 4: Quiz Timing (if applicable)

Use AskUserQuestion (header: "Timing"):
"When are you taking this quiz relative to the lesson?"
Options:
1. "Before (pre-test)" — I haven't read the lesson yet, testing my prior knowledge
2. "During (progress check)" — I'm partway through the lesson
3. "After (mastery check)" — I've completed the lesson and want to verify understanding

This context affects how the results are framed (see Step 6).

### Step 5: Present Questions in Rounds

Present 10 questions from the question bank in rounds of 2 questions each (5 rounds total). Each question uses AskUserQuestion with the question text and 3-4 answer options.

**IMPORTANT**: Use AskUserQuestion with max 4 options per question, 2 questions per round.

For each round, present 2 questions. After all 5 rounds, proceed to scoring.

**Question format per round:**

Each question is from `references/question-bank.md` and has:
- `question`: The question text
- `options`: 3-4 answer choices (one correct, labeled in the bank)
- `correct`: The correct answer label
- `explanation`: Why the answer is correct
- `category`: "conceptual" or "practical"

Present each question using AskUserQuestion. Record the user's answer for each.

### Step 6: Score and Present Results

After all rounds, calculate the score and present results.

**Scoring:**
- Each correct answer = 1 point
- Total possible = 10 points

**Grade scale:**
- 9-10: Mastered — Excellent understanding
- 7-8: Proficient — Good grasp, minor gaps
- 5-6: Developing — Fundamentals understood, needs review
- 3-4: Beginning — Significant gaps, review recommended
- 0-2: Not yet — Start from the beginning of this lesson

**Output format:**

```markdown
## Lesson Quiz Results: [Lesson Name]

**Score: N/10** — [Grade label]
**Quiz timing**: [Before / During / After] the lesson
**Question breakdown**: N conceptual correct, N practical correct

### Per-Question Results

| # | Category | Question (short) | Your Answer | Result |
|---|----------|-----------------|-------------|--------|
| 1 | Conceptual | [abbreviated question] | [their answer] | [Correct / Incorrect] |
| 2 | Practical | ... | ... | ... |
| ... | ... | ... | ... | ... |

### Incorrect Answers — Review These

[For each incorrect answer, show:]

**Q[N]: [Full question text]**
- Your answer: [what they chose]
- Correct answer: [correct option]
- Explanation: [why it's correct]
- Review: [specific section of the lesson README to re-read]

### [Timing-specific message]

[If pre-test]:
**Pre-test score: N/10.** This gives you a baseline! Focus your study on the topics you missed. After completing the lesson, retake the quiz to measure your improvement.

[If during]:
**Progress check: N/10.** [If 7+: Great progress — keep going! If 4-6: Review the incorrect topics before continuing. If <4: Consider re-reading from the beginning.]

[If after]:
**Mastery check: N/10.** [If 9-10: You've mastered this lesson! Move on to the next. If 7-8: Almost there — review the missed topics and retake. If <7: Spend more time with the lesson, especially the sections marked above.]

### Recommended Next Steps

[Based on score and timing:]
- [If mastered]: Proceed to the next lesson in the roadmap: [next lesson link]
- [If proficient]: Review these specific sections, then retake: [list sections]
- [If developing or below]: Re-read the full lesson: [lesson link]. Focus on: [list weak categories]
- [Offer]: "Would you like to retake this quiz, try a different lesson, or get help with a specific topic?"
```

### Step 7: Offer Follow-up

After presenting results, use AskUserQuestion:

"What would you like to do next?"
Options:
1. "Retake this quiz" — Try the same lesson quiz again
2. "Quiz another lesson" — Switch to a different lesson
3. "Explain a topic I missed" — Get a detailed explanation of an incorrect answer
4. "Go back and review the lesson" — Re-read the lesson content from Step 3
5. "Done" — End the quiz session

If **Retake**: Go back to Step 5 (skip timing question).
If **Quiz another lesson**: Go back to Step 1.
If **Explain a topic**: Ask which question number, then read the relevant section from the lesson README.md and explain it with examples.
If **Go back and review**: Go back to Step 3 and re-present the lesson content, focusing on the missed topics.

## Error Handling

### Invalid lesson argument
If the argument doesn't match any lesson, show the valid lesson list and ask the user to pick one.

### User wants to quit mid-quiz
If the user indicates they want to stop during any round, present partial results for questions answered so far.

### Lesson README not found
If the README.md file doesn't exist at the expected path, inform the user and suggest checking the repository structure.

## Validation

### Triggering test suite

**Should trigger:**
- "quiz me on hooks"
- "lesson quiz"
- "test my knowledge of lesson 3"
- "practice quiz for MCP"
- "do I understand skills"
- "quiz me on slash commands"
- "lesson-quiz 06"
- "test me on checkpoints"
- "how well do I know the CLI"
- "quiz me before I start the memory lesson"

**Should NOT trigger:**
- "assess my overall level" (use /self-assessment)
- "explain hooks to me"
- "create a hook"
- "what is MCP"
- "review my code"
