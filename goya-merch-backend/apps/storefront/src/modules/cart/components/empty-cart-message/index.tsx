"use client"

import { Heading, Text } from "@modules/common/components/ui"
import { useTranslations } from "next-intl"

import InteractiveLink from "@modules/common/components/interactive-link"

const EmptyCartMessage = () => {
  const t = useTranslations()

  return (
    <div className="py-48 px-2 flex flex-col justify-center items-start" data-testid="empty-cart-message">
      <Heading
        level="h1"
        className="flex flex-row text-product-title text-editorial-ink gap-x-2 items-baseline"
      >
        {t("cart.emptyCartTitle")}
      </Heading>
      <Text className="text-body-editorial text-editorial-fg-subtle mt-4 mb-6 max-w-[32rem]">
        {t("cart.emptyCartDesc")}
      </Text>
      <div>
        <InteractiveLink href="/store">{t("cart.exploreProducts")}</InteractiveLink>
      </div>
    </div>
  )
}

export default EmptyCartMessage
