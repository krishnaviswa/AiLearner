#!/usr/bin/env python3
"""Write factory-state.json and regenerate app/js/progress-data.js from stdin or a file.

Usage:
    python app/tools/write-factory-state.py path/to/state.json
    python app/tools/write-factory-state.py   # reads stdin
"""

from __future__ import annotations

import json
import sys
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
STATE_PATH = ROOT / "99-META" / "qa" / "factory-state.json"
JS_PATH = ROOT / "app" / "js" / "progress-data.js"


def main() -> int:
    if len(sys.argv) > 1:
        raw = Path(sys.argv[1]).read_text(encoding="utf-8")
    else:
        raw = sys.stdin.read()
    data = json.loads(raw)
    data["last_updated"] = datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")
    data.setdefault("html_progress_path", "progress.html")
    text = json.dumps(data, indent=2, ensure_ascii=False) + "\n"
    STATE_PATH.parent.mkdir(parents=True, exist_ok=True)
    STATE_PATH.write_text(text, encoding="utf-8")
    JS_PATH.parent.mkdir(parents=True, exist_ok=True)
    JS_PATH.write_text(
        "/* Generated sibling of 99-META/qa/factory-state.json — do not hand-edit. */\n"
        "window.FACTORY_STATE = "
        + json.dumps(data, indent=2, ensure_ascii=False)
        + ";\n",
        encoding="utf-8",
    )
    print(f"Wrote {STATE_PATH.relative_to(ROOT)} and {JS_PATH.relative_to(ROOT)}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
