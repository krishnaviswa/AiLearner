---
concept_id: prompt-engineering.comparison
title: Prompt vs fine-tune vs RAG vs agent
domain_folder: 04-PROMPT-ENGINEERING
levels_covered: [1]
knowledge_class: durable
tech_status: general-pattern
last_verified: 2026-09-07
primary_source: SRC-MS-AGENT-FRAMEWORK
status: verified
related_nodes: [prompt, rag, agent]
---

# Comparison (stubs, no bake-off)

| Need | First try | Not first |
|---|---|---|
| Change tone / fields | Prompt + schema | Fine-tune |
| Facts that change weekly | Retrieval (Gate 3) | Stuffing the prompt forever |
| Known procedure | Code / workflow | Agent (`SRC-MS-AGENT-FRAMEWORK`) |
| Unknown tool sequence | Agent (Gate 4) | A longer prompt |

```mermaid
flowchart TD
  F{Do facts change?}
  F -->|yes| R[RAG later]
  F -->|no| P{Is the procedure known?}
  P -->|yes| C[Code + optional structured LLM]
  P -->|no| A[Agent later]
```

Do not invent a vendor “prompt OS” SKU. Fine-tune vs RAG criteria stay in [technology-decision-stubs.md](../00-MASTER-MAP/technology-decision-stubs.md) (`D-RAG-FT`).
