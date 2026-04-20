// ============================================
//  KONNY ALUCEMA · Portfolio Script
// ============================================

// ── CURSOR PERSONALIZADO ──
const curDot  = document.getElementById('curDot');
const curRing = document.getElementById('curRing');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  curDot.style.left = mx + 'px';
  curDot.style.top  = my + 'px';
});

function animRing() {
  rx += (mx - rx) * 0.14;
  ry += (my - ry) * 0.14;
  curRing.style.left = rx + 'px';
  curRing.style.top  = ry + 'px';
  requestAnimationFrame(animRing);
}
animRing();

document.querySelectorAll('a, button, .plink').forEach(el => {
  el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
  el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
});

document.addEventListener('mouseleave', () => {
  curDot.style.opacity  = '0';
  curRing.style.opacity = '0';
});
document.addEventListener('mouseenter', () => {
  curDot.style.opacity  = '1';
  curRing.style.opacity = '0.7';
});

// ── FOTO PERFIL ──
const profilePic     = document.getElementById('profilePic');
const picPlaceholder = document.getElementById('picPlaceholder');

if (profilePic) {
  const showPlaceholder = () => {
    profilePic.style.display = 'none';
    if (picPlaceholder) picPlaceholder.style.display = 'flex';
  };
  const showPhoto = () => {
    profilePic.style.display = 'block';
    if (picPlaceholder) picPlaceholder.style.display = 'none';
  };
  profilePic.addEventListener('load', showPhoto);
  profilePic.addEventListener('error', showPlaceholder);
  if (profilePic.complete && profilePic.naturalWidth > 0) {
    showPhoto();
  } else {
    showPlaceholder();
  }
}

// ── FONDO ANIMADO DE CÓDIGO ──
(function() {
  const canvas = document.getElementById('bgCanvas');
  const ctx    = canvas.getContext('2d');

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const tokens = [
    'function','const','let','var','return','if','else','for','while',
    'class','extends','import','export','async','await','=>',
    'SELECT','INSERT','UPDATE','DELETE','FROM','WHERE','JOIN',
    '.NET','MySQL','Java','C#','API','REST','JSON','HTTP',
    '{ }','[ ]','( )','</>','null','true','false','void',
    '0x','0b','===','!==','&&','||','++','--',
    'try','catch','throw','new','this','super',
  ];

  const particles = [];
  const PARTICLE_COUNT = 55;

  function randomColor() {
    const colors = [
      'rgba(192,132,252,',
      'rgba(249,168,212,',
      'rgba(45,212,191,',
      'rgba(167,139,192,',
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push({
      x:     Math.random() * window.innerWidth,
      y:     Math.random() * window.innerHeight,
      vy:    0.18 + Math.random() * 0.35,
      vx:    (Math.random() - 0.5) * 0.2,
      token: tokens[Math.floor(Math.random() * tokens.length)],
      size:  10 + Math.random() * 5,
      alpha: 0.04 + Math.random() * 0.1,
      color: randomColor(),
      life:  Math.random() * Math.PI * 2,
    });
  }

  const nodes = [];
  const NODE_COUNT = 18;
  for (let i = 0; i < NODE_COUNT; i++) {
    nodes.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: 2 + Math.random() * 2,
    });
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < nodes.length; i++) {
      const n = nodes[i];
      n.x += n.vx; n.y += n.vy;
      if (n.x < 0 || n.x > canvas.width)  n.vx *= -1;
      if (n.y < 0 || n.y > canvas.height) n.vy *= -1;

      for (let j = i + 1; j < nodes.length; j++) {
        const m = nodes[j];
        const dx = n.x - m.x, dy = n.y - m.y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < 160) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(192,132,252,${(1 - dist/160) * 0.07})`;
          ctx.lineWidth = 0.7;
          ctx.moveTo(n.x, n.y);
          ctx.lineTo(m.x, m.y);
          ctx.stroke();
        }
      }

      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI*2);
      ctx.fillStyle = 'rgba(192,132,252,0.15)';
      ctx.fill();
    }

    particles.forEach(p => {
      p.y += p.vy; p.x += p.vx; p.life += 0.012;
      const pulse = 0.7 + 0.3 * Math.sin(p.life);
      if (p.y > canvas.height + 30) {
        p.y = -20;
        p.x = Math.random() * canvas.width;
        p.token = tokens[Math.floor(Math.random() * tokens.length)];
      }
      if (p.x < -50 || p.x > canvas.width + 50) p.vx *= -1;
      ctx.font = `${p.size}px DM Mono, monospace`;
      ctx.fillStyle = p.color + (p.alpha * pulse) + ')';
      ctx.fillText(p.token, p.x, p.y);
    });

    requestAnimationFrame(draw);
  }
  draw();
})();

// ── NAVBAR SCROLL ──
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// ── NAV MOBILE ──
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');
navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => navLinks.classList.remove('open'))
);

// ── TYPEWRITER ──
const roles = [
  'Full Stack Developer',
  'Backend con .NET Core',
  'Frontend con HTML/CSS/JS',
  'Amante del código limpio →',
];
const typeEl = document.getElementById('typeText');
let ri = 0, ci = 0, del = false;

function type() {
  const cur = roles[ri];
  typeEl.textContent = del ? cur.slice(0, --ci) : cur.slice(0, ++ci);
  if (!del && ci === cur.length) { del = true; setTimeout(type, 1800); return; }
  if (del && ci === 0)           { del = false; ri = (ri+1) % roles.length; }
  setTimeout(type, del ? 42 : 72);
}
type();

// ── REVEAL ON SCROLL ──
const revealEls = document.querySelectorAll(
  '.pcard, .cert, .tl-item, .about-prose, .about-skills, .tl, .chapter, .story-quote'
);

revealEls.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(28px)';
  el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
});

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }, i * 100);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

revealEls.forEach(el => revealObserver.observe(el));

// ── ACTIVE NAV LINK ──
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 140) current = s.id;
  });
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.style.color = a.getAttribute('href') === `#${current}` ? 'var(--rose-pale)' : '';
  });
}, { passive: true });