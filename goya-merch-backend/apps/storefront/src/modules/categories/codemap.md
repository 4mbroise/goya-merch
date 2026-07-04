# goya-merch-backend/apps/storefront/src/modules/categories/

## Responsibility
Implements the category listing page, displaying a single product category with its breadcrumb trail, description, sub-category links, and a paginated product grid.

## Design
Module root — contains a single `templates/` folder with the `CategoryTemplate` composition component.

## Flow
The page route passes the resolved `HttpTypes.StoreProductCategory`, sort option, page number, and country code to the template.

## Integration
- Consumed by `apps/storefront/src/app/[countryCode]/(main)/categories/[categoryHandle]/page.tsx`
- Children: `templates/`
