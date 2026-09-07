# Factory log (append-only)

Restart-safe human log. Machine resume: [`factory-state.json`](factory-state.json). Chart: [`../../progress.html`](../../progress.html).

---

## 2026-09-07T15:10Z — wave 0 — gate 0 — bake-policy

- **Status:** PASS
- **Files:** `99-META/GATE-STATUS.md`, `.cursor/rules/ai-lab-gates.mdc`, `.cursor/rules/ai-lab-operating-system.mdc`, `.cursor/skills/advance-gate/SKILL.md`, `.cursor/skills/qa-gate/SKILL.md`, `.cursor/skills/contribute-concept/SKILL.md`, `99-META/qa/gate-scorecard.md`, `AGENTS.md`, `99-META/gate-plan.md`
- **UNVERIFIED:** none introduced
- **Next if interrupted:** `wave0-html-shell`

## 2026-09-07T15:25Z — wave 0 — gate 0 — html-shell

- **Status:** PASS
- **Files:** `app/css/lab.css`, `app/js/theme.js`, `app/js/shell.js`, `app/js/mermaid-boot.js`, `app/tools/render-pages.py`, `index.html`, `00-MASTER-MAP/html-architecture.md`, generated sibling `.html` (18 files)
- **UNVERIFIED:** mermaid CDN (jsDelivr mermaid@11) — local fallback is source text if CDN blocked
- **Next if interrupted:** `wave0-source-verify`

## 2026-09-07T15:30Z — wave 0 — gate 0 — source-verify

- **Status:** PASS (durable remainder; volatile residuals listed)
- **Files:** `99-META/sources.yaml`, `99-META/technology-status.yaml`
- **UNVERIFIED:** hosted-agents silent GA; AutoGen/SK own-project deprecation; CrewAI version pin + adoption stats; OTel GenAI spec version
- **Next if interrupted:** `wave0-diagram-arch-html-qa`

## 2026-09-07T15:45Z — wave 0 — gate 0 — image-policy

- **Status:** PASS
- **Files:** `.cursor/skills/qa-gate/SKILL.md`, `.cursor/skills/contribute-concept/SKILL.md`
- **Note:** Raster images → subagent model `gpt-5.6-sol-medium` + GenerateImage. Architecture stays Mermaid/tables.
- **Next if interrupted:** `wave0-checkpoints`

## 2026-09-07T16:00Z — wave 0 — gate 0 — checkpoints-and-progress

- **Status:** PASS (this step)
- **Files:** `99-META/qa/FACTORY-LOG.md`, `99-META/qa/factory-state.json`, `app/js/progress-data.js`, `progress.html`, `app/tools/write-factory-state.py`, `99-META/source-strategy.md`
- **UNVERIFIED:** (carry-forward from source-verify)
- **Next if interrupted:** `gate0-chair-scorecard`

## 2026-09-07T16:10Z — wave 0 — gate 0 — chair-scorecard

- **Status:** PASS
- **Files:** `99-META/qa/gate-0-scorecard.md`, `99-META/GATE-STATUS.md`
- **UNVERIFIED:** hosted-agents GA ambiguity; AutoGen/SK deprecation; CrewAI version/adoption; OTel spec version; Azure AI Search SKUs
- **Next if interrupted:** `gate1-author-validation`

## 2026-09-07T16:20Z — wave 0 — gate 1 — author-validation

- **Status:** running (pages written; Gate 1 scorecard not closed)
- **Files:** `00-MASTER-MAP/gate-1-architecture-validation.md`, `00-MASTER-MAP/technology-decision-stubs.md`, `99-META/knowledge-graph.json`, `00-MASTER-MAP/knowledge-graph-outline.md`, `00-MASTER-MAP/learning-sequence.md`
- **UNVERIFIED:** (carry-forward)
- **Next if interrupted:** `gate1-chair-scorecard`

## 2026-09-07T16:25Z — wave 0 — gate 1 — chair-scorecard

- **Status:** PASS
- **Files:** `99-META/qa/gate-1-scorecard.md`, `99-META/GATE-STATUS.md`
- **UNVERIFIED:** carry-forward only
- **Next if interrupted:** `gate2-author-spine`

## 2026-09-07T16:40Z — wave 0 — gate 2 — author-spine

- **Status:** PASS (pages written)
- **Files:** `01-FOUNDATIONS/*`, `02-PYTHON-FOR-AI/*`, `03-LLM-ENGINEERING/*`, `04-PROMPT-ENGINEERING/*`, `05-LLM-APPLICATION-ENGINEERING/*` (4 files each), `99-META/sources.yaml`, `99-META/knowledge-graph.json`
- **UNVERIFIED:** structured-outputs wire-format; model IDs / context sizes
- **Next if interrupted:** `gate2-html-and-scorecard`

## 2026-09-07T16:50Z — wave 0 — gate 2 — chair-scorecard

- **Status:** PASS
- **Files:** `99-META/qa/gate-2-scorecard.md`, `99-META/GATE-STATUS.md`, `app/tools/render-pages.py`, `app/js/shell.js`
- **UNVERIFIED:** carry-forward + structured-outputs fetch timeout
- **Next if interrupted:** `gate3-author-spine`

## 2026-09-07T17:10Z — wave 0 — gate 3 — author-spine

- **Status:** PASS (pages written)
- **Files:** `06-EMBEDDINGS/*`, `07-VECTOR-DATABASES/*`, `08-RAG/*`, `09-AGENTIC-RAG/*` (4 each), `16-AI-DATA-ENGINEERING/01-overview.md`, `17-LLM-DATA-PIPELINES/01-overview.md`, sources + graph
- **UNVERIFIED:** OpenAI embeddings/structured-outputs fields; pgvector README operators
- **Next if interrupted:** `gate3-chair-scorecard`

## 2026-09-07T17:15Z — wave 0 — gate 3 — chair-scorecard

- **Status:** PASS
- **Files:** `99-META/qa/gate-3-scorecard.md`, `99-META/GATE-STATUS.md`
- **UNVERIFIED:** as scorecard
- **Next if interrupted:** `gate4-author-spine`

## 2026-09-07T17:30Z — wave 0 — gate 4 — author-spine

- **Status:** PASS (pages written)
- **Files:** `10-AGENTS` (5), `11`–`15` (4 each), sources fetch notes, knowledge-graph.json
- **UNVERIFIED:** marketing customer lists; example model names; MCP spec pin; carry-forward
- **Next if interrupted:** `gate4-chair-scorecard`

## 2026-09-07T17:35Z — wave 0 — gate 4 — chair-scorecard

- **Status:** PASS
- **Files:** `99-META/qa/gate-4-scorecard.md`, `99-META/GATE-STATUS.md`
- **Next if interrupted:** `gate5-author-spine`

## 2026-09-07T17:50Z — wave 0 — gate 5 — author-spine

- **Status:** PASS (pages written)
- **Files:** `18-EVALUATION` (6), `36-AI-TESTING/01-overview.md`, NIST/evals sources
- **UNVERIFIED:** RMF 1.0 revision; Measure playbook; evals schema
- **Next if interrupted:** `gate5-chair-scorecard`

## 2026-09-07T17:55Z — wave 0 — gate 5 — chair-scorecard

- **Status:** PASS
- **Files:** `99-META/qa/gate-5-scorecard.md`, `99-META/GATE-STATUS.md`
- **Next if interrupted:** `gate6-author-spine`

## 2026-09-07T21:55Z — wave 0 — gate 6 — author-spine

- **Status:** PASS (pages written; QA next)
- **Files:** `21-AI-SECURITY` (3), `22-GUARDRAILS` (2), `23-PHI-PII-DLP` (3), `24-AI-GOVERNANCE` (3), `25-RESPONSIBLE-AI` (2); sources + graph v1.6.0; renderer 21–25; shell nav
- **UNVERIFIED:** NIST RMF 1.0 revision; Measure playbook subcategory steps; OWASP landing vs GitHub publish date (Aug 3 vs 4); carry-forward vendor rows
- **Next if interrupted:** `gate6-chair-scorecard`

## 2026-09-07T22:10Z — wave 0 — gate 6 — chair-scorecard

- **Status:** PASS
- **Files:** `99-META/qa/gate-6-scorecard.md`, `99-META/GATE-STATUS.md`, render 110 HTML
- **UNVERIFIED:** RMF 1.0 revision; Measure playbook; OWASP Aug 3 vs 4 date; carry-forward
- **Next if interrupted:** `gate7-author-spine`

## 2026-09-07T22:40Z — wave 0 — gate 7 — author-spine

- **Status:** PASS (pages written; QA next)
- **Files:** `26` (2), `27`/`28`/`29` stub/`30` (1 each), `40` (6), `19`/`20`/`37`/`38`/`39` (1 each); sources AgentCore + Azure Search SKU; graph v1.7.0
- **UNVERIFIED:** hosted-agents GA (not declared); dollar prices; GCP Vertex SKUs; AgentCore retrieve path; OTel spec pin
- **Next if interrupted:** `gate7-chair-scorecard`

## 2026-09-07T22:50Z — wave 0 — gate 7 — chair-scorecard

- **Status:** PASS
- **Files:** `99-META/qa/gate-7-scorecard.md`, `99-META/GATE-STATUS.md`, render 128 HTML
- **UNVERIFIED:** hosted-agents GA; prices; GCP SKUs; AgentCore retrieve; carry-forward
- **Next if interrupted:** `gate8-author-spine`

## 2026-09-07T23:05Z — wave 0 — gate 8 — author-spine

- **Status:** PASS (labs written and run)
- **Files:** `42-CAPSTONE-PROJECTS` L01–L10 + labs; `41` use-case map; `43` break_acl; graph v1.8.0
- **UNVERIFIED:** vendor SDK method names (intentionally stubbed); carry-forward Gate 7 rows
- **Next if interrupted:** `gate8-chair-scorecard`

## 2026-09-07T23:10Z — wave 0 — gate 8 — chair-scorecard

- **Status:** PASS
- **Files:** `99-META/qa/gate-8-scorecard.md`, `99-META/GATE-STATUS.md`
- **UNVERIFIED:** stub SDK names; carry-forward
- **Next if interrupted:** `gate9-author-spine`

## 2026-09-07T23:20Z — wave 0 — gate 9 — author-spine

- **Status:** in progress (UI written; render + browser QA next)
- **Files:** depth.js, why-chain.js, simulations.html, three why-chain.json, render wrap data-level
- **UNVERIFIED:** mermaid CDN if offline
- **Next if interrupted:** `gate9-chair-scorecard`

## 2026-09-07T23:35Z — wave 0 — gate 9 — chair-scorecard

- **Status:** PASS
- **Files:** `99-META/qa/gate-9-scorecard.md`, `99-META/GATE-STATUS.md`, interactive JS/HTML
- **UNVERIFIED:** live IDE-browser hops; file:// Why-chains; mermaid CDN
- **Next if interrupted:** `gate10-author-spine`

## 2026-09-07T23:40Z — wave 0 — gate 10 — author-spine

- **Status:** PASS (catalogs written)
- **Files:** `44`, `46`, `47`, `48`, `50`; graph v1.10.0; nav + renderer; learn-next on missing overviews
- **UNVERIFIED:** live IDE-browser hops; file:// Why-chains; mermaid CDN; carry-forward vendor rows
- **Next if interrupted:** `gate10-chair-scorecard`

## 2026-09-07T23:50Z — wave 0 — gate 10 — chair-scorecard

- **Status:** PASS — factory complete
- **Files:** `99-META/qa/gate-10-scorecard.md`, `99-META/GATE-STATUS.md`
- **UNVERIFIED:** live IDE-browser hops; file:// Why-chains; mermaid CDN; carry-forward
- **Next if interrupted:** `factory-complete`

## 2026-09-07T18:15Z — post-gate-10 — recent-agentic-assignments

- **Status:** authored
- **Files:** `41-REAL-WORLD-USE-CASES/recent-agentic-assignments.md`, sources.yaml rows SRC-DUOLINGO-AGENT-PLATFORM, SRC-AWS-MOBILEYE-AGENTCORE, SRC-AWS-KTERN-AGENTCORE, SRC-MS-AGENT-HARNESS-CLAW, SRC-AWS-AGENTCORE-MIGRATE, SRC-OPENAI-GPT-55, SRC-ANTHROPIC-OPUS-47, SRC-OPENAI-SWE-EVALS (timeout), knowledge-graph v1.10.1
- **UNVERIFIED:** all publisher ROI/accuracy percentages; OpenAI SWE-evals page fetch timeout
- **Next if interrupted:** re-render HTML; re-fetch SRC-OPENAI-SWE-EVALS

## 2026-09-07T18:45Z — post-gate-10 — seamless-existing-html-path

- **Status:** authored
- **Files:** `app/tools/render-pages.py` `write_learn_path()` generates `learn-path.js` from Markdown/HTML that exists; sidebar is one topic per folder; no empty Advanced/Architecture stubs
- **UNVERIFIED:** none
- **Next if interrupted:** run `python app/tools/render-pages.py`
