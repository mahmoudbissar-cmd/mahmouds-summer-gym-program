/* ===========================================================
   script.js — renders the program from PROGRAM (data.js),
   handles theming, scroll-spy nav, reveal animations,
   the install hint, and service-worker registration.
   =========================================================== */

(function () {
  "use strict";

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const el = (tag, cls, html) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  };

  /* ---------- 1. Hero + tagline ---------- */
  $("#kicker").textContent = PROGRAM.meta.subtitle;
  $("#tagline").textContent = PROGRAM.meta.tagline;

  /* ---------- 2. Sticky nav chips ---------- */
  const navrow = $("#navrow");
  PROGRAM.days.forEach((d) => {
    const a = el("a", "chip", `${d.dow.slice(0, 3)} · ${d.name}`);
    a.href = `#${d.id}`;
    navrow.appendChild(a);
  });
  const rulesChip = el("a", "chip", "Rules");
  rulesChip.href = "#rules";
  navrow.appendChild(rulesChip);

  /* ---------- 3. Day sections ---------- */
  const app = $("#app");

  PROGRAM.days.forEach((d) => {
    const sec = el("section", "day reveal");
    sec.id = d.id;

    const head = el("div", "dayhead");
    head.appendChild(el("span", "daynum", d.dow));
    head.appendChild(el("span", "dayname", d.name));
    sec.appendChild(head);

    sec.appendChild(el("p", "focus", d.focus));

    const card = el("div", "card");
    d.exercises.forEach((ex) => {
      const row = el("div", "ex" + (ex.superset ? " ss" : ""));

      let tag = "";
      if (ex.superset === "start") tag = '<span class="tag">SUPERSET</span>';
      if (ex.superset === "end") tag = '<span class="tag">↑ WITH ABOVE</span>';

      row.appendChild(el("span", "exname", ex.name + tag));
      row.appendChild(el("span", "scheme", `${ex.scheme}<small>${ex.rest}</small>`));
      row.appendChild(el("span", "exnote", ex.note));
      card.appendChild(row);
    });
    sec.appendChild(card);
    app.appendChild(sec);
  });

  /* ---------- 4. Weekly schedule ---------- */
  const sched = el("section", "sched reveal");
  sched.appendChild(el("h2", null, "The Week"));
  const week = el("div", "week");
  PROGRAM.schedule.forEach((s) => {
    const w = el("div", "wday" + (s.rest ? " rest" : ""));
    w.appendChild(el("span", "d", s.day));
    w.appendChild(el("span", "s", s.session));
    week.appendChild(w);
  });
  sched.appendChild(week);
  app.appendChild(sched);

  /* ---------- 5. Rules ---------- */
  const rules = el("section", "rules reveal");
  rules.id = "rules";
  rules.appendChild(el("h2", null, "Progression Rules"));
  PROGRAM.rules.forEach((r) => {
    const row = el("div", "rule");
    row.appendChild(el("span", "n", r.n));
    row.appendChild(el("p", null, `<b>${r.title}.</b> ${r.body}`));
    rules.appendChild(row);
  });
  app.appendChild(rules);

  app.appendChild(el("footer", null, PROGRAM.meta.footer));

  /* ---------- 6. Theme toggle ----------
     The initial theme is applied by an inline script in <head> (before first
     paint, to avoid a flash). Here we only handle the toggle button. */
  const root = document.documentElement;
  const themeToggle = $("#themeToggle");
  const syncToggle = () => {
    const isDark = root.getAttribute("data-theme") === "dark";
    themeToggle.setAttribute("aria-pressed", String(isDark));
    themeToggle.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
  };
  syncToggle();
  themeToggle.addEventListener("click", () => {
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try { localStorage.setItem("vtaper-theme", next); } catch (e) {}
    syncToggle();
  });

  /* ---------- 7. Scroll-spy: highlight active chip ---------- */
  const chips = Array.from(navrow.querySelectorAll(".chip"));
  const byId = (id) => chips.find((c) => c.getAttribute("href") === `#${id}`);

  // Scroll the nav strip horizontally to centre a chip, WITHOUT using
  // scrollIntoView — which on iOS Safari also scrolls the page vertically.
  const centerChip = (chip) => {
    const target = chip.offsetLeft - (navrow.clientWidth - chip.clientWidth) / 2;
    navrow.scrollTo({ left: Math.max(0, target), behavior: "smooth" });
  };

  if ("IntersectionObserver" in window) {
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            chips.forEach((c) => {
              c.classList.remove("active");
              c.removeAttribute("aria-current");
            });
            const active = byId(e.target.id);
            if (active) {
              active.classList.add("active");
              active.setAttribute("aria-current", "true");
              centerChip(active);
            }
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    PROGRAM.days.forEach((d) => spy.observe($("#" + d.id)));
    spy.observe($("#rules"));
  }

  /* ---------- 8. Reveal on scroll ---------- */
  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const revealer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            obs.unobserve(e.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px" }
    );
    reveals.forEach((n) => revealer.observe(n));
  } else {
    // No IntersectionObserver: show everything immediately rather than leave it hidden.
    reveals.forEach((n) => n.classList.add("in"));
  }

  /* ---------- 9. Service worker (offline) ---------- */
  if ("serviceWorker" in navigator) {
    // If the page was already controlled by a worker at load time, a change of
    // controller means a new version activated — reload once to pick it up.
    const hadController = !!navigator.serviceWorker.controller;
    let refreshing = false;
    navigator.serviceWorker.addEventListener("controllerchange", () => {
      if (hadController && !refreshing) {
        refreshing = true;
        window.location.reload();
      }
    });

    window.addEventListener("load", () => {
      // Relative path so it works under any GitHub Pages sub-path.
      navigator.serviceWorker.register("service-worker.js").catch((err) => {
        console.warn("SW registration failed:", err);
      });
    });
  }
})();
