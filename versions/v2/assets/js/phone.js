// Hero phone loop: request arrives, long-press, Approve, approved state, next message. 9.8s.
// Pauses offscreen and resumes on a settled notification, so every frame is one iOS state.
(function () {
  var lock = document.getElementById('lock');
  var stage = document.getElementById('stage');
  if (!lock || !stage) return;
  var n1 = lock.querySelector('.n1');
  var menu = lock.querySelector('.menu');
  var approve = lock.querySelector('.mi-ok');

  function place() { menu.style.top = n1.offsetHeight + 10 + 'px'; }

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    lock.className += ' a1 open';
    place();
    return;
  }

  function reset(extra) {
    lock.className = 'device-screen lock' + (extra || '');
    approve.classList.remove('tap');
    stage.className = 'stage';
    place();
  }

  var steps = [
    [0, function () { reset(); }],
    [350, function () { lock.classList.add('a1'); }],
    [1750, function () { lock.classList.add('press'); }],
    [2080, function () { lock.classList.remove('press'); lock.classList.add('open'); place(); }],
    [3900, function () { approve.classList.add('tap'); }],
    [4250, function () { lock.classList.remove('open'); lock.classList.add('ok'); stage.classList.add('s-ok'); }],
    [6500, function () { lock.classList.add('gone'); }],
    [6950, function () { lock.classList.add('a2'); stage.classList.add('s-end'); }],
    [9300, function () { lock.classList.add('out'); }]
  ];
  var LOOP = 9800;
  var RESUME_AT = 900;
  var timers = [];
  var paused = false;

  function run(from) {
    steps.forEach(function (s) {
      if (s[0] >= from) timers.push(setTimeout(s[1], s[0] - from));
    });
    timers.push(setTimeout(function () { run(0); }, LOOP - from));
  }
  function stop() { timers.forEach(clearTimeout); timers = []; }

  run(0);
  window.addEventListener('resize', place);

  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      var visible = entries[0].isIntersecting;
      if (!visible && !paused) { paused = true; stop(); }
      else if (visible && paused) { paused = false; reset(' a1 still'); run(RESUME_AT); }
    }).observe(stage);
  }
})();
