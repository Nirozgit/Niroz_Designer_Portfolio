/**
 * NIROZ SHRESTHA — SENIOR DESIGNER PORTFOLIO
 * Main JavaScript: Dark Theme Controller, Project Feed, Filters, Clock, Scrollspy
 * Layout format: nirozshrestha.com.np | Content & Imagery: niroz.framer.website
 */

/* ============================================================
   PROJECT DATA — Curated projects across disciplines
   With verified assets from Framer & local fallbacks
   ============================================================ */
const allProjects = [
  // 1. Social Media Designs
  {
    id: 1,
    title: "Social Media Designs",
    hoverTitle: "Social Media Designs",
    category: "Social Media",
    filterKey: "social",
    year: "2024",
    client: "5,000+ Delivered · Brand Creatives",
    image: "assets/social-media.webp",
    url: "social-media-designs.html"
  },

  // 2. Logo and Rebranding
  {
    id: 2,
    title: "Logo and Rebranding",
    hoverTitle: "Logo and Rebranding",
    category: "Logo & Rebranding",
    filterKey: "branding",
    year: "2024",
    client: "Visual Identities & Brand Systems",
    image: "assets/logo-branding.webp",
    url: "logo-and-branding.html"
  },

  // 3. Video & Motion Graphics
  {
    id: 3,
    title: "Video & Motion Graphics",
    hoverTitle: "Video & Motion Graphics",
    category: "Motion Graphics",
    filterKey: "motion",
    year: "2024",
    client: "Dynamic Kinetic Storytelling & Promo Reels",
    image: "assets/motion-graphics.webp",
    url: "motion-graphics.html"
  },

  // 4. Ecommerce Digital Campaigns
  {
    id: 4,
    title: "Ecommerce Digital Campaigns",
    hoverTitle: "Ecommerce Digital Campaigns",
    category: "Ecommerce Campaigns",
    filterKey: "campaigns",
    year: "2024",
    client: "High-Converting Sales & Seasonal Launches",
    image: "assets/digital-campaigns.webp",
    url: "digital-campaigns.html"
  }
];

let activeFilter = "all";

document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initProjectsFeed();
  initFilters();
  initKathmanduClock();
  initCopyEmail();
  initScrollReveal();
  initScrollspy();
  initSerialLightbox();
  initAutoAspectRatio();
  initGoogleDriveSync();
});

/* ---------- Render Vertical Project Feed ---------- */
function initProjectsFeed() {
  const feed = document.getElementById('projectFeed');
  if (!feed) return;

  const filtered = activeFilter === "all"
    ? allProjects
    : allProjects.filter(p => p.filterKey === activeFilter);

  feed.innerHTML = filtered.map(p => `
    <a class="project-card-v2 reveal in" href="${p.url}" aria-label="${p.title}">
      <div class="project-image-box">
        <img src="${p.image}" alt="${p.title}" loading="lazy"
             onerror="this.parentElement.classList.add('img-missing'); this.remove();">
        <span class="project-badge-tag">${p.category}</span>

        <!-- Hover Overlay with Title and 'Open to view' button -->
        <div class="project-hover-overlay">
          <div class="project-hover-content">
            <h3 class="project-hover-title">${p.hoverTitle}</h3>
            <span class="project-hover-btn">
              <span>Open to view</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <line x1="7" y1="17" x2="17" y2="7"></line>
                <polyline points="7 7 17 7 17 17"></polyline>
              </svg>
            </span>
          </div>
        </div>
      </div>
      <div class="project-caption">
        <div class="project-meta">
          <h3>${p.title}</h3>
          <span>${p.client}</span>
        </div>
        <div class="project-arrow-btn" aria-hidden="true">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </div>
      </div>
    </a>
  `).join('');
}

/* ---------- Category Filter Tabs ---------- */
function initFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      activeFilter = btn.dataset.filter || 'all';
      initProjectsFeed();
    });
  });
}

/* ---------- Live Kathmandu Local Time Clock ---------- */
function initKathmanduClock() {
  const navClock = document.getElementById('kathmanduTime');
  const mobileClock = document.getElementById('mobileKathmanduTime');

  function updateTime() {
    try {
      const now = new Date();
      const timeString = now.toLocaleTimeString('en-US', {
        timeZone: 'Asia/Kathmandu',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });

      if (navClock) {
        navClock.textContent = `Kathmandu ${timeString}`;
      }
      if (mobileClock) {
        mobileClock.textContent = timeString;
      }
    } catch {
      if (navClock) navClock.textContent = 'Kathmandu, NP';
    }
  }

  updateTime();
  setInterval(updateTime, 1000);
}

/* ---------- Navigation & Mobile Drawer ---------- */
function initNav() {
  const menuBtn = document.getElementById('menuBtn') || document.getElementById('mobile-menu-toggle');
  const mobilePanel = document.getElementById('mobilePanel') || document.getElementById('mobile-nav-panel');

  if (menuBtn && mobilePanel) {
    menuBtn.addEventListener('click', () => {
      const isOpen = mobilePanel.classList.toggle('open');
      menuBtn.classList.toggle('open', isOpen);
      menuBtn.setAttribute('aria-expanded', String(isOpen));
    });

    // Close on clicking mobile link
    const mobileLinks = mobilePanel.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobilePanel.classList.remove('open');
        menuBtn.classList.remove('open');
        menuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }
}

/* ---------- Scrollspy: Highlight Active Nav Link ---------- */
function initScrollspy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('nav.links .nav-link');
  if (!sections.length || !navLinks.length) return;

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.scrollY + 180;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        current = section.getAttribute('id') || '';
      }
    });

    if (current) {
      navLinks.forEach(link => {
        const href = link.getAttribute('href')?.replace('#', '');
        link.classList.toggle('active', href === current);
      });
    }
  }, { passive: true });
}

/* ---------- One-Click Copy Email to Clipboard ---------- */
function initCopyEmail() {
  const copyBtn = document.getElementById('copyEmailBtn');
  const toast = document.getElementById('toastNotice');
  const emailTarget = 'niroz.xtha@gmail.com';

  if (!copyBtn) return;

  copyBtn.addEventListener('click', async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(emailTarget);
      } else {
        const input = document.createElement('input');
        input.value = emailTarget;
        document.body.appendChild(input);
        input.select();
        document.execCommand('copy');
        document.body.removeChild(input);
      }

      showToast('Email copied to clipboard!');
      const span = copyBtn.querySelector('span');
      if (span) {
        const orig = span.textContent;
        span.textContent = 'Copied!';
        setTimeout(() => { span.textContent = orig; }, 2000);
      }
    } catch {
      showToast('niroz.xtha@gmail.com');
    }
  });

  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2500);
  }
}

/* ---------- Scroll Reveal Animations ---------- */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    revealElements.forEach(el => el.classList.add('in'));
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => observer.observe(el));
}

/* ---------- Serial Works Lightbox Modal ---------- */
function initSerialLightbox() {
  const lightbox = document.getElementById('serialLightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');

  if (!lightbox || !lightboxImg) return;

  // Delegated click handler on document for current and dynamically synced cards
  document.addEventListener('click', (e) => {
    // 1. Client Guide dynamic page navigation (no lightbox, stays inside website)
    const guideCard = e.target.closest('.serial-card.serial-card-guide, .serial-card[data-client-slug]');
    if (guideCard) {
      const slug = guideCard.getAttribute('data-client-slug');
      const targetUrl = guideCard.getAttribute('data-guide-url') || (slug ? `/guide/${slug}` : null);
      if (targetUrl) {
        e.preventDefault();
        window.location.href = targetUrl;
        return;
      }
    }

    // 2. Fallback lightbox for standard image cards
    const card = e.target.closest('.serial-card.enable-lightbox');
    if (!card) return;

    const fullGuide = card.getAttribute('data-full-guide');
    const src = fullGuide || card.getAttribute('data-src') || card.querySelector('img')?.getAttribute('src');
    const title = card.getAttribute('data-title') || card.querySelector('img')?.getAttribute('alt') || '';
    if (!src) return;

    lightboxImg.src = src;
    lightboxImg.alt = title;
    if (lightboxCaption) lightboxCaption.textContent = title;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  });

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
      closeLightbox();
    }
  });

  // Footer Back to top handler
  const backToTop = document.getElementById('footerBackToTop');
  if (backToTop) {
    backToTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

/* ---------- Google Drive Live Folder Synchronization ---------- */
function initGoogleDriveSync() {
  const serialGrids = document.querySelectorAll('.serial-grid[data-drive-folder]');
  if (!serialGrids.length) return;

  serialGrids.forEach(serialGrid => {
    const folderId = serialGrid.getAttribute('data-drive-folder');
    if (!folderId) return;

    async function syncFromDrive() {
      try {
        let res;
        const staticFallback = folderId === '1JPKtgjLMcRf2a6-YPQvWXqsivNeGUNnf'
          ? '/api/drive-folder-logo-branding.json'
          : '/api/drive-folder-images.json';

        try {
          res = await fetch(`/api/drive-folder-images?folderId=${encodeURIComponent(folderId)}`);
        } catch {
          res = await fetch(staticFallback);
        }

        if (!res || !res.ok) {
          res = await fetch(staticFallback);
        }

        if (!res || !res.ok) return;

        const data = await res.json();
        if (!data || !data.images || !Array.isArray(data.images) || data.images.length === 0) {
          return;
        }

        const currentCards = Array.from(serialGrid.querySelectorAll('.serial-card'));
        const currentIds = currentCards.map(c => c.getAttribute('data-drive-id')).filter(Boolean);
        const newIds = data.images.map(img => img.id);

        // Check if count and IDs in order match exactly
        const isIdentical = currentIds.length === newIds.length && currentIds.every((id, idx) => id === newIds[idx]);
        if (isIdentical) {
          return;
        }

        // Re-render thumbnails matching the Google Drive folder exactly with natural aspect ratio support
        serialGrid.innerHTML = data.images.map((img, idx) => {
          const title = img.title || img.filename || `Design 0${idx + 1}`;
          const fallback = img.fallbackUrl ? ` onerror="this.onerror=null;this.src='${img.fallbackUrl}'"` : '';
          const ratio = (img.width && img.height) ? `${img.width} / ${img.height}` : (img.aspectRatio || '');
          const styleAttr = ratio ? ` style="--image-ratio: ${ratio}; aspect-ratio: var(--image-ratio);"` : '';
          const onloadAttr = ` onload="if(this.naturalWidth && this.naturalHeight){const r=this.naturalWidth+' / '+this.naturalHeight;this.parentElement.style.setProperty('--image-ratio',r);this.parentElement.style.aspectRatio=r;}"`;
          const slug = img.slug || (img.clientName ? img.clientName.toLowerCase().replace(/[^a-z0-9]+/g, '-') : `client-${idx + 1}`);
          const clientName = img.clientName || title;
          const guideUrl = `/guide/${slug}`;

          return `
              <div class="serial-card serial-card-guide" data-client-slug="${slug}" data-title="${title}" data-drive-id="${img.id}" data-guide-url="${guideUrl}"${styleAttr}>
                <img src="${img.url}"${fallback}${onloadAttr} alt="${title}" loading="lazy" />
                <div class="serial-card-overlay">
                  <a href="${guideUrl}" class="btn-full-guide" aria-label="View Full Guide for ${clientName}">
                    <span>Full Guide</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                  </a>
                </div>
              </div>`;
        }).join('\n');

        // Re-apply aspect ratios to newly generated cards
        initAutoAspectRatio();

      } catch (err) {
        console.warn('[Google Drive Sync]', err);
      }
    }

    // Initial sync check
    syncFromDrive();

    // Polling every 30 seconds to catch newly uploaded, deleted, or replaced images in Google Drive
    setInterval(syncFromDrive, 30000);

    // Sync immediately when user returns to the tab
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) {
        syncFromDrive();
      }
    });
  });
}

/* ---------- Auto-Adaptive Aspect Ratio For Thumbnails ---------- */
function initAutoAspectRatio() {
  function applyRatioToCard(card) {
    if (!card) return;
    const img = card.querySelector('img');
    if (!img) return;

    function computeAndApply() {
      if (img.naturalWidth && img.naturalHeight) {
        const ratio = `${img.naturalWidth} / ${img.naturalHeight}`;
        card.style.setProperty('--image-ratio', ratio);
        card.style.aspectRatio = ratio;
      }
    }

    if (img.complete && img.naturalWidth > 0) {
      computeAndApply();
    } else {
      img.addEventListener('load', computeAndApply, { once: true });
    }
  }

  document.querySelectorAll('.serial-card').forEach(applyRatioToCard);

  // Observe dynamic DOM insertions in any serial-grid so dynamically added cards adapt immediately
  const grids = document.querySelectorAll('.serial-grid');
  grids.forEach(grid => {
    if (grid._ratioObserverAttached) return;
    grid._ratioObserverAttached = true;
    const observer = new MutationObserver((mutations) => {
      mutations.forEach(mutation => {
        mutation.addedNodes.forEach(node => {
          if (node.nodeType === 1) {
            if (node.classList && node.classList.contains('serial-card')) {
              applyRatioToCard(node);
            } else if (node.querySelectorAll) {
              node.querySelectorAll('.serial-card').forEach(applyRatioToCard);
            }
          }
        });
      });
    });
    observer.observe(grid, { childList: true, subtree: true });
  });
}

