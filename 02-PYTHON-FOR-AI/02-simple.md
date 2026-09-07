---
concept_id: python-for-ai.simple-boundary
title: Typed boundary around a model call
domain_folder: 02-PYTHON-FOR-AI
levels_covered: [1, 2]
knowledge_class: durable
tech_status: general-pattern
last_verified: 2026-09-07
primary_source: SRC-NIST-AI-600-1
status: verified
related_nodes: [llm-app, structured-output]
---

# Typed boundary (simple)

## How it works

```python
from typing import Literal
from dataclasses import dataclass

Label = Literal["refund", "shipping", "other"]

@dataclass(frozen=True)
class TicketIn:
    ticket_id: str
    text: str

@dataclass(frozen=True)
class TicketOut:
    ticket_id: str
    label: Label
```

Your job: map `TicketIn` → model → **parse** → `TicketOut`. If parse fails, do not “ask the agent to try something else” on the first lab — fail closed or retry the **same** contract.

SDK method names and client constructors are **volatile**. Do not copy a remembered `client.chat.completions.create(...)` as if it were pinned. Call whatever the current official SDK says after you re-read it.

## How it fails

| Failure | Control |
|---|---|
| Network timeout | Deadline smaller than the user’s SLA |
| Truncated JSON | Constrain output; validate; retry once |
| Prompt injection in `text` | Treat as untrusted input (`SRC-OWASP-LLM-TOP10-2026`) |
| Logging the ticket body | Default off — PII (`SRC-NIST-AI-600-1`) |

## Evaluate

Ten labeled tickets in a fixture file. Accuracy against labels — not “the model sounded sure.”
