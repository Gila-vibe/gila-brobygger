# Gila Brobygger – digital project

A complete, static, dependency-free website and engineering harness for **Gila Brobygger**, a
Danish organisation offering interpretation, written translation, mentoring and family support.

- **Website:** <https://gila-brobygger.dk>
- **Hosting:** GitHub Pages, branch `main`, publishing directory `/docs`
- **Stack:** hand-written HTML, one shared CSS file, one small JavaScript file, no build step,
  no external fonts, no analytics, no cookies, no third-party scripts.

## Project status

| Area | Status |
|---|---|
| Website implementation | Rebuilt (14 pages, shared design system) |
| Harness (automated checks) | Implemented |
| Local quality checks | Passing – see [docs/QUALITY_SCORE.md](docs/QUALITY_SCORE.md) |
| Browser smoke test | Performed locally (desktop + mobile) |
| Live deployment | **Not performed as part of this rebuild – owner approval required** |
| Owner review of claims | **Pending** – see [docs/OWNER_REVIEW.md](docs/OWNER_REVIEW.md) |
| Legal/DPO review | **Pending** – see [docs/APPROVAL_LOG.md](docs/APPROVAL_LOG.md) |

Nothing in this repository should be described as "live" or "approved" until the owner has
signed off and the change has actually been deployed and verified online.

## Quick start

No installation or build step is required. To preview the site locally:

```bash
cd docs
python3 -m http.server 8000
# open http://localhost:8000
```

Run the harness checks from the repository root:

```bash
python3 harness/scripts/check_site.py --report harness/reports/latest.json
python3 harness/scripts/check_secrets.py
python3 harness/scripts/check_docs.py
```

The same checks run in CI via [.github/workflows/quality.yml](.github/workflows/quality.yml)
on every push and pull request.

## Repository structure

```
.
├── docs/                     # GitHub Pages publishing directory (the website)
│   ├── index.html            # homepage – required entry point
│   ├── om.html               # organisation and owner
│   ├── tjenester.html        # service overview
│   ├── fremmedtolkning.html
│   ├── telefontolkning.html
│   ├── videotolkning.html
│   ├── skriftligoversaettelse.html
│   ├── mentorforloeb.html
│   ├── familiekonsulent.html
│   ├── projekter.html
│   ├── kontakt.html
│   ├── privatliv.html
│   ├── tilgaengelighed.html
│   ├── 404.html
│   ├── assets/               # shared CSS, JS, images
│   ├── CNAME                 # gila-brobygger.dk
│   ├── robots.txt
│   ├── sitemap.xml
│   ├── _config.yml           # keeps engineering docs out of the published site
│   └── *.md                  # engineering documentation (not published)
├── harness/                  # validation scripts, config and reports
├── plans/                    # active plan and archived plans
├── archive/                  # preserved legacy material – not published
├── AGENTS.md                 # instructions for AI agents and maintainers
├── PROJECT.md                # organisation and project context
└── README.md
```

The engineering documentation in `docs/*.md` is excluded from the published website through
`docs/_config.yml`. It stays next to the site so that documentation and implementation are
reviewed together.

## Documentation map

| Document | Purpose |
|---|---|
| [AGENTS.md](AGENTS.md) | Working rules for agents and maintainers |
| [PROJECT.md](PROJECT.md) | Organisation, scope, audiences, goals |
| [docs/ORGANISATION.md](docs/ORGANISATION.md) | Services, activities, experience, unknowns |
| [docs/WEBSITE_SPEC.md](docs/WEBSITE_SPEC.md) | Information architecture and page requirements |
| [docs/BRAND.md](docs/BRAND.md) | Visual identity, voice and tone |
| [docs/INVARIANTS.md](docs/INVARIANTS.md) | Rules that must never be broken |
| [docs/SECURITY.md](docs/SECURITY.md) | Security, privacy and data flows |
| [docs/PRIVACY_NOTICE.md](docs/PRIVACY_NOTICE.md) | Draft privacy notice (Danish) |
| [docs/TESTING.md](docs/TESTING.md) | Test strategy and manual checklists |
| [docs/SEO.md](docs/SEO.md) | Metadata, canonical URLs, sitemap, structured data |
| [docs/ACCESSIBILITY.md](docs/ACCESSIBILITY.md) | Accessibility commitments and known gaps |
| [docs/HARNESS.md](docs/HARNESS.md) | Harness architecture, gates and extension guide |
| [docs/QUALITY_SCORE.md](docs/QUALITY_SCORE.md) | Current quality scorecard |
| [docs/APPROVAL_LOG.md](docs/APPROVAL_LOG.md) | Owner and legal/DPO approval log |
| [docs/OWNER_REVIEW.md](docs/OWNER_REVIEW.md) | Facts and decisions awaiting the owner |
| [docs/LAUNCH_CHECKLIST.md](docs/LAUNCH_CHECKLIST.md) | Launch checklist, owner tasks, external-provider tasks |
| [plans/ACTIVE.md](plans/ACTIVE.md) | Current plan and open gates |

## Contact details used on the website

- E-mail: `kontakt@gila-brobygger.dk`
- Phone: `+45 31 84 70 40`

Both were supplied by the owner. The mailbox and phone number have **not** been independently
verified. See [docs/OWNER_REVIEW.md](docs/OWNER_REVIEW.md).

## Deployment

The publishing configuration is:

- Branch `main`
- Directory `/docs`
- Custom domain `gila-brobygger.dk` (file `docs/CNAME`)

Deployment is a controlled action. Do not push to `main` or change DNS without explicit owner
approval. Exact commit and push instructions are provided in the rebuild report; the rebuild
itself deliberately does not commit, push or deploy.
