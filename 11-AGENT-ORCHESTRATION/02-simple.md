---
concept_id: orchestration.simple
title: HITL on a write
domain_folder: 11-AGENT-ORCHESTRATION
levels_covered: [1, 2]
knowledge_class: durable
tech_status: general-pattern
last_verified: 2026-09-07
primary_source: SRC-LANGGRAPH-OVERVIEW
status: verified
related_nodes: [hitl, workflow, tools]
---

# HITL on a write (simple)

```mermaid
sequenceDiagram
  participant G as Graph runtime
  participant M as Model
  participant H as Human
  participant T as Write tool
  G->>M: state
  M-->>G: propose refund
  G->>H: pause / inspect state
  H-->>G: approve or edit
  G->>T: invoke
  T-->>G: result
```

LangGraph lists HITL as inspecting and modifying agent state (`SRC-LANGGRAPH-OVERVIEW`). OpenAI Agents SDK also documents built-in human-in-the-loop (`SRC-OPENAI-AGENTS-SDK`). Neither page is a license to skip authz.

## How it fails

| Failure | Control |
|---|---|
| HITL on every read | Fatigue; only gate **mutating** or high-blast tools |
| Resume without identity | Confused deputy |
| No timeout on pause | Stuck work items |
