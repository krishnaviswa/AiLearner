---
concept_id: llm-app.hands-on
title: DO — score one call against gold
domain_folder: 05-LLM-APPLICATION-ENGINEERING
levels_covered: [4]
knowledge_class: durable
tech_status: general-pattern
last_verified: 2026-09-07
primary_source: SRC-NIST-AI-600-1
status: verified
related_nodes: [evaluation, llm-app]
---

# DO — a six-line eval harness

You may stub the model. The point is the **harness**, not a demo.

```python
GOLD = {"t1": "shipping", "t2": "refund"}

def accuracy(pred: dict[str, str]) -> float:
    ok = sum(pred[k] == v for k, v in GOLD.items())
    return ok / len(GOLD)

# Pretend model outputs (replace with a real call later — SDK names UNVERIFIED here)
pred = {"t1": "shipping", "t2": "other"}
print(accuracy(pred))  # 0.5
```

## Experiment

1. Add a third gold case.
2. Refuse to compute accuracy if a prediction key is missing.
3. Do **not** add an LLM-as-judge yet (Gate 5). Confabulation risk stays labeled (`SRC-NIST-AI-600-1`).

## What can go wrong?

Optimizing the prompt on the same three rows you report as “prod accuracy.”
