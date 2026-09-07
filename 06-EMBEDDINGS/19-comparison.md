---
concept_id: embeddings.when-not
title: When not to embed
domain_folder: 06-EMBEDDINGS
levels_covered: [1]
knowledge_class: durable
tech_status: general-pattern
last_verified: 2026-09-07
primary_source: SRC-OWASP-LLM-TOP10-2026
status: verified
related_nodes: [embeddings, search]
---

# When not to embed

| Need | Prefer | Not embeddings |
|---|---|---|
| Primary key / order id | SQL / API | Fuzzy neighbors invent the wrong row |
| Regulated exact match | Deterministic lookup | Similarity is not evidence |
| Fast-changing facts | Fresh store + retrieve, or don’t cache | Stale vectors |
| Tiny closed vocab | Enum / classifier | Overkill |

```mermaid
flowchart TD
  Q{Is the answer a known key?}
  Q -->|yes| SQL[SQL / API]
  Q -->|no| P{Must neighbors respect ACL?}
  P -->|yes| E[Embed + filter]
  P -->|no| Toy[Toy demo only]
```

Do not treat embedding similarity as a permission check (`SRC-OWASP-LLM-TOP10-2026` vector/embedding weaknesses).
