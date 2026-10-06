(function () {
  'use strict';
  document.documentElement.classList.add('js');

  var phoneEl = document.querySelector('.land__phone .iphone');
  if (phoneEl && window.PusharyPhone) {
    PusharyPhone.mount(phoneEl, {
      model: '17-pro-max',
      color: 'cosmic-orange',
      agent: 'Codex',
      repo: 'billing',
      command: 'vercel deploy --prod',
      detail: 'Production deploy from main',
      request: 'Wants to run vercel deploy --prod.',
      approved: 'Codex deployed to production and is running the next step.',
      next: 'Wants to run bun run db:migrate.'
    });
  }

  var demo = document.querySelector('.demo');
  if (demo) {
    demo.addEventListener('click', function (e) {
      var act = e.target.closest('[data-answer]');
      if (act) demo.dataset.state = act.dataset.answer;
      else if (e.target.closest('.demo__replay')) {
        demo.dataset.state = 'expanded';
        demo.querySelector('.demo__act').focus();
      }
    });
  }

  var tabs = Array.prototype.slice.call(document.querySelectorAll('.press__menu [role="tab"]'));
  function select(tab, focus) {
    tabs.forEach(function (t) {
      var on = t === tab;
      t.setAttribute('aria-selected', on);
      t.tabIndex = on ? 0 : -1;
      document.getElementById(t.getAttribute('aria-controls')).classList.toggle('is-on', on);
    });
    if (focus) tab.focus();
  }
  tabs.forEach(function (t, i) {
    t.addEventListener('click', function () { select(t); });
    t.addEventListener('keydown', function (e) {
      var d = { ArrowDown: 1, ArrowUp: -1 }[e.key];
      if (!d) return;
      e.preventDefault();
      select(tabs[(i + d + tabs.length) % tabs.length], true);
    });
  });
  if (tabs.length) select(tabs[0]);

  document.querySelectorAll('[data-copy]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var text = document.getElementById(btn.dataset.copy).textContent;
      var done = function () {
        btn.classList.add('is-done');
        setTimeout(function () { btn.classList.remove('is-done'); }, 1600);
      };
      if (navigator.clipboard) navigator.clipboard.writeText(text).then(done, function () {});
    });
  });
})();
