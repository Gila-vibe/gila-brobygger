# Engineering documentation

This folder contains the website **and** the documentation that governs it. The public pages are
the `*.html` files; the Markdown files are engineering documents and are excluded from the
published site through `docs/_config.yml`.

Start with the root [README](../README.md) for an overview and run instructions.

## Documents

| Document | What it covers |
|---|---|
| [WEBSITE_SPEC.md](WEBSITE_SPEC.md) | Information architecture, page inventory, components, change rules |
| [ORGANISATION.md](ORGANISATION.md) | Services, activities, experience, audiences and known gaps |
| [BRAND.md](BRAND.md) | Visual identity, typography, logo, voice and tone |
| [INVARIANTS.md](INVARIANTS.md) | Rules that must never be broken, and how they are checked |
| [SECURITY.md](SECURITY.md) | Data flows, threat model, secrets, third parties, incident response |
| [PRIVACY_NOTICE.md](PRIVACY_NOTICE.md) | Draft privacy notice (Danish), pending legal review |
| [TESTING.md](TESTING.md) | Automated checks and manual test procedures |
| [ACCESSIBILITY.md](ACCESSIBILITY.md) | WCAG 2.1 AA target, implementation, known gaps |
| [SEO.md](SEO.md) | Metadata, canonical URLs, sitemap, structured data |
| [HARNESS.md](HARNESS.md) | Harness architecture, gates and extension guide |
| [QUALITY_SCORE.md](QUALITY_SCORE.md) | Current scorecard and evidence |
| [APPROVAL_LOG.md](APPROVAL_LOG.md) | Owner and legal/DPO approval register |
| [OWNER_REVIEW.md](OWNER_REVIEW.md) | Facts and decisions awaiting the owner |
| [AGENTS.md](AGENTS.md) | Website-scoped agent instructions (root `AGENTS.md` is canonical) |
| [PROJECT.md](PROJECT.md) | Pointer to the canonical project document |

## Decisions

Architecture and policy decisions with lasting consequences are recorded in
[`decisions/`](decisions/):

- [0001 – Static site without a build step](decisions/0001-static-site-no-build.md)
- [0002 – No forms; contact by e-mail and phone](decisions/0002-no-forms-mailto-contact.md)
- [0003 – Local-only chatbot](decisions/0003-local-only-chatbot.md)
- [0004 – System fonts, no third-party requests](decisions/0004-system-fonts-no-third-party.md)
- [0005 – Archive, do not delete](decisions/0005-archive-not-delete.md)
- [0006 – Engineering docs co-located and excluded](decisions/0006-docs-co-located-excluded.md)

## Website files

| File | Purpose |
|---|---|
| `index.html` | Homepage, required entry point |
| `om.html`, `tjenester.html`, `projekter.html`, `kontakt.html` | Main pages |
| `fremmedtolkning.html`, `telefontolkning.html`, `videotolkning.html` | Interpreting services |
| `skriftligoversaettelse.html`, `mentorforloeb.html`, `familiekonsulent.html` | Other services |
| `privatliv.html`, `tilgaengelighed.html` | Privacy and accessibility |
| `404.html` | Error page, `noindex` |
| `assets/css/styles.css` | Shared design system |
| `assets/js/main.js` | Mobile navigation and local chatbot |
| `assets/images/` | Portrait, logo and favicon |
| `CNAME` | Custom domain |
| `robots.txt`, `sitemap.xml` | Crawler configuration |
| `_config.yml` | Excludes engineering documents from publication |

## A note on status

Nothing in this folder is approved for publication simply because it exists. Check
[APPROVAL_LOG.md](APPROVAL_LOG.md) before deploying. The current rebuild has **not** been
committed, pushed or deployed.
