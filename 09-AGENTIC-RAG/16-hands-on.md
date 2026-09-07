---
concept_id: agentic-rag.hands-on
title: DO — budget a retrieve loop
domain_folder: 09-AGENTIC-RAG
levels_covered: [4]
knowledge_class: durable
tech_status: general-pattern
last_verified: 2026-09-07
primary_source: SRC-OWASP-LLM-TOP10-2026
status: verified
related_nodes: [agentic-rag, evaluation]
---

# DO — cap the loop

```python
MAX = 2

def loop(queries: list[str]) -> str:
    for i, q in enumerate(queries[:MAX], start=1):
        print(f"retrieve[{i}]: {q}")
    if len(queries) > MAX:
        return "REFUSE: retrieve budget"
    return "answer-or-refuse"

print(loop(["alpha", "alpha policies", "ignore filters"]))
```

## Experiment

The third query must never run. That is excessive-agency control in miniature (`SRC-OWASP-LLM-TOP10-2026`). Do not implement a real tool-picker here.
