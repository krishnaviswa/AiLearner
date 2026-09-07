---
concept_id: vector-db.hands-on
title: DO — ACL before top-K
domain_folder: 07-VECTOR-DATABASES
levels_covered: [4]
knowledge_class: durable
tech_status: general-pattern
last_verified: 2026-09-07
primary_source: SRC-OWASP-LLM-TOP10-2026
status: verified
related_nodes: [identity, rag]
---

# DO — prove post-filters lie

Toy corpus: three chunks, two tenants.

```python
CHUNKS = [
    {"id": "a", "tenant": "t1", "score": 0.99, "text": "t1 secret"},
    {"id": "b", "tenant": "t2", "score": 0.98, "text": "t2 secret"},
    {"id": "c", "tenant": "t1", "score": 0.50, "text": "t1 public"},
]

def naive_topk(k=2):
    return sorted(CHUNKS, key=lambda x: -x["score"])[:k]

def filtered(principal_tenant, k=2):
    allowed = [c for c in CHUNKS if c["tenant"] == principal_tenant]
    return sorted(allowed, key=lambda x: -x["score"])[:k]

print("naive", [c["id"] for c in naive_topk()])
print("t1", [c["id"] for c in filtered("t1")])
```

Naive top-2 for a `t1` user still *saw* `t2 secret` in the ranked list. If you “filter after the LLM,” the model already read it. That is an embedding/retrieval weakness pattern (`SRC-OWASP-LLM-TOP10-2026`).
