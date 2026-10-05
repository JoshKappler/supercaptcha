(() => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const STATES = ['is-in', 'is-press', 'is-open', 'is-tap', 'is-done', 'is-next', 'is-out'];

  function setState(phone, on) {
    STATES.forEach((c) => phone.classList.toggle(c, on.includes(c)));
  }

  function measure(phone) {
    const b = phone.querySelector('.note--b');
    if (b) phone.style.setProperty('--bh', b.offsetHeight + 'px');
  }

  // Hero: one approval loop, 9.8s.
  const hero = document.getElementById('heroPhone');
  if (hero) {
    measure(hero);
    if (reduce) {
      setState(hero, ['is-in', 'is-open']);
    } else {
      const timeline = [
        [0, []],
        [400, ['is-in']],
        [2000, ['is-in', 'is-press']],
        [2350, ['is-in', 'is-open']],
        [4150, ['is-in', 'is-open', 'is-tap']],
        [4550, ['is-in', 'is-done']],
        [6700, ['is-in', 'is-done', 'is-next']],
        [9350, ['is-in', 'is-done', 'is-next', 'is-out']],
      ];
      const LOOP = 9800;
      let timers = [];
      const snap = (s) => {
        hero.classList.add('no-anim');
        setState(hero, s);
        void hero.offsetWidth;
        hero.classList.remove('no-anim');
      };
      const run = () => {
        timers.forEach(clearTimeout);
        snap([]);
        timers = timeline.map(([t, s]) => setTimeout(() => setState(hero, s), t));
        timers.push(setTimeout(run, LOOP));
      };
      // While the page scrolls, hold the resting notification; resume once scrolling stops.
      let idle = null;
      window.addEventListener('scroll', () => {
        timers.forEach(clearTimeout);
        timers = [];
        snap(['is-in']);
        clearTimeout(idle);
        idle = setTimeout(run, 1500);
      }, { passive: true });
      if (document.readyState === 'complete') run();
      else window.addEventListener('load', run, { once: true });
    }
  }

  // Story: the phone follows the step being read.
  const story = document.getElementById('storyPhone');
  const steps = [...document.querySelectorAll('#steps .step')];
  const dots = [...document.querySelectorAll('.story .dots span')];
  const STEP_STATES = {
    1: [],
    2: ['is-in', 'is-open'],
    3: ['is-in', 'is-done', 'is-next'],
  };
  let current = 0;
  function show(n) {
    if (!story || n === current) return;
    current = n;
    setState(story, STEP_STATES[n]);
    steps.forEach((s) => s.classList.toggle('is-active', +s.dataset.step === n));
    dots.forEach((d, i) => d.classList.toggle('is-active', i + 1 === n));
  }

  if (story) {
    measure(story);
    show(1);
    const narrow = window.matchMedia('(max-width: 900px)');
    steps.forEach((s) => s.addEventListener('click', () => show(+s.dataset.step)));

    const onScroll = () => {
      if (narrow.matches) return;
      const mid = window.innerHeight / 2;
      let best = 1, dist = Infinity;
      steps.forEach((s) => {
        const r = s.getBoundingClientRect();
        const d = Math.abs(r.top + r.height / 2 - mid);
        if (d < dist) { dist = d; best = +s.dataset.step; }
      });
      show(best);
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    if (!reduce) {
      let timer = null;
      const io = new IntersectionObserver(([e]) => {
        clearInterval(timer);
        if (e.isIntersecting && narrow.matches) {
          timer = setInterval(() => show((current % 3) + 1), 3200);
        }
      }, { threshold: 0.4 });
      io.observe(story);
    }
  }

  window.addEventListener('resize', () => {
    if (hero) measure(hero);
    if (story) measure(story);
  });

  // Copy command
  document.querySelectorAll('[data-copy]').forEach((btn) => {
    btn.addEventListener('click', async () => {
      try { await navigator.clipboard.writeText(btn.dataset.copy); } catch (_) { return; }
      const label = btn.querySelector('span');
      btn.classList.add('is-done');
      label.textContent = 'Copied';
      setTimeout(() => { btn.classList.remove('is-done'); label.textContent = 'Copy'; }, 1600);
    });
  });
})();

document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener('click', (e) => {
    const el = document.querySelector(a.getAttribute('href'));
    if (!el) return;
    e.preventDefault();
    const smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto' });
  });
});

// Nav: glass once the page scrolls, menu on small screens.
(() => {
  const nav = document.querySelector('.nav');
  const btn = nav.querySelector('.menu-btn');
  const onScroll = () => nav.classList.toggle('is-scrolled', window.scrollY > 8);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
  const setOpen = (open) => {
    nav.classList.toggle('is-open', open);
    btn.setAttribute('aria-expanded', String(open));
    btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  };
  btn.addEventListener('click', () => setOpen(!nav.classList.contains('is-open')));
  nav.querySelectorAll('.menu a').forEach((a) => a.addEventListener('click', () => setOpen(false)));
})();

// Footer columns collapse on small screens.
(() => {
  const mq = window.matchMedia('(max-width: 900px)');
  const cols = document.querySelectorAll('.fcol');
  const sync = () => cols.forEach((d) => { d.open = !mq.matches; });
  sync();
  mq.addEventListener('change', sync);
})();
