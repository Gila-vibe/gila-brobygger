# Testing strategy

## Automated local check
Run:

```bash
python3 harness/scripts/check_site.py
```

The check validates required pages, Danish document language, key navigation targets and the supplied contact address.

## Manual browser checks before release
- Open homepage and service page at desktop and mobile widths.
- Activate mobile menu with keyboard and pointer.
- Follow all navigation links.
- Click every email CTA and verify the intended recipient and subject in the email application.
- Confirm the visible email address is readable and selectable.
- Check keyboard focus visibility and skip link.
- Check headings, contrast, text scaling and reduced-motion behavior.
- Inspect browser console and network requests.
- Test on at least one iOS or Android device if possible.

## Release evidence
Record the date, commit/version, checks run, browser/device coverage, results and known limitations in the release notes.
