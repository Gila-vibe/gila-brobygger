# Launch checklist – Gila Brobygger

**Created:** 2026-11-08
**Site:** https://gila-brobygger.dk (deployed, commit `1c953b1`)
**Status:** Engineering complete and verified. Owner approval, legal/DPO review and external-provider
tasks are **pending**.

**Legend:** ✅ Verified · ⏳ Pending (owner) · ⚖️ Pending (legal/DPO) · 🔧 Pending (external provider) ·
⬜ Not started

## A. Information you must personally verify

Source: `docs/OWNER_REVIEW.md` (O-01 … O-46). **Do not skip any item.** Reply per item with
CONFIRMED / CHANGED: … / REMOVED / LATER.

### A.1 Contact details
| ID | Item | Where it appears | Your action | Status |
|---|---|---|---|---|
| O-01 | E-mail `kontakt@gila-brobygger.dk` active and monitored? Who reads it? | Header CTA, footer, kontakt, privatliv | Confirm or change | ⏳ |
| O-02 | Phone `+45 31 84 70 40` correct and may be published? Mobile/private? | Footer, kontakt, kontakt-kort | Confirm or change | ⏳ |
| O-03 | May a response time be stated? (none is promised now) | kontakt.html | Confirm or leave none | ⏳ |

### A.2 Personal and professional claims (om.html, projekter.html)
| ID | Claim | Your action | Status |
|---|---|---|---|
| O-04 | From Eritrea; ~11 years in Denmark | Confirm numbers | ⏳ |
| O-05 | Teacher in Eritrea (natural sciences) | Confirm subject/level | ⏳ |
| O-06 | BA *Erhvervssprog og IT-baseret Kommunikation*, UCSYD Haderslev | Confirm title/institution/year | ⏳ |
| O-07 | Master's student *IT og Kommunikation*, SDU Kolding | Confirm programme/status | ⏳ |
| O-08 | 8+ years as interpreter | Exact start year | ⏳ |
| O-09 | Police-approved interpreter, Tolk Service, Kolding | Wording + permission to name | ⏳ |
| O-10 | Family consultant, Memøx, since 2020 | Title/start + permission to name | ⏳ |
| O-11 | Mentor in a municipality | Which municipality + permission | ⏳ |
| O-12 | Centre employee, AsylSyd | Period/role + permission | ⏳ |
| O-13 | Teacher, FGU Tønder and Kolding Ungdomsskole | Institutions/period | ⏳ |
| O-14 | Support person under § 75 Barnets Lov | Legal reference wording | ⏳ |
| O-15 | Working language pair Danish ↔ Tigrinya; other languages? | Confirm list | ⏳ |

### A.3 Services and scope
| ID | Item | Your action | Status |
|---|---|---|---|
| O-16 | Six services complete and correctly named? | Confirm list | ⏳ |
| O-17 | Service descriptions and examples realistic? | Confirm | ⏳ |
| O-18 | Geographic coverage (nothing published now) | State areas | ⏳ |
| O-19 | Preferred contact days/times | State | ⏳ |
| O-20 | Prices – publish? If yes, exact figures + terms required | Decide | ⏳ |
| O-21 | Invoicing, cancellation, travel terms | Decide | ⏳ |
| O-22 | Translation certification – yes/no | Decide | ⏳ |

### A.4 Projects and activities
| ID | Item | Your action | Status |
|---|---|---|---|
| O-23 | Provide real projects (name, purpose, period, target group, role, funder/partner, permission) | Supply data | ⏳ |
| O-24 | Named partners/funders (written permission needed) | Decide | ⏳ |
| O-25 | News/updates section now or later? | Decide | ⏳ |

### A.5 Identity and design
| ID | Item | Your action | Status |
|---|---|---|---|
| O-26 | Name and spelling "Gila Brobygger" | Confirm official name | ⏳ |
| O-27 | Logo in header (transparent, from supplied file) | Confirm visual result | ⏳ |
| O-28 | Palette (green) and system fonts | Confirm or supply brand assets | ⏳ |
| O-29 | Portrait crop and publication permission | Confirm | ⏳ |
| O-30 | Tagline "Bro mellem mennesker, sprog og systemer" | Approve/change/remove | ⏳ |
| O-31 | Legal form, CVR, address in footer/contact? | Decide | ⏳ |

### A.6 Privacy, chatbot, legal
| ID | Item | Your action | Status |
|---|---|---|---|
| O-32 | Removal of Formspree forms in favour of mailto/tel | Confirm | ⏳ |
| O-33 | Local-only chatbot + disclaimer wording | Confirm keep/remove | ⏳ |
| O-34 | Privacy notice wording (legal review) | See section B | ⚖️ |
| O-35 | E-mail retention period and access | Define | ⏳ + ⚖️ |
| O-36 | Hosting disclosure wording (GitHub Pages) | Confirm provider | ⏳ |
| O-37 | No cookies/analytics – confirm | Confirm | ⏳ |
| O-38 | DPO assessment | Decide (see B) | ⚖️ |
| O-39 | Accessibility statement and formal audit | Decide | ⏳ |

### A.7 Deployment and operations
| ID | Item | Your action | Status |
|---|---|---|---|
| O-40 | Approve publication of the rebuilt site | Sign off (A-01) | ⏳ |
| O-41 | Publishing config unchanged (main / /docs / domain) | Confirm | ⏳ |
| O-42 | No DNS change needed; e-mail keeps working | Confirm | ⏳ |
| O-43 | GitHub security: 2FA, branch protection, access review | Owner action | ⏳ |
| O-44 | E-mail authentication (SPF/DKIM/DMARC) | See section F | 🔧 |
| O-45 | Rollback approach acceptable (`git revert`) | Confirm | ⏳ |
| O-46 | Video content: consent, no identifiable clients, captions/transcript | Confirm + supply captions | ⏳ |

### A.8 Video
| ID | Item | Your action | Status |
|---|---|---|---|
| O-46 | Confirm video depicts consensual, non-identifying content; supply captions/transcript | Confirm + provide .vtt | ⏳ |

---

## B. Questions and documents for a qualified GDPR/privacy adviser

**Do not declare compliance without this review.** Provide the adviser with:

### Documents to share
- `docs/PRIVACY_NOTICE.md` (draft privacy notice, Danish)
- `docs/privatliv.html` (public privacy page)
- `docs/SECURITY.md` (data flows, threat model)
- `docs/assets/js/main.js` (chatbot implementation)
- `docs/INVARIANTS.md` (privacy invariants S1–S8)
- `docs/APPROVAL_LOG.md` (approval register)
- This `LAUNCH_CHECKLIST.md`

### Questions for the adviser
1. **Legal basis:** What is the legal basis for processing e-mail/phone enquiries (contract, legitimate
   interest, or consent)? Does it differ for interpreting/translation vs. mentoring/family support?
2. **Data controller:** Is Gila Brobygger the sole data controller? Is a joint-controller or
   processor arrangement needed with Memøx, Tolk Service or other organisations mentioned?
3. **Retention:** What retention period applies to e-mail enquiries and any case-related correspondence?
   What deletion process is required?
4. **Hosting:** Is the GitHub Pages disclosure (technical logs processed by GitHub as hosting
   provider) accurate and sufficient? Is a data-processing agreement with GitHub required?
5. **Chatbot:** Does a local-only, non-storing, non-transmitting chatbot constitute "processing"?
   Is the disclaimer wording adequate? Should the chatbot be removed instead?
6. **Sensitive data:** How should CPR numbers, health information and family-case details be handled
   if a visitor sends them despite the warning? What is the incident/breach process?
7. **DPO:** Is a Data Protection Officer required given the organisation's activities, scale and
   nature of processing? (Assessment only – do not publish an outcome until decided.)
8. **Rights:** Are the data-subject rights listed in `privatliv.html` (access, rectification,
   erasure, objection, complaint to Datatilsynet) complete and correctly worded?
9. **Third parties:** Are there any other processors or third-country transfers to disclose
   (e-mail provider, DNS provider)?
10. **Records of processing:** Is a records-of-processing activity (ROPA) required, and if so,
    what must it contain?
11. **Cookies/tracking:** Confirm that no cookies, analytics or tracking may be added without
    consent and a privacy notice update.

### Legal/DPO review register (from APPROVAL_LOG.md §6)
| Review | Trigger | Status |
|---|---|---|
| Chatbot data flow | Interactive feature receiving free text | ⚖️ Pending |
| Privacy notice | Public privacy statement | ⚖️ Pending |
| Contact data handling | E-mail/phone enquiries | ⚖️ Pending |
| Hosting disclosure | GitHub Pages technical logs | ⚖️ Pending |
| DPO requirement | Organisational processing | ⚖️ Pending |

---

## C. Approval log status

Source: `docs/APPROVAL_LOG.md`.

| ID | Scope | Owner sign-off | Legal/DPO | Status |
|---|---|---|---|---|
| A-01 | Publish rebuilt website + deploy | ⏳ Pending | Not required for static content | Deployed 2026-11-08 (technical) |
| A-02 | Contact details | ⏳ Pending | No | ⏳ |
| A-03 | Personal/professional claims | ⏳ Pending | No | ⏳ |
| A-04 | Service list and descriptions | ⏳ Pending | No | ⏳ |
| A-05 | Removal of Formspree forms | ⏳ Pending | Recommended | ⏳ |
| A-06 | Local-only chatbot | ⏳ Pending | ⚖️ Pending | ⏳ |
| A-07 | Privacy notice | ⏳ Pending | ⚖️ Pending | ⏳ |
| A-08 | System fonts (no third-party) | ⏳ Pending | No | ⏳ |
| A-09 | Logo usage in header | ⏳ Pending | No | ⏳ |
| A-10 | Projects page with placeholder | ⏳ Pending | No | ⏳ |
| A-11 | E-mail retention and access | ⏳ Pending | ⚖️ Pending | ⏳ |
| A-12 | DPO assessment | ⏳ Pending | ⚖️ Pending | ⏳ |
| A-13 | Accessibility statement/audit | ⏳ Pending | No | ⏳ |
| A-14 | GitHub security (2FA, branch protection) | ⏳ Pending | No | ⏳ |
| A-15 | E-mail authentication (SPF/DKIM/DMARC) | ⏳ Pending | No | 🔧 |

**Deployment record (factual, not an approval):** deployed 2026-11-08, commit `1c953b1`,
repository `Gila-vibe/gila-brobygger`, branch `main`, `/docs`, domain `gila-brobygger.dk`,
live URL verified (HTTPS, 200, custom 404, sitemap, robots, no third-party requests).
**Owner approval remains pending** until explicitly recorded.

---

## D. Sitemap

- **File:** `docs/sitemap.xml` — ✅ exists and is valid XML.
- **Content:** 13 URLs, matching the 13 indexable pages exactly (404.html excluded, as it is
  `noindex`).
- **`robots.txt`:** ✅ exists, allows crawling, references the sitemap.
- **`_config.yml`:** ✅ excludes `*.md`, `plans`, `decisions`, `gila-brobygger` from publication.
- **Status:** ✅ Verified. No action needed. Re-run `check_site.py` after any page add/remove.

---

## E. Google Search Console – step-by-step

### Prerequisites (all met ✅)
- Site is live over HTTPS at `https://gila-brobygger.dk/`.
- `https://gila-brobygger.dk/robots.txt` returns 200 and references the sitemap.
- `https://gila-brobygger.dk/sitemap.xml` returns 200 and lists 13 pages.
- Canonical host is non-www (`https://gila-brobygger.dk`).
- `http://` redirects to `https://`.

### Steps
1. Go to https://search.google.com/search-console and sign in with a Google account you control.
2. Click **Add property**. Choose **Domain** (recommended) and enter `gila-brobygger.dk`.
   - Domain verification requires a DNS TXT record. Google will give you a string like
     `google-site-verification=...`.
   - Add it as a TXT record on `gila-brobygger.dk` in Cloudflare (DNS → Records → Add).
   - Wait for verification (minutes to hours).
   - *Alternative:* use the **URL prefix** property (`https://gila-brobygger.dk/`) and verify via
     HTML file or meta tag — but DNS verification is more robust.
3. Once verified, open the property → **Sitemaps** (left menu).
4. Enter `sitemap.xml` and click **Submit**.
5. Check the status: it should show "Success" with 13 discovered URLs (may take a few hours/days
   to process).
6. Use **URL Inspection** on the homepage to request indexing.
7. Monitor **Coverage** and **Core Web Vitals** reports over the following weeks.

### What I will not do
- I will not verify the property or submit the sitemap on your behalf (requires your Google account).
- I will not add verification meta tags or files without your approval.

---

## F. E-mail provider and authentication

### Identified provider
- **DNS provider:** Cloudflare (`quinton.ns.cloudflare.com`, `ziggy.ns.cloudflare.com`).
- **E-mail routing:** Cloudflare Email Routing (`route1/2/3.mx.cloudflare.net`).
- **SPF (already configured):** `v=spf1 include:_spf.mx.cloudflare.net ~all`

### What is missing
- **DMARC:** no `_dmarc.gila-brobygger.dk` TXT record found.
- **DKIM:** no DKIM TXT record found for common selectors. Cloudflare Email Routing manages
  DKIM signing; the selector and key are shown in the Cloudflare dashboard.

### SPF (already in place – verify, do not change)
- Record: `v=spf1 include:_spf.mx.cloudflare.net ~all`
- Type: TXT, Name: `@` (or `gila-brobygger.dk`).
- **Action:** confirm this record still exists and is the only SPF record (multiple SPF records
  break validation). Do not edit without checking.

### DKIM (action required – external provider)
1. Log in to Cloudflare → **Email → Email Routing → Settings** (or **DKIM** section).
2. Copy the DKIM public key and selector shown there.
3. Add a TXT record: Name `<selector>._domainkey`, Value the provided key.
4. Cloudflare Email Routing may publish this automatically; check whether it is already active.
5. **Do not invent a DKIM key or selector** — use only what Cloudflare provides.

### DMARC (action required – external provider)
1. Start with a monitoring-only policy (no enforcement) so you can see what fails:
   - Suggested record (standard, not site-specific): `v=DMARC1; p=none; rua=mailto:kontakt@gila-brobygger.dk`
   - Type: TXT, Name: `_dmarc`.
2. After reviewing reports for a few weeks, consider moving to `p=quarantine` and later `p=reject`.
3. **Confirm the reporting address** (`rua=mailto:...`) with your e-mail provider before publishing.

### Important
- I have **not** changed any DNS record. All changes above are instructions only.
- Keep your existing MX records intact — removing them breaks e-mail delivery.
- Test e-mail delivery after any DNS change (send/receive at `kontakt@gila-brobygger.dk`).

---

## G. Owner and external-provider actions (summary)

### You must do personally
1. Review and respond to every item in `docs/OWNER_REVIEW.md` (O-01 … O-46).
2. Confirm or correct contact details (O-01, O-02).
3. Confirm or correct all personal/professional claims (O-04 … O-15).
4. Confirm service list and descriptions (O-16 … O-17).
5. Decide on prices, coverage, availability (O-18 … O-22).
6. Supply real projects or confirm the placeholder (O-23 … O-25).
7. Confirm identity/design decisions (O-26 … O-31).
8. Confirm Formspree removal, chatbot and privacy notice (O-32 … O-33, O-37).
9. Define e-mail retention period and access (O-35).
10. Confirm GitHub security settings (O-43) and e-mail auth (O-44).
11. Approve publication explicitly (A-01, O-40).
12. Record approval in `docs/APPROVAL_LOG.md`.

### Requires external assistance
1. **GDPR/privacy adviser** – review privacy notice, chatbot, retention, DPO (section B).
2. **Cloudflare (DNS)** – add DMARC and DKIM records (section F).
3. **Google Search Console** – verify property and submit sitemap (section E).
4. **Google Business Profile** – if applicable, create/verify listing.
5. **Captions/transcript** for the video – provide or commission a `.vtt` file (O-46).
6. **Formal accessibility audit** – optional but recommended (O-39).

### Requires no action (already verified ✅)
- Website structure, links, assets, metadata (`check_site.py`).
- Secret scan (`check_secrets.py`).
- Documentation consistency (`check_docs.py`).
- Sitemap and robots.txt correctness.
- Local browser smoke test (desktop + mobile).
- Lighthouse accessibility/best-practices/SEO (1.0 on 5 pages).
- Deployment and live verification.

---

## H. Current status summary

| Area | Status |
|---|---|
| Engineering implementation | ✅ Complete |
| Harness checks | ✅ All passing |
| Local browser tests | ✅ Passed |
| Lighthouse (5 pages) | ✅ 1.0 / 1.0 / 1.0 |
| Deployment | ✅ Live at https://gila-brobygger.dk/ |
| Live verification | ✅ HTTPS, 404, sitemap, robots, no third-party |
| Owner review (O-01 … O-46) | ⏳ Pending |
| Owner approval (A-01 … A-15) | ⏳ Pending |
| Legal/DPO review | ⚖️ Pending |
| SPF | ✅ In place |
| DKIM | 🔧 Pending (Cloudflare) |
| DMARC | 🔧 Pending (Cloudflare) |
| Google Search Console | ⬜ Not started |
| Video captions | ⬜ Not provided |

**Nothing is marked complete unless verified.** Human, legal and external-provider tasks remain open
until you confirm them. No DNS change has been made by this agent.
