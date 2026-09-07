---
concept_id: nl2sql.overview
title: NL-to-SQL — validation first
domain_folder: 15-NL2SQL
levels_covered: [1]
knowledge_class: durable
tech_status: general-pattern
last_verified: 2026-09-07
primary_source: SRC-OWASP-LLM-TOP10-2026
status: verified
related_nodes: [nl2sql, identity, guardrails]
---

# NL-to-SQL

Level 1. The demo is “English in, table out.” The engineering is **never running unvalidated SQL**.

## What is it?

A model proposes a query; a **deterministic** layer must parse, authorize, and often rewrite before any cursor opens. Distinctive risks from the canonical architecture: injection, cartesian joins, PII columns ([reference-architecture.md](../00-MASTER-MAP/reference-architecture.md) Architecture C).

## Data / cloud analogy

You already forbid string-concat SQL in apps. An LLM is a very creative concatenator.

```mermaid
flowchart LR
  Q[Question] --> M[Model]
  M --> SQL[Candidate SQL]
  SQL --> AST[Parse / AST]
  AST --> P[Policy: tables, cols, LIMIT]
  P --> X[Execute as principal]
```

## When not to use NL-to-SQL

A parameterized API or semantic layer already answers the question. Prefer that.

## Wow demos

Forbidden until the reject path is tested. See [16-hands-on.md](16-hands-on.md).

## What should I learn next?

[When not to generate SQL](19-comparison.md) · [Arch C](../40-REFERENCE-ARCHITECTURES/C-nl2sql.md) · [Eval sheet](../50-CHEAT-SHEETS/eval.md)
