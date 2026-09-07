# AI Engineering Knowledge Lab

Learning laboratory for architect-level AI engineering — not a tutorial dump.

**Current gate:** read `99-META/GATE-STATUS.md`. Learner surface is a hosted static course: `index.html` with a linear path. Markdown is the source of truth; HTML is generated.

| Start | Link |
|---|---|
| Lab home | [index.html](index.html) |
| Agent instructions | [AGENTS.md](AGENTS.md) |
| Gate status | [99-META/GATE-STATUS.md](99-META/GATE-STATUS.md) |
| Operating prompt | [AI_Engineering_Knowledge_Repository_Master_Prompt.md](AI_Engineering_Knowledge_Repository_Master_Prompt.md) |

Open the lab from **this** repo root on port **8766** (port 8000 is often another API):

```text
python -m http.server 8766
```

Then `http://127.0.0.1:8766/index.html`. Or run `.\serve-lab.ps1`. Theme: **Dark | Light**.

Empty concept files are forbidden. Do not dual-write HTML.
