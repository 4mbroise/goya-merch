# goya-merch-backend/apps/storefront/src/modules/layout/

## Responsibility

Provides the global chrome and structural shells for every page in the storefront — navigation header, footer, cart interactions, side-menu overlay, and country/language selectors. Acts as the orchestrating module that wires top-level data fetching into reusable UI templates and interactive components.

## Design

- **Server-component-first**: Both templates (`Nav`, `Footer`) are async server components that fetch their own data concurrently and render client-component children where interactivity is needed.
- **Headless UI composition**: Interactive sub-components (`SideMenu`, `CartDropdown`, `CountrySelect`, `LanguageSelect`) rely on Headless UI's Popover, Listbox, and Transition primitives for accessible, composable overlay behavior.
- **Suspense boundaries**: `Nav` wraps the cart button region in `<Suspense>` so the rest of the header renders immediately while the cart data resolves.
- **No top-level index.tsx**: The module is directory-structured only; page layouts import from `templates/nav` and `templates/footer` directly.

## Flow

1. App root layout(s) render `<Nav />` and `<Footer />` as structural chrome.
2. `Nav` fetches `regions`, `locales`, and `currentLocale` via `Promise.all`, then delegates interactivity to `SideMenu` (receiving all three as props) and `CartButton` (which internally fetches the cart and renders `CartDropdown`).
3. `Footer` fetches `collections` and `productCategories`, then renders them as linked lists alongside the GOYA wordmark and external social links.
4. `CartDropdown` exposes a hover-to-open panel with item line-listing, subtotal, and a "Go to cart" CTA. Timer-based auto-open on cart mutation is managed via `useEffect`/`useRef`.
5. `SideMenu` opens a backdrop-blur overlay with navigation links, country select, and language select — each driving `updateRegion` and `updateLocale` respectively.

## Integration

| Consumer | What it imports |
|---|---|
| App root layout | `Nav` from `@modules/layout/templates/nav`, `Footer` from `@modules/layout/templates/footer` |
| Layout components | `@lib/data/cart`, `@lib/data/categories`, `@lib/data/collections`, `@lib/data/locales`, `@lib/data/locale-actions`, `@lib/data/regions`, `@lib/data/customer`, `@lib/util/money` |
| Common UI | `@modules/common/components/ui` (Button, Text, clx), `@modules/common/components/localized-client-link`, `@modules/common/components/delete-button`, `@modules/common/components/line-item-options`, `@modules/common/components/line-item-price` |
| External libs | `@headlessui/react`, `react-country-flag`, `next/image`, `@medusajs/icons`, `@medusajs/types` |

## Children

| Path | Type |
|---|---|
| `components/cart-button` | Data-fetching wrapper → delegates to CartDropdown |
| `components/cart-dropdown` | Client interactive popover (cart items, subtotal, remove) |
| `components/cart-mismatch-banner` | Client warning banner with cart-transfer action |
| `components/country-select` | Client region/country Listbox with flags |
| `components/language-select` | Client locale Listbox with `Intl.Locale`-derived flags |
| `components/medusa-cta` | Static "Powered by" footer badge |
| `components/side-menu` | Client overlay menu with nav links + selectors |
| `templates/nav` | Async server component: sticky top bar |
| `templates/footer` | Async server component: category/collection links |

