# Gate 1 scorecard

| Field | Value |
|---|---|
| Gate | 1 — ARCHITECTURE |
| Date | 2026-09-07 |
| Chair | Factory orchestrator |
| Retry | 0 of 2 |
| Overall | **PASS** |

## Committee

| Role | Agent / notes | Mark |
|---|---|---|
| Source verifier | No new invented URLs; stubs cite existing source_ids; residuals remain UNVERIFIED | PASS |
| Architecture / terminology | Workflow is not an agent; Foundry/preview hedges kept; no SKU catalogs | PASS |
| Pedagogy | Sequence confirmed; L1-first; when-not-agent first-class | PASS |
| Diagram QA | Validation + stubs mermaid flowcharts; tables present | PASS |
| HTML | Re-render after these pages (sibling HTML) | PASS |

## Criteria

| Criterion | Mark | Note |
|---|---|---|
| Accuracy | PASS | Graph edge `agent may-be workflow` removed |
| Completeness | PASS | Validation, stubs, sequence confirm, graph expand — no curriculum dump |
| Source quality | PASS | Existing Tier 1 IDs only |
| Freshness | PASS | Carry-forward UNVERIFIED listed |
| Architecture consistency | PASS | Matches reference-architecture.md |
| Terminology consistency | PASS | app-flavor vs agent-flavor |
| Code correctness | N/A | No runtime code |
| Security correctness | PASS | Authz/DLP edges added |
| Production realism | PASS | Stubs refuse winners without criteria |
| Cross-reference integrity | PASS | Graph status `gate-1-validated` |
| Learning progression | PASS | Sequence confirmed vs dependency graph |

## Residual UNVERIFIED

- Same as Gate 0 carry-forward (hosted-agents GA, AutoGen/SK deprecation, CrewAI version/adoption, OTel spec version, Azure AI Search SKUs)

## Failures to fix before re-score

- none

## Decision

**PASS** — Gate 2 (foundations spine only) may start.
