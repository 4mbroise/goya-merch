# goya-merch-backend/apps/storefront/src/modules/products/templates/product-info/

## Responsibility

Renders the product metadata header on the product detail page: the collection breadcrumb link, the product title, and the product description.

## Design

- **Server component** -- stateless, no client interactivity.
- **Conditional collection link** -- if `product.collection` exists, renders a `LocalizedClientLink` to `/collections/${product.collection.handle}` with the collection title, styled as muted text that transitions to subtle on hover.
- **Heading level** -- uses `<Heading level="h2">` for the product title with `text-3xl leading-10`.
- **Description** -- renders as `<Text>` with `whitespace-pre-line` to preserve line breaks from the Medusa admin input.
- **Test IDs** -- `data-testid="product-title"` and `data-testid="product-description"` for E2E testing.

## Flow

1. Props in: `product: HttpTypes.StoreProduct`
2. Optionally renders a collection breadcrumb link.
3. Renders product title as `<Heading level="h2">`.
4. Renders product description as `<Text>` with whitespace preservation.
5. No callbacks, no state, no data fetching.

## Integration

- **Common components**: `Heading`, `Text` from `@modules/common/components/ui`, `LocalizedClientLink` from `@modules/common/components/localized-client-link`
- **Consumed by**: `templates/index.tsx` (ProductTemplate), rendered in the left sticky column of the PDP layout
