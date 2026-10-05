// Screenshot a version (or the original) for the vision review.
// Serves the repo root locally, then captures desktop + mobile, above-the-fold + full page,
// plus 3 frames of the hero so reviewers can judge the phone animation.
//
// Usage: node scripts/screenshot.mjs versions/v1 [attempt=1]
// Output: reviews/<name>/attempt-<n>/*.png
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import { serve } from './serve.mjs';

const target = process.argv[2];
const attempt = process.argv[3] || '1';
if (!target) { console.error('usage: node scripts/screenshot.mjs <dir> [attempt]'); process.exit(1); }

const name = path.basename(path.resolve(target));
const outDir = path.resolve('reviews', name, `attempt-${attempt}`);
fs.mkdirSync(outDir, { recursive: true });

const port = 4173 + Math.floor(Math.random() * 1000);
const server = await serve('.', port);
const url = `http://127.0.0.1:${port}/${path.relative('.', path.resolve(target))}/`;

const browser = await chromium.launch();
const shots = [];
for (const [label, viewport, isMobile] of [
  ['desktop', { width: 1440, height: 900 }, false],
  ['mobile', { width: 390, height: 844 }, true],
]) {
  const ctx = await browser.newContext({ viewport, isMobile, hasTouch: isMobile, deviceScaleFactor: isMobile ? 3 : 2, colorScheme: 'dark' });
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push(String(e)));
  page.on('requestfailed', (r) => errors.push(`request failed: ${r.url()}`));
  await page.goto(url, { waitUntil: 'networkidle' });
  let elapsed = 0;
  for (const t of [500, 2500, 5000]) {
    await page.waitForTimeout(t - elapsed); elapsed = t;
    const f = path.join(outDir, `${label}-hero-${t}ms.png`);
    await page.screenshot({ path: f }); shots.push(f);
  }
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 500) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 150)); }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(600);
  const full = path.join(outDir, `${label}-full.png`);
  await page.screenshot({ path: full, fullPage: true }); shots.push(full);
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
  if (overflow) errors.push(`horizontal overflow at ${viewport.width}px`);
  if (errors.length) fs.writeFileSync(path.join(outDir, `${label}-errors.txt`), errors.join('\n'));
  await ctx.close();
}
await browser.close();
server.close();
console.log(shots.map((s) => path.relative('.', s)).join('\n'));
