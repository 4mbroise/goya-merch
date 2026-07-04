# goya-merch-backend/apps/storefront/src/modules/products/

## Responsibility

Orchestrates the product detail page (PDP) and product preview card rendering for the storefront. This module composes leaf presentational components (image gallery, variant selector, price display, tabs, onboarding CTA) and template wrappers (product-info, product-actions-wrapper) into the full PDP layout consumed by the `[handle]` route.

## Design

- **Template composition** -- `templates/index.tsx` (ProductTemplate) is the root layout, using a three-column flex layout (info + gallery + actions) on desktop and a stacked layout on mobile.
- **Component colocation** -- each leaf component lives in its own folder under `components/` with a single `index.tsx` and optionally helper files.
- **Server/Client split** -- pricing-fetching is isolated in `ProductActionsWrapper` (async server component wrapping the client `ProductActions`), so the interactive variant selector can be Suspense-bounded.
- **Suspense boundaries** -- `ProductActionsWrapper` and `RelatedProducts` are each wrapped in `<Suspense>` with skeleton fallbacks.

## Flow

1. Route `[countryCode]/(main)/products/[handle]` fetches product + region data and passes them to `ProductTemplate`.
2. `ProductTemplate` lays out three columns:
   - Left sticky column: `ProductInfo` (collection, title, description) + `ProductTabs` (accordion).
   - Center: `ImageGallery` (vertical image list).
   - Right sticky column: `ProductOnboardingCta` (conditional) + `<Suspense>` wrapping `ProductActionsWrapper`.
3. `ProductActionsWrapper` calls `listProducts` with `region_id` to get real-time pricing, then renders `ProductActions`.
4. Below the main layout, `<Suspense>` wraps `RelatedProducts` which fetches products filtered by same collection/tags.
5. Product preview cards (`ProductPreview`) are used outside the PDP in category, collection, store, and product-rail listings.

## Integration

- **Data access**: `@lib/data/products` (`listProducts`, `listProductsWithSort`), `@lib/data/regions` (`getRegion`), `@lib/data/cart` (`addToCart`)
- **Utility**: `@lib/util/get-product-price` (`getProductPrice`, `getPricesForVariant`), `@lib/util/product` (`isSimpleProduct`)
- **Common UI**: `@modules/common/components/ui` (`Button`, `Container`, `Heading`, `Text`, `clx`), `Divider`, `LocalizedClientLink`
- **Consumed by**: `[countryCode]/(main)/products/[handle]` page, `[countryCode]/(main)/categories/[...category]`, `[countryCode]/(main)/collections/[handle]`, `[countryCode]/(main)/store`, and home page product-rail.
