---
concept_id: dlp.simple
title: Layered DLP on synthetic data
domain_folder: 23-PHI-PII-DLP
levels_covered: [1, 4]
knowledge_class: durable
tech_status: general-pattern
last_verified: 2026-09-07
primary_source: SRC-PRESIDIO
status: verified
related_nodes: [dlp, evaluation]
---

# Layered DLP (synthetic only)

All examples below are **fake**. Do not paste real patient or customer data into this lab, logs, or a hosted model.

Synthetic record:

```text
name: Alex Rivera
mrn: SYN-MRN-0001
phone: 555-0100
note: follow-up Tuesday
```

## DO — fail closed on a pattern

Tiny deterministic check. Not a product and not HIPAA certification.

```python
import re

SYNTHETIC = "Alex Rivera, MRN SYN-MRN-0001, phone 555-0100"
MRN = re.compile(r"SYN-MRN-\d{4}")

def egress_ok(text: str) -> bool:
    return MRN.search(text) is None

assert egress_ok("follow-up Tuesday") is True
assert egress_ok(SYNTHETIC) is False
```

Presidio’s published getting-started snippet uses `AnalyzerEngine` with recognizers (regex/NER) on example phones (`SRC-PRESIDIO`). Same idea: **code** decides the span; an LLM may suggest extra spans.

## BREAK

Ask a model “repeat the record as a poem.” If your only control is “please don’t leak,” the poem still contains `SYN-MRN-0001`. The regex above still fails the egress.

## DESIGN

Which sinks need the same check: user reply, tool args, OpenTelemetry content attributes (those are opt-in in GenAI semconv — do not turn them on for PHI), and debug dumps.

## What should I remember?

If a detector cannot see a field, put the field **out of the prompt**.

## What should I learn next?

[19-comparison.md](19-comparison.md)
