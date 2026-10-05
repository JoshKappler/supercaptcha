// Hero lock-screen loop: notification arrives, long-press, Approve, "Approved", next message. 9.5s.
(() => {
  const ls = document.getElementById('ls');
  if (!ls) return;
  const lines = [...document.querySelectorAll('.term-body li')];
  const n1 = document.getElementById('n1');
  const n2 = document.getElementById('n2');
  const approve = document.getElementById('approveBtn');
  const replay = document.getElementById('replay');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let timers = [];

  const setState = (s) => { ls.dataset.state = s; };
  const showLines = (n) => lines.forEach((li, i) => li.classList.toggle('on', i < n));
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
    at(500, () => showLines(5));
    if (!loop) return;
    at(3400, () => { measure(); setState('next'); showLines(6); });
    at(5200, () => setState('reset'));
    at(5700, run);
  }

  function run() {
    clear();
    setState('idle');
    showLines(0);
    measure();
    at(100, () => showLines(1));
    at(300, () => showLines(2));
    at(500, () => { showLines(3); setState('arrive'); });
    at(750, () => showLines(4));
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
    if (reduced) { setState('expanded'); showLines(4); return; }
    run();
  });

  if (reduced) {
    setState('expanded');
    measure();
    showLines(4);
  } else {
    run();
  }
})();
