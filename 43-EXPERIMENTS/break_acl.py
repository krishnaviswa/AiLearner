"""BREAK — naive post-filter retrieve leaks tenant existence (LLM09 teaching)."""

from __future__ import annotations

CHUNKS = [
    {"id": "a1", "tenant": "tenant-a", "text": "Tenant A only"},
    {"id": "b1", "tenant": "tenant-b", "text": "Tenant B only"},
]


def naive_scan_then_filter(tenant: str | None) -> list[str]:
    scanned = [c["id"] for c in CHUNKS]  # search ran across all tenants
    if tenant is None:
        return scanned
    return [c["id"] for c in CHUNKS if c["tenant"] == tenant]


def secure(tenant: str | None) -> list[str]:
    if not tenant:
        return []
    return [c["id"] for c in CHUNKS if c["tenant"] == tenant]


def main() -> int:
    leaked = naive_scan_then_filter(None)
    safe = secure(None)
    print("naive without tenant:", leaked)
    print("secure without tenant:", safe)
    if leaked == ["a1", "b1"] and safe == []:
        print("BREAK observed: ACL after a shared scan is not a control")
        return 0
    print("unexpected — experiment did not show the leak")
    return 1


if __name__ == "__main__":
    raise SystemExit(main())
