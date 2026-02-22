# Architecture

**Analysis Date:** 2026-02-22

## Pattern Overview

**Overall:** Static site generator with theme-based architecture using Hugo modules and custom overrides.

**Key Characteristics:**
- Multi-language support (currently English configured)
- Component-based section system with Toha theme as base
- YAML-driven content configuration for portfolio sections
- Custom SCSS/JS layer for branding and interactivity
- Asset pipeline with npm package management

## Layers

**Hugo Core (Generator):**
- Purpose: Template rendering and static site generation
- Location: `hugo.yaml` (configuration), `themes/toha/` (base theme)
- Contains: Hugo modules, output formats, markup configuration
- Depends on: Theme system, content directory
- Used by: Build process to generate public/ files

**Theme Layer:**
- Purpose: Default templates, layouts, styles, and scripts
- Location: `themes/toha/`
- Contains: `layouts/`, `assets/styles/`, `assets/scripts/`, `i18n/` files
- Depends on: Hugo module system
- Used by: Site generation and customization layer

**Customization Layer:**
- Purpose: Brand-specific overrides and enhancements
- Location: `assets/styles/override.scss`, `assets/scripts/application.js`, `layouts/partials/`
- Contains: Custom SCSS variables, feature imports, partial templates
- Depends on: Theme layer assets and structure
- Used by: Hugo to merge with theme during build

**Content/Data Layer:**
- Purpose: Portfolio and site configuration as structured data
- Location: `data/en/` (YAML configuration), `content/posts/` (markdown posts)
- Contains: Author info, section metadata, blog posts
- Depends on: Hugo template system
- Used by: Templates to render sections dynamically

**Assets Layer:**
- Purpose: Static resources and compiled assets
- Location: `assets/` and `static/` directories
- Contains: Images, styles, scripts, fonts
- Depends on: npm packages (Bootstrap, FontAwesome, etc.)
- Used by: Hugo pipeline to include in final site

## Data Flow

**Portfolio Rendering Flow:**

1. Hugo loads `hugo.yaml` configuration
2. Theme system imports via Hugo modules from `themes/toha/v4`
3. Custom overrides load from `assets/styles/override.scss` and `assets/scripts/application.js`
4. Data files loaded: `data/en/author.yaml`, `data/en/site.yaml`, `data/en/sections/*.yaml`
5. Layout templates from `layouts/partials/` and theme merge with data
6. JavaScript initialization runs in browser (TypeIt animations, custom scroll handlers)
7. SCSS compiles with custom CSS variables for brand colors
8. Final HTML generated to `public/` directory

**State Management:**

- **Server-side:** Hugo template variables and data structures (immutable at build time)
- **Client-side:** DOM manipulation via vanilla JS in `application.js` and inline scripts
  - Hero animation state tracked via `data-delay` and `data-text` attributes
  - Dark/light theme state stored via `data-theme` HTML attribute
  - Navigation state managed through Bootstrap collapse component

## Key Abstractions

**Section System:**
- Purpose: Reusable portfolio section components (About, Skills, Projects, etc.)
- Examples: `themes/toha/layouts/partials/sections/about.html`, `data/en/sections/projects.yaml`
- Pattern: Data-driven rendering where YAML defines content, templates define presentation

**Theme Configuration:**
- Purpose: Centralized feature toggling and customization
- Examples: `hugo.yaml` params for features (portfolio, blog, comments), `data/en/site.yaml` for metadata
- Pattern: YAML configuration objects translated to template variables

**Custom Hero Section:**
- Purpose: Landing page with animated text and profile image
- Examples: `layouts/partials/sections/home.html`, inline `<script>` with BlurText and TypeIt animations
- Pattern: Hugo template with embedded vanilla JS for client-side interactivity

**Navigation Pill Container:**
- Purpose: Styled navbar with icon/text toggle and smooth scrolling
- Examples: `layouts/partials/navigators/navbar.html`, `assets/styles/override.scss` lines 481-561
- Pattern: Bootstrap navbar with custom SCSS styling and JavaScript event listeners

## Entry Points

**Homepage:**
- Location: `layouts/partials/sections/home.html`
- Triggers: Hugo generates index.html which loads this partial
- Responsibilities: Display hero section with animated text, profile image, typing animations, and scroll indicator

**Navigation:**
- Location: `layouts/partials/navigators/navbar.html`
- Triggers: Loaded by theme's base layout template on every page
- Responsibilities: Render navbar with dynamic section links, logo swapping, smooth scroll handling

**Application Bootstrap:**
- Location: `assets/scripts/application.js`
- Triggers: Bundled by Hugo and executed on page load
- Responsibilities: Import dependencies (Popper, Bootstrap, FontAwesome), initialize icon replacement, import feature modules

**Data-Driven Sections:**
- Location: `data/en/sections/` (YAML files)
- Triggers: Hugo template loops over section files
- Responsibilities: Define section content structure consumed by theme partials

## Error Handling

**Strategy:** Graceful degradation with fallback HTML

**Patterns:**
- Missing images: `{{ else }} <div>Image not found</div> {{ end }}` in `layouts/partials/sections/home.html`
- Missing data: Hugo template `| default` filters provide fallbacks (e.g., `$author.name | default "HATEM FEKI"`)
- Scroll history: Browser history API with window.onbeforeunload fallback for scroll restoration

## Cross-Cutting Concerns

**Logging:** Not implemented (static site, no server runtime)

**Validation:** Hugo template type-checking and YAML schema (implicit through data structure)

**Authentication:** Not applicable (public portfolio site)

**Branding:** Centralized CSS variables in `assets/styles/override.scss` (lines 7-33):
- Color palette (hero-bg-color, hero-text-color, hero-accent-color, hero-bone-color)
- Typography (Cormorant Garamond for display, Mulish for UI)
- Typography scale (--text-xs through --text-4xl)

**Styling:** Custom SCSS layer applies to all theme components via !important overrides to ensure brand consistency despite theme default styles

---

*Architecture analysis: 2026-02-22*
