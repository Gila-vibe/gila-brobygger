# Gila Brobygger – agent instructions

## Mission
Maintain a clear, trustworthy, accessible Danish website for Gila Brobygger as a complete organisation. Preserve the organisation's actual identity and only publish claims that have been confirmed by the owner. The family consultant service is one part of the organisation's offering, not the entirety of the project.

## Read first
For every substantial task, read:
1. `PROJECT.md`
2. `docs/WEBSITE_SPEC.md`
3. `docs/BRAND.md`
4. `docs/INVARIANTS.md`
5. The relevant page and shared assets

Read `docs/SECURITY.md` and `docs/TESTING.md` when a task touches forms, personal data, dependencies, deployment or site behavior.

## Working rules
- Inspect the current files before editing.
- The website is not exclusively about family consulting; all services and pages of Gila Brobygger must be handled consistently.
- Make small, focused changes; do not rewrite unrelated pages.
- Keep all public-facing website copy in Danish unless explicitly requested otherwise.
- Use plain, respectful, inclusive language. Avoid stigmatizing language about children or families.
- Do not invent qualifications, approvals, testimonials, partnerships, service guarantees, prices, availability, addresses, phone numbers or legal status.
- Preserve the supplied contact email until the owner confirms a change.
- Keep navigation, contact links and page titles consistent.
- Prefer semantic HTML, responsive CSS and minimal JavaScript.
- Do not add tracking, analytics, cookies, forms, chat widgets or external embeds without an explicit requirement and privacy review.
- Never put secrets, credentials, personal case information or sensitive family data in the repository.

## Task workflow
1. Summarize the goal and inspect relevant files.
2. Identify affected pages, risks and acceptance criteria.
3. For non-trivial changes, write a plan in `plans/ACTIVE.md`.
4. Implement the smallest complete change.
5. Run `python3 harness/scripts/check_site.py`.
6. Run a browser-based smoke test when browser tooling is available; verify mobile navigation and every contact CTA.
7. Review the diff and update documentation if behavior or architecture changed.
8. Report changed files, tests actually run, results, and anything not verified.

## Approval required
Ask the owner before:
- Publishing or deploying to the live domain.
- Deleting or replacing existing live content.
- Changing contact details or public service claims.
- Adding forms that collect personal or sensitive information.
- Adding analytics, advertising pixels, cookies or external services.
- Changing hosting, DNS, email routing or security settings.

## Definition of done
A task is not complete merely because code was written. Relevant checks must pass, links must be verified, and any unverified behavior must be clearly disclosed.
