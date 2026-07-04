# goya-merch-backend/apps/storefront/src/modules/products/templates/

## Responsibility

Hosts composition templates that combine leaf components into coherent product page sections. These templates sit between the route page and the presentational components, adding data-fetching (ProductActionsWrapper) and layout structure (ProductTemplate, ProductInfo).

## Design

- **Template composition pattern** -- each folder contains an `index.tsx` that composes multiple leaf components and provides layout structure or data middleware.
- **Server-first** -- all template files are server components. `ProductActionsWrapper` is an async server component that fetches data then delegates to the client `ProductActions`.
- **Three-column layout** -- `ProductTemplate` arranges (info+tabs) | (gallery) | (onboarding+actions) in a flex row on desktop, stacking vertically on mobile.

## Flow

Route pages pass product/region/countryCode/images to `ProductTemplate`, which:
1. Guards against missing product with `notFound()`.
2. Renders left column: `ProductInfo` + `ProductTabs`.
3. Renders center column: `ImageGallery`.
4. Renders right column: `ProductOnboardingCta` (conditional) + `<Suspense>` wrapping `ProductActionsWrapper`.
5. Below: `<Suspense>` wrapping `RelatedProducts`.
6. `ProductActionsWrapper` calls `listProducts` with `region_id` to fetch region-priced product data, then renders `ProductActions`.

## Integration

- **Data**: `@lib/data/products` (`listProducts`)
- **Components**: `ImageGallery`, `ProductActions`, `ProductOnboardingCta`, `ProductTabs`, `RelatedProducts`, `ProductInfo`
- **Skeletons**: `@modules/skeletons/templates/skeleton-related-products`
- **Consumed by**: `[countryCode]/(main)/products/[handle]` route page

### Children

| Template | Role |
|---|---|
| `index.tsx` (ProductTemplate) | Root PDP layout composing all sections |
| `product-actions-wrapper/` | Async server wrapper that fetches priced product data then renders ProductActions |
| `product-info/` | Renders collection link, product title, and description |
