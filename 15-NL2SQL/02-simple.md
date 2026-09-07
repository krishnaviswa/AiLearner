---
concept_id: nl2sql.simple
title: Parse then permit
domain_folder: 15-NL2SQL
levels_covered: [1, 2]
knowledge_class: durable
tech_status: general-pattern
last_verified: 2026-09-07
primary_source: SRC-OWASP-LLM-TOP10-2026
status: verified
related_nodes: [nl2sql, identity, dlp]
---

# Parse then permit (simple)

```mermaid
sequenceDiagram
  participant U as User
  participant App
  participant M as Model
  participant V as Validator
  participant DB
  U->>App: question
  App->>M: schema subset the user may see
  M-->>App: SQL text
  App->>V: parse AST
  V-->>App: allow / rewrite / deny
  alt deny
    App-->>U: refused
  else allow
    App->>DB: execute as user role
    DB-->>App: rows
    App-->>U: answer + query
  end
```

## Rules (durable)

1. Show the model only **allowed** tables/columns (do not prompt the whole warehouse).
2. Reject non-`SELECT` (or whatever your policy is) at AST, not by regex alone (regex loses).
3. Force `LIMIT`.
4. Run as the **caller’s** DB role, not a superuser.
5. Log the SQL; watch PII columns (`SRC-NIST-AI-600-1`).

Parser library choice is volatile — pick one and test it; do not invent an API here.

Improper output handling and injection sit in OWASP LLM Top 10 2026 (`SRC-OWASP-LLM-TOP10-2026`).
