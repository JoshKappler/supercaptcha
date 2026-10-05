# Kevin Liu design studio inventory (for Pushary landing variants)

Model: claude-opus-5-5. Read 2026-10-05. Read-only sweep; nothing built, nothing pushed, nothing posted.

## 0. Clones

All four shallow clones succeeded (`git clone --depth 1 -c core.longpaths=true`), no Windows path failures, working trees clean.

| Repo | Path | HEAD |
| --- | --- | --- |
| Prototemplate | `C:\Users\joshu\OneDrive\Desktop\projects\supercaptcha-pushary\vendor\kevin\Prototemplate` | f8dfa8b |
| Sigil-UI | `...\vendor\kevin\Sigil-UI` | 8340daf |
| Glyphfield | `...\vendor\kevin\Glyphfield` | 3763d1b |
| fieldwork | `...\vendor\kevin\fieldwork` | 4a5b3c2 |

`vendor/*` is gitignored in the Pushary repo (`.gitignore` line `vendor/*`, with `!vendor/README.md`), so the clones stay out of commits.

## 1. Licenses: what reuse is allowed (the target repo is PUBLIC)

### Prototemplate: not open source, all rights reserved. Do not copy anything except the third-party fonts.

`vendor\kevin\Prototemplate\LICENSE`, verbatim:

```
Prototemplate License

Copyright (c) 2026 General Translation, Inc. All rights reserved.

This repository is public so that anyone can read it. It is not open source.
It is not licensed under the MIT License or under any other open-source or
Creative Commons license, and no such license should be inferred from the
repository being public on GitHub.

What you may do

You may view the contents of this repository, clone it, and link to it in
order to read, review, study, and evaluate the work. GitHub's Terms of
Service let you fork and star it on GitHub, and this license does not
restrict that.

What you may not do without written permission from General Translation, Inc.

- Copy, publish, host, distribute, or sublicense the contents, in whole or
  in part, anywhere other than a fork on GitHub.
- Use the writing, copy, names, marks, designs, layouts, typography,
  illustrations, images, video, motion, or other creative work in your own
  product, site, document, presentation, or marketing.
- Use the source code, engines, pipelines, or scripts in your own software.
- Make or publish derivative works of any of the above, including
  translations and adaptations.

If you would like to use something here, ask. General Translation, Inc. can
be reached through generaltranslation.com.

Third-party material

Some files come from others and keep their own licenses, which control for
those files:

- The fonts under public/fonts are under the SIL Open Font License 1.1. See
  public/fonts/README.md and public/fonts/google/MANIFEST.json.
- Icons from Heroicons (MIT License, tailwindlabs/heroicons) and Lucide (ISC
  License) appear in the brand deck and in the blog graphics.
- Photographs and artworks in the brand deck that come from Wikimedia
  Commons keep the public-domain or Creative Commons terms recorded with
  their credits on the slides and in deck/shots/OPENERS.md.
- Skills under public/skills that credit an upstream source keep that
  source's license as noted in the file.
- Dependencies installed from npm keep their own licenses.

Open-source software from General Translation

General Translation's libraries, including gt-next, gt-react, the gt CLI,
and the rest of the gt monorepo, are separate projects released under the
MIT License in their own repositories. This license does not change that.

No warranty

The contents are provided as is, without warranty of any kind.
```

What this means for Pushary:
- The license's "may not do" list covers using its "designs, layouts, typography ... motion" in your own site and making "derivative works ... adaptations". A Pushary page that reproduces a Prototemplate direction's layout or signature motion falls in that list. Reading it to learn the method is in the "may do" list.
- Freely usable today: only the third-party files, mainly the OFL fonts in `public/fonts/` (section 4).
- Small discrepancy: the LICENSE points at `public/fonts/README.md`, which does not exist. The font README is at `public/fonts/google/README.md`.
- Also in the "may not" list even though they look generic: `deck/slides/*.html` (static HTML), the CSS cookbook in `docs/research/DESIGN_BRIEF.md` section 1.6 (the techniques are ordinary CSS and can be written fresh; the text cannot be copied), and `public/logos/*` (third-party customer marks in any case).

### Sigil-UI: MIT, "Copyright (c) 2026 Kevin B. Liu". Code reusable with the notice. Fonts are NOT covered.

Standard MIT text. Copy, modify, publish allowed if the copyright and permission notice ship with the copied portion.

Large exception: `apps/web/public/fonts/` holds 98 font files, and almost all are commercial or trial faces that the repo's MIT license cannot relicense. Do not copy any of them:
- Pangram Pangram (commercial; free trials are personal-use only): every `PP*.otf` (Neue Montreal, Fraktion Mono, Supply Mono/Sans, Mori, Hatton, Editorial New, Monument Extended, Neue Machina, Pier Sans, Stellar, Telegraf, Acma, Eiko, Gatwick, Charlevoix, Mondwest, Radio Grotesk, Neue Bit, Pangram Sans and more), plus `Migra-*.otf`, `NeueMontreal-*.otf`.
- ABC Dinamo trial: `ABCMonumentGrotesk-*-Trial.otf`.
- TT trial: `TT Commons Classic Trial Var Roman.ttf`.
- Vulf (commercial): `VulfSans-*.ttf`.
- Possibly free but unverified here (no license file shipped with them): `ApfelGrotezk-*.otf` (Collletttivo, reported OFL upstream), `Nacelle-*.otf`, `texgyreheros-*.otf` (GUST Font License upstream).

Consequence: nearly every Sigil preset names a commercial font (section 5). Reuse the color, radius, spacing and motion tokens; swap the fonts for OFL ones.

### Glyphfield: MIT, "Copyright (c) 2026 Kevin Liu". Code and GLSL reusable with the notice. Brand fonts and brand media NOT covered.

Standard MIT text, `"license": "MIT"` in `package.json`. `THIRD_PARTY_NOTICES.md` adds:
- WebGL Fluid Simulation adaptation, MIT, Pavel Dobryakov (keep his notice too).
- `@paper-design/shaders-react` 0.0.78, Apache-2.0 (npm dependency, not bundled source).
- FoilStickerShader (Unlicense), HoloSticker and HoloCloth (MIT).
- Poly Haven and ambientCG CC0 textures are fetched at runtime, not committed.
- Visual references (Evil Rabbit Shaders, GRADIENTOOL, Grainient) are stated as independent reimplementations; no code from them is bundled.

Not covered by MIT:
- `public/brands/**` (172 files): `public/brands/ASSET-NOTICE.md` says these third-party brand marks, media and press-kit files "are not relicensed by Glyphfield", and "Do not export or redistribute a research-only asset as a standalone stock asset."
- `public/brand/gt-*.png|svg` and `public/brands/gt/library`: GT marks and artwork.
- `public/fonts/brands/**`: Lausanne, Sohne, Kunst Grotesk, Apercu Mono Pro, Arizona Flare, Paper Mono, APK Protocol, KH Teka Mono, Flauta. Commercial or brand-restricted; do not copy. The open ones in that folder (Geist, Inter, IBM Plex Mono, Source Code Pro, Instrument Serif) are better taken from upstream.

### fieldwork: no license. Default copyright applies.

No `LICENSE` file, no `"license"` field in `package.json`. With no license, no copying into a public repo is granted. It is a developer tool (a localhost dock for coding agents), not a visual asset pack; its only graphic is `assets/fieldwork-mark.svg`. Reading it for method is fine.

## 2. Prototemplate: the method

What it is: GT's design lab. Every direction is a real Next.js page under `src/app/d/<slug>/`, not a mockup. One registry drives everything.

- Registry: `src/lib/directions.ts` (`DIRECTIONS[]`: `slug`, `name`, `concept`, `tone`, one `signature` motion, optional `site`/`reference`). The index, presenter, sitemap and `/compare` all map over it.
- Lineage: round one was 20 self-contained static `.html` samples built from one brief (`docs/research/DESIGN_BRIEF.md`). Part 1 is a shared foundation: real copy only, fixed narrative beats, a black/white/metallic law, a type scale, one light source per page, grain, a strict GSAP + Lenis boot contract, reduced-motion and no-JS legibility rules, 1440 and 390 px. Part 2 is twenty art directions; each "commits TOTALLY to one direction ... its single signature motion ... everything else must feel like a different studio built it". Survivors were ported to Next with `docs/research/PORT_SPEC.md`. Retired ones are kept as captures in `public/shots/archive/` with commit pointers in `src/lib/archive.ts`. This is the "spin up a dozen examples and riff" loop Josh described.
- Shared base and forks: `src/app/d/toolchain/` is the single source of truth. Forks import its sections and re-skin by "root-class rescoping" (`.lensgate-root` and so on). Design law in `DESIGN.md`: four absolute colors (`#070707` ink, `#101010` raised ink, `#8a8f98` titanium, `#ffffff` paper), exactly one spectral accent per page, dark mode as a pure token remap, every hairline drawn exactly once (checked by `scripts/lint-lines.mjs`), one mobile type ladder, every engine pauses offscreen and renders one still under reduced motion.
- Scroll presenter: `/present` (`src/app/present/PresenterApp.tsx`). A Lenis + GSAP ScrollTrigger deck: pinned slides (Intro, Why, What we need, How, type detail) whose content scrubs in with scroll progress, then `viewer/PrototypeViewer.tsx` scales the frame into a full-screen iframe of each live direction, with a dock, a vertical carousel, per-direction notes and a star rating (`viewer/reviewStore.ts`, `RatingStars.tsx`), ending on `Scoreboard.tsx`. `src/app/present/directions.ts` filters Signal out of the presentation.
- Build log: the `/docs` page, readme first, "with the build log under the readme"; `/craft` redirects there. It shows each reusable engine running live with its API snippet (`src/app/craft/*Demo.tsx`, `src/app/craft/libraries.ts`). The verify loop is `docs/SHIP-LOOP.md` (line audit, page check at ten viewports in both themes, ratchet, tsc, filming, mirror build).
- Review tooling: `/compare` shows two directions side by side in scroll-synced same-origin iframes. `docs/harness/gallery-shoot.mjs` shoots each section as element screenshots (`public/shots/gallery/sec-<key>-<cut>-<theme>.png`).
- Agent instructions: no AGENTS.md or CLAUDE.md at the root. Skills in `.agents/skills/` (blog-graphics-pipeline, docs-source-capture, glyphfield-headless-export, gt-blog-mdx-components, gt-docs-visual-tokens, stop-motion-ui-capture), symlinked into `.claude/skills/`. `ARCHITECTURE.md` also names `gt-redesign` and `redesign-*` skills that are not in this clone. About 150 published skill docs sit in `public/skills/*.md`; the relevant one is `public/skills/frontend-design-taste.md` (an anti-slop framework adapted from tasteskill.dev).

### The "eighteen" art directions: the count has drifted

The GitHub description says eighteen, README says seventeen, `ARCHITECTURE.md` says sixteen. The current registry holds 26 numbered directions (labels 01 to 29; 17, 20 and 22 are retired) plus the Shipped reference. All 27 below, from `src/lib/directions.ts`. Fonts: the toolchain family uses Inter (rsms) for display and body plus a system mono (`ui-monospace, 'SF Mono'`); each of 18 to 29 adds one Google display face.

| # | Slug | Palette | Type | Signature move |
| --- | --- | --- | --- | --- |
| 01 | toolchain | ink/titanium/paper, accent #2f5ce0 | Inter + system mono | Structure from hairlines only; one ruled column, bento rows, isometric line diagrams |
| 02 | chroma-flow | same plus streaming chroma | Inter + mono | Curl-noise ribbon of flowing color through the nameplate |
| 03 | dither-field | pure 1-bit B/W | Inter + mono | Hero is an ordered (Bayer) dither field resolving "hello" in 8 scripts |
| 04 | aurora-paper | paper plus grainy aurora wash, #2f5ce0 | Inter + mono | Resend-style light wash behind a paper page |
| 05 | glyph-rain | paper + ink | Inter + mono | Particle rain of world-script glyphs condenses into each headline word |
| 06 | prism-light | paper plus spectral fan | Inter + mono | White beam through a glass prism; translations ride the dispersion |
| 07 | lens-gate | paper plus one glass lens | Inter + mono | The page's own rules bend through a breathing lens and snap straight |
| 08 | paper-foundry | brushed graphite sheet | Inter + mono | One anisotropic sheen sweep over a reading-order cell cascade |
| 09 | terminus-board | paper plus amber #b26b00 | Inter + mono | Split-flap headline riffles through scripts, settles, cools through amber |
| 10 | wide-rule | near-black in dark mode, one luminous band, #2f5ce0 | Inter + mono | One interference band across enormous quiet space; headline in the null |
| 11 | event-horizon | paper plus black hole | Inter + mono | Component walls dive into a WebGL lensing horizon; English in, translations out |
| 12 | hourglass | dark native, accent #86a8ff | Inter + mono | Corridor walls of UI cards sweep into a waist that holds the mark and CTAs |
| 13 | singularity | paper plus horizon | Inter + mono | Lensing horizon alone on open paper; customers and locales orbit it |
| 14 | singularity-dossier (site) | light, completed system | Inter + mono | Every-stack argument folded into the hero terminal; /enterprise as an evidence file |
| 15 | singularity-orbit (site) | light | Inter + mono | One-line hero terminal plus retired system pieces (gravity well, dials, pricing file) |
| 16 | singularity-signal (site) | light | Inter + mono | Split-pane hero: session and output side by side in one window |
| 18 | textile-block | cream + jade, clay accent #b0563a | Marcellus + Inter | Frank Lloyd Wright relief blocks per course, perforations lit by Bayer dither |
| 19 | stepped-fret | cream/black, oxide #a3361f | Aboreto + Inter | Zapotec fret registers stepping down the page as a dithered stair |
| 21 | glazed-bond | lapis #1a3a80, turquoise, gold | Cinzel + Inter | Ishtar Gate elevation; Flemish-bond bricks as the translation proof |
| 23 | brick-lattice | lapis + gold #d2a63a | Cinzel + Inter | Whole page is one dithered brick wall; a source brick lights its neighbours |
| 24 | screenfold-codex | bark cream, red oxide, teal #0f5558 | Aboreto + Inter | Maya screenfold leaves as alternating parallelograms with dithered creases |
| 25 | raking-relief | alabaster + lapis #1f4e9c | Cinzel + Inter | Everything carved under one raking light with stepped Bayer shadows |
| 26 | calendar-rings | obsidian, clay, jade #1f7a63, gold | Cinzel + Inter | One concentric disk as a readable instrument, unrolled into arc bands |
| 27 | talud-tablero | cream, red oxide, jade #2c8a6a | Federo + Inter | Page silhouette as a stepped pyramid with a stair axis into a dark plaza |
| 28 | apadana-grid | cream, black basalt, gold #d4b04a, lapis | Julius Sans One + Inter | Hypostyle floor plan: column bases on a grid, content in the bays |
| 29 | clay-tablet | fired clay #cfa87b, wet clay #2a1a10, lapis #2447a3 | Forum + Inter | Cuneiform-wedge Bayer dither; each section is a clay tablet |
| - | production (Shipped) | light | Inter + mono | The live generaltranslation.com, rebuilt page for page |

Retired round-one directions with captures in `public/shots/archive/` (full specs in `docs/research/DESIGN_BRIEF.md` Part 2): bento-foundry, blueprint-atlas, concrete-mono, field-magnet, flipboard-terminus, kinetic-verba, typographic-broadcast, white-gallery, archive-press, concrete-origin, concrete-source. The brief also specs orbital-chrome, noir-spectral, tty-babel, silver-atelier, mercury-core, schematic-rail, film-negative, maison-lingua, grid-of-record, notation-index, isometric-works and press-proof.

### Best candidates for a dark, Apple-like, restrained Pushary page

These are references for method and mood only. Under the license above, their layouts, typography and motion are not to be reproduced. Each Pushary variant has to be its own design that takes the principle, not the page.

1. **10 Wide Rule** (`public/shots/dark/wide-rule.jpg`). One luminous element in a dark field, huge quiet space, a stat row. Closest to Apple restraint. Pushary reading: one soft band or halo behind the phone, everything else calm.
2. **16 orbital-chrome** (brief only, no capture). A single lit sphere is the page's only companion and moves between section "stations". Pushary reading: the iPhone is the one lit object, re-staged per section.
3. **10 noir-spectral** (brief only). A dark room where scroll moves one light; text brightens as the beam reaches it, with a legibility floor. Pushary reading: the notification's glow is the light source.
4. **01 Toolchain, dark remap** (`public/shots/dark/toolchain.jpg`). Hairline-only structure, a terminal panel as the hero proof, one accent. Pushary reading: a real agent session in a terminal whose request lands on the phone.
5. **06 bento-foundry** (`public/shots/archive/bento-foundry.jpg`). The disciplined commercial bento: one dominant cell, satellites, pointer spotlight, one sheen pass on entry, then calm. Good for the features block.
6. **12 Hourglass** (`public/shots/dark/hourglass.jpg`), riskier. The only native-dark direction; walls of UI cards converge on a waist. Pushary reading: walls of pending agent requests converging on one lock screen. Busier than the rest.

Skip for Pushary: the 18 to 29 set (ornamental, cream, archaeological), the dither-heavy pages (03, 05), and the light-paper forks.

## 3. Anti-AI-aesthetic rules (Sigil-UI, plus the taste skill)

Sigil `MANIFESTO.md`:
- "Every AI-coded site looks the same."
- "The 'AI-generated' aesthetic isn't a style; it's the absence of one. It's what happens when nobody makes a decision." (the source uses an em dash, rewritten here)
- "agents write the UI, the tokens enforce taste."
- "If it looks like every other AI-generated site, it failed. That's the bar."

Sigil `DESIGN.md` Do's and Don'ts (line 548 on): OKLCH for every color; reference `var(--s-*)` tokens only; spacing in multiples of 4/8; concentric radii (outer = inner + padding); `text-balance`/`text-pretty` on headings; `tabular-nums` on changing numbers; no hardcoded hex; no shadows outside the token scale; animate only transform and opacity; no transition over 400 ms except page-level; no `!important`.

Sigil `style/design.md` and `skills/sigil-polish/SKILL.md`: never `ease-in` for UI; never animate from `scale(0)`; press scale exactly `0.96`, never below `0.95`; never `transition: all`; hit areas at least 40x40 px; 30 to 80 ms stagger; honor `prefers-reduced-motion`.

Banned list in `Prototemplate/public/skills/frontend-design-taste.md` lines 72 to 102 (guidance to read, not text to copy): centered hero plus blur blobs; three equal cards in a row; `h-screen` (use `100dvh`); neon glows; pure `#000000`; oversaturated accents; gradients with no material logic; glassmorphism for no reason; fake 3D from stacked shadows; pill buttons everywhere; custom cursors; heavy gradient text on large headers; Inter, Roboto or Open Sans as the primary face; more than three families; generic names and avatars; fake round numbers like `99.99%`; the words "Elevate, Seamless, Unleash, Next-Gen, Game-changer, Delve"; emojis in headings or alt text.

fieldwork's "Vision Constructor" (`src/daemon.ts`, `src/designFixtures.ts`) formalizes the same idea: lock an objective, audience, product tension, a forbidden-cliche list and acceptance criteria before building.

## 4. Reusable assets, by type

Legend: STATIC = usable in a plain HTML/CSS/JS page with no build. BUILD = needs React/Next or a Node compile. NO = license blocks it.

### Fonts

| Font | File path | License | Use |
| --- | --- | --- | --- |
| Inter variable (rsms) | `Prototemplate\public\fonts\InterVariable.woff2`, `InterVariable-Italic.woff2`; `Glyphfield\public\fonts\inter-latin.woff2`, `inter-variable.ttf` | OFL 1.1 (`Glyphfield\public\fonts\OFL.txt`) | STATIC. Pushary vendor already has `vendor\rsms__inter`; prefer upstream |
| Geist Mono | `Glyphfield\public\fonts\geist-mono-latin.woff2`, `geist-mono-variable.ttf`; `Prototemplate\graphics\fonts\GeistMono-Variable.ttf` | OFL 1.1 | STATIC. Also in `vendor\vercel__geist-font` |
| Sora, Space Grotesk, Fraunces, Instrument Sans, Cinzel, Forum, Marcellus, Federo, Aboreto, Julius Sans One, Michroma, Orbitron, Anybody | `Prototemplate\public\fonts\google\*.woff2` (latin subsets, provenance in `MANIFEST.json`) | OFL 1.1 per `public\fonts\google\README.md` | STATIC, ship OFL text. Fetch fresh from Google Fonts for full subsets |
| Switzer | `Glyphfield\public\fonts\switzer-400.ttf`, `switzer-500.ttf` | Fontshare ITF Free Font License (no license file in repo; verify) | STATIC if confirmed |
| Basement Grotesque Black | `Glyphfield\public\fonts\basement-grotesque\BasementGrotesque-Black_v1.202.woff2` | OFL upstream (no license file in repo; verify) | Too loud for this brief |
| Everything in `Sigil-UI\apps\web\public\fonts\` | see section 1 | Commercial or trial | NO |
| Everything in `Glyphfield\public\fonts\brands\` | see section 1 | Brand-restricted | NO |

### Icons

None of the four repos ships an icon set as files. They import npm packages: `lucide-react` (all four), `@phosphor-icons/react` (Glyphfield), `@heroicons/react` (Prototemplate), `@thesvg/react` (fieldwork). Pushary vendor already has raw SVGs in `vendor\lucide-icons__lucide`, `vendor\phosphor-icons__core`, `vendor\tabler__tabler-icons`: STATIC from there.

### Shaders, WebGL and canvas effects (Glyphfield, MIT)

Details in section 6. Summary: the GLSL ES 1.0 fragment strings in `src\lib\shaderPresets.ts` and `src\components\LiveMaterialCanvas.tsx` are STATIC once lifted into a small vanilla WebGL harness. `paper-*` materials need `@paper-design/shaders` (Apache-2.0; a framework-free package exists upstream but is not in this repo). `shadergradient-prismatic-sphere` needs React Three Fiber: BUILD.

### Textures and noise

- `Glyphfield\public\shader-grain.png` (86 KB grain tile, MIT): STATIC.
- `Glyphfield\public\shader-previews\*.webp` (134 stills, one per material): STATIC; usable as poster frames under reduced motion.
- Sigil `packages\components\src\patterns\GrainGradient.tsx`: noise plus a tinted radial gradient, opacity 0.03/0.06/0.12. React as written: BUILD, but trivial to re-express in CSS.
- An SVG `feTurbulence` grain overlay is a generic technique; write a fresh one.

### Device mockups

None in these four repos (section 7).

### CSS tokens

- Sigil presets: `Sigil-UI\packages\presets\src\<name>.ts`, plain TS objects holding OKLCH colors (light and dark), type scale, radius, shadow and motion. MIT. BUILD to compile (`packages\tokens\src\compile\css.ts`), or read the values by hand into CSS custom properties, which is effectively STATIC.
- Compiled example: `Sigil-UI\.sigil\tokens.snapshot.css` and `apps\web\app\_generated\sigil-tokens.css` (582 lines of `--s-*` variables for the default light preset). STATIC.
- Prototemplate's four-color system: NO.

### Components

- Sigil `packages\components\src\` (about 269 files): `ui\` (Button, Card, Tabs, Terminal, CodeBlock, Kbd, Switch, Badge, Tooltip and more), `marketing\` (Hero, FeatureGrid, Pricing, PricingTiers, LogoBar, CTA, TestimonialCard), `sections\` (HeroSection, BentoSection, StatsSection, FAQSection, FooterSection, InstallSection, CodeShowcaseSection), `animation\` (BlurFade, TextReveal, WordRotate, NumberTicker, Marquee, Stagger), `effects\ProximityGlow.tsx`, `3d\` (isometric boxes). React + Tailwind v4: BUILD. Useful to read for section structure and token use.
- Sigil `apps\demos\*` (linear-clone, vercel-clone, viteplus-clone, startup, ai-saas, cli-tool and others): Next apps, BUILD. Their `app\globals.css` files are STATIC token sheets.
- Glyphfield `src\components\*`: Studio editors, BUILD.
- fieldwork: NO.

## 5. Sigil-UI presets

46 presets in `Sigil-UI\packages\presets\src\<name>.ts` (catalog in `catalog.ts`; `default.ts`, `_template.ts`, `index.ts` are support files). The README says 46; the GitHub description said 31.

| Group | Presets |
| --- | --- |
| Structural | sigil, kova, cobalt, helix, hex |
| Minimal | crux, axiom, arc, mono |
| Dark | basalt, onyx, fang, obsid, cipher, noir |
| Colorful | flux, shard, prism, vex, dsgn, dusk |
| Editorial | etch, rune, strata, glyph, mrkr |
| Industrial | alloy, forge, anvil, rivet, brass |
| Edgeless | vast, aura, field, clay, sage, ink, sand, plum, moss, coral, dune, ocean, rose |

The catalog's font names drift from the preset files (the catalog says onyx uses GT America; `onyx.ts` uses PP Neue Machina). Trust the `.ts` files.

Fit for dark Apple-like restraint, with dark background and primary read from the files:

| Preset | Dark bg | Primary | Fonts in file | Fit |
| --- | --- | --- | --- | --- |
| crux | `oklch(0.07 0 0)` neutral | `oklch(0.53 0.22 27)` red | TT Commons (trial), PP Fraktion Mono | Best structure: neutral black, card padding 36px. Swap fonts; consider a cooler accent |
| obsid | `oklch(0.05 0.005 300)` | `oklch(0.55 0.2 350)` | PP Stellar | Near-black mirror surfaces. Swap fonts |
| onyx | `oklch(0.06 0.01 300)` | violet `oklch(0.6 0.2 300)`, gold secondary | PP Neue Machina, Pier Sans | Premium dark, but uppercase tracked headings; tone down |
| axiom | `oklch(0.08 0 0)` neutral | blue `oklch(0.55 0.2 260)` | PP Eiko serif, Neue Montreal | Clean, mathematical. Swap fonts |
| kova | `oklch(0.09 0.008 240)` cool | ice blue `oklch(0.64 0.12 230)` | PP Acma, Mori | Nordic, cold, quiet |
| aura | `oklch(0.08 0.02 280)` | violet `oklch(0.70 0.20 290)` in dark | General Sans, JetBrains Mono | Only dark-fit preset already on free fonts (General Sans is Fontshare ITF FFL, verify; JetBrains Mono OFL). Its "luminous glow" needs restraint |
| ink | `oklch(0.13 0.05 265)` indigo | `oklch(0.72 0.18 265)` | Plus Jakarta Sans, Inter, JetBrains Mono | All OFL fonts; more saturated |

Avoid for this brief: fang (pure black, acid green, Mondwest pixel display), cipher (terminal green), noir (warm amber, Hatton serif), basalt (Monument Extended, teal), and every colorful or warm edgeless preset.

## 6. Glyphfield shaders runnable as plain WebGL or canvas

All are GLSL ES 1.0 fragment shaders drawn on one full-screen quad. Vertex shader: `Glyphfield\src\components\LiveMaterialCanvas.tsx` line 252 (`attribute vec2 a_position; gl_Position = vec4(a_position, 0.0, 1.0);`).

Set A, `Glyphfield\src\lib\shaderPresets.ts` (477 lines). Uniforms: `u_resolution, u_time, u_color_a, u_color_b, u_scale, u_distortion, u_softness, u_repetition, u_contour`. Shared metal helpers in `METAL_UTILITIES` (lines 24 to 80). Presets (line of `id`): aurora (97), liquid-metal (126), polished-chrome (148), brushed-aluminum (173), black-nickel (197), satin-steel (220), mercury (262), brushed-steel (285), topographic (303), plasma (322), radial-beams (340), halftone (356), warped-grid (372), glass-waves (390), iridescent (407), heatmap (426), gem-smoke (454), grain-gradient (474).
- Best fits: **polished-chrome** ("Calm mirror chrome with crisp black cards, white strip lights, and minimal movement"), **black-nickel**, **satin-steel**, **brushed-aluminum**. Chrome reflections suit an edge-light or frame treatment.

Set B, `Glyphfield\src\components\LiveMaterialCanvas.tsx`. Shared header `FRAGMENT_SHARED` (lines 422 to 481: uniforms `u_resolution, u_pointer, u_time, u_color_a/b/c, u_strength, u_detail, u_frequency, u_grain, u_amplitude, u_density, u_brightness, u_rotation, u_scale`, plus `hash`, `noise`, `fbm`, `studioUv`, `colorRamp`, `finishColor`). It interpolates `SEAMLESS_POLAR_GLSL` from `src\lib\liveMaterialPolar.ts` (22 lines). Bodies in `SHADERS_FRAGMENT_BODIES` (line 483 on): holo-cloth-silk, glyphfield-mesh-gradient (522), glyphfield-grain-gradient (535), glyphfield-dither-gradient (547), shaders-pixel-beams (579), shaders-soft-register (591), shaders-spectral-bloom (601), shaders-pistons (641), shaders-fluid-chrome (652), shaders-chroma-flow (687), shaders-drift (696), shaders-mosaic (707), shaders-circuit (721), study-line-field (733), study-chrome-glares (749), study-relief-gradient (769), study-orbit-gradient (785), study-radiant-void (807), study-galactic-rings (823). Default uniform values: `DEFAULT_LIVE_MATERIAL_SETTINGS` in `src\lib\liveMaterials.ts` line 211, per-material overrides later in that file; speed curve `liveMaterialMotionRate` at line 230.
- Best fits with near-black colors: **study-chrome-glares** (dark field, two thin white strip reflections), **glyphfield-grain-gradient** (soft pigment field plus paper grain; a good hero backdrop at low brightness), **glyphfield-mesh-gradient** (two slow drifting light pools), **study-radiant-void** (a ring of light around a dark aperture that could frame the phone; recolor away from teal), **study-line-field** (thin flowing lines).

Set C, canvas and multi-pass:
- `pavel-fluid-energy`: WebGL fluid simulation. Shaders at `LiveMaterialCanvas.tsx` lines 252 to 420 (`FLUID_VERTEX_SOURCE`, `FLUID_VELOCITY_SOURCE`, `FLUID_DYE_SOURCE`, `FLUID_DISPLAY_SOURCE`), driver `FluidSimulationCanvas` from line 1483. Multi-pass framebuffers; portable but heavier. Carry both MIT notices.
- `glyphfield-glyph-field`: canvas 2D, `GlyphFieldCanvas` from line 881. Portable.

Needs a dependency: every `paper-*` material (gem smoke, liquid metal noir, god rays, grain gradient wave, warp and others) runs through `@paper-design/shaders-react`; the vanilla `@paper-design/shaders` package would make them STATIC after vendoring its ESM build (Apache-2.0, add attribution). `shadergradient-prismatic-sphere` needs React Three Fiber.

Porting cost: a static harness is about 40 lines (create the context, compile, draw one quad, set uniforms each frame, pause offscreen with IntersectionObserver, draw one frame under `prefers-reduced-motion`).

## 7. Phone frames and iOS notification components

None in any of the four repos. Searched for iphone, lock screen, dynamic island, phone or device frame, mockup, bezel and push notification across all source and docs.

Near misses, none usable as a phone:
- `Glyphfield\src\components\StickerDeviceScene.tsx`: sticker placement on a laptop-lid-shaped metal surface (872x504), React.
- `Prototemplate\src\components\plate\pages\device\DeviceApproval.tsx`: GT's CLI device-code accept-or-reject web page. Conceptually close to Pushary, but under the Prototemplate license and not a phone.
- Sigil `apps\web\components\landing\hero-showcase.tsx` line 624 and `apps\demos\dashboard`: a "Push notifications" settings switch label only.

Pushary's own vendor folder already has device frames: `vendor\apple-bezels`, `vendor\picturepan2__devices.css`, `vendor\pixelsign__html5-device-mockups`, plus several liquid-glass packages. Use those for the iPhone.

## 8. Bottom line for the builder agent

- Copyable into the public repo with attribution: Glyphfield GLSL and grain texture (MIT; keep the Kevin Liu notice, plus Pavel Dobryakov's for the fluid sim), Sigil token values and any component code (MIT; keep the Kevin B. Liu notice), OFL fonts (ship the OFL text).
- Reference only, nothing copied: everything in Prototemplate (directions, brief, engines, deck, CSS cookbook, captures) and all of fieldwork.
- Never copy: `Sigil-UI\apps\web\public\fonts\*`, `Glyphfield\public\fonts\brands\*`, `Glyphfield\public\brands\*`, and any GT, customer or third-party mark.
- Each copied file goes into `versions\vN\assets\` with source repo and license listed in `versions\vN\CREDITS.md`, per the Pushary playbook (`CLAUDE.md` Step 2).
