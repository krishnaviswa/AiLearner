"""Run L1–L10. Exit 1 if any lab fails."""

from __future__ import annotations

import subprocess
import sys
from pathlib import Path

ORDER = [
    "l01_simple_llm.py",
    "l02_rag.py",
    "l03_acl_dlp.py",
    "l04_tools.py",
    "l05_agentic_rag.py",
    "l06_nl2sql.py",
    "l07_multi_agent.py",
    "l08_secure_agent.py",
    "l09_observe.py",
    "l10_platform_harness.py",
]


def main() -> int:
    here = Path(__file__).resolve().parent
    code = 0
    for name in ORDER:
        proc = subprocess.run([sys.executable, str(here / name)], check=False)
        if proc.returncode != 0:
            code = 1
    return code


if __name__ == "__main__":
    raise SystemExit(main())
