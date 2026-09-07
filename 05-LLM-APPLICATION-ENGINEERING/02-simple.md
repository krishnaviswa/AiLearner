---
concept_id: llm-app.simple
title: A structured classification service
domain_folder: 05-LLM-APPLICATION-ENGINEERING
levels_covered: [1, 2]
knowledge_class: durable
tech_status: general-pattern
last_verified: 2026-09-07
primary_source: SRC-NIST-AI-600-1
status: verified
related_nodes: [llm-app, evaluation, identity]
---

# Structured classification service (simple)

## How it works

1. Authenticate the caller (same as any API).
2. Bound the input size (token budget — `SRC-TIKTOKEN`).
3. Call the model once with a schema.
4. Validate; on failure return 422, not a second “creative” hop.
5. Write an audit row: `request_id`, `prompt_version`, `model_id`, token counts. Omit raw customer text unless policy allows (`SRC-NIST-AI-600-1`).

```mermaid
sequenceDiagram
  participant C as Caller
  participant API
  participant M as Model
  participant E as Eval store
  C->>API: POST /classify
  API->>M: one call
  M-->>API: object
  API->>API: validate
  API-->>C: 200 or 422
  API->>E: metrics
```

## Toy vs production-oriented

| Toy | Production-oriented |
|---|---|
| Notebook + printed JSON | Versioned prompt, golden set, timeouts |
| Shared API key in chat | Per-workload identity |
| No eval | Nightly fixture run |

## When NOT to use an agent

The path is known. Adding tools “for flexibility” is how you get excessive agency (`SRC-OWASP-LLM-TOP10-2026`).
