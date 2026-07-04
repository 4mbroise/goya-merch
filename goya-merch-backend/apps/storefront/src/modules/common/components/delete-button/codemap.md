# goya-merch-backend/apps/storefront/src/modules/common/components/delete-button/

## Responsibility

An action button that removes a cart line item via the Medusa API. Shows a trash icon normally and a spinner while the delete request is in flight.

## Design

Calls `deleteLineItem(id)` from `@lib/data/cart` on click. Manages its own `isDeleting` boolean state to toggle between `Trash` and `Spinner` icons (both from `@medusajs/icons`). On error, resets `isDeleting` to false so the user can retry. Children are rendered as button label text.

## Props

```ts
{
  id: string                     // line item ID to delete
  children?: React.ReactNode     // button label text (e.g., "Remove")
  className?: string             // additional wrapper classes
}
```

## Integration

Used in the Cart module's line-item rows. Directly couples to `@lib/data/cart` for the API call.
