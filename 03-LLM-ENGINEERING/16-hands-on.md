---
concept_id: llm-engineering.hands-on
title: DO — schema reject without a vendor
domain_folder: 03-LLM-ENGINEERING
levels_covered: [4]
knowledge_class: durable
tech_status: general-pattern
last_verified: 2026-09-07
primary_source: SRC-OPENAI-STRUCTURED-OUTPUTS
status: verified
related_nodes: [structured-output, evaluation]
---

# DO — treat the model as an untrusted serializer

You do not need a live API to practice the control that matters.

```python
import json

SCHEMA_KEYS = {"intent", "confidence"}

def accept(payload: str) -> dict:
    obj = json.loads(payload)
    if set(obj) != SCHEMA_KEYS:
        raise ValueError("keys")
    if not isinstance(obj["confidence"], (int, float)) or not 0 <= obj["confidence"] <= 1:
        raise ValueError("confidence")
    if obj["intent"] not in {"buy", "cancel", "unknown"}:
        raise ValueError("intent")
    return obj
```

## Experiment

Reject: missing key, extra key, confidence `1.7`, intent `rm -rf`. That last one is how “structured” still needs an allow-list.

Wire-format of a specific vendor’s structured-output API remains **UNVERIFIED** until `SRC-OPENAI-STRUCTURED-OUTPUTS` is successfully re-fetched.
