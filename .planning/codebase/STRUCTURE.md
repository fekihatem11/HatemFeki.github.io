# Codebase Structure

**Analysis Date:** 2026-02-16

## Directory Layout

```
my-portfolio/
├── .github/                    # GitHub Actions CI/CD configuration
├── .planning/                  # GSD planning documents
│   └── codebase/              # Codebase analysis documents
├── assets/                     # Site-specific assets compiled during build
│   ├── images/                # Section-specific images (author, skills, projects, etc.)
│   │   ├── author/            # Author/profile images
│   │   ├── site/              # Site logos and backgrounds
│   │   └── sections/          # Category-specific images
│   ├── styles/                # Custom SCSS overrides
│   └── jsconfig.json          # JavaScript configuration
├── content/                    # Blog posts and notes (currently minimal)
│   ├── posts/                 # Blog post content
│   └── notes/                 # Note content
├── data/                       # Content configuration as YAML
│   └── en/                     # English language content
│       ├── author.yaml        # Author metadata (name, contacts, bio)
│       ├── site.yaml          # Site metadata (copyright, description, OpenGraph)
│       └── sections/          # Portfolio sections configuration
│           ├── about.yaml     # About section with designation and social links
│           ├── skills.yaml    # Skills with categories and logos
│           ├── projects.yaml  # Project portfolio with tags
│           ├── experiences.yaml  # Work experience timeline
│           ├── education.yaml # Education history timeline
│           ├── achievements.yaml # Achievements/certifications section
│           ├── accomplishments.yaml # Accomplishments with badges
│           ├── publications.yaml # Research publications
│           ├── featured-posts.yaml # Featured blog posts
│           └── recent-posts.yaml # Recent posts listing
├── layouts/                    # Custom/override templates
│   ├── index.html             # Homepage layout (main entry point)
│   └── partials/              # Custom partial overrides
│       └── sections/
│           └── home.html      # Custom hero/home section
├── static/                     # Static assets served as-is
│   ├── files/                 # Downloadable files (resume PDFs, etc.)
│   ├── videos/                # Video files
│   ├── CNAME                  # Custom domain configuration (hatemfeki.com)
│   ├── flags/                 # Language flag icons (mounted from node_modules)
│   └── fonts/                 # Font files (mounted from katex, fontsource)
├── themes/                     # Hugo themes
│   └── toha/                  # Toha theme (v4) - git submodule with local replacement
│       ├── layouts/           # Theme templates
│       ├── assets/            # Theme assets (SCSS, JS)
│       ├── data/              # Theme default data
│       ├── i18n/              # Internationalization files
│       ├── exampleSite/       # Example site configuration
│       └── [theme code...]    # Theme logic and components
├── public/                     # Generated output (build artifact)
├── resources/                  # Hugo resource cache (generated)
├── archetypes/                 # Content templates for new posts
├── i18n/                       # Site-level i18n overrides
├── Branding/                   # Branding assets (logos, guidelines)
├── Makefile                    # Build automation
├── hugo.yaml                   # Hugo configuration (build settings, theme imports, features)
├── go.mod                      # Go module file (Hugo module management)
├── go.sum                      # Go module checksums
├── package.json                # Node.js dependencies (theme assets: Bootstrap, FontAwesome, etc.)
├── package-lock.json           # Node.js lockfile
└── .gitignore                  # Git ignore rules
```

## Directory Purposes

**assets/**
- Purpose: Site-specific assets that get processed/compiled during Hugo build
- Contains: SCSS overrides, author images, skill/project logos, section images
- Generated: No - these are source files
- Committed: Yes - all source assets committed to git
- Note: Images organized by section (skills, projects, experiences, education, achievements)

**data/en/sections/**
- Purpose: Content configuration for all portfolio sections
- Contains: YAML files defining section metadata and content arrays (skills, projects, experiences, etc.)
- Key pattern: Each file has `section:` metadata object + content array(s)
- Section weight determines ordering in navbar and page layout
- `enable: true/false` controls visibility of entire section

**data/en/**
- Purpose: Root content configuration
- author.yaml: Personal information (name, email, GitHub, LinkedIn, bio/summary)
- site.yaml: Site metadata for footer and SEO (copyright, description, OpenGraph)

**layouts/index.html**
- Purpose: Main homepage template
- Responsibility: Orchestrates page structure and section rendering
- Process: Reads hugo.yaml config, loads data, conditionally renders sections, includes partials

**layouts/partials/sections/home.html**
- Purpose: Custom hero/landing section (overrides theme default)
- Contains: Complex grid layout for hero banner with author image, greeting, name, role
- Styling: Uses custom CSS variables from override.scss

**static/**
- Purpose: Assets served directly without processing
- CNAME: Custom domain file for GitHub Pages
- files/: Downloadable resources (PDFs, documents)
- videos/: Video files for hero or sections
- flags/, fonts/: Mounted from node_modules during build

**themes/toha/**
- Purpose: Hugo theme providing UI components, partials, and base styling
- Status: Git submodule with local file replacement (via go.mod)
- Key directories:
  - `layouts/partials/sections/`: Individual section templates (skills.html, projects.html, etc.)
  - `layouts/partials/cards/`: Component templates for list items (skill.html, post.html, etc.)
  - `assets/`: Bootstrap framework, SCSS base styles, JavaScript utilities

**assets/styles/override.scss**
- Purpose: Site-wide style customization
- Pattern: Uses CSS custom properties to override theme defaults
- Key variables: `--hero-bg-color`, `--hero-text-color`, `--hero-accent-color`, `--hero-bone-color`
- Scope: Overrides section backgrounds, text colors, card styles, timeline styling, footer

**public/**
- Purpose: Built output directory
- Contains: All generated HTML, CSS, JavaScript, and assets
- Generated: Yes - during `hugo` or `hugo server` build
- Committed: No - added to .gitignore

**resources/**
- Purpose: Hugo resource cache and processed assets
- Generated: Yes - during build process
- Contains: Compiled SCSS, processed images, fingerprinted assets
- Committed: No - cache directory

## Key File Locations

**Entry Points:**
- `layouts/index.html`: Main page template, orchestrates all sections and partials
- `hugo.yaml`: Build configuration with module imports and feature flags

**Configuration:**
- `hugo.yaml`: Hugo build settings, language config, feature enablement (analytics, comments, etc.)
- `go.mod`: Hugo module dependencies (toha/v4 theme replacement)
- `package.json`: Node.js dependencies (Bootstrap, FontAwesome, highlight.js, fuse.js, etc.)

**Core Logic (Theme):**
- `themes/toha/layouts/partials/sections/*.html`: Individual section renderers (about.html, skills.html, projects.html, experiences.html, education.html)
- `themes/toha/layouts/partials/cards/*.html`: Individual item renderers (skill.html, post.html, accomplishment.html)
- `themes/toha/layouts/partials/navigators/navbar.html`: Navigation bar

**Content:**
- `data/en/author.yaml`: Author metadata
- `data/en/site.yaml`: Site metadata
- `data/en/sections/*.yaml`: Portfolio content (skills, projects, experiences, education, achievements, accomplishments, publications)

**Styling:**
- `assets/styles/override.scss`: Custom CSS overrides for theme
- `themes/toha/assets/`: Theme base styles (Bootstrap, base SCSS)

**Customization:**
- `layouts/partials/sections/home.html`: Custom hero section

## Naming Conventions

**Files:**
- Config files: `hugo.yaml`, `go.mod`, `package.json` (snake_case with .yaml/.json extension)
- Data files: `author.yaml`, `site.yaml`, `{section-name}.yaml` (kebab-case)
- Templates: `{section-name}.html`, `{component-name}.html` (kebab-case)
- Styles: `override.scss` (descriptive name for customization)
- Images: descriptive names like `hatem.jpg`, `tensorflow.png`, `kubernetes.png`

**Directories:**
- Content sections: `sections/` contains multiple section YAML files
- Language-specific: `en/`, `bn/` (ISO language codes)
- Type-based: `cards/`, `navigators/`, `misc/`, `comments/` (functional grouping)
- Asset types: `images/`, `styles/`, `scripts/` (resource category)

**Naming for Portfolio Content:**
- Skill names: Title case (e.g., "Kubernetes", "Go Development", "Docker")
- Project tags: lowercase, descriptive (e.g., "professional", "kubernetes", "machine-learning")
- Section ids: kebab-case, must match partial names (e.g., `about`, `skills`, `projects`, `experiences`)
- Image paths: `/images/sections/{category}/{name}.{ext}` (e.g., `/images/sections/skills/kubernetes.png`)

## Where to Add New Code

**New Portfolio Section:**
1. Create data file: `data/en/sections/{section-id}.yaml`
   - Define `section:` metadata (name, id, enable, weight, showOnNavbar)
   - Add content array(s) for items
2. Theme already has partial at `themes/toha/layouts/partials/sections/{section-id}.html` - use as-is OR
3. Create custom partial override at `layouts/partials/sections/{section-id}.html` if custom styling needed
4. Section will auto-render in homepage via Hugo template loop

**New Skill/Project/Experience Entry:**
- Edit appropriate YAML file in `data/en/sections/` (skills.yaml, projects.yaml, experiences.yaml, etc.)
- Add new entry to the items array with required fields (name, logo, summary, etc.)
- Theme will automatically render as new card in that section

**Custom Styling:**
- Edit `assets/styles/override.scss`
- Define new CSS classes or modify existing selectors
- Use CSS variables for colors to match theme: `--hero-bg-color`, `--hero-text-color`, etc.

**New Custom Component:**
- Create partial at `layouts/partials/{type}/{name}.html`
- Component receives context from parent template via `{{ partial "path/to/partial.html" . }}`
- Import and use in appropriate parent template

**New Static Asset:**
- Image: Place in `assets/images/sections/{category}/` and reference as `/images/sections/category/filename.ext`
- File (PDF, doc): Place in `static/files/` and link as `/files/filename.ext`
- Font/library asset: Use npm to add to package.json, Hugo will mount during build

**Build Automation:**
- Add commands to `Makefile`
- Current commands: `make run` (development server), `make deploy` (git push to trigger GitHub Actions)

## Special Directories

**themes/toha/**
- Purpose: Hugo theme with git replacement via go.mod
- Status: Git submodule but replaced with local directory
- Generated: No - theme code maintained in separate repo
- Committed: No - linked via go.mod replacement, not committed to main repo

**public/**
- Purpose: Generated site output
- Generated: Yes - `hugo` command creates entire directory
- Committed: No - .gitignore prevents committing

**resources//**
- Purpose: Hugo build cache and processed assets
- Generated: Yes - created during build process
- Committed: No - cache only, can be regenerated

**node_modules/**
- Purpose: Node.js package dependencies
- Generated: Yes - `npm install` creates directory
- Committed: No - .gitignore prevents committing

**.planning/codebase/**
- Purpose: GSD codebase documentation
- Generated: Yes - created by GSD mapping tools
- Committed: Yes - documentation stored in git

**.github/**
- Purpose: GitHub Actions workflows
- Contains: CI/CD configuration for building and deploying site
- Committed: Yes - workflow definitions version controlled

## Build and Deployment Flow

**Development:**
```bash
make run                    # Starts Hugo dev server on localhost:1313
# Edits to data/*, assets/*, layouts/* hot-reload
```

**Production Deploy:**
```bash
make deploy msg="message"   # Commits all changes and pushes to main
# GitHub Actions automatically builds and deploys to GitHub Pages
```

**Build Process:**
1. Hugo reads `hugo.yaml` configuration
2. Loads Hugo module from `go.mod` (toha/v4 theme)
3. Processes `node_modules/` mounted assets (flags, fonts, Bootstrap, etc.)
4. Reads all `data/en/` YAML files into template context
5. Renders `layouts/index.html` with data
6. Each section includes corresponding theme partial or custom override
7. Compiles `assets/styles/override.scss` with theme SCSS
8. Bundles JavaScript with fingerprinting
9. Outputs all files to `public/` directory

---

*Structure analysis: 2026-02-16*
