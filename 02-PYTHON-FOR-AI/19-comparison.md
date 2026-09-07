---
concept_id: python-for-ai.comparison
title: Notebook vs service vs agent wrapper
domain_folder: 02-PYTHON-FOR-AI
levels_covered: [1]
knowledge_class: durable
tech_status: general-pattern
last_verified: 2026-09-07
primary_source: SRC-MS-AGENT-FRAMEWORK
status: verified
related_nodes: [when-not-agent, llm-app]
---

# Comparison

| Shape | Use when | Do not use when |
|---|---|---|
| Notebook | Exploration, token experiments (`SRC-TIKTOKEN`) | Serving customers |
| CLI / batch job | Backfill, eval harness | Interactive tool-picking |
| Sync/async service | One structured call, SLA, authn | You have not validated output |
| Agent runtime | Unknown next tool, after Gate 4 | The next call is already `classify()` |

```mermaid
flowchart TD
  A[Need model I/O] --> B{Is the next Python call known?}
  B -->|yes| C[Service or job]
  B -->|no| D{Are tools required?}
  D -->|no| C
  D -->|yes| E[Defer to Gate 4 — agent + authz]
```

## Principal question

Why is there a `tools=` array on a function that only ever calls one endpoint?
