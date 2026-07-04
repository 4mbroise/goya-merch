# goya-merch-backend/apps/storefront/src/modules/layout/templates/footer/

## Responsibility

Async server component that renders the site-wide footer. Displays the GOYA wordmark, linked category tree (top-level categories with children), linked collections grid, external links, and a dynamic copyright year.

## Design

- **Async server component**: Fetches all required data at render time — no client hydration for data.
- **Two data fetches**: `listCollections({ fields: "*products" })` for collections, `listCategories()` for product categories.
- **Category tree**: Iterates `productCategories`, filtering out child categories at the top level (those with `parent_category` are skipped). For each top-level category, if it has `category_children`, those are rendered as a nested sub-list.
- **Collections grid**: Slices to 6 items. Applies a two-column CSS grid when more than 3 collections exist.
- **External links**: Static "Website" and "Instagram" links in a dedicated GOYA column, opening in new tabs.
- **Logo**: Uses `next/image` with the dark-theme `Typo.svg` wordmark.

## Flow

```
async Footer
  ↓ await listCollections({ fields: "*products" })
  ↓ await listCategories()
  ↓
  render:
    footer.border-t
      .content-container
        row:
          LocalizedClientLink("/") → Image(Typo.svg) [GOYA logo]
          grid:
            Categories column:
              top-level categories (max 6)
                → LocalizedClientLink to /categories/:handle
                → children sub-list (if any)
            Collections column:
              collections (max 6, 2-col if >3)
                → LocalizedClientLink to /collections/:handle
            GOYA column:
              a → "Website" (goya.xyz)
              a → "Instagram" (@goya)
        copyright: "© {year} GOYA. All rights reserved."
```

## Integration

- Calls `listCollections` and `listCategories` from `@lib/data/collections` and `@lib/data/categories` respectively
- Uses `Image` from `next/image` for the GOYA wordmark (`/Typo.svg`)
- Navigates via `LocalizedClientLink` from `@modules/common/components/localized-client-link`
- Uses `Text` and `clx` utility from `@modules/common/components/ui`
- Consumed by the app root layout(s)

