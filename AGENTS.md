# Purple Movement — Agent & Developer Guidelines

Welcome to the Purple Movement website repository. When working on this codebase, adhere strictly to the rules below:

---

## 🎨 Color System & Token Rules (STRICT)

**NEVER HARDCODE COLORS IN THIS REPOSITORY.**

### 1. Single Source of Truth
All color tokens are centralized in `src/app/globals.css` within `:root` (as `--pm-*` variables) and exposed via Tailwind CSS v4 `@theme inline` (as `--color-pm-*`).

### 2. Prohibited Patterns
- ❌ No raw hex codes (e.g., `#9333ea`, `#050511`, `#c084fc`, `#ffffff`)
- ❌ No raw `rgb()` or `rgba()` values in styles or JSX
- ❌ No arbitrary Tailwind hex bracket notation (e.g., `bg-[#020309]`, `text-[#ffffff]`, `border-[#8b5cf6]`)

### 3. Required Usage
- **In Tailwind utility classes**: Use `bg-pm-*`, `text-pm-*`, `border-pm-*`, `from-pm-*`, `via-pm-*`, `to-pm-*`, etc.
- **In SVG attributes & CSS styles**: Use `var(--pm-*)`.

### 4. Updating or Adding Colors
- If a color needs adjustment or a new design token is required, modify **ONLY** `src/app/globals.css`.
- Update both `:root` and `@theme inline`.
- Never create one-off ad-hoc colors directly in components.

---

## 📖 Design System Token Catalog (`src/app/globals.css`)

Tokens live in `:root` (`--pm-*`) and are exposed to Tailwind in `@theme`. Contrast ratios are measured on `--pm-navy-950`.

### Colour
The site is light by default. Add `.pm-dark` to a section (header, hero and footer use it) to switch every token below to the dark palette — the colour utilities are declared with `@theme inline`, so they follow the scope.

| CSS variable | Tailwind utility | Purpose |
| :--- | :--- | :--- |
| `--pm-bg` | `bg-pm-bg` | Page background (white; black in `.pm-dark`) |
| `--pm-surface-alt` / `--pm-surface` / `--pm-field` | `bg-pm-surface-alt` … | Alternate sections (soft lavender), cards, inputs |
| `--pm-line` / `--pm-line-strong` | `border-pm-line` … | Hairline rules / input borders (≥3:1) |
| `--pm-text` / `-secondary` / `-muted` | `text-pm-text` … | Body text, all ≥6:1 |
| `--pm-purple-600` / `-700` | `bg-pm-purple-600` … | Primary button fill / hover — always pair with `text-pm-on-accent` |
| `--pm-on-accent` | `text-pm-on-accent` | White text on purple fills |
| `--pm-accent` / `--pm-accent-strong` | `text-pm-accent` … | Accent text and rules / links, highlights, focus ring |
| `--pm-tint` | `bg-pm-tint` | Purple-tinted panels (Rise Together, outcomes) |
| `--pm-red` / `--pm-blue` | `text-pm-red` … | "Why Purple": youth + experience |
| `--pm-success` / `--pm-error` / `--pm-whatsapp` | `text-pm-success` … | Status colours |

### Type, spacing, radii, motion
- Two typefaces only: Montserrat (`font-display`) and Inter (`font-sans`), self-hosted in `src/app/fonts/` (OFL).
- Type scale: `text-base` (16px, minimum for body and interactive text), `text-lg`, `text-xl`, `text-2xl`, `text-display-sm|md|lg` (fluid headings). `text-sm` (14px) is for eyebrow labels and badges only.
- Spacing: 4px base (`--spacing: 0.25rem`); use the Tailwind scale, never arbitrary pixel values.
- Radii: `rounded-sm` 4px, `rounded-md` 8px, `rounded-lg` 16px. Shadow: `shadow-dialog` only.
- Motion: `--pm-duration-fast|base`, `ease-pm`. Everything is disabled under `prefers-reduced-motion`.
- Layout helpers: `.pm-container` (gutters 16/32/48px), `.pm-eyebrow`, `.pm-prose`, `.pm-stretched-link`.

---

## ♿ Accessibility rules
- One `<h1>` per page; headings never skip levels.
- Every control is ≥44×44px (`buttonClass()` gives 48px). Visible labels on every field (`components/join/Field.tsx`).
- No information only on hover or only through colour. Icon-only controls need an accessible name.
- External links use `ExternalLink` (new tab, `noopener noreferrer`, announced).
- `npm test` runs axe-core on every page; keep it green.

## 🗂️ Content
All copy that changes — activities, legacy, impact, FAQ, join paths, site facts — lives in `src/content/`. Only publish facts with a source; unknown values are `null` and render as "to be announced". Never add placeholder numbers to `impactMetrics`.

## 🔒 Data handling
- `/api/join`, `/api/feedback`, `/api/questions` write to Supabase with the service-role key (server-only).
- Never log request bodies or Supabase error details (they echo personal data); use `logDbError`.
- No analytics are installed. If you add them, never send form contents, names, emails, phone numbers or free text.

---

## 🛠️ Tech stack & commands
- Next.js 16 (App Router, Turbopack), React 19, Tailwind CSS 4, TypeScript, Supabase.
- `bun install` (bun.lock is the source of truth).
- `npm run lint` (oxlint) · `npm run typecheck` · `npm test` (Vitest + Testing Library + axe-core) · `npm run build`.
- Run `npm run check` before concluding any task.
