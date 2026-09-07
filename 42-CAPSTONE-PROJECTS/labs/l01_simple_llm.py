"""L1 — contract + eval of one stubbed call. No SDK."""

from __future__ import annotations

GOLD = {"t1": "shipping", "t2": "refund", "t3": "other"}


def predict(case_id: str) -> str:
    # Placeholder for a real model call — vendor method names UNVERIFIED.
    stub = {"t1": "shipping", "t2": "refund", "t3": "other"}
    return stub[case_id]


def run() -> list[str]:
    failed: list[str] = []
    for cid, want in GOLD.items():
        if cid not in GOLD:
            failed.append(f"{cid}: missing gold")
            continue
        got = predict(cid)
        if got != want:
            failed.append(f"{cid}: got {got!r} want {want!r}")
    return failed


def main() -> int:
    failed = run()
    print("L1", "FAIL" if failed else "PASS", *failed, sep="\n")
    return 1 if failed else 0


if __name__ == "__main__":
    raise SystemExit(main())
