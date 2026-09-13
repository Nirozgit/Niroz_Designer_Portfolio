/* ============================================================
   PROJECT DATA — edit this array to add, remove, or reorder
   projects. Each project needs:
     title    - shown on hover / mobile caption
     category - shown under the title
     image    - path to the image file inside the images/ folder
     url      - the Behance link for this project
   The showcase re-renders automatically from this array, so
   you can add a 4th, 5th, 12th project just by adding another
   object below — no other code needs to change.
   ============================================================ */
const projects = [
  {
    title: "Jeevee — Dashain Campaign Sale",
    category: "Campaign Design",
    image: "images/dashain-sale.jpg",
    url: "BEHANCE_URL_HERE"
  },
  {
    title: "Jeevee — 13.11 Mega Campaign",
    category: "Campaign Design",
    image: "images/13-11-sale.jpg",
    url: "BEHANCE_URL_HERE"
  },
  {
    title: "Jeevee — Naya Barsha Sale",
    category: "Campaign Design",
    image: "images/naya-barsha.jpg",
    url: "BEHANCE_URL_HERE"
  }
];

const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- render the vertical project feed ---------- */
function renderProjects(){
  const feed = document.getElementById('projectFeed');
  if(!feed) return;
  const pastels = ['var(--pastel-mint)', 'var(--pastel-sky)', 'var(--pastel-peach)', 'var(--pastel-lavender)'];

  feed.innerHTML = projects.map((p, i) => `
    <a class="project-card-v2 reveal" href="${p.url}" target="_blank" rel="noopener" aria-label="${p.title}">
      <div class="project-image" style="background:${pastels[i % pastels.length]}" data-fallback="${p.title}">
        <img src="${p.image}" alt="${p.title}" loading="lazy"
             onerror="this.remove(); this.parentElement.classList.add('img-missing');">
        <div class="project-overlay">
          <h3>${p.title}</h3>
          <span>${p.category}</span>
        </div>
      </div>
      <div class="project-caption">
        <h3>${p.title}</h3>
        <span>${p.category}</span>
      </div>
    </a>
  `).join('');
}
renderProjects();

/* ---------- sticky nav border on scroll ---------- */
const nav = document.getElementById('siteNav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 8);
}, {passive:true});

/* ---------- duplicate marquee content for a seamless loop ---------- */
const track = document.getElementById('marqueeTrack');
if(track){
  track.innerHTML += track.innerHTML;
}

/* ---------- mobile menu ---------- */
const menuBtn = document.getElementById('menuBtn');
const mobilePanel = document.getElementById('mobilePanel');
menuBtn.addEventListener('click', () => {
  const open = mobilePanel.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', open);
});
mobilePanel.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  mobilePanel.classList.remove('open');
  menuBtn.setAttribute('aria-expanded', false);
}));

/* ---------- reveal-on-scroll entrance ---------- */
const revealEls = document.querySelectorAll('.reveal');
if('IntersectionObserver' in window){
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, {threshold:0.12});
  revealEls.forEach(el => io.observe(el));
} else {
  revealEls.forEach(el => el.classList.add('in'));
}
