#!/usr/bin/env python3
from pathlib import Path
import re
import sys

ROOT = Path(__file__).resolve().parents[2]
PAGES = ["index.html", "familiekonsulent.html", "fremmedtolkning.html", "telefontolkning.html", "videotolkning.html", "skriftligoversaettelse.html", "mentorforloeb.html"]
EMAIL = "kontakt@gila-brobygger.dk"
errors = []

for page in PAGES:
    path = ROOT / page
    if not path.exists():
        errors.append(f"Missing required page: {page}")
        continue
    html = path.read_text(encoding="utf-8")
    if '<html lang="da">' not in html:
        errors.append(f"{page}: expected Danish document language")
    if "<title>" not in html or "</title>" not in html:
        errors.append(f"{page}: missing title")
    if 'href="assets/css/styles.css"' not in html:
        errors.append(f"{page}: shared stylesheet not linked")
    if 'href="mailto:' + EMAIL in html:
        pass
    elif EMAIL in html:
        errors.append(f"{page}: email present but no mailto link found")
    else:
        errors.append(f"{page}: supplied contact email not found")
    for target in re.findall(r'href="([^"]+)"', html):
        if target.startswith(("mailto:", "https://", "http://", "#")):
            continue
        local = (ROOT / target.split("#", 1)[0])
        if target and not local.exists():
            errors.append(f"{page}: broken local link target: {target}")

if errors:
    print("SITE CHECK FAILED")
    for error in errors:
        print(f"- {error}")
    sys.exit(1)

print("SITE CHECK PASSED")
print(f"Checked pages: {', '.join(PAGES)}")
print(f"Contact address referenced: {EMAIL}")
