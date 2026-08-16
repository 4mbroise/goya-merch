import { Metadata } from "next"
import { notFound } from "next/navigation"
import { setRequestLocale, getTranslations } from "next-intl/server"

import AddressBook from "@modules/account/components/address-book"

import { getRegion } from "@lib/data/regions"
import { retrieveCustomer } from "@lib/data/customer"

export async function generateMetadata(props: { params: Promise<{ countryCode: string; locale: string }> }): Promise<Metadata> {
  const params = await props.params
  const { locale } = params
  const t = await getTranslations({ locale, namespace: "account" })
  return {
    title: t("addresses"),
    description: t("addressesDescription"),
  }
}

export default async function Addresses(props: {
  params: Promise<{ countryCode: string; locale: string }>
}) {
  const params = await props.params
  const { locale, countryCode } = params
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: "account" })
  const customer = await retrieveCustomer()
  const region = await getRegion(countryCode)

  if (!customer || !region) {
    notFound()
  }

  return (
    <div className="w-full" data-testid="addresses-page-wrapper">
      <div className="mb-8 flex flex-col gap-y-4">
        <h1 className="text-2xl-semi">{t("shippingAddresses")}</h1>
        <p className="text-base-regular">
          {t("addressesDescription")}
        </p>
      </div>
      <AddressBook customer={customer} region={region} />
    </div>
  )
}
