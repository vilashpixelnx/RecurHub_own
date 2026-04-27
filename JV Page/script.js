// RecurHub JV Page — Script

// ── LUCIDE ICONS ──
lucide.createIcons();

// ── SCROLL REVEAL ──
(function () {
  // Elements to reveal individually
  const solo = [
    '.section-tag', '.section-title', '.section-sub',
    '.hero-cta', '.hero-sub',
    '.cta-card', '.cta-card-title',
    '.product-cover', '.product-text',
    '.step-block', '.timeline-item',
    '.feature-card', '.stat-card',
    '.funnel-block', '.prize-card', '.prize-total-banner',
    '.video-slot',
    '.reciprocate-img', '.reciprocate-quote',
    '.connect-card',
    '.faq-item',
    '.footer-inner',
    '.countdown-wrap',
  ].join(', ');

  document.querySelectorAll(solo).forEach((el, i) => {
    el.classList.add('reveal');

    // Stagger siblings in the same grid/row
    const parent = el.parentElement;
    const siblings = parent ? [...parent.children].filter(c => c.classList.contains(el.classList[0])) : [];
    const idx = siblings.indexOf(el);
    if (idx > 0) el.style.transitionDelay = `${idx * 0.08}s`;
  });

  // Hero pill rows — stagger each pill
  document.querySelectorAll('.hero-pill').forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${i * 0.07}s`;
  });

  // AI logos — stagger
  document.querySelectorAll('.ai-logo-wrap').forEach((el, i) => {
    el.classList.add('reveal', 'reveal-scale');
    el.style.transitionDelay = `${i * 0.06}s`;
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
})();

// ── COUNTDOWN TO CART OPEN — May 5, 2026 · 11:00 AM EST ──
(function () {
  const LAUNCH_TS = new Date('2026-05-05T16:00:00Z').getTime(); // 11:00 AM EST = 16:00 UTC
  const root = document.getElementById('countdown');
  if (!root) return;

  const els = {
    days:  root.querySelector('[data-cd="days"]'),
    hours: root.querySelector('[data-cd="hours"]'),
    mins:  root.querySelector('[data-cd="mins"]'),
    secs:  root.querySelector('[data-cd="secs"]'),
  };
  const pad = (n) => String(Math.max(0, n)).padStart(2, '0');

  function tick() {
    const now  = Date.now();
    const diff = LAUNCH_TS - now;
    if (diff <= 0) {
      els.days.textContent  = '00';
      els.hours.textContent = '00';
      els.mins.textContent  = '00';
      els.secs.textContent  = '00';
      const label = document.querySelector('.countdown-label');
      if (label) label.innerHTML = '<i data-lucide="zap"></i> Cart Is Live!';
      lucide.createIcons();
      return;
    }
    const d = Math.floor(diff / 86_400_000);
    const h = Math.floor((diff % 86_400_000) / 3_600_000);
    const m = Math.floor((diff % 3_600_000) / 60_000);
    const s = Math.floor((diff % 60_000) / 1000);
    els.days.textContent  = pad(d);
    els.hours.textContent = pad(h);
    els.mins.textContent  = pad(m);
    els.secs.textContent  = pad(s);
  }
  tick();
  setInterval(tick, 1000);
})();

// ── STEP CONNECTOR ARROWS ──
function drawStepConnector() {
  const flow  = document.querySelector('.steps-flow');
  const cards = flow.querySelectorAll('.step-block');
  if (cards.length < 3) return;

  const old = document.getElementById('step-connector');
  if (old) old.remove();

  const fr = flow.getBoundingClientRect();
  const c1 = cards[0].getBoundingClientRect();
  const c2 = cards[1].getBoundingClientRect();
  const c3 = cards[2].getBoundingClientRect();
  const W  = fr.width;
  const H  = fr.height;

  const svgNS = 'http://www.w3.org/2000/svg';
  const svg   = document.createElementNS(svgNS, 'svg');
  svg.id = 'step-connector';
  svg.setAttribute('style', `position:absolute;top:0;left:0;width:${W}px;height:${H}px;pointer-events:none;z-index:10;overflow:visible;`);

  // Shared defs (marker + glow) used by both mobile and desktop paths
  const sharedDefs = `
    <marker id="arr" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
      <path d="M1,1 L7,4 L1,7" stroke="#F072AF" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    </marker>
    <filter id="aglow">
      <feGaussianBlur stdDeviation="2" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>`;

  if (window.innerWidth <= 768) {
    // ── Mobile: simple vertical downward arrows centred between cards ──
    const cx  = W / 2;
    const m1y1 = c1.bottom - fr.top + 8;
    const m1y2 = c2.top    - fr.top - 8;
    const m2y1 = c2.bottom - fr.top + 8;
    const m2y2 = c3.top    - fr.top - 8;

    svg.innerHTML = `
      <defs>
        ${sharedDefs}
        <linearGradient id="mg1" x1="${cx}" y1="${m1y1}" x2="${cx}" y2="${m1y2}" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stop-color="#771AFF" stop-opacity="0"/>
          <stop offset="40%"  stop-color="#771AFF" stop-opacity="0.55"/>
          <stop offset="100%" stop-color="#F072AF" stop-opacity="1"/>
        </linearGradient>
        <linearGradient id="mg2" x1="${cx}" y1="${m2y1}" x2="${cx}" y2="${m2y2}" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stop-color="#771AFF" stop-opacity="0"/>
          <stop offset="40%"  stop-color="#771AFF" stop-opacity="0.55"/>
          <stop offset="100%" stop-color="#F072AF" stop-opacity="1"/>
        </linearGradient>
      </defs>
      <path d="M ${cx},${m1y1} L ${cx},${m1y2}"
        stroke="url(#mg1)" stroke-width="2" stroke-dasharray="6 4" fill="none"
        stroke-linecap="round" filter="url(#aglow)" marker-end="url(#arr)"/>
      <path d="M ${cx},${m2y1} L ${cx},${m2y2}"
        stroke="url(#mg2)" stroke-width="2" stroke-dasharray="6 4" fill="none"
        stroke-linecap="round" filter="url(#aglow)" marker-end="url(#arr)"/>
    `;

  } else {
    // ── Desktop: zigzag curved arrows ──
    const a1x1 = c1.left + c1.width  * 0.25 - fr.left;
    const a1y1 = c1.bottom - fr.top + 8;
    const a1y2 = c2.top  + c2.height * 0.3  - fr.top;
    const a1x2 = c2.left - fr.left   - 8;

    const a2x1 = c2.left + c2.width  * 0.75 - fr.left;
    const a2y1 = c2.bottom - fr.top + 8;
    const a2y2 = c3.top  + c3.height * 0.3  - fr.top;
    const a2x2 = c3.right - fr.left  + 8;

    svg.innerHTML = `
      <defs>
        ${sharedDefs}
        <linearGradient id="ag1" x1="${a1x1}" y1="${a1y1}" x2="${a1x2}" y2="${a1y2}" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stop-color="#771AFF" stop-opacity="0"/>
          <stop offset="30%"  stop-color="#771AFF" stop-opacity="0.55"/>
          <stop offset="100%" stop-color="#F072AF" stop-opacity="1"/>
        </linearGradient>
        <linearGradient id="ag2" x1="${a2x1}" y1="${a2y1}" x2="${a2x2}" y2="${a2y2}" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stop-color="#771AFF" stop-opacity="0"/>
          <stop offset="30%"  stop-color="#771AFF" stop-opacity="0.55"/>
          <stop offset="100%" stop-color="#F072AF" stop-opacity="1"/>
        </linearGradient>
      </defs>
      <path d="M ${a1x1},${a1y1} C ${a1x1},${a1y1+(a1y2-a1y1)*0.7} ${a1x1+(a1x2-a1x1)*0.4},${a1y2} ${a1x2},${a1y2}"
        stroke="url(#ag1)" stroke-width="2" stroke-dasharray="6 4" fill="none"
        stroke-linejoin="round" stroke-linecap="round"
        filter="url(#aglow)" marker-end="url(#arr)"/>
      <path d="M ${a2x1},${a2y1} C ${a2x1},${a2y1+(a2y2-a2y1)*0.7} ${a2x1+(a2x2-a2x1)*0.4},${a2y2} ${a2x2},${a2y2}"
        stroke="url(#ag2)" stroke-width="2" stroke-dasharray="6 4" fill="none"
        stroke-linejoin="round" stroke-linecap="round"
        filter="url(#aglow)" marker-end="url(#arr)"/>
    `;
  }

  flow.appendChild(svg);
}

window.addEventListener('load', drawStepConnector);
let _arrowResizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(_arrowResizeTimer);
  _arrowResizeTimer = setTimeout(drawStepConnector, 150);
});

// ── FAQ ACCORDION ──
const faqs = [
  { q: 'What is RecurHub?', a: 'RecurHub is an all-in-one affiliate marketing command center purpose-built for promoting recurring-revenue offers. It combines a 5-step campaign builder, drag-drop landing page builder, AI content engine (ads, emails, social posts), lead capture with 13+ autoresponder integrations, and full analytics — all in one dashboard.' },
  { q: 'Who is the target audience?', a: 'Affiliate marketers (beginner to advanced), SaaS offer promoters, digital product sellers, email marketers, and agency owners running affiliate campaigns for clients. Anyone who promotes offers and is tired of juggling 6–10 disconnected tools will buy this instantly.' },
  { q: 'What are the commission rates?', a: '50% across the Front End, OTO 1, and OTO 2. 40% on OTO 3 (Agency + Reseller) due to its higher price point. Every downsell also pays 50%.' },
  { q: 'What launch platform is this on?', a: 'RecurHub launches on LaunchPad with standard affiliate cookie tracking, real-time leaderboard, and automatic payouts. Click your affiliate link above to register.' },
  { q: 'Is there a webinar I can promote?', a: 'Yes — a live webinar runs on May 5 at 10:00 AM EST, one hour before cart open. Webinar attendees convert at significantly higher rates, so build your pre-launch emails around it. Registration link is in the JV Doc.' },
  { q: 'When does the cart close?', a: 'The cart closes on May 10, 2026 at 11:59 PM EST. Use scarcity in your final 48-hour emails — closing-day push consistently drives 30–40% of total commissions.' },
  { q: 'What marketing materials are available?', a: 'Full JV Doc, 5 email swipe variations (curiosity, benefit, story, urgency, proof), social media copy for 4 platforms, banner ads (728×90, 300×250, 160×600), and a screen-recorded demo video. All linked in the resources section above.' },
  { q: 'How do I contact the JV team?', a: 'Reach out to Vivek Gour directly via Microsoft Teams, Facebook, or WhatsApp — details in the Connect section above. Happy to jump on a call to help you plan your promo.' },
];

const faqList = document.getElementById('faq-list');
// Inline SVG icons — perfectly centered, no baseline issues
const FAQ_ICON_PLUS  = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>';
const FAQ_ICON_CLOSE = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';

if (faqList) {
  faqs.forEach((item) => {
    const el = document.createElement('div');
    el.className = 'faq-item';
    el.innerHTML = `
      <button class="faq-q" aria-expanded="false" onclick="toggleFaq(this)">
        <span>${item.q}</span>
        <span class="faq-icon">${FAQ_ICON_PLUS}</span>
      </button>
      <div class="faq-a">${item.a}</div>
    `;
    faqList.appendChild(el);
  });
}

function toggleFaq(btn) {
  const isOpen = btn.getAttribute('aria-expanded') === 'true';
  document.querySelectorAll('.faq-q').forEach(b => {
    b.setAttribute('aria-expanded', 'false');
    b.querySelector('.faq-icon').innerHTML = FAQ_ICON_PLUS;
    b.nextElementSibling.style.maxHeight = null;
  });
  if (!isOpen) {
    btn.setAttribute('aria-expanded', 'true');
    btn.querySelector('.faq-icon').innerHTML = FAQ_ICON_CLOSE;
    btn.nextElementSibling.style.maxHeight = btn.nextElementSibling.scrollHeight + 'px';
  }
}

// ── STICKY NAV ──
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ── TOAST ──
function showToast(msg) {
  let toast = document.getElementById('geo-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'geo-toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add('toast-show');
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove('toast-show'), 3000);
}

// ── COMING SOON LINKS ──
document.querySelectorAll('.cta-resource-card[href="#"], .nav-coming-soon').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    showToast('Coming soon — check back closer to launch!');
  });
});

// ── SMOOTH SCROLL ──
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
