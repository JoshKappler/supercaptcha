/* One session, two screens: scroll moves the shared timeline; the phone follows the terminal. */
(function () {
  'use strict';

  var root = document.documentElement;
  var still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var wide = matchMedia('(min-width: 900px)');
  root.classList.add('js', still ? 'still' : 'motion');

  var beats = [].slice.call(document.querySelectorAll('.beat'));
  var terms = beats.map(function (b) { return b.querySelector('.term'); });
  var el = document.getElementById('phone');
  var phone = window.PusharyPhone ? PusharyPhone.mount(el) : null;
  var screen = el.querySelector('.iphone__screen');
  var clock = el.querySelector('.pp-clock text');

  terms.forEach(function (t) {
    var d = 0;
    [].forEach.call(t.children, function (row) {
      row.style.setProperty('--d', d + 'ms');
      var typed = row.querySelector('.t');
      if (row.classList.contains('ln--cmd') && typed) {
        var n = typed.textContent.length, tt = n * 24;
        typed.style.setProperty('--n', n);
        typed.style.setProperty('--tt', tt + 'ms');
        d += tt + 220;
      } else {
        d += row.classList.contains('ln--a') ? 180 : 130;
      }
    });
  });

  var timers = [];
  function clearTimers() { timers.forEach(clearTimeout); timers = []; }
  function later(ms, fn) { timers.push(setTimeout(fn, ms)); }

  var shown = screen.getAttribute('data-state');
  function instant(state) {
    screen.classList.add('is-instant');
    phone.setState(state);
    void screen.offsetWidth;
    screen.classList.remove('is-instant');
  }
  function show(state, time) {
    if (clock && time && clock.textContent !== time) clock.textContent = time;
    clearTimers();
    if (!phone || state === shown) return;
    var from = shown;
    shown = state;
    if (still) return instant(state);
    if (from === 'expanded' && state === 'approved') {
      phone.apply('tap');
      later(360, function () { phone.setState('approved'); });
    } else if (state === 'expanded' && from === 'locked') {
      phone.setState('arrived');
      later(1300, function () { phone.apply('press'); });
      later(1700, function () { phone.setState('expanded'); });
    } else {
      phone.setState(state);
    }
  }

  var active = -1;
  function activate(i) {
    if (i === active) return;
    active = i;
    beats.forEach(function (b, k) {
      b.classList.toggle('is-active', k === i);
      if (k <= i) terms[k].classList.add('is-live');
    });
    show(beats[i].dataset.state, beats[i].dataset.clock);
  }

  var ticking = false;
  function onScroll() {
    if (ticking || !wide.matches) return;
    ticking = true;
    requestAnimationFrame(function () {
      ticking = false;
      var line = innerHeight * 0.55, i = 0;
      beats.forEach(function (b, k) {
        if (b.querySelector('.cap').getBoundingClientRect().top < line) i = k;
      });
      if (innerHeight + scrollY >= document.documentElement.scrollHeight - 4) i = beats.length - 1;
      activate(i);
    });
  }

  function intro() {
    terms[0].classList.add('is-live');
    if (!phone || still) return;
    instant('locked');
    shown = 'locked';
    later(2100, function () { show('expanded', beats[0].dataset.clock); });
  }

  if (wide.matches) {
    intro();
    active = 0;
    beats[0].classList.add('is-active');
  } else if (!still && phone) {
    terms[0].classList.add('is-live');
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (es) {
        es.forEach(function (e) { if (e.isIntersecting) e.target.classList.add('is-live'); });
      }, { threshold: 0.2 });
      terms.forEach(function (t) { io.observe(t); });
      new IntersectionObserver(function (es) {
        if (wide.matches) return;
        if (es[0].isIntersecting) { if (!phone.playing) phone.play(); } else phone.pause();
      }, { threshold: 0.35 }).observe(el);
    } else {
      terms.forEach(function (t) { t.classList.add('is-live'); });
      phone.play();
    }
  }
  addEventListener('scroll', onScroll, { passive: true });
  addEventListener('resize', onScroll);

  var copy = document.querySelector('[data-copy]');
  if (copy) {
    var label = copy.querySelector('span'), icon = copy.querySelector('img'), base = label.textContent, src = icon.getAttribute('src');
    copy.addEventListener('click', function () {
      if (!navigator.clipboard) return;
      navigator.clipboard.writeText(copy.dataset.copy).then(function () {
        label.textContent = 'Copied';
        icon.setAttribute('src', src.replace('copy.svg', 'check.svg'));
        setTimeout(function () { label.textContent = base; icon.setAttribute('src', src); }, 1800);
      });
    });
  }
})();
