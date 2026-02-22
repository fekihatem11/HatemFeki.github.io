# Technology Stack

**Analysis Date:** 2026-02-22

## Languages

**Primary:**
- Go 1.21 - Hugo theme module and site build configuration
- HTML - Template rendering via Hugo
- SCSS - Stylesheet compilation for site themes
- YAML - Site configuration and data files

**Secondary:**
- JavaScript - Frontend dependencies and asset libraries (packaged via npm)

## Runtime

**Environment:**
- Hugo 0.146.0 (extended version with SCSS support)
  - Installed via GitHub Actions workflow
  - Used for static site generation and theme rendering

**Package Manager:**
- npm (Node.js package manager)
- Lockfile: `package-lock.json` present

## Frameworks

**Core:**
- Hugo (Static Site Generator) - Portfolio and blog site generation
- Toha v4 - Hugo theme (imported as module: `github.com/hugo-toha/toha/v4`)
  - Location: `themes/toha` (local replacement via `go.mod`)
  - Provides responsive portfolio template with multi-language support

**Frontend Libraries:**
- Bootstrap 5.3.3 - UI component framework
- Feather Icons 4.29.1 - Icon library
- Font Awesome Free 6.6.0 - Icon set
- Mulish 4.5.13 - Sans-serif font (via @fontsource)
- Cormorant Garamond - Display serif font (Google Fonts)

**Code Highlighting:**
- Highlight.js 11.6.0 - Syntax highlighting for code blocks
- KaTeX 0.16.11 - Mathematical expression rendering

**Interactive Components:**
- Mermaid 11.10.0 - Flowchart and diagram generation
- Plyr 3.7.2 - Video/audio player
- TypeIt 8.8.7 - Animated text typing effect
- Filterizr 2.2.4 - Portfolio filtering/sorting
- Fuse.js 6.6.2 - Fuzzy search library
- mark.js 8.11.1 - Text highlighting/marking
- ImagesLoaded 5.0.0 - Image loading detection
- Popper.js 1.16.1 / @popperjs/core 2.11.8 - Tooltip positioning

**Utilities:**
- include-media 1.4.10 - SCSS media query mixins
- flag-icons 7.2.3 - Country flag SVG icons

## Key Dependencies

**Critical:**
- Bootstrap 5.3.3 - Core responsive layout and components
- Toha v4 theme - Entire site template, navigation, and portfolio layout
- Hugo 0.146.0 - Static site generation engine

**Infrastructure:**
- @popperjs/core 2.11.8 - Tooltip/popover positioning engine
- Mermaid 11.10.0 - Diagram rendering for technical content
- KaTeX 0.16.11 - LaTeX math formula rendering

**Development:**
- ESLint 8.31.0 - JavaScript linting
- eslint-config-standard 17.0.0 - ESLint standard configuration
- eslint-config-prettier 8.6.0 - Prettier integration for ESLint
- eslint-plugin-import 2.26.0 - Import statement validation
- eslint-plugin-promise 6.1.1 - Promise/async validation
- eslint-plugin-no-jquery 2.7.0 - jQuery usage prevention
- eslint-plugin-n 15.6.0 - Node.js/CommonJS validation

## Configuration

**Environment:**
- Hugo configuration: `hugo.yaml` (YAML format)
- Site base URL: `https://hatemfeki.com/`
- Language: English (en) with future multi-language support structure
- Content location: `data/` directory (YAML files for sections, author, site metadata)

**Build:**
- Hugo configuration file: `hugo.yaml`
- Go modules: `go.mod`, `go.sum`
- Node modules: `package.json`, `package-lock.json`

**Asset Configuration:**
- Custom SCSS overrides: `assets/styles/override.scss`
- Google Fonts import: Cormorant Garamond
- Hugo mounts configured for:
  - Static files: `static/files` → `static/files`
  - Flag icons: `node_modules/flag-icons/flags` → `static/flags`
  - Font files: `node_modules/@fontsource/mulish/files` → `static/files`
  - KaTeX fonts: `node_modules/katex/dist/fonts` → `static/fonts`

**Linting:**
- ESLint configuration included via `.eslintrc` (inherited from Toha theme)
- Prettier integration for code formatting

## Platform Requirements

**Development:**
- Node.js (version not explicitly specified, but package-lock.json v3 implies Node 14+)
- npm (for dependency management)
- Go 1.21 (for Hugo module resolution)
- Hugo extended 0.146.0 (for SCSS compilation)

**Production:**
- Deployment target: GitHub Pages (via GitHub Actions)
- Build environment: Ubuntu latest (specified in GitHub Actions workflow)
- Custom domain: hatemfeki.com (configured via DNS)

---

*Stack analysis: 2026-02-22*
