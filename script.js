// ====== NAV SOLID ON SCROLL ======
const nav = document.getElementById("nav");
window.addEventListener("scroll", () => {
  nav.classList.toggle("solid", window.scrollY > 80);
});

// ====== HAMBURGER MENU ======
function toggleMenu() {
  const h = document.getElementById("hamburger");
  const m = document.getElementById("mobileMenu");
  h.classList.toggle("open");
  m.classList.toggle("open");
  document.body.style.overflow = m.classList.contains("open") ? "hidden" : "";
}
function closeMenu() {
  document.getElementById("hamburger").classList.remove("open");
  document.getElementById("mobileMenu").classList.remove("open");
  document.body.style.overflow = "";
}

// ====== INTRO CLEANUP ======
setTimeout(() => {
  const intro = document.getElementById("intro");
  if (intro) intro.remove();
}, 5000);

// ====== SCROLL REVEAL ======
const reveals = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add("visible");
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
reveals.forEach(el => observer.observe(el));

// ====== EMBER PARTICLES ======
const canvas = document.getElementById("embers");
const ctx = canvas.getContext("2d");
let W, H, particles = [];

function resize() {
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

class Ember {
  constructor() { this.reset(); this.y = H * Math.random(); }
  reset() {
    this.x = Math.random() * W;
    this.y = H + 10;
    this.size = Math.random() * 2.5 + 0.5;
    this.speedX = (Math.random() - 0.5) * 0.6;
    this.speedY = -(Math.random() * 0.8 + 0.3);
    this.life = 1;
    this.decay = Math.random() * 0.004 + 0.002;
    this.hue = Math.random() > 0.6 ? 35 : 20;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.life -= this.decay;
    if (this.life <= 0 || this.y < -10) this.reset();
  }
  draw() {
    ctx.save();
    ctx.globalAlpha = this.life * 0.7;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `hsl(${this.hue}, 100%, 60%)`;
    ctx.shadowBlur = 6;
    ctx.shadowColor = `hsl(${this.hue}, 100%, 50%)`;
    ctx.fill();
    ctx.restore();
  }
}

for (let i = 0; i < 60; i++) particles.push(new Ember());

function animate() {
  ctx.clearRect(0, 0, W, H);
  particles.forEach(p => { p.update(); p.draw(); });
  requestAnimationFrame(animate);
}
animate();
