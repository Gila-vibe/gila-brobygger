# Video captions and transcripts inventory – Gila Brobygger

**Date:** 2026-11-09
**Scope:** All pages of https://gila-brobygger.dk

---

## 1. Video inventory

| # | Page | Video file | Location | Duration | Captions | Transcript | Status |
|---|---|---|---|---|---|---|---|
| 1 | `index.html` | `assets/video/helping-hand.mp4` | Homepage, "Se en video om Gila Brobygger" section | Unknown (not measured) | ❌ None | ⚠️ Placeholder only | ⏳ Pending owner |

No other pages contain video or embedded media.

## 2. What is implemented (verified)

- ✅ `<video>` element with `controls`, `muted`, `playsinline`, `preload="metadata"`.
- ✅ `<track kind="captions" src="assets/video/helping-hand.vtt" srclang="da" label="Dansk" default>` — references a `.vtt` file that does **not** yet exist.
- ✅ `aria-describedby="video-transcript"` linking to a transcript section.
- ✅ `<details>` element below the video with a transcript placeholder.
- ✅ Autoplay is muted and respects `prefers-reduced-motion`.
- ✅ Keyboard-accessible controls (native `<video controls>`).
- ✅ No autoplay with sound.

## 3. What is missing (owner action required)

| Item | Status | Action needed |
|---|---|---|
| Caption file (`helping-hand.vtt`) | ❌ Missing | Owner must provide or commission a WebVTT caption file with accurate Danish captions |
| Verified transcript | ❌ Missing | Owner must provide the transcript text (or approve a transcription) |
| Audio description | ⚠️ Not assessed | If the video contains visual information essential to understanding, an audio description track may be needed |
| Video metadata (duration, resolution) | ⚠️ Not measured | Owner should confirm video specifications |

## 4. Video accessibility checklist

- [x] Video has native controls (play, pause, volume, seek)
- [x] Video is muted by default
- [x] Autoplay respects `prefers-reduced-motion`
- [x] `<track>` element present with `kind="captions"`
- [x] `srclang` and `label` attributes set
- [x] Descriptive video title provided ("Se en video om Gila Brobygger")
- [x] Transcript placeholder present (`<details>`)
- [x] Video is self-hosted (no third-party embed)
- [ ] Accurate captions file (`.vtt`) — **pending owner**
- [ ] Verified transcript — **pending owner**
- [ ] Audio description (if needed) — **not assessed**
- [ ] Keyboard-only testing of video controls — **not performed**
- [ ] Screen reader testing of video element — **not performed**

## 5. What I will NOT do

- I will not invent captions or transcripts without access to the actual video content.
- I will not use unverified automatic captions.
- I will not claim the video is accessible without captions.

## 6. Summary

| Video | Captions | Transcript | Status |
|---|---|---|---|
| `helping-hand.mp4` (homepage) | ❌ Missing | ⚠️ Placeholder only | ⏳ Pending owner |

**Conclusion:** The video element is implemented with proper accessibility attributes (`<track>`,
`aria-describedby`, native controls). However, the actual caption file and verified transcript
are missing and must be provided by the owner. Until then, the video is not fully accessible.
