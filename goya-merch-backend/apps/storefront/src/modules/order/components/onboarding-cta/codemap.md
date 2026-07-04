# goya-merch-backend/apps/storefront/src/modules/order/components/onboarding-cta/

## Responsibility

Provides a one-time call-to-action displayed only during Medusa store onboarding. After a test order is placed, it prompts the merchant to complete setup in the admin panel.

## Design

Client component (`"use client"`) that conditionally renders inside `OrderCompletedTemplate` when the `_medusa_onboarding` cookie is `"true"`. Shows a success message and a button calling `resetOnboardingState(orderId)`, which clears the cookie and redirects to the admin order detail page at `http://localhost:7001/a/orders/{orderId}`.

## Flow

**Props in**: `orderId` (string).  
**Events out**: `onClick` on the "Complete setup in admin" button calls `resetOnboardingState(orderId)` — a server action that deletes the cookie and issues a `redirect()`.  
**Data calls**: `@lib/data/onboarding` — `resetOnboardingState`.

## Integration

- Consumed by: `@modules/order/templates/order-completed-template`
- Dependencies: `@modules/common/components/ui` (Button, Container, Text)
- Data layer: `@lib/data/onboarding`
- External route: `http://localhost:7001/a/orders/{orderId}` (admin panel)
