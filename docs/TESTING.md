# Testing

## 1. Strategy

The site is static, so testing focuses on **correctness of files and links**, **content rules**,
**accessibility basics**, **privacy regressions** and **manual browser behaviour**. There are no
unit tests for application logic because there is no application logic beyond the small
`main.js`.

Testing has four layers:

1. **Automated harness** – file, link, metadata, accessibility-basics and policy checks.
2. **Secret and privacy scan** – prevents accidental exposure and third-party additions.
3. **Documentation consistency** – required docs exist and match implementation facts.
4. **Manual browser smoke test** – desktop and mobile, keyboard, chatbot, network panel.

## 2. Automated checks

Run from the repository root:

```bash
python3 harness/scripts/check_site.py --report harness/reports/latest.json
python3 harness/scripts/check_secrets.py
python3 harness/scripts/check_docs.py
```

Exit code `0` means success; any error exits non-zero. Warnings are printed but do not fail the
build unless they are configured as errors.

### What `check_site.py` verifies

- `docs/index.html` exists.
- `docs/CNAME` is exactly `gila-brobygger.dk`.
- All required pages exist (see `harness/config/site.json`).
- Every HTML page has `lang`, `charset`, viewport, unique title, meta description, canonical URL,
  Open Graph basics, favicon and shared stylesheet/script.
- Exactly one `<h1>` and at least one `<h2>` per page.
- Header, navigation, `<main id="main">`, footer and skip link are present.
- All internal links resolve to files; fragment links resolve to an `id` on the target page.
- All local `src`/`href` assets exist.
- No empty, `#`, `javascript:` or `example.com` links; no `href="#"` placeholders.
- No external runtime resources (`<script src>`, `<link href>` to another origin, `<iframe>`).
- No `<form>` elements and no tracker/analytics markers.
- Images have `alt` attributes; local JPEGs have no EXIF/GPS metadata.
- No duplicate `id` attributes on a page.
- Navigation, footer and contact details are consistent across pages.
- `robots.txt`, `sitemap.xml` and `_config.yml` exist and are consistent with the page inventory.
- No leftover TODO/FIXME/lorem-ipsum markers in published HTML.

### What `check_secrets.py` verifies

- No private-key blocks, cloud access keys, GitHub/Slack/Google tokens, basic-auth URLs or
  password assignments in tracked content.
- No `.env` files or common credential files in the working tree.
- Reports low-confidence password/token assignments as warnings for human review; only
  high-confidence credential formats fail the build.

### What `check_docs.py` verifies

- Every document listed in `README.md` and required by `AGENTS.md` exists.
- Internal Markdown links resolve.
- Documented contact details match the website.
- Documented page inventory matches `harness/config/site.json`.
- No document claims the site is live/deployed/approved while approvals are pending.
- No contradictory publishing configuration (branch, directory, domain).

## 3. CI

`.github/workflows/quality.yml` runs all three scripts on every push and pull request, on
`ubuntu-latest`, with the standard Python 3 available on the runner. The site check writes a JSON
report and uploads it as a workflow artifact.

A failing check must be fixed, not bypassed. Temporary exceptions require owner approval recorded
in `docs/APPROVAL_LOG.md`.

## 4. Manual browser smoke test

Serve the site:

```bash
cd docs
python3 -m http.server 8000
```

### Desktop (≥ 1280 px)

- [ ] Homepage loads with the portrait, hero, six service cards and contact band.
- [ ] Header navigation works on every page; `aria-current` marks the current section.
- [ ] Every service card opens the correct page.
- [ ] Skip link appears on first Tab and moves focus to `#main`.
- [ ] Tab order is logical; focus ring is always visible.
- [ ] Footer links (including Privatliv and Tilgængelighed) work.
- [ ] `mailto:` and `tel:` links are correct.
- [ ] Chatbot opens, answers a few keywords, closes with Escape and returns focus.
- [ ] No console errors.
- [ ] Network panel shows only same-origin requests (`styles.css`, `main.js`, portrait, favicon).
- [ ] No cookies are set (Application → Cookies is empty).

### Mobile (≤ 390 px, or device emulation)

- [ ] Hamburger menu opens and closes; `aria-expanded` changes.
- [ ] Menu closes on link click and on resize.
- [ ] No horizontal scrolling at 320 px.
- [ ] Portrait, cards and buttons stack cleanly.
- [ ] Contact card is readable and not sticky.
- [ ] Chatbot panel fits the viewport and remains usable.

### Content and error pages

- [ ] `/404.html` renders and links back to the homepage and contact page.
- [ ] Danish text has correct characters (æ, ø, å) and no mojibake.
- [ ] No placeholder or TODO text visible except the intentional projects placeholder.

## 5. Accessibility checks

Automated harness checks cover structure and basics. In addition:

- [ ] Keyboard-only walkthrough of every page.
- [ ] Zoom to 200 % and 400 %; content remains usable.
- [ ] Windows High Contrast / forced-colours mode does not hide information.
- [ ] Headings form a sensible outline (one `h1`, no skipped levels).
- [ ] Link text makes sense out of context.
- [ ] Chatbot dialog announces its title and disclaimer; focus is trapped while open.
- [ ] Colour contrast spot-checked for body, muted, button and footer text.

Optional tooling (not required to build): axe DevTools, Lighthouse accessibility audit, WAVE.
Record results in the pull request or `harness/reports/`.

## 6. Performance checks

Targets for the homepage:

| Metric | Target | Notes |
|---|---|---|
| Total transfer | < 250 kB | Portrait ~65 kB, CSS ~17 kB, JS ~9 kB, HTML ~10 kB |
| Requests | ≤ 6 | HTML, CSS, JS, portrait, favicon |
| Render-blocking | CSS only | One small same-origin stylesheet |
| Layout shift | Minimal | Width/height set on the portrait |
| Third-party requests | 0 | Enforced by harness |
| Fonts downloaded | 0 | System stack |

Optional: Lighthouse mobile performance and best-practices scores; record the run date.

## 7. Regression checklist

After any content or layout change:

- [ ] All harness checks pass.
- [ ] Page inventory and sitemap are unchanged or intentionally updated.
- [ ] Contact details unchanged (or owner-approved).
- [ ] No new external resource, form, cookie or tracker.
- [ ] Documentation updated where behavior or facts changed.
- [ ] Approval log updated if the change needs sign-off.

## 8. Evidence

- Automated report: `harness/reports/latest.json` (regenerated on each run).
- CI runs: GitHub Actions tab for the repository.
- Manual results: summarised in `docs/QUALITY_SCORE.md` and the rebuild report.

## 9. Known limitations

- The harness uses Python's standard library and is intentionally conservative; it is not a full
  HTML validator or a substitute for a professional accessibility audit.
- Browser smoke tests are manual and depend on the browser and device used.
- The live domain is not tested by CI; deployment verification is a separate, owner-approved step.
