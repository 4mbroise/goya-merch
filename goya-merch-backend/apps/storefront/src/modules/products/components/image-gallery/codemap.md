# goya-merch-backend/apps/storefront/src/modules/products/components/image-gallery/

## Responsibility

Renders a vertical stack of product images for the product detail page. Each image is displayed at a 29:34 aspect ratio inside a `Container` wrapper with `next/image` fill positioning.

## Design

- **Presentational server component** -- no state, no effects, no client interactivity.
- **Vertical flex layout** -- images render top-to-bottom with `gap-y-4` spacing inside a `flex-col flex-1` container, offset with `mx-16` margins on `small:` breakpoint.
- **Priority loading** -- the first three images (`index <= 2`) use `priority={true}` for eager loading; remaining images load lazily.
- **Responsive sizes** -- `sizes` attribute spans breakpoints from 280px (mobile) to 800px (desktop).

## Flow

- Props in: `images: HttpTypes.StoreProductImage[]` (array of Medusa product image objects with `id` and `url`)
- Iterates over images, rendering each in a `<Container>` with `aspect-[29/34]` and `bg-ui-bg-subtle`.
- Each image is an `<Image>` with `fill`, `objectFit: "cover"`, and `rounded-rounded` styling.
- No callbacks, no events.

## Integration

- **Types**: `HttpTypes.StoreProductImage` from `@medusajs/types`
- **Common components**: `Container` from `@modules/common/components/ui`
- **Next.js**: `next/image` for optimized image rendering
- **Consumed by**: `templates/index.tsx` (ProductTemplate), which passes the images array sourced from the route page data
