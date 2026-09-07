# Master taxonomy

Gate 0 item 1. This is a **map**, not the curriculum. Domain folders exist but are empty of content by design.

## Disciplines (keep distinct)

- Data engineering
- ML engineering
- LLM engineering
- AI engineering
- Agent engineering
- Platform engineering
- Cloud engineering
- Security engineering
- MLOps / LLMOps / DevOps
- Data governance / AI governance

## Learning spine

Business problem → Data → Data engineering → Knowledge/semantic layer → Retrieval/search → LLM → Tools → Agents → Orchestration → Guardrails → Evaluation → Observability → Security → Governance → Deployment → Production operations → Continuous improvement

## Domain catalog (repository)

| ID | Domain | Primary questions |
|---|---|---|
| 00 | Master map | Where am I? What depends on what? |
| 01 | Foundations | Tokens, context, probability, failure of “just prompt it” |
| 02 | Python for AI | Async, typing, HTTP, packaging — AI-shaped, not CS101 |
| 03 | LLM engineering | Models, decoding, context, routing, structured output |
| 04 | Prompt engineering | Specs, contracts, evaluation — not prompt folklore |
| 05 | LLM application engineering | Apps that are not agents |
| 06 | Embeddings | Representation, similarity, drift |
| 07 | Vector databases | Indexes, filters, hybrid, ops |
| 08 | RAG | Naive → enterprise permission-aware |
| 09 | Agentic RAG | When retrieval becomes a tool loop |
| 10 | Agents | Definition, flavors, when **not** to use |
| 11 | Orchestration | Graphs, workflows, durability, HITL |
| 12 | Tools / function calling | Contracts, authz, blast radius |
| 13 | MCP | Host/client/server, trust boundaries |
| 14 | Multi-agent | Supervisor, handoff, parallel, hierarchy |
| 15 | NL-to-SQL | Semantic layer, AST/security validation |
| 16 | AI data engineering | Lakehouse → knowledge |
| 17 | LLM data pipelines | Batch/CDC/stream into indexes |
| 18 | Evaluation | Ground truth vs LLM-as-judge |
| 19 | Observability | OTel, traces, cost, no unnecessary content logs |
| 20 | LLMOps | Version prompts/models/indexes/graphs |
| 21 | AI security | OWASP GenAI LLM Top 10 2026 mapping |
| 22 | Guardrails | Policy vs model-as-filter |
| 23 | PII/PHI/DLP | Egress control; LLM classifier is not enough |
| 24 | AI governance | NIST AI RMF / 600-1 mapping |
| 25 | Responsible AI | Harm, bias, human-AI configuration |
| 26 | Cloud architecture | Vendor-neutral canonical |
| 27–30 | Azure / AWS / GCP / Databricks | Mappings, not a forced full-stack on every cloud |
| 31 | Database AI | pgvector, SQL Server, Snowflake, etc. |
| 32–39 | App, APIs, infra, CI/CD, testing, perf, cost, ops | Production realism |
| 40 | Reference architectures | A–E |
| 41–42 | Use cases / capstones | 15 enterprises + ladder |
| 43–50 | Experiments, interviews, troubleshooting, patterns, anti-patterns, glossary, papers, cheat-sheets | Support |

Folder slugs in [repository-structure.md](repository-structure.md) are not identical to the human names above (11 Orchestration → `11-AGENT-ORCHESTRATION`; 14 Multi-agent → `14-MULTI-AGENT-SYSTEMS`; 23 PII/PHI/DLP → `23-PHI-PII-DLP`; 26 Cloud architecture → `26-AI-CLOUD-ARCHITECTURE`). Graph node ids in `99-META/knowledge-graph.json` are kebab-case (`nl2sql`, `rag`), not folder names.

## Agent flavors (must all appear in Gate 4)

Simple LLM app · prompt-driven · structured-output · tool/function-calling · ReAct · workflow-based · router · planner/executor · stateful · memory-enabled · HITL · approval-based · long-running · durable · event-driven · background · autonomous/semi-autonomous · agentic RAG · multi-agent · supervisor/worker · handoff · parallel · hierarchical · MCP-based · NL-to-SQL · data-engineering · data-quality · cloud/ops · security · coding/SWE · research · enterprise knowledge · customer-service · decision-support

Plus the negative space: **deterministic workflow, API, SQL, conventional pipeline**.

## RAG flavors (Gate 3)

Naive · classical · advanced · hybrid · graph · agentic · multimodal · SQL · API · enterprise · multi-tenant · permission-aware

## Threat taxonomy (Gate 6 mapping, not content)

OWASP LLM01–LLM10 2026: prompt injection, sensitive information disclosure, excessive agency, supply chain, data/model poisoning, unbounded consumption, misinformation, hidden context exposure, vector/embedding weaknesses, improper output handling (`SRC-OWASP-LLM-TOP10-2026`).

NIST AI 600-1 generative-AI risk profile as governance companion (`SRC-NIST-AI-600-1`).

## Knowledge classes

Every node is **durable**, **volatile**, or **mixed**. Implementation pages carry `last_verified`.
