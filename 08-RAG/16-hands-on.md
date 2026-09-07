---
concept_id: rag.hands-on
title: DO — refuse without evidence
domain_folder: 08-RAG
levels_covered: [4]
knowledge_class: durable
tech_status: general-pattern
last_verified: 2026-09-07
primary_source: SRC-NIST-AI-600-1
status: verified
related_nodes: [rag, evaluation]
---

# DO — assemble context or refuse

```python
def answer(question: str, hits: list[dict], min_score: float = 0.4) -> str:
    kept = [h for h in hits if h["score"] >= min_score]
    if not kept:
        return "REFUSE: no evidence"
    cites = ", ".join(h["id"] for h in kept)
    return f"(cite {cites}) <model would only use these texts>"

print(answer("x", [{"id": "c1", "score": 0.2}]))
print(answer("x", [{"id": "c1", "score": 0.9}]))
```

## Experiment

1. Lower `min_score` until you always “answer.” That is how demos ship confabulation (`SRC-NIST-AI-600-1`).
2. Add a hit from `tenant=other`. Drop it **before** the string goes to a model.

No vendor SDK. Wire-up later; this is the control.
