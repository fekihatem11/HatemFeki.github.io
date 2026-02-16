# Technology Stack

**Analysis Date:** 2026-02-16

## Languages

**Primary:**
- Go 1.21 - Hugo theme module dependencies via `go.mod`
- YAML - Site configuration and data files (`hugo.yaml`, `data/en/*.yaml`)
- HTML - Template files for theme customization (`layouts/`)
- CSS/SCSS - Styling through theme assets (`assets/styles/`)
- JavaScript - Frontend interactivity and feature implementations

**Secondary:**
- Markdown - Content source files for blog posts and portfolio items (`content/`)

## Runtime

**Environment:**
- Hugo 0.146.0 - Static site generator (specified in `.github/workflows/hugo.yaml`)
- Node.js 18+ - Package management and asset bundling (uses npm)

**Package Manager:**
- npm - Node package manager
- Lockfile: `package-lock.json` present

## Frameworks

**Core:**
- Hugo v0.146.0 - Static site generator for portfolio
- Toha v4 (github.com/hugo-toha/toha/v4) - Hugo theme module for portfolio template
  - Implements portfolio sections: About, Skills, Experiences, Projects, Publications, etc.
  - Location: `themes/toha/` (local fork) and imported as Hugo module
  - Configured in `hugo.yaml` under `module.imports`

**Frontend Libraries:**
- Bootstrap 5.3.3 - CSS framework for responsive design
- Feather Icons 4.29.1 - Icon library for UI elements
- Font Awesome Free 6.6.0 - Extended icon set
- Mulish 4.5.13 (@fontsource) - Custom font family
- Flag Icons 7.2.3 - Country/language flag icons

**Interactive Features:**
- Mermaid 11.10.0 - Flowchart and diagram generation
- KaTeX 0.16.11 - Mathematical expression rendering
- Highlight.js 11.6.0 - Code syntax highlighting
- Plyr 3.7.2 - Video/audio player
- TypeIt 8.8.7 - Typing animation library
- Mark.js 8.11.1 - Text search and highlighting
- Fuse.js 6.6.2 - Fuzzy search implementation
- Filterizr 2.2.4 - Portfolio item filtering
- ImagesLoaded 5.0.0 - Image loading utility
- Popper.js 1.16.1 - Tooltip/popover positioning

**Build/Dev:**
- ESLint 8.31.0 - JavaScript linting
  - Config: Standard config with Prettier integration
  - Plugins:
    - eslint-config-standard 17.0.0
    - eslint-config-prettier 8.6.0
    - eslint-plugin-import 2.26.0
    - eslint-plugin-n 15.6.0
    - eslint-plugin-promise 6.1.1
    - eslint-plugin-no-jquery 2.7.0

**Media & Content:**
- loadjs - Dynamic script loading utility (for feature modules)
- roughjs - Rough/sketched rendering style

## Key Dependencies

**Critical:**
- Bootstrap 5.3.3 - Core responsive framework, used throughout all page layouts
- Hugo Toha theme (v4) - Entire portfolio structure and styling foundation
- Mermaid 11.10.0 - Essential for flowchart/diagram blocks in content

**Infrastructure:**
- Hugo modules system - Handles theme management and asset mounting
- npm packages - Client-side JavaScript features and icon/font assets

## Configuration

**Environment:**
- Hugo configuration: `hugo.yaml`
  - baseURL: https://hatemfeki.com/
  - defaultContentLanguage: en
  - Production-aware build settings via Hugo environment variables
- Site data: `data/en/site.yaml` (language-specific configuration)
- Author data: `data/en/author.yaml`
- Section configurations: `data/en/sections/*.yaml`

**Build:**
- Build config file: `hugo.yaml`
- Hugo modules configured to mount node_modules assets:
  - `node_modules/flag-icons/flags` → `static/flags`
  - `node_modules/@fontsource/mulish/files` → `static/files`
  - `node_modules/katex/dist/fonts` → `static/fonts`
  - `static/files` → `static/files`

**Development:**
- Local Hugo theme fork at `themes/toha/` with module replacement in `go.mod`:
  ```
  replace github.com/hugo-toha/toha/v4 => ./themes/toha
  ```
- This allows local customization while maintaining the parent theme structure

## Platform Requirements

**Development:**
- Hugo CLI (Extended version required for SCSS support)
- Node.js 18+ with npm
- Git for version control
- Go 1.21+ (for Hugo module system)

**Production:**
- Hosting: GitHub Pages (via GitHub Actions)
- Static file serving only (no backend required)
- HTTPS support (custom domain: hatemfeki.com)

---

*Stack analysis: 2026-02-16*
