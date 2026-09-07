---
name: contribute-concept
description: Adds or expands a curriculum concept in this AI Engineering Knowledge Lab using the 15-question template, progressive levels, four learning modes, source IDs, knowledge-graph updates, and required tables or mermaid diagrams. Use when writing or editing concept pages, labs, comparisons, or domain notes under the numbered folders.
---

# Contribute a concept

## When to use

User asks to write, expand, or fix a concept in `01-FOUNDATIONS`–`50-CHEAT-SHEETS`, or a Gate 1 architecture validation page. Do not use this to jump gates or generate empty scaffolds.

## Preconditions

1. Read `99-META/GATE-STATUS.md`. If the concept belongs to a later gate, stop and say so.
2. Identify the domain folder from `00-MASTER-MAP/repository-structure.md`.
3. Read nearby related nodes in `99-META/knowledge-graph.json`.

## Write like this

1. Start with Level 1 (what is it?) and one analogy from data/cloud engineering.
2. Only add deeper levels that have real content. Allowed filenames are listed in `99-META/templates/concept.md`. **Do not create empty files.**
3. Answer the 15 questions over the set of files, not in one dump.
4. Include SEE / DO / BREAK / DESIGN where the gate allows (BREAK/DESIGN may wait for later gates if this gate is foundations-only).
5. End major topics with: remember, build, experiment, what can go wrong, Senior / Principal / Architect questions, learn next.
6. Cite `source_id` values from `99-META/sources.yaml`. Add new sources there. Volatile facts need `last_verified` and official URLs.
7. Mark unverifiable claims **UNVERIFIED**. Every vendor capability, paper, standard, or “as used in production” claim needs a **real fetchable Tier 1/2 URL** in `sources.yaml` and a cite on the page. If you cannot fetch it, UNVERIFIED — no invented company stories, case studies, or links. Record what the fetched page actually supports vs what we inferred.
8. After each authoring step, append `99-META/qa/FACTORY-LOG.md` and refresh `factory-state.json` + `app/js/progress-data.js`.
9. Add or update nodes/edges in `99-META/knowledge-graph.json`.
10. Distinguish toy vs production-oriented pipelines when implementation is in scope.
11. **Visuals (required on major process/architecture pages):** include at least one of: comparison/when-not **table**, mermaid **flowchart**, mermaid **sequence** (tool call, RAG request, agent-tool-human, MCP host-client-server), or mermaid **state/component** diagram. Do not add decorative mermaid that disagrees with the prose. Prefer Mermaid/tables/SVG over bitmaps for architecture and flows.
12. **Raster images → subagent model gpt-5.6-sol-medium + GenerateImage.** The authoring agent must not generate PNG/JPEG/WebP itself. Spawn a Task subagent with that exact model slug; the worker uses `cursor` `GenerateImage`, saves under `app/img/` or a domain `img/` folder, and wires alt text. Use bitmaps only for metaphor/SEE illustrations, never as a mermaid substitute.

## Do not

- Reteach basic Python/SQL.
- Recommend an agent when a workflow, API, or SQL query is enough.
- Invent pricing or SDK methods.
- Copy vendor marketing copy as architecture truth.
- Dual-write HTML by hand. Edit Markdown; run `python app/tools/render-pages.py`.
