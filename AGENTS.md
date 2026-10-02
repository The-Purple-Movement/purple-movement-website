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

### Brand & Accents
| CSS Variable | Tailwind Utility | Semantic Purpose |
| :--- | :--- | :--- |
| `--pm-primary` | `bg-pm-primary`, `text-pm-primary` | Primary Brand Purple (`#9333ea`) |
| `--pm-primary-hover` | `bg-pm-primary-hover` | Interactive hover state (`#a855f7`) |
| `--pm-accent` | `bg-pm-accent`, `text-pm-accent` | Vibrant accent & active state (`#c084fc`) |
| `--pm-light` | `bg-pm-light`, `text-pm-light` | Light lavender highlight (`#e9d5ff`) |
| `--pm-dark` | `bg-pm-dark`, `text-pm-dark` | Deep purple shade (`#581c87`) |
| `--pm-deep` | `bg-pm-deep`, `text-pm-deep` | Atmospheric dark purple (`#3b0764`) |
| `--pm-glow` | `var(--pm-glow)` | Standard atmospheric ambient glow |
| `--pm-glow-strong` | `var(--pm-glow-strong)` | Intense neon glow / bloom |

### Surfaces & Backgrounds
| CSS Variable | Tailwind Utility | Semantic Purpose |
| :--- | :--- | :--- |
| `--pm-bg` | `bg-pm-bg` | Absolute canvas black (`#000000`) |
| `--pm-bg-dark` | `bg-pm-bg-dark` | Deep dark slate (`#050511`) |
| `--pm-bg-subtle` | `bg-pm-bg-subtle` | Subtle slate dark (`#0f172a`) |
| `--pm-bg-gradient-from` | `from-pm-bg-gradient-from` | Ambient background gradient start |
| `--pm-bg-gradient-via` | `via-pm-bg-gradient-via` | Ambient background gradient center |
| `--pm-bg-gradient-to` | `to-pm-bg-gradient-to` | Ambient background gradient end |
| `--pm-card` | `bg-pm-card` | Translucent glass surface |
| `--pm-card-hover` | `bg-pm-card-hover` | Glass surface on hover |
| `--pm-card-border` | `border-pm-card-border` | Glass container subtle border |
| `--pm-border` | `border-pm-border` | Purple brand border |
| `--pm-border-hover` | `border-pm-border-hover` | Highlighted brand border |

### Typography
| CSS Variable | Tailwind Utility | Semantic Purpose |
| :--- | :--- | :--- |
| `--pm-text-primary` | `text-pm-text-primary` | High-contrast headings & titles (`#ffffff`) |
| `--pm-text-secondary` | `text-pm-text-secondary` | Secondary text & descriptions (`#d4d4d8`) |
| `--pm-text-muted` | `text-pm-text-muted` | Badges, tags & metadata (`#a1a1aa`) |

### Timeline & Pyramid Elements
| CSS Variable | Tailwind Utility / SVG | Semantic Purpose |
| :--- | :--- | :--- |
| `--pm-timeline-track` | `bg-pm-timeline-track`, `var(--pm-timeline-track)` | Vertical connector line |
| `--pm-timeline-node` | `bg-pm-timeline-node`, `var(--pm-timeline-node)` | Node dot on timeline |
| `--pm-timeline-node-active` | `bg-pm-timeline-node-active` | Active/hovered node dot |
| `--pm-icon-box-bg` | `bg-pm-icon-box-bg` | Glassmorphic square icon card |
| `--pm-icon-box-border` | `border-pm-icon-box-border` | Icon card border |
| `--pm-icon-box-hover` | `var(--pm-icon-box-hover)` | Icon box hover highlight |
| `--pm-pyramid-rim` | `var(--pm-pyramid-rim)` | Top rim neon stroke |
| `--pm-pyramid-rim-bright` | `var(--pm-pyramid-rim-bright)` | High-intensity horizontal flare |
| `--pm-pyramid-orbit` | `var(--pm-pyramid-orbit)` | Concentric orbit line |
| `--pm-pyramid-glow` | `var(--pm-pyramid-glow)` | Neon glow for pyramid apex |

### Pyramid Tiers
| CSS Variable | Tailwind Utility | Semantic Purpose |
| :--- | :--- | :--- |
| `--pm-tier1-start`, `--pm-tier1-end` | `from-pm-tier1-start`, `to-pm-tier1-end` | Tier 1 gradient (Light Lavender) |
| `--pm-tier1-text` | `text-pm-tier1-text` | Tier 1 high-contrast text |
| `--pm-tier2-start`, `--pm-tier2-end` | `from-pm-tier2-start`, `to-pm-tier2-end` | Tier 2 gradient (Medium Purple) |
| `--pm-tier2-text` | `text-pm-tier2-text` | Tier 2 high-contrast text |
| `--pm-tier3-start`, `--pm-tier3-end` | `from-pm-tier3-start`, `to-pm-tier3-end` | Tier 3 gradient (Deep Violet) |
| `--pm-tier3-text` | `text-pm-tier3-text` | Tier 3 high-contrast text |

### Status, UI Feedback & Story Elements
| CSS Variable | Tailwind Utility | Semantic Purpose |
| :--- | :--- | :--- |
| `--pm-success` | `text-pm-success`, `bg-pm-success` | Success feedback (`#10b981`) |
| `--pm-error` | `text-pm-error`, `border-pm-error` | Error feedback (`#ef4444`) |
| `--pm-whatsapp` | `bg-pm-whatsapp` | WhatsApp button color |
| `--pm-whatsapp-hover` | `bg-pm-whatsapp-hover` | WhatsApp hover state |
| `--pm-red` | `text-pm-red`, `bg-pm-red` | Red youth marker (`#f43f5e`) |
| `--pm-blue` | `text-pm-blue`, `bg-pm-blue` | Blue professional marker (`#3b82f6`) |
| `--pm-story-card-bg` | `bg-pm-story-card-bg` | Why Purple story pill card surface |
| `--pm-story-card-border` | `border-pm-story-card-border` | Story card subtle border |
| `--pm-story-card-hover` | `bg-pm-story-card-hover` | Story card hover state |
| `--pm-scrollbar-track` | `var(--pm-scrollbar-track)` | Scrollbar track background |
| `--pm-scrollbar-thumb` | `var(--pm-scrollbar-thumb)` | Scrollbar thumb |

### Flagship Events — Teal Accent (AI+Compassion)
| CSS Variable | Tailwind Utility | Semantic Purpose |
| :--- | :--- | :--- |
| `--pm-teal` | `bg-pm-teal`, `text-pm-teal` | Teal accent — AI+Compassion flagship (`#0d9488`) |
| `--pm-teal-light` | `text-pm-teal-light` | Teal light — AI+Compassion highlights (`#2dd4bf`) |
| `--pm-teal-dark` | `bg-pm-teal-dark` | Teal dark — AI+Compassion deep tone (`#0f766e`) |
| `--pm-teal-glow` | `var(--pm-teal-glow)` | Teal glow shadow for AI+Compassion cards |

---

## 🏛️ Layout Architecture Conventions

### 1. FAQ & Contact Row (`src/app/page.tsx`)
- FAQ and Contact ("Any Questions?") are rendered side-by-side in a 12-column grid (`grid-cols-1 lg:grid-cols-12`).
- **Left Column (`lg:col-span-7`)**: Accordion FAQ list with expandable items powered by Framer Motion `AnimatePresence`.
- **Right Column (`lg:col-span-5 lg:sticky lg:top-28`)**: Interactive support card with 3D question mark visual, inquiry form, loading/feedback states, and sticky desktop positioning.
- Both components preserve `id="faq"` and `id="contact"` with `scroll-mt-28` for navbar scroll spy and direct anchor links.

### 2. Footer Shell (`src/app/components/layout/Footer.tsx`)
- Distinctive curved tray container with rounded top-left and top-right borders (`rounded-t-3xl sm:rounded-t-[40px] md:rounded-t-[48px]`).
- Stroked with `border-t border-pm-card-border/80` and subtle neon rim flare on top edge.
- Background uses `bg-pm-bg-dark` over the pure black canvas (`bg-pm-bg`).

### 3. Smooth Momentum Scrolling (`Lenis`)
- Website-wide smooth scrolling is powered by `lenis` via `src/app/components/providers/SmoothScroll.tsx` mounted in `src/app/layout.tsx`.
- Programmatic scroll in `Navbar.tsx` and `Footer.tsx` uses `lenis.scrollTo(element, { offset: -80 })` with graceful fallback to `window.scrollTo`.
- Respects `prefers-reduced-motion: reduce` for accessibility compliance.

---

## 🛠️ Tech Stack & Conventions
- **Production URL**: `https://purple-movement.com/`
- **Framework**: Next.js 16 (Turbopack, App Router, React 19)
- **Styling**: Tailwind CSS v4 (`@theme inline`, custom properties in `src/app/globals.css`)
- **Animation & Motion**: Framer Motion & Lenis
- **Package Manager**: Bun (`bun run dev`, `bun run build`, `bun add`)
- **Linter**: `oxlint` (`bun run lint`)
- **Type Checking**: Run `npx tsc --noEmit` before concluding any task.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
