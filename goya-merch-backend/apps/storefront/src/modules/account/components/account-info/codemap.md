# goya-merch-backend/apps/storefront/src/modules/account/components/account-info/

## Responsibility
Reusable disclosure-based wrapper that renders a profile field label and its current value, then toggles to reveal an edit form with save/cancel controls. Handles success and error feedback display.

## Design
Presentational component. Uses `@headlessui/react` `Disclosure` panels with static rendering and Tailwind `max-h`/`opacity` transitions to animate between display, success, error, and edit states. Accepts `children` for the edit form slot.

## Flow
**Props in**: `label` (field name), `currentInfo` (string or ReactNode), `isSuccess`/`isError` booleans, `errorMessage`, `clearState` callback, optional `children` (edit form), `data-testid`.

**Behavior**: 
- Default state shows label + current value + "Edit" button.
- Clicking Edit calls `clearState()`, then after 100ms toggles to show `children` edit form + "Save changes" submit + "Cancel" button.
- On `isSuccess === true` → auto-closes edit panel and shows green success badge.
- On `isError === true` → shows red error badge with `errorMessage`.
- `useFormStatus().pending` drives the submit button loading spinner.

## Integration
- Used by: `ProfileName`, `ProfileEmail`, `ProfilePhone`, `ProfilePassword`, `ProfileBillingAddress` — each wraps its form fields inside `<AccountInfo>`.
- Depends on `@modules/common/components/ui` (Button, Badge, clx) and `@lib/hooks/use-toggle-state`.
