# Handoff note – Gila Brobygger digital project

**Repository:** `Gila-vibe/effective-goggles` (branch `main`)
**Published site:** https://gila-brobygger.dk (GitHub Pages, branch `main`, directory `/docs`)
**Current HEAD:** `4d5d6c2` – "Fix double success message on quote form" (2026-11-10)
**Working tree:** clean
**Status:** Development complete on `main`; **not deployed / not owner-approved for launch** (see pending gates).

This note is written for a new maintainer/agent taking over the project. It summarises what the
project is, what has been built, and what remains open, reconstructed from the commit history
(66 commits, 2026-10-06 → 2026-11-10) and the repository documentation.

---

## 1. What the project is

A complete, static, dependency-free website and engineering harness for **Gila Brobygger**, a
Danish organisation offering interpretation (foreign-language, telephone, video), written
translation, mentoring and family support. The site is hand-written HTML with one shared CSS
file and one small JavaScript file, no build step, no external fonts, no analytics, no cookies
and no third-party scripts. All public copy is in Danish. The repository also contains an
engineering harness (automated checks), organisational documentation, an approval system and
decision records.

Contact details used everywhere (owner-supplied, not independently verified):
- E-mail: `kontakt@gila-brobygger.dk`
- Phone: `+45 31 84 70 40`

## 2. Repository layout

```
.
├── docs/                     # GitHub Pages publishing directory (the website)
│   ├── index.html            # homepage (required entry point)
│   ├── om.html, tjenester.html, projekter.html, kontakt.html
│   ├── fremmedtolkning.html, telefontolkning.html, videotolkning.html
│   ├── skriftligoversaettelse.html, mentorforloeb.html, familiekonsulent.html
│   ├── stoetteperson.html     # added later
│   ├── faa-et-tilbud.html     # quote request page
│   ├── privatliv.html, tilgaengelighed.html, 404.html
│   ├── assets/css/styles.css, assets/js/main.js, assets/images/
│   ├── CNAME (gila-brobygger.dk), robots.txt, sitemap.xml, _config.yml
│   └── *.md                  # engineering docs (excluded from publish)
├── harness/                  # validation scripts, config, reports
├── plans/                    # active plan + archives
├── archive/                  # preserved legacy material (not published)
├── AGENTS.md, PROJECT.md, README.md
└── HANDOFF.md                # this file
```

## 3. What has been achieved (by phase)

### Phase A – Legacy foundation (early Oct 2026)
- `3e73976` Initial commit; `be00f93` Hub-Gilabrobygger.
- First iterations of `index.html`, submenu structure, and the Skriftlig Oversættelse page
  (`bb7f7ae`, `29f80b2`, `0f0657b`, `239c6c2`, `a04c344`, `8d6b5db`, `9ebe423`,
  `f24f1fc`/`675a731`, `91ddd6b`, `09dc1cf`, `e358b4f`, `86ee0ba`).
- `8676cdd` Add Gila Brobygger website + engineering harness; `1ac6fda` post-OpenCode update.
- `86bd199` Add chatbot widget; `0676cb4` coordinated Owner Sign-off + Legal/DPO approval system.
- `f8bb8fc` Create CNAME; merge/deployment fixes (`54c5e79`, `d4252f4`, `9ff026a`,
  `22850d3`, `4aeb63c`).

### Phase B – Rebuild & contact/identity (mid Oct)
- `1c953b1` Rebuild website + harness; `3be18b2` misc.
- `5b0f665` Copy-to-clipboard fallback for e-mail; `bfdc902` verified address, legal form and
  opening hours; `94eb51f` remove street name (postcode + city only); `95ad21d` opening hours in
  footer on all pages; `d86fefd` social media icons in footer (links pending owner URLs).
- `e5442c4` Add Støtteperson (§ 75) service page + navigation, sitemap, org docs.

### Phase C – Content & experience
- `9656d42` Detailed experience areas on homepage "Arbejdsområder".
- `2b3e7f3` Støtteperson on projekter page.
- `a4f6d21` Improve "kommende initiativer" placeholder text on projekter page.

### Phase D – Visual/design tuning
- Logo size increases (`c5d1d83`, `64aecab`); page-hero heading size (`96f6f4f`);
  nav link font size (`47a16a8`, `66d0edc`); Danish flag badge added then removed
  (`b505acf` → `810b36f`).

### Phase E – Quote form evolution (largest body of work)
- `98b69f4` mailto-based quote request template on kontakt page (+ approval/owner-review entries).
- `494e4a3` Quote form design + "Få et tilbud" header link.
- `3b007d3` Separate "Få et tilbud" into its own page; clean up kontakt.html; sitemap update.
- `d3faed2` Redesign: drag-and-drop file selection, validation, loading states, success/error
  messages.
- `af39bda` Two-column rows + styling.
- `96b329f` New form version; `9fa02b2` restore shared header/footer; `2851480` update.
- `7bed265` Booking date/time section for interpreting services.
- `b4194b4` / `0fa646d` File uploads.
- `c122a70` Google verification meta tag placement + exclude verification files from harness.

### Phase F – SEO, legal & accessibility
- `deefaf8` Technical SEO: breadcrumb + service JSON-LD schema, internal related-service links.
- `c086157` Legal & accessibility audit: improve privatliv.html, tilgaengelighed.html, add audit
  reports (ACCESSIBILITY_AUDIT, LEGAL_AUDIT, VIDEO_CAPTIONS_INVENTORY), video captions inventory.
- `b44d9c1` SEO: meta descriptions, FAQ sections + FAQPage schema, related service links.

### Phase G – Chatbot & form backend
- `5e8be5a` Configure chatbot: new welcome message, suggested questions, expanded FAQ and
  knowledge base.
- `18f97e8` Fix mailto triggering (temporary link element).
- `7570d7e` Improve quote form success message clarity.
- `0be65ce` Integrate Formspree for quote form submission (owner-approved, legal review pending).
- `59e5563` Fix quote form: Formspree submission, validation, booking, file upload,
  success/error messages.
- `d95501a` Set Formspree form ID to `maeelgok`.
- `4d5d6c2` Fix double success message on quote form.

## 4. Features currently in place

- **16 HTML pages** (including 404 and Google verification file): homepage, Om, Tjenester,
  6 service pages, Støtteperson, Projekter, Kontakt, Få et tilbud, Privatliv, Tilgængelighed, 404.
- Shared design system in `docs/assets/css/styles.css`; one JS file `docs/assets/js/main.js`.
- Accessible mobile navigation, skip link, landmarks, labelled controls.
- Local-only chatbot widget (no network requests).
- Contact links (mailto/tel) with copy-to-clipboard fallback on all pages.
- Footer with opening hours, postcode/city, social icons (URLs pending owner).
- Danish flag badge removed (decided against).
- Støtteperson (§ 75) service page with nav/sitemap/org-doc updates.
- "Få et tilbud" page: validated quote form with drag-and-drop file upload, booking date/time
  for interpreting services, loading/success/error states, Formspree submission (`maeelgok`).
- SEO: meta descriptions, canonical URLs, Open Graph, breadcrumb + service JSON-LD,
  FAQ sections + FAQPage schema, internal related-service links, sitemap, robots.txt.
- Legal/accessibility audits documented; video captions inventory.
- Harness: `check_site.py`, `check_secrets.py`, `check_docs.py`, config in
  `harness/config/site.json`, reports in `harness/reports/`.
- CI: `.github/workflows/quality.yml` runs checks on push/PR.
- Engineering docs: AGENTS, PROJECT, ORGANISATION, WEBSITE_SPEC, BRAND, INVARIANTS, SECURITY,
  TESTING, HARNESS, SEO, ACCESSIBILITY, PRIVACY_NOTICE, QUALITY_SCORE, APPROVAL_LOG,
  OWNER_REVIEW, LAUNCH_CHECKLIST, LEGAL_AUDIT, ACCESSIBILITY_AUDIT, VIDEO_CAPTIONS_INVENTORY,
  decisions (0001–0007).
- Decision records including `0007-formspree-quote-form.md`.

## 5. Open gates / pending items

- **Deployment not performed** – owner approval required before pushing to `main`/DNS changes.
- **Owner review of claims** pending – see `docs/OWNER_REVIEW.md`.
- **Legal/DPO review** pending – see `docs/APPROVAL_LOG.md` (Formspree integration is
  owner-approved but legal review pending; chatbot data-flow review still needed).
- Social media footer URLs pending owner.
- Mailbox/phone not independently verified.
- No automated test suite beyond harness checks; manual smoke tests documented in TESTING.md.
- `Gilabrobygger-Test` branch exists (not merged) – review before use.

## 6. How to run checks

```bash
cd /Users/gilay/Desktop/GitHub/effective-goggles
python3 harness/scripts/check_site.py
python3 harness/scripts/check_secrets.py
python3 harness/scripts/check_docs.py
```

Local preview:

```bash
cd docs && python3 -m http.server 8000
# open http://localhost:8000
```

## 7. Key constraints (do not violate)

- Static site only; no build/bundler/package manager/framework without approval.
- No external fonts, CDNs, embeds, iframes, analytics, pixels, cookies, third-party scripts.
- No forms collecting personal data beyond the approved Formspree quote form; contact via
  mailto/tel otherwise.
- All links/asset paths relative and resolving inside `docs/`.
- `docs/index.html` must exist; `docs/CNAME` must contain exactly `gila-brobygger.dk`.
- `_config.yml` must exclude `*.md`.
- Never commit secrets/tokens/keys/client data.
- All public copy in Danish; do not invent facts; mark placeholders.
- Accessibility requirements are mandatory.

## 8. Risks / watch-outs for the next maintainer

- Do not treat the Formspree form as legally approved – legal/DPO review is still pending.
- Do not "fix" items listed in `docs/OWNER_REVIEW.md` without owner decision.
- Do not copy the legacy photo from `archive/` (contains EXIF/GPS) into `docs/`.
- Do not weaken harness checks to make them pass; document exceptions in APPROVAL_LOG.md.
- Branch `Gilabrobygger-Test` may contain divergent work – inspect before merging.

---
*Generated from commit history and repository documentation. Verify against `git log` and
`docs/` before acting on any claim here.*
