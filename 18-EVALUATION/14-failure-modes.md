---
concept_id: evaluation.failure-modes
title: How evaluation fails
domain_folder: 18-EVALUATION
levels_covered: [1, 2]
knowledge_class: durable
tech_status: general-pattern
last_verified: 2026-09-07
primary_source: SRC-NIST-AI-600-1
status: verified
related_nodes: [evaluation, llm-judge]
---

# How evaluation fails

| Failure | What happens | Control |
|---|---|---|
| Contamination | Gold items sat in the prompt, fine-tune, or few-shot | Hold out; hash cases; rotate |
| Circular judging | Judge model is the same family/prompt as the system | Gold for a slice; blind human audit |
| Metric gaming | Optimize the number, not the user | Multiple metrics; hidden holdout |
| Stale gold | Product changed, labels did not | Review cadence |
| Anecdote eval | Three chats decide a release | Harness or no ship ([19](19-comparison.md)) |
| Logging gold with PII | Eval store becomes a leak | Minimize; access control (`SRC-NIST-AI-600-1`) |

```mermaid
flowchart TD
  E[Eval number went up] --> Q{Holdout still good?}
  Q -->|no| G[Gaming / leak]
  Q -->|yes| H{Human sample agrees?}
  H -->|no| C[Circular judge]
  H -->|yes| S[Credible signal]
```

A rising score without a holdout is not evidence.
