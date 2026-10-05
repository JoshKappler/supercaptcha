# Agentic landing-page design, October 2026: method, libraries, phone realism

Research date: 2026-10-05. Model: claude-opus-5-5. Sources were read this turn unless marked "unverified".
Context: Pushary dark marketing page, plain static HTML/CSS/vanilla JS, no build step, all assets local.

## 0. The short version

- Write the design down before building: a DESIGN.md (Google's open spec) with tokens, rationale and named anti-examples. Lint it.
- Run cheap deterministic gates before any vision reviewer: `npx impeccable detect index.html`, plus Vercel's web interface guidelines and Anthropic's frontend-design bans.
- Judge directions pairwise against each other and against a captured reference screenshot, not as absolute 1 to 10 scores. Research shows absolute scores are less reliable and drift.
- Freeze every screenshot: Playwright `animations: "disabled"`, `reducedMotion: "reduce"`, wait for `document.fonts.ready`. The page's resting state must be its final state.
- Phone: use Apple's official iPhone 18 Pro bezel PNG (published 2026-09-09). Note Apple's marketing guidelines forbid adding reflections, tilting or animating it (see section 3).
- Glass: refraction is only visible over detailed, high-contrast content. Over a dark flat page it is invisible no matter the library. SVG `backdrop-filter: url()` is Chrome-only, and Pushary's audience is on iPhone Safari.
- Correction to the brief: iPhone 17 Pro and 18 Pro have an aluminum unibody, not titanium. Edge shading should read as anodized aluminum.

## 1. Method: how a professional runs the agentic loop

### 1.1 Write the spec first (tokens, rationale, anti-examples)

- **DESIGN.md** (Google Labs, Apache-2.0, alpha). YAML front matter holds tokens. The markdown body holds rationale. The CLI runs `npx @google/design.md lint DESIGN.md` (broken token references, WCAG contrast), plus `diff` and `export`. https://github.com/google-labs-code/design.md , spec: https://github.com/google-labs-code/design.md/blob/main/docs/spec.md
- **Reference capture**: VoltAgent/awesome-design-md (MIT) holds 73 DESIGN.md files extracted from live public sites, including Linear, Vercel, Raycast, Stripe and Apple. Use them as token references, not as templates. https://github.com/VoltAgent/awesome-design-md
- Anthropic's **frontend-design** skill sets a two-pass method. Pass 1 is a compact token plan: 4 to 6 hex colors, type families and roles, ASCII wireframes, principles. Then review that plan for anything that "reads like the generic default". Pass 2 builds. https://github.com/anthropics/claude-code/blob/main/plugins/frontend-design/skills/frontend-design/SKILL.md
- A practical rule from the anti-slop literature is to write 3 to 5 adjectives and 3 to 5 named anti-examples into the spec. "Replace generality with a decision." https://www.mindstudio.ai/blog/claude-design-avoid-ai-slop-design-system

### 1.2 Diverge, then converge

- Diverge on **hero-only frames**, not whole pages. The hero carries the identity, and full pages waste review budget.
- Converge with **pairwise** judgments: "A or B, and why". VLM-as-judge research reports single-answer grading about 8% below pairwise, and image-only judging 5 to 9% lower again. Swap A and B positions to cancel position bias. https://www.emergentmind.com/topics/vlm-as-a-judge , https://aclanthology.org/2026.findings-eacl.335.pdf
- The reality in 2026 is "AI builds it, you fix it": generate, critique specific sections, then fix those sections under real constraints. Do not re-roll the whole page with a longer prompt. https://superdesign.dev/blog/fix-generic-ai-landing-page

### 1.3 Deterministic gates before vision review

- **Impeccable** (pbakaus, Apache-2.0). 61 deterministic anti-pattern rules plus 24 agent commands (`critique`, `audit`, `polish`, `quieter`, `typeset`, `animate`, and others). Runs on plain HTML: `npx impeccable detect index.html` or `--json`. https://github.com/pbakaus/impeccable
- **Vercel Web Interface Guidelines** (as AGENTS.md or `npx skills add https://github.com/vercel-labs/agent-skills --skill web-design-guidelines`). https://github.com/vercel-labs/web-interface-guidelines
- **open-design anti-ai-slop.md** P0 list: no Tailwind indigo/violet hexes, no purple-to-blue "trust" gradients, no emoji icons, no rounded card with a colored left border, no invented metrics, no filler copy. https://github.com/nexu-io/open-design/blob/main/craft/anti-ai-slop.md
- **Emil Kowalski's skills** (`emil-design-eng`, `review-animations`, `apple-design`). Motion decisions: whether to animate at all, curve, duration, interruption. https://github.com/emilkowalski/skills
- Conflict to note: Impeccable says pure black should be tinted. Anthropic's skill lists tinted blacks (#0B0B0B, #111) as "template chrome". Pick one on purpose and write it into DESIGN.md.

### 1.4 Screenshot discipline (fixes "frames caught mid-animation")

- Playwright `page.screenshot({ animations: "disabled" })`. Finite CSS animations, transitions and Web Animations jump to completion. Infinite ones reset to their initial state. `toHaveScreenshot()` defaults to this, but `page.screenshot()` defaults to "allow". https://playwright.dev/docs/api/class-page
- Also set `browser.newContext({ reducedMotion: "reduce", deviceScaleFactor: 2 })` and `await page.evaluate(() => document.fonts.ready)`.
- Playwright MCP gained full device-pixel screenshots on 2026-06-25. Vision reviewers read small type better at 2x. https://bug0.com/blog/playwright-mcp-hires-screenshots-ai-test-agents-2026
- Page rule: every element's resting CSS is its final state. Entrance motion is added on top (scroll-driven CSS or Motion `inView`), and nothing starts at `opacity: 0` waiting for JS. A screenshot can then never catch a half state.
- Capture at least 1440 wide full page, 390 wide full page, and a 2x crop of the hero for detail critique.

### 1.5 Vision critique loop

- Published loops use one rubric with weighted dimensions plus hard gates: hierarchy, composition, typography, color and surfaces, distinctiveness, craft, responsiveness, motion. Output is the scored critique, the 3 highest-leverage fixes, and pass or fail on the gates. Fix smallest first. https://github.com/JakeSelby/agent-harness/issues/27 , https://github.com/Nonarkara/dr-non-vibecoding-skills/pull/10 (both community examples, small repos)
- Add **reference-anchored** questions that match our recurring failures, asked as yes/no before any score:
  - "Is the glass refraction visible at 100% zoom without being told where it is?"
  - "Side by side with this crop of apple.com/iphone, does the phone read as a photo or a drawing?"
  - "Name the template this page resembles. If you can name one, it fails."
- Keep the 3-persona panel, but make each reviewer return its top 3 fixes, not only a number.

### 1.6 Tools worth knowing (not needed for a static page)

- **Claude Design** (Anthropic Labs, launched 2026-04-17, beta on paid plans since 2026-09-23). Builds a design system from a repo, then prototypes. https://techcrunch.com/2026/04/17/anthropic-launches-claude-design-a-new-product-for-creating-quick-visuals/
- **Figma Dev Mode MCP server**. Streams layer tree, variables and Code Connect mappings to agents. Bidirectional Claude Code integration since 2026-02-17. Only useful if a Figma file exists. https://www.figma.com/blog/introducing-figma-mcp-server/
- **v0** and similar generators produce React/Tailwind. They are poor fits for plain static HTML and reinforce the template look.

## 2. Libraries for a plain static page

| Need | Pick | License | Size / form | Why |
|---|---|---|---|---|
| Device frame | Apple official iPhone 18 Pro bezel PNG | Free download, Apple marketing guidelines apply | PNG + PSD | Real product render, current device. Bezels for iPhone 18 Pro and iPhone Duo went up 2026-09-09. https://developer.apple.com/design/resources/ , https://9to5mac.com/2026/09/09/apple-updates-design-resources-with-iphone-duo-and-iphone-18-pro-product-bezels/ |
| Device frame, CSS fallback | LiquidFrame (CVERInc) | MIT | One CSS file, zero deps | Pure-CSS iPhone 16 Pro / 17 Pro with aluminum finishes, `corner-shape: squircle`, iOS 26 Safari chrome. No glare built in. https://github.com/CVERInc/liquidframe |
| iOS lock screen and notification | Build it yourself from Apple's iOS 27 Figma UI kit (updated 2026-09-15) | Apple kit terms | n/a | No maintained open HTML library matches iOS 27. Measure radii, materials and type sizes from the official kit. https://developer.apple.com/design/resources/ |
| Lock screen reference demo | Emad-log/live-notifs | unverified | n/a | Full lock screen scene (wallpaper, Dynamic Island, clock, glass notification card). Reference only. https://github.com/Emad-log/live-notifs/pull/3 |
| Glass refraction | kube.io technique: generate your own displacement map | Article; code is yours | One PNG map + SVG filter | The best explanation of convex-squircle bezels, Snell's law displacement and a specular rim. https://kube.io/blog/liquid-glass-css-svg/ |
| Glass, WebGL | ybouane/liquidglass | MIT, 528 stars | Needs WebGL and `html-to-image` | Real refraction, chromatic aberration and lighting. Heavier, and glass elements must be direct children of the root. https://github.com/ybouane/liquidglass |
| Glass, other | ALEXalesha/LiquidGlass (CSS+SVG and WebGL2, no build), nikdelvin/liquid-glass (CSS+SVG) | see repos | small | Alternatives to shuding/liquid-glass. Stars and quality unverified. https://github.com/ALEXalesha/LiquidGlass , https://github.com/nikdelvin/liquid-glass |
| Motion, first choice | Plain CSS: transitions, `@keyframes`, scroll-driven `animation-timeline: view()` | n/a | 0 KB | Chrome 115+ and Safari 26 support it. Firefox stable still has it behind a flag, so treat it as progressive enhancement. https://www.joshwcomeau.com/animation/scroll-driven-animations/ |
| Motion, JS | Motion (motion.dev) vanilla | MIT | `animate` mini 2.3 KB, `scroll` 5.1 KB, `inView` 0.5 KB | Springs, staggers, interruptible animation. Copy the `+esm` build locally and pin the version. https://motion.dev/docs/quick-start , https://motion.dev/docs/inview |
| Motion, heavy | GSAP 3.13+ with all plugins (SplitText, ScrollTrigger) | Free "Standard No Charge" license, not open source | larger | Free for commercial sites. The only restriction is building a no-code tool that competes with Webflow. Only worth it for timeline choreography. https://gsap.com/standard-license |
| View Transitions | Same-document only | n/a | 0 KB | Same-document is Baseline (Firefox 144). Cross-document is not in Firefox. Irrelevant for a one-page site. https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@view-transition |
| Mesh gradient / grain gradient | Paper Shaders `@paper-design/shaders` (vanilla package) | Apache-2.0 | WebGL2, zero deps | Mesh gradient, static mesh gradient, grain gradient, dithering. Pin the version; it ships breaking changes under 0.0.x. https://github.com/paper-design/shaders |
| Mesh gradient, tiny | whatamesh (Stripe's minigl, reverse engineered) | see repo | about 10 KB | The Stripe gradient. Best rendered once and saved as an image if it does not need to move. https://github.com/jordienr/whatamesh |
| Grain | 256 or 512 px noise PNG tile, or an inline SVG `feTurbulence` data URI | n/a | about 10 to 30 KB | A pre-rendered tile is cheapest on mobile. Live SVG filters cost per pixel. https://ibelick.com/blog/create-grainy-backgrounds-with-css |
| Type, page | Inter 4 with `opsz` (Inter Display at 32+), or Mona Sans using its width axis | OFL | variable WOFF2 | Inter 4 folds Inter Display into an `opsz` axis. But Inter, Geist and system defaults are what slop detectors flag, so the display face must do visible work (width, optical size, tight tracking) or be swapped. https://github.com/rsms/inter/discussions/463 |
| Type, inside the phone | `font-family: system-ui, -apple-system, "Inter", sans-serif` | n/a | 0 KB | SF Pro cannot be embedded on a website under Apple's license. `system-ui` renders the visitor's own SF on Apple devices without distributing it. https://developer.apple.com/forums/thread/127350 |
| Avoid | Fontshare fonts (Satoshi, General Sans) | ITF Free Font License | n/a | Free commercially, but self-hosting needs ITF's written consent. That conflicts with "all assets local". https://madegooddesigns.com/fontshare/ |
| Icons | Phosphor | MIT | about 1,512 icons in 6 weights | Weights can match the type weight, and the duotone and fill variants help on dark backgrounds. Lucide (ISC, about 1,780, one 2px style) is the alternative. Tabler (MIT, 6,000+) has the most coverage. https://dev.to/svgicons/lucide-vs-tabler-vs-phosphor-which-free-icon-set-fits-your-ui-4ocl |

## 3. Realistic phone: what reads as a photo

### Facts that change the approach

- iPhone 17 Pro has "a single piece of aluminum connecting the back to the sides". It is the first Pro without a titanium chassis. Colors are Cosmic Orange, Deep Blue and Silver. https://en.wikipedia.org/wiki/IPhone_17_Pro
- iPhone 18 Pro (announced 2026-09-09) carries over the aluminum unibody. Colors are Black, Silver, Glacier and Burgundy. https://www.macrumors.com/2026/09/09/apple-reveals-iphone-18-pro-four-new-colors/
- Apple's marketing guidelines say product images must be used "as is and without modification". They prohibit adding "reflections, shadows, highlights", cropping, tilting, animating, flipping or spinning, and "rendering in 3D or creating simulations of Apple products". The screen must show the app as it really runs, with a full status bar. Minimum size is 200 px onscreen. https://developer.apple.com/app-store/marketing/guidelines/
  - This directly conflicts with "bezel PNG plus CSS glare" and with tilting the phone.

### Why phones look fake (and the fix for each)

1. **Hand-drawn frame.** A CSS or SVG frame with flat gradients reads as an illustration. Fix: use the official PNG. Its edge shading is a real render.
2. **Screen too bright and too perfect.** Real OLED in a photo has slightly lifted blacks and a soft falloff. Fix: put the screen content under the bezel and add one very faint inset vignette (for example `inset 0 0 40px rgba(0,0,0,.25)`) inside the screen clip.
3. **Wrong geometry.** Screen corner radius or Dynamic Island size is off by a few px. Fix: take the screen rect from the PNG's transparent cutout. Never estimate it. iPhone 18 Pro has a smaller Dynamic Island than 17 Pro (9to5Mac above).
4. **Shadow is one blur.** Fix: stack shadows, with blur doubling and opacity halving per layer, plus a tight contact shadow. https://www.conor.fyi/writing/anatomy-of-a-css-phone-mockup
5. **Glare that floats on top.** Where glare is allowed (CSS frame path only), use two layers inside the screen clip: one sharp diagonal (`rgba(255,255,255,.08) 35%, transparent 35%`) and one soft 135deg sheen (`.06 to 0 at 55%`). Keep it static in screenshots. https://www.conor.fyi/writing/anatomy-of-a-css-phone-mockup
6. **Metal looks like chrome.** Anodized aluminum is satin, not mirror. Use a low-contrast gradient on the rim, with one 1px highlight on the light-facing edge and no hard specular stripes.
7. **Floating in a void.** A phone on flat #000 has no light to reflect. Give the scene one light source (a soft radial glow behind and above the phone). The rim highlight and shadow must agree with that glow's direction.
8. **Full photoreal 3D** (three.js plus an HDRI environment map plus a GLB model) gives the truest reflections. Free iPhone 17 Pro GLBs exist under CC BY 4.0 on Sketchfab. https://sketchfab.com/3d-models/iphone-17-pro-4541aa8a28324b33a2baaf81d263aaec . This hits Apple's "rendering in 3D" prohibition and adds a large dependency. Not recommended here.

## 4. Glass that actually shows

- Refraction bends what is behind it. On a dark flat page there is nothing to bend, so the effect disappears. kube.io: solid-color backgrounds "diminish the visual effect significantly". The demos use architecture and album art. https://kube.io/blog/liquid-glass-css-svg/
- Fix 1: put the glass notification over a detailed, high-contrast lock-screen wallpaper (a photo with edges and color), not over the page background.
- Fix 2: a convex-squircle displacement map with a bezel about 15 to 25% of the element's short side, plus a specular rim (a light 1px inner top edge and a darker bottom edge). The rim is what makes glass read in a still screenshot.
- Fix 3 (cross-browser): `backdrop-filter: url(#svg)` works only in Chrome. Safari and Firefox can run the displacement filter itself, just not on backdrop content. Because the wallpaper is a known image, clone it inside the glass element, align it, and apply `filter: url(#refract)` to the clone. Pushary's visitors are on iPhone Safari. Verify this on WebKit (Playwright `webkit`), not only in Chromium.
- Fix 4: if it must be pixel-certain, bake the glass into the hero image offline and keep live glass only for small interactive pieces.

## 5. What makes a page read as top-tier rather than template

Concrete rules, each with its source:

- **Spend boldness in one place.** Make one memorable element and keep everything else quiet. "Remove one accessory." (Anthropic frontend-design)
- **Ban the template chrome**: tracked ALL-CAPS eyebrows, middle-dot metadata, mono labels, "→" on links, accenting one word of the headline, generic numbered 01/02/03 when the content is not sequential. (Anthropic frontend-design)
- **Ban the generic layout**: centered hero with gradient blob, three identical feature cards, stock Hero, Features, Pricing, FAQ order. Use asymmetric sections tied to concrete jobs, and order them by the strongest argument. (superdesign.dev; open-design P1)
- **One orchestrated motion moment** (one load sequence or one reveal), not fade-up on every section. No bounce or elastic easing. Animate only transform and opacity, list properties explicitly (never `transition: all`), and honor reduced motion. (Anthropic; Impeccable; Vercel guidelines)
- **Copy is design content**: specific to this buyer and impossible to paste onto a competitor. No "Save time. Work smarter." No invented metrics. (superdesign.dev; open-design P0)
- **Real product, real state.** Show the actual Approve/Deny notification as it runs, never a blank or decorative screen. (Apple guidelines; superdesign "real product screenshot")
- **Structure felt, not seen.** Soft, low-contrast dividers and fewer icons, and secondary chrome a few notches dimmer than content. Linear's 2026-03-12 refresh moved to warmer grays in LCH. https://linear.app/now/behind-the-latest-design-refresh
- **Typographic details pros use**: Raycast runs Inter with `ss03` site-wide and slight positive tracking on dark body text (0.2 to 0.4px), on a #07080a canvas. Section rhythm is 96 / 64 / 40 px on desktop / tablet / mobile. (Derived from extracted DESIGN.md files, not official.) https://github.com/VoltAgent/awesome-design-md/blob/main/design-md/raycast/DESIGN.md
- **Craft details**: curly quotes, `tabular-nums`, `&nbsp;` between units, ±1px optical alignment, shadows with at least two layers (ambient plus direct), semi-transparent borders on dark, `color-scheme: dark`, and `theme-color`. (Vercel guidelines)
- **Line length** under 80 characters, and one or two type families that are clearly distinct. (Anthropic frontend-design)
- **Default Inter or Geist alone reads as default.** Both are on the detectors' overused list. Typography is the fastest way out of the slop look. (Impeccable; 925studios)

## 6. Mapping to Pushary's recurring failures

| Failure | Root cause | Action |
|---|---|---|
| Glass barely shows | Nothing detailed behind it; Chrome-only backdrop SVG | Section 4: detailed wallpaper, specular rim, cloned-layer filter, WebKit check |
| Reads as a template | Default fonts, centered hero, card grid, eyebrows | Run `npx impeccable detect` before review; apply section 5 bans; make the display type do visible work |
| Fake-looking phone | Drawn frame, estimated geometry, flat lighting | Official iPhone 18 Pro PNG, geometry from its cutout, one light source, stacked shadow |
| Frames caught mid-animation | Screenshots taken with `animations: "allow"`; JS-gated opacity | Section 1.4 settings; resting state equals final state |
| Scores plateau | Absolute 8+ gates drift | Pairwise A vs B, positions swapped, plus yes/no gate questions per failure |

## Not verified this turn

- Exact contents and colors of Apple's iPhone 18 Pro bezel pack (9to5Mac confirms it exists; the page lists "iPhone 18").
- Star counts and quality of ALEXalesha/LiquidGlass, nikdelvin/liquid-glass and Emad-log/live-notifs.
- Paper Shaders bundle size.
- Whether Apple's App Store marketing guidelines bind a non-App-Store marketing page. They are written for marketing App Store apps; whether Pushary ships an App Store app was not checked.
