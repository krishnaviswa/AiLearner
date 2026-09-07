# Gate 6 scorecard

| Field | Value |
|---|---|
| Gate | 6 — SECURITY |
| Date | 2026-09-07 |
| Chair | Factory orchestrator |
| Retry | 0 of 2 |
| Overall | **PASS** |

## Committee

| Role | Notes | Mark |
|---|---|---|
| Source verifier | OWASP 2026 titles from official GitHub README (Aug 4). Landing HTML date Aug 3 — same list, date disagreement recorded. LLM01/08/09/10 files fetched. NIST landing + AI 600-1 PDF §2 twelve risks. Presidio docs host moved; Bedrock Guardrails overview fetched. No invented Top-10 IDs or CVE stats. | PASS |
| Architecture / terminology | Guardrails = policy + deterministic vs model-as-filter. DLP: LLM classifier is not enough. Governance = NIST functions, not a SKU. Identity/HITL/eval edges kept. | PASS |
| Pedagogy | L1 overviews; when-not tables; synthetic PII only; OWASP map after simple three-door model | PASS |
| Diagram QA | Mermaid on every Gate 6 page except DLP DO (code + asserts). Labels match prose. | PASS |
| HTML | `render-pages.py` 110 files; prefixes 21–25; shell nav Gate 6 group | PASS |

## Criteria

| Criterion | Mark | Note |
|---|---|---|
| Accuracy | PASS | Official titles and NIST risk names only |
| Completeness | PASS | Spine only: few real pages per 21–25 |
| Source quality | PASS | Tier 1/2; fetch notes on OWASP/NIST/Presidio/Bedrock |
| Freshness | PASS | last_verified 2026-09-07; RMF 1.0 revision flagged |
| Architecture consistency | PASS | Cross-cutting security/guardrails/DLP as in reference-architecture |
| Terminology consistency | PASS | Taxonomy OWASP list matches README |
| Code correctness | PASS | Synthetic MRN regex asserts |
| Security correctness | PASS | No exploit PoCs; architectural defenses |
| Production realism | PASS | Vendor products labeled vendor-specific |
| Cross-reference integrity | PASS | Graph v1.6.0; folder links |
| Learning progression | PASS | Eval (Gate 5) before security; production not started |

## Residual UNVERIFIED

- NIST AI RMF 1.0 **being revised** (landing 2026-09-07)
- Measure playbook subcategory steps (not re-copied from playbook PDF)
- OWASP landing **August 3** vs GitHub README **August 4** 2026 (titles agree)
- Carry-forward: evals schema; embeddings/structured-output fields; pgvector operators; Azure Search SKUs; hosted-agents GA; AutoGen/SK deprecation; CrewAI pin; OTel spec version; context sizes; MCP spec pin

## Failures to fix before re-score

- (none)

## Decision

**PASS** — Gate 7 may start. This close does not start Gate 7 content.
