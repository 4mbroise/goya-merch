# goya-merch-backend/apps/storefront/src/lib/data/

## Responsibility

Server-side data-access layer that wraps the Medusa JS SDK to communicate with the Medusa backend (port 9000). Every module is a `"use server"` module that exposes async functions consumed by Server Components, App Router page templates, and form actions. The layer owns all cache-tag revalidation, authentication header injection, and cookie-based session identity.

## Design

- **Server Action / Server Function Pattern**: All exports are `"use server"` async functions. They execute exclusively on the server, read cookies via `next/headers`, and use `next/cache` (`revalidateTag`, `force-cache`) for granular cache invalidation.
- **Gateway / DAO**: Each data module acts as a thin gateway: it receives structured inputs, constructs a Medusa SDK call (either the typed `sdk.store.*` sub-client or a raw `sdk.client.fetch`), transforms the response, and handles errors via the `medusaError` utility.
- **Cookie-based Identity**: Auth tokens (`_medusa_jwt`), cart ID (`_medusa_cart_id`), locale (`_medusa_locale`), and cache-scope ID (`_medusa_cache_id`) are read from HTTP-only cookies. Every SDK call that requires authentication passes `getAuthHeaders()` as HTTP headers.
- **Cache-scoped Tags**: `getCacheOptions(tag)` produces Next.js cache tags scoped to the current cache ID, enabling per-session cache isolation. `revalidateTag()` is called after every mutating operation.
- **Raw fetch for read-heavy endpoints**: Modules like `categories.ts`, `collections.ts`, `products.ts`, `regions.ts`, `fulfillment.ts`, `payment.ts`, `locales.ts`, and `variants.ts` use `sdk.client.fetch` directly (raw REST) rather than the typed sub-clients, because the typed SDK does not expose all required fields and query parameters.

## Flow

1. A Server Component or form action calls a data module function (e.g. `listProducts({ countryCode: "fr" })`).
2. The function reads cookies via `getAuthHeaders()` and `getCacheOptions()` to obtain auth headers and Next.js cache tags.
3. The function constructs a Medusa SDK call — either a typed method (`sdk.store.cart.create`, `sdk.store.customer.update`, etc.) or a raw `sdk.client.fetch` against `/store/*` REST endpoints.
4. The `sdk.client.fetch` (decorated in `config.ts`) automatically appends the `x-medusa-locale` header from the current locale cookie.
5. On success, the response is unwrapped (e.g. `.then(({ cart }) => cart)`) and returned.
6. On mutation success, the relevant cache tags (`"carts"`, `"products"`, `"customers"`, etc.) are revalidated.
7. On error, `medusaError` extracts the response payload and throws a formatted error message.
8. The caller (Server Component) receives plain data objects that can be serialised to the client.

## Modules and SDK Operations

| Module | Functions | SDK / REST Calls |
|---|---|---|
| **cart.ts** | `retrieveCart`, `getOrSetCart`, `updateCart`, `addToCart`, `updateLineItem`, `deleteLineItem`, `setShippingMethod`, `initiatePaymentSession`, `applyPromotions`, `submitPromotionForm`, `setAddresses`, `placeOrder`, `updateRegion`, `listCartOptions` | `sdk.client.fetch GET /store/carts/:id`, `sdk.store.cart.create`, `sdk.store.cart.update`, `sdk.store.cart.createLineItem`, `sdk.store.cart.updateLineItem`, `sdk.store.cart.deleteLineItem`, `sdk.store.cart.addShippingMethod`, `sdk.store.payment.initiatePaymentSession`, `sdk.store.cart.complete`, `sdk.client.fetch GET /store/shipping-options?cart_id=` |
| **categories.ts** | `listCategories`, `getCategoryByHandle` | `sdk.client.fetch GET /store/product-categories` |
| **collections.ts** | `retrieveCollection`, `listCollections`, `getCollectionByHandle` | `sdk.client.fetch GET /store/collections/:id`, `GET /store/collections` |
| **cookies.ts** | `getAuthHeaders`, `getCacheTag`, `getCacheOptions`, `setAuthToken`, `removeAuthToken`, `getCartId`, `setCartId`, `removeCartId` | No SDK calls. Reads/writes `next/headers` cookies (`_medusa_jwt`, `_medusa_cache_id`, `_medusa_cart_id`). |
| **customer.ts** | `retrieveCustomer`, `updateCustomer`, `signup`, `login`, `signout`, `transferCart`, `addCustomerAddress`, `deleteCustomerAddress`, `updateCustomerAddress` | `sdk.client.fetch GET /store/customers/me`, `sdk.store.customer.update`, `sdk.store.customer.create`, `sdk.store.customer.createAddress`, `sdk.store.customer.deleteAddress`, `sdk.store.customer.updateAddress`, `sdk.store.cart.transferCart`, `sdk.auth.register`, `sdk.auth.login`, `sdk.auth.logout` |
| **fulfillment.ts** | `listCartShippingMethods`, `calculatePriceForShippingOption` | `sdk.client.fetch GET /store/shipping-options?cart_id=`, `POST /store/shipping-options/:id/calculate` |
| **locale-actions.ts** | `getLocale`, `setLocaleCookie`, `updateLocale` | `sdk.store.cart.update` (to set locale on cart), reads/writes `_medusa_locale` cookie via `next/headers` |
| **locales.ts** | `listLocales` | `sdk.client.fetch GET /store/locales` |
| **onboarding.ts** | `resetOnboardingState` | No Medusa SDK. Writes `_medusa_onboarding` cookie and redirects to admin. |
| **orders.ts** | `retrieveOrder`, `listOrders`, `createTransferRequest`, `acceptTransferRequest`, `declineTransferRequest` | `sdk.client.fetch GET /store/orders/:id`, `GET /store/orders`, `sdk.store.order.requestTransfer`, `sdk.store.order.acceptTransfer`, `sdk.store.order.declineTransfer` |
| **payment.ts** | `listCartPaymentMethods` | `sdk.client.fetch GET /store/payment-providers?region_id=` |
| **products.ts** | `listProducts`, `listProductsWithSort` | `sdk.client.fetch GET /store/products` (includes region_id filter, pagination, field selection) |
| **regions.ts** | `listRegions`, `retrieveRegion`, `getRegion` | `sdk.client.fetch GET /store/regions`, `GET /store/regions/:id`. An in-memory `regionMap` cache avoids repeated fetches by country code. |
| **variants.ts** | `retrieveVariant` | `sdk.client.fetch GET /store/product-variants/:id` |

## Integration

- **Consumed by**: `src/modules/` (cart, checkout, store, account, order, collection templates), `src/app/` route handlers and Server Components, `src/middleware.ts`.
- **Dependencies**: `@lib/config` (the Medusa SDK singleton), `@lib/util/medusa-error`, `@lib/util/sort-products`, `@medusajs/types` for TypeScript types, `next/cache` (`revalidateTag`), `next/headers` (`cookies`), `next/navigation` (`redirect`).
- **Cache Coherence**: Mutations in `cart.ts`, `customer.ts`, and `locale-actions.ts` explicitly revalidate the tags of dependent modules (`"carts"`, `"fulfillment"`, `"customers"`, `"products"`, `"categories"`, `"collections"`) to keep Server Component data fresh.
