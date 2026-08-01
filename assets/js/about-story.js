document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);
  const activePath = document.getElementById("active-story-path");
  if (!activePath) return;
  const pathLength = activePath.getTotalLength();
  
  // Precompute 500 path points to avoid getPointAtLength layout thrashing on mobile scroll
  const SAMPLES = 500;
  const pathPoints = new Array(SAMPLES + 1);
  for (let i = 0; i <= SAMPLES; i++) {
    pathPoints[i] = activePath.getPointAtLength((i / SAMPLES) * pathLength);
  }
  function getPoint(progress) {
    const idx = Math.min(SAMPLES, Math.max(0, Math.floor(progress * SAMPLES)));
    return pathPoints[idx];
  }
  
  const activePaths = document.querySelectorAll(".story_line_active_layer");
  const leadDots = document.querySelectorAll(".story_lead_dot");
  const startPoint = pathPoints[0];
  
  activePaths.forEach(path => {
    gsap.set(path, {
      strokeDasharray: pathLength,
      strokeDashoffset: pathLength
    });
  });
  
  leadDots.forEach(dot => {
    dot.setAttribute("cx", startPoint.x);
    dot.setAttribute("cy", startPoint.y);
    gsap.set(dot, { opacity: 1 });
  });
  
  gsap.set(".story_content", {
    x: window.innerWidth / 2 - startPoint.x,
    y: 80 - startPoint.y,
    willChange: "transform"
  });
  
  gsap.to(".timeline_scroll_indicator", {
    opacity: 0,
    scrollTrigger: {
      trigger: ".about_story_wrap",
      start: "top top",
      end: "+=150",
      scrub: true
    }
  });
  
  const isMobile = window.innerWidth <= 768;
  const xTo = gsap.quickTo(".story_content", "x", { duration: isMobile ? 0.15 : 0.6, ease: "power2.out" });
  const yTo = gsap.quickTo(".story_content", "y", { duration: isMobile ? 0.15 : 0.6, ease: "power2.out" });
  
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".about_story_wrap",
      start: "top top",
      end: isMobile ? "+=4500" : "+=8000",
      pin: true,
      scrub: isMobile ? 0.15 : 0.6,
      anticipatePin: 1,
      invalidateOnRefresh: true
    }
  });
  
  tl.to(activePaths, {
    strokeDashoffset: 0,
    ease: "none",
    duration: 1,
    onUpdate: function() {
      const progress = this.progress();
      const point = getPoint(progress);
      let centerY = window.innerHeight * 0.5;
      
      if (progress < 0.15) {
        const ratio = progress / 0.15;
        centerY = gsap.utils.interpolate(80, window.innerHeight * 0.5, ratio);
      }
      
      xTo(window.innerWidth / 2 - point.x);
      yTo(centerY - point.y);
      
      if (progress > 0.002 && progress < 0.998) {
        leadDots.forEach(dot => {
          gsap.set(dot, { opacity: 1 });
          dot.setAttribute("cx", point.x);
          dot.setAttribute("cy", point.y);
        });
      } else {
        leadDots.forEach(dot => gsap.set(dot, { opacity: 0 }));
      }
      
      toggleActive("milestone-1", "node-1", progress >= 0.09);
      toggleActive("milestone-2", "node-2", progress >= 0.25);
      toggleActive("milestone-3", "node-3", progress >= 0.44);
      toggleActive("milestone-4", "node-4", progress >= 0.64);
      toggleActive("milestone-5", "node-5", progress >= 0.83);
    }
  });
  
  function toggleActive(cardId, nodeId, active) {
    const card = document.getElementById(cardId);
    const node = document.getElementById(nodeId);
    const img = document.getElementById(cardId + "-img");
    if (card) card.classList.toggle("active", active);
    if (node) node.classList.toggle("active", active);
    if (img) img.classList.toggle("active", active);
  }
  
  ScrollTrigger.refresh();
});
