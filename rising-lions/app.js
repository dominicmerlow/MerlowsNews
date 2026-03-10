/* ═══════════════════════════════════════════════════
   RISING LIONS — APP.JS
═══════════════════════════════════════════════════ */

/* ─── SCROLL NAV ─────────────────────────────────── */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

/* ─── HAMBURGER ──────────────────────────────────── */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.querySelector('.nav__links');
hamburger?.addEventListener('click', () => navLinks.classList.toggle('nav__links--open'));

/* ─── SCROLL ANIMATIONS ──────────────────────────── */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); } });
}, { threshold: 0.12 });

document.querySelectorAll('.animate-fade-up, .animate-slide-in').forEach(el => observer.observe(el));

/* ─── COUNT-UP STATS ─────────────────────────────── */
function countUp(el, target, duration = 2000) {
  const start = performance.now();
  const step = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(ease * target).toLocaleString();
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const el = e.target;
      const target = parseInt(el.dataset.count, 10);
      countUp(el, target);
      statsObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('[data-count]').forEach(el => statsObserver.observe(el));

/* ─── PARTICLES ──────────────────────────────────── */
const particlesContainer = document.getElementById('particles');
if (particlesContainer) {
  for (let i = 0; i < 28; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.cssText = `
      left: ${Math.random() * 100}%;
      animation-delay: ${Math.random() * 12}s;
      animation-duration: ${8 + Math.random() * 10}s;
      width: ${2 + Math.random() * 3}px;
      height: ${2 + Math.random() * 3}px;
      opacity: ${0.3 + Math.random() * 0.5};
    `;
    particlesContainer.appendChild(p);
  }
}

/* ─── DEAL FLOW DEMO ─────────────────────────────── */
const DEALS = [
  { sector: '🏭', bg: 'rgba(26,58,143,0.2)', title: 'Persian Carpet Manufacturer — Export Ready', meta: 'Isfahan · Verified Exporter', value: '$2.4M', badge: 'NEW', badgeClass: 'badge--new' },
  { sector: '🌾', bg: 'rgba(39,201,63,0.15)', title: 'Saffron Farm Co-op — Bulk Supply Available', meta: 'Khorasan · Agriculture', value: '$850K', badge: 'HOT', badgeClass: 'badge--hot' },
  { sector: '💻', bg: 'rgba(197,160,89,0.15)', title: 'Tehran SaaS — Series A Syndicate Round', meta: 'Tehran · Technology', value: '$5M', badge: 'SYNDICATE', badgeClass: 'badge--syn' },
  { sector: '🏗️', bg: 'rgba(255,95,86,0.12)', title: 'Construction Materials JV — Tabriz', meta: 'Tabriz · Manufacturing', value: '$12M', badge: 'NEW', badgeClass: 'badge--new' },
  { sector: '🧴', bg: 'rgba(26,58,143,0.2)', title: 'Pharmaceutical Raw Materials — EU Cert', meta: 'Shiraz · Healthcare', value: '$3.1M', badge: 'HOT', badgeClass: 'badge--hot' },
];

const SYNDICATE_DEALS = [
  { sector: '⚡', bg: 'rgba(255,189,46,0.15)', title: 'Solar Energy Farm — 50MW Capacity', meta: 'Yazd · Renewable Energy', value: '$28M', badge: 'SYNDICATE', badgeClass: 'badge--syn' },
  { sector: '🏨', bg: 'rgba(197,160,89,0.15)', title: 'Eco-Tourism Resort — Caspian Coast', meta: 'Gilan · Hospitality', value: '$8.5M', badge: 'SYNDICATE', badgeClass: 'badge--syn' },
  { sector: '🚢', bg: 'rgba(26,58,143,0.2)', title: 'Port Logistics Hub — Chabahar Free Zone', meta: 'Sistan · Logistics', value: '$45M', badge: 'HOT', badgeClass: 'badge--hot' },
];

let dealInterval;

function renderDeals(deals) {
  const container = document.getElementById('dealCards');
  if (!container) return;
  container.innerHTML = '';
  deals.forEach((d, i) => {
    const el = document.createElement('div');
    el.className = 'deal-card';
    el.style.animationDelay = `${i * 0.1}s`;
    el.innerHTML = `
      <div class="deal-card__sector" style="background:${d.bg}">${d.sector}</div>
      <div class="deal-card__info">
        <div class="deal-card__title">${d.title}</div>
        <div class="deal-card__meta">${d.meta}</div>
      </div>
      <div>
        <div class="deal-card__value">${d.value}</div>
        <div class="deal-card__badge ${d.badgeClass}">${d.badge}</div>
      </div>
    `;
    container.appendChild(el);
  });
}

function initDealFlow() {
  const tabs = document.querySelectorAll('.demo-tab');
  renderDeals(DEALS.slice(0, 3));

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('demo-tab--active'));
      tab.classList.add('demo-tab--active');
      const which = tab.dataset.tab;
      if (which === 'syndicate') renderDeals(SYNDICATE_DEALS.slice(0, 3));
      else if (which === 'watchlist') renderDeals(DEALS.slice(2, 5));
      else renderDeals(DEALS.slice(0, 3));
    });
  });

  // Live rotating deal — cycle every 5s on "latest" tab
  let idx = 0;
  dealInterval = setInterval(() => {
    const activeTab = document.querySelector('.demo-tab--active');
    if (activeTab?.dataset.tab === 'latest') {
      idx = (idx + 1) % DEALS.length;
      const container = document.getElementById('dealCards');
      if (!container) return;
      const first = container.firstChild;
      if (first) container.removeChild(first);
      const d = DEALS[idx];
      const el = document.createElement('div');
      el.className = 'deal-card';
      el.style.animationDelay = '0s';
      el.innerHTML = `
        <div class="deal-card__sector" style="background:${d.bg}">${d.sector}</div>
        <div class="deal-card__info">
          <div class="deal-card__title">${d.title}</div>
          <div class="deal-card__meta">${d.meta}</div>
        </div>
        <div>
          <div class="deal-card__value">${d.value}</div>
          <div class="deal-card__badge ${d.badgeClass}">${d.badge}</div>
        </div>
      `;
      container.appendChild(el);
    }
  }, 3500);

  // Ticker
  const tickerItems = [
    '🏭 Isfahan Textiles +$2.4M', '⚡ Yazd Solar Syndicate', '🌾 Saffron Export Deal LIVE',
    '🇮🇱 Tel Aviv–Tehran JV Signed', '💻 Tehran SaaS Series A Open', '🏨 Caspian Resort Syndicate',
    '📈 47 countries now on platform', '🤝 New partner: Dubai Free Zone',
  ];
  const text = tickerItems.join('   ·   ') + '   ·   ' + tickerItems.join('   ·   ');
  const track = document.getElementById('tickerTrack');
  if (track) track.textContent = text;
}

/* ─── COMMUNITY FEED DEMO ────────────────────────── */
const POSTS = [
  { initials: 'MH', bg: '#1A3A8F', name: 'Mohammad H.', role: 'Textile Manufacturer', flag: '🇮🇷', body: 'Just completed our first verified export to a European buyer via Rising Lions 🎉 Process was smoother than expected.', likes: 47, comments: 12 },
  { initials: 'YB', bg: '#8B2FC9', name: 'Yoav Ben-David', role: 'Tech Entrepreneur, Tel Aviv', flag: '🇮🇱', body: 'Looking to connect with Iranian software engineers for a joint R&D project. DM me if interested. Serious inquiries only.', likes: 31, comments: 8 },
  { initials: 'SL', bg: '#C5A059', name: 'Sarah Levy', role: 'Investment Director, London', flag: '🇬🇧', body: 'The saffron export syndicate just hit its minimum. Final spots available — this one is exceptional quality and margin.', likes: 89, comments: 23 },
  { initials: 'RK', bg: '#1A6B3A', name: 'Reza Karimi', role: 'Trade Lawyer, Dubai', flag: '🇦🇪', body: 'Published a new guide: "Structuring JVs in Iran post-sanctions — a practitioner\'s framework". Free for all members.', likes: 156, comments: 41 },
];

function initCommunity() {
  const feed = document.getElementById('communityFeed');
  if (!feed) return;

  let shown = 0;
  function addPost() {
    if (shown >= POSTS.length) return;
    const p = POSTS[shown++];
    const el = document.createElement('div');
    el.className = 'feed-post';
    el.style.animationDelay = `${shown * 0.15}s`;
    el.innerHTML = `
      <div class="feed-post__header">
        <div class="feed-avatar" style="background:${p.bg}">${p.initials}</div>
        <div class="feed-post__meta">
          <div class="feed-post__name">${p.name}</div>
          <div class="feed-post__role">${p.role}</div>
        </div>
        <span class="feed-post__flag">${p.flag}</span>
      </div>
      <div class="feed-post__body">${p.body}</div>
      <div class="feed-post__actions">
        <span class="feed-action">👍 ${p.likes}</span>
        <span class="feed-action">💬 ${p.comments}</span>
        <span class="feed-action">↗️ Share</span>
      </div>
    `;
    feed.appendChild(el);
    if (shown < POSTS.length) setTimeout(addPost, 1800);
  }

  const commObs = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) { addPost(); commObs.disconnect(); }
  }, { threshold: 0.3 });

  commObs.observe(feed);
}

/* ─── NEWS FEED DEMO ─────────────────────────────── */
const NEWS_ITEMS = [
  { cat: 'SANCTIONS', catClass: 'cat--sanctions', title: 'US Treasury Issues New General License for Iranian Agri-Trade', meta: '2 hours ago · Rising Lions Intelligence' },
  { cat: 'MARKET', catClass: 'cat--market', title: 'Iranian Saffron Exports Hit 10-Year High Ahead of Sanctions Lift', meta: '5 hours ago · Market Report' },
  { cat: 'GUIDE', catClass: 'cat--guide', title: 'Step-by-Step: Opening a Bank Account to Trade with Iran in 2025', meta: 'Today · Member Guide' },
  { cat: 'INTEL', catClass: 'cat--intel', title: 'Chabahar Port Free Zone: Your Gateway to Iran Without US Sanctions', meta: 'Yesterday · Deep Dive' },
  { cat: 'MARKET', catClass: 'cat--market', title: 'Iran GDP Growth Forecast Revised Up to 6.8% — What It Means for Traders', meta: '2 days ago · Analysis' },
];

function initNews() {
  const feed = document.getElementById('newsFeed');
  if (!feed) return;

  let shown = 0;
  function addNews() {
    if (shown >= NEWS_ITEMS.length) return;
    const n = NEWS_ITEMS[shown++];
    const el = document.createElement('div');
    el.className = 'news-item';
    el.style.animationDelay = `${shown * 0.12}s`;
    el.innerHTML = `
      <span class="news-item__cat ${n.catClass}">${n.cat}</span>
      <div class="news-item__body">
        <div class="news-item__title">${n.title}</div>
        <div class="news-item__meta">${n.meta}</div>
      </div>
    `;
    feed.appendChild(el);
    if (shown < NEWS_ITEMS.length) setTimeout(addNews, 600);
  }

  const newsObs = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) { addNews(); newsObs.disconnect(); }
  }, { threshold: 0.3 });

  newsObs.observe(feed);
}

/* ─── MODAL ──────────────────────────────────────── */
const modal   = document.getElementById('successModal');
const modalMsg = document.getElementById('modalMessage');
const modalClose = document.getElementById('modalClose');

function showModal(msg) {
  modalMsg.textContent = msg;
  modal.classList.add('active');
}

modalClose?.addEventListener('click', () => modal.classList.remove('active'));
document.getElementById('successModal')?.querySelector('.modal__backdrop')?.addEventListener('click', () => modal.classList.remove('active'));

/* ─── FORMS ──────────────────────────────────────── */
document.getElementById('whitepaperForm')?.addEventListener('submit', (e) => {
  e.preventDefault();
  showModal('Your whitepaper is on its way! Check your inbox in the next few minutes.');
  e.target.reset();
});

document.getElementById('freeForm')?.addEventListener('submit', (e) => {
  e.preventDefault();
  showModal('Welcome to Rising Lions! 🦁 You\'re officially on the early bird list. Watch your inbox for launch updates.');
  e.target.reset();
});

document.getElementById('foundersForm')?.addEventListener('submit', (e) => {
  e.preventDefault();
  showModal('🦁 Welcome, Founding Member! We\'ll send payment details and your metal coin shipping form within 24 hours.');
  e.target.reset();
});

/* ─── NAV SMOOTH CLOSE ───────────────────────────── */
document.querySelectorAll('.nav__links a').forEach(a => {
  a.addEventListener('click', () => navLinks?.classList.remove('nav__links--open'));
});

/* ─── INIT ───────────────────────────────────────── */
initDealFlow();
initCommunity();
initNews();
