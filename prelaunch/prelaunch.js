/* ══════════════════════════════════════════════════════════════
   RecurHub Prelaunch Page — Interactions
   ══════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ── SCROLL REVEAL ────────────────────────────────────────── */
  const revealEls = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -32px 0px' });

    revealEls.forEach(el => {
      /* Stagger cards within the same grid parent */
      const parent = el.parentElement;
      const siblings = Array.from(parent.querySelectorAll(':scope > .reveal'));
      const idx = siblings.indexOf(el);
      if (idx > 0 && siblings.length > 1) {
        el.style.transitionDelay = `${idx * 80}ms`;
      }
      io.observe(el);
    });
  } else {
    revealEls.forEach(el => el.classList.add('is-visible'));
  }

  /* ── NAV SCROLL STATE ─────────────────────────────────────── */
  const nav = document.querySelector('.nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 56);
    }, { passive: true });
  }

  /* ── SMOOTH SCROLL for anchor links ──────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    const href = link.getAttribute('href');
    if (!href || href === '#' || href.length < 2) return;
    link.addEventListener('click', e => {
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.scrollY - 84;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ── FAQ ACCORDION ────────────────────────────────────────── */
  document.querySelectorAll('.faq-q').forEach(btn => {
    btn.addEventListener('click', () => {
      const isOpen = btn.getAttribute('aria-expanded') === 'true';

      /* Close all */
      document.querySelectorAll('.faq-q').forEach(other => {
        other.setAttribute('aria-expanded', 'false');
        const a = other.nextElementSibling;
        if (a) a.hidden = true;
      });

      /* Toggle clicked */
      if (!isOpen) {
        btn.setAttribute('aria-expanded', 'true');
        const answer = btn.nextElementSibling;
        if (answer) answer.hidden = false;
      }
    });
  });

  /* ── FORM SUBMIT ──────────────────────────────────────────── */
  const form = document.getElementById('waitlistForm');
  const successEl = document.getElementById('formSuccess');

  if (form && successEl) {
    form.addEventListener('submit', e => {
      e.preventDefault();

      const nameEl  = form.querySelector('[name="name"]');
      const emailEl = form.querySelector('[name="email"]');
      let valid = true;

      /* Validate name */
      if (!nameEl.value.trim()) {
        nameEl.classList.add('error');
        valid = false;
      }
      /* Validate email */
      const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRe.test(emailEl.value.trim())) {
        emailEl.classList.add('error');
        valid = false;
      }

      if (!valid) return;

      /* Loading state */
      const submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.querySelector('.btn-label').textContent = 'Securing your spot…';
      }

      /* Simulate API call — replace with real endpoint */
      setTimeout(() => {
        form.hidden = true;
        successEl.hidden = false;
        successEl.style.opacity = '0';
        successEl.style.transform = 'translateY(10px)';
        successEl.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        requestAnimationFrame(() => {
          successEl.style.opacity = '1';
          successEl.style.transform = 'translateY(0)';
        });
      }, 900);
    });

    /* Clear error state on input */
    form.querySelectorAll('input').forEach(input => {
      input.addEventListener('input', () => input.classList.remove('error'));
    });
  }

  /* ── SPOTS BAR ANIMATION ──────────────────────────────────── */
  const spotsFill = document.querySelector('.spots-fill');
  if (spotsFill) {
    if ('IntersectionObserver' in window) {
      const barIO = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
          spotsFill.classList.add('animate');
          barIO.disconnect();
        }
      }, { threshold: 0.6 });
      barIO.observe(spotsFill);
    } else {
      spotsFill.classList.add('animate');
    }
  }

  /* ── VIDEO PLACEHOLDER CLICK ──────────────────────────────── */
  const placeholder = document.getElementById('videoPlaceholder');
  if (placeholder) {
    placeholder.addEventListener('click', () => {
      /* Swap placeholder for actual iframe when video URL is set */
      const videoInner = placeholder.parentElement;
      const iframeSrc = ''; /* <-- set your YouTube embed URL here */

      if (!iframeSrc) {
        /* No video yet — pulse the play button as feedback */
        const playBtn = placeholder.querySelector('.vp-play');
        if (playBtn) {
          playBtn.style.transform = 'scale(0.92)';
          setTimeout(() => { playBtn.style.transform = ''; }, 120);
        }
        return;
      }

      const iframe = document.createElement('iframe');
      iframe.src = iframeSrc + '&autoplay=1';
      iframe.title = 'RecurHub Demo';
      iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
      iframe.allowFullscreen = true;
      iframe.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;border:none;';
      placeholder.replaceWith(iframe);
    });
  }

})();
