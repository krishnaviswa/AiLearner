"""L7 — supervisor routes; handoff must not union grants."""

from __future__ import annotations

GRANTS = {
    "kb": {"read_kb"},
    "ticket": {"read_kb", "write_ticket"},
}


def supervisor(task: str) -> str:
    if "ticket" in task:
        return "ticket"
    return "kb"


def handoff(from_agent: str, to_agent: str, extra: set[str] | None = None) -> set[str] | str:
    dest = set(GRANTS[to_agent])
    if extra:
        leaked = extra - dest
        if leaked:
            return f"deny: grant-union {sorted(leaked)}"
    return dest


def run() -> list[str]:
    failed: list[str] = []
    if supervisor("search the handbook") != "kb":
        failed.append("handbook should route to kb")
    if supervisor("open a ticket") != "ticket":
        failed.append("ticket should route to ticket agent")
    ok = handoff("ticket", "kb")
    if ok != {"read_kb"}:
        failed.append(f"kb grant should be read only: {ok}")
    bad = handoff("ticket", "kb", extra=GRANTS["ticket"])
    if not isinstance(bad, str) or not bad.startswith("deny"):
        failed.append(f"union must be denied, got {bad}")
    return failed


def main() -> int:
    failed = run()
    print("L7", "FAIL" if failed else "PASS", *failed, sep="\n")
    return 1 if failed else 0


if __name__ == "__main__":
    raise SystemExit(main())
