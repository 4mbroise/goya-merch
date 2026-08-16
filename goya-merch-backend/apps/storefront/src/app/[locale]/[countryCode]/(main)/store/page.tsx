import { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import { setRequestLocale } from "next-intl/server"

import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import StoreTemplate from "@modules/store/templates"

type Params = {
  searchParams: Promise<{
    sortBy?: SortOptions
    page?: string
  }>
  params: Promise<{
    countryCode: string
    locale: string
  }>
}

export async function generateMetadata(props: { params: Promise<{ countryCode: string; locale: string }> }): Promise<Metadata> {
  const params = await props.params
  const { locale } = params
  const t = await getTranslations({ locale, namespace: "store" })
  return {
    title: t("products"),
    description: t("noResults"),
  }
}

export default async function StorePage(props: Params) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const { sortBy, page } = searchParams
  const { locale, countryCode } = params
  setRequestLocale(locale)

  return (
    <StoreTemplate
      sortBy={sortBy}
      page={page}
      countryCode={countryCode}
      locale={locale}
    />
  )
}
