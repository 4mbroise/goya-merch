# goya-merch-backend/apps/storefront/src/modules/

## Responsibility
Feature-based UI layer for the GOYA Merch storefront. Each subdirectory groups the presentational components, interactive client components, and page-level templates for one commerce domain. Templates are consumed by the App Router pages in `src/app/`; components are composed within templates and across modules.

## Design
- **Feature-Module Pattern**: Each domain (account, cart, checkout, etc.) is self-contained with a `components/` folder of leaf components (one per folder, `index.tsx` entry) and a `templates/` folder of compositions.
- **Server / Client Boundary**: Templates are async Server Components fetching data via `@lib/data`; interactive leaves opt into `"use client"` (Headless UI, Radix, `useActionState`, `useState`).
- **Shared Primitives**: `common/` provides the lowest-level design-system primitives (Input, Checkbox, Modal, CartTotals, icons) consumed by all other modules.
- **Composition Root**: App Router pages import a module template, which composes leaf components and wires `@lib/data` server actions.

## Flow
1. App Router page (`src/app/[countryCode]/(main)/...`) renders a module **template**.
2. Template (async Server Component) fetches data via `@lib/data/*` (SDK wrappers) and passes props down.
3. Leaf components render UI; interactive leaves call server actions (`addToCart`, `updateLineItem`, `placeOrder`, etc.) and trigger Next.js cache revalidation.

## Integration
| Module | Responsibility | Detailed Map |
|--------|----------------|--------------|
| `account/` | Customer profile, addresses, order history, auth (login/register), order transfer | [View Map](account/codemap.md) |
| `cart/` | Cart line items, summary, preview dropdown, empty/sign-in states | [View Map](cart/codemap.md) |
| `checkout/` | Multi-step checkout (addresses → shipping → payment → review), Stripe + manual payment | [View Map](checkout/codemap.md) |
| `common/` | Shared UI primitives (Input, Modal, CartTotals, etc.) + 19 SVG icons | [View Map](common/codemap.md) |
| `layout/` | Global chrome: nav, footer, cart dropdown, side menu, country/language selectors | [View Map](layout/codemap.md) |
| `order/` | Order confirmation, order details, order transfer accept/decline | [View Map](order/codemap.md) |
| `products/` | Product detail page: variant selector, image gallery, tabs, related products, price | [View Map](products/codemap.md) |
| `home/` | Landing page: hero + featured product rails | [View Map](home/codemap.md) |
| `categories/` | Category listing with breadcrumb + refinement + paginated grid | [View Map](categories/codemap.md) |
| `collections/` | Collection listing with refinement + paginated grid | [View Map](collections/codemap.md) |
| `shipping/` | Free-shipping progress nudge (inline + popup) | [View Map](shipping/codemap.md) |
| `store/` | Paginated product grid with sort/refinement, shared `PaginatedProducts` | [View Map](store/codemap.md) |
| `skeletons/` | Loading placeholders for cart, order, product, grid pages | [View Map](skeletons/codemap.md) |

- **Data layer**: all modules depend on `@lib/data/*` (Medusa JS SDK wrappers).
- **Shared primitives**: all modules depend on `common/` components and icons.
- **Consumed by**: App Router pages in `src/app/[countryCode]/(main)/` and `(checkout)/`.
