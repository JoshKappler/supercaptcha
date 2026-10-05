# Credits

Every copied file, its source and its license. Copy and sample data come from the pushary.com scrape (`original/home.text.txt`). `assets/phone.css`, `assets/style.css` and the HTML are written for this sketch.

| File | Source | License |
|---|---|---|
| `assets/fonts/marcellus-400.woff2` | `vendor/kevin/Prototemplate/public/fonts/google/marcellus-400.woff2` (Google Fonts build of Marcellus; the only file taken from Prototemplate) | SIL Open Font License 1.1 |
| `assets/js/paper-grain-gradient.js` | Shader source strings from `vendor/paper-design__shaders/packages/shaders/src/shaders/grain-gradient.ts`, `vertex-shader.ts` and `shader-utils.ts` (paper-design/shaders), resolved to plain strings, otherwise unchanged | Apache License 2.0, Copyright Paper Design (see vendor NOTICE) |
| `assets/img/paper-noise.png` | The noise texture data URI in `vendor/paper-design__shaders/packages/shaders/src/get-shader-noise-texture.ts`, decoded to PNG | Apache License 2.0, Copyright Paper Design |
| `assets/img/logo.webp` | pushary.com scrape: `original/site/pushary.com/_next/image__P3VybD0lMkZsb2dvLndlYnAm.html` (`/logo.webp`) | Pushary brand asset, used as on the original site |
| `assets/icons/cell-signal-full-fill.svg`, `wifi-high-fill.svg`, `battery-full-fill.svg`, `flashlight-fill.svg`, `camera-fill.svg` | `vendor/phosphor-icons__core/assets/fill/` (phosphor-icons/core) | MIT, Copyright (c) 2023 Phosphor Icons |

`assets/js/grain.js` is a small WebGL2 mount written for this sketch; it feeds the Paper Shaders uniforms the way `shader-mount.ts` does.

Not copied: the phone frame is Apple's iPhone 18 Pro Max Burgundy bezel PNG, shown straight from `vendor/apple-bezels/` (Apple design resources, never committed). It is a stand-in until `shared/iphone/` lands.
