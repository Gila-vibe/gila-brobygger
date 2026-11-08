# PROJECT.md – Gila Brobygger

## 1. Purpose

Gila Brobygger helps people and institutions understand each other across language, culture and
public systems. The digital project exists to:

- present the whole organisation clearly and credibly;
- make the six services understandable to the people who need them;
- make contact simple and low-risk (e-mail and phone, no data collection);
- give the owner a maintainable, documented website that can grow without a developer;
- keep every public claim traceable to an owner-confirmed fact.

The website is a shop window and an information surface. It is not a booking system, a case
system, a payment system or a client portal.

## 2. Organisation scope

Gila Brobygger is treated as a complete organisation. The family consultant service is **one of
six services**, not the whole organisation. The site therefore covers:

| Service | Danish page | Short description |
|---|---|---|
| Interpretation, in person | `docs/fremmedtolkning.html` | Interpreting with physical presence at meetings, home visits and institutions |
| Telephone interpreting | `docs/telefontolkning.html` | Fast remote interpreting by phone |
| Video interpreting | `docs/videotolkning.html` | Online interpreting with visual contact |
| Written translation | `docs/skriftligoversaettelse.html` | Translation of letters, documents and official papers, from and to Tigrinya |
| Social mentoring | `docs/mentorforloeb.html` | Individual mentoring, system guidance and everyday counselling |
| Family consultant | `docs/familiekonsulent.html` | Support and guidance for families, communication and cooperation with authorities |
| Support person (§ 75) | `docs/stoetteperson.html` | Support person under Barnets Lov § 75 for children in care and their families |

Working languages, availability, pricing and geographic coverage are **not** confirmed in this
repository. Do not publish them until the owner confirms them. See
[`docs/OWNER_REVIEW.md`](docs/OWNER_REVIEW.md).

## 3. Audiences

Primary audiences, inferred from the service descriptions and existing content:

1. **Public authorities and institutions** – municipalities, schools, daycare, social services,
   health services, police and courts that need an interpreter or a cultural bridge.
2. **Families and individuals** – people who need help understanding Danish systems, documents or
   meetings, including Eritrean/Tigrinya-speaking families.
3. **Partners and referrers** – NGOs, asylum and integration services, educational institutions,
   mentors and caseworkers who refer people to Gila Brobygger.
4. **The owner** – needs to update text and contact details without breaking the site.

Audience assumptions must be validated with the owner before being used to justify new claims.

## 4. Owner-supplied facts used on the website

The following were supplied by the owner (through earlier project material) and are presented as
owner statements, not independently verified facts:

- The organisation is called **Gila Brobygger** and is run by Gila.
- Gila comes from Eritrea and has lived in Denmark for approximately 11 years.
- In Eritrea, Gila was trained and worked as a teacher (natural sciences).
- BA in *Erhvervssprog og IT-baseret Kommunikation* from UCSYD, Haderslev.
- Currently studying a master's in *IT og Kommunikation* at SDU, Kolding.
- More than 8 years of interpreting experience, including as a police-approved interpreter at
  Tolk Service, Kolding.
- Family consultant at Memøx since 2020, working with families from Eritrea.
- Mentor in a municipality, supporting citizens in public systems.
- Centre employee at AsylSyd.
- Teacher at FGU Tønder and Kolding Ungdomsskole.
- Support person under § 75 of Barnets Lov for children in care and their families.
- Contact: `kontakt@gila-brobygger.dk`, `+45 31 84 70 40`.
- Working language pair for translation: Danish ↔ Tigrinya.

Each of these needs explicit owner confirmation before launch; see `docs/OWNER_REVIEW.md`.
Where a claim is uncertain, the website wording is deliberately general rather than specific.

## 5. What is deliberately not claimed

- No prices, hourly rates or package prices.
- No response-time or availability guarantees.
- No customer testimonials, case stories, client logos or named partners.
- No certifications, authorisations or memberships beyond what is listed above.
- No street address, CVR number, opening hours or social media profiles.
- No claim of GDPR compliance, DPO appointment or legal approval.
- No claim that the site is live, deployed or approved before that is actually verified.

## 6. Digital principles

1. **Static and honest** – no server-side processing, no forms, no tracking, no cookies.
2. **Accessible** – WCAG 2.1 AA is the target; see `docs/ACCESSIBILITY.md`.
3. **Fast** – system fonts, one CSS file, one JS file, optimised portrait (< 70 kB).
4. **Maintainable** – consistent page shell; text edits do not require tooling.
5. **Traceable** – every claim maps to an owner statement or a documented decision.
6. **Private by design** – the chatbot runs locally and stores nothing; contact is `mailto:`/`tel:`.
7. **Reversible** – deployment is a normal commit to `main`; rollback is `git revert`.

## 7. Success criteria

- A visitor understands within one screen what Gila Brobygger does and how to make contact.
- Each of the six services has a clear, jargon-light page.
- Every internal link, anchor and asset resolves.
- The harness passes on a clean checkout, in CI, without network access to third parties.
- The owner can find where to change text and contact details.
- Pending decisions are visible instead of hidden in code.

## 8. Governance

- **Owner** – approves identity, services, claims, contact details, content deletion, paid
  commitments and deployment.
- **Legal/DPO review** – required for personal data, case information, forms, tracking, third-party
  sharing and retention.
- **Maintainer/agent** – implements, tests, documents and reports; never self-approves.
- Decisions with lasting consequences are recorded in `docs/decisions/`.
- Approvals are recorded in `docs/APPROVAL_LOG.md`.

## 9. Constraints and risks

| Constraint / risk | Mitigation |
|---|---|
| Unverified personal and professional claims | Listed in `docs/OWNER_REVIEW.md`; wording kept general |
| Contact mailbox/phone may not be monitored | Owner confirmation required before launch |
| Interpreting involves sensitive situations | No forms, no case data, explicit warnings on contact pages |
| Chatbot could invite sensitive disclosure | Local-only bot, no storage, visible warning, no CPR/health prompts |
| Nested `docs/gila-brobygger/` is an empty ignored repository | Left untouched; documented as unusable |
| Owner may not be technical | Plain HTML, documentation map, simple file names |
| Domain/DNS changes could break e-mail | Deployment and DNS changes gated by owner approval |

## 10. Related documents

- Organisation detail: [`docs/ORGANISATION.md`](docs/ORGANISATION.md)
- Website specification: [`docs/WEBSITE_SPEC.md`](docs/WEBSITE_SPEC.md)
- Invariants: [`docs/INVARIANTS.md`](docs/INVARIANTS.md)
- Harness: [`docs/HARNESS.md`](docs/HARNESS.md)
- Approvals: [`docs/APPROVAL_LOG.md`](docs/APPROVAL_LOG.md)
- Owner review list: [`docs/OWNER_REVIEW.md`](docs/OWNER_REVIEW.md)
- Active plan: [`plans/ACTIVE.md`](plans/ACTIVE.md)
