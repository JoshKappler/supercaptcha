# v2: Linear

## Attempt 1 (built on c3fdaf9, versions/v2 uncommitted at review time)
| Reviewer | Model | Score | Verdict |
|---|---|---|---|
| A | opus | 7 | Disciplined, consistent Linear-style page; material quality, the two light video posters and several hero animation states fall short of Apple-grade polish. |
| B | sonnet | 7 | Clean and consistent with a clear headline and CTA, but the clipped hero terminal, buried pricing, murky video posters and a bloated footer keep it at ship-with-notes. |
| C | opus | 7 | Fixes fonts, separators and phone, but washed-out video posters, ghosted mid-animation frames and a terminal sliced by the phone keep it below client-ready. |

Result: FAIL (min 7)

Blocking issues (number of reviewers raising it):
- 3: the "See the whole flow" and founder video posters are light gray images on a dark page; the flow caption is unreadable.
- 3: the phone covers the right edge of the hero terminal ("Hermes" and "MCP tool" cut off).
- 3: "#2 Product of the Day on Product Hunt" is an orphan gray line.
- 2: mid-animation frames show two states at once (Approve/Deny menu ghosting under the next card); a separate "Approved" card stacked under "Codex finished" is not iOS behavior and is misaligned.
- 2: no glass: notifications are flat opaque cards, the phone glass has no reflection.
- 2: footer SEO link lists are heavy; mobile nav has no menu; final CTA shield icon misaligned on mobile.
- 1: price appears only in small gray text.

Changes for attempt 2: sent to the builder as the list above, plus restoring the testimonial stars dropped from the original.

## Attempt 2 (built on 7fc644b, versions/v2 uncommitted at review time)
| Reviewer | Model | Score | Verdict |
|---|---|---|---|
| A | opus | 7 | Consistent and believable lock-screen flow, but the phone looks like a flat render, glass is barely there, and the bottom third drops below the hero's polish. |
| B | sonnet | 8 | Cohesive Linear-style page with a clear value prop, prominent CTA and believable phone; held back by a loose hero, tall mobile hero and text-only trust. |
| C | opus | 7 | Clean and disciplined but reads as a competent template: oversized gaps, off-system elements, and a hero that does not show the product on mobile. |

Result: FAIL (min 7)

Blocking issues (number of reviewers raising it):
- 3: founder video still is a bright light frame on the dark page.
- 3: hero terminal card floats, aligned to nothing; the hero reads as three loose objects.
- 2: a mobile capture caught the menu crossfading in at low opacity over a sharp clock.
- 2: mobile phone starts at about half height and is cut at the fold; terminal pushed below.
- 2: footer is two stacked footers with about 40 SEO links.
- 2: "See the whole flow" step 02 card has a saturated gradient and a filled Approve button that does not match the hero's iOS menu.
- 1: phone frame flat, no specular edge or reflection; five white stars read as template; uneven section spacing; "Your agent control panel" heading undersized.

Changes for attempt 3: sent to the builder as the list above.

## Attempt 3 (built on 7fc644b, versions/v2 uncommitted at review time)
| Reviewer | Model | Score | Verdict |
|---|---|---|---|
| A | opus | 7 | Restrained and consistent, held back by a cramped hero, a cropped mobile phone and a few unfinished-looking moments. |
| B | sonnet | 8 | Clean page with a five-second value prop and believable phone; dead hero space, clipped code window, placeholder-looking video block. |
| C | opus | 7 | Fixes fonts and separators, but the hero composition and mobile phone crop look unfinished and it leans on template patterns instead of glass. |

Result: FAIL (min 7)

Blocking issues (number of reviewers raising it):
- 3: hero terminal slides under the phone and reads as clipped ("Hermes", "MCP tool" against the rim).
- 3: mobile phone faded off at the bottom with no bezel or home indicator; reads as a cropped render.
- 3: about 230 to 350px dead band after the badges row and before other sections.
- 3: founder video card is an empty dark box with a play button.
- 2: setup grid uses full-color agent logos while everything else is monochrome.
- 2: white-to-gray gradient on every H2 reads as a template tell; no glass beyond the phone notification.
- 1: two identical white CTAs in the first mobile screen; agent lists disagree between sections.

Changes for attempt 4: sent to the builder as the list above.

## Attempt 4 (built on 7fc644b, committed with this log)
| Reviewer | Model | Score | Verdict |
|---|---|---|---|
| A | opus | 8 | Restrained, coherent Linear-style page with a believable iOS flow; client-ready, but a few gimmicks, repetition and loose spacing. |
| B | sonnet | 8 | Clean page with a clear value prop, prominent CTA and convincing phone; thin social proof, microcopy pricing, three focal points in the hero. |
| C | opus | 7 | Fixes fonts and separators with a believable flow, but repeats itself, uses a few cheap flourishes and has rough spots on mobile. |

Result: FAIL (min 7). Attempt limit reached.

C also reported that the full-page captures go blank below mid-page because of scroll-reveal. Checked: false. Every section and the footer render in desktop-part-05.

## Final
Kept: attempt 4, the best attempt (all four attempts have a minimum of 7; attempt 4 has the highest total, 23).
Why it failed: the hostile critic (C) never went above 7. Its reasons in the last round:
- the magicui border beam crawling around the hero terminal reads as a template effect (A agreed);
- the hero terminal floats between the headline and the phone, aligned to neither;
- mobile phone is tall with an empty lower half; one capture caught a dim crossfade between states;
- Product Hunt and Hacker News badges stack ragged on mobile;
- agent logos and the trial line repeat several times;
- the footer disclosure row does not line up with the columns above it.
