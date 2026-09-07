---
concept_id: multi-agent.comparison
title: Parallel vs hierarchy vs one agent
domain_folder: 14-MULTI-AGENT-SYSTEMS
levels_covered: [1]
knowledge_class: durable
tech_status: general-pattern
last_verified: 2026-09-07
primary_source: SRC-MS-AGENT-FRAMEWORK
status: verified
related_nodes: [multi-agent, supervisor-worker]
---

# Parallel vs hierarchy vs one agent

| Pattern | Use when | Avoid when |
|---|---|---|
| One agent | Tools < ~handful, one identity | You have not measured failures |
| Supervisor / workers | Fan-out with a merge policy | Workers share write locks |
| Handoff | Clear specialty + different policy | You lose the audit trail |
| Parallel | Independent read-only tasks | Writes race |
| Hierarchy | Nested budgets (manager → team) | Depth without eval |

Microsoft: multiple agents or functions coordinating → **workflow** is often the right box (`SRC-MS-AGENT-FRAMEWORK`).

```mermaid
flowchart TD
  F{Single-agent eval failing because of...}
  F -->|too many tools| H[Handoff / specialist]
  F -->|need merge of independents| P[Parallel + reduce]
  F -->|need explicit order| W[Workflow]
  F -->|ego / org chart| X[Do not add agents]
```
