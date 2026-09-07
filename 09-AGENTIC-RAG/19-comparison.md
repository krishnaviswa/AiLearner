---
concept_id: agentic-rag.when-not
title: When not to use agentic RAG
domain_folder: 09-AGENTIC-RAG
levels_covered: [1]
knowledge_class: durable
tech_status: general-pattern
last_verified: 2026-09-07
primary_source: SRC-MS-AGENT-FRAMEWORK
status: verified
related_nodes: [agentic-rag, rag, workflow]
---

# When not to use agentic RAG

| Situation | Prefer |
|---|---|
| First retrieve already has the gold chunk | Single-shot RAG |
| Query rewrite is a known template | Workflow (hyphenate SKUs, add synonyms) |
| You have not measured retrieve recall | Fix chunking / hybrid / ACL first |
| Tools can write | Do not |
| “It will just figure it out” | Function (`SRC-MS-AGENT-FRAMEWORK`) |

```mermaid
flowchart TD
  M{Measured miss rate on gold chunks?}
  M -->|no| F[Fix naive/hybrid RAG]
  M -->|yes, low| S[Stay single-shot]
  M -->|yes, high, rewrite is ad hoc| A[Consider agentic retrieve]
```

## Principal question

Is this a second **search**, or did you just invent an agent because the demo was boring?
