// ============================================
//  Elena Probst – Sprecherin Website
//  app.js  –  Daten direkt eingebettet
// ============================================

const siteData = {
  demos: [
    {
      id: 1,
      category: "Erklärvideo",
      title: "Kurz und auf den Punkt.",
      description: "Mit deinem Erklärvideo willst du Kunden gewinnen. Dafür müssen die Hörer dranbleiben – mit einer dynamischen Sprechweise gelingt uns das am besten. Hör selbst!",
      youtube: "",
      localFile: ""
    },
    {
      id: 2,
      category: "Imagefilm",
      title: "Deine Firma – perfekt dargestellt.",
      description: "Du willst seriös, professionell und erfolgreich rüberkommen. Meine Stimme verleiht deinem Imagefilm das nötige Etwas, um von der Konkurrenz abzuheben.",
      youtube: "",
      localFile: ""
    },
    {
      id: 3,
      category: "Podcast-Intro",
      title: "Die Spannung steigt – mit jeder Folge.",
      description: "Die ersten Sekunden sind entscheidend – kommt hier kein gutes Intro das deine Hörer packt, sind sie weg. Vielleicht für immer.",
      youtube: "",
      localFile: ""
    }
  ],
  faq: [
    {
      question: "Was, wenn mir eine Aufnahme nicht gefällt?",
      answer: "Dank unendlich vieler Korrekturrunden brauchst du dir darüber keine Sorgen machen. Normalerweise ist die Aufnahme direkt beim ersten Mal perfekt – solltest du aber IRGENDEINEN Änderungswunsch haben, teile ihn mir bitte mit! Ich mache mich sofort wieder ans Mikrofon!"
    },
    {
      question: "Was schicke ich dir als Demo-Text?",
      answer: "Am besten schickst du mir einen kurzen Abschnitt aus deinem eigentlichen Skript – so bekommst du einen realistischen Eindruck davon, wie dein fertiges Projekt klingen wird."
    },
    {
      question: "Für wen hat Elena gesprochen?",
      answer: "Elena hat bereits für Unternehmen, Agenturen, YouTuber, Podcaster und viele weitere Kreative gesprochen. Ihre Stimme passt zu Erklärvideos, Imagefilmen, Hörbüchern, Podcast-Intros und mehr."
    },
    {
      question: "Wie läuft der Ablauf ab?",
      answer: "Du schickst mir deinen Text über das Formular. Ich melde mich innerhalb von 24 Stunden mit einer kostenlosen Demo-Aufnahme. Nach deiner Freigabe erhältst du die fertige Aufnahme in WAV und MP3."
    }
  ],
  testimonials: [
    {
      id: 1,
      name: "Kundin / Kunde 1",
      description: "Füge hier eine Kundenstimme hinzu – klicke auf den Button unten.",
      youtube: "",
      localFile: ""
    },
    {
      id: 2,
      name: "Kundin / Kunde 2",
      description: "Füge hier eine weitere Kundenstimme hinzu.",
      youtube: "",
      localFile: ""
    },
    {
      id: 3,
      name: "Kundin / Kunde 3",
      description: "Drei Kundenstimmen wirken besonders überzeugend.",
      youtube: "",
      localFile: ""
    }
  ],
  legal: {
    imprint: "<h2>Impressum</h2><p><strong>Elena Probst</strong><br/>Musterstraße 1<br/>12345 Musterstadt</p><p>E-Mail: hallo@elena-probst.de<br/>Telefon: +49 123 456789</p><p>Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV: Elena Probst</p>",
    privacy: "<h2>Datenschutzerklärung</h2><p>Der Schutz deiner persönlichen Daten ist uns wichtig. Diese Website erhebt keine personenbezogenen Daten ohne deine ausdrückliche Einwilligung.</p><p>Das Kontaktformular sendet deine Anfrage direkt an uns. Wir verwenden deine Daten ausschließlich zur Bearbeitung deiner Anfrage.</p><p>Für Fragen zum Datenschutz wende dich an: hallo@elena-probst.de</p>"
  }
};

let demoFileData = null;
let testFileData = null;

// ── INIT ───────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  renderDemos();
  renderTestimonials();
  renderFAQ();
  initReveal();
  initNav();
  initUploads();
  initModals();
  initForm();

  // Hero reveal sofort
  setTimeout(() => {
    document.querySelectorAll('.hero .reveal').forEach(el => el.classList.add('visible'));
  }, 100);
});

// ── DEMOS ──────────────────────────────────
function renderDemos() {
  const grid = document.getElementById('demosGrid');
  if (!grid) return;
  grid.innerHTML = '';
  siteData.demos.forEach((demo, i) => {
    const card = createDemoCard(demo);
    card.style.transitionDelay = `${i * 0.1}s`;
    grid.appendChild(card);
  });
}

function createDemoCard(demo) {
  const card = document.createElement('div');
  card.className = 'demo-card reveal';

  let thumbHtml = '';
  if (demo.youtube) {
    const ytId = extractYouTubeId(demo.youtube);
    thumbHtml = `
      <div class="demo-card__thumb" onclick="playYoutube(this,'${ytId}')">
        <img src="https://img.youtube.com/vi/${ytId}/mqdefault.jpg" alt="${demo.title}" loading="lazy"/>
        <div class="demo-card__play"><div class="demo-card__play-icon">▶</div></div>
      </div>`;
  } else if (demo.localFile) {
    const isVideo = demo.localFile.startsWith('data:video');
    thumbHtml = `
      <div class="demo-card__thumb">
        ${isVideo
          ? `<video src="${demo.localFile}" controls style="width:100%;height:100%;object-fit:cover;"></video>`
          : `<img src="${demo.localFile}" alt="${demo.title}"/>
             <div class="demo-card__play"><div class="demo-card__play-icon">▶</div></div>`}
      </div>`;
  } else {
    thumbHtml = `
      <div class="demo-card__thumb demo-card__thumb--placeholder">
        <div class="demo-card__play-icon" style="opacity:0.35">▶</div>
        <p>Noch kein Media hinterlegt</p>
      </div>`;
  }

  card.innerHTML = `
    ${thumbHtml}
    <div class="demo-card__body">
      <div class="demo-card__category">${demo.category}</div>
      <div class="demo-card__title">${demo.title}</div>
      <div class="demo-card__desc">${demo.description}</div>
    </div>`;
  return card;
}

// ── TESTIMONIALS ───────────────────────────
function renderTestimonials() {
  const grid = document.getElementById('testimonialsGrid');
  if (!grid) return;
  grid.innerHTML = '';
  siteData.testimonials.forEach((t, i) => {
    const card = createTestimonialCard(t);
    card.style.transitionDelay = `${i * 0.1}s`;
    grid.appendChild(card);
  });
}

function createTestimonialCard(t) {
  const card = document.createElement('div');
  card.className = 'test-card reveal';

  let thumbHtml = '';
  if (t.youtube) {
    const ytId = extractYouTubeId(t.youtube);
    thumbHtml = `
      <div class="test-card__thumb" onclick="playYoutube(this,'${ytId}')">
        <img src="https://img.youtube.com/vi/${ytId}/mqdefault.jpg" alt="${t.name}" loading="lazy"/>
        <div class="test-card__play"><div class="test-card__play-icon">▶</div></div>
      </div>`;
  } else if (t.localFile) {
    const isVideo = t.localFile.startsWith('data:video');
    thumbHtml = `
      <div class="test-card__thumb">
        ${isVideo
          ? `<video src="${t.localFile}" controls style="width:100%;height:100%;object-fit:cover;"></video>`
          : `<img src="${t.localFile}" alt="${t.name}"/>
             <div class="test-card__play"><div class="test-card__play-icon">▶</div></div>`}
      </div>`;
  } else {
    thumbHtml = `
      <div class="test-card__thumb test-card__thumb--placeholder">
        <div class="test-card__play-icon" style="opacity:0.35">▶</div>
        <p>Noch kein Video hinterlegt</p>
      </div>`;
  }

  card.innerHTML = `
    ${thumbHtml}
    <div class="test-card__body">
      <div class="test-card__name">${t.name}</div>
      <div class="test-card__desc">${t.description}</div>
    </div>`;
  return card;
}

// ── FAQ ────────────────────────────────────
function renderFAQ() {
  const container = document.getElementById('faqContainer');
  if (!container) return;
  container.innerHTML = '';
  siteData.faq.forEach(item => {
    const el = document.createElement('div');
    el.className = 'faq-item';
    el.innerHTML = `
      <button class="faq-item__q" onclick="toggleFAQ(this)">
        <span>${item.question}</span>
        <span class="faq-item__arrow">▼</span>
      </button>
      <div class="faq-item__a">${item.answer}</div>`;
    container.appendChild(el);
  });
}

function toggleFAQ(btn) {
  const item = btn.parentElement;
  const isOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item.open').forEach(el => el.classList.remove('open'));
  if (!isOpen) item.classList.add('open');
}

// ── YOUTUBE ────────────────────────────────
function extractYouTubeId(url) {
  const m = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([a-zA-Z0-9_-]{11})/);
  return m ? m[1] : '';
}

function playYoutube(thumb, ytId) {
  if (!ytId) return;
  const iframe = document.createElement('iframe');
  iframe.className = 'yt-frame';
  iframe.src = `https://www.youtube.com/embed/${ytId}?autoplay=1`;
  iframe.allow = 'autoplay; encrypted-media';
  iframe.allowFullscreen = true;
  thumb.innerHTML = '';
  thumb.appendChild(iframe);
}

// ── NAVIGATION ─────────────────────────────
function initNav() {
  const nav = document.getElementById('nav');
  const burger = document.getElementById('navBurger');
  const navLinks = document.querySelector('.nav__links');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
  });

  burger.addEventListener('click', () => {
    const isOpen = navLinks.classList.contains('mobile-open');
    if (isOpen) {
      navLinks.classList.remove('mobile-open');
    } else {
      navLinks.classList.add('mobile-open');
    }
  });

  document.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('mobile-open'));
  });
}

// ── REVEAL ON SCROLL ───────────────────────
function initReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// ── UPLOADS ────────────────────────────────
function initUploads() {
  // Hero
  document.getElementById('heroFileInput').addEventListener('change', function () {
    const file = this.files[0]; if (!file) return;
    const reader = new FileReader();
    reader.onload = e => {
      const wrapper = document.getElementById('heroMediaWrapper');
      if (file.type.startsWith('video/')) {
        wrapper.innerHTML = `<video src="${e.target.result}" controls style="width:100%;height:100%;object-fit:cover;border-radius:14px;"></video>`;
      } else {
        wrapper.innerHTML = `<img src="${e.target.result}" alt="Hero Bild" style="width:100%;height:100%;object-fit:cover;border-radius:14px;"/>`;
      }
    };
    reader.readAsDataURL(file);
  });

  // About
  document.getElementById('aboutFileInput').addEventListener('change', function () {
    const file = this.files[0]; if (!file) return;
    const reader = new FileReader();
    reader.onload = e => {
      document.getElementById('aboutImgWrapper').innerHTML =
        `<img src="${e.target.result}" alt="Elena Probst" style="width:100%;height:100%;object-fit:cover;"/>`;
    };
    reader.readAsDataURL(file);
  });

  // Avatar
  document.getElementById('contactAvatarInput').addEventListener('change', function () {
    const file = this.files[0]; if (!file) return;
    const reader = new FileReader();
    reader.onload = e => {
      document.getElementById('contactAvatar').innerHTML =
        `<img src="${e.target.result}" alt="Elena Probst" style="width:100%;height:100%;object-fit:cover;border-radius:50%;"/>`;
    };
    reader.readAsDataURL(file);
  });

  // Demo file preview
  document.getElementById('demoFileInput').addEventListener('change', function () {
    const file = this.files[0]; if (!file) return;
    const reader = new FileReader();
    reader.onload = e => {
      demoFileData = e.target.result;
      const preview = document.getElementById('demoFilePreview');
      preview.innerHTML = file.type.startsWith('video/')
        ? `<video src="${demoFileData}" controls></video>`
        : `<img src="${demoFileData}" alt="Vorschau"/>`;
    };
    reader.readAsDataURL(file);
  });

  // Testimonial file preview
  document.getElementById('testFileInput').addEventListener('change', function () {
    const file = this.files[0]; if (!file) return;
    const reader = new FileReader();
    reader.onload = e => {
      testFileData = e.target.result;
      const preview = document.getElementById('testFilePreview');
      preview.innerHTML = file.type.startsWith('video/')
        ? `<video src="${testFileData}" controls></video>`
        : `<img src="${testFileData}" alt="Vorschau"/>`;
    };
    reader.readAsDataURL(file);
  });
}

// ── MODALS ─────────────────────────────────
function initModals() {
  // Add Demo
  document.getElementById('addDemoBtn').addEventListener('click', () => {
    demoFileData = null;
    document.getElementById('demoFilePreview').innerHTML = '';
    ['demoYoutube','demoCategory','demoTitle','demoDesc'].forEach(id => document.getElementById(id).value = '');
    openModal('addDemoModal');
  });

  // Add Testimonial
  document.getElementById('addTestimonialBtn').addEventListener('click', () => {
    testFileData = null;
    document.getElementById('testFilePreview').innerHTML = '';
    ['testYoutube','testName','testDesc'].forEach(id => document.getElementById(id).value = '');
    openModal('addTestimonialModal');
  });

  // Legal
  document.getElementById('imprintLink').addEventListener('click', e => {
    e.preventDefault();
    document.getElementById('legalContent').innerHTML = siteData.legal.imprint;
    openModal('legalModal');
  });

  document.getElementById('privacyLink').addEventListener('click', e => {
    e.preventDefault();
    document.getElementById('legalContent').innerHTML = siteData.legal.privacy;
    openModal('legalModal');
  });
}

function openModal(id) {
  document.getElementById(id).classList.add('open');
  document.getElementById('modalOverlay').classList.add('show');
  document.body.style.overflow = 'hidden';
}

function closeModal(id) {
  document.getElementById(id).classList.remove('open');
  const anyOpen = document.querySelectorAll('.modal.open').length > 0;
  if (!anyOpen) {
    document.getElementById('modalOverlay').classList.remove('show');
    document.body.style.overflow = '';
  }
}

function closeAllModals() {
  document.querySelectorAll('.modal.open').forEach(m => m.classList.remove('open'));
  document.getElementById('modalOverlay').classList.remove('show');
  document.body.style.overflow = '';
}

function saveDemo() {
  const category = document.getElementById('demoCategory').value.trim();
  const title    = document.getElementById('demoTitle').value.trim();
  const desc     = document.getElementById('demoDesc').value.trim();
  const youtube  = document.getElementById('demoYoutube').value.trim();
  if (!title) { alert('Bitte gib einen Titel ein.'); return; }
  siteData.demos.push({ id: Date.now(), category: category || 'Demo', title, description: desc, youtube, localFile: demoFileData || '' });
  renderDemos();
  initReveal();
  closeModal('addDemoModal');
}

function saveTestimonial() {
  const name    = document.getElementById('testName').value.trim();
  const desc    = document.getElementById('testDesc').value.trim();
  const youtube = document.getElementById('testYoutube').value.trim();
  if (!name) { alert('Bitte gib einen Namen ein.'); return; }
  siteData.testimonials.push({ id: Date.now(), name, description: desc, youtube, localFile: testFileData || '' });
  renderTestimonials();
  initReveal();
  closeModal('addTestimonialModal');
}

// ── FORM ───────────────────────────────────
function initForm() {
  document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    document.getElementById('formSuccess').style.display = 'block';
    this.reset();
    setTimeout(() => {
      document.getElementById('formSuccess').style.display = 'none';
    }, 6000);
  });
}
