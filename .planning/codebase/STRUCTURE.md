# Codebase Structure

**Analysis Date:** 2026-02-22

## Directory Layout

```
my-portfolio/
├── .planning/              # GSD planning and documentation
│   └── codebase/          # Codebase analysis documents
├── .github/               # GitHub configuration
│   └── workflows/         # GitHub Actions CI/CD workflows
├── assets/                # Custom assets for branding
│   ├── styles/           # Custom SCSS overrides
│   ├── scripts/          # Custom JavaScript entry point
│   └── images/           # Author and site images
├── data/                 # YAML configuration for content
│   └── en/              # English language data files
│       ├── sections/    # Portfolio section definitions
│       ├── author.yaml  # Author profile information
│       └── site.yaml    # Global site metadata
├── content/             # Blog posts and notes (markdown)
│   ├── posts/          # Blog post directories
│   └── notes/          # Educational notes/documentation
├── layouts/             # Custom HTML templates
│   └── partials/       # Template partials for reuse
│       ├── sections/   # Portfolio section templates
│       └── navigators/ # Navigation bar templates
├── static/             # Static files (no processing)
│   ├── videos/        # Video assets
│   └── files/         # Document downloads
├── themes/             # Theme directory
│   └── toha/          # Toha Hugo theme (git submodule)
│       ├── layouts/   # Theme default templates
│       ├── assets/    # Theme styles and scripts
│       └── i18n/      # Theme translations
├── public/            # Generated site (not committed)
├── resources/         # Hugo cache directory (not committed)
├── archetypes/        # Hugo content templates
├── Makefile          # Build and deployment commands
├── hugo.yaml         # Hugo configuration
├── go.mod / go.sum   # Hugo module dependencies
├── package.json      # npm dependencies
└── .gitignore       # Git exclusions
```

## Directory Purposes

**assets/:**
- Purpose: Brand-specific customization and overrides
- Contains: SCSS stylesheets, JavaScript initialization, site-specific images
- Key files: `override.scss` (brand colors, typography, component styles), `application.js` (npm imports and initialization)

**data/en/:**
- Purpose: Structured data source for dynamic portfolio sections
- Contains: YAML files defining content for each portfolio section
- Key files: `author.yaml` (personal info), `site.yaml` (SEO/site metadata), `sections/*.yaml` (About, Skills, Projects, Experience, Education, Achievements, Accomplishments, Publications)

**layouts/partials/:**
- Purpose: Custom template partials for theme extension
- Contains: Portfolio-specific section layouts and navigation components
- Key files: `sections/home.html` (hero section with animations), `navigators/navbar.html` (navigation bar)

**content/:**
- Purpose: Blog posts and educational notes (currently disabled in config)
- Contains: Markdown files organized by category and language
- Structure: Language-specific subdirectories with index files and asset folders

**themes/toha/:**
- Purpose: Base theme providing default layouts, styles, and scripts
- Contains: Complete Hugo theme imported via git submodule and Hugo modules
- Note: Do not edit directly; use customization layer in assets/ instead

**static/:**
- Purpose: Assets served as-is (no processing by Hugo)
- Contains: Videos, downloadable files, static documents
- Key files: None (custom user additions go here)

**.planning/:**
- Purpose: GSD planning documents and project state
- Contains: Codebase analysis, quick task plans, project state tracking
- Key files: `codebase/` analysis documents (ARCHITECTURE.md, STRUCTURE.md, etc.)

## Key File Locations

**Entry Points:**
- `hugo.yaml`: Main Hugo configuration and build entry point
- `layouts/partials/sections/home.html`: Custom hero section template
- `assets/scripts/application.js`: JavaScript entry point for npm bundling

**Configuration:**
- `hugo.yaml`: Hugo build config, feature toggles, baseURL, module imports
- `data/en/site.yaml`: Site-wide SEO, copyright, disclaimer, footer config
- `data/en/author.yaml`: Author profile (name, contact, summary)
- `package.json`: npm dependencies (Bootstrap, FontAwesome, etc.)

**Core Logic:**
- `layouts/partials/navigators/navbar.html`: Dynamic navigation bar with section links and logo swapping
- `layouts/partials/sections/home.html`: Hero section with BlurText animation, TypeIt typing animation, scroll handler
- `assets/styles/override.scss`: Brand color system, typography scale, section-specific styles
- `assets/scripts/application.js`: Dependency imports (Bootstrap, FontAwesome, custom icons)

**Portfolio Content:**
- `data/en/sections/about.yaml`: About section content
- `data/en/sections/skills.yaml`: Skills with categories
- `data/en/sections/projects.yaml`: Project showcase cards
- `data/en/sections/experiences.yaml`: Work experience timeline
- `data/en/sections/education.yaml`: Education timeline
- `data/en/sections/achievements.yaml`: Awards and recognitions
- `data/en/sections/accomplishments.yaml`: Accomplishments
- `data/en/sections/publications.yaml`: Research/article publications

**Styling:**
- `assets/styles/override.scss`: Custom SCSS with CSS variable system and component overrides

## Naming Conventions

**Files:**
- Configuration: `hugo.yaml`, `package.json`
- YAML data files: Lowercase with hyphens (`author.yaml`, `site.yaml`)
- HTML templates: Lowercase with hyphens (`home.html`, `navbar.html`)
- SCSS files: Lowercase with hyphens (`override.scss`)
- JavaScript files: camelCase (`application.js`)

**Directories:**
- Features: Lowercase with hyphens (`partials/`, `sections/`, `navigators/`)
- Language codes: Two-letter codes (`en/`, `bn/`)
- Content organization: Logical categories (`posts/`, `notes/`, `images/`, `scripts/`, `styles/`)

**HTML Classes/IDs:**
- Classes: Kebab-case (`.navbar-pill-container`, `.hero-image-container`, `.section-title`)
- IDs: Kebab-case with functional prefixes (`#hero-name`, `#custom-hero`, `#top-navbar`)
- Data attributes: Kebab-case (`data-delay`, `data-text`, `data-theme`)

**CSS Variables:**
- Color variables: `--hero-bg-color`, `--hero-text-color`, `--hero-accent-color`
- Typography: `--font-display`, `--font-ui`, `--text-base`, `--text-lg`
- Spacing: `--tracking-normal`, `--tracking-wide`, `--tracking-wider`

## Where to Add New Code

**New Portfolio Section:**
1. Create YAML data file: `data/en/sections/[section-name].yaml`
2. Reference theme template (theme handles rendering) or override in: `layouts/partials/sections/[section-name].html`
3. Add styling rules in: `assets/styles/override.scss` targeting `.` + section class
4. Register in: `hugo.yaml` features if feature-gated

**Custom Component/Template:**
- Custom partials: `layouts/partials/[category]/[component-name].html`
- Include in templates using: `{{ partial "category/component-name" . }}`

**Styling Changes:**
- All branding changes: `assets/styles/override.scss` using CSS variables defined at top
- Do NOT edit `themes/toha/assets/` directly
- Use `!important` only when necessary to override theme defaults

**JavaScript/Interactivity:**
- New feature modules: `assets/scripts/features/[feature-name].js`
- Import in: `assets/scripts/application.js`
- Inline scripts acceptable for single-page animations (see `home.html` hero animations)

**Static Assets:**
- Images: `assets/images/` for processed images or `static/images/` for static files
- Videos: `static/videos/`
- Documents: `static/files/`

## Special Directories

**themes/toha/:**
- Purpose: Base theme from Hugo registry
- Generated: No (git submodule)
- Committed: Yes (via .gitmodules reference)
- Edit Policy: Never edit directly; customize via `assets/` and `layouts/` overrides

**public/:**
- Purpose: Generated static site
- Generated: Yes (Hugo build output)
- Committed: No (in .gitignore)
- Do NOT manually edit

**resources/:**
- Purpose: Hugo resource cache (compiled SCSS, images, etc.)
- Generated: Yes (Hugo build process)
- Committed: No (in .gitignore)

**.planning/codebase/:**
- Purpose: GSD codebase analysis and documentation
- Generated: Yes (by GSD map-codebase command)
- Committed: Yes
- Contents: ARCHITECTURE.md, STRUCTURE.md, CONVENTIONS.md, TESTING.md, STACK.md, INTEGRATIONS.md, CONCERNS.md

**node_modules/:**
- Purpose: npm dependencies
- Generated: Yes (npm install)
- Committed: No (in .gitignore)

---

*Structure analysis: 2026-02-22*
