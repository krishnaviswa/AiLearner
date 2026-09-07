# Phased gate plan

This is Gate 0 item 7. **Do not dump later gates in one pass.** Produce only the current gate, then STOP that gate for QA.

Authoritative process: master prompt sections 43–44 and 55. Cursor encoding: `.cursor/rules/ai-lab-gates.mdc`, `.cursor/skills/advance-gate/SKILL.md`, `.cursor/skills/qa-gate/SKILL.md`.

While `99-META/GATE-STATUS.md` has `owner_policy: standing auto-advance through Gate 10`, human named-gate approval is waived. The next gate starts only after **QA chair PASS**. FAIL → fix → re-score (max two retries). If that policy is unset, never continue without explicit named-gate approval.

## Gate 0 — SCOPE (this gate)

Produce only the twelve scope artifacts listed in `GATE-STATUS.md`, plus the folder skeleton and operating rules so future agents stop here.

Then **STOP** that gate for the QA committee.

Exit criteria: QA chair PASS (or listed residual UNVERIFIED); no curriculum pages leaked into domain folders.

## Gate 1 — ARCHITECTURE

Validate, do not flood with pages:

- Master architecture (logical + physical/cloud mappings)
- Concept relationships (expand knowledge graph with reviewed edges)
- Technology categories (decision-guide stubs, still no full bake of volatile SKUs)
- Learning dependencies (confirm sequence)

Then **STOP**.

## Gate 2 — FOUNDATIONS

`01-FOUNDATIONS`, `02-PYTHON-FOR-AI` (AI-specific only), `03-LLM-ENGINEERING`, `04-PROMPT-ENGINEERING`, `05-LLM-APPLICATION-ENGINEERING`. Mental models + tiny implementations. Then **STOP**.

## Gate 3 — RAG

`06-EMBEDDINGS`, `07-VECTOR-DATABASES`, `08-RAG`, `09-AGENTIC-RAG`, relevant pipeline notes in `16-`/`17-`. Naive → enterprise permission-aware RAG. Then **STOP**.

## Gate 4 — AGENTS

`10-AGENTS` through `15-NL2SQL` including MCP and multi-agent. Every major flavor from the taxonomy. Then **STOP**.

## Gate 5 — EVALUATION

`18-EVALUATION`, ground-truth vs LLM-as-judge, harness design, dataset methodology. Then **STOP**.

## Gate 6 — SECURITY

`21-AI-SECURITY`, `22-GUARDRAILS`, `23-PHI-PII-DLP`, `24-AI-GOVERNANCE`, `25-RESPONSIBLE-AI`. Map to OWASP GenAI LLM Top 10 2026 and NIST AI RMF / AI 600-1. Then **STOP**.

## Gate 7 — PRODUCTION

`26-`–`40-` as needed: cloud mappings, reference architectures A–E (vendor-neutral + Azure + AWS, Databricks where relevant), cost/performance/ops. Then **STOP**.

## Gate 8 — HANDS-ON

Project ladder L1–L10 and the 15 use-case implementations at lab quality (not all 15 full platforms). Then **STOP**.

## Gate 9 — INTERACTIVE KNOWLEDGE BASE

Static/local-first HTML app: nav tree, depth selector, Why? chains, simulations. Then **STOP**.

## Gate 10 — FINAL INTEGRATION

Cross-links, graph completeness, glossary, cheat-sheets, interview set. Then **STOP**.

## Quality bar before any PASS

Accuracy, completeness, source quality, freshness, architecture consistency, terminology consistency, code correctness, security correctness, production realism, cross-reference integrity, learning progression.

Marks: **PASS** | **FAIL** | **NEEDS REVIEW**. Do not hide uncertainty.

## Token-efficiency during later gates

Edit local artifacts. Do not regenerate entire domains. Research official docs only for volatile slices.
