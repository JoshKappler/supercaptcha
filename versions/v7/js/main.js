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
  if (window.PusharyPhone) {
    PusharyPhone.mount(heroEl, Object.assign({ autoplay: true }, copy));
    var flow = PusharyPhone.mount(flowEl, Object.assign({ autoplay: false }, copy));
  }

  // Line from the terminal's "needs your yes" row to the flow phone's notification.
  const ask = document.getElementById('ask');
  const termWrap = document.querySelector('.term-wrap');
  const flowSection = document.querySelector('.flow');
  const flowPhone = document.querySelector('.flow-phone');
  const NOTE_Y = 0.78;
  const NOTE_X = 41 / 490;
  const align = () => {
    if (!wide.matches) return;
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

  // Scroll moves the page light from cool to warm and lights one step at a time.
  const steps = [...document.querySelectorAll('.step')];
  let current = null;
  let queued = false;
  const update = () => {
    queued = false;
    const max = root.scrollHeight - innerHeight;
    root.style.setProperty('--p', (max > 0 ? Math.min(1, Math.max(0, scrollY / max)) : 0).toFixed(3));
    const mid = innerHeight * 0.55;
    let best = steps[0];
    let dist = Infinity;
    for (const s of steps) {
      const r = s.getBoundingClientRect();
      const d = Math.abs(r.top + r.height / 2 - mid);
      if (d < dist) { dist = d; best = s; }
    }
    if (best !== current) {
      steps.forEach((s) => s.classList.toggle('on', s === best));
      current = best;
      if (flow) flow.setState(best.dataset.state);
    }
  };
  addEventListener('scroll', () => {
    if (!queued) { queued = true; requestAnimationFrame(update); }
  }, { passive: true });
  addEventListener('resize', update);
  update();
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
