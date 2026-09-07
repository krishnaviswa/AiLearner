---
concept_id: interact.why-chains
title: Why-chains (Gate 9)
domain_folder: 00-MASTER-MAP
levels_covered: [1]
knowledge_class: durable
tech_status: general-pattern
last_verified: 2026-09-07
primary_source: SRC-OWASP-LLM-TOP10-2026-GH
status: verified
related_nodes: [rag, agent, vector-db]
---

# Why-chains

Expandable reasoning stored as **JSON beside the page**. The browser fetches it; no model runs in this tab.

| Topic | JSON | Shows on |
|---|---|---|
| Why a vector store? | [07-VECTOR-DATABASES/why-chain.json](07-VECTOR-DATABASES/why-chain.json) | Vector store pages |
| Why an agent — or not? | [10-AGENTS/why-chain.json](10-AGENTS/why-chain.json) | Agents / when-not |
| Why ACL on chunks? | [08-RAG/why-chain.json](08-RAG/why-chain.json) | RAG overview / comparison |

Open a listed **overview** HTML page over `http://127.0.0.1:8766/` so `fetch` works. Why-chains render only on that domain’s `01-overview.html`. On `file://` the chain is skipped (no backend). Port 8000 is often another API — do not use it for this lab.

## What should I remember?

A Why-chain is a teaching aid, not a live architect. Edit the JSON to change the argument.

## What should I learn next?

[Simulations](simulations.html)
