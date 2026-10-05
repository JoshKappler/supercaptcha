# v4: Raycast

## Attempt 1 (built on c3fdaf9, versions/v4 uncommitted at review time)
| Reviewer | Model | Score | Verdict |
|---|---|---|---|
| A | opus | 7 | Disciplined dark system with one type family and a mostly believable lock-screen flow, but phone material, a ghosted transition frame and loud or unfinished details keep it short. |
| B | sonnet | 7 | Clean Raycast-style page with a good hero, but weak pricing, low trust proof, a broken mobile animation frame and little real glass. |
| C | opus | 7 | Coherent and restrained, but a garbled phone mid-transition, a wrong-colored status pill on mobile, a pale video thumbnail and a loud badge keep it below client-ready. |

Result: FAIL (min 7)

Blocking issues (number of reviewers raising it):
- 3: mobile capture shows two notifications crossfaded on top of each other (double-printed text, two icons) with the action menu still visible.
- 3: founder video thumbnail is a washed-out light slab.
- 3: little or no liquid glass; flat notification and lock screen.
- 3: dashboard pill reads "Approved · Phone" in the deny color on mobile.
- 2: Product Hunt badge in the footer is a loud white-and-orange sticker; "vercel deploy--prod" missing a space.
- 2: footer SEO wall about three mobile screens; thin red connector line in the hero leads nowhere.
- 1: "Approved" card keeps the tall request height; pricing hidden; trust proof too low; status bar glyphs look Android.

Changes for attempt 2: sent to the builder as the list above.

## Attempt 2 (built on 7fc644b, versions/v4 uncommitted at review time)
| Reviewer | Model | Score | Verdict |
|---|---|---|---|
| A | opus | 8 | Restrained, coherent page with a believable iOS flow; held back by a muddy video thumbnail and a few rhythm and alignment slips. |
| B | sonnet | 7 | Clear hero and strong product panel, but the mobile CTA sits below the fold, tracking too tight, thin trust, little glass. |
| C | opus | 7 | Fixes the complaints but still reads as a competent template: crowded hero, mass-produced sections, a few real flaws. |

Result: FAIL (min 7)

Blocking issues (number of reviewers raising it):
- 3: founder video thumbnail is near-black and murky, carries the old "Stop babysitting your terminal." headline in a foreign typeface.
- 3: mobile primary CTA sits below the whole phone, about 1100px down.
- 3: a mobile capture shows the menu fading over an unblurred clock while the dashboard already says Approved.
- 2: stats strip has unequal cells.
- 2: desktop hero overloaded; dashboard card competes with the phone.
- 1: headline tracking collapses sentence breaks ("Walk away.Come back"); three identical 3-up card rows; hero CTA reads dim on mobile; little glass on cards.

Changes for attempt 3: sent to the builder as the list above.

## Attempt 3 (built on 7fc644b, versions/v4 uncommitted at review time)
| Reviewer | Model | Score | Verdict |
|---|---|---|---|
| A | opus | 8 | Restrained, coherent page with a believable iOS flow; a few unfinished-looking surfaces and an overused card and mono vocabulary. |
| B | sonnet | 8 | Clean Raycast-style page with a clear value prop, prominent CTA with pricing and a realistic phone; thin trust proof, hero gap, crowded footer. |
| C | opus | 7 | Competent and consistent, but a clipped mobile phone, a missing mobile nav, a placeholder video tile and an overused red streak. |

Result: FAIL (min 7)

Blocking issues (number of reviewers raising it):
- 3: mobile phone faded off at the bottom; no bezel, home indicator or quick buttons; caption sits on the fade.
- 3: founder video tile is an empty gradient with a play button.
- 2: dead pocket under the hero dashboard card on desktop.
- 1: no mobile menu for How it works, For agent builders and Docs; "Approve ↵" keyboard hint on touch; red streak repeated behind three sections; first desktop frame shows a blurred clock; mobile rules toggles lose alignment; thin testimonials; heavy footer.

Changes for attempt 4: sent to the builder as the list above.

## Attempt 4 (built on edefb50, committed with this log)
| Reviewer | Model | Score | Verdict |
|---|---|---|---|
| A | opus | 7 | Disciplined Raycast-style page with a believable lock-screen flow; placeholder-feeling modules, a busy hero background and thin glass. |
| B | sonnet | 7 | Clear pitch and credible phone demo, but thin trust, easy-to-miss pricing and too-faint glass. |
| C | opus | 7 | Consistent with a believable flow, but template tells, an orphaned mobile hero widget, a placeholder video card and dead footer accordions. |

Result: FAIL (min 7). Attempt limit reached.

## Final
Kept: attempt 4 (7/7/7). Attempt 3 scored higher (8/8/7), but its files were not committed before the attempt 4 edits, so it could not be restored. The protocol says to keep the best attempt; that was not possible here.
Why it failed: in the last round all three reviewers dropped to 7. Shared reasons:
- the founder video card is a small face circle floating in a large empty box, with the play button over its edge (A, B, C);
- the mobile hero dashboard shrank to one orphaned "git push origin main / auto-deny 30s" row (A, C);
- desktop footer link groups show as collapsed accordions, an empty-looking row (A, B, C);
- the red diagonal streaks behind the hero read as a dated glow, and the hero has a dead gap between text and phone (A, B, C);
- liquid glass barely present outside the notification (A, B, C).
