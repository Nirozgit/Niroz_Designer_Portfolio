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
  const cards = document.querySelectorAll('.serial-card');
  const lightbox = document.getElementById('serialLightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');

  if (!cards.length || !lightbox || !lightboxImg) return;

  cards.forEach(card => {
    card.addEventListener('click', () => {
      const src = card.getAttribute('data-src') || card.querySelector('img')?.getAttribute('src');
      const title = card.getAttribute('data-title') || card.querySelector('img')?.getAttribute('alt') || '';
      if (!src) return;

      lightboxImg.src = src;
      lightboxImg.alt = title;
      if (lightboxCaption) lightboxCaption.textContent = title;
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
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

