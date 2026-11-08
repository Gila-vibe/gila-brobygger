# Security and privacy

This document covers the security and data-protection posture of the Gila Brobygger website and
repository. It is an engineering document, not legal advice.

## 1. Principles

1. **Collect nothing you do not need.** The site has no forms, accounts, payments or newsletters.
2. **No third parties at runtime.** No analytics, pixels, CDNs, web fonts, embeds or chat backends.
3. **Least privilege.** The GitHub repository and Pages configuration are the only infrastructure.
4. **Private by default.** Engineering documents are excluded from the published site.
5. **Honest documentation.** Do not claim compliance, DPO appointment or certification.
6. **Review before collection.** Any new data collection needs owner approval and legal/DPO review.

## 2. Data flows

| Flow | Data | Stored by the site? | Notes |
|---|---|---|---|
| Page request | IP address, user agent, requested URL, timestamp | No (handled by GitHub Pages) | GitHub processes technical logs as hosting provider; see GitHub's privacy statement |
| Contact by e-mail | Whatever the visitor writes, including name and address | No website storage; e-mail exists in the owner's mailbox | `mailto:` opens the visitor's own e-mail client |
| Contact by phone | Phone number, conversation | No website storage | `tel:` opens the visitor's phone app |
| Chatbot | Messages typed into the widget | **No** – held only in page memory, discarded on reload | No network requests, no `localStorage`, no cookies |
| Fonts, CSS, JS | None | Served from the same origin | System fonts only |
| Cookies | None | – | No cookie is set by the site |

There is **no server-side application**, no database, no API and no secret in the website.

## 3. Threat model

| Threat | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Secret committed to the repository | Medium | High | `check_secrets.py` in CI; `.gitignore`; review |
| Sensitive family data published | Medium | High | No forms; content rules; owner/legal gate |
| Chatbot invites CPR/health disclosure | Medium | Medium | Local-only bot, warning text, keyword refusal, no logging |
| Third-party script added accidentally | Medium | High | Invariant S4, harness fails on external `src`/`link` |
| Malicious link or defacement via PR | Low | High | Branch protection recommendation; review before merge |
| Domain/DNS hijack | Low | High | Owner-controlled registrar; 2FA; no DNS changes in this project |
| E-mail spoofing | Medium | Medium | Recommend SPF, DKIM and DMARC at the mail provider (owner action) |
| Dependency compromise | Very low | High | No dependencies, no build step |
| Outdated content creates legal risk | Medium | Medium | Owner review list; scheduled content review |

## 4. Secrets policy

- Never commit passwords, API keys, tokens, private keys, certificates, `.env` files, database
  dumps or credentials of any kind.
- The site needs **no** secrets. If a future feature needs one, it must not be shipped to a static
  public site; use a reviewed backend or a hosted service with a documented data flow.
- `.gitignore` covers `.env`, `.env.*`, `node_modules/`, `dist/`, `coverage/` and OS files.
- `harness/scripts/check_secrets.py` scans the working tree (excluding `archive/` and `.git/`) for
  common secret patterns and private-key headers. It is a safety net, not a guarantee.
- If a secret is ever committed: rotate it immediately, remove it from history, and record the
  incident in `docs/APPROVAL_LOG.md`. Deleting the file in a new commit is not enough.

## 5. Third-party policy

Allowed without additional review:

- GitHub Pages as the static host.
- The visitor's own e-mail client and phone app via `mailto:` / `tel:`.
- Ordinary outbound links to public resources (clearly marked as external, no embeds).

Requires owner approval **and** legal/DPO review:

- analytics, tag managers, heatmaps, A/B testing;
- advertising pixels or retargeting;
- embedded video, maps, social feeds, chat providers or comment systems;
- web fonts or CDNs that receive visitor IP addresses;
- cookie banners or consent management platforms.

## 6. Chatbot

The chatbot in `docs/assets/js/main.js`:

- is generated locally from keyword rules;
- makes no `fetch`, `XMLHttpRequest`, WebSocket or image-beacon requests;
- stores nothing in cookies, `localStorage`, `sessionStorage` or IndexedDB;
- loses all messages when the page is reloaded;
- displays a disclaimer telling visitors not to enter CPR numbers, health information or other
  sensitive data;
- refuses to engage with CPR/health keywords and redirects to e-mail/phone.

Because it can still receive sensitive text typed by a visitor, it is treated as a feature that
requires a documented privacy review before being described as approved. See
`docs/APPROVAL_LOG.md`.

## 7. Content and publication safety

- Engineering Markdown is excluded from publication with `docs/_config.yml`.
- `archive/` is outside `docs/` and is never published.
- `docs/gila-brobygger/` is a nested, ignored Git repository and is not published.
- The original high-resolution portrait in `archive/legacy-assets/` contains EXIF/GPS data and
  must never be copied into `docs/`. The published portrait is stripped and resized.
- Do not paste client names, case numbers, CPR numbers, addresses, medical details or documents
  into the repository, issues, commit messages or screenshots.

## 8. Hosting and account security (owner actions)

Recommended, not performed by this project:

- enable two-factor authentication on the GitHub account and the domain registrar;
- protect `main` with a branch rule requiring the quality workflow to pass;
- configure SPF, DKIM and DMARC for `gila-brobygger.dk` at the e-mail provider;
- review GitHub organisation members and deploy keys;
- enable HTTPS enforcement in GitHub Pages (already required for the custom domain);
- keep a documented rollback path (`git revert` of the deployment commit).

## 9. Legal / DPO triggers

Obtain legal advice or a DPO assessment before:

- collecting personal data through the site;
- publishing case or family information;
- adding forms, accounts, newsletters or chat backends;
- adding analytics, tracking or non-essential cookies;
- sharing data with a processor or third country;
- setting retention periods or a records-of-processing schedule.

A DPO is not automatically required. The need depends on the organisation's processing activities,
their scale and their nature. This document does not decide that question.

## 10. Incident response

1. Stop the exposure: remove the content or take the page down.
2. Preserve evidence (commit hash, logs, screenshots) without copying sensitive data further.
3. Assess: what data, whose data, how long, who could access it.
4. Notify the owner immediately. Assess whether the incident must be reported to the Danish Data
   Protection Authority (Datatilsynet) within 72 hours and whether data subjects must be informed.
5. Rotate any exposed credentials.
6. Record what happened, the fix and preventive actions in `docs/APPROVAL_LOG.md` and a decision
   record if the architecture changes.

## 11. Current status

| Control | Status |
|---|---|
| No forms / no data collection | Implemented |
| No cookies / no analytics / no tracking | Implemented |
| No third-party runtime resources | Implemented |
| Local-only chatbot with warning | Implemented; legal/DPO review pending |
| Secret scanning | Implemented (`check_secrets.py`) |
| Metadata-stripped images | Implemented for the published portrait |
| Branch protection / 2FA / SPF-DKIM-DMARC | **Owner action, not verified** |
| Formal privacy review | **Pending** |
| Penetration test | Not applicable for a static site; not performed |

## 12. Related documents

- `docs/PRIVACY_NOTICE.md` – draft public privacy notice
- `docs/INVARIANTS.md` – enforced rules
- `docs/APPROVAL_LOG.md` – approvals and reviews
- `docs/TESTING.md` – how controls are verified
