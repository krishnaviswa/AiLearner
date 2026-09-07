---
concept_id: mcp.comparison
title: MCP vs function calling vs REST
domain_folder: 13-MCP
levels_covered: [1]
knowledge_class: durable
tech_status: mature
last_verified: 2026-09-07
primary_source: SRC-MCP-ARCHITECTURE
status: verified
related_nodes: [mcp, tools]
---

# MCP vs function calling vs REST

| | Function calling | REST | MCP |
|---|---|---|---|
| What it standardizes | One runtime’s tool schema | HTTP resource | How **hosts** get tools/resources/prompts from **servers** |
| Multi-host reuse | Poor | Via your gateway | Designed for many hosts (`SRC-MCP-ARCHITECTURE`) |
| LLM usage | N/A | N/A | Explicitly **out of scope** for the protocol |
| Identity | Your code | OAuth/IAM | Still your policy |

OpenAI Agents SDK documents MCP **server tool calling** alongside function tools (`SRC-OPENAI-AGENTS-SDK`). That is an integration, not a replacement for IAM.

```mermaid
flowchart TD
  Need[Need a tool] --> One{One app only?}
  One -->|yes| FC[Function calling]
  One -->|no| Many{Shared catalog across hosts?}
  Many -->|yes| MCP[MCP]
  Many -->|no| REST[REST + your gateway]
```
