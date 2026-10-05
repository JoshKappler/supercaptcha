# v7 credits: Moving light

| File | Source | License |
|---|---|---|
| `assets/fonts/instrument-sans-400.woff2`, `instrument-sans-500.woff2` | Instrument Sans (Google Fonts build), copied from the OFL font folder of Kevin-Liu-01/Prototemplate, `public/fonts/google/`. Only the OFL font files were taken from that repo | SIL OFL 1.1 |
| `assets/fonts/GeistMono-Medium.woff2` | vercel/geist-font, `fonts/GeistMono/webfonts/` | SIL OFL 1.1 |
| `assets/img/logo.webp` | pushary.com scrape, `original/site/pushary.com/_next/image__P3VybD0lMkZsb2dvLndlYnAm.html` (the `/logo.webp` image) | Pushary brand asset, used as the product's own logo |
| `assets/img/agents/{claude,codex,cursor,antigravity,gemini,hermes}.webp` | pushary.com scrape, `original/site/pushary.com/_next/image__*` (the `/claude.webp`, `/codex.webp`, `/cursor.webp`, `/antigravity.webp`, `/gemini.webp`, `/hermes.webp` images) | Agent marks as shown on pushary.com |
| `assets/img/agents/opencode.svg`, `vscode.svg` | pushary.com scrape, `original/site/pushary.com/opencode__*.svg`, `vscode__*.svg` | Agent marks as shown on pushary.com |
| `assets/img/hacker-news.webp` | pushary.com scrape, `/hacker-news.webp` | As shown on pushary.com |
| `assets/img/product-hunt-top-post-light.svg`, `app-store.svg`, `google-play.svg` | pushary.com scrape, `original/site/pushary.com/badges/` | Badges as shown on pushary.com |
| `assets/img/founder.webp` | Cropped and resized from the founder video poster in the pushary.com scrape (`/home-demo-poster.webp`); it links to the founder's Loom video from the same page | Pushary's own image |

## Shared iPhone (`assets/iphone/`, copied by `scripts/sync-phone.sh`)

| File | Source | License |
|---|---|---|
| `assets/iphone/assets/Inter-Regular.woff2`, `assets/iphone/assets/Inter-Medium.woff2`, `assets/iphone/assets/Inter-SemiBold.woff2`, `assets/iphone/assets/InterDisplay-SemiBold.woff2` | rsms/inter, `docs/font-files/` | SIL OFL 1.1 |
| `assets/iphone/assets/GeistMono-Variable.woff2` | vercel/geist-font, `packages/next/dist/fonts/geist-mono/` | SIL OFL 1.1 |
| `assets/iphone/assets/icons/flashlight-fill.svg`, `camera-fill.svg` (fill), `check-circle.svg`, `x-circle.svg` (regular), `check-bold.svg` (bold) | phosphor-icons/core, `assets/` | MIT, Copyright (c) 2023 Phosphor Icons |
| `assets/iphone/assets/icons/wifi.svg` | lucide-icons/lucide, `icons/wifi.svg` | ISC, Copyright (c) 2026 Lucide Icons and Contributors |
| `assets/iphone/assets/pushary-logo.webp` | Scraped from pushary.com (`original/site/pushary.com/_next/image__P3VybD0lMkZsb2dvLndlYnAm.html`, `/logo.webp`) | Pushary's own mark |
| `assets/iphone/assets/wallpaper-cosmic-orange.webp`, `assets/iphone/assets/wallpaper-burgundy.webp` | Rendered offline from Paper Shaders' `warp` fragment shader (paper-design/shaders, `packages/shaders/src/shaders/warp.ts`) with custom colors; no photos, no AI imagery | Shader: Apache-2.0 (NOTICE: "Powered by Paper Shaders: https://shaders.paper.design"). The renders are original output. |
| CSS frame in `iphone.css` (`.iphone__metal`, `.iphone__bezel`, `.iphone__btn`) | Approach adapted from CVERInc/liquidframe (`liquidframe.css`: layered box-shadow chamfers, protruding buttons), retuned to Apple's measured geometry and colors | MIT, Copyright (c) 2026 liquidframe contributors |
| Glass refraction in `iphone.js` (`displacementMap`) | Method from kube.io, "Liquid Glass in CSS and SVG" (convex squircle profile, Snell's law, feDisplacementMap); code written here | Technique only, no code copied |
| `assets/iphone/private/*.png` (gitignored, local only) | Apple Design Resources, Bezel-iPhone-17 and Bezel-iPhone-18 | Apple Design Resources License: mock-ups only, never redistribute |

Geometry and the iOS 27 numbers (status bar, clock, controls, notification, long-press view) come from Apple's bezel PNGs and the iOS 27 UI kit, as measured in `docs/research/iphone-frames.md`.

## Placeholder demo copy

Everything shown on the lock screen is invented for the demo, not real data: the agent name "Claude Code" used as a sender label, the repo `api-gateway`, the commands `git push origin main` and `npm run deploy:staging`, "3 commits ahead of origin/main", the approved message, the date "Monday, October 5" and the time 9:41.

## Copy and example content

Copy, facts, prices and links come from the pushary.com home page scrape (`original/home.text.txt`, `original/home.meta.json`), tightened. The terminal session, the control panel numbers and ledger rows, and the lock screen request (repo `billing`, time 9:14) are examples, labelled as such on the page; the panel and ledger values reuse the scraped sample data.
