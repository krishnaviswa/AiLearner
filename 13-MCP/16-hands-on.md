---
concept_id: mcp.hands-on
title: DO — count clients
domain_folder: 13-MCP
levels_covered: [4]
knowledge_class: durable
tech_status: general-pattern
last_verified: 2026-09-07
primary_source: SRC-MCP-ARCHITECTURE
status: verified
related_nodes: [mcp-host, mcp-client]
---

# DO — one client per server

```python
def clients_for(servers: list[str]) -> dict[str, str]:
    return {s: f"client[{s}]" for s in servers}

print(clients_for(["fs-stdio", "sentry-http"]))
```

Official rule: host creates one client per server (`SRC-MCP-ARCHITECTURE`). If you built one multiplexed “god client,” you drifted from the architecture.

No MCP SDK in this lab step.
