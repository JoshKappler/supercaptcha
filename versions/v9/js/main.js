/* v9: the hero light follows the decision, the step rows drive the second phone, and the copy button. */
(function () {
  'use strict';

  var WAITING = { arrived: 1, expanded: 1, next: 1 };

  var hero = document.querySelector('.hero');
  var heroScreen = document.querySelector('#hero-phone .iphone__screen');
  if (hero && heroScreen && window.MutationObserver) {
    var sync = function () {
      hero.setAttribute('data-light', WAITING[heroScreen.getAttribute('data-state')] ? 'wait' : 'rest');
    };
    new MutationObserver(sync).observe(heroScreen, { attributes: true, attributeFilter: ['data-state'] });
    sync();
  }

  var flowEl = document.getElementById('flow-phone');
  var rows = document.querySelectorAll('.steps li');
  if (rows.length && window.PusharyPhone) {
    var flowPhone = flowEl ? PusharyPhone.mount(flowEl) : null;
    var light = function (li) {
      rows.forEach(function (r) { r.classList.toggle('lit', r === li); });
      if (flowPhone) flowPhone.setState(li.getAttribute('data-state'));
    };
    rows.forEach(function (r) {
      r.addEventListener('mouseenter', function () { light(r); });
    });
    if (window.IntersectionObserver) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) { if (e.isIntersecting) light(e.target); });
      }, { rootMargin: '-48% 0px -48% 0px' });
      rows.forEach(function (r) { io.observe(r); });
    }
  }

  document.querySelectorAll('[data-copy]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      if (!navigator.clipboard) return;
      navigator.clipboard.writeText(btn.getAttribute('data-copy')).then(function () {
        var label = btn.querySelector('span');
        var icon = btn.querySelector('.ico');
        label.textContent = 'Copied';
        icon.className = 'ico ico--check';
        setTimeout(function () { label.textContent = 'Copy'; icon.className = 'ico ico--copy'; }, 1600);
      });
    });
  });
})();
