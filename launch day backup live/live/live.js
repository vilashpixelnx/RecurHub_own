(function () {
  'use strict';

  /* ── SCROLL REVEAL ───────────────────────────────────── */
  const revealSelectors = [
    '.section-head',
    '.pain-card', '.feat-row', '.marketer-card', '.proof-card', '.story-card',
    '.math-fact', '.ms', '.j-step',
    '.stack-bad', '.stack-good', '.stack-vs',
    '.hero-flow', '.hero-cta-row', '.hero-trust', '.hero-video',
    '.eyebrow', '.hero-h1', '.hero-sub',
    '.intro-split', '.steps4 > .step4',
    '.ptable-wrap', '.ptotal',
    '.guar-wrap', '.price-card', '.stack-box', '.journey',
    '.disc-block', '.disc-foot',
    '.final-h', '.final-sub', '.section-final .btn'
  ];

  const revealEls = document.querySelectorAll(revealSelectors.join(','));

  revealEls.forEach(el => {
    el.classList.add('reveal');
  });

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.08,
      rootMargin: '0px 0px -40px 0px'
    });

    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('is-visible'));
  }

  /* ── STICKY HEADER OPTIMIZED ─────────────────────────── */
//   const header = document.querySelector('.announce');

//   if (header) {
//     let ticking = false;
//     let lastState = false;

//     window.addEventListener('scroll', () => {
//       if (!ticking) {
//         requestAnimationFrame(() => {

//           const visible = window.scrollY > 500;

//           if (visible !== lastState) {
//             header.classList.toggle('header-visible', visible);
//             lastState = visible;
//           }

//           ticking = false;

//         });

//         ticking = true;
//       }
//     }, { passive: true });
//   }
const offerBar = document.getElementById("offerBar");

        const offerBarToggle = document.getElementById("offerBarToggle");

        const offerBarPeek = document.getElementById("offerBarPeek");

        if (!offerBar) return;

        let manuallyHidden = false;
        let ticking = false;

        const syncOfferBar = () => {
          const shouldShow = !manuallyHidden && window.scrollY > 260;
          const bodyOffset = shouldShow ? `${Math.ceil(offerBar.getBoundingClientRect().height)}px` : '0px';

          offerBar.classList.toggle("is-visible", shouldShow);

          offerBar.classList.toggle("is-collapsed", manuallyHidden);
          document.body.style.setProperty('--offer-bar-offset', bodyOffset);

          if (offerBarPeek) {
            offerBarPeek.classList.toggle("show", manuallyHidden);
          }
        };

        syncOfferBar();

        window.addEventListener(
          "scroll",
          () => {
            if (!ticking) {
              requestAnimationFrame(() => {
                syncOfferBar();

                ticking = false;
              });

              ticking = true;
            }
          },
          { passive: true },
        );

        if (offerBarToggle) {
          offerBarToggle.addEventListener(
            "click",
            () => {
              manuallyHidden = true;

              syncOfferBar();
            },
            { passive: true },
          );
        }

        if (offerBarPeek) {
          offerBarPeek.addEventListener(
            "click",
            () => {
              manuallyHidden = false;

              syncOfferBar();
            },
            { passive: true },
          );
        }

  /* ── HERO STRIPES ────────────────────────────────────── */
  const heroStripes = document.getElementById('heroStripes');

  if (heroStripes && !heroStripes.children.length) {
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < 24; i++) {
      const col = document.createElement('div');
      col.className = 'hero-figma-col';
      fragment.appendChild(col);
    }

    heroStripes.appendChild(fragment);
  }

  /* ── FAQ ACCORDION ───────────────────────────────────── */
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-q');

    if (!btn) return;

    btn.setAttribute('aria-expanded', 'false');

    btn.addEventListener('click', e => {
      e.preventDefault();

      const isOpen = item.classList.contains('open');

      faqItems.forEach(other => {
        if (other !== item) {
          other.classList.remove('open');

          const otherBtn = other.querySelector('.faq-q');
          if (otherBtn) {
            otherBtn.setAttribute('aria-expanded', 'false');
          }
        }
      });

      item.classList.toggle('open', !isOpen);
      btn.setAttribute('aria-expanded', String(!isOpen));

    }, { passive: true });
  });

  /* ── TIMER ───────────────────────────────────────────── */
   const timerEl = document.getElementById('topTimer');
  if (timerEl) {
    const CYCLE_MS   = 4 * 60 * 60 * 1000; // 4 hours
    const ANCHOR_UTC = 15 * 3600 * 1000;    // 15:00 UTC = 8:30 PM IST

    const pad = n => String(n).padStart(2, '0');

    const tick = () => {
      const now     = Date.now();
      const elapsed = ((now - ANCHOR_UTC) % CYCLE_MS + CYCLE_MS) % CYCLE_MS;
      const diff    = CYCLE_MS - elapsed;
      const h = Math.floor(diff / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      timerEl.textContent = `${pad(h)}:${pad(m)}:${pad(s)}`;
    };

    tick();
    function runTimer() { tick(); setTimeout(runTimer, 1000); }
    runTimer();
  }

  /* ── SMOOTH SCROLL ───────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(link => {

    const href = link.getAttribute('href');

    if (!href || href === '#' || href.length < 2) return;

    link.addEventListener('click', e => {

      const target = document.querySelector(href);

      if (target) {
        e.preventDefault();
 const targetTop = target.getBoundingClientRect().top + window.scrollY;
        document.querySelectorAll('.reveal:not(.is-visible)').forEach(el => {
          const elTop = el.getBoundingClientRect().top + window.scrollY;
          if (elTop <= targetTop) {
            el.classList.add('is-visible');
          }
        });
 
        // Wait one frame for the DOM to reflow, then scroll to the correct position.
        requestAnimationFrame(() => {
          const offsetTop = target.getBoundingClientRect().top + window.scrollY;
          window.scrollTo({ top: offsetTop, behavior: 'smooth' });
        });
      }
 
    });
        
  });

  /* ── MARQUEE HOVER ───────────────────────────────────── */
  document.querySelectorAll('.m-row').forEach(row => {

    const tracks = row.querySelectorAll('.m-track');

    row.addEventListener('mouseenter', () => {
      tracks.forEach(t => {
        t.style.animationPlayState = 'paused';
      });
    }, { passive: true });

    row.addEventListener('mouseleave', () => {
      tracks.forEach(t => {
        t.style.animationPlayState = 'running';
      });
    }, { passive: true });

  });
  
  window.addEventListener('load', () => {

  requestIdleCallback?.(() => {

    const iframes = document.querySelectorAll('.lazy-vimeo');

    iframes.forEach(iframe => {

      const src = iframe.dataset.src;

      if (!src) return;

      iframe.src = src;

    });

  });

});

})();