# goya-merch-backend/apps/storefront/src/modules/store/

## Responsibility
Implements the main store (/store) page with a paginated product grid, sort refinement, and pagination controls. Also serves as the shared pagination + refinement engine used by categories and collections templates.

## Design
Module root — contains `components/` (leaf building blocks: Pagination, RefinementList, SortProducts) and `templates/` (page-level composition: StoreTemplate, PaginatedProducts).

## Flow
The store page route or a category/collection template passes sort params, page number, and country code. `PaginatedProducts` fetches data server-side; `Pagination` and `RefinementList` are client components that update URL search params.

## Integration
- Consumed by `apps/storefront/src/app/[countryCode]/(main)/store/page.tsx`
- `PaginatedProducts` is also consumed by `categories/templates` and `collections/templates`
- Children: `components/`, `templates/`
