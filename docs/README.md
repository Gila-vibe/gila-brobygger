# Gila Brobygger – website & engineering harness

This repository contains a lightweight, static Danish website starter and a project-specific AI engineering harness.

## Included pages
- `index.html` – homepage
- `familiekonsulent.html` – family consultant service page
- `assets/` – shared CSS, JavaScript and favicon

> The project scope covers the complete Gila Brobygger organisation. Additional service pages from the existing website content (interpretation, mentor, etc.) are subject to integration planning.

## Run locally
No build system or package installation is required. Open `index.html` in a browser, or run a local server:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Contact links
The supplied contact address is used consistently:
`kontakt@gila-brobygger.dk`

The `mailto:` links open the visitor's configured email application. This does not send messages through the website or guarantee that the mailbox exists. Verify the mailbox before launch.

## Before publishing
1. Confirm the legal business name, service descriptions and contact email.
2. Add verified phone number, address, opening hours and social links if desired.
3. Add a real privacy notice and cookie handling only after confirming what data, analytics and third-party services the live site uses.
4. Test the contact links on desktop and mobile devices with an email app configured.
5. Check all navigation paths and the deployed domain.
6. Configure HTTPS and backups at the hosting provider.

## Deploy
Upload the contents of this folder to the website's document root using your hosting provider's approved workflow. Do not overwrite the live website until you have a backup and have reviewed the preview.
