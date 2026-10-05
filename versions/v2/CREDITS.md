# v2 credits

Every asset in `assets/` is copied from `vendor/` or from the scrape in `original/`. Nothing is drawn by hand.

## Fonts

| File | Source | License |
|---|---|---|
| `assets/fonts/InterVariable.woff2` | rsms/inter, `docs/font-files/InterVariable.woff2` | SIL OFL 1.1 |
| `assets/fonts/GeistMono-Regular.woff2` | vercel/geist-font, `fonts/GeistMono/webfonts/` | SIL OFL 1.1 |
| `assets/fonts/GeistMono-Medium.woff2` | vercel/geist-font, `fonts/GeistMono/webfonts/` | SIL OFL 1.1 |

## Icons

From lucide-icons/lucide, `icons/`, ISC license. Only changes: `stroke-width` set from 2 to 1.5, and `star.svg` uses `fill="currentColor"` for the rating stars.

arrow-right, award, battery-full, bell, camera, check, chevron-down, circle-check, copy, flashlight, globe, laptop, lock, menu, message-square, monitor, play, scroll-text, shield-check, signal, smartphone, star, terminal, timer, triangle-alert, wifi, x (all `.svg` in `assets/icons/`).

## Device frame

| File | Source | License |
|---|---|---|
| `assets/vendor/devices.css` | picturepan2/devices.css, `dist/devices.css` (iPhone 14 Pro frame) | MIT |

## Ported code

- Hero terminal border beam: CSS port of `BorderBeam` from magicuidesign/magicui, `apps/www/registry/magicui/border-beam.tsx`, MIT. Same technique (masked 1px border, gradient square on an `offset-path` rect), no Motion dependency.

## Brand and product images (scraped from pushary.com)

From `original/site/pushary.com/`. Pushary product assets and third-party agent logos as served on pushary.com.

| File | Scraped path |
|---|---|
| `assets/img/logo.webp` | `_next/image__P3VybD0lMkZsb2dvLndlYnAm.html` (`/logo.webp`) |
| `assets/img/claude.webp` | `_next/image__P3VybD0lMkZjbGF1ZGUud2Vi.html` |
| `assets/img/codex.webp` | `_next/image__P3VybD0lMkZjb2RleC53ZWJw.html` |
| `assets/img/cursor.webp` | `_next/image__P3VybD0lMkZjdXJzb3Iud2Vi.html` |
| `assets/img/antigravity.webp` | `_next/image__P3VybD0lMkZhbnRpZ3Jhdml0.html` |
| `assets/img/gemini.webp` | `_next/image__P3VybD0lMkZnZW1pbmkud2Vi.html` |
| `assets/img/hermes.webp` | `_next/image__P3VybD0lMkZoZXJtZXMud2Vi.html` |
| `assets/img/founder-face.webp` | 340x340 crop (x 40-380, y 630-970) of `_next/image__P3VybD0lMkZob21lLWRlbW8t.html` (`/home-demo-poster.webp`), face only; color grading is CSS |
| `assets/img/hacker-news.webp` | `_next/image__P3VybD0lMkZoYWNrZXItbmV3.html` |
| `assets/img/vscode.svg` | `vscode__P2RwbD1kcGxfNDhQUGhBMmNn.svg` |
| `assets/img/opencode.svg` | `opencode__P2RwbD1kcGxfNDhQUGhBMmNn.svg` |
| `assets/img/app-store.svg` | `badges/app-store.svg` (Apple badge) |
| `assets/img/google-play.svg` | `badges/google-play.svg` (Google badge) |

## Copy

All page copy, FAQ answers, links and prices come from `original/home.text.txt`, `original/home.meta.json` and the FAQ in `original/home.rendered.html`. The phone and terminal demo content reuses the scraped control panel example (Codex, "Ship the billing webhook", `git push origin main`, auto-deny 30s).
