/* Apply theme before first paint. Load this in <head> before lab.css.
   Storage key: lab-theme = "dark" | "light" */
(function () {
  var KEY = "lab-theme";
  function preferred() {
    try {
      if (window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches) {
        return "light";
      }
    } catch (e) { /* ignore */ }
    return "dark";
  }
  function read() {
    try {
      var t = localStorage.getItem(KEY);
      if (t === "light" || t === "dark") return t;
    } catch (e) { /* ignore */ }
    return preferred();
  }
  function apply(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.style.colorScheme = theme;
  }
  apply(read());
  window.LabTheme = {
    key: KEY,
    get: read,
    set: function (theme) {
      if (theme !== "light" && theme !== "dark") return;
      try { localStorage.setItem(KEY, theme); } catch (e) { /* ignore */ }
      apply(theme);
      if (window.LabMermaid && typeof window.LabMermaid.rerender === "function") {
        window.LabMermaid.rerender();
      }
    },
    toggle: function () {
      var next = read() === "dark" ? "light" : "dark";
      this.set(next);
      return next;
    }
  };
})();
