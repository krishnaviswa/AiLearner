---
concept_id: experiments.overview
title: BREAK experiments
domain_folder: 43-EXPERIMENTS
levels_covered: [4]
knowledge_class: durable
tech_status: general-pattern
last_verified: 2026-09-07
primary_source: SRC-OWASP-LLM-TOP10-2026-GH
status: verified
related_nodes: [experiments, permission-aware-rag]
---

# BREAK experiments

Extra scripts that **must fail** (or fail-closed) when a control is missing. Not a second curriculum.

| Script | Attacks | Expected |
|---|---|---|
| `break_acl.py` | Retrieve with no tenant (LLM09) | Exit 0 only if the leak is **detected** |
| (in-lab) L4–L8 | Wrong tool, `SELECT *`, grant union, MRN egress | Covered in `42-.../labs/` |

```text
python 43-EXPERIMENTS/break_acl.py
```

## Security

Synthetic tenants `tenant-a` / `tenant-b` only.

## What should I learn next?

[L03](../42-CAPSTONE-PROJECTS/L03.md)
