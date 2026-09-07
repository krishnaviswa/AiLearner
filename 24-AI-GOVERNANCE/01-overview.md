---
concept_id: governance.overview
title: AI governance
domain_folder: 24-AI-GOVERNANCE
levels_covered: [1]
knowledge_class: durable
tech_status: general-pattern
last_verified: 2026-09-07
primary_source: SRC-NIST-AI-RMF-LANDING
status: verified
related_nodes: [governance, evaluation, security, responsible-ai]
---

# AI governance

Governance is **who decides, who is accountable, and which evidence counts** — not a slide titled “Responsible AI” and not a cloud marketplace tile.

## What is it?

NIST’s AI Risk Management Framework (AI RMF 1.0, January 2023) is **voluntary**. It exists to incorporate trustworthiness into design, development, use, and **evaluation** (`SRC-NIST-AI-RMF-LANDING`, `SRC-NIST-AI-RMF-100-1`, re-fetched 2026-09-07).

Four functions (same names as previously registered; this fetch did not reprint every subcategory):

| Function | Engineer translation |
|---|---|
| **Govern** | Policies, roles, inventory, incident process |
| **Map** | Context, intended use, who is harmed if it fails |
| **Measure** | Eval harness, metrics, red team — [Gate 5](../18-EVALUATION/01-overview.md) |
| **Manage** | Prioritize residual risk, change control, kill switches |

**Volatile:** the NIST landing page states AI RMF 1.0 **is being revised** (as of 2026-09-07). Do not treat 1.0 subcategory text as frozen. Function names remain the map.

## Data / cloud analogy

Data governance: stewards, classification, retention, and a change board. AI governance adds **behavior** (confabulation, agency) to the same inventory problem.

```mermaid
flowchart LR
  GV[Govern] --> MP[Map]
  MP --> MS[Measure]
  MS --> MG[Manage]
  MG --> GV
```

## Generative profile, not a product

NIST AI 600-1 (26 July 2024) is a **cross-sectoral profile** of the RMF for generative AI. It defines risks unique to or exacerbated by GAI and suggests actions tagged GV / MP / MS / MG (`SRC-NIST-AI-600-1`, PDF read 2026-09-07). It is not an Azure/AWS feature list.

## What should I remember?

If you cannot name the owner of residual risk and the gold set that would fail a release, you have branding, not governance.

## What should I learn next?

[03-logical.md](03-logical.md) · [19-comparison.md](19-comparison.md)
