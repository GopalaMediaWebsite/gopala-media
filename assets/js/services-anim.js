document.addEventListener("DOMContentLoaded", () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  // Cache elements
  const heroLeft = document.querySelector(".services_hero_left");
  const heroIndex = document.querySelector(".services_hero_index");
  const serviceItems = document.querySelectorAll(".services_item");

  /* ==========================================================================
     1. Entrance & Scroll Reveal Animations
     ========================================================================== */
  if (prefersReducedMotion) {
    gsap.set([heroLeft, heroIndex], { opacity: 1, y: 0 });
    gsap.set(serviceItems, { opacity: 1, y: 0 });
    gsap.set(".services_img_wrap", { clipPath: "inset(0% 0% 0% 0% round 20px)" });
  } else {
    // Hero Timeline
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.to(heroLeft, { opacity: 1, y: 0, duration: 1.2 })
      .to(heroIndex, { opacity: 1, y: 0, duration: 1.0 }, "-=0.9");

    // Scroll reveals for service items text content
    serviceItems.forEach(item => {
      const textElements = item.querySelectorAll(".services_index, .services_title, .services_desc, .services_btn");
      
      gsap.fromTo(textElements,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: item,
            start: "top 78%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // 3D Flip reveal for the sub-capabilities list items
      const listItems = item.querySelectorAll(".services_caps_list li");
      gsap.fromTo(listItems,
        { opacity: 0, rotationX: -80, transformOrigin: "top center", y: 15 },
        {
          opacity: 1,
          rotationX: 0,
          y: 0,
          duration: 0.9,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 72%"
          }
        }
      );
    });

    /* ==========================================================================
       2. Scroll-Driven Clip-Path Unfolding Frame Reveal
       ========================================================================== */
    gsap.utils.toArray(".services_img_wrap").forEach(wrap => {
      const img = wrap.querySelector(".services_img");
      
      // Unfold clip path from center on scroll
      gsap.fromTo(wrap,
        { clipPath: "inset(15% 15% 15% 15% round 20px)" },
        {
          clipPath: "inset(0% 0% 0% 0% round 0px)",
          ease: "none",
          scrollTrigger: {
            trigger: wrap,
            start: "top bottom",
            end: "center center",
            scrub: true
          }
        }
      );

      // Image Parallax scroll inside the frame
      gsap.fromTo(img,
        { y: "-6%" },
        {
          y: "6%",
          ease: "none",
          scrollTrigger: {
            trigger: wrap,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        }
      );
    });
  }

  /* ==========================================================================
     3. 3D Tilt Card Interaction on Desktop hover
     ========================================================================== */
  if (!isTouchDevice && !prefersReducedMotion) {
    const wraps = document.querySelectorAll(".services_img_wrap");
    
    wraps.forEach(wrap => {
      const img = wrap.querySelector(".services_img");
      
      wrap.addEventListener("mousemove", (e) => {
        const rect = wrap.getBoundingClientRect();
        const x = e.clientX - rect.left; 
        const y = e.clientY - rect.top;  
        
        // Offset relative to center (-0.5 to 0.5)
        const xc = (x / rect.width) - 0.5;
        const yc = (y / rect.height) - 0.5;
        
        // Tilt the card container in 3D space
        gsap.to(wrap, {
          rotationY: xc * 12, 
          rotationX: -yc * 12,
          transformPerspective: 1000,
          ease: "power2.out",
          duration: 0.4
        });
        
        // Offset the image inside in the opposite direction for depth
        gsap.to(img, {
          x: -xc * 16,
          y: -yc * 16,
          ease: "power2.out",
          duration: 0.4
        });
      });
      
      wrap.addEventListener("mouseleave", () => {
        // Snappily return back to neutral position
        gsap.to(wrap, {
          rotationY: 0,
          rotationX: 0,
          ease: "power3.out",
          duration: 0.7
        });
        gsap.to(img, {
          x: 0,
          y: 0,
          ease: "power3.out",
          duration: 0.7
        });
      });
    });
  }

  /* ==========================================================================
     4. Smooth Index Navigation
     ========================================================================== */
  document.querySelectorAll(".services_hero_index_item").forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href");
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        if (window.lenis) {
          window.lenis.scrollTo(targetElement, { offset: -100, duration: 1.2 });
        } else {
          const offsetTop = targetElement.getBoundingClientRect().top + window.scrollY - 100;
          window.scrollTo({ top: offsetTop, behavior: "smooth" });
        }
      }
    });
  });
});
