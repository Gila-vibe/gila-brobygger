# Gila Brobygger – agent skill

Working in the repository for **Gila Brobygger** (Danish interpretation, written translation,
mentoring and family support organisation). The published website is a fully static,
dependency-free site; no build step, no framework, no bundler.

## Project in one line

Static hand-written HTML in `docs/`, one shared CSS (`docs/assets/css/styles.css`) and one
small JS (`docs/assets/js/main.js`). Published via GitHub Pages from branch `main`, directory
`/docs`, custom domain `gila-brobygger.dk`. All public copy in Danish.

## Quick commands (run from repo root)

```bash
python3 harness/scripts/check_site.py
python3 harness/scripts/check_secrets.py
python3 harness/scripts/check_docs.py
python3 harness/scripts/check_site.py --report harness/reports/latest.json
```

Local preview: `cd docs && python3 -m http.server 8000`

## Non-negotiable rules

- All local links/assets relative and resolving inside `docs/` (no leading `/`).
- No external fonts, CDNs, embeds, iframes, analytics, pixels, cookies or third-party scripts.
- Only permitted form: the Formspree quote form (`docs/faa-et-tilbud.html`, form id `maeelgok`).
  No other `<form>`; no `localStorage`, `sessionStorage`, XHR, WebSocket, sendBeacon or cookies in
  `main.js`.
- One `<h1>`, skip link to `#main`, landmarks, labelled controls, alt text, visible focus, keyboard
  nav, no colour-only meaning.
- Every page needs full shell metadata (title ≤70 chars containing "Gila Brobygger", meta
  description ≤165, canonical, Open Graph, favicon, shared CSS + deferred script).
- Public copy Danish; do not invent facts, qualifications, prices, response times or legal status.
  Uncertain items go to `docs/OWNER_REVIEW.md`.
- Contact details fixed: `kontakt@gila-brobygger.dk`, `+45 31 84 70 40` / `tel:+4531847040`.
- Never claim GDPR compliance, DPO appointment or legal approval.
- Do not weaken harness checks; exceptions need owner sign-off in `docs/APPROVAL_LOG.md`.

## Workflow

1. Understand goal, files, risks and acceptance criteria. For non-trivial work, update
   `plans/ACTIVE.md`.
2. Make the smallest complete change consistent with existing patterns.
3. Run all three checks before finishing.
4. Smoke test: serve `docs/`, check nav (desktop + mobile), skip link, focus, contact links,
   chatbot (open/answer/Escape/focus return), console errors, third-party requests.
5. Update affected docs.

## Approval gates

Stop and ask the owner before: publishing/deploying, identity/brand/service/claim changes,
deleting important content, paid services, hosting/DNS/GitHub Pages changes.

Legal/DPO review required before: data collection, case info, forms/data collection, tracking/
analytics/cookies, third-party sharing, retention arrangements.

## Key locations

| Area | Path |
|---|---|
| Site source | `docs/*.html`, `docs/assets/`, `docs/CNAME`, `docs/robots.txt`, `docs/sitemap.xml`, `docs/_config.yml` |
| Harness | `harness/scripts/`, `harness/config/site.json`, `harness/reports/` |
| Engineering docs | `docs/*.md`, `docs/decisions/`, `plans/` |
| Owner decisions | `docs/OWNER_REVIEW.md`, `docs/APPROVAL_LOG.md` |

## Gotchas

- `check_site.py` requires the set of HTML pages to exactly match `harness/config/site.json`; a new
  page must be added in all the right places or the check fails.
- `check_docs.py` scans all `*.md` for contact details and emails/phones; update config and docs
  together.
- `docs/_config.yml` must keep excluding `*.md`; `docs/CNAME` must be exactly `gila-brobygger.dk`.
- Never copy the legacy photo from `archive/legacy-assets/` (contains EXIF/GPS) into `docs/`.
