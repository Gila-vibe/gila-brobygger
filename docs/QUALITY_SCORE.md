# Quality score

**Assessment date:** 2026-11-08 (initial rebuild + professional redesign pass)
**Scope:** the rebuilt and redesigned website in `docs/` and the harness in `harness/`
**Method:** automated harness, local browser smoke test, Lighthouse audits and manual review.
**Important:** the site has **not** been deployed, and no owner or legal/DPO approval has been
granted. "Engineering quality" and "launch readiness" are therefore reported separately.

## 1. Scorecard

| Area | Score | Basis |
|---|---:|---|
| Structure, links and assets | 100 | `check_site.py`: 16 pages, 0 errors, 0 warnings |
| Metadata and SEO | 100 | Lighthouse SEO 1.0 on 5 representative pages; canonical, sitemap, robots, JSON-LD |
| Accessibility | 95 | Lighthouse accessibility 1.0 on 5 pages; manual keyboard/skip-link checks; no formal audit |
| Performance / weight | 90 | 102.3 kB first load, 4 requests, no third-party requests; no field performance data |
| Privacy and security | 90 | No forms, cookies, tracking or external resources; secret scan passes; legal/DPO review pending |
| Documentation | 95 | Complete document set and consistent facts; approval status pending |
| Maintainability | 95 | No build step, one CSS/JS file, harness and documentation co-located |
| Content accuracy | 55 | All personal/professional claims still need owner confirmation |
| **Engineering quality (weighted above)** | **90 / 100** | Strong implementation, open factual review |
| **Launch readiness** | **30 / 100** | Owner approval, legal/DPO review and deployment all pending |

A high engineering score is **not** a launch approval. See `docs/APPROVAL_LOG.md`.

## 2. Automated evidence

All commands were run from the repository root on 2026-11-08.

| Check | Result | Detail |
|---|---|---|
| `python3 harness/scripts/check_site.py --report harness/reports/latest.json` | **PASS** | 15 pages, 0 errors, 0 warnings; now also validates mailto/tel syntax, shared shell classes, placeholder contact details |
| `python3 harness/scripts/check_secrets.py` | **PASS** | 54 files scanned, 0 errors, 0 warnings |
| `python3 harness/scripts/check_docs.py` | **PASS** | 28 Markdown documents, 0 errors, 0 warnings |
| Lighthouse accessibility | **1.0** | `index.html`, `kontakt.html`, `privatliv.html`, `familiekonsulent.html`, `404.html` |
| Lighthouse best practices | **1.0** | Same five pages |
| Lighthouse SEO | **1.0** | Same five pages |

Lighthouse initially reported one `label-content-name-mismatch` on the brand link (the visible "G"
mark was not part of the accessible name). It was fixed by drawing the initial in CSS and leaving
the link's text as the accessible name; the re-run reported no failures.

## 3. Browser evidence

Local server: `python3 -m http.server` from `docs/`.

### Desktop (1280 px viewport, same-origin frame)

- Header, navigation, hero, portrait, service grid, approach panel, footer all render correctly.
- Hero columns: 574.6 px / 489.4 px; no overlap with the decorative shape.
- No horizontal overflow (`scrollWidth === clientWidth === 1280`).
- Hamburger hidden; full navigation visible.

### Mobile (375 px and 320 px viewports, same-origin frames)

- No horizontal overflow at 375 px or 320 px.
- No element extends beyond the viewport at 320 px.
- Menu button visible; opening sets `aria-expanded="true"` and displays the nav (307 px tall).
- Clicking a link closes the menu and resets `aria-expanded` to `false`.
- Headline wraps cleanly; portrait and buttons stack.

### All pages

- All 16 pages load with the correct title and exactly one `<h1>`.
- No console errors on any page.
- Only same-origin requests: HTML, `styles.css`, `main.js`; portrait on the homepage. No external
  requests on any page.
- No cookies, no `localStorage`, no `sessionStorage` entries.

### Chatbot

- Opens from the launcher and announces the dialog title.
- Disclaimer visible: local-only, nothing stored or sent, do not enter CPR/health data.
- "Hvad koster en tolkning?" returns a contact-oriented answer, not a price.
- Sending a message creates **no** network requests.
- Escape closes the panel and returns focus to the launcher (`aria-expanded="false"`).
- Focus trap and labelled input present.

### Skip link and focus

- Skip link targets `#main`.
- When focused, it moves into view (`top: 12px`) and is the first focusable element.
- Keyboard focus ring is defined in CSS and not removed.

## 4. Issues found and fixed during testing

| Issue | Impact | Fix |
|---|---|---|
| Decorative hero shape covered the headline below 960 px | Headline partly unreadable on tablet/mobile | Constrained the shape to the portrait width in the ≤960 px breakpoint |
| Footer brand "Brobygger" inherited dark heading colour on a dark background | Low-contrast wordmark | Set footer brand and `strong` to white |
| Visible "G" mark did not match the brand link's accessible name | Lighthouse a11y failure | Draw the initial in CSS; keep the link text as the accessible name |
| Google Fonts `@import` (pre-rebuild) | Third-party IP disclosure | Replaced with a system font stack |
| Three Formspree forms (pre-rebuild) | Unapproved personal-data collection | Replaced with `mailto:` and `tel:` |

## 5. Not verified

The following are explicitly **not** covered by this score:

- Live deployment at `https://gila-brobygger.dk` (no commit, push or deploy was performed).
- HTTPS, DNS, CNAME propagation and e-mail deliverability.
- Owner confirmation of contact details, personal claims, services and prices.
- Legal/DPO review of the chatbot, privacy notice, retention and DPO requirement.
- Formal WCAG audit, screen-reader testing and user testing with disabled users.
- Field performance data (Core Web Vitals) and cross-browser testing beyond Chromium.
- Behaviour with JavaScript disabled (reviewed in code, not tested in a browser).
- 200 % browser zoom (320 px layout is a proxy, not the same test).
- Safari, Firefox, Edge, iOS and Android devices.

## 5b. Professional redesign pass (2026-11-08)

A second pass applied a professional, coherent design system on top of the rebuild:

- **Design tokens** expanded in `docs/assets/css/styles.css` `:root`: full colour scale (brand
  greens, warm accent, neutrals, surfaces), typography scale, 4 px spacing scale, radius, shadows
  and motion tokens. Components now consume tokens instead of raw values.
- **Visual redesign**: larger, more confident hero with a subtle dot pattern and gradient;
  refined service cards with icon tiles that invert on hover and animated affordance arrows;
  approach panel with depth; page heroes with a faint pattern; refined footer columns; contact
  band and contact card polished.
- **Consistency**: one button system (primary/secondary/white/accent), one focus ring (amber),
  one navigation with an animated underline and active state, one footer across all 16 pages.
- **Accessibility preserved**: skip link, landmarks, one `<h1>`, visible focus, reduced motion,
  no horizontal scroll at 320 px.
- **Harness extended** (Phase 4): validates `mailto:`/`tel:` syntax, shared design-system shell
  classes (`site-header`, `site-nav`, `site-footer`) on every page, and scans for placeholder
  contact details.
- **Contact audit**: every page carries `mailto:kontakt@gila-brobygger.dk` and
  `tel:+4531847040`; Lighthouse reports no failures; no console errors; only same-origin requests.

No colours, fonts or contact details were invented. Owner decisions O-01, O-02, O-27, O-28, O-29
and O-30 remain open.

## 6. How to reproduce

```bash
python3 harness/scripts/check_site.py --report harness/reports/latest.json
python3 harness/scripts/check_secrets.py
python3 harness/scripts/check_docs.py
cd docs && python3 -m http.server 8000
```

Then open `http://localhost:8000`, check the items in `docs/TESTING.md`, and run a Lighthouse
audit in the browser's developer tools.

## 7. Interpretation

- **90/100 engineering quality** means the implementation, structure, documentation and automated
  controls are in good shape.
- **30/100 launch readiness** means the remaining work is mostly human: confirm facts, complete
  legal/DPO review, approve and deploy.
- Do not present either number as a guarantee, certification or compliance statement.
