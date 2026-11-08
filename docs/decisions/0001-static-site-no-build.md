# 0001 – Static site without a build step

- **Date:** 2026-11-08
- **Status:** Accepted (owner confirmation pending as part of the rebuild approval)
- **Supersedes:** the previous mixed approach (standalone page with inline CSS plus partly
  redesigned service pages)

## Context

The site is published by GitHub Pages from `/docs`. The owner is not a developer. Earlier versions
mixed a 1,100-line standalone homepage with inline CSS and separate service pages that used a
shared stylesheet, which made the design inconsistent and hard to maintain.

## Decision

Ship hand-written, semantic HTML with one shared stylesheet and one small JavaScript file. No
bundler, framework, package manager, server, database or build step. All files are committed as
they are served.

## Consequences

- Anyone can edit a page and preview it with `python3 -m http.server`.
- GitHub Pages can publish the directory directly.
- No dependency supply chain and no build failures.
- Shared header/footer are duplicated in each HTML file. This is a deliberate trade-off; the
  harness checks that they stay consistent.
- Larger structural changes (hundreds of pages, multi-language) would require revisiting this
  decision.

## Alternatives considered

- A static site generator (Eleventy/Hugo): better templating, but adds tooling the owner cannot
  maintain and a build step to deploy.
- A CMS: unnecessary for 14 pages and introduces hosting, accounts and data processing.
