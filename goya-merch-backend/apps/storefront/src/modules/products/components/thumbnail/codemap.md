# goya-merch-backend/apps/storefront/src/modules/products/components/thumbnail/

## Responsibility

Renders a product thumbnail image with configurable aspect ratio and width sizing, falling back to a placeholder icon when no image is available. Used as the image surface on product preview cards across the storefront.

## Design

- **Server component** -- no interactivity, pure rendering.
- **Sizing variants** -- `size` prop controls both aspect ratio and width:
  - `"square"`: `aspect-[1/1]`, no fixed width
  - `"small"`: `aspect-[9/16]`, `w-[180px]`
  - `"medium"`: `aspect-[9/16]`, `w-[290px]`
  - `"large"`: `aspect-[9/16]`, `w-[440px]`
  - `"full"`: `aspect-[9/16]`, `w-full`
- **Featured variant** -- `isFeatured` overrides aspect ratio to `aspect-[11/14]`.
- **Image fallback** -- `initialImage` resolves to `thumbnail` first, then `images[0]?.url`. If neither exists, `ImageOrPlaceholder` renders a `PlaceholderImage` icon centered in the container.
- **Hover effect** -- `group-hover:shadow-elevation-card-hover` with `transition-shadow` for interactive card feel (parent element must have `group` class).
- **Next.js Image** -- uses `fill` with `object-cover`, `quality={50}`, and responsive `sizes` attribute. `draggable={false}` prevents drag interactions.

## Flow

1. Props in: `thumbnail?: string | null`, `images?: { url?: string }[] | null`, `size`, `isFeatured?`, `className?`, `data-testid?`
2. Resolves `initialImage` from `thumbnail` or `images[0]?.url`.
3. Renders a `<Container>` with computed aspect ratio, width, and hover shadow classes.
4. Inside, either renders `<Image>` with `fill` and `object-cover` or the placeholder icon.

## Integration

- **Common components**: `Container`, `clx` from `@modules/common/components/ui`
- **Icons**: `PlaceholderImage` from `@modules/common/icons`
- **Next.js**: `next/image`
- **Consumed by**: `product-preview/index.tsx` and any other components rendering product cards (category pages, collection pages, store pages, home product-rail)
