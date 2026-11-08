# 0002 – No forms; contact by e-mail and phone

- **Date:** 2026-11-08
- **Status:** Accepted (owner confirmation requested, A-05)
- **Supersedes:** three Formspree forms on the previous homepage

## Context

The previous homepage contained three forms posting to `https://formspree.io/f/...`. That is a
third-party processor receiving personal data, including potentially sensitive family and case
information, without a documented legal basis, retention rule or privacy review. The integration
was not approved and could not be verified.

## Decision

Remove the forms. Contact happens through `mailto:kontakt@gila-brobygger.dk` and
`tel:+4531847040`. The contact page and service pages warn visitors not to send CPR numbers,
health information or family-case details in a first enquiry.

## Consequences

- No personal data is collected by the website itself.
- The visitor's own e-mail client or phone app handles the message.
- No spam protection, no structured enquiries and no analytics on conversions.
- If a form is ever added, it needs owner approval **and** legal/DPO review before launch,
  including purpose, legal basis, processor agreement, retention and a privacy notice update.

## Alternatives considered

- Self-hosted form endpoint: still collects personal data and adds a server to maintain.
- Formspree with a privacy review: rejected because the data flow and necessity were not
  established.
