---
concept_id: ai-data.lakehouse-to-index
title: Lakehouse → knowledge index (light note)
domain_folder: 16-AI-DATA-ENGINEERING
levels_covered: [1]
knowledge_class: durable
tech_status: general-pattern
last_verified: 2026-09-07
primary_source: SRC-DATABRICKS-AI-SEARCH
status: verified
related_nodes: [data-engineering, knowledge-layer, rag]
---

# Lakehouse → index (Gate 3 light note)

Not the full data-engineering domain. Only the **connective tissue** for RAG.

Source of record (tables, files, UC objects) → quality + **ACL columns** → document/chunk grain → embed → index that **reuses those grants**. Databricks AI Search is one governed retrieval sketch (`SRC-DATABRICKS-AI-SEARCH`).

```mermaid
flowchart LR
  T[Curated table] --> ACL[Grants / tags]
  ACL --> CH[Chunks]
  CH --> IDX[Search / vector index]
```

Do not build a second permission system in the index that disagrees with the lakehouse.

Full pipeline curriculum waits for later gates.

## What should I learn next?

[Index freshness](../17-LLM-DATA-PIPELINES/01-overview.md) · [Permission-aware RAG](../08-RAG/19-comparison.md)
