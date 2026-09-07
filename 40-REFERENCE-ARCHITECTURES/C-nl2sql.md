---
concept_id: refarch.c-nl2sql
title: C — Agentic NL-to-SQL
domain_folder: 40-REFERENCE-ARCHITECTURES
levels_covered: [1, 2]
knowledge_class: durable
tech_status: general-pattern
last_verified: 2026-09-07
primary_source: SRC-OWASP-LLM-TOP10-2026
status: verified
related_nodes: [arch-nl2sql, nl2sql, dlp, knowledge-layer]
---

# C — Agentic NL-to-SQL

English in, **validated** SQL out. Distinctive risks: **injection**, **cartesian joins**, **PII columns**. The model never gets a raw cursor.

## Sequence

```mermaid
sequenceDiagram
  participant U as User
  participant Sem as Semantic layer
  participant M as Model
  participant V as Validator
  participant DB as Warehouse
  U->>Sem: question as principal
  Sem->>M: allowed metrics / tables
  M->>V: candidate SQL
  V->>V: parse AST, LIMIT, no SELECT *
  V->>V: column ACL / PII deny
  alt invalid
    V-->>U: refuse
  else valid
    V->>DB: execute as principal
    DB-->>U: rows or aggregate
  end
```

Databricks docs prefer Genie / ontology over freehand SQL against raw tables (`SRC-DATABRICKS-MCP`). Same idea: **semantic layer first**.

## When not architecture C

| Situation | Prefer |
|---|---|
| Repeated dashboard question | BI / scheduled SQL |
| Parameterized API already exists | Call the API |
| No column ACL | Do not expose the warehouse |
| “Wow demo” with `EXECUTE` on model text | Never |

## Failure-first

Cartesian / fan-out → cost and warehouse kill. PII column in SELECT → DLP + schema deny. Injection via comment/union → AST allowlist only.

## What should I learn next?

[D](D-data-engineering-agent.md) · [15](../15-NL2SQL/01-overview.md)
