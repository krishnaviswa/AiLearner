---
concept_id: cloud-arch.when-not
title: When not a cloud SKU dump
domain_folder: 26-AI-CLOUD-ARCHITECTURE
levels_covered: [1]
knowledge_class: durable
tech_status: general-pattern
last_verified: 2026-09-07
primary_source: SRC-MS-AGENT-FRAMEWORK
status: verified
related_nodes: [when-not-agent, identity, cost]
---

# When not to start from a SKU

| Urge | Verdict |
|---|---|
| “Pick Bedrock vs Foundry first” | **Too early** — identity, retrieve ACL, and eval first |
| Treat hosted / managed agents as the only runtime | Optional mapping; self-host a graph if you need portability |
| Price a design from memory | **UNVERIFIED** — official price page only |
| Agent for a stable 8-step job | Workflow / function (`SRC-MS-AGENT-FRAMEWORK`) |
| Full GCP/Azure/AWS feature matrix | Fake parity — map one concern at a time |

```mermaid
flowchart TD
  P[Production design] --> I{Identity and ACL exist?}
  I -->|no| Stop[Do not pick a model SKU]
  I -->|yes| W{Steps known?}
  W -->|yes| WF[Workflow]
  W -->|no| A[Agent + capability budget]
```

## What should I learn next?

[Reference architectures](../40-REFERENCE-ARCHITECTURES/01-overview.md)
