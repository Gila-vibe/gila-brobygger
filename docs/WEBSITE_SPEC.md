# Website specification

## 1. Summary

| Property | Value |
|---|---|
| Site type | Static marketing and information site |
| Language | Danish (`lang="da"`) |
| Publishing | GitHub Pages, branch `main`, directory `/docs` |
| Domain | `https://gila-brobygger.dk` |
| Entry point | `docs/index.html` |
| Build step | None |
| CSS | `docs/assets/css/styles.css` |
| JavaScript | `docs/assets/js/main.js` |
| Images | `docs/assets/images/` |
| Fonts | System font stack, no downloads |
| Cookies / analytics | None |
| Forms | None (contact by `mailto:` / `tel:`) |

## 2. Information architecture

```
Forside (index.html)
├── Om (om.html)
├── Tjenester (tjenester.html)
│   ├── Fremmedtolkning
│   ├── Telefontolkning
│   ├── Videotolkning
│   ├── Skriftlig oversættelse
│   ├── Social Mentor
│   └── Familiekonsulent
├── Projekter (projekter.html)
├── Kontakt (kontakt.html)
├── Privatliv (privatliv.html)      – footer / utility
├── Tilgængelighed (tilgaengelighed.html) – footer / utility
└── 404 (404.html)                  – error page
```

Navigation in the header: Forside, Om, Tjenester, Projekter, Kontakt, plus a primary
"Skriv til os" call to action (`mailto:`). Footer repeats the pages and adds Privatliv and
Tilgængelighed. Every page is reachable in at most two clicks from the homepage.

## 3. Page inventory

| Page | Title | Primary purpose | Key content |
|---|---|---|---|
| `index.html` | Gila Brobygger \| Tolkning, oversættelse og støtte | Explain who/what/how to contact in one screen | Hero, six service cards, approach, about teaser, projects teaser, contact band |
| `om.html` | Om Gila Brobygger \| Gila Brobygger | Build trust through background and values | Introduction, education, six experience areas, values, owner-review notice |
| `tjenester.html` | Tjenester \| Gila Brobygger | Overview of all services | Six service cards, three-step "how to start", contact band |
| `fremmedtolkning.html` | Fremmedtolkning \| Gila Brobygger | Explain in-person interpreting | What it is, when to use it, working method |
| `telefontolkning.html` | Telefontolkning \| Gila Brobygger | Explain phone interpreting | Use cases, benefits, tips for a good call |
| `videotolkning.html` | Videotolkning \| Gila Brobygger | Explain video interpreting | Use cases, benefits, tips for a good call |
| `skriftligoversaettelse.html` | Skriftlig oversættelse \| Gila Brobygger | Explain written translation | Document types, process, sensitive-data warning |
| `mentorforloeb.html` | Social Mentor \| Gila Brobygger | Explain mentoring | Programme content, practical support, language |
| `familiekonsulent.html` | Familiekonsulent \| Gila Brobygger | Explain family support | Support areas, approach, sensitive-data warning |
| `stoetteperson.html` | Støtteperson (§ 75) \| Gila Brobygger | Explain support-person role under Barnets Lov § 75 | Tasks, approach, sensitive-data warning |
| `projekter.html` | Projekter og initiativer \| Gila Brobygger | Show activity areas; placeholder for future projects | Four work areas, clearly marked placeholder |
| `kontakt.html` | Kontakt \| Gila Brobygger | Convert to e-mail or phone | E-mail CTA, phone, what to write about, sensitive-data warning |
| `faa-et-tilbud.html` | Få et tilbud \| Gila Brobygger | Structured quote request | Quote form fields, mailto template, file-upload note, sensitive-data warning |
| `privatliv.html` | Privatliv \| Gila Brobygger | Explain data handling | No cookies/tracking/forms, hosting, chatbot, rights |
| `tilgaengelighed.html` | Tilgængelighed \| Gila Brobygger | State accessibility commitment and gaps | WCAG 2.1 AA target, measures, known limitations |
| `404.html` | Siden blev ikke fundet \| Gila Brobygger | Recover lost visitors | Explanation, links to home and contact, `noindex` |

## 4. Shared page shell

Each page contains, in order:

1. `<!doctype html>` and `<html lang="da">`.
2. `<head>` with charset, viewport, title, description, theme-color, canonical, Open Graph,
   favicon and the shared stylesheet.
3. Skip link to `#main`.
4. `<header class="site-header">` with brand, mobile menu button and `<nav id="site-nav">`.
5. `<main id="main">` with exactly one `<h1>`.
6. `<footer class="site-footer">` with brand, page links, contact links and a privacy line.
7. `<script src="assets/js/main.js" defer>`.

Internal pages use a `.page-hero` band, then a `.content-layout` grid with a `.prose` article and a
sticky `.contact-card` aside, then a `.contact-band`. Service pages follow the identical pattern.

## 5. Components

| Component | Class | Rules |
|---|---|---|
| Button | `.button`, `.button-primary`, `.button-secondary`, `.button-white` | Minimum 48 px tall, visible focus, real `<a>` or `<button>` |
| Service card | `.service-card` | Whole card is one link; heading + short description + "Læs om …" |
| Check list | `.check-list` | Semantic `<ul>`; green check is decorative |
| Notice | `.notice` | Used for sensitive-data warnings and owner-review notes |
| Placeholder | `.placeholder` | Dashed border; must state what is missing and why |
| Contact card | `.contact-card` | E-mail CTA, e-mail address, phone |
| Contact band | `.contact-band` | Section-level CTA before the footer |
| Chatbot | `#gb-chatbot` | Injected by JS; local only; dismissible; labelled dialog |

## 6. Content rules

- Danish only, plain language, short sentences, no unexplained legal or medical jargon.
- Address the visitor as "du"; the organisation speaks as "vi" or "jeg" consistently within a page.
- Never promise an outcome, price, response time or availability.
- Never publish personal data, case examples or anything identifying a family.
- Use "tigrinya" for the language, not "tyrkisk" or other incorrect names.
- Sensitive-data warning on any page that invites contact about a family or a case.
- Placeholders are explicit ("Indhold mangler – afventer ejerens input") and tracked in
  `docs/OWNER_REVIEW.md`.

## 7. Responsive behaviour

| Breakpoint | Behaviour |
|---|---|
| ≥ 961 px | Two-column hero; three-column service grid; sticky contact card |
| 761–960 px | Single-column hero with portrait first; two-column service grid |
| ≤ 760 px | Hamburger navigation; one-column grids; full-width hero buttons; static contact card |

All layouts must remain usable at 320 px width and at 200 % zoom without horizontal scrolling.

## 8. JavaScript behaviour

`main.js` provides only three things:

1. Mobile menu toggle with `aria-expanded`, Escape to close, focus return and resize reset.
2. Current year in the footer (`[data-year]`).
3. A local information chatbot: keyword-based replies, no network requests, no storage, focus trap,
   Escape to close, and a visible disclaimer.

If JavaScript is disabled, the site must remain fully readable and every link must still work.
The chatbot is the only feature that disappears.

## 9. Path rules

- All internal links and assets are relative (`om.html`, `assets/css/styles.css`).
- No leading `/`, because the site may be served from a subpath in previews.
- No query strings or fragments required for core navigation.
- Anchors, if added, must have a matching `id` on the target page.

## 10. Publishing and change control

- `docs/CNAME` must contain exactly `gila-brobygger.dk` and no trailing content.
- `docs/_config.yml` excludes engineering Markdown from the published output.
- `docs/robots.txt` and `docs/sitemap.xml` must stay in sync with the page inventory.
- Changing the publishing branch, directory or domain requires owner approval and a documented
  reason; see `docs/APPROVAL_LOG.md`.
- Adding a page requires: HTML file, navigation/footer link where relevant, sitemap entry (unless
  `noindex`), harness config update, and a documentation update.

## 11. Definition of done for a website change

- [ ] Content is Danish, accurate and free of invented facts.
- [ ] Shared shell is intact; one `<h1>`; unique `title` and `description`.
- [ ] All links, anchors and assets resolve.
- [ ] Keyboard, mobile and reduced-motion behaviour verified.
- [ ] No new third-party requests, cookies, forms or tracking.
- [ ] Harness checks pass.
- [ ] `docs/OWNER_REVIEW.md` and `docs/APPROVAL_LOG.md` updated if the change needs approval.
