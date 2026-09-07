---
name: qa-gate
description: Runs the Gate QA committee (source, consistency, pedagogy, diagram, HTML) and writes a scorecard PASS/FAIL before any gate may advance. Use at gate close, after Wave 0 HTML, or when scoring Gate 0–10.
---

# QA a gate

Chair = orchestrator. Workers = source verifier, architecture/terminology, pedagogy/diagrams, HTML/browser. Parallelize only when workers will not edit the same file.

## Preconditions

1. Read `99-META/GATE-STATUS.md`. Do not author a concept whose gate is in the future.
2. Copy `99-META/qa/gate-scorecard.md` to `99-META/qa/gate-N-scorecard.md`.
3. Score only this gate's allowed artifacts (`99-META/gate-plan.md`).

## Committee

| Role | Job | Fail if |
|---|---|---|
| Source verifier | Official docs for volatile claims; `source_id`; `last_verified` | Invented SDK/SKU/price or missing UNVERIFIED |
| Consistency | Taxonomy terms, folder names, graph edges, cloud vs canonical | Contradicts `00-MASTER-MAP/reference-architecture.md` |
| Pedagogy | Sequence from `00-MASTER-MAP/learning-sequence.md`; L1 before L7 | Production dump on first page; agent where SQL/API is enough |
| Diagram QA | Mermaid parses; labels match prose; no decorative junk | Broken mermaid or diagram disagrees with text |
| HTML | Re-render MD→HTML; nav; theme; no raw `.md` links in the shell | Broken paths or unreadable tables |
| Chair | Overall PASS / FAIL / NEEDS REVIEW | Advancing on FAIL |

## Scorecard criteria

Accuracy, completeness, source quality, freshness, architecture consistency, terminology consistency, code correctness, security correctness, production realism, cross-reference integrity, learning progression.

Marks: **PASS** | **FAIL** | **NEEDS REVIEW**. Do not hide uncertainty.

## Retry

Max **two** fix loops per gate. If still blocked only on volatile vendor docs, mark those rows **UNVERIFIED** and PASS the durable remainder. Do not stall the lab on a missing SKU. Do not skip a gate on FAIL.

## Raster images

Prefer Mermaid, tables, and SVG in Markdown for architecture, sequence, and flowcharts (accurate, themeable).

If a **real picture** is required (metaphor illustrations, annotated screenshot-style teaching images — not a substitute for mermaid):

- Raster images → subagent model **gpt-5.6-sol-medium** + GenerateImage.
- The chair must **not** generate PNG/JPEG/WebP in the chair session.
- Spawn an internal Task subagent with model slug exactly `gpt-5.6-sol-medium`. That worker: (1) GetDynamicTools for namespace `cursor` tool `GenerateImage`, (2) CallDynamicTool to generate images, (3) save under `app/img/` or `00-MASTER-MAP/img/` (or the domain folder) with descriptive names, (4) wire into HTML/MD with alt text.

## Real URLs (no invented stories)

Every real-world use case, vendor capability, paper, standard, or “as used in production” claim must have a **fetchable Tier 1/2 URL** in `99-META/sources.yaml` (`source_id`, title, URL, publisher, date, `last_verified`) and a `source_id` cite on the page. If the URL cannot be fetched, mark **UNVERIFIED**. Do not invent company stories, case studies, or links. When a page is fetched, record URL, date fetched, and what it actually supports vs what we inferred.

## Checkpoints (mandatory every step)

Update, do not skip:

1. Append `99-META/qa/FACTORY-LOG.md` (timestamp, wave, gate, step, files, PASS/FAIL, UNVERIFIED, next action).
2. Write `99-META/qa/factory-state.json` and regenerate `app/js/progress-data.js` (same snapshot).
3. Keep `progress.html` working (fetch JSON over http; fallback to `progress-data.js` on `file://`).

If this chat restarts, read `factory-state.json` first and continue from `resume_from`. Never redo a completed PASS step.

## After PASS

Update `99-META/GATE-STATUS.md`. Start the next gate only under standing auto-advance or explicit named-gate approval (see `advance-gate`). Re-run `python app/tools/render-pages.py` after Markdown that learners read has changed.
