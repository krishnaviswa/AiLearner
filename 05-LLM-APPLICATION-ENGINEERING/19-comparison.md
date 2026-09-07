---
concept_id: llm-app.comparison
title: App vs workflow vs agent
domain_folder: 05-LLM-APPLICATION-ENGINEERING
levels_covered: [1]
knowledge_class: durable
tech_status: general-pattern
last_verified: 2026-09-07
primary_source: SRC-MS-AGENT-FRAMEWORK
status: verified
related_nodes: [llm-app, workflow, agent]
---

# App vs workflow vs agent

| | LLM app | Workflow | Agent |
|---|---|---|---|
| Next step | Fixed | Fixed (may include an LLM step) | Chosen at runtime |
| Tools | Optional one API you always call | Explicit nodes | Catalog + policy |
| Eval | Golden I/O | Job tests | Trajectory + side effects |
| Default | **This gate** | When many systems already exist | Gate 4, after failure modes |

```mermaid
flowchart TD
  S[Ship a text feature] --> Q{Unknown next action?}
  Q -->|no| APP[LLM application]
  Q -->|yes| Q2{Mutating tools?}
  Q2 -->|no| APP
  Q2 -->|yes| AG[Stop — Gate 4]
```

Architect challenge: delete the agent box and list what still ships. That list is your MVP.
