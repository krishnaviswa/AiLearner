# Technology decision stubs

Gate 1. **Stubs only** — criteria, not winners. No SKU catalogs, prices, or “best of 2026” ranks. Re-verify official docs when a later gate implements a choice.

## How to use a stub

1. Name the **decision** (durable).
2. List **criteria** (what would change the answer).
3. Note **default only if justified** later — empty here on purpose.
4. Open Tier 1 URLs before coding.

```mermaid
flowchart LR
  Need[Durable need] --> Crit[Criteria]
  Crit --> Docs[Official docs]
  Docs --> Pick[Pick / defer / UNVERIFIED]
```

## Decision stubs

| ID | Decision | Criteria (not a recommendation) | Defer to | Sources |
|---|---|---|---|---|
| D-WF-AG | Workflow vs agent | Are steps known and stable? Is a function enough? Blast radius of tools? | Gates 2, 4 | `SRC-MS-AGENT-FRAMEWORK` (prefer a function when you can write one) |
| D-FC-MCP | Function calling vs MCP vs REST | One app vs many hosts? Need a shared tool catalog? Transport (STDIO vs Streamable HTTP)? | Gate 4 | `SRC-MCP-ARCHITECTURE` |
| D-RAG-FT | RAG vs fine-tuning | Does the fact change often? Do you need citations? Who owns the corpus? | Gate 3 | Durable IR idea; no vendor bake-off here |
| D-VDB-SE | Vector DB vs search engine | Need lexical + vector? ACL filters at query time? Ops team already runs search? | Gates 3, 7 | No SKU list |
| D-HYBRID | Hybrid vs vector-only retrieve | Keyword-heavy IDs? Proper nouns? Recall vs precision? | Gate 3 | Durable IR |
| D-PERM | Toy RAG vs permission-aware | Are chunks shared across tenants? Is ACL on the document or the chunk? | Gate 3 | Durable authz; Azure AI Search SKUs **UNVERIFIED** |
| D-1-N | Single agent vs multi-agent | One failure domain or many? Handoff cost? Shared memory races? | Gate 4 | Durable distributed-systems |
| D-ORCH | Graph orchestrator family | Durability, HITL, mix of deterministic + agentic steps; lock-in | Gate 4 | `SRC-LANGGRAPH-OVERVIEW`, `SRC-MS-AGENT-FRAMEWORK` — compare later, do not crown a winner |
| D-HOST | Self-host vs managed runtime | Identity plane, data gravity, preview vs GA | Gates 4, 7 | Hosted agents **preview** `SRC-MS-HOSTED-AGENTS`; Bedrock `SRC-AWS-BEDROCK-AGENTS` |
| D-JUDGE | Ground truth vs LLM-as-judge | Do you have labels? Is the judge the metric or a helper? | Gate 5 | Durable eval |
| D-GR | Policy/deterministic filter vs model-as-filter | Can a regex/schema reject it? Must the control fail closed? | Gate 6 | Durable control theory; Bedrock Guardrails `SRC-AWS-BEDROCK-GUARDRAILS` as one vendor sketch |
| D-OTEL | OTel GenAI vs vendor tracer | Need portable spans? Accept Development-status attribute churn? | Gates 7, 9 | `SRC-OTEL-GENAI-SEMCONV` status **Development** |
| D-SQL | NL-to-SQL vs semantic layer vs fixed API | Who may see which columns? Injection? Cartesian risk? | Gate 4–6 | Durable security; no “wow demo” default |

## Explicitly not decided

LangGraph vs Microsoft Agent Framework vs CrewAI vs ADK as a **global default**. CrewAI official intro exists (`SRC-CREWAI-INTRO`); vendor “production-ready” and adoption stats remain **UNVERIFIED**.

## What should I remember?

A stub is a question with criteria. Shipping a winner without criteria is a catalog, not architecture.
