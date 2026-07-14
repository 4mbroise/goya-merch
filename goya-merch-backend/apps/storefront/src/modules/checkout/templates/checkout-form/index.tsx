import { listCartShippingMethods } from "@lib/data/fulfillment"
import { listCartPaymentMethods } from "@lib/data/payment"
import { HttpTypes } from "@medusajs/types"
import Addresses from "@modules/checkout/components/addresses"
import Payment from "@modules/checkout/components/payment"
import Review from "@modules/checkout/components/review"
import Shipping from "@modules/checkout/components/shipping"
import { Text, Button } from "@modules/common/components/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default async function CheckoutForm({
  cart,
  customer,
}: {
  cart: HttpTypes.StoreCart | null
  customer: HttpTypes.StoreCustomer | null
}) {
  if (!cart) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4">
        <Text>Impossible de charger le paiement. Veuillez rafraîchir la page ou retourner au panier.</Text>
        <LocalizedClientLink
          href="/cart"
          className="inline-flex gap-2 items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-editorial-black text-white hover:bg-editorial-ink h-10 px-4"
        >
          Retour au panier
        </LocalizedClientLink>
      </div>
    )
  }

  const shippingMethods = await listCartShippingMethods(cart.id)
  const paymentMethods = await listCartPaymentMethods(cart.region?.id ?? "")

  if (!shippingMethods || !paymentMethods) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4">
        <Text>Impossible de charger le paiement. Veuillez rafraîchir la page ou retourner au panier.</Text>
        <LocalizedClientLink
          href="/cart"
          className="inline-flex gap-2 items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-editorial-black text-white hover:bg-editorial-ink h-10 px-4"
        >
          Retour au panier
        </LocalizedClientLink>
      </div>
    )
  }

  return (
    <div className="w-full grid grid-cols-1 gap-y-8">
      <Addresses cart={cart} customer={customer} />

      <Shipping cart={cart} availableShippingMethods={shippingMethods} />

      <Payment cart={cart} availablePaymentMethods={paymentMethods} />

      <Review cart={cart} />
    </div>
  )
}
