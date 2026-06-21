// Current year in footer
document.getElementById("year").textContent = new Date().getFullYear();

// --- Theme toggle ---
const themeToggle = document.getElementById("themeToggle");
themeToggle.addEventListener("click", () => {
  const next =
    document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);
});

// --- Email obfuscation ---
// Address is split across data attributes and joined at runtime so the
// plaintext "user@domain" never appears in the page source for scrapers.
const emailEl = document.getElementById("email");
if (emailEl) {
  const addr = emailEl.dataset.user + "@" + emailEl.dataset.domain;
  emailEl.textContent = addr;
  emailEl.addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = "mailto:" + addr;
  });
  emailEl.style.cursor = "pointer";
}

// Sticky nav border on scroll
const nav = document.getElementById("nav");
const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 8);
onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

// Mobile menu toggle
const toggle = document.getElementById("navToggle");
const links = document.querySelector(".nav__links");
toggle.addEventListener("click", () => {
  const open = links.classList.toggle("is-open");
  toggle.classList.toggle("is-open", open);
  toggle.setAttribute("aria-expanded", String(open));
});
// Close menu when a link is clicked
links.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    links.classList.remove("is-open");
    toggle.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  })
);

// Scroll-reveal animations
const revealEls = document.querySelectorAll(
  ".hero__title, .hero__lead, .hero__actions, .about__intro, .about__body, .section__head, .project, .contact"
);
revealEls.forEach((el) => el.classList.add("reveal"));

if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  revealEls.forEach((el) => io.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add("is-visible"));
}
