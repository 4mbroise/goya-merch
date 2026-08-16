"use client"

import { useTranslations } from "next-intl"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default function NavAccountLink() {
  const t = useTranslations()

  return (
    <LocalizedClientLink
      className="hover:text-editorial-ink"
      href="/account"
      data-testid="nav-account-link"
    >
      {t("nav.account")}
    </LocalizedClientLink>
  )
}
