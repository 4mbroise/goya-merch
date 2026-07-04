# goya-merch-backend/apps/storefront/src/

## Responsibility

Source root of the Next.js 15 storefront application. Contains all application code: page components and layouts (App Router), shared utilities, feature modules, global styles, TypeScript type definitions, and Edge middleware for region-based routing.

## Design

- **Next.js App Router layout**: The `app/` directory uses a `[countryCode]` dynamic segment pattern, where the middleware injects a two-letter country code (e.g., `/dk`, `/fr`) into the URL path. A root layout in `app/layout.tsx` provides the HTML shell, and `app/[countryCode]/layout.tsx` handles region-aware data fetching for each territory.
- **Modular monolith within the app**: Feature logic is organized into self-contained directories under `modules/` (cart, checkout, products, account, etc.), each owning its own components, views, and data fetching. Shared cross-cutting code lives in `lib/`.
- **Medusa JS SDK data access**: API calls to the Medusa backend are centralized in `lib/data/` and `lib/context/`, consumed by both Server Components (direct async calls) and Client Components (via React context providers).
- **Edge middleware**: `middleware.ts` runs on every request (excluding static assets) to determine the visitor's country, build a region map, and redirect to the correct country-prefixed URL if needed. Runs on the Edge runtime (no Node.js APIs available).

## Flow

1. Request arrives → `middleware.ts` checks for country prefix, fetches regions from Medusa backend (cached in-memory, 1-hour TTL), redirects 307 to `/{country}/...` if missing.
2. Matched route resolves through `app/[countryCode]/` → layout fetches region data and passes it down. Each sub-page (home, store, product, cart, checkout) renders using Server Components by default, with client-side interactivity where required (carousels, cart drawer, accordions, payment form).
3. Cart and checkout mutations (add item, apply discount, select shipping, create payment session) are performed through Medusa SDK actions imported from `lib/data/`, often wrapped in React context providers in `lib/context/`.

## Integration

- **Entry files**:
  - `middleware.ts` — Edge middleware (region routing)
  - `app/layout.tsx` — Root server layout
  - `app/not-found.tsx` — Global 404 page
  - `app/[countryCode]/` — Region-aware page tree
- **Subdirectory map**:
  | Directory | Responsibility |
  |-----------|---------------|
  | `app/` | Next.js App Router pages, layouts, API routes, root layout |
  | `lib/` | Shared configuration, React context providers, data-fetching functions, custom hooks, utility helpers |
  | `modules/` | Feature modules decomposed by domain (cart, checkout, products, account, categories, collections, common, home, layout, order, shipping, skeletons, store) |
  | `styles/` | Global Tailwind CSS styles and custom utility classes |
  | `types/` | TypeScript type definitions (feature-specific and shared) |
