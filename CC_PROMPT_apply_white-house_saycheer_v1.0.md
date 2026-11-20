# CC_PROMPT apply white house to SayCheer v1.0 2026-11-20
Unit 1 of the install plan (pilot). Repo side only, additive. The Claude project side is done by the SayCheer project chat, not by CC.

## 0 CLOSE-OUT
none

## 1 INTRO
Read and execute: this file. Repo: `Csmittee/SayCheer`, branch `main`, one PR. Read-only: `Csmittee/White-house` (main), files `registry/REGISTRY.md` (SayCheer row), `audits/saycheer.md`, `core/HEADER_STANDARD.md`, `core/INSTALL_SEQUENCE.md`, `skills/README.md`.
Read aloud before starting, per this repo's `CLAUDE.md`: CLAUDE.md, RULES.md, CC_SKILL.md, this prompt. Do not read `docs/prompts/*` or `docs/archive/*`.

## 2 CONTEXT
This repo already has strong governance (rules R-1..R-38, QA ledger, PR template, header checks, caps, security and PDPA rules). The owner does NOT want any of it lost or rewritten. The standard is applied by ADDING one file that links the repo to White House v0.4 and names what is local. Owner decisions (do not re-ask): SayCheer is type 3, shape C 1/1/1; repo side is additive only; cleanups found in the audit (large `CC_CHAT_LOG.md`, `KNOWLEDGE_MAP.md` size) are NOT done now; project side goes first and the owner pastes new instruction text into the Claude project separately.
QA CARRY-OVER: none.

## 3 NEW FILES
- `WH_STANDARD.md` (repo root): the link file, 40 lines or fewer, under 4 KB. Header exactly as this repo's `tools/check_md_headers.py` requires (read it first; do not add `Origin:` or `WH version:` lines, this is a local file). Content:
  1. Follows: White House v0.4 (read the value from `Csmittee/White-house` registry; if unreadable write UNVERIFIED). Unit 1, type 3, shape C 1/1/1. Claude project name: SayCheer Project.
  2. Chat side: the handoff lives in the Claude project folder, not in this repo (as `CLAUDE.md` already says).
  3. LOCAL, never overwritten by a White House sync (paths only, from `audits/saycheer.md` section f): `RULES.md`, `docs/DECISIONS.md`, `docs/SECURITY_PDPA.md`, `docs/LIBRARY_*.md`, `LESSONS_LEARNED.md` Part B, `hardware/BENCH_CHECKLIST.md`, `docs/KNOWN_BUGS.md`, `docs/OPEN_QUESTIONS.md`, `docs/QA_LEDGER.md`, `.github/pull_request_template.md`, and the business documents under `docs/quotes/` and the financial model (never synced anywhere).
  4. Where White House common files live: skills `debug_escalation`, `problem_solving`, `task_skill_template` and `security/` controls in `Csmittee/White-house` (read only). Repo rules win on any conflict.
  5. One line: "Known cleanups, not done: see White-house `queue.md` IDEAS."

## 4 TASKS
1. Read the files in section 1. Confirm `audits/saycheer.md` section f still matches the repo (paths exist); list any path that does not exist and leave it out.
2. Create `WH_STANDARD.md` as in section 3. No other new file.
3. Change NO existing file, except what this repo's own closing steps require (`CC_CHAT_LOG.md` entry, `docs/QA_LEDGER.md` row, `PROJECT_STATE.md` line if its rules say so). No version bumps elsewhere.
4. Run `python tools/check_md_headers.py` and `python tools/check_workflows.py`; both must pass.

## 5 DO NOT TOUCH
Any other repo. `RULES.md`, `CLAUDE.md`, `CC_SKILL.md`, `KNOWLEDGE_MAP.md`, `docs/DECISIONS.md`, `docs/SECURITY_PDPA.md`, `.github/`, `tools/`, `platform/`, `kiosk/`, `docs/quotes/`, any secret, branch settings, workflows. Never write a value that looks like a key, token, price or customer name.

## 6 VERIFICATION
CC checks (one evidence line in the PR body): (a) `git diff --name-status main...HEAD` shows exactly one A (`WH_STANDARD.md`) and only the closing-step files as M; (b) `wc -l -c WH_STANDARD.md` is at most 40 lines and 4,096 bytes; (c) both tools in task 4 pass; (d) every path listed in the LOCAL section exists (`ls`); (e) grep for 32 or more letters/digits in the new file returns nothing; (f) the CI checks on the PR are green.
OWNER QA (visual; PR block per `.github/pull_request_template.md`, tick PASS or FAIL each):
1. Open "Files changed". EXPECTED: one new file `WH_STANDARD.md`; the other changed files are only the log, ledger or state files.
2. Open `WH_STANDARD.md`. EXPECTED: short, says White House v0.4 and unit 1, a list of local files, no prices, no customer names, no keys.
3. Look at the PR checks. EXPECTED: all green.

## 7 MANDATORY CLOSING
Per this repo's own session closing (`CC_SKILL.md`, `CLAUDE.md`). Update `CC_CHAT_LOG.md`. Final message: PR link, head hash, files and bytes, anything skipped, QA state of the previous PR (none).

## 8 GUARDRAILS
Never invent a real value (name, ID, URL, secret, hash). Unknown = UNSET or UNVERIFIED. Same fix fails twice: stop, write IS / IS-NOT, ask. One PR open. Scope lock: extra ideas go to the queue IDEAS of White-house, not here. If anything in the repo would have to be rewritten to follow White House, stop and report instead.
