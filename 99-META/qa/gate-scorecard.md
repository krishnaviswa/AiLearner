# Gate N scorecard

Copy this file to `gate-N-scorecard.md` (for example `gate-0-scorecard.md`). Chair fills after committee reports. Do not advance on FAIL.

| Field | Value |
|---|---|
| Gate | N — NAME |
| Date | YYYY-MM-DD |
| Chair | |
| Retry | 0 of 2 |
| Overall | **PASS** \| **FAIL** \| **NEEDS REVIEW** |

## Committee

| Role | Agent / notes | Mark |
|---|---|---|
| Source verifier | | PASS / FAIL / NEEDS REVIEW |
| Architecture / terminology | | |
| Pedagogy | | |
| Diagram QA | | |
| HTML / browser | | |

## Criteria

| Criterion | Mark | Note |
|---|---|---|
| Accuracy | | |
| Completeness | | For this gate's allowed scope only |
| Source quality | | |
| Freshness | | Volatile rows: last_verified + official URL |
| Architecture consistency | | Canonical vs cloud sketches |
| Terminology consistency | | |
| Code correctness | | N/A if no executable code this gate |
| Security correctness | | |
| Production realism | | Toy vs production labeled |
| Cross-reference integrity | | Graph, folders, nav |
| Learning progression | | L1 before L7; sequence honored |

## Residual UNVERIFIED

- (claim — why — where recorded)

## Failures to fix before re-score

- (none if PASS)

## Decision

**PASS** — next gate may start under standing auto-advance.

**FAIL** — do not advance; targeted fixes only; re-run committee.

**NEEDS REVIEW** — treat as FAIL for auto-advance unless the only gaps are listed UNVERIFIED volatile vendor facts and the chair explicitly PASSes the durable remainder.
