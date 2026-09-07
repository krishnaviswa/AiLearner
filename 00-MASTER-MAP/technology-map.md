# Technology map

Gate 0 item 6. Status registry: [`../99-META/technology-status.yaml`](../99-META/technology-status.yaml).

This is a **maintainable matrix outline**. Cells are not scores. Do not invent pricing or adoption stats. Re-verify versions at implementation gates.

## How to use

1. Pick the **category** (durable need).
2. Read **when to use / not** (judgment).
3. Open official docs (Tier 1) before writing code.
4. Prefer workflow/API/SQL when an agent is unnecessary.

## Matrix (Gate 0)

| Category | Technology | Purpose | Maturity (this repo) | When to use | When not to use |
|---|---|---|---|---|---|
| Protocol | MCP | Standard tool/resource/prompt interface | Mature protocol, evolving spec | Multiple hosts need the same tools; enterprise tool catalog | Simple one-off function tools in a single app — plain function calling may be enough |
| Orchestration | LangGraph | Durable stateful graphs, HITL, mix deterministic + agentic | Mature (docs) | Long-running, restartable, explicit control | Throwaway chat prototype |
| Agents | Microsoft Agent Framework | Agents + workflows; MS-documented successor to AutoGen/SK | Emerging / current MS path | Azure/.NET or migrating off SK/AutoGen | Need to confirm package/version first; not a cloud-neutral default |
| Agents | OpenAI Agents SDK | Few primitives: agents, handoffs, guardrails, sandbox | Mature (official SDK) | OpenAI-centric apps, sandbox workspaces | Strong multi-cloud lock-in concern |
| Data/RAG agents | LlamaIndex | Agents/workflows over data | Mature (docs) | RAG-heavy knowledge assistants | Treat as the only orchestration runtime without checking durability needs |
| Agents | Google ADK | OSS agent kit, GCP-aligned | Emerging | GCP/Vertex-centric teams | Assuming feature parity with LangGraph without reading ADK docs |
| Managed runtime | Foundry Agent Service (Microsoft Foundry Agent Service) | Managed/hosted agents | Hosted agents **preview** | Azure enterprise hosting | Treating preview hosting as GA |
| Managed runtime | Bedrock Agents | Managed agents + KB + guardrails | Vendor-specific | AWS-native estates | Portability-first architectures |
| Lakehouse retrieval | Databricks AI Search | Governed semantic/hybrid search | Vendor-specific | Data already in UC/lakehouse | Forcing Databricks as the vector DB for a non-lakehouse app |
| Observability | OTel GenAI semconv | Standard traces/metrics | Development (official document status; not Stable) | New instrumentation; expect attribute change | Assuming production-stable names; OTel says Development SHOULD NOT be treated as production-stable (`SRC-OTEL-GENAI-SEMCONV`) |
| DLP | Presidio | PII detect/anonymize | Mature OSS | Layer in a pipeline | Sole compliance control |
| Predecessor | AutoGen / Semantic Kernel | Historical patterns | Successor language on MS Learn — **not** a deprecation notice | Reading old code / migration | New greenfield (verify current support on their own repos; do not teach as deprecated) |
| Agents | CrewAI | Role-based crews + event-driven Flows (official intro) | Emerging (official docs) | After reading official docs in Gate 4 | Vendor “production-ready” claims remain **UNVERIFIED**; not a default orchestrator |

## Decision guides to write in later gates (do not decide now)

- Vector DB vs search engine
- RAG vs fine-tuning
- Workflow vs agent
- Single vs multi-agent
- LangGraph vs other orchestrators
- Azure AI Search vs pgvector
- Batch vs streaming
- REST vs MCP
- SQL agent vs semantic layer
- LLM classifier vs deterministic rules
- Managed vs open source
- Large vs small model

Each guide needs: criteria, default if justified, exceptions, trade-offs, cost, complexity, ops burden, security, lock-in. **No unsupported absolute recommendations.**

## Cloud platforms (category only)

Azure (Microsoft Foundry / Entra / Purview family; previous brand Azure AI Studio / Azure AI Foundry) · AWS (Bedrock / IAM) · GCP (Vertex / ADK / BigQuery gravity) · Databricks (UC + AI Search + MCP). Choose by **data gravity and identity plane**, not a feature bingo card from blogs.

## Explicitly out of Gate 0

Model name leaderboards, token prices, “best framework 2026” rankings.
