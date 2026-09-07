"""L6 — validate candidate SQL. No database connection."""

from __future__ import annotations

import re

ALLOWED_TABLES = {"orders"}
DENIED_COLUMNS = {"ssn", "mrn"}


def validate(sql: str) -> str | None:
    compact = " ".join(sql.lower().split())
    if ";" in compact:
        return "deny: multi-statement"
    if "select *" in compact:
        return "deny: select-star"
    tables = re.findall(r"\bfrom\s+([a-z_][a-z0-9_]*)", compact)
    tables += re.findall(r"\bjoin\s+([a-z_][a-z0-9_]*)", compact)
    if not tables:
        return "deny: no table"
    for t in tables:
        if t not in ALLOWED_TABLES:
            return f"deny: table {t}"
    if len(tables) > 1 and " join " in compact and " on " not in compact:
        return "deny: cartesian"
    cols = re.findall(r"select\s+(.+?)\s+from", compact)
    if cols:
        for raw in cols[0].split(","):
            name = raw.strip().split(".")[-1]
            if name in DENIED_COLUMNS:
                return f"deny: column {name}"
    if " limit " not in compact:
        return "deny: missing limit"
    return None


CASES = [
    ("SELECT status FROM orders LIMIT 10", None),
    ("SELECT * FROM orders LIMIT 10", "deny: select-star"),
    ("SELECT ssn FROM orders LIMIT 10", "deny: column ssn"),
    ("SELECT status FROM patients LIMIT 10", "deny: table patients"),
]


def run() -> list[str]:
    failed: list[str] = []
    for sql, want in CASES:
        got = validate(sql)
        if want is None and got is not None:
            failed.append(f"should allow {sql!r}: {got}")
        if want is not None and got != want:
            failed.append(f"{sql!r}: got {got!r} want {want!r}")
    return failed


def main() -> int:
    failed = run()
    print("L6", "FAIL" if failed else "PASS", *failed, sep="\n")
    return 1 if failed else 0


if __name__ == "__main__":
    raise SystemExit(main())
