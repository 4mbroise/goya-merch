# goya-merch-backend/apps/storefront/

## Responsibility

Customer-facing Next.js 15 e-commerce storefront for the GOYA Merch platform. Serves the public shopping UI, renders product listings/carts/checkout, communicates with the Medusa backend via `@medusajs/js-sdk`, and handles Stripe payment sessions. Runs on port 9001 in development and port 3000 in production.

## Design

- **App Router Architecture**: Uses Next.js 15 App Router with React 18 Server Components, a `[countryCode]` dynamic segment for region-based routing, and Edge middleware for geo-aware region detection.
- **Tailwind CSS theming**: Extends `@medusajs/ui-preset` with a custom `goya` colour palette (ink `#0A0A0A`, subtle borders, light foreground) and a dark-mode class strategy. Defines a full set of text-size utility classes (xsmall to 3xl) with regular/semi variants.
- **Medusa JS SDK integration**: All store data operations (products, cart, checkout, regions) go through `@medusajs/js-sdk` (v2.15.5). Backend URL and publishable key are provided via environment variables.
- **Static asset policy**: Next.js images are served unoptimized with remote patterns allowing localhost and S3 sources. Sitemap is generated via `next-sitemap` (checkout and account paths excluded from crawling).
- **Strict build safety**: ESLint and TypeScript errors are ignored during production builds (`next.config.js`); linting is run separately via the dedicated script.

## Flow

1. **Request routing**: Edge middleware intercepts all non-static requests, resolves the visitor's country code (URL segment, Cloudflare `cf.country`, or Vercel `x-vercel-ip-country` header), fetches the region map from the Medusa backend (cached for 1 hour), and issues a 307 redirect to `/{countryCode}/...` if the country is missing from the path.
2. **Page rendering**: The `[countryCode]` layout reads the region parameter, passes it to child pages (home, product listing, cart, checkout). React Server Components fetch data server-side via the Medusa SDK; interactive islands (cart drawer, payment form) use client components.
3. **Cart and checkout flow**: Managed through Medusa SDK cart API — `POST /store/carts`, line item mutations, shipping option selection, payment collection creation via Stripe Elements.
4. **Build pipeline**: `next build` produces a static + server-bundle output into `.next/`. Turborepo orchestrates the build order (backend API must be available for storefront to function at runtime, but builds are independent).

## Integration

- **Medusa backend** (`@dtc/backend`): API calls to `NEXT_PUBLIC_MEDUSA_BACKEND_URL` (port 9000) authenticated with `NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY` for store endpoints.
- **Stripe**: Client-side Stripe.js loaded via `@stripe/react-stripe-js` / `@stripe/stripe-js` for payment element rendering.
- **PostgreSQL**: Direct `pg` dependency included (likely for direct DB reads in admin or data-export features).
- **UI component libraries**: `@headlessui/react` (accessible menu/dialog primitives), `@radix-ui/react-accordion`, `@medusajs/icons` (SVG icon set), `@medusajs/ui-preset` (Tailwind design tokens).
- **Subdirectory maps**:
  | Directory | Role |
  |-----------|------|
  | `src/app/` | Next.js App Router pages, layouts, API routes |
  | `src/lib/` | Shared utilities, config, React context, data fetching, hooks |
  | `src/modules/` | Feature modules (cart, checkout, products, account, etc.) |
  | `src/styles/` | Tailwind CSS globals and utility classes |
  | `src/types/` | TypeScript type definitions |
