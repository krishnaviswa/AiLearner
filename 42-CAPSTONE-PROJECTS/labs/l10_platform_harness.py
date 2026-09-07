"""L10 — smoke the ladder. Not an enterprise platform."""

from __future__ import annotations

import subprocess
import sys
from pathlib import Path

LABS = [
    "l01_simple_llm.py",
    "l02_rag.py",
    "l03_acl_dlp.py",
    "l04_tools.py",
    "l05_agentic_rag.py",
    "l06_nl2sql.py",
    "l07_multi_agent.py",
    "l08_secure_agent.py",
    "l09_observe.py",
]


def run() -> list[str]:
    here = Path(__file__).resolve().parent
    failed: list[str] = []
    for name in LABS:
        proc = subprocess.run(
            [sys.executable, str(here / name)],
            capture_output=True,
            text=True,
            check=False,
        )
        if proc.returncode != 0:
            failed.append(f"{name} exit {proc.returncode}: {proc.stdout.strip()}")
    return failed


def main() -> int:
    failed = run()
    print("L10", "FAIL" if failed else "PASS (ladder smoke only - not a platform)", *failed, sep="\n")
    return 1 if failed else 0


if __name__ == "__main__":
    raise SystemExit(main())
