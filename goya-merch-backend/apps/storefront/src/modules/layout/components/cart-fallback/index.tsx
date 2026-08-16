"use client"

import { useTranslations } from "next-intl"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default function CartFallback() {
  const t = useTranslations()

  return (
    <LocalizedClientLink
      className="hover:text-editorial-ink flex gap-2"
      href="/cart"
      data-testid="nav-cart-link"
    >
      {t("nav.cart")} (0)
    </LocalizedClientLink>
  )
}
