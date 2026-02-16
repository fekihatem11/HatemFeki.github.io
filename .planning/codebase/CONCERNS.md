# Codebase Concerns

**Analysis Date:** 2026-02-16

## Tech Debt

**Outdated Placeholder Content:**
- Issue: Site configuration contains example/template data from the Toha theme example site rather than personalized content
- Files: `data/en/site.yaml`, `hugo.yaml` (line 27), `data/en/author.yaml` references
- Impact: Site metadata displays "John Doe" and "John's Blog" instead of actual owner information; SEO metadata is incorrect; OpenGraph sharing includes wrong description and image path
- Current status: Partially addressed (author name changed to "Hatem Feki" in home template) but base configuration files not updated
- Fix approach: Update `data/en/site.yaml` to remove "John Doe" references, update OpenGraph metadata, verify all hard-coded example text is replaced with actual portfolio information

**Unused Dependencies:**
- Issue: Package.json includes many devDependencies that may not be actively used by the Hugo theme
- Files: `package.json` (lines 31-55)
- Unused candidates: `popper.js` (v1.16.1), `filterizr` (v2.2.4), `imagesloaded` (v5.0.0), `mark.js` (v8.11.1) - no HTML references found
- Impact: Increased node_modules size, potential security updates required for unused packages, npm install time
- Fix approach: Audit which packages are actually required by theme and remove unused ones; verify no layout or script files depend on removed packages

**Large Public Build Directory:**
- Issue: `/public` directory is 115MB, containing many legacy CSS file variants with hash-based names
- Files: `public/` directory contains 50+ application CSS files with different hashes
- Impact: Build artifacts should not be committed to git; bloats repository size; suggests incomplete cleanup between builds
- Fix approach: Add `public/` to `.gitignore` (currently only has `node_modules`); implement proper build cleanup in deployment workflow

**Unsafe HTML Rendering Enabled:**
- Issue: Hugo configuration enables unsafe HTML rendering in markdown
- Files: `hugo.yaml` (line 37: `unsafe: true`)
- Impact: Opens potential XSS vulnerability if user-generated content or untrusted markdown is processed; allows arbitrary HTML/JavaScript injection
- Current mitigation: Content is static and controlled by repository owner
- Recommendations: Keep enabled since content is trusted, but document this decision; add security note to CONTRIBUTING guidelines if project becomes open-source

## Known Issues

**Scroll Restoration Workaround:**
- Symptoms: Page jumps to top on navigation
- Files: `layouts/partials/sections/home.html` (lines 10-30)
- Trigger: Page load and navigation, especially with hash-based anchors
- Problem: History API scroll restoration is manually disabled and reset multiple times; redundant code path (`onbeforeunload` and `onload`)
- Impact: May conflict with modern browser scroll restoration behavior; adds startup delay with multiple timeouts
- Fix approach: Simplify to single `history.scrollRestoration = 'manual'` statement; test with hash navigation; consider removing if browser defaults work correctly

**Hardcoded TypeIt CDN Script:**
- Issue: TypeIt library loaded from external CDN with no fallback
- Files: `layouts/partials/sections/home.html` (line 51: `https://unpkg.com/typeit@8.7.1/dist/index.umd.js`)
- Impact: External dependency on unpkg.com; if CDN is unavailable, typing animation fails silently; version is pinned to 8.7.1
- Risk: Already installed in `node_modules` but not used (loaded from CDN instead)
- Fix approach: Use the TypeIt package from node_modules via Hugo asset pipeline instead of external CDN; removes external dependency

**Stale Generated Asset Hash Artifacts:**
- Issue: `resources/_gen/assets/` contains cached SCSS compilation results
- Files: `resources/_gen/assets/styles/application.template.scss_998d6226375774509b474f173c38630a.json`
- Impact: Hugo resource cache may cause outdated CSS to be served if not properly invalidated
- Fix approach: Verify Hugo cache invalidation on CSS changes; consider deleting `resources/` directory during clean builds

## Security Considerations

**Git Repository Exposure Risk:**
- Risk: `.gitmodules` file references theme as git submodule at `themes/toha` (line 5 of `go.mod` shows local replacement)
- Files: `.gitmodules`, `go.mod`, `themes/toha` directory
- Current mitigation: Submodule is a well-maintained public project (hugo-toha/toha/v4)
- Recommendations: Keep submodule updated regularly; monitor theme repository for security updates; add pre-commit hook to verify no secrets in content files

**Package-lock.json Consistency:**
- Risk: Large package-lock.json file (5077 lines) can hide dependency vulnerabilities
- Files: `package-lock.json`
- Recommendations: Run `npm audit` regularly; audit for supply chain risks in dependencies; consider using npm audit CI step in GitHub Actions

**External Analytics ID in Public Config:**
- Risk: Google Analytics ID `G-H4LBG7NDFZ` in `hugo.yaml` (line 173) is not sensitive but should be considered public
- Files: `hugo.yaml` (line 173)
- Current mitigation: Analytics ID is public by design (GA IDs are meant to be public)
- Recommendations: No action needed for GA ID; but verify no other metrics or secrets are in public config files

## Performance Bottlenecks

**Expensive Logo and Favicon Assets:**
- Issue: Logo and favicon loaded from static files without optimization specifications
- Files: `hugo.yaml` (lines 81-83)
- Problem: No images are optimized; SVG alternatives not used where applicable; no responsive sizing
- Impact: Unnecessary bytes transferred; slower initial page load
- Improvement path: Convert PNG logo files to SVG for favicon/inverted logo; add Hugo image resource optimization; use modern image formats with fallbacks

**Multiple Animation Triggers on Page Load:**
- Issue: Hero section has overlapping animations with repeated setTimeout calls and staggered delays
- Files: `layouts/partials/sections/home.html` (lines 93-154)
- Problem: DOM parsing happens after TypeIt CDN load (async dependency); blur text animation uses 100ms stagger × ~20 characters = 2+ seconds total animation time
- Impact: Page appears non-interactive for 2+ seconds; TypeIt initialization adds more blocking delay
- Improvement path: Use CSS animations instead of JavaScript for text reveal; reduce animation stagger; preload external CDN script

**CSS File Bloat:**
- Issue: Application CSS files are ~400KB each (hashed variants suggest multiple builds)
- Files: All `application.*.css` files in `public/`
- Problem: Theme includes Bootstrap (v5.3.3) + full KaTeX + Mermaid + Highlight.js even though many features are disabled
- Impact: Large CSS payload impacts Core Web Vitals (Largest Contentful Paint); affects mobile bandwidth
- Improvement path: Use PostCSS/PurgeCSS to remove unused Bootstrap utilities; conditionally load feature CSS (KaTeX, Mermaid) only on pages that use them; minify CSS in production

## Fragile Areas

**Custom Hero Section with Overridden Bootstrap:**
- Files: `assets/styles/override.scss`, `layouts/partials/sections/home.html`
- Why fragile: Uses heavy CSS overrides with `!important` flags (lines 350-433 of override.scss) to completely override theme defaults; relies on theme structure remaining stable; complex grid layout with media queries
- Safe modification: Test all breakpoints (mobile, tablet, desktop) when changing layout; keep CSS selectors generic (avoid theme-specific class names); use CSS variables for colors to avoid scattered hardcoded values
- Test coverage: No automated visual regression tests; manual testing required for responsive behavior

**JavaScript Animation System:**
- Files: `layouts/partials/sections/home.html` (Vanilla JS animations)
- Why fragile: Multiple animation systems (blur text, fade-in, TypeIt plugin, scroll restoration) operating independently with overlapping delays; if TypeIt script fails to load, typing animation silently fails without error handling; timing-dependent animations
- Safe modification: Add error handling for CDN script loading; consolidate animation delays into single coordinated system; add error logging
- Test coverage: No error handling tests; relies on manual testing of CDN availability

**Theme Submodule Dependency:**
- Files: `themes/toha/` (git submodule)
- Why fragile: Entire site depends on exact theme version; theme updates could break custom overrides; `go.mod` uses local replacement instead of versioned dependency
- Safe modification: Test theme updates in separate branch before merging; maintain CHANGELOG of theme version and breaking changes; consider vendoring critical theme components if customization grows
- Test coverage: No automated theme compatibility tests

## Scaling Limits

**GitHub Pages Deployment Approach:**
- Current capacity: Single static site; no server-side processing
- Limit: GitHub Pages has rate limits on build frequency (~10 builds per hour); deployment is through GitHub Actions which has job timeout of 6 hours
- Constraint: Large builds may approach timeout; CSS compilation takes time with 50+ CSS files
- Scaling path: For minor updates, use scheduled Hugo builds; for major redesigns, consider CDN caching with CloudFlare or Netlify

## Dependencies at Risk

**ESLint and Related Linting Packages:**
- Risk: ESLint v8.31.0 is from late 2022; newer versions available; no lint rules actually enforced in CI/CD
- Impact: Security patches and bug fixes not applied; unused dependencies increase attack surface
- Files: `package.json` (lines 35-40)
- Migration plan: Remove dev dependencies if not used in CI pipeline, or update to latest ESLint v9+ with flat config format

**Bootstrap v5.3.3:**
- Risk: Stable version but theme locks to exact version; future security patches require theme update
- Files: `package.json` (line 34)
- Current approach: Works well; CSS is the main concern (file size), not security
- Migration path: Monitor Bootstrap releases for security updates; CSS tree-shaking would be higher priority than version bumping

**Deprecated popper.js v1.16.1:**
- Risk: Version 1.x is in maintenance mode; v2.x is actively developed
- Impact: No known security issues; not actively used in current layouts
- Files: `package.json` (line 53)
- Migration plan: Remove if unused, or upgrade to `@popperjs/core` v2 if needed by theme

## Missing Critical Features

**No Analytics Verification:**
- Problem: Google Analytics ID configured but no verification that tracking is working
- Blocks: Cannot track visitor behavior, identify high-traffic content, or optimize for engagement
- Files: `hugo.yaml` (lines 164-196, analytics disabled at line 166)
- Fix: Enable analytics or remove from config; add basic tracking verification test

**No Form/Contact Mechanism:**
- Problem: Footer disclaims "contact me" section is available but no implementation
- Blocks: Visitors cannot send inquiries or feedback
- Files: `hugo.yaml` (line 325: `contactMe.enable: true`) with no backend handler configured
- Fix: Either disable contact feature or implement form submission (via Formspree, Netlify Forms, or similar)

**No Build/Deployment Documentation:**
- Problem: No README.md explaining how to build, test, or deploy the site
- Blocks: Other contributors or future maintainers cannot understand setup
- Files: Root directory lacks setup instructions
- Priority: Medium - affects maintainability

## Test Coverage Gaps

**No HTML/Link Validation:**
- What's not tested: Broken internal links, missing images, orphaned pages
- Files: Entire `public/` build output
- Risk: Broken links undetected until manual testing or user reports; image references may point to wrong paths
- Priority: High - impacts user experience and SEO

**No CSS Regression Testing:**
- What's not tested: Visual consistency across theme updates; responsive design at different breakpoints
- Files: `assets/styles/override.scss`, theme styles
- Risk: CSS changes could break layout silently; custom overrides may conflict with theme updates
- Priority: High - CSS is heavily customized

**No Accessibility Testing:**
- What's not tested: WCAG 2.1 compliance, keyboard navigation, screen reader support
- Files: All layout templates
- Risk: Custom hero section with absolutely positioned elements may have accessibility issues; animations may distract screen reader users
- Priority: Medium

**No Performance Testing:**
- What's not tested: Core Web Vitals (LCP, FID, CLS); build time performance; CSS payload size
- Files: CSS files, JavaScript animations
- Risk: Slow site may rank lower in search results; visitors on slow connections experience long load times
- Priority: Medium - affects SEO and user experience

---

*Concerns audit: 2026-02-16*
