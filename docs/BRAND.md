# Brand – Gila Brobygger

## 1. Brand idea

**"Bro mellem mennesker, sprog og systemer."**

Gila Brobygger is a bridge: between Danish and Tigrinya, between families and authorities, between
what a document says and what a person understands. The brand should feel **calm, human, competent
and trustworthy** – never clinical, bureaucratic or sales-driven.

## 2. Personality

| We are | We are not |
|---|---|
| Warm and respectful | Sentimental or patronising |
| Clear and precise | Cold or legalistic |
| Experienced and practical | Boastful or vague |
| Culturally aware | Exoticising or stereotyping |
| Calm and reassuring | Urgent or pushy |

## 3. Visual identity

### Palette

Defined once in `docs/assets/css/styles.css` as CSS custom properties in `:root`. Every colour,
spacing value, radius, shadow and motion token lives there; components reference tokens, never
raw hex values.

#### Brand greens

| Token | Hex | Use |
|---|---|---|
| `--green-950` | `#0e2a1c` | Footer background |
| `--green-900` | `#153d28` | Headings, dark surfaces, approach panel |
| `--green-800` | `#1f5536` | Button hover, gradients, chatbot header |
| `--green-700` | `#246b45` | Primary brand colour, links, primary buttons |
| `--green-600` | `#32865a` | Accents, check markers, focus rings |
| `--green-500` | `#4fa073` | Hover accents |
| `--green-200` | `#cfe3d4` | Borders, hover outlines |
| `--green-100` | `#eaf3ec` | Soft backgrounds, icon tiles |
| `--green-050` | `#f5f9f5` | Section backgrounds |

#### Accent (warm, used sparingly)

| Token | Hex | Use |
|---|---|---|
| `--accent` | `#b9770e` | Focus ring, emphasis, accent buttons |
| `--accent-dark` | `#8a5708` | Accent hover |
| `--accent-soft` | `#f6ecd9` | Accent-tinted notice backgrounds |

#### Neutrals

| Token | Hex | Use |
|---|---|---|
| `--ink` | `#1f2d26` | Body text |
| `--ink-soft` | `#3a4a41` | Secondary body text |
| `--muted` | `#5f6f65` | Muted text, card descriptions |
| `--muted-soft` | `#8a9a90` | Fine print |
| `--line` | `#d9e5db` | Dividers and card borders |
| `--line-soft` | `#e8efe9` | Subtle dividers |
| `--white` | `#ffffff` | Page background, cards |
| `--surface` / `--surface-soft` / `--surface-tint` | `#ffffff` / `#f7faf7` / `#eef5ef` | Layered surfaces |

#### Typography, spacing, radius, shadows, motion

- Font stack: system fonts only (`--font-body` / `--font-display`), no downloads.
- Type scale: `--text-xs` … `--text-xl`; line heights `--leading-tight/snug/normal/relaxed`;
  letter spacing `--tracking-tight/normal/wide`.
- Spacing scale: `--space-1` … `--space-24` on a 4 px base.
- Radius: `--radius-xs` (6) … `--radius-xl` (32), plus `--radius-pill`.
- Shadows: `--shadow-xs` … `--shadow-xl`.
- Motion: `--ease-out`, `--dur-fast/base/slow`; all disabled under `prefers-reduced-motion`.

Contrast targets: body text on white ≥ 7:1, muted text ≥ 4.5:1, white on `--green-700` ≥ 4.5:1.
Do not use colour alone to convey meaning. No new primary colour may be introduced without owner
approval (see `docs/INVARIANTS.md`).

### Typography

- System font stack only: `system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
  "Helvetica Neue", Arial, sans-serif`.
- No web fonts, no external font requests. This is a privacy and performance decision, not an
  aesthetic compromise.
- Headings: 800 weight, tight tracking, balanced wrapping.
- Body: 1rem / 1.7 line height; leads at 1.14rem / 1.8.
- Maximum readable line length around 66–70 characters (`.lead`, `.prose`).

### Logo and marks

- `docs/assets/images/gila-brobygger-logo.png` is the owner-supplied logo (244×92, white
  background, navy lettering). It is kept as the official mark for documents and e-mail.
- The website header uses a **typographic lockup** – a rounded green "G" tile plus
  "Gila **Brobygger**" – because the supplied raster logo is small, has a solid white background
  and does not remain legible at header height.
- The header lockup is not a replacement trademark. Whether to display the official logo in the
  site header is an open owner decision (see `docs/OWNER_REVIEW.md`).
- Do not redraw, recolour or stretch the official logo. Do not place it on a busy background.

### Imagery

- One authentic portrait: `docs/assets/images/gila-portrait.jpg` (675×900, ~65 kB, EXIF removed).
- Portrait is presented in a soft rounded frame with a pale green organic shape behind it.
- No stock photos, no AI-generated people, no generic "handshake" imagery.
- The original full-resolution photo is archived and **must not** be published: it contains
  EXIF/GPS metadata.

### Shape and motion

- Rounded corners: 12 px (small), 20 px (cards), 28 px (panels), pill buttons.
- Soft shadows, generous white space, subtle lift on hover (≤ 4 px).
- Motion is short (≈ 180 ms) and fully disabled under `prefers-reduced-motion: reduce`.

## 4. Voice and tone

### Principles

1. **Plain Danish.** Short sentences. Explain a term the first time it is used.
2. **Respectful.** Describe situations, not deficiencies. Never imply a family is a problem.
3. **Concrete.** Say what happens, what the person can do next and how to make contact.
4. **Calm.** No urgency, no exclamation marks in body copy, no sales pressure.
5. **Honest.** If something is unknown, say so or leave it out.

### Preferred wording

| Use | Avoid |
|---|---|
| "Skriv eller ring" | "Kontakt os nu – begrænset antal pladser" |
| "Vi aftaler nærmere" | "Book med det samme" |
| "Familier" / "den enkelte" | "problemfamilier", "indvandrere" as a label |
| "Tigrinya" | "tigrinisk" / "tyrkisk" (incorrect) |
| "Tolkning" | "oversættelse" when speaking is meant |
| "Fortroligt" | "100 % garanteret fortroligt" |

### Examples

- Good: "Fortæl kort, hvad du har brug for hjælp til, så aftaler vi nærmere."
- Good: "Skriv ikke CPR-nummer eller helseoplysninger i en første henvendelse."
- Avoid: "Vi er eksperter i alle typer sager og garanterer et godt resultat."

## 5. Naming and capitalisation

- Always **Gila Brobygger** – two words, both capitalised.
- Service names on the site: *Fremmedtolkning*, *Telefontolkning*, *Videotolkning*,
  *Skriftlig oversættelse*, *Social Mentor*, *Familiekonsulent*.
- "Social Mentor" keeps its capitalisation as a service name; "mentorforløb" is lowercase in
  running text.
- The domain is always lowercase: `gila-brobygger.dk`.

## 6. Accessibility as brand behaviour

Accessibility is part of how the brand feels: calm, clear, unhurried.

- Visible focus ring in amber, never removed.
- Skip link as the first focusable element.
- Large tap targets (≥ 44–48 px).
- No autoplaying media, no carousels, no motion that cannot be stopped.
- Text remains readable at 200 % zoom and with increased line spacing.

## 7. Brand guardrails

Do not, without owner approval:

- change the name, logo, palette, typography or tone;
- add slogans, superlatives or claims of being "the best", "leading" or "certified";
- add prices, discounts, campaigns or urgency;
- add stock photography, testimonials, partner logos or social proof;
- introduce a new colour as the primary brand colour.

## 8. Related documents

- `docs/WEBSITE_SPEC.md` – components and page structure
- `docs/ACCESSIBILITY.md` – accessibility commitments
- `docs/OWNER_REVIEW.md` – open logo and identity decisions
