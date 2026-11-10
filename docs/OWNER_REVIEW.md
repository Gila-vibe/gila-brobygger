# Owner review

Everything in this document needs a decision from the owner before the website can be considered
approved for launch. Nothing here is a legal approval, and nothing here has been verified
independently.

**Status legend:** `OPEN` – waiting for the owner · `CONFIRMED` – owner has approved · `CHANGED` –
owner asked for a different wording · `REMOVED` – owner asked to remove it.

## 1. Contact details

| ID | Item | Where | Question for the owner | Status |
|---|---|---|---|---|
| O-01 | E-mail `kontakt@gila-brobygger.dk` | Header CTA, footer, contact pages, privacy page | Is the mailbox active, monitored and correct? Who reads it? | OPEN |
| O-02 | Phone `+45 31 84 70 40` | Footer, contact card, contact page | Is the number correct, and may it be published? Is it a mobile/private number? | OPEN |
| O-03 | Response expectations | Contact page | May we state a response time? (Currently none is promised.) | OPEN |

## 2. Personal and professional claims

These appear on `docs/om.html` and `docs/projekter.html`. Please confirm each, correct dates, and
say whether the organisation name may be mentioned publicly.

| ID | Claim | Question | Status |
|---|---|---|---|
| O-04 | Comes from Eritrea; has lived in Denmark ~11 years | Correct? Should the number of years be published? | OPEN |
| O-05 | Trained and worked as a teacher in Eritrea (natural sciences) | Correct subject and level? | OPEN |
| O-06 | BA in *Erhvervssprog og IT-baseret Kommunikation*, UCSYD Haderslev | Correct title, institution and year? | OPEN |
| O-07 | Master's student in *IT og Kommunikation*, SDU Kolding | Correct programme and status? | OPEN |
| O-08 | 8+ years as an interpreter | Exact start year? | OPEN |
| O-09 | Police-approved interpreter at Tolk Service, Kolding | Correct wording? May the organisation be named? | OPEN |
| O-10 | Family consultant at Memøx since 2020 | Correct title and start year? May Memøx be named? | OPEN |
| O-11 | Mentor in a municipality | Which municipality, and may it be named? | OPEN |
| O-12 | Centre employee at AsylSyd | Correct period and role? May AsylSyd be named? | OPEN |
| O-13 | Teacher at FGU Tønder and Kolding Ungdomsskole | Correct institutions and period? | OPEN |
| O-14 | Support person under § 75 of Barnets Lov | Correct legal reference and wording? | OPEN |
| O-15 | Working language pair Danish ↔ Tigrinya | Correct? Are there other working languages? | OPEN |

If a claim cannot be confirmed, the page should be reworded more generally or the claim removed.
The owner decides which; the maintainer must not soften a claim into something misleading.

## 3. Services and scope

| ID | Item | Question | Status |
|---|---|---|---|
| O-16 | Six services: in-person, phone and video interpreting; written translation; social mentoring; family consultant | Is the list complete and correctly named? | OPEN |
| O-17 | Service descriptions and examples | Are the described situations realistic and representative? | OPEN |
| O-18 | Geographic coverage | Which areas are actually covered? (None is published now.) | OPEN |
| O-19 | Availability | Are there days/times when contact is preferred? | OPEN |
| O-20 | Prices | Should prices be published? If yes, exact figures and terms are required. | OPEN |
| O-21 | Invoicing, cancellation, travel | Should any commercial terms be published? | OPEN |
| O-22 | Translation certification | Are translations certified/authorised, or explicitly not? | OPEN |

## 4. Projects and activities

| ID | Item | Question | Status |
|---|---|---|---|
| O-23 | `docs/projekter.html` placeholder | Provide any real projects: name, purpose, period, target group, role, funder/partner, permission to publish. | OPEN |
| O-24 | Named partners or funders | May any organisation be named as a partner? Written permission needed. | OPEN |
| O-25 | News / updates | Is a news section wanted now, or later? | OPEN |

## 5. Identity and design

| ID | Item | Question | Status |
|---|---|---|---|
| O-26 | Name and spelling "Gila Brobygger" | Confirm the official name and capitalisation. | OPEN |
| O-27 | Logo | The supplied logo has been added to the site header as a transparent, white-background-trimmed PNG (`gila-brobygger-logo-transparent.png`), replacing the green "G" tile. The owner-supplied original (`gila-brobygger-logo.png`) is retained. Confirm the visual result is acceptable, or request the typographic lockup back. | OPEN |
| O-28 | Palette and typography | Accept the green palette and system fonts, or supply brand colours/fonts? | OPEN |
| O-29 | Portrait | May the portrait be published? Is the crop acceptable? | OPEN |
| O-30 | Tagline "Bro mellem mennesker, sprog og systemer" | Approve, change or remove. | OPEN |
| O-31 | Legal form, CVR number, registered address, insurance | Required before a legal-info line can be added to the footer. Please supply: (a) CVR number, (b) juridisk form (e.g. enkeltmandsvirksomhed, ApS), (c) registered address, (d) any insurance/erhvervsansvarsforsikring to disclose. Nothing is published now. | OPEN |

## 6. Privacy, chatbot and legal review

| ID | Item | Question / action | Status |
|---|---|---|---|
| O-32 | Removal of the three Formspree forms | The rebuild replaced them with `mailto:`/`tel:` to avoid unapproved data collection. Confirm this is acceptable. | OPEN |
| O-33 | Local-only chatbot | The bot answers from fixed keyword rules, sends nothing and stores nothing. Confirm whether it should stay, and approve the visible disclaimer. | OPEN |
| O-34 | Privacy notice (`docs/PRIVACY_NOTICE.md`, `docs/privatliv.html`) | Legal/DPO review of wording, legal basis, retention and data-subject rights. | OPEN |
| O-35 | E-mail retention | How long are enquiries kept, and who has access? Needed for the privacy notice. | OPEN |
| O-36 | Hosting disclosure | The privacy page states that GitHub Pages processes technical logs. Confirm the provider and wording. | OPEN |
| O-37 | Cookies / analytics | Confirm that none should be added. Any future addition needs consent and legal review. | OPEN |
| O-38 | DPO assessment | Decide whether a DPO is required; do not state either way on the website until decided. | OPEN |
| O-39 | Accessibility statement | Confirm the contact route and whether a formal statement/audit is required. | OPEN |

## 7. Deployment and operations

| ID | Item | Question / action | Status |
|---|---|---|---|
| O-40 | Publish this rebuild | Approve the commit, push to `main` and GitHub Pages deployment. | OPEN |
| O-41 | Publishing configuration | Confirm branch `main`, directory `/docs`, domain `gila-brobygger.dk` stay unchanged. | OPEN |
| O-42 | DNS and e-mail | Confirm no DNS change is needed and that e-mail for the domain keeps working. | OPEN |
| O-43 | GitHub security | Enable 2FA and branch protection; confirm who has admin access. | OPEN |
| O-44 | E-mail authentication | Add SPF, DKIM and DMARC at the mail provider. | OPEN |
| O-45 | Backup / rollback | Confirm the rollback approach (`git revert` of the deployment commit) is acceptable. | OPEN |

## 7b. Video (new)

| ID | Item | Question / action | Status |
|---|---|---|---|
| O-46 | Video `docs/assets/video/helping-hand.mp4` on the homepage | Confirm what the video depicts, that everyone appearing has consented to publication, and that no client/family-identifying content is shown. Provide or approve a transcript/captions file (currently missing – accessibility gap). Confirm placement and compression target. | OPEN |

## 7c. Footer and contact details (new)

| ID | Item | Supplied value | Question / action | Status |
|---|---|---|---|---|
| O-47 | Business address | 6500 Vojens (postcode + city only, street name withheld by owner) | Confirmed by owner. Published in footer on all pages. | CONFIRMED |
| O-48 | CVR number | "00000000" (owner-supplied, clearly a placeholder) | This is not a valid CVR. Please supply the real 8-digit CVR number, or confirm that no CVR should be published. | OPEN |
| O-49 | Legal form | Enkeltmandsvirksomhed | Confirmed by owner. Published in footer on all pages. | CONFIRMED |
| O-50 | Opening hours (kundeservice) | Mandag–torsdag 08:00–16:00, fredag 08:00–15:00 | Confirmed by owner. Published on kontakt.html. | CONFIRMED |
| O-51 | HR/bogholderi hours | "Mandag–fredag 09:00–11:00" (owner-supplied) | Confirm. Is this relevant to publish on a public website? | OPEN |
| O-52 | Terms and conditions page ("Forretningsbetingelser") | Not supplied | Should a terms-and-conditions page be created? If yes, content is required. | OPEN |
| O-53 | Social media profiles | "Facebook, LinkedIn, Instagram …" (owner-supplied, no URLs) | Provide exact profile URLs and confirm they may be published. None are published now. | OPEN |
| O-54 | Footer copyright line | © 2026 Gila Brobygger. Alle rettigheder forbeholdes. | Confirmed by owner (kept Danish wording). | CONFIRMED |

**None of the above have been published.** They are recorded here for verification. Values that are
clearly placeholders (CVR 00000000) have not been added to the website.

## 7d. Quote request template (new)

| ID | Item | Question / action | Status |
|---|---|---|---|
| O-55 | "Få et tilbud" skabelon på kontakt.html | En struktureret mailto-skabelon (Navn, Virksomhed/CVR, E-mail, Service, Noter, Deadline) der åbner brugerens e-mail-klient. Ingen data indsamles. Bekræft formulering og felter. | CONFIRMED (owner requested) |

## 7e. Formspree integration (new)

| ID | Item | Question / action | Status |
|---|---|---|---|
| O-56 | Formspree form endpoint | Formspree form ID `maeelgok` configured. Endpoint: https://formspree.io/f/maeelgok. Recipient must be set to kontakt@gila-brobygger.dk in Formspree dashboard. | CONFIRMED |
| O-57 | Formspree data processing | Formspree is a US-based third-party processor. Confirm DPA and legal basis with a legal adviser. | ⚖️ Pending legal review |
| O-58 | File upload via Formspree | File uploads require a paid Formspree plan. Confirm if needed. | OPEN |

## 8. Items the maintainer must not decide alone

- Any change to the organisation's name, legal form or brand identity.
- Any new service, audience or geographic claim.
- Any price, discount or commercial term.
- Any collection of personal data, including "simple" contact forms or newsletter sign-ups.
- Any publication of a client, family or case story.
- Any deletion of public content that existed before the rebuild.
- Any change to hosting, domain, DNS or the GitHub Pages configuration.

## 9. How to respond

For each ID, reply with one of:

- **CONFIRMED** – publish as written.
- **CHANGED: …** – publish with the supplied correction.
- **REMOVED** – remove the claim/content.
- **LATER** – keep the placeholder and do not launch that part yet.

The maintainer records the response in `docs/APPROVAL_LOG.md` and updates the site and
documentation in the same change.
