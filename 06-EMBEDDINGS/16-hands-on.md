---
concept_id: embeddings.hands-on
title: DO — cosine without a vendor
domain_folder: 06-EMBEDDINGS
levels_covered: [4]
knowledge_class: durable
tech_status: general-pattern
last_verified: 2026-09-07
primary_source: SRC-OPENAI-EMBEDDINGS
status: verified
related_nodes: [embeddings]
---

# DO — cosine on toy vectors

No live embed API. Prove the geometry.

```python
import math

def cosine(a, b):
    dot = sum(x * y for x, y in zip(a, b))
    na = math.sqrt(sum(x * x for x in a))
    nb = math.sqrt(sum(y * y for y in b))
    return dot / (na * nb)

q = [1.0, 0.0]
print(cosine(q, [1.0, 0.1]))
print(cosine(q, [0.0, 1.0]))
```

## Experiment

Add a third vector that is almost `q` but you would **not** be allowed to see that document. Notice the math does not know ACL. That is the whole lesson.

Vendor embed dimensions and request bodies remain **UNVERIFIED** (`SRC-OPENAI-EMBEDDINGS` timeout).
