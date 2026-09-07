---
concept_id: nl2sql.comparison
title: When not to generate SQL
domain_folder: 15-NL2SQL
levels_covered: [1]
knowledge_class: durable
tech_status: general-pattern
last_verified: 2026-09-07
primary_source: SRC-MS-AGENT-FRAMEWORK
status: verified
related_nodes: [nl2sql, workflow]
---

# When not to generate SQL

| Need | Prefer |
|---|---|
| Known report | Parameterized query / semantic layer |
| Single-row lookup by id | API |
| Write / DDL | Human + change management |
| Cross-tenant warehouse | Do not give the model a god role |

```mermaid
flowchart TD
  N[Need data] --> K{Query known?}
  K -->|yes| SQL[Checked-in SQL]
  K -->|no| S{Semantic metrics exist?}
  S -->|yes| SL[Semantic layer]
  S -->|no| NL[NL2SQL + AST + role]
```

If the “agent” only ever emits one template, it is a function (`SRC-MS-AGENT-FRAMEWORK`).
