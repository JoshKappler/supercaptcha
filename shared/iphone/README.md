# Shared iPhone

iPhone 17 Pro Max (Cosmic Orange) or 18 Pro Max (Burgundy) on an iOS 27 lock screen, playing a Pushary approval loop. `index.html` is the demo.

## Markup

```html
<link rel="stylesheet" href="iphone.css">
<div class="iphone" data-model="17-pro-max" data-color="cosmic-orange" data-sheen="on" style="--iphone-w: 360px"></div>
<script src="iphone.js"></script>
```

- `data-model`: `17-pro-max` or `18-pro-max`. `data-color`: `cosmic-orange` or `burgundy`. `data-sheen="off"` removes the added screen sheen and frame edge light.
- Width: `--iphone-w` (tested 240px to 440px). Everything inside scales with it.
- Frame: Apple's PNG from `private/` when it loads (run `scripts/copy-bezel.sh`, never commit it), otherwise the CSS frame.
- No JS or reduced motion: the screen rests on the expanded notification with Approve and Deny. For a no-JS page, paste the markup from `index.html` (or `PusharyPhone.template(options)`) inside the div.
- `data-manual` on the div skips auto-mounting.

## JS API

- `const phone = PusharyPhone.mount(el, options)`; options: `model`, `color`, `sheen`, `autoplay`, `date`, `clock`, `agent`, `repo`, `command`, `detail`, `request`, `approved`, `next`.
- `phone.play()` loops the 10 s flow, `phone.pause()` stops it, `phone.setState(s)` stops it and shows `locked`, `arrived`, `expanded`, `approved` or `next` (use this to drive the phone from scroll).

## Copying into a version

Copy the whole folder (keep `assets/`; copy `private/` locally only), link `iphone.css` and `iphone.js` from their new path, and add the folder's CREDITS.md entries to the version's CREDITS.md.
