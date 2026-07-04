# goya-merch-backend/apps/storefront/src/modules/products/components/product-onboarding-cta/

## Responsibility

Displays a post-setup onboarding success banner on the product detail page when the Medusa onboarding flow is active. Shown only when the `_medusa_onboarding` cookie is set to `"true"`.

## Design

- **Async server component** -- reads cookies via `next/headers` (`cookies()`) to check the onboarding flag.
- **Early return pattern** -- returns `null` when the cookie is absent or not `"true"`, producing zero DOM output.
- **Container/Text/Button composition** -- renders a centered `Container` with a success message and a link to the admin panel at `http://localhost:7001/a/orders` with the onboarding step query parameter.

## Flow

1. Reads `_medusa_onboarding` cookie from the incoming request.
2. If cookie is not `"true"`, returns `null` (no render).
3. Otherwise, renders a `Container` with a success heading, instructional text, and an anchor-styled `<Button>` linking to the admin setup continuation URL.

## Integration

- **Common components**: `Button`, `Container`, `Text` from `@modules/common/components/ui`
- **Next.js**: `next/headers` (`cookies`)
- **Consumed by**: `templates/index.tsx` (ProductTemplate), rendered in the right column on the product detail page
