# goya-merch-backend/apps/storefront/src/lib/

## Responsibility

Central client library for the GOYA Merch storefront. Initialises the Medusa JS SDK with environment configuration, provides the shared data-access layer for all backend interactions, and exposes reusable React context providers, custom hooks, and pure utility functions consumed by page templates and UI components.

## Design

- **SDK Singleton**: The Medusa JS SDK (`@medusajs/js-sdk`) is instantiated once in `config.ts` with base URL, publishable key, and debug settings. The SDK's `fetch` method is decorated to inject the `x-medusa-locale` header automatically on every request.
- **Server Action Pattern**: All data modules in `data/` are `"use server"` — they run exclusively on the server and are invoked directly from Server Components or via form actions. They use `next/cache` (`revalidateTag`, `force-cache`) for cache management.
- **Cookie-based Session**: Auth tokens, cart ID, locale preference, and cache-scoping IDs are stored in HTTP-only cookies via `cookies.ts` and read by every data module.
- **React Context Provider**: The `context/` folder contains a single React Context Provider (`ModalProvider`) for modal close behaviour.
- **Custom Hooks**: The `hooks/` folder holds two generic React hooks (`useIntersection`, `useToggleState`) that encapsulate interaction-state logic.
- **Pure Utilities**: The `util/` folder contains stateless helper functions (formatting, comparison, sorting, math) with no server-side dependencies.

## Child directories

| Folder | Role |
|---|---|
| `config.ts` | Initialises the Medusa JS SDK singleton; decorates `sdk.client.fetch` to inject locale headers. |
| `constants.tsx` | Payment provider icon/title map, provider-type predicates (`isStripeLike`, `isPaypal`, `isManual`), and a list of zero-decimal currencies. |
| `context/` | React Context Provider (`ModalProvider`) for managing modal close callbacks. |
| `data/` | Server-side data-access functions wrapping the Medusa SDK — cart, customer, products, orders, regions, categories, collections, fulfillment, payment, locales, and onboarding. All modules are `"use server"`. |
| `hooks/` | Client-side React hooks (`useIntersection`, `useToggleState`) for scroll-based visibility and boolean state toggling. |
| `util/` | Pure utility functions for address comparison, money formatting, price calculation, locale headers, error handling, product inspection, sorting, and environment config. |
