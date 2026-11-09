#!/usr/bin/env python3
"""Site harness for the Gila Brobygger website.

Dependency-free validation of the published site in docs/:
structure, navigation, metadata, links, anchors, assets, accessibility
basics, privacy policy and publishing configuration.

Usage:
    python3 harness/scripts/check_site.py
    python3 harness/scripts/check_site.py --report harness/reports/latest.json

Exit code 0 = no errors, 1 = at least one error.
"""

from __future__ import annotations

import argparse
import json
import re
import sys
import urllib.parse
import xml.etree.ElementTree as ET
from datetime import datetime, timezone
from html.parser import HTMLParser
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parents[2]
CONFIG_PATH = REPO_ROOT / "harness" / "config" / "site.json"

SECRET_HINT = re.compile(
    r"(google-analytics|googletagmanager|gtag\s*\(|fbq\s*\(|hotjar|clarity\.ms|"
    r"matomo|plausible\.io|cookiebot|analytics\.js|connect\.facebook\.net)",
    re.IGNORECASE,
)

PLACEHOLDER_TEXT = re.compile(
    r"(lorem ipsum|\bTODO\b|\bFIXME\b|\bXXX\b|indsæt tekst|din tekst her|"
    r"placeholder\.com|example\.com)",
    re.IGNORECASE,
)

ALLOWED_EXTERNAL_SCHEMES = {"mailto:", "tel:", "sms:", "https:", "http:"}
VOID_TAGS = {
    "area", "base", "br", "col", "embed", "hr", "img", "input",
    "link", "meta", "param", "source", "track", "wbr",
}


class PageParser(HTMLParser):
    """Collect the information the harness needs from one HTML document."""

    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.tags: list[tuple[str, dict[str, str]]] = []
        self.ids: list[str] = []
        self.title_parts: list[str] = []
        self.h1_parts: list[str] = []
        self.text_parts: list[str] = []
        self.inline_scripts: list[dict[str, str]] = []
        self.style_blocks: list[str] = []
        self._in_title = False
        self._h1_depth = 0
        self._in_style = False
        self._in_script = False
        self._script_attrs: dict[str, str] = {}
        self._script_data: list[str] = []
        self.has_doctype = False

    def handle_decl(self, decl: str) -> None:
        if decl.strip().lower() == "doctype html":
            self.has_doctype = True

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        attr_map = {key.lower(): (value if value is not None else "") for key, value in attrs}
        self.tags.append((tag.lower(), attr_map))
        if "id" in attr_map:
            self.ids.append(attr_map["id"])

        if tag == "title":
            self._in_title = True
        elif tag == "h1":
            self._h1_depth += 1
        elif tag == "style":
            self._in_style = True
            self.style_blocks.append("")
        elif tag == "script":
            self._in_script = True
            self._script_attrs = attr_map
            self._script_data = []
        elif tag in ("br", "p", "li", "div", "section", "h1", "h2", "h3", "h4", "tr", "td"):
            self.text_parts.append(" ")

    def handle_endtag(self, tag: str) -> None:
        tag = tag.lower()
        if tag == "title":
            self._in_title = False
        elif tag == "h1" and self._h1_depth > 0:
            self._h1_depth -= 1
        elif tag == "style":
            self._in_style = False
        elif tag == "script" and self._in_script:
            self._in_script = False
            data = "".join(self._script_data)
            if not self._script_attrs.get("src"):
                self.inline_scripts.append({**self._script_attrs, "data": data})
            self._script_attrs = {}
            self._script_data = []
        elif tag in ("p", "li", "div", "section", "h2", "h3", "h4", "tr", "td"):
            self.text_parts.append(" ")

    def handle_data(self, data: str) -> None:
        if self._in_title:
            self.title_parts.append(data)
        if self._h1_depth:
            self.h1_parts.append(data)
        if self._in_script:
            self._script_data.append(data)
        if self._in_style:
            if self.style_blocks:
                self.style_blocks[-1] += data
        elif not self._in_script:
            self.text_parts.append(data)

    @property
    def title(self) -> str:
        return " ".join("".join(self.title_parts).split())

    @property
    def h1_text(self) -> str:
        return " ".join("".join(self.h1_parts).split())

    @property
    def visible_text(self) -> str:
        return " ".join("".join(self.text_parts).split())


def load_config() -> dict:
    with CONFIG_PATH.open(encoding="utf-8") as handle:
        return json.load(handle)


def is_external(url: str) -> bool:
    parsed = urllib.parse.urlparse(url)
    return bool(parsed.scheme and parsed.scheme not in ("", "mailto", "tel", "sms")) or bool(
        parsed.netloc
    )


def normalize_url(url: str) -> str:
    return url.strip()


class SiteChecker:
    def __init__(self, config: dict) -> None:
        self.config = config
        self.docs = REPO_ROOT / config["publish_dir"]
        self.base_url = config["base_url"].rstrip("/")
        self.errors: list[str] = []
        self.warnings: list[str] = []
        self.parsed: dict[str, PageParser] = {}
        self.page_ids: dict[str, set[str]] = {}

    # ------------------------------------------------------------------ utils

    def error(self, message: str) -> None:
        self.errors.append(message)

    def warn(self, message: str) -> None:
        self.warnings.append(message)

    def rel(self, path: Path) -> str:
        try:
            return str(path.relative_to(REPO_ROOT))
        except ValueError:
            return str(path)

    def html_pages(self) -> list[Path]:
        return sorted(
            path for path in self.docs.glob("*.html")
            if not (path.name.startswith("google") and path.name.endswith(".html"))
        )

    def ensure_file(self, path: Path, label: str) -> bool:
        if not path.exists():
            self.error(f"{label}: missing file {self.rel(path)}")
            return False
        if not path.is_file():
            self.error(f"{label}: expected a file, found {self.rel(path)}")
            return False
        return True

    # ------------------------------------------------------------------ parse

    def parse_pages(self) -> None:
        for page in self.html_pages():
            parser = PageParser()
            raw = page.read_text(encoding="utf-8")
            try:
                parser.feed(raw)
                parser.close()
            except Exception as exc:  # pragma: no cover - defensive
                self.error(f"{self.rel(page)}: could not parse HTML: {exc}")
                continue
            if not parser.has_doctype:
                self.error(f"{self.rel(page)}: missing <!doctype html>")
            self.parsed[page.name] = parser
            self.page_ids[page.name] = set(parser.ids)

        if not self.parsed:
            self.error("docs/: no HTML pages found")

    # ------------------------------------------------------------------ base

    def check_required_files(self) -> None:
        required = [
            self.docs / self.config["entry_point"],
            self.docs / "CNAME",
            self.docs / "robots.txt",
            self.docs / "sitemap.xml",
            self.docs / "_config.yml",
        ]
        for path in required:
            self.ensure_file(path, "required")

        assets = self.config["assets"]
        for key, value in assets.items():
            self.ensure_file(self.docs / value, f"asset ({key})")

        for name in self.config["required_pages"] + self.config["noindex_pages"]:
            self.ensure_file(self.docs / name, "page inventory")

    def check_cname(self) -> None:
        path = self.docs / "CNAME"
        if not path.exists():
            return
        raw = path.read_text(encoding="utf-8")
        expected = self.config["domain"]
        if raw != expected:
            self.error(
                f"docs/CNAME must contain exactly {expected!r} with no extra whitespace; "
                f"found {raw!r}"
            )

    def check_config_file(self) -> None:
        path = self.docs / "_config.yml"
        if not path.exists():
            return
        content = path.read_text(encoding="utf-8")
        if "exclude" not in content:
            self.error("docs/_config.yml: missing 'exclude' for engineering documents")
        if "*.md" not in content:
            self.error("docs/_config.yml: engineering Markdown is not excluded ('*.md')")

    # ------------------------------------------------------------------ pages

    def check_page(self, name: str, page: PageParser) -> None:
        rel = f"docs/{name}"
        tags = page.tags
        tag_names = [tag for tag, _ in tags]

        # Language and encoding
        html_tags = [attrs for tag, attrs in tags if tag == "html"]
        if not html_tags:
            self.error(f"{rel}: missing <html> element")
        else:
            lang = html_tags[0].get("lang", "")
            if lang.lower() != "da":
                self.error(f"{rel}: <html lang> should be 'da', found {lang!r}")

        charset = [attrs.get("charset", "") for tag, attrs in tags if tag == "meta" and "charset" in attrs]
        if not charset or charset[0].lower() != "utf-8":
            self.error(f"{rel}: missing <meta charset=\"utf-8\">")

        viewport = [
            attrs.get("content", "")
            for tag, attrs in tags
            if tag == "meta" and attrs.get("name", "").lower() == "viewport"
        ]
        if not viewport:
            self.error(f"{rel}: missing viewport meta tag")
        else:
            content = viewport[0].lower()
            if "width=device-width" not in content:
                self.error(f"{rel}: viewport should contain width=device-width")
            if "user-scalable=no" in content or "maximum-scale=1" in content:
                self.error(f"{rel}: viewport prevents zooming (accessibility)")

        # Title and description
        if not page.title:
            self.error(f"{rel}: empty or missing <title>")
        else:
            max_title = self.config["policy"].get("max_title_length", 70)
            if len(page.title) > max_title:
                self.warn(f"{rel}: title is {len(page.title)} chars (recommended ≤ {max_title})")
            if "Gila Brobygger" not in page.title:
                self.warn(f"{rel}: title does not contain the organisation name")

        descriptions = [
            attrs.get("content", "")
            for tag, attrs in tags
            if tag == "meta" and attrs.get("name", "").lower() == "description"
        ]
        if not descriptions or not descriptions[0].strip():
            if self.config["policy"].get("require_meta_description", True):
                self.error(f"{rel}: missing meta description")
        else:
            max_desc = self.config["policy"].get("max_description_length", 165)
            if len(descriptions[0]) > max_desc:
                self.warn(f"{rel}: meta description is {len(descriptions[0])} chars (recommended ≤ {max_desc})")

        # Headings
        h1_count = sum(1 for tag in tag_names if tag == "h1")
        if h1_count != 1:
            self.error(f"{rel}: expected exactly one <h1>, found {h1_count}")
        elif not page.h1_text:
            self.error(f"{rel}: <h1> is empty")
        h2_count = sum(1 for tag in tag_names if tag == "h2")
        if name != "404.html" and h2_count == 0:
            self.warn(f"{rel}: no <h2> found; check the heading outline")

        # Landmarks and skip link
        if "main" not in tag_names:
            self.error(f"{rel}: missing <main> landmark")
        main_ids = [attrs.get("id") for tag, attrs in tags if tag == "main"]
        if "main" not in main_ids:
            self.error(f"{rel}: <main> must have id=\"main\"")
        if "header" not in tag_names:
            self.error(f"{rel}: missing <header>")
        if "footer" not in tag_names:
            self.error(f"{rel}: missing <footer>")
        if "nav" not in tag_names:
            self.error(f"{rel}: missing <nav>")

        skip_links = [
            attrs
            for tag, attrs in tags
            if tag == "a" and "skip-link" in attrs.get("class", "").split()
        ]
        if not skip_links:
            if self.config["policy"].get("require_skip_link", True):
                self.error(f"{rel}: missing skip link")
        elif skip_links[0].get("href") != "#main":
            self.error(f"{rel}: skip link must target #main")

        # Shared assets
        stylesheet = self.config["assets"]["stylesheet"]
        css_links = [
            attrs.get("href", "")
            for tag, attrs in tags
            if tag == "link" and "stylesheet" in attrs.get("rel", "").lower().split()
        ]
        if stylesheet not in css_links:
            self.error(f"{rel}: missing shared stylesheet {stylesheet}")

        script = self.config["assets"]["script"]
        scripts = [
            attrs
            for tag, attrs in tags
            if tag == "script" and attrs.get("src", "") == script
        ]
        if not scripts:
            self.error(f"{rel}: missing shared script {script}")
        elif "defer" not in scripts[0]:
            self.warn(f"{rel}: shared script should be loaded with defer")

        icons = [
            attrs.get("href", "")
            for tag, attrs in tags
            if tag == "link" and "icon" in attrs.get("rel", "").lower().split()
        ]
        if not icons:
            self.warn(f"{rel}: missing favicon link")

        # Canonical and Open Graph
        canonicals = [
            attrs.get("href", "")
            for tag, attrs in tags
            if tag == "link" and "canonical" in attrs.get("rel", "").lower().split()
        ]
        expected = self.base_url + ("/" if name == "index.html" else f"/{name}")
        if not canonicals:
            if self.config["policy"].get("require_canonical", True) and name not in self.config["noindex_pages"]:
                self.error(f"{rel}: missing canonical link")
        elif canonicals[0] != expected:
            self.error(f"{rel}: canonical should be {expected!r}, found {canonicals[0]!r}")

        if self.config["policy"].get("require_og_tags", True) and name not in self.config["noindex_pages"]:
            og = {
                attrs.get("property", "").lower(): attrs.get("content", "")
                for tag, attrs in tags
                if tag == "meta" and attrs.get("property", "").lower().startswith("og:")
            }
            for key in ("og:type", "og:title", "og:description", "og:url", "og:image"):
                if not og.get(key):
                    self.error(f"{rel}: missing {key}")

        # Robots
        robots = [
            attrs.get("content", "")
            for tag, attrs in tags
            if tag == "meta" and attrs.get("name", "").lower() == "robots"
        ]
        if name in self.config["noindex_pages"]:
            if not robots or "noindex" not in robots[0].lower():
                self.error(f"{rel}: missing noindex robots meta tag")
        elif robots and "noindex" in robots[0].lower():
            self.error(f"{rel}: page is noindex but is listed as indexable")

        # Ids
        if len(page.ids) != len(set(page.ids)):
            seen = set()
            duplicates = sorted({value for value in page.ids if value in seen or seen.add(value)})
            self.error(f"{rel}: duplicate id attribute(s): {', '.join(duplicates)}")

        # Images
        for tag, attrs in tags:
            if tag == "img":
                if "alt" not in attrs:
                    self.error(f"{rel}: <img> without alt: {attrs.get('src', '?')}")
                if attrs.get("src", "").startswith("http"):
                    self.error(f"{rel}: external image is not allowed: {attrs.get('src')}")
                if not attrs.get("src", "").strip():
                    self.error(f"{rel}: <img> without src")

        # Shared design-system shell: every page must use the same shell classes.
        classes = " ".join(attrs.get("class", "") for tag, attrs in tags)
        for required_class in ("site-header", "site-nav", "site-footer"):
            if required_class not in classes:
                self.error(f"{rel}: missing shared design-system class {required_class!r}")

        # Forms and external resources
        if "form" in tag_names:
            self.error(f"{rel}: <form> found; the site must not collect data")
        if "iframe" in tag_names:
            self.error(f"{rel}: <iframe> found; no third-party embeds are allowed")
        if any(tag in ("object", "embed") for tag in tag_names):
            self.error(f"{rel}: <object>/<embed> found; no embeds are allowed")

        for tag, attrs in tags:
            if tag == "script":
                src = attrs.get("src", "")
                if src and is_external(src):
                    self.error(f"{rel}: external script is not allowed: {src}")
            if tag == "link":
                rel_value = attrs.get("rel", "").lower().split()
                if any(item in ("stylesheet", "icon", "preload", "prefetch", "dns-prefetch", "preconnect", "modulepreload") for item in rel_value):
                    href = attrs.get("href", "")
                    if href and is_external(href):
                        self.error(f"{rel}: external <link> resource is not allowed: {href}")
            if tag in ("img", "source", "video", "audio", "track") and attrs.get("src", ""):
                if is_external(attrs["src"]) and not attrs["src"].startswith("data:"):
                    self.error(f"{rel}: external media is not allowed: {attrs['src']}")

        # Inline scripts: only JSON-LD is allowed
        for inline in page.inline_scripts:
            script_type = inline.get("type", "").lower()
            if script_type == "application/ld+json":
                try:
                    json.loads(inline.get("data", ""))
                except json.JSONDecodeError as exc:
                    self.error(f"{rel}: invalid JSON-LD: {exc}")
            else:
                self.error(f"{rel}: inline script is not allowed (type={script_type or 'none'})")

        # Inline style imports
        for style in page.style_blocks:
            if "@import" in style or "url(http" in style:
                self.error(f"{rel}: inline style loads an external resource")

        # Link handling
        link_attrs: list[dict[str, str]] = [attrs for tag, attrs in tags if tag == "a"]

        # External image via meta og:image is fine (absolute), other meta is fine.

        # Empty / placeholder links
        for attrs in link_attrs:
            href = attrs.get("href")
            if href is None:
                self.warn(f"{rel}: <a> without href")
                continue
            href = href.strip()
            if href in ("", "#"):
                self.error(f"{rel}: empty or placeholder link")
            elif href.lower().startswith("javascript:"):
                self.error(f"{rel}: javascript: link is not allowed")
            elif "example.com" in href.lower():
                self.error(f"{rel}: placeholder link {href}")
            elif href.lower().startswith("mailto:"):
                if not re.match(r"^mailto:[^\s@]+@[^\s@]+\.[^\s@]+$", href, re.IGNORECASE):
                    self.error(f"{rel}: invalid mailto: syntax: {href}")
            elif href.lower().startswith("tel:"):
                if not re.match(r"^tel:\+?[0-9][0-9\s\-()]{6,}$", href):
                    self.error(f"{rel}: invalid tel: syntax: {href}")

        # Contact links on every page
        hrefs = {attrs.get("href", "") for attrs in link_attrs}
        email = self.config["contact"]["email"]
        phone_href = self.config["contact"]["phone_href"]
        if f"mailto:{email}" not in hrefs:
            self.error(f"{rel}: missing contact e-mail link mailto:{email}")
        if f"tel:{phone_href}" not in hrefs:
            self.error(f"{rel}: missing contact phone link tel:{phone_href}")

        # Navigation presence
        for item in self.config["navigation"]:
            if item["href"] not in hrefs:
                self.error(f"{rel}: navigation link missing: {item['href']} ({item['label']})")
        for item in self.config["footer_links"]:
            if item not in hrefs:
                self.error(f"{rel}: footer link missing: {item}")

        # Placeholder text in visible content
        for match in PLACEHOLDER_TEXT.finditer(page.visible_text):
            self.error(f"{rel}: placeholder marker in visible text: {match.group(0)!r}")

        # Tracker markers anywhere in the document
        raw = (self.docs / name).read_text(encoding="utf-8")
        for match in SECRET_HINT.finditer(raw):
            if self.config["policy"].get("allow_analytics", False):
                self.warn(f"{rel}: analytics marker found: {match.group(0)!r}")
            else:
                self.error(f"{rel}: analytics/tracker marker found: {match.group(0)!r}")

        # Placeholder contact details must never appear on the live site.
        contact_placeholders = re.compile(
            r"(example\.com|example\.org|\+45\s*00|0000\s*0000|your[- ]?email|din[- ]?email)",
            re.IGNORECASE,
        )
        for match in contact_placeholders.finditer(raw):
            self.error(f"{rel}: possible placeholder contact detail: {match.group(0)!r}")

        # Positive tabindex
        for tag, attrs in tags:
            if "tabindex" in attrs:
                try:
                    if int(attrs["tabindex"]) > 0:
                        self.error(f"{rel}: positive tabindex on <{tag}> is not allowed")
                except ValueError:
                    self.warn(f"{rel}: invalid tabindex on <{tag}>: {attrs['tabindex']!r}")

        # Internal link and asset resolution
        self.check_links(name, page)

    # ------------------------------------------------------------------ links

    def check_links(self, name: str, page: PageParser) -> None:
        rel = f"docs/{name}"
        for tag, attrs in page.tags:
            urls: list[str] = []
            if tag == "a" and attrs.get("href"):
                urls.append(attrs["href"])
            if tag in ("img", "source", "video", "audio", "track") and attrs.get("src"):
                urls.append(attrs["src"])
            if tag == "script" and attrs.get("src"):
                urls.append(attrs["src"])
            if tag == "link" and attrs.get("href"):
                urls.append(attrs["href"])

            for url in urls:
                self.check_url(rel, name, url.strip())

    def check_url(self, rel: str, current: str, url: str) -> None:
        if not url:
            return
        if url.startswith(("mailto:", "tel:", "sms:", "data:")):
            return
        parsed = urllib.parse.urlparse(url)
        if parsed.scheme in ("http", "https") and parsed.netloc:
            if parsed.netloc.rstrip("/") == self.config["domain"]:
                # Absolute link to our own site: treat as internal path.
                path = parsed.path.lstrip("/") or "index.html"
                self.check_internal(rel, current, path, parsed.fragment)
            return
        if parsed.scheme:
            self.warn(f"{rel}: unrecognised link scheme: {url}")
            return

        self.check_internal(rel, current, parsed.path, parsed.fragment)

    def check_internal(self, rel: str, current: str, path: str, fragment: str) -> None:
        if not path:
            target = current
        else:
            decoded = urllib.parse.unquote(path)
            if decoded.startswith("/"):
                self.error(f"{rel}: absolute internal path is not allowed (use relative paths): {path}")
                return
            target = decoded

        target_path = (self.docs / target).resolve()
        docs_resolved = self.docs.resolve()
        try:
            target_path.relative_to(docs_resolved)
        except ValueError:
            self.error(f"{rel}: link escapes the publishing directory: {path}")
            return

        if target.endswith("/"):
            target_path = target_path / "index.html"

        if target_path.is_dir():
            target_path = target_path / "index.html"

        if not target_path.exists():
            self.error(f"{rel}: broken link or asset (target does not exist): {path or current}")
            return

        if fragment:
            target_name = target_path.name
            if target_name in self.page_ids:
                if fragment not in self.page_ids[target_name]:
                    self.error(f"{rel}: broken anchor #{fragment} in {target_name}")
            else:
                self.warn(f"{rel}: anchor #{fragment} targets a non-HTML file ({target_name})")

    # ------------------------------------------------------------------ css/js

    def check_stylesheet(self) -> None:
        path = self.docs / self.config["assets"]["stylesheet"]
        if not path.exists():
            return
        content = path.read_text(encoding="utf-8")
        rel = self.rel(path)
        if "@import" in content:
            self.error(f"{rel}: @import is not allowed (no external or chained stylesheets)")
        if re.search(r"url\(\s*['\"]?https?:", content):
            self.error(f"{rel}: external url() is not allowed")
        for needle in (":focus-visible", "prefers-reduced-motion", ".skip-link", ".sr-only"):
            if needle not in content:
                self.error(f"{rel}: missing required accessibility rule {needle!r}")

    def check_javascript(self) -> None:
        path = self.docs / self.config["assets"]["script"]
        if not path.exists():
            return
        content = path.read_text(encoding="utf-8")
        rel = self.rel(path)
        forbidden = {
            "fetch(": "network request",
            "XMLHttpRequest": "network request",
            "WebSocket": "network request",
            "sendBeacon": "network request",
            "localStorage": "browser storage",
            "sessionStorage": "browser storage",
            "document.cookie": "cookie access",
            "http://": "external URL",
            "https://": "external URL",
        }
        for needle, reason in forbidden.items():
            if needle in content:
                self.error(f"{rel}: contains {reason} ({needle!r}); chatbot must stay local-only")
        if "gb-chatbot" not in content:
            self.warn(f"{rel}: chatbot root id not found")
        if "CPR" not in content and "cpr" not in content:
            self.error(f"{rel}: chatbot is missing the sensitive-data warning")

    # ------------------------------------------------------------------ files

    def check_metadata_files(self) -> None:
        sitemap = self.docs / "sitemap.xml"
        if sitemap.exists():
            try:
                tree = ET.parse(sitemap)
                urls = {
                    (element.text or "").strip()
                    for element in tree.getroot().iter()
                    if element.tag.endswith("loc")
                }
            except ET.ParseError as exc:
                self.error(f"docs/sitemap.xml: invalid XML: {exc}")
                urls = set()
            expected = {
                self.base_url + ("/" if name == "index.html" else f"/{name}")
                for name in self.config["required_pages"]
            }
            missing = sorted(expected - urls)
            extra = sorted(urls - expected)
            if missing:
                self.error(f"docs/sitemap.xml: missing URL(s): {', '.join(missing)}")
            if extra:
                self.error(f"docs/sitemap.xml: unexpected URL(s): {', '.join(extra)}")
            for element in tree.getroot().iter():
                if element.tag.endswith("lastmod") and not re.match(r"^\d{4}-\d{2}-\d{2}", (element.text or "").strip()):
                    self.warn("docs/sitemap.xml: lastmod is not an ISO date")

        robots = self.docs / "robots.txt"
        if robots.exists():
            content = robots.read_text(encoding="utf-8")
            if f"Sitemap: {self.base_url}/sitemap.xml" not in content:
                self.error("docs/robots.txt: missing absolute sitemap reference")
            if "User-agent:" not in content:
                self.error("docs/robots.txt: missing User-agent")

    def check_images(self) -> None:
        images = self.docs / "assets" / "images"
        if not images.exists():
            return
        for path in images.glob("*.jpg"):
            data = path.read_bytes()
            if b"Exif\x00\x00" in data or b"GPS" in data:
                self.error(f"{self.rel(path)}: JPEG contains EXIF/GPS metadata; strip it before publishing")
        if not (images / "gila-portrait.jpg").exists():
            self.error("docs/assets/images/gila-portrait.jpg is missing")

    def check_homepage_extras(self) -> None:
        page = self.parsed.get("index.html")
        if not page:
            return
        json_ld = [
            inline.get("data", "")
            for inline in page.inline_scripts
            if inline.get("type", "").lower() == "application/ld+json"
        ]
        if not json_ld:
            self.warn("docs/index.html: no organization JSON-LD found")
            return
        try:
            data = json.loads(json_ld[0])
        except json.JSONDecodeError:
            return  # already reported
        if data.get("@type") != "Organization":
            self.warn("docs/index.html: JSON-LD is not an Organization")
        if data.get("name") != "Gila Brobygger":
            self.error("docs/index.html: JSON-LD name should be 'Gila Brobygger'")
        if data.get("email") != self.config["contact"]["email"]:
            self.error("docs/index.html: JSON-LD email does not match the site contact")

    # ------------------------------------------------------------------ run

    def run(self) -> bool:
        self.check_required_files()
        self.check_cname()
        self.check_config_file()
        self.parse_pages()

        seen_titles: dict[str, str] = {}
        for name, page in self.parsed.items():
            self.check_page(name, page)
            if page.title:
                if page.title in seen_titles:
                    self.error(
                        f"docs/{name}: duplicate title with docs/{seen_titles[page.title]}: "
                        f"{page.title!r}"
                    )
                else:
                    seen_titles[page.title] = name

        expected_pages = set(self.config["required_pages"] + self.config["noindex_pages"])
        actual_pages = set(self.parsed)
        for missing in sorted(expected_pages - actual_pages):
            self.error(f"page inventory: docs/{missing} is configured but missing")
        for unexpected in sorted(actual_pages - expected_pages):
            self.error(
                f"page inventory: docs/{unexpected} is not listed in harness/config/site.json"
            )

        self.check_stylesheet()
        self.check_javascript()
        self.check_metadata_files()
        self.check_images()
        self.check_homepage_extras()

        return not self.errors

    def report(self) -> dict:
        return {
            "generated_at": datetime.now(timezone.utc).replace(microsecond=0).isoformat().replace("+00:00", "Z"),
            "root": self.config["publish_dir"],
            "domain": self.config["domain"],
            "pages_checked": len(self.parsed),
            "errors": self.errors,
            "warnings": self.warnings,
            "passed": not self.errors,
        }

    def summary(self) -> str:
        lines = [
            f"Site check: {len(self.parsed)} page(s) in docs/",
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
        if not self.errors:
            lines.append("")
            lines.append("RESULT: PASS")
        else:
            lines.append("")
            lines.append("RESULT: FAIL")
        return "\n".join(lines)


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description="Validate the Gila Brobygger website.")
    parser.add_argument("--report", type=Path, help="Write a JSON report to this path.")
    parser.add_argument("--quiet", action="store_true", help="Only print errors and the result.")
    args = parser.parse_args(argv)

    config = load_config()
    checker = SiteChecker(config)
    passed = checker.run()
    report = checker.report()

    if args.report:
        args.report.parent.mkdir(parents=True, exist_ok=True)
        args.report.write_text(json.dumps(report, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")

    if args.quiet and passed:
        print(f"PASS: {len(checker.parsed)} pages, {len(checker.warnings)} warning(s)")
    else:
        print(checker.summary())

    return 0 if passed else 1


if __name__ == "__main__":
    sys.exit(main())
