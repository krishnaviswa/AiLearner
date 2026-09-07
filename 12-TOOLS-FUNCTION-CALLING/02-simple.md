---
concept_id: tools.simple
title: One tool call
domain_folder: 12-TOOLS-FUNCTION-CALLING
levels_covered: [1, 2]
knowledge_class: durable
tech_status: general-pattern
last_verified: 2026-09-07
primary_source: SRC-OWASP-LLM-TOP10-2026
status: verified
related_nodes: [tools, identity]
---

# One tool call (sequence)

```mermaid
sequenceDiagram
  participant M as Model
  participant RT as Runtime
  participant IAM
  participant API
  M->>RT: get_order(id)
  RT->>IAM: may caller read this id?
  IAM-->>RT: allow / deny
  alt deny
    RT-->>M: error: forbidden
  else allow
    RT->>API: GET /orders/id
    API-->>RT: json
    RT-->>M: observation (redacted)
  end
```

## How it fails

| Failure | Control |
|---|---|
| Model invents `id` of another tenant | Authz uses **caller**, not model text |
| Timeout | Deadline; circuit breaker |
| Tool returns PII | Redact before re-prompt (`SRC-NIST-AI-600-1`) |
| Injection in observation | Untrusted content (`SRC-OWASP-LLM-TOP10-2026`) |

SDK method names are volatile — do not copy a remembered client call as pinned truth.
