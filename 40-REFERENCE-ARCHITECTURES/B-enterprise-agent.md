---
concept_id: refarch.b-agent
title: B — Enterprise AI agent
domain_folder: 40-REFERENCE-ARCHITECTURES
levels_covered: [1, 2]
knowledge_class: durable
tech_status: general-pattern
last_verified: 2026-09-07
primary_source: SRC-OWASP-LLM-TOP10-2026
status: verified
related_nodes: [arch-enterprise-agent, agent, tools, guardrails, hitl]
---

# B — Enterprise AI agent

A loop that **may** call tools. Distinctive risks: **excessive agency** and **tool blast radius** (OWASP LLM03). Identity is on the **runtime**, not in the system prompt (LLM08).

## Sequence

```mermaid
sequenceDiagram
  participant U as User
  participant IAM as Identity
  participant RT as Runtime
  participant Pol as Policy
  participant T as Tool
  participant H as Human
  U->>IAM: intent
  IAM->>RT: scoped session
  RT->>Pol: proposed tool + args
  Pol-->>RT: deny or allow
  alt irreversible
    RT->>H: exact action
    H-->>RT: confirm
  end
  RT->>T: invoke as principal
  T-->>RT: result
  RT-->>U: encoded output
```

Managed runtimes are **optional mappings** ([27](../27-AZURE-AI/01-overview.md), [28](../28-AWS-AI/01-overview.md)). Hosted agents are **not treated as GA**.

## When not architecture B

| Situation | Prefer |
|---|---|
| Steps are enumerated | Workflow (`SRC-MS-AGENT-FRAMEWORK`) |
| One extract / classify | Structured LLM app |
| Read-only FAQ over a corpus | Architecture A |
| Write tool with `*:*` | Do not ship |

## Failure-first

Wrong tool / loop → max steps + eval. Injection in tool output → treat tool text as LLM01. Cost explosion → quotas ([38](../38-AI-COST/01-overview.md)).

## What should I learn next?

[C](C-nl2sql.md)
