/* Render fenced mermaid blocks in generated HTML.
   Vendor: mermaid@11 from jsDelivr (documented CDN; not a local fork).
   Theme follows data-theme on <html>. */
(function () {
  var SRC = "https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.min.js";

  function currentTheme() {
    return document.documentElement.getAttribute("data-theme") === "light" ? "default" : "dark";
  }

  function nodes() {
    return document.querySelectorAll("pre.mermaid, .lab-article .mermaid");
  }

  function snapshot() {
    nodes().forEach(function (el) {
      if (!el.getAttribute("data-src")) {
        el.setAttribute("data-src", el.textContent);
      }
    });
  }

  function restore() {
    nodes().forEach(function (el) {
      var src = el.getAttribute("data-src");
      if (src != null) {
        el.removeAttribute("data-processed");
        el.removeAttribute("data-mermaid-preview");
        el.textContent = src;
      }
    });
  }

  function init(mermaid) {
    mermaid.initialize({
      startOnLoad: false,
      theme: currentTheme(),
      securityLevel: "strict",
      fontFamily: "Segoe UI, system-ui, sans-serif"
    });
  }

  function run(mermaid) {
    var list = nodes();
    if (!list.length) return;
    mermaid.run({ querySelector: "pre.mermaid, .lab-article .mermaid", suppressErrors: true });
  }

  function loadScript() {
    return new Promise(function (resolve, reject) {
      if (window.mermaid) { resolve(window.mermaid); return; }
      var s = document.createElement("script");
      s.src = SRC;
      s.onload = function () { resolve(window.mermaid); };
      s.onerror = function () { reject(new Error("mermaid CDN failed")); };
      document.head.appendChild(s);
    });
  }

  window.LabMermaid = {
    rerender: function () {
      loadScript().then(function (mermaid) {
        restore();
        init(mermaid);
        run(mermaid);
      });
    }
  };

  function boot() {
    snapshot();
    loadScript().then(function (mermaid) {
      init(mermaid);
      run(mermaid);
    }).catch(function () {
      /* diagrams stay as source text if CDN is blocked */
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
