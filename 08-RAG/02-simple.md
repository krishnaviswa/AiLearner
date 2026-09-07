---
concept_id: rag.simple
title: Naive RAG request
domain_folder: 08-RAG
levels_covered: [1, 2]
knowledge_class: durable
tech_status: general-pattern
last_verified: 2026-09-07
primary_source: SRC-NIST-AI-600-1
status: verified
related_nodes: [rag, chunking, evaluation]
---

# Naive RAG (simple)

## How it works

```mermaid
sequenceDiagram
  participant U as User
  participant App
  participant Idx as Index
  participant LLM
  U->>App: question
  App->>Idx: embed + topK
  Idx-->>App: chunks
  App->>LLM: question + chunks
  LLM-->>App: prose
  App-->>U: prose
```

This is the **toy**. It teaches the hop. It is not enterprise RAG.

## How it fails (must learn before agentic RAG)

| Failure | What happens |
|---|---|
| Bad chunking | Split in the middle of a policy; retrieve half a sentence |
| Wrong top-K | Miss the gold chunk; model confabulates (`SRC-NIST-AI-600-1`) |
| No ACL | Tenant B’s chunk in Tenant A’s prompt (`SRC-OWASP-LLM-TOP10-2026`) |
| No cite / refuse | Fluent fiction |
| Stale index | Correct retrieve of last quarter’s number |

## Evaluate

Gold questions with **gold chunk ids**. Score retrieve separately from generate.
