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
    "03-logical": (3, "Logical"),
    "04-mechanical": (3, "Mechanical"),
    "05-implementation": (4, "Implement"),
    "06-engineering": (5, "Engineering"),
    "07-architecture": (6, "Architect"),
    "08-production": (7, "Production"),
    "09-security": (6, "Security"),
    "10-evaluation": (5, "Evaluation"),
    "14-failure-modes": (5, "Failures"),
    "16-hands-on": (4, "Do"),
    "17-break-lab": (4, "Break"),
    "19-comparison": (2, "When not"),
}


def strip_frontmatter(text: str) -> str:
    if not text.startswith("---"):
        return text
    end = text.find("\n---", 3)
    if end == -1:
        return text
    return text[end + 4 :].lstrip("\n")


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
  <script src="{prefix}app/js/shell.js"></script>
  <script src="{prefix}app/js/depth.js"></script>
  <script src="{prefix}app/js/why-chain.js"></script>
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
        "<p>Gate 0 scope artifacts. Markdown is the source; these are generated views. "
        "Curriculum domains are empty until later gates.</p>"
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


def write_page_index(md_files: list[Path]) -> Path:
    """Sibling HTML files per folder so the concept stepper can navigate."""
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
        key = (folder, stem)
        if key in seen:
            continue
        seen.add(key)
        level, label = STEM_META.get(stem, (1, stem.replace("-", " ")))
        by_folder[folder].append(
            {"file": f"{stem}.html", "level": level, "label": label, "stem": stem}
        )
    for folder in by_folder:
        by_folder[folder].sort(key=lambda row: row["file"])
    out = ROOT / "app" / "js" / "page-index.js"
    payload = json.dumps(dict(by_folder), indent=2)
    out.write_text(f"window.LAB_PAGE_INDEX = {payload};\n", encoding="utf-8")
    return out


def main() -> int:
    written: list[Path] = []
    targets = collect_targets()
    written.append(write_page_index(targets))
    for md_path in targets:
        written.append(render_one(md_path))
    written.append(write_master_map_index())
    print(f"Rendered {len(written)} artifacts from Markdown.")
    for p in written:
        print(f"  {p.relative_to(ROOT)}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
