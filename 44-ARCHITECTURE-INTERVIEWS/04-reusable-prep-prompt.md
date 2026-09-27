---
concept_id: interviews.reusable-prep-prompt
title: Reusable prompt — personalize the prep plan and run mocks
domain_folder: 44-ARCHITECTURE-INTERVIEWS
levels_covered: [1, 2]
knowledge_class: durable
tech_status: general-pattern
last_verified: 2026-09-27
primary_source: SRC-FORMATION-FAANG-AI-2026
status: verified
related_nodes: [interviews, evaluation]
---

# Reusable prompt — personalize the prep plan and run mocks

Paste the block below into any capable LLM chat, fill the bracketed fields, and reuse it
weekly (update "current gaps" each time). It turns
[the 30/60/90 plan](03-prep-plan-30-60-90.md) into a personalized week-by-week plan and then
runs mock rounds against you using the same rubric as
[02-ai-era-interview-landscape.md](02-ai-era-interview-landscape.md).

```text
You are acting as my interview prep coach for the current AI-era hiring loop. Context on
what "AI-era loop" means:

- The DSA/algorithms round still happens, but questions are longer, more custom, and graded
  on narrated trade-offs, not silent speed.
- System design is now up to three separate tracks: (1) classic distributed systems,
  (2) ML system design (data -> features -> model -> eval -> deploy -> monitor -> retrain),
  and (3) GenAI/LLM system design (RAG, agents, multi-agent orchestration, inference
  platforms). Evaluation methodology (golden sets, LLM-as-judge, regression gates) is treated
  as a first-class part of tracks 2 and 3, not an afterthought.
- Some loops add a distinct AI-assisted coding round where I code alongside a model and am
  graded on prompt quality, verification discipline, and catching wrong model output.
- Behavioral rounds increasingly include "how do you actually use AI day-to-day" -- I should
  answer with a specific task and a specific caught error, not generic productivity claims.
- Company policy on whether AI tools are allowed varies and must be confirmed per loop --
  don't assume either way.

My situation:
- Target company/role/level: [e.g., "Senior Software Engineer, Series C startup" or
  "L5 Applied AI Engineer, big tech"]
- Timeline until my interview(s): [e.g., "18 days" / "no fixed date, actively interviewing" /
  "90 days, career-changing into AI engineering"]
- Current DSA fluency (be honest): [e.g., "solid on trees/graphs, weak on DP"]
- System design tracks I need: [classic / ML / GenAI -- name which ones apply to this role]
- AI-specific topics I already know vs don't: [e.g., "know RAG basics, never designed a
  multi-agent system, shaky on evaluation methodology"]
- Whether an AI-assisted coding round is confirmed, likely, or unknown for this loop:
  [state which, and how you'll confirm with the recruiter if unknown]

Do the following:

1. Pick the matching track -- 30-day fast loop, 60-day standard, or 90-day comprehensive --
   based on my timeline and starting point, and say which one and why.
2. Produce a week-by-week plan (table format) covering DSA, the relevant system-design
   track(s), AI-specific topics, and behavioral/mock prep, sized to my actual gaps rather than
   a generic template.
3. Give me today's concrete task: one DSA problem matched to my weakest pattern, one system
   design prompt from my relevant track(s), and one AI-usage story to draft or refine.
4. Then run a mock round with me, one at a time, in whichever order I ask for:
   - DSA mock: give me a problem, let me talk through it, and grade my narration and
     complexity analysis, not just correctness.
   - System design mock: give me a prompt from a track I named above, then mid-answer change
     one constraint (traffic 10x, a new compliance requirement, a latency cut) and grade
     whether I adapt or just restate my first answer.
   - AI-assisted-coding mock: give me a subtask, "generate" a plausible but subtly wrong
     solution, and grade whether I catch the flaw and explain it before accepting it.
   - Evaluation mock: ask me to design a golden set and judge method for a system I just
     designed, and grade whether I name a concrete regression gate.
   - Behavioral mock: ask the "how do you use AI day-to-day" question and grade whether my
     answer is specific (task + caught error + verification) or generic.
5. After each mock, score me against this rubric and tell me the single most important thing
   to fix before the next attempt:
   | Signal | Weak | Strong |
   |---|---|---|
   | DSA narration | Silent until code is done | Talks through approach/complexity/edge cases live |
   | Design-track discipline | Mixes concerns across tracks | States the track, reasons inside it |
   | AI-assisted round | Accepts model output at face value | Catches and explains a wrong suggestion |
   | Evaluation fluency | "We'd write some tests" | Names a golden set, judge method, regression gate |
   | AI-usage story | "AI makes me faster" | Specific task, specific caught error, verification step |

Keep every response scoped to what I asked for this turn -- don't dump the whole plan again
unless I ask you to regenerate it. Flag anything you are not certain reflects current company
policy as "confirm this with the recruiter" rather than stating it as fact.
```

## How to keep this current

This prompt encodes the trend summary from
[02-ai-era-interview-landscape.md](02-ai-era-interview-landscape.md), which is a **volatile**,
vendor-reported page. Re-read that page before a real loop and edit the prompt's bulleted
context if something has clearly shifted — do not let the prompt calcify into stale advice.

## What should I learn next?

[Practice drill library](05-practice-drill-library.md) · [30/60/90-day prep plan](03-prep-plan-30-60-90.md) · [The AI-era interview landscape](02-ai-era-interview-landscape.md) · [Architect / principal interviews](01-overview.md)
