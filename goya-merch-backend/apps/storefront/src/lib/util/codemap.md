# goya-merch-backend/apps/storefront/src/lib/util/

## Responsibility

Collection of pure, stateless utility functions used across the storefront. Handles money formatting, price extraction from product variants, address comparison, product classification, array helpers (repeat), error normalisation, environment variables, sorting, locale header construction, and empty-value checks.

## Design

- **Stateless Pure Functions**: Every module exports one or more pure functions with no side effects, no I/O, and no React dependencies. They transform inputs deterministically.
- **Single-Responsibility Modules**: Each file addresses exactly one concern (e.g. `money.ts` — currency formatting, `sort-products.ts` — client-side product sorting, `isEmpty.ts` — value emptiness checks).
- **Lodash Usage**: `compare-addresses.ts` uses lodash `isEqual` and `pick` for deep comparison of address shapes.

## Modules

| File | Exports | Behaviour |
|---|---|---|
| **compare-addresses.ts** | `compareAddresses(address1, address2)` | Picks address sub-fields (`first_name`, `last_name`, `address_1`, `company`, `postal_code`, `city`, `country_code`, `province`, `phone`) from both objects and performs a deep equality check via lodash `isEqual`. |
| **env.ts** | `getBaseURL()` | Returns `NEXT_PUBLIC_BASE_URL` or defaults to `https://localhost:9001`. |
| **get-locale-header.ts** | `getLocaleHeader()` | Reads the current locale from `@lib/data/locale-actions` `getLocale()` and returns a `{ "x-medusa-locale": locale }` record for injecting into Medusa SDK requests. |
| **get-percentage-diff.ts** | `getPercentageDiff(original, calculated)` | Computes `((original - calculated) / original) * 100` and returns the result as a fixed-point string via `toFixed()`. Used to display discount percentages. |
| **get-product-price.ts** | `getPricesForVariant(variant)`, `getProductPrice({ product, variantId? })` | Extracts calculated price info (`calculated_amount`, `original_amount`, `currency_code`, `price_type`) from a variant's `calculated_price` block, formats amounts via `convertToLocale`, and computes discount percentage. `getProductPrice` also determines the cheapest variant across all variants or a specific variant by ID/SKU. |
| **isEmpty.ts** | `isObject(input)`, `isArray(input)`, `isEmpty(input)` | Checks whether a value is null, undefined, an empty object, an empty array, or an empty/whitespace-only string. |
| **medusa-error.ts** | `medusaError(error)` | Normalises Medusa SDK HTTP errors: logs the URL, response data, status, and headers, then throws a new `Error` with a capitalised message extracted from the response body. Handles network errors (no response) and setup errors separately. |
| **money.ts** | `convertToLocale({ amount, currency_code, minimumFractionDigits?, maximumFractionDigits?, locale? })` | Formats a minor-unit amount using `Intl.NumberFormat` with `style: "currency"`. Consults `noDivisionCurrencies` (from `constants.tsx`) — not used for division here (the backend returns amounts already in the proper unit). Defaults to `"en-US"` locale. |
| **product.ts** | `isSimpleProduct(product)` | Returns `true` if the product has exactly one option with exactly one value (i.e. no variant choices — buy now with single configuration). |
| **repeat.ts** | `repeat(times)` | Returns an array `[0, 1, ..., times-1]` for generating placeholder/skeleton UI elements. |
| **sort-products.ts** | `sortProducts(products, sortBy)` | Client-side product sorter used until the Medusa store API supports sort-by-price. Precomputes `_minPrice` on each product (from `variants[].calculated_price.calculated_amount`), then sorts ascending or descending. For `"created_at"`, sorts by `created_at` descending. |

## Integration

- **Consumed by**: All `data/` modules (`cart.ts`, `products.ts`), `src/modules/` (product display, cart, checkout, store pages), and `src/app/` route handlers.
- **Dependencies**: `lodash` (`isEqual`, `pick`), `@medusajs/types` (`HttpTypes`), `@lib/data/locale-actions` (for `get-locale-header.ts`), `@lib/constants` (`noDivisionCurrencies`), `@modules/store/components/refinement-list/sort-products` (for `SortOptions` type).
