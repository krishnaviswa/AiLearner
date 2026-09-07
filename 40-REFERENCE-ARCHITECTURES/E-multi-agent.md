---
concept_id: refarch.e-multi
title: E — Secure multi-agent platform
domain_folder: 40-REFERENCE-ARCHITECTURES
levels_covered: [1, 2]
knowledge_class: durable
tech_status: general-pattern
last_verified: 2026-09-07
primary_source: SRC-OWASP-LLM-TOP10-2026
status: verified
related_nodes: [arch-multi-agent-platform, multi-agent, identity, mcp]
---

# E — Secure multi-agent platform

Several agents, one **trust story**. Distinctive risks: **confused deputy** (agent B acts with agent A’s privileges) and **A2A trust** (who may call whom).

Foundry documents **A2A protocol (preview)** (`SRC-MS-HOSTED-AGENTS`, `SRC-MS-FOUNDRY-AGENTS`). Treat A2A as volatile. MCP still has host / client / server — the **host** owns authz ([13](../13-MCP/01-overview.md)).

## Sequence

```mermaid
sequenceDiagram
  participant U as User
  participant H as Host / supervisor
  participant A as Agent A
  participant B as Agent B
  participant T as Tool
  U->>H: task + user token
  H->>A: scoped grant A
  A->>H: handoff request
  H->>H: map grant A to grant B not union
  H->>B: scoped grant B
  B->>T: call as B not as U unless OBO
```

## When not architecture E

| Situation | Prefer |
|---|---|
| One loop is enough | Architecture B |
| Coordination is a fixed DAG | Workflow of functions / agents on rails |
| You cannot name the deputy | Do not add A2A |
| Shared service account for all agents | Do not ship |

## Failure-first

Confused deputy → per-agent identity, no grant union. Poisoned handoff text → treat as LLM01. Unreadable traces → do not add a third agent ([14](../14-MULTI-AGENT-SYSTEMS/01-overview.md)).

## What should I learn next?

[Observability](../19-OBSERVABILITY/01-overview.md) · [Ops](../39-AI-PRODUCTION-OPERATIONS/01-overview.md)
