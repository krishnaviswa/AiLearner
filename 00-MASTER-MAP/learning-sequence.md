# Recommended learning sequence

Gate 0 item 10. Audience: experienced Python/SQL/AWS/Azure/Spark/Kafka/Databricks/Snowflake engineers.

Do not reteach programming. Use pipeline, state-machine, API, and governance analogies.

## Sequence

1. **Why this lab exists** — [master-mindmap.md](master-mindmap.md), [hybrid-knowledge-architecture.md](hybrid-knowledge-architecture.md)
2. **Canonical architecture** — [reference-architecture.md](reference-architecture.md) at Simple depth only
3. **Foundations** — tokens, context windows, what “agency” means, when **not** to use an agent
4. **LLM applications without agents** — structured output, eval of a single call
5. **Embeddings + search** — durable IR ideas, then one volatile implementation
6. **RAG** — naive → hybrid → permission-aware; always toy vs production pipeline
7. **Tools** — APIs as tools; blast radius; authz
8. **Agents** — ReAct / router / planner-executor / stateful / HITL
9. **MCP** — protocol vs function calling vs REST
10. **Agentic RAG and multi-agent** — only after single-agent failure modes
11. **NL-to-SQL** — security validation before “wow demos”
12. **Evaluation** — ground truth first; LLM-as-judge as a helper, not the source of truth
13. **Security / DLP / governance** — OWASP LLM Top 10 2026 + NIST AI RMF/600-1
14. **Observability / LLMOps / cost / performance**
15. **Reference architectures A–E** and cloud mappings
16. **Project ladder L1–L10** and selected enterprise use cases
17. **Principal challenges** — interviews, anti-patterns, “would I choose either?”

## Depth at each step

Simple → logical → mechanical → implement → engineer → architect → production → principal. Do not dump all eight in one page.

## Timebox suggestion (multi-year lab, not a weekend course)

| Phase | Gates | Intent |
|---|---|---|
| Quarter 1 | 2–3 | RAG that you would not be ashamed to threat-model |
| Quarter 2 | 4–6 | Agents you can refuse to ship |
| Quarter 3 | 7–8 | One production-shaped system |
| Quarter 4 | 9–10 | Teaching interface + integration |

Adjust; the gate process still stops between phases.

## Gate 1 confirmation (2026-09-07)

The sequence above is **confirmed** as the teaching order. Do not start agents before LLM apps without agents, and do not postpone evaluation/security until “after it works.”

| Check | Result |
|---|---|
| Matches dependency graph G2→G8 | Yes |
| Matches taxonomy spine | Yes |
| When-not-agent appears before agent flavors | Yes (step 3) |
| Cloud vendor catalogs first | No — vendor-neutral architecture first (step 2) |

Validation write-up: [gate-1-architecture-validation.md](gate-1-architecture-validation.md).
