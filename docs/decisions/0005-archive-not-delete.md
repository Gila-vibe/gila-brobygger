# 0005 – Archive legacy material instead of deleting it

- **Date:** 2026-11-08
- **Status:** Accepted

## Context

The rebuild replaced the homepage, consolidated duplicated documentation and removed unused
images, video, logo source files and a legacy harness. Some of that material may still be useful
for reference, and deleting it would make the change hard to audit or reverse.

## Decision

Move legacy material to `archive/` rather than deleting it:

```
archive/
├── legacy-source/     # original standalone homepage
├── legacy-assets/     # original images, video, logo.docx
├── legacy-docs/       # duplicated engineering docs
├── legacy-harness/    # old harness script
└── empty/             # empty placeholder files
```

## Consequences

- History and content remain recoverable.
- `archive/` is outside `docs/` and is never published.
- The original full-resolution photo contains EXIF/GPS metadata and must stay out of `docs/`.
- The harness and secret scan exclude `archive/`; it is reference material, not live code.
- Deleting archive content later requires owner approval.

## Alternatives considered

- Delete everything: cleaner repository, but loses traceability and the original source.
- Keep everything in `docs/`: would publish unused assets and private metadata.
