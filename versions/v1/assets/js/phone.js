// Hero lock-screen loop: notification arrives, long-press, Approve, "Approved", next message. 9.5s.
(() => {
  const ls = document.getElementById('ls');
  if (!ls) return;
  const term = document.querySelector('.term');
  const stage = document.getElementById('stage');
  const n1 = document.getElementById('n1');
  const n2 = document.getElementById('n2');
  const approve = document.getElementById('approveBtn');
  const replay = document.getElementById('replay');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let timers = [];

  const HINT = { expanded: 'tap', tap: 'tap', approved: 'done', next: 'done', reset: 'done' };
  const setState = (s) => {
    ls.dataset.state = s;
    stage.dataset.hint = HINT[s] || 'wait';
    term.classList.toggle('is-done', HINT[s] === 'done');
  };
  const measure = () => {
    ls.style.setProperty('--n1h', n1.offsetHeight + 'px');
    ls.style.setProperty('--n2h', n2.offsetHeight + 'px');
  };
  const clear = () => { timers.forEach(clearTimeout); timers = []; };
  const at = (ms, fn) => timers.push(setTimeout(fn, ms));

  function fromTap(loop) {
    approve.classList.add('is-hit');
    setState('tap');
    at(350, () => { approve.classList.remove('is-hit'); setState('approved'); });
    if (!loop) return;
    at(3400, () => { measure(); setState('next'); });
    at(5200, () => setState('reset'));
    at(5700, run);
  }

  function run() {
    clear();
    setState('idle');
    measure();
    at(500, () => setState('arrive'));
    at(1800, () => { measure(); setState('press'); });
    at(2150, () => { setState('expanded'); measure(); });
    at(3800, () => { clear(); fromTap(true); });
  }

  approve.addEventListener('click', () => {
    if (ls.dataset.state !== 'expanded') return;
    clear();
    fromTap(!reduced);
  });
  replay.addEventListener('click', () => {
    if (reduced) { setState('expanded'); return; }
    run();
  });

  if (reduced) {
    setState('expanded');
    measure();
  } else {
    run();
  }
})();
