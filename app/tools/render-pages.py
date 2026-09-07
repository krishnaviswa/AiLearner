#!/usr/bin/env python3
"""Generate sibling HTML views from Markdown. Markdown remains the source of truth.

Usage (from repo root):
    python app/tools/render-pages.py

Does not HTML-ize .cursor/ or AI_Engineering_Knowledge_Repository_Master_Prompt.md.
Rewrites in-page .md hrefs to .html except those skipped files.
"""

from __future__ import annotations

import html
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]

SKIP_MD_HREF = {
    "AI_Engineering_Knowledge_Repository_Master_Prompt.md",
}

# Learner-facing Markdown to render (relative to repo root).
RENDER_FILES = [
    "AGENTS.md",
    "README.md",
    "why-chains.md",
    "99-META/GATE-STATUS.md",
    "99-META/gate-plan.md",
    "99-META/source-strategy.md",
]

MASTER_MAP_DIR = ROOT / "00-MASTER-MAP"
META_DIR = ROOT / "99-META"


def depth_prefix(rel: Path) -> str:
    n = len(rel.parts) - 1
    if n <= 0:
        return ""
    return "../" * n


STEM_META = {
    "01-overview": (1, "Overview"),
    "02-simple": (2, "Simple"),
    "03-logical": (3, "Medium"),
    "04-mechanical": (3, "Mechanical"),
    "05-implementation": (4, "Implement"),
    "06-engineering": (5, "Engineering"),
    "07-architecture": (6, "Architect"),
    "08-production": (7, "Production"),
    "09-security": (6, "Security"),
    "10-evaluation": (5, "Evaluation"),
    "14-failure-modes": (5, "Failures"),
    "15-real-world-example": (6, "Complex"),
    "16-hands-on": (4, "Do"),
    "17-break-lab": (4, "Break"),
    "19-comparison": (2, "When not"),
    "recent-agentic-assignments": (6, "Recent"),
    "A-enterprise-rag": (6, "A — RAG"),
    "B-enterprise-agent": (6, "B — Agent"),
    "C-nl2sql": (6, "C — NL2SQL"),
    "D-data-engineering-agent": (6, "D — Data agent"),
    "E-multi-agent": (6, "E — Multi-agent"),
    "L01": (4, "L1"),
    "L02": (4, "L2"),
    "L03": (4, "L3"),
    "L04": (4, "L4"),
    "L05": (4, "L5"),
    "L06": (4, "L6"),
    "L07": (4, "L7"),
    "L08": (4, "L8"),
    "L09": (4, "L9"),
    "L10": (4, "L10"),
    "eval": (2, "Eval sheet"),
    "mcp-vs-tools": (2, "MCP vs tools"),
    "rag-vs-agent": (2, "RAG vs agent"),
    "security-top10": (2, "OWASP map"),
}

# Same topic: Overview | Simple | Medium | Complex, then When not | Do.
PILL_ORDER = [
    "01-overview",
    "02-simple",
    "03-logical",
    "15-real-world-example",
    "19-comparison",
    "16-hands-on",
    "04-mechanical",
    "05-implementation",
    "06-engineering",
    "07-architecture",
    "08-production",
    "09-security",
    "10-evaluation",
    "14-failure-modes",
    "17-break-lab",
    "recent-agentic-assignments",
    "A-enterprise-rag",
    "B-enterprise-agent",
    "C-nl2sql",
    "D-data-engineering-agent",
    "E-multi-agent",
    "L01",
    "L02",
    "L03",
    "L04",
    "L05",
    "L06",
    "L07",
    "L08",
    "L09",
    "L10",
    "rag-vs-agent",
    "mcp-vs-tools",
    "eval",
    "security-top10",
]


def strip_frontmatter(text: str) -> str:
    """Remove YAML --- ... --- so it never becomes <hr> + concept_id in HTML."""
    if text.startswith("\ufeff"):
        text = text[1:]
    match = re.match(r"^---[ \t]*\r?\n.*?\r?\n---[ \t]*\r?\n?", text, re.DOTALL)
    if not match:
        return text
    return text[match.end() :].lstrip("\r\n")


def rewrite_md_hrefs(content: str) -> str:
    def repl_md(match: re.Match[str]) -> str:
        prefix, target, rest = match.group(1), match.group(2), match.group(3)
        name = Path(target).name
        if name in SKIP_MD_HREF:
            return match.group(0)
        if "/.cursor/" in target.replace("\\", "/") or target.startswith(".cursor/"):
            return match.group(0)
        return f"{prefix}{target[:-3]}.html{rest}"

    content = re.sub(
        r'(href=")([^"]+\.md)(\")',
        repl_md,
        content,
        flags=re.IGNORECASE,
    )
    # Markdown-style leftover in HTML text is already converted; also rewrite
    # src-less anchors produced as <a href="foo.md">.
    return content


def postprocess_code_blocks(html_body: str) -> str:
    """Turn language-mermaid code blocks into pre.mermaid for mermaid-boot.js."""

    def mermaid_pre(match: re.Match[str]) -> str:
        inner = match.group(1)
        inner = html.unescape(inner)
        return f'<pre class="mermaid">{html.escape(inner)}</pre>'

    html_body = re.sub(
        r'<pre><code class="language-mermaid">(.*?)</code></pre>',
        mermaid_pre,
        html_body,
        flags=re.DOTALL | re.IGNORECASE,
    )
    return html_body


def convert_markdown(text: str) -> str:
    try:
        import markdown  # type: ignore
    except ImportError:
        print("Installing markdown…", file=sys.stderr)
        import subprocess

        subprocess.check_call(
            [sys.executable, "-m", "pip", "install", "markdown", "--quiet"]
        )
        import markdown  # type: ignore

    md = markdown.Markdown(
        extensions=[
            "markdown.extensions.tables",
            "markdown.extensions.fenced_code",
            "markdown.extensions.sane_lists",
        ]
    )
    return md.convert(text)


def page_shell(title: str, body: str, rel: Path, source_md: str) -> str:
    prefix = depth_prefix(rel)
    body = postprocess_code_blocks(body)
    body = rewrite_md_hrefs(body)
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{html.escape(title)} — AI Engineering Knowledge Lab</title>
  <script src="{prefix}app/js/theme.js"></script>
  <link rel="stylesheet" href="{prefix}app/css/lab.css">
</head>
<body>
  <div id="lab-root" data-root="{prefix or "."}"></div>
  <article class="lab-article">
    <p class="md-source">Source: <code>{html.escape(source_md)}</code></p>
    {body}
  </article>
  <script src="{prefix}app/js/learn-path.js"></script>
  <script src="{prefix}app/js/page-index.js"></script>
  <script src="{prefix}app/js/sources-index.js"></script>
  <script src="{prefix}app/js/shell.js"></script>
  <script src="{prefix}app/js/depth.js"></script>
  <script src="{prefix}app/js/why-chain.js"></script>
  <script src="{prefix}app/js/refs.js"></script>
  <script src="{prefix}app/js/mermaid-boot.js"></script>
</body>
</html>
"""


def title_from_md(text: str, fallback: str) -> str:
    for line in text.splitlines():
        if line.startswith("# "):
            return line[2:].strip()
    return fallback


def render_one(md_path: Path) -> Path:
    rel_md = md_path.relative_to(ROOT)
    html_path = md_path.with_suffix(".html")
    text = strip_frontmatter(md_path.read_text(encoding="utf-8"))
    body = convert_markdown(text)
    title = title_from_md(text, md_path.stem)
    html_path.write_text(
        page_shell(title, body, html_path.relative_to(ROOT), str(rel_md).replace("\\", "/")),
        encoding="utf-8",
    )
    return html_path


def write_master_map_index() -> Path:
    """00-MASTER-MAP/index.html — HTML links only, generated from the folder listing."""
    items = sorted(MASTER_MAP_DIR.glob("*.md"))
    lis = []
    for p in items:
        lis.append(
            f'<li><a href="{p.with_suffix(".html").name}">{html.escape(p.stem)}</a></li>'
        )
    body = (
        "<h1>00-MASTER-MAP</h1>"
        "<p>Maps and graphs. Markdown is the source; these are generated views. "
        "The course itself is the linear path from Home (Previous / Next), not this full list.</p>"
        "<ol>\n"
        + "\n".join(lis)
        + "\n</ol>"
        '<p>Machine graph: <a href="../99-META/knowledge-graph.json">knowledge-graph.json</a> '
        '(raw). Technology status: <a href="../99-META/technology-status.yaml">technology-status.yaml</a>.</p>'
    )
    rel = Path("00-MASTER-MAP/index.html")
    out = MASTER_MAP_DIR / "index.html"
    out.write_text(
        page_shell("Master map", body, rel, "00-MASTER-MAP/*.md"),
        encoding="utf-8",
    )
    return out


def collect_targets() -> list[Path]:
    files: list[Path] = []
    for rel in RENDER_FILES:
        p = ROOT / rel
        if p.is_file():
            files.append(p)
    if MASTER_MAP_DIR.is_dir():
        files.extend(sorted(MASTER_MAP_DIR.glob("*.md")))
    qa = META_DIR / "qa"
    if qa.is_dir():
        files.extend(sorted(qa.glob("*.md")))
    for folder in sorted(ROOT.iterdir()):
        if folder.is_dir() and folder.name[:2].isdigit() and folder.name[2:3] == "-":
            if folder.name.startswith("00-"):
                continue
            # Render numbered domains that already have Markdown (skip empty 31–35, 45, 49).
            prefix = int(folder.name[:2])
            if 1 <= prefix <= 30 or 36 <= prefix <= 44 or prefix in (46, 47, 48, 50):
                files.extend(sorted(folder.glob("*.md")))
    return files


FOLDER_TOPICS = {
    "01-FOUNDATIONS": ["tokens", "token-counting", "structured-output", "workflows"],
    "05-LLM-APPLICATION-ENGINEERING": ["structured-output", "evals"],
    "06-EMBEDDINGS": ["embeddings", "vector-search"],
    "07-VECTOR-DATABASES": ["vector-search", "postgres", "hybrid-search"],
    "08-RAG": ["rag", "embeddings", "retrieval", "hybrid-search", "search", "citations"],
    "09-AGENTIC-RAG": ["rag", "agents", "retrieval"],
    "10-AGENTS": ["agents", "workflows", "handoffs", "hitl", "mcp"],
    "12-TOOLS-FUNCTION-CALLING": ["agents", "mcp"],
    "13-MCP": ["mcp", "tools"],
    "14-MULTI-AGENT-SYSTEMS": ["agents", "crews"],
    "18-EVALUATION": ["evals", "benchmarks"],
    "21-AI-SECURITY": ["prompt-injection", "excessive-agency", "llm01", "llm09"],
    "22-GUARDRAILS": ["guardrails", "content-filters"],
    "23-PHI-PII-DLP": ["pii", "anonymization"],
    "24-AI-GOVERNANCE": ["govern", "ai-rmf"],
    "26-AI-CLOUD-ARCHITECTURE": ["rag", "agents"],
    "41-REAL-WORLD-USE-CASES": ["agents", "mcp", "evaluation", "workflows", "support"],
}


def parse_sources_yaml(text: str) -> list[dict]:
    entries: list[dict] = []
    current: dict | None = None
    for raw in text.splitlines():
        if re.match(r"\s+- source_id:", raw):
            if current:
                entries.append(current)
            current = {
                "id": raw.split(":", 1)[1].strip(),
                "title": "",
                "url": "",
                "publisher": "",
                "topics": [],
            }
            continue
        if current is None:
            continue
        if re.match(r"\s+title:", raw):
            current["title"] = raw.split(":", 1)[1].strip()
        elif re.match(r"\s+URL:", raw):
            current["url"] = raw.split(":", 1)[1].strip()
        elif re.match(r"\s+publisher:", raw):
            current["publisher"] = raw.split(":", 1)[1].strip()
        elif re.match(r"\s+topics:", raw):
            inner = raw.split(":", 1)[1].strip().strip("[]")
            current["topics"] = [t.strip() for t in inner.split(",") if t.strip()]
    if current:
        entries.append(current)
    return entries


def write_sources_index() -> Path:
    import json

    src = META_DIR / "sources.yaml"
    entries = parse_sources_yaml(src.read_text(encoding="utf-8")) if src.is_file() else []
    by_id = {e["id"]: e for e in entries if e.get("id")}
    out = ROOT / "app" / "js" / "sources-index.js"
    payload = {
        "sources": by_id,
        "folder_topics": FOLDER_TOPICS,
    }
    out.write_text(
        "/* Generated from 99-META/sources.yaml — do not edit by hand. */\n"
        f"window.LAB_SOURCES = {json.dumps(payload, indent=2)};\n",
        encoding="utf-8",
    )
    return out


FOLDER_MODULE = {
    "00-MASTER-MAP": "map",
    "01-FOUNDATIONS": "foundations",
    "02-PYTHON-FOR-AI": "foundations",
    "03-LLM-ENGINEERING": "foundations",
    "04-PROMPT-ENGINEERING": "foundations",
    "05-LLM-APPLICATION-ENGINEERING": "foundations",
    "06-EMBEDDINGS": "rag",
    "07-VECTOR-DATABASES": "rag",
    "08-RAG": "rag",
    "09-AGENTIC-RAG": "rag",
    "10-AGENTS": "agents",
    "12-TOOLS-FUNCTION-CALLING": "agents",
    "13-MCP": "agents",
    "11-AGENT-ORCHESTRATION": "agents",
    "14-MULTI-AGENT-SYSTEMS": "agents",
    "15-NL2SQL": "agents",
    "16-AI-DATA-ENGINEERING": "agents",
    "17-LLM-DATA-PIPELINES": "agents",
    "18-EVALUATION": "eval",
    "21-AI-SECURITY": "security",
    "22-GUARDRAILS": "security",
    "23-PHI-PII-DLP": "security",
    "24-AI-GOVERNANCE": "security",
    "25-RESPONSIBLE-AI": "security",
    "19-OBSERVABILITY": "production",
    "20-LLMOPS": "production",
    "36-AI-TESTING": "production",
    "37-AI-PERFORMANCE": "production",
    "38-AI-COST": "production",
    "39-AI-PRODUCTION-OPERATIONS": "production",
    "26-AI-CLOUD-ARCHITECTURE": "production",
    "40-REFERENCE-ARCHITECTURES": "production",
    "27-AZURE-AI": "production",
    "28-AWS-AI": "production",
    "29-GCP-AI": "production",
    "30-DATABRICKS-AI": "production",
    "41-REAL-WORLD-USE-CASES": "labs",
    "42-CAPSTONE-PROJECTS": "labs",
    "43-EXPERIMENTS": "labs",
    "48-GLOSSARY": "reference",
    "50-CHEAT-SHEETS": "reference",
    "46-DESIGN-PATTERNS": "reference",
    "47-ANTI-PATTERNS": "reference",
    "44-ARCHITECTURE-INTERVIEWS": "reference",
}

# Teaching order. Empty 31–35, 45, 49 stay off the path.
FOLDER_ORDER = [
    "00-MASTER-MAP",
    "01-FOUNDATIONS",
    "02-PYTHON-FOR-AI",
    "03-LLM-ENGINEERING",
    "04-PROMPT-ENGINEERING",
    "05-LLM-APPLICATION-ENGINEERING",
    "06-EMBEDDINGS",
    "07-VECTOR-DATABASES",
    "08-RAG",
    "09-AGENTIC-RAG",
    "10-AGENTS",
    "12-TOOLS-FUNCTION-CALLING",
    "13-MCP",
    "11-AGENT-ORCHESTRATION",
    "14-MULTI-AGENT-SYSTEMS",
    "15-NL2SQL",
    "16-AI-DATA-ENGINEERING",
    "17-LLM-DATA-PIPELINES",
    "18-EVALUATION",
    "21-AI-SECURITY",
    "22-GUARDRAILS",
    "23-PHI-PII-DLP",
    "24-AI-GOVERNANCE",
    "25-RESPONSIBLE-AI",
    "19-OBSERVABILITY",
    "20-LLMOPS",
    "36-AI-TESTING",
    "37-AI-PERFORMANCE",
    "38-AI-COST",
    "39-AI-PRODUCTION-OPERATIONS",
    "26-AI-CLOUD-ARCHITECTURE",
    "40-REFERENCE-ARCHITECTURES",
    "27-AZURE-AI",
    "28-AWS-AI",
    "29-GCP-AI",
    "30-DATABRICKS-AI",
    "41-REAL-WORLD-USE-CASES",
    "42-CAPSTONE-PROJECTS",
    "43-EXPERIMENTS",
    "48-GLOSSARY",
    "50-CHEAT-SHEETS",
    "46-DESIGN-PATTERNS",
    "47-ANTI-PATTERNS",
    "44-ARCHITECTURE-INTERVIEWS",
]

MAP_COURSE = [
    "master-mindmap",
    "hybrid-knowledge-architecture",
    "reference-architecture",
    "learning-sequence",
    "sources-and-reading",
]


def md_title(md_path: Path, fallback: str) -> str:
    if not md_path.is_file():
        return fallback
    return title_from_md(strip_frontmatter(md_path.read_text(encoding="utf-8")), fallback)


def write_learn_path() -> Path:
    """Linear path = HTML that already exists. Do not invent missing Advanced pages."""
    import json

    rank = {stem: i for i, stem in enumerate(PILL_ORDER)}
    lessons: list[dict] = [
        {
            "href": "index.html",
            "title": "Start",
            "module": "start",
            "folder": "",
            "section": "Start",
        }
    ]

    for folder in FOLDER_ORDER:
        module = FOLDER_MODULE.get(folder)
        if not module:
            continue
        d = ROOT / folder
        if not d.is_dir():
            continue
        mds = [p for p in d.glob("*.md") if p.stem != "README"]
        if folder == "00-MASTER-MAP":
            allowed = set(MAP_COURSE)
            mds = [p for p in mds if p.stem in allowed]
            mds.sort(key=lambda p: MAP_COURSE.index(p.stem) if p.stem in allowed else 99)
        else:
            mds.sort(key=lambda p: (rank.get(p.stem, 100), p.stem))
        if not mds:
            continue
        section = md_title(d / "01-overview.md", folder.split("-", 1)[-1].replace("-", " "))
        if folder == "00-MASTER-MAP":
            section = "Map"
        for md_path in mds:
            html_rel = f"{folder}/{md_path.stem}.html"
            title = md_title(md_path, md_path.stem.replace("-", " "))
            lessons.append(
                {
                    "href": html_rel,
                    "title": title,
                    "module": module,
                    "folder": folder,
                    "section": section,
                }
            )
        if folder == "00-MASTER-MAP" and (ROOT / "why-chains.md").is_file():
            lessons.append(
                {
                    "href": "why-chains.html",
                    "title": md_title(ROOT / "why-chains.md", "Why-chains"),
                    "module": "map",
                    "folder": "00-MASTER-MAP",
                    "section": "Map",
                }
            )
        if folder == "43-EXPERIMENTS":
            lessons.append(
                {
                    "href": "simulations.html",
                    "title": "Simulations",
                    "module": "labs",
                    "folder": "",
                    "section": "Simulations",
                }
            )

    modules = [
        {"id": "start", "label": "Start"},
        {"id": "map", "label": "Map"},
        {"id": "foundations", "label": "Foundations"},
        {"id": "rag", "label": "RAG"},
        {"id": "agents", "label": "Agents"},
        {"id": "eval", "label": "Eval"},
        {"id": "security", "label": "Security"},
        {"id": "production", "label": "Production"},
        {"id": "labs", "label": "Labs"},
        {"id": "reference", "label": "Reference"},
    ]

    out = ROOT / "app" / "js" / "learn-path.js"
    payload_lessons = json.dumps(lessons, indent=2)
    payload_mods = json.dumps(modules, indent=2)
    out.write_text(
        "/* Generated by app/tools/render-pages.py from HTML/Markdown that exists. */\n"
        "(function () {\n"
        f"  var L = {payload_lessons};\n"
        f"  var MODULES = {payload_mods};\n"
        r"""
  function relPath() {
    var path = window.location.pathname.replace(/\\/g, "/");
    var parts = path.split("/").filter(Boolean);
    var file = parts[parts.length - 1] || "index.html";
    if (!/\.html$/i.test(file) && file.indexOf(".") === -1) file = "index.html";
    var parent = parts.length >= 2 ? parts[parts.length - 2] : "";
    if (parent === "00-MASTER-MAP") return "00-MASTER-MAP/" + file;
    if (parent === "99-META") return "99-META/" + file;
    if (/^\d{2}-/.test(parent)) return parent + "/" + file;
    return file;
  }

  function folderOf(href) {
    var i = href.lastIndexOf("/");
    return i === -1 ? "" : href.slice(0, i);
  }

  function moduleOf(href) {
    var i;
    for (i = 0; i < L.length; i++) {
      if (L[i].href === href) return L[i].module;
    }
    if (href === "simulations.html") return "labs";
    if (href === "progress.html" || href === "index.html") return "start";
    var folder = folderOf(href);
    if (!folder) return "start";
    for (i = 0; i < L.length; i++) {
      if ((L[i].folder || folderOf(L[i].href)) === folder) return L[i].module;
    }
    if (folder === "00-MASTER-MAP") return "map";
    return "start";
  }

  function indexOfHere() {
    var here = relPath();
    for (var i = 0; i < L.length; i++) {
      if (L[i].href === here) return i;
    }
    return -1;
  }

  function pageTitle() {
    var h1 = document.querySelector(".lab-article h1");
    if (h1 && h1.textContent) return h1.textContent.trim();
    return document.title.replace(/\s+—\s+AI Engineering Knowledge Lab$/, "") || relPath();
  }

  function firstInFolder(folder) {
    for (var i = 0; i < L.length; i++) {
      if ((L[i].folder || folderOf(L[i].href)) === folder) return L[i];
    }
    return null;
  }

  window.LabPath = {
    lessons: L,
    modules: MODULES,
    relPath: relPath,
    indexOfHere: indexOfHere,
    moduleOf: moduleOf,
    current: function () {
      var i = indexOfHere();
      if (i >= 0) return L[i];
      var here = relPath();
      var folder = folderOf(here);
      var first = folder ? firstInFolder(folder) : null;
      return {
        href: here,
        title: pageTitle(),
        module: (first && first.module) || moduleOf(here),
        folder: folder,
        section: first ? first.section : pageTitle()
      };
    },
    prev: function () {
      var i = indexOfHere();
      if (i > 0) return L[i - 1];
      if (i === 0) return null;
      var folder = folderOf(relPath());
      var first = folder ? firstInFolder(folder) : null;
      if (first) {
        var fi = -1;
        for (var n = 0; n < L.length; n++) {
          if (L[n].href === first.href) { fi = n; break; }
        }
        return fi > 0 ? L[fi - 1] : first;
      }
      return L[0];
    },
    next: function () {
      var i = indexOfHere();
      if (i >= 0 && i < L.length - 1) return L[i + 1];
      if (i === L.length - 1) return null;
      var folder = folderOf(relPath());
      var first = folder ? firstInFolder(folder) : null;
      if (first) {
        var fi = -1;
        for (var n = 0; n < L.length; n++) {
          if (L[n].href === first.href) { fi = n; break; }
        }
        return fi >= 0 && fi < L.length - 1 ? L[fi + 1] : L[1];
      }
      return L[1];
    },
    inModule: function (id) {
      var seen = {};
      var out = [];
      L.forEach(function (x) {
        if (x.module !== id) return;
        var key = x.folder || folderOf(x.href) || x.href;
        if (seen[key]) return;
        seen[key] = true;
        out.push({
          href: x.href,
          title: x.section || x.title,
          module: id,
          folder: key
        });
      });
      return out;
    }
  };
})();
""",
        encoding="utf-8",
    )
    return out


def write_page_index(md_files: list[Path]) -> Path:
    """Concept HTML siblings: Overview | Simple | Medium | Complex | When not | Do."""
    import json
    from collections import defaultdict

    by_folder: dict[str, list[dict]] = defaultdict(list)
    seen: set[tuple[str, str]] = set()
    for md_path in md_files:
        rel = md_path.relative_to(ROOT)
        if len(rel.parts) < 2:
            continue
        folder, stem = rel.parts[0], md_path.stem
        if not (folder[:2].isdigit() and folder[2:3] == "-"):
            continue
        if folder.startswith("00-") or folder.startswith("99-"):
            continue
        if stem not in STEM_META:
            continue
        key = (folder, stem)
        if key in seen:
            continue
        seen.add(key)
        level, label = STEM_META[stem]
        by_folder[folder].append(
            {"file": f"{stem}.html", "level": level, "label": label, "stem": stem}
        )
    rank = {stem: i for i, stem in enumerate(PILL_ORDER)}
    for folder in by_folder:
        by_folder[folder].sort(key=lambda row: rank.get(row["stem"], 100))
    out = ROOT / "app" / "js" / "page-index.js"
    payload = json.dumps(dict(by_folder), indent=2)
    out.write_text(
        "/* Generated by app/tools/render-pages.py — do not edit by hand. */\n"
        f"window.LAB_PAGE_INDEX = {payload};\n",
        encoding="utf-8",
    )
    return out


def main() -> int:
    written: list[Path] = []
    targets = collect_targets()
    written.append(write_sources_index())
    written.append(write_page_index(targets))
    written.append(write_learn_path())
    for md_path in targets:
        written.append(render_one(md_path))
    written.append(write_master_map_index())
    print(f"Rendered {len(written)} artifacts from Markdown.")
    for p in written:
        print(f"  {p.relative_to(ROOT)}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
