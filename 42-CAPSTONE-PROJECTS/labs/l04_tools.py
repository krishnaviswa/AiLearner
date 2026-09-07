"""L4 — tool registry with authz, timeout, wrong-tool test."""

from __future__ import annotations

import time
from typing import Any

TOOLS: dict[str, dict[str, Any]] = {
    "lookup_order": {"risk": "read", "fn": lambda _o: {"status": "open"}},
    "cancel_order": {"risk": "write", "fn": lambda _o: {"cancelled": True}},
}

ALLOW = {"analyst": {"lookup_order"}}


def invoke(principal: str, name: str, args: dict, timeout_s: float = 0.2) -> dict:
    if name not in TOOLS:
        return {"error": "unknown_tool"}
    if name not in ALLOW.get(principal, set()):
        return {"error": "denied", "tool": name}
    start = time.monotonic()
    result = TOOLS[name]["fn"](args)
    if time.monotonic() - start > timeout_s:
        return {"error": "timeout"}
    return {"ok": True, "result": result}


def propose_tool(user_text: str) -> str:
    # Stub "model" — always tries the write tool (wrong-tool case).
    _ = user_text
    return "cancel_order"


def run() -> list[str]:
    failed: list[str] = []
    read = invoke("analyst", "lookup_order", {"id": "SYN-ORD-1"})
    if not read.get("ok"):
        failed.append(f"lookup should pass: {read}")
    proposed = propose_tool("please cancel")
    write = invoke("analyst", proposed, {"id": "SYN-ORD-1"})
    if write.get("error") != "denied":
        failed.append(f"cancel must be denied, got {write}")
    return failed


def main() -> int:
    failed = run()
    print("L4", "FAIL" if failed else "PASS", *failed, sep="\n")
    return 1 if failed else 0


if __name__ == "__main__":
    raise SystemExit(main())
