# SEO

## 1. Goals

- Be findable for Danish searches about interpreting, translation, mentoring and family support
  in the Kolding/Southern Denmark area, without keyword stuffing.
- Present accurate titles and descriptions for every page.
- Keep the site technically clean: canonical URLs, sitemap, robots, fast static pages, no duplicate
  content, no broken links.
- Never use SEO tactics that require invented claims, fake locations or misleading markup.

## 2. Technical baseline

| Item | Implementation |
|---|---|
| Domain | `https://gila-brobygger.dk` |
| Canonical host | Non-www, HTTPS |
| Canonical tag | Absolute URL on every indexable page |
| `robots.txt` | Allows crawling, points to the sitemap |
| `sitemap.xml` | Lists all indexable pages with `lastmod` |
| 404 page | `noindex`, helpful links |
| Language | `<html lang="da">` |
| Open Graph | `og:type`, `og:locale`, `og:site_name`, `og:title`, `og:description`, `og:url`, `og:image` |
| Structured data | Minimal `Organization` JSON-LD on the homepage |
| Rendering | Fully static HTML; no JavaScript required for content |
| Mobile | Responsive, viewport meta, tap targets ≥ 44 px |
| Speed | One CSS file, one JS file, one optimised image, system fonts |
| Duplicate content | None; each service has one canonical page |

## 3. Page metadata

| Page | Title (≤ ~60 chars) | Meta description focus |
|---|---|---|
| `index.html` | Gila Brobygger \| Tolkning, oversættelse og støtte | All six services, contact |
| `om.html` | Om Gila Brobygger \| Gila Brobygger | Background, education, experience |
| `tjenester.html` | Tjenester \| Gila Brobygger | Overview of all services |
| `fremmedtolkning.html` | Fremmedtolkning \| Gila Brobygger | In-person interpreting at meetings/home visits |
| `telefontolkning.html` | Telefontolkning \| Gila Brobygger | Fast phone interpreting |
| `videotolkning.html` | Videotolkning \| Gila Brobygger | Online video interpreting |
| `skriftligoversaettelse.html` | Skriftlig oversættelse \| Gila Brobygger | Danish ↔ Tigrinya documents |
| `mentorforloeb.html` | Social Mentor \| Gila Brobygger | Mentoring, systems, integration |
| `familiekonsulent.html` | Familiekonsulent \| Gila Brobygger | Family support and guidance |
| `projekter.html` | Projekter og initiativer \| Gila Brobygger | Activity areas and future projects |
| `kontakt.html` | Kontakt \| Gila Brobygger | E-mail and phone |
| `privatliv.html` | Privatliv \| Gila Brobygger | No cookies, no tracking, no forms |
| `tilgaengelighed.html` | Tilgængelighed \| Gila Brobygger | Accessibility commitment |
| `404.html` | Siden blev ikke fundet \| Gila Brobygger | `noindex` |

Titles and descriptions are generated once in the page head and must stay unique.

## 4. Keywords (used naturally, never stuffed)

Primary themes:

- tolk, tolkning, fremmedtolkning, telefontolkning, videotolkning
- tigrinya, tigrinisk, oversættelse, skriftlig oversættelse
- familiekonsulent, familierådgivning, støtte til familier
- mentor, mentorforløb, social mentor, integration
- Kolding, Trekantområdet, Syddanmark *(only where factually relevant)*

Do not add city names, regions or "covering all of Denmark" unless the owner confirms the actual
coverage. Do not create separate city landing pages with near-duplicate content.

## 5. Structured data

Homepage JSON-LD (minimal, factual):

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Gila Brobygger",
  "url": "https://gila-brobygger.dk/",
  "logo": "https://gila-brobygger.dk/assets/images/gila-brobygger-logo.png",
  "email": "kontakt@gila-brobygger.dk",
  "telephone": "+45 31 84 70 40",
  "description": "Tolkning, skriftlig oversættelse, mentorforløb og familiekonsulentbistand.",
  "knowsLanguage": ["da", "ti"]
}
```

No `address`, `openingHours`, `priceRange`, `aggregateRating` or `review` until the owner supplies
and approves the data. No fake `LocalBusiness` markup.

## 6. Content rules for SEO

- One clear topic per page; each service page answers: what is it, when to use it, how it works,
  how to make contact.
- Descriptive headings; no keyword lists.
- Internal links use meaningful anchor text ("Læs om telefontolkning", not "klik her").
- Every page links back to Tjenester and Kontakt.
- No thin pages, no duplicated service copy across pages.
- Update `lastmod` in the sitemap when content changes materially.

## 7. Sitemap and robots

`docs/sitemap.xml` lists all indexable pages. `404.html` is excluded and marked `noindex`.

`docs/robots.txt`:

```
User-agent: *
Allow: /
Sitemap: https://gila-brobygger.dk/sitemap.xml
```

Do not block CSS or JS, because crawlers use them to render the page.

## 8. Post-deployment verification (owner-approved step)

Only after an approved deployment:

1. Confirm `https://gila-brobygger.dk/` returns 200 over HTTPS.
2. Confirm `/sitemap.xml` and `/robots.txt` return 200 with the right content.
3. Confirm `http://` redirects to `https://` and the canonical host is non-www.
4. Submit the sitemap in Google Search Console (owner account).
5. Check a missing URL returns the custom 404 page.
6. Validate structured data with a schema validator.
7. Spot-check titles/descriptions in search results after indexing.

None of these steps have been performed for this rebuild, because no deployment was made.

## 9. Anti-patterns

- No hidden text, cloaking, doorway pages or paid link schemes.
- No invented reviews, ratings, addresses or service areas.
- No auto-generated pages for every Danish city.
- No duplicate titles or descriptions.
- No indexing of engineering documents or archived material.

## 10. Related documents

- `docs/WEBSITE_SPEC.md` – page inventory
- `docs/TESTING.md` – how metadata is checked
- `docs/OWNER_REVIEW.md` – unconfirmed geography and service facts
