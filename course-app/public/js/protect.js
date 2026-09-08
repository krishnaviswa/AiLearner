/* Friction only. A paid session can still screenshot or use DevTools. */
(function () {
  function inGate(el) {
    return el && el.closest && el.closest(".td-gate, input, textarea");
  }

  document.addEventListener("contextmenu", function (e) {
    if (document.body.classList.contains("td-lock") && !inGate(e.target)) {
      e.preventDefault();
    }
  });

  document.addEventListener("copy", function (e) {
    if (document.body.classList.contains("td-lock") && !inGate(e.target)) {
      e.preventDefault();
    }
  });

  document.addEventListener("cut", function (e) {
    if (document.body.classList.contains("td-lock") && !inGate(e.target)) {
      e.preventDefault();
    }
  });

  document.addEventListener("dragstart", function (e) {
    if (document.body.classList.contains("td-lock") && !inGate(e.target)) {
      e.preventDefault();
    }
  });

  document.addEventListener("keydown", function (e) {
    if (!document.body.classList.contains("td-lock") || inGate(e.target)) return;
    var k = (e.key || "").toLowerCase();
    var combo = e.ctrlKey || e.metaKey;
    if (combo && ["c", "x", "a", "s", "p", "u"].indexOf(k) >= 0) {
      e.preventDefault();
    }
    if (e.key === "F12") e.preventDefault();
    if (combo && e.shiftKey && (k === "i" || k === "j" || k === "c")) e.preventDefault();
  });
})();
