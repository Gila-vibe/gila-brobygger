# Invariants

Rules that must hold at all times. If a change would break one, stop and get owner approval (and
legal/DPO review where relevant). Each invariant names how it is verified.

## Website and deployment

| # | Invariant | Verified by |
|---|---|---|
| W1 | `docs/index.html` exists and is the homepage of the published site. | `check_site.py` |
| W2 | `docs/CNAME` contains exactly `gila-brobygger.dk` (single line, no extra text). | `check_site.py` |
| W3 | Publishing source stays `main` / `/docs` unless the owner approves a change. | Owner review + `docs/APPROVAL_LOG.md` |
| W4 | Every local link, anchor and asset resolves inside `docs/`. | `check_site.py` |
| W5 | Every page has `lang="da"`, a unique `<title>`, a meta description and exactly one `<h1>`. | `check_site.py` |
| W6 | Every page uses the shared header, navigation, footer and stylesheet. | `check_site.py` |
| W7 | No page requires a build step, server, database or JavaScript to be readable. | Manual + `check_site.py` |
| W8 | `404.html` exists, is `noindex` and offers a route back to the homepage. | `check_site.py` |
| W9 | Engineering Markdown is excluded from the published site via `docs/_config.yml`. | `check_site.py` |
| W10 | `docs/robots.txt` and `docs/sitemap.xml` list only public, indexable pages. | `check_site.py`, manual review |

## Content and claims

| # | Invariant | Verified by |
|---|---|---|
| C1 | No invented services, qualifications, approvals, partnerships, testimonials, results, prices, addresses or contact details. | Owner review, content review |
| C2 | Every published factual claim is traceable to the owner or a documented decision. | `docs/OWNER_REVIEW.md`, `docs/decisions/` |
| C3 | Public copy is Danish and uses respectful, non-stigmatising language. | Review, `check_docs.py` keyword scan |
| C4 | No client, family or case information is published. | `check_secrets.py`, review |
| C5 | Contact details are `kontakt@gila-brobygger.dk` and `+45 31 84 70 40` until the owner changes them. | `check_site.py` |
| C6 | The website never claims to be GDPR-compliant, DPO-approved or legally reviewed. | Review |
| C7 | Placeholders are explicit and tracked in `docs/OWNER_REVIEW.md`. | `check_site.py` (placeholder markers) + review |

## Privacy and security

| # | Invariant | Verified by |
|---|---|---|
| S1 | No secrets, credentials, tokens, keys, `.env` files or private documents in the repository. | `check_secrets.py` |
| S2 | No forms that collect personal data; contact is `mailto:` / `tel:` only. | `check_site.py` |
| S3 | No analytics, tracking, advertising, pixels or non-essential cookies. | `check_site.py` |
| S4 | No third-party scripts, stylesheets, fonts, iframes or embeds. | `check_site.py` |
| S5 | The chatbot runs entirely in the browser, sends nothing and stores nothing. | Code review of `main.js` + browser network check |
| S6 | Public pages never publish sensitive case information or documents. | Review + owner/legal gate |
| S7 | Any new data collection requires owner approval **and** legal/DPO review first. | `docs/APPROVAL_LOG.md` |
| S8 | Images published on the site contain no EXIF/GPS metadata. | `check_site.py` (JPEG EXIF scan) |

## Accessibility

| # | Invariant | Verified by |
|---|---|---|
| A1 | Skip link is the first focusable element on every page. | `check_site.py` |
| A2 | Header, navigation, main and footer use semantic landmarks; `<main>` has `id="main"`. | `check_site.py` |
| A3 | Every image has an `alt` attribute (empty for decorative images). | `check_site.py` |
| A4 | Focus is always visible; focus styles are never removed without replacement. | CSS review |
| A5 | Navigation works with keyboard alone, including opening/closing the mobile menu. | Manual smoke test |
| A6 | Text and interactive elements meet WCAG 2.1 AA contrast. | Manual audit / tooling |
| A7 | `prefers-reduced-motion` disables non-essential motion. | CSS review |
| A8 | The site works at 200 % zoom and 320 px width without horizontal scrolling. | Manual smoke test |

## Documentation and process

| # | Invariant | Verified by |
|---|---|---|
| D1 | `README.md`, `AGENTS.md`, `PROJECT.md` and all documents listed in `README.md` exist. | `check_docs.py` |
| D2 | Documentation does not contradict the implementation (pages, paths, contact details). | `check_docs.py`, review |
| D3 | New pages, services or approvals are reflected in the relevant documents. | Review |
| D4 | Decisions with lasting consequences are recorded in `docs/decisions/`. | Review |
| D5 | Every quality claim in documentation is backed by a check that was actually run. | `harness/reports/`, review |
| D6 | No check is weakened or skipped to make a build pass. | Code review of `harness/` |

## Changing an invariant

An invariant may only be changed by:

1. a written rationale in `docs/decisions/`;
2. owner approval recorded in `docs/APPROVAL_LOG.md`;
3. legal/DPO review if it touches personal data or tracking;
4. an update to the harness so the new rule is actually enforced.
