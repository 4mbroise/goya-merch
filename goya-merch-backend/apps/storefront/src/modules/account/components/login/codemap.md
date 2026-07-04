# goya-merch-backend/apps/storefront/src/modules/account/components/login/

## Responsibility
Sign-in form that authenticates a customer via email/password. Provides a link to switch to the registration view.

## Design
Server-action-driven form using `useActionState`. Receives a `setCurrentView` callback to allow the parent `LoginTemplate` to toggle between login and register views. Uses `ErrorMessage` to display server-side authentication errors.

## Flow
**Props in**: `setCurrentView: (view: LOGIN_VIEW) => void`.

**Form fields**: Email (type=email, required), Password (type=password, required).

**Submission**: Calls `login` from `@lib/data/customer` via `useActionState`. On error, the returned message is passed to `<ErrorMessage>` for display.

**Navigation**: A "Not a member? Join us." button calls `setCurrentView(LOGIN_VIEW.REGISTER)` to switch to the register view.

## Integration
- Used by: `LoginTemplate` (`../templates/login-template.tsx`).
- Data function: `login` from `@lib/data/customer`.
- Dependencies: `SubmitButton` from `@modules/checkout/components/submit-button`, `Input` from `@modules/common/components/input`, `ErrorMessage` from `@modules/checkout/components/error-message`.
