# goya-merch-backend/apps/storefront/src/lib/context/

## Responsibility

Provides a single React Context Provider (`ModalProvider`) and its associated consumer hook (`useModal`) for components nested inside modal overlays to invoke a close callback.

## Design

- **React Context Provider Pattern**: `ModalContext` is created with `createContext` typed to `{ close: () => void }`. The `ModalProvider` component accepts a `close` callback as a prop and exposes it to all descendants via context value.
- **Named Export Consumer Hook**: `useModal` calls `useContext(ModalContext)` and throws a descriptive error if used outside a `ModalProvider`, enforcing correct usage boundaries.
- **Client Component**: The module uses the `"use client"` directive because it relies on React context and hooks.

## Flow

1. A parent component (typically a modal wrapper) renders `<ModalProvider close={handleClose}>`.
2. Any descendant component calls `useModal()` to obtain the `close` function.
3. Calling `close()` triggers the callback provided at the provider level, closing the modal.

## Integration

- **Consumed by**: Modal UI components in `src/modules/` (e.g. checkout address modals, account address edit/add modals) that need a programmatic close mechanism.
- **Dependencies**: React (`createContext`, `useContext`, `ReactNode`).
