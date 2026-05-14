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
    ctx.arc(this.x, this.y, this.size, 0, Math.PI*2);
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
  let angle = Math.PI/2 * (Math.random() - 0.5) * 2;
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
function update() {
  system.update();
}
function draw() {
  ctx.globalCompositeOperation = 'source-over';
  ctx.fillStyle = 'transparent';
  ctx.fillRect(0, 0, width, height);
  let grad = ctx.createRadialGradient(width / 2, height / 2, 0, width / 2, height/2, width);
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