---
name: advance-gate
description: Advances this lab from one phased gate to the next when the QA chair records PASS (standing auto-advance through Gate 10) or when the user explicitly names a gate if that policy is unset. Use when starting Gate N, closing a gate, or updating GATE-STATUS.
---

# Advance a gate

## Go bit

1. Read `99-META/GATE-STATUS.md`.
2. If `owner_policy` is **standing auto-advance through Gate 10**, human named-gate approval is **waived**. Advance only when the QA chair records **PASS** in `99-META/qa/gate-N-scorecard.md`. Follow `.cursor/skills/qa-gate/SKILL.md`.
3. If that policy is unset: if the user did not explicitly approve a **named** gate, do not advance. "Keep going" is not approval — ask which gate.

## Procedure

1. Read `99-META/GATE-STATUS.md` and `99-META/gate-plan.md`.
2. Confirm the current gate's deliverables exist. Run the QA committee and score: accuracy, completeness, source quality, freshness, architecture consistency, terminology, code/security correctness, production realism, cross-refs, learning progression.
3. Record PASS, FAIL, or NEEDS REVIEW on the **current** gate. FAIL or NEEDS REVIEW: do not start the next gate; fix and re-score (max two retries). Residual volatile gaps → **UNVERIFIED**, then PASS the durable remainder if that is the only blocker.
4. Only then start the **next** gate's allowed work. Produce that gate's artifacts only. Then STOP that gate and run QA again.
5. Update `99-META/GATE-STATUS.md` with date, what was produced, residual UNVERIFIED items, `next_gate_requires: subagent QA PASS`, and keep `owner_policy` unless the owner cleared it.

## Gate 1 reminder

Gate 1 validates architecture, concept relationships, technology categories, and learning dependencies. It is not "write all foundation pages."

## Gate 2+ reminder

Do not generate thousands of pages. Depth over document count. No empty template files.
