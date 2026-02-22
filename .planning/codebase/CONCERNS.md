# Codebase Concerns

**Analysis Date:** 2026-02-22

## Dependency Conflicts

**Duplicate Popper.js Packages:**
- Issue: Both `popper.js` (v1.16.1) and `@popperjs/core` (v2.11.8) are installed as dependencies
- Files: `package.json` (lines 33, 53)
- Impact: Increases bundle size unnecessarily; may cause unexpected behavior if both versions are loaded; @popperjs/core is the modern version and popper.js is deprecated
- Fix approach: Remove `popper.js@1.16.1` from `devDependencies` and ensure all bootstrap dependencies use only `@popperjs/core@2.11.8`. Verify bootstrap 5.3.x compatibility with @popperjs/core.

## Content Placeholder Issues

**Placeholder Author Data:**
- Issue: Author config contains default placeholder values from theme template
- Files: `data/en/author.yaml` (lines 11-12)
  - `github: johndoe` (should be personalized GitHub handle)
  - `linkedin: johndoe` (should be personalized LinkedIn profile)
- Impact: Social links in footer/contact sections point to placeholder accounts instead of actual profiles
- Fix approach: Update all author social handles in `data/en/author.yaml` with actual account usernames

**Placeholder Content in Publications:**
- Issue: Publications section contains template Lorem Ipsum placeholder content with example URLs
- Files: `data/en/sections/publications.yaml` (lines 38-42, 58-62, 78-82)
  - All paper summaries use Lorem Ipsum placeholder text
  - All publication URLs point to `https://example.com`
  - Author names are placeholder examples (Dr. Madman, Dr. Goodman, etc.)
- Impact: Portfolio displays fake academic credentials when publications section is enabled/visible; misleading for potential employers or collaborators
- Fix approach: Replace with actual publication data or disable publications section if not applicable

**Placeholder Site Description:**
- Issue: Site metadata uses default template descriptions
- Files: `data/en/site.yaml` (lines 10, 20)
  - OpenGraph description: "Portfolio and personal blog of John Doe"
  - Meta description: "Portfolio and personal blog of John Doe"
  - OpenGraph image: `images/author/john.png` (doesn't match actual author image)
- Impact: SEO and social sharing metadata is generic/incorrect; reflects poor maintenance
- Fix approach: Update `data/en/site.yaml` with personalized site descriptions and correct metadata

**Placeholder Projects Content:**
- Issue: Projects section contains example/placeholder projects from theme template
- Files: `data/en/sections/projects.yaml` (lines 33-40, 42-47)
  - Kubernetes and Tensorflow projects are public repos used as examples (not personal projects)
  - "A sample academic paper" uses placeholder URLs
- Impact: Portfolio lists non-personal projects, reducing credibility and clarity of actual contributions
- Fix approach: Replace with actual personal or professional projects, or clearly mark contributed projects as such

## Multilingual Structure with Missing Data

**Bengali Language Files Deleted:**
- Issue: Git status shows entire `data/bn/` directory deleted (author.yaml, all section files)
- Files: Deleted: `data/bn/author.yaml`, `data/bn/sections/*.yaml` (10 files total)
- Impact: If Bengali language support was initially configured, it's now broken; navigation may reference deleted sections
- Fix approach: Either fully remove Bengali language configuration from `hugo.yaml` or restore the Bengali data files with appropriate translations

**Language Configuration Mismatch:**
- Issue: `hugo.yaml` shows language configuration for English only (lines 23-28), but project structure suggests multilingual intent given deleted Bengali files
- Files: `hugo.yaml` (lines 21-31)
- Impact: Confusing codebase state; unclear language support strategy
- Fix approach: Document language strategy; either remove all multilingual setup or properly implement supported languages

## Build System Issues

**Hugo Build Lock File in Git:**
- Issue: `.hugo_build.lock` is untracked but present in working directory, indicating Hugo build artifacts
- Files: `.hugo_build.lock` (empty file)
- Impact: Build state can be inconsistent across environments; lock files should typically be ignored
- Fix approach: Add `.hugo_build.lock` to `.gitignore` or verify it's not needed for reproducible builds

**Resources Directory Generated at Build Time:**
- Issue: `resources/` directory is untracked but created by Hugo during builds
- Files: `resources/` (contains Hugo-generated CSS/JS builds)
- Impact: Build artifacts in working directory; may cause confusion about actual source vs. generated assets
- Fix approach: Verify `resources/` is in `.gitignore` and not committed; document the build process for team clarity

**Public Directory Not Properly Ignored:**
- Issue: `public/` directory is in `.gitignore` but may be accidentally committed or cause deployment confusion
- Files: `.gitignore` (line 2)
- Impact: If `public/` is ever committed, it creates large diffs and confuses CI/CD pipelines
- Fix approach: Ensure CI/CD pipeline builds `public/` from source, not from repository; document deployment process

## Git Workflow Issues

**Makefile Deploy Command Issues:**
- Issue: `make deploy` does `git add .` which stages all changes including potentially unwanted build artifacts and lock files
- Files: `Makefile` (line 12)
- Impact: Unintended files could be committed (e.g., `.hugo_build.lock`, modified `resources/`, theme submodule changes)
- Fix approach: Replace `git add .` with explicit file paths or use proper gitignore; require explicit staging

**Theme Submodule Modified State:**
- Issue: Git status shows `themes/toha (modified content)` indicating theme submodule working directory differs from tracked state
- Files: `themes/toha` (submodule)
- Impact: Theme modifications may be lost or cause unexpected behavior during deployments; unclear what's customized
- Fix approach: Either commit submodule changes properly, or ensure local theme customizations are in overlay files (`assets/`, `layouts/`) instead of modifying theme directly

## Configuration Issues

**Incomplete Hugo Configuration:**
- Issue: Several theme features are disabled in `hugo.yaml` that may be confusing for new developers
- Files: `hugo.yaml` (lines 111-112, 127-128, 131-132, 164-166)
  - Blog feature disabled but blog sections exist in nav
  - Notes feature disabled
  - Analytics enabled (configured) but appears disabled in params
- Impact: Unclear intent; developers may re-enable accidentally or confusion about feature readiness
- Fix approach: Remove disabled features from config, or document why they're disabled; clean up unused feature blocks

**Google Analytics ID Present but Disabled:**
- Issue: Google Analytics ID (G-H4LBG7NDFZ) configured but analytics feature disabled
- Files: `hugo.yaml` (line 173)
- Impact: Potential privacy/security concern if analytics is unintentionally inactive; unclear data collection intent
- Fix approach: Either enable analytics with clear documentation, or remove the ID entirely

## Missing Critical Infrastructure

**No Error Handling Documentation:**
- Issue: No error tracking or monitoring configured (Sentry, DataDog, etc.)
- Impact: Production issues won't be automatically detected or logged; relies on manual user reporting
- Fix approach: Consider adding analytics/error tracking service configuration for production deployment

**No Deployment Documentation:**
- Issue: Project has GitHub Actions setup (`.github/` exists) but no documentation about deployment process
- Files: `.github/` (directory exists but contents not reviewed)
- Impact: Deployment process is unclear; deployment failures won't be obvious
- Fix approach: Document deployment pipeline and any CI/CD configuration

## CSS/Styling Concerns

**Heavy Use of `!important` in Overrides:**
- Issue: `assets/styles/override.scss` extensively uses `!important` flags (appears ~30+ times)
- Files: `assets/styles/override.scss` (lines 42, 51, 58, 62, 78-79, 87, etc.)
- Impact: Makes CSS debugging difficult; harder to override these styles in future; poor CSS cascade practice
- Fix approach: Refactor to use proper CSS specificity instead of `!important`; consider theme extension points instead of overrides

**Unsafe Raw HTML Enabled in Markdown:**
- Issue: `hugo.yaml` enables unsafe HTML rendering in markdown
- Files: `hugo.yaml` (line 37)
- Impact: Potential XSS vulnerability if user-generated content is added; requires careful content review
- Fix approach: Only enable if absolutely necessary; audit all markdown files for HTML; implement content validation

## Performance Considerations

**Large Font Download:**
- Issue: External Google Fonts loaded synchronously
- Files: `assets/styles/override.scss` (line 5)
- Impact: Blocks rendering; adds network latency; impacts Core Web Vitals
- Fix approach: Switch to `@fontsource/mulish` (already installed) which is preloaded; use font-display strategy (swap/fallback)

**Multiple Heavy Libraries Loaded:**
- Issue: Project includes many JavaScript libraries that may not all be used
- Files: `package.json` (devDependencies: mermaid, katex, plyr, filterizr, etc.)
- Impact: Bundle size increases; slower initial page load
- Fix approach: Audit which features are actually used; conditionally load libraries only when needed

## Testing & Quality

**No Testing Infrastructure:**
- Issue: No test files, no testing framework configured
- Impact: Portfolio changes could break unexpectedly; no automated validation
- Fix approach: Consider adding visual regression tests for critical sections; document manual testing checklist

**ESLint Configured but No Scripts:**
- Issue: ESLint configured in package.json but no lint/lint-fix scripts defined
- Impact: Team members may not run linting; code quality not enforced
- Fix approach: Add `"lint": "eslint ."` and `"lint:fix": "eslint . --fix"` scripts to package.json

## Data Consistency Concerns

**Disabled Accomplishments Section:**
- Issue: Accomplishments section is disabled in config but data file exists with content
- Files: `data/en/sections/accomplishments.yaml` (line 5: `enable: false`)
- Impact: Content may be forgotten/outdated; creates confusion about data maintenance
- Fix approach: Either enable the section and ensure content is current, or delete the data file entirely

**Missing Favicon:**
- Issue: Favicon configured but may not exist at expected path
- Files: `hugo.yaml` (line 83: `favicon: /images/site/favicon.png`)
- Impact: Browser tab shows broken icon; poor user experience
- Fix approach: Verify favicon exists at `static/images/site/favicon.png`

## Documentation Gaps

**No Contributing Guidelines:**
- Issue: No CONTRIBUTING.md or development setup documentation
- Impact: Difficult for collaborators to contribute; setup process unclear
- Fix approach: Create `CONTRIBUTING.md` with setup instructions, branch naming conventions, commit message guidelines

**No Changelog:**
- Issue: Git history shows commits but no CHANGELOG.md file
- Impact: Release history and feature changes are not documented
- Fix approach: Maintain CHANGELOG.md with version-tagged changes

---

*Concerns audit: 2026-02-22*
