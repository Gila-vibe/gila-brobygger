# AGENTS.md – instructions for AI agents and maintainers

This file is the entry point for anyone (human or AI) changing the Gila Brobygger project.
Read it fully before editing. It is intentionally strict: this is a real organisation's public
website, published under a real domain.

## 1. Scope

The project covers the **whole Gila Brobygger organisation**, not only the family consultant
service. All pages, services, activities, documents, infrastructure and future development are in
scope. Treat interpretation, translation, mentoring, family support and organisational content as
equal parts of one coherent digital presence.

The website lives in `docs/` and is published by GitHub Pages from branch `main`, directory
`/docs`, at `https://gila-brobygger.dk`.

## 2. Read first

Before a substantial change, read:

1. `PROJECT.md` – organisation, goals, verified facts and open questions
2. `docs/ORGANISATION.md` – services, activities and experience
3. `docs/WEBSITE_SPEC.md` – information architecture and page requirements
4. `docs/BRAND.md` – visual identity, voice and tone
5. `docs/INVARIANTS.md` – non-negotiable rules
6. `docs/SECURITY.md` – privacy and security rules
7. `docs/TESTING.md` – what must be tested

Also read the specific page and shared assets you are about to change. For content work, read
`docs/OWNER_REVIEW.md` so you do not "fix" something that is waiting for an owner decision.

## 3. Non-negotiable content rules

- All public website copy is in **Danish**.
- Do **not** invent or "improve" facts. No invented qualifications, approvals, certifications,
  partnerships, testimonials, client names, results, statistics, prices, opening hours, addresses,
  response times, guarantees or legal status.
- Only publish information that is in this repository and traceable to the owner or to an
  existing page. When something is uncertain, write it in `docs/OWNER_REVIEW.md` and, if it must
  appear on the site, mark it clearly as a placeholder.
- Use respectful, plain, non-stigmatising language about children, families, migrants and
  interpreters. Never imply that a family is "difficult", "failed" or "unintegrated".
- Do not publish case stories, client information or anything that could identify a family.
- Keep the contact details exactly as supplied (`kontakt@gila-brobygger.dk`, `+45 31 84 70 40`)
  until the owner confirms a change.
- Never claim GDPR compliance, DPO appointment or legal approval. Those are separate reviews.

## 4. Non-negotiable technical rules

- Static site only: semantic HTML, one shared CSS file, minimal JavaScript.
- No build process, bundler, package manager or framework unless approved and documented.
- No external fonts, CDNs, embeds, iframes, analytics, pixels, cookies or third-party scripts.
  The site must work offline after download and must not send visitor data anywhere.
- No forms that collect personal data. Contact is via `mailto:` and `tel:` only.
- All local links and asset paths must be relative and must resolve inside `docs/`.
- `docs/index.html` must exist; `docs/CNAME` must contain exactly `gila-brobygger.dk`.
- Never commit secrets, `.env` files, tokens, keys, passwords, private documents or client data.
- Keep `docs/_config.yml` excluding `*.md` so engineering documentation is not published.
- Accessibility is a requirement, not a nice-to-have: one `<h1>` per page, skip link, landmarks,
  labelled controls, alt text, visible focus, keyboard-operable navigation, no colour-only meaning.
- Do not weaken a check to make it pass. Fix the cause, or document a time-boxed exception in
  `docs/APPROVAL_LOG.md` with owner sign-off.

## 5. Task workflow

1. **Understand** – state the goal, inspect the relevant files, list risks and acceptance criteria.
2. **Plan** – for anything non-trivial, update `plans/ACTIVE.md` with steps and gates.
3. **Implement** – make the smallest complete change, consistent with existing patterns.
4. **Validate** – run all three checks:
   ```bash
   python3 harness/scripts/check_site.py
   python3 harness/scripts/check_secrets.py
   python3 harness/scripts/check_docs.py
   ```
5. **Smoke test** – serve `docs/` locally and check desktop + mobile, navigation, skip link,
   keyboard focus, contact links and the chatbot. Verify no third-party requests in the network tab.
6. **Review** – re-read the diff, check for duplicated or contradictory documentation, and update
   the documents whose facts or behaviour changed.
7. **Report** – list changed files, commands actually run, results, and anything not verified.
   Never claim a check passed if it was not run.

## 6. Approval gates

Stop and ask the owner **before**:

- publishing or deploying a significant change;
- changing organisational identity, name, brand positioning or visual identity;
- adding, removing or renaming a service;
- publishing a significant claim (experience, approvals, partnerships, results, prices);
- deleting important content, pages or infrastructure;
- introducing paid services, subscriptions or financial commitments;
- changing hosting, domain, DNS, email routing or the GitHub Pages configuration.

Request **legal/DPO review** before:

- collecting or processing personal or sensitive personal data;
- publishing client or family case information;
- adding forms, chat features or any data-collection mechanism;
- adding tracking, analytics or non-essential cookies;
- sharing data with a third party;
- defining privacy, retention or data-processing arrangements.

A chatbot that runs entirely in the browser, stores nothing and sends nothing is still a feature
that needs a documented data-flow review before it is treated as approved.

Owner approval never replaces legal review, and legal review never replaces owner approval.

## 7. Definition of done

A task is done only when:

- the change is implemented and consistent with the design system;
- `check_site.py`, `check_secrets.py` and `check_docs.py` pass;
- links, anchors and assets resolve;
- accessibility basics are preserved;
- documentation affected by the change is updated;
- approvals that are still missing are explicitly listed;
- the report distinguishes verified behaviour from assumptions.

## 8. Where to record things

| Information | Location |
|---|---|
| Organisation facts and unknowns | `docs/ORGANISATION.md`, `docs/OWNER_REVIEW.md` |
| Design and content rules | `docs/WEBSITE_SPEC.md`, `docs/BRAND.md` |
| Runtime architecture and checks | `docs/HARNESS.md` |
| Test evidence and manual checks | `docs/TESTING.md`, `harness/reports/` |
| Approvals and reviews | `docs/APPROVAL_LOG.md` |
| Decisions with lasting consequences | `docs/decisions/` |
| Current work | `plans/ACTIVE.md` |

## 9. Legacy material

`archive/` preserves earlier versions and unused assets. It is intentionally excluded from the
published site and from the quality checks. Do not delete it without owner approval; its purpose
is traceability. The original photo in `archive/legacy-assets/` contains EXIF/GPS metadata and
must never be copied into `docs/`.
