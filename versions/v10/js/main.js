// Copy the setup command.
document.querySelectorAll('[data-copy]').forEach((btn) => {
  btn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(btn.dataset.copy);
      btn.textContent = 'Copied';
    } catch {
      btn.textContent = 'Select and copy';
    }
    setTimeout(() => { btn.textContent = 'Copy'; }, 1800);
  });
});

// Close the mobile menu after a link is chosen.
document.querySelectorAll('.menu a').forEach((a) => a.addEventListener('click', () => a.closest('details').removeAttribute('open')));
