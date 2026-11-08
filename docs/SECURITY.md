# Security and privacy requirements

## Current implementation
- Static HTML/CSS/JavaScript.
- No server-side processing.
- No form submission or storage of visitor data.
- Contact uses `mailto:` and opens the visitor's configured email client.
- Google Fonts is referenced as an external stylesheet in the current design. For a strict no-third-party-request deployment, self-host the fonts or use the system font stack.

## Chatbot (chat widget)

- Chat widget implemented in `docs/assets/js/main.js`; fully client-side.
- No server-side processing, no storage, no cookies, no analytics, no external chat embed.
- Chat messages are held in browser memory only; bot replies are generated locally.
- Privacy review and owner sign-off pending before the widget is published to the live site.
- Legal/DPO review required before the chatbot processes personal data.
- Information about children, family circumstances and health is sensitive and must not be collected through an unreviewed chatbot.

## Before launch
- Confirm the hosting provider supports HTTPS and enable it.
- Keep hosting, DNS and email credentials out of source control.
- Review hosting access and use multi-factor authentication where available.
- Confirm whether the deployed site uses logs, analytics, cookies, embedded content or third-party services.
- Publish an accurate privacy notice based on actual data processing. Do not copy a generic policy and assume it is compliant.
- If adding a contact form, collect only necessary data, define retention and access, protect against spam, and obtain appropriate privacy/legal review.
- Treat information about children, family circumstances and health as potentially highly sensitive. Do not collect it through an unreviewed form or chatbot.
