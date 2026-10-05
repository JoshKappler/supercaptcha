// Tile one screenshot from each folder into a single image, for comparing directions side by side.
// Usage: node scripts/contact-sheet.mjs <out.png> <shot name> <reviews dir> [<reviews dir> ...]
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';

const [out, shot, ...dirs] = process.argv.slice(2);
const cells = dirs.map((d) => {
  const src = 'data:image/png;base64,' + fs.readFileSync(path.resolve(d, shot)).toString('base64');
  return `<figure><img src="${src}"><figcaption>${d.split(/[\\/]/).filter(Boolean).slice(-2, -1)[0]}</figcaption></figure>`;
}).join('');

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 2400, height: 1200 } });
await page.setContent(`<style>body{margin:0;background:#222;display:grid;grid-template-columns:repeat(4,1fr);gap:8px;padding:8px;font:28px sans-serif;color:#fff}figure{margin:0}img{width:100%;display:block}</style>${cells}`);
await page.waitForTimeout(1500);
await page.screenshot({ path: out, fullPage: true });
await browser.close();
