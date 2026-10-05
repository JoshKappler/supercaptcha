// Capture the live pushary.com frontend: every network response, the rendered DOM,
// full-page screenshots (desktop + mobile) and a short video of the hero/phone animation.
//
// Usage: node scripts/capture-original.mjs [url=https://pushary.com] [outDir=original]
// Extra pages: PAGES="/,/pricing,/docs" node scripts/capture-original.mjs
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';

const base = process.argv[2] || 'https://pushary.com';
const out = path.resolve(process.argv[3] || 'original');
const pages = (process.env.PAGES || '/').split(',').map((s) => s.trim()).filter(Boolean);

fs.mkdirSync(path.join(out, 'site'), { recursive: true });
fs.mkdirSync(path.join(out, 'screenshots'), { recursive: true });
fs.mkdirSync(path.join(out, 'video'), { recursive: true });

const manifest = [];

function localPathFor(url) {
  const u = new URL(url);
  let p = u.pathname;
  if (p.endsWith('/')) p += 'index.html';
  if (!path.extname(p)) p += '.html';
  const q = u.search ? '__' + Buffer.from(u.search).toString('base64url').slice(0, 24) : '';
  const ext = path.extname(p);
  return path.join(out, 'site', u.host, p.slice(0, p.length - ext.length) + q + ext);
}

async function scrollThrough(page) {
  await page.evaluate(async () => {
    const step = Math.max(400, Math.floor(window.innerHeight * 0.8));
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 250));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(800);
}

// Playwright finds Chromium via PLAYWRIGHT_BROWSERS_PATH; otherwise pass { executablePath }.
const browser = await chromium.launch();

for (const [label, viewport, isMobile] of [
  ['desktop', { width: 1440, height: 900 }, false],
  ['mobile', { width: 390, height: 844 }, true],
]) {
  const ctx = await browser.newContext({
    viewport, isMobile, hasTouch: isMobile, deviceScaleFactor: 2,
    recordVideo: { dir: path.join(out, 'video', label), size: viewport },
    userAgent: isMobile
      ? 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1'
      : undefined,
  });
  const page = await ctx.newPage();

  if (label === 'desktop') {
    page.on('response', async (res) => {
      try {
        const url = res.url();
        if (!/^https?:/.test(url) || res.status() >= 300) return;
        const body = await res.body();
        const file = localPathFor(url);
        fs.mkdirSync(path.dirname(file), { recursive: true });
        fs.writeFileSync(file, body);
        manifest.push({ url, status: res.status(), type: res.headers()['content-type'] || '', file: path.relative(out, file), bytes: body.length });
      } catch { /* redirects / bodies unavailable */ }
    });
  }

  for (const p of pages) {
    const url = new URL(p, base).href;
    const slug = p === '/' ? 'home' : p.replace(/^\/|\/$/g, '').replace(/\//g, '_');
    console.log(`[${label}] ${url}`);
    await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
    await page.waitForTimeout(6000); // let the hero / phone animation play for the video
    await page.screenshot({ path: path.join(out, 'screenshots', `${slug}-${label}-fold.png`) });
    await scrollThrough(page);
    await page.screenshot({ path: path.join(out, 'screenshots', `${slug}-${label}-full.png`), fullPage: true });
    if (label === 'desktop') {
      fs.writeFileSync(path.join(out, `${slug}.rendered.html`), await page.content());
      const meta = await page.evaluate(() => {
        const fonts = new Set(), colors = new Set(), bgs = new Set();
        for (const el of document.querySelectorAll('body *')) {
          const cs = getComputedStyle(el);
          fonts.add(cs.fontFamily); colors.add(cs.color);
          if (cs.backgroundColor !== 'rgba(0, 0, 0, 0)') bgs.add(cs.backgroundColor);
        }
        return {
          title: document.title,
          description: document.querySelector('meta[name=description]')?.content || '',
          headings: [...document.querySelectorAll('h1,h2,h3')].map((h) => `${h.tagName}: ${h.innerText.trim()}`),
          links: [...document.querySelectorAll('a[href]')].map((a) => ({ text: a.innerText.trim(), href: a.href })),
          fontFamilies: [...fonts], textColors: [...colors], backgroundColors: [...bgs],
          text: document.body.innerText,
        };
      });
      fs.writeFileSync(path.join(out, `${slug}.meta.json`), JSON.stringify(meta, null, 2));
      fs.writeFileSync(path.join(out, `${slug}.text.txt`), meta.text);
    }
  }
  await ctx.close();
}

await browser.close();
fs.writeFileSync(path.join(out, 'manifest.json'), JSON.stringify(manifest, null, 2));
console.log(`Saved ${manifest.length} responses to ${out}/site. See ${out}/screenshots and ${out}/video.`);
