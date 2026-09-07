"""L9 — local spans without prompt or PII bodies. Not an OTel exporter."""

from __future__ import annotations

import json
import re

MRN = re.compile(r"SYN-MRN-\d{4}")
FORBIDDEN = re.compile(r"(system prompt|password|api[_-]?key)", re.I)


def spans_for(request_id: str) -> list[dict]:
    # Placeholder attribute names — official GenAI semconv is Development / UNVERIFIED pin.
    return [
        {"name": "request", "attrs": {"request.id": request_id}},
        {"name": "retrieve", "attrs": {"retrieve.hit": True, "retrieve.k": 1}},
        {"name": "tool", "attrs": {"tool.name": "lookup_order", "tool.error": False}},
    ]


def span_safe(payload: list[dict]) -> list[str]:
    blob = json.dumps(payload)
    bad: list[str] = []
    if MRN.search(blob):
        bad.append("PII/MRN in spans")
    if FORBIDDEN.search(blob):
        bad.append("prompt/secret-like text in spans")
    return bad


def run() -> list[str]:
    failed: list[str] = []
    good = spans_for("req-synthetic-1")
    failed.extend(span_safe(good))
    leak = [{"name": "request", "attrs": {"input": "patient SYN-MRN-0001"}}]
    if not span_safe(leak):
        failed.append("leaky span must be detected")
    return failed


def main() -> int:
    failed = run()
    print("L9", "FAIL" if failed else "PASS", *failed, sep="\n")
    return 1 if failed else 0


if __name__ == "__main__":
    raise SystemExit(main())
