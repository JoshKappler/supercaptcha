#!/usr/bin/env bash
# Copy Apple's iPhone bezel PNGs into shared/iphone/private/ (gitignored, never commit).
# Source: developer.apple.com/design/resources, unpacked into vendor/apple-bezels/.
set -euo pipefail
cd "$(dirname "$0")/.."
src=vendor/apple-bezels
dst=shared/iphone/private
mkdir -p "$dst"
cp "$src/Bezel-iPhone-17/PNG/iPhone 17 Pro Max/iPhone 17 Pro Max - Cosmic Orange - Portrait.png" "$dst/iphone-17-pro-max-cosmic-orange.png"
cp "$src/Bezel-iPhone-18/PNG/iPhone 18 Pro Max/iPhone 18 Pro Max - Burgundy - Portrait.png" "$dst/iphone-18-pro-max-burgundy.png"
echo "Copied bezels into $dst"
