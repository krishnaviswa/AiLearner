---
concept_id: refarch.d-de
title: D — Data engineering agent
domain_folder: 40-REFERENCE-ARCHITECTURES
levels_covered: [1, 2]
knowledge_class: durable
tech_status: general-pattern
last_verified: 2026-09-07
primary_source: SRC-OWASP-LLM-TOP10-2026
status: verified
related_nodes: [arch-de-agent, data-engineering, tools, hitl]
---

# D — Data engineering agent

An agent that **looks at** pipelines (logs, DQ, lineage) and, only if you are reckless, **writes** them. Distinctive risk: **write tools against pipelines** (drop table, overwrite job, widen grant).

## Sequence

```mermaid
sequenceDiagram
  participant Ev as Orchestrator event
  participant A as Agent
  participant R as Read tools
  participant H as Human
  participant W as Write tool
  Ev->>A: job failed
  A->>R: logs, DQ, last commit
  R-->>A: evidence
  A->>H: proposed patch or rerun
  H-->>A: approve exact diff
  A->>W: apply as CI identity
```

Default: **read + propose**. Writes go through the same PR/CI path a human uses. UC functions / SQL MCP are still tools with blast radius ([30](../30-DATABRICKS-AI/01-overview.md)).

## When not architecture D

| Situation | Prefer |
|---|---|
| Test is already a dbt / GE assertion | Run the test |
| Pager rule is a threshold | Alert, no LLM |
| Agent can `DROP` / `ALTER` prod | Remove the tool |
| Unreviewed overwrite of a streaming job | HITL + dry-run |

## Failure-first

Wrong table in a write → backups and blast-radius IAM. Looping retries → max attempts. Prompt injection in a ticket title → LLM01 on the read surface.

## What should I learn next?

[E](E-multi-agent.md)
