# Proposed interactive HTML architecture

Gate 0 item 11. **Do not build the full app until Gate 9 is approved.**

Current shells: [`../index.html`](../index.html) (lab home) and [`index.html`](index.html) (this folder’s artifact index). Local-first: HTML, CSS, JS, Markdown, JSON, YAML, Mermaid. No backend unless a later gate proves it necessary.

## Goals

Navigation tree · concept pages · depth selector · expand/collapse · diagrams · decision trees · simulations · quizzes · architecture challenges · progress tracking where practical · related-concept links · source references · freshness indicators.

Progressive disclosure: do not show production architecture on first view.

## Proposed app layout (Gate 9)

```text
/
  index.html                 shell: nav + depth + content pane
  app/
    css/lab.css
    js/nav.js
    js/depth.js
    js/why-chain.js
    js/graph.js              reads 99-META/knowledge-graph.json
    js/progress.js           localStorage only
  00-MASTER-MAP/             maps
  NN-DOMAIN/**/*.md          rendered in-pane (static fetch)
  99-META/                   sources + freshness badges
```

No build step required for Gate 9 v1 (marked markdown or pre-rendered HTML). A bundler is optional later.

## Depth selector

`Simple — Medium — Hard — Engineering — Architect — Production — Expert`

These seven UI labels are **not** a 1:1 rename of curriculum levels L1–L8 (Simple → Logical → Mechanical → Implementation → Engineering → Architect → Production → Principal). Mapping is deferred to Gate 9.

Changing depth must not lose the current concept.

## “Why?” chains

Important statements are expandable reasoning chains (example: vector DB → semantic retrieval → keyword gaps → why not only an LLM → why hybrid). Stored as JSON beside the page, not generated live by an LLM.

## Simulations (small, honest)

- Agent tool-picker (order lookup)
- Failure: tool down → retry / fallback / human / fail
- RAG: chunk size, top-K, hybrid, rerank — **conceptual effects only**
- NL-to-SQL: reject unsafe SQL

Do not imply toy metrics are production performance.

## Architecture challenges

Free-text or structured rubric. Compare against considerations, not a single correct answer.

## What Gate 0 ships vs Wave 0 vs Gate 9

Gate 0: maps, graphs, source strategy, and a readable home page. Curriculum domains stay empty.

**Wave 0 (factory bake, not Gate 9):** shared dark/light CSS, theme toggle (`localStorage`), injected nav, and generated `.html` siblings from Gate 0 Markdown via `app/tools/render-pages.py`. Browser links `.html` only. Markdown remains the source of truth.

**Gate 9:** depth selector, Why? chains, graph explorer, simulations on top of this shell. Do not implement those now.

```mermaid
flowchart LR
  MD[Markdown source] --> R[render-pages.py]
  R --> HTML[HTML read model]
  HTML --> Shell[theme + nav + mermaid]
```
