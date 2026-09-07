---
concept_id: dlp.when-not
title: When an LLM is not DLP
domain_folder: 23-PHI-PII-DLP
levels_covered: [1]
knowledge_class: durable
tech_status: general-pattern
last_verified: 2026-09-07
primary_source: SRC-PRESIDIO
status: verified
related_nodes: [dlp, llm-judge, guardrails]
---

# When not to treat a classifier as DLP

| Practice | Verdict |
|---|---|
| LLM labels “PII / not PII” then you ship | **Not DLP** — helper only |
| Regex + NER + policy at each sink | Minimum engineering control |
| Vendor PII filter, no IAM on tools | Incomplete — egress still possible via tools |
| Embeddings of PHI in a shared index | Treat as source-data exposure (LLM09) |
| Gold-set of synthetic leaks in the harness | How you **evaluate** DLP |

```mermaid
flowchart TD
  T[Text leaving a sink] --> R{Regex / NER / allowlist}
  R -->|hit| Block[Block or redact]
  R -->|miss| H{Optional LLM hint}
  H -->|flag| Review[Human or second deterministic pass]
  H -->|clean| Out[Release]
```

Same pattern as evaluation: an LLM-as-judge is a helper; gold is truth ([18](../18-EVALUATION/02-simple.md)).

## When not to index

You cannot enforce row-level ACL on retrieve. Then do not embed the PHI corpus. Use a deterministic API that already knows the caller.

## What should I learn next?

[Governance](../24-AI-GOVERNANCE/01-overview.md)
