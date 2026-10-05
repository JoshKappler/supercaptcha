(() => {
  const phone = document.querySelector('[data-phone]');
  const stage = document.querySelector('[data-demo]');
  const term = document.querySelector('[data-term]');
  const steps = [...document.querySelectorAll('.meter-steps li')];
  const n2 = phone.querySelector('.n2');
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Phase start times in seconds; one loop is LOOP seconds.
  const PHASES = [
    ['idle', 0], ['arrive', 0.45], ['press', 1.85], ['open', 2.35],
    ['tap', 3.9], ['ok', 4.25], ['next', 5.0], ['out', 9.2],
  ];
  const LOOP = 9.7;
  // Meter: 1 asks (notification shown), 2 decide (menu open), 3 approved, 4 agent continues.
  const STEP_OF = { idle: 0, arrive: 1, press: 1, open: 2, tap: 2, ok: 3, next: 4, out: 4 };

  let start = performance.now();
  let current = '';

  function render(phase) {
    if (phase === current) return;
    current = phase;
    phone.dataset.phase = phase;
    if (phase === 'next') phone.style.setProperty('--push', `${n2.offsetHeight + 8}px`);
    if (phase === 'idle' || phase === 'arrive') phone.style.setProperty('--push', '0px');
    const step = STEP_OF[phase];
    steps.forEach((li, i) => li.classList.toggle('on', i + 1 === step));
    stage.classList.toggle('s-open', phase === 'open');
    term.classList.toggle('s-ok', phase === 'ok');
    term.classList.toggle('s-done', phase === 'next' || phase === 'out');
  }

  function phaseAt(t) {
    let name = PHASES[0][0];
    for (const [p, at] of PHASES) if (t >= at) name = p;
    return name;
  }

  function tick(now) {
    const t = ((now - start) / 1000) % LOOP;
    render(phaseAt(t));
    requestAnimationFrame(tick);
  }

  if (reduce) {
    render('open');
    stage.classList.remove('s-open');
  } else {
    requestAnimationFrame(tick);
    phone.querySelector('[data-approve]').addEventListener('click', () => {
      if (current === 'open') start = performance.now() - 3900;
    });
    document.querySelector('[data-replay]').addEventListener('click', () => {
      start = performance.now();
    });
  }

  if (window.matchMedia('(max-width: 640px)').matches) {
    document.querySelectorAll('[data-collapse] details').forEach((d) => d.removeAttribute('open'));
  }

  document.querySelectorAll('[data-copy]').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const label = btn.querySelector('span');
      try {
        await navigator.clipboard.writeText(btn.dataset.copy);
        label.textContent = 'Copied';
      } catch {
        label.textContent = 'Select to copy';
      }
      setTimeout(() => { label.textContent = 'Copy'; }, 1600);
    });
  });
})();
