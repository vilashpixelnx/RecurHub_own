(function () {
  'use strict';

  /* ── SCROLL-REVEAL ──────────────────────────────────────── */
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

  /* ── STICKY HEADER (NEW) ───────────────────────────────── */
//   const header = document.querySelector(".rec-header-wrapper");

//   if (header) {
//     window.addEventListener("scroll", () => {
//       const scrollTop = window.scrollY;

//       if (scrollTop > 300) {
//         header.classList.add("header-visible");
//       } else {
//         header.classList.remove("header-visible");
//       }
//     });
//   }

//   /* ── STICKY OFFER BAR ───────────────────────────────────── */
//   const offerBar = document.getElementById('offerBar');
//   const offerBarToggle = document.getElementById('offerBarToggle');
//   const offerBarPeek = document.getElementById('offerBarPeek');
//   if (offerBar) {
//     let manuallyHidden = false;

//     const syncOfferBar = () => {
//       const shouldShow = !manuallyHidden && window.scrollY > 260;
//       const bodyOffset = shouldShow ? `${Math.ceil(offerBar.getBoundingClientRect().height)}px` : '0px';

//       offerBar.classList.toggle('is-visible', shouldShow);
//       offerBar.classList.toggle('is-collapsed', manuallyHidden);
//       document.body.style.setProperty('--offer-bar-offset', bodyOffset);

//       if (offerBarPeek) {
//         offerBarPeek.classList.toggle('show', manuallyHidden);
//       }
//       if (offerBarToggle) {
//         offerBarToggle.classList.toggle('is-collapsed', manuallyHidden);
//         offerBarToggle.setAttribute('aria-pressed', String(manuallyHidden));
//         offerBarToggle.setAttribute(
//           'aria-label',
//           manuallyHidden ? 'Show offer bar' : 'Hide offer bar'
//         );
//       }
//     };

//     const updateOfferBar = () => {
//       syncOfferBar();
//     };

//     updateOfferBar();
//     window.addEventListener('scroll', updateOfferBar, { passive: true });
//     window.addEventListener('resize', updateOfferBar);

//     if (offerBarToggle) {
//       offerBarToggle.addEventListener('click', () => {
//         manuallyHidden = true;
//         syncOfferBar();
//       });
//     }

//     if (offerBarPeek) {
//       offerBarPeek.addEventListener('click', () => {
//         manuallyHidden = false;
//         syncOfferBar();
//       });
//     }
//   }
  /* ── STICKY HEADER OPTIMIZED ─────────────────────────── */
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

  /* ── FAQ ACCORDION ─────────────────────────────────────── */
  const buyTarget = document.querySelector('.buy_btn');
  if (buyTarget) {
    document.querySelectorAll('.nav-cta-btn, .hero-cta-primary, .buy_btn').forEach(cta => {
      if (cta === buyTarget) return;
      cta.addEventListener('click', e => {
        e.preventDefault();
        buyTarget.scrollIntoView({ behavior: 'smooth', block: 'center' });
      });
    });
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

  /* ── PAUSE MARQUEE ON HOVER ───────────────────────────── */
  document.querySelectorAll('.m-row').forEach(row => {
    const tracks = row.querySelectorAll('.m-track');

    row.addEventListener('mouseenter', () => {
      tracks.forEach(t => t.style.animationPlayState = 'paused');
    });

    row.addEventListener('mouseleave', () => {
      tracks.forEach(t => t.style.animationPlayState = 'running');
    });
  });

})();

