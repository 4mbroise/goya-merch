# goya-merch-backend/apps/backend/

## Responsibility
Medusa.js 2.0 application server serving as the e-commerce backend for GOYA Merch. Handles product catalog, order management, payment processing (Stripe), transactional email notifications (Resend), and PDF invoice generation/storage.

## Design
- **Medusa Application Pattern**: Standard Medusa 2.0 project structure using `medusa-config.ts` for module registration and `@medusajs/framework` for the core runtime.
- **Module Registration**: Three modules registered — a local `invoice` module (custom MedusaModule), `@medusajs/medusa/payment-stripe` (Stripe provider), and a local `resend` notification provider (Medusa ModuleProvider for `Modules.NOTIFICATION`).
- **CJS with ESM Workaround**: Project uses CommonJS via `module: "Node16"` in tsconfig; ESM-only dependency `@react-pdf/renderer` is loaded via dynamic `import()` at runtime (see `getPDFRenderer()` lazy singleton pattern).
- **Configuration-Driven**: All secrets and environment-specific values loaded via `loadEnv()` from `.env` file; CORS origins, JWT secret, cookie secret, and database URL configured in `medusa-config.ts`.
- **Testing**: Jest with SWC transform, three test types (`unit`, `integration:http`, `integration:modules`) controlled by `TEST_TYPE` env var.

## Flow
1. `medusa develop` boots the HTTP server (port 9000), applies MikroORM migrations, registers subscribers and workflows.
2. Incoming requests route through Medusa's HTTP layer — storefront API (`/store/*`), admin API (`/admin/*`), and webhook hooks (`/hooks/*`) for Stripe events.
3. Events (`order.placed`, `order.shipment_created`, `product.*`) are emitted by Medusa core; subscribers listen and trigger side-effects (email notifications, invoice creation, storefront cache revalidation).
4. Seed scripts (`medusa exec`) populate catalog and inventory for the GOYA product line.

## Integration
- **Database**: PostgreSQL via `DATABASE_URL` (MikroORM under the hood).
- **Payment**: Stripe via `@medusajs/payment-stripe`, webhooks at `/hooks/payment/stripe_stripe`.
- **Email**: Resend API for transactional emails (order confirmation + shipping notification with PDF invoice attachment).
- **Invoice Storage**: GitHub API (GitHub Container Storage pattern) — PDFs uploaded to `4mbroise/goya-merch-invoices` repo at `invoices/YYYY/MM/INVOICE_NUMBER.pdf`.
- **Storefront Cache Revalidation**: HTTP POST to the Next.js storefront revalidation endpoint on product changes.
- **Monorepo**: Lives in `apps/backend/` under a Turborepo + npm workspaces root; depends on `@dtc/storefront` for cache revalidation only.
