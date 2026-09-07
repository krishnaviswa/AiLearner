---
concept_id: nl2sql.hands-on
title: DO — refuse DDL
domain_folder: 15-NL2SQL
levels_covered: [4]
knowledge_class: durable
tech_status: general-pattern
last_verified: 2026-09-07
primary_source: SRC-OWASP-LLM-TOP10-2026
status: verified
related_nodes: [nl2sql, guardrails]
---

# DO — reject before execute

Toy parser (not a production AST). The **habit** is the lesson.

```python
BLOCK = ("drop", "delete", "update", "insert", "alter", "truncate", "merge")

def permit(sql: str) -> bool:
    head = sql.strip().lower()
    if not head.startswith("select"):
        return False
    return not any(f" {b} " in f" {head} " for b in BLOCK)

assert permit("SELECT id FROM orders LIMIT 10")
assert not permit("DROP TABLE orders")
assert not permit("SELECT * FROM orders; DROP TABLE orders")
```

## Experiment

Add a comment-smuggled `drop`. Notice the toy check is weak — that is why this page says **AST**, not regex, in production. Do not run a wow demo until this test exists.

No live warehouse in this lab.
