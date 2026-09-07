# Hybrid knowledge architecture (local / LLM / web)

Gate 0 item 12. Encoded for agents in `.cursor/rules/ai-lab-hybrid-knowledge.mdc`.

## Problem

Calling an LLM for every question is expensive, stale, and trains the lab to be a chat wrapper instead of a knowledge system.

## Four layers

```text
User question
  → Layer 1 Baked knowledge (Markdown, HTML, JSON, YAML, diagrams, code)
      → if insufficient
  → Layer 2 Local retrieval (this repo)
      → if reasoning/generation still needed
  → Layer 3 LLM (adaptive explanation, critique, code, exercises)
      → if the fact is volatile
  → Layer 4 Current web research (official docs)
      → merge: local durable + verified current → answer
```

## What lives in Layer 1 (durable)

- Definitions and “why it exists”
- Architect bridges
- Failure-mode catalogs
- Decision criteria (not this week’s SKU)
- Evaluation methodology
- Threat classes (mapped to OWASP/NIST **editions**, with dates)

## What must stay volatile (Layer 4)

SDK methods, model names, cloud product capabilities, pricing, preview/GA flags, deprecations.

## Cursor/agent realization (now)

This lab is used inside Cursor. “Local retrieval” means: read `00-MASTER-MAP/`, `99-META/`, then the domain folder. Do not browse the web to redefine “what is an embedding.” Do browse official docs before stating that hosted agents are GA (they were **preview** on 2026-09-07 per `SRC-MS-HOSTED-AGENTS`).

## Future learner-app realization (Gate 9+)

Optional on-device search over Markdown (for example a static index JSON). LLM optional. Never required for reading Gate 0–2 pages.

## Token budget rules for authors

- Edit the page; do not regenerate the domain.
- One concept → few files with content, not 21 empty shells.
- Cite `source_id` instead of pasting large doc dumps.
