# Repository Atlas: GOYA Merch

## Project Responsibility
A full e-commerce store for the music band **GOYA**, selling approximately 5 products (t-shirts, vinyl records, accessories). Built with zero license cost, fully typed in TypeScript, France-first (EUR, French legal pages), with a dark high-contrast visual theme. The platform comprises a self-hosted Medusa.js 2.0 backend (headless commerce API) and a Next.js 15 storefront (customer-facing UI), orchestrated as a Turborepo monorepo and deployed as two Docker containers on a VPS via Coolify.

## System Entry Points
| Entry Point | Role |
|-------------|------|
| `goya-merch-backend/package.json` | Monorepo root: npm workspaces + Turborepo config, React 18 overrides |
| `goya-merch-backend/turbo.json` | Task pipeline (build/dev/start/lint/test/seed) |
| `goya-merch-backend/apps/backend/medusa-config.ts` | Medusa app config: DB, CORS, 3 registered modules (invoice, payment-stripe, notification-resend) |
| `goya-merch-backend/apps/backend/package.json` | Backend scripts (`medusa develop` :9000, seed, stripe webhook listener, jest) |
| `goya-merch-backend/apps/storefront/package.json` | Storefront scripts (`next dev` :9001, build, lint) |
| `goya-merch-backend/apps/storefront/next.config.js` | Next.js config (note: ESLint + TS checks disabled during build) |
| `goya-merch-backend/apps/storefront/src/middleware.ts` | Edge-runtime middleware: region resolution + country-code routing |
| `goya-merch-backend/apps/storefront/src/app/layout.tsx` | Root HTML shell (`<html lang="fr">`, globals, 404) |

## Architecture Overview

### Two-App Monorepo
- **Backend** (`@dtc/backend`): Medusa.js 2.0 on port 9000. PostgreSQL database. Registers a custom **invoice module** (local), **Stripe payment** provider, and a custom **Resend notification** provider (local). Business logic lives in **event subscribers** (order-placed, shipment-created, product-updated) — the `workflows/` directory is empty. CJS project; `@react-pdf/renderer` (ESM-only) is loaded via a dynamic `import()` singleton (`getPDFRenderer()`).
- **Storefront** (`@dtc/storefront`): Next.js 15 App Router on port 9001 (dev) / 3000 (prod). Tailwind CSS v3 extending `@medusajs/ui-preset` with a custom GOYA colour palette. Calls the backend via `@medusajs/js-sdk`. Routes are localized via a `[countryCode]` dynamic segment mapping to Medusa regions; `<html lang="fr">` is hardcoded (France-first).

### Key Data Flows
1. **Catalog**: Storefront fetches products/variants via `@lib/data/products.ts` (SDK) → renders PDP with variant selector → `addToCart` server action.
2. **Checkout**: Multi-step URL-driven state machine (addresses → shipping → payment → review). Stripe payment session initiated server-side; `PaymentButton` uses Strategy pattern (Stripe `confirmCardPayment` vs Manual `placeOrder`).
3. **Order → Invoice**: `order.placed` event → subscriber generates sequential invoice number (`GOYA-MERCH-NNNN`, DB-derived, non-atomic) → Resend provider renders PDF via `@react-pdf/renderer` (dynamic import) → uploads to GitHub private repo (`4mbroise/goya-merch-invoices`) via PAT → sends order-confirmation email (react-email).
4. **Shipping notification**: `order.shipment_created` event → subscriber sends shipping email with tracking number.
5. **Storefront revalidation**: Mutations call server actions → Next.js cache tag revalidation → `POST /api/revalidate` endpoint.

### Key Technical Decisions & Constraints
- **Zero license cost**: all open source / free tier (Medusa, Next.js, Stripe, Resend free tier, self-hosted VPS).
- **React 18 pinned** across monorepo via `overrides` (Medusa admin + storefront compatibility).
- **No promo codes**: Medusa promotion module not used.
- **No Redis**: scale does not require it.
- **Manual shipping**: no third-party fulfillment integration; labels printed by hand.
- **Invoice storage**: GitHub private repo (PAT in env, not committed) — zero-cost document store.
- **French legal compliance**: PDF invoices include seller SIRET, TVA (exempt or number), seller address; CGV/Mentions Légales/Politique de Confidentialité required.
- **ESM/CJS interop**: `@react-pdf/renderer` is ESM-only in a CJS backend — always use dynamic `import()` inside async functions.

## Directory Map (Aggregated)

### Monorepo & Apps
| Directory | Responsibility Summary | Detailed Map |
|-----------|------------------------|--------------|
| `goya-merch-backend/` | Turborepo monorepo root: npm workspaces, React 18 overrides, task pipeline | [View Map](goya-merch-backend/codemap.md) |
| `goya-merch-backend/apps/` | Container for the two workspace apps (backend + storefront) | [View Map](goya-merch-backend/apps/codemap.md) |

### Backend (Medusa.js)
| Directory | Responsibility Summary | Detailed Map |
|-----------|------------------------|--------------|
| `apps/backend/` | Medusa 2.0 app: config, 3 modules, CJS/ESM workaround | [View Map](goya-merch-backend/apps/backend/codemap.md) |
| `apps/backend/src/` | Medusa convention layout: file-based API routing, event subscribers | [View Map](goya-merch-backend/apps/backend/src/codemap.md) |
| `apps/backend/src/api/` | Custom REST routes (admin + store namespaces, file-based) | [View Map](goya-merch-backend/apps/backend/src/api/codemap.md) |
| `apps/backend/src/modules/invoice/` | Custom invoice module: model + migration, auto-CRUD via MedusaService | [View Map](goya-merch-backend/apps/backend/src/modules/invoice/codemap.md) |
| `apps/backend/src/modules/resend/` | Custom Resend notification provider: email/PDF templates, GitHub storage | [View Map](goya-merch-backend/apps/backend/src/modules/resend/codemap.md) |
| `apps/backend/src/subscribers/` | Event handlers: order.placed, order.shipment_created, product.updated | [View Map](goya-merch-backend/apps/backend/src/subscribers/codemap.md) |
| `apps/backend/src/scripts/` | Seed scripts: GOYA catalog + stock (one-off `medusa exec`) | [View Map](goya-merch-backend/apps/backend/src/scripts/codemap.md) |
| `apps/backend/src/migration-scripts/` | Foundational data seed: regions, shipping, 7-country EU setup | [View Map](goya-merch-backend/apps/backend/src/migration-scripts/codemap.md) |

### Storefront (Next.js)
| Directory | Responsibility Summary | Detailed Map |
|-----------|------------------------|--------------|
| `apps/storefront/` | Next.js 15 storefront: App Router, Tailwind, Medusa SDK, Stripe.js | [View Map](goya-merch-backend/apps/storefront/codemap.md) |
| `apps/storefront/src/` | Source root: middleware (Edge), modular architecture | [View Map](goya-merch-backend/apps/storefront/src/codemap.md) |
| `apps/storefront/src/app/` | App Router routes: `[countryCode]` localization, (main)/(checkout) groups, parallel routes | [View Map](goya-merch-backend/apps/storefront/src/app/codemap.md) |
| `apps/storefront/src/lib/` | Data access (14 SDK wrappers), hooks, utilities, context, config | [View Map](goya-merch-backend/apps/storefront/src/lib/codemap.md) |
| `apps/storefront/src/modules/` | Feature-based UI layer: 13 domain modules (components + templates) | [View Map](goya-merch-backend/apps/storefront/src/modules/codemap.md) |
| `apps/storefront/src/styles/` | Tailwind globals: typography scale, GOYA palette, browser overrides | [View Map](goya-merch-backend/apps/storefront/src/styles/codemap.md) |
| `apps/storefront/src/types/` | Custom types extending @medusajs/types (FeaturedProduct, VariantPrice, etc.) | [View Map](goya-merch-backend/apps/storefront/src/types/codemap.md) |

### Storefront Feature Modules
| Module | Responsibility Summary | Detailed Map |
|--------|------------------------|--------------|
| `modules/account/` | Customer profile, addresses, order history, auth, order transfer | [View Map](goya-merch-backend/apps/storefront/src/modules/account/codemap.md) |
| `modules/cart/` | Cart line items, summary, preview, empty/sign-in states | [View Map](goya-merch-backend/apps/storefront/src/modules/cart/codemap.md) |
| `modules/checkout/` | Multi-step checkout (addresses→shipping→payment→review), Stripe + manual | [View Map](goya-merch-backend/apps/storefront/src/modules/checkout/codemap.md) |
| `modules/common/` | Shared UI primitives (Input, Modal, CartTotals) + 19 SVG icons | [View Map](goya-merch-backend/apps/storefront/src/modules/common/codemap.md) |
| `modules/layout/` | Global chrome: nav, footer, cart dropdown, side menu, selectors | [View Map](goya-merch-backend/apps/storefront/src/modules/layout/codemap.md) |
| `modules/order/` | Order confirmation, details, transfer accept/decline | [View Map](goya-merch-backend/apps/storefront/src/modules/order/codemap.md) |
| `modules/products/` | PDP: variant selector, image gallery, tabs, related products, price | [View Map](goya-merch-backend/apps/storefront/src/modules/products/codemap.md) |
| `modules/home/` | Landing page: hero + featured product rails | [View Map](goya-merch-backend/apps/storefront/src/modules/home/codemap.md) |
| `modules/categories/` | Category listing: breadcrumb + refinement + paginated grid | [View Map](goya-merch-backend/apps/storefront/src/modules/categories/codemap.md) |
| `modules/collections/` | Collection listing: refinement + paginated grid | [View Map](goya-merch-backend/apps/storefront/src/modules/collections/codemap.md) |
| `modules/shipping/` | Free-shipping progress nudge (inline + popup) | [View Map](goya-merch-backend/apps/storefront/src/modules/shipping/codemap.md) |
| `modules/store/` | Paginated product grid with sort/refinement, shared PaginatedProducts | [View Map](goya-merch-backend/apps/storefront/src/modules/store/codemap.md) |
| `modules/skeletons/` | Loading placeholders for cart, order, product, grid pages | [View Map](goya-merch-backend/apps/storefront/src/modules/skeletons/codemap.md) |

## Known Issues (Flagged During Mapping)
- **Invoice numbering race condition**: `order-placed` subscriber derives the next invoice number from a DB query without a transaction lock — concurrent orders could collide.
- **Stubbed account actions**: `updateCustomerEmail` and `updatePassword` server actions are no-ops (email/password changes do nothing).
- **Copy-paste naming bugs**: `profile-phone/index.tsx` exports `ProfileEmail`; `bancontact.tsx` exports `Ideal`.
- **Cart quantity selector**: `item/index.tsx` hardcodes `maxQtyFromInventory=10` and duplicates the quantity-1 option.
- **Typo**: `order-details` uses `sata-testid` instead of `data-testid`.
- **Unused props**: `ProductPreview` and `product-actions` accept a `region` prop they never use.
