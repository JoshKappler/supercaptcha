# v1 credits

Every file under `assets/` is copied from a vendored open source package or from the scrape of pushary.com. Nothing is hand-drawn or generated.

## Fonts

| File | Source | License |
|---|---|---|
| `assets/fonts/InterVariable.woff2` | `rsms/inter` (v4.2), `docs/font-files/InterVariable.woff2` | SIL Open Font License 1.1 |
| `assets/fonts/GeistMono-Variable.woff2` | `vercel/geist-font`, `fonts/GeistMono/webfonts/GeistMono[wght].woff2` (renamed) | SIL Open Font License 1.1 |

## Icons

From `lucide-icons/lucide`, `icons/*.svg`, ISC License. The only edit is `stroke-width="2"` changed to `1.5`.

`arrow-right.svg`, `arrow-up-right.svg`, `camera.svg`, `check.svg`, `chevron-down.svg`, `circle-check.svg`, `copy.svg`, `flashlight.svg`, `globe.svg`, `laptop.svg`, `lock.svg`, `menu.svg`, `message-square.svg`, `play.svg`, `plus.svg`, `rotate-ccw.svg`, `scroll-text.svg`, `shield-alert.svg`, `shield-check.svg`, `smartphone.svg`, `terminal.svg`, `timer.svg`, `wifi.svg`, `x.svg`, `zap.svg`.

## Device frame

| File | Source | License |
|---|---|---|
| `assets/css/devices.min.css` | `picturepan2/devices.css` v0.2.0, `dist/devices.min.css` (iPhone 14 Pro frame) | MIT |

`site.css` retints the frame to a neutral titanium and adds the screen glare overlay.

## Glass

| File | Source | License |
|---|---|---|
| `assets/js/liquid-glass.js` | Port of `shuding/liquid-glass` (`liquid-glass.js`): canvas displacement map fed to an SVG `feDisplacementMap` used as a `backdrop-filter`. The fragment is rewritten as an edge band in pixel space. | MIT |
| `.glass::before` in `assets/css/site.css` | Specular rim from `rdev/liquid-glass-react` (`src/index.tsx` border layers: masked 1px gradient ring) | MIT |

## Brand and product images (scraped from pushary.com)

| File | Scraped path |
|---|---|
| `assets/img/logo.webp` | `original/site/pushary.com/_next/image__P3VybD0lMkZsb2dvLndlYnAm.html` (`/logo.webp`) |
| `assets/img/claude.webp` | `_next/image__P3VybD0lMkZjbGF1ZGUud2Vi.html` |
| `assets/img/codex.webp` | `_next/image__P3VybD0lMkZjb2RleC53ZWJw.html` |
| `assets/img/cursor.webp` | `_next/image__P3VybD0lMkZjdXJzb3Iud2Vi.html` |
| `assets/img/antigravity.webp` | `_next/image__P3VybD0lMkZhbnRpZ3Jhdml0.html` |
| `assets/img/gemini.webp` | `_next/image__P3VybD0lMkZnZW1pbmkud2Vi.html` |
| `assets/img/hermes.webp` | `_next/image__P3VybD0lMkZoZXJtZXMud2Vi.html` |
| `assets/img/hacker-news.webp` | `_next/image__P3VybD0lMkZoYWNrZXItbmV3.html` |
| `assets/img/opencode.svg` | `opencode__P2RwbD1kcGxfNDhQUGhBMmNn.svg` |
| `assets/img/vscode.svg` | `vscode__P2RwbD1kcGxfNDhQUGhBMmNn.svg` |
| `assets/img/app-store.svg` | `badges/app-store.svg` |
| `assets/img/google-play.svg` | `badges/google-play.svg` |
| `assets/img/product-hunt.svg` | `badges/product-hunt-top-post-light.svg` |

Agent logos and store badges belong to their owners and are used as on the original site.

## Copy

All page copy, links and figures come from `original/home.text.txt`, `original/home.meta.json` and the FAQ data in `original/home.rendered.html`. The phone and terminal demo lines are illustrative UI states built from that copy ("Ship the billing webhook", "git push origin main", "auto-deny 30s"). The "Watch the demo" label is new; it links to the YouTube demo the original embeds.
