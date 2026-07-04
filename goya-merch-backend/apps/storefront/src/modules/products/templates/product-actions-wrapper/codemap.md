# goya-merch-backend/apps/storefront/src/modules/products/templates/product-actions-wrapper/

## Responsibility

Acts as an async data-fetching middleware between the product detail page and the interactive `ProductActions` client component. It retrieves the product with region-scoped pricing (calculated prices) and passes the priced product down to the presentation layer.

## Design

- **Async server component** -- performs a server-side `listProducts` call with `region_id` to hydrate the product with real-time calculated pricing data.
- **Single-product query** -- fetches by product `id` with `queryParams: { id: [id] }` and destructures `response.products[0]`.
- **Suspense-compatible** -- designed to be wrapped in `<Suspense>` by `ProductTemplate`, allowing the interactive actions to load after the initial page render.
- **Null guard** -- returns `null` if the priced product is not found (edge case: product deleted or region mismatch).

## Flow

1. Props in: `id: string`, `region: HttpTypes.StoreRegion`
2. Calls `listProducts({ queryParams: { id: [id] }, regionId: region.id })`.
3. Extracts the first product from the response.
4. If no product, returns `null`.
5. Otherwise renders `<ProductActions product={product} region={region} />`.

## Integration

- **Data**: `@lib/data/products` (`listProducts`)
- **Types**: `HttpTypes` from `@medusajs/types`
- **Leaf component**: `ProductActions` from `@modules/products/components/product-actions`
- **Consumed by**: `templates/index.tsx` (ProductTemplate), rendered inside a `<Suspense>` boundary in the right column of the PDP
