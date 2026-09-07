---
concept_id: prompt-engineering.overview
title: Prompt engineering as a contract
domain_folder: 04-PROMPT-ENGINEERING
levels_covered: [1]
knowledge_class: durable
tech_status: general-pattern
last_verified: 2026-09-07
primary_source: SRC-NIST-AI-600-1
status: verified
related_nodes: [prompt, llm-app, evaluation]
---

# Prompt engineering

Not folklore. A **prompt is a specification** that must be versioned, tested, and owned like an API schema.

## What is it?

You write the contract: role, inputs, output shape, refusals, and examples. You measure whether the contract holds. “Magic phrases” without eval are not engineering.

## Data / cloud analogy

An OpenAPI spec plus contract tests. Changing the prompt is a **breaking change** if callers depend on field names.

```mermaid
flowchart TB
  Spec[Prompt spec + schema] --> Ver[Version id]
  Ver --> Run[Model call]
  Run --> Eval[Golden set]
  Eval --> Ship{Ship?}
  Ship -->|no| Spec
```

## Why it exists

The model is trained to continue text. Without a spec you get a chat. With a spec you get an interface. Confabulation remains a risk even with a good spec (`SRC-NIST-AI-600-1`).

## When not to use an agent

If the prompt is “decide which of these five APIs to call,” you may want tools later. If the prompt is “extract these fields,” you want **one call** and tests.

## What should I remember?

Prompts are artifacts. No eval, no change.

## What should I learn next?

[02-simple.md](02-simple.md)
