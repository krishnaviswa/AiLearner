# Source strategy

Gate 0 item 8. Machine registry: [`sources.yaml`](sources.yaml).

## Goal

Keep **durable** knowledge stable for years. Refresh **volatile** implementation facts from official sources instead of baking a chat session into the repo.

## Classification

| Class | Examples | Refresh |
|---|---|---|
| Durable | What an embedding is; why retrieval exists; why authorization is required; what state means; why evaluation is needed; distributed-system principles; general architecture patterns | Rarely; only if the concept is wrong |
| Volatile | SDK syntax, model names, API endpoints, cloud SKUs, framework features, pricing, preview flags | Re-verify against Tier 1 before teaching as current |

Every technology-specific page must record: last verified, version, primary source, status, alternatives.

## Tiers

### Tier 1 (default for technical claims)

Official cloud documentation, official framework/SDK docs, official standards, architecture centers, official GitHub repositories.

### Tier 2

CNCF, Apache, Linux Foundation, NIST, OWASP, universities, research papers, established technical organizations.

### Tier 3

Reputable engineering blogs, conference talks, technical articles, high-quality GitHub repos. Use for practice notes, not as sole proof of a product capability.

### Tier 4

Community discussions, Reddit, Stack Overflow, Medium, personal blogs. Use for troubleshooting color only.

## Anti-hallucination

- Unverifiable → **UNVERIFIED**
- Do not invent APIs, SDK methods, cloud services, framework capabilities, pricing, performance numbers, adoption statistics, or architecture claims
- If sources disagree: show both, explain likely reason, state which evidence is stronger
- Label: Stable, Mature, Emerging, Preview, Deprecated, Experimental, Vendor-specific, General industry pattern (lab enum in `technology-status.yaml` uses lowercase: stable, mature, emerging, preview, experimental, deprecated, vendor-specific)

## Important technical claims

Trace to `source_id` in `sources.yaml` (fields: source_id, title, URL, publisher, date, technology, version, trust_level, last_verified, topics).

Every real-world use case, vendor capability, paper, standard, or “as used in production” claim **must** have a fetchable Tier 1/2 URL in that registry and a cite on the page. If the URL cannot be fetched, write **UNVERIFIED** — do not invent a company story, case study, or link. When a page is fetched, record: URL, date fetched, and what the page actually supports vs what we inferred.

## Gate 0 research slice (2026-09-07)

Used to outline — not to freeze versions:

- OWASP GenAI LLM Top 10 **2026** (published 2026-08; canonical GitHub `GenAI-Security-Project/GenAI-LLM-Top10`)
- NIST AI RMF 1.0 (AI 100-1) and NIST AI 600-1 Generative AI Profile (July 2024)
- MCP architecture (Host / Client / Server; tools, resources, prompts; STDIO and Streamable HTTP)
- Microsoft Agent Framework as documented successor to AutoGen + Semantic Kernel (Microsoft Learn)
- Microsoft Foundry Agent Service (hosted agents documented as **preview** in Learn; previous brand Azure AI Studio / Azure AI Foundry; URL path still `/azure/foundry/`)
- LangGraph orchestration/persistence docs (LangChain)
- OpenAI Agents SDK official docs
- LlamaIndex agents/workflows docs
- Google Agent Development Kit (ADK) docs
- Amazon Bedrock Agents / Knowledge Bases / Guardrails user guide
- Databricks managed MCP + AI Search (formerly Vector Search) docs
- OpenTelemetry GenAI semantic conventions (**Status: Development**)
- Microsoft Presidio analyzer/anonymizer docs

Pricing is **not** recorded. Verify from official price pages when Gate 7/cost pages are in scope.

## What not to do

Do not treat blog “framework death” posts as deprecation notices. Confirm maintenance/deprecation on the project’s own docs or repo.
