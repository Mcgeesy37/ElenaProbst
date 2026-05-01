// ============================================
//  Elena Probst – Sprecherin Website
//  app.js
// ============================================

let siteData = null;
let demoFileData = null;  // base64 for new demo
let testFileData = null;  // base64 for new testimonial

// ── LOAD DATA ──────────────────────────────
async function loadData() {
try {
const res = await fetch(‘data.json’);
siteData = await res.json();
} catch (e) {
// Fallback minimal data if running without server
siteData = {
demos: [], testimonials: [], faq: [],
legal: { imprint: ‘<h2>Impressum</h2><p>Bitte ergänzen.</p>’, privacy: ‘<h2>Datenschutz</h2><p>Bitte ergänzen.</p>’ }
};
}
renderAll();
}

function renderAll() {
renderDemos();
renderTestimonials();
renderFAQ();
initReveal();
}

// ── DEMOS ──────────────────────────────────
function renderDemos() {
const grid = document.getElementById(‘demosGrid’);
if (!grid || !siteData.demos) return;
grid.innerHTML = ‘’;
siteData.demos.forEach((demo, i) => {
const card = createDemoCard(demo, i);
grid.appendChild(card);
setTimeout(() => card.classList.add(‘reveal’, ‘visible’), i * 100);
});
}

function createDemoCard(demo, i) {
const card = document.createElement(‘div’);
card.className = ‘demo-card’;
card.style.animationDelay = `${i * 0.1}s`;

let thumbHtml = ‘’;
if (demo.youtube) {
const ytId = extractYouTubeId(demo.youtube);
thumbHtml = ` <div class="demo-card__thumb" onclick="playYoutube(this, '${ytId}')"> <img src="https://img.youtube.com/vi/${ytId}/mqdefault.jpg" alt="${demo.title}" loading="lazy" /> <div class="demo-card__play"><div class="demo-card__play-icon">▶</div></div> </div>`;
} else if (demo.localFile) {
const isVideo = demo.localFile.startsWith(‘data:video’);
thumbHtml = `<div class="demo-card__thumb"> ${isVideo ?`<video src="${demo.localFile}" controls style="width:100%;height:100%;object-fit:cover;"></video>`:`<img src="${demo.localFile}" alt="${demo.title}" /><div class="demo-card__play"><div class="demo-card__play-icon">▶</div></div>` } </div>`;
} else {
thumbHtml = ` <div class="demo-card__thumb demo-card__thumb--placeholder"> <div class="demo-card__play-icon" style="opacity:0.4">▶</div> <p>Kein Media hinterlegt</p> </div>`;
}

card.innerHTML = ` ${thumbHtml} <div class="demo-card__body"> <div class="demo-card__category">${demo.category || ''}</div> <div class="demo-card__title">${demo.title || ''}</div> <div class="demo-card__desc">${demo.description || ''}</div> </div>`;
return card;
}

// ── TESTIMONIALS ───────────────────────────
function renderTestimonials() {
const grid = document.getElementById(‘testimonialsGrid’);
if (!grid || !siteData.testimonials) return;
grid.innerHTML = ‘’;
siteData.testimonials.forEach((t, i) => {
const card = createTestimonialCard(t, i);
grid.appendChild(card);
setTimeout(() => card.classList.add(‘visible’), i * 100);
});
}

function createTestimonialCard(t, i) {
const card = document.createElement(‘div’);
card.className = ‘test-card reveal’;

let thumbHtml = ‘’;
if (t.youtube) {
const ytId = extractYouTubeId(t.youtube);
thumbHtml = ` <div class="test-card__thumb" onclick="playYoutube(this, '${ytId}')"> <img src="https://img.youtube.com/vi/${ytId}/mqdefault.jpg" alt="${t.name}" loading="lazy" /> <div class="test-card__play"><div class="test-card__play-icon">▶</div></div> </div>`;
} else if (t.localFile) {
const isVideo = t.localFile.startsWith(‘data:video’);
thumbHtml = `<div class="test-card__thumb"> ${isVideo ?`<video src="${t.localFile}" controls style="width:100%;height:100%;object-fit:cover;"></video>`:`<img src="${t.localFile}" alt="${t.name}" /><div class="test-card__play"><div class="test-card__play-icon">▶</div></div>` } </div>`;
} else {
thumbHtml = ` <div class="test-card__thumb test-card__thumb--placeholder"> <div class="test-card__play-icon" style="opacity:0.4">▶</div> <p>Kein Video hinterlegt</p> </div>`;
}

card.innerHTML = ` ${thumbHtml} <div class="test-card__body"> <div class="test-card__name">${t.name}</div> <div class="test-card__desc">${t.description}</div> </div>`;
return card;
}

// ── FAQ ────────────────────────────────────
function renderFAQ() {
const container = document.getElementById(‘faqContainer’);
if (!container || !siteData.faq) return;
container.innerHTML = ‘’;
siteData.faq.forEach(item => {
const el = document.createElement(‘div’);
el.className = ‘faq-item’;
el.innerHTML = ` <button class="faq-item__q" onclick="toggleFAQ(this)"> <span>${item.question}</span> <span class="faq-item__arrow">▼</span> </button> <div class="faq-item__a">${item.answer}</div>`;
container.appendChild(el);
});
}

function toggleFAQ(btn) {
const item = btn.parentElement;
const isOpen = item.classList.contains(‘open’);
document.querySelectorAll(’.faq-item.open’).forEach(el => el.classList.remove(‘open’));
if (!isOpen) item.classList.add(‘open’);
}

// ── YOUTUBE HELPER ─────────────────────────
function extractYouTubeId(url) {
const match = url.match(/(?:youtu.be/|youtube.com/(?:watch?v=|embed/|shorts/))([a-zA-Z0-9_-]{11})/);
return match ? match[1] : ‘’;
}

function playYoutube(thumb, ytId) {
if (!ytId) return;
const iframe = document.createElement(‘iframe’);
iframe.className = ‘yt-frame’;
iframe.src = `https://www.youtube.com/embed/${ytId}?autoplay=1`;
iframe.allow = ‘autoplay; encrypted-media’;
iframe.allowFullscreen = true;
thumb.innerHTML = ‘’;
thumb.appendChild(iframe);
}

// ── MODALS ─────────────────────────────────
function openModal(id) {
document.getElementById(id).classList.add(‘open’);
document.getElementById(‘modalOverlay’).classList.add(‘show’);
document.body.style.overflow = ‘hidden’;
}

function closeModal(id) {
document.getElementById(id).classList.remove(‘open’);
const anyOpen = document.querySelectorAll(’.modal.open’).length > 0;
if (!anyOpen) {
document.getElementById(‘modalOverlay’).classList.remove(‘show’);
document.body.style.overflow = ‘’;
}
}

function closeAllModals() {
document.querySelectorAll(’.modal.open’).forEach(m => m.classList.remove(‘open’));
document.getElementById(‘modalOverlay’).classList.remove(‘show’);
document.body.style.overflow = ‘’;
}

// ── ADD DEMO ───────────────────────────────
document.getElementById(‘addDemoBtn’).addEventListener(‘click’, () => {
demoFileData = null;
document.getElementById(‘demoFilePreview’).innerHTML = ‘’;
document.getElementById(‘demoYoutube’).value = ‘’;
document.getElementById(‘demoCategory’).value = ‘’;
document.getElementById(‘demoTitle’).value = ‘’;
document.getElementById(‘demoDesc’).value = ‘’;
openModal(‘addDemoModal’);
});

document.getElementById(‘demoFileInput’).addEventListener(‘change’, function () {
const file = this.files[0];
if (!file) return;
const reader = new FileReader();
reader.onload = e => {
demoFileData = e.target.result;
const preview = document.getElementById(‘demoFilePreview’);
if (file.type.startsWith(‘video/’)) {
preview.innerHTML = `<video src="${demoFileData}" controls></video>`;
} else {
preview.innerHTML = `<img src="${demoFileData}" alt="Vorschau" />`;
}
};
reader.readAsDataURL(file);
});

function saveDemo() {
const category = document.getElementById(‘demoCategory’).value.trim();
const title    = document.getElementById(‘demoTitle’).value.trim();
const desc     = document.getElementById(‘demoDesc’).value.trim();
const youtube  = document.getElementById(‘demoYoutube’).value.trim();

if (!title) { alert(‘Bitte gib einen Titel ein.’); return; }

const newDemo = {
id: Date.now(),
category: category || ‘Demo’,
title,
description: desc,
youtube: youtube || ‘’,
localFile: demoFileData || ‘’
};

siteData.demos.push(newDemo);
renderDemos();
closeModal(‘addDemoModal’);
}

// ── ADD TESTIMONIAL ────────────────────────
document.getElementById(‘addTestimonialBtn’).addEventListener(‘click’, () => {
testFileData = null;
document.getElementById(‘testFilePreview’).innerHTML = ‘’;
document.getElementById(‘testYoutube’).value = ‘’;
document.getElementById(‘testName’).value = ‘’;
document.getElementById(‘testDesc’).value = ‘’;
openModal(‘addTestimonialModal’);
});

document.getElementById(‘testFileInput’).addEventListener(‘change’, function () {
const file = this.files[0];
if (!file) return;
const reader = new FileReader();
reader.onload = e => {
testFileData = e.target.result;
const preview = document.getElementById(‘testFilePreview’);
if (file.type.startsWith(‘video/’)) {
preview.innerHTML = `<video src="${testFileData}" controls></video>`;
} else {
preview.innerHTML = `<img src="${testFileData}" alt="Vorschau" />`;
}
};
reader.readAsDataURL(file);
});

function saveTestimonial() {
const name    = document.getElementById(‘testName’).value.trim();
const desc    = document.getElementById(‘testDesc’).value.trim();
const youtube = document.getElementById(‘testYoutube’).value.trim();

if (!name) { alert(‘Bitte gib einen Namen ein.’); return; }

const newT = {
id: Date.now(),
name,
description: desc,
youtube: youtube || ‘’,
localFile: testFileData || ‘’
};

siteData.testimonials.push(newT);
renderTestimonials();
closeModal(‘addTestimonialModal’);
}

// ── HERO MEDIA UPLOAD ──────────────────────
document.getElementById(‘heroFileInput’).addEventListener(‘change’, function () {
const file = this.files[0];
if (!file) return;
const reader = new FileReader();
reader.onload = e => {
const wrapper = document.getElementById(‘heroMediaWrapper’);
if (file.type.startsWith(‘video/’)) {
wrapper.innerHTML = `<video src="${e.target.result}" controls style="width:100%;height:100%;object-fit:cover;border-radius:14px;"></video>`;
} else {
wrapper.innerHTML = `<img src="${e.target.result}" alt="Hero Bild" style="width:100%;height:100%;object-fit:cover;border-radius:14px;" />`;
}
};
reader.readAsDataURL(file);
});

// ── ABOUT IMAGE UPLOAD ─────────────────────
document.getElementById(‘aboutFileInput’).addEventListener(‘change’, function () {
const file = this.files[0];
if (!file) return;
const reader = new FileReader();
reader.onload = e => {
const wrapper = document.getElementById(‘aboutImgWrapper’);
wrapper.innerHTML = `<img src="${e.target.result}" alt="Elena Probst" style="width:100%;height:100%;object-fit:cover;" />`;
};
reader.readAsDataURL(file);
});

// ── CONTACT AVATAR ─────────────────────────
document.getElementById(‘contactAvatarInput’).addEventListener(‘change’, function () {
const file = this.files[0];
if (!file) return;
const reader = new FileReader();
reader.onload = e => {
const avatar = document.getElementById(‘contactAvatar’);
avatar.innerHTML = `<img src="${e.target.result}" alt="Elena Probst" style="width:100%;height:100%;object-fit:cover;" />`;
};
reader.readAsDataURL(file);
});

// ── FORM SUBMIT ────────────────────────────
function handleFormSubmit(e) {
e.preventDefault();
const name  = document.getElementById(‘formName’).value;
const email = document.getElementById(‘formEmail’).value;
const text  = document.getElementById(‘formText’).value;

// In production: replace with actual email API (EmailJS, Formspree, etc.)
console.log(‘Demo Anfrage:’, { name, email, text });

document.getElementById(‘formSuccess’).style.display = ‘block’;
document.getElementById(‘contactForm’).reset();

setTimeout(() => {
document.getElementById(‘formSuccess’).style.display = ‘none’;
}, 6000);
}

// ── LEGAL MODALS ───────────────────────────
document.getElementById(‘imprintLink’).addEventListener(‘click’, e => {
e.preventDefault();
document.getElementById(‘legalContent’).innerHTML = siteData.legal.imprint;
openModal(‘legalModal’);
});

document.getElementById(‘privacyLink’).addEventListener(‘click’, e => {
e.preventDefault();
document.getElementById(‘legalContent’).innerHTML = siteData.legal.privacy;
openModal(‘legalModal’);
});

// ── NAV SCROLL ─────────────────────────────
const nav = document.getElementById(‘nav’);
window.addEventListener(‘scroll’, () => {
if (window.scrollY > 50) {
nav.classList.add(‘scrolled’);
} else {
nav.classList.remove(‘scrolled’);
}
});

// ── MOBILE BURGER ──────────────────────────
const burger = document.getElementById(‘navBurger’);
const navLinks = document.querySelector(’.nav__links’);
burger.addEventListener(‘click’, () => {
const isOpen = navLinks.style.display === ‘flex’;
if (isOpen) {
navLinks.style.display = ‘’;
} else {
navLinks.style.display = ‘flex’;
navLinks.style.flexDirection = ‘column’;
navLinks.style.position = ‘fixed’;
navLinks.style.top = ‘72px’;
navLinks.style.left = ‘0’;
navLinks.style.right = ‘0’;
navLinks.style.background = ‘rgba(20,20,20,0.97)’;
navLinks.style.padding = ‘24px 40px’;
navLinks.style.gap = ‘20px’;
navLinks.style.zIndex = ‘99’;
navLinks.style.backdropFilter = ‘blur(12px)’;
}
});

// Close mobile menu on link click
document.querySelectorAll(’.nav__link’).forEach(link => {
link.addEventListener(‘click’, () => {
navLinks.style.display = ‘’;
});
});

// ── REVEAL ON SCROLL ───────────────────────
function initReveal() {
const observer = new IntersectionObserver((entries) => {
entries.forEach(entry => {
if (entry.isIntersecting) {
entry.target.classList.add(‘visible’);
observer.unobserve(entry.target);
}
});
}, { threshold: 0.12 });

document.querySelectorAll(’.reveal’).forEach(el => observer.observe(el));
}

// ── INIT ───────────────────────────────────
document.addEventListener(‘DOMContentLoaded’, () => {
loadData();

// Start reveal for hero immediately
setTimeout(() => {
document.querySelectorAll(’.hero .reveal’).forEach(el => el.classList.add(‘visible’));
}, 100);
});
