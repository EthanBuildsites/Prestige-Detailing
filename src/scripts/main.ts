/**
 * Prestige Car Detailing: site interactions (dependency-free).
 *  1. Live open/closed status (Townsville time) + today's row in the hours table
 *  2. Header: scrolled / hide-on-scroll-down / active section link
 *  3. Mobile menu
 *  4. Scroll reveals, counters, parallax
 *  5. Back-to-top + mobile action bar
 *  6. Before / after slider
 *  7. Gallery lightbox
 */
import { site } from '../config/site';

const $ = <T extends Element = HTMLElement>(s: string, root: ParentNode = document) => root.querySelector<T>(s);
const $$ = <T extends Element = HTMLElement>(s: string, root: ParentNode = document) => [...root.querySelectorAll<T>(s)];
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* 1. Open now? ------------------------------------------------------------ */
function localNow() {
  const parts = new Intl.DateTimeFormat('en-AU', {
    timeZone: site.timeZone, weekday: 'short', hour: '2-digit', minute: '2-digit', hourCycle: 'h23',
  }).formatToParts(new Date());
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? '';
  const day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(get('weekday'));
  return { day, minutes: Number(get('hour')) * 60 + Number(get('minute')) };
}
const toMin = (hhmm: string) => { const [h, m] = hhmm.split(':').map(Number); return h * 60 + m; };
const fmt = (hhmm: string) => { const [h, m] = hhmm.split(':').map(Number); return `${h % 12 || 12}${m ? ':' + String(m).padStart(2, '0') : ''}${h < 12 ? 'am' : 'pm'}`; };
const hoursFor = (day: number) => site.hours.find((h) => h.day === day);
const dayName = (day: number) => hoursFor(day)?.label ?? '';

function statusText(): { open: boolean; text: string } {
  const { day, minutes } = localNow();
  const today = hoursFor(day);
  if (today?.open && minutes >= toMin(today.open) && minutes < toMin(today.close)) {
    const left = toMin(today.close) - minutes;
    return { open: true, text: left <= 60 ? `Open now · closes ${fmt(today.close)}` : `Open now · until ${fmt(today.close)}` };
  }
  if (today?.open && minutes < toMin(today.open)) return { open: false, text: `Closed · opens ${fmt(today.open)} today` };
  for (let i = 1; i <= 7; i++) {
    const d = (day + i) % 7;
    const h = hoursFor(d);
    if (h?.open) return { open: false, text: `Closed · opens ${i === 1 ? 'tomorrow' : dayName(d)} ${fmt(h.open)}` };
  }
  return { open: false, text: site.hoursSummary };
}

function updateStatus() {
  const { day } = localNow();
  $$('.hours tr').forEach((tr) => tr.classList.toggle('today', Number(tr.dataset.day) === day));
  const s = statusText();
  $$('[data-status]').forEach((el) => {
    el.dataset.open = String(s.open);
    const t = $('[data-status-text]', el);
    if (t) t.textContent = s.text;
  });
}
updateStatus();
setInterval(updateStatus, 60_000);

/* 2. Header -------------------------------------------------------------- */
const header = $('[data-header]');
let lastY = window.scrollY;
const onScroll = () => {
  const y = window.scrollY;
  header?.classList.toggle('is-scrolled', y > 40);
  // Hide on scroll down, reveal on scroll up (only once well past the hero).
  if (!header?.classList.contains('is-open')) {
    header?.classList.toggle('is-hidden', y > lastY && y > window.innerHeight * 0.9);
  }
  lastY = y;
  const past = y > window.innerHeight * 0.8;
  $('[data-to-top]')?.classList.toggle('show', past);
  const nearContact = ($('#contact')?.getBoundingClientRect().top ?? Infinity) < window.innerHeight * 0.6;
  $('[data-mbar]')?.classList.toggle('show', past && !nearContact);
};
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

// Active section link
const navLinks = $$<HTMLAnchorElement>('[data-nav-link]');
const sectionIds = navLinks.map((a) => a.hash.slice(1));
const spy = new IntersectionObserver(
  (entries) => entries.forEach((e) => {
    if (!e.isIntersecting) return;
    let id = e.target.id;
    if (id === 'why') id = 'services';
    if (id === 'reviews') id = 'gallery';
    navLinks.forEach((a) => a.classList.toggle('is-active', a.hash === `#${id}`));
  }),
  { rootMargin: '-45% 0px -50% 0px' },
);
[...sectionIds, 'why', 'reviews'].forEach((id) => { const el = document.getElementById(id); if (el) spy.observe(el); });

/* 3. Mobile menu --------------------------------------------------------- */
const toggle = $<HTMLButtonElement>('[data-menu-toggle]');
const menuLinks = $$<HTMLAnchorElement>('[data-menu-link]');
const setMenu = (open: boolean) => {
  if (!toggle || !header) return;
  header.classList.toggle('is-open', open);
  header.classList.remove('is-hidden');
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  menuLinks.forEach((a) => (a.tabIndex = open ? 0 : -1));
  document.documentElement.style.overflow = open ? 'hidden' : '';
};
toggle?.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
menuLinks.forEach((a) => a.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && header?.classList.contains('is-open')) { setMenu(false); toggle?.focus(); }
});
window.matchMedia('(min-width: 1040px)').addEventListener('change', (e) => e.matches && setMenu(false));

/* 4. Reveals, counters, parallax ---------------------------------------- */
function countUp(el: HTMLElement) {
  const target = Number(el.dataset.count);
  if (!target || reducedMotion) return;
  const start = target > 1000 ? target - 40 : 0;
  const t0 = performance.now();
  const dur = 1600;
  const step = (t: number) => {
    const p = Math.min(1, (t - t0) / dur);
    el.textContent = String(Math.round(start + (target - start) * (1 - Math.pow(1 - p, 4))));
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

const revealTargets = $$('[data-reveal], [data-wipe]');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver(
    (entries) => entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add('is-visible');
      $$<HTMLElement>('[data-count]', e.target).forEach(countUp);
      io.unobserve(e.target);
    }),
    { rootMargin: '0px 0px -8% 0px', threshold: 0.06 },
  );
  revealTargets.forEach((t) => io.observe(t));
} else {
  revealTargets.forEach((t) => t.classList.add('is-visible'));
}

const parallaxEls = $$('[data-parallax]');
if (!reducedMotion && parallaxEls.length) {
  let ticking = false;
  const update = () => {
    const vh = window.innerHeight;
    parallaxEls.forEach((el) => {
      const r = (el.parentElement ?? el).getBoundingClientRect();
      if (r.bottom < -200 || r.top > vh + 200) return;
      const speed = Number(el.dataset.parallax) || 0.1;
      const offset = (r.top + r.height / 2 - vh / 2) * -speed;
      el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
    });
    ticking = false;
  };
  window.addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
  window.addEventListener('resize', update);
  update();
}

/* 6. Before / after ------------------------------------------------------ */
$$('[data-ba]').forEach((ba) => {
  const range = $<HTMLInputElement>('[data-ba-range]', ba);
  const set = (v: string | number) => ba.style.setProperty('--pos', `${v}%`);
  range?.addEventListener('input', () => set(range.value));
  // Touch / mouse: drag anywhere on the image (iOS range inputs only respond to the thumb).
  const fromPointer = (e: PointerEvent) => {
    const r = ba.getBoundingClientRect();
    const v = Math.max(0, Math.min(100, ((e.clientX - r.left) / r.width) * 100));
    set(v.toFixed(1));
    if (range) { range.value = v.toFixed(0); range.dataset.touched = '1'; }
  };
  let dragging = false;
  ba.addEventListener('dragstart', (e) => e.preventDefault());
  ba.addEventListener('pointerdown', (e) => {
    if (e.pointerType === 'mouse') e.preventDefault();
    dragging = true;
    ba.setPointerCapture(e.pointerId);
    fromPointer(e);
  });
  ba.addEventListener('pointermove', (e) => { if (dragging) fromPointer(e); });
  const stop = () => { dragging = false; };
  ba.addEventListener('pointerup', stop);
  ba.addEventListener('pointercancel', stop);
  // Gentle hint animation the first time it scrolls into view.
  if (!reducedMotion && range) {
    const io = new IntersectionObserver((entries) => {
      if (!entries[0].isIntersecting) return;
      io.disconnect();
      let t0: number | null = null;
      const anim = (t: number) => {
        if (range.dataset.touched) return;
        t0 ??= t;
        const p = Math.min(1, (t - t0) / 2200);
        const v = 50 + Math.sin(p * Math.PI * 2) * 22 * (1 - p);
        set(v.toFixed(1)); range.value = v.toFixed(0);
        if (p < 1) requestAnimationFrame(anim);
      };
      setTimeout(() => requestAnimationFrame(anim), 500);
    }, { threshold: 0.6 });
    io.observe(ba);
    range.addEventListener('pointerdown', () => (range.dataset.touched = '1'), { once: true });
    range.addEventListener('keydown', () => (range.dataset.touched = '1'), { once: true });
  }
});

/* 7. Lightbox ------------------------------------------------------------ */
const dialog = $<HTMLDialogElement>('[data-lightbox-dialog]');
const shots = $$<HTMLButtonElement>('[data-lightbox]');
if (dialog && shots.length) {
  const img = $<HTMLImageElement>('[data-lb-img]', dialog)!;
  const cap = $('[data-lb-cap]', dialog)!;
  let index = 0;
  let opener: HTMLElement | null = null;
  const show = (i: number) => {
    index = (i + shots.length) % shots.length;
    const s = shots[index];
    img.src = s.dataset.src!;
    img.alt = s.dataset.alt ?? '';
    cap.textContent = `${s.dataset.title} · Illustrative · ${index + 1} / ${shots.length}`;
  };
  shots.forEach((s, i) => s.addEventListener('click', () => {
    opener = s;
    show(i);
    dialog.showModal();
    document.documentElement.style.overflow = 'hidden';
  }));
  $('[data-lb-close]', dialog)?.addEventListener('click', () => dialog.close());
  $('[data-lb-prev]', dialog)?.addEventListener('click', () => show(index - 1));
  $('[data-lb-next]', dialog)?.addEventListener('click', () => show(index + 1));
  dialog.addEventListener('click', (e) => { if (e.target === dialog || (e.target as Element).tagName === 'FIGURE') dialog.close(); });
  // Swipe left / right between images on touch screens.
  let startX = 0, startY = 0;
  dialog.addEventListener('touchstart', (e) => { startX = e.touches[0].clientX; startY = e.touches[0].clientY; }, { passive: true });
  dialog.addEventListener('touchend', (e) => {
    const dx = e.changedTouches[0].clientX - startX, dy = e.changedTouches[0].clientY - startY;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) show(index + (dx < 0 ? 1 : -1));
  }, { passive: true });
  dialog.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') show(index + 1);
    if (e.key === 'ArrowLeft') show(index - 1);
  });
  dialog.addEventListener('close', () => { document.documentElement.style.overflow = ''; opener?.focus(); });
}
