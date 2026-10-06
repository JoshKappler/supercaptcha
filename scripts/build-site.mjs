// Builds dist/ for hosting: the versions in `order`, the index tiles, and the arrow-key script.
// Apple bezel PNGs (assets/iphone/private) are left out, so the phones use the CSS frame.
// Usage: node scripts/build-site.mjs
import fs from 'node:fs';
import path from 'node:path';

// Site order: position N is served at /vN/, whatever the folder is called in versions/.
const order = [
  ['v10', 'Lock screen first'],
  ['v7', 'Moving light'],
  ['v8', 'Island'],
  ['v9', 'Single light'],
  ['v11', 'Scroll story'],
  ['v12', 'Lock screen page'],
  ['v13', 'Split desk'],
  ['v14', 'Editorial poster'],
];

const out = 'dist';
fs.mkdirSync(out, { recursive: true });
for (const name of fs.readdirSync(out)) {
  if (name !== '.vercel') fs.rmSync(path.join(out, name), { recursive: true, force: true });
}

const slug = (i) => `v${i + 1}`;
fs.writeFileSync(path.join(out, 'cycle.js'),
  fs.readFileSync('site/cycle.js', 'utf8').replace('__COUNT__', String(order.length)));
const tiles = order.map(([, name], i) => `    <li><a href="/${slug(i)}/">${slug(i)}<small>${name}</small></a></li>`).join('\n');
fs.writeFileSync(path.join(out, 'index.html'),
  fs.readFileSync('site/index.tpl.html', 'utf8').replace('__TILES__', tiles));

for (const [i, [id]] of order.entries()) {
  const dest = path.join(out, slug(i));
  fs.cpSync(`versions/${id}`, dest, {
    recursive: true,
    filter: (src) => !src.split(path.sep).includes('private'),
  });
  const page = path.join(dest, 'index.html');
  const html = fs.readFileSync(page, 'utf8')
    .replace('</head>', '<meta name="robots" content="noindex">\n</head>')
    .replace('</body>', '<script src="/cycle.js" defer></script>\n</body>');
  fs.writeFileSync(page, html);
}

console.log(`built ${out}/: ${order.map(([id], i) => `${slug(i)}=${id}`).join(' ')}`);
