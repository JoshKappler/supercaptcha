/* The phone shows the decision; the island and the terminal show the agent's side of it. */
(function () {
  'use strict';
  var island = document.querySelector('.island');
  var lines = document.querySelector('.term-lines');
  var el = document.getElementById('phone');
  var phone = window.PusharyPhone && PusharyPhone.mount(el, { clock: '9:14' });
  var screen = el.querySelector('.iphone__screen');
  var MAP = { locked: 'work', arrived: 'ask', expanded: 'ask', approved: 'done', next: 'ask2' };
  var inView = true;

  function sync() {
    var s = MAP[screen.getAttribute('data-state')] || 'ask';
    island.setAttribute('data-s', inView ? s : 'work');
    lines.setAttribute('data-s', s);
  }

  if (phone && screen) {
    new MutationObserver(sync).observe(screen, { attributes: true, attributeFilter: ['data-state'] });
    sync();
    if (window.IntersectionObserver) {
      var first = true;
      new IntersectionObserver(function (entries) {
        var visible = entries[0].isIntersecting;
        if (first) { first = false; if (visible) return; }
        inView = visible;
        if (visible) phone.play(); else phone.pause();
        sync();
      }, { threshold: 0.15 }).observe(el);
    }
  }

  var el2 = document.getElementById('phone2');
  if (el2 && window.PusharyPhone) PusharyPhone.mount(el2, { clock: '9:14', autoplay: false }).setState('next');

  var copy = document.querySelector('.copy-btn');
  if (copy && navigator.clipboard) {
    copy.hidden = false;
    copy.addEventListener('click', function () {
      navigator.clipboard.writeText('npx pushary@latest setup').then(function () {
        copy.textContent = 'Copied';
        setTimeout(function () { copy.textContent = 'Copy'; }, 1600);
      });
    });
  }
})();
