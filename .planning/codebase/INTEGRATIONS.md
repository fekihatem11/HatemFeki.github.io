# External Integrations

**Analysis Date:** 2026-02-16

## APIs & External Services

**Analytics (Conditionally Enabled):**
- Google Analytics - Website traffic and user behavior tracking
  - Configuration ID: `G-H4LBG7NDFZ`
  - Status: Currently disabled (analytics.enable: false in hugo.yaml)
  - Implementation: `themes/toha/layouts/partials/google_analytics.html`
  - Trigger: Loads in production (hugo.IsProduction) when enabled

**Alternative Analytics Providers (Configured but Disabled):**
- Counter.dev - Analytics tracking service
- GoatCounter - Privacy-focused analytics
- Cloudflare Web Analytics - CDN-integrated analytics
- Matomo/Piwik - Self-hosted analytics alternative
  - Client: `themes/toha/assets/scripts/features/analytics/matomo.js`
- Umami - Privacy-focused analytics
- PostHog - Product analytics platform
  - Client: `themes/toha/assets/scripts/features/analytics/posthog.js`
- Statcounter - Analytics and heatmap tracking
  - Client: `themes/toha/assets/scripts/features/analytics/statcounter.js`

**Support/Donation Services:**
- Ko-fi - Tipping/support platform
  - Status: Disabled (support.enable: false in hugo.yaml)
  - Configuration available in `hugo.yaml` params.features.support

## Data Storage

**Content Storage:**
- Markdown files in `content/` directory (posts, notes, portfolio items)
- YAML data files in `data/en/` for structured content:
  - `author.yaml` - Author information
  - `site.yaml` - Site-wide settings
  - `sections/*.yaml` - Portfolio sections (experiences, education, projects, etc.)

**Static File Storage:**
- Local filesystem at `static/` and `assets/`
- Images in `assets/images/` for optimized processing
- Generated output in `public/` (committed to git)

**File Storage:**
- No external cloud storage - all files committed to Git repository
- GitHub as primary repository: github.com/fekihatem11/HatemFeki.github.io

**Caching:**
- None - Static site generated fresh on each build
- Browser caching via HTTP headers configured through Hugo

## Authentication & Identity

**Auth Provider:**
- None - Static portfolio site with no backend authentication
- No user accounts or login system

**Social Links:**
- Managed via `data/en/author.yaml` (social media profiles)
- No OAuth or third-party identity provider integration

## Monitoring & Observability

**Error Tracking:**
- None configured - Static site with no error tracking service

**Logs:**
- GitHub Actions build logs available in `.github/workflows/` output
- No application-level logging
- No error reporting service

## CI/CD & Deployment

**Hosting:**
- GitHub Pages - Automatic deployment from main branch
- Custom domain: hatemfeki.com
- HTTPS enabled via GitHub Pages/custom domain

**CI Pipeline:**
- GitHub Actions workflow: `.github/workflows/hugo.yaml`
- Triggers: Push to main branch or manual workflow_dispatch
- Build steps:
  1. Install Hugo 0.146.0 (Extended)
  2. Checkout with recursive submodules
  3. Install Node.js dependencies via npm ci
  4. Build with Hugo (--gc --minify flags)
  5. Upload artifact to GitHub Pages
  6. Deploy to GitHub Pages

**Deployment Target:**
- Static HTML/CSS/JS to GitHub Pages
- Served over HTTPS at hatemfeki.com

## Environment Configuration

**Required env vars:**
None explicit in application code. GitHub Actions sets:
- `HUGO_ENVIRONMENT: production`
- `HUGO_ENV: production`
- `HUGO_VERSION: 0.146.0`

**Secrets location:**
- None in codebase
- Handled by GitHub (GitHub Pages deployment token)

## Webhooks & Callbacks

**Incoming:**
- None configured

**Outgoing:**
- None configured
- Analytics services (if enabled) would send outbound tracking requests

## Asset CDNs

**Third-party Resources:**
- Font Awesome assets bundled locally (not CDN-served)
- Bootstrap bundled via npm, assets bundled in Hugo
- KaTeX fonts mounted from `node_modules/katex/dist/fonts`
- Feather Icons bundled from npm
- Flag Icons bundled from npm
- Mulish font bundled from @fontsource

**No external CDN dependencies** - All JavaScript and CSS assets are built locally and served from `public/` directory.

## External Links & References

**Theme Source:**
- Hugo Toha theme: github.com/hugo-toha/toha/v4
- Theme repository provides components, layouts, and styling foundation

**GitHub Integration:**
- Repository: github.com/fekihatem11/HatemFeki.github.io
- gitRepo parameter in `hugo.yaml` points to original example site (not actively used)
- Submodules for theme dependency management

---

*Integration audit: 2026-02-16*
