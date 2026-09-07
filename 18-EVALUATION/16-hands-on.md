---
concept_id: evaluation.hands-on
title: DO — golden-set loop
domain_folder: 18-EVALUATION
levels_covered: [4]
knowledge_class: durable
tech_status: general-pattern
last_verified: 2026-09-07
primary_source: SRC-OPENAI-EVALS
status: verified
related_nodes: [evaluation, ground-truth]
---

# DO — a golden-set loop (no fake score)

Do not print “92%.” Print **which cases failed**.

```python
GOLD = {
    "t1": "shipping",
    "t2": "refund",
    "t3": "other",
}

def predict(case_id: str) -> str:
    # Stub the system. Replace with a real call later — SDK names UNVERIFIED here.
    return {"t1": "shipping", "t2": "refund", "t3": "refund"}[case_id]

def run() -> list[str]:
    failed = []
    for cid, want in GOLD.items():
        got = predict(cid)
        if got != want:
            failed.append(f"{cid}: got {got} want {want}")
    return failed

print(run() or "all gold passed")
```

## Experiment

1. Change gold `t3` and watch the harness catch it.
2. Add a case with no gold — the harness must **skip or fail closed**, not invent a judge score.
3. Optional later: wrap the same loop in CI ([36 light note](../36-AI-TESTING/01-overview.md)).

`openai/evals` exists if you want a registry later (`SRC-OPENAI-EVALS`). This loop is enough to fail a PR.
