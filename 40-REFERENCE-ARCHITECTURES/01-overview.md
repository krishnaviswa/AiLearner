---
concept_id: refarch.index
title: Reference architectures A–E
domain_folder: 40-REFERENCE-ARCHITECTURES
levels_covered: [1]
knowledge_class: durable
tech_status: general-pattern
last_verified: 2026-09-07
primary_source: SRC-OWASP-LLM-TOP10-2026
status: verified
related_nodes: [arch-enterprise-rag, arch-enterprise-agent, arch-nl2sql, arch-de-agent, arch-multi-agent-platform]
---

# Reference architectures A–E

Five **teaching** shapes from Gate 0. Each page: distinctive risk, one sequence, when-not. Not a full BOM (frontend through DR). Vendor mappings stay in [26](../26-AI-CLOUD-ARCHITECTURE/01-overview.md).

| ID | Name | Distinctive risk | Page |
|---|---|---|---|
| A | Enterprise RAG | ACL leakage via chunks; stale indexes | [A](A-enterprise-rag.md) |
| B | Enterprise AI agent | Excessive agency; tool blast radius | [B](B-enterprise-agent.md) |
| C | Agentic NL-to-SQL | Injection, cartesian joins, PII columns | [C](C-nl2sql.md) |
| D | Data engineering agent | Write tools against pipelines | [D](D-data-engineering-agent.md) |
| E | Secure multi-agent platform | Confused deputy; A2A trust | [E](E-multi-agent.md) |

## Shared failure-first list

Timeout / search down / tool wrong / loops / injection / bad retrieve / bad SQL / PII leak / cost explosion / context overflow / model regression / stale index. For each: detect, mitigate, fallback, recover, alert, test — [ops](../39-AI-PRODUCTION-OPERATIONS/01-overview.md).

## What should I remember?

Pick the architecture by **risk**, not by how impressive the demo looks.

## What should I learn next?

[A](A-enterprise-rag.md) · [Architect interviews](../44-ARCHITECTURE-INTERVIEWS/01-overview.md)
