# goya-merch-backend/apps/storefront/src/app/[countryCode]/(main)/account/@login/

## Responsibility

Authentication page shown to unauthenticated users at the `/account` URL. Renders the login/sign-up form as a single-page component.

## Design

- **Parallel Route slot** `@login` — rendered only when no customer session exists (see parent `account/layout.tsx`).
- **Server Component** (no async data fetching needed — form is client-interactive).
- Delegates entirely to `LoginTemplate` from `@modules/account/templates/login-template`.

## Flow

1. Renders `<LoginTemplate />`.
2. `LoginTemplate` handles both sign-in and registration UI; on success it triggers a router refresh to re-evaluate the customer session, causing `account/layout.tsx` to show `@dashboard` instead.

## Integration

- Template: `LoginTemplate` from `@modules/account/templates/login-template`.
