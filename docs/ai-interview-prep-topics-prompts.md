# AI & Tech Interview Prep — Topic Prompts & Concepts
*Built from interview patterns reported across top tech companies (Google, Meta, Amazon, Microsoft, OpenAI, Anthropic) in the last 6 months. Structured for reuse as prompts in a learner platform / Claude Code project.*

## How to use this file
Each topic below has four parts:
1. **Why it's tested now** — the recent pattern behind it
2. **Top concepts to master** — the checklist to actually learn
3. **Ready-to-use prompts** — paste these into an AI tutor/practice generator as-is, or use them as seed prompts for a learner site's question generator
4. **Real question pattern** — the style of question actually being asked in 2026 loops

Each topic is tagged with which of the 10 AI Engineer 2026 skill areas it maps to. A master prompt template for wiring this into a generator is at the very end.

---

## 1. DSA (Data Structures & Algorithms) & Coding Fundamentals

**Why it's tested now:** Still one of the most common parts of engineering interviews at Google, Microsoft, and Amazon, even with AI coding tools in wide use. For 0–2 years' experience it's nearly the whole interview; for senior roles it's a smaller but still-required slice, used to check problem-solving and code quality rather than memorized tricks.

**Top concepts to master:**
- Arrays, strings, hashing (hash map [key-value lookup table with near-instant average lookup time])
- Two pointers, sliding window (moving a fixed- or variable-size window across a sequence to avoid re-scanning)
- Trees and graphs (traversal [visiting every node], BFS/DFS [breadth-first vs depth-first search])
- Dynamic programming (breaking a problem into overlapping sub-problems and caching results)
- Heaps/priority queues, tries, union-find (disjoint set)
- Time/space complexity (Big-O) trade-off reasoning
- Recognizing patterns instead of memorizing solutions

**Ready-to-use prompts:**
- "Give me a medium-difficulty problem that uses [pattern], with no solution yet — let me attempt it first."
- "I solved this in O(n²). Ask me guiding questions (don't give the answer) to help me find an O(n log n) approach."
- "Review my code for this problem and point out edge cases I likely missed, without rewriting my solution."
- "Generate 5 problems on [pattern] in increasing difficulty, each one line, no solutions."

**Real question pattern:** Company-tagged variations of classic patterns (sliding window, DP, graph traversal), evaluated as much on communication and edge-case handling as on getting the answer.

---

## 2. Classic System Design (Distributed Systems)

**Why it's tested now:** No longer a senior-only round — Google has introduced it as early as L4, and it now shows up for mid-level and even some new-grad loops because it reveals judgment that algorithm questions can't.

**Top concepts to master:**
- Requirements gathering (functional vs non-functional requirements) before designing anything
- Load balancing, consistent hashing
- Caching strategies (cache eviction, e.g. LRU [least recently used])
- Database indexing (B-trees), SQL vs NoSQL trade-offs, sharding
- Data pipelines (batch vs streaming)
- Fault tolerance, replication, consistency models (CAP theorem [Consistency, Availability, Partition tolerance — pick two])
- API design and rate limiting

**Ready-to-use prompts:**
- "Act as an interviewer. Ask me to design [system, e.g. a URL shortener], then push back on my first answer the way a real interviewer would."
- "I designed [system] this way — what's the biggest scalability weakness a staff engineer would flag?"
- "Compare SQL vs NoSQL for [scenario] and make me defend my choice out loud."
- "Give me a system design prompt used at [company] in the last year, without the sample answer."

**Real question pattern:** Design a scalable, reliable system for a real-world scenario (e.g., notification system, ride-sharing dispatch), graded on trade-off reasoning across the full stack, not just the diagram.

---

## 3. GenAI / LLM System Design (new 2026 category)

**Why it's tested now:** A newly emerged interview category at Google, Amazon, and Meta — AI and LLM-related system design questions have roughly tripled since 2023 and are now asked separately from classic system design.

**Top concepts to master:**
- End-to-end architecture: user request → gateway → retrieval/context → model inference → response
- Latency and streaming (token-by-token response delivery) trade-offs
- Token cost management at scale
- Grounding (tying model output to real data) to reduce hallucination (the model stating something false with confidence)
- Choosing when to fine-tune vs use RAG vs prompt engineering
- Multi-modal considerations (text, image, audio) where relevant

**Ready-to-use prompts:**
- "Ask me to design an LLM-powered [customer support bot / document search / coding assistant], and interrupt me if I skip a requirement a real interviewer would probe."
- "I said I'd reduce token costs by [approach] — what's the trade-off I'm not accounting for?"
- "Give me 3 recently-asked GenAI system design questions from companies like Google, Meta, or OpenAI, without answers."

**Real question pattern:** "Design a high-level system for an LLM responding to a user query," "Design a customer-support chatbot on top of a third-party LLM platform," "Design safeguards for an AI system that can take actions on a user's behalf."

---

## 4. Context & RAG (Retrieval-Augmented Generation)

**Why it's tested now:** RAG (giving a model retrieved, relevant documents instead of relying only on what it was trained on) is now a standard system design sub-topic and a common standalone question set for AI engineer, ML engineer, and prompt engineer roles.

**Top concepts to master:**
- Chunking strategy (how you split documents) and its effect on retrieval quality
- Embeddings (turning text into numeric vectors [lists of numbers representing meaning] for similarity search) and vector databases
- Retrieval vs reranking (retrieval finds candidates, reranking orders them by relevance)
- Hybrid search (combining keyword and vector/semantic search)
- Handling context window (max tokens a model can read at once) limits when many chunks are retrieved
- Permission-aware retrieval (not returning documents a user shouldn't see)
- Evaluating retrieval quality separately from the final generated answer

**Ready-to-use prompts:**
- "Walk me through designing a RAG pipeline for [internal documentation search], and challenge my chunking strategy."
- "A RAG system retrieves 20 chunks but the context window only fits 5 — ask me how I'd decide which to keep."
- "Give me a scenario where two retrieved documents conflict — how should the system handle it?"
- "Quiz me on the difference between retrieval evaluation metrics and generation evaluation metrics."

**Real question pattern:** "Design a retrieval-augmented chatbot for enterprise search," plus deep-dive follow-ups on chunking, reranking, and how to evaluate the system once it's live.

---

## 5. Agent Loops & Frameworks

**Why it's tested now:** As companies ship AI systems that take actions (not just answer questions), interviewers increasingly ask candidates to reason about how an agent plans, acts, and monitors its own progress.

**Top concepts to master:**
- The agent loop: plan → execute → observe → adjust
- Task decomposition (breaking a goal into smaller steps)
- State management across multi-step tasks
- Error handling and recovery when a step fails
- When to use an agent vs a simple, direct tool call

**Ready-to-use prompts:**
- "Ask me to design the control loop for an agent that [books a meeting across calendars], including failure handling."
- "I designed my agent loop without a retry mechanism — what breaks in production?"
- "Compare a single-shot tool call vs a full agent loop for [task] and have me justify which fits better."

**Real question pattern:** "Describe how you'd architect an AI agent system, including the loop, tools, memory, and safety considerations."

---

## 6. ReAct Framework (Reason + Act)

**Why it's tested now:** Underpins most production agent frameworks, so interviewers use it to check whether a candidate understands *why* agents interleave reasoning and action rather than planning everything up front.

**Top concepts to master:**
- The think → act → observe → repeat cycle
- Why interleaving reasoning with actions reduces compounding errors
- Structured prompting (getting the model to output a consistent, parseable format at each step)
- Where ReAct breaks down (long tasks, costly actions, ambiguous observations)

**Ready-to-use prompts:**
- "Explain a case where a plan-first agent would fail but a ReAct-style agent would succeed."
- "Trace a ReAct loop step-by-step for [task] and ask me to predict what happens if step 2's observation is wrong."

**Real question pattern:** Usually embedded inside an agent system design question rather than asked standalone — expect a follow-up like "how does the agent know when to stop or ask for help?"

---

## 7. MCP & Tool Integration

**Why it's tested now:** As agents need to reach real data and APIs, interviewers probe whether a candidate can design secure, standardized ways for a model to call external tools rather than hard-coding one-off integrations.

**Top concepts to master:**
- Model Context Protocol (MCP) — a standard way for an agent to discover and call tools
- Standardized tool schemas vs ad-hoc API glue
- Authentication and scoping (limiting what a tool call can access)
- Tool selection (how the agent picks the right tool from many)

**Ready-to-use prompts:**
- "Ask me to design a tool-integration layer for an agent that needs access to [databases, APIs, internal docs], focusing on security boundaries."
- "What's the risk of giving an agent an unscoped API key, and how would you fix it?"

**Real question pattern:** Folded into agent or GenAI system design answers — expect to be asked how the model knows which tools exist and how calls are authorized.

---

## 8. Multi-Agent Systems

**Why it's tested now:** As single-agent systems hit limits on complex tasks, companies are asking how candidates coordinate multiple specialized agents rather than one generalist agent.

**Top concepts to master:**
- Task decomposition across specialized agents (e.g., a planner agent + a retrieval agent + a coding agent)
- Inter-agent communication and shared state/memory
- Orchestration (who decides which agent runs next)
- Failure isolation (one agent failing shouldn't crash the whole system)

**Ready-to-use prompts:**
- "Design a multi-agent system for [research and report generation] and challenge me on how the agents avoid duplicating work."
- "What happens if two agents in your system disagree on the next action? Ask me to design the resolution."

**Real question pattern:** Increasingly a deep-dive follow-up within GenAI system design rather than its own question — "how would this change if you needed three specialized agents instead of one?"

---

## 9. AI Gateway (Cost, Routing, Inference Economics)

**Why it's tested now:** As AI spend has become a real budget line item, interviewers now expect engineers to design for cost, not just correctness.

**Top concepts to master:**
- Model routing (sending simple requests to a cheaper/smaller model, complex ones to a larger model)
- Rate limiting and usage monitoring
- Caching model responses (semantic caching [caching by meaning, not exact text match])
- Inference cost drivers: token count, model size, request volume

**Ready-to-use prompts:**
- "I need to cut LLM costs by 40% without hurting quality — ask me to justify three approaches."
- "Design a gateway that routes requests between two models by cost and complexity, and quiz me on the routing logic."

**Real question pattern:** "How would you reduce token costs in an LLM-powered product at scale?"

---

## 10. Evaluation

**Why it's tested now:** Because AI systems are non-deterministic (the same input can produce different outputs), companies now test whether candidates know how to actually measure quality before shipping.

**Top concepts to master:**
- Offline evaluation (test sets, benchmarks) vs online evaluation (live user feedback)
- LLM-as-judge (using a model to grade another model's output) and its limits
- Regression testing for AI systems (catching quality drops after a change)
- Human-in-the-loop review for ambiguous cases
- Retrieval evaluation vs generation evaluation (for RAG specifically)

**Ready-to-use prompts:**
- "How would you evaluate a RAG system? Ask me to separate retrieval metrics from generation metrics."
- "Design an evaluation pipeline for an agent that completes multi-step tasks — what does 'success' even mean here?"
- "Critique my evaluation plan for gaps that would let a bad model pass."

**Real question pattern:** "How do you evaluate a RAG system?" and "how would you detect quality regressions after a model or prompt change?"

---

## 11. Observability

**Why it's tested now:** Once an AI system is in production, interviewers want to know how you'd actually notice something going wrong.

**Top concepts to master:**
- Traces (following one request through every step of the system)
- Cost and token dashboards
- Drift detection (model behavior quietly changing over time)
- Alerting thresholds for latency, error rate, and cost spikes

**Ready-to-use prompts:**
- "Design the observability layer for the RAG system we discussed — what would you track, and why those metrics specifically?"
- "My dashboard only shows latency. What's missing for an AI-specific system, and why does it matter?"

**Real question pattern:** Usually a deep-dive question after a system design answer: "how would you know if this degraded in production?"

---

## 12. Safety Harnesses (Guardrails & Responsible AI)

**Why it's tested now:** As AI systems take real actions and handle real data, companies test whether candidates build in protections by default rather than as an afterthought.

**Top concepts to master:**
- Prompt filtering and output monitoring (catching unsafe or leaking outputs before they reach the user)
- Guardrails against prompt injection (malicious instructions hidden in retrieved content)
- Compliance-by-design (e.g., GDPR/HIPAA considerations baked into architecture)
- Human approval gates for high-stakes agent actions

**Ready-to-use prompts:**
- "Design safeguards for an AI system that can take actions on a user's behalf — ask me what happens when it's about to do something irreversible."
- "How would you prevent a RAG system from leaking private data it retrieved? Push me for a concrete mechanism, not a general principle."

**Real question pattern:** "Design safeguards for an AI system that can take actions on behalf of a user" — a standalone question at several companies now, not just a footnote.

---

## 13. Deployment & Scale

**Why it's tested now:** Companies want to know a candidate can take something past a working prototype into reliable production infrastructure.

**Top concepts to master:**
- CI/CD for AI systems (what's different vs regular software: prompts, models, and data all version separately)
- Scaling inference (horizontal scaling, batching requests)
- Security and governance for AI infrastructure
- Cost optimization at scale (distinct from the AI Gateway's per-request routing — this is infrastructure-level)

**Ready-to-use prompts:**
- "Take the RAG system we designed and ask me how I'd deploy and scale it to 10x current traffic."
- "What's different about CI/CD for a system that includes an LLM, versus a normal backend service?"

**Real question pattern:** Usually the final deep-dive in a GenAI system design interview — "this works for 100 users, how does it change at 100,000?"

---

## 14. The New "AI-Era" Behavioral / Process Round

**Why it's tested now:** "Do you use AI?" is now a real, gradeable interview question with a right and wrong way to answer it, and take-homes are increasingly followed by a live "defend your decisions" round that's hard to fake.

**Top concepts to master:**
- Being able to explain *how* and *why* you used AI tools on a task, not just that you did
- Defending every line of a take-home submission out loud, including parts you didn't write yourself
- Being explicit about what you'd double-check before trusting AI-generated code or output

**Ready-to-use prompts:**
- "Ask me how I used AI tools to solve [this problem], and push back until I can defend every decision without relying on 'the AI suggested it.'"
- "Simulate a live code-review follow-up to my take-home submission — ask me why I made three specific choices."

**Real question pattern:** A direct question about AI tool use in your workflow, plus an in-person "walk me through your code and your decisions" round following any take-home.

---

## 15. Principal / Staff / Architect Track (18+ Years' Experience)

**Why it's tested this way now:** There's no universal template at this level — one company's guide describes two coding sessions, system design, leadership craft, and values, while another describes architecture, domain deep dives, and cross-functional discussions instead. But the components that repeat across companies form a predictable loop.

**Typical loop (4–6 rounds over 1–2 days):**

| Round | Format | What it's really checking |
|---|---|---|
| Coding (1–2 rounds, ~60 min each) | Still present, but a gate, not a differentiator | Correctness and reasoning, not cleverness — coding practice should be enough to clear the bar comfortably, not maximized |
| System design / architecture (~60 min) | Open-ended, often spanning multiple domains | Whether you define the problem scope yourself, and weigh trade-offs across teams — not whether you can build the system, but whether you can lead the conversation about it |
| Technical/domain deep dive | Discussion of a system you actually built | Your real decisions and their second-order consequences |
| Leadership & influence round | Behavioral, structured around past initiatives | Whether you can align stakeholders (finance, security, product, peer VPs) without direct authority |
| Strategy/business case | Scenario-based | How you diagnose, prioritize, and sequence work at portfolio/company level |
| Values/culture (~45 min) | Standard behavioral | Fit and conduct, same as other levels |

**What shifts vs. mid-level interviews:**
- **Coding drops in weight, not out entirely** — the system design and leadership rounds are where loops are actually won or lost
- **System design becomes about judgment, not knowledge** — the bar is set on judgment, not knowledge; you're expected to independently define what's in and out of scope rather than solve a handed-down question
- **Behavioral rounds test organizational reach, not task execution** — evaluated on: direction-setting at org scale, influence without formal authority, converting ambiguity into concrete strategy, and resolving "right vs. right" trade-offs (both options defensible, no clean answer)
- **Scope of every answer is expected to be bigger** — decision weight shifts from "did you solve the assigned problem" to "did you choose which problems deserved the team's capacity," and execution is judged by adoption mechanisms and durable operating models, not just shipping

**Ready-to-use prompts:**
- "Act as a Principal Engineer interviewer. Give me an ambiguous architecture problem with no clear scope, and make me define the boundaries myself before I design anything."
- "I'm about to answer a system design question — interrupt me and ask how this decision affects budget, legacy systems, or compliance, not just technical correctness."
- "Give me a 'right vs. right' scenario (two valid but conflicting priorities) and push me to resolve it, then critique whether my resolution actually required organizational influence or was just a technical call."
- "Ask me to describe a past initiative where I had to influence a team I didn't manage. Push back on vague claims and demand a concrete mechanism I used."
- "Simulate a strategy/business case round: give me a vague business goal and make me turn it into a sequenced technical roadmap, questioning my prioritization at each step."

**Real question pattern:** "Walk me through a technical decision you made that had significant organizational impact, including where you were wrong" / "How would you prioritize between three conflicting infrastructure investments with a fixed budget?" / open-ended architecture prompts with no stated constraints, where defining constraints is part of the evaluation.

---

## Master Prompt Template (for the learner website generator)

Use this as the parameterized template your site plugs topic/difficulty/level into:

```
You are an interview coach for the topic: {TOPIC}.
Context: this topic is tested at {COMPANY_TYPE} companies as of 2026, mainly as {ROUND_TYPE}
(e.g. system design deep-dive, standalone coding question, behavioral follow-up).
Candidate experience level: {EXPERIENCE_LEVEL} (e.g. 0-2 yrs, mid-level, senior, principal/staff 18+ yrs).

1. Ask me ONE question in the real style companies currently use for this topic and level
   (see "Real question pattern" reference for {TOPIC}).
2. Do NOT give the answer yet — wait for my attempt.
3. After I answer, tell me which of the "Top concepts" for {TOPIC} I covered well and which I missed.
   At principal/staff level, also flag whether my answer showed organizational judgment and
   scope-ownership, not just technical correctness.
4. Ask one follow-up that a real interviewer would use to probe the gap.
5. Keep explanations in plain language, with any technical term defined inline in brackets
   the first time it's used.
```

---

## Mapping to the 10 AI Engineer 2026 Skills

| Topic (# above) | Skill area |
|---|---|
| 3, 13 | Deployment & Scale |
| 4 | Context & RAG |
| 5 | Agent Loops & Frameworks |
| 6 | ReAct Framework |
| 7 | MCP & Tool Integration |
| 8 | Multi-Agent Systems |
| 9 | AI Gateway |
| 10 | Evaluation |
| 11 | Observability |
| 12 | Safety Harnesses |
| 1, 2, 14, 15 | Cross-cutting (DSA, classic system design, AI-era process, and principal-track rounds all draw on multiple skill areas at once) |
