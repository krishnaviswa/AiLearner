# Initial real-world projects

Gate 0 item 9. Outlines only. Implementations are Gate 8. Each item must later include why a **deterministic** solution might be better.

## Hands-on ladder (must exist eventually)

| Level | Project | Proves |
|---|---|---|
| 1 | Simple LLM application | Contracts, eval of one call |
| 2 | RAG application | Retrieval + citations |
| 3 | Production-oriented RAG | ACL, DLP, eval harness |
| 4 | Tool-using agent | Authz, timeouts, wrong-tool tests |
| 5 | Agentic RAG | Retrieval as a tool, loops |
| 6 | NL-to-SQL agent | AST/security validation |
| 7 | Multi-agent system | Handoff vs supervisor |
| 8 | Secure enterprise agent | Identity, policy, egress |
| 9 | Observable production agent | OTel, cost, traces without leaking PII |
| 10 | Enterprise AI platform | Capstone: data → knowledge → agents → gov |

Each project later: architecture, README, repo layout, Python, tests, sample data, Docker where appropriate, deploy notes, eval dataset + scripts, observability, security, cost assumptions.

## Fifteen enterprise use cases (stubs)

For each: business problem · why AI/agent · why deterministic might win · data · architecture · pattern · tools · security · evaluation · implementation · failures · production · cost/perf.

1. **Enterprise knowledge assistant** — permission-aware RAG; often a search+workflow is enough.
2. **Healthcare knowledge assistant** — PHI; DLP and human review; agents are optional.
3. **Customer support agent** — tools + HITL; deterministic playbooks for refunds.
4. **Data analyst agent** — NL-to-SQL + semantic layer; BI dashboards still win for repeated questions.
5. **NL-to-SQL analyst** — same as 4 with harder security.
6. **Data quality agent** — often Great Expectations/DBT tests; agent for triage only.
7. **Pipeline monitoring agent** — event-driven; paging rules may beat an LLM.
8. **Incident management agent** — read-only first; write tools are excessive agency.
9. **Documentation agent** — RAG over repos; hallucination of APIs is the failure mode.
10. **Software engineering agent** — sandbox; supply chain and secret leakage.
11. **Cloud operations agent** — IAM blast radius; prefer runbooks + approval.
12. **Security investigation agent** — SOC; false confidence is the risk.
13. **Financial reporting agent** — SOX-like controls; deterministic aggregations first.
14. **Marketing analytics agent** — PII in event streams; governance.
15. **Enterprise research agent** — web+internal; citation and freshness.

## Final capstone (Gate 8–10, not now)

**Enterprise AI Data & Agent Platform:** sources → lakehouse → governed data → knowledge processing → search/vector → AI gateway → model router → agent runtime → tools/MCP → RAG → NL-to-SQL → guardrails → DLP → evaluation → observability → governance → CI/CD → production.
