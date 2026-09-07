# Gate 4 scorecard

| Field | Value |
|---|---|
| Gate | 4 — AGENTS |
| Date | 2026-09-07 |
| Chair | Factory orchestrator |
| Retry | 0 of 2 |
| Overall | **PASS** |

## Committee

| Role | Agent / notes | Mark |
|---|---|---|
| Source verifier | MCP architecture, LangGraph overview, MS Agent Framework, OpenAI Agents SDK re-fetched 2026-09-07 | PASS |
| Architecture / terminology | Function/workflow first; MCP does not dictate LLM use; flavors as map | PASS |
| Pedagogy | When-not first-class; multi-agent after single-agent failures; NL2SQL validation before demo; links 09 not duplicated | PASS |
| Diagram QA | Sequence/flow/state + tables | PASS |
| HTML | Renderer 01–17; Gate 4 nav | PASS |

## Criteria

| Criterion | Mark | Note |
|---|---|---|
| Accuracy | PASS | No invented MCP/SDK methods; model names on Learn/OpenAI pages not pinned |
| Completeness | PASS | Spine 10–15; taxonomy flavors listed once |
| Source quality | PASS | Official docs fetched this gate |
| Freshness | PASS | last_verified 2026-09-07 |
| Architecture consistency | PASS | Matches Gate 1 + reference architecture C for NL2SQL |
| Terminology consistency | PASS | Host/client/server per MCP docs |
| Code correctness | PASS | Tiny allow-list / AST-habit scripts |
| Security correctness | PASS | Authz on tools; SQL refuse; HITL on writes |
| Production realism | PASS | Blast radius, durability, eval surfaces |
| Cross-reference integrity | PASS | Graph v1.4.0 |
| Learning progression | PASS | Sequence 7–11 |

## Residual UNVERIFIED

- LangGraph “trusted by” customer list (marketing, not used)
- Example model IDs on Learn / OpenAI pages (volatile, not pinned)
- MCP current spec version pin (docs-as-of only)
- Carry-forward: OpenAI embed/structured-output fields, pgvector README ops, Azure Search SKUs, hosted-agents GA, AutoGen/SK deprecation, CrewAI version/adoption, OTel spec version, context sizes

## Decision

**PASS** — Gate 5 may start. This close does not start Gate 5.
