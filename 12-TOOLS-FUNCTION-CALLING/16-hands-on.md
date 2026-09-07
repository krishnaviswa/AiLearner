---
concept_id: tools.hands-on
title: DO — deny by default
domain_folder: 12-TOOLS-FUNCTION-CALLING
levels_covered: [4]
knowledge_class: durable
tech_status: general-pattern
last_verified: 2026-09-07
primary_source: SRC-OWASP-LLM-TOP10-2026
status: verified
related_nodes: [tools, identity]
---

# DO — allow-list + tenant check

```python
ALLOWED = {"get_order"}

def invoke(principal_tenant: str, name: str, args: dict) -> str:
    if name not in ALLOWED:
        return "forbidden: tool"
    if args.get("tenant") != principal_tenant:
        return "forbidden: tenant"
    return f"ok:{args.get('id')}"

print(invoke("acme", "get_order", {"tenant": "acme", "id": "1"}))
print(invoke("acme", "get_order", {"tenant": "other", "id": "1"}))
print(invoke("acme", "delete_order", {"tenant": "acme", "id": "1"}))
```

The model does not get a vote on the second and third lines.
