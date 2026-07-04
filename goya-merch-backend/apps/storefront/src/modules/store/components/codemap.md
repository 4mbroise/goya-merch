# goya-merch-backend/apps/storefront/src/modules/store/components/

## Responsibility
Houses client-side interactive leaf components used across product listing pages: pagination controls, sort refinement, and the sort-products radio group.

## Design
Presentational component folder — each child is a self-contained client component in its own subdirectory with an `index.tsx` entry. Both use Next.js navigation hooks (`useRouter`, `usePathname`, `useSearchParams`) for URL-based state management.

## Flow
No shared state. Parent templates pass props (current sort, page) and callback functions (`setQueryParams`) for URL updates.

## Integration
- Children: `pagination/`, `refinement-list/`
