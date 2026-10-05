# v6 credits

Every asset in `assets/` is copied unchanged from a vendored package or from the scrape of pushary.com. No icon, logo or image was drawn for this version. CSS filters (grayscale) and CSS background cropping are applied at render time only.

## Fonts

| File | Source | License |
|---|---|---|
| `fonts/Geist-Variable.woff2` | vercel/geist-font, `fonts/Geist/webfonts/Geist[wght].woff2` | SIL OFL 1.1 |
| `fonts/GeistMono-Variable.woff2` | vercel/geist-font, `fonts/GeistMono/webfonts/GeistMono[wght].woff2` | SIL OFL 1.1 |
| `fonts/GeistPixel-Circle.woff2` | vercel/geist-pixel-font, `fonts/webfonts/GeistPixel-Circle.woff2` | SIL OFL 1.1 |

Geist Pixel is the Geist family's display cut and is used only for a few large numerals (stats, panel counts, price).

## Device frame

| File | Source | License |
|---|---|---|
| `css/devices-iphone-14-pro.css` | picturepan2/devices.css, `dist/devices.css` (base rules plus the `.device-iphone-14-pro` rules, color variants dropped) | MIT |

The frame is recolored to graphite in `site.css`; geometry is unchanged.

## Icons

Tabler Icons (tabler/tabler-icons, `icons/outline/`, MIT): `arrow-right`, `arrow-up-right`, `bolt`, `brand-slack`, `browser`, `copy`, `device-laptop`, `device-mobile`, `hand-stop`, `hourglass`, `list-check`, `menu-2`, `player-play`, `plus`, `refresh`, `shield-check`, `world`.

Phosphor Icons (phosphor-icons/core, MIT), used only inside the iOS lock screen mock where filled glyphs match the system UI:
`assets/fill/`: `battery-full-fill`, `camera-fill`, `cell-signal-full-fill`, `check-circle-fill`, `flashlight-fill`, `lock-simple-fill`, `wifi-high-fill`; `assets/bold/`: `check-bold`, `x-bold`.

## Brand, agent logos and media (scraped from pushary.com)

| File | Scraped from |
|---|---|
| `img/logo.webp` | `/_next/image?url=/logo.webp` |
| `img/claude.webp`, `codex.webp`, `cursor.webp`, `gemini.webp`, `hermes.webp`, `antigravity.webp` | `/_next/image?url=/<name>.webp` |
| `img/founder-video-poster.webp` | `/_next/image?url=/home-demo-poster.webp` (shown as a CSS-cropped grayscale portrait) |
| `img/vscode.svg`, `img/opencode.svg` | `/vscode.svg`, `/opencode.svg` |
| `img/app-store.svg`, `img/google-play.svg` | `/badges/app-store.svg`, `/badges/google-play.svg` |

Agent logos and store badges belong to their owners and are shown as on the original page. Copy, links, pricing and FAQ answers come from `original/home.text.txt` and the FAQ data in `original/home.rendered.html`.
