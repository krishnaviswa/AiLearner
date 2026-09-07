# Knowledge graph outline

Gate 0 item 2. Machine-readable file: [`../99-META/knowledge-graph.json`](../99-META/knowledge-graph.json).

This is an **outline**: core nodes and relations only. Gate 1 validates and extends. Gate 10 is full cross-link.

## Core motif (from the master prompt)

```text
Agent
  ├── uses → LLM
  ├── uses → State
  ├── may use → Memory
  ├── uses → Tools
  ├── may use → RAG
  └── requires → Evaluation

Tool
  ├── may be → API
  ├── may be → MCP
  └── requires → Authorization

RAG
  ├── uses → Chunking
  ├── uses → Embeddings
  ├── uses → Retrieval
  ├── may use → Reranking
  └── requires → Evaluation
```

## MCP motif (official architecture, SRC-MCP-ARCHITECTURE)

```text
MCP host (AI application)
  └── creates one MCP client per server
        └── dedicated connection → MCP server
              ├── tools
              ├── resources
              └── prompts

Transports: STDIO (local) | Streamable HTTP (remote)
```

MCP is a **context-exchange protocol**. It does not dictate how the host uses an LLM.

## How to grow the graph later

1. Add a node when a concept gets a real page (`concept_id`).
2. Add edges only for relations we are willing to defend (uses / requires / may-use / specializes / constrains).
3. Do not add vendor SKUs as core nodes; put those in `technology-status.yaml`.
4. Render interactively in Gate 9.
5. Gate 10 (2026-09-07): machine graph **v1.10.0** adds catalog nodes (`glossary`, `cheat-sheets`, `interviews`, `design-patterns`, `anti-patterns`) plus taught-folder nodes for `17`, `27–30`, `36`, `39`. Indexes only; they do not invent domains.

## Intentionally missing from v0.1

Per-framework class names, model catalogs, price nodes, and every RAG pipeline stage as its own node. Those belong when the matching gate writes real content.

Gate 1 (2026-09-07): dropped `agent` → `may-be` → `workflow`; added `workflow` → `alternative-to` → `agent` and `when-not-agent`. `simple-llm-app` and `structured-output` are `kind: app-flavor`. See [gate-1-architecture-validation.md](gate-1-architecture-validation.md).
