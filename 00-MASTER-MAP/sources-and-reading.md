---
concept_id: map.sources-and-reading
title: Sources and further reading
domain_folder: 00-MASTER-MAP
levels_covered: [1]
knowledge_class: durable
tech_status: general-pattern
last_verified: 2026-09-07
primary_source: SRC-OWASP-LLM-TOP10-2026-GH
status: verified
related_nodes: [rag, agent, evaluation]
---

# Sources and further reading

This lab is built from a **local registry**, not from a chat model’s memory. Machine file: [`99-META/sources.yaml`](../99-META/sources.yaml).

On a concept page, the **Sources used** box lists `SRC-…` ids that appear in that lesson. **Further reading** lists other registry rows for the same topic.

## How to read a source row

| Field | Meaning |
|---|---|
| `trust_level` 1 | Official cloud / framework / SDK / standards |
| `trust_level` 2 | OWASP, NIST, CNCF, papers, established orgs |
| `last_verified` | Date we fetched the URL |
| `fetch_note` | What the page actually supported vs what we refused to invent |
| **UNVERIFIED** | We could not confirm — do not treat as fact |

Volatile facts (SKU names, preview flags, prices, context-window integers) must be re-read on the vendor page. This lab does **not** copy dollar rates.

## Built from (spine)

| Topic | Start here | Then read |
|---|---|---|
| Tokens | [tiktoken README](https://github.com/openai/tiktoken) (`SRC-TIKTOKEN`) | [Count tokens cookbook](https://github.com/openai/openai-cookbook/blob/main/examples/How_to_count_tokens_with_tiktoken.ipynb) |
| Function vs agent | [Microsoft Agent Framework](https://learn.microsoft.com/en-us/agent-framework/overview/) | [OpenAI Agents SDK](https://openai.github.io/openai-agents-python/) · [Google ADK](https://google.github.io/adk-docs/) |
| RAG products | [Google RAG Engine overview](https://cloud.google.com/vertex-ai/generative-ai/docs/rag-overview) | [Azure agentic retrieval](https://learn.microsoft.com/en-us/azure/search/agentic-retrieval-overview) · [Bedrock KB retrieve](https://docs.aws.amazon.com/bedrock/latest/userguide/kb-how-retrieval.html) · [Databricks AI Search](https://docs.databricks.com/gcp/en/agents/mcp-tools/ai-search) |
| Security | [OWASP LLM Top 10 2026](https://github.com/GenAI-Security-Project/GenAI-LLM-Top10/tree/main/2026/final) | [NIST AI RMF 1.0](https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-ai-rmf-10) · [NIST AI 600-1](https://doi.org/10.6028/NIST.AI.600-1) |
| Eval | [openai/evals](https://github.com/openai/evals) | Gold sets first — judge later |
| MCP | [MCP intro](https://modelcontextprotocol.io/docs/getting-started/intro) | [Architecture](https://modelcontextprotocol.io/docs/learn/architecture) |
| Recent agentic assignments (2026) | [This lab’s digest](../41-REAL-WORLD-USE-CASES/recent-agentic-assignments.md) | [Duolingo platform](https://blog.duolingo.com/production-ready-ai-agent-platform/) · [Mobileye / AgentCore](https://aws.amazon.com/blogs/machine-learning/how-mobileye-transformed-support-operations-using-amazon-bedrock-agentcore/) · [KTern SAP](https://aws.amazon.com/blogs/machine-learning/how-ktern-ai-built-agentic-ai-for-sap-on-amazon-bedrock-agentcore/) · [Microsoft claw harness](https://devblogs.microsoft.com/agent-framework/agent-harness-making-your-claw-production-ready/) · [Claude Opus 4.7](https://www.anthropic.com/news/claude-opus-4-7) · [GPT-5.5](https://openai.com/index/introducing-gpt-5-5/) |

## Depth on the same topic

On Foundations, RAG, and Agents the pills are **Simple → Medium → Complex**. Complex is the vendor map for that topic. Other domains still have Overview / Simple / When not / Do until the same three files are written — we do not scaffold empty Medium/Complex pages.

## What should I learn next?

[Learning sequence](learning-sequence.md) · [Foundations Simple](../01-FOUNDATIONS/02-simple.md)
