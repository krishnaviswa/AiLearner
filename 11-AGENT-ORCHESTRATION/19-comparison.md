---
concept_id: orchestration.comparison
title: Workflow vs graph vs free agent
domain_folder: 11-AGENT-ORCHESTRATION
levels_covered: [1]
knowledge_class: durable
tech_status: general-pattern
last_verified: 2026-09-07
primary_source: SRC-MS-AGENT-FRAMEWORK
status: verified
related_nodes: [workflow, orchestration, agent]
---

# Workflow vs graph vs free agent

| | Workflow | Durable graph | Free agent loop |
|---|---|---|---|
| Edges | Coded | Coded + optional LLM nodes | Model-chosen |
| HITL | Approval node | Interrupt / resume | Ad hoc |
| Crash | Job retry | Checkpoint | Often lost |
| Default | **Known process** | Mix det + agentic (`SRC-LANGGRAPH-OVERVIEW`) | Last resort |

Microsoft: workflows when you need explicit control; agents when open-ended (`SRC-MS-AGENT-FRAMEWORK`).
