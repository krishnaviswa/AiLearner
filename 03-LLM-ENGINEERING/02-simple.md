---
concept_id: llm-engineering.simple-decode
title: Decoding and structured output
domain_folder: 03-LLM-ENGINEERING
levels_covered: [1, 2]
knowledge_class: mixed
tech_status: general-pattern
last_verified: 2026-09-07
primary_source: SRC-OPENAI-STRUCTURED-OUTPUTS
status: needs-review
related_nodes: [structured-output, llm]
---

# Decoding and structured output (simple)

## How it works

**Decoding** turns next-token probabilities into a string. Higher randomness (often called temperature) increases variety and usually increases schema breakage. For classification, you typically want **low** randomness.

**Structured output** means the application expects an object (JSON matching a schema), not an essay. Official OpenAI guide URL: `SRC-OPENAI-STRUCTURED-OUTPUTS`. **Fetch of that page timed out 2026-09-07** — do not memorize request field names from a chat model. Durable practice:

1. Publish a JSON Schema (or equivalent) as the contract.
2. Ask the vendor’s *current* constrained-decoding feature to honor it.
3. **Still validate locally** — the network can lie, models can still fail.

NIST AI 600-1 treats **confabulation** as a generative-AI risk (`SRC-NIST-AI-600-1`). A schema reduces shape errors; it does not make facts true.

```mermaid
sequenceDiagram
  participant App
  participant API as Model API
  participant Val as Local validator
  App->>API: prompt + schema constraint
  API-->>App: candidate object
  App->>Val: validate
  Val-->>App: ok or reject
```

## When to use / not

| Use structured single call | Do not |
|---|---|
| Labels, extractions, tool-args later | Open-ended research prose |
| You have a golden set | You will “just read the vibe” |

## Cost / scale

Output tokens dominate many bills. Cap max completion tokens. Exact prices: **not recorded** (Gate 7).
