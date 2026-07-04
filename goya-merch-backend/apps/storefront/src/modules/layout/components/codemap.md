# goya-merch-backend/apps/storefront/src/modules/layout/components/

## Responsibility

Houses all interactive and presentational leaf components that compose the storefront's global chrome. These components are consumed by the `templates/nav` and `templates/footer` templates and by page-level layouts.

## Design

- **Client-side interactivity** (`"use client"`): `cart-dropdown`, `cart-mismatch-banner`, `country-select`, `language-select`, `side-menu` — each wraps Headless UI primitives (Popover, Listbox) or manages local state for overlays, timers, or async mutations.
- **Server-safe wrappers**: `cart-button` and `medusa-cta` remain server components; `cart-button` fetches data and delegates to a client child, while `medusa-cta` is purely presentational.
- **Composition**: `side-menu` composes `country-select` and `language-select` via props-driven toggle state (`useToggleState`), acting as the orchestration layer for the side panel selectors.
- **Data-fetching separation**: Components that call server data functions (`retrieveCart`, `transferCart`, `updateRegion`, `updateLocale`) do so close to the interaction boundary, not in the parent template.

## Integration

| Component | Data/lib imports |
|---|---|
| `cart-button` | `@lib/data/cart` → `retrieveCart()` |
| `cart-dropdown` | `@lib/util/money` → `convertToLocale` |
| `cart-mismatch-banner` | `@lib/data/customer` → `transferCart()` |
| `country-select` | `@lib/data/cart` → `updateRegion()` |
| `language-select` | `@lib/data/locale-actions` → `updateLocale()` |
| `side-menu` | `@lib/hooks/use-toggle-state`, consumes `CountrySelect` + `LanguageSelect` |
| `medusa-cta` | No data imports (pure presentational) |

## Children

| Folder | Role |
|---|---|
| `cart-button` | Fetches cart, renders CartDropdown |
| `cart-dropdown` | Interactive cart preview popover (hover/timer) |
| `cart-mismatch-banner` | Cart-customer mismatch warning + transfer action |
| `country-select` | Country/region Listbox with flags |
| `language-select` | Locale Listbox with Intl API display names |
| `medusa-cta` | "Powered by Medusa & Next.js" badge |
| `side-menu` | Full-height overlay nav + country/language selectors |

