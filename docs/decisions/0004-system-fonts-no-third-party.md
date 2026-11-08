# 0004 – System fonts and no third-party requests

- **Date:** 2026-11-08
- **Status:** Accepted (owner visual confirmation requested, A-08)

## Context

The previous stylesheet began with an `@import` from Google Fonts. That sends every visitor's IP
address and user agent to a third party, adds a render-blocking request and creates a dependency
on an external service without a documented legal basis.

## Decision

Use a system font stack and remove all external runtime resources: no web fonts, CDNs, analytics,
tracking pixels, iframes or embeds. The site loads only same-origin HTML, CSS, JS, the portrait and
the favicon.

## Consequences

- Zero third-party requests and no font-related cookie or IP disclosure.
- Faster rendering and no layout shift from font loading.
- Typography varies slightly between operating systems; this is acceptable for a small
  informational site.
- If brand fonts are required later, they must be self-hosted with a proper licence and reviewed.

## Alternatives considered

- Self-hosted brand fonts: possible, but adds weight and licensing work for little benefit.
- Keeping Google Fonts with a privacy review: rejected; the benefit does not justify the data flow.
