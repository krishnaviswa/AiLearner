/* Load factory-state.json over http; fall back to window.FACTORY_STATE from progress-data.js. */
(function () {
  var STATUS_LABEL = {
    not_started: "Not started",
    in_progress: "In progress",
    pass: "PASS",
    fail: "FAIL",
    blocked: "Blocked"
  };

  function render(state, source) {
    var src = document.getElementById("progress-source");
    if (src) src.textContent = "State source: " + source + " · last_updated " + (state.last_updated || "unknown");

    var stages = state.pipeline || [];
    var passed = stages.filter(function (s) { return s.status === "pass"; }).length;
    var pct = stages.length ? Math.round((passed / stages.length) * 100) : 0;
    var pctEl = document.getElementById("progress-pct");
    if (pctEl) pctEl.textContent = pct + "% stages PASS";
    var fill = document.getElementById("progress-bar-fill");
    if (fill) fill.style.width = pct + "%";
    var bar = document.getElementById("progress-bar");
    if (bar) bar.setAttribute("aria-valuenow", String(pct));

    var list = document.getElementById("progress-stages");
    if (list) {
      list.innerHTML = "";
      stages.forEach(function (stage) {
        var li = document.createElement("li");
        li.className = "progress-stage is-" + (stage.status || "not_started");
        li.innerHTML = "<span class=\"progress-stage-label\">" + escapeHtml(stage.label) + "</span>" +
          "<span class=\"progress-stage-status\">" + escapeHtml(STATUS_LABEL[stage.status] || stage.status) + "</span>";
        list.appendChild(li);
      });
    }

    setText("progress-current", (state.current_step || "—") + " (wave " + state.current_wave + ", gate " + state.current_gate + ")");
    setText("progress-resume", state.resume_from || "—");
    var st = document.getElementById("progress-status");
    if (st) st.textContent = state.status || "unknown";

    fillList("progress-unverified", state.unverified, "None recorded.");
    fillList("progress-log", state.recent_log, "No recent entries.");
  }

  function setText(id, value) {
    var el = document.getElementById(id);
    if (el) el.textContent = value;
  }

  function fillList(id, items, empty) {
    var ul = document.getElementById(id);
    if (!ul) return;
    ul.innerHTML = "";
    if (!items || !items.length) {
      var li = document.createElement("li");
      li.textContent = empty;
      ul.appendChild(li);
      return;
    }
    items.forEach(function (item) {
      var li = document.createElement("li");
      li.textContent = item;
      ul.appendChild(li);
    });
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function boot(fallback) {
    fetch("99-META/qa/factory-state.json", { cache: "no-store" })
      .then(function (res) {
        if (!res.ok) throw new Error(String(res.status));
        return res.json();
      })
      .then(function (data) { render(data, "fetched factory-state.json"); })
      .catch(function () {
        if (fallback) render(fallback, "embedded progress-data.js (file:// or fetch failed)");
        else setText("progress-current", "No factory state available.");
      });
  }

  boot(window.FACTORY_STATE);
})();
