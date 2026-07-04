# goya-merch-backend/apps/storefront/src/lib/hooks/

## Responsibility

Provides reusable React custom hooks that encapsulate common client-side interaction patterns: scroll-intersection visibility detection and boolean state toggling.

## Design

- **Custom Hook Pattern**: Both hooks follow the standard React custom hook convention — they call built-in hooks (`useState`, `useEffect`, `useRef`) internally and return derived state and callbacks.
- **Dual Destructuring Support** (`useToggleState`): The hook returns both an array `[state, open, close, toggle]` (for positional destructuring) and named properties `.state`, `.open`, `.close`, `.toggle` (for object destructuring), achieved via a typed intersection of array and object.

## Modules

| File | Export | Behaviour |
|---|---|---|
| **use-in-view.tsx** | `useIntersection(element, rootMargin)` | Accepts a `RefObject<HTMLDivElement>` and a `rootMargin` string. Uses `IntersectionObserver` to track when the element enters the viewport. Returns a boolean `isVisible`. Cleans up the observer on unmount or ref change. |
| **use-toggle-state.tsx** | `useToggleState(initialState?)` | Initialises a boolean `state` (default `false`). Returns `state`, plus `open` (sets true), `close` (sets false), and `toggle` (flips). Supports both array and object destructuring via the `StateType` labelled-tuple type. |

## Flow

- **useIntersection**: On mount, creates an `IntersectionObserver` observing the ref'd element. On intersection change, updates `isVisible`. On unmount or `element`/`rootMargin` change, disconnects the observer.
- **useToggleState**: On each render, the current `state` is returned. `open`/`close`/`toggle` are stable callbacks that update state via `setState`.

## Integration

- **Consumed by**: UI components in `src/modules/` — `useIntersection` is used for lazy-loading or scroll-triggered animations; `useToggleState` is used for modal/dropdown/menu open/close state management.
- **Dependencies**: React (`useState`, `useEffect`, `RefObject`).
