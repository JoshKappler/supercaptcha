# v9 credits: Single light

Grown from sketch e01. Copy, links and prices come from the pushary.com scrape (`original/home.text.txt`, `original/home.meta.json`, FAQ answers from `original/home.rendered.html`), tightened.

| File | Source | License |
|---|---|---|
| `assets/fonts/InterVariable.woff2` | rsms/inter, `docs/font-files/InterVariable.woff2` | SIL OFL 1.1 |
| `assets/fonts/GeistMono-Variable.woff2` | vercel/geist-font, `packages/next/dist/fonts/geist-mono/` | SIL OFL 1.1 |
| `assets/icons/copy-simple.svg`, `check.svg`, `list.svg`, `x.svg`, `device-mobile.svg`, `laptop.svg`, `slack-logo.svg`, `browser.svg`, `list-checks.svg` (regular), `apple-logo-fill.svg`, `google-play-logo-fill.svg`, `play-fill.svg` (fill) | phosphor-icons/core, `assets/` | MIT, Copyright (c) 2023 Phosphor Icons |
| `assets/img/logo.webp` | pushary.com scrape, `original/site/pushary.com/_next/image__P3VybD0lMkZsb2dvLndlYnAm.html` (the `/logo.webp` image) | Pushary's own mark |
| `assets/img/agents/{claude,codex,cursor,gemini,hermes,antigravity}.webp` | pushary.com scrape, `original/site/pushary.com/_next/image__*` (the `/claude.webp`, `/codex.webp`, `/cursor.webp`, `/gemini.webp`, `/hermes.webp`, `/antigravity.webp` images the home page shows) | Agent makers' marks as shown on pushary.com |
| `assets/img/agents/vscode.svg`, `opencode.svg` | pushary.com scrape, `original/site/pushary.com/{vscode,opencode}__*.svg` | Agent makers' marks as shown on pushary.com |

## Shared iPhone (`assets/iphone/`, copied by `scripts/sync-phone.sh`)

| File | Source | License |
|---|---|---|
| `assets/iphone/assets/Inter-Regular.woff2`, `Inter-SemiBold.woff2`, `InterDisplay-Light.woff2` | rsms/inter, `docs/font-files/` | SIL OFL 1.1 |
| `assets/iphone/assets/GeistMono-Variable.woff2` | vercel/geist-font, `packages/next/dist/fonts/geist-mono/` | SIL OFL 1.1 |
| `assets/iphone/assets/icons/flashlight-fill.svg`, `camera-fill.svg` (fill), `check-circle.svg`, `x-circle.svg` (regular) | phosphor-icons/core, `assets/` | MIT, Copyright (c) 2023 Phosphor Icons |
| `assets/iphone/assets/icons/wifi.svg` | lucide-icons/lucide, `icons/wifi.svg` | ISC, Copyright (c) 2026 Lucide Icons and Contributors |
| `assets/iphone/assets/pushary-logo.webp` | Scraped from pushary.com (`/logo.webp`) | Pushary's own mark |
| `assets/iphone/assets/wallpaper-cosmic-orange.webp`, `wallpaper-burgundy.webp` | Rendered offline from Paper Shaders' `warp` fragment shader (paper-design/shaders) with custom colors; no photos, no AI imagery | Shader: Apache-2.0 (NOTICE: "Powered by Paper Shaders: https://shaders.paper.design"). The renders are original output. |
| CSS frame in `assets/iphone/iphone.css` | Approach adapted from CVERInc/liquidframe, retuned to Apple's measured geometry | MIT, Copyright (c) 2026 liquidframe contributors |
| Glass refraction in `assets/iphone/iphone.js` | Method from kube.io, "Liquid Glass in CSS and SVG"; code written here | Technique only, no code copied |
| `assets/iphone/private/*.png` (gitignored, local only) | Apple Design Resources, Bezel-iPhone-17 | Apple Design Resources License: mock-ups only, never redistribute |

## Placeholder content

- Phone lock screen: the agent label "Claude Code", repo `api-gateway`, commands, the approved message, date and time are invented demo copy.
- Control panel: every count, task and ledger row is example data taken from the original page's own demo panel, and the panel says "Example data".
