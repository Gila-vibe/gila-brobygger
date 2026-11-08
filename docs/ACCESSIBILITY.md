# Accessibility

## 1. Commitment

Gila Brobygger aims to meet **WCAG 2.1 level AA** across the public website. Accessibility is
treated as a core quality of the brand: calm, clear and usable for everyone.

This is a target, not a certification. No external audit has been completed. The public statement
is at `docs/tilgaengelighed.html`.

## 2. What is implemented

### Structure and navigation

- Semantic landmarks: `<header>`, `<nav aria-label="Hovednavigation">`, `<main id="main">`,
  `<footer>` and `<nav aria-label="Footer navigation">`.
- One `<h1>` per page; headings follow a logical order.
- Skip link (`Gå til indhold`) is the first focusable element and targets `#main`.
- Current page is exposed with `aria-current="page"` (section-level for service pages).
- Footer navigation is labelled separately from the main navigation.

### Keyboard and focus

- All interactive elements are native links or buttons.
- Visible focus ring (`3 px` amber, `outline-offset: 3px`) is never removed.
- Mobile menu button exposes `aria-expanded` and is closed with Escape; focus returns to the button.
- The chatbot dialog traps Tab focus, closes with Escape and returns focus to the launcher.
- Nothing depends on hover.

### Images and media

- The portrait has descriptive alt text and explicit `width`/`height` to prevent layout shift.
- Emoji used as icons are marked `aria-hidden="true"` and never carry meaning alone.
- No video, audio, carousel or autoplaying media.
- The decorative hero shape is `aria-hidden="true"`.

### Forms

- The site has no data-collection forms.
- The chatbot input has a visible-to-screen-reader label and a maximum length.
- Every button has an accessible name ("Send", "Luk chat", "Åbn chat").

### Text and colour

- Body text contrast ≥ 7:1 on white; muted text ≥ 4.5:1; white on the primary green ≥ 4.5:1.
- Information is never conveyed by colour alone; check lists also use a symbol and text.
- Body text is 16 px with 1.7 line height; leads are larger.
- Text can be resized to 200 % without loss of content or horizontal scrolling (responsive layout).

### Motion and preferences

- `prefers-reduced-motion: reduce` disables transitions, hover lift and smooth scrolling.
- No parallax, no auto-rotating content, no flashing.

### Responsive and zoom

- Layout works at 320 px width.
- Breakpoints at 760 px and 960 px.
- Touch targets are at least 44–48 px tall for primary actions.

### Language

- `<html lang="da">` on every page.
- Danish text uses correct characters (æ, ø, å).
- Tigrinya is written as "tigrinya" in Danish copy.

### Print

- Header, footer, chat and call-to-action bands are hidden in print.
- Backgrounds are removed; links are underlined in black.

## 3. Known limitations

- No external WCAG audit or user testing with assistive technology has been performed.
- The accessibility statement page is marked as a commitment, not a conformance claim.
- Some emoji-based icons may render differently across platforms; all are decorative.
- The chatbot is a simple keyword bot; it is not a substitute for a human and its dialog is
  intentionally short.
- Automated checks cover structure and basics, not full WCAG conformance.
- Legal applicability of Danish accessibility legislation to this organisation has **not** been
  assessed. This requires owner/legal review if the organisation is subject to those rules.

## 4. Testing

### Automated (every change)

`harness/scripts/check_site.py` verifies:

- `lang` attribute, viewport meta, charset;
- exactly one `<h1>`;
- presence of skip link, `<main id="main">`, header and footer;
- `alt` attributes on images;
- duplicate `id` detection;
- labeled input/button names in generated markup;
- no `user-scalable=no` or `maximum-scale=1`;
- no positive `tabindex`.

### Manual (before release)

1. Keyboard-only pass on every page.
2. Screen-reader spot check (VoiceOver on macOS or NVDA on Windows) on homepage, a service page
   and the chatbot.
3. 200 % and 400 % zoom.
4. Forced-colours / high-contrast mode.
5. Mobile device or emulation at 320 px and 390 px.
6. Reduced-motion mode.

Record the result in `docs/QUALITY_SCORE.md` and the release report.

## 5. Reporting a barrier

The public page invites visitors to report problems:

- E-mail: `kontakt@gila-brobygger.dk`
- Phone: `+45 31 84 70 40`

A named accessibility contact and a formal response time are **not** confirmed; do not invent them.

## 6. Change rules

- Do not remove the skip link, focus styles or landmarks.
- Do not add images without `alt`.
- Do not add a control without an accessible name.
- Do not add motion that ignores `prefers-reduced-motion`.
- Do not lower contrast to match a visual trend.
- Do not add `tabindex` values greater than 0.
- Any new interactive component requires a keyboard and screen-reader check.

## 7. Related documents

- `docs/tilgaengelighed.html` – public statement
- `docs/INVARIANTS.md` – enforced accessibility rules
- `docs/TESTING.md` – test procedure
- `docs/BRAND.md` – accessibility as part of brand behaviour
