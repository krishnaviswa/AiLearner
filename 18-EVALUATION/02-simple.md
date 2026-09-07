---
concept_id: evaluation.ground-truth-vs-judge
title: Ground truth vs LLM-as-judge
domain_folder: 18-EVALUATION
levels_covered: [1, 2]
knowledge_class: durable
tech_status: general-pattern
last_verified: 2026-09-07
primary_source: SRC-NIST-AI-600-1
status: verified
related_nodes: [ground-truth, llm-judge, evaluation]
---

# Ground truth vs LLM-as-judge

| | Ground truth | LLM-as-judge |
|---|---|---|
| What it is | Human-agreed labels / gold SQL / gold chunk ids | Another model scores or ranks outputs |
| Role | **Source of truth** for the task | **Helper** when labels are scarce |
| Failure | Label error, stale gold | Judge shares the system’s biases; circular if judge ≈ system |
| Use | Classification, retrieve@k, exact extract | Rubrics for open prose — always sample-audited |

```mermaid
flowchart TD
  C[Case] --> S[System]
  S --> O[Output]
  O --> G{Gold exists?}
  G -->|yes| M[Metric vs gold]
  G -->|no| J[Judge helper]
  J --> A[Human audit sample]
  M --> D[Ship decision]
  A --> D
```

NIST generative-AI profile treats confabulation as a risk (`SRC-NIST-AI-600-1`). A judge model can confabulate a “pass.”

Do **not** report a judge score as production accuracy. Do not invent percentages here.

OpenAI Agents SDK mentions evaluation in the tracing/eval suite (`SRC-OPENAI-AGENTS-SDK`) — that is vendor tooling, not a substitute for gold.
