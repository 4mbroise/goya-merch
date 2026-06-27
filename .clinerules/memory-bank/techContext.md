# Tech Context

## Technologies Used

| Layer | Technology | Version / Notes |
|-------|-----------|----------------|
| Backend framework | Medusa.js 2.0 | v2.15.5, `@medusajs/medusa` |
| Frontend framework | Next.js 15 | v15.5.18, DTC starter |
| React | React 18 | v18.3.1 (overridden across monorepo) |
| Styling | Tailwind CSS | v3 (storefront) |
| Package manager | npm | v10.8.2 |
| Monorepo tool | Turborepo | ^2.0.14 |
| Database | PostgreSQL | 15+ (local dev or Coolify-managed) |
| Payments | Stripe | `@medusajs/payment-stripe`, `@stripe/react-stripe-js`, `@stripe/stripe-js` |
| Email service | Resend | `resend` ^6.14.0 + `react-email` ^6.6.3 |
| PDF generation | @react-pdf/renderer | ^4.5.1 |
| Admin dashboard | @medusajs/dashboard | v2.15.5 |
| UI components | @medusajs/ui | v4.1.15 |
| Icons | @medusajs/icons | v2.15.5 |
| Validation | Zod | v4.2.0 |

## Development Setup

### Local Requirements
- **Node.js** ≥20
- **PostgreSQL** 15+ (local Docker container recommended: `docker run -d --name goya-pg -e POSTGRES_PASSWORD=postgres -p 5432:5432 postgres:16`)
- **npm** 10.8.2
- **Stripe CLI** for webhook forwarding (optional, for local payment testing)

### Ports
| Service | Dev | Production/Docker |
|---------|-----|-------------------|
| Backend (Medusa) | 9000 | 9000 |
| Storefront (Next.js) | 8000 | 3000 |
| PostgreSQL | 5432 | (Coolify-managed) |

### Environment Files
- Backend: `apps/backend/.env` (copied from `.env.template`)
- Storefront: `apps/storefront/.env.local` (copied from `.env.template`)

### Key Environment Variables
| Variable | Where | Purpose |
|----------|-------|---------|
| `DATABASE_URL` | Backend | PostgreSQL connection |
| `STRIPE_API_KEY` | Backend | Stripe secret key (test/live) |
| `STRIPE_WEBHOOK_SECRET` | Backend | Stripe webhook signing secret |
| `RESEND_API_KEY` | Backend | Resend API key |
| `RESEND_FROM_ADDRESS` | Backend | Sender email (sandbox: `onboarding@resend.dev`) |
| `INVOICE_GITHUB_TOKEN` | Backend | GitHub PAT with `repo` scope for invoice storage |
| `SELLER_ADDRESS`, `SELLER_CITY`, `SELLER_SIRET`, `SELLER_TVA_EXEMPT` / `SELLER_TVA_NUMBER` | Backend | Seller info for PDF invoices |
| `NEXT_PUBLIC_MEDUSA_BACKEND_URL` | Storefront | Backend URL (browser-visible) |
| `NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY` | Storefront | Publishable API key |
| `NEXT_PUBLIC_DEFAULT_REGION` | Storefront | Default region code (e.g. `fr`) |
| `NEXT_PUBLIC_BASE_URL` | Storefront | Storefront base URL |
| `STORE_CORS`, `ADMIN_CORS`, `AUTH_CORS` | Backend | CORS origins |

## Technical Constraints
- Monorepo uses `pnpm` overrides in `package.json` (React 18 pinned) despite using npm as package manager
- Backend is not deployed to Medusa Cloud — fully self-hosted
- No third-party fulfillment integration (manual shipping labels)
- Promotion/promo code module not used
- No Redis needed for this scale
- Invoice module dependencies: Medusa framework, own migration files
- React Email templates require JSX runtime; @react-pdf templates use a custom renderer

## Brand Assets (in-storefront)
| File | Location | Purpose |
|------|----------|---------|
| `Typo.svg` | `public/` | Filled "GOYA" wordmark (#1d1d1b) — used in nav, footer, checkout (on light backgrounds) |
| `Typo-white.svg` | `public/` | White "GOYA" wordmark (#F2F2F2) — used in the dark Hero |
| `Typo-inline.svg` | `public/` | Outline wordmark — **replaced** by `Typo.svg` in step 5, kept for reference |
| `Logo.svg` | `assets/`, `public/` | Outline logo (thin line art) |
| `Logo-full.svg` | `public/` | Filled logo (solid black) — source for favicon `icon.svg` |
| `Logo remplit.svg` | `assets/` | Same as Logo-full, French name variant |
| `icon.svg` | `src/app/` | Site favicon (auto-served by Next.js App Router) |

## ESM / CJS Interop (Critical)
- **`@react-pdf/renderer`** is ESM-only (`"type": "module"` in its package.json). The backend project is CJS. Static `import` causes TS compilation errors.
- **Always use dynamic `import()`** for `@react-pdf/renderer` inside an async function. See `src/modules/resend/templates/invoice-pdf.tsx` for the pattern: a `getPDFRenderer()` helper that does `const mod = await import('@react-pdf/renderer')` and returns the named exports (`Document`, `Page`, `Text`, `View`, `StyleSheet`, `renderToBuffer`).

## Tool Usage Patterns
- **Seed scripts** (`seed-goya-catalog.ts`, `seed-goya-stock.ts`) for reproducible catalog creation
- **`medusa db:migrate`** runs automatically on `npm run dev` for the backend
- **Stripe webhook** endpoint: `/hooks/payment/stripe` (Medusa plugin)
- **Invoice DB table** auto-created by custom module migration on first start
- **GitHub storage**: PAT stored in env, not committed