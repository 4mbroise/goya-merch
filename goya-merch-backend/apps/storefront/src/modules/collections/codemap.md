# goya-merch-backend/apps/storefront/src/modules/collections/

## Responsibility
Implements the collection listing page, displaying a single collection title and its paginated product grid with sort refinement.

## Design
Module root — contains a single `templates/` folder with the `CollectionTemplate` composition component.

## Flow
The page route passes the resolved `HttpTypes.StoreCollection`, sort option, page number, and country code to the template.

## Integration
- Consumed by `apps/storefront/src/app/[countryCode]/(main)/collections/[collectionHandle]/page.tsx`
- Children: `templates/`
