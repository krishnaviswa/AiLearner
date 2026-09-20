# Diagram style guide

Every lesson diagram is a mermaid block in the Markdown source. `render-pages.py`
post-processes each block at build time: it injects the shared class palette and
auto-assigns a semantic class to every node by keyword. Authors normally write a plain
diagram and let the build colour it; override only when the heuristic is wrong.

## Pick the right chart

| Aspect you are showing | Chart |
|---|---|
| Messages between parties over time (attacker → model → tool → sink, multi-turn retrieve, handoff) | `sequenceDiagram` |
| A pipeline / data flow / topology | `flowchart TB` (use `LR` only when ≤ 4 nodes wide) |
| "Which option do I pick?" | `flowchart TD` with `{decision}` diamonds |
| Lifecycle / status transitions | `stateDiagram-v2` |
| Hierarchy, taxonomy, dependency graph | `flowchart TB` with `subgraph` groups |
| Comparing attributes across 2–4 options | **a table — not a diagram** |

If a flowchart restates a table or a paragraph that is already on the page, delete the
flowchart or replace it with a decision tree that adds something the prose does not.

## Semantic palette (auto-applied)

Node label keywords → class. Colours are defined once in `render-pages.py`
(`MERMAID_CLASSDEFS`).

| class | meaning | label keywords that trigger it |
|---|---|---|
| `src` | external input / user / source | user, caller, question, request, goal, source, event, attacker |
| `proc` | processing step | parse, chunk, encode, validate, rewrite, route, retrieve, canary |
| `store` | index / DB / corpus / cache | index, store, vector, db, database, corpus, warehouse, catalog, table, logs |
| `model` | LLM / inference | model, llm, judge, embed, embedding, ranker, rerank |
| `guard` | guardrail / policy / identity | authz, authn, iam, identity, acl, policy, guardrail, dlp, filter, grant, hitl, human |
| `risk` | failure / attack / refusal / stop | refuse, reject, deny, block, leak, fail, stop, "do not", forbidden, attack, gaming |
| `out` | answer / result / output / ship | answer, result, output, response, rows, ship, release, report, recover |
| `decision` | branch point | any `{...}` node |

Diamonds (`{...}`) always render as `decision`. Cylinders (`[(...)]`) always render as
`store`. To force a class, append `:::classname` to the node, e.g. `X[Thing]:::guard`.

## Size and mobile

- ≤ 10 nodes per diagram, ≤ 4 across. Split anything bigger into two diagrams.
- Prefer `TB`/`TD`. A wide `LR` chain shrinks to unreadable on a 375 px screen.
- Large diagrams scroll horizontally on small screens (CSS in `portal.css` / `lab.css`);
  they do not shrink. Keep them within the node budget anyway.
- Group multi-phase pipelines with `subgraph ingest` / `subgraph retrieve` etc. so the
  phases read at a glance.

## Per-file audit — verdicts

`keep` = structure fine, build adds colour, no manual edit.
`group` = add `subgraph` phase grouping.
`table` = flowchart duplicated a table/prose on the page → replaced with a decision tree.
`removed` = "one node → 4–5 vendor nodes" fan that only restated the vendor table already above it → deleted.
`dir` = switch `LR`→`TB`/`TD` for width / to connect stray pairs into one tree.

| File | Verdict |
|---|---|
| 00-MASTER-MAP/dependency-graph.md | keep (already grouped) |
| 00-MASTER-MAP/gate-1-architecture-validation.md | keep |
| 00-MASTER-MAP/html-architecture.md | keep |
| 00-MASTER-MAP/master-mindmap.md | dir (TB chain of 16 → split into phases with subgraphs) |
| 00-MASTER-MAP/reference-architecture.md | group |
| 00-MASTER-MAP/technology-decision-stubs.md | keep |
| 01-FOUNDATIONS/01-overview.md | keep |
| 01-FOUNDATIONS/02-simple.md | keep |
| 01-FOUNDATIONS/03-logical.md | keep |
| 01-FOUNDATIONS/15-real-world-example.md | removed (restated the vendor table) |
| 01-FOUNDATIONS/19-comparison.md | keep |
| 02-PYTHON-FOR-AI/01-overview.md | keep |
| 02-PYTHON-FOR-AI/19-comparison.md | keep |
| 03-LLM-ENGINEERING/01-overview.md | keep |
| 03-LLM-ENGINEERING/02-simple.md | keep |
| 03-LLM-ENGINEERING/19-comparison.md | dir (3 disconnected LR pairs → TD) |
| 04-PROMPT-ENGINEERING/01-overview.md | keep |
| 04-PROMPT-ENGINEERING/02-simple.md | keep |
| 04-PROMPT-ENGINEERING/19-comparison.md | keep |
| 05-LLM-APPLICATION-ENGINEERING/01-overview.md | keep |
| 05-LLM-APPLICATION-ENGINEERING/02-simple.md | keep |
| 05-LLM-APPLICATION-ENGINEERING/19-comparison.md | keep |
| 06-EMBEDDINGS/01-overview.md | keep |
| 06-EMBEDDINGS/02-simple.md | keep |
| 06-EMBEDDINGS/19-comparison.md | keep |
| 07-VECTOR-DATABASES/01-overview.md | keep |
| 07-VECTOR-DATABASES/02-simple.md | keep |
| 07-VECTOR-DATABASES/19-comparison.md | keep |
| 08-RAG/01-overview.md | keep (already grouped) |
| 08-RAG/02-simple.md | keep |
| 08-RAG/03-logical.md | group (add ingest / retrieve / egress subgraphs) |
| 08-RAG/15-real-world-example.md | removed (restated the vendor table) |
| 08-RAG/19-comparison.md | table (linear N→H→P→A duplicates the table → decision tree) |
| 09-AGENTIC-RAG/01-overview.md | keep |
| 09-AGENTIC-RAG/02-simple.md | keep |
| 09-AGENTIC-RAG/19-comparison.md | keep |
| 10-AGENTS/01-overview.md | keep |
| 10-AGENTS/02-simple.md | keep |
| 10-AGENTS/03-logical.md | keep |
| 10-AGENTS/15-real-world-example.md | keep |
| 10-AGENTS/19-comparison.md | keep |
| 11-AGENT-ORCHESTRATION/01-overview.md | keep (stateDiagram) |
| 11-AGENT-ORCHESTRATION/02-simple.md | keep |
| 12-TOOLS-FUNCTION-CALLING/01-overview.md | keep |
| 12-TOOLS-FUNCTION-CALLING/02-simple.md | keep |
| 13-MCP/01-overview.md | keep |
| 13-MCP/02-simple.md | keep |
| 13-MCP/19-comparison.md | keep |
| 14-MULTI-AGENT-SYSTEMS/01-overview.md | group (3 disconnected pairs → label the pattern) |
| 14-MULTI-AGENT-SYSTEMS/02-simple.md | keep |
| 14-MULTI-AGENT-SYSTEMS/19-comparison.md | keep |
| 15-NL2SQL/01-overview.md | keep |
| 15-NL2SQL/02-simple.md | keep |
| 15-NL2SQL/19-comparison.md | keep |
| 16-AI-DATA-ENGINEERING/01-overview.md | keep |
| 17-LLM-DATA-PIPELINES/01-overview.md | keep |
| 18-EVALUATION/01-overview.md | keep |
| 18-EVALUATION/02-simple.md | keep |
| 18-EVALUATION/03-logical.md | keep |
| 18-EVALUATION/14-failure-modes.md | keep |
| 18-EVALUATION/19-comparison.md | keep |
| 19-OBSERVABILITY/01-overview.md | keep |
| 20-LLMOPS/01-overview.md | keep |
| 21-AI-SECURITY/01-overview.md | keep |
| 21-AI-SECURITY/02-simple.md | keep |
| 21-AI-SECURITY/03-logical.md | dir (2 disconnected LR pairs → TD, name the join) |
| 22-GUARDRAILS/01-overview.md | keep |
| 22-GUARDRAILS/19-comparison.md | keep |
| 23-PHI-PII-DLP/01-overview.md | keep |
| 23-PHI-PII-DLP/19-comparison.md | keep |
| 24-AI-GOVERNANCE/01-overview.md | keep (loop) |
| 24-AI-GOVERNANCE/03-logical.md | keep |
| 24-AI-GOVERNANCE/19-comparison.md | keep |
| 25-RESPONSIBLE-AI/01-overview.md | keep |
| 25-RESPONSIBLE-AI/19-comparison.md | dir (LR converge → TD) |
| 26-AI-CLOUD-ARCHITECTURE/01-overview.md | group |
| 26-AI-CLOUD-ARCHITECTURE/19-comparison.md | keep |
| 27-AZURE-AI/01-overview.md | keep |
| 28-AWS-AI/01-overview.md | keep |
| 29-GCP-AI/01-overview.md | keep |
| 30-DATABRICKS-AI/01-overview.md | keep |
| 36-AI-TESTING/01-overview.md | dir (2 disconnected pairs → one TD) |
| 37-AI-PERFORMANCE/01-overview.md | keep |
| 38-AI-COST/01-overview.md | keep |
| 39-AI-PRODUCTION-OPERATIONS/01-overview.md | keep |
| 40-REFERENCE-ARCHITECTURES/A-enterprise-rag.md | keep |
| 40-REFERENCE-ARCHITECTURES/B-enterprise-agent.md | keep |
| 40-REFERENCE-ARCHITECTURES/C-nl2sql.md | keep |
| 40-REFERENCE-ARCHITECTURES/D-data-engineering-agent.md | keep |
| 40-REFERENCE-ARCHITECTURES/E-multi-agent.md | keep |
| 41-REAL-WORLD-USE-CASES/01-overview.md | keep |
| 41-REAL-WORLD-USE-CASES/recent-agentic-assignments.md | keep |
| 42-CAPSTONE-PROJECTS/01-overview.md | keep (ladder) |
| 44-ARCHITECTURE-INTERVIEWS/01-overview.md | keep |
| 46-DESIGN-PATTERNS/01-overview.md | keep |
| 47-ANTI-PATTERNS/01-overview.md | keep |
| 48-GLOSSARY/01-overview.md | keep |
| 50-CHEAT-SHEETS/01-overview.md | keep |
| 50-CHEAT-SHEETS/eval.md | keep |
| 50-CHEAT-SHEETS/mcp-vs-tools.md | keep |
| 50-CHEAT-SHEETS/rag-vs-agent.md | keep |
| 50-CHEAT-SHEETS/security-top10.md | dir (2 disconnected pairs → TD) |
