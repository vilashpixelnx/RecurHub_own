/*--------------------- Copyright (c) 2025 -----------------------
[Master Javascript]
Project: AiSales Navigator
Version: 1.0.0
-------------------------------------------------------------------*/
(function ($) {
  "use strict";
  /*-----------------------------------------------------
      Function  Start
  -----------------------------------------------------*/
  var aisales = {
    initialised: false,
    version: 1.0,
    mobile: false,
    init: function () {
      if (!this.initialised) {
        this.initialised = true;
      } else {
        return;
      }
      /*-----------------------------------------------------
          Function Calling
      -----------------------------------------------------*/
      this.menu_toggle();
      this.loader();
      this.TemplateLoadMore();
    },
    /*-----------------------------------------------------
        menu Toggle
    -----------------------------------------------------*/
    menu_toggle: function () {
      $('.ai_mobile_toggle').on('click', function () {
        $('body').toggleClass('menu_toggle');
        $('body').toggleClass('default_class');
      });
      if ($(window).width() < 1799 && $(window).width() > 1200) {
        $('body').addClass('menu_toggle');
      }
    },
    /*-----------------------------------------------------
        Loader
    -----------------------------------------------------*/
    loader: function () {
      $(window).on('load', function () {
        $(".ai_loader").delay(100).fadeOut("slow");
        $(".ai_loaderInner").delay(200).fadeOut("slow");
      });
    },

    // Load More
    TemplateLoadMore: function () {
      $('.aa_template_btn').on('click', function () {
        $('.aa_template_main').addClass('show');
      })
    },
    // Load More

  };
  aisales.init();
})(jQuery);
$(document).ready(function () {
  $(window).on("scroll", function () {
    if ($(window).scrollTop() > 0) {
      $("body").addClass("scrolled");
    } else {
      $("body").removeClass("scrolled");
    }
  });
  // Select all accordion buttons
  const accordionButtons = document.querySelectorAll('.accordion-button');
  accordionButtons.forEach(button => {
    button.addEventListener('click', function () {
      if (this.classList.contains('isActiveAccordian')) {
        // If the button has the class, remove it
        this.classList.remove('isActiveAccordian');
      } else {
        // Otherwise, add the class and remove it from others
        accordionButtons.forEach(btn => btn.classList.remove('isActiveAccordian')); // Optional: To keep only one active
        this.classList.add('isActiveAccordian');
      }
    });
  });
  var swiperGallery = new Swiper(".aa_meargImageGallery", {
    slidesPerView: 6,
    loop: true,
    centeredSlides: true,
    spaceBetween: 5,
    pagination: {
      el: ".swiper-pagination",
      clickable: true
    },
    speed: 5000,
    autoplay: {
      delay: 0,
      enabled: true,
    },
    breakpoints: {
      // when window width is >= 320px
      320: {
        slidesPerView: 3,
        spaceBetween: 5
      },
      // when window width is >= 480px
      480: {
        slidesPerView: 4,
        spaceBetween: 5
      },
      // when window width is >= 640px
      640: {
        slidesPerView: 5,
        spaceBetween: 5
      },
      750: {
        slidesPerView: 6,
        spaceBetween: 5
      }
    }
  });
});
console.clear();
const cardsContainer = document.querySelector(".cards");
const cardsContainerInner = document.querySelector(".cards__inner");
const cards = Array.from(document.querySelectorAll(".card"));
const overlay = document.querySelector(".overlay");
const applyOverlayMask = (e) => {
  const overlayEl = e.currentTarget;
  const x = e.pageX - cardsContainer.offsetLeft;
  const y = e.pageY - cardsContainer.offsetTop;
  overlayEl.style = `--opacity: 1; --x: ${x}px; --y:${y}px;`;
};
const createOverlayCta = (overlayCard, ctaEl) => {
  const overlayCta = document.createElement("div");
  overlayCta.classList.add("cta");
  overlayCta.textContent = ctaEl.textContent;
  overlayCta.setAttribute("aria-hidden", true);
  overlayCard.append(overlayCta);
};
const observer = new ResizeObserver((entries) => {
  entries.forEach((entry) => {
    const cardIndex = cards.indexOf(entry.target);
    let width = entry.borderBoxSize[0].inlineSize;
    let height = entry.borderBoxSize[0].blockSize;
    if (cardIndex >= 0) {
      overlay.children[cardIndex].style.width = `${width}px`;
      overlay.children[cardIndex].style.height = `${height}px`;
    }
  });
});
const initOverlayCard = (cardEl) => {
  const overlayCard = document.createElement("div");
  overlayCard.classList.add("card");
  createOverlayCta(overlayCard, cardEl.lastElementChild);
  overlay.append(overlayCard);
  observer.observe(cardEl);
};
cards.forEach(initOverlayCard);
document.body.addEventListener("pointermove", applyOverlayMask);

/* REVISED DUST EFFECT POC */
let canvas = document.getElementById('bodyParticalCanvas');
let ctx = canvas.getContext('2d');
let width = window.innerWidth;
let height = window.innerHeight;
class Particle {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.vx = 0;
    this.vy = 0;
    this.accelX = 0;
    this.accelY = 0;
    this.life = 2000;
    this.alpha = 1;
    this.size = 2;
  }
  update() {
    this.vx += this.accelX;
    this.vy += this.accelY;
    this.x += this.vx;
    this.y += this.vy;
  }
  draw(ctx) {
    ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
  }
  isAlive() {
    return this.life >= 0;
  }
}
class ParticleSystem {
  constructor() {
    this.particles = [];
    this.updateHandler = undefined;
  }
  addParticle(particle) {
    this.particles.push(particle);
  }
  update(deltaTime = 0) {
    this.particles.forEach(particle => {
      particle.update(deltaTime);
      this.updateHandler && this.updateHandler(particle);
    });
  }
  onUpdate(fn) {
    this.updateHandler = fn;
  }
}
let system = new ParticleSystem();
for (let i = 0; i < 200; i++) {
  let particle = new Particle();
  let angle = Math.PI / 2 * (Math.random() - 0.5) * 2;
  particle.x = Math.random() * width;
  particle.y = Math.random() * height;
  particle.life = Math.random() * 10000 + 10000;
  particle.size = Math.random() * 0.9;
  particle.maxLife = particle.life;
  system.addParticle(particle);
}
system.onUpdate((particle) => {
  if (!particle.isAlive()) {
    particle.x = Math.random() * width;
    particle.y = Math.random() * height;
    particle.vx = 0;
    particle.vy = 0;
    particle.life = Math.random() * 10000 + 10000;
    particle.maxLife = particle.life;
  }
  particle.life -= 10;
  particle.accelX = (Math.random() - 0.5) * 0.02;
  particle.accelY = (Math.random() - 0.5) * 0.02;
  if (particle.life >= particle.maxLife / 2) {
    particle.alpha = 1 - (particle.life / particle.maxLife);
  } else {
    particle.alpha = particle.life / particle.maxLife;
  }
  particle.update();
});


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
function update() {
  system.update();
}
function draw() {
  ctx.globalCompositeOperation = 'source-over';
  ctx.fillStyle = 'transparent';
  ctx.fillRect(0, 0, width, height);
  let grad = ctx.createRadialGradient(width / 2, height / 2, 0, width / 2, height / 2, width);
  grad.addColorStop(0, '#090113');
  grad.addColorStop(0.75, 'transparent');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, width, height);
  ctx.globalCompositeOperation = 'lighter';
  ctx.fillStyle = 'transparent';
  system.particles.forEach(particle => particle.draw(ctx));
}
function render() {
  update();
  draw();
  requestAnimationFrame(render);
}
function setup() {
  canvas.width = width;
  canvas.height = height;
}
function init() {
  setup();
  render();
}
init();