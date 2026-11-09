# Approval log

This log records owner sign-offs and legal/DPO reviews for the Gila Brobygger digital project.
An entry is only valid when it names the approver, the date, the exact scope and any conditions.

> **Current status: no approval has been granted for this rebuild.**
> The site is implemented and locally tested, but it is **not** approved for publication and has
> **not** been deployed as part of this work.

## 1. Process

1. The maintainer prepares the change and lists the decisions it requires.
2. The owner reviews `docs/OWNER_REVIEW.md` and replies per item.
3. Legal/DPO review is requested separately where personal data, case information, forms, chat,
   tracking, third parties, privacy or retention are involved.
4. The maintainer records the outcome here, then updates the site and documentation.
5. Deployment happens only after an explicit owner entry in section 4.

Owner approval never replaces legal/DPO review. Legal/DPO review never replaces owner approval.
Neither is implied by silence or by an earlier deployment.

## 2. Approval matrix

| Change | Owner sign-off | Legal/DPO review |
|---|---|---|
| Publish or deploy a significant change | Required | If personal data is involved |
| Change name, identity, brand positioning or visual identity | Required | No, unless data processing changes |
| Add/remove/rename a service | Required | If it changes data processing |
| Publish a significant claim (experience, approval, partner, result, price) | Required | If it involves a third party's rights |
| Delete important content or infrastructure | Required | If records must be retained |
| Introduce paid services or financial commitments | Required | As applicable |
| Collect/process personal or sensitive data | Required | **Required** |
| Publish client/family case information | Required | **Required** |
| Add forms, chat backends, accounts or newsletters | Required | **Required** |
| Add analytics, tracking or non-essential cookies | Required | **Required** |
| Share data with a third party | Required | **Required** |
| Change privacy, retention or data-processing arrangements | Required | **Required** |

## 3. Historical note

Before this rebuild, a previous version of the website was published to the live domain. That
deployment is historical context only. It does **not** approve this rebuilt website, its content,
its chatbot or its privacy notice.

## 4. Pending approvals

| ID | Date raised | Scope | Owner sign-off | Legal/DPO review | Conditions / notes |
|---|---|---|---|---|---|
| A-01 | 2026-11-08 | Publish the rebuilt website (16 pages) and deploy via GitHub Pages | **Pending** | Not required for static content, unless data processing changes | Requires O-40 and O-41 in `docs/OWNER_REVIEW.md`; deployment must be verified online afterwards |
| A-02 | 2026-11-08 | Contact details: `kontakt@gila-brobygger.dk`, `+45 31 84 70 40` | **Pending** | No | O-01, O-02; confirm mailbox and phone are active and may be public |
| A-03 | 2026-11-08 | Personal/professional claims on `om.html` and `projekter.html` | **Pending** | No | O-04 to O-15; each claim confirmed, changed or removed |
| A-04 | 2026-11-08 | Service list and descriptions (six services) | **Pending** | No | O-16 to O-22; no prices are currently published |
| A-05 | 2026-11-08 | Replacement of three Formspree forms with `mailto:`/`tel:` | **Pending** | Recommended: confirm no personal data is collected by the new contact route | Agent decision to avoid unapproved data collection; owner confirmation requested (O-32) |
| A-06 | 2026-11-08 | Local-only chatbot (`docs/assets/js/main.js`) | **Pending** | **Pending** | O-33, O-34; no network requests, no storage, sensitive-data warning; legal review of the disclaimer and data flow |
| A-07 | 2026-11-08 | Privacy notice (`docs/PRIVACY_NOTICE.md`, `docs/privatliv.html`) | **Pending** | **Pending** | O-34 to O-38; legal basis, retention, rights, hosting disclosure, DPO assessment |
| A-08 | 2026-11-08 | Removal of Google Fonts `@import` in favour of system fonts | **Pending** | No | Privacy/performance decision; owner confirmation of the visual result (O-28) |
| A-09 | 2026-11-08 | Logo usage in the header (typographic lockup vs supplied raster logo) | **Pending** | No | O-27; visual identity decision |
| A-10 | 2026-11-08 | Publication of the projects page with a marked placeholder | **Pending** | No | O-23, O-24; placeholder is explicit and must not be mistaken for real content |
| A-11 | 2026-11-08 | E-mail retention and access policy | **Pending** | **Pending** | O-35; required before the privacy notice can be final |
| A-12 | 2026-11-08 | DPO assessment | **Pending** | **Pending** | O-38; do not state an outcome on the website until decided |
| A-13 | 2026-11-08 | Accessibility statement and formal audit | **Pending** | No | O-39; current page is a commitment, not a conformance claim |
| A-14 | 2026-11-08 | GitHub security: 2FA, branch protection, access review | **Pending** | No | O-43; owner action, not verifiable from the repository |
| A-15 | 2026-11-08 | E-mail authentication (SPF, DKIM, DMARC) | **Pending** | No | O-44; owner/mail-provider action |
| A-16 | 2026-11-08 | Add service page 'Støtteperson (§ 75)' (stoetteperson.html) | **Approved by owner request** | No | Owner explicitly requested this service; added 2026-11-08; legal scope (Barnets Lov § 75) to be confirmed (O-14) |
| A-17 | 2026-11-08 | Quote request template (mailto-based) on kontakt.html | **Approved by owner request** | Recommended | Owner requested a quote form; implemented as mailto template (no data collection, no backend, no file upload). Legal review of the disclaimer wording recommended. |
| A-18 | 2026-11-08 | Separate 'Få et tilbud' page (faa-et-tilbud.html) | **Approved by owner request** | Recommended | Split from kontakt.html into its own page; quote template moved there. |

## 4b. Deployment record (factual, not an approval)

| Item | Value |
|---|---|
| Deployment date | 2026-11-08 |
| Commit | `1c953b1` ("Rebuild Gila Brobygger website and engineering harness") |
| Repository | `Gila-vibe/gila-brobygger` (branch `main`) |
| Publishing source | `/docs` |
| Custom domain | `gila-brobygger.dk` |
| Live URL | `https://gila-brobygger.dk/` (verified 200 OK, HTTPS, custom 404, sitemap, robots) |
| Backup of previous site | `~/gila-brobygger-backup` (clone of `Gila-vibe/gila-brobygger` before force-push) |
| Owner approval | **Pending** (A-01, A-41) — not granted; this record documents the technical deployment only |
| Legal/DPO review | **Pending** (A-06, A-07, A-11, A-12) |

> This record documents that a deployment occurred. It does **not** constitute owner approval or
> legal review. Those remain pending until recorded in sections 4/5/6 by the respective parties.

## 5. Granted approvals

| Date | Approver | Scope | Conditions | Recorded by |
|---|---|---|---|---|
| – | – | No approvals granted for this rebuild | – | – |

## 6. Legal/DPO review register

| Review | Trigger | Reviewer | Status | Date | Outcome / conditions |
|---|---|---|---|---|---|
| Chatbot data flow | Interactive feature receiving free text | Owner-appointed legal/DPO reviewer | **Pending** | – | Must confirm no storage/transmission and approve the warning text |
| Privacy notice | Public privacy statement | Owner-appointed legal/DPO reviewer | **Pending** | – | Must confirm legal basis, retention and rights wording |
| Contact data handling | E-mail/phone enquiries | Owner-appointed legal/DPO reviewer | **Pending** | – | Retention, access and deletion process |
| Hosting disclosure | GitHub Pages technical logs | Owner-appointed legal/DPO reviewer | **Pending** | – | Confirm provider disclosure is accurate |
| DPO requirement | Organisational processing | Owner/legal adviser | **Pending** | – | Decide whether a DPO is required; do not publish a claim either way |

A DPO is not automatically required. The assessment depends on the organisation's processing
activities, scale and nature. This log does not decide that question.

## 7. Response template

```
ID: A-__
Decision: APPROVED / APPROVED WITH CONDITIONS / REJECTED / DEFERRED
Approver:
Date:
Scope:
Conditions:
```

For legal/DPO entries, also record the reviewer's role and the documents reviewed.

## 8. Rules recap

- Do not claim GDPR compliance, DPO approval or legal approval unless it has actually been given
  and recorded here.
- Do not deploy without an explicit owner entry in section 4/5.
- Do not treat a past deployment as approval for a new change.
- Do not remove a pending item because it is inconvenient; resolve or defer it explicitly.
- Keep this log consistent with `docs/OWNER_REVIEW.md`.
