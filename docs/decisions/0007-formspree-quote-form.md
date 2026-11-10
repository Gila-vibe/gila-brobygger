# 0007 – Formspree for quote form submission

- **Date:** 2026-11-09
- **Status:** Implemented; legal/DPO review pending (A-19)
- **Supersedes:** Decision 0002 (no forms) — partially, for the quote form only

## Context

The owner requested a working quote form that actually sends e-mails to `kontakt@gila-brobygger.dk`,
including support for file attachments. The original site used Formspree forms. Decision 0002
removed them to avoid unapproved data collection. However, the owner has now explicitly requested
a working submission mechanism.

## Decision

Implement the quote form using Formspree as the submission backend:

- The form posts to `https://formspree.io/f/<FORM_ID>` (owner must create account and replace
  placeholder).
- Fields: name (required), company/CVR, e-mail (required), service (required), notes, deadline,
  file upload.
- File uploads require a paid Formspree plan.
- The form includes a booking section (date/time) for interpreting services.
- Data is sent to Formspree's servers (US-based third party) and forwarded as e-mail.

## Consequences

- The website now collects and transmits personal data through a third-party processor.
- This requires owner approval (granted by request) and legal/DPO review before launch.
- The privacy notice has been updated to mention Formspree.
- The harness invariant S2 has been updated to allow Formspree forms only.
- The `check_site.py` harness now allows `<form>` elements with `action` containing `formspree.io`.
- If legal review rejects Formspree, the form must be reverted to mailto-based (Decision 0002).

## Alternatives considered

- Cloudflare Pages Functions: more control, but requires moving hosting from GitHub Pages to
  Cloudflare Pages. More complex setup.
- EmailJS: client-side only, but less reliable and still a third-party processor.
- Keeping mailto-only: rejected by owner who wants automatic submission.

## What must happen before launch

1. Owner creates Formspree account and provides the form ID.
2. Legal/DPO review of Formspree's DPA, retention, and data transfer to US.
3. Privacy notice updated with final Formspree details.
4. Form tested end-to-end with real submissions.
