# Bug Fixes Log — Fees & Display

## Fix 3: Build errors — CJS/ESM mismatch, @types/react version, fulfillment access

**Date:** 2026-06-26  
**Bug ID:** `build-2026-06-26`

### Symptom
`npm run build` failed with three categories of errors:
1. **Duplicate identifier / type errors** — caused by `@types/react@19.0.5` conflicting with React 18
2. **`property "fulfillments" does not exist on OrderDTO`** — `order-shipment-created.ts` tried to access `order.fulfillments` but `retrieveOrder` returns `OrderDTO` (no fulfillment relation)
3. **`@react-pdf/renderer` ESM module cannot be compiled from CJS project** — `invoice-pdf.tsx` statically imported from an ESM-only package, causing TS compilation failures

### Root cause
1. `@types/react@19.0.5` was hoisted and used by TS for JSX types, but the project uses React 18 — type incompatibilities.
2. The subscriber used `OrderDTO` directly without selecting the `fulfillments` relation, and also referenced a `fulfillmentService` that didn't exist.
3. `@react-pdf/renderer` is ESM-only (`"type": "module"` in its package.json). The backend has no `"type": "module"` (it's CJS). Static `import` of an ESM-only package causes TS compilation errors because TS tries to resolve it at compile time.

### Fix applied
1. **Pinned @types/react** by running `npm install --force @types/react@18.3.12` in the backend directory.
2. **Fixed `order-shipment-created.ts`**:
   - Added `"fulfillments"` to the `relations` array on `retrieveOrder`
   - Used `(order as any).fulfillments` to access fulfillments (consistent with `order-placed.ts` pattern)
   - Removed reference to non-existent `fulfillmentService`
   - Changed `order.email` to `order.email!` (non-null assertion)
3. **Refactored `invoice-pdf.tsx`**:
   - Replaced static imports from `@react-pdf/renderer` with a lazy dynamic `import()` inside `getPDFRenderer()`
   - `Document`, `Page`, `Text`, `View`, `StyleSheet`, `renderToBuffer` are obtained at runtime via `await getPDFRenderer()`
   - The component `InvoiceDocument` (JSX) is defined inside the async `generateInvoicePDF` function, scoped to the dynamically imported renderer
   - The module no longer exports JSX components — only the `generateInvoicePDF` factory function and the `InvoiceData` type

### Verification
`npm run build` completes successfully:
- Backend compiled in ~6s
- Frontend compiled in ~33s
- No TypeScript errors

---

## Fix 2 (current): Revert erroneous `/100` — Medusa 2.x outputs major units

**Date:** 2026-06-26  
**Bug ID:** `money-format-div-100`

### Symptom
After Fix 1, all monetary amounts displayed **100× too small** (e.g., €0.30 instead of €30.00) across:
- **Storefront** (cart, checkout summary, order details)
- **PDF invoice** (backend email attachment)
- **Order confirmation email** (backend)

The prices were divided by 100 twice — once in the display helpers and once in the seed data (which had been stored in cents).

### Root cause
Fix 1 was based on a **false assumption**: that Medusa 2.x stores amounts in minor units (cents). In reality, **Medusa 2.x `amount` fields use major units** (e.g., `30` = €30.00). The previous contributor confused Medusa 2.x conventions with Medusa 1.x (which used cents).

Adding `/100` to display helpers while keeping seed data in cents (`3000` for €30) created a double-division effect: display showed `3000 / 100 / 100 = €0.30`.

### Fix applied (Fix 2)
1. **Removed `/100`** from all three display helpers:
   - `apps/storefront/src/lib/util/money.ts` — `convertToLocale()`
   - `apps/backend/src/modules/resend/index.ts` — `formatMoney()`
   - `apps/backend/src/modules/resend/templates/invoice-pdf.tsx` — `formatMoney()`
2. **Converted seed prices** from cents to major units in `seed-goya-catalog.ts`:
   - `3000` → `30` (T-Shirt)
   - `5500` → `55` (Hoodie)
   - `2500` → `25` (Vinyle Standard)
   - `3500` → `35` (Vinyle Numérotée)
   - `1500` → `15` (Poster)
   - `1800` → `18` (Tote Bag)

### Verification
- Display helpers now pass raw `amount` to `Intl.NumberFormat` — no division.
- Seed data matches display expectations: `amount: 30` displays as "30,00 €".
- Stripe charges remain correctly sent in cents (the Medusa Stripe provider handles conversion).

---

## Fix 1 (reverted): Money formatting — wrong assumption of cents

**Date:** 2026-06-25  
**Status:** REVERTED by Fix 2 on 2026-06-26

### Symptom (original complaint)
Prices displayed without decimal formatting — values like `3000` shown raw.

### Original fix
Added `/100` to `convertToLocale` and both `formatMoney` helpers, incorrectly assuming Medusa 2.x stores cents.

### Why it was wrong
Medusa 2.x stores monetary amounts in **major units** for display fields. The raw display of `3000` was actually a different bug (locale formatting missing), not a unit mismatch.

### What was reverted
All `/100` divisions removed from display helpers.

---

## Authoritative convention (as of Fix 2)
- **Medusa 2.x `amount` in API responses**: major units (e.g., `30` = €30.00)
- **Display helpers**: pass raw `amount` to `Intl.NumberFormat` — **no division by 100**
- **Seed data**: use major units (e.g., `amount: 30`)
- **Stripe charges**: sent in cents (Stripe API requirement) — handled internally by `@medusajs/payment-stripe` provider
- **Invoice DB model**: stores amounts as received from Medusa (major units)