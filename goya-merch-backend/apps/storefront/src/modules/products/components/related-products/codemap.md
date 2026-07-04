# goya-merch-backend/apps/storefront/src/modules/products/components/related-products/

## Responsibility

Fetches and renders a grid of related products on the product detail page. Products are filtered by the same collection and matching tags, with the current product excluded from results.

## Design

- **Async server component** -- performs data fetching (region lookup, product list query) at render time.
- **Filter strategy** -- builds query params from the current product's `collection_id` (if set) and `tags` (mapped to `tag_id` array). Always filters out gift cards (`is_giftcard: false`).
- **Exclusion filter** -- post-fetch `.filter()` removes the current product by ID from the results.
- **Empty state** -- if no related products found or no region, returns `null`.
- **Grid layout** -- renders a responsive grid (`grid-cols-2 small:grid-cols-3 medium:grid-cols-4`) of `ProductPreview` cards.
- **Configurable** -- the function body notes "edit this function to define your related products logic", indicating the filtering strategy is intended as a default that can be customized.

## Flow

1. Props in: `product: HttpTypes.StoreProduct`, `countryCode: string`
2. Fetches region via `getRegion(countryCode)`. Returns `null` if no region.
3. Builds `queryParams` from product's `collection_id` and `tags`, adds `is_giftcard: false`.
4. Calls `listProducts({ queryParams, countryCode })`, passing `region_id` in query params.
5. Filters out the current product from the response.
6. If no products remain, returns `null`.
7. Renders a heading ("Related products"), a subtitle, and a `<ul>` grid of `<ProductPreview>` components.

## Integration

- **Data**: `@lib/data/products` (`listProducts`), `@lib/data/regions` (`getRegion`)
- **Sibling component**: `ProductPreview` from `../product-preview`
- **Consumed by**: `templates/index.tsx` (ProductTemplate), wrapped in a `<Suspense>` boundary with `SkeletonRelatedProducts` as fallback
