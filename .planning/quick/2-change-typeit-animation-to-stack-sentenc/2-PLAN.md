---
phase: quick-2
plan: 01
type: execute
wave: 1
depends_on: []
files_modified:
  - layouts/partials/sections/home.html
  - assets/styles/override.scss
autonomous: false
requirements: []

must_haves:
  truths:
    - "Each sentence appears on a new line below the previous one"
    - "Sentences stack from top to bottom until all are shown"
    - "All sentences clear at once and loop restarts from beginning"
  artifacts:
    - path: "layouts/partials/sections/home.html"
      provides: "TypeIt configuration with stacking behavior"
      contains: "breakLines: true"
    - path: "assets/styles/override.scss"
      provides: "Multi-line text container styling"
      contains: "white-space: pre-line"
  key_links:
    - from: "layouts/partials/sections/home.html"
      to: "TypeIt library"
      via: "configuration object"
      pattern: "breakLines.*true"
---

<objective>
Change TypeIt animation from replacing sentences to stacking them on new lines, then clearing all and looping.

Purpose: Create a more dynamic visual effect where sentences accumulate on screen before resetting
Output: Modified TypeIt animation with stacking behavior
</objective>

<execution_context>
@/Users/artem/.claude/get-shit-done/workflows/execute-plan.md
@/Users/artem/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/STATE.md

Current implementation: TypeIt animation in layouts/partials/sections/home.html (lines 50-65) has `loop: true` and `breakLines: false`, causing sentences to replace each other with typing/deleting effect.

Target behavior: Stack sentences on new lines until all are shown, then clear all at once and restart loop.
</context>

<tasks>

<task type="auto">
  <name>Task 1: Update TypeIt configuration for stacking behavior</name>
  <files>layouts/partials/sections/home.html</files>
  <action>
Modify the TypeIt initialization script (lines 50-65):

1. Change `breakLines: false` to `breakLines: true` (prevents deletion between strings)
2. Keep `loop: true` for continuous cycling
3. Keep existing strings array unchanged
4. Adjust timing if needed: `nextStringDelay` controls pause before next sentence

Note: With `breakLines: true`, TypeIt stacks sentences. Combined with `loop: true`, it will type all 4 sentences stacking downward, then clear all at once and restart.
  </action>
  <verify>
Run `hugo server` and visit http://localhost:1313 to observe animation:
- First sentence types out
- Second sentence appears below first (not replacing)
- Third sentence appears below second
- Fourth sentence appears below third
- All sentences clear at once
- Loop restarts from sentence 1
  </verify>
  <done>TypeIt animation stacks sentences on new lines and clears all before looping</done>
</task>

<task type="auto">
  <name>Task 2: Adjust styling for multi-line text display</name>
  <files>assets/styles/override.scss</files>
  <action>
Update `.hero-welcome` styles (around line 766) to accommodate stacked sentences:

1. Add `white-space: pre-line;` to preserve line breaks from TypeIt
2. Add `min-height: 4em;` to prevent layout shift as sentences stack (4 lines × ~1em each)
3. Consider adding `line-height: 1.4;` for readable spacing between stacked lines
4. Keep existing font-size, letter-spacing, color, opacity unchanged

This ensures the container can hold all 4 stacked sentences without jumping.
  </action>
  <verify>
Inspect `.hero-welcome` in browser DevTools:
- Container has `white-space: pre-line`
- Container has sufficient min-height (at least 4em)
- Line breaks render correctly between sentences
- No layout shift during animation
  </verify>
  <done>Hero welcome container properly displays multi-line stacked text</done>
</task>

<task type="checkpoint:human-verify">
  <name>Task 3: Verify stacking animation behavior</name>
  <what-built>TypeIt animation that stacks sentences on new lines before clearing and looping</what-built>
  <how-to-verify>
1. Start Hugo dev server: `hugo server`
2. Visit http://localhost:1313
3. Watch the typing animation below "HATEM FEKI":
   - "WELCOME TO MY PORTFOLIO" types out on line 1
   - "I LOVE AI AND AUTOMATION" types out on line 2 (below line 1)
   - "I AM A FITNESS ENTHUSIAST" types out on line 3 (below line 2)
   - "I LOVE FOOD" types out on line 4 (below line 3)
   - ALL sentences clear at once
   - Animation loops from beginning

Expected: Sentences stack vertically, no deletion between sentences, all clear together before loop restart.
  </how-to-verify>
  <resume-signal>Type "approved" if animation works correctly, or describe any issues</resume-signal>
</task>

</tasks>

<verification>
1. TypeIt configuration has `breakLines: true`
2. `.hero-welcome` styling supports multi-line display
3. Visual test confirms stacking behavior
4. Loop clears all sentences and restarts
</verification>

<success_criteria>
- Sentences appear one at a time on new lines
- All 4 sentences stack vertically on screen
- All sentences clear simultaneously
- Animation loops indefinitely with same behavior
- No layout shift or visual glitches during stacking
</success_criteria>

<output>
After completion, create `.planning/quick/2-change-typeit-animation-to-stack-sentenc/2-SUMMARY.md`
</output>
