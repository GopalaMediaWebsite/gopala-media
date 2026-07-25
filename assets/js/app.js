window.addEventListener('pageshow', (event) => {
  if (typeof gsap !== 'undefined') {
    gsap.set("body", { opacity: 1 });
  } else {
    document.body.style.opacity = "1";
  }
});
if (history.scrollRestoration) {
history.scrollRestoration = 'manual';
}
if (!window.location.hash) {
window.scrollTo(0, 0);
}
document.addEventListener("DOMContentLoaded", () => {
  if (typeof gsap !== 'undefined') {
    gsap.set("body", { opacity: 1 });
  }
if (!window.location.hash) {
window.scrollTo(0, 0);
if (window.lenis) {
window.lenis.scrollTo(0, { immediate: true });
}
} else {
setTimeout(() => {
const target = document.querySelector(window.location.hash);
if (target) {
if (window.lenis) {
window.lenis.scrollTo(target, { immediate: true });
} else {
target.scrollIntoView();
}
}
}, 50);
}
document.querySelectorAll("a").forEach(link => {
const href = link.getAttribute("href");
const target = link.getAttribute("target");
if (href && (href.startsWith("/") || href.startsWith("./") || href.endsWith(".html")) && target !== "_blank" && !href.startsWith("mailto:") && !href.startsWith("#")) {
link.addEventListener("click", (e) => {
e.preventDefault();
gsap.to("body", {
opacity: 0,
duration: 0.5,
ease: "power1.inOut",
onComplete: () => {
window.location.href = href;
}
});
});
}
});
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isLowEndDevice = (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4) || (navigator.deviceMemory && navigator.deviceMemory <= 4);
if (!prefersReducedMotion && !isLowEndDevice) {
try {
if (typeof Lenis !== "undefined") {
const lenis = new Lenis({
duration: 1.2,
easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
orientation: "vertical",
gestureOrientation: "vertical",
smoothWheel: true,
wheelMultiplier: 1,
smoothTouch: false, // Disable smoothTouch to allow native fast touch on mobile
touchMultiplier: 1,
infinite: false,
});
window.lenis = lenis;

// Bind Lenis scroll to ScrollTrigger updates to prevent async jitter/lag
if (typeof ScrollTrigger !== "undefined") {
lenis.on('scroll', ScrollTrigger.update);
}

function raf(time) {
lenis.raf(time);
requestAnimationFrame(raf);
}
requestAnimationFrame(raf);
}
} catch (e) {
console.error("Lenis Smooth Scroll failed to initialize:", e);
}
}
initLogoWallCycle();
initModalSystem();
initFooterYear();
initBannerClose();
initWorkFilters();
initContactTrail();
initAccordionSystem();
initHeaderColorScroll();
initCardFlip();
initMenuSystem();
initTestimonialsSlider();
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
anchor.addEventListener('click', function (e) {
e.preventDefault();
const targetId = this.getAttribute('href');
if (targetId === '#') return;
const targetEl = document.querySelector(targetId);
if (targetEl) {
if (window.lenis) {
window.lenis.scrollTo(targetEl);
} else {
targetEl.scrollIntoView({ behavior: 'smooth' });
}
}
});
});
});
function initAccordionSystem() {
document.querySelectorAll('.accordion_component').forEach(acc => {
const btn = acc.querySelector('.accordion_toggle_button');
const contentWrap = acc.querySelector('.accordion_content_wrap');
if (!btn || !contentWrap) return;
gsap.set(contentWrap, { height: 0, display: 'none' });
btn.addEventListener('click', (e) => {
e.preventDefault();
const isExpanded = btn.getAttribute('aria-expanded') === 'true';
if (!isExpanded) {
const parent = acc.closest('.accordion_wrap') || acc.parentElement;
parent.querySelectorAll('.accordion_component').forEach(otherAcc => {
const otherBtn = otherAcc.querySelector('.accordion_toggle_button');
const otherContent = otherAcc.querySelector('.accordion_content_wrap');
if (otherBtn && otherContent && otherBtn !== btn && otherBtn.getAttribute('aria-expanded') === 'true') {
otherBtn.setAttribute('aria-expanded', 'false');
gsap.to(otherContent, {
height: 0,
duration: 0.35,
ease: "power2.out",
onComplete: () => {
otherContent.style.display = 'none';
}
});
}
});
}
btn.setAttribute('aria-expanded', !isExpanded);
if (!isExpanded) {
contentWrap.style.display = 'block';
gsap.fromTo(contentWrap,
{ height: 0 },
{ height: 'auto', duration: 0.4, ease: "power2.out" }
);
} else {
gsap.to(contentWrap, {
height: 0,
duration: 0.35,
ease: "power2.out",
onComplete: () => {
contentWrap.style.display = 'none';
}
});
}
});
});
}
function initContactTrail() {
const container = document.querySelector('.trail-list');
if (!container) return;
const items = container.querySelectorAll('.trail-item');
if (!items.length) return;
let currentIndex = 0;
let lastPos = { x: 0, y: 0 };
const threshold = 90;
items.forEach(item => {
gsap.set(item, { opacity: 0, scale: 0.8, xPercent: -50, yPercent: -50, pointerEvents: 'none' });
});
let ticking = false;
window.addEventListener('mousemove', (e) => {
if (!ticking) {
window.requestAnimationFrame(() => {
const distance = Math.hypot(e.clientX - lastPos.x, e.clientY - lastPos.y);
if (distance > threshold) {
const item = items[currentIndex];
const rect = container.getBoundingClientRect();
const x = e.clientX - rect.left;
const y = e.clientY - rect.top;
gsap.killTweensOf(item);
gsap.set(item, {
x: x,
y: y,
scale: 0.8,
opacity: 0,
rotation: Math.random() * 24 - 12
});
gsap.to(item, {
opacity: 1,
scale: 1,
duration: 0.2,
ease: "power1.out"
});
gsap.to(item, {
opacity: 0,
scale: 0.75,
y: y + 60,
duration: 0.9,
delay: 0.25,
ease: "power2.inOut",
onComplete: () => {
gsap.set(item, { opacity: 0 });
}
});
currentIndex = (currentIndex + 1) % items.length;
lastPos = { x: e.clientX, y: e.clientY };
}
ticking = false;
});
ticking = true;
}
}, { passive: true });
}
function initWorkFilters() {
const filterForm = document.querySelector('.work_form');
if (!filterForm) return;
const filters = filterForm.querySelectorAll('.g_filter_wrap');
const items = document.querySelectorAll('.work_cms_item, .journal_cms_item');
const resultsCount = filterForm.querySelector('[fs-list-element="results-count"]');
const emptyState = document.querySelector('.empty-state');
function updateResultsCount() {
const visibleCount = Array.from(items).filter(item => item.style.display !== 'none').length;
if (resultsCount) {
resultsCount.textContent = visibleCount;
}
if (emptyState) {
emptyState.style.display = visibleCount === 0 ? 'block' : 'none';
}
}
filters.forEach(filter => {
filter.addEventListener('click', (e) => {
filters.forEach(f => f.classList.remove('is-active'));
filter.classList.add('is-active');
const radio = filter.querySelector('input[type="radio"]');
if (radio) radio.checked = true;
const service = filter.getAttribute('data-service');
items.forEach(item => {
const itemService = item.getAttribute('data-service');
if (service === 'all' || itemService === service) {
item.style.display = 'block';
} else {
item.style.display = 'none';
}
});
const visibleItems = Array.from(items).filter(item => item.style.display !== 'none');
if (visibleItems.length) {
gsap.fromTo(visibleItems,
{ opacity: 0, y: "1.5rem" },
{ opacity: 1, y: "0rem", duration: 0.5, ease: "power2.out", stagger: 0.05 }
);
}
updateResultsCount();
});
});
updateResultsCount();
}
function initLogoWallCycle() {
const loopDelay = 1.5;
const duration  = 0.9;
document.querySelectorAll('.logo-wall').forEach(root => {
const list   = root.querySelector('[data-logo-wall-list]');
if (!list) return;
const items  = Array.from(list.querySelectorAll('[data-logo-wall-item]'));
if (!items.length) return;
const shuffleFront = root.getAttribute('data-logo-wall-shuffle') !== 'false';
const originalTargets = items
.map(item => item.querySelector('[data-logo-wall-target]'))
.filter(Boolean);
let visibleItems   = [];
let visibleCount   = 0;
let pool           = [];
let pattern        = [];
let patternIndex   = 0;
let tl;
function isVisible(el) {
return window.getComputedStyle(el).display !== 'none';
}
function shuffleArray(arr) {
const a = arr.slice();
for (let i = a.length - 1; i > 0; i--) {
const j = Math.floor(Math.random() * (i + 1));
[a[i], a[j]] = [a[j], a[i]];
}
return a;
}
function setup() {
if (tl) {
tl.kill();
}
visibleItems = items.filter(isVisible);
visibleCount = visibleItems.length;
if (!visibleCount) return;
pattern = shuffleArray(
Array.from({ length: visibleCount }, (_, i) => i)
);
patternIndex = 0;
items.forEach(item => {
item.querySelectorAll('[data-logo-wall-target]').forEach(old => old.remove());
});
pool = originalTargets.map(n => n.cloneNode(true));
let front, rest;
if (shuffleFront) {
const shuffledAll = shuffleArray(pool);
front = shuffledAll.slice(0, visibleCount);
rest  = shuffledAll.slice(visibleCount);
} else {
front = pool.slice(0, visibleCount);
rest  = shuffleArray(pool.slice(visibleCount));
}
pool = front.concat(rest);
for (let i = 0; i < visibleCount; i++) {
const parent =
visibleItems[i].querySelector('[data-logo-wall-target-parent]') ||
visibleItems[i];
parent.appendChild(pool.shift());
}
tl = gsap.timeline({ repeat: -1 });
tl.call(swapNext);
tl.to({}, { duration: loopDelay });
tl.play();
}
function swapNext() {
const nowCount = items.filter(isVisible).length;
if (nowCount !== visibleCount) {
setup();
return;
}
if (!pool.length) return;
const idx = pattern[patternIndex % visibleCount];
patternIndex++;
const container = visibleItems[idx];
const parent =
container.querySelector('[data-logo-wall-target-parent]') ||
container;
const existing = parent.querySelectorAll('[data-logo-wall-target]');
if (existing.length > 1) return;
const current  = parent.querySelector('[data-logo-wall-target]');
const incoming = pool.shift();
const isUp = Math.random() > 0.5;
const startY = isUp ? 50 : -50;
const endY = isUp ? -50 : 50;
gsap.set(incoming, { yPercent: startY, autoAlpha: 0 });
parent.appendChild(incoming);
if (current) {
gsap.to(current, {
yPercent: endY,
autoAlpha: 0,
duration,
ease: "expo.inOut",
onComplete: () => {
current.remove();
pool.push(current);
}
});
}
gsap.to(incoming, {
yPercent: 0,
autoAlpha: 1,
duration,
delay: 0.1,
ease: "expo.inOut"
});
}
setup();
if (typeof ScrollTrigger !== 'undefined') {
ScrollTrigger.create({
trigger: root,
start: 'top bottom',
end: 'bottom top',
onEnter:     () => tl && tl.play(),
onLeave:     () => tl && tl.pause(),
onEnterBack: () => tl && tl.play(),
onLeaveBack: () => tl && tl.pause()
});
}
document.addEventListener('visibilitychange', () => {
if (tl) {
document.hidden ? tl.pause() : tl.play();
}
});
window.addEventListener("resize", () => {
const newVisibleCount = items.filter(isVisible).length;
if (newVisibleCount !== visibleCount) {
setup();
}
});
});
}
function initModalSystem() {
document.querySelectorAll('.modal_dialog').forEach(modal => {
const triggerId = modal.getAttribute('data-modal-target');
const closeElements = modal.querySelectorAll('[data-modal-close], .modal_backdrop');
document.querySelectorAll(`[data-modal-trigger="${triggerId}"]`).forEach(btn => {
btn.addEventListener('click', (e) => {
e.preventDefault();
openModal(modal);
});
});
closeElements.forEach(el => {
el.addEventListener('click', (e) => {
e.preventDefault();
closeModal(modal);
});
});
modal.addEventListener('cancel', (e) => {
e.preventDefault();
closeModal(modal);
});
const form = modal.querySelector('form');
if (form) {
form.addEventListener('submit', (e) => {
e.preventDefault();
const successMessage = modal.querySelector('.success-message');
if (successMessage) {
form.style.display = "none";
successMessage.style.display = "flex";
}
});
}
});
}
function openModal(modal) {
modal.showModal();
const inner = modal.querySelector('.modal_inner');
const backdrop = modal.querySelector('.modal_backdrop');
const successMessage = modal.querySelector('.success-message');
const form = modal.querySelector('form');
if (form) form.style.display = "flex";
if (successMessage) successMessage.style.display = "none";
gsap.fromTo(backdrop, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: "power1.out" });
gsap.fromTo(inner, { opacity: 0, y: "4rem" }, { opacity: 1, y: "0rem", duration: 0.4, ease: "power2.out" });
if (window.lenis) window.lenis.stop();
else document.body.style.overflow = "hidden";
}
function closeModal(modal) {
const inner = modal.querySelector('.modal_inner');
const backdrop = modal.querySelector('.modal_backdrop');
gsap.to(backdrop, { opacity: 0, duration: 0.3, ease: "power1.out" });
gsap.to(inner, {
opacity: 0,
y: "4rem",
duration: 0.3,
ease: "power1.out",
onComplete: () => {
modal.close();
if (window.lenis) window.lenis.start();
else document.body.style.overflow = "";
}
});
}
function initFooterYear() {
document.querySelectorAll("[data-dynamic-year]").forEach(el => {
el.textContent = new Date().getFullYear();
});
}
function initBannerClose() {
document.querySelectorAll(".nav_banner_close_wrap").forEach(btn => {
btn.addEventListener("click", () => {
const banner = btn.closest(".nav_banner_wrap");
if (banner) {
gsap.to(banner, {
height: 0,
opacity: 0,
duration: 0.4,
ease: "power2.out",
onComplete: () => {
banner.style.display = "none";
}
});
document.querySelectorAll(".nav_component").forEach(nav => {
gsap.to(nav, {
top: "0.35rem",
duration: 0.4,
ease: "power2.out"
});
});
}
});
});
}
function initHeaderColorScroll() {
  const header = document.querySelector(".nav_desktop_wrap");
  if (!header) return;

  const updateHeaderContrast = () => {
    if (header.classList.contains('menu-is-open')) return;

    const testX = Math.min(window.innerWidth - 60, window.innerWidth * 0.85);
    const testY = 35;

    const prevHeaderPE = header.style.pointerEvents;
    header.style.pointerEvents = 'none';
    let el = document.elementFromPoint(testX, testY);
    header.style.pointerEvents = prevHeaderPE;

    if (el) {
      if (el.id === 'menu-overlay' || el.closest('#menu-overlay')) {
        const overlay = document.getElementById('menu-overlay');
        if (overlay) {
          const prevPE = overlay.style.pointerEvents;
          overlay.style.pointerEvents = 'none';
          header.style.pointerEvents = 'none';
          el = document.elementFromPoint(testX, testY);
          overlay.style.pointerEvents = prevPE;
          header.style.pointerEvents = prevHeaderPE;
        }
      }
    }

    let isDark = false;
    if (el) {
      const darkSection = el.closest('.hero_main_wrap, .hero_video_overlay, .footer_wrap, footer, .social_ticker_wrap, .is-dark-section, [data-theme="dark"]');
      if (darkSection) {
        isDark = true;
      } else {
        let current = el;
        while (current && current !== document.body && current !== document.documentElement) {
          const style = window.getComputedStyle(current);
          const bg = style.backgroundColor;
          if (bg && bg !== 'transparent' && bg !== 'rgba(0, 0, 0, 0)') {
            const rgb = bg.match(/\d+/g);
            if (rgb && rgb.length >= 3) {
              const r = parseInt(rgb[0], 10);
              const g = parseInt(rgb[1], 10);
              const b = parseInt(rgb[2], 10);
              const brightness = (r * 299 + g * 587 + b * 114) / 1000;
              if (brightness < 135) {
                isDark = true;
              }
              break;
            }
          }
          current = current.parentElement;
        }
      }
    }

    if (isDark) {
      header.classList.add("is-dark-bg");
      header.classList.remove("is-light-bg");
    } else {
      header.classList.add("is-light-bg");
      header.classList.remove("is-dark-bg");
    }
  };

  window.updateHeaderContrast = updateHeaderContrast;

  window.addEventListener("scroll", updateHeaderContrast, { passive: true });
  window.addEventListener("resize", updateHeaderContrast, { passive: true });
  updateHeaderContrast();
  if (window.lenis) {
    window.lenis.on('scroll', updateHeaderContrast);
  }
}
function initCardFlip() {
const cards = document.querySelectorAll('.work_card_wrap');
cards.forEach(card => {
let isFlipped = false;
let isAnimating = false;
card.addEventListener('click', function(e) {
  const btn = e.target.closest('.work_card_back_btn');
  if (btn) return; // let modal handler through
  e.preventDefault();
  e.stopPropagation();
  if (isAnimating) return;
  const inner = this.querySelector('.work_card_inner');
  if (!inner) return;

  isAnimating = true;

  if (!isFlipped) {
    // Close any other flipped cards first
    cards.forEach(otherCard => {
      if (otherCard !== card) {
        const otherInner = otherCard.querySelector('.work_card_inner');
        if (otherInner && otherCard._isFlipped) {
          gsap.to(otherInner, {
            rotateY: 0, y: 0, scale: 1,
            boxShadow: '0 8px 30px rgba(16, 14, 10, 0.08)',
            duration: 0.5, ease: 'power2.inOut'
          });
          otherCard._isFlipped = false;
        }
      }
    });

    // Flip open: lift → rotate → settle
    const tl = gsap.timeline({
      onComplete: () => { isFlipped = true; card._isFlipped = true; isAnimating = false; }
    });
    tl.to(inner, {
      y: -12, scale: 1.03,
      boxShadow: '0 25px 60px rgba(16, 14, 10, 0.18)',
      duration: 0.18, ease: 'power2.out'
    })
    .to(inner, {
      rotateY: 180,
      duration: 0.6, ease: 'power2.inOut'
    }, 0.06)
    .to(inner, {
      y: 0, scale: 1,
      boxShadow: '0 12px 40px rgba(16, 14, 10, 0.12)',
      duration: 0.3, ease: 'power2.out'
    }, 0.55);
  } else {
    // Flip back
    const tl = gsap.timeline({
      onComplete: () => { isFlipped = false; card._isFlipped = false; isAnimating = false; }
    });
    tl.to(inner, {
      y: -12, scale: 1.03,
      boxShadow: '0 25px 60px rgba(16, 14, 10, 0.18)',
      duration: 0.18, ease: 'power2.out'
    })
    .to(inner, {
      rotateY: 0,
      duration: 0.6, ease: 'power2.inOut'
    }, 0.06)
    .to(inner, {
      y: 0, scale: 1,
      boxShadow: '0 8px 30px rgba(16, 14, 10, 0.08)',
      duration: 0.3, ease: 'power2.out'
    }, 0.55);
  }
});
});
// Click outside to flip any open cards back
document.addEventListener('click', (e) => {
if (!e.target.closest('.work_card_wrap')) {
  cards.forEach(card => {
    const inner = card.querySelector('.work_card_inner');
    if (inner && card._isFlipped) {
      gsap.to(inner, {
        rotateY: 0, y: 0, scale: 1,
        boxShadow: '0 8px 30px rgba(16, 14, 10, 0.08)',
        duration: 0.55, ease: 'power2.inOut'
      });
      card._isFlipped = false;
    }
  });
}
});
}
function initMobileMenu() {
const hamburger = document.querySelector(".nav_mobile_hamburger");
const drawer = document.querySelector(".nav_mobile_drawer");
if (hamburger && drawer) {
hamburger.addEventListener("click", (e) => {
e.stopPropagation();
const isOpen = hamburger.classList.toggle("is-open");
drawer.classList.toggle("is-open", isOpen);
document.body.style.overflow = isOpen ? "hidden" : "";
});
drawer.querySelectorAll(".nav_mobile_drawer_link").forEach(link => {
link.addEventListener("click", () => {
hamburger.classList.remove("is-open");
drawer.classList.remove("is-open");
document.body.style.overflow = "";
});
});
}
}
function initTestimonialsSlider() {
const track = document.querySelector('.testimonials_slider_track');
const prevBtn = document.querySelector('.slider_arrow.arrow_prev');
const nextBtn = document.querySelector('.slider_arrow.arrow_next');
const dots = document.querySelectorAll('.testimonials_dots_container .dot');
const slides = document.querySelectorAll('.testimonial_slide');
if (!track || slides.length === 0) return;
const slideCount = slides.length;
const firstClone = slides[0].cloneNode(true);
const lastClone = slides[slideCount - 1].cloneNode(true);
track.appendChild(firstClone);
track.insertBefore(lastClone, slides[0]);
let currentSlide = 1;
let isTransitioning = false;
track.style.transition = 'none';
track.style.transform = `translateX(-100%)`;
track.offsetHeight;
function updateSlider(animate = true) {
if (animate) {
track.style.transition = 'transform 0.22s cubic-bezier(0.25, 1, 0.5, 1)';
isTransitioning = true;
} else {
track.style.transition = 'none';
}
track.style.transform = `translateX(-${currentSlide * 100}%)`;
let dotActiveIndex = currentSlide - 1;
if (currentSlide === 0) {
dotActiveIndex = slideCount - 1;
} else if (currentSlide === slideCount + 1) {
dotActiveIndex = 0;
}
dots.forEach((dot, index) => {
dot.classList.toggle('active', index === dotActiveIndex);
});
}
track.addEventListener('transitionend', () => {
isTransitioning = false;
if (currentSlide === 0) {
currentSlide = slideCount;
updateSlider(false);
} else if (currentSlide === slideCount + 1) {
currentSlide = 1;
updateSlider(false);
}
});
nextBtn?.addEventListener('click', () => {
if (isTransitioning) return;
currentSlide++;
updateSlider();
});
prevBtn?.addEventListener('click', () => {
if (isTransitioning) return;
currentSlide--;
updateSlider();
});
dots.forEach((dot, index) => {
dot.addEventListener('click', () => {
if (isTransitioning) return;
currentSlide = index + 1;
updateSlider();
});
});
let startX = 0;
let isDragging = false;
track.addEventListener('touchstart', (e) => {
if (isTransitioning) return;
startX = e.touches[0].clientX;
isDragging = true;
}, { passive: true });
track.addEventListener('touchend', (e) => {
if (!isDragging || isTransitioning) return;
const diffX = e.changedTouches[0].clientX - startX;
isDragging = false;
if (Math.abs(diffX) > 50) {
if (diffX > 0) {
currentSlide--;
} else {
currentSlide++;
}
updateSlider();
}
}, { passive: true });
}

function initMenuSystem() {
  const menuTrigger = document.getElementById('menu-trigger');
  const menuOverlay = document.getElementById('menu-overlay');
  const burgerTop = document.getElementById('burger-top');
  const burgerBottom = document.getElementById('burger-bottom');
  if (!menuTrigger || !menuOverlay) return;

  const menuText = menuTrigger.querySelector('.menu_text');
  const header = document.querySelector('.nav_desktop_wrap');
  let isMenuOpen = false;

  menuTrigger.addEventListener('click', () => {
    isMenuOpen = !isMenuOpen;
    menuTrigger.classList.toggle('is-active', isMenuOpen);
    if (header) {
      header.classList.toggle('menu-is-open', isMenuOpen);
    }
    
    if (isMenuOpen) {
      menuOverlay.classList.add('active');
      if (burgerTop) burgerTop.style.transform = 'translateY(5px) rotate(-45deg)';
      if (burgerBottom) burgerBottom.style.transform = 'translateY(-5px) rotate(45deg)';
      if (menuText) menuText.textContent = 'Close';
      document.body.style.overflow = 'hidden';
      if (window.lenis) window.lenis.stop();
    } else {
      menuOverlay.classList.remove('active');
      if (burgerTop) burgerTop.style.transform = 'none';
      if (burgerBottom) burgerBottom.style.transform = 'none';
      if (menuText) menuText.textContent = 'Menu';
      document.body.style.overflow = '';
      if (window.lenis) window.lenis.start();
      if (typeof window.updateHeaderContrast === 'function') {
        window.updateHeaderContrast();
        setTimeout(window.updateHeaderContrast, 400);
        setTimeout(window.updateHeaderContrast, 850);
      }
    }
  });

  menuOverlay.querySelectorAll('.menu_nav_link').forEach(link => {
    link.addEventListener('click', () => {
      if (isMenuOpen) menuTrigger.click();
    });
  });
}
