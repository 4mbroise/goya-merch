# System Patterns

## Architecture Overview
The project is a monorepo managed with **npm workspaces + Turborepo**. It contains two apps under `apps/`:
- **Backend (`apps/backend/`)**: Medusa.js 2.0 application (Node.js + TypeScript, port 9000)
- **Storefront (`apps/storefront/`)**: Next.js 15 DTC starter (port 8000 dev, port 3000 production)

## Medusa 2.0 Modular Architecture
Medusa 2.0 uses a module-based architecture. Each capability (cart, product, customer, payment, notification, etc.) is a standalone module. The project has two custom modules:

### 1. Invoice Module (`src/modules/invoice/`)
- **Purpose**: Track invoice numbers and provide audit trail
- **Key file**: `models/invoice.ts` — Invoice DB model storing sequential number, order ID, amount, date
- **Migration**: `migrations/Migration20260620133630.ts` creates the invoice table
- **Sequencing**: Each invoice gets an auto-incrementing number (GOYA-MERCH-XXXX) persisted in DB
- **Registration**: Loaded in `medusa-config.ts` via `resolve: "./src/modules/invoice"`

### 2. Resend Notification Module (`src/modules/resend/`)
- **Purpose**: Transactional emails + PDF invoices
- **Key files**:
  - `index.ts` — Registers as `INotificationProvider`, exports `formatMoney`, handles event processing
  - `github-storage.ts` — Stores PDF invoices in `4mbroise/goya-merch-invoices` repo
  - `templates/invoice-pdf.tsx` — French-compliant PDF invoice template (@react-pdf/renderer)
  - `templates/order-confirmation.tsx` — Post-purchase email template (react-email)
  - `templates/shipping-notification.tsx` — Shipping email template with tracking button
- **Registration**: Loaded in `medusa-config.ts` under `@medusajs/medusa/notification` with `resolve: "./src/modules/resend"`

## Subscribers (Event Handlers)
Subscribers listen to Medusa events and trigger notifications:
- **`order-placed.ts`** — On `order.placed` event: generates PDF invoice, stores in GitHub, sends order confirmation email with invoice attachment
- **`order-shipment-created.ts`** — On `order.shipment_created` event: sends shipping notification email with tracking link
- **`product-updated.ts`** — On `product.updated` event: placeholder for future cache invalidation

## Configuration Pattern (`medusa-config.ts`)
The backend config wires together:
1. Database connection (`DATABASE_URL`)
2. CORS settings for store, admin, auth
3. JWT + cookie secrets
4. Module registrations:
   - **Invoice** — custom module
   - **Payment** — Stripe provider (`@medusajs/medusa/payment-stripe`)
   - **Notification** — Resend custom module

## Storefront Theme & Branding

The storefront uses a **light base with a dark Hero only** approach:

- **Body**: `bg-white text-grey-90` (light)
- **Hero**: `bg-goya-bg` (#0A0A0A) with `text-goya-fg` (#F2F2F2) wordmark — the only dark surface on the site
- **Product images**: rendered on `bg-ui-bg-subtle` (light grey) cards — transparent PNG black t-shirts need white/light backgrounds for visual contrast
- **Wordmark**: `Typo.svg` (solid filled, dark `#1d1d1b`) on light surfaces (nav, footer, checkout); `Typo-white.svg` (solid filled, `#F2F2F2`) on the dark Hero
- **Favicon**: `src/app/icon.svg` — filled band logo (Next.js App Router auto-serves it)
- **Tailwind `goya` tokens**: defined in `tailwind.config.js` but only used by the Hero component
  - `ink: #0A0A0A`, `bg: #0A0A0A`, `border: #222222`, `fg: #F2F2F2`, `fg-subtle: #A0A0A0`
- **`darkMode: "class"`**: present in Tailwind config but **unused** site-wide (dark site would hide black merch)

## Money Handling Convention
- **Storage**: All monetary amounts stored as integers in **major units** (e.g., €30.00 stored as `30`). This matches Medusa's API output convention.
- **Display**: Display helpers pass the value directly to `Intl.NumberFormat` — **no division by 100**.
- **Stripe charges**: Sent in cents (Stripe API expects minor units for EUR). Medusa's `@medusajs/payment-stripe` provider handles the conversion internally.
- **Seed data**: Prices must use major units (e.g. `amount: 30` for €30), not cents.
- **Important**: Do **not** add `/100` division to display helpers. Medusa 2.x outputs major units. A previous incorrect fix that added `/100` was reverted (see `Plan/fixes-log.md` Fix 2).

## Seed Script Pattern
Reproducible setup via seed scripts:
- `src/scripts/seed-goya-catalog.ts` — Creates products, variants, collections
- `src/scripts/seed-goya-stock.ts` — Sets stock quantities per variant

Shipping is manual:
- Medusa records the order
- Band prints and sends labels themselves
- No third-party fulfillment integration

## Deployment Architecture
```
┌─────────────────────┐     ┌─────────────────────┐
│  backend (Medusa)   │     │  frontend (Next.js)  │
│  Node.js + TS       │◄────│  Next.js 15          │
│  port 9000          │     │  port 3000           │
└────────┬────────────┘     └─────────────────────┘
         │
┌────────▼────────────┐
│  PostgreSQL         │
│  (Coolify-managed)  │
└─────────────────────┘
```

Two Docker containers:
- **Backend**: Node.js 20, exposes port 9000
- **Frontend**: Next.js 15 `output: standalone`, exposes port 3000
- **PostgreSQL**: Coolify-managed or dedicated Docker service