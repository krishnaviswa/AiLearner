"""L5 — retrieve as a tool with a hop budget."""

from __future__ import annotations

CORPUS = {
    "doc-returns": "Return window is 30 days for unused items.",
}

MAX_HOPS = 2


def tool_retrieve(query: str) -> str:
    for doc_id, text in CORPUS.items():
        if "return" in query.lower() and "return" in text.lower():
            return f"{doc_id}: {text}"
    return ""


def loop(question: str) -> tuple[str, int]:
    hops = 0
    context = ""
    while hops < MAX_HOPS and "30 days" not in context:
        hops += 1
        context = tool_retrieve(question)
    if "30 days" not in context:
        return "refuse", hops
    return context, hops


def run() -> list[str]:
    failed: list[str] = []
    text, hops = loop("what is the return window?")
    if hops > MAX_HOPS:
        failed.append(f"exceeded hop budget: {hops}")
    if "doc-returns" not in text:
        failed.append("expected retrieve-as-tool citation")
    empty, hops2 = loop("unrelated quantum topic")
    if empty != "refuse":
        failed.append("must refuse when retrieve is empty")
    if hops2 > MAX_HOPS:
        failed.append("empty path exceeded hops")
    return failed


def main() -> int:
    failed = run()
    print("L5", "FAIL" if failed else "PASS", *failed, sep="\n")
    return 1 if failed else 0


if __name__ == "__main__":
    raise SystemExit(main())
