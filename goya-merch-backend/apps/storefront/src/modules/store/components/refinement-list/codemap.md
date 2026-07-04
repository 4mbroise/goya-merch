# goya-merch-backend/apps/storefront/src/modules/store/components/refinement-list/

## Responsibility
Acts as the orchestration layer for product listing sort controls — wraps the `SortProducts` radio group and provides a shared URL query-string management function.

## Design
Client Component (`"use client"`) — creates a `createQueryString` callback (via `useCallback`) that merges a new `(name, value)` pair into the existing search params. Passes `setQueryParams` down to `SortProducts`.

## Flow
- **Props in**: `sortBy: SortOptions`, `search?: boolean`, `'data-testid'?: string`
- **Events**: `setQueryParams(name, value)` → builds query string → `router.push()` with updated URL
- **Children**: `SortProducts` (sub-component)

## Integration
- `next/navigation` (`useRouter`, `usePathname`, `useSearchParams`)
- `./sort-products` for the sort radio group
- Consumed by `StoreTemplate`, `CategoryTemplate`, `CollectionTemplate`
