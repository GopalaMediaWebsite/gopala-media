/**
 * Gopala Media - Main Application Script
 * Smooth scrolling, navigation controls, contrast sampling, and component interactions.
 */

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

  // Smooth page transition handling
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

  // Initialize Lenis Smooth Scroll
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
          smoothTouch: false,
          touchMultiplier: 1,
          infinite: false,
        });
        window.lenis = lenis;

        // Bind Lenis scroll to ScrollTrigger and GSAP ticker for 120Hz display sync
        if (typeof ScrollTrigger !== "undefined" && typeof gsap !== "undefined") {
          lenis.on('scroll', ScrollTrigger.update);
          gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
          });
          gsap.ticker.lagSmoothing(0);
        } else {
          function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
          }
          requestAnimationFrame(raf);
        }
      }
    } catch (e) {
      console.error("Lenis Smooth Scroll failed to initialize:", e);
    }
  }

  // Initialize components
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

  // Smooth anchor scrolling
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

/* ==========================================================================
   COMPONENT INITIALIZATION FUNCTIONS
   ========================================================================== */

function initAccordionSystem() {
  document.querySelectorAll('.accordion_component').forEach(acc => {
    const btn = acc.querySelector('.accordion_toggle_button');
    const contentWrap = acc.querySelector('.accordion_content_wrap');
    if (!btn || !contentWrap) return;

    btn.addEventListener('click', () => {
      const isExpanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', !isExpanded);
      if (isExpanded) {
        gsap.to(contentWrap, {
          height: 0,
          duration: 0.35,
          ease: "power2.inOut",
          onComplete: () => {
            contentWrap.style.display = "none";
          }
        });
      } else {
        contentWrap.style.display = "block";
        gsap.fromTo(contentWrap, { height: 0 }, { height: "auto", duration: 0.35, ease: "power2.inOut" });
      }
    });
  });
}

function initHeaderColorScroll() {
  const header = document.querySelector('.nav_desktop_wrap');
  if (!header) return;

  function getDarkSections() {
    return Array.from(document.querySelectorAll('.hero_main_wrap, .hero_video_overlay, .footer_wrap, footer, .social_ticker_wrap, .is-dark-section, [data-theme="dark"]'));
  }

  function updateHeaderColor() {
    if (document.body.classList.contains('menu-is-open')) {
      header.classList.add('is-dark-bg');
      return;
    }
    const isContactPage = document.body.classList.contains('contact-page');
    const darkSections = getDarkSections();
    const testX = window.innerWidth / 2;
    const testY = 40;

    let isOverDark = false;
    
    // Temporarily bypass fixed header pointer-events to sample section elements beneath
    const origPointer = header.style.pointerEvents;
    header.style.pointerEvents = 'none';
    const sampledEl = document.elementFromPoint(testX, testY);
    header.style.pointerEvents = origPointer;

    if (sampledEl) {
      darkSections.forEach(sec => {
        if (sec.contains(sampledEl) || sec === sampledEl) {
          isOverDark = true;
        }
      });
    }

    if (!isOverDark) {
      const scrolledPastHero = window.scrollY > (window.innerHeight * 0.7);
      if (scrolledPastHero) {
        darkSections.forEach(sec => {
          const rect = sec.getBoundingClientRect();
          if (rect.top <= testY && rect.bottom >= testY) {
            isOverDark = true;
          }
        });
      }
    }

    if (isOverDark) {
      header.classList.add('is-dark-bg');
    } else {
      header.classList.remove('is-dark-bg');
    }
  }

  window.addEventListener('scroll', updateHeaderColor, { passive: true });
  updateHeaderColor();
}

function initCardFlip() {
  document.querySelectorAll('.work_card_wrap').forEach(wrap => {
    const visual = wrap.querySelector('.work_card_visual');
    if (!visual) return;

    wrap.addEventListener('click', (e) => {
      visual.classList.toggle('is-flipped');
    });
  });
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

  const toggleMenu = (openState) => {
    isMenuOpen = typeof openState === 'boolean' ? openState : !isMenuOpen;
    menuTrigger.classList.toggle('active', isMenuOpen);
    menuTrigger.classList.toggle('is-active', isMenuOpen);
    document.body.classList.toggle('menu-is-open', isMenuOpen);
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
    }
  };

  menuTrigger.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu();
  });

  const closeBtn = document.getElementById('menu-overlay-close');
  if (closeBtn) {
    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMenu(false);
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menuOverlay.classList.contains('active')) {
      toggleMenu(false);
    }
  });

  menuOverlay.querySelectorAll('.menu_nav_link').forEach(link => {
    link.addEventListener('click', () => {
      toggleMenu(false);
    });
  });
}

function initLogoWallCycle() {
  const list = document.querySelector('.logo-wall__list');
  if (!list) return;

  const items = Array.from(list.querySelectorAll('.logo-wall__item'));
  if (items.length <= 5) return;

  let currentIndex = 0;
  const visibleCount = 5;

  setInterval(() => {
    items.forEach((item, idx) => {
      if (idx >= currentIndex && idx < currentIndex + visibleCount) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
    currentIndex = (currentIndex + 1) % (items.length - visibleCount + 1);
  }, 3000);
}

function initModalSystem() {
  const modal = document.querySelector('.modal_dialog');
  if (!modal) return;

  document.querySelectorAll('[data-modal-open]').forEach(btn => {
    btn.addEventListener('click', () => modal.showModal());
  });

  document.querySelectorAll('[data-modal-close]').forEach(btn => {
    btn.addEventListener('click', () => modal.close());
  });
}

function initFooterYear() {
  const yearEl = document.getElementById('copyright-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

function initBannerClose() {
  const banner = document.querySelector('.nav_banner_wrap');
  const closeBtn = document.querySelector('.nav_banner_close_wrap');
  if (!banner || !closeBtn) return;

  closeBtn.addEventListener('click', () => {
    banner.style.display = 'none';
    document.documentElement.style.setProperty('--nav--banner-height', '0rem');
  });
}

function initWorkFilters() {
  const filters = document.querySelectorAll('.g_filter_wrap');
  const items = document.querySelectorAll('.work_cms_item');
  if (!filters.length || !items.length) return;

  filters.forEach(filter => {
    filter.addEventListener('click', () => {
      filters.forEach(f => f.classList.remove('is-active'));
      filter.classList.add('is-active');

      const cat = filter.getAttribute('data-category');
      items.forEach(item => {
        const itemCat = item.getAttribute('data-category');
        if (cat === 'all' || itemCat === cat) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

function initContactTrail() {
  const trailWrap = document.querySelector('.trail-wrap');
  const items = document.querySelectorAll('.trail-item');
  if (!trailWrap || !items.length) return;

  // Disable interactive trail on touch devices or small screens
  if (window.innerWidth <= 768 || 'ontouchstart' in window) return;

  let currentIndex = 0;
  let lastX = 0;
  let lastY = 0;
  const threshold = 65; // Distance in px before spawning next trail frame

  window.addEventListener('mousemove', (e) => {
    const dist = Math.hypot(e.clientX - lastX, e.clientY - lastY);
    if (dist > threshold) {
      lastX = e.clientX;
      lastY = e.clientY;

      const item = items[currentIndex];
      currentIndex = (currentIndex + 1) % items.length;

      const rect = trailWrap.getBoundingClientRect();
      const x = e.clientX - rect.left - 110;
      const y = e.clientY - rect.top - 140;

      if (typeof gsap !== 'undefined') {
        gsap.killTweensOf(item);
        gsap.timeline()
          .set(item, {
            left: x,
            top: y,
            rotation: gsap.utils.random(-10, 10),
            scale: 0.75,
            opacity: 0,
            zIndex: Math.floor(Date.now() % 100)
          })
          .to(item, {
            opacity: 0.9,
            scale: 1,
            duration: 0.35,
            ease: "power2.out"
          })
          .to(item, {
            opacity: 0,
            scale: 1.05,
            duration: 0.55,
            delay: 0.15,
            ease: "power2.in"
          });
      }
    }
  }, { passive: true });
}

function initTestimonialsSlider() {
  const track = document.querySelector('.testimonials_slider_track');
  const slides = document.querySelectorAll('.testimonial_slide');
  const prevBtn = document.querySelector('.arrow_prev');
  const nextBtn = document.querySelector('.arrow_next');
  const dotsContainer = document.querySelector('.testimonials_dots_container');

  if (!track || !slides.length) return;

  let currentIndex = 0;
  const totalSlides = slides.length;

  // Build dots dynamically if needed or bind to existing dots
  let dots = document.querySelectorAll('.testimonials_dots_container .dot');
  if (!dots.length && dotsContainer) {
    dotsContainer.innerHTML = '';
    slides.forEach((_, idx) => {
      const dot = document.createElement('span');
      dot.className = `dot${idx === 0 ? ' active' : ''}`;
      dot.setAttribute('data-slide', idx);
      dotsContainer.appendChild(dot);
    });
    dots = document.querySelectorAll('.testimonials_dots_container .dot');
  }

  function goToSlide(index) {
    if (index < 0) {
      currentIndex = totalSlides - 1;
    } else if (index >= totalSlides) {
      currentIndex = 0;
    } else {
      currentIndex = index;
    }

    track.style.transform = `translateX(-${currentIndex * 100}%)`;

    dots.forEach((dot, idx) => {
      if (idx === currentIndex) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.preventDefault();
      goToSlide(currentIndex - 1);
      resetAutoPlay();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.preventDefault();
      goToSlide(currentIndex + 1);
      resetAutoPlay();
    });
  }

  dots.forEach((dot, idx) => {
    dot.addEventListener('click', () => {
      goToSlide(idx);
      resetAutoPlay();
    });
  });

  // Touch Swipe Support
  let touchStartX = 0;
  let touchEndX = 0;

  const sliderWrap = document.querySelector('.testimonials_slider_track_wrap') || track;
  sliderWrap.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  sliderWrap.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, { passive: true });

  function handleSwipe() {
    const swipeThreshold = 40;
    if (touchEndX < touchStartX - swipeThreshold) {
      goToSlide(currentIndex + 1);
      resetAutoPlay();
    } else if (touchEndX > touchStartX + swipeThreshold) {
      goToSlide(currentIndex - 1);
      resetAutoPlay();
    }
  }

  // Auto-play timer
  let autoPlayTimer = setInterval(() => {
    goToSlide(currentIndex + 1);
  }, 6000);

  function resetAutoPlay() {
    clearInterval(autoPlayTimer);
    autoPlayTimer = setInterval(() => {
      goToSlide(currentIndex + 1);
    }, 6000);
  }

  // Pause autoplay on mouse enter
  const container = document.querySelector('.testimonials_slider_container');
  if (container) {
    container.addEventListener('mouseenter', () => clearInterval(autoPlayTimer));
    container.addEventListener('mouseleave', () => resetAutoPlay());
  }

  // Handle expandable long reviews
  document.querySelectorAll('.review_expand_btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      const card = this.closest('.testimonials_quote_card');
      const truncated = card.querySelector('.review_text_truncated');
      const full = card.querySelector('.review_text_full');
      const btnText = this.querySelector('.expand_btn_text');
      const isExpanded = this.classList.contains('is-expanded');

      if (isExpanded) {
        this.classList.remove('is-expanded');
        this.setAttribute('aria-expanded', 'false');
        if (truncated) truncated.style.display = 'inline';
        if (full) full.style.display = 'none';
        if (btnText) btnText.textContent = 'Read Full Review';
      } else {
        this.classList.add('is-expanded');
        this.setAttribute('aria-expanded', 'true');
        if (truncated) truncated.style.display = 'none';
        if (full) full.style.display = 'inline';
        if (btnText) btnText.textContent = 'Show Less';
      }
    });
  });

  // Initialize first slide position
  goToSlide(0);
}
