# Repository structure

Gate 0 item 4. Folders are created. **Domain folders contain only `.gitkeep` until the matching gate writes real pages.**

Layout matches the master prompt section 12.

```text
AI-Learning-repo/
  AI_Engineering_Knowledge_Repository_Master_Prompt.md
  AGENTS.md
  index.html
  .cursor/rules/*.mdc
  .cursor/skills/contribute-concept/
  .cursor/skills/advance-gate/
  00-MASTER-MAP/          Gate 0 maps and proposals
  01-FOUNDATIONS/         Gate 2
  02-PYTHON-FOR-AI/       Gate 2
  03-LLM-ENGINEERING/     Gate 2
  04-PROMPT-ENGINEERING/  Gate 2
  05-LLM-APPLICATION-ENGINEERING/  Gate 2
  06-EMBEDDINGS/          Gate 3
  07-VECTOR-DATABASES/    Gate 3
  08-RAG/                 Gate 3
  09-AGENTIC-RAG/         Gate 3
  10-AGENTS/              Gate 4
  11-AGENT-ORCHESTRATION/ Gate 4
  12-TOOLS-FUNCTION-CALLING/ Gate 4
  13-MCP/                 Gate 4
  14-MULTI-AGENT-SYSTEMS/ Gate 4
  15-NL2SQL/              Gate 4
  16-AI-DATA-ENGINEERING/ Gates 3–4
  17-LLM-DATA-PIPELINES/  Gates 3–4
  18-EVALUATION/          Gate 5
  19-OBSERVABILITY/       Gate 7 (concepts may start Gate 5)
  20-LLMOPS/              Gate 7
  21-AI-SECURITY/         Gate 6
  22-GUARDRAILS/          Gate 6
  23-PHI-PII-DLP/         Gate 6
  24-AI-GOVERNANCE/       Gate 6
  25-RESPONSIBLE-AI/      Gate 6
  26-AI-CLOUD-ARCHITECTURE/ Gate 7
  27-AZURE-AI/            Gate 7
  28-AWS-AI/              Gate 7
  29-GCP-AI/              Gate 7
  30-DATABRICKS-AI/       Gate 7
  31-DATABASE-AI/         Gates 3 and 7
  32-AI-APPLICATION-DEVELOPMENT/ Gate 7–8
  33-AI-APIS/             Gate 7
  34-AI-INFRASTRUCTURE/   Gate 7
  35-AI-CI-CD/            Gate 7
  36-AI-TESTING/          Gate 5–8
  37-AI-PERFORMANCE/      Gate 7
  38-AI-COST/             Gate 7
  39-AI-PRODUCTION-OPERATIONS/ Gate 7
  40-REFERENCE-ARCHITECTURES/ Gate 7
  41-REAL-WORLD-USE-CASES/ Gate 8 (outlines in 00-MASTER-MAP/projects.md)
  42-CAPSTONE-PROJECTS/   Gate 8
  43-EXPERIMENTS/         Gate 8+
  44-ARCHITECTURE-INTERVIEWS/ Gate 10
  45-TROUBLESHOOTING/     Gate 10
  46-DESIGN-PATTERNS/     Gate 10
  47-ANTI-PATTERNS/       Gate 10
  48-GLOSSARY/            ongoing, fill when terms are used
  49-RESEARCH-PAPERS/     as cited
  50-CHEAT-SHEETS/        Gate 10
  99-META/
    GATE-STATUS.md
    gate-plan.md
    source-strategy.md
    sources.yaml
    technology-status.yaml
    knowledge-graph.json
    templates/
```

## Conventions

- One concern per concept directory; use `99-META/templates/concept.md`.
- No empty `01-overview.md` files.
- Important claims → `source_id` in `sources.yaml`.
- Volatile pages: `last_verified`, version, primary source, status, alternatives.
- Do not rename numbered folders without updating this file, `AGENTS.md`, and the knowledge graph.

## Operating files (not in the original tree, required to apply the prompt in Cursor)

| File | Why |
|---|---|
| `AGENTS.md` | Future agents read current gate and stop rules |
| `.cursor/rules/*.mdc` | Always-on lab operating system |
| `.cursor/skills/*` | Contribute-concept and advance-gate workflows |
