# Adversarial vision review

Every version attempt is judged by **three independent reviewer agents** looking at
screenshots with vision. Reviewers never see source code, the builder's notes or each
other's scores. This keeps the judgment about what the page actually looks like.

## Procedure per attempt

1. `node scripts/screenshot.mjs versions/vN <attempt>` produces in `reviews/vN/attempt-<attempt>/`:
   `desktop-hero-{500,2500,5000}ms.png`, `desktop-full.png`, the same for `mobile-*`,
   and `*-errors.txt` if there were JS errors, failed requests or horizontal overflow.
   Fix any errors file before reviewing; reviewers should not burn a round on broken assets.
2. Launch three reviewers **in parallel, in one message**, each a fresh `general-purpose`
   Agent (separate contexts). Give each the prompt below with its persona filled in.
   Optionally run them on different models (`model` param) to diversify taste.
3. Each returns the JSON block. Append all three to `reviews/vN/log.md`.
4. **Pass rule:** all three `score` values must be **8 or higher** ("above 7"). Integers only.
5. If not passed and attempt < 4: fix the issues raised (prioritize ones two or more reviewers
   agree on), re-screenshot with attempt+1, and review with **fresh** reviewer agents.
   Do not tell reviewers it is a retry or what changed.
6. After attempt 4 without a pass: keep the highest-scoring attempt (by minimum score), and
   write the reasons it failed in `reviews/vN/log.md` and `versions/README.md`.

## Personas

- **A. Apple design director.** Judges against Apple HIG and apple.com product pages:
  typography, spacing rhythm, material/glass quality, restraint, realism of the device.
- **B. Startup growth designer.** Has shipped landing pages for YC companies. Judges
  clarity of the value prop in 5 seconds, hierarchy, CTA prominence, trust signals, pricing
  legibility, mobile experience.
- **C. Hostile critic.** Paid to find what is wrong: inconsistent fonts, clashing section
  backgrounds, misaligned grids, low contrast, cheap-looking effects, fake-looking phone,
  "AI template" vibes, mobile breakage. Starts at 5 and must justify every point above it.

## Reviewer prompt (copy, fill the brackets)

```
You are reviewer [A/B/C]: [persona text from REVIEW_PROTOCOL.md].

You are reviewing a dark-theme marketing landing page redesign for Pushary, an app that
sends AI agent approval requests (Approve / Deny) to your phone's lock screen.

The design goal: very clean, Apple-like, tasteful liquid glass and reflections, dark,
classy, not overkill. Intended style direction: "[direction name from the brief]".
Known problems the redesign must have fixed: inconsistent fonts, clashing colored section
separators, an unrealistic phone animation.

Look at every one of these images with the Read tool (they are screenshots; the hero
images are 3 frames of the phone animation at 0.5s, 2.5s and 5s):
[absolute paths of all PNGs in reviews/vN/attempt-N/]

Do not open any other files. Judge only what you see.

Score 1-10 (integer) where 7 = "decent, would ship with notes", 8 = "genuinely good,
would show a client", 9 = "top-tier startup site", 10 = "apple.com level". Be strict.

Reply with only this JSON:
{"reviewer":"[A/B/C]","score":N,"verdict":"one sentence",
 "strengths":["..."],
 "blocking_issues":["specific, visual, located (e.g. 'mobile-full: pricing cards overflow right edge')"],
 "nice_to_have":["..."]}
```

## Log format (`reviews/vN/log.md`)

```
# vN: <direction>

## Attempt 1 (commit abc1234)
| Reviewer | Score | Verdict |
|---|---|---|
| A | 7 | ... |
| B | 8 | ... |
| C | 6 | ... |
Result: FAIL (min 6)
Blocking issues: ...
Changes for attempt 2: ...
```
