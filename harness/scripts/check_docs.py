#!/usr/bin/env python3
"""Documentation consistency checks for the Gila Brobygger project.

Verifies that required documents exist, internal Markdown links resolve,
contact details and page inventory match the implementation, and stale
paths from the pre-rebuild site are not referenced.

Usage:
    python3 harness/scripts/check_docs.py

Exit code 0 = no errors, 1 = at least one error.
"""

from __future__ import annotations

import json
import re
import sys
from pathlib import Path
from urllib.parse import unquote

REPO_ROOT = Path(__file__).resolve().parents[2]
CONFIG_PATH = REPO_ROOT / "harness" / "config" / "site.json"

REQUIRED_DOCS = [
    "README.md",
    "AGENTS.md",
    "PROJECT.md",
    "docs/WEBSITE_SPEC.md",
    "docs/BRAND.md",
    "docs/INVARIANTS.md",
    "docs/SECURITY.md",
    "docs/TESTING.md",
    "docs/SEO.md",
    "docs/ACCESSIBILITY.md",
    "docs/HARNESS.md",
    "docs/QUALITY_SCORE.md",
    "docs/APPROVAL_LOG.md",
    "docs/ORGANISATION.md",
    "docs/OWNER_REVIEW.md",
    "docs/PRIVACY_NOTICE.md",
    "docs/LAUNCH_CHECKLIST.md",
    "docs/LEGAL_AUDIT.md",
    "docs/ACCESSIBILITY_AUDIT.md",
    "docs/VIDEO_CAPTIONS_INVENTORY.md",
    "docs/_config.yml",
    "docs/sitemap.xml",
    "docs/robots.txt",
    "plans/ACTIVE.md",
]

STALE_PATHS = [
    "Snipped_logo.png",
    "docs/gila.jpeg",
    "docs/gilaa.jpeg",
    "docs/docs/",
    "docs/harness/",
]

EMAIL_RE = re.compile(r"[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}")
PHONE_RE = re.compile(r"\+45[\s\-]?\d{2}[\s\-]?\d{2}[\s\-]?\d{2}[\s\-]?\d{2}")
MD_LINK_RE = re.compile(r"\[[^\]]*\]\(([^)\s]+)(?:\s+\"[^\"]*\")?\)")
HTTP_RE = re.compile(r"https?://[^\s)>\"]+")


def normalized_phone(value: str) -> str:
    return re.sub(r"\D", "", value)


class DocsChecker:
    def __init__(self, config: dict) -> None:
        self.config = config
        self.errors: list[str] = []
        self.warnings: list[str] = []

    def error(self, message: str) -> None:
        self.errors.append(message)

    def warn(self, message: str) -> None:
        self.warnings.append(message)

    def rel(self, path: Path) -> str:
        try:
            return str(path.relative_to(REPO_ROOT))
        except ValueError:
            return str(path)

    def markdown_files(self) -> list[Path]:
        files = list(REPO_ROOT.glob("*.md"))
        files += list((REPO_ROOT / "docs").glob("*.md"))
        files += list((REPO_ROOT / "plans").glob("*.md"))
        files += list((REPO_ROOT / "docs" / "decisions").glob("*.md"))
        files += list((REPO_ROOT / "harness" / "reports").glob("*.md"))
        return sorted({path.resolve() for path in files})

    def check_required(self) -> None:
        for item in REQUIRED_DOCS:
            path = REPO_ROOT / item
            if not path.exists():
                self.error(f"required document missing: {item}")

    def check_links(self) -> None:
        for path in self.markdown_files():
            text = path.read_text(encoding="utf-8")
            for match in MD_LINK_RE.finditer(text):
                target = match.group(1).strip()
                if not target or target.startswith(("#", "http://", "https://", "mailto:", "tel:")):
                    continue
                clean = unquote(target.split("#", 1)[0])
                if not clean:
                    continue
                resolved = (path.parent / clean).resolve()
                try:
                    resolved.relative_to(REPO_ROOT)
                except ValueError:
                    self.error(f"{self.rel(path)}: link escapes the repository: {target}")
                    continue
                if not resolved.exists():
                    self.error(f"{self.rel(path)}: broken documentation link: {target}")

    def check_contacts(self) -> None:
        expected_email = self.config["contact"]["email"]
        expected_phone = normalized_phone(self.config["contact"]["phone_href"])
        for path in self.markdown_files():
            text = path.read_text(encoding="utf-8")
            for email in EMAIL_RE.findall(text):
                if email.lower() == expected_email.lower():
                    continue
                if email.lower().endswith(("@example.com", "@example.org")):
                    self.warn(f"{self.rel(path)}: example e-mail address {email}")
                    continue
                self.error(
                    f"{self.rel(path)}: unexpected e-mail {email!r}; "
                    f"the site contact is {expected_email!r}"
                )
            for phone in PHONE_RE.findall(text):
                if normalized_phone(phone) != expected_phone:
                    self.error(
                        f"{self.rel(path)}: unexpected phone number {phone!r}; "
                        f"expected {self.config['contact']['phone_display']!r}"
                    )

    def check_page_inventory(self) -> None:
        spec_path = REPO_ROOT / "docs" / "WEBSITE_SPEC.md"
        if not spec_path.exists():
            return
        spec = spec_path.read_text(encoding="utf-8")
        for name in self.config["required_pages"] + self.config["noindex_pages"]:
            if name not in spec:
                self.error(f"docs/WEBSITE_SPEC.md: page {name} is not documented")

        readme = REPO_ROOT / "README.md"
        if readme.exists():
            text = readme.read_text(encoding="utf-8")
            expected = len(self.config["required_pages"]) + len(self.config["noindex_pages"])
            if str(expected) not in text and str(expected) not in spec:
                self.warn(
                    f"README/WEBSITE_SPEC: page count ({expected}) is not stated consistently"
                )

    def check_stale_paths(self) -> None:
        for path in self.markdown_files():
            text = path.read_text(encoding="utf-8")
            for stale in STALE_PATHS:
                if stale in text:
                    # Archive documentation may legitimately refer to preserved files.
                    if self.rel(path).startswith("archive/") or "archive/" in text.split(stale)[0][-120:]:
                        continue
                    self.error(f"{self.rel(path)}: references stale pre-rebuild path {stale!r}")

    def check_domains(self) -> None:
        for path in self.markdown_files():
            text = path.read_text(encoding="utf-8")
            for url in HTTP_RE.findall(text):
                host = url.split("//", 1)[-1].split("/", 1)[0].lower()
                if host.startswith("www.gila-brobygger.dk"):
                    self.error(
                        f"{self.rel(path)}: canonical domain must be non-www; found {url}"
                    )

    def check_approval_visibility(self) -> None:
        log = REPO_ROOT / "docs" / "APPROVAL_LOG.md"
        if log.exists():
            text = log.read_text(encoding="utf-8").lower()
            if "pending" not in text:
                self.error("docs/APPROVAL_LOG.md: no pending approval is recorded")
            if "owner" not in text:
                self.error("docs/APPROVAL_LOG.md: owner approval process is not documented")

    def run(self) -> bool:
        self.check_required()
        self.check_links()
        self.check_contacts()
        self.check_page_inventory()
        self.check_stale_paths()
        self.check_domains()
        self.check_approval_visibility()
        return not self.errors

    def summary(self) -> str:
        lines = [
            "Documentation check",
            f"Documents scanned: {len(self.markdown_files())}",
            f"Errors: {len(self.errors)}",
            f"Warnings: {len(self.warnings)}",
        ]
        if self.errors:
            lines.append("")
            lines.append("ERRORS")
            lines.extend(f"  ✗ {item}" for item in self.errors)
        if self.warnings:
            lines.append("")
            lines.append("WARNINGS")
            lines.extend(f"  ! {item}" for item in self.warnings)
        lines.append("")
        lines.append("RESULT: PASS" if not self.errors else "RESULT: FAIL")
        return "\n".join(lines)


def main() -> int:
    with CONFIG_PATH.open(encoding="utf-8") as handle:
        config = json.load(handle)
    checker = DocsChecker(config)
    passed = checker.run()
    print(checker.summary())
    return 0 if passed else 1


if __name__ == "__main__":
    sys.exit(main())
