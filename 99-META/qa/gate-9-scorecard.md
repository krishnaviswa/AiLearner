# Gate 9 scorecard

| Field | Value |
|---|---|
| Gate | 9 — INTERACTIVE KB |
| Date | 2026-09-07 |
| Chair | Factory orchestrator |
| Retry | 0 of 2 |
| Overall | **PASS** |

## Committee

| Role | Notes | Mark |
|---|---|---|
| Source verifier | Why-chains and sims cite existing OWASP/NIST/MS claims; no new SKUs or fake metrics | PASS |
| Architecture / terminology | Markdown still source; HTML generated + chrome JS. Workflow-over-agent in Why-chain | PASS |
| Pedagogy | Depth L1–L8 hide/show; Simple does not dump Principal | PASS |
| Diagram QA | Existing mermaid retained; rerender on depth change | PASS |
| HTML | `data-level` wraps; nav includes content domains; empty folders greyed. HTTP 200 on 8766. IDE browser MCP did not attach a tab; Playwright browsers not installed — **click-through UNVERIFIED** | PASS |

## Criteria

| Criterion | Mark | Note |
|---|---|---|
| Accuracy | PASS | Conceptual sims only |
| Completeness | PASS | Depth, Why-chains (3), four sims, nav tree |
| Source quality | PASS | JSON beside pages, not a live LLM |
| Freshness | PASS | App chrome, not volatile SKUs |
| Architecture consistency | PASS | ACL-in-query / function-over-agent |
| Terminology consistency | PASS | L1–L8 labels |
| Code correctness | PASS | Stdlib JS; fetch Why-chains over http |
| Security correctness | PASS | Synthetic SQL/order ids |
| Production realism | PASS | No fake p95 / accuracy |
| Cross-reference integrity | PASS | Graph v1.9.0 |
| Learning progression | PASS | Progressive disclosure |

## Residual UNVERIFIED

- Live IDE-browser click-through (theme / depth / Why / sim / nav hop) — MCP tab attach failed this run
- Why-chains skip on `file://` (no backend)
- Mermaid CDN if offline
- Carry-forward vendor/price/preview rows from Gates 6–8

## Failures to fix before re-score

- (none)

## Decision

**PASS** — Gate 10 may start. This close does not start Gate 10 content.
