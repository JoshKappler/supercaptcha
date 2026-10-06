# v12 credits: The page is the lock screen

| File | Source | License |
|---|---|---|
| `assets/fonts/MonaSans-Regular.woff2`, `MonaSans-Medium.woff2`, `MonaSans-SemiBold.woff2`, `MonaSansCondensed-SemiBold.woff2`, `MonaSansMono-Regular.woff2` | github/mona-sans, `fonts/webfonts/static/` (static files, because WebKit drew the variable file at its thinnest weight) | SIL OFL 1.1, Copyright (c) 2023 GitHub |
| `assets/icons/check.svg`, `x.svg`, `warning.svg`, `hourglass-medium.svg`, `shield-check.svg`, `copy-simple.svg`, `caret-right.svg`, `list-checks.svg` (regular), `lock-simple-fill.svg` (fill) | phosphor-icons/core, `assets/` | MIT, Copyright (c) 2023 Phosphor Icons |
| `assets/img/shader-grain.png` | Kevin-Liu-01/Glyphfield, `public/shader-grain.png` | MIT, Copyright (c) 2026 Kevin Liu. The full notice ships beside it as `assets/img/shader-grain.LICENSE.txt` |
| `assets/img/logo.webp` | pushary.com scrape, `original/site/pushary.com/_next/image__P3VybD0lMkZsb2dvLndlYnAm.html` (`/logo.webp`) | Pushary's own mark |
| `assets/img/agents/{claude,codex,cursor,antigravity,gemini,hermes}.webp` | pushary.com scrape, `original/site/pushary.com/_next/image__*` (`/claude.webp` and the others) | Agent marks as shown on pushary.com |
| `assets/img/agents/opencode.svg`, `vscode.svg` | pushary.com scrape, `original/site/pushary.com/opencode__*.svg`, `vscode__*.svg` | Agent marks as shown on pushary.com |
| `assets/img/hacker-news.webp` | pushary.com scrape, `/hacker-news.webp` | As shown on pushary.com |
| `assets/img/app-store.svg`, `google-play.svg` | pushary.com scrape, `original/site/pushary.com/badges/` | Badges as shown on pushary.com |
| `assets/img/product-hunt-medal.svg` | Medal mark taken unchanged from `original/site/pushary.com/badges/product-hunt-top-post-light.svg` | Badge artwork as shown on pushary.com |
| Page wallpaper | `assets/iphone/assets/wallpaper-burgundy.webp` from the shared iPhone, rendered from Paper Shaders' `warp` shader. Used full-bleed, mirrored tile by tile and dimmed in `css/site.css` | Apache-2.0 shader. Powered by Paper Shaders: https://shaders.paper.design |

## Shared iPhone (`assets/iphone/`, copied by `scripts/sync-phone.sh`)

See `assets/iphone/CREDITS.md` for the phone's own fonts, icons, wallpapers, CSS frame and the local-only Apple bezel PNGs.

## Copy and example data

Copy, facts, prices and links come from the pushary.com scrape (`original/AUDIT.md`), cut and tightened. These are examples and are labelled "Example data" or "Example rules" on the page: the page-scale notification (Claude Code, repo `api-gateway`, `git push origin main`, 3 commits ahead, the approved and denied messages, `npm run deploy:staging`), the phone's request (Codex, repo `billing`, `vercel deploy --prod`, `bun run db:migrate`, the time and date on its lock screen), the rule chips (`read`, `lint`, `test`, `rm`, `deploy`, taken from the scraped FAQ) and the 30 second wait (the scrape's "auto-deny 30s" sample). The 9:12, 9:14 and 9:51 notifications restate the scraped "Walk away" timeline. Testimonial initials come from the quoted names; no photos are used.
