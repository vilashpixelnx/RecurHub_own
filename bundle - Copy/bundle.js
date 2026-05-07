/* ══════════════════════════════════════════════════════════════
   RecurHub Bundle Page — Interactions
   ══════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ── NAV SCROLL STATE ───────────────────────────────────── */
  const nav = document.getElementById('nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 20);
    }, { passive: true });
  }

  /* ── SCROLL-REVEAL ──────────────────────────────────────── */
  const revealEls = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('is-visible'));
  }

  /* ── FAQ ACCORDION ─────────────────────────────────────── */
  document.querySelectorAll('.faq-item').forEach(item => {
    const btn = item.querySelector('.faq-q');
    if (!btn) return;

    btn.addEventListener('click', e => {
      e.preventDefault();
      e.stopPropagation();

      const isOpen = item.classList.contains('open');

      document.querySelectorAll('.faq-item.open').forEach(other => {
        if (other !== item) other.classList.remove('open');
      });

      item.classList.toggle('open', !isOpen);
      btn.setAttribute('aria-expanded', String(!isOpen));
    });

    btn.setAttribute('aria-expanded', 'false');
  });

  /* ── PAUSE MARQUEE ON HOVER ─────────────────────────────── */
  document.querySelectorAll('.m-row').forEach(row => {
    const tracks = row.querySelectorAll('.m-track');
    row.addEventListener('mouseenter', () => {
      tracks.forEach(t => t.style.animationPlayState = 'paused');
    });
    row.addEventListener('mouseleave', () => {
      tracks.forEach(t => t.style.animationPlayState = 'running');
    });
  });

  /* ── SMOOTH SCROLL ─────────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    const href = link.getAttribute('href');
    if (!href || href === '#' || href.length < 2) return;
    link.addEventListener('click', e => {
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

})();
