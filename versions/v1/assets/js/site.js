// Scroll reveal, copy button, mobile menu, collapsed footer groups on phones.
(() => {
  const items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add('in');
        io.unobserve(e.target);
      });
    }, { rootMargin: '0px 0px -8% 0px' });
    items.forEach((el) => io.observe(el));
  } else {
    items.forEach((el) => el.classList.add('in'));
  }

  const copy = document.getElementById('copyBtn');
  const text = document.getElementById('cmdText');
  if (copy && text) {
    copy.addEventListener('click', async () => {
      try { await navigator.clipboard.writeText(text.textContent.trim()); } catch (e) { return; }
      copy.classList.add('done');
      copy.querySelector('.i').className = 'i i-check';
      setTimeout(() => {
        copy.classList.remove('done');
        copy.querySelector('.i').className = 'i i-copy';
      }, 1600);
    });
  }

  const menuBtn = document.getElementById('menuBtn');
  const menu = document.getElementById('menuPanel');
  if (menuBtn && menu) {
    const setOpen = (open) => {
      menu.hidden = !open;
      menuBtn.setAttribute('aria-expanded', String(open));
    };
    menuBtn.addEventListener('click', () => setOpen(menu.hidden));
    menu.addEventListener('click', (e) => { if (e.target.closest('a')) setOpen(false); });
  }

  if (window.matchMedia('(max-width: 640px)').matches) {
    document.querySelectorAll('.fgroup').forEach((d) => d.removeAttribute('open'));
  }
})();
