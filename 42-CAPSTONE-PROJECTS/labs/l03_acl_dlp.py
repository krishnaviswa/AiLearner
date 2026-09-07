"""L3 — ACL in the query + egress DLP. Synthetic tenants only."""

from __future__ import annotations

import re

CHUNKS = [
    {"id": "a1", "tenant": "tenant-a", "text": "Tenant A return window is 30 days."},
    {"id": "b1", "tenant": "tenant-b", "text": "Tenant B note: patient SYN-MRN-0001."},
]

MRN = re.compile(r"SYN-MRN-\d{4}")


def retrieve(query: str, tenant: str | None) -> list[dict]:
    if not tenant:
        return []  # fail closed — no post-filter of a shared scan
    return [c for c in CHUNKS if c["tenant"] == tenant and query.lower() in c["text"].lower()]


def egress_ok(text: str) -> bool:
    return MRN.search(text) is None


def run() -> list[str]:
    failed: list[str] = []
    hits = retrieve("return window", "tenant-a")
    if len(hits) != 1 or hits[0]["id"] != "a1":
        failed.append("tenant-a should see only a1")
    if retrieve("return window", "tenant-b"):
        failed.append("tenant-b must not see tenant-a returns")
    if retrieve("return window", None):
        failed.append("missing tenant must not retrieve")
    leak = "summary mentions SYN-MRN-0001"
    if egress_ok(leak):
        failed.append("DLP missed synthetic MRN")
    if not egress_ok("Tenant A return window is 30 days."):
        failed.append("DLP false positive on clean text")
    return failed


def main() -> int:
    failed = run()
    print("L3", "FAIL" if failed else "PASS", *failed, sep="\n")
    return 1 if failed else 0


if __name__ == "__main__":
    raise SystemExit(main())
