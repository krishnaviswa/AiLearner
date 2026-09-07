---
concept_id: tools.comparison
title: Function call vs REST vs MCP
domain_folder: 12-TOOLS-FUNCTION-CALLING
levels_covered: [1]
knowledge_class: durable
tech_status: general-pattern
last_verified: 2026-09-07
primary_source: SRC-MCP-ARCHITECTURE
status: verified
related_nodes: [tools, mcp]
---

# Function call vs REST vs MCP

| | In-process function | REST you own | MCP |
|---|---|---|---|
| Catalog | One app | One app / gateway | Many hosts, one server (`SRC-MCP-ARCHITECTURE`) |
| Transport | Call stack | HTTP | STDIO or Streamable HTTP |
| Authz | Your IAM | Your IAM | Still **your** IAM — protocol ≠ permission |

See [13](../13-MCP/19-comparison.md).
