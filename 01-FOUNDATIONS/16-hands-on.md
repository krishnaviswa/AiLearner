---
concept_id: foundations.hands-on-tokens
title: DO — count tokens
domain_folder: 01-FOUNDATIONS
levels_covered: [4]
knowledge_class: mixed
tech_status: mature
last_verified: 2026-09-07
primary_source: SRC-TIKTOKEN
status: verified
related_nodes: [llm, cost]
---

# DO — count tokens (tiny)

Not a product. Prove to yourself that **words ≠ tokens**.

Official `tiktoken` README (`SRC-TIKTOKEN`, fetched 2026-09-07) shows:

```python
import tiktoken

enc = tiktoken.get_encoding("o200k_base")
assert enc.decode(enc.encode("hello world")) == "hello world"

# Tokenizer for a named OpenAI API model (name is volatile — README example used gpt-4o)
enc = tiktoken.encoding_for_model("gpt-4o")
print(len(enc.encode("SELECT * FROM orders WHERE region = 'EMEA'")))
```

## Experiment

1. Encode a short English sentence and a SQL string. Compare `len(text.split())` vs `len(enc.encode(text))`.
2. Paste a 2 KB JSON payload. Guess the count, then measure.
3. Read `SRC-TIKTOKEN-COOKBOOK` if you need chat-message overhead — do not invent message-format token taxes from memory.

## Break (light)

Change one identifier (`customer_id` vs `cid`). Token count moves. That is why “chunk by character count” is a toy.

## Remember

This lab does not pin prices. Token count is the **unit**; vendor price pages are Gate 7 / cost pages.
