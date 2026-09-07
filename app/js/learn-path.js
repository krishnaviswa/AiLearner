/* Linear course path — hosted-site flow. Prev/next uses this order. */
(function () {
  var L = [
    { href: "index.html", title: "Start", module: "start" },
    { href: "00-MASTER-MAP/master-mindmap.html", title: "Why this lab exists", module: "map" },
    { href: "00-MASTER-MAP/reference-architecture.html", title: "Canonical architecture", module: "map" },
    { href: "00-MASTER-MAP/learning-sequence.html", title: "Learning sequence", module: "map" },
    { href: "01-FOUNDATIONS/01-overview.html", title: "Tokens, context, agency", module: "foundations" },
    { href: "01-FOUNDATIONS/02-simple.html", title: "One LLM call", module: "foundations" },
    { href: "01-FOUNDATIONS/19-comparison.html", title: "When not an agent", module: "foundations" },
    { href: "01-FOUNDATIONS/16-hands-on.html", title: "Foundations — do", module: "foundations" },
    { href: "02-PYTHON-FOR-AI/01-overview.html", title: "Python for AI", module: "foundations" },
    { href: "03-LLM-ENGINEERING/01-overview.html", title: "LLM engineering", module: "foundations" },
    { href: "04-PROMPT-ENGINEERING/01-overview.html", title: "Prompt as contract", module: "foundations" },
    { href: "05-LLM-APPLICATION-ENGINEERING/01-overview.html", title: "LLM apps, not agents", module: "foundations" },
    { href: "06-EMBEDDINGS/01-overview.html", title: "Embeddings", module: "rag" },
    { href: "07-VECTOR-DATABASES/01-overview.html", title: "Vector stores", module: "rag" },
    { href: "08-RAG/01-overview.html", title: "RAG", module: "rag" },
    { href: "08-RAG/02-simple.html", title: "Naive RAG", module: "rag" },
    { href: "08-RAG/19-comparison.html", title: "Naive / hybrid / ACL", module: "rag" },
    { href: "08-RAG/16-hands-on.html", title: "RAG — do", module: "rag" },
    { href: "09-AGENTIC-RAG/01-overview.html", title: "Agentic RAG", module: "rag" },
    { href: "10-AGENTS/01-overview.html", title: "Agents", module: "agents" },
    { href: "10-AGENTS/19-comparison.html", title: "When not an agent", module: "agents" },
    { href: "10-AGENTS/03-logical.html", title: "Flavors map", module: "agents" },
    { href: "12-TOOLS-FUNCTION-CALLING/01-overview.html", title: "Tools", module: "agents" },
    { href: "13-MCP/01-overview.html", title: "MCP", module: "agents" },
    { href: "11-AGENT-ORCHESTRATION/01-overview.html", title: "Orchestration", module: "agents" },
    { href: "14-MULTI-AGENT-SYSTEMS/01-overview.html", title: "Multi-agent", module: "agents" },
    { href: "15-NL2SQL/01-overview.html", title: "NL-to-SQL", module: "agents" },
    { href: "18-EVALUATION/01-overview.html", title: "Evaluation", module: "eval" },
    { href: "18-EVALUATION/02-simple.html", title: "Gold vs judge", module: "eval" },
    { href: "21-AI-SECURITY/01-overview.html", title: "AI security", module: "security" },
    { href: "21-AI-SECURITY/03-logical.html", title: "OWASP 2026 map", module: "security" },
    { href: "22-GUARDRAILS/01-overview.html", title: "Guardrails", module: "security" },
    { href: "23-PHI-PII-DLP/01-overview.html", title: "PII / DLP", module: "security" },
    { href: "24-AI-GOVERNANCE/01-overview.html", title: "Governance", module: "security" },
    { href: "26-AI-CLOUD-ARCHITECTURE/01-overview.html", title: "Canonical cloud", module: "production" },
    { href: "40-REFERENCE-ARCHITECTURES/01-overview.html", title: "Ref arch A–E", module: "production" },
    { href: "27-AZURE-AI/01-overview.html", title: "Azure map", module: "production" },
    { href: "28-AWS-AI/01-overview.html", title: "AWS map", module: "production" },
    { href: "30-DATABRICKS-AI/01-overview.html", title: "Databricks map", module: "production" },
    { href: "42-CAPSTONE-PROJECTS/01-overview.html", title: "Hands-on ladder", module: "labs" },
    { href: "simulations.html", title: "Simulations", module: "labs" },
    { href: "48-GLOSSARY/01-overview.html", title: "Glossary", module: "reference" },
    { href: "50-CHEAT-SHEETS/01-overview.html", title: "Cheat-sheets", module: "reference" },
    { href: "47-ANTI-PATTERNS/01-overview.html", title: "Anti-patterns", module: "reference" },
    { href: "44-ARCHITECTURE-INTERVIEWS/01-overview.html", title: "Architect interviews", module: "reference" }
  ];

  var MODULES = [
    { id: "start", label: "Start" },
    { id: "map", label: "Map" },
    { id: "foundations", label: "Foundations" },
    { id: "rag", label: "RAG" },
    { id: "agents", label: "Agents" },
    { id: "eval", label: "Eval" },
    { id: "security", label: "Security" },
    { id: "production", label: "Production" },
    { id: "labs", label: "Labs" },
    { id: "reference", label: "Reference" }
  ];

  function relPath() {
    var path = window.location.pathname.replace(/\\/g, "/");
    var parts = path.split("/").filter(Boolean);
    var file = parts[parts.length - 1] || "index.html";
    var parent = parts.length >= 2 ? parts[parts.length - 2] : "";
    if (parent === "00-MASTER-MAP") return "00-MASTER-MAP/" + file;
    if (parent === "99-META") return "99-META/" + file;
    if (/^\d{2}-/.test(parent)) return parent + "/" + file;
    return file;
  }

  function indexOfHere() {
    var here = relPath();
    for (var i = 0; i < L.length; i++) {
      if (L[i].href === here) return i;
    }
    return -1;
  }

  window.LabPath = {
    lessons: L,
    modules: MODULES,
    relPath: relPath,
    indexOfHere: indexOfHere,
    current: function () {
      var i = indexOfHere();
      return i >= 0 ? L[i] : null;
    },
    prev: function () {
      var i = indexOfHere();
      return i > 0 ? L[i - 1] : null;
    },
    next: function () {
      var i = indexOfHere();
      return i >= 0 && i < L.length - 1 ? L[i + 1] : null;
    },
    inModule: function (id) {
      return L.filter(function (x) { return x.module === id; });
    }
  };
})();
