# Reports

`latest.json` is written by `harness/scripts/check_site.py --report harness/reports/latest.json`
and refreshed on every local run and CI run. It is ignored by Git so the repository does not
accumulate stale results; CI uploads it as a workflow artifact.

Report shape:

```json
{
  "generated_at": "2026-11-08T00:00:00Z",
  "root": "docs",
  "domain": "gila-brobygger.dk",
  "pages_checked": 14,
  "errors": [],
  "warnings": [],
  "passed": true
}
```

Interpretation:

- `passed: true` means no error-level findings. Warnings still need human review.
- The report is evidence of structure and policy checks, not of factual accuracy.
- Summarise the latest run in `docs/QUALITY_SCORE.md` and in the change report.
