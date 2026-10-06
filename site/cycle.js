// Left and right arrow keys move through /v1/ to /vN/, wrapping at either end; from the start page both go to /v1/.
(() => {
  const count = __COUNT__;
  const match = location.pathname.match(/^\/v(\d+)\//);
  const current = match ? Number(match[1]) : 0;
  addEventListener('keydown', (e) => {
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
    if (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return;
    if (e.target.closest?.('input, textarea, select, [contenteditable]')) return;
    const step = e.key === 'ArrowRight' ? 1 : -1;
    const next = current === 0 ? 1 : ((current - 1 + step + count) % count) + 1;
    location.href = `/v${next}/`;
  });
})();
