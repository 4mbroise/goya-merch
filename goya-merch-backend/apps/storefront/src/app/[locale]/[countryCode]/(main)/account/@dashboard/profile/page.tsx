import { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import { setRequestLocale } from "next-intl/server"

import ProfilePhone from "@modules/account//components/profile-phone"
import ProfileBillingAddress from "@modules/account/components/profile-billing-address"
import ProfileEmail from "@modules/account/components/profile-email"
import ProfileName from "@modules/account/components/profile-name"
import { notFound } from "next/navigation"
import { listRegions } from "@lib/data/regions"
import { retrieveCustomer } from "@lib/data/customer"

export async function generateMetadata(props: { params: Promise<{ countryCode: string; locale: string }> }): Promise<Metadata> {
  const params = await props.params
  const { locale } = params
  const t = await getTranslations({ locale, namespace: "account" })
  return {
    title: t("profile"),
    description: t("profileDescription"),
  }
}

export default async function Profile(props: { params: Promise<{ countryCode: string; locale: string }> }) {
  const params = await props.params
  const { locale, countryCode } = params
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: "account" })

  const customer = await retrieveCustomer()
  const regions = await listRegions()

  if (!customer || !regions) {
    notFound()
  }

  return (
    <div className="w-full" data-testid="profile-page-wrapper">
      <div className="mb-8 flex flex-col gap-y-4">
        <h1 className="text-2xl-semi">{t("profile")}</h1>
        <p className="text-base-regular">
          {t("profileDescription")}
        </p>
      </div>
      <div className="flex flex-col gap-y-8 w-full">
        <ProfileName customer={customer} />
        <Divider />
        <ProfileEmail customer={customer} />
        <Divider />
        <ProfilePhone customer={customer} />
        <Divider />
        {/* <ProfilePassword customer={customer} />
        <Divider /> */}
        <ProfileBillingAddress customer={customer} regions={regions} />
      </div>
    </div>
  )
}

const Divider = () => {
  return <div className="w-full h-px bg-gray-200" />
}
