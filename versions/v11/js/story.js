/* Scroll drives one approval: the beat nearest the reading line sets the phone state and the light. */
(function () {
  'use strict';

  var story = document.getElementById('story');
  var el = document.getElementById('phone');
  if (!story || !el || !window.PusharyPhone) return;

  var phone = PusharyPhone.mount(el);
  var stage = story.querySelector('.stage');
  var beats = Array.prototype.slice.call(story.querySelectorAll('.beat'));
  var reduced = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)');
  var narrow = matchMedia('(max-width: 899px)');
  var current = -1;
  var queued = false;

  beats.forEach(function (b) {
    Array.prototype.forEach.call(b.children, function (c) { c.setAttribute('data-fade', ''); });
  });

  function readingLine() {
    var vh = window.innerHeight;
    if (!narrow.matches) return vh / 2;
    var bottom = stage.getBoundingClientRect().bottom;
    return bottom + (vh - bottom) / 2;
  }

  function update() {
    queued = false;
    var line = readingLine();
    var vh = window.innerHeight;
    var best = 0, bestDist = Infinity;
    beats.forEach(function (b, i) {
      var r = b.getBoundingClientRect();
      var d = Math.abs(r.top + r.height / 2 - line);
      if (d < bestDist) { bestDist = d; best = i; }
      if (reduced.matches || narrow.matches) { b.style.removeProperty('--o'); return; }
      b.style.setProperty('--o', Math.max(0.18, 1 - d / (vh * 0.62)).toFixed(3));
    });
    if (best === current) return;
    current = best;
    story.setAttribute('data-beat', String(best));
    phone.setState(beats[best].getAttribute('data-state'));
  }

  function queue() {
    if (queued) return;
    queued = true;
    requestAnimationFrame(update);
  }

  window.addEventListener('scroll', queue, { passive: true });
  window.addEventListener('resize', queue);
  update();
})();
