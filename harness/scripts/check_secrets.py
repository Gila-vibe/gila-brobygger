#!/usr/bin/env python3
"""Secret and credential scan for the Gila Brobygger repository.

This is a safety net, not a guarantee. It looks for common credential
formats, private keys and credential files in the working tree. The
archive/ directory and the ignored nested docs/gila-brobygger/ repository
are excluded because they are not published and may contain historical
material.

Usage:
    python3 harness/scripts/check_secrets.py

Exit code 0 = no high-confidence findings, 1 = at least one finding.
"""

from __future__ import annotations

import re
import sys
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parents[2]
SELF = Path(__file__).resolve()

EXCLUDED_DIRS = {
    ".git",
    "archive",
    "node_modules",
    "dist",
    "coverage",
    "__pycache__",
}
EXCLUDED_PATHS = {
    REPO_ROOT / "docs" / "gila-brobygger",
}
SCANNED_SUFFIXES = {
    "", ".md", ".py", ".html", ".css", ".js", ".json", ".yml", ".yaml",
    ".txt", ".xml", ".toml", ".ini", ".cfg", ".sh", ".gitignore",
    ".gitattributes", ".example",
}
SKIPPED_NAMES = {
    "package-lock.json", "yarn.lock", "pnpm-lock.yaml",
}

CREDENTIAL_FILENAMES = {
    ".env", ".env.local", ".env.production", ".env.development",
    "id_rsa", "id_dsa", "id_ecdsa", "id_ed25519",
    "credentials.json", "service-account.json",
    "secrets.yml", "secrets.yaml",
}

HIGH_CONFIDENCE = [
    ("private key block", re.compile(r"-----BEGIN (?:RSA |EC |DSA |OPENSSH |PGP )?PRIVATE KEY-----")),
    ("AWS access key", re.compile(r"\bAKIA[0-9A-Z]{16}\b")),
    ("GitHub token", re.compile(r"\bgh[pousr]_[A-Za-z0-9]{36,}\b")),
    ("GitHub fine-grained token", re.compile(r"\bgithub_pat_[A-Za-z0-9_]{20,}\b")),
    ("Slack token", re.compile(r"\bxox[baprs]-[A-Za-z0-9-]{10,}\b")),
    ("Google API key", re.compile(r"\bAIza[0-9A-Za-z\-_]{35}\b")),
    ("Stripe secret key", re.compile(r"\bsk_live_[0-9A-Za-z]{20,}\b")),
    ("URL with embedded credentials", re.compile(r"https?://[^\s:/@]+:[^\s/@]+@[^\s/]+")),
    ("JWT", re.compile(r"\beyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\b")),
]

ASSIGNMENT = re.compile(
    r"(?i)\b(password|passwd|pwd|api[_-]?key|apikey|access[_-]?token|auth[_-]?token|"
    r"client[_-]?secret)\b\s*[:=]\s*['\"]([^'\"]{8,})['\"]"
)
PLACEHOLDER_VALUE = re.compile(
    r"(?i)(example|placeholder|change[-_ ]?me|your[-_ ]|xxx+|redacted|dummy|sample|test|"
    r"<[^>]+>|\$\{|\$\(|process\.env)"
)


class SecretScanner:
    def __init__(self) -> None:
        self.errors: list[str] = []
        self.warnings: list[str] = []
        self.files_scanned = 0

    def rel(self, path: Path) -> str:
        try:
            return str(path.relative_to(REPO_ROOT))
        except ValueError:
            return str(path)

    def error(self, message: str) -> None:
        self.errors.append(message)

    def warn(self, message: str) -> None:
        self.warnings.append(message)

    def excluded(self, path: Path) -> bool:
        try:
            relative = path.relative_to(REPO_ROOT)
        except ValueError:
            return True
        if any(part in EXCLUDED_DIRS for part in relative.parts):
            return True
        for excluded in EXCLUDED_PATHS:
            try:
                path.relative_to(excluded)
                return True
            except ValueError:
                continue
        return False

    def iter_files(self) -> list[Path]:
        files: list[Path] = []
        for path in REPO_ROOT.rglob("*"):
            if not path.is_file() or path.is_symlink():
                continue
            if self.excluded(path):
                continue
            if path.resolve() == SELF:
                continue
            if path.name in SKIPPED_NAMES:
                continue
            if path.suffix.lower() not in SCANNED_SUFFIXES and path.name not in (".gitignore", ".gitattributes"):
                continue
            files.append(path)
        return files

    def scan(self, path: Path) -> None:
        if path.name in CREDENTIAL_FILENAMES or path.name.startswith(".env."):
            self.error(f"{self.rel(path)}: credential file must not be committed")
            return

        try:
            text = path.read_text(encoding="utf-8", errors="replace")
        except OSError as exc:
            self.warn(f"{self.rel(path)}: could not read file: {exc}")
            return

        self.files_scanned += 1

        for line_number, line in enumerate(text.splitlines(), start=1):
            for label, pattern in HIGH_CONFIDENCE:
                if pattern.search(line):
                    self.error(f"{self.rel(path)}:{line_number}: possible {label}")

            for match in ASSIGNMENT.finditer(line):
                value = match.group(2)
                if PLACEHOLDER_VALUE.search(value):
                    continue
                self.warn(
                    f"{self.rel(path)}:{line_number}: possible hard-coded "
                    f"{match.group(1)} – verify and remove if real"
                )

    def run(self) -> bool:
        for path in self.iter_files():
            self.scan(path)
        return not self.errors

    def summary(self) -> str:
        lines = [
            "Secret scan",
            f"Files scanned: {self.files_scanned}",
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
    scanner = SecretScanner()
    passed = scanner.run()
    print(scanner.summary())
    return 0 if passed else 1


if __name__ == "__main__":
    sys.exit(main())
