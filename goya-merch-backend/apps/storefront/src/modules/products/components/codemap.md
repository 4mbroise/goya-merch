# goya-merch-backend/apps/storefront/src/modules/products/components/

## Responsibility

Hosts all leaf presentational components used in the product detail page and product preview cards. Each component is a self-contained folder with a single `index.tsx` export and optional helper modules. These components receive data as props and have no direct data-fetching responsibility (except `RelatedProducts` which is an async server component that fetches its own data).

## Design

- **Leaf component per folder pattern** -- each component (image-gallery, product-actions, product-price, product-tabs, product-preview, product-onboarding-cta, related-products, thumbnail) lives in `components/<name>/index.tsx`.
- **Server vs Client split** -- `ImageGallery`, `Thumbnail`, `ProductPreview`, `PreviewPrice`, `RelatedProducts`, and `ProductOnboardingCta` are server components. `ProductActions`, `MobileActions`, `OptionSelect`, `ProductPrice`, `ProductTabs`, and `Accordion` are client components.
- **Composition over configuration** -- components are composed directly by templates or pages, with props passed explicitly.

## Flow

- Each component receives its required data as props (product, region, images, variant, etc.).
- Interactive components (ProductActions, MobileActions) emit events upward via callback props (`updateOption`, `handleAddToCart`).
- ProductPreview and RelatedProducts compute prices locally via `getProductPrice` utility on the server.
- ProductActions fetches real-time pricing through its parent `ProductActionsWrapper` template.

## Integration

- **Data utilities**: `@lib/util/get-product-price`, `@lib/util/product` (`isSimpleProduct`)
- **API data**: `@lib/data/products` (`listProducts`), `@lib/data/regions` (`getRegion`), `@lib/data/cart` (`addToCart`)
- **Common components**: `@modules/common/components/ui` (Container, Button, Text, Heading, clx), `Divider`, `LocalizedClientLink`, icons
- **Third-party**: `@radix-ui/react-accordion`, `@headlessui/react` (Dialog, Transition), `next/image`, `lodash/isEqual`
- **Consumed by**: `templates/index.tsx` (ProductTemplate) and routes that render product grids

### Children

| Component | Type | Role |
|---|---|---|
| `image-gallery/` | server | Vertical product image list with priority loading |
| `product-actions/` | client | Variant selector + add-to-cart (desktop + mobile) |
| `product-onboarding-cta/` | server | Post-setup onboarding banner |
| `product-preview/` | server | Product card for grid listings (thumbnail + title + price) |
| `product-price/` | client | Calculated price display with sale badges |
| `product-tabs/` | client | Accordion-based product info / shipping tabs |
| `related-products/` | server | Fetches and renders related product grid |
| `thumbnail/` | server | Product image or placeholder with aspect-ratio variants |
