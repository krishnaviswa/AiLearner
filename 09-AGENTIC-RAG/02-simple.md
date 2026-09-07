---
concept_id: agentic-rag.simple
title: Second retrieve, same ACL
domain_folder: 09-AGENTIC-RAG
levels_covered: [1, 2]
knowledge_class: durable
tech_status: general-pattern
last_verified: 2026-09-07
primary_source: SRC-OWASP-LLM-TOP10-2026
status: verified
related_nodes: [agentic-rag, identity]
---

# Second retrieve, same ACL (simple)

## How it works

```mermaid
sequenceDiagram
  participant M as Model
  participant T as retrieve tool
  participant IAM
  M->>T: query_1
  T->>IAM: same principal
  IAM-->>T: filter
  T-->>M: hits_1
  M->>T: query_2
  T->>IAM: same principal
  T-->>M: hits_2
  M-->>M: answer or refuse
```

The tool must **not** widen ACL on retry. Max steps: 2–3 in a lab. Each hop costs tokens and leak risk.

## How it fails

| Failure | Control |
|---|---|
| Loop on empty | Cap iterations; then refuse |
| Query becomes “ignore ACLs” | Tool ignores natural-language overrides |
| Writes | No write tools in this gate |

Full tool-calling / MCP: Gate 4.
