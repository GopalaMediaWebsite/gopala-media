document.addEventListener("DOMContentLoaded", () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Curated Projects Dataset (36 items) with balanced sizes (12 tall, 12 medium, 12 short)
  const projects = [
    {
      title: "Suspenseful Dali Mask Monologue",
      category: "Film & Video",
      img: "assets/images/work/IMG_1530.jpg",
      sizeClass: "medium"
    },
    {
      title: "Cinematic Crew Operation",
      category: "Film & Video",
      img: "assets/images/work/IMG_2358.jpg",
      sizeClass: "tall"
    },
    {
      title: "Netflix Campaign Activation",
      category: "Corporate",
      img: "assets/images/work/IMG_5930.jpg",
      sizeClass: "medium"
    },
    {
      title: "Jib-Mounted Cine Package",
      category: "Rentals",
      img: "assets/images/work/IMG_8204.jpg",
      sizeClass: "short"
    },
    {
      title: "Cinematic Location Shoot",
      category: "Film & Video",
      img: "assets/images/work/A0619334-5777-4CD4-9E68-3499139B4F75.JPG",
      sizeClass: "tall"
    },
    {
      title: "Commercial Film Rigging",
      category: "Film & Video",
      img: "assets/images/work/IMG_1426.jpg",
      sizeClass: "medium"
    },
    {
      title: "Editorial Campaign Production",
      category: "Corporate",
      img: "assets/images/work/IMG_6846.jpg",
      sizeClass: "short"
    },
    {
      title: "Brand Storytelling Session",
      category: "Film & Video",
      img: "assets/images/work/IMG_6849.jpg",
      sizeClass: "tall"
    },
    {
      title: "Cinematic Location Framing",
      category: "Film & Video",
      img: "assets/images/work/IMG_9123.jpg",
      sizeClass: "medium"
    },
    {
      title: "Studio Fashion Showcase",
      category: "Film & Video",
      img: "assets/images/work/IMG_9429.jpg",
      sizeClass: "short"
    },
    {
      title: "Behind-the-Lens Commercial",
      category: "Film & Video",
      img: "assets/images/work/IMG_9578.jpg",
      sizeClass: "tall"
    },
    {
      title: "Creative Direction Session",
      category: "Corporate",
      img: "assets/images/work/IMG_9605.jpg",
      sizeClass: "medium"
    },
    {
      title: "High-Impact Commercial Shoot",
      category: "Film & Video",
      img: "assets/images/work/IMG_9750.jpg",
      sizeClass: "short"
    },
    {
      title: "Signature Production Portfolio",
      category: "Rentals",
      img: "assets/images/work/IMG_9894.JPG",
      sizeClass: "tall"
    },
    {
      title: "Compound Skincare Campaign",
      category: "Corporate",
      img: "assets/images/work/Compound.png",
      sizeClass: "tall"
    },
    {
      title: "Temple Heritage Documentary",
      category: "Film & Video",
      img: "assets/images/work/IMG-20201129-WA0000.jpg",
      sizeClass: "medium"
    },
    {
      title: "Cinematic Crane Rigging",
      category: "Rentals",
      img: "assets/images/work/IMG_0051.jpg",
      sizeClass: "short"
    },
    {
      title: "Classic Velvet Portrait",
      category: "Film & Video",
      img: "assets/images/work/IMG_0153.jpg",
      sizeClass: "tall"
    },
    {
      title: "Satin Silhouette Spotlight",
      category: "Film & Video",
      img: "assets/images/work/IMG_0178.jpg",
      sizeClass: "medium"
    },
    {
      title: "Crimson Elegance Studio Session",
      category: "Film & Video",
      img: "assets/images/work/IMG_0212.jpg",
      sizeClass: "tall"
    },
    {
      title: "Cozy Cafe Scene Production",
      category: "Film & Video",
      img: "assets/images/work/IMG_0531.jpg",
      sizeClass: "medium"
    },
    {
      title: "Multicamera Studio Broadcast",
      category: "Film & Video",
      img: "assets/images/work/IMG_0535.jpg",
      sizeClass: "short"
    },
    {
      title: "Dreamscape Studio Set Design",
      category: "Rentals",
      img: "assets/images/work/IMG_0797.jpg",
      sizeClass: "tall"
    },
    {
      title: "Cloud Nine Editorial Campaign",
      category: "Film & Video",
      img: "assets/images/work/IMG_0808.jpg",
      sizeClass: "medium"
    },
    {
      title: "Ethereal Starfield Projection",
      category: "Film & Video",
      img: "assets/images/work/IMG_0815.JPG",
      sizeClass: "short"
    },
    {
      title: "Cosmic Projector Session",
      category: "Film & Video",
      img: "assets/images/work/IMG_0824.JPG",
      sizeClass: "medium"
    },
    {
      title: "Savarkar Movie Press Conference",
      category: "Corporate",
      img: "assets/images/work/IMG_1291.jpg",
      sizeClass: "tall"
    },
    {
      title: "Residential Drama Set",
      category: "Film & Video",
      img: "assets/images/work/IMG_1951.jpg",
      sizeClass: "short"
    },
    {
      title: "Studio Talk Show Broadcast",
      category: "Podcasts",
      img: "assets/images/work/IMG_3001.jpg",
      sizeClass: "medium"
    },
    {
      title: "ARRI Alexa Cinema Package",
      category: "Rentals",
      img: "assets/images/work/IMG_4613.jpg",
      sizeClass: "short"
    },
    {
      title: "High-Fashion Editorial Session",
      category: "Film & Video",
      img: "assets/images/work/IMG_5505.jpg",
      sizeClass: "medium"
    },
    {
      title: "Minimalist Summer Lookbook",
      category: "Film & Video",
      img: "assets/images/work/IMG_5654.jpg",
      sizeClass: "short"
    },
    {
      title: "Indigo Earth Portraiture",
      category: "Film & Video",
      img: "assets/images/work/IMG_5906.jpg",
      sizeClass: "tall"
    },
    {
      title: "Premium Cyclorama Lighting Rig",
      category: "Rentals",
      img: "assets/images/work/IMG_6082.jpg",
      sizeClass: "short"
    },
    {
      title: "Sony Cinema Line Masterclass",
      category: "Corporate",
      img: "assets/images/work/IMG_6991.JPG",
      sizeClass: "medium"
    },
    {
      title: "Fortress Stage Multi-Cam Recording",
      category: "Film & Video",
      img: "assets/images/work/IMG_8506.jpg",
      sizeClass: "tall"
    },
    {
      title: "Mehrangarh Sitar Session",
      category: "Film & Video",
      img: "assets/images/work/IMG_8512.jpg",
      sizeClass: "medium"
    },
    {
      title: "Nocturnal Folk Echoes",
      category: "Film & Video",
      img: "assets/images/work/IMG_8519.jpg",
      sizeClass: "short"
    },
    {
      title: "Telephoto Cine Lens Configuration",
      category: "Rentals",
      img: "assets/images/work/IMG_8540.jpg",
      sizeClass: "tall"
    },
    {
      title: "Studio Creator Portrait",
      category: "Corporate",
      img: "assets/images/work/IMG_8799.jpg",
      sizeClass: "medium"
    },
    {
      title: "Origami Concept Editorial",
      category: "Film & Video",
      img: "assets/images/work/IMG_8806.jpg",
      sizeClass: "short"
    },
    {
      title: "Streetwear Lookbook Production",
      category: "Film & Video",
      img: "assets/images/work/IMG_9038.jpg",
      sizeClass: "tall"
    },
    {
      title: "Commercial Apparel Production",
      category: "Film & Video",
      img: "assets/images/work/IMG_9225.jpg",
      sizeClass: "medium"
    },
    {
      title: "Graphic Tee Detail Capture",
      category: "Film & Video",
      img: "assets/images/work/IMG_9226.jpg",
      sizeClass: "short"
    },
    {
      title: "Narrative Set Design & Setup",
      category: "Film & Video",
      img: "assets/images/work/IMG_9292.jpg",
      sizeClass: "tall"
    },
    {
      title: "Studio Narrative Performance",
      category: "Film & Video",
      img: "assets/images/work/IMG_9294.jpg",
      sizeClass: "medium"
    },
    {
      title: "Editorial Studio Session",
      category: "Rentals",
      img: "assets/images/work/IMG_9317.jpg",
      sizeClass: "short"
    },
    {
      title: "Macro Product Cinematography",
      category: "Film & Video",
      img: "assets/images/work/IMG_9425.jpg",
      sizeClass: "tall"
    },
    {
      title: "Lakme Fashion Week Runway",
      category: "Film & Video",
      img: "assets/images/work/IMG_9657.jpg",
      sizeClass: "medium"
    },
    {
      title: "Avant-Garde Runway Showcase",
      category: "Film & Video",
      img: "assets/images/work/IMG_9659.jpg",
      sizeClass: "short"
    },
    {
      title: "The Sad Clown Editorial",
      category: "Film & Video",
      img: "assets/images/work/IMG_9716 (1).jpg",
      sizeClass: "tall"
    },
    {
      title: "Theatrical Fashion Narrative",
      category: "Film & Video",
      img: "assets/images/work/IMG_9727.jpg",
      sizeClass: "medium"
    },
    {
      title: "NBA Runway Collaboration",
      category: "Film & Video",
      img: "assets/images/work/IMG_9809.jpg",
      sizeClass: "short"
    },
    {
      title: "Studio Cyclorama Production",
      category: "Rentals",
      img: "assets/images/work/IMG_9920.jpg",
      sizeClass: "tall"
    },
    {
      title: "Press Room Celebrity Coverage",
      category: "Corporate",
      img: "assets/images/work/IMG_9932.jpg",
      sizeClass: "medium"
    },
    {
      title: "Maison Margiela Campaign",
      category: "Film & Video",
      img: "assets/images/work/Maison Margiela.png",
      sizeClass: "short"
    },
    {
      title: "Media Pit Press Production",
      category: "Corporate",
      img: "assets/images/work/PHOTO-2025-10-10-12-10-26.jpg",
      sizeClass: "medium"
    },
    {
      title: "Compound Skincare Catalog",
      category: "Corporate",
      img: "assets/images/work/_DSF1225 copy 2.jpg",
      sizeClass: "tall"
    },
    {
      title: "Summer Linen Editorial",
      category: "Film & Video",
      img: "assets/images/work/_DSF6079 copy.jpg",
      sizeClass: "tall"
    }
  ];

  // State
  let currentFilter = "all";
  let filteredProjects = [...projects];
  let scrollTriggers = [];

  // Elements
  const grid = document.getElementById("gallery-grid");
  const filterButtons = document.querySelectorAll(".g_filter_wrap");
  const countElement = document.querySelector('[fs-list-element="results-count"]');
  const emptyState = document.querySelector(".empty-state");

  // Modal elements
  const modalOverlay = document.getElementById("project-modal");
  const modalTitle = document.querySelector(".project_modal_title");
  const modalCat = document.querySelector(".project_modal_cat");
  const modalDesc = document.querySelector(".project_modal_desc");
  const modalImg = document.querySelector(".project_modal_img");
  const modalClose = document.querySelector(".project_modal_close");

  // Create a single card element
  function createCardHTML(project) {
    const card = document.createElement("div");
    card.className = `gallery_card is-${project.sizeClass}`;
    
    card.innerHTML = `
      <img src="${project.img}" alt="${project.title}" class="gallery_img" loading="lazy" />
    `;
    
    return card;
  }

  // Align the bottom of all columns perfectly on a single line
  function alignColumnBottoms(columns, colCount) {
    if (colCount < 2) return;

    // Reset all last card custom heights first
    columns.forEach(col => {
      const lastCard = col.querySelector(".gallery_card:last-child");
      if (lastCard) {
        lastCard.style.height = "";
      }
    });

    // Calculate sum height of cards in each column based on size classes
    const heights = columns.map(col => {
      let h = 0;
      col.querySelectorAll(".gallery_card").forEach(card => {
        if (card.classList.contains("is-tall")) h += 480;
        else if (card.classList.contains("is-medium")) h += 380;
        else if (card.classList.contains("is-short")) h += 280;
        h += 36; // gap height (2.25rem = 36px)
      });
      return h;
    });

    const maxHeight = Math.max(...heights);

    // Stretch the last card in shorter columns to align the bottoms
    columns.forEach((col, idx) => {
      const diff = maxHeight - heights[idx];
      if (diff > 5) {
        const lastCard = col.querySelector(".gallery_card:last-child");
        if (lastCard) {
          let baseHeight = 380; // default medium
          if (lastCard.classList.contains("is-tall")) baseHeight = 480;
          else if (lastCard.classList.contains("is-short")) baseHeight = 280;

          lastCard.style.height = `${baseHeight + diff}px`;
        }
      }
    });
  }

  // Render projects distributed vertically in columns and align bottoms
  function renderGalleryGrid(items) {
    grid.innerHTML = "";
    
    // Clear old ScrollTriggers to prevent memory leaks and lag
    scrollTriggers.forEach(trigger => trigger.kill());
    scrollTriggers = [];

    if (items.length === 0) {
      if (emptyState) emptyState.style.display = "block";
      grid.style.display = "none";
      return;
    } else {
      if (emptyState) emptyState.style.display = "none";
      grid.style.display = "grid";
    }

    // Determine number of columns based on screen width
    let colCount = 4;
    if (window.innerWidth <= 600) {
      colCount = 1;
    } else if (window.innerWidth <= 1024) {
      colCount = 2;
    }

    // Create column divs
    const columns = [];
    for (let i = 0; i < colCount; i++) {
      const colEl = document.createElement("div");
      colEl.className = "gallery_column";
      grid.appendChild(colEl);
      columns.push(colEl);
    }

    // Track visual heights of each column to balance them greedily
    const colHeights = new Array(colCount).fill(0);

    // Distribute projects greedily into the shortest column
    items.forEach((project) => {
      // Find the index of the shortest column
      let shortestColIdx = 0;
      let minHeight = colHeights[0];
      for (let i = 1; i < colCount; i++) {
        if (colHeights[i] < minHeight) {
          minHeight = colHeights[i];
          shortestColIdx = i;
        }
      }
      
      const cardEl = createCardHTML(project);
      columns[shortestColIdx].appendChild(cardEl);
      
      // Update column height track using size weights
      let weight = 380; // default medium
      if (project.sizeClass === "tall") weight = 480;
      else if (project.sizeClass === "short") weight = 280;
      
      colHeights[shortestColIdx] += weight + 36;
    });

    // Make column bottom edges align perfectly in a single line
    alignColumnBottoms(columns, colCount);
  }

  // Setup GSAP Column Parallax: animates from offset to 0 (perfect alignment at bottom)
  function initColumnParallax(colCount) {
    if (prefersReducedMotion) return;

    if (colCount >= 2) {
      const cols = document.querySelectorAll(".gallery_column");
      if (cols.length === 0) return;

      // Define parallax speeds/offsets based on column count
      const speeds = colCount >= 4 ? [80, 30, -40, -10] : [40, -20];

      cols.forEach((col, idx) => {
        const startOffset = speeds[idx % speeds.length];
        
        const trigger = gsap.fromTo(col, 
          { y: startOffset }, // starts offset to create wavy look
          {
            y: 0, // ends perfectly aligned at the bottom of the page!
            ease: "none",
            scrollTrigger: {
              trigger: grid,
              start: "top bottom",
              end: "bottom bottom",
              scrub: true,
              invalidateOnRefresh: true
            }
          }
        );

        // Keep track of trigger
        if (trigger.scrollTrigger) {
          scrollTriggers.push(trigger.scrollTrigger);
        }
      });
    } else {
      // Mobile single-column: fade-up each card individually as they scroll into view
      const cards = grid.querySelectorAll(".gallery_card");
      cards.forEach(card => {
        const trigger = gsap.fromTo(card,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 92%",
              toggleActions: "play none none reverse",
              invalidateOnRefresh: true
            }
          }
        );
        if (trigger.scrollTrigger) {
          scrollTriggers.push(trigger.scrollTrigger);
        }
      });
    }
  }

  // Modal open helper
  function openProjectModal(item) {
    if (modalTitle) modalTitle.textContent = item.title;
    if (modalCat) modalCat.textContent = item.category;
    if (modalImg) {
      modalImg.setAttribute("src", item.img);
      modalImg.setAttribute("alt", item.title);
    }

    modalOverlay.classList.add("is-active");
    document.body.style.overflow = "hidden"; // Freeze scroll

    if (window.lenis) {
      window.lenis.stop();
    }
  }

  // Close modal helper
  const closeModal = () => {
    modalOverlay.classList.remove("is-active");
    document.body.style.overflow = ""; // Resume scroll

    if (window.lenis) {
      window.lenis.start();
    }
  };

  if (modalClose) modalClose.addEventListener("click", closeModal);
  
  if (modalOverlay) {
    modalOverlay.addEventListener("click", (e) => {
      if (e.target === modalOverlay) {
        closeModal();
      }
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modalOverlay && modalOverlay.classList.contains("is-active")) {
      closeModal();
    }
  });

  // Category filtering
  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      filterButtons.forEach(b => b.classList.remove("is-active"));
      btn.classList.add("is-active");

      currentFilter = btn.getAttribute("data-service");
      
      // Filter list
      if (currentFilter === "all") {
        filteredProjects = [...projects];
      } else {
        filteredProjects = projects.filter(p => p.category === currentFilter);
      }

      // Update count
      if (countElement) {
        countElement.textContent = filteredProjects.length;
      }

      // Fade out grid, swap items, fade in
      if (!prefersReducedMotion) {
        gsap.to(grid, {
          opacity: 0,
          scale: 0.98,
          duration: 0.25,
          onComplete: () => {
            renderGalleryGrid(filteredProjects);
            gsap.to(grid, { opacity: 1, scale: 1, duration: 0.4 });
          }
        });
      } else {
        renderGalleryGrid(filteredProjects);
      }
    });
  });

  // Re-adjust column distribution on window resize
  let resizeTimeout;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      renderGalleryGrid(filteredProjects);
    }, 150);
  });

  // Initial load
  if (countElement) {
    countElement.textContent = filteredProjects.length;
  }
  renderGalleryGrid(filteredProjects);
});
