---
concept_id: orchestration.hands-on
title: DO — explicit states
domain_folder: 11-AGENT-ORCHESTRATION
levels_covered: [4]
knowledge_class: durable
tech_status: general-pattern
last_verified: 2026-09-07
primary_source: SRC-LANGGRAPH-OVERVIEW
status: verified
related_nodes: [orchestration, hitl]
---

# DO — a four-state machine

```python
STATES = ("start", "await_human", "write", "done")

def step(state: str, event: str) -> str:
    if state == "start" and event == "needs_write":
        return "await_human"
    if state == "await_human" and event == "approve":
        return "write"
    if state == "await_human" and event == "reject":
        return "done"
    if state == "write" and event == "ok":
        return "done"
    raise ValueError((state, event))

s = "start"
s = step(s, "needs_write")
s = step(s, "approve")
print(step(s, "ok"))
```

No LangGraph import required. When you adopt a framework, map these names to *their* checkpoint model (`SRC-LANGGRAPH-PERSISTENCE`).
