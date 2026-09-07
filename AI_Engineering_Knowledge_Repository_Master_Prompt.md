# Master Prompt: AI Engineering Knowledge Repository & Interactive Learning Lab

## Mission

Build a comprehensive, production-oriented **AI Engineering Knowledge Repository and Interactive Learning Laboratory**.

The objective is not to create an encyclopedia or a pile of web pages. The objective is to create a system that takes an experienced cloud/data engineer from:

**simple logical understanding → implementation understanding → engineering understanding → production understanding → architect-level judgment → principal-level trade-off thinking.**

The repository should cover the complete modern AI engineering landscape, including all major flavors of AI agents, not merely RAG.

The system should be useful as a multi-year learning and reference environment and should minimize unnecessary repeated LLM calls by baking durable knowledge into local artifacts and using LLM/web retrieval only where it adds value.

---

# 1. Core Design Philosophy

Build a **learning system**, not merely documentation.

The repository must optimize for:

- Understanding
- Connections between concepts
- Hands-on implementation
- Evaluation
- Security
- Failure analysis
- Production realism
- Architecture judgment
- Continuous freshness

Avoid optimizing for raw document count.

Do not generate thousands of repetitive pages simply because information is available.

Every concept should answer:

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

---

# 2. Scope: Cover Every Major Agent Flavor

Do NOT restrict the repository to RAG or "agentic RAG."

Cover the complete spectrum:

- Simple LLM applications
- Prompt-driven applications
- Structured-output applications
- Tool/function-calling agents
- ReAct-style agents
- Workflow-based AI systems
- Router agents
- Planner/executor agents
- Stateful agents
- Memory-enabled agents
- Human-in-the-loop agents
- Approval-based agents
- Long-running agents
- Durable agents
- Event-driven agents
- Background agents
- Autonomous/semi-autonomous agents
- Agentic RAG
- Multi-agent systems
- Supervisor/worker architectures
- Handoff architectures
- Parallel-agent architectures
- Hierarchical agents
- MCP-based agents
- NL-to-SQL agents
- Data-engineering agents
- Data-quality agents
- Cloud/operations agents
- Security agents
- Coding/software-engineering agents
- Research agents
- Enterprise knowledge agents
- Customer-service agents
- Decision-support agents

Also explicitly teach when an agent is NOT the correct solution and a deterministic workflow, API, SQL query, or conventional pipeline is preferable.

---

# 3. User Learning Context

Assume the learner already has substantial experience in:

- Python
- SQL
- AWS
- Azure
- Data Engineering
- Apache Spark
- Kafka
- Databricks
- Snowflake
- PostgreSQL
- SQL Server
- APIs
- Cloud architecture
- CI/CD
- Data pipelines

Therefore do not spend excessive time teaching basic programming.

Use these existing concepts as bridges into AI engineering.

Examples:

- Explain agent orchestration using workflow/state-machine analogies.
- Explain RAG pipelines using data-pipeline concepts.
- Explain event-driven agents using Kafka/Event Hub concepts.
- Explain tool calling using APIs.
- Explain agent state using distributed-system state.
- Explain memory using databases/caches/state stores.
- Explain evaluation using data-quality/testing concepts.
- Explain AI observability using distributed tracing.
- Explain AI governance using data governance.
- Explain AI security using API/cloud security.
- Explain NL-to-SQL using query planning and database security.

The goal is to bridge:

**DATA ENGINEERING + CLOUD ENGINEERING + AI ENGINEERING + AGENT ENGINEERING.**

---

# 4. Progressive Learning Model

Every major concept must be taught progressively.

Use these levels:

## Level 1 — SIMPLE

Answer:

> What is it?

Use:
- Plain language
- Tiny diagrams
- One analogy
- One simple example

Example:

Agent = an application that can decide what action to take and use available capabilities to achieve a goal.

## Level 2 — LOGICAL

Answer:

> Why does it exist?

Explain:
- Problem
- Motivation
- Why conventional approaches may be insufficient
- Where the concept fits

## Level 3 — MECHANICAL

Answer:

> How does it actually work?

Show:
- Components
- State
- Inputs
- Outputs
- Execution loop
- Control flow
- Data flow

## Level 4 — IMPLEMENTATION

Answer:

> How do I build it?

Provide:
- Python
- APIs
- Configuration
- Minimal runnable implementation
- Tests

## Level 5 — ENGINEERING

Answer:

> How do I build it properly?

Cover:
- Modularity
- Error handling
- Retries
- State
- Concurrency
- Configuration
- Dependency management
- Testing
- Versioning

## Level 6 — ARCHITECT

Answer:

> What architecture should I choose?

Cover:
- Alternatives
- Trade-offs
- Decision criteria
- Scalability
- Availability
- Security
- Cost
- Operational complexity
- Vendor lock-in

## Level 7 — PRODUCTION

Answer:

> What breaks in the real world?

Cover:
- Failure modes
- Timeouts
- Model failures
- Tool failures
- Data failures
- Security attacks
- Cost explosions
- Latency
- Observability
- Incident response
- Disaster recovery

## Level 8 — PRINCIPAL / EXPERT

Answer:

> Should we use this at all, and how do we defend the decision?

Cover:
- Architectural alternatives
- Organizational impact
- Governance
- Long-term maintainability
- Technology maturity
- Build vs buy
- Vendor strategy
- Model strategy
- Cost/risk trade-offs

---

# 5. Progressive Disclosure in HTML

Do NOT show all complexity immediately.

The interactive HTML should progressively reveal information.

Example:

Initial:

    User
      ↓
     LLM
      ↓
    Tool
      ↓
    Result

Then reveal:

    Agent
      ├── Reason
      ├── Decide
      └── Act

Then:

    Agent
      ↓
    Planner
      ↓
    Tool Selection
      ↓
    Tool Execution
      ↓
    Observation
      ↓
    Next Action

Then eventually:

    User
      ↓
    Gateway
      ↓
    Identity / Policy
      ↓
    Agent Runtime
      ├── Planner
      ├── State
      ├── Memory
      ├── Model Router
      ├── RAG
      └── Tool Registry
              ├── APIs
              ├── MCP
              └── Data Systems
      ↓
    Guardrails
      ↓
    Observability
      ↓
    Evaluation

The same concept should recur at increasing levels of sophistication.

---

# 6. Depth Control

Create an interactive depth selector:

- Simple
- Medium
- Hard
- Engineering
- Architect
- Production
- Expert

Example UI:

    Understanding Depth

    Simple ─────●──────── Expert

The user should be able to change depth without losing context.

Do not make the learner read every level upfront.

---

# 7. Learning Modes

Every major concept should have four primary modes:

## SEE

Visual explanation.

## DO

Interactive simulation or hands-on exercise.

## BREAK

Intentionally introduce failures.

## DESIGN

Ask the learner to design a real architecture.

Example:

Tool-calling agent:

SEE:
Understand tool selection.

DO:
Select a tool interactively.

BREAK:
Make the tool unavailable or return invalid data.

DESIGN:
Design a secure tool platform for millions of requests.

---

# 8. Interactive HTML Application

Build the repository as a static/local-first web application where practical.

Use:

- HTML
- CSS
- JavaScript
- Markdown
- JSON
- YAML
- Mermaid

Avoid requiring a backend unless necessary.

The application should include:

- Navigation tree
- Concept pages
- Depth selector
- Expand/collapse sections
- Interactive diagrams
- Flowcharts
- Sequence diagrams
- Decision trees
- Mind maps
- Architecture diagrams
- Tool-selection simulations
- Failure simulations
- Quizzes
- Architecture challenges
- Progress tracking where practical
- Links between related concepts
- Source references
- Technology freshness indicators

---

# 9. "Why?" Exploration

Make important statements explorable.

Example:

> Agent uses a vector database.

Click "Why?"

→ Semantic retrieval.

Why semantic retrieval?

→ Keyword matching may miss conceptually similar information.

Why not use only an LLM?

→ Context, freshness, cost, grounding, access control and data-volume constraints.

Why hybrid search?

→ Combining lexical and semantic signals can improve retrieval for appropriate enterprise workloads.

The learner should be able to follow a chain of reasoning rather than memorize facts.

---

# 10. Concept Knowledge Graph

Build a machine-readable and interactive knowledge graph.

Example:

    Agent
      ├── uses → LLM
      ├── uses → State
      ├── may use → Memory
      ├── uses → Tools
      ├── may use → RAG
      └── requires → Evaluation

    Tool
      ├── may be → API
      ├── may be → MCP
      └── requires → Authorization

    RAG
      ├── uses → Chunking
      ├── uses → Embeddings
      ├── uses → Retrieval
      ├── may use → Reranking
      └── requires → Evaluation

Store as:

    knowledge-graph.json

Also render an interactive HTML visualization.

---

# 11. Architect Bridges

For every new AI concept, connect it to familiar engineering concepts.

Example:

Traditional:

    Kafka
      ↓
    Spark
      ↓
    Database
      ↓
    API

Agentic:

    Event
      ↓
    Agent
      ↓
    Decision
      ├── Database
      ├── API
      ├── RAG
      └── Human

Explicitly explain:

> An agent does not automatically replace deterministic data pipelines. In many enterprise architectures, it sits above deterministic systems and decides which capability to invoke.

Create these bridges throughout the curriculum.

---

# 12. Repository Structure

Create a structure similar to:

    AI-ENGINEERING-LAB/

    00-MASTER-MAP/
        index.html
        master-mindmap.md
        dependency-graph.md
        technology-map.md

    01-FOUNDATIONS/

    02-PYTHON-FOR-AI/

    03-LLM-ENGINEERING/

    04-PROMPT-ENGINEERING/

    05-LLM-APPLICATION-ENGINEERING/

    06-EMBEDDINGS/

    07-VECTOR-DATABASES/

    08-RAG/

    09-AGENTIC-RAG/

    10-AGENTS/

    11-AGENT-ORCHESTRATION/

    12-TOOLS-FUNCTION-CALLING/

    13-MCP/

    14-MULTI-AGENT-SYSTEMS/

    15-NL2SQL/

    16-AI-DATA-ENGINEERING/

    17-LLM-DATA-PIPELINES/

    18-EVALUATION/

    19-OBSERVABILITY/

    20-LLMOPS/

    21-AI-SECURITY/

    22-GUARDRAILS/

    23-PHI-PII-DLP/

    24-AI-GOVERNANCE/

    25-RESPONSIBLE-AI/

    26-AI-CLOUD-ARCHITECTURE/

    27-AZURE-AI/

    28-AWS-AI/

    29-GCP-AI/

    30-DATABRICKS-AI/

    31-DATABASE-AI/

    32-AI-APPLICATION-DEVELOPMENT/

    33-AI-APIS/

    34-AI-INFRASTRUCTURE/

    35-AI-CI-CD/

    36-AI-TESTING/

    37-AI-PERFORMANCE/

    38-AI-COST/

    39-AI-PRODUCTION-OPERATIONS/

    40-REFERENCE-ARCHITECTURES/

    41-REAL-WORLD-USE-CASES/

    42-CAPSTONE-PROJECTS/

    43-EXPERIMENTS/

    44-ARCHITECTURE-INTERVIEWS/

    45-TROUBLESHOOTING/

    46-DESIGN-PATTERNS/

    47-ANTI-PATTERNS/

    48-GLOSSARY/

    49-RESEARCH-PAPERS/

    50-CHEAT-SHEETS/

    99-META/
        sources.yaml
        technology-status.yaml
        knowledge-graph.json

---

# 13. Standard Concept Template

Every major concept should have:

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

Do not mechanically create empty documents. Only create a document when it has meaningful content.

---

# 14. Master AI Engineering Mind Map

Create a master visual map:

    Business Problem
        ↓
    Data
        ↓
    Data Engineering
        ↓
    Knowledge / Semantic Layer
        ↓
    Retrieval / Search
        ↓
    LLM
        ↓
    Tools
        ↓
    Agents
        ↓
    Orchestration
        ↓
    Guardrails
        ↓
    Evaluation
        ↓
    Observability
        ↓
    Security
        ↓
    Governance
        ↓
    Deployment
        ↓
    Production Operations
        ↓
    Continuous Improvement

Show relationships between:

- Data Engineering
- ML Engineering
- LLM Engineering
- AI Engineering
- Platform Engineering
- Cloud Engineering
- Security Engineering
- MLOps
- LLMOps
- DevOps
- Data Governance

---

# 15. Canonical AI Engineering Reference Architecture

Create a vendor-neutral production reference architecture:

    User
      ↓
    Web / Mobile / API
      ↓
    API Gateway
      ↓
    Authentication / Authorization
      ↓
    AI Application
      ↓
    Agent Runtime / Orchestrator
      ↓
    Planner / Router
      ↓
    Model Router
      ↓
    LLM
      ↓
    Tool Registry
      ├── APIs
      ├── MCP
      ├── Databases
      ├── Search
      └── Enterprise Systems

    RAG / Knowledge Layer
      ├── Document Processing
      ├── Chunking
      ├── Enrichment
      ├── Embeddings
      ├── Search
      └── Reranking

    Data Layer
      ├── PostgreSQL
      ├── SQL Server
      ├── Snowflake
      ├── Databricks
      ├── Delta Lake
      ├── ADLS
      └── S3

Cross-cutting:

- Identity
- Authorization
- Policy
- Guardrails
- DLP
- PII/PHI detection
- Secrets
- Audit
- Evaluation
- Observability
- Cost management
- Governance
- CI/CD

Produce both logical and physical/cloud architectures.

---

# 16. Data → AI Knowledge Pipeline

Create the complete pipeline:

    Source Systems
        ↓
    Batch / CDC / Streaming
        ↓
    Ingestion
        ↓
    Raw Zone
        ↓
    Data Quality
        ↓
    Cleansing
        ↓
    Enrichment
        ↓
    Metadata Extraction
        ↓
    Document Processing
        ↓
    ACL / Security Metadata
        ↓
    Chunking
        ↓
    Embeddings
        ↓
    Search / Vector Index
        ↓
    Hybrid Retrieval
        ↓
    Reranking
        ↓
    Context Assembly
        ↓
    RAG / Agent
        ↓
    Guardrails / DLP
        ↓
    Output

Explain structured + unstructured data architecture.

Cover:

- PostgreSQL
- SQL Server
- Snowflake
- Databricks
- Delta Lake
- ADLS
- S3
- Kafka
- Event Hubs
- Azure AI Search
- OpenSearch
- PostgreSQL + pgvector

Explain when each is appropriate.

---

# 17. RAG Curriculum

Cover:

- Naive RAG
- Classical RAG
- Advanced RAG
- Hybrid RAG
- Graph RAG
- Agentic RAG
- Multimodal RAG
- SQL RAG
- API RAG
- Enterprise RAG
- Multi-tenant RAG
- Permission-aware RAG

Pipeline:

    Document ingestion
        ↓
    Parsing
        ↓
    Cleaning
        ↓
    Chunking
        ↓
    Enrichment
        ↓
    Embeddings
        ↓
    Indexing
        ↓
    Query understanding
        ↓
    Query rewriting
        ↓
    Query decomposition
        ↓
    Retrieval
        ↓
    Filtering
        ↓
    Reranking
        ↓
    Context compression
        ↓
    Prompt construction
        ↓
    Generation
        ↓
    Citation
        ↓
    Evaluation

For every stage document:

- Purpose
- Inputs
- Outputs
- Algorithms
- Libraries
- Cloud services
- Failure modes
- Metrics
- Cost
- Latency
- Security implications
- Implementation example

Do not treat RAG as a black box.

---

# 18. Agent Engineering Curriculum

Cover:

- Agent definition
- Agent vs chatbot
- Agent vs workflow
- Agent vs RAG
- Agentic RAG
- Planning
- Reasoning
- Tool use
- Function calling
- State
- Memory
- Reflection
- Retry
- Error recovery
- Human approval
- Long-running execution
- Durable execution
- Background agents
- Multi-agent systems
- Handoffs
- Supervisor/worker
- Planner/executor
- Router
- Event-driven agents

For each pattern create:

- Mental model
- Flowchart
- Sequence diagram
- State diagram
- Implementation
- Production architecture
- Failure modes
- Evaluation
- Security
- Cost/performance

---

# 19. Agent Framework Comparison

Research and compare current frameworks, including where applicable:

- LangGraph
- LangChain
- Microsoft Agent Framework
- Semantic Kernel
- OpenAI Agents SDK
- LlamaIndex
- AutoGen
- CrewAI

Do not simply list features.

Compare:

- State
- Orchestration
- Tool calling
- Memory
- Human approval
- Streaming
- Durability
- Tracing
- Observability
- Testing
- Production readiness
- Multi-agent support
- Model portability
- Vendor lock-in
- Ecosystem
- Learning curve

Answer:

> When should I use X instead of Y?

Avoid unsupported absolute recommendations.

---

# 20. MCP

Create a full MCP curriculum.

Cover:

- Why MCP exists
- MCP architecture
- Servers
- Clients
- Tools
- Resources
- Prompts
- Discovery
- Security
- Authorization
- Trust boundaries
- Tool poisoning
- Prompt injection
- Enterprise MCP architecture
- MCP vs traditional APIs
- MCP vs function calling

Include production architecture and security model.

---

# 21. NL-to-SQL

Build a production NL-to-SQL architecture:

    User
      ↓
    Intent Classification
      ↓
    Schema Discovery
      ↓
    Semantic Layer / Metadata
      ↓
    Query Planning
      ↓
    SQL Generation
      ↓
    SQL AST Validation
      ↓
    Security Validation
      ↓
    Query Execution
      ↓
    Result Validation
      ↓
    Explanation

Defend against:

- SQL injection
- Prompt injection
- Unauthorized tables
- Unauthorized columns
- PII exposure
- PHI exposure
- Cross-tenant access
- Cartesian joins
- Expensive queries
- Data exfiltration

Implement:

- Read-only execution
- Allowlist/denylist
- Row-level security
- Column-level security
- Query timeout
- Result limits
- Cost limits

---

# 22. AI Security

Create an AI threat-modeling curriculum covering:

- Prompt injection
- Indirect prompt injection
- Data poisoning
- RAG poisoning
- Tool poisoning
- Excessive agency
- Privilege escalation
- Credential leakage
- Sensitive data leakage
- Data exfiltration
- Vector-store attacks
- Model manipulation
- Supply-chain attacks
- Dependency vulnerabilities
- Insecure tool execution

Map threats to appropriate current OWASP/NIST/security guidance.

Create:

- Threat models
- Attack trees
- Trust boundaries
- Security controls
- Detection controls
- Response controls

---

# 23. PII / PHI / DLP / Egress Control

Create an enterprise egress-control architecture:

    User Input
        ↓
    Input Classification
        ↓
    PII/PHI Detection
        ↓
    Policy Engine
        ↓
    Allow / Mask / Block
        ↓
    LLM / Agent
        ↓
    Tool Call
        ↓
    Tool Result Filtering
        ↓
    Output DLP
        ↓
    Audit
        ↓
    User

Evaluate:

- Microsoft Presidio
- Microsoft Purview
- Azure AI Content Safety
- DLP APIs
- Regex/rules
- NER
- ML classifiers
- LLM classifiers
- Policy engines

Clearly explain that an LLM classifier alone should not be treated as the sole compliance mechanism.

Include examples for:

- Name
- Email
- Phone
- SSN
- Medical record number
- Diagnosis
- Medication
- Insurance ID
- Address
- DOB

---

# 24. Ground Truth

Explicitly distinguish:

**Ground truth**
from
**LLM-as-judge**

For RAG:

- Expected relevant documents
- Expected relevant chunks
- Expected answer
- Expected citations

For NL-to-SQL:

- Expected SQL
- Expected result set

For agents:

- Expected tool
- Expected tool arguments
- Expected acceptable sequence
- Expected final state

Explain:

- Human annotation
- Dataset construction
- Golden datasets
- Adversarial datasets
- Regression datasets

---

# 25. Evaluation Framework

Evaluate:

- Retrieval
- Generation
- Agents
- Tools
- Security
- Latency
- Cost
- Reliability
- Correctness
- Groundedness

Metrics:

- Precision@K
- Recall@K
- MRR
- NDCG
- Faithfulness
- Groundedness
- Answer relevance
- Completeness
- Hallucination rate
- Tool-selection accuracy
- Tool-call success rate
- Task completion
- Latency
- Token usage
- Cost/request

Agent-specific:

- Tool calls
- Wrong tool selection
- Unnecessary tool calls
- Planning failures
- Loops
- Recovery success
- Human escalation
- End-to-end task success

Create an evaluation harness.

---

# 26. Evaluation Dataset

Create methodology for:

    Question
      ↓
    Expected Answer
      ↓
    Expected Source
      ↓
    Expected Retrieved Chunks
      ↓
    Expected Tool
      ↓
    Expected SQL
      ↓
    Expected Security Decision

Include:

- Positive examples
- Negative examples
- Adversarial examples
- Edge cases
- Ambiguous questions
- Out-of-domain questions
- Prompt injection
- PII/PHI cases

Every change to:

- Prompt
- Model
- Embeddings
- Chunking
- Retriever
- Reranker
- Agent logic
- Tool descriptions

should be testable against the regression suite.

---

# 27. Observability

Create a full AI observability architecture.

Capture:

    Request
      ↓
    User
      ↓
    Agent
      ↓
    Prompt
      ↓
    Model
      ↓
    Retrieval
      ↓
    Tool
      ↓
    Output
      ↓
    Evaluation
      ↓
    Cost

Cover:

- Logs
- Metrics
- Traces
- Events
- OpenTelemetry
- Trace
- Span
- Parent/child spans
- Correlation IDs
- Request IDs
- Agent run IDs
- Tool-call IDs

Create example dashboards.

Do not log sensitive content unnecessarily.

---

# 28. AI CI/CD / LLMOps

Create:

    Developer
      ↓
    Git
      ↓
    Unit Tests
      ↓
    Integration Tests
      ↓
    Security Tests
      ↓
    Evaluation Tests
      ↓
    Prompt Tests
      ↓
    Model Tests
      ↓
    Deployment
      ↓
    Canary
      ↓
    Monitoring
      ↓
    Feedback
      ↓
    Regression

Version:

- Prompts
- Models
- Embeddings
- Datasets
- Evaluations
- Indexes
- Agent graphs
- Tool definitions

Explain how AI CI/CD differs from traditional CI/CD.

---

# 29. Production Reference Architectures

Create at least:

## Architecture A — Enterprise RAG

## Architecture B — Enterprise AI Agent

## Architecture C — Agentic NL-to-SQL

## Architecture D — Data Engineering Agent

## Architecture E — Secure Enterprise Multi-Agent Platform

For each:

- Frontend
- API
- Identity
- Gateway
- Agent runtime
- LLM
- RAG
- Data
- Security
- Evaluation
- Observability
- CI/CD
- Infrastructure
- Disaster recovery
- Cost model

Create:

1. Vendor-neutral version
2. Azure implementation
3. AWS implementation

Add Databricks where relevant.

---

# 30. Real-World Use Cases

Create at least 15 realistic enterprise use cases:

1. Enterprise knowledge assistant
2. Healthcare knowledge assistant
3. Customer support agent
4. Data analyst agent
5. NL-to-SQL analyst
6. Data quality agent
7. Data pipeline monitoring agent
8. Incident management agent
9. Documentation agent
10. Software engineering agent
11. Cloud operations agent
12. Security investigation agent
13. Financial reporting agent
14. Marketing analytics agent
15. Enterprise research agent

For each:

- Business problem
- Why AI/agent is appropriate
- Why a deterministic solution might be better
- Data
- Architecture
- Agent pattern
- Tools
- Security
- Evaluation
- Implementation
- Failure scenarios
- Production concerns
- Cost/performance

---

# 31. Hands-on Project Ladder

Build progressive projects:

## Level 1
Simple LLM application.

## Level 2
RAG application.

## Level 3
Production-oriented RAG.

## Level 4
Tool-using agent.

## Level 5
Agentic RAG.

## Level 6
NL-to-SQL agent.

## Level 7
Multi-agent system.

## Level 8
Secure enterprise agent.

## Level 9
Observable production agent.

## Level 10
Full enterprise AI platform.

Each project must include:

- Architecture
- README
- Repository structure
- Python
- Tests
- Sample data
- Docker where appropriate
- Deployment instructions
- Evaluation dataset
- Evaluation scripts
- Observability
- Security
- Cost considerations

---

# 32. Failure-First Engineering

Every architecture must ask:

> What happens when this fails?

Cover:

- LLM timeout
- LLM unavailable
- Embedding service unavailable
- Search unavailable
- Database unavailable
- Tool timeout
- Tool returns incorrect data
- Agent loops
- Wrong tool
- Prompt injection
- Bad retrieval
- Wrong SQL
- PII leakage
- PHI leakage
- Token explosion
- Cost explosion
- Context overflow
- Model regression
- Index corruption
- Stale data

For each:

- Detection
- Mitigation
- Fallback
- Recovery
- Alerting
- Testing

---

# 33. Performance Engineering

Document:

- Latency budgets
- P50
- P95
- P99
- Retrieval latency
- Tool latency
- Model latency
- End-to-end latency

Optimization:

- Caching
- Streaming
- Parallel retrieval
- Batch embeddings
- Model routing
- Smaller models
- Context reduction
- Reranking
- Async execution
- Connection pooling

---

# 34. Cost Engineering

For each production architecture estimate:

- LLM
- Embeddings
- Search
- Database
- Compute
- Storage
- Network
- Observability
- Evaluation

Show:

- Low volume
- Medium volume
- High volume

Calculate where possible:

- Cost/request
- Cost/user
- Cost/month
- Cost/1M requests

Clearly label assumptions.

Do not invent pricing. Verify current pricing from official sources.

---

# 35. Decision Framework

For every major architectural choice create a decision guide.

Examples:

- Vector DB vs Search Engine
- RAG vs Fine-tuning
- Workflow vs Agent
- Single agent vs Multi-agent
- LangGraph vs another orchestration framework
- Azure AI Search vs pgvector
- Batch vs Streaming
- REST vs MCP
- SQL agent vs Semantic Layer
- LLM classifier vs deterministic rules
- Managed service vs Open Source
- Large model vs small model

Every decision should include:

- Decision criteria
- Recommended default where justified
- Exceptions
- Trade-offs
- Cost
- Complexity
- Operational burden
- Security
- Vendor lock-in

---

# 36. Technology Matrix

Create a maintainable matrix:

| Category | Technology | Purpose | Maturity | Production Readiness | Advantages | Disadvantages | When to Use | When Not to Use |
|---|---|---|---|---|---|---|---|---|

Cover:

- LLMs
- SLMs
- Embeddings
- Vector stores
- Search engines
- Agent frameworks
- Orchestration
- Databases
- Data platforms
- Evaluation
- Observability
- Guardrails
- Security
- Cloud services

---

# 37. Source and Freshness Strategy

Do not simply "bake today's ChatGPT" into the repository.

Separate:

## Durable Knowledge

Concepts that remain valid for years.

## Current Implementation

Current APIs/frameworks/cloud capabilities.

## Technology Status

Stable / Mature / Emerging / Preview / Experimental / Deprecated.

Every technology-specific page must record:

- Last verified
- Version
- Primary source
- Status
- Alternatives

For rapidly changing information, verify against current official documentation.

Prioritize sources:

### Tier 1
- Official cloud documentation
- Official framework documentation
- Official SDK documentation
- Official standards
- Official architecture centers
- Official GitHub repositories

### Tier 2
- CNCF
- Apache
- Linux Foundation
- NIST
- OWASP
- Universities
- Research papers
- Established technical organizations

### Tier 3
- Reputable engineering blogs
- Conference presentations
- Technical articles
- High-quality GitHub repositories

### Tier 4
- Community discussions
- Reddit
- Stack Overflow
- Medium
- Personal blogs

Use lower-tier sources primarily for practical experience and troubleshooting.

---

# 38. Source Registry

Create:

    99-META/sources.yaml

Fields:

- source_id
- title
- URL
- publisher
- date
- technology
- version
- trust_level
- last_verified
- topics

Important technical claims should be traceable to source IDs.

---

# 39. Anti-Hallucination Rules

If information cannot be verified:

> UNVERIFIED

Do not invent:

- API names
- SDK methods
- Cloud services
- Framework capabilities
- Pricing
- Performance numbers
- Adoption statistics
- Architecture claims

If sources disagree:

- Show the disagreement
- Identify likely reason
- State what is currently supported by stronger evidence

Clearly label:

- Stable
- Preview
- Deprecated
- Experimental
- Vendor-specific
- General industry pattern

---

# 40. Interactive Simulations

Create small browser simulations for concepts where interaction improves understanding.

Examples:

## Agent simulator

User asks:

> Find the customer's latest order.

Available tools:

- Search Database
- Search RAG
- Call Order API
- Ask User

Allow the learner to select a tool and see the resulting execution path.

## Failure simulation

Disable a tool.

Ask:

> Retry, fallback, ask human, or fail?

## RAG simulator

Let the learner adjust:

- Chunk size
- Top-K
- Retrieval mode
- Reranking
- Context size

Show conceptual effects on retrieval.

## NL-to-SQL simulator

Show:

Question
→ Schema
→ Generated SQL
→ Security validation
→ Execution

Allow unsafe queries to be rejected.

Do not imply that toy simulation metrics represent production performance.

---

# 41. Architect Challenges

At the end of each major section provide an architecture challenge.

Example:

> You need to support 50,000 customer requests/day. Some requests require database access, some require documents, and some require human approval. Would you build a workflow, an agent, or both?

The learner submits an answer.

The system should compare the answer against architectural considerations, not merely mark a single "correct" answer.

---

# 42. Learning Completion Model

The goal is not:

"I read the document."

The goal is:

    Beginner
      ↓
    Understands
      ↓
    Can explain
      ↓
    Can implement
      ↓
    Can test
      ↓
    Can debug
      ↓
    Can evaluate
      ↓
    Can secure
      ↓
    Can scale
      ↓
    Can design
      ↓
    Can defend architecture decisions

Track these dimensions where practical.

---

# 43. Phased Gate Process

Do NOT generate the complete repository in one uncontrolled pass.

Use gates.

## GATE 0 — SCOPE

Produce only:

1. Master taxonomy
2. Knowledge graph outline
3. Learning dependency graph
4. Repository structure
5. Production reference architecture
6. Technology map
7. Phased gate plan
8. Source strategy
9. Initial real-world projects
10. Recommended learning sequence

Then STOP.

## GATE 1 — ARCHITECTURE

Validate:

- Master architecture
- Concept relationships
- Technology categories
- Learning dependencies

Then STOP.

## GATE 2 — FOUNDATIONS

Build fundamentals.

Then STOP.

## GATE 3 — RAG

Build complete RAG curriculum and labs.

Then STOP.

## GATE 4 — AGENTS

Build all major agent patterns.

Then STOP.

## GATE 5 — EVALUATION

Build evaluation framework.

Then STOP.

## GATE 6 — SECURITY

Build security, guardrails, DLP, PII/PHI.

Then STOP.

## GATE 7 — PRODUCTION

Build production reference architectures.

Then STOP.

## GATE 8 — HANDS-ON

Build executable projects.

Then STOP.

## GATE 9 — INTERACTIVE KNOWLEDGE BASE

Build HTML/JS application.

Then STOP.

## GATE 10 — FINAL INTEGRATION

Cross-link everything.

Then STOP.

Never automatically continue to the next gate.

---

# 44. Gate Quality Criteria

Before declaring a gate complete, assess:

- Accuracy
- Completeness
- Source quality
- Freshness
- Architecture consistency
- Terminology consistency
- Code correctness
- Security correctness
- Production realism
- Cross-reference integrity
- Learning progression

Mark:

- PASS
- FAIL
- NEEDS REVIEW

Do not hide uncertainty.

---

# 45. Real Implementation Requirement

Avoid toy examples wherever possible.

For each major concept provide both:

## Toy

Example:

    PDF
      ↓
    Chunks
      ↓
    Embeddings
      ↓
    Vector Search
      ↓
    LLM

## Production-oriented

    Documents
      ↓
    Ingestion
      ↓
    Malware Scanning
      ↓
    Parsing
      ↓
    Metadata Extraction
      ↓
    Classification
      ↓
    ACL Extraction
      ↓
    Chunking
      ↓
    Enrichment
      ↓
    Embeddings
      ↓
    Index
      ↓
    Hybrid Retrieval
      ↓
    Permission Filtering
      ↓
    Reranking
      ↓
    Context Assembly
      ↓
    LLM
      ↓
    Guardrails
      ↓
    Citation
      ↓
    Output DLP
      ↓
    Audit
      ↓
    Telemetry
      ↓
    Evaluation

---

# 46. Cloud Mapping

For every important architecture, explain how it maps to:

- Azure
- AWS
- GCP where useful
- Databricks
- Vendor-neutral/open-source stack

Separate general architectural principles from vendor-specific implementations.

Do not force every technology into every cloud.

---

# 47. Final Enterprise Capstone

Build a final reference implementation:

**Enterprise AI Data & Agent Platform**

    Data Sources
        ↓
    Batch / Streaming / CDC
        ↓
    Lakehouse
        ↓
    Governed Data
        ↓
    Knowledge Processing
        ↓
    Search / Vector
        ↓
    AI Gateway
        ↓
    Model Router
        ↓
    Agent Runtime
        ↓
    Tools / MCP
        ↓
    RAG
        ↓
    NL-to-SQL
        ↓
    Guardrails
        ↓
    DLP
        ↓
    Evaluation
        ↓
    Observability
        ↓
    Governance
        ↓
    CI/CD
        ↓
    Production

Include:

- Architecture
- Repository
- Python
- APIs
- Database
- RAG
- Agents
- NL-to-SQL
- Security
- Evaluation
- Observability
- Docker
- CI/CD
- Infrastructure-as-code where appropriate
- Testing
- Monitoring
- Cost model
- Failure recovery

---

# 48. Final Navigation

Create:

    index.html

with an interactive navigation tree.

Example:

    AI ENGINEERING
    ├── Foundations
    ├── LLM
    ├── RAG
    │   ├── Chunking
    │   ├── Embeddings
    │   ├── Retrieval
    │   ├── Reranking
    │   └── Evaluation
    ├── Agents
    │   ├── Tools
    │   ├── Planning
    │   ├── Memory
    │   ├── MCP
    │   └── Multi-Agent
    ├── Data
    ├── Security
    ├── Evaluation
    ├── Observability
    └── Production

Every concept should link to related concepts.

---

# 49. Learning Summary for Every Concept

Every major topic should finish with:

## What should I remember?

## What should I build?

## What should I experiment with?

## What can go wrong?

## What would a Senior Engineer ask?

## What would a Principal Engineer ask?

## What would an Architect challenge?

## What should I learn next?

---

# 50. LLM Usage and Token-Efficiency Architecture

Do NOT make an LLM call for every user question by default.

The repository should use a hybrid model.

## Layer 1 — Baked Knowledge

Store durable, verified knowledge locally:

- Markdown
- HTML
- JSON
- YAML
- Diagrams
- Code
- Architecture patterns
- Decision matrices
- Examples
- Exercises

This becomes the primary knowledge base.

## Layer 2 — Local Retrieval

When the learner asks a question:

    User Question
        ↓
    Local Knowledge Retrieval
        ↓
    Relevant Documents
        ↓
    Answer / Learning Context

Use an LLM only if reasoning or natural-language generation adds value.

## Layer 3 — LLM

Use the LLM for:

- Adaptive explanations
- Simplification
- Socratic questioning
- Architecture reasoning
- Code generation
- Reviewing learner answers
- Debugging
- Comparing architectural options
- Generating new exercises

## Layer 4 — Current Web Research

For information that changes rapidly:

- APIs
- SDKs
- Cloud capabilities
- Framework versions
- Pricing
- Deprecations
- Current best practices

Use current web research.

Then combine:

    Local Durable Knowledge
            +
    Current Verified Information
            ↓
           LLM
            ↓
      Current Answer

This minimizes repeated token consumption and avoids making the repository obsolete.

---

# 51. Durable vs Volatile Knowledge

Explicitly classify information.

## Durable

Examples:

- What an embedding is
- Why retrieval exists
- Why authorization is required
- What state means
- Why evaluation is needed
- Distributed-system principles
- General architecture patterns

## Volatile

Examples:

- SDK syntax
- Model names
- API endpoints
- Cloud product capabilities
- Framework features
- Pricing
- Preview features

The repository should preserve durable knowledge for years while allowing volatile implementation information to be refreshed.

---

# 52. No Information Dump

Never respond to a learning request with an enormous unstructured explanation.

Instead:

1. Identify the concept.
2. Determine its prerequisites.
3. Give the simplest useful mental model.
4. Check understanding.
5. Progressively add complexity.
6. Connect it to related concepts.
7. Implement it.
8. Break it.
9. Evaluate it.
10. Design the production architecture.

---

# 53. Architectural Judgment Principle

The repository must teach not only:

> "How does technology X work?"

but also:

> "Why would I choose technology X instead of Y?"

And ultimately:

> "Would I choose either?"

Teach the learner to distinguish:

- Possible
- Technically correct
- Operationally practical
- Economically viable
- Secure
- Maintainable
- Architecturally appropriate

---

# 54. Final Quality Standard

The completed system should feel like a combination of:

- University curriculum
- Principal-engineer architecture handbook
- Cloud architecture center
- Interactive textbook
- Production laboratory
- Architecture interview simulator
- AI engineering playground
- Personal knowledge graph

It should NOT feel like:

- A collection of copied tutorials
- A list of links
- A vendor marketing catalog
- A giant static textbook
- A framework-specific course

---

# 55. First Action — STRICT

Before generating the repository:

Perform comprehensive web research.

Then produce ONLY:

1. Master taxonomy
2. Knowledge graph outline
3. Learning dependency graph
4. Repository structure
5. Canonical production reference architecture
6. Technology map
7. Phased gate plan
8. Source strategy
9. Initial real-world projects
10. Recommended learning sequence
11. Proposed interactive HTML architecture
12. Proposed LLM/local-retrieval/web hybrid architecture

Then STOP.

Do not generate Gate 1 until explicitly approved.

---

# 56. Final Principle

The entire project should follow this philosophy:

**Simple first.**

**Same concept again, deeper.**

**Then implement.**

**Then break it.**

**Then evaluate it.**

**Then secure it.**

**Then scale it.**

**Then architect it.**

**Then challenge the architecture.**

The final goal is not for the learner to know every AI technology.

The final goal is for the learner to be able to walk into an ambiguous enterprise problem and confidently answer:

> What should we build?
>
> Why?
>
> Why not the alternatives?
>
> How does it work?
>
> How do we implement it?
>
> How do we secure it?
>
> How do we evaluate it?
>
> How do we observe it?
>
> How does it fail?
>
> What does it cost?
>
> How does it scale?
>
> And when should we deliberately NOT use AI or agents?

That is the definition of architect-level AI engineering understanding.
