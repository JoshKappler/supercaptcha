# v1: Apple Liquid Glass

## Attempt 1 (built on c3fdaf9, versions/v1 uncommitted at review time)
| Reviewer | Model | Score | Verdict |
|---|---|---|---|
| A | opus | 7 | Disciplined and consistent, but hero device staging, thin glass and uneven vertical rhythm keep it short of client-ready. |
| B | sonnet | 7 | Clear, consistent, believable phone and strong value prop, but liquid glass barely visible, hero overlap and dead space, thin pricing and trust proof. |
| C | opus | 6 | Competent, but reads as a generic dark template with almost no Liquid Glass, plus hero composition and spacing flaws. |

Result: FAIL (min 6)

Blocking issues (number of reviewers raising it):
- 3: Liquid Glass not visible: cards, nav, FAQ and terminal read as flat dark fills. The refraction runs but has nothing behind it to bend on near-black.
- 3: the hero terminal covers the lower third of the phone; empty padding at its bottom; caption and Replay detached.
- 3: about 300px voids between sections and above the hero headline.
- 3: two stacked footers with repeated links; FAQ heading alone in a large empty left column.
- 3: mobile trust line shield icon pinned left of centered text; no mobile menu.
- 2: long-press blur smears the clock into a blob; a ghost of the action menu lingers in the Approved state.
- 1: template sameness (eyebrow, two-tone heading, three cards in every section); pricing and trust proof thin.

Changes for attempt 2: sent to the builder as the list above.

## Attempt 2 (built on 7fc644b, versions/v1 uncommitted at review time)
| Reviewer | Model | Score | Verdict |
|---|---|---|---|
| A | opus | 7 | Cohesive and well-typeset, but reads as Linear or Vercel with glass added rather than Apple Liquid Glass; a few unpolished spots. |
| B | sonnet | 8 | Cohesive, polished glass page with a clear value prop and believable demo; thin trust and pricing, dead space in the hero. |
| C | opus | 7 | Competent and consistent, but grid-and-glow backdrops read as a template, the long-press frame is half like iOS, small layout slips. |

Result: FAIL (min 7)

Blocking issues (number of reviewers raising it):
- 2: long-press only dims the clock; a small left-aligned menu floats under an unchanged notification (iOS blurs the wallpaper and expands the card).
- 2: hero terminal card jumps up about 18px when its last line is added.
- 2: Product Hunt badge is a solid white rectangle, the brightest object below the hero.
- 2: diagram columns are different widths; "Your phone" alone has a blue fill; thick white rims look like a bevel, not glass.
- 2: testimonials use three treatments in one row; mobile quote indent breaks the left edge.
- 1: grid texture plus two glows inside inset panels reads as a template and cuts hard to flat black; flow card 02 has a different fill; lower half of the hero phone empty; dead gap above the hero terminal; step 03 mono columns misaligned.

Changes for attempt 3: sent to the builder as the list above.

## Attempt 3 (committed as e0fb9fb before review)
| Reviewer | Model | Score | Verdict |
|---|---|---|---|
| A | opus | 7 | Clean, restrained and consistent, but the liquid glass is barely there and the phone animation and spacing fall short of Apple polish. |
| B | sonnet | 8 | Clean single-typeface page with a clear value prop, strong CTA, convincing phone and solid mobile; understated glass, some dead space. |
| C | opus | 7 | More disciplined than typical dark SaaS, but reads as a Linear/Vercel template rather than Liquid Glass; visible seams in the phone and hero. |

Result: FAIL (min 7)

A and C also reported that the bottom of the page renders blank. Checked: that is a glitch in the single full-page capture only. The two-screen slices, captured the same way, show the final CTA and footer rendering normally (mobile-part-08, desktop-part-06). From attempt 4 on, reviewers get the hero frames and the slices, not the full-page images.

Blocking issues (number of reviewers raising it):
- 2: liquid glass mostly missing; notification and menu read as opaque navy; cards flat.
- 3: hero terminal card carries about 100px of empty space until its last line arrives.
- 2: "Tap Approve to try it" still shows after the request is approved.
- 1: long-press removes the clock and buttons and jumps the card about 150px up; notification body set in mono; muddy wallpaper and thin bezel; mobile phone below the fold with a duplicate nav CTA; orange HN and PH badges; heavy footer.

Changes for attempt 4: sent to the builder as the list above.

## Attempt 4 (built on e0fb9fb, committed with this log; reviewers saw hero frames and slices only)
| Reviewer | Model | Score | Verdict |
|---|---|---|---|
| A | opus | 8 | Restrained, well-typed page with a convincing iPhone and correct iOS sequence; glass stops at the nav and hero, a few device and button details. |
| B | sonnet | 8 | Clean, consistent, premium dark page with a clear value prop and believable demo; sparse glass, soft trust signals, long mobile page. |
| C | opus | 7 | Fixes the three complaints but reads as a polished Linear/Vercel template, with a loose hero and a few cheap effects. |

Result: FAIL (min 7). Attempt limit reached.

## Final
Kept: attempt 4 (8/8/7), the best attempt. Attempt 3 (7/8/7) is in git at e0fb9fb.
Why it failed: the hostile critic (C) held at 7. Its reasons in the last round:
- below the hero every surface is a flat dark card, so the Liquid Glass direction does not carry past the fold (A agreed);
- a hard-edged diagonal light band crosses the phone wallpaper and reads as a rendering seam (A agreed);
- the silver gradient primary button with a teal glow looks skeuomorphic, and the navy secondary button clashes (A agreed);
- about 340px of dead space between the hero text column and the phone;
- mobile diagram chips wrap into uneven rows; footer accordions read as a wall; several low-contrast labels.
