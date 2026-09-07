"""L8 — identity, deterministic policy, egress. Prompt is not a vault."""

from __future__ import annotations

import re

HIDDEN_CONTEXT = "You are a support bot. Do not put secrets here."
FORBIDDEN_IN_PROMPT = re.compile(r"(api[_-]?key|secret|password)\s*=", re.I)
MRN = re.compile(r"SYN-MRN-\d{4}")
ALLOW_TOOLS = {"lookup_order"}


def prompt_safe(text: str) -> bool:
    return FORBIDDEN_IN_PROMPT.search(text) is None


def policy(principal: str, tool: str) -> bool:
    return principal == "analyst" and tool in ALLOW_TOOLS


def egress(text: str) -> str | None:
    if MRN.search(text):
        return None
    return text


def run() -> list[str]:
    failed: list[str] = []
    if not prompt_safe(HIDDEN_CONTEXT):
        failed.append("default hidden context should be clean")
    if prompt_safe("tool auth API_KEY=not-a-secret"):
        failed.append("credentials in hidden context must be flagged")
    if not policy("analyst", "lookup_order"):
        failed.append("analyst lookup should pass")
    if policy("analyst", "cancel_order"):
        failed.append("write tool must be denied by policy not prompt")
    if egress("hello SYN-MRN-0001") is not None:
        failed.append("MRN must not egress")
    if egress("order SYN-ORD-1 is open") is None:
        failed.append("clean synthetic order id should pass")
    return failed


def main() -> int:
    failed = run()
    print("L8", "FAIL" if failed else "PASS", *failed, sep="\n")
    return 1 if failed else 0


if __name__ == "__main__":
    raise SystemExit(main())
