# AGENTS.md – Gila Brobygger

Canonical instructions for this repository. Website-specific rules: `docs/AGENTS.md`
(read this first). Static site + harness, no build, no dependencies.

## Quick commands (run from repo root)

```bash
python3 harness/scripts/check_site.py
python3 harness/scripts/check_site.py --report harness/reports/latest.json
python3 harness/scripts/check_secrets.py
python3 harness/scripts/check_docs.py
cd docs && python3 -m http.server 8000   # local preview
```

CI runs all three checks on push/PR (`.github/workflows/quality.yml`, Python 3.12).

## Layout

- Site is published from `docs/` (GitHub Pages, branch `main`, dir `/docs`,
  domain `gila-brobygger.dk`). `docs/index.html` is the entry point.
- Static only: hand-written HTML, one CSS (`docs/assets/css/styles.css`), one JS
  (`docs/assets/js/main.js`). No build, bundler, package manager or framework.
- `docs/*.md`, `plans/`, `docs/decisions/` are engineering docs excluded from
  publish by `docs/_config.yml` (`exclude: *.md, plans, decisions,
  gila-brobygger`; `plugins: []`). Keep that file intact.
- `archive/` is legacy material: excluded from publish and checks, do not delete.
  The original photo in `archive/legacy-assets/` has EXIF/GPS and must never be
  copied into `docs/`.
- `docs/gila-brobygger/` is an ignored, empty nested repo; leave it untouched.

## Read first (substantial changes)

`PROJECT.md`, `docs/ORGANISATION.md`, `docs/WEBSITE_SPEC.md`, `docs/BRAND.md`,
`docs/INVARIANTS.md`, `docs/SECURITY.md`, `docs/TESTING.md`. For content work
also `docs/OWNER_REVIEW.md`.

## Content rules (non-negotiable)

- Public copy is Danish; documentation may be English.
- Do not invent facts, qualifications, approvals, partners, testimonials, prices,
  addresses, response times, guarantees or legal status. Uncertain items go in
  `docs/OWNER_REVIEW.md`; mark placeholders clearly if they must appear.
- Respectful, non-stigmatising language; no case stories or client-identifying info.
- Contact details are fixed until the owner confirms: `kontakt@gila-brobygger.dk`,
  `+45 31 84 70 40` / `tel:+4531847040`.
- Never claim GDPR compliance, DPO appointment or legal approval.

## Technical rules (non-negotiable)

- All local links/assets must be relative (no leading `/`) and resolve inside
  `docs/`. `check_site.py` errors otherwise.
- No external fonts, CDNs, embeds, iframes, analytics, pixels, cookies or
  third-party scripts at runtime. `check_site.py` and the JS scan enforce this.
- Forms: only the Formspree quote form (`docs/faa-et-tilbud.html`) is permitted;
  any other `<form>` errors. `main.js` may use `fetch`/`https` only for Formspree;
  no `localStorage`, `sessionStorage`, `XMLHttpRequest`, `WebSocket`, `sendBeacon`,
  `document.cookie` or other `http://`/`https://` URLs. Formspree is a third-party
  processor with legal/DPO review pending (decision 0007).
- `docs/CNAME` must contain exactly `gila-brobygger.dk`; `docs/_config.yml` must
  exclude `*.md`.
- Never commit secrets, `.env`, tokens, keys, passwords, private docs or client data.
- Accessibility is required: one `<h1>`, skip link to `#main`, landmarks, labelled
  controls, alt text, visible focus, keyboard nav, no colour-only meaning.
- Do not weaken a check. Fix the cause or document a time-boxed exception in
  `docs/APPROVAL_LOG.md` with owner sign-off.

## Page shell / metadata (enforced by check_site.py)

Every HTML page needs: `<!doctype html>`, `<html lang="da">`, charset utf-8,
viewport `width=device-width` (no zoom lock), unique `<title>` (≤70 chars,
contains "Gila Brobygger"), meta description (≤165), exactly one non-empty `<h1>`,
`<main id="main">`, `<header>`, `<footer>`, `<nav>`, skip link to `#main`,
shared stylesheet + deferred shared script, favicon, canonical URL, Open Graph tags
(`og:type/title/description/url/image`) except `noindex` pages, and classes
`site-header`, `site-nav`, `site-footer`. Inline scripts are allowed only as valid
JSON-LD. No positive `tabindex`. No placeholder text or placeholder contact details.
Each page must include the contact `mailto:`/`tel:` links and the nav/footer links
defined in `harness/config/site.json`.

## Adding a page

1. Create `docs/<page>.html` from the shared shell.
2. Add to `harness/config/site.json` (`required_pages` or `noindex_pages`).
3. Add to `docs/sitemap.xml` unless noindex.
4. Update `docs/WEBSITE_SPEC.md` (and `README.md` if inventory changes) and nav/footer.
5. Run all three checks.

`check_site.py` requires the set of HTML pages to exactly match `site.json`; `check_docs.py`
requires every configured page to appear in `WEBSITE_SPEC.md`. `sitemap.xml` must match
`required_pages` exactly.

## Sync-sensitive values

- Contact details are sourced from `harness/config/site.json`; `check_docs.py` scans
  all `*.md` (root, `docs/`, `plans/`, `docs/decisions/`, `harness/reports/`) for
  e-mails/phones and errors on any mismatch. Update config and docs together.
- `docs/CNAME` must equal the configured domain; `docs/robots.txt` must reference
  `Sitemap: https://gila-brobygger.dk/sitemap.xml` and contain `User-agent:`.
- JPEGs in `docs/assets/images/` must not contain EXIF/GPS metadata.

## Approval gates

Stop and ask the owner before: publishing/deploying a significant change; changing
identity, brand, services or significant claims; deleting important content/infra;
introducing paid services/subscriptions; changing hosting, domain, DNS, e-mail routing
or GitHub Pages config.

Request legal/DPO review before: collecting/processing personal or sensitive data;
publishing case info; adding forms or data collection; adding tracking/analytics/cookies;
third-party sharing; defining retention/privacy arrangements.

The chatbot is local-only (no network, no storage) but still needs a documented
data-flow review before being treated as approved. Owner approval never replaces
legal review.

## Workflow

1. Understand: goal, files, risks, acceptance criteria.
2. Non-trivial work: update `plans/ACTIVE.md`.
3. Implement the smallest complete change, consistent with existing patterns.
4. Validate: run all three checks.
5. Smoke test: serve `docs/`, check desktop + mobile nav, skip link, visible focus,
   contact links, chatbot (open, answer, Escape, focus return), no console errors,
   no third-party requests.
6. Review the diff; update affected docs.
7. Report changed files, commands actually run, results and anything unverified.
   Never claim a check passed if it was not run.

## Definition of done

Checks pass; links/anchors/assets resolve; accessibility basics preserved; affected
docs updated; missing approvals listed; verified behaviour distinguished from
assumptions.

## Where to record

| Info | Location |
|---|---|
| Organisation facts/unknowns | `docs/ORGANISATION.md`, `docs/OWNER_REVIEW.md` |
| Design/content rules | `docs/WEBSITE_SPEC.md`, `docs/BRAND.md` |
| Runtime/checks | `docs/HARNESS.md` |
| Tests/manual checks | `docs/TESTING.md`, `harness/reports/` |
| Approvals/reviews | `docs/APPROVAL_LOG.md` |
| Lasting decisions | `docs/decisions/` |
| Current work | `plans/ACTIVE.md` |

## Legacy

`archive/` preserves earlier versions/unused assets for traceability. Do not delete
without owner approval. Never copy the original photo (EXIF/GPS) into `docs/`.