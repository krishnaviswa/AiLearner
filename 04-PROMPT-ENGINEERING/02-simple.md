---
concept_id: prompt-engineering.simple-spec
title: A minimum prompt spec
domain_folder: 04-PROMPT-ENGINEERING
levels_covered: [1, 2]
knowledge_class: durable
tech_status: general-pattern
last_verified: 2026-09-07
primary_source: SRC-OWASP-LLM-TOP10-2026
status: verified
related_nodes: [prompt, evaluation, security]
---

# A minimum prompt spec (simple)

Write these sections even if the file is 40 lines:

1. **Purpose** — one sentence.
2. **Inputs** — names, types, untrusted? (user text is untrusted: `SRC-OWASP-LLM-TOP10-2026` prompt injection).
3. **Output** — schema or enum.
4. **Refuse when** — missing data, out of policy.
5. **Non-goals** — no browsing, no tools, no “be helpful” override.
6. **Examples** — 3 input/output pairs that you will put in the golden set.

```mermaid
sequenceDiagram
  participant Dev
  participant Prompt as Prompt vN
  participant Model
  participant Test as Golden tests
  Dev->>Prompt: edit
  Prompt->>Model: run fixture
  Model->>Test: compare
  Test-->>Dev: pass / fail
```

## How it fails

| Failure | Why |
|---|---|
| Prompt injection | User text treated as instructions |
| Silent policy change | Unversioned string in a notebook |
| Eval on anecdotes | Three Slack examples |

## Secure / evaluate

Do not put secrets in the prompt. Evaluate on fixtures, not vibes. LLM-as-judge waits for Gate 5.
