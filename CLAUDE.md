# Pushary frontend redesign: agent playbook

You are picking up a redesign task. Read this file fully, then `docs/DESIGN_BRIEF.md` and
`docs/REVIEW_PROTOCOL.md`. Work on branch `claude/pushary-frontend-redesign-19wt4u`.

## The goal

The owner was asked to redesign the marketing frontend of **https://pushary.com** but has
no access to its source repo. So:

1. Scrape the live frontend (HTML, CSS, JS, fonts, images, everything exposed) into `original/`.
2. Build **six completely different redesigns** in `versions/v1` ... `versions/v6`, each following
   a different, popular startup design language (see the brief).
3. Gate every version through an **adversarial vision review** by three independent agents.
   A version passes only when **all three** score it **above 7/10** (integer scores, so 8+).
   Max **4 attempts** per version; after that, keep the best attempt and document why it failed.

## Status at handoff

- Done: repo cleared (the old SuperCAPTCHA `index.html` was removed), scripts written and
  tested locally, design packages identified and verified reachable on GitHub, brief and
  review protocol written, public facts about Pushary collected in `docs/PUBLIC_CONTENT.md`.
- **Not done: the scrape.** The previous cloud session's network policy blocked
  `pushary.com` (proxy returned 403 on CONNECT, WebFetch also blocked). GitHub, npm and
  Google Fonts were reachable. Nothing in `original/` yet.

## Step 0: check access

```bash
npm install                      # playwright 1.56.1 (matches the preinstalled Chromium)
curl -sS -o /dev/null -w '%{http_code}\n' https://pushary.com
```

- `200` or a redirect: go to Step 1.
- `403` / `000`: the environment blocks it. Ask the user to either (a) allow `pushary.com`
  and `www.pushary.com` in the environment's network settings, or (b) save the page from
  their own browser ("Save Page As > Webpage, Complete", plus full-page screenshots and a
  screen recording of the phone animation) and drop it into `original/manual/`. Do not
  fabricate a copy of the site. If the user explicitly says to proceed anyway, build from
  `docs/PUBLIC_CONTENT.md` and label every page "reconstructed, not scraped".

## Step 1: scrape the original

```bash
PAGES="/,/pricing,/vs,/docs" node scripts/capture-original.mjs https://pushary.com original
```

This saves every network response under `original/site/<host>/...`, the rendered DOM
(`*.rendered.html`), a text dump, `*.meta.json` (headings, links, every font family and color
in use), desktop + mobile screenshots and a video of the hero animation. Also try
`wget --mirror --page-requisites --convert-links --adjust-extension -P original/wget https://pushary.com`
for a browsable static copy. Discover extra routes from the nav/footer links in `home.meta.json`.

Then write `original/AUDIT.md`: inventory of sections (in order), all copy, fonts used,
color values, separators/backgrounds, and a frame-by-frame description of the phone
animation. Confirm the owner's complaints with evidence (font count, clashing section
backgrounds, unrealistic phone). Make `original/index.html` open the rendered copy.
Commit.

## Step 2: vendor real design packages

```bash
bash scripts/fetch-vendor.sh            # clones into vendor/ (gitignored)
```

Rule from the owner: **do not invent assets.** Fonts, icons, device frames and glass
effects must come from these packages (list and licenses in the brief). Copy only the files
a version uses into `versions/vN/assets/` and list them with source repo + license in
`versions/vN/CREDITS.md`. The Pushary logo and product copy come from the scrape
(fallback logo: `vendor/Pushary__pushary-skill/logo.png`).

## Step 3: build each version

- Plain static HTML/CSS/vanilla JS per version, no build step, all assets local (no CDNs),
  so each folder opens on its own. `versions/vN/index.html` is the entry.
- Keep the original's content and section order unless the brief says otherwise. Same product,
  same claims, same pricing. Improve hierarchy, not facts.
- Dark theme, classy, restrained. One type family (plus a mono if needed). One background
  system with consistent separators. A realistic iOS lock-screen notification flow for the
  phone (spec in the brief). Respect `prefers-reduced-motion`.
- Copy rules: no em dashes anywhere in site copy. Concise, human, not salesy.
- Must work at 390px with no horizontal scroll.

## Step 4: adversarial review loop (per version)

```bash
node scripts/screenshot.mjs versions/v1 1   # -> reviews/v1/attempt-1/*.png (+ *-errors.txt)
```

Then follow `docs/REVIEW_PROTOCOL.md` exactly: three parallel, isolated reviewer agents that
**look at the PNGs with vision** (Read tool on the image files), never at the source. Record
results in `reviews/vN/log.md`. If any score is 7 or below, fix the issues they raised and
re-run with the next attempt number. Stop at 4 attempts.

Versions are independent: build/review them in parallel with subagents if useful (one
builder per version, worktree isolation avoids collisions), but reviewers must never be the
same agent that built the version.

## Step 5: wrap up

- Update `index.html` at repo root (gallery) with a card per version: name, style,
  final scores, pass/fail, link.
- Fill the results table in `versions/README.md`, including why any version failed after 4 attempts.
- Commit per version (`v3: Vercel/Geist direction, attempt 2, scores 8/8/9`) and push:
  `git push -u origin claude/pushary-frontend-redesign-19wt4u`. No PR unless asked.

## Repo map

```
CLAUDE.md               this playbook (AGENTS.md points here)
docs/DESIGN_BRIEF.md    owner's feedback, the six directions, packages, phone spec
docs/REVIEW_PROTOCOL.md reviewer prompts, scoring, pass rule, log format
docs/PUBLIC_CONTENT.md  facts about Pushary gathered from public search (fallback only)
scripts/                capture-original.mjs, screenshot.mjs, serve.mjs, fetch-vendor.sh
original/               scraped site (empty at handoff)
versions/v1..v6/        redesigns
reviews/vN/attempt-N/   screenshots + log.md per version
vendor/                 cloned design packages (gitignored)
index.html              gallery
```

## Owner preferences

Concise, non-robotic writing. Never use em dashes, especially in anything external.
