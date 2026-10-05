# iPhone bezels for the Pushary marketing page

Measured 2026-10-05. Model: claude-opus-5-5.

## 1. Which phones and colors exist (primary sources)

- iPhone 18 Pro and 18 Pro Max were announced 2026-09-09 and shipped 2026-09-18. Apple newsroom: "black, silver, glacier, and an all-new burgundy". There is no purple. Source: https://www.apple.com/newsroom/2026/09/apple-debuts-iphone-18-pro-and-iphone-18-pro-max/
- iPhone 17 Pro and 17 Pro Max: deep blue, cosmic orange, silver. Source: Apple newsroom 2025-09 "Apple unveils iPhone 17 Pro and iPhone 17 Pro Max". Apple's own bezel pack uses the same three names.
- The only purple in either bezel pack is the base iPhone 17 in Lavender. It is not a Pro Max.
- iOS 27 shipped 2026-09-14. Apple's design resources page now offers the iOS 27 UI kit, not iOS 26.

## 2. Official bezels: downloaded and measured

Source page: https://developer.apple.com/design/resources/ (no login needed). Downloads:

- https://devimages-cdn.apple.com/design/resources/download/Bezel-iPhone-18.dmg (144 MB)
- https://devimages-cdn.apple.com/design/resources/download/Bezel-iPhone-17.dmg (265 MB)

7-Zip was not installed. I unpacked the 7-Zip 26.03 MSI into the scratchpad with `msiexec /a` (no system install) and used that `7z.exe` to extract the PNGs and license. PSDs were left inside the DMGs. `vendor/` is gitignored (`.gitignore` line 2 `vendor/*`); `git status` shows nothing new.

Folder: `C:\Users\joshu\OneDrive\Desktop\projects\supercaptcha-pushary\vendor\apple-bezels\`

iPhone 17 Pro Max, Cosmic Orange:
- `Bezel-iPhone-17\PNG\iPhone 17 Pro Max\iPhone 17 Pro Max - Cosmic Orange - Portrait.png` (1470 x 3000, RGBA)
- `Bezel-iPhone-17\PNG\iPhone 17 Pro Max\iPhone 17 Pro Max - Cosmic Orange - Landscape.png` (3000 x 1470, RGBA)

iPhone 18 Pro Max (no purple; four colors, each Portrait 1470 x 3000 and Landscape 3000 x 1470, RGBA):
- `Bezel-iPhone-18\PNG\iPhone 18 Pro Max\iPhone 18 Pro Max - Burgundy - Portrait.png`
- `... - Black - Portrait.png`, `... - Glacier - Portrait.png`, `... - Silver - Portrait.png`, plus the Landscape files

License file (identical in both packs): `Bezel-iPhone-18\Apple Design Resources License.rtf`

### Screen cutout (measured from alpha with Python + PIL, script at `scratchpad\measure.py`)

Every PNG has a fully transparent screen. No pixel inside the screen has alpha above 0, so there is no glass glare or reflection baked in. The Dynamic Island is an opaque shape inside the cutout.

| Portrait PNG | Screen x, y | Screen w x h | Dynamic Island x, y, w, h |
|---|---|---|---|
| 17 Pro Max Cosmic Orange | 75, 66 | 1320 x 2868 | 549, 110, 373, 107 |
| 18 Pro Max (all colors) | 75, 66 | 1320 x 2868 | 595, 110, 281, 107 |

- Landscape: screen at x 66, y 75 (17 Pro Max) or y 76 (18 Pro Max), 2868 x 1320.
- 1320 x 2868 is the native 3x panel, so 1 point = 3 PNG pixels (440 x 956 pt).
- Corner: a continuous curve, not a true circle. The curve runs about 252 to 260 px along each edge. A 45-degree probe gives an equivalent radius of about 191 px; a least-squares circle fit gives 200 px (about 64 to 67 pt). Put screen content behind the PNG with a radius near 190 px at native scale; the frame hides the rest.
- The phone body spans x 21 to 1448, y 20 to 2978 (1428 x 2959), with transparent padding around it.
- The 18 Pro Max island is narrower than the 17 Pro Max island (281 vs 373 px).
- Three stray pixels with alpha 1 sit on row 66 of the 17 Pro Max PNG. They are invisible.

## 3. License and usage terms

Bundled license (LYL142, 06/21/2023), quoted:

- 2A: "you are granted a limited, non-transferable, non-exclusive license to use the Apple Design Resources solely for creating mock-ups of user interfaces designed for use in software products that run only on Apple's macOS, iOS, watchOS, tvOS, and/or visionOS operating system software ... The foregoing right includes the right to show the Apple Design Resources in screen shots, images or other depictions of such Mock-Ups."
- 2B: "You may not rent, lease, lend, trade, transfer, sell, sublicense or otherwise redistribute the Apple Design Resources in any unauthorized way, or enable others to do so."
- 2C: "The Template Content may not otherwise be used, extracted, copied, modified, distributed, or repackaged as content, clip art, stock animation, or similar assets, or in any other manner."
- 3: "All components of the Apple Design Resources are provided as part of a bundle and may not be separated from the bundle and distributed on a standalone basis."

The design resources page adds: "When using product bezels in your marketing materials, be sure to review these Marketing Resources and Identity Guidelines." Those guidelines (https://developer.apple.com/app-store/marketing/guidelines/), quoted:

- "Use Apple-provided product bezels in all your marketing materials to display your app on the Apple devices it supports. Always use the latest-generation devices for which your app is currently developed."
- "Use Apple product images 'as is' and without modification. Modifications include adding reflections, shadows, highlights, or graphic elements that appear to enter or come out of the product screen; cropping, tilting, or obstructing any part of the images; animating, flipping, or spinning the images..."
- "Feature Apple product images on their own in your communications, and don't include images of competing products. References to multiple platforms and competing products can be made only in copy or with badges."
- "Display your app on the screen as it appears when your app is running." "Be sure to create screens using the latest operating system version." "display fictional account information instead of data from a real person."
- Minimum size: "200 px onscreen" device height.

Plain answer:

- May the public GitHub repo (`JoshKappler/supercaptcha`, visibility PUBLIC, read today) commit the bezel PNG? No. Committing the raw PNG distributes a component on its own, which section 3 and 2B/2C forbid. Keep it in the gitignored `vendor/`.
- A finished screenshot or image of a mock-up (bezel plus app screen) fits 2A and the marketing guidelines. That is the intended use.
- Gaps to flag, not settled law: the bundled license says "software products that run only on Apple" systems, and Pushary also runs on Android, Windows and in browsers (`original/AUDIT.md` line 61). The marketing guidelines cover App Store apps, and Pushary has one (`original/AUDIT.md` line 463). How Apple reads that overlap is not stated anywhere I found.
- Conflicts with Josh's ask: added reflections are banned by the guidelines. The 17 Pro Max is no longer the latest generation since 2026-09-18, so the guidelines point to the 18 Pro Max.

## 4. Notification specs (iOS 27 UI kit)

The Figma kit needs a login. The Sketch kit is public: Sketch's public API returned a download for the share "Apple iOS 27 UI Kit" (updated 2026-09-27, 160 MB). It sits in the scratchpad only (`scratchpad\uikit\iOS27.sketch`, unzipped to `uikit\x\`), not in the repo. The numbers below are read from its JSON (dumper `scratchpad\uikit\dump.py`), in points. iPhone canvas in the kit: 402 x 874 (17 Pro size).

Lock screen notification (collapsed), symbol "System/Notifications/Over Dark/Banners/1 Single":
- Card: 370 pt wide in the stack (16 pt side margins), 62.33 pt tall for one body line. Padding 12 top and bottom, 14 left and right, 10 pt gap between icon and text.
- Corner radius 22 pt, continuous corner (smoothing 0.6).
- Material, dark: fill rgba(248,248,248,0.12) in luminosity blend, plus stacked inner-edge shadows that fake the glass rim. Outer drop shadow rgba(0,0,0,0.02), y 8, blur 15.
- App icon 38.33 x 38.33 at 14, 12.
- Title: SF Pro Semibold 15, line height 17, white. Body: SF Pro Regular 15, line height 18, white. Time ("9:41 AM"): SF Pro Regular 15, rgba(153,153,153,1). All text in plus-lighter blend.
- Stack: 8 pt gap between cards. Two- and three-line variants are 70.33 and 80 pt. A stacked card behind shows as a 260 x 57 sliver, radius 24.
- Scene: wallpaper with a black overlay at 25%; date SF Pro Semibold 22.

Long-press view with actions (where Approve and Deny would appear), "System/Notifications/Dark/iPhone/Expanded":
- Expanded card 370 wide, radius 26, continuous, fill #111111. Header 66 tall: icon 38 at 14, 14; Title Semibold 15/17; time Regular 13/17 rgba(235,235,245,0.6); body Regular 15/18.
- Action menu: separate glass panel 250 wide, radius 32, padding 20 top and bottom, 26 left and right, 20 pt between rows. Each row: SF Symbol plus label, SF Pro Regular 17, line height 22, rgba(255,255,255,0.95). Fill rgba(26,26,26,0.3) with glass rim shadows; drop shadow rgba(0,0,0,0.45), y 18, blur 48.
- Background dims with black at 60%.

HIG (https://developer.apple.com/design/human-interface-guidelines/notifications): short title-case action labels; "Prefer nondestructive actions"; "The system gives a distinct appearance to the actions you identify as destructive" (Deny would be red if marked destructive); an interface icon shows on the trailing side of each action title; the system draws the app icon, so don't repeat it in content.

## 5. Alternatives

Not needed. The official bezels downloaded without login.
