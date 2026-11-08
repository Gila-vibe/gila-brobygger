# AGENTS.md – website scope

The canonical, project-wide instructions are in the root [`AGENTS.md`](../AGENTS.md). Read that
first. This file adds rules specific to the **website content and pages** in `docs/`.

## Scope of this file

Use this file when editing HTML, CSS, JavaScript, public copy, images, `CNAME`, `robots.txt`,
`sitemap.xml` or `_config.yml`.

## Website-specific rules

- Public copy is Danish. Documentation may be English.
- Every page uses the shared shell: skip link, header, `nav#site-nav`, `<main id="main">`,
  footer and `assets/js/main.js`.
- Exactly one `<h1>` per page; unique `<title>` and meta description; canonical URL; Open Graph.
- All internal paths are relative. No leading `/`, no external CSS, fonts, scripts or images.
- No forms, cookies, analytics, tracking, iframes or embeds.
- Contact is `mailto:kontakt@gila-brobygger.dk` and `tel:+4531847040`.
- Do not invent services, prices, qualifications, partners, testimonials or coverage areas.
- Do not publish anything that identifies a family or a case.
- Keep service names and navigation labels consistent with `docs/WEBSITE_SPEC.md`.
- Keep `docs/CNAME` exactly `gila-brobygger.dk`.
- Keep `docs/_config.yml` excluding `*.md` so this documentation is not published.
- When adding a page: update `harness/config/site.json`, `docs/sitemap.xml` (unless `noindex`),
  `docs/WEBSITE_SPEC.md` and any relevant navigation.
- When changing content that needs approval, update `docs/OWNER_REVIEW.md` and
  `docs/APPROVAL_LOG.md` in the same change.

## Before you finish

```bash
python3 harness/scripts/check_site.py
python3 harness/scripts/check_secrets.py
python3 harness/scripts/check_docs.py
```

Then serve `docs/` locally and check:

- desktop and mobile navigation;
- skip link and visible focus;
- every contact link;
- the chatbot (open, answer, Escape, focus return);
- no console errors and no third-party network requests.

Do not claim the site is live or approved. Check `docs/APPROVAL_LOG.md`.
