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

// The second phone rests on Approved (copy from the original demo and ledger) and follows the step nearest the middle of the screen while you scroll.
const flowEl = document.querySelector('.phone2');
if (flowEl && window.PusharyPhone) {
  const phone = PusharyPhone.mount(flowEl, {
    autoplay: false,
    agent: 'Codex',
    repo: 'app',
    command: 'bun run db:migrate',
    detail: 'Inspected schema, 8 tables',
    request: 'Wants to run bun run db:migrate. Hold to approve or deny.',
    approved: 'Approved from your lock screen. Codex keeps going.'
  });
  phone.setState('approved');
  const steps = [...document.querySelectorAll('.steps-flow li')];
  let current = 'approved';
  let queued = false;
  const pick = () => {
    queued = false;
    const mid = innerHeight / 2;
    let best = null;
    let dist = Infinity;
    for (const li of steps) {
      const r = li.getBoundingClientRect();
      const d = Math.abs(r.top + r.height / 2 - mid);
      if (r.bottom > 0 && r.top < innerHeight && d < dist) { dist = d; best = li; }
    }
    const next = best ? best.dataset.state : 'approved';
    if (next !== current) { current = next; phone.setState(next); }
  };
  addEventListener('scroll', () => { if (!queued) { queued = true; requestAnimationFrame(pick); } }, { passive: true });
}

// Close the mobile menu after a link is chosen.
document.querySelectorAll('.menu a').forEach((a) => a.addEventListener('click', () => a.closest('details').removeAttribute('open')));
