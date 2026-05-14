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
  const LAUNCH_TS = new Date('2026-05-12T16:00:00Z').getTime(); // 11:00 AM EST = 16:00 UTC
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

// ── FAQ ACCORDION ──
const faqs = [
  { q: 'What is RecurHub?', a: 'RecurHub is an all-in-one affiliate marketing command center purpose-built for promoting recurring-revenue offers. It combines a 5-step campaign builder, drag-drop landing page builder, AI content engine (ads, emails, social posts), lead capture with 13+ autoresponder integrations, and full analytics — all in one dashboard.' },
  { q: 'Who is the target audience?', a: 'Affiliate marketers (beginner to advanced), SaaS offer promoters, digital product sellers, email marketers, and agency owners running affiliate campaigns for clients. Anyone who promotes offers and is tired of juggling 6–10 disconnected tools will buy this instantly.' },
  { q: 'What are the commission rates?', a: '50% across the Front End, OTO 1, and OTO 2 and OTO 3 (Agency + Reseller), and OTO 4.' },
  { q: 'What launch platform is this on?', a: 'RecurHub launches on LaunchPad with standard affiliate cookie tracking, real-time leaderboard, and automatic payouts. Click your affiliate link above to register.' },
  { q: 'Is there a webinar I can promote?', a: 'Yes — a live webinar runs on May 12 at 10:00 AM EST, one hour before cart open. Webinar attendees convert at significantly higher rates, so build your pre-launch emails around it. Registration link is in the JV Doc.' },
  { q: 'When does the cart close?', a: 'The cart closes on May 17, 2026 at 11:59 PM EST. Use scarcity in your final 48-hour emails — closing-day push consistently drives 50% of total commissions.' },
//   { q: 'What marketing materials are available?', a: 'Full JV Doc, 5 email swipe variations (curiosity, benefit, story, urgency, proof), social media copy for 4 platforms, banner ads (728×90, 300×250, 160×600), and a screen-recorded demo video. All linked in the resources section above.' },
  { q: 'How do I contact the JV team?', a: 'Reach out to Himanshu Mehta directly via Microsoft Teams, Facebook, or WhatsApp — details in the Connect section above. Happy to jump on a call to help you plan your promo.' },
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
      <div class="faq-a"><div class="faq-a-inner">${item.a}</div></div>
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
    const answer = btn.nextElementSibling;
    requestAnimationFrame(() => {
      answer.style.maxHeight = answer.scrollHeight + 'px';
    });
  }
}

// ── STICKY NAV ──
const navbar = document.getElementById('navbar');
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.getElementById('nav-links');

function closeNavMenu() {
  navbar.classList.remove('nav-open');
  if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
}

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const isOpen = navbar.classList.toggle('nav-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 992) closeNavMenu();
    });
  });

  document.addEventListener('click', (event) => {
    if (!navbar.classList.contains('nav-open')) return;
    if (!navbar.contains(event.target)) closeNavMenu();
  });
}

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 992) closeNavMenu();
});

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeNavMenu();
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
