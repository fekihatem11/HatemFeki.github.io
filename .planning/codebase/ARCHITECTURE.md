# Architecture

**Analysis Date:** 2026-02-16

## Pattern Overview

**Overall:** Static Site Generator (Hugo) with Theme-Based Component Architecture

**Key Characteristics:**
- Hugo module-based theming system using toha/v4 theme as base
- Data-driven content model with YAML configuration files
- Partial-based template composition for UI components
- Asset processing pipeline with SCSS and JavaScript bundling
- Separation between theme code (git submodule) and site content/customization

## Layers

**Content Layer:**
- Purpose: Defines portfolio structure, projects, experiences, and skills
- Location: `data/en/` and `content/`
- Contains: YAML data files for portfolio sections (skills, experiences, education, projects, achievements)
- Depends on: Theme partials for rendering
- Used by: Hugo template engine to generate HTML pages

**Data Configuration Layer:**
- Purpose: Centralized configuration of all portfolio content sections
- Location: `data/en/sections/` (about.yaml, skills.yaml, projects.yaml, experiences.yaml, education.yaml, accomplishments.yaml, achievements.yaml, publications.yaml, featured-posts.yaml, recent-posts.yaml)
- Contains: Section metadata (enable/disable, weight for ordering, showOnNavbar flags), content arrays for skills, projects, experiences
- Depends on: Nothing (static configuration)
- Used by: Theme partials and layouts for rendering sections

**Theme Layer:**
- Purpose: Provides reusable UI components, layouts, and styling
- Location: `themes/toha/` (git submodule replacement)
- Contains: Partial templates in `layouts/partials/`, SCSS in `assets/`, i18n files, component-level logic
- Depends on: Bootstrap framework, FontAwesome icons, JavaScript libraries (highlight.js, fuse.js, katex, mermaid, plyr, typeit)
- Used by: Main layout files and custom overrides

**Customization Layer:**
- Purpose: Site-specific overrides and extensions to theme
- Location: `layouts/partials/sections/`, `assets/styles/override.scss`, custom templates
- Contains: Homepage hero section override, site-wide style overrides, custom color variables
- Depends on: Theme layer base styles and partials
- Used by: Index layout to render custom homepage

**Static Assets Layer:**
- Purpose: Non-content media and downloadable resources
- Location: `static/` and `assets/images/`
- Contains: Images (author, site logos, skill icons, section images), PDFs, videos, CSS font files
- Depends on: Nothing (pure assets)
- Used by: Templates and content for rendering

## Data Flow

**Page Generation Flow:**

1. Hugo reads `hugo.yaml` configuration (baseURL, module imports, output formats, language settings)
2. Hugo loads theme via module import: `github.com/hugo-toha/toha/v4` (replaced with local `./themes/toha`)
3. Hugo processes `data/en/` YAML files into data object accessible in templates
4. Hugo loads custom `layouts/index.html` as home page template
5. Home layout renders:
   - Head with meta tags (description from `data/en/site.yaml`)
   - Navbar partial (`navigators/navbar.html`)
   - Home section partial (`sections/home.html`)
   - Indexed sections from `data/en/sections/*` based on `section.weight`
   - Each section conditionally renders theme partial or custom template
   - Footer partial with template option
   - Common scripts partial
6. Each section partial (from theme) iterates over data arrays to render cards/entries
7. SCSS processed: theme base styles + `assets/styles/override.scss` custom overrides
8. JavaScript bundled: theme scripts + custom theme-scheme.js
9. Output written to `public/` directory

**Data-Driven Rendering:**

- Config sections array: `site.Data.sections` → loops through with weight sorting
- Per-section data: `site.Data.en.sections[section_id]` → provides content for cards
- Author data: `site.Data.en.author` → used in header/footer
- Site metadata: `site.Data.en.site` → used in footer and meta tags

**State Management:**

- Static content only - no runtime state management
- Configuration state stored in YAML files
- Build-time only - all pages generated once
- Client-side interactivity via JavaScript (theme switching, search, smooth scroll)

## Key Abstractions

**Section:**
- Purpose: Represents a portfolio section (About, Skills, Projects, etc.)
- Examples: `data/en/sections/about.yaml`, `data/en/sections/skills.yaml`, `data/en/sections/projects.yaml`
- Pattern: YAML with `section` metadata object (name, id, enable, weight, showOnNavbar, template) + content data

**Partial Component:**
- Purpose: Reusable template snippet for rendering specific UI elements
- Examples: `themes/toha/layouts/partials/sections/skills.html`, `themes/toha/layouts/partials/cards/skill.html`
- Pattern: Small focused templates that receive data context and output HTML

**Card (Entry):**
- Purpose: Individual item display within a section (skill card, project card, experience timeline entry)
- Examples: `skill.html` for skills, `post.html` for blog posts, `accomplishments.html` for badges
- Pattern: Template receives item data from array, renders consistent styled HTML

**Theme Override:**
- Purpose: Custom implementation replacing theme default
- Examples: `layouts/partials/sections/home.html` custom hero section, `assets/styles/override.scss` for styling
- Pattern: File in project mirrors theme path to override that component

## Entry Points

**Main Homepage:**
- Location: `layouts/index.html`
- Triggers: Root URL `/` request or Hugo build
- Responsibilities:
  - Sets up HTML document structure
  - Imports partials for head (meta tags, analytics, theme script)
  - Imports navbar and home sections
  - Iterates through enabled data sections sorted by weight
  - Renders each section with theme partial or custom template
  - Imports footer and common scripts

**Home Section:**
- Location: `layouts/partials/sections/home.html` (custom override)
- Triggers: Main layout partial include
- Responsibilities:
  - Renders hero banner with author image, greeting, name, role
  - Displays background text and scroll indicator
  - Applies custom animations and hero-specific styling

**Individual Section Partials:**
- Location: `themes/toha/layouts/partials/sections/{section-id}.html`
- Triggers: Dynamic partial include based on data section id
- Responsibilities:
  - Fetch section data from `site.Data.en.sections[id]`
  - Iterate over items in section data
  - Render appropriate card partial for each item
  - Handle filtering (if enabled in section config)

## Error Handling

**Strategy:** Build-time validation only - no runtime error handling

**Patterns:**
- Missing data file → Hugo build fails with clear file not found error
- Invalid YAML syntax → Hugo build fails with parse error
- Undefined template partial → Hugo build fails with partial not found error
- Conditional rendering: `{{ if .section.enable }}` prevents rendering disabled sections
- Safe template access: `{{ with .Site.Data ... }}` prevents nil pointer errors

## Cross-Cutting Concerns

**Styling:**
- Base: Bootstrap 5.3.3 (from theme)
- Custom: `assets/styles/override.scss` with CSS variables for theme colors
- Approach: SCSS preprocessed during build, CSS variables override theme defaults
- Custom variables: `--hero-bg-color`, `--hero-text-color`, `--hero-accent-color`, `--hero-bone-color`

**Theming:**
- Light/dark mode support via data attribute `[data-theme='light'|'dark']`
- Theme script: `assets/scripts/core/theme-scheme.js` (inlined for performance)
- CSS selectors for theme-specific styling throughout override.scss

**Internationalization:**
- Language structure: `data/{lang}/` directories (en/ configured, bn/ deleted)
- Translation files: `themes/toha/i18n/` for UI strings
- Current language: defaultContentLanguage: en in hugo.yaml
- Fallback: English content used if language-specific version missing

**Analytics:**
- Conditional: enabled via `params.features.analytics.enable`
- Google Analytics configured: `id: G-H4LBG7NDFZ`
- Implementation: Partial `partials/analytics.html` conditionally loaded

**SEO & Meta:**
- Site title from `hugo.yaml`
- Meta description from `data/en/site.yaml` with override in params
- OpenGraph tags: `partials/opengraph.html`
- Sitemap generation enabled with monthly update frequency
- RSS feed at `/rss/` endpoint

**Navigation:**
- Navbar: `partials/navigators/navbar.html`
- Links auto-generated from enabled sections with weights for ordering
- Top navbar config limits visible sections: `maxVisibleSections: 5`
- Custom menus supported via `data/en/site.yaml` customMenus array

---

*Architecture analysis: 2026-02-16*
