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
flowchart LR
  Need[Need a decision from text] --> S[Structured LLM call]
  Need2[Need a known API] --> W[Workflow]
  Need3[Need unknown tool sequence] --> A[Agent later]
```

If the “tools” list has one function you always call, you wanted a workflow (`SRC-MS-AGENT-FRAMEWORK`).
