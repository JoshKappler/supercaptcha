# Round 2: explore wide, then build the best four

Round 1 built six fixed directions and reviewed each one. Round 2 follows the method in Kevin
Liu's design lab (github.com/Kevin-Liu-01/Prototemplate): sketch many cheap directions, keep
the strongest, then build those properly. Research behind each choice is in `docs/research/`.

## Steps

1. **Phone.** One shared iPhone component in `shared/iphone/`, reviewed on its own before
   any page uses it. Every round 2 page copies it.
2. **Sketches.** Twelve throwaway hero sketches in `explorations/e01` to `e12`: the first
   screen plus one more section, desktop and mobile. One art direction and one signature
   move each.
3. **Pick.** Three reviewers rank all twelve from screenshots. The top four by summed rank
   go on.
4. **Build.** Full pages in `versions/v7` to `v10`, gated by `docs/REVIEW_PROTOCOL.md`.

## Sources and what may be used

- Prototemplate is "All rights reserved" by General Translation, and its license forbids
  copying or adapting its designs. It is read for method only. Nothing is copied from it
  except its OFL fonts.
- Glyphfield (MIT): its GLSL material shaders and `public/shader-grain.png` may be copied
  with the Kevin Liu notice. Its `public/fonts/brands` and `public/brands` may not.
- Sigil-UI (MIT): preset token values (color, radius, spacing, motion) may be copied with
  the notice. Its bundled fonts may not.
- Apple's iPhone bezel PNGs (`vendor/apple-bezels/`) may be shown in a mockup but never
  committed: the license forbids distributing them on their own, and this repo is public.
- Everything else as in `docs/DESIGN_BRIEF.md`: no invented logos, no AI imagery, no SF Pro
  files, credits in each folder.

## The phone

- Default: iPhone 17 Pro Max in Cosmic Orange. Option: iPhone 18 Pro Max in Burgundy (Apple
  sells no purple 18 Pro Max).
- Frame: Apple's official PNG when `shared/iphone/private/` holds a copy (gitignored, filled
  by `scripts/copy-bezel.sh`), otherwise a CSS frame built on LiquidFrame (MIT) to Apple's
  measured geometry. Both must look right.
- Screen: iOS 27 lock screen built to the UI kit numbers in `docs/research/iphone-frames.md`,
  over a detailed wallpaper so the glass visibly bends what is behind it.
- Text inside the phone uses `system-ui, -apple-system`, then Inter.
- Reflections: a subtle glass sheen on the screen and light along the frame edge. Apple's
  App Store marketing rules ban added reflections on its bezel images, so the sheen can be
  switched off with one attribute.
- The flow follows the phone spec in `docs/DESIGN_BRIEF.md`. The resting state with no JS
  and under reduced motion is the expanded notification with Approve and Deny.

## Sketch seeds

| # | Seed | Signature move |
|---|---|---|
| e01 | Single light | One soft light source in black; the phone is the only lit object |
| e02 | Anodized | A Glyphfield satin metal band picks up the phone's Cosmic Orange |
| e03 | Moving light | The light on the page shifts as you scroll, from cool to warm |
| e04 | Toolchain | Hairline rules, a real terminal next to the phone, mono labels used sparingly |
| e05 | Asymmetric grid | One restrained grid of features, cells of different weight, no identical cards |
| e06 | Wide type | Mona Sans at a wide width setting, very large headline, phone cropped by the fold |
| e07 | Grain gradient | A Paper Shaders grain gradient in burgundy, with the Burgundy 18 Pro Max |
| e08 | Mirror black | Sigil "obsid" tokens: near-black mirror surfaces, dense product detail |
| e09 | Island | A page-level pill that moves like the Dynamic Island is the one motion moment |
| e10 | Lock screen first | The lock screen wallpaper fills the page; the phone grows out of it |
| e11 | Black nickel | Glyphfield black-nickel material on one large element only |
| e12 | Swiss | Strict grid, big numerals, monochrome with the phone's orange as the only color |

## Checks before any reviewer sees a page

- `node scripts/screenshot.mjs <dir> <attempt>` writes no `*-errors.txt`.
- `npx impeccable detect <dir>/index.html` reports no failures. Advisory notes are read and
  either fixed or left on purpose.
- The WebKit hero capture (`webkit-hero-2500ms.png`) matches the Chromium one.
