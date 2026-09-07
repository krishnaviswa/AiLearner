/* Sources used + further reading from 99-META/sources.yaml (via sources-index.js). */
(function () {
  function folderOf() {
    var path = window.location.pathname.replace(/\\/g, "/");
    var parts = path.split("/").filter(Boolean);
    return parts.length >= 2 ? parts[parts.length - 2] : "";
  }

  function citedIds(article) {
    var text = article.textContent || "";
    var re = /SRC-[A-Z0-9-]+/g;
    var found = {};
    var m;
    while ((m = re.exec(text))) found[m[0]] = true;
    return Object.keys(found);
  }

  function li(src) {
    if (!src || !src.url) return "";
    var pub = src.publisher ? " — " + src.publisher : "";
    return "<li><a href=\"" + src.url + "\" rel=\"noopener\" target=\"_blank\">" +
      (src.title || src.id) + "</a>" + pub +
      " <code>" + src.id + "</code></li>";
  }

  function boot() {
    var pack = window.LAB_SOURCES;
    if (!pack || !pack.sources) return;
    var article = document.querySelector(".lab-article");
    if (!article || document.getElementById("lab-refs")) return;

    var sources = pack.sources;
    var cited = citedIds(article);
    var citedHtml = cited.map(function (id) { return li(Object.assign({ id: id }, sources[id])); }).join("");

    var topics = pack.folder_topics[folderOf()] || [];
    var citedSet = {};
    cited.forEach(function (id) { citedSet[id] = true; });
    var further = [];
    Object.keys(sources).forEach(function (id) {
      if (citedSet[id]) return;
      var row = sources[id];
      var hit = (row.topics || []).some(function (t) { return topics.indexOf(t) !== -1; });
      if (hit) further.push(li(Object.assign({ id: id }, row)));
    });

    if (!citedHtml && !further.length) return;

    var box = document.createElement("aside");
    box.id = "lab-refs";
    box.className = "lab-refs";
    var html = "<h2>Sources and further reading</h2>";
    html += "<p class=\"lab-why-note\">From the local registry (<code>99-META/sources.yaml</code>). Not a live web search. Dollar rates are not copied here.</p>";
    if (citedHtml) {
      html += "<h3>Used on this page</h3><ul>" + citedHtml + "</ul>";
    }
    if (further.length) {
      html += "<h3>Further reading for this topic</h3><ul>" + further.slice(0, 8).join("") + "</ul>";
    }
    var root = document.getElementById("lab-root");
    var prefix = "";
    if (root) {
      var r = root.getAttribute("data-root");
      prefix = (r === null || r === ".") ? "" : r;
    }
    html += "<p class=\"lab-why-note\"><a href=\"" + prefix + "00-MASTER-MAP/sources-and-reading.html\">Full catalog</a></p>";
    box.innerHTML = html;

    var why = document.getElementById("lab-why-chain");
    var steps = document.getElementById("lab-concept-steps");
    if (why && why.nextSibling) article.insertBefore(box, why.nextSibling);
    else if (steps && steps.nextSibling) article.insertBefore(box, steps.nextSibling);
    else article.appendChild(box);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
