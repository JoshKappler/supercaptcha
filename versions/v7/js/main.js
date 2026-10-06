(() => {
  const root = document.documentElement;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const copy = {
    clock: '9:14',
    agent: 'Claude Code',
    repo: 'billing',
    command: 'git push origin main',
    detail: '3 commits ahead of origin/main',
    request: 'Wants to run git push origin main. 3 commits ahead of origin/main.',
    approved: 'Approved. Pushed 3 commits to origin/main.'
  };

  if (window.PusharyPhone) PusharyPhone.mount(document.getElementById('phone-hero'), Object.assign({ autoplay: true }, copy));

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

  // While the flow is on screen, the steps light one at a time and the terminal follows.
  const steps = [...document.querySelectorAll('.step')];
  let i = 0;
  let timer = null;
  const term = document.querySelector('.term');
  const show = () => {
    const state = steps[i].dataset.state;
    steps.forEach((s, k) => s.classList.toggle('on', k === i));
    term.classList.toggle('done', state === 'approved');
    i = (i + 1) % steps.length;
  };
  steps[steps.length - 1].classList.add('on');
  new IntersectionObserver(([e]) => {
    clearInterval(timer);
    if (e.isIntersecting) { i = 0; show(); timer = setInterval(show, 3200); }
  }, { threshold: 0.35 }).observe(document.querySelector('.flow'));
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
