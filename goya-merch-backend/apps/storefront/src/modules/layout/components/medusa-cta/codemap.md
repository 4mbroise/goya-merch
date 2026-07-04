# goya-merch-backend/apps/storefront/src/modules/layout/components/medusa-cta/

## Responsibility

Static presentational component that renders a "Powered by Medusa & Next.js" badge with corresponding SVG icons. Used as a visual attribution in the global footer.

## Design

- **Pure server component**: No `"use client"` directive, no props, no state, no side effects.
- **Inline SVG icons**: Imports `Medusa` and `NextJs` SVG icon components from `@modules/common/icons/`.
- **External links**: Both the Medusa and Next.js names are wrapped in `<a>` tags with `target="_blank"` and `rel="noreferrer"`.

## Flow

```
MedusaCTA()
  ↓ render:
    Text: "Powered by"
      a (href="https://www.medusajs.com") → Medusa SVG icon
      "&"
      a (href="https://nextjs.org") → NextJs SVG icon
```

## Integration

- Imports `Medusa` from `../../../common/icons/medusa` and `NextJs` from `../../../common/icons/nextjs`
- Uses `Text` from `@modules/common/components/ui`
- Consumed by `templates/footer` (footer template)

