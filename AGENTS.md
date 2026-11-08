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

### 1. Owner Sign-off
The project owner must approve:
- Major website design and branding changes.
- Changes to organisational identity and services.
- Important public-facing content.
- Website deployment.
- Paid services and subscriptions.
- Significant infrastructure changes.
- Deletion of important content or functionality.

### 2. Legal/DPO Review
Require appropriate legal or data protection review before:
- Collecting or storing personal information.
- Processing sensitive personal information.
- Introducing client or family case-management features.
- Implementing chatbots that process personal data.
- Adding tracking, analytics or cookies.
- Sharing personal information with third parties.
- Changing privacy policies or data retention practices.

### 3. Approval workflow
For each proposed change:
1. Identify the type of change.
2. Assess business, security, privacy and legal risks.
3. Identify required approvals.
4. Explain the proposed change and its consequences.
5. Request approval from the appropriate person.
6. Wait for explicit approval before proceeding with restricted actions.
7. Record the decision, date, approver and conditions in `docs/APPROVAL_LOG.md`.

### 4. Important rules
- Owner approval does not replace legal or DPO review.
- Legal/DPO review does not replace owner approval.
- Do not claim GDPR compliance without appropriate verification.
- Do not invent legal approval or DPO approval.
- Do not deploy without explicit owner approval.
- Do not use real sensitive personal data in testing.
- Do not block ordinary low-risk development unnecessarily.

## Definition of done
A task is not complete merely because code was written. Relevant checks must pass, links must be verified, and any unverified behavior must be clearly disclosed.
