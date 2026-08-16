"use client"

import FilterRadioGroup from "@modules/common/components/filter-radio-group"
import { useTranslations } from "next-intl"

export type SortOptions = "price_asc" | "price_desc" | "created_at"

type SortProductsProps = {
  sortBy: SortOptions
  setQueryParams: (name: string, value: SortOptions) => void
  "data-testid"?: string
}

const sortOptions = (t: ReturnType<typeof useTranslations>) => [
  {
    value: "created_at",
    label: t("store.latestArrivals"),
  },
  {
    value: "price_asc",
    label: t("store.priceLowToHigh"),
  },
  {
    value: "price_desc",
    label: t("store.priceHighToLow"),
  },
]

const SortProducts = ({
  "data-testid": dataTestId,
  sortBy,
  setQueryParams,
}: SortProductsProps) => {
  const t = useTranslations()
  const handleChange = (value: string) => {
    setQueryParams("sortBy", value as SortOptions)
  }

  return (
    <FilterRadioGroup
      title={t("store.sortBy")}
      items={sortOptions(t)}
      value={sortBy}
      handleChange={handleChange}
      data-testid={dataTestId}
    />
  )
}

export default SortProducts
