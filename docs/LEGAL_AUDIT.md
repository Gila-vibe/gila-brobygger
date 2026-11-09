# Legal and GDPR audit – Gila Brobygger

**Date:** 2026-11-09
**Scope:** Website https://gila-brobygger.dk (16 pages, static HTML/CSS/JS)
**Method:** Code review, configuration review, documentation review
**Important:** This is an engineering audit, not legal advice. A qualified GDPR/privacy adviser
must review all findings before they are treated as compliant.

---

## 1. Data flows (verified)

| Flow | Data involved | Stored by website? | Notes |
|---|---|---|---|
| Page request | IP, user agent, URL, timestamp | No (GitHub Pages handles this) | GitHub processes technical logs as hosting provider |
| Contact by e-mail | Whatever the visitor writes | No website storage; exists in owner's mailbox | `mailto:` opens visitor's own e-mail client |
| Contact by phone | Phone number, conversation | No website storage | `tel:` opens visitor's phone app |
| Quote form template | Fields filled by visitor | No website storage; opens e-mail client with pre-filled body | No `<form>` submission; no backend |
| Chatbot | Messages typed into widget | No – held in page memory only, discarded on reload | No network requests, no `localStorage`, no cookies |
| Fonts/CSS/JS | None | Served from same origin | System fonts only |
| Cookies | None | – | No cookie set by the site |
| Video | None | Self-hosted MP4 | No tracking, no autoplay with sound |

## 2. What the website does NOT do (verified)

- No forms that submit data to a server.
- No cookies, analytics, tracking pixels or tag managers.
- No third-party scripts, stylesheets, fonts, iframes or embeds.
- No user accounts, payments or newsletters.
- No `localStorage`, `sessionStorage` or IndexedDB usage.
- No external CDN requests.

## 3. Third-party services involved

| Service | Role | Data processed | DPA required? |
|---|---|---|---|
| GitHub Pages | Static hosting | IP, user agent, URL, timestamp (technical logs) | Owner to confirm with GitHub's terms |
| Cloudflare | DNS + CDN + e-mail routing | IP, user agent, URL (CDN logs); e-mail routing | Owner to confirm with Cloudflare's terms |
| Google Search Console | Search analytics | Search queries, click data (only after owner submits sitemap) | Owner manages via Google account |

## 4. Findings

### F1 – No data collection by the website itself ✅
The website collects no personal data through forms or scripts. Contact is via `mailto:` and `tel:`.
**Status:** Compliant with data minimisation (no collection).

### F2 – No privacy policy legal basis stated ⚖️
The privacy page (`privatliv.html`) states that data is processed "to answer enquiries and perform
the agreed task" but does not state the specific legal basis (contract, legitimate interest, or
consent). **This must be confirmed by a legal adviser.**

### F3 – No retention period defined ⚖️
No retention period for e-mail enquiries is defined. The privacy page explicitly states this.
**Status:** Open – owner must define retention period with legal adviser.

### F4 – No DPO appointed or assessed ⚖️
No DPO has been appointed. Whether one is required depends on the organisation's processing
activities, scale and nature. **This must be assessed by a legal adviser.**

### F5 – Hosting disclosure present but unverified ⚖️
The privacy page states that GitHub Pages processes technical logs. The accuracy of this
disclosure should be verified by a legal adviser.

### F6 – Chatbot disclaimer present ✅
The chatbot displays a visible disclaimer: "Skriv ikke CPR-nummer, helseoplysninger eller andre
følsomme oplysninger." It refuses CPR/health keywords and redirects to e-mail/phone.
**Status:** Implemented; legal review of wording recommended.

### F7 – Sensitive data warning present ✅
All service pages and the contact page warn against sending CPR numbers, health information or
family-case details in a first enquiry.

### F8 – No cookie banner needed ✅
No cookies are set by the website. No cookie banner is required.

### F9 – No consent mechanism needed (currently) ✅
No analytics, tracking or non-essential cookies are used. No consent mechanism is needed.
If any are added in the future, consent and legal review are required first.

### F10 – E-mail authentication partially configured 🔧
- SPF: ✅ In place (`v=spf1 include:_spf.mx.cloudflare.net ~all`)
- DKIM: ❌ Not found for common selectors
- DMARC: ❌ No `_dmarc` TXT record found
**Status:** Owner must configure DKIM and DMARC in Cloudflare (see LAUNCH_CHECKLIST.md section F).

### F11 – No data processing agreement documented ⚖️
No DPA with GitHub or Cloudflare is documented. Whether one is required depends on the
organisation's processing activities and legal assessment.

### F12 – Video content not captioned ⚠️
The homepage video has no captions or transcript. A `<track>` element references a `.vtt` file
that does not yet exist. See `docs/VIDEO_CAPTIONS_INVENTORY.md`.

## 5. Legal information the owner must confirm

See `docs/OWNER_REVIEW.md` items O-01, O-02, O-34, O-35, O-36, O-37, O-38, O-44.

Specifically:
1. Is the e-mail mailbox active and monitored? Who reads it?
2. Is the phone number correct and may it be published?
3. What is the legal basis for processing enquiries?
4. What is the retention period for e-mail enquiries?
5. Is the hosting disclosure accurate?
6. Is a DPO required?
7. Does the privacy notice wording need legal revision?
8. Are SPF/DKIM/DMARC configured correctly?

## 6. What requires professional legal review

- Legal basis for processing enquiries (contract vs. legitimate interest).
- Retention period and deletion process.
- DPO requirement assessment.
- Data processing agreements with GitHub and Cloudflare.
- Privacy notice wording (Danish).
- Handling of sensitive data sent despite warnings.
- Incident/breach response procedure.

## 7. What I will NOT do

- I will not declare GDPR compliance.
- I will not invent a DPO or DPO contact.
- I will not invent retention periods or legal bases.
- I will not change DNS or hosting settings.
- I will not publish unverified legal information.

## 8. Summary

| Area | Status |
|---|---|
| No data collection by website | ✅ Verified |
| No cookies/tracking | ✅ Verified |
| No third-party scripts | ✅ Verified |
| Chatbot privacy-safe | ✅ Implemented; wording review recommended |
| Sensitive data warnings | ✅ Present on all relevant pages |
| Privacy notice published | ✅ Published; legal review pending |
| Legal basis stated | ⚖️ Not stated – needs legal review |
| Retention period defined | ⚖️ Not defined – needs owner + legal |
| DPO assessed | ⚖️ Not assessed |
| Hosting disclosure | ⚖️ Present but unverified |
| SPF | ✅ In place |
| DKIM | 🔧 Not configured |
| DMARC | 🔧 Not configured |
| DPA documented | ⚖️ Not documented |

**Conclusion:** The website is designed to minimise data collection and avoids third-party processing.
However, several legal questions (legal basis, retention, DPO, DPA) remain open and require
professional legal review before the privacy notice can be considered final.
