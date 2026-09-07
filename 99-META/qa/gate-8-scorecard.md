# Gate 8 scorecard

| Field | Value |
|---|---|
| Gate | 8 — HANDS-ON |
| Date | 2026-09-07 |
| Chair | Factory orchestrator |
| Retry | 0 of 2 |
| Overall | **PASS** |

## Committee

| Role | Notes | Mark |
|---|---|---|
| Source verifier | No invented SDKs; OTel/NIST/OWASP cites already sourced. Stubs labeled UNVERIFIED for vendor calls. | PASS |
| Architecture / terminology | Toy vs production-oriented; workflow/function preferred; L10 is a harness not a platform | PASS |
| Pedagogy | L1–L10 map to taught domains; 15 use cases are pointers only | PASS |
| Diagram QA | Mermaid on index + use-case map | PASS |
| HTML | Renderer includes 41–43 | PASS |

## Criteria

| Criterion | Mark | Note |
|---|---|---|
| Accuracy | PASS | Labs ran locally L1–L10 + `break_acl.py` |
| Completeness | PASS | Ladder spine; not 15 platforms |
| Source quality | PASS | Placeholders, not fake APIs |
| Freshness | PASS | Durable lab methods |
| Architecture consistency | PASS | A/B/C/E mapped |
| Terminology consistency | PASS | SYN-MRN only |
| Code correctness | PASS | `run_all.py` exit 0 |
| Security correctness | PASS | No secrets; ACL fail-closed; DLP regex |
| Production realism | PASS | Stubs labeled; L10 refuses to be a platform |
| Cross-reference integrity | PASS | Graph v1.8.0 |
| Learning progression | PASS | After production; Gate 9 not started |

## Residual UNVERIFIED

- Vendor SDK / HTTP field names for a real model call (labs stub on purpose)
- Carry-forward: hosted-agents GA; dollar prices; GCP SKUs; AgentCore retrieve; RMF revision; OTel spec pin; evals schema; embeddings fields; pgvector; AutoGen/SK; CrewAI; MCP spec pin

## Failures to fix before re-score

- (none)

## Decision

**PASS** — Gate 9 may start. This close does not start Gate 9 content.
