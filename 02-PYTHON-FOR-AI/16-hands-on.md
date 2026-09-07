---
concept_id: python-for-ai.hands-on
title: DO — validate JSON before you trust it
domain_folder: 02-PYTHON-FOR-AI
levels_covered: [4]
knowledge_class: durable
tech_status: general-pattern
last_verified: 2026-09-07
primary_source: SRC-NIST-AI-600-1
status: verified
related_nodes: [structured-output, evaluation]
---

# DO — fail closed on bad JSON

Tiny lab: no vendor SDK required.

```python
import json
from typing import Any

ALLOWED = {"refund", "shipping", "other"}

def parse_label(raw: str) -> str:
    data: Any = json.loads(raw)
    if not isinstance(data, dict) or data.get("label") not in ALLOWED:
        raise ValueError("schema")
    return data["label"]

if __name__ == "__main__":
    print(parse_label('{"label": "refund"}'))
    try:
        parse_label('{"label": "drop_table"}')
    except ValueError:
        print("refused")
```

## Experiment

Feed the parser: trailing commas, a list, a markdown fence, a plausible wrong label. Those are **production** failure modes, not jokes.

## What can go wrong?

`json.loads` succeeding on `{"label": "refund", "extra": "exfil"}` — decide whether extra keys are allowed.
