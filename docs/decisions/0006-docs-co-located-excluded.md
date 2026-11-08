# 0006 – Engineering docs live beside the site but are excluded from publication

- **Date:** 2026-11-08
- **Status:** Accepted

## Context

GitHub Pages publishes the whole `/docs` directory. The project needs engineering documentation
(specification, security, testing, approvals) to live close to the code so it is reviewed in the
same change. Publishing that documentation would expose internal notes, approval status and
security detail on the public website.

## Decision

Keep the Markdown documents in `docs/` and add `docs/_config.yml` with:

```yaml
exclude:
  - "*.md"
  - "plans"
  - "decisions"
  - "gila-brobygger"
```

GitHub Pages runs Jekyll for the directory; files without front matter are copied verbatim, and
the exclusions keep documentation out of the generated site.

## Consequences

- Documentation and implementation are versioned and reviewed together.
- The public site contains only HTML, assets and crawler files.
- The exclusion must be kept in sync when new documentation folders are added.
- `check_site.py` fails if the exclusion disappears.
- If the project ever adopts `.nojekyll`, the exclusion stops working and an alternative
  publication layout is required.

## Alternatives considered

- Move docs to a separate `/docs-engineering` directory: publishing config would need to change,
  which is a bigger, owner-approved infrastructure change.
- Publish docs: rejected for privacy and clarity.
