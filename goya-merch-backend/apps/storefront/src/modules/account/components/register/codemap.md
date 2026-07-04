# goya-merch-backend/apps/storefront/src/modules/account/components/register/

## Responsibility
Customer registration form for creating a new GOYA Member account. Collects first name, last name, email, phone, and password.

## Design
Client component (`"use client"`). Uses `useActionState` with `signup` from `@lib/data/customer`. Provides links to Privacy Policy and Terms of Use pages. Includes a toggle to switch back to the sign-in view.

## Flow
**Props in**: `setCurrentView: (view: LOGIN_VIEW) => void`.

**Form fields**: first_name, last_name, email (type=email), phone (type=tel), password (type=password) — all required except phone.

**Submission**: Calls `signup` via `useActionState`. On error, the returned message is passed to `<ErrorMessage>` for display.

**Navigation**: 
- "Already a member? Sign in." button calls `setCurrentView(LOGIN_VIEW.SIGN_IN)`.
- Privacy Policy link → `/content/privacy-policy`
- Terms of Use link → `/content/terms-of-use`

## Integration
- Used by: `LoginTemplate` (`../templates/login-template.tsx`).
- Data function: `signup` from `@lib/data/customer`.
- Dependencies: `SubmitButton` from `@modules/checkout/components/submit-button`, `Input` from `@modules/common/components/input`, `ErrorMessage` from `@modules/checkout/components/error-message`, `LocalizedClientLink`.
