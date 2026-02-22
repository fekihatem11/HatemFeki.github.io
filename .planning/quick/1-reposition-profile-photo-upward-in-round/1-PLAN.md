---
phase: quick-1
plan: 01
type: execute
wave: 1
depends_on: []
files_modified:
  - assets/styles/override.scss
autonomous: true
requirements: []

must_haves:
  truths:
    - "Profile photo shows head near top of frame with minimal empty space above"
    - "More of the outfit/suit is visible at the bottom of the frame"
    - "Frame shape and size remain unchanged"
  artifacts:
    - path: "assets/styles/override.scss"
      provides: "Profile photo vertical positioning"
      contains: "object-position"
  key_links:
    - from: "assets/styles/override.scss"
      to: ".hero-img"
      via: "CSS object-position property"
      pattern: "object-position:"
---

<objective>
Reposition the profile photo upward within its rounded frame by adjusting the CSS object-position property, eliminating the dark background gap above the head while maintaining the existing frame shape.

Purpose: Improve visual composition by properly framing the subject's head and torso within the portrait shape.
Output: Updated override.scss with adjusted photo positioning.
</objective>

<execution_context>
@/Users/artem/.claude/get-shit-done/workflows/execute-plan.md
@/Users/artem/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/STATE.md

# Primary file to modify
@assets/styles/override.scss

# Author data (reference only)
@data/en/author.yaml
</context>

<tasks>

<task type="auto">
  <name>Adjust profile photo vertical positioning</name>
  <files>assets/styles/override.scss</files>
  <action>
Modify the `.hero-img` CSS class in the `#custom-hero .hero-image-container` section to reposition the image upward within the frame.

Current setting (line 704):
```scss
object-position: center 50%;
```

Change to position the image higher (showing more of the top/head area, less empty background):
```scss
object-position: center 30%;
```

This shifts the focal point from 50% (middle) to 30% (upper-middle), moving the head closer to the top of the arched frame while revealing more of the outfit at the bottom. The percentage represents the vertical position of the image within the container — lower percentages move the visible portion upward.

Frame shape (.hero-image-container mask) and size remain untouched — only the photo positioning within the frame changes.
  </action>
  <verify>
1. Inspect the changes: `git diff assets/styles/override.scss`
2. Rebuild CSS: `hugo` or local dev server rebuild
3. Visual inspection at http://localhost:1313/ (or deployment URL) — verify head is positioned near top of frame with minimal dark space above
  </verify>
  <done>
Profile photo displays with head positioned in upper portion of frame, dark background gap above head is minimal, and more of the suit/outfit is visible at bottom of frame. The arched portrait frame shape remains unchanged.
  </done>
</task>

</tasks>

<verification>
- [ ] `object-position` value changed from `center 50%` to `center 30%` in `.hero-img` class
- [ ] CSS compiles without errors
- [ ] Visual check confirms head is closer to top of frame
- [ ] Frame shape (arched top, wavy bottom) remains identical
</verification>

<success_criteria>
Profile photo is repositioned upward within the rounded frame, eliminating the excessive dark background space above the subject's head while showing more of the outfit below. The frame shape and dimensions remain unchanged.
</success_criteria>

<output>
After completion, create `.planning/quick/1-reposition-profile-photo-upward-in-round/1-SUMMARY.md`
</output>
