# Credits

| File | Source | License |
|---|---|---|
| `assets/Inter-Regular.woff2`, `assets/Inter-Medium.woff2`, `assets/Inter-SemiBold.woff2`, `assets/InterDisplay-SemiBold.woff2` | rsms/inter, `docs/font-files/` | SIL OFL 1.1 |
| `assets/GeistMono-Variable.woff2` | vercel/geist-font, `packages/next/dist/fonts/geist-mono/` | SIL OFL 1.1 |
| `assets/icons/flashlight-bold.svg`, `camera-bold.svg`, `check-bold.svg` (bold), `check-circle.svg`, `x-circle.svg` (regular) | phosphor-icons/core, `assets/` | MIT, Copyright (c) 2023 Phosphor Icons |
| `assets/icons/wifi.svg` | lucide-icons/lucide, `icons/wifi.svg` | ISC, Copyright (c) 2026 Lucide Icons and Contributors |
| `assets/pushary-logo.webp` | Scraped from pushary.com (`original/site/pushary.com/_next/image__P3VybD0lMkZsb2dvLndlYnAm.html`, `/logo.webp`) | Pushary's own mark |
| `assets/wallpaper-cosmic-orange.webp`, `assets/wallpaper-burgundy.webp` | Rendered offline from Paper Shaders' `warp` fragment shader (paper-design/shaders, `packages/shaders/src/shaders/warp.ts`) with custom colors; no photos, no AI imagery | Shader: Apache-2.0 (NOTICE: "Powered by Paper Shaders: https://shaders.paper.design"). The renders are original output. |
| CSS frame in `iphone.css` (`.iphone__metal`, `.iphone__bezel`, `.iphone__btn`) | Approach adapted from CVERInc/liquidframe (`liquidframe.css`: layered box-shadow chamfers, protruding buttons), retuned to Apple's measured geometry and colors | MIT, Copyright (c) 2026 liquidframe contributors |
| Glass refraction in `iphone.js` (`displacementMap`) | Method from kube.io, "Liquid Glass in CSS and SVG" (convex squircle profile, Snell's law, feDisplacementMap); code written here | Technique only, no code copied |
| `private/*.png` (gitignored, local only) | Apple Design Resources, Bezel-iPhone-17 and Bezel-iPhone-18 | Apple Design Resources License: mock-ups only, never redistribute |

Geometry and the iOS 27 numbers (status bar, clock, controls, notification, long-press view) come from Apple's bezel PNGs and the iOS 27 UI kit, as measured in `docs/research/iphone-frames.md`.

## Placeholder demo copy

Everything shown on the lock screen is invented for the demo, not real data: the agent name "Claude Code" used as a sender label, the repo `api-gateway`, the commands `git push origin main` and `npm run deploy:staging`, "3 commits ahead of origin/main", the approved title and message, "Approval request", the date "Monday, October 5" and the time 9:41.
