# v3 credits

Every file under `assets/` was copied from a vendored package or the pushary.com scrape. Nothing was drawn by hand.

## Fonts

| File | Source | License |
|---|---|---|
| `assets/fonts/Geist-Variable.woff2` | vercel/geist-font, `fonts/Geist/webfonts/Geist[wght].woff2` | SIL OFL 1.1 |
| `assets/fonts/GeistMono-Variable.woff2` | vercel/geist-font, `fonts/GeistMono/webfonts/GeistMono[wght].woff2` | SIL OFL 1.1 |

## Device frame

| File | Source | License |
|---|---|---|
| `assets/css/devices.min.css` | picturepan2/devices.css, `dist/devices.min.css` (iPhone 14 Pro frame) | MIT |

## Icons

Lucide (lucide-icons/lucide, `icons/*.svg`, ISC). Copied with `stroke-width` changed from 2 to 1.5:
`app-window.svg`, `arrow-right.svg`, `check.svg`, `copy.svg`, `globe.svg`, `hash.svg`, `laptop.svg`, `menu.svg`, `plus.svg`, `rotate-ccw.svg`, `scroll-text.svg`, `shield-alert.svg`, `shield-check.svg`, `smartphone.svg`, `square-terminal.svg`, `timer.svg`, `x.svg`, `zap.svg`.

Phosphor (phosphor-icons/core, `assets/fill/*.svg`, MIT), used only for iOS system glyphs inside the phone:
`battery-full-fill.svg`, `camera-fill.svg`, `cell-signal-full-fill.svg`, `check-circle-fill.svg`, `flashlight-fill.svg`, `lock-simple-fill.svg`, `wifi-high-fill.svg`.

## Brand and agent images (from the pushary.com scrape in `original/site/pushary.com/`)

| File | Scraped from |
|---|---|
| `assets/img/logo.webp` | `_next/image?url=/logo.webp` |
| `assets/img/claude.webp`, `codex.webp`, `cursor.webp`, `hermes.webp`, `gemini.webp`, `antigravity.webp` | `_next/image?url=/<name>.webp` |
| `assets/img/hackernews.webp` | `_next/image?url=/hacker-news...` |
| `assets/img/vscode.svg`, `assets/img/opencode.svg` | `vscode.svg`, `opencode.svg` |
| `assets/img/app-store.svg`, `assets/img/google-play.svg` | `badges/app-store.svg`, `badges/google-play.svg` |
| `assets/img/product-hunt-medal.svg` | `badges/product-hunt-top-post-light.svg`, cropped to the medal mark only (badge background and text removed); shown in grayscale on the page |

Agent logos and store badges are trademarks of their owners and appear as they do on pushary.com.

## Copy

All product copy, FAQ answers, testimonials and links come from `original/home.text.txt`, `original/home.meta.json` and the FAQ data in `original/home.rendered.html`. The phone and terminal demo reuse scraped strings (Ship the billing webhook, `git push origin main`, auto-deny 30s, Wednesday, March 5, 9:14).
