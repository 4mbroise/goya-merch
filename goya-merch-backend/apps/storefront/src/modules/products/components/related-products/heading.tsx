"use client"

import { useTranslations } from "next-intl"

export default function RelatedProductsHeading() {
  const t = useTranslations()

  return (
    <>
      <span className="text-base-regular text-gray-600 mb-6">
        {t("product.relatedProducts")}
      </span>
      <p className="text-2xl-regular text-ui-fg-base max-w-lg">
        {t("product.relatedProducts")}
      </p>
    </>
  )
}
