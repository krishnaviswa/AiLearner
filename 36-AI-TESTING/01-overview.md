---
concept_id: testing.harness-vs-unit
title: Harness vs unit tests (light note)
domain_folder: 36-AI-TESTING
levels_covered: [1]
knowledge_class: durable
tech_status: general-pattern
last_verified: 2026-09-07
primary_source: SRC-OPENAI-EVALS
status: verified
related_nodes: [evaluation, llmops]
---

# Harness vs unit tests (Gate 5 light note)

Not the full testing domain.

| | Unit / contract tests | Eval harness |
|---|---|---|
| Asserts | Parsers, authz, AST refuse | Behavior vs gold |
| Determinism | High | Model may flake — pin seeds/models or allow retry policy |
| CI | Every commit | Every commit for **small gold**; nightly for large |

```mermaid
flowchart TD
  Change[Change] --> U[Unit tests]
  Change --> H[Eval harness]
  U --> G[Gate: parsers and tool I/O]
  H --> B[Gate: model behavior vs gold]
  G --> Ship[Ship only if both pass]
  B --> Ship
```

If you only have unit tests, you can still ship a fluent wrong answer. If you only have a harness, you can still ship `DROP TABLE` through an untested parser ([15](../15-NL2SQL/16-hands-on.md)).

Full test-strategy pages wait for later gates.

## What should I learn next?

[Eval pocket](../50-CHEAT-SHEETS/eval.md) · [How eval fails](../18-EVALUATION/14-failure-modes.md)
