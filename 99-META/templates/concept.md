# Concept template (create a file only when it has meaningful content)

Do not scaffold all 21 files at once. Add a file when that layer is actually written.

Suggested filenames inside a concept directory:

```
01-overview.md
02-simple.md
03-logical.md
04-mechanical.md
05-implementation.md
06-engineering.md
07-architecture.md
08-production.md
09-security.md
10-evaluation.md
11-observability.md
12-performance.md
13-cost.md
14-failure-modes.md
15-real-world-example.md
16-hands-on.md
17-break-lab.md
18-design-challenge.md
19-comparison.md
20-interview.md
21-cheat-sheet.md
```

## Front matter (copy into each created file)

See `frontmatter.yaml` in this folder.

## Body requirements

Each created file should stay focused on its level. Across the set, cover:

1. What is it?
2. Why does it exist?
3. How does it work?
4. How do I implement it?
5. How does it interact with other systems?
6. How does it fail?
7. How do I secure it?
8. How do I evaluate it?
9. How does it behave at scale?
10. What does it cost?
11. When should I use it?
12. When should I NOT use it?
13. What alternatives exist?
14. What would a production architect worry about?
15. What would a principal engineer challenge?

Include architect bridges (data/cloud analogies). Distinguish **toy** vs **production-oriented** designs. Classify knowledge as durable vs volatile.

Major process or architecture pages must include at least one of: a comparison/when-not **table**, a mermaid **flowchart**, a mermaid **sequence** diagram, or a mermaid **state/component** diagram. Labels must match the prose.

## Closing block (major topics)

## What should I remember?
## What should I build?
## What should I experiment with?
## What can go wrong?
## What would a Senior Engineer ask?
## What would a Principal Engineer ask?
## What would an Architect challenge?
## What should I learn next?
