/* ═══════════════════════════════════════════════════════════
   PromptGen — app.js
   Pełna wersja: palety, stack AI, generatory promptów, SKILL.md
   ═══════════════════════════════════════════════════════════ */
'use strict';

// ─── PALETY KOLORÓW ───────────────────────────────────────
const PALETTES = [
  { n: 'Mono / Neutral',    c: ['#0a0a0a','#1c1c1e','#2d2d30','#444444','#636366','#8e8e93','#aeaeb2','#d1d1d6','#f2f2f7','#ffffff'] },
  { n: 'Oceany',            c: ['#0c1445','#1e3a8a','#1d4ed8','#3b82f6','#60a5fa','#0f766e','#14b8a6','#2dd4bf','#99f6e4','#e0f2fe'] },
  { n: 'Ogień / Energia',   c: ['#450a0a','#7c1d1d','#b91c1c','#dc2626','#f97316','#fb923c','#fbbf24','#facc15','#fde68a','#fef9c3'] },
  { n: 'Natura / Zieleń',   c: ['#052e16','#14532d','#166534','#15803d','#22c55e','#4ade80','#86efac','#bbf7d0','#d1fae5','#f0fdf4'] },
  { n: 'Neon / Cyber',      c: ['#090909','#0d0d1a','#1a1a2e','#00ff41','#39ff14','#ff073a','#ff6b35','#e8ff47','#b8beff','#00d4ff'] },
  { n: 'Purpur / Fiolet',   c: ['#1e0a2e','#3b0764','#4c0592','#6d28d9','#7c3aed','#8b5cf6','#a78bfa','#c4b5fd','#e879f9','#fae8ff'] },
  { n: 'Pastel / Soft',     c: ['#fce4ec','#f8bbd0','#e1bee7','#d1c4e9','#c5cae9','#bbdefb','#b2ebf2','#c8e6c9','#dcedc8','#fff9c4'] },
  { n: 'Ziemia / Terra',    c: ['#1c0a00','#3e1c00','#78350f','#b45309','#d97706','#f59e0b','#c2410c','#ea580c','#f97316','#fed7aa'] },
  { n: 'Nocne Miasto',      c: ['#020617','#0f172a','#1e293b','#334155','#475569','#6366f1','#818cf8','#38bdf8','#22d3ee','#e2e8f0'] },
  { n: 'Luxe / Premium',    c: ['#1a0a0a','#881337','#be185d','#db2777','#f472b6','#d4a017','#f5c842','#fdf3c0','#fff7ed','#fef2f2'] },
  { n: 'Minty Fresh',       c: ['#022c22','#064e3b','#065f46','#059669','#10b981','#34d399','#6ee7b7','#a7f3d0','#d1fae5','#ecfdf5'] },
  { n: 'Cyberpunk Gold',    c: ['#0a0600','#1a1000','#2d1f00','#78450f','#d97706','#f59e0b','#fbbf24','#fde68a','#fff3c4','#fffbe8'] },
];

// ─── STACK RULES ──────────────────────────────────────────
const STACK_RULES = [
  { kw: ['sklep','e-commerce','sprzedaż','koszyk','produkty','płatność','checkout','zamówienia'], s: [
    { tag:'Next.js 14+Stripe', d:'SSR dla SEO produktów, webhooks Stripe w API routes', fw:'Next.js 14 (App Router)', be:'tRPC+Prisma+PostgreSQL', l:'Stripe, TanStack Query, Zustand, Lucide, RHF+Zod, Uploadthing' },
    { tag:'React+Supabase',    d:'Szybki MVP: wbudowana auth, realtime i storage',      fw:'React+Vite+Tailwind',    be:'Supabase (BaaS)',         l:'Stripe, TanStack Query, Lucide, RHF+Zod' }
  ]},
  { kw: ['blog','artykuły','cms','content','markdown','firmowa','korporacyjn','seo'], s: [
    { tag:'Astro+MDX',       d:'0KB JS domyślnie, najlepszy Core Web Vitals',      fw:'Astro (content-first)',  be:'Brak (tylko frontend)', l:'MDX, Tailwind, Lucide, Pagefind' },
    { tag:'Next.js+Sanity',  d:'ISR dla świeżych treści bez rebuildu, TypeScript', fw:'Next.js 14 (App Router)', be:'Brak (tylko frontend)', l:'@sanity/client, Tailwind, Lucide' }
  ]},
  { kw: ['dashboard','panel','analytics','admin','statystyki','wykresy','monitoring','zarządzanie'], s: [
    { tag:'React+Vite+Recharts', d:'SPA z HMR idealne dla złożonych paneli danych',     fw:'React+Vite+Tailwind',    be:'Supabase (BaaS)',          l:'Recharts, TanStack Query, Zustand, TanStack Table, Lucide, date-fns' },
    { tag:'Next.js+tRPC+Prisma', d:'Type-safe E2E — od bazy do UI bez generowania typów', fw:'Next.js 14 (App Router)', be:'tRPC+Prisma+PostgreSQL',  l:'Recharts, TanStack Query, TanStack Table, Lucide' }
  ]},
  { kw: ['portfolio','cv','developer','designer','freelancer','about me'], s: [
    { tag:'Astro+Framer Motion', d:'Najszybszy load, animacje przez island architecture', fw:'Astro (content-first)',   be:'Brak (tylko frontend)', l:'Framer Motion, Tailwind, Lucide' },
    { tag:'Next.js+Framer',      d:'Deploy Vercel, Server Actions dla contact form',      fw:'Next.js 14 (App Router)', be:'Brak (tylko frontend)', l:'Framer Motion, Tailwind, RHF+Zod, Resend' }
  ]},
  { kw: ['saas','platforma','subskrypcja','billing','multi-tenant'], s: [
    { tag:'Next.js+Clerk+Stripe', d:'Gotowy auth+billing — najszybszy start SaaS',   fw:'Next.js 14 (App Router)', be:'tRPC+Prisma+PostgreSQL', l:'Clerk, Stripe, TanStack Query, Zustand, Lucide, RHF+Zod' },
    { tag:'Remix+Supabase+Stripe', d:'Full-stack, progressive enhancement, edge',    fw:'Remix',                   be:'Supabase (BaaS)',         l:'Stripe, Tailwind, Zod' }
  ]},
  { kw: ['real-time','czat','chat','websocket','multiplayer','kolaboracja'], s: [
    { tag:'Next.js+Convex',    d:'Reaktywna baza z real-time, zero boilerplate', fw:'Next.js 14 (App Router)', be:'Convex (real-time)',      l:'Framer Motion, Lucide, Tailwind, Clerk' },
    { tag:'React+Socket.io',   d:'Pełna kontrola WebSockets, Redis Pub/Sub',     fw:'React+Vite+Tailwind',     be:'Node.js+Express+MongoDB', l:'Socket.io-client, Zustand, Framer, Lucide' }
  ]},
  { kw: ['landing','marketing','konwersja','lead','startup','oferta'], s: [
    { tag:'Next.js+Tailwind (SEO)', d:'SSG z najszybszym TTI, Server Actions dla form', fw:'Next.js 14 (App Router)', be:'Brak (tylko frontend)', l:'Framer Motion, RHF+Zod, Lucide, Resend' },
    { tag:'Astro+Tailwind (Perf)',  d:'100/100 CWV domyślnie, island architecture',     fw:'Astro (content-first)',   be:'Brak (tylko frontend)', l:'Framer Motion, Tailwind, Lucide' }
  ]},
  { kw: ['narzędzie','kalkulator','generator','converter','konfigurator'], s: [
    { tag:'React+Vite+Zod', d:'SPA dla interaktywnych narzędzi i złożonych form', fw:'React+Vite+Tailwind',    be:'Brak (tylko frontend)', l:'RHF, Zod, Zustand, Framer Motion, Lucide' },
    { tag:'Next.js+Server Actions', d:'Walidacja server-side, szybki deploy Vercel', fw:'Next.js 14 (App Router)', be:'Brak (tylko frontend)', l:'RHF, Zod, Lucide, Tailwind' }
  ]},
];

// ─── STATE ────────────────────────────────────────────────
let selectedColors = ['', '', ''];
let currentMode    = 'new';
let lightMode      = false;

// ─── DOM READY ────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  renderPalettes('palCon');
  renderPalettes('palConU');
  updateColorDisplay();
  updateProgress();
  wireInputs();
  initSidebar();
  initTheme();
  initNavLinks();
  if (localStorage.getItem('pg-theme') === 'light') setTheme(true);
});

// ─── SIDEBAR (mobile) ─────────────────────────────────────
function initSidebar() {
  const burger  = document.getElementById('hamburger');
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebarOverlay');
  if (!burger || !sidebar) return;
  burger.addEventListener('click', () => toggleSidebar());
  if (overlay) overlay.addEventListener('click', () => toggleSidebar(false));
}
function toggleSidebar(open) {
  const sidebar = document.getElementById('sidebar');
  const burger  = document.getElementById('hamburger');
  const overlay = document.getElementById('sidebarOverlay');
  const isOpen  = sidebar.classList.contains('open');
  const shouldOpen = open !== undefined ? open : !isOpen;
  sidebar.classList.toggle('open', shouldOpen);
  if (burger)  burger.classList.toggle('open', shouldOpen);
  if (overlay) overlay.classList.toggle('vis', shouldOpen);
  document.body.style.overflow = shouldOpen ? 'hidden' : '';
}

// ─── THEME ────────────────────────────────────────────────
function initTheme() {
  const saved = localStorage.getItem('pg-theme');
  if (saved === 'light') setTheme(true);
}
function toggleTheme() {
  setTheme(!lightMode);
}
function setTheme(isLight) {
  lightMode = isLight;
  document.body.classList.toggle('light', isLight);
  const track = document.getElementById('themeTrack');
  if (track) track.classList.toggle('on', isLight);
  const lbl = document.getElementById('themeLabel');
  if (lbl) lbl.textContent = isLight ? '☀️ Jasny' : '🌑 Ciemny';
  localStorage.setItem('pg-theme', isLight ? 'light' : 'dark');
}

// ─── NAV LINKS ────────────────────────────────────────────
function initNavLinks() {
  document.querySelectorAll('.nav-link[data-sec]').forEach(link => {
    link.addEventListener('click', () => {
      const id = link.dataset.sec;
      const el = document.getElementById(id);
      if (el) {
        toggleSidebar(false);
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
      }
      document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    });
  });
}

// ─── PROGRESS ─────────────────────────────────────────────
const FIELDS_NEW = ['pType','pName','pDesc','pAud','sFE','sBE','lLAY','lSEC','eVS','fFEAT','wQ'];
const FIELDS_UPD = ['uDESC','uSTACK','uWHAT'];
function updateProgress() {
  const fields = currentMode === 'new' ? FIELDS_NEW : FIELDS_UPD;
  const filled = fields.filter(id => {
    const el = document.getElementById(id);
    return el && el.value.trim() !== '';
  }).length;
  const pct = Math.round((filled / fields.length) * 100);
  ['progFill','spFill'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.width = pct + '%';
  });
  ['progPct','spPct'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = pct + '%';
  });
}
function showCharCount(el, targetId) {
  const t = document.getElementById(targetId);
  if (t) t.textContent = el.value.length + ' znaków';
}
function wireInputs() {
  document.querySelectorAll('input, select, textarea').forEach(el => {
    el.addEventListener('change', updateProgress);
    el.addEventListener('input',  updateProgress);
  });
  const pd = document.getElementById('pDesc');
  const pt = document.getElementById('pType');
  if (pd) pd.addEventListener('input', () => { aiSuggestStack(); showCharCount(pd, 'pDescCC'); });
  if (pt) pt.addEventListener('change', aiSuggestStack);
}

// ─── MODE SWITCH ──────────────────────────────────────────
function switchMode(m) {
  currentMode = m;
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('on', 'on2'));
  const btn = document.querySelector(`.tab[data-m="${m}"]`);
  if (m === 'new') btn.classList.add('on');
  else             btn.classList.add('on2');
  document.getElementById('mNew').style.display = m === 'new' ? '' : 'none';
  document.getElementById('mUpd').style.display = m === 'upd' ? '' : 'none';
  updateProgress();
  const topbarTitle = document.getElementById('topbarTitle');
  if (topbarTitle) topbarTitle.textContent = m === 'new' ? 'Nowy projekt' : 'Modyfikuj projekt';
}

// ─── PALETTES ─────────────────────────────────────────────
function renderPalettes(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = '';
  const grid = document.createElement('div');
  grid.className = 'pal-grid';
  PALETTES.forEach((pal, pi) => {
    const group = document.createElement('div');
    group.className = 'pal-group';
    const rowId = `pr-${containerId}-${pi}`;
    group.innerHTML = `<div class="pal-name">${pal.n}</div><div class="pal-row" id="${rowId}"></div>`;
    grid.appendChild(group);
    const row = group.querySelector(`#${rowId}`);
    pal.c.forEach(col => {
      const s = document.createElement('div');
      s.className = 'swatch';
      s.style.background = col;
      s.title = col;
      s.dataset.color = col;
      s.addEventListener('click', () => pickColor(col, s));
      row.appendChild(s);
    });
  });
  container.appendChild(grid);
}

function pickColor(hex, el) {
  let slot = selectedColors.findIndex(c => !c);
  if (slot < 0) slot = 2;
  selectedColors[slot] = hex;
  if (selectedColors[0] && !selectedColors[1] && !selectedColors[2]) {
    const h = genHarmonious(selectedColors[0]);
    selectedColors[1] = h[0];
    selectedColors[2] = h[1];
  }
  updateColorDisplay();
  document.querySelectorAll('.swatch').forEach(s => {
    if (s.dataset.color === hex) s.classList.toggle('sel');
  });
}

function updateColorDisplay() {
  const pairs = [
    ['cP1','cH1'], ['cP2','cH2'], ['cP3','cH3'],
    ['cP1U','cH1U'], ['cP2U','cH2U'], ['cP3U','cH3U'],
  ];
  pairs.forEach(([prevId, hexId], i) => {
    const idx = i % 3;
    const prev = document.getElementById(prevId);
    const hexEl = document.getElementById(hexId);
    if (prev)  prev.style.background  = selectedColors[idx] || 'var(--b1)';
    if (hexEl) hexEl.textContent      = selectedColors[idx] || '#—';
  });
}

// ─── COLOR MATH ───────────────────────────────────────────
function hexToHsl(hex) {
  let r = parseInt(hex.slice(1,3),16)/255,
      g = parseInt(hex.slice(3,5),16)/255,
      b = parseInt(hex.slice(5,7),16)/255;
  let mx=Math.max(r,g,b), mn=Math.min(r,g,b), h, s, l=(mx+mn)/2;
  if (mx===mn) { h=s=0; }
  else {
    const d = mx - mn;
    s = l > .5 ? d/(2-mx-mn) : d/(mx+mn);
    switch(mx){
      case r: h=((g-b)/d+(g<b?6:0))/6; break;
      case g: h=((b-r)/d+2)/6; break;
      case b: h=((r-g)/d+4)/6; break;
    }
  }
  return [Math.round(h*360), Math.round(s*100), Math.round(l*100)];
}
function hslToHex(h, s, l) {
  s /= 100; l /= 100;
  const a = s * Math.min(l, 1-l);
  const f = n => {
    const k = (n+h/30)%12, c = a*Math.max(Math.min(k-3,9-k,1),-1);
    return Math.round(255*(l-c)).toString(16).padStart(2,'0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}
function genHarmonious(hex) {
  const [h,s,l] = hexToHsl(hex);
  return [
    hslToHex((h+180)%360, Math.min(s,70), Math.max(Math.min(l+15,80),20)),
    hslToHex((h+120)%360, 90, 55),
  ];
}
function randomizeColors() {
  const h = Math.random() * 360;
  const schemes = [
    () => [hslToHex(h,60,20),   hslToHex((h+30)%360,50,45),  hslToHex((h+60)%360,90,60)],
    () => [hslToHex(h,10,12),   hslToHex((h+180)%360,40,40), hslToHex((h+150)%360,85,55)],
    () => [hslToHex(h,15,15),   hslToHex((h+120)%360,35,45), hslToHex((h+240)%360,90,58)],
    () => [hslToHex(h,8,10),    hslToHex(h,10,88),            hslToHex((h+150)%360,100,52)],
    () => [hslToHex(h,70,15),   hslToHex((h+25)%360,60,50),  hslToHex((h+200)%360,95,65)],
  ];
  selectedColors = schemes[Math.floor(Math.random()*schemes.length)]();
  updateColorDisplay();
  document.querySelectorAll('.swatch.sel').forEach(s => s.classList.remove('sel'));
}
function clearColors() {
  selectedColors = ['','',''];
  updateColorDisplay();
  document.querySelectorAll('.swatch.sel').forEach(s => s.classList.remove('sel'));
}
function syncHexInput(picker) {
  const el = document.getElementById('cHex') || document.getElementById('cHexU');
  if (el) el.value = picker.value;
}
function syncColorPicker(input) {
  const v = input.value.trim();
  if (/^#[0-9a-fA-F]{6}$/.test(v)) {
    const el = document.getElementById('cPick') || document.getElementById('cPickU');
    if (el) el.value = v;
  }
}
function syncHexU(picker) { const e = document.getElementById('cHexU'); if(e) e.value = picker.value; }
function syncPickU(input) { const v = input.value.trim(); if(/^#[0-9a-fA-F]{6}$/.test(v)){const e=document.getElementById('cPickU');if(e)e.value=v;} }
function applyCustomColor(slot) {
  const hexEl = document.getElementById('cHex') || document.getElementById('cHexU');
  const hex = hexEl ? hexEl.value.trim() : '';
  if (!/^#[0-9a-fA-F]{6}$/.test(hex)) { showToast('Podaj poprawny kod hex (np. #ff4400)', 'error'); return; }
  selectedColors[slot] = hex;
  updateColorDisplay();
}

// ─── PILLS ────────────────────────────────────────────────
function togglePill(lbl) {
  const cb = lbl.querySelector('input');
  cb.checked = !cb.checked;
  lbl.classList.toggle('on', cb.checked);
}
function selectRadio(lbl, groupId) {
  document.querySelectorAll(`#${groupId} .rpill`).forEach(p => {
    p.classList.remove('on');
    p.querySelector('input').checked = false;
  });
  lbl.classList.add('on');
  lbl.querySelector('input').checked = true;
}
function getChecked(containerId) {
  return Array.from(document.querySelectorAll(`#${containerId} input:checked`)).map(c => c.value);
}

// ─── STACK AI SUGGESTIONS ─────────────────────────────────
let suggestTimer;
function aiSuggestStack() {
  clearTimeout(suggestTimer);
  suggestTimer = setTimeout(() => {
    const desc = ((document.getElementById('pDesc') || {}).value || '').toLowerCase()
               + ' ' + ((document.getElementById('pType') || {}).value || '').toLowerCase();
    if (desc.trim().length < 8) { hideSuggest(); return; }
    let best = null, score = 0;
    STACK_RULES.forEach(rule => {
      const s = rule.kw.filter(kw => desc.includes(kw)).length;
      if (s > score) { score = s; best = rule; }
    });
    if (!best || score === 0) { hideSuggest(); return; }
    const box = document.getElementById('sugItems');
    if (!box) return;
    box.innerHTML = '';
    best.s.forEach(s => {
      const item = document.createElement('div');
      item.className = 'sug-item';
      item.innerHTML = `
        <span class="sug-tag">${s.tag}</span>
        <div style="flex:1">
          <div class="sug-desc">${s.d}</div>
          <div class="sug-libs">Biblioteki: ${s.l}</div>
        </div>
        <button class="sug-apply" onclick='applyStack(${JSON.stringify(s)})'>Zastosuj →</button>`;
      box.appendChild(item);
    });
    document.getElementById('suggestBox').classList.add('vis');
    const badge = document.getElementById('aiBadge');
    if (badge) badge.style.display = '';
  }, 380);
}
function hideSuggest() {
  const b = document.getElementById('suggestBox');
  if (b) b.classList.remove('vis');
  const badge = document.getElementById('aiBadge');
  if (badge) badge.style.display = 'none';
}
function applyStack(s) {
  if (typeof s === 'string') s = JSON.parse(s);
  const fwEl = document.getElementById('sFE');
  const beEl = document.getElementById('sBE');
  const libEl = document.getElementById('sLIB');
  if (fwEl) Array.from(fwEl.options).forEach(o => { if (o.text === s.fw) fwEl.value = o.value; });
  if (beEl) Array.from(beEl.options).forEach(o => { if (o.text === s.be) beEl.value = o.value; });
  if (libEl) { libEl.value = s.l; }
  [fwEl, beEl, libEl].forEach(el => {
    if (!el) return;
    el.style.borderColor = 'var(--acc)';
    setTimeout(() => el.style.borderColor = '', 1400);
  });
  updateProgress();
  showToast(`✓ Zastosowano: ${s.tag}`);
}

// ─── HELPERS ──────────────────────────────────────────────
const v   = id => { const e = document.getElementById(id); return e ? e.value.trim() : ''; };
const rv  = name => { const r = document.querySelector(`input[name="${name}"]:checked`); return r ? r.value : ''; };
const ch  = id => !!document.getElementById(id)?.checked;

// ─── TOAST ────────────────────────────────────────────────
function showToast(msg, type = 'success') {
  const wrap = document.getElementById('toastWrap');
  if (!wrap) return;
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<span class="t-icon">${type === 'success' ? '✓' : '⚠'}</span><span>${msg}</span>`;
  wrap.appendChild(toast);
  setTimeout(() => toast.remove(), 2600);
}

// ─── LOADING ──────────────────────────────────────────────
function delay(ms) { return new Promise(r => setTimeout(r, ms)); }
async function showLoading() {
  const ov = document.getElementById('loading');
  ov.classList.add('vis');
  const steps = ov.querySelectorAll('.ss');
  for (let i = 0; i < steps.length; i++) {
    if (i > 0) steps[i-1].classList.remove('act');
    steps[i].classList.add('act');
    await delay(300 + Math.random() * 180);
    steps[i].classList.remove('act');
    steps[i].classList.add('done');
  }
  await delay(200);
  ov.classList.remove('vis');
  steps.forEach(s => { s.classList.remove('done','act'); });
}

// ─── GENERATE ENTRY ───────────────────────────────────────
async function generate() {
  await showLoading();
  if (currentMode === 'new') generateNew();
  else                       generateUpdate();
}

// ─── GENERATE — NOWY PROJEKT ──────────────────────────────
function generateNew() {
  const L = [];
  const p = (s = '') => L.push(s);

  p('# CLAUDE CODE — PROJEKT WEBOWY');
  p('Zaimplementuj kompletny projekt. Gdzie pole puste → wybierz najlepszą opcję i krótko uzasadnij w komentarzu.');
  p('');

  // PROJEKT
  const typ = v('pType'), name = v('pName'), lang = v('pLang'), aud = v('pAud'),
        goal = v('pGoal'), ref = v('pRef'), desc = v('pDesc');
  p('## PROJEKT');
  if (typ)  p(`Typ: ${typ}`);
  if (name) p(`Nazwa: ${name}`);
  if (lang && lang !== 'Polski') p(`Język UI: ${lang}`);
  if (aud)  p(`Odbiorcy: ${aud}`);
  if (goal) p(`Cel biznesowy: ${goal}`);
  if (ref)  p(`Inspiracje: ${ref}`);
  if (desc) { p(''); p(desc); }

  // STACK
  const fw  = v('sFE'),  be  = v('sBE'), stm = v('sST'), auth = v('sAU'),
        db  = v('sDB'),  dep = v('sDEP'), lib = v('sLIB'), ct  = v('sCT'), cd = v('sCD');
  p('');
  p('## STACK');
  if (fw)   p(`FE: ${fw}`);         else p('FE: ⚡AI — dobierz optymalny framework');
  if (be)   p(`BE: ${be}`);         else p('BE: ⚡AI — dobierz backend/BaaS');
  if (stm)  p(`State: ${stm}`);
  if (auth) p(`Auth: ${auth}`);
  if (db)   p(`DB/ORM: ${db}`);
  if (lib)  p(`Libs: ${lib}`);
  if (ct)   p(`Język kodu: ${ct}`);
  if (cd)   p(`Poziom: ${cd}`);
  if (dep)  p(`Deploy: ${dep}`);
  const descLow = (desc + ' ' + typ).toLowerCase();
  const matchedRule = STACK_RULES.find(r => r.kw.filter(kw => descLow.includes(kw)).length > 0);
  if (matchedRule && (!fw || !be)) {
    const s = matchedRule.s[0];
    p('');
    p('⚡ STACK HINT — zastosuj lub uzasadnij odrzucenie:');
    if (!fw) p(`  FE  → ${s.fw}`);
    if (!be) p(`  BE  → ${s.be}`);
    if (!lib) p(`  Libs → ${s.l}`);
  }

  // LAYOUT
  const lay = v('lLAY'), nav = v('lNAV'), resp = rv('resp'), mw = rv('mw'), lx = v('layoutExtra'), secs = v('lSEC');
  p('');
  p('## LAYOUT');
  if (lay)  p(`Układ: ${lay}`);
  if (nav)  p(`Nav: ${nav}`);
  if (resp) p(`Responsywność: ${resp}`);
  if (mw)   p(`Max-width: ${mw}`);
  if (lx)   p(`Extra: ${lx}`);
  if (secs) { p(''); p('Sekcje:'); p(secs); }
  else p('Sekcje: ⚡AI — zaproponuj optymalną strukturę dla tego projektu');

  // ESTETYKA
  const vs = v('eVS'), cm = rv('cm'), ty = v('eTY'), br = rv('br');
  const spN = document.getElementById('eSP')?.value || 3;
  const spTxt = ['','Bardzo luźny','Luźny','Zbalansowany','Gęsty','Bardzo gęsty'][spN];
  p('');
  p('## ESTETYKA');
  p(`Styl: ${vs  || '⚡AI — dobierz pasujący do projektu i odbiorców'}`);
  p(`Tryb: ${cm  || 'Ciemny'}`);
  p(`Typo: ${ty  || '⚡AI — dobierz unikalną parę czcionek Google Fonts'}`);
  if (br) p(`Radius: ${br}`);
  p(`Spacing: ${spTxt} (${spN}/5)`);
  const anims = getChecked('pANIM');
  if (anims.length) p(`Animacje: ${anims.join(' | ')}`);
  else p('Animacje: ⚡AI — dobierz micro-interakcje pasujące do stylu');

  // KOLORY
  const c1 = selectedColors[0], c2 = selectedColors[1], c3 = selectedColors[2];
  p('');
  p('## PALETA KOLORÓW — REGUŁA 60–30–10');
  if (c1 || c2 || c3) {
    if (c1) p(`Dominujący  (60%): ${c1}  → --color-primary`);
    if (c2) p(`Uzupełniający (30%): ${c2}  → --color-secondary`);
    if (c3) p(`Akcentowy   (10%): ${c3}  → --color-accent`);
    p('');
    p(':root {');
    if (c1) p(`  --color-primary:   ${c1};`);
    if (c2) p(`  --color-secondary: ${c2};`);
    if (c3) p(`  --color-accent:    ${c3};`);
    p('}');
    p('Używaj WYŁĄCZNIE tych zmiennych w całym projekcie.');
  } else {
    p('⚡AI — dobierz kompletną paletę 60-30-10:');
    if (vs.includes('tech') || cm === 'Ciemny') p('  Hint: ciemne tło, surface nieco jaśniejszy, neonowy akcent');
    else if (vs.includes('luksus'))              p('  Hint: głęboka czerń, matowe złoto, jasne złoto jako akcent');
    else if (vs.includes('minimaln'))            p('  Hint: biały/jasny szary, medium szary, ciemny kontrastowy akcent');
    else                                         p('  Podaj hex + CSS variables + uzasadnienie psychologii koloru.');
  }

  // FUNKCJE
  const feats = v('fFEAT'), integr = v('fINT'), uxD = v('fUX');
  const tech  = getChecked('pTECH');
  const arch  = getChecked('pARCH');
  p('');
  p('## FUNKCJONALNOŚCI');
  if (feats) p(feats);
  else p('⚡AI — zaproponuj Must/Should/Could z implementacją dla tego projektu');
  if (integr) p(`Integracje: ${integr}`);
  if (uxD)    p(`UX specjalne: ${uxD}`);
  if (tech.length) p(`Tech wymagania: ${tech.join(' | ')}`);
  if (arch.length) p(`Architektura: ${arch.join(' | ')}`);

  // BEZPIECZENSTWO
  const sec = getChecked('pSEC');
  if (sec.length) {
    p('');
    p('## BEZPIECZEŃSTWO');
    sec.forEach(s => p(`• ${s}`));
  }

  // SEO
  const wSEO = ch('wSEO'), kw = v('seoKW');
  if (wSEO) {
    p('');
    p('## SEO');
    p('Zaimplementuj: unique meta title/desc per strona, OpenGraph, Twitter Card, JSON-LD Schema.org, sitemap.xml, robots.txt, canonical URL, lang attribute, alt tekst wszystkich obrazów, font-display:swap, LCP<2.5s, CLS<0.1.');
    if (kw) p(`Słowa kluczowe: ${kw}`);
  }

  // DANE
  const cont = v('dCONT'), ds = v('dSRC'), ic = v('dICO'), img = v('dIMG');
  p('');
  p('## TREŚĆ I DANE');
  if (cont) p(cont);
  else p('⚡AI — stwórz realistyczne mockowe dane dla wszystkich sekcji (nie Lorem Ipsum)');
  p(`Źródło: ${ds || 'Hardcoded'} | Ikony: ${ic || 'Lucide'} | Obrazy: ${img || 'Placeholder SVG'}`);

  // WYTYCZNE
  const qual = v('wQ'), com = v('wCOM'), extra = v('wEX');
  p('');
  p('## WYTYCZNE');
  if (qual)  p(`Priorytet: ${qual}`);
  if (com)   p(`Komentarze: ${com}`);
  if (extra) p(extra);

  // AI PROPOZYCJE
  const aiSugg = [];
  if (!feats) aiSugg.push('FUNKCJE: zaproponuj Must/Should/Could z implementacją każdej');
  if (!c1)    aiSugg.push('KOLORY: kompletna paleta 60-30-10 z hex, CSS variables i uzasadnieniem');
  if (!secs)  aiSugg.push('SEKCJE: optymalna struktura z opisem zawartości każdej sekcji');
  if (!vs)    aiSugg.push('STYL: dobierz wizualny styl + parę czcionek + system spacing');
  if (!cont)  aiSugg.push('MOCK DATA: realistyczne, szczegółowe dane dla wszystkich sekcji');
  aiSugg.push('UNIKALNE UI: 2-3 zapamiętywalne elementy wizualne z pełną implementacją');
  aiSugg.push('STANY UI: loading/error/empty state dla każdego widoku z danymi');
  if (!goal)  aiSugg.push('KONWERSJA: placement CTA, social proof, trust signals, urgency');
  p('');
  p('## ⚡ UZUPEŁNIJ I ZAPROPONUJ');
  aiSugg.forEach(s => p(`• ${s}`));

  // IMPLEMENTACJA
  p('');
  p('## INSTRUKCJE IMPLEMENTACJI');
  p('• Kompletny kod — zero TODO, placeholder ani "implement later"');
  p('• CSS custom properties dla WSZYSTKICH wartości designu w :root');
  p('• Semantic HTML: nav, main, section, article, footer + aria-labels');
  p('• Mobile-first CSS, breakpoints: 480px / 768px / 1024px / 1280px');
  p('• Każdy widok z danymi musi mieć: loading + error + empty state');
  p('• Lazy loading obrazów, code splitting dla ciężkich komponentów');
  p('• Walidacja formularzy: client-side (Zod) + server-side');
  p('• Zaproponuj strukturę folderów projektu na początku odpowiedzi');
  p('• Jeśli coś nie zostało określone — wybierz najlepszą opcję i opisz w komentarzu');

  const prompt = L.join('\n');
  displayOutput('outNew', 'outTxt', 'outMeta', prompt);
  document.getElementById('tokenBox').style.display = 'block';
  if (wSEO) showSeoBox('seoBox', 'seoContent', kw, typ, desc);
  if (ch('wSKILL')) showSkillBox('skillBox', 'skillList', typ, desc, prompt);
  showToast('✓ Prompt wygenerowany! Skopiuj i wklej do Claude Code.');
}

// ─── GENERATE — MODYFIKACJA ───────────────────────────────
function generateUpdate() {
  const L = [];
  const p = (s = '') => L.push(s);

  p('# CLAUDE CODE — AKTUALIZACJA PROJEKTU');
  p('Modyfikuj istniejący projekt. NIE przepisuj od zera — edytuj tylko wskazane miejsca.');
  p('');

  const udesc = v('uDESC'), ustack = v('uSTACK'), uwhat = v('uWHAT'),
        uadd  = v('uADD'),  urem   = v('uREM'),   ucode = v('uCODE');
  const ufiles = getChecked('pFILES');
  const usec   = getChecked('pSEC2');
  const wSEO   = ch('uSEO'), ukw = v('uSEOKW');

  if (udesc)  { p('## OPIS PROJEKTU'); p(udesc); }
  if (ustack) p(`Stack: ${ustack}`);
  if (uwhat)  { p(''); p('## CO ZMIENIĆ'); p(uwhat); }
  if (uadd)   { p(''); p('## CO DODAĆ');   p(uadd); }
  if (urem)   { p(''); p('## CO USUNĄĆ / ZASTĄPIĆ'); p(urem); }

  const c1 = selectedColors[0], c2 = selectedColors[1], c3 = selectedColors[2];
  if (c1 || c2 || c3) {
    p('');
    p('## NOWE KOLORY');
    if (c1) p(`Primary   (60%): ${c1}  → --color-primary`);
    if (c2) p(`Secondary (30%): ${c2}  → --color-secondary`);
    if (c3) p(`Accent    (10%): ${c3}  → --color-accent`);
  }

  if (ucode) { p(''); p('## ZMIANY W KODZIE'); p(ucode); }
  if (ufiles.length) { p(''); p('## POTRZEBNE PLIKI'); ufiles.forEach(f => p(`• ${f}`)); }
  if (usec.length)   { p(''); p('## DODAJ ZABEZPIECZENIA'); usec.forEach(s => p(`• ${s}`)); }
  if (wSEO) { p(''); p('## DODAJ SEO'); p('Zaimplementuj: meta per-page, OpenGraph, JSON-LD, sitemap.xml, robots.txt, canonical, alt img, lang attr, font-display:swap.'); }

  p('');
  p('## ZASADY EDYCJI');
  p('• Modyfikuj tylko wskazane komponenty/pliki');
  p('• Zachowaj styl i konwencje istniejącego kodu');
  p('• Pokaż diff lub pełny plik po zmianach');
  p('• Sprawdź czy zmiana nie psuje innych części aplikacji');
  p('• Jeden prompt = jedna spójna zmiana');

  const prompt = L.join('\n');
  displayOutput('outUpd', 'outTxt2', 'outMeta2', prompt);
  document.getElementById('tokenBox2').style.display = 'block';
  if (wSEO) showSeoBox('seoBox2', 'seoContent2', ukw, udesc, '');
  if (ch('uSKILL')) showSkillBox('skillBox2', 'skillList2', udesc, '', prompt);
  showToast('✓ Prompt modyfikacji wygenerowany!');
}

// ─── DISPLAY OUTPUT ───────────────────────────────────────
function displayOutput(wrapId, txtId, metaId, text) {
  const el   = document.getElementById(txtId);
  const meta = document.getElementById(metaId);
  if (el)   el.textContent = text;
  if (meta) meta.textContent = `${text.length.toLocaleString()} znaków · ~${Math.round(text.length/4).toLocaleString()} tokenów`;
  const wrap = document.getElementById(wrapId);
  if (wrap) {
    wrap.classList.add('vis');
    setTimeout(() => wrap.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80);
  }
}

// ─── COPY ─────────────────────────────────────────────────
function copyOutput(txtId, fbId) {
  const text = document.getElementById(txtId)?.textContent || '';
  navigator.clipboard.writeText(text).then(() => {
    const fb = document.getElementById(fbId);
    if (fb) { fb.classList.add('vis'); setTimeout(() => fb.classList.remove('vis'), 2400); }
    showToast('✓ Skopiowano do schowka!');
  }).catch(() => {
    // Fallback
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity  = '0';
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    ta.remove();
    showToast('✓ Skopiowano!');
  });
}

// ─── SEO BOX ──────────────────────────────────────────────
function showSeoBox(boxId, conId, kws, type, desc) {
  const box = document.getElementById(boxId);
  if (!box) return;
  box.style.display = 'block';
  const hint = type || desc || 'projekt';
  const kwArr = kws ? kws.split(',').map(k => k.trim()).filter(Boolean) : [];
  document.getElementById(conId).innerHTML = `
    <p><strong>Jak uzyskać najlepsze pozycje dla: „${hint}"</strong></p>
    <ul>
      <li>H1 zawiera główne słowo kluczowe — tylko jeden H1 na stronę</li>
      <li>Title tag: główne KW na początku, maks 60 znaków</li>
      <li>Meta description: KW + CTA, 150–160 znaków</li>
      <li>Core Web Vitals: LCP &lt;2.5s, CLS &lt;0.1, FID &lt;100ms</li>
      <li>Sitemap.xml + robots.txt + canonical URL</li>
      <li>Schema JSON-LD: Organization, WebSite, BreadcrumbList</li>
      <li>Internal linking: linkuj do 3–5 powiązanych podstron</li>
      <li>Alt tekst przy każdym obrazie — opisowy, z KW</li>
      <li>Backlinki: wpisy gościnne, katalogi branżowe, PR artykuły</li>
      <li>Treść: min. 300 słów per podstrona, KW naturalnie w tekście</li>
    </ul>
    ${kwArr.length ? `<p style="margin:10px 0 6px"><strong>Twoje słowa kluczowe + synonimy i long-tail:</strong></p><ul>${kwArr.map(k => `<li>${k} · najlepszy ${k} · ${k} opinie · ${k} cennik · jak wybrać ${k}</li>`).join('')}</ul>` : ''}
    <p style="margin-top:10px;font-size:11px;color:var(--mu)">Narzędzia: Google Search Console, PageSpeed Insights, Ahrefs, Screaming Frog</p>
  `;
}

// ─── SKILL BOX ────────────────────────────────────────────
function showSkillBox(boxId, listId, type, desc, prompt) {
  const box = document.getElementById(boxId);
  if (!box) return;
  box.style.display = 'block';
  const slug = (type || 'projekt').toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').slice(0, 22);
  const skill1 = buildProjectSkill(slug, type, desc);
  const skill2 = buildGeneralSkill();
  document.getElementById(listId).innerHTML = `
    <div class="skill-item">
      <div>
        <div class="skill-name">SKILL-${slug}.md</div>
        <div class="skill-sub">Dedykowany skill dla tego projektu</div>
      </div>
      <button class="dl-btn" onclick="downloadFile('SKILL-${slug}.md', ${JSON.stringify(skill1)})">⬇ Pobierz</button>
    </div>
    <div class="skill-item">
      <div>
        <div class="skill-name">SKILL-webdev.md</div>
        <div class="skill-sub">Ogólny skill webdev dla Claude Code</div>
      </div>
      <button class="dl-btn" onclick="downloadFile('SKILL-webdev.md', ${JSON.stringify(skill2)})">⬇ Pobierz</button>
    </div>
  `;
}

function buildProjectSkill(slug, type, desc) {
  return `---
name: SKILL-${slug}
description: Skill dla projektu: ${type || 'webowego'}. ${desc ? desc.slice(0, 150) + '...' : ''} Użyj przy tworzeniu lub modyfikacji tego projektu.
---

# SKILL — ${type || 'Projekt webowy'}

## Kontekst projektu
${desc || type || 'Projekt webowy'}

## Stack i standardy
- CSS custom properties w :root dla wszystkich wartości designu
- TypeScript preferowany
- Semantic HTML: nav, main, section, article, footer + aria-labels
- Mobile-first CSS, breakpoints: 480px / 768px / 1024px / 1280px
- Komponenty z jedną odpowiedzialnością
- loading + error + empty state dla każdego widoku z danymi

## Format promptów — minimalizuj tokeny
Używaj skróconych etykiet: \`FE: BE: Styl: P:#hex S:#hex A:#hex\`
Puste pola zastąp instrukcją AI zamiast pomijać.

## Jakość kodu
- Żadnych TODO — kompletny działający kod
- Zaproponuj strukturę folderów na początku odpowiedzi
- Komentarze przy nieoczywistej logice
- Walidacja formularzy client + server side
`;
}

function buildGeneralSkill() {
  return `---
name: webdev-general
description: Ogólny skill dla projektów webowych. Użyj przy budowie stron, SPA, dashboard, e-commerce, portfolio, SaaS.
---

# SKILL — Web Development (Claude Code)

## Stack guidelines
- **Landing/Blog**: Astro + Tailwind → 0KB JS, najlepszy CWV
- **SPA/Dashboard**: React+Vite+Tailwind + Zustand + TanStack Query
- **Full-stack**: Next.js 14 + tRPC+Prisma lub Supabase
- **Real-time**: Next.js + Convex lub React + Socket.io + Redis
- **E-commerce**: Next.js + Stripe + Prisma + Uploadthing

## Standardy kodu
- CSS custom properties dla design systemu w :root
- TypeScript preferowany (--strict)
- Semantic HTML + aria-labels zawsze
- Mobile-first, bp: 480/768/1024/1280px
- loading + error + empty state — ZAWSZE
- Code splitting i lazy loading dla wydajności

## Bezpieczeństwo (checklista)
HTTPS+HSTS | CSP header | Rate limiting | Input sanitization+Zod
CSRF tokens | HttpOnly Secure cookies | JWT rotation | Bcrypt passwords
SQL injection prevention (Prisma ORM) | XSS (escape+DOMPurify) | GDPR

## SEO checklista
meta title/desc per-page | OpenGraph | Twitter Card | JSON-LD Schema
sitemap.xml | robots.txt | canonical URL | alt texts | lang attr
font-display:swap | LCP<2.5s | CLS<0.1 | preconnect dla CDN

## Format promptów — minimalizuj tokeny
\`\`\`
Typ: | FE: | BE: | State: | Auth: | DB:
Styl: | Tryb: | P:#hex S:#hex A:#hex
Sekcje: | Func: | Tech: | Sec: | SEO:
\`\`\`

## Implementacja
- Zaproponuj strukturę folderów na początku odpowiedzi
- Kompletny kod — żadnych TODO ani placeholder
- Zaproponuj najlepszą opcję dla nieokreślonych wymagań
`;
}

function downloadFile(filename, content) {
  const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href     = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
  showToast(`✓ Pobrano: ${filename}`);
}

// ═══════════════════════════════════════════════════════════
// SEKCJA: Prompt dla Claude — wybór modelu i konstruktor
// ═══════════════════════════════════════════════════════════

// ─── STATE ────────────────────────────────────────────────
let selectedClaudeModel = null; // 'haiku' | 'sonnet' | 'opus'

// ─── MODEL DATA ───────────────────────────────────────────
const MODELS = {
  haiku: {
    name: 'Claude Haiku 4.5',
    id:   'claude-haiku-4-5-20251001',
    icon: '⚡',
    color: '#38bdf8',
    strengths: ['Klasyfikacja', 'Chat', 'Pipeline', 'Streszczenia', 'Tłumaczenia'],
    weaknesses: ['Złożone rozumowanie', 'Długie dokumenty', 'Głęboka analiza'],
  },
  sonnet: {
    name: 'Claude Sonnet 4.6',
    id:   'claude-sonnet-4-6',
    icon: '⚖️',
    color: '#e8ff47',
    strengths: ['Kod', 'Pisanie', 'Analiza', 'Q&A', 'Debugging', 'Treści'],
    weaknesses: ['Bardzo złożone R&D', 'Wielogodzinna analiza'],
  },
  opus: {
    name: 'Claude Opus 4.6',
    id:   'claude-opus-4-6',
    icon: '🏆',
    color: '#a78bfa',
    strengths: ['Badania', 'Strategia', 'Złożony kod', 'Głębokie rozumowanie', 'Długie dokumenty'],
    weaknesses: ['Wysoki koszt', 'Wolniejszy'],
  },
};

// ─── SELECT MODEL ─────────────────────────────────────────
function selectModel(model) {
  selectedClaudeModel = model;

  // Visual update cards
  document.querySelectorAll('.model-card').forEach(c => {
    c.classList.remove('selected-haiku', 'selected-sonnet', 'selected-opus');
  });
  const card = document.getElementById('mc' + model.charAt(0).toUpperCase() + model.slice(1));
  if (card) card.classList.add(`selected-${model}`);

  // Update badge in builder
  const badge = document.getElementById('selectedModelBadge');
  if (badge) {
    badge.className = `selected-model-badge ${model}`;
    badge.innerHTML = `${MODELS[model].icon} ${MODELS[model].name}`;
  }

  // Update preview
  updateClaudePreview();
  showToast(`✓ Wybrano: ${MODELS[model].name}`);
}

// ─── RECOMMENDATION ENGINE ────────────────────────────────
const REC_MATRIX = {
  // [priority][complexity][taskType] → model
  speed:   { simple:  { code:'haiku',  writing:'haiku',  analysis:'haiku',  chat:'haiku',  data:'haiku',  research:'sonnet' },
             medium:  { code:'sonnet', writing:'sonnet', analysis:'sonnet', chat:'haiku',  data:'sonnet', research:'sonnet' },
             complex: { code:'sonnet', writing:'sonnet', analysis:'opus',   chat:'sonnet', data:'sonnet', research:'opus'   } },
  cost:    { simple:  { code:'haiku',  writing:'haiku',  analysis:'haiku',  chat:'haiku',  data:'haiku',  research:'sonnet' },
             medium:  { code:'haiku',  writing:'sonnet', analysis:'sonnet', chat:'haiku',  data:'haiku',  research:'sonnet' },
             complex: { code:'sonnet', writing:'sonnet', analysis:'sonnet', chat:'sonnet', data:'sonnet', research:'opus'   } },
  balance: { simple:  { code:'sonnet', writing:'haiku',  analysis:'haiku',  chat:'haiku',  data:'haiku',  research:'sonnet' },
             medium:  { code:'sonnet', writing:'sonnet', analysis:'sonnet', chat:'sonnet', data:'sonnet', research:'sonnet' },
             complex: { code:'sonnet', writing:'opus',   analysis:'opus',   chat:'sonnet', data:'sonnet', research:'opus'   } },
  quality: { simple:  { code:'sonnet', writing:'sonnet', analysis:'sonnet', chat:'sonnet', data:'sonnet', research:'sonnet' },
             medium:  { code:'opus',   writing:'sonnet', analysis:'opus',   chat:'sonnet', data:'opus',   research:'opus'   },
             complex: { code:'opus',   writing:'opus',   analysis:'opus',   chat:'opus',   data:'opus',   research:'opus'   } },
};

const REC_REASONS = {
  haiku:  {
    default:  'Claude Haiku jest tutaj optymalny — szybki, ekonomiczny i w pełni wystarczający do tego zadania.',
    speed:    'Haiku to najszybszy model w rodzinie Claude. Dla tego zadania nie potrzebujesz cięższego modelu.',
    cost:     'Haiku jest ~10× tańszy od Opus przy porównywalnej jakości dla prostych zadań.',
    balance:  'Haiku dobrze wyważy koszt i jakość dla tego konkretnego zastosowania.',
    quality:  'Nawet przy priorytecie jakości, Haiku jest wystarczający dla prostych zadań.',
  },
  sonnet: {
    default:  'Claude Sonnet oferuje doskonały balans inteligencji i kosztu — złoty środek dla większości zadań produkcyjnych.',
    speed:    'Sonnet jest znacznie szybszy od Opus, zachowując wysoką jakość odpowiedzi dla złożonego zadania.',
    cost:     'Sonnet zapewni wymaganą jakość bez przepłacania za Opus.',
    balance:  'Sonnet to domyślny wybór dla większości zastosowań — inteligentny i nie zrujnuje budżetu.',
    quality:  'Sonnet 4.6 jest zoptymalizowany pod kod i analizę — to właściwy wybór tutaj.',
  },
  opus:   {
    default:  'Claude Opus to najinteligentniejszy model — idealne narzędzie dla złożonych, wymagających zadań.',
    speed:    'Mimo priorytetu szybkości, to zadanie wymaga głębokiego rozumowania — Opus jest tutaj konieczny.',
    cost:     'Złożoność zadania uzasadnia wyższy koszt Opus. Tańszy model dałby gorsze wyniki.',
    balance:  'To zadanie wymaga pełnych możliwości Opus dla uzyskania najlepszego wyniku.',
    quality:  'Opus to top wybór gdy jakość jest priorytetem i zadanie jest złożone — nie ma alternatywy.',
  },
};

function updateModelRec() {
  const priority   = (document.querySelector('input[name="mp"]:checked') || {}).value;
  const complexity = (document.querySelector('input[name="mc"]:checked') || {}).value;
  const taskType   = (document.querySelector('input[name="mt"]:checked') || {}).value;

  const resultEl  = document.getElementById('recResult');
  const modelEl   = document.getElementById('recResultModel');
  const reasonEl  = document.getElementById('recResultReason');
  if (!resultEl || !modelEl || !reasonEl) return;

  if (!priority || !complexity || !taskType) {
    resultEl.style.display = 'none';
    // Clear recommendation badges
    document.querySelectorAll('.model-rec-badge').forEach(b => b.style.display = 'none');
    return;
  }

  const rec    = REC_MATRIX[priority]?.[complexity]?.[taskType] || 'sonnet';
  const model  = MODELS[rec];
  const reason = REC_REASONS[rec]?.[priority] || REC_REASONS[rec]?.default || '';

  // Show result
  resultEl.style.display = 'block';
  modelEl.innerHTML  = `<span style="font-size:18px">${model.icon}</span> <span style="color:${model.color}">${model.name}</span> <span style="font-size:10px;color:var(--mu);font-weight:400;letter-spacing:.06em;text-transform:uppercase">rekomendowany</span>`;
  reasonEl.textContent = reason;

  // Update recommendation badges on cards
  ['haiku','sonnet','opus'].forEach(m => {
    const badge = document.getElementById('rec' + m.charAt(0).toUpperCase() + m.slice(1));
    if (badge) badge.style.display = (m === rec) ? 'block' : 'none';
  });

  // Auto-select the recommended model
  selectModel(rec);
}

// ─── LIVE PROMPT PREVIEW ──────────────────────────────────
const TECHNIQUE_INSTRUCTIONS = {
  chain_of_thought: 'Myśl krok po kroku i pokaż tok rozumowania przed podaniem ostatecznej odpowiedzi.',
  step_by_step:     'Podziel zadanie na numerowane kroki i wykonuj je po kolei.',
  think_loud:       'Myśl głośno — opisuj swój proces myślenia podczas analizy problemu.',
  verify:           'Po udzieleniu odpowiedzi sprawdź jej poprawność i wskaż potencjalne błędy.',
  alternatives:     'Podaj co najmniej 2-3 alternatywne podejścia lub rozwiązania.',
  pros_cons:        'Dla każdej opcji wymień plusy i minusy.',
  no_hallucinate:   'Jeśli nie jesteś pewien czegoś, napisz wprost że nie wiesz. Nie wymyślaj faktów, danych ani linków.',
  sources:          'Wskaż źródła lub podstawy dla kluczowych twierdzeń.',
};

function updateClaudePreview() {
  const preview = document.getElementById('claudePreview');
  const stats   = document.getElementById('cpStats');
  if (!preview) return;

  const role        = (document.getElementById('cpRole')        || {}).value?.trim() || '';
  const context     = (document.getElementById('cpContext')     || {}).value?.trim() || '';
  const task        = (document.getElementById('cpTask')        || {}).value?.trim() || '';
  const format      = (document.querySelector('input[name="cpf"]:checked') || {}).value || '';
  const tone        = (document.querySelector('input[name="cpt"]:checked') || {}).value || '';
  const constraints = (document.getElementById('cpConstraints') || {}).value?.trim() || '';
  const examples    = (document.getElementById('cpExamples')    || {}).value?.trim() || '';
  const techChecked = Array.from(document.querySelectorAll('#pCpTech input:checked')).map(c => c.value);

  // Build prompt
  const parts = [];

  if (role) parts.push(role + '\n');

  if (context) {
    parts.push('<context>');
    parts.push(context);
    parts.push('</context>\n');
  }

  if (task) {
    parts.push('<task>');
    parts.push(task);
    parts.push('</task>\n');
  }

  if (examples) {
    parts.push('<example>');
    parts.push(examples);
    parts.push('</example>\n');
  }

  // Techniques
  const techInstructions = techChecked.map(t => TECHNIQUE_INSTRUCTIONS[t]).filter(Boolean);
  if (techInstructions.length > 0 || format || tone || constraints) {
    parts.push('<instructions>');
    if (format)  parts.push(format);
    if (tone)    parts.push(tone);
    if (constraints) parts.push(constraints);
    techInstructions.forEach(t => parts.push(t));
    parts.push('</instructions>');
  }

  const prompt = parts.join('\n').trim();

  if (!prompt) {
    preview.innerHTML = '<div class="cp-empty">← Wypełnij formularz powyżej aby zobaczyć podgląd promptu</div>';
    if (stats) stats.innerHTML = '';
    return;
  }

  preview.textContent = prompt;

  // Stats
  if (stats) {
    const chars  = prompt.length;
    const tokens = Math.round(chars / 4);
    const model  = selectedClaudeModel ? MODELS[selectedClaudeModel] : null;
    stats.innerHTML = `
      <span>📝 <strong>${chars.toLocaleString()}</strong> znaków</span>
      <span>🪙 ~<strong>${tokens.toLocaleString()}</strong> tokenów</span>
      ${model ? `<span style="color:${model.color}">▸ <strong>${model.name}</strong> · ${model.id}</span>` : '<span>⚠ Wybierz model powyżej</span>'}
    `;
  }
}

function copyClaudePrompt() {
  const preview = document.getElementById('claudePreview');
  const text = preview?.textContent || '';
  if (!text || text.includes('Wypełnij formularz')) {
    showToast('Najpierw wypełnij formularz promptu', 'error');
    return;
  }
  navigator.clipboard.writeText(text).then(() => {
    const fb = document.getElementById('cpFB3');
    if (fb) { fb.style.opacity = '1'; setTimeout(() => fb.style.opacity = '0', 2400); }
    showToast('✓ Prompt skopiowany do schowka!');
  }).catch(() => {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    ta.remove();
    showToast('✓ Skopiowano!');
  });
}

// ─── PATCH switchMode ─────────────────────────────────────
// Override switchMode to handle 3rd tab
const _origSwitchMode = switchMode;
switchMode = function(m) {
  if (m === 'claude') {
    // deactivate others
    currentMode = 'claude';
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('on', 'on2'));
    const btn = document.querySelector('.tab[data-m="claude"]');
    if (btn) btn.classList.add('on');
    document.getElementById('mNew')    && (document.getElementById('mNew').style.display    = 'none');
    document.getElementById('mUpd')    && (document.getElementById('mUpd').style.display    = 'none');
    document.getElementById('mClaude') && (document.getElementById('mClaude').style.display = '');
    const topbarTitle = document.getElementById('topbarTitle');
    if (topbarTitle) topbarTitle.textContent = 'Prompt dla Claude';
  } else {
    document.getElementById('mClaude') && (document.getElementById('mClaude').style.display = 'none');
    _origSwitchMode(m);
  }
};
