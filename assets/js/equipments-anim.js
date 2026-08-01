document.addEventListener("DOMContentLoaded", () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  // Cache DOM Elements
  const gridContainer = document.querySelector(".equip_grid_list");
  const countElement = document.querySelector(".equip_count_sup");
  const emptyState = document.querySelector(".empty-state");

  // Filters elements
  const filterTrigger = document.querySelector(".equip_filter_trigger");
  const filtersDrawer = document.querySelector(".equip_filters_drawer");
  const filterBtns = document.querySelectorAll(".filter_tag_btn");

  // View selectors
  const viewBtns = document.querySelectorAll(".view_btn");

  // Card items & expansion state variables
  const cards = document.querySelectorAll(".equip_card_wrap");
  const overlay = document.getElementById("equip-modal-overlay");
  
  let activeCard = null;
  let placeholder = null;
  let isDragging = false;
  let startY = 0;
  let currentY = 0;
  let dragDeltaY = 0;

  /* ==========================================================================
     1. Dynamic Count & Catalog Initialization
     ========================================================================== */
  const gridItems = document.querySelectorAll(".equip_item");
  
  function updateCatalogCount(count) {
    if (countElement) {
      countElement.textContent = count;
    }
  }
  
  updateCatalogCount(gridItems.length);

  /* ==========================================================================
     2. Entrance reveals on Scroll
     ========================================================================== */
  if (prefersReducedMotion) {
    gsap.set(gridItems, { opacity: 1, y: 0 });
  } else {
    gsap.fromTo(gridItems,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.06,
        ease: "power2.out",
        scrollTrigger: {
          trigger: gridContainer,
          start: "top 80%"
        }
      }
    );
  }

  /* ==========================================================================
     3. S / M / L View Mode Selector Toggles
     ========================================================================== */
  viewBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      viewBtns.forEach(b => b.classList.remove("is-active"));
      btn.classList.add("is-active");

      const view = btn.getAttribute("data-view");
      
      // Update grid container classes
      gridContainer.classList.remove("view-s", "view-m", "view-l");
      gridContainer.classList.add(`view-${view}`);
      
      // Refresh ScrollTrigger to recalculate card positions
      setTimeout(() => ScrollTrigger.refresh(), 200);
    });
  });

  /* ==========================================================================
     4. Toggleable Filter tag Drawer & Interactive Filtering
     ========================================================================== */
  if (filterTrigger) {
    filterTrigger.addEventListener("click", () => {
      filtersDrawer.classList.toggle("is-active");
      const isActive = filtersDrawer.classList.contains("is-active");
      
      // Toggle plus icon indicator
      const plusIcon = filterTrigger.querySelector(".plus_icon");
      if (plusIcon) {
        plusIcon.textContent = isActive ? "−" : "+";
      }
    });
  }

  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("is-active"));
      btn.classList.add("is-active");

      const category = btn.getAttribute("data-category");
      const toShow = [];
      const toHide = [];

      gridItems.forEach(item => {
        const itemCategory = item.getAttribute("data-category");
        if (category === "all" || itemCategory === category) {
          toShow.push(item);
        } else {
          toHide.push(item);
        }
      });

      // Update count badge
      updateCatalogCount(toShow.length);

      if (prefersReducedMotion) {
        toHide.forEach(item => item.style.display = "none");
        toShow.forEach(item => item.style.display = "block");
        emptyState.style.display = toShow.length === 0 ? "block" : "none";
        ScrollTrigger.refresh();
      } else {
        // Animate out filtered-out cards
        const tl = gsap.timeline({
          onComplete: () => ScrollTrigger.refresh()
        });

        if (toHide.length > 0) {
          tl.to(toHide, {
            opacity: 0,
            scale: 0.7,
            duration: 0.4,
            stagger: 0.03,
            ease: "power2.in",
            onComplete: () => {
              toHide.forEach(item => item.style.display = "none");
            }
          });
        }

        // Animate in matching cards
        tl.add(() => {
          toShow.forEach(item => {
            item.style.display = "block";
            gsap.set(item, { opacity: 0, scale: 0.7 });
          });

          if (toShow.length === 0) {
            gsap.fromTo(emptyState,
              { opacity: 0, display: "block" },
              { opacity: 1, duration: 0.4 }
            );
          } else {
            emptyState.style.display = "none";
            gsap.to(toShow, {
              opacity: 1,
              scale: 1,
              duration: 0.6,
              stagger: 0.05,
              ease: "power2.out"
            });
          }
        });
      }
    });
  });

  /* ==========================================================================
     5. Sliding Side-Drawer Panel details & Dynamic Populating
     ========================================================================== */
  const pageLayout = document.querySelector(".equip_page_layout");
  const panelSide = document.querySelector(".equip_panel_side");
  const panelCloseBtn = document.querySelector(".panel_close_btn");
  const panelOverlay = document.querySelector(".panel_overlay");
  
  const panelContent = document.querySelector(".panel_content_scroll");
  const panelImg = document.querySelector(".panel_product_img");
  const panelTitle = document.querySelector(".panel_product_title");
  const panelCategory = document.querySelector(".panel_product_category");
  const panelSubitems = document.querySelector(".panel_subitems_text");

  let isPanelOpen = false;

  function populatePanel(card) {
    const title = card.getAttribute("data-title");
    const category = card.getAttribute("data-category");
    const imgUrl = card.getAttribute("data-img");
    
    // Read subitems text from card desc
    const cardDesc = card.querySelector(".equip_card_desc");
    const subitemsText = cardDesc ? cardDesc.textContent.trim() : '';

    // Inject values
    if (panelImg) {
      panelImg.src = imgUrl;
      panelImg.alt = title;
    }
    if (panelTitle) panelTitle.textContent = title;
    if (panelCategory) panelCategory.textContent = category;
    if (panelSubitems) panelSubitems.textContent = subitemsText;

    // Update quote button link with selected equipment
    const panelInquireBtn = document.querySelector(".panel_inquire_btn");
    if (panelInquireBtn && title) {
      panelInquireBtn.href = `contact.html?equipment=${encodeURIComponent(title)}`;
    }

    // Copy visual style (background extensions & object fit) from card
    const cardVisual = card.querySelector(".equip_card_visual");
    const panelImgBox = document.querySelector(".panel_img_box");
    if (panelImgBox) {
      if (cardVisual && cardVisual.style.backgroundColor) {
        panelImgBox.style.backgroundColor = cardVisual.style.backgroundColor;
      } else {
        panelImgBox.style.backgroundColor = "var(--bg-card)";
      }
    }

    const cardImg = card.querySelector(".equip_card_image");
    if (panelImg && cardImg) {
      const mixBlend = cardImg.style.mixBlendMode || "normal";
      const objFit = cardImg.style.objectFit || "cover";
      panelImg.style.mixBlendMode = mixBlend;
      panelImg.style.objectFit = objFit;
      
      if (objFit === "cover") {
        panelImg.style.width = "100%";
        panelImg.style.height = "100%";
        panelImg.style.maxWidth = "none";
        panelImg.style.maxHeight = "none";
      } else {
        panelImg.style.width = "82%";
        panelImg.style.height = "auto";
        panelImg.style.maxWidth = "none";
        panelImg.style.maxHeight = "220px";
      }
    }
  }

  function openPanel(card) {
    if (activeCard === card) return;
    
    // Highlight active card
    if (activeCard) {
      activeCard.classList.remove("is-active");
    }
    activeCard = card;
    card.classList.add("is-active");

    if (isPanelOpen) {
      // Content Swap Cross-fade micro-interaction
      gsap.to(panelContent, {
        opacity: 0,
        y: 12,
        duration: 0.25,
        ease: "power2.in",
        onComplete: () => {
          populatePanel(card);
          gsap.to(panelContent, {
            opacity: 1,
            y: 0,
            duration: 0.4,
            ease: "power2.out"
          });
        }
      });
    } else {
      isPanelOpen = true;
      populatePanel(card);
      
      // Add class for CSS transform transition slide
      pageLayout.classList.add("is-panel-open");

      // Slide inner details content fade
      gsap.fromTo(panelContent, 
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.45, ease: "power2.out", delay: 0.15 }
      );
    }
  }

  function closePanel() {
    if (!isPanelOpen) return;
    isPanelOpen = false;

    // Clear active highlighted card
    if (activeCard) {
      activeCard.classList.remove("is-active");
      activeCard = null;
    }

    // Fade out details content then slide panel back via class
    gsap.to(panelContent, {
      opacity: 0,
      y: -10,
      duration: 0.2,
      ease: "power2.in",
      onComplete: () => {
        pageLayout.classList.remove("is-open"); // just in case
        pageLayout.classList.remove("is-panel-open");
      }
    });
  }

  // Bind Card Click Triggers
  cards.forEach(card => {
    card.addEventListener("click", (e) => {
      e.stopPropagation();
      openPanel(card);
    });
  });

  // Bind Close Events
  if (panelCloseBtn) {
    panelCloseBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      closePanel();
    });
  }

  // Click outside panel/cards to close
  document.addEventListener("click", (e) => {
    if (isPanelOpen) {
      const clickedInsidePanel = e.target.closest(".equip_panel_side");
      const clickedInsideCard = e.target.closest(".equip_card_wrap");
      
      if (!clickedInsidePanel && !clickedInsideCard) {
        closePanel();
      }
    }
  });

  // ESC key dismiss panel
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isPanelOpen) {
      closePanel();
    }
  });
});
