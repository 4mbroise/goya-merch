# goya-merch-backend/apps/storefront/src/modules/order/components/shipping-details/

## Responsibility

Renders the shipping information for an order: shipping address (name, street, postal code, city, country), contact details (phone, email), and the selected shipping method with its cost.

## Design

Presentational component accepting `HttpTypes.StoreOrder`. Layout uses a three-column flex grid displaying Address, Contact, and Method sections. Shipping method name is accessed via a type assertion `(order.shipping_methods?.[0] as { name?: string })?.name`. Shipping cost is formatted through `convertToLocale`. Each section is wrapped in a div with a `data-testid` attribute for testing. A `Divider` separates the section from subsequent content.

## Flow

**Props in**: `order` (HttpTypes.StoreOrder).  
**Events out**: None.  
**Data calls**: None.

## Integration

- Consumed by: `OrderCompletedTemplate` and `OrderDetailsTemplate`
- Dependencies: `@modules/common/components/ui` (Heading, Text), `@modules/common/components/divider`, `@lib/util/money`
- Test hooks: `data-testid="shipping-address-summary"`, `data-testid="shipping-contact-summary"`, `data-testid="shipping-method-summary"`
