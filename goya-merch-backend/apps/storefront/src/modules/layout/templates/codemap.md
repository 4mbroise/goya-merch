# goya-merch-backend/apps/storefront/src/modules/layout/templates/

## Responsibility

Contains the top-level structural templates (`Nav`, `Footer`) that compose the global page chrome. Both are async server components that fetch data independently and render the interactive leaf components from `../components/`.

## Design

- **Async server components**: Both `Nav` and `Footer` are `export default async function` — they fetch data at request time and render JSX. No client-side lifecycle.
- **Concurrent data fetching**: `Nav` uses `Promise.all` to fetch regions, locales, and currentLocale in parallel. `Footer` fetches collections and categories sequentially but independently.
- **Suspense-ready**: `Nav` wraps the `CartButton` region in `<Suspense>` with a static "Cart (0)" fallback so the heading and side menu render immediately.
- **Minimal layout logic**: Templates handle positioning and structure only; interactive state (`"use client"`) lives in the child components.

## Integration

| Template | Data functions | Composed children |
|---|---|---|
| `nav` | `listRegions`, `listLocales`, `getLocale` | `SideMenu`, `CartButton`, `LocalizedClientLink` |
| `footer` | `listCollections`, `listCategories` | `LocalizedClientLink`, `Image` (logo) |

Both templates are consumed by the app root layout (not within this module).

## Children

| Folder | Role |
|---|---|
| `nav` | Sticky top bar: side menu, logo, account link, cart button |
| `footer` | Bottom footer: logo, category/collection links, social links |

