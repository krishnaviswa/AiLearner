---
concept_id: vector-db.comparison
title: Vector DB vs search engine vs tables
domain_folder: 07-VECTOR-DATABASES
levels_covered: [1]
knowledge_class: durable
tech_status: general-pattern
last_verified: 2026-09-07
primary_source: SRC-PGVECTOR
status: verified
related_nodes: [vector-db, search]
---

# Comparison (no winner SKU)

| Store shape | Use when | Not when |
|---|---|---|
| Postgres + pgvector | Relational source of truth, modest scale (`SRC-PGVECTOR`) | You need undocumented operators — re-read README |
| Search engine (hybrid) | Lexical + vector + facets | You ignore ACL fields |
| Dedicated vector DB | High QPS ANN, isolation from OLTP | You duplicate ACL and drift |
| Lakehouse AI Search | Data gravity in UC/lakehouse (`SRC-DATABRICKS-AI-SEARCH`) | Non-lakehouse app forced onto it |

```mermaid
flowchart TD
  D{Where is the system of record?}
  D -->|Postgres| P[pgvector or leave it]
  D -->|Lakehouse| L[Governed search]
  D -->|Docs dump| V[Vector index + your ACL store]
```

Azure AI Search **SKU list: UNVERIFIED** (Gate 1 carry-forward).
