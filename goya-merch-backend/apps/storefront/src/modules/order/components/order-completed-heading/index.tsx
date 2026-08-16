"use client"

import { Heading } from "@modules/common/components/ui"
import { useTranslations } from "next-intl"

export default function OrderCompletedHeading() {
  const t = useTranslations()

  return (
    <Heading
      level="h1"
      className="flex flex-col gap-y-3 text-ui-fg-base text-3xl mb-4"
    >
      <span>{t("order.thankYou")}</span>
      <span>{t("order.orderPlacedSuccessfully")}</span>
    </Heading>
  )
}
