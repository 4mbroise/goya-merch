# Progress

## Current Status
Steps 1-5 are **complete**. Step 6 (Dockerization) is **next**. Steps 7-8 are **pending**.

## What Works
- **Step 1 — Local Medusa Setup:** Backend scaffolded with Medusa 2.0, PostgreSQL running, admin dashboard accessible at `localhost:9000/app`, admin user created
- **Step 2 — Catalog Configuration:** Products, variants, collections created via seed scripts (`seed-goya-catalog.ts`, `seed-goya-stock.ts`). France (EUR) configured as primary region. Flat-rate shipping option set up. Product images uploaded.
- **Step 3 — Stripe Integration:** `@medusajs/payment-stripe` installed and registered in `medusa-config.ts`. Test keys configured. Stripe webhook endpoint set up.
- **Step 4 — Transactional Emails:**
  - Resend notification module built with `INotificationProvider` interface
  - Order confirmation email template (react-email, includes 14-day withdrawal notice)
  - Shipping notification email template with "Suivre mon colis" button
  - PDF invoice template (French-compliant with TVA/SIRET, @react-pdf/renderer)
  - GitHub storage module for invoices (`4mbroise/goya-merch-invoices`)
  - Invoice DB table for sequential numbering and audit trail
  - Subscribers wired for `order.placed` and `order.shipment_created` events
- **Step 5 — Frontend Customization:**
  - Light theme base confirmed (`bg-white text-grey-90`) — deliberately NOT dark so black t-shirts on transparent PNGs have maximum product contrast on white product cards
  - Dark Hero only (`bg-goya-bg` #0A0A0A) with white #F2F2F2 wordmark (`Typo-white.svg`), "Official Merch" subtitle, "Shop Now" button using `goya-fg`/`goya-ink` tokens
  - Tailwind `goya` palette tidied to a tight set (ink, bg, border, fg, fg-subtle); unused tokens (surface, accent, accent-muted) removed
  - Nav / Footer / Checkout wordmark switched from outline `Typo-inline.svg` to solid filled `Typo.svg`
  - Site favicon set to filled band logo (`src/app/icon.svg` from `Logo-full.svg`); old `favicon.ico` removed
  - Root-level metadata added (title, description, icons)
  - `next build` passes with zero errors; all routes (home, products, categories, collections, checkout, cart, account) compile cleanly

## What's Left to Build

### Step 6 — Dockerization (next)
- [ ] Write `Dockerfile` for Medusa backend (Node 20 Alpine, multi-stage)
- [ ] Write `Dockerfile` for Next.js storefront (`output: standalone`, multi-stage)
- [ ] Write `docker-compose.yml` (backend + frontend + PostgreSQL for dev)
- [ ] Add `.dockerignore` files for both services
- [ ] Test full stack in containers
- [ ] Verify purchase flow end-to-end in containerised stack

### Step 7 — Coolify Deployment
- [ ] Install Coolify on VPS
- [ ] Create PostgreSQL database resource
- [ ] Deploy backend and frontend containers
- [ ] Configure environment variables and domains

### Step 8 — Pre-Launch Checklist
- [ ] Switch Stripe keys from test to live (`sk_live_…`, `pk_live_…`)
- [ ] Update Stripe webhook endpoint to production URL
- [ ] Complete a full purchase with a real card
- [ ] Confirm order confirmation email is received
- [ ] Confirm shipping email sends correctly
- [ ] Verify PDF invoice is generated and stored
- [ ] Check all meta tags (`<title>`, `description`, `og:image`) on key pages
- [ ] Add French legal pages: CGV, Mentions Légales, Politique de Confidentialité
- [ ] Test on mobile (checkout especially)
- [ ] Purchase and configure custom domain

## Known Issues
- **Resend:** Domain not yet verified — using sandbox address (`onboarding@resend.dev`). Emails may land in spam.
- **Stripe keys:** Still in test mode. Must switch to live before launch.
- **Logo assets:** Pending from the band. `Typo.svg` (filled wordmark) and `Logo-full.svg` (filled mark) are placeholders — swap paths in `layout.tsx`, `nav`, `footer`, `checkout`, `hero`, and `icon.svg` once final art is delivered.
- **Domain name:** Not yet purchased.
- **Git state:** Only "Initial commit" exists. All application code + Step 5 work is untracked.

## Evolution of Project Decisions
- **Stripe Invoicing rejected** in favor of internal PDF generation via @react-pdf/renderer — gives full control over invoice layout and French compliance
- **Seed scripts** chosen over manual admin UI for reproducible catalog setup
- **No Redis** — deemed unnecessary for ~5 products scale
- **npm workspaces + Turborepo** used instead of pnpm workspaces (Medusa's default) — adapted via overrides in `package.json`
- **Light theme over dark** — black t-shirts on transparent PNGs forced the decision. A dark site would make the garments invisible. White product cards provide contrast. Only the Hero is dark.
- **@react-pdf/renderer dynamic import** — since the package is ESM-only and the backend is CJS, all imports must use async `import()` (documented in `techContext.md` and proven by Fix 3 in `fixes-log.md`).