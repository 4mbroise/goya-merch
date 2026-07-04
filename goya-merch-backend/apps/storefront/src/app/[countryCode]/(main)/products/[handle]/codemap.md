# goya-merch-backend/apps/storefront/src/app/[countryCode]/(main)/products/[handle]/

## Responsibility

Product detail page. Displays full product information — images, pricing, description, variants — for a given product handle and allows adding to cart.

## Design

- **Dynamic segment** `[handle]` — the product's URL handle.
- **Async Server Component** with `generateStaticParams` for ISR: pre-generates all product × countryCode combinations.
- `generateMetadata` fetches the product by handle to produce dynamic title, description, and Open Graph image.
- Contains a helper function `getImagesForVariant()` that filters product images to match the selected variant (via `v_id` search param).
- Delegates to `ProductTemplate` from `@modules/products/templates`.
- Accepts optional `v_id` search param for variant preselection.

## Flow

1. `generateStaticParams` lists all products per country, generating static paths for each (handle, countryCode) pair.
2. On request, fetches region via `getRegion(countryCode)` and product via `listProducts({ queryParams: { handle } })`.
3. If region or product is falsy, calls `notFound()`.
4. Resolves `images` using `getImagesForVariant()` with the `v_id` search param.
5. Renders `<ProductTemplate product={...} region={...} countryCode={...} images={...} />`.

## Integration

- Data: `@lib/data/products` (`listProducts`), `@lib/data/regions` (`getRegion`, `listRegions`).
- Template: `ProductTemplate` from `@modules/products/templates`.
- Types: `HttpTypes` from `@medusajs/types`.
