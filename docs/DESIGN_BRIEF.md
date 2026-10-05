# Design brief

## Owner's feedback on the current pushary.com

- "Overall I think it sucks pretty badly."
- Different fonts flying around. Fix: one family per version (plus one mono at most).
- Background separators in different colors clashing with each other. Fix: one background
  system per version; sections separated by spacing or a single hairline style, never by
  competing colored bands.
- The phone animation is super unrealistic. Fix: see the phone spec below.
- Target feel: very clean, very Apple, liquid glass, reflections, dark theme, but not overkill.
  Classy.

Every version must answer all four points. The reviewers are told about them.

## The six directions

Each version is a distinct design language, not a palette swap. Study the reference sites
(screenshots via Playwright are fine when reachable) and the listed packages before building.

| # | Direction | References | Type | Icons | Signature moves |
|---|-----------|------------|------|-------|-----------------|
| v1 | **Apple Liquid Glass** | apple.com iPhone pages, iOS 26 / macOS Tahoe Liquid Glass | Inter Display + Inter (SF Pro stand-in) | Lucide (1.5 stroke) | Refractive glass nav, cards and CTA using the SVG displacement approach from `rdev/liquid-glass-react` / `shuding/liquid-glass` (ported to vanilla), specular edge highlight, deep black with soft spotlight, product-page scroll storytelling |
| v2 | **Linear** | linear.app | Inter (tight tracking, 500/600 weights) | Lucide | Near-black #08090a, gradient-masked headings, hairline 1px borders at 6-8% white, subtle grid/noise, magicui `border-beam` on one hero card only |
| v3 | **Vercel / Geist** | vercel.com, geist design system | Geist Sans + Geist Mono | Lucide or Geist-style line icons | Pure black, white, one gray ramp; code snippets (MCP config, SDK calls) as heroes; dotted grid; precise 1px borders; zero gradients except one |
| v4 | **Raycast** | raycast.com | Inter | Phosphor (regular/fill) | Dark glossy panels, one warm accent glow, keyboard-shortcut chips, command-palette style approval UI next to the phone |
| v5 | **Apple product page, editorial** | apple.com/airpods-pro, apple.com/iphone | Mona Sans (variable width) or Inter Display | Phosphor light | Huge type, sticky phone that changes state as you scroll through "Agent asks / You decide / Agent continues", minimal chrome, cinematic spacing |
| v6 | **Nothing / Teenage Engineering monochrome** | nothing.tech, teenage.engineering | Geist Sans + Geist Pixel (sparingly, for numerals/labels) | Tabler | Monochrome with one signal red, dot-matrix details, industrial labels, strict grid. Still classy: restraint over gimmick |

Shared rules: dark theme, WCAG AA text contrast, 8px spacing scale, max content width
around 1120-1200px, one accent color, real CTAs (App Store / Google Play / Start trial)
pointing to the URLs from the scrape.

## Packages (real, open source, verified reachable on GitHub)

Fetch with `bash scripts/fetch-vendor.sh`. Check each LICENSE before copying files.

- Fonts: `rsms/inter` (OFL), `vercel/geist-font` (OFL, Geist Sans/Mono), `vercel/geist-pixel-font`,
  `github/mona-sans` (OFL)
- Icons: `lucide-icons/lucide` (ISC), `phosphor-icons/core` (MIT), `tabler/tabler-icons` (MIT)
- Device frames: `picturepan2/devices.css` (MIT, pure-CSS iPhone 14 Pro/15 Pro frames),
  `pixelsign/html5-device-mockups`
- Glass: `rdev/liquid-glass-react` (SVG feDisplacementMap), `shuding/liquid-glass`,
  `lucasromerodb/liquid-glass-effect-macos`, `kevinbism/liquid-glass-effect`
- Components / motion (copy-paste source, port to vanilla): `magicuidesign/magicui`
  (border-beam, shine-border, iphone mockup, marquee), `ibelick/motion-primitives`,
  `DavidHDev/react-bits`, `nolly-studio/cult-ui`, `shadcn-ui/ui`, `radix-ui/themes`
  (color scales), `heroui-inc/heroui`, `once-ui-system/core`
- Brand: Pushary logo from the scrape; fallback `Pushary/pushary-skill/logo.png`

Not allowed: hand-drawn SVG icons, invented logos, AI-generated imagery, Apple's SF Pro or
SF Symbols files (licensing).

## Phone animation spec (all versions)

The current one looks fake. Make it read as a real iPhone:

- Frame from `devices.css` (iPhone 15 Pro / 14 Pro) at correct proportions (19.5:9),
  Dynamic Island, real corner radius, subtle bezel reflection.
- Lock screen: date line small, time large and thin (iOS lock clock style), a calm dark
  wallpaper made from CSS gradients (no invented imagery), flashlight/camera glass buttons.
- Notification: iOS layout (app icon 38px rounded square, "Pushary" + "now", bold title,
  2-line body, glass material with blur), slides in from top with a spring
  (overshoot about 2-4%, about 450ms), stacks correctly if more arrive.
- Interaction loop: notification arrives, long-press highlight, expands to actions
  "Approve" / "Deny" (iOS action list style), Approve tapped, notification collapses with a
  "Approved" confirmation, then the agent's next message lands. Loop every 8-10s with
  pauses long enough to read.
- Real-looking content, e.g. "Claude Code wants to run `git push origin main`" with repo
  name and agent avatar from the scraped copy.
- `prefers-reduced-motion`: show the expanded state statically.
