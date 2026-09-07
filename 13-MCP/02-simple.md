---
concept_id: mcp.simple
title: Host connects two servers
domain_folder: 13-MCP
levels_covered: [1, 2]
knowledge_class: durable
tech_status: mature
last_verified: 2026-09-07
primary_source: SRC-MCP-ARCHITECTURE
status: verified
related_nodes: [mcp-host, mcp-client, mcp-server]
---

# Two servers, two clients (simple)

Official example pattern: a host connecting to a filesystem-style local server and a remote server creates **two client objects** (`SRC-MCP-ARCHITECTURE`).

```mermaid
sequenceDiagram
  participant Host
  participant Cl as MCP client
  participant Srv as MCP server
  Host->>Cl: create client for this server
  Cl->>Srv: initialize / handshake
  Srv-->>Cl: capabilities tools/resources/prompts
  Host->>Cl: call tool
  Cl->>Srv: tools/call
  Srv-->>Cl: result
  Cl-->>Host: context for the LLM
```

Wire method names (`tools/call`, etc.) follow the spec — confirm the current spec version before teaching a wire course. This lab does not pin a spec date beyond “docs as of 2026-09-07.”

## How it fails

| Failure | Note |
|---|---|
| Host == server confusion | Server provides context; host is the app |
| MCP as authz | Transport may have auth; **data plane grants** are still yours |
| Sampling / extra features | Re-read current spec; do not teach deprecated primitives from memory |
