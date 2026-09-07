---
concept_id: agents.hands-on
title: DO — cap turns
domain_folder: 10-AGENTS
levels_covered: [4]
knowledge_class: durable
tech_status: general-pattern
last_verified: 2026-09-07
primary_source: SRC-OWASP-LLM-TOP10-2026
status: verified
related_nodes: [agent, evaluation]
---

# DO — a loop with a budget

```python
MAX_TURNS = 3
TOOLS = {"get_status"}  # allow-list

def run(actions: list[str]) -> str:
    for i, name in enumerate(actions, start=1):
        if i > MAX_TURNS:
            return "STOP: turn budget"
        if name not in TOOLS:
            return f"REFUSE: {name}"
        print("invoke", name)
    return "done"

print(run(["get_status", "get_status", "drop_table", "get_status"]))
```

## Experiment

`drop_table` must never run. That is excessive-agency control (`SRC-OWASP-LLM-TOP10-2026`). No vendor SDK.
