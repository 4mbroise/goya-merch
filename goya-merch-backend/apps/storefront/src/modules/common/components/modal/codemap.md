# goya-merch-backend/apps/storefront/src/modules/common/components/modal/

## Responsibility

A full-featured modal dialog built on `@headlessui/react` Transition + Dialog. Used for checkout prompts, confirmations, and overlay panels (including search).

## Design

Renders a `Transition`-wrapped `Dialog` with backdrop blur and scale animation. Supports three sizes (`small` / `medium` / `large`) and a `search` mode that removes the white panel and shadow for a full-overlay search feel. Wraps its children in a `ModalProvider` (from `@lib/context/modal-context`) for close access. Attaches sub-components via direct assignment:

- `Modal.Title` — Dialog.Title with close (X) button
- `Modal.Description` — Dialog.Description
- `Modal.Body` — flex-centered content div
- `Modal.Footer` — right-aligned action button row

## Props

```ts
{
  isOpen: boolean
  close: () => void
  size?: "small" | "medium" | "large"     // default "medium"
  search?: boolean                         // default false
  children: React.ReactNode
  'data-testid'?: string
}
```

## Integration

Used in checkout (gift card / promo code dialogs) and search (full-overlay search panel). The sub-component pattern allows consumers to compose structured modals.
