# Hatem Feki — Portfolio Site

## What This Is

A personal portfolio site for Hatem Feki (Software Engineer & AI Researcher at ETS Montréal), built with Hugo and the Toha theme, deployed as a static site on GitHub Pages at hatemfeki.com. The site showcases research publications, professional experience, education, projects, and skills — targeted at recruiters, collaborators, and the academic community.

## Core Value

A polished, on-brand first impression that accurately reflects Hatem's research background and engineering experience.

## Requirements

### Validated

- ✓ Hugo static site deployed to GitHub Pages at hatemfeki.com — existing
- ✓ Brand palette applied (Smoky Black #11120D, Floral White #FFFBF4, Olive Drab #565449, Bone #D8CFBC) — existing
- ✓ Typography system established (Cormorant Garamond display, Mulish UI) — existing
- ✓ Custom hero section with portrait, arch+wave mask, animated name/role — existing
- ✓ All YAML content sections populated from CV (skills, experiences, education, projects, publications, achievements, accomplishments) — existing
- ✓ Downloadable CV/resume PDF linked in about section — existing
- ✓ Google Analytics configured (G-H4LBG7NDFZ) — existing

### Active

- [ ] Section design polish — skills, experience, education, projects, publications, achievements sections match brand
- [ ] Mobile responsiveness — all sections layout correctly on phones and tablets
- [ ] Content accuracy — verify all section content is current and accurate
- [ ] Hero section finalized — portrait mask, positioning, sizing tuned
- [ ] Experience/education logo images — either add missing logos or remove broken references
- [ ] public/ directory gitignored — build artifacts not tracked in repo

### Out of Scope

- Multi-language support (Bengali) — deleted content, English-only going forward
- Blog / notes section — content removed, not part of this portfolio
- Contact form backend — no server-side processing; static site only
- CMS / admin interface — content managed via YAML files in git

## Context

- Stack: Hugo v0.146.0 extended, Toha v4 theme (local git submodule), Bootstrap 5.3.3, SCSS
- Deployment: GitHub Actions → GitHub Pages, custom domain hatemfeki.com
- Customization pattern: Override theme via `assets/styles/override.scss` + `layouts/partials/sections/` files
- Known tech debt: TypeIt loaded from external CDN (should use local npm bundle), `public/` not gitignored, missing skill/experience logo images
- Design work happens iteratively — user identifies a section, requests changes, Claude implements

## Constraints

- **Tech stack**: Hugo + Toha theme — no React, no build system changes
- **Static only**: No backend, no form handling, no databases
- **Theme boundary**: Customize via override.scss and layout overrides only; don't modify `themes/toha/` directly (git submodule)
- **Content format**: All content lives in `data/en/sections/*.yaml` — no markdown posts

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Cormorant Garamond for display font | Matches editorial/academic tone of the brand palette | — Pending evaluation |
| Arch + wave SVG mask for portrait | Creates distinctive portrait shape instead of generic circle | — Pending evaluation |
| Single-language (EN only) | Simplified maintenance; removed .bn.md files | ✓ Good |
| Keep Toha theme as submodule | Faster than building from scratch; override via SCSS | — Pending |

---
*Last updated: 2026-02-16 after initialization*
