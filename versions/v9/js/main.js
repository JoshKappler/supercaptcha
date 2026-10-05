/* v9: the hero light follows the decision, and the copy button. */
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
