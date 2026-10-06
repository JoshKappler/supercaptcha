// Builds dist/ for hosting: site/ plus versions/v1..v10 with the arrow-key script added.
// Apple bezel PNGs (assets/iphone/private) are left out, so the phones use the CSS frame.
// Usage: node scripts/build-site.mjs
import fs from 'node:fs';
import path from 'node:path';

const out = 'dist';
fs.mkdirSync(out, { recursive: true });
for (const name of fs.readdirSync(out)) {
  if (name !== '.vercel') fs.rmSync(path.join(out, name), { recursive: true, force: true });
}

fs.cpSync('site', out, { recursive: true });

for (let n = 1; n <= 10; n++) {
  const dest = path.join(out, `v${n}`);
  fs.cpSync(`versions/v${n}`, dest, {
    recursive: true,
    filter: (src) => !src.split(path.sep).includes('private'),
  });
  const page = path.join(dest, 'index.html');
  const html = fs.readFileSync(page, 'utf8')
    .replace('</head>', '<meta name="robots" content="noindex">\n</head>')
    .replace('</body>', '<script src="/cycle.js" defer></script>\n</body>');
  fs.writeFileSync(page, html);
}

console.log(`built ${out}/`);
