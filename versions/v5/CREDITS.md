# v5 credits

Every asset in `assets/` was copied unchanged (renamed only) from a cloned package in `vendor/` or from the scrape in `original/`.

## Fonts

| File | Source | License |
|------|--------|---------|
| `assets/fonts/MonaSans-wdth-wght.ttf` | github/mona-sans, `googlefonts/variable/MonaSans[wdth,wght].ttf` | SIL OFL 1.1 |
| `assets/fonts/MonaSansMono-wght.ttf` | github/mona-sans, `fonts/variable/MonaSansMonoVF[wght].ttf` | SIL OFL 1.1 |

## Device frame

| File | Source | License |
|------|--------|---------|
| `assets/css/devices.css` | picturepan2/devices.css, `dist/devices.css` (iPhone 14 Pro frame used) | MIT |

## Icons (Phosphor)

From phosphor-icons/core, `assets/light/` and `assets/fill/`. License: MIT.

Light: `apple-logo-light.svg`, `arrow-right-light.svg`, `browser-light.svg`, `check-circle-light.svg`, `check-light.svg`, `copy-light.svg`, `device-mobile-light.svg`, `laptop-light.svg`, `linux-logo-light.svg`, `list-checks-light.svg`, `list-light.svg`, `plus-light.svg`, `shield-check-light.svg`, `slack-logo-light.svg`, `timer-light.svg`, `warning-octagon-light.svg`, `windows-logo-light.svg`, `x-light.svg`.

Fill (iOS status bar and lock screen glyphs only): `battery-full-fill.svg`, `camera-fill.svg`, `flashlight-fill.svg`, `lock-fill.svg`, `wifi-high-fill.svg`.

## Brand and partner images (scraped from pushary.com)

| File | Scraped from |
|------|--------------|
| `assets/img/logo.webp` | `original/site/pushary.com/_next/image` for `/logo.webp` |
| `assets/img/claude.webp`, `codex.webp`, `cursor.webp`, `antigravity.webp`, `gemini.webp`, `hermes.webp` | `original/site/pushary.com/_next/image` for the matching `/*.webp` |
| `assets/img/vscode.svg`, `assets/img/opencode.svg` | `original/site/pushary.com/vscode.svg`, `opencode.svg` |
| `assets/img/app-store.svg`, `assets/img/google-play.svg` | `original/site/pushary.com/badges/` |

These belong to Pushary and the respective vendors; they are used here only to redesign the Pushary home page.

## Copy

All copy comes from `original/home.text.txt` and the FAQ answers in `original/home.rendered.html`. The phone notification lines reuse scraped control panel and terminal content (Codex, "Ship the billing webhook", `git push origin main`, "Which database adapter?", "pg selected, migrated"), plus a few short demo lines written for the animation (for example "Approved" and "Codex finished").
