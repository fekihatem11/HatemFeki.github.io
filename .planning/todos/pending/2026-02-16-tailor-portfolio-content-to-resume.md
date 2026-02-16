---
created: 2026-02-16T17:18:49.037Z
title: Tailor portfolio content to resume
area: ui
files:
  - CV.pdf
  - data/en/sections/about.yaml
  - data/en/sections/skills.yaml
  - data/en/sections/experiences.yaml
  - data/en/sections/education.yaml
  - data/en/sections/projects.yaml
  - data/en/sections/achievements.yaml
  - data/en/sections/accomplishments.yaml
  - data/en/author.yaml
  - data/en/site.yaml
---

## Problem

All portfolio sections currently contain placeholder/example content from the Toha theme example site (e.g. "Example Co.", generic skills like Kubernetes/Go, John Doe social links). The site needs to reflect Hatem Feki's actual professional background.

The source of truth for real content is `CV.pdf` at the project root.

## Solution

1. Read `CV.pdf` to extract: name, title, summary, work experience, education, skills, projects, achievements
2. Update `data/en/author.yaml` with real name, email, GitHub, LinkedIn, bio
3. Update `data/en/site.yaml` with real description and OpenGraph metadata
4. Update `data/en/sections/about.yaml` — designation, company, summary, social links, resource links
5. Update `data/en/sections/skills.yaml` — replace with actual skills from CV (remove Kubernetes/Go placeholders unless relevant)
6. Update `data/en/sections/experiences.yaml` — real work history with company, role, dates, responsibilities
7. Update `data/en/sections/education.yaml` — real education history
8. Update `data/en/sections/projects.yaml` — real projects with descriptions and links
9. Update `data/en/sections/achievements.yaml` and `accomplishments.yaml` — certifications, awards if any
10. Replace placeholder images in `assets/images/sections/` where needed

Note: `static/files/resume.pdf` should be updated to be the same as `CV.pdf` (currently may be the example site resume).
