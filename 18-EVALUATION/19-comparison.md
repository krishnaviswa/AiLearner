---
concept_id: evaluation.when-not
title: When “a few chats” is not eval
domain_folder: 18-EVALUATION
levels_covered: [1]
knowledge_class: durable
tech_status: general-pattern
last_verified: 2026-09-07
primary_source: SRC-NIST-AI-RMF-LANDING
status: verified
related_nodes: [evaluation, llm-app]
---

# When not to skip a harness

| Practice | Verdict |
|---|---|
| Look at a few chats, then ship | **Not eval** — exploration only |
| Ship with no gold and no judge audit | **Not a release** for anything user-facing |
| Judge-only score as “accuracy” | Helper abused as truth |
| Gold set + fail-the-build | Minimum for a structured app |
| Gold + retrieve@k + human sample | Minimum for RAG / agents |

```mermaid
flowchart TD
  S[Want to ship] --> G{Golden cases exist?}
  G -->|no| N[Do not claim quality]
  G -->|yes| H[Run harness]
  H --> P{Regressed?}
  P -->|yes| Block[Block]
  P -->|no| Ship[Ship]
```

NIST positions the AI RMF as helping organizations **evaluate** AI systems (`SRC-NIST-AI-RMF-LANDING`). Looking at Slack threads is not that.

## When a huge benchmark registry is the wrong first step

You have no task-specific gold. A public leaderboard will not tell you if *your* ACL filter works. Start with ten labeled cases.
