# v10 Lock screen first: credits

| File | Source | License |
|---|---|---|
| `assets/fonts/MonaSansVF.woff2` | github/mona-sans, `fonts/webfonts/variable/MonaSansVF[wdth,opsz,wght].woff2` | SIL OFL 1.1 |
| `assets/fonts/MonaSansMonoVF.woff2` | github/mona-sans, `fonts/webfonts/variable/MonaSansMonoVF[wght].woff2` | SIL OFL 1.1 |
| `assets/img/grain.png` | Kevin Liu, Glyphfield `public/shader-grain.png` | MIT, Copyright (c) 2026 Kevin Liu (full notice below) |
| `assets/img/logo.webp` | Pushary logo from the pushary.com scrape (`/logo.webp`) | Pushary's own mark |
| `assets/iphone/` | The shared iPhone component (`shared/iphone/`), copied by `scripts/sync-phone.sh`; its entries follow | See below |

The hero backdrop reuses the phone's own wallpaper (`assets/iphone/assets/wallpaper-cosmic-orange.webp`), mirrored around the screen and dimmed, so the page continues the lock screen.

Copy, links and prices come from the pushary.com home page scrape (`original/home.text.txt`, `original/home.meta.json`), tightened.

## Example data

The control panel shows example data, labelled on the page: the tasks "Ship the billing webhook", "Refactor the auth module" and "Nightly data sync", the counts (3, 212, 174, 38), the ledger rows and their times. They come from the illustrative panel on pushary.com and are not real usage.

## Shared iPhone component credits

Paths in this section are relative to `assets/iphone/`.

| File | Source | License |
|---|---|---|
| `assets/Inter-Regular.woff2`, `assets/Inter-Medium.woff2`, `assets/Inter-SemiBold.woff2`, `assets/InterDisplay-SemiBold.woff2` | rsms/inter, `docs/font-files/` | SIL OFL 1.1 |
| `assets/GeistMono-Variable.woff2` | vercel/geist-font, `packages/next/dist/fonts/geist-mono/` | SIL OFL 1.1 |
| `assets/icons/flashlight-fill.svg`, `camera-fill.svg` (fill), `check-circle.svg`, `x-circle.svg` (regular), `check-bold.svg` (bold) | phosphor-icons/core, `assets/` | MIT, Copyright (c) 2023 Phosphor Icons |
| `assets/icons/wifi.svg` | lucide-icons/lucide, `icons/wifi.svg` | ISC, Copyright (c) 2026 Lucide Icons and Contributors |
| `assets/pushary-logo.webp` | Scraped from pushary.com (`original/site/pushary.com/_next/image__P3VybD0lMkZsb2dvLndlYnAm.html`, `/logo.webp`) | Pushary's own mark |
| `assets/wallpaper-cosmic-orange.webp`, `assets/wallpaper-burgundy.webp` | Rendered offline from Paper Shaders' `warp` fragment shader (paper-design/shaders, `packages/shaders/src/shaders/warp.ts`) with custom colors; no photos, no AI imagery | Shader: Apache-2.0 (NOTICE: "Powered by Paper Shaders: https://shaders.paper.design"). The renders are original output. |
| CSS frame in `iphone.css` (`.iphone__metal`, `.iphone__bezel`, `.iphone__btn`) | Approach adapted from CVERInc/liquidframe (`liquidframe.css`: layered box-shadow chamfers, protruding buttons), retuned to Apple's measured geometry and colors | MIT, Copyright (c) 2026 liquidframe contributors |
| Glass refraction in `iphone.js` (`displacementMap`) | Method from kube.io, "Liquid Glass in CSS and SVG" (convex squircle profile, Snell's law, feDisplacementMap); code written here | Technique only, no code copied |
| `private/*.png` (gitignored, local only) | Apple Design Resources, Bezel-iPhone-17 and Bezel-iPhone-18 | Apple Design Resources License: mock-ups only, never redistribute |

Geometry and the iOS 27 numbers (status bar, clock, controls, notification, long-press view) come from Apple's bezel PNGs and the iOS 27 UI kit, as measured in `docs/research/iphone-frames.md`.

### Placeholder demo copy (phone)

Everything shown on the lock screen is invented for the demo, not real data: the agent name "Claude Code" used as a sender label, the repo `api-gateway`, the commands `git push origin main` and `npm run deploy:staging`, "3 commits ahead of origin/main", the approved message, the date "Monday, October 5" and the time 9:41.

## Glyphfield license (for grain.png)

```
MIT License

Copyright (c) 2026 Kevin Liu

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
