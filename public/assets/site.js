// Shared behaviour for every line page.
// Loaded by each page in public/lines/. Everything here is optional-by-design:
// a page without the markup a feature needs simply doesn't get that feature,
// so this file is safe to include on any line page from the start.

// Evidence filter on the generation spine.
// Reads data-conf="doc|part|tree" off each .gen and hides the rest.
// "Partly sourced" deliberately appears under BOTH "Documented" and
// "Needs proof" — it is genuinely both.
(function () {
  var spine = document.getElementById("spine");
  var buttons = Array.prototype.slice.call(document.querySelectorAll(".seg button"));
  if (!spine || !buttons.length) return;

  function apply(mode) {
    var gens = spine.querySelectorAll(".gen");
    for (var i = 0; i < gens.length; i++) {
      var c = gens[i].getAttribute("data-conf");
      var show =
        mode === "all" ||
        (mode === "doc" && (c === "doc" || c === "part")) ||
        (mode === "tree" && (c === "tree" || c === "part"));
      gens[i].classList.toggle("hushed", !show);
    }
    buttons.forEach(function (b) {
      b.setAttribute("aria-pressed", b.getAttribute("data-f") === mode ? "true" : "false");
    });
  }

  buttons.forEach(function (b) {
    b.addEventListener("click", function () {
      apply(b.getAttribute("data-f"));
    });
  });
})();

// Section nav: mark the section currently being read.
// The nav links already carry a transparent bottom border for this; without
// it the underline was dead styling.
//
// Deliberately a scroll handler rather than an IntersectionObserver: the
// "current" section is the last one whose top has passed under the sticky
// nav, which is a position question, not a visibility one. Reading it
// directly is simpler than deriving it from intersection events, and it
// gives the right answer for the final section, which is often too short to
// ever fill an observer's band.
(function () {
  var nav = document.querySelector(".nav");
  if (!nav) return;

  var links = {};
  var ids = [];
  Array.prototype.forEach.call(nav.querySelectorAll('a[href^="#"]'), function (a) {
    var id = a.getAttribute("href").slice(1);
    if (document.getElementById(id)) {
      links[id] = a;
      ids.push(id);
    }
  });
  if (!ids.length) return;

  var current = null;

  function update() {
    // The line just under the sticky nav. Whatever section owns this line is
    // what the reader is looking at.
    var line = nav.getBoundingClientRect().bottom + 1;
    var found = null;

    for (var i = 0; i < ids.length; i++) {
      if (document.getElementById(ids[i]).getBoundingClientRect().top <= line) {
        found = ids[i];
      }
    }
    // Past the bottom of the page, the last section wins even if it never
    // reached the line.
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 2) {
      found = ids[ids.length - 1];
    }
    if (found === current) return;

    if (current && links[current]) {
      links[current].style.borderBottomColor = "";
      links[current].style.color = "";
      links[current].removeAttribute("aria-current");
    }
    current = found;
    if (current) {
      links[current].style.borderBottomColor = "currentColor";
      links[current].style.color = "var(--ink)";
      links[current].setAttribute("aria-current", "true");
    }
  }

  var queued = false;
  function onScroll() {
    if (queued) return;
    queued = true;
    requestAnimationFrame(function () {
      queued = false;
      update();
    });
  }

  addEventListener("scroll", onScroll, { passive: true });
  addEventListener("resize", onScroll);
  update();
})();
