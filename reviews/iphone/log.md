# Shared iPhone component

Reviewed on its own before the round 2 pages use it. A = Apple design director (opus),
C = hostile critic (opus). Pass is 8 or more from both, at most four attempts.

## Attempt 1 (commit 8c7a657)
| Reviewer | Score | Verdict |
|---|---|---|
| A | 5 | A well-made illustration of an iPhone, not a photographed device; long-press view breaks iOS conventions |
| C | 5 | Frames read as flat neon outlines, long-press drops all iOS material and blur, phones drawn at different sizes |
Result: FAIL (min 5)
Blocking issues: flat frame band, island drawn as two cutouts, sharp clock behind the long-press view, opaque expanded card, small thin clock, instructional banner copy, phones at different sizes.

## Attempt 2 (commit 72fb99a)
| Reviewer | Score | Verdict |
|---|---|---|
| A | 6 | Convincing proportions, wallpapers and menu; web-card outlines, a fallback mono font, a green check badge and no screen reflection |
| C | 6 | Outline and lock screen close to right, but no glass on the screen, a flat frame band and wrong iOS details |
Result: FAIL (min 6)
Blocking issues: no visible screen glass, gray 1px card outlines, uneven clock fill, green approved badge, header changes on expand, Courier-like mono, no contact shadow, flat band.
Not acted on, because Apple's iOS 27 kit or the real hardware says otherwise: menu icons on the right (the kit draws them leading), equal island widths (the 17 and 18 Pro Max islands differ), collapsed reduced-motion state (the owner's spec asks for the expanded one), SF Pro type (cannot be shipped; Apple devices render it through -apple-system).

## Attempt 3 (commit 9da1e79)
| Reviewer | Score | Verdict |
|---|---|---|
| A | 7 | Convincing, well-paced notification flow on a competent outline; frame finish, type and missing screen glass read as a CSS mockup |
| C | 7 | Proportions, buttons, island and clock convincing; flat screen, busy orange wallpaper and an inline code block read as web |
Result: FAIL (min 7)
Blocking issues: cover glass still invisible at 1440, glossy copper frame, busy orange wallpaper, check glyph like an emoji, menu material unlike the cards, code pill in the notification.

## Attempt 4 (commit be259af)
| Reviewer | Score | Verdict |
|---|---|---|
| A | 6 | Strong wallpapers and correct structure, but the frame reads as an outline, the reflection is a hard stripe and the menu breaks iOS layout |
| C | 6 | Coherent, but an orange outline frame, a hard-edged reflection band, a gray screen-edge hairline and flat gray panels |
Result: FAIL (min 6)

## Final
Not passed after four attempts. The component was restored to attempt 3, the highest by minimum score (commit 59e2bbc). The visible reflection added in attempt 4 read as a pasted stripe to both reviewers, so the shipped phone keeps the subtler attempt 3 glass. Reviewers repeatedly named the same limits: Inter in place of SF Pro, which cannot be shipped, and a front-on frame band that reads thin at page scale.
After the loop, page reviews of v10 caught two animation defects in attempt 3 that any visitor would see: overlapping cards during the long-press transition and old text showing through a stacked card. Commit e1716b1 fixes only those transition rules.
