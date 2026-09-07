---
concept_id: llm-engineering.overview
title: LLM engineering
domain_folder: 03-LLM-ENGINEERING
levels_covered: [1]
knowledge_class: mixed
tech_status: general-pattern
last_verified: 2026-09-07
primary_source: SRC-TIKTOKEN
status: verified
related_nodes: [llm, model-router, structured-output]
---

# LLM engineering

Level 1. The model is a **component** with knobs: context, decoding, routing, output shape. It is not a coworker.

## What is it?

**LLM engineering** is choosing and operating that component: which model family, how much context you spend, how greedy or random decoding is, whether output is free text or a schema, and how you route easy vs hard traffic.

## Data / cloud analogy

A query engine: you pick warehouse size, max scan, and result format. You do not let the engine invent extra tables. Routing cheap/small vs large models is like a query governor.

```mermaid
flowchart TB
  Req[Request] --> R[Model router]
  R --> S[Small / cheap model]
  R --> L[Large / capable model]
  S --> D[Decoding + max tokens]
  L --> D
  D --> V[Validate / refuse]
```

## Durable vs volatile

| Durable | Volatile |
|---|---|
| Tokens, context budget, validate output | Model names, context sizes, SKUs |
| Temperature-style randomness exists | Exact parameter names and defaults |
| Routing by difficulty / risk | Vendor “router” product names |

Context-window sizes and current model IDs are **UNVERIFIED** here on purpose — they churn. Re-read official model cards at implement time.

## When not to use an agent

Routing between two **single calls** is still an application. A router agent that also wields write-tools is Gate 4.

## What should I remember?

Spend context like money. Decode like a risk control. Route like a load balancer.

## What should I learn next?

[02-simple.md](02-simple.md)
