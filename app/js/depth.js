/* Concept steps = real HTML files in this folder. Clicking changes the URL.
   Not a fake L1–L8 dropdown that hides headings on the same file. */
(function () {
  function folderAndFile() {
    var path = window.location.pathname.replace(/\\/g, "/");
    var parts = path.split("/").filter(Boolean);
    return {
      parent: parts.length >= 2 ? parts[parts.length - 2] : "",
      file: parts[parts.length - 1] || "index.html"
    };
  }

  function isConceptFolder(name) {
    return /^(0[1-9]|[1-4]\d|50)-/.test(name);
  }

  function boot() {
    var loc = folderAndFile();
    if (!isConceptFolder(loc.parent)) return;
    var idx = window.LAB_PAGE_INDEX || {};
    var pages = idx[loc.parent];
    if (!pages || pages.length < 2) return;
    var article = document.querySelector(".lab-article");
    if (!article || document.getElementById("lab-concept-steps")) return;

    var nav = document.createElement("nav");
    nav.id = "lab-concept-steps";
    nav.setAttribute("aria-label", "Pages in this concept");
    var label = document.createElement("p");
    label.className = "lab-steps-caption";
    label.textContent = "Same topic — go deeper";
    nav.appendChild(label);
    var row = document.createElement("div");
    row.className = "lab-steps";
    pages.forEach(function (p) {
      var a = document.createElement("a");
      a.href = p.file;
      a.textContent = p.label;
      if (p.file === loc.file) {
        a.className = "is-current";
        a.setAttribute("aria-current", "page");
      }
      row.appendChild(a);
    });
    nav.appendChild(row);
    var src = article.querySelector(".md-source");
    if (src && src.nextSibling) article.insertBefore(nav, src.nextSibling);
    else article.insertBefore(nav, article.firstChild);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
