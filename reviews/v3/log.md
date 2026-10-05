# v3: Vercel / Geist

## Attempt 1 (built on c3fdaf9, versions/v3 uncommitted at review time)
| Reviewer | Model | Score | Verdict |
|---|---|---|---|
| A | opus | 7 | Disciplined Geist execution that fixes fonts and separators and mostly gets the iOS flow right, but hero composition, mid-animation states and small alignment slips keep it below client-ready. |
| B | sonnet | 7 | Clean and consistent with a believable lock screen, but liquid glass is barely met, pricing is almost hidden and trust signals are thin. |
| C | opus | 7 | Fixes all three known problems but skips liquid glass, shows broken mid-animation states, and has alignment and template tells. |

Result: FAIL (min 7)

Blocking issues (number of reviewers raising it):
- 3: mid-animation frames show two states at once (Approved banner with the Approve/Deny menu still under it; menu open over a sharp clock; caption cut by the card).
- 3: the hero terminal's right edge collides with the phone bezel.
- 3: no liquid glass or reflections: flat gray notification platters, flat phone frame.
- 2: two independent Pushary notifications stacked at the end state instead of an iOS group.
- 2: on mobile the phone sits mostly below the fold, and the terminal (the request) comes after the phone (the reply).
- 2: final CTA shield icon pinned left of its centered caption on mobile.
- 1: pricing only in small gray text; trust signals thin; headline payoff dimmed; footer SEO wall; page monotonous.

Changes for attempt 2: sent to the builder as the list above.
