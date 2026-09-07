/* Honest conceptual simulations. No fake production metrics. */
(function () {
  function $(id) { return document.getElementById(id); }

  function toolPicker() {
    var intent = $("sim-intent");
    var out = $("sim-picker-out");
    if (!intent || !out) return;
    function run() {
      var v = intent.value;
      if (v === "lookup") {
        out.textContent = "Pick lookup_order. cancel_order is a write — wrong-tool if the user only asked where the package is.";
      } else if (v === "cancel") {
        out.textContent = "Policy first: if the principal is read-only, deny cancel_order (LLM03). Do not let the model invoke it.";
      } else {
        out.textContent = "If the steps are always the same, a function beats an agent.";
      }
    }
    intent.addEventListener("change", run);
    $("sim-picker-go").addEventListener("click", run);
    run();
  }

  function toolDown() {
    var out = $("sim-down-out");
    if (!out) return;
    document.querySelectorAll("[data-sim-down]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var k = btn.getAttribute("data-sim-down");
        var text = {
          retry: "Retry once with a budget. A loop of retries is unbounded consumption (LLM06), not resilience.",
          fallback: "Fallback to a cached safe reply or a deterministic lookup. Say you degraded — do not invent a status.",
          human: "Human sees the exact tool and arguments, not a summary (OWASP LLM01).",
          fail: "Fail closed. A pager is better than a confident wrong cancel."
        };
        out.textContent = text[k] || "";
      });
    });
  }

  function ragKnobs() {
    var chunk = $("sim-chunk");
    var k = $("sim-topk");
    var hybrid = $("sim-hybrid");
    var rerank = $("sim-rerank");
    var out = $("sim-rag-out");
    if (!chunk || !out) return;
    function run() {
      var bits = [];
      var c = parseInt(chunk.value, 10);
      bits.push(c >= 3 ? "Larger chunks: more context, higher mix of ACL boundaries and noise." : "Smaller chunks: tighter hits, easier to lose a definition that spanned two windows.");
      bits.push(parseInt(k.value, 10) >= 8 ? "High top-K: more chance the gold line is in the pile — and more distraction." : "Low top-K: cheaper and cleaner if retrieve is already good.");
      bits.push(hybrid.checked ? "Hybrid on: better on IDs and error codes (conceptual)." : "Vector-only: weak on exact tokens (conceptual).");
      bits.push(rerank.checked ? "Rerank on: can help order — does not replace ACL in the query." : "No rerank: order is raw similarity.");
      bits.push("These sliders are not latency or accuracy numbers.");
      out.textContent = bits.join(" ");
    }
    [chunk, k, hybrid, rerank].forEach(function (el) { el.addEventListener("input", run); });
    run();
  }

  function nl2sql() {
    var input = $("sim-sql");
    var out = $("sim-sql-out");
    var go = $("sim-sql-go");
    if (!input || !out) return;
    function validate(sql) {
      var compact = sql.toLowerCase().replace(/\s+/g, " ").trim();
      if (!compact) return "Enter a candidate statement.";
      if (compact.indexOf(";") !== -1) return "Reject: multi-statement.";
      if (compact.indexOf("select *") !== -1) return "Reject: SELECT * (PII and cartesian risk).";
      if (!/\bfrom\s+orders\b/.test(compact)) return "Reject: table not in the allowlist (only orders in this toy).";
      if (/\bssn\b|\bmrn\b/.test(compact)) return "Reject: denied column.";
      if (compact.indexOf(" limit ") === -1) return "Reject: missing LIMIT.";
      return "Allow (conceptual): still execute as the caller’s principal — this box does not open a database.";
    }
    go.addEventListener("click", function () {
      out.textContent = validate(input.value);
    });
    document.querySelectorAll("[data-sql-sample]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        input.value = btn.getAttribute("data-sql-sample") || "";
        out.textContent = validate(input.value);
      });
    });
  }

  function boot() {
    toolPicker();
    toolDown();
    ragKnobs();
    nl2sql();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
