# goya-merch-backend/apps/storefront/src/modules/store/components/refinement-list/sort-products/

## Responsibility
Renders a radio-group selector for sorting the product grid by "Latest Arrivals", "Price: Low -> High", or "Price: High -> Low".

## Design
Client Component (`"use client"`) — thin wrapper around `FilterRadioGroup`. Exports the `SortOptions` type union (`"price_asc" | "price_desc" | "created_at"`) used across the store module. The three static sort options are defined as a local constant array.

## Flow
- **Props in**: `sortBy: SortOptions`, `setQueryParams: (name: string, value: SortOptions) => void`, `'data-testid'?: string`
- **Events**: `handleChange(value)` → calls `setQueryParams("sortBy", value)`
- **Data**: Static `sortOptions` array (no dynamic population)

## Integration
- `@modules/common/components/filter-radio-group` for the radio UI
- Consumed by `RefinementList`
