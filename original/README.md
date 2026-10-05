# original/

Scrape of the live pushary.com frontend, made with `scripts/capture-original.mjs`
for the pages `/`, `/pricing`, `/vs` and `/docs`. The site was captured in its light theme.

- `AUDIT.md`: sections and copy, fonts, colors, backgrounds, the hero phone animation, and assets.
- `index.html`: links to the rendered pages and screenshots.
- `{home,pricing,vs,docs}.rendered.html`: the DOM after load. CSS paths are absolute, so these open unstyled from disk.
- `*.text.txt`: visible text of each page.
- `*.meta.json`: title, description, headings, links, font families, text and background colors.
- `screenshots/`: desktop (1440x900) and mobile (390x844) fold and full-page shots, at 2x.
- `video/desktop/`, `video/mobile/`: one recording each of the whole capture session. The hero animation is in the first 8 seconds.
- `site/<host>/...`: raw network responses. `manifest.json` lists them.

Known scrape quirks:

- `/_next/image?...` responses are WebP images saved with an `.html` extension.
- Responses with the same path overwrote each other, so `site/` holds fewer files than `manifest.json` lists.
- Favicons and the two demo videos were not captured.
