# goya-merch-backend/apps/storefront/src/modules/store/components/pagination/

## Responsibility
Renders a page-number navigation bar for product listing pages, with ellipsis truncation for large page counts.

## Design
Client Component (`"use client"`) — uses `useRouter`, `usePathname`, and `useSearchParams` to update the `page` query parameter. Employs a pagination algorithm that shows all pages when `totalPages <= 7`, otherwise uses an abbreviated layout with ellipsis markers.

## Flow
- **Props in**: `page: number`, `totalPages: number`, `'data-testid'?: string`
- **Events**: Clicking a page button calls `handlePageChange(newPage)` → constructs `URLSearchParams` → `router.push()` with updated `page` param
- **Branches**: Algorithm handles three cases — early pages (1-5 + ... + last), late pages (1 + ... + last-4 to last), and middle (1 + ... + nearby + ... + last)

## Integration
- `next/navigation` (`useRouter`, `usePathname`, `useSearchParams`)
- `@modules/common/components/ui` (`clx`)
- Consumed by `PaginatedProducts` template
