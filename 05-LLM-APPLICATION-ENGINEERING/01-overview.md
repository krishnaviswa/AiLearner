---
concept_id: llm-app.overview
title: LLM applications that are not agents
domain_folder: 05-LLM-APPLICATION-ENGINEERING
levels_covered: [1]
knowledge_class: durable
tech_status: general-pattern
last_verified: 2026-09-07
primary_source: SRC-MS-AGENT-FRAMEWORK
status: verified
related_nodes: [llm-app, simple-llm-app, structured-output, when-not-agent]
---

# LLM applications (not agents)

Gate 2 ends here on purpose. If you can ship a **single-call app** with eval, you are ready for embeddings later — not for a tool loop.

## What is it?

An LLM application: user or job → your API → **one** model invocation (maybe a cheap router) → validated object → downstream system. No autonomous tool picker.

Microsoft Learn: if you can write a function, do that instead of an AI agent (`SRC-MS-AGENT-FRAMEWORK`).

## Data / cloud analogy

A request/response microservice that calls a translator API. You would not give that service `DROP TABLE` as a tool.

```mermaid
flowchart LR
  U[Caller + identity] --> API[Your API]
  API --> LLM[One structured call]
  LLM --> V[Validate]
  V --> DB[Store / respond]
```

## Flavors in this lab

| Flavor | Graph node | This gate |
|---|---|---|
| Simple LLM app | `simple-llm-app` | Yes |
| Structured-output app | `structured-output` | Yes |
| Tool / ReAct agent | `react-agent` | **No** — Gate 4 |

## What should I remember?

Most “AI features” should die as functions.

## What should I learn next?

[02-simple.md](02-simple.md), then Gate 3 embeddings — not agents.
