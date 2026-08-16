"use client"

import { Dialog, Transition } from "@headlessui/react"
import { HttpTypes } from "@medusajs/types"
import { Button } from "@modules/common/components/ui"
import DeleteButton from "@modules/common/components/delete-button"
import LineItemOptions from "@modules/common/components/line-item-options"
import LineItemPrice from "@modules/common/components/line-item-price"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "@modules/products/components/thumbnail"
import { usePathname } from "next/navigation"
import { Fragment, useEffect, useRef, useState } from "react"
import X from "@modules/common/icons/x"
import { clx } from "@modules/common/components/ui"
import { convertToLocale } from "@lib/util/money"
import { useTranslations } from "next-intl"

const CartDrawer = ({
  cart: cartState,
}: {
  cart?: HttpTypes.StoreCart | null
}) => {
  const t = useTranslations()
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false)

  const open = () => setCartDrawerOpen(true)
  const close = () => setCartDrawerOpen(false)

  const totalItems =
    cartState?.items?.reduce((acc, item) => {
      return acc + item.quantity
    }, 0) || 0

  const subtotal = cartState?.subtotal ?? 0
  const itemRef = useRef<number>(totalItems || 0)

  const pathname = usePathname()

  // Open cart drawer when modifying cart items, but only if we're not on the cart page
  useEffect(() => {
    if (itemRef.current !== totalItems && !pathname.includes("/cart")) {
      open()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalItems, itemRef.current])

  return (
    <Transition show={cartDrawerOpen} as={Fragment}>
      <Dialog as="div" className="relative z-[75]" onClose={close}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-700 bg-opacity-75 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0">
          <div className="fixed bottom-0 inset-x-0 top-auto">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-full"
              enterTo="opacity-100 translate-y-0"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-full"
            >
              <Dialog.Panel
                className="w-full bg-editorial-cream border-t border-editorial-border max-h-[85vh] flex flex-col"
                data-testid="cart-drawer"
              >
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-editorial-border">
                  <h3 className="text-large-semi">{t("cart.cart")}</h3>
                  <button
                    onClick={close}
                    className="p-2 hover:opacity-70 transition-opacity"
                    data-testid="close-cart-drawer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto">
                  {cartState && cartState.items?.length ? (
                    <div className="grid grid-cols-1 gap-y-6 p-4">
                      {cartState.items
                        .sort((a, b) => {
                          return (a.created_at ?? "") > (b.created_at ?? "")
                            ? -1
                            : 1
                        })
                        .map((item) => (
                          <div
                            className="grid grid-cols-[80px_1fr] gap-x-3"
                            key={item.id}
                            data-testid="cart-item"
                          >
                            <LocalizedClientLink
                              href={`/products/${item.product_handle}`}
                              onClick={close}
                              className="w-20"
                            >
                              <Thumbnail
                                thumbnail={item.thumbnail}
                                images={item.variant?.product?.images}
                                size="square"
                                alt={item.title}
                              />
                            </LocalizedClientLink>
                            <div className="flex flex-col justify-between flex-1">
                              <div className="flex flex-col flex-1">
                                <div className="flex items-start justify-between">
                                  <div className="flex flex-col overflow-ellipsis whitespace-nowrap mr-2 w-[140px]">
                                    <h3 className="text-base-regular overflow-hidden text-ellipsis">
                                      <LocalizedClientLink
                                        href={`/products/${item.product_handle}`}
                                        onClick={close}
                                        data-testid="product-link"
                                      >
                                        {item.title}
                                      </LocalizedClientLink>
                                    </h3>
                                    <LineItemOptions
                                      variant={item.variant}
                                      data-testid="cart-item-variant"
                                      data-value={item.variant}
                                    />
                                    <span
                                      data-testid="cart-item-quantity"
                                      data-value={item.quantity}
                                    >
                                      {t("cart.quantityItem", { quantity: item.quantity })}
                                    </span>
                                  </div>
                                  <div className="flex justify-end">
                                    <LineItemPrice
                                      item={item}
                                      style="tight"
                                      currencyCode={cartState.currency_code}
                                    />
                                  </div>
                                </div>
                              </div>
                              <DeleteButton
                                id={item.id}
                                className="mt-1 self-start"
                                data-testid="cart-item-remove-button"
                              >
                                Remove
                              </DeleteButton>
                            </div>
                          </div>
                        ))}
                    </div>
                  ) : (
                    <div className="flex flex-col gap-y-4 items-center justify-center py-16 px-4">
                      <div className="bg-gray-900 text-small-regular flex items-center justify-center w-6 h-6 rounded-full text-white">
                        <span>0</span>
                      </div>
                      <span>{t("cart.yourBagIsEmpty")}</span>
                      <LocalizedClientLink
                        href="/store"
                        onClick={close}
                        className={clx(
                          "inline-flex gap-2 items-center justify-center rounded-md font-medium transition-colors",
                          "bg-black text-white hover:bg-gray-800 h-10 px-4 text-small-regular"
                        )}
                      >
                        Explore products
                      </LocalizedClientLink>
                    </div>
                  )}
                </div>

                {/* Footer */}
                {cartState && cartState.items?.length ? (
                  <div className="p-4 border-t border-editorial-border flex flex-col gap-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-editorial-fg font-semibold text-small-regular">
                        Subtotal{" "}
                        <span className="font-normal">(excl. taxes)</span>
                      </span>
                      <span
                        className="text-large-semi"
                        data-testid="cart-subtotal"
                        data-value={subtotal}
                      >
                        {convertToLocale({
                          amount: subtotal,
                          currency_code: cartState.currency_code,
                        })}
                      </span>
                    </div>
                    <LocalizedClientLink
                      href="/cart"
                      onClick={close}
                      passHref
                      className={clx(
                        "inline-flex gap-2 items-center justify-center rounded-md font-medium transition-colors",
                        "bg-black text-white hover:bg-gray-800 h-12 px-6 text-lg w-full text-center"
                      )}
                      data-testid="go-to-cart-button"
                    >
                      Go to cart
                    </LocalizedClientLink>
                  </div>
                ) : null}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default CartDrawer
