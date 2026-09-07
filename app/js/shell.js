/* Website chrome: module bar, sidebar for this module only, prev/next pager.
   Requires learn-path.js first. */
(function () {
  function prefix() {
    var el = document.getElementById("lab-root");
    if (!el) return "";
    var r = el.getAttribute("data-root");
    if (r === null || r === ".") return "";
    return r;
  }

  function href(rel) {
    return prefix() + rel;
  }

  function inject() {
    var P = window.LabPath;
    if (!P) return;
    var here = P.relPath();
    var cur = P.current();
    var modId = cur ? cur.module : "start";

    var header = document.createElement("header");
    header.id = "lab-header";
    var mods = P.modules.map(function (m) {
      var first = P.inModule(m.id)[0];
      var cls = m.id === modId ? " class=\"is-current\"" : "";
      var dest = first ? href(first.href) : href("index.html");
      return "<a" + cls + " href=\"" + dest + "\">" + m.label + "</a>";
    }).join("");

    header.innerHTML =
      "<div class=\"lab-brand\">" +
      "<a class=\"lab-home\" href=\"" + href("index.html") + "\">AI Engineering Lab</a>" +
      "<p>A course path, not a file dump.</p>" +
      "</div>" +
      "<nav class=\"lab-modules\" aria-label=\"Course modules\">" + mods + "</nav>" +
      "<div class=\"lab-controls\" role=\"group\" aria-label=\"Color theme\">" +
      "<button type=\"button\" class=\"lab-theme-btn\" data-theme-set=\"dark\">Dark</button>" +
      "<button type=\"button\" class=\"lab-theme-btn\" data-theme-set=\"light\">Light</button>" +
      "</div>";

    var crumb = document.createElement("div");
    crumb.className = "lab-crumb";
    var modLabel = (P.modules.filter(function (m) { return m.id === modId; })[0] || {}).label || "";
    crumb.innerHTML = "<a href=\"" + href("index.html") + "\">Home</a>" +
      (modLabel ? " <span>/</span> " + modLabel : "") +
      (cur && cur.href !== "index.html" ? " <span>/</span> " + cur.title : "");

    var main = document.createElement("div");
    main.id = "lab-main";

    var nav = document.createElement("nav");
    nav.id = "lab-nav";
    nav.setAttribute("aria-label", "This module");
    var items = P.inModule(modId);
    var navHtml = "<h2>" + (modLabel || "This module") + "</h2><ol>";
    items.forEach(function (item) {
      var cls = item.href === here ? " class=\"current\"" : "";
      navHtml += "<li><a" + cls + " href=\"" + href(item.href) + "\">" + item.title + "</a></li>";
    });
    navHtml += "</ol>";
    navHtml += "<p class=\"lab-nav-extra\"><a href=\"" + href("progress.html") + "\">Progress</a> · " +
      "<a href=\"" + href("00-MASTER-MAP/index.html") + "\">All maps</a></p>";
    nav.innerHTML = navHtml;

    var article = document.querySelector(".lab-article");
    if (!article) {
      article = document.createElement("article");
      article.className = "lab-article";
      while (document.body.firstChild) article.appendChild(document.body.firstChild);
    }

    var prev = P.prev();
    var next = P.next();
    var pager = document.createElement("nav");
    pager.className = "lab-pager";
    pager.setAttribute("aria-label", "Lesson");
    pager.innerHTML =
      (prev
        ? "<a class=\"lab-pager-prev\" href=\"" + href(prev.href) + "\"><span>Previous</span><strong>" + prev.title + "</strong></a>"
        : "<span></span>") +
      (next
        ? "<a class=\"lab-pager-next\" href=\"" + href(next.href) + "\"><span>Next</span><strong>" + next.title + "</strong></a>"
        : "<span></span>");
    article.appendChild(pager);

    var footer = document.createElement("footer");
    footer.id = "lab-footer";
    footer.textContent = "Static course. Markdown is source. Serve from the repo root on port 8766 (port 8000 is often another app).";

    document.body.insertBefore(header, document.body.firstChild);
    document.body.insertBefore(crumb, header.nextSibling);
    main.appendChild(nav);
    main.appendChild(article);
    document.body.appendChild(main);
    document.body.appendChild(footer);

    function paintThemeBtns() {
      var t = window.LabTheme ? window.LabTheme.get() : "dark";
      document.querySelectorAll("[data-theme-set]").forEach(function (btn) {
        btn.setAttribute("aria-pressed", btn.getAttribute("data-theme-set") === t ? "true" : "false");
      });
    }
    document.querySelectorAll("[data-theme-set]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        if (window.LabTheme) window.LabTheme.set(btn.getAttribute("data-theme-set"));
        paintThemeBtns();
      });
    });
    paintThemeBtns();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", inject);
  } else {
    inject();
  }
})();
