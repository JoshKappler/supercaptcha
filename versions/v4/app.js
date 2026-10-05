(() => {
  const ios = document.getElementById('ios');
  const nA = document.getElementById('nA');
  const nB = document.getElementById('nB');
  const ask = nA.querySelector('.n-ask');
  const ok = nA.querySelector('.n-ok');
  const acts = document.getElementById('acts');
  const approveBtn = document.getElementById('aApprove');
  const chip = document.getElementById('palChip');
  const askSub = document.getElementById('palAskSub');
  const status = document.getElementById('palStatus');
  const statusText = document.getElementById('palStatusText');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const STATES = ['s-in', 's-press', 's-open', 's-menuout', 's-hide', 's-ok', 's-okshow', 's-fold', 's-stack', 's-out'];
  const PAD = 27;
  let timers = [];
  let hAsk = 0;
  let hOk = 0;

  const later = (ms, fn) => timers.push(setTimeout(fn, ms));
  const set = (...add) => ios.classList.add(...add);
  const unset = (...rm) => ios.classList.remove(...rm);

  function measure() {
    hAsk = ask.offsetHeight + PAD;
    hOk = ok.offsetHeight + PAD;
    acts.style.setProperty('--acts-top', hAsk + 10 + 'px');
    ios.style.setProperty('--ty', nB.offsetHeight + 10 - hOk * 0.94 + 'px');
  }

  function layout() {
    measure();
    if (!ios.classList.contains('s-ok')) nA.style.height = hAsk + 'px';
  }

  function palette(phase) {
    chip.classList.remove('is-ok', 'is-done');
    status.classList.remove('is-ok');
    if (phase === 'wait') {
      chip.textContent = 'auto-deny 30s';
      askSub.textContent = 'Ship the billing webhook';
      statusText.textContent = 'Sent to your phone';
    } else if (phase === 'ok') {
      chip.classList.add('is-ok');
      chip.innerHTML = 'Approved<span class="chip-via"> · Phone</span>';
      status.classList.add('is-ok');
      statusText.textContent = 'Approved from your phone';
    } else if (phase === 'done') {
      chip.classList.add('is-done');
      chip.textContent = 'Finished';
      status.classList.add('is-ok');
      askSub.textContent = 'Ship the billing webhook · pushed';
      statusText.textContent = 'Codex kept working';
    }
  }

  function springIn(el) {
    el.classList.remove('spring');
    void el.offsetWidth;
    el.classList.add('spring');
  }

  // The menu leaves first, then the blur clears, then the card empties,
  // resizes to the shorter "Approved" content and fills again. The
  // dashboard flips only once the phone shows "Approved".
  function approve() {
    timers.forEach(clearTimeout);
    timers = [];
    approveBtn.classList.add('tap');
    later(250, () => { approveBtn.classList.remove('tap'); set('s-menuout'); });
    later(450, () => unset('s-open', 's-menuout'));
    later(800, () => set('s-hide'));
    later(950, () => { set('s-ok'); nA.style.height = hOk + 'px'; });
    later(1110, () => { set('s-okshow'); palette('ok'); });
    later(2900, () => set('s-fold'));
    later(3040, () => { set('s-stack'); nB.classList.add('in'); springIn(nB); palette('done'); });
    later(5300, () => set('s-out'));
    later(5800, run);
  }

  function run() {
    timers.forEach(clearTimeout);
    timers = [];
    set('no-anim');
    unset(...STATES);
    nB.classList.remove('in', 'spring');
    nA.classList.remove('spring');
    approveBtn.classList.remove('tap');
    measure();
    nA.style.height = hAsk + 'px';
    void ios.offsetWidth;
    unset('no-anim');
    palette('wait');
    later(120, () => { set('s-in'); springIn(nA); });
    later(1900, () => { nA.classList.remove('spring'); set('s-press'); });
    later(2400, () => { unset('s-press'); set('s-open'); });
    later(3700, approve);
  }

  if (reduced) {
    layout();
    set('s-in', 's-open');
    palette('wait');
  } else {
    // Start fresh whenever the phone scrolls into view; rest while hidden.
    let visible = false;
    new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !visible) run();
      if (!entry.isIntersecting && visible) { timers.forEach(clearTimeout); timers = []; }
      visible = entry.isIntersecting;
    }).observe(ios);
    approveBtn.addEventListener('click', () => { if (ios.classList.contains('s-open')) approve(); });
    document.getElementById('replay').addEventListener('click', run);
  }
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(layout);
  window.addEventListener('load', layout);
  window.addEventListener('resize', layout);

  const menuBtn = document.getElementById('menuBtn');
  const menu = document.getElementById('menu');
  const setMenu = (open) => { menu.hidden = !open; menuBtn.setAttribute('aria-expanded', String(open)); };
  menuBtn.addEventListener('click', () => setMenu(menu.hidden));
  menu.addEventListener('click', (e) => { if (e.target.closest('a')) setMenu(false); });

  const copyBtn = document.getElementById('copyCmd');
  copyBtn.addEventListener('click', async () => {
    const label = copyBtn.querySelector('span');
    try {
      await navigator.clipboard.writeText(document.getElementById('cmd').textContent);
      label.textContent = 'Copied';
    } catch (e) {
      label.textContent = 'Select and copy';
    }
    setTimeout(() => { label.textContent = 'Copy'; }, 1600);
  });
})();
