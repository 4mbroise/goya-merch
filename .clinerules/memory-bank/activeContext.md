# Active Context

## Current Work Focus
Steps 1-5 are **complete**. The project is now entering **Step 6 (Dockerization)** — packaging the backend and storefront as Docker containers, writing `docker-compose.yml`, and testing the full stack in containers.

## Recent Changes

### Step 5 — Frontend Customization (completed this session)
The Medusa DTC Next.js storefront was customised for GOYA's visual identity:
- **Light theme base confirmed**: `body` is `bg-white text-grey-90` (not dark) — deliberate choice because black t-shirts on transparent PNGs would disappear on a dark site; white surfaces give maximum product contrast.
- **Tailwind `goya` palette tidied**: old tokens (`surface`, `accent`, `accent-muted`, `fg: #E8E8E8`, `fg-subtle: #888888`) replaced with a tight set:
  - `ink: #0A0A0A` — Hero background + black accent on light pages
  - `bg: #0A0A0A` — Hero background (same value, kept for backwards compat)
  - `border: #222222` — Hero separator
  - `fg: #F2F2F2` — Hero text (near-white, slightly soft)
  - `fg-subtle: #A0A0A0` — Hero subtitle
- **Hero reworked**: dark `#0A0A0A` background, HTML `<h1>GOYA</h1>` replaced with `<Image src="/Typo-white.svg">` (solid filled wordmark in `#F2F2F2`), button uses new `goya-fg`/`goya-ink` tokens.
- **Nav / Footer / Checkout wordmark**: switched from outline `Typo-inline.svg` to solid filled `Typo.svg` (dark `#1d1d1b`, visible on white backgrounds).
- **New assets created**:
  - `public/Typo-white.svg` — white (#F2F2F2) filled wordmark for the Hero
  - `src/app/icon.svg` — filled band logo (from `Logo-full.svg`) as site favicon
  - `public/favicon.ico` removed (superseded)
- **Root metadata added**: global `<title>GOYA — Official Merch</title>`, meta description, icons reference.
- **Verified**: `next build` completed with zero errors; all routes compile cleanly.

### Prior Steps (Steps 1-4)
- Stripe integration wired with test keys
- Resend notification module built with React Email templates (order confirmation, shipping notification)
- PDF invoice generator built with @react-pdf/renderer (French-compliant)
- GitHub storage module for invoice persistence in `4mbroise/goya-merch-invoices` repo
- Invoice DB table for sequential numbering and audit trail
- Catalog seeded via scripts (`seed-goya-catalog.ts`, `seed-goya-stock.ts`)
- **Fix 2 — Price display fixed**: Removed erroneous `/100` division from `convertToLocale` (storefront) and both `formatMoney` helpers (backend). Seed prices converted from cents to major units. See `Plan/fixes-log.md` for details.

## Next Steps

### Step 6 — Dockerization (next)
- [ ] Write `Dockerfile` for Medusa backend (Node 20 Alpine, multi-stage build)
- [ ] Write `Dockerfile` for Next.js storefront (`output: standalone`, multi-stage)
- [ ] Write `docker-compose.yml` (backend + frontend + local PostgreSQL for dev)
- [ ] Add `.dockerignore` files for both services
- [ ] Test full stack in containers
- [ ] Verify a complete purchase flow in the containerised stack

### Step 7 — Coolify deployment
- [ ] Install Coolify on VPS
- [ ] Create PostgreSQL database resource
- [ ] Deploy backend and frontend containers
- [ ] Configure environment variables and domains

### Step 8 — Pre-launch checklist
- [ ] Switch Stripe to live keys
- [ ] Test full purchase flow with a real card
- [ ] Add French legal pages (CGV, Mentions Légales, Politique de Confidentialité)
- [ ] Mobile testing
- [ ] Set up custom domain

## Active Decisions and Considerations
- **Money handling**: All amounts stored and displayed in major units (e.g., `30` for €30). No division by 100. Medusa's API and pricing service output amounts in major units. Seed data must match.
- **Light theme** (not dark): Black t-shirts on transparent PNGs forced the decision — a dark site would make the garments invisible. White product cards (`bg-ui-bg-subtle` light grey) provide contrast. The Hero is the only dark surface.
- **Logo assets**: `Typo.svg` (filled wordmark) and `Logo-full.svg` (filled mark) placed in `public/` and `src/app/icon.svg`. Final band art may replace these later; the file paths are designed for one-file swaps.
- **Domain name**: Not yet purchased.
- **Stripe keys**: Still in test mode — must switch to live before launch.
- **Resend domain**: Not yet verified — using sandbox address (`onboarding@resend.dev`).

## Important Patterns and Preferences
- Light base (`bg-white text-grey-90`), dark Hero only (`bg-goya-bg`, `text-goya-fg`);
- `goya` Tailwind tokens used only in the Hero (`goya-bg`, `goya-border`, `goya-fg`, `goya-fg-subtle`, `goya-ink`);
- French locale formatting for all monetary displays;
- Invoice path pattern: `invoices/YYYY/MM/GOYA-MERCH-XXXX.pdf`;
- Seed scripts over manual admin UI entry for reproducible setup;
- `@react-pdf/renderer` must be dynamically `import()`-ed (it's ESM-only; see Fix 3 in `Plan/fixes-log.md`);
- Storefront dev on port **9001** (`next dev --turbopack -p 9001`), prod on port 3000;
- Backend dev on port **9000**.

## Learnings and Project Insights
- Medusa 2.0 uses module-based architecture — custom modules for invoice and resend
- Notification system uses `INotificationProvider` interface
- `.env.template` patterns: `DATABASE_URL`, `STRIPE_API_KEY`, `RESEND_API_KEY`, `INVOICE_GITHUB_TOKEN`, seller info variables
- **Git state**: only a single "Initial commit" exists; all application code + Step 5 uncommitted. First meaningful commit should come after Step 6.
- Monorepo managed with `npm` workspaces + Turborepo (despite `pnpm` overrides in root `package.json` — those work via npm)
- `darkMode: "class"` Tailwind option present but **unused** site-wide