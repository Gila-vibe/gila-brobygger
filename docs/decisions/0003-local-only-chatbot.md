# 0003 – Local-only chatbot

- **Date:** 2026-11-08
- **Status:** Accepted for implementation; legal/DPO review pending (A-06)

## Context

The previous chatbot had unverified price claims and behaved like a sales assistant. A chat
feature also creates a risk that visitors disclose sensitive family or health information. An
external chat provider would introduce a processor, network requests and retention questions.

## Decision

Keep a small information chatbot that:

- runs entirely in the browser from fixed keyword rules;
- makes no network requests and stores nothing;
- displays a visible disclaimer and refuses CPR/health keywords;
- directs visitors to e-mail or phone for anything specific;
- publishes no prices or guarantees.

## Consequences

- No data leaves the page and no processor is involved.
- The bot cannot answer free-form questions and must not pretend to.
- The disclaimer is part of the privacy review; wording changes need review.
- If the bot is later connected to a model or backend, this decision is void and a full data
  protection assessment is required before launch.

## Alternatives considered

- Third-party chat widget: rejected (third-party data processing, tracking, availability).
- No chatbot at all: acceptable fallback if the owner or legal review prefers it.
