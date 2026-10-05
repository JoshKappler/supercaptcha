(function () {
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var narrow = window.matchMedia('(max-width: 640px)');
  var ios = document.getElementById('ios');
  var stage = document.getElementById('stage');
  var ask = document.getElementById('nAsk');
  var next = document.getElementById('nNext');
  var approve = document.getElementById('approveBtn');
  var deny = document.getElementById('denyBtn');
  var line = function (k) { return document.querySelector('.term [data-l="' + k + '"]'); };
  var timers = [];

  function at(ms, fn) { timers.push(setTimeout(fn, ms)); }
  function clear() { timers.forEach(clearTimeout); timers = []; }
  function on(el, c) { el.classList.add(c); if (el === ios && c === 'menu') stage.classList.add('tap'); }
  function off(el, c) { el.classList.remove(c); if (el === ios && c === 'menu') stage.classList.remove('tap'); }

  function setWait(text, ok) {
    line('wait').querySelector('.t').innerHTML = '&nbsp;&nbsp;└ ' + text;
    line('wait').classList.toggle('ok', !!ok);
  }

  function reset() {
    on(ios, 'noanim');
    ios.className = 'device-screen ios noanim';
    stage.classList.remove('tap');
    ask.className = 'noti main';
    next.className = 'noti';
    off(approve, 'down');
    setWait('question sent to your phone');
    on(line('ask'), 'ask');
    on(line('pushed'), 'hide');
    on(line('done'), 'hide');
    void ios.offsetWidth;
    off(ios, 'noanim');
  }

  function arrive(el, t) {
    at(t, function () { on(el, 'in'); });
    at(t + 520, function () { off(el, 'in'); on(el, 'shown'); });
  }

  function openMenu(t) {
    at(t, function () { on(ask, 'press'); });
    at(t + 200, function () { off(ask, 'press'); on(ios, 'blur'); });
    at(t + 450, function () { on(ios, 'menu'); });
  }

  // Tap Approve at t: highlight, dismiss menu, then blur, then show the approved card.
  function approveAt(t) {
    at(t, function () { on(approve, 'down'); });
    at(t + 150, function () { off(ios, 'menu'); });
    at(t + 250, function () { off(approve, 'down'); });
    at(t + 280, function () { off(ios, 'blur'); });
    at(t + 580, function () { on(ask, 'swap'); });
    at(t + 730, function () {
      on(ask, 'approved'); off(ask, 'swap');
      off(line('ask'), 'ask');
      setWait('approved from phone', true);
    });
    at(t + 900, function () { off(line('pushed'), 'hide'); });
    at(t + 1200, function () {
      off(ask, 'shown'); on(ask, 'tuck');
      on(next, 'grouped');
      off(line('done'), 'hide');
      if (narrow.matches) setWait('pushed, task finished', true);
    });
    arrive(next, t + 1200);
    if (!reduce) {
      at(t + 5000, function () { on(ios, 'fade'); });
      at(t + 5600, run);
    }
  }

  function run() {
    clear();
    reset();
    if (reduce) {
      ios.className = 'device-screen ios has-n blur menu';
      stage.classList.add('tap');
      on(ask, 'shown');
      return;
    }
    at(150, function () { on(ios, 'has-n'); });
    arrive(ask, 150);
    openMenu(1500);
    approveAt(3800);
  }

  approve.addEventListener('click', function () {
    if (!ios.classList.contains('menu')) return;
    clear();
    approveAt(0);
  });
  deny.addEventListener('click', function () {
    if (!ios.classList.contains('menu')) return;
    clear();
    off(ios, 'menu');
    at(100, function () { off(ios, 'blur'); });
    at(400, function () { off(ask, 'shown'); on(ask, 'tuck'); });
    at(1500, run);
  });
  ask.addEventListener('click', function () {
    if (ios.classList.contains('blur') || ask.classList.contains('approved') || !ask.classList.contains('shown')) return;
    clear();
    openMenu(0);
  });
  document.getElementById('replay').addEventListener('click', run);
  run();

  var groups = document.querySelectorAll('.dg');
  function syncGroups() { groups.forEach(function (g) { g.open = !narrow.matches; }); }
  syncGroups();
  narrow.addEventListener('change', syncGroups);

  document.querySelectorAll('[data-copy]').forEach(function (b) {
    b.addEventListener('click', function () {
      var done = function () {
        b.classList.add('done');
        var i = b.querySelector('.i');
        i.classList.replace('i-copy', 'i-check');
        setTimeout(function () { b.classList.remove('done'); i.classList.replace('i-check', 'i-copy'); }, 1600);
      };
      if (navigator.clipboard) navigator.clipboard.writeText(b.dataset.copy).then(done, done); else done();
    });
  });

  var top = document.getElementById('top');
  var mb = top.querySelector('.menu-btn');
  mb.addEventListener('click', function () {
    var open = top.classList.toggle('open');
    mb.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  top.querySelectorAll('.drawer a').forEach(function (a) {
    a.addEventListener('click', function () { top.classList.remove('open'); mb.setAttribute('aria-expanded', 'false'); });
  });
})();
