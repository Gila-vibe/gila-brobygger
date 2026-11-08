# Active plan – complete rebuild (2026-11-08)

## Goal

Rebuild the complete Gila Brobygger digital project in this repository: a consistent,
accessible, lightweight Danish website in `docs/`, complete organisational and engineering
documentation, and a practical Harness Engineering framework with automated checks.

## Constraints (owner master instruction)

- Work on this existing repository; preserve useful work and history.
- Do **not** commit, push, deploy or change DNS as part of this work.
- Do not invent organisational facts. Mark missing information for owner review.
- Do not collect personal data without approval and legal/DPO review.
- Do not add third-party analytics, tracking, fonts, embeds or form services.
- `docs/index.html` must be the homepage; publishing source is `main` / `/docs`; CNAME is
  `gila-brobygger.dk`.

## Recovery findings

- The previous site mixed two designs: a 1,155-line standalone homepage with inline CSS and three
  Formspree forms, plus six service pages using a shared stylesheet.
- `docs/gila-brobygger/` is an essentially empty, ignored nested Git repository (only
  `.gitattributes`). It contains no usable organisational material and is left untouched.
- Git history contains no additional verified services or organisational pages.
- Legacy material was moved to `archive/` rather than deleted: original standalone page, unused
  images/video/logo source, the original 3.1 MB photo with EXIF/GPS, duplicate docs, the legacy
  harness and empty placeholder files.
- A resized, metadata-free portrait was created at `docs/assets/images/gila-portrait.jpg`
  (675×900, ~65 kB).
- The owner-supplied logo was kept at `docs/assets/images/gila-brobygger-logo.png`.

## Completed

- [x] Inspect repository, history, nested folder and all pages.
- [x] Create `archive/` and preserve legacy material.
- [x] Rebuild the shared design system in `docs/assets/css/styles.css`.
- [x] Rebuild `docs/assets/js/main.js`: accessible mobile navigation and local-only chatbot.
- [x] Rebuild the homepage and all six service pages on one consistent layout.
- [x] Add Om, Tjenester, Projekter, Kontakt, Privatliv, Tilgængelighed and 404 pages (14 total).
- [x] Add `robots.txt`, `sitemap.xml`, canonical URLs, Open Graph and minimal Organization JSON-LD.
- [x] Add `docs/_config.yml` so engineering documents are not published.
- [x] Rebuild root `README.md`, `AGENTS.md`, `PROJECT.md`.
- [x] Rebuild/extend `docs/` engineering documentation and add ORGANISATION, OWNER_REVIEW and six
  decision records.
- [x] Create `harness/config/site.json`, `check_site.py`, `check_secrets.py`, `check_docs.py` and
  `harness/reports/`.
- [x] Update `.github/workflows/quality.yml` to run the root harness on push and pull request.
- [x] Run all checks: site 14 pages / 0 errors / 0 warnings; secrets 54 files / 0; docs 28
  documents / 0.
- [x] Browser smoke test: all 14 pages, desktop 1280 px, mobile 375 px and 320 px, navigation,
  skip link, chatbot, console and network panel.
- [x] Fix responsive hero overlap, footer wordmark contrast and brand-link accessible name.
- [x] Lighthouse: accessibility, best practices and SEO 1.0 on five representative pages.
- [x] Professional redesign pass: expanded design tokens, refined hero/cards/footer,
  consistent button and navigation system, animated affordances, accent colour.
- [x] Harness extended: mailto/tel syntax, shared shell classes, placeholder contact details.
- [x] Contact audit across all 14 pages: all carry the owner-supplied mailto/tel links.
- [x] BRAND.md updated with the final token palette; QUALITY_SCORE.md updated with evidence.

## Open gates (not completed)

- [ ] Owner approval to publish and deploy (A-01).
- [ ] Owner confirmation of contact details (A-02) and personal/professional claims (A-03).
- [ ] Owner confirmation of the service list and descriptions (A-04).
- [ ] Owner confirmation of removing the Formspree forms (A-05).
- [ ] Owner decision on the chatbot (A-06) and legal/DPO review of its data flow.
- [ ] Legal/DPO review of the privacy notice, retention, hosting disclosure and DPO assessment
  (A-07, A-11, A-12).
- [ ] Owner decision on logo usage and visual identity (A-08, A-09).
- [ ] Owner input for the projects page (A-10).
- [ ] Owner actions for GitHub security and e-mail authentication (A-14, A-15).
- [ ] Commit, push and deploy (explicitly out of scope for this task).

## Next actions after approval

1. Apply owner corrections from `docs/OWNER_REVIEW.md` to the affected pages.
2. Update `docs/APPROVAL_LOG.md` with the decision and date.
3. Re-run all three harness checks and the browser smoke test.
4. Commit with a descriptive message and push to `main`.
5. Confirm GitHub Pages deployment and verify the live domain, canonical URLs, sitemap, robots,
   404 and contact links.
6. Record the post-deployment verification in `docs/QUALITY_SCORE.md`.

## Definition of done (this task)

All harness checks pass, every local link and asset resolves, the browser smoke test passes, the
documentation is internally consistent, and unverified items are explicitly listed. No commit,
push or deployment is performed as part of this task.
