---
concept_id: llm-engineering.comparison
title: Free text vs structured vs agent
domain_folder: 03-LLM-ENGINEERING
levels_covered: [1]
knowledge_class: durable
tech_status: general-pattern
last_verified: 2026-09-07
primary_source: SRC-MS-AGENT-FRAMEWORK
status: verified
related_nodes: [llm-app, agent, structured-output]
---

# Comparison

| Mode | Output | Control | Default? |
|---|---|---|---|
| Free text | Prose | Weak | Demos only |
| Structured call | Object | Schema + tests | **Yes** for apps |
| Tool-calling agent | Side effects | Authz, HITL, eval | Only if steps unknown |

```mermaid
flowchart TD
  Need[Need a decision from text] --> Q1{Known API or step sequence?}
  Q1 -->|no| S[Structured LLM call]
  Q1 -->|yes, fixed| W[Workflow]
  Q1 -->|yes, but order is unknown| A[Agent later]
```

If the “tools” list has one function you always call, you wanted a workflow (`SRC-MS-AGENT-FRAMEWORK`).
