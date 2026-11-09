# Accessibility audit – Gila Brobygger

**Date:** 2026-11-09
**Scope:** Website https://gila-brobygger.dk (16 pages, shared CSS/JS)
**Method:** Code review, automated harness checks, Lighthouse (5 pages)
**Important:** This is a technical audit, not a formal WCAG certification. No independent
audit or user testing with assistive technology has been performed.

---

## 1. Automated check results

| Check | Result |
|---|---|
| `check_site.py` (16 pages) | ✅ 0 errors, 0 warnings |
| Lighthouse accessibility (5 pages) | ✅ 1.0 (index, kontakt, privatliv, familiekonsulent, 404) |
| Lighthouse best practices (5 pages) | ✅ 1.0 |
| Lighthouse SEO (5 pages) | ✅ 1.0 |

## 2. What is implemented (verified in code)

### Structure and navigation
- ✅ Skip link (`Gå til indhold`) is the first focusable element on every page, targets `#main`.
- ✅ Semantic landmarks: `<header>`, `<nav aria-label="Hovednavigation">`, `<main id="main">`, `<footer>`,
  `<nav aria-label="Footer navigation">`.
- ✅ One `<h1>` per page; headings follow a logical order (h1 → h2 → h3).
- ✅ Current page exposed with `aria-current="page"` on service pages.
- ✅ Footer navigation labelled separately from main navigation.

### Keyboard and focus
- ✅ All interactive elements are native links or buttons.
- ✅ Visible focus ring (3 px amber, `outline-offset: 3px`) never removed.
- ✅ Mobile menu button exposes `aria-expanded`; closed with Escape; focus returns to button.
- ✅ Chatbot dialog traps Tab focus, closes with Escape, returns focus to launcher.
- ✅ Nothing depends on hover.

### Images and media
- ✅ Portrait has descriptive `alt` text and explicit `width`/`height`.
- ✅ Emoji used as icons are `aria-hidden="true"`.
- ✅ No video, audio, carousel or autoplaying media (video has `controls`, `muted`, `preload="metadata"`,
  no autoplay attribute; autoplay is triggered by IntersectionObserver but muted and respects
  `prefers-reduced-motion`).
- ✅ Decorative hero shape is `aria-hidden="true"`.

### Forms and inputs
- ✅ No data-collection forms (contact is `mailto:`/`tel:`).
- ✅ Quote form fields have associated `<label>` elements.
- ✅ Chatbot input has a visible-to-screen-reader label and max length.
- ✅ Every button has an accessible name.
- ✅ Required fields marked with `*` and `required` attribute.

### Text and colour
- ✅ Body text contrast ≥ 7:1 on white; muted text ≥ 4.5:1; white on primary green ≥ 4.5:1.
- ✅ Information not conveyed by colour alone (check lists use symbol + text).
- ✅ Body text 16 px with 1.7 line height.
- ✅ Text resizable to 200% (responsive layout).

### Motion and preferences
- ✅ `prefers-reduced-motion: reduce` disables transitions, hover lift, smooth scrolling and video autoplay.
- ✅ No parallax, auto-rotating content or flashing.

### Responsive and zoom
- ✅ Layout works at 320 px width (verified).
- ✅ Breakpoints at 760 px and 960 px.
- ✅ Touch targets ≥ 44–48 px for primary actions.

### Language
- ✅ `<html lang="da">` on every page.
- ✅ Danish text uses correct characters (æ, ø, å).

### Print
- ✅ Header, footer, chat and CTA bands hidden in print.

### Structured data
- ✅ Organization JSON-LD on homepage.
- ✅ BreadcrumbList JSON-LD on all interior pages.
- ✅ Service JSON-LD on all 7 service pages.

## 3. Known limitations (honestly stated)

- **No external audit:** No independent WCAG audit or user testing with assistive technology has been
  performed.
- **No screen reader testing:** VoiceOver, NVDA, JAWS have not been tested.
- **No cross-browser testing:** Only Chromium-based browser was used. Safari, Firefox, Edge, iOS and
  Android were not tested.
- **200% zoom not directly tested:** 320 px layout is a proxy.
- **Video captions missing:** The homepage video has no captions or transcript (O-46).
- **Form validation is client-side only:** No server-side validation (no server exists).
- **Chatbot is a simple keyword bot:** Not a substitute for human contact.
- **Emoji icons:** May render differently across platforms; all are decorative (`aria-hidden`).
- **Legal applicability:** Whether Danish accessibility legislation applies to this organisation has
  not been assessed. Requires owner/legal review.

## 4. Issues found and fixed during this audit

| Issue | Fix |
|---|---|
| Google verification meta tag inside JSON-LD block (broke structured data) | Moved to `<head>` as proper `<meta>` tag |
| Video had no `<track>` element for captions | Added `<track kind="captions">` referencing a `.vtt` file (pending) |
| No transcript for video | Added `<details>` transcript placeholder (pending owner's transcript) |
| `tilgaengelighed.html` lacked complaint procedure, audit method, third-party content section | Expanded accessibility statement |

## 5. Accessibility testing still required

1. **Keyboard-only walkthrough** on every page.
2. **Screen reader spot check** (VoiceOver on macOS, NVDA on Windows) on homepage, a service page and the chatbot.
3. **200% and 400% zoom** on all pages.
4. **Forced-colours / high-contrast mode** check.
5. **Mobile device testing** (iOS Safari, Android Chrome).
6. **Reduced-motion mode** verification.
7. **Cross-browser testing** (Safari, Firefox, Edge).
8. **Form validation** with screen reader announcements.

## 6. What I will NOT do

- I will not claim the website is fully WCAG 2.2 AA compliant.
- I will not claim an independent audit has been performed.
- I will not publish unverified accessibility conformance statements.

## 7. Summary

| Area | Status |
|---|---|
| Skip link, landmarks, one h1 | ✅ Implemented |
| Visible focus, keyboard navigation | ✅ Implemented |
| Alt text on images | ✅ Implemented |
| Form labels and validation | ✅ Implemented |
| Reduced motion support | ✅ Implemented |
| Responsive layout (320 px) | ✅ Verified |
| Color contrast | ✅ Targeted (not measured with tool) |
| Screen reader testing | ⚠️ Not performed |
| Cross-browser testing | ⚠️ Not performed (Chromium only) |
| 200% zoom | ⚠️ Not directly tested |
| Video captions | ❌ Missing (pending owner) |
| Independent audit | ❌ Not performed |

**Conclusion:** The website implements strong accessibility fundamentals and passes automated checks.
However, formal compliance cannot be claimed without screen reader testing, cross-browser testing
and (if required) an independent audit.
