(function () {
  'use strict';
  var el = document.getElementById('phone');
  if (!el || !window.PusharyPhone) return;
  var phone = window.PusharyPhone.mount(el);
  if (!('IntersectionObserver' in window)) { phone.play(); return; }
  new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting && !phone.playing) phone.play();
      else if (!e.isIntersecting && phone.playing) phone.setState('expanded');
    });
  }, { threshold: 0.35 }).observe(el);
})();
