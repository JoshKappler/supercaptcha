# v4 credits

Every asset in `assets/` is copied unchanged from a vendored package or from the scrape of pushary.com. Nothing is hand-drawn.

## Fonts

| File | Source | License |
|------|--------|---------|
| `assets/fonts/InterVariable.woff2` | `rsms/inter`, `docs/font-files/InterVariable.woff2` | SIL OFL 1.1 |
| `assets/fonts/GeistMono-Variable.woff2` | `vercel/geist-font`, `fonts/GeistMono/webfonts/GeistMono[wght].woff2` (renamed) | SIL OFL 1.1 |

## Device frame

| File | Source | License |
|------|--------|---------|
| `assets/css/devices-iphone-14-pro.css` | `picturepan2/devices.css`, `dist/devices.css` lines 1 to 221 (reset plus the iPhone 14 Pro block, unedited) | MIT |

## Icons

From `phosphor-icons/core` (MIT), used as CSS masks.

- `assets/regular/`: arrow-clockwise, arrow-elbow-down-left, arrow-right, bell-ringing, browser, check, check-circle, command, copy, device-mobile, globe, hourglass-medium, laptop, lightning, list, list-checks, plus, shield-check, slack-logo, terminal-window, timer, x
- `assets/fill/`: apple-logo-fill, battery-full-fill, camera-fill, check-circle-fill, flashlight-fill, linux-logo-fill, lock-simple-fill, medal-fill, play-fill, wifi-high-fill, windows-logo-fill

From `tabler/tabler-icons` (MIT): `icons/outline/antenna-bars-5.svg`, saved as `assets/icons/tabler-antenna-bars-5.svg` (iOS-style signal bars in the phone status bar).

## Brand and product images (scraped from pushary.com)

Saved under `original/site/pushary.com/`. The `_next/image` responses were stored with an `.html` extension and are WebP files.

| File | Scraped source |
|------|----------------|
| `assets/brand/logo.webp` | `/_next/image?url=/logo.webp` |
| `assets/brand/claude.webp`, `codex.webp`, `cursor.webp`, `antigravity.webp`, `hermes.webp`, `gemini.webp` | `/_next/image?url=/<name>.webp` |
| `assets/brand/hacker-news.webp` | `/_next/image?url=/hacker-news...` |
| `assets/brand/opencode.svg`, `vscode.svg` | `/opencode.svg`, `/vscode.svg` |
| `assets/brand/app-store.svg`, `google-play.svg` | `/badges/` |
| `assets/brand/founder-video.webp` | `/_next/image?url=/home-demo...` (the founder video poster), shown as a CSS-cropped, gray-graded circle of the founder's face |

Product logos and store badges belong to their owners and appear here as they do on pushary.com.

## Not copied, written for this version

- `styles.css` and `app.js`. The hero glow, lock screen wallpaper, phone rim highlight and panel surfaces are CSS gradients, not images. The Product Hunt claim ("#2 Product of the Day") is text taken from the scraped badge.
