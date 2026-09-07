---
concept_id: multi-agent.hands-on
title: DO — route, do not debate
domain_folder: 14-MULTI-AGENT-SYSTEMS
levels_covered: [4]
knowledge_class: durable
tech_status: general-pattern
last_verified: 2026-09-07
primary_source: SRC-OPENAI-AGENTS-SDK
status: verified
related_nodes: [router-agent, handoff]
---

# DO — a deterministic router

```python
def route(intent: str) -> str:
    return {"refund": "billing", "outage": "ops"}.get(intent, "refuse")

assert route("refund") == "billing"
assert route("hack") == "refuse"
```

If this table is stable, you do not need a supervisor agent to pick the specialist (`SRC-MS-AGENT-FRAMEWORK`). Handoffs belong when the **conversation** should move; a dict is enough when the **intent** is already classified.
