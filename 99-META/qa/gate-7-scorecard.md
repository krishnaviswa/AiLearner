# Gate 7 scorecard

| Field | Value |
|---|---|
| Gate | 7 — PRODUCTION |
| Date | 2026-09-07 |
| Chair | Factory orchestrator |
| Retry | 0 of 2 |
| Overall | **PASS** |

## Committee

| Role | Notes | Mark |
|---|---|---|
| Source verifier | Learn hosted-agents + Foundry Agent Service; Azure AI Search SKU page; Bedrock Agents Classic maintenance; AgentCore overview; Databricks MCP/AI Search Public Preview. No invented prices. Hosted agents **not** treated as GA (page does not say GA). | PASS |
| Architecture / terminology | Vendor-neutral first. Cloud pages are mappings. A–E keep Gate 0 distinctive risks. Workflow-over-agent rule retained. | PASS |
| Pedagogy | L1 + when-not; methods pages have no fake p95 / $; GCP is an explicit stub | PASS |
| Diagram QA | Mermaid on all new pages | PASS |
| HTML | Renderer 1–30 and 36–40; 128 files; shell Gate 7 group | PASS |

## Criteria

| Criterion | Mark | Note |
|---|---|---|
| Accuracy | PASS | Classic vs AgentCore; preview labels recorded |
| Completeness | PASS | Spine only — not SKU catalogs or full BOMs |
| Source quality | PASS | New IDs AgentCore + Azure Search SKU |
| Freshness | PASS | 2026-09-07 fetches |
| Architecture consistency | PASS | Matches reference-architecture A–E |
| Terminology consistency | PASS | Microsoft Foundry naming; AI Search former Vector Search |
| Code correctness | N/A | No executable this gate |
| Security correctness | PASS | ACL-in-query, HITL writes, no grant union |
| Production realism | PASS | Failure-first tables; preview called out |
| Cross-reference integrity | PASS | Graph v1.7.0 |
| Learning progression | PASS | Production after security; hands-on not started |

## Residual UNVERIFIED

- Hosted agents **GA vs preview** — Learn snapshot does not say GA; conservative **preview**
- Dollar rates (Azure Search, AgentCore, Databricks MCP) — verify official price pages
- GCP Vertex / Agent Engine SKUs and names
- AgentCore retrieve / Knowledge Bases successor path
- Carry-forward: RMF 1.0 revision; Measure playbook; OTel spec version; evals schema; embeddings fields; pgvector; AutoGen/SK; CrewAI; MCP spec pin

## Failures to fix before re-score

- (none)

## Decision

**PASS** — Gate 8 may start. This close does not start Gate 8 content.
