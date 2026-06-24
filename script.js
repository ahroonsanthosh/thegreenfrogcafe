/* ============================================================
   The Green Frog Café — interactions
   ============================================================ */
(function () {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Sticky nav state ---------- */
  const nav = document.getElementById("nav");
  const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 40);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Mobile menu ---------- */
  const toggle = document.getElementById("navToggle");
  const links = document.getElementById("navLinks");
  const closeMenu = () => {
    links.classList.remove("is-open");
    toggle.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open menu");
  };
  toggle.addEventListener("click", () => {
    const open = links.classList.toggle("is-open");
    toggle.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  });
  links.querySelectorAll("a").forEach((a) => a.addEventListener("click", closeMenu));

  /* ---------- Scroll reveal ---------- */
  const reveals = document.querySelectorAll(".reveal");
  if (reduceMotion || !("IntersectionObserver" in window)) {
    reveals.forEach((el) => el.classList.add("is-in"));
  } else {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            // gentle stagger for grouped elements
            setTimeout(() => entry.target.classList.add("is-in"), i * 70);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    reveals.forEach((el) => io.observe(el));
  }

  /* ---------- Hero parallax ---------- */
  const heroImg = document.querySelector("[data-parallax]");
  if (heroImg && !reduceMotion) {
    let ticking = false;
    window.addEventListener(
      "scroll",
      () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
          const y = window.scrollY;
          if (y < window.innerHeight) {
            heroImg.style.transform = "translate3d(0," + (y * 0.18) + "px,0)";
          }
          ticking = false;
        });
      },
      { passive: true }
    );
  }

  /* ---------- Menu tabs ---------- */
  const tabs = document.querySelectorAll(".menu__tab");
  const panels = document.querySelectorAll(".menu__panel");
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const target = tab.dataset.tab;
      tabs.forEach((t) => {
        const active = t === tab;
        t.classList.toggle("is-active", active);
        t.setAttribute("aria-selected", String(active));
      });
      panels.forEach((p) => p.classList.toggle("is-active", p.dataset.panel === target));
    });
  });

  /* ---------- Gallery lightbox ---------- */
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  const lightboxClose = document.getElementById("lightboxClose");
  const openLightbox = (src, alt) => {
    lightboxImg.src = src;
    lightboxImg.alt = alt || "";
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  };
  const hideLightbox = () => {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  };
  document.querySelectorAll(".gallery__item img").forEach((img) => {
    img.addEventListener("click", () => openLightbox(img.currentSrc || img.src, img.alt));
  });
  lightboxClose.addEventListener("click", hideLightbox);
  lightbox.addEventListener("click", (e) => { if (e.target === lightbox) hideLightbox(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") hideLightbox(); });

  /* ---------- Highlight today's opening hours ---------- */
  const today = new Date().getDay(); // 0 = Sunday
  const todayRow = document.querySelector(`.hours tr[data-day="${today}"]`);
  if (todayRow) todayRow.classList.add("is-today");

  /* ---------- Reservation form ---------- */
  const form = document.getElementById("reserveForm");
  const status = document.getElementById("formStatus");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

      if (!name || !emailOk) {
        status.textContent = "Please add your name and a valid email.";
        status.className = "form__status is-err";
        return;
      }

      /* NOTE: This is a static site, so the form does not yet deliver email.
         To make it live, connect an endpoint (e.g. Formspree / Netlify Forms)
         by setting form.action + method="POST", or wire to your booking system.
         For now we confirm to the visitor and offer a phone fallback. */
      status.textContent = "Thanks " + name + "! We'll be in touch shortly. (Or call us on 083 383 9098.)";
      status.className = "form__status is-ok";
      form.reset();
    });
  }

  /* ---------- Footer year ---------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
