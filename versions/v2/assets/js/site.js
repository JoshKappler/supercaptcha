// Copy button for the setup command.
document.querySelectorAll('[data-copy]').forEach(function (b) {
  b.addEventListener('click', function () {
    var label = b.querySelector('span');
    navigator.clipboard.writeText(b.getAttribute('data-copy')).then(function () {
      label.textContent = 'Copied';
      setTimeout(function () { label.textContent = 'Copy'; }, 1600);
    });
  });
});

// Mobile menu.
(function () {
  var btn = document.querySelector('.menu-btn');
  var nav = document.getElementById('mnav');
  if (!btn || !nav) return;
  btn.addEventListener('click', function () {
    var open = nav.classList.toggle('open');
    btn.setAttribute('aria-expanded', String(open));
    btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });
})();
