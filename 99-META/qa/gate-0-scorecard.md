# Gate 0 scorecard

| Field | Value |
|---|---|
| Gate | 0 — SCOPE |
| Date | 2026-09-07 |
| Chair | Factory orchestrator (standing auto-advance) |
| Retry | 0 of 2 |
| Overall | **PASS** |

## Committee

| Role | Agent / notes | Mark |
|---|---|---|
| Source verifier | Official Learn/OTel/CrewAI fetch 2026-09-07; residuals UNVERIFIED | PASS |
| Architecture / terminology | Vendor-neutral first; Foundry naming note; OTel Development wording aligned | PASS |
| Pedagogy | Sequence and dependency graph match gate-plan; no curriculum dump | PASS |
| Diagram QA | Four mermaid blocks parse; labels match prose; HTML keeps `pre.mermaid` | PASS |
| HTML / browser | Shell + renderer; nav is `.html` only. Browser MCP tab was flaky; static HTML/CSS/JS and generated files reviewed. Theme/nav/mermaid designed for http.server | PASS |

## Criteria

| Criterion | Mark | Note |
|---|---|---|
| Accuracy | PASS | Claims cited or UNVERIFIED; no invented SKUs/prices |
| Completeness | PASS | Twelve Gate 0 artifacts + mind map + Wave 0 reader |
| Source quality | PASS | Tier 1/2 registry; CrewAI now has official docs |
| Freshness | PASS | Volatile rows re-fetched 2026-09-07; residuals listed |
| Architecture consistency | PASS | Canonical logical first; cloud sketches labeled |
| Terminology consistency | PASS | Microsoft Foundry / Foundry Agent Service noted; previous brand Azure AI Foundry |
| Code correctness | PASS | Renderer and theme/shell JS; no executable labs this gate |
| Security correctness | N/A | No runtime that handles secrets/PII |
| Production realism | PASS | Toy vs production labeled on RAG pipeline |
| Cross-reference integrity | PASS | Graph is an outline; Gate 1 expands edges |
| Learning progression | PASS | Sequence proposed; L1-first plan |

## Residual UNVERIFIED

- Hosted agents: Learn metadata still includes preview; one converted page omitted the sentence — do not treat as GA (`SRC-MS-HOSTED-AGENTS`)
- AutoGen / Semantic Kernel **project-level** deprecation — Agent Framework docs are successor language only (`SRC-MS-AGENT-FRAMEWORK`)
- CrewAI package version pin (install page vs CLI example) — do not pin
- CrewAI adoption stats and vendor “production-ready” claims
- OTel GenAI **spec version number** — document status is Development (`SRC-OTEL-GENAI-SEMCONV`)
- Azure AI Search SKU list — intentionally not listed

## Failures to fix before re-score

- none

## Decision

**PASS** — Gate 1 may start under standing auto-advance.
