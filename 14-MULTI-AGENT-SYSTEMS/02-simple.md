---
concept_id: multi-agent.simple
title: Supervisor vs handoff
domain_folder: 14-MULTI-AGENT-SYSTEMS
levels_covered: [1, 2]
knowledge_class: durable
tech_status: general-pattern
last_verified: 2026-09-07
primary_source: SRC-OPENAI-AGENTS-SDK
status: verified
related_nodes: [supervisor-worker, handoff]
---

# Supervisor vs handoff (simple)

```mermaid
sequenceDiagram
  participant U as User
  participant Sup as Supervisor
  participant Sp as Specialist
  U->>Sup: goal
  alt supervisor
    Sup->>Sp: task + bounded tools
    Sp-->>Sup: result
    Sup-->>U: answer
  else handoff
    Sup->>Sp: transfer conversation
    Sp-->>U: answer
  end
```

| | Supervisor / worker | Handoff |
|---|---|---|
| Who answers the user | Supervisor | Specialist after transfer |
| Tool sets | Isolated per worker | Specialist’s set |
| Failure | Supervisor can retry another worker | User is now in another policy domain |

OpenAI documents both styles (`SRC-OPENAI-AGENTS-SDK`). Do not mix them accidentally.
