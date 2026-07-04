# goya-merch-backend/apps/storefront/src/app/

## Responsibility

Root layout for the entire storefront. Defines the HTML shell (`<html lang="fr">`), imports global Tailwind styles, and provides a fallback 404 page for unmatched top-level routes.

## Design

- **Server Component** layout with `Metadata` exported from `next` for SEO (title, description, favicon).
- Hardcoded `<html lang="fr">` (France-first; no auto-detection of locale).
- `<body>` uses a `bg-white text-grey-90` colour scheme; overridden by child layouts for the dark theme.
- `not-found.tsx` is a catch-all at the root level, rendering a simple page-not-found message with a link back to `/`.

## Flow

1. Request hits any route under `/`.
2. `RootLayout` renders the HTML/body wrapper and passes `children` down to the next matching segment (typically `[countryCode]`).
3. If no route matches, `NotFound` renders a 404 with a "Go to frontpage" link.

## Integration

- Imports `getBaseURL` from `@lib/util/env` for `metadataBase`.
- Imports global CSS from `styles/globals.css`.
- `NotFound` uses `ArrowUpRightMini` icon from `@medusajs/icons` and `Text` from `@modules/common/components/ui`.
