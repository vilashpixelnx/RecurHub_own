/* ══════════════════════════════════════════════════════════════
   RecurHub Agency Page — Interactions
   ══════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ── SCROLL-REVEAL ──────────────────────────────────────────── */
  const revealSelectors = [
    '.hero-copy', '.hero-visual', '.hero-trust',
    '.sec-head', '.feat-card',
    '.proof-stat',
    '.price-card',
    '.disc-title', '.disc-text', '.disc-promo', '.disc-bottom'
  ];

  const revealEls = document.querySelectorAll(revealSelectors.join(','));
  revealEls.forEach(el => el.classList.add('reveal'));

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

  /* ── STICKY OFFER BAR ───────────────────────────────────── */
  const offerBar = document.getElementById('offerBar');
  const offerBarToggle = document.getElementById('offerBarToggle');
  const offerBarPeek = document.getElementById('offerBarPeek');
  if (offerBar) {
    let manuallyHidden = false;

    const syncOfferBar = () => {
      const shouldShow = !manuallyHidden && window.scrollY > 260;
      const bodyOffset = shouldShow ? `${Math.ceil(offerBar.getBoundingClientRect().height)}px` : '0px';

      offerBar.classList.toggle('is-visible', shouldShow);
      offerBar.classList.toggle('is-collapsed', manuallyHidden);
      document.body.style.setProperty('--offer-bar-offset', bodyOffset);

      if (offerBarPeek) {
        offerBarPeek.classList.toggle('show', manuallyHidden);
      }
      if (offerBarToggle) {
        offerBarToggle.classList.toggle('is-collapsed', manuallyHidden);
        offerBarToggle.setAttribute('aria-pressed', String(manuallyHidden));
        offerBarToggle.setAttribute(
          'aria-label',
          manuallyHidden ? 'Show offer bar' : 'Hide offer bar'
        );
      }
    };

    const updateOfferBar = () => {
      syncOfferBar();
    };

    updateOfferBar();
    window.addEventListener('scroll', updateOfferBar, { passive: true });
    window.addEventListener('resize', updateOfferBar);

    if (offerBarToggle) {
      offerBarToggle.addEventListener('click', () => {
        manuallyHidden = true;
        syncOfferBar();
      });
    }

    if (offerBarPeek) {
      offerBarPeek.addEventListener('click', () => {
        manuallyHidden = false;
        syncOfferBar();
      });
    }
  }
  /* ── SMOOTH SCROLL ─────────────────────────────────────────── */
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
