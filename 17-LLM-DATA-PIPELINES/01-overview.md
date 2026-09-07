---
concept_id: llm-pipelines.index-refresh
title: Refreshing an index (light note)
domain_folder: 17-LLM-DATA-PIPELINES
levels_covered: [1]
knowledge_class: durable
tech_status: general-pattern
last_verified: 2026-09-07
primary_source: SRC-DATABRICKS-AI-SEARCH
status: verified
related_nodes: [rag, data-engineering]
---

# Batch / CDC / stream → index (Gate 3 light note)

RAG dies when the index is stale. Choose an update path like any serving table:

| Mode | When |
|---|---|
| Batch | Daily docs, acceptable lag |
| CDC / incremental | Row-level source already CDC |
| Stream | Notifications that must appear in minutes |

```mermaid
flowchart LR
  SRC[Source change] --> J[Job]
  J --> E[Re-embed changed ids]
  E --> I[Upsert / delete in index]
```

Delete is part of the contract (forgotten doc, revoked ACL). This is not a streaming product catalog — implement in later gates.

## What should I learn next?

[RAG comparison](../08-RAG/19-comparison.md) · [Ops](../39-AI-PRODUCTION-OPERATIONS/01-overview.md)
