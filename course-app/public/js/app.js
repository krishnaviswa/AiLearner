(function () {
  var NEXT_KEY = "dojo-next";
  var SEEN_KEY = "dojo-seen";
  var FILTER_KEY = "dojo-filter";
  var THEME_KEY = "dojo-theme";

  function currentTheme() {
    return document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
  }

  function applyTheme(t) {
    var next = t === "dark" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", next);
    try { localStorage.setItem(THEME_KEY, next); } catch (e) { /* ignore */ }
  }

  function initTheme() {
    var saved = "light";
    try { saved = localStorage.getItem(THEME_KEY) || "light"; } catch (e) { /* ignore */ }
    applyTheme(saved);
  }

  var state = {
    config: null,
    session: null,
    preview: null,
    catalog: null,
    lesson: null,
    error: "",
    loading: false,
    filter: ""
  };

  function seen() {
    try { return JSON.parse(localStorage.getItem(SEEN_KEY) || "[]"); }
    catch (e) { return []; }
  }

  function markSeen(id) {
    var list = seen();
    if (list.indexOf(id) < 0) {
      list.push(id);
      try { localStorage.setItem(SEEN_KEY, JSON.stringify(list)); } catch (e) { /* ignore */ }
    }
  }

  function saveNext(id) {
    try { sessionStorage.setItem(NEXT_KEY, id || ""); } catch (e) { /* ignore */ }
  }

  function takeNext() {
    try {
      var id = sessionStorage.getItem(NEXT_KEY) || "";
      sessionStorage.removeItem(NEXT_KEY);
      return id;
    } catch (e) {
      return "";
    }
  }

  function route() {
    var hash = (location.hash || "#/").replace(/^#/, "");
    var parts = hash.split("/").filter(Boolean);
    if (parts[0] === "learn") {
      return { name: "learn", id: decodeURIComponent(parts.slice(1).join("/") || "") };
    }
    if (parts[0] === "catalog") return { name: "catalog" };
    if (parts[0] === "enroll") return { name: "enroll" };
    return { name: "home" };
  }

  function go(hash) {
    location.hash = hash;
  }

  function api(path, opts) {
    return fetch(path, Object.assign({ credentials: "same-origin" }, opts || {})).then(function (r) {
      return r.json().then(function (body) {
        if (!r.ok) throw new Error(body.error || ("HTTP " + r.status));
        return body;
      });
    });
  }

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function brand() {
    var title = (state.config && state.config.title) || "AI Engineering Dojo";
    return (
      '<a class="td-brand" href="#/">' +
        '<span class="td-mark">AE</span><span>' + esc(title) + "</span>" +
      "</a>"
    );
  }

  function footer() {
    return (
      '<footer class="td-footer">Hosted reader. Lessons stay on the server. Screenshot is allowed. Copy and download are not.</footer>'
    );
  }

  function topbar() {
    var signed = state.session && state.session.ok;
    return (
      '<div class="td-promo">One-time enroll · learn in the browser · no zip, no PDF dump</div>' +
      '<header class="td-top">' +
        brand() +
        '<nav class="td-nav">' +
          '<a href="#/">Home</a>' +
          '<a href="#/catalog">Course path</a>' +
          (signed ? '<a href="#/learn">Portal</a>' : '<a href="#/enroll">Enroll</a>') +
          '<button type="button" class="td-theme" data-act="theme" aria-label="Toggle light or dark theme">' +
            (currentTheme() === "dark" ? "☀ Light" : "☾ Dark") +
          "</button>" +
          (signed
            ? '<button type="button" class="td-btn td-btn-ghost" data-act="logout">Sign out</button>'
            : '<a class="td-btn td-btn-blue" href="#/enroll">Start learning</a>') +
        "</nav>" +
      "</header>"
    );
  }

  function learnHref(id) {
    return "#/learn/" + encodeURI(id);
  }

  function home() {
    var cfg = state.config || {};
    var preview = state.preview;
    var cards = "";
    if (preview) {
      preview.modules.forEach(function (m) {
        if (m.id === "start") return;
        var items = preview.lessons.filter(function (l) { return l.module === m.id; });
        if (!items.length) return;
        cards +=
          '<article class="td-card">' +
            "<h3>" + esc(m.label) + "</h3>" +
            '<p class="td-muted">' + items.length + " lessons. Open the track after you enroll.</p>" +
            '<p><a href="' + learnHref(items[0].id) + '">Start this track →</a></p>' +
          "</article>";
      });
    }
    return (
      topbar() +
      '<section class="td-hero">' +
        '<div class="td-kicker">AI engineering path</div>' +
        "<h1>Your one-stop portal from pipelines to production agents</h1>" +
        "<p>Same curriculum as the lab. Different product: a hosted course. After enroll, every lesson opens here. You can screenshot. You cannot download the files or select the text.</p>" +
        '<div class="td-hero-actions">' +
          '<a class="td-btn td-btn-blue" href="#/enroll">Start learning' +
            (cfg.priceLabel ? " · " + esc(cfg.priceLabel) : "") +
          "</a>" +
          '<a class="td-btn td-btn-orange" href="#/catalog">Browse the path</a>' +
        "</div>" +
        '<div class="td-stats">' +
          "<div><strong>" + esc(cfg.lessonCount || "—") + "</strong>lessons</div>" +
          "<div><strong>" + esc(cfg.moduleCount || "—") + "</strong>tracks</div>" +
          "<div><strong>1</strong>browser</div>" +
        "</div>" +
      "</section>" +
      '<div class="td-wrap">' +
        '<h2 class="td-section-title">How it works</h2>' +
        '<p class="td-muted td-section-lead">Tutorials Dojo pattern: public catalog, pay once, then a locked reader.</p>' +
        '<div class="td-steps">' +
          '<article class="td-card"><div class="td-step-num">1</div><h3>Scan the path</h3><p class="td-muted">Titles are public so you know what you are buying. Bodies stay on the server.</p></article>' +
          '<article class="td-card"><div class="td-step-num">2</div><h3>Enroll once</h3><p class="td-muted">Pay or use an access key. We watermark every page with your email.</p></article>' +
          '<article class="td-card"><div class="td-step-num">3</div><h3>Learn in the portal</h3><p class="td-muted">Outline, Simple / Medium / Complex pills, previous / next. No zip.</p></article>' +
        "</div>" +
        '<h2 class="td-section-title" style="margin-top:2.2rem">Tracks</h2>' +
        '<p class="td-muted td-section-lead">Foundations through labs and reference. Missing depths are skipped, not stubbed.</p>' +
        '<div class="td-grid">' + cards + "</div>" +
      "</div>" +
      footer()
    );
  }

  var TRACK_ACCENTS = [
    "#1565c0", "#0f9f96", "#f15a24", "#7b3fe4", "#147a42",
    "#c2185b", "#0277bd", "#ef6c00", "#4527a0", "#00838f"
  ];

  function pad2(n) {
    return ("0" + n).slice(-2);
  }

  function catalog() {
    var preview = state.preview;
    if (!preview) return topbar() + '<div class="td-wrap"><p>Loading path…</p></div>' + footer();

    var groups = [];
    preview.modules.forEach(function (m) {
      var items = preview.lessons.filter(function (l) { return l.module === m.id; });
      if (items.length) groups.push({ mod: m, items: items });
    });
    var totalLessons = groups.reduce(function (n, g) { return n + g.items.length; }, 0);
    var priceLabel = (state.config && state.config.priceLabel) || "1 fee";

    var PREVIEW_MAX = 6;
    var cards = "";
    groups.forEach(function (g, i) {
      var accent = TRACK_ACCENTS[i % TRACK_ACCENTS.length];
      var shown = g.items.slice(0, PREVIEW_MAX);
      var rest = g.items.length - shown.length;
      cards +=
        '<article class="td-track" style="--accent:' + accent + '">' +
          '<header class="td-track-head">' +
            '<span class="td-track-num">' + pad2(i + 1) + "</span>" +
            '<div class="td-track-meta">' +
              "<h3>" + esc(g.mod.label) + "</h3>" +
              '<span class="td-track-count">' + g.items.length +
                (g.items.length === 1 ? " lesson" : " lessons") + "</span>" +
            "</div>" +
          "</header>" +
          '<ol class="td-track-list">';
      shown.forEach(function (l) {
        cards += '<li><a href="' + learnHref(l.id) + '">' + esc(l.title) + "</a></li>";
      });
      cards += "</ol>";
      cards +=
        '<a class="td-track-open" href="' + learnHref(g.items[0].id) + '">' +
          (rest > 0 ? "Open track · +" + rest + " more" : "Open this track") + " &rarr;" +
        "</a>" +
        "</article>";
    });

    return (
      topbar() +
      '<section class="td-subhero">' +
        '<div class="td-subhero-in">' +
          '<div class="td-kicker td-kicker-dark">Course path</div>' +
          "<h1>Every lesson in the AI Engineering path</h1>" +
          "<p>Titles are public so you know exactly what you are buying. Lesson bodies unlock after you enroll.</p>" +
          '<div class="td-subhero-stats">' +
            "<div><strong>" + totalLessons + "</strong><span>lessons</span></div>" +
            "<div><strong>" + groups.length + "</strong><span>tracks</span></div>" +
            "<div><strong>" + esc(priceLabel) + "</strong><span>one-time</span></div>" +
          "</div>" +
        "</div>" +
      "</section>" +
      '<div class="td-wrap td-wrap-wide">' +
        '<div class="td-track-grid">' + cards + "</div>" +
      "</div>" +
      footer()
    );
  }

  function enroll() {
    var cfg = state.config || {};
    var stripe = cfg.stripeEnabled;
    return (
      topbar() +
      '<div class="td-wrap td-enroll-wrap">' +
        '<div class="td-enroll-grid">' +
          '<aside class="td-enroll-aside">' +
            '<span class="td-kicker td-kicker-solid">Enroll</span>' +
            "<h1>One fee. The whole path.</h1>" +
            (cfg.priceLabel
              ? '<p class="td-enroll-price"><strong>' + esc(cfg.priceLabel) + "</strong> one-time access</p>"
              : "") +
            '<ul class="td-perks">' +
              "<li>" + esc(cfg.lessonCount || "All") + " lessons across " +
                esc(cfg.moduleCount || "every") + " tracks</li>" +
              "<li>In-browser reader with outline, pills and progress</li>" +
              "<li>Simple / Medium / Complex depth on every concept</li>" +
              "<li>Your email watermarked on each lesson</li>" +
              "<li>Screenshots allowed &mdash; no zip, no PDF dump</li>" +
            "</ul>" +
          "</aside>" +
          '<article class="td-card td-enroll td-gate">' +
            "<h2>Enroll once. Open the portal.</h2>" +
            '<p class="td-muted">Your email is the watermark on every lesson.</p>' +
            (state.error ? '<p class="td-error">' + esc(state.error) + "</p>" : "") +
            (stripe
              ? '<form data-form="checkout">' +
                  '<label for="pay-email">Email</label>' +
                  '<input id="pay-email" name="email" type="email" required autocomplete="email" placeholder="you@company.com">' +
                  '<p><button class="td-btn td-btn-blue td-btn-block" type="submit">Pay and open the portal</button></p>' +
                "</form>"
              : '<p class="td-muted">Card checkout turns on when Stripe keys are on the server. Use an access key until then.</p>') +
            '<div class="td-split">' +
              "<form data-form=\"unlock\">" +
                '<label for="key-email">Email for watermark</label>' +
                '<input id="key-email" name="email" type="email" required autocomplete="email" placeholder="you@company.com">' +
                '<label for="key">Access key</label>' +
                '<input id="key" name="key" type="password" required autocomplete="off" placeholder="Paste the key">' +
                '<p><button class="td-btn td-btn-orange td-btn-block" type="submit">Unlock with key</button></p>' +
              "</form>" +
            "</div>" +
          "</article>" +
        "</div>" +
      "</div>" +
      footer()
    );
  }

  function lessonMeta(id) {
    var cat = state.catalog;
    if (!cat) return null;
    for (var i = 0; i < cat.lessons.length; i++) {
      if (cat.lessons[i].id === id) return cat.lessons[i];
    }
    return null;
  }

  function neighbor(id, dir) {
    var cat = state.catalog;
    if (!cat) return null;
    for (var i = 0; i < cat.lessons.length; i++) {
      if (cat.lessons[i].id === id) return cat.lessons[i + dir] || null;
    }
    return null;
  }

  function pillsFor(id) {
    var cat = state.catalog;
    var meta = lessonMeta(id);
    if (!cat || !meta || !meta.folder) return "";
    var pages = cat.pagesByFolder[meta.folder];
    if (!pages || pages.length < 2) return "";
    var file = id.split("/").pop();
    var html = '<nav class="td-pills" aria-label="Same topic">';
    pages.forEach(function (p) {
      var stem = String(p.file || "").replace(/\.html$/i, "");
      var on = stem === file ? " is-current" : "";
      html += '<a class="' + on + '" href="' + learnHref(meta.folder + "/" + stem) + '">' + esc(p.label) + "</a>";
    });
    return html + "</nav>";
  }

  function matchFilter(text) {
    if (!state.filter) return true;
    return String(text).toLowerCase().indexOf(state.filter.toLowerCase()) >= 0;
  }

  function sidebar(currentId) {
    var cat = state.catalog;
    var cur = lessonMeta(currentId);
    var html =
      '<aside class="td-side">' +
        '<input class="td-side-search" data-filter="1" type="search" placeholder="Filter outline" value="' + esc(state.filter) + '">' +
        "<h2>Course outline</h2>";
    cat.modules.forEach(function (m) {
      var items = [];
      var seenFolder = {};
      cat.lessons.forEach(function (l) {
        if (l.module !== m.id) return;
        var key = l.folder || l.id;
        if (seenFolder[key]) return;
        seenFolder[key] = true;
        if (!matchFilter(l.section || l.title) && !matchFilter(m.label)) return;
        items.push(l);
      });
      if (!items.length) return;
      var open = (cur && cur.module === m.id) || state.filter ? " open" : "";
      html += "<details" + open + "><summary>" + esc(m.label) + "</summary><ol>";
      items.forEach(function (l) {
        var on = (cur && ((l.folder && l.folder === cur.folder) || l.id === currentId)) ? " is-current" : "";
        html += '<li><a class="' + on + '" href="' + learnHref(l.id) + '">' + esc(l.section || l.title) + "</a></li>";
      });
      html += "</ol></details>";
    });
    return html + "</aside>";
  }

  function skeleton() {
    return '<div class="td-skel"></div><div class="td-skel"></div><div class="td-skel" style="width:70%"></div>';
  }

  function watermarkUrl(text) {
    var svg =
      '<svg xmlns="http://www.w3.org/2000/svg" width="340" height="180">' +
      '<text x="16" y="96" fill="#0c2340" font-size="15" font-family="Segoe UI, sans-serif" transform="rotate(-24 16 96)">' +
      esc(text) + " · licensed</text></svg>";
    return "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(svg);
  }

  function reader(id) {
    if (!state.session || !state.session.ok) {
      if (id) saveNext(id);
      return enroll();
    }
    if (!state.catalog) {
      return topbar() + '<div class="td-wrap"><p>Opening portal…</p></div>';
    }
    var lesson = state.lesson;
    var total = state.catalog.lessons.length;
    var done = seen().length;
    var pct = total ? Math.round((done / total) * 100) : 0;
    var prev = neighbor(id, -1);
    var next = neighbor(id, 1);
    var meta = lessonMeta(id);
    var modLabel = "";
    if (meta) {
      state.catalog.modules.forEach(function (m) {
        if (m.id === meta.module) modLabel = m.label;
      });
    }
    var body = lesson && lesson.id === id ? lesson.html : skeleton();
    var wm = (lesson && lesson.watermark) || (state.session && state.session.email) || "";
    return (
      topbar() +
      '<div class="td-print-block">Printing and Save-as are turned off. Use a screenshot if you need a still.</div>' +
      (wm ? '<div class="td-watermark" style="background-image:url(\'' + watermarkUrl(wm) + '\')"></div>' : "") +
      '<div class="td-shell">' +
        sidebar(id) +
        '<article class="td-lesson">' +
          '<div class="td-crumb">Portal / ' + esc(modLabel) + (meta ? " / " + esc(meta.title) : "") + "</div>" +
          '<div class="td-progress-row"><div class="td-progress"><span style="width:' + pct + '%"></span></div>' +
          '<div class="td-progress-lbl">' + done + " / " + total + "</div></div>" +
          pillsFor(id) +
          (state.error ? '<p class="td-error">' + esc(state.error) + "</p>" : "") +
          '<div class="td-lesson-body">' + body + "</div>" +
          '<nav class="td-pager">' +
            (prev ? '<a href="' + learnHref(prev.id) + '"><span>Previous</span><strong>' + esc(prev.title) + "</strong></a>" : "<span></span>") +
            (next ? '<a class="td-pager-next" href="' + learnHref(next.id) + '"><span>Next</span><strong>' + esc(next.title) + "</strong></a>" : "<span></span>") +
          "</nav>" +
        "</article>" +
      "</div>"
    );
  }

  var mermaidScript = null;
  function loadMermaid() {
    return new Promise(function (resolve, reject) {
      function ready(m) {
        try {
          m.initialize({
            startOnLoad: false,
            theme: currentTheme() === "dark" ? "dark" : "default",
            securityLevel: "strict",
            fontFamily: "Plus Jakarta Sans, Segoe UI, system-ui, sans-serif"
          });
        } catch (e) { /* ignore */ }
        resolve(m);
      }
      if (window.mermaid) return ready(window.mermaid);
      if (!mermaidScript) {
        mermaidScript = new Promise(function (res, rej) {
          var s = document.createElement("script");
          s.src = "https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.min.js";
          s.onload = function () { res(window.mermaid); };
          s.onerror = function () { rej(new Error("mermaid CDN failed")); };
          document.head.appendChild(s);
        });
      }
      mermaidScript.then(ready, reject);
    });
  }

  function renderMermaid() {
    var nodes = document.querySelectorAll(".td-lesson-body pre.mermaid:not([data-processed])");
    if (!nodes.length) return;
    nodes.forEach(function (el) {
      if (!el.getAttribute("data-src")) el.setAttribute("data-src", el.textContent);
      else el.textContent = el.getAttribute("data-src");
      el.removeAttribute("data-processed");
    });
    loadMermaid().then(function (mermaid) {
      try {
        mermaid.run({
          nodes: document.querySelectorAll(".td-lesson-body pre.mermaid"),
          suppressErrors: true
        });
      } catch (e) { /* diagrams stay as source text */ }
    }).catch(function () { /* CDN blocked: leave source text */ });
  }

  function render() {
    var r = route();
    var root = document.getElementById("app");
    var lock = r.name === "learn" && state.session && state.session.ok;
    document.body.classList.toggle("td-lock", Boolean(lock));
    if (r.name === "catalog") root.innerHTML = catalog();
    else if (r.name === "enroll") root.innerHTML = enroll();
    else if (r.name === "learn") root.innerHTML = reader(r.id);
    else root.innerHTML = home();
    bind();
    if (r.name === "learn") renderMermaid();
  }

  function afterUnlock(email) {
    state.session = { ok: true, email: email };
    var next = takeNext();
    go(next ? "#/learn/" + next : "#/learn");
    bootLearn();
  }

  function bind() {
    document.querySelectorAll("[data-act=theme]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        applyTheme(currentTheme() === "dark" ? "light" : "dark");
        render();
      });
    });
    document.querySelectorAll("[data-act=logout]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        api("/api/logout", { method: "POST" }).then(function () {
          state.session = { ok: false };
          state.catalog = null;
          state.lesson = null;
          go("#/");
          render();
        });
      });
    });
    var filter = document.querySelector("[data-filter]");
    if (filter) {
      filter.addEventListener("input", function () {
        state.filter = filter.value;
        try { sessionStorage.setItem(FILTER_KEY, state.filter); } catch (e) { /* ignore */ }
        var r = route();
        if (r.name === "learn") {
          var side = document.querySelector(".td-side");
          if (side) side.outerHTML = sidebar(r.id);
          bind();
          var box = document.querySelector("[data-filter]");
          if (box) {
            box.focus();
            var val = box.value;
            box.setSelectionRange(val.length, val.length);
          }
        }
      });
    }
    var unlock = document.querySelector("[data-form=unlock]");
    if (unlock) {
      unlock.addEventListener("submit", function (e) {
        e.preventDefault();
        state.error = "";
        var fd = new FormData(unlock);
        api("/api/unlock", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: fd.get("email"), key: fd.get("key") })
        }).then(function (body) {
          afterUnlock(body.email);
        }).catch(function (err) {
          state.error = err.message;
          render();
        });
      });
    }
    var pay = document.querySelector("[data-form=checkout]");
    if (pay) {
      pay.addEventListener("submit", function (e) {
        e.preventDefault();
        state.error = "";
        var fd = new FormData(pay);
        api("/api/checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: fd.get("email") })
        }).then(function (body) {
          if (body.url) location.href = body.url;
        }).catch(function (err) {
          state.error = err.message;
          render();
        });
      });
    }
  }

  function bootLearn() {
    var r = route();
    var id = r.name === "learn" ? r.id : "";
    state.loading = true;
    render();
    var needCatalog = state.catalog ? Promise.resolve(state.catalog) : api("/api/catalog").then(function (c) {
      state.catalog = c;
      return c;
    });
    needCatalog.then(function (cat) {
      if (!id || !lessonMeta(id)) {
        id = (cat.lessons[0] && cat.lessons[0].id) || "index";
        history.replaceState(null, "", "#/learn/" + id);
      }
      return api("/api/lesson?id=" + encodeURIComponent(id));
    }).then(function (lesson) {
      state.lesson = lesson;
      state.loading = false;
      state.error = "";
      markSeen(lesson.id);
      render();
    }).catch(function (err) {
      state.loading = false;
      if (String(err.message).indexOf("Sign in") >= 0) {
        state.session = { ok: false };
        go("#/enroll");
      } else {
        state.error = err.message;
      }
      render();
    });
  }

  function boot() {
    initTheme();
    try { state.filter = sessionStorage.getItem(FILTER_KEY) || ""; } catch (e) { state.filter = ""; }
    Promise.all([
      api("/api/config"),
      api("/api/session"),
      api("/api/preview")
    ]).then(function (rows) {
      state.config = rows[0];
      state.session = rows[1];
      state.preview = rows[2];
      document.title = state.config.title || "AI Engineering Dojo";
      var r = route();
      if (r.name === "learn" && state.session.ok) bootLearn();
      else render();
    }).catch(function (err) {
      document.getElementById("app").innerHTML =
        '<div class="td-wrap"><p class="td-error">' + esc(err.message) + "</p></div>";
    });
  }

  window.addEventListener("hashchange", function () {
    var r = route();
    if (r.name === "learn" && state.session && state.session.ok) bootLearn();
    else render();
  });

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
