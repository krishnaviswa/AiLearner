# Learning dependency graph

Gate 0 item 3. Read top-to-bottom. Do not skip security/evaluation until “after agents feel fun.”

```mermaid
flowchart TB
  subgraph G2[Gate 2 — Foundations]
    F[Foundations] --> PY[Python for AI]
    PY --> LLM[LLM engineering]
    LLM --> PR[Prompt engineering]
    PR --> APP[LLM applications]
  end

  subgraph G3[Gate 3 — RAG]
    APP --> EMB[Embeddings]
    EMB --> VDB[Vector DBs / search]
    VDB --> RAG[RAG]
    RAG --> ARAG[Agentic RAG]
  end

  subgraph G4[Gate 4 — Agents]
    APP --> AG[Agents]
    RAG --> AG
    AG --> TOOL[Tools / function calling]
    TOOL --> MCP[MCP]
    AG --> ORCH[Orchestration]
    ORCH --> MA[Multi-agent]
    AG --> NLQ[NL-to-SQL]
    DE[AI data engineering] --> RAG
    DE --> NLQ
  end

  subgraph G5[Gate 5 — Evaluation]
    RAG --> EV[Evaluation]
    AG --> EV
    NLQ --> EV
  end

  subgraph G6[Gate 6 — Security]
    AG --> SEC[AI security]
    MCP --> SEC
    NLQ --> SEC
    SEC --> GR[Guardrails]
    SEC --> DLP[PII/PHI/DLP]
    SEC --> GOV[Governance / responsible AI]
  end

  subgraph G7[Gate 7 — Production]
    EV --> PROD[Cloud + ref architectures]
    SEC --> PROD
    PROD --> OPS[Perf / cost / LLMOps / ops]
  end

  subgraph G8[Gate 8 — Hands-on]
    OPS --> LAB[Project ladder L1-L10]
  end
```

Note: `AG → TOOL` is a *uses* dependency (agents invoke tools). Teaching order is Tools before Agents ([learning-sequence.md](learning-sequence.md) and the taxonomy spine). Do not read that arrow as “learn agents first.”

## Hard prerequisites

| Topic | Must already understand |
|---|---|
| RAG | Embeddings, chunking purpose, why ACLs on chunks matter conceptually |
| Agents | LLM apps, tools as APIs, why a workflow may be better |
| MCP | Tools/function calling, trust boundaries, identity |
| NL-to-SQL | Query planning, SQL injection, row/column security |
| Multi-agent | Single-agent failure modes, handoff vs supervisor trade-off |
| Production ref arch | Evaluation + security + observability at least at logical level |

## Parallel tracks (safe)

- Azure vs AWS vs GCP mappings can be learned after the vendor-neutral architecture (do not start with a single vendor catalog).
- Databricks track after data-engineering + RAG, not before.
- Interview/anti-pattern folders consume later gates; do not author them first.

## Recommended sequence (human)

See [learning-sequence.md](learning-sequence.md).
