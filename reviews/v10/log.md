# v10: Lock screen first (from sketch e10)

## Attempt 1 (commit 0270539)
| Reviewer | Score | Verdict |
|---|---|---|
| A | 7 | Hero close to Apple quality; below it a long run of text sections on flat black and a double SEO footer |
| B | 7 | Strong hero with a clear value prop, then a long text-only scroll with weak trust signals |
| C | 7 | The wallpaper-filled hero works, but the page past the first screen is flat, imageless and mixes two sans families |
Result: FAIL (min 7). Glass visible: yes (3/3). Template named: Framer/Linear dark SaaS below an Apple-style hero (3/3).
Blocking issues: hero crop cuts through the flashlight and camera buttons on mobile; left of the hero is empty and the wallpaper only glows on the right; wide display face used at small sizes next to a second sans; diagram lines miss the logo and a caption drifts into the gutter; two stacked footers on different grids; dead columns in several sections.

## Attempt 2 (commit 233f89f)
| Reviewer | Score | Verdict |
|---|---|---|
| A | 7 | Restrained and warm with a convincing lock screen; a messy mid-animation frame and one light media block |
| B | 8 | Polished and cohesive, the hero reads as a real iPhone; a ghosting frame, thin trust and a long middle |
| C | 7 | Coherent with a believable phone; a messy mid-animation frame, doubled hairlines, a light thumbnail and a mobile hero without the phone |
Result: FAIL (min 7). Glass visible: yes (3/3). Template named: none (A), Linear-style or Framer app template (B, C).
Blocking issues: the shared phone's long-press transition shows the collapsed card, expanded card and menu at once (a component defect, fixed in shared/iphone); bright founder thumbnail; doubled hairlines; phone below the first mobile screen; one heading in the text face.

## Attempt 3 (commit 67f81a3)
| Reviewer | Score | Verdict |
|---|---|---|
| A | 8 | Confident and restrained, the lock-screen hero reads as a real iPhone; the metal rim and lower layout fall short of apple.com |
| B | 8 | The wallpaper hero, one-family type and quiet hairlines fix all three problems; a few hierarchy and mobile details |
| C | 7 | Cohesive with a strong hero; two body faces, dead columns, an orange under-glow and a murky backdrop behind the copy |
Result: FAIL (min 7). Glass visible: yes (3/3). Template named: Framer app template (A, C), none specific (B).
Blocking issues: lead paragraphs use a different "a" from other body text; orange glow under the second phone; floating setup CTA and empty founder column; stranded 37 minutes line; muddy hero backdrop behind the trust row.
