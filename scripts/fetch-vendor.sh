#!/usr/bin/env bash
# Pull real, open-source design packages from GitHub into vendor/ (gitignored sources,
# only the files a version actually uses get copied into versions/<vN>/assets/).
# Usage: bash scripts/fetch-vendor.sh [repo ...]   (no args = all)
set -euo pipefail
cd "$(dirname "$0")/.."
mkdir -p vendor

REPOS=(
  # Fonts
  rsms/inter                              # Inter / Inter Display (SF Pro-adjacent, OFL)
  vercel/geist-font                       # Geist Sans + Geist Mono (OFL)
  vercel/geist-pixel-font                 # Geist Pixel, dot-matrix accents (OFL)
  github/mona-sans                        # Mona Sans / Hubot Sans (OFL)
  # Icons
  lucide-icons/lucide                     # Lucide, clean 1.5px stroke icons (ISC)
  phosphor-icons/core                     # Phosphor, 6 weights incl. thin/light (MIT)
  tabler/tabler-icons                     # Tabler (MIT)
  # Device frames
  picturepan2/devices.css                 # Pure-CSS iPhone 14 Pro / 15 frames (MIT)
  pixelsign/html5-device-mockups          # PNG device mockups (MIT)
  # Liquid glass / Apple-style material
  rdev/liquid-glass-react                 # SVG displacement-map liquid glass (MIT)
  shuding/liquid-glass                    # Shu Ding's liquid glass shader demo
  lucasromerodb/liquid-glass-effect-macos # CSS/SVG macOS-style glass
  kevinbism/liquid-glass-effect           # CSS glass card
  # Component / motion libraries (reference + copy-paste source)
  shadcn-ui/ui
  magicuidesign/magicui                   # Border beams, shine, marquee, iPhone mockup
  ibelick/motion-primitives
  DavidHDev/react-bits
  nolly-studio/cult-ui
  radix-ui/themes
  heroui-inc/heroui
  once-ui-system/core
  # Brand fallback (logo.png) if the scrape lacks a usable logo
  Pushary/pushary-skill
)

[ "$#" -gt 0 ] && REPOS=("$@")
for r in "${REPOS[@]}"; do
  d="vendor/${r//\//__}"
  if [ -d "$d/.git" ]; then echo "skip $r"; continue; fi
  echo "clone $r"
  git clone -q --depth 1 --filter=blob:limit=5m "https://github.com/$r" "$d" || echo "  FAILED $r"
done
