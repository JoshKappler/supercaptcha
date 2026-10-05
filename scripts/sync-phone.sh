#!/usr/bin/env bash
# Copy the shared iPhone into a version so the folder opens on its own.
# Usage: bash scripts/sync-phone.sh versions/v7 [versions/v8 ...]
set -euo pipefail
cd "$(dirname "$0")/.."
for v in "$@"; do
  dest="$v/assets/iphone"
  rm -rf "$dest" && mkdir -p "$dest"
  cp -r shared/iphone/iphone.css shared/iphone/iphone.js shared/iphone/assets shared/iphone/CREDITS.md "$dest/"
  [ -d shared/iphone/private ] && cp -r shared/iphone/private "$dest/"
  echo "synced $dest"
done
