# External Integrations

**Analysis Date:** 2026-02-22

## APIs & External Services

**Analytics:**
- Google Analytics - Site traffic and user behavior tracking
  - Configuration: `hugo.yaml` (lines 172-173)
  - Tracking ID: `G-H4LBG7NDFZ` (stored in config)
  - Status: Disabled (`analytics.enable: false`)
  - Available alternatives configured but disabled: Cloudflare, CounterDev, GoatCounter, Matomo, Umami, Statcounter, PostHog

**Comments:**
- Disqus - Comment system
  - Configuration: `hugo.yaml` (lines 134-135)
  - Status: Disabled (`comment.enable: false`)
  - Alternative comment systems available in config but disabled: Valine, Utterances, Giscus, Commento

**Support/Donations:**
- Ko-fi - Donation/tip integration
  - Configuration: `hugo.yaml` (lines 206-210)
  - Status: Disabled (`support.enable: false`)
  - Alternative: Buy Me a Coffee (commented out in config)

**Newsletter:**
- Mailchimp - Newsletter subscription
  - Configuration: `hugo.yaml` (lines 331-335)
  - Status: Disabled (`newsletter.enable: false`)

## Data Storage

**Databases:**
- None - Static site with no dynamic backend
- Data storage: YAML files in `data/` directory
  - `data/en/site.yaml` - Site metadata
  - `data/en/author.yaml` - Author information
  - `data/en/sections/*.yaml` - Portfolio content sections

**File Storage:**
- Local filesystem only
  - Static assets: `static/` directory
  - Asset images: `assets/images/` directory
  - Public output: `public/` directory (generated)

**Caching:**
- None configured - Static site generation handles caching through CDN

## Authentication & Identity

**Auth Provider:**
- None - Static site, no user authentication
- GitHub integration for deployment via GitHub Actions (read-only access to repository)

## Monitoring & Observability

**Error Tracking:**
- None configured - Static site with no backend error tracking
- Build logs available via GitHub Actions (`/.github/workflows/hugo.yaml`)

**Logs:**
- GitHub Actions logs - Build and deployment pipeline logs
  - Workflow file: `/.github/workflows/hugo.yaml`
  - Build steps include Hugo CLI installation, dependency installation, site build, and artifact upload

## CI/CD & Deployment

**Hosting:**
- GitHub Pages - Primary hosting platform
  - Domain: hatemfeki.com (custom domain via DNS)
  - Default branch: main
  - Auto-deployment on push

**CI Pipeline:**
- GitHub Actions - Automated build and deployment
  - Workflow file: `/.github/workflows/hugo.yaml`
  - Trigger: Push to main branch or manual dispatch
  - Build steps:
    1. Install Hugo CLI (v0.146.0)
    2. Checkout repository with submodules (includes Toha theme)
    3. Setup GitHub Pages environment
    4. Install Node.js dependencies via npm
    5. Build site with Hugo (with garbage collection and minification)
    6. Upload artifact to GitHub Pages
    7. Deploy to GitHub Pages

**Build Environment:**
- OS: Ubuntu latest
- Hugo: Extended version 0.146.0
- Node.js: Latest available in GitHub Actions environment
- Deploy token: `GITHUB_TOKEN` (GitHub Actions automatic token)

## Environment Configuration

**Required env vars:**
- `HUGO_ENVIRONMENT: production` - Hugo build environment
- `HUGO_ENV: production` - Legacy Hugo environment variable
- GitHub Actions built-in: `runner.temp`, `github.workspace`

**Secrets location:**
- Google Analytics ID: Hardcoded in `hugo.yaml` (not sensitive)
- Ko-fi user: Hardcoded in `hugo.yaml` (not sensitive, public information)
- Disqus shortName: Hardcoded in `hugo.yaml` (not sensitive)
- No sensitive credentials detected in codebase
- GitHub token: Automatically managed by GitHub Actions

## Webhooks & Callbacks

**Incoming:**
- GitHub webhook - Automatic trigger on push to main branch
  - Configured via GitHub Pages settings
  - No custom webhook endpoints

**Outgoing:**
- None detected - Static site has no outgoing webhooks or callbacks

## External Theme & Module Dependencies

**Hugo Module:**
- `github.com/hugo-toha/toha/v4` - Portfolio theme
  - Source: GitHub (official Toha theme repository)
  - Local override: `./themes/toha` (development mode)
  - Submodule: `themes/toha` (referenced in `.gitmodules`)
  - Provides:
    - Responsive HTML templates
    - Navigation and footer components
    - Portfolio section rendering
    - Blog/notes feature templates
    - Dark/light theme support
    - Multi-language support structure

## Font & Icon Services

**Google Fonts:**
- Source: `https://fonts.googleapis.com`
- Font: Cormorant Garamond (italic and regular weights)
- Import: CSS `@import` in `assets/styles/override.scss` (line 5)

**Local Font Files:**
- Mulish (via @fontsource/mulish 4.5.13)
- KaTeX mathematical fonts (via katex 0.16.11)
- Mounted to `static/fonts/` during build

---

*Integration audit: 2026-02-22*
