"""L2 — keyword retrieve + required citations. In-memory corpus."""

from __future__ import annotations

CORPUS = {
    "doc-returns": "Return window is 30 days for unused items.",
    "doc-shipping": "Standard shipping takes 5 business days.",
}

GOLD = {
    "how long to return": ("doc-returns", "30 days"),
    "shipping time": ("doc-shipping", "5 business days"),
}


def retrieve(query: str) -> list[str]:
    q = set(query.lower().split())
    scored = []
    for doc_id, text in CORPUS.items():
        words = set(text.lower().split())
        scored.append((len(q & words), doc_id))
    scored.sort(reverse=True)
    return [doc_id for n, doc_id in scored if n > 0][:1]


def answer(query: str) -> tuple[str | None, str | None]:
    hits = retrieve(query)
    if not hits:
        return None, None
    doc_id = hits[0]
    return doc_id, CORPUS[doc_id]


def run() -> list[str]:
    failed: list[str] = []
    for query, (want_id, needle) in GOLD.items():
        doc_id, text = answer(query)
        if doc_id is None:
            failed.append(f"{query!r}: empty retrieve (must refuse, not guess)")
        elif doc_id != want_id:
            failed.append(f"{query!r}: cited {doc_id} want {want_id}")
        elif needle not in (text or ""):
            failed.append(f"{query!r}: missing citation text {needle!r}")
    return failed


def main() -> int:
    failed = run()
    print("L2", "FAIL" if failed else "PASS", *failed, sep="\n")
    return 1 if failed else 0


if __name__ == "__main__":
    raise SystemExit(main())
