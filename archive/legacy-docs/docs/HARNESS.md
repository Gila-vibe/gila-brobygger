# Harness engineering workflow

The harness is the system around the AI agent for the complete Gila Brobygger website and organisation: context, plans, guardrails, executable checks, and evidence.

## Five layers
1. Context: `AGENTS.md`, `PROJECT.md`, brand and website specifications.
2. Planning: task brief, acceptance criteria and `plans/ACTIVE.md`.
3. Guardrails: `INVARIANTS.md`, `SECURITY.md` and approval gates.
4. Verification: automated checks, browser smoke tests and review.
5. Learning: record defects, decisions and improvements in `docs/decisions/` and `plans/`.

## Required task cycle
Understand → inspect → plan → approve when required → implement → test → browser verify → review diff → document → report.

## Evidence rule
Never say “tested”, “working”, “deployed” or “live” unless the corresponding action was actually performed and its result observed.

## Human approval
Production deployment, public content changes, data collection, third-party services, DNS/email/hosting changes and destructive operations require explicit owner approval.
