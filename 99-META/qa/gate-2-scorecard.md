# Gate 2 scorecard

| Field | Value |
|---|---|
| Gate | 2 — FOUNDATIONS |
| Date | 2026-09-07 |
| Chair | Factory orchestrator |
| Retry | 0 of 2 |
| Overall | **PASS** |

## Committee

| Role | Agent / notes | Mark |
|---|---|---|
| Source verifier | `SRC-TIKTOKEN` README fetched; `SRC-OPENAI-STRUCTURED-OUTPUTS` URL recorded but HTTP fetch timed out — wire-format UNVERIFIED | PASS |
| Architecture / terminology | Workflow ≠ agent; apps before agents; matches Gate 1 graph | PASS |
| Pedagogy | L1 first; when-not-agent first-class; no CS101; no RAG/agent dump | PASS |
| Diagram QA | Flow/sequence + when-not tables on major pages | PASS |
| HTML | Domain MD rendered via `render-pages.py`; nav lists Gate 2 | PASS |

## Criteria

| Criterion | Mark | Note |
|---|---|---|
| Accuracy | PASS | No invented SKUs/prices/SDK methods |
| Completeness | PASS | Spine only: 4 real files × 5 domains |
| Source quality | PASS | Tier 1 tiktoken + existing NIST/OWASP/MS |
| Freshness | PASS | Timeouts labeled; residuals listed |
| Architecture consistency | PASS | Aligns with reference-architecture + Gate 1 |
| Terminology consistency | PASS | Agency vs application vs workflow |
| Code correctness | PASS | Tiny stdlib / official tiktoken README snippets |
| Security correctness | PASS | Untrusted input, fail-closed parse, no secret logging |
| Production realism | PASS | Toy vs production labeled |
| Cross-reference integrity | PASS | Graph v1.2.0 nodes tokens/context/decoding/python-for-ai |
| Learning progression | PASS | Sequence steps 3–4 only |

## Residual UNVERIFIED

- OpenAI structured-outputs **request parameter names** (guide fetch timed out 2026-09-07)
- Model context-window sizes and current model IDs (intentionally not pinned)
- Carry-forward: hosted-agents GA, AutoGen/SK deprecation, CrewAI version/adoption, OTel spec version, Azure AI Search SKUs

## Failures to fix before re-score

- none

## Decision

**PASS** — Gate 3 (embeddings / RAG spine) may start. Do not dump Gate 3 in this close.
