(() => {
  const root = document.documentElement;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const wide = matchMedia('(min-width: 901px)');
  const copy = {
    clock: '9:14',
    agent: 'Claude Code',
    repo: 'billing',
    command: 'git push origin main',
    detail: '3 commits ahead of origin/main',
    request: 'Wants to run git push origin main. 3 commits ahead of origin/main.',
    approved: 'Approved. Pushed 3 commits to origin/main.'
  };

  const heroEl = document.getElementById('phone-hero');
  const flowEl = document.getElementById('phone-flow');
  let flow = null;
  if (window.PusharyPhone) {
    PusharyPhone.mount(heroEl, Object.assign({ autoplay: true }, copy));
    flow = PusharyPhone.mount(flowEl, Object.assign({ autoplay: false }, copy)).setState('approved');
  }

  // Line from the terminal's "needs your yes" row to the flow phone's notification.
  const ask = document.getElementById('ask');
  const termWrap = document.querySelector('.term-wrap');
  const flowSection = document.querySelector('.flow');
  const flowPhone = document.querySelector('.flow-phone');
  const NOTE_Y = 0.78;
  const NOTE_X = 41 / 490;
  const align = () => {
    if (!wide.matches) { flowPhone.style.marginTop = ''; return; }
    flowPhone.style.marginTop = '0px';
    const a = ask.getBoundingClientRect();
    const t = termWrap.getBoundingClientRect();
    const s = flowSection.getBoundingClientRect();
    const dev = flowEl.getBoundingClientRect();
    const askY = a.top + a.height / 2;
    const pad = parseFloat(getComputedStyle(flowSection).paddingTop);
    flowPhone.style.marginTop = (askY - s.top - pad - dev.height * NOTE_Y) + 'px';
    termWrap.style.setProperty('--wire-y', (askY - t.top) + 'px');
    termWrap.style.setProperty('--wire-w', (dev.left + dev.width * NOTE_X - t.right) + 'px');
  };
  addEventListener('resize', align);
  if (document.fonts) document.fonts.ready.then(align);
  align();

  if (reduced) return;
  root.classList.add('js');

  // Scroll crossfades the page light from cool to warm.
  let queued = false;
  const light = () => {
    queued = false;
    const max = root.scrollHeight - innerHeight;
    root.style.setProperty('--p', (max > 0 ? Math.min(1, Math.max(0, scrollY / max)) : 0).toFixed(3));
  };
  addEventListener('scroll', () => {
    if (!queued) { queued = true; requestAnimationFrame(light); }
  }, { passive: true });
  light();

  // While the flow is on screen, the steps light one at a time and the phone follows.
  const steps = [...document.querySelectorAll('.step')];
  let i = 0;
  let timer = null;
  const show = () => {
    steps.forEach((s, k) => s.classList.toggle('on', k === i));
    if (flow) flow.setState(steps[i].dataset.state);
    i = (i + 1) % steps.length;
  };
  steps[steps.length - 1].classList.add('on');
  new IntersectionObserver(([e]) => {
    clearInterval(timer);
    if (e.isIntersecting) { i = 0; show(); timer = setInterval(show, 3200); }
  }, { threshold: 0.35 }).observe(flowSection);
})();

document.querySelectorAll('.copy').forEach((b) => {
  b.addEventListener('click', () => {
    if (!navigator.clipboard) return;
    navigator.clipboard.writeText(b.dataset.copy).then(() => {
      b.textContent = 'Copied';
      setTimeout(() => { b.textContent = 'Copy'; }, 1600);
    });
  });
});
