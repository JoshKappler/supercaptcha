# v8 Island: credits

| File | Source | License |
|---|---|---|
| `assets/fonts/InterVariable.woff2` | rsms/inter, `docs/font-files/` (copied from `explorations/e09`) | SIL OFL 1.1 |
| `assets/img/logo.webp` | Pushary logo from the pushary.com scrape (`/logo.webp`) | Pushary's own mark |
| `assets/logos/claude.webp`, `codex.webp`, `cursor.webp`, `gemini.webp`, `hermes.webp`, `antigravity.webp`, `hacker-news.webp` | pushary.com scrape, `original/site/pushary.com/_next/image__*` (`/claude.webp` and so on) | Marks of their owners, shown as on pushary.com |
| `assets/logos/vscode.svg`, `opencode.svg` | pushary.com scrape, `original/site/pushary.com/vscode__*.svg`, `opencode__*.svg` | Marks of their owners |
| `assets/logos/product-hunt.svg`, `assets/img/app-store.svg`, `assets/img/google-play.svg` | pushary.com scrape, `original/site/pushary.com/badges/` | Product Hunt, Apple and Google badges as used on pushary.com |
| `assets/img/founder-demo-poster.webp` | pushary.com scrape, `/home-demo-poster.webp` (poster of the founder video); links to the scraped Loom embed URL | Pushary's own image |
| `assets/icons/play-fill.svg` (fill), `list.svg`, `x.svg` (regular) | phosphor-icons/core, `assets/` | MIT, Copyright (c) 2023 Phosphor Icons |
| `assets/iphone/` | The shared iPhone component from `shared/iphone/`, copied by `scripts/sync-phone.sh`; entries below | see below |

## Shared iPhone component (`assets/iphone/`)

| File | Source | License |
|---|---|---|
| `assets/Inter-*.woff2`, `assets/InterDisplay-*.woff2` | rsms/inter, `docs/font-files/` | SIL OFL 1.1 |
| `assets/GeistMono-Variable.woff2` (also the page's mono face) | vercel/geist-font | SIL OFL 1.1 |
| `assets/icons/flashlight-fill.svg`, `camera-fill.svg`, `check-circle.svg` (also used by the island), `x-circle.svg`, `check-bold.svg` | phosphor-icons/core, `assets/` | MIT, Copyright (c) 2023 Phosphor Icons |
| `assets/icons/wifi.svg` | lucide-icons/lucide | ISC, Copyright (c) 2026 Lucide Icons and Contributors |
| `assets/pushary-logo.webp` | Scraped from pushary.com (`/logo.webp`) | Pushary's own mark |
| `assets/wallpaper-*.webp` | Rendered offline from Paper Shaders' `warp` fragment shader (paper-design/shaders) with custom colors | Shader: Apache-2.0 ("Powered by Paper Shaders: https://shaders.paper.design"). Renders are original output. |
| CSS frame in `iphone.css` | Approach adapted from CVERInc/liquidframe | MIT, Copyright (c) 2026 liquidframe contributors |
| Glass refraction in `iphone.js` | Method from kube.io, "Liquid Glass in CSS and SVG"; code written in this repo | Technique only |
| `private/*.png` (gitignored, local only) | Apple Design Resources, Bezel-iPhone-17 | Apple Design Resources License: mock-ups only, never redistribute |

## Example content

Everything in the phones, the island and the hero terminal ("Example session") is demo copy, not real data: the sender "Claude Code",
the repo `api-gateway`, the commands `git push origin main` and `npm run deploy:staging`,
"3 commits", `claude "ship the release"`, the date and the time 9:14. The control panel (tasks and
decision ledger) is labelled "Example data" on the page and comes from the example panel on pushary.com.

Page copy is from the pushary.com home page scrape (`original/home.text.txt`), tightened. FAQ
answers come from the page's own FAQ markup.
