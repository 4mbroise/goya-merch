"use client"

import Back from "@modules/common/icons/back"
import FastDelivery from "@modules/common/icons/fast-delivery"
import Refresh from "@modules/common/icons/refresh"
import { useTranslations } from "next-intl"

import Accordion from "./accordion"
import { HttpTypes } from "@medusajs/types"

type ProductTabsProps = {
  product: HttpTypes.StoreProduct
}

const ProductTabs = ({ product }: ProductTabsProps) => {
  const t = useTranslations()

  const tabs = [
    {
      label: t("product.productInformation"),
      component: <ProductInfoTab product={product} />,
    },
    {
      label: t("product.shippingReturns"),
      component: <ShippingInfoTab />,
    },
  ]

  return (
    <div className="w-full">
      <Accordion type="multiple">
        {tabs.map((tab, i) => (
          <Accordion.Item
            key={i}
            title={tab.label}
            headingSize="medium"
            value={tab.label}
          >
            {tab.component}
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  )
}

const ProductInfoTab = ({ product }: ProductTabsProps) => {
  const t = useTranslations()

  return (
    <div className="py-8">
      <div className="grid grid-cols-2 gap-x-8">
        <div className="flex flex-col gap-y-4">
          <div>
            <span className="text-label">{t("product.material")}</span>
            <p className="text-body-editorial text-editorial-fg-subtle">{product.material ? product.material : "-"}</p>
          </div>
          <div>
            <span className="text-label">{t("product.countryOfOrigin")}</span>
            <p className="text-body-editorial text-editorial-fg-subtle">{product.origin_country ? product.origin_country : "-"}</p>
          </div>
          <div>
            <span className="text-label">{t("product.type")}</span>
            <p className="text-body-editorial text-editorial-fg-subtle">{product.type ? product.type.value : "-"}</p>
          </div>
        </div>
        <div className="flex flex-col gap-y-4">
          <div>
            <span className="text-label">{t("product.weight")}</span>
            <p className="text-body-editorial text-editorial-fg-subtle">{product.weight ? `${product.weight} g` : "-"}</p>
          </div>
          <div>
            <span className="text-label">{t("product.dimensions")}</span>
            <p className="text-body-editorial text-editorial-fg-subtle">
              {product.length && product.width && product.height
                ? `${product.length}L x ${product.width}W x ${product.height}H`
                : "-"}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

const ShippingInfoTab = () => {
  const t = useTranslations()

  return (
    <div className="py-8">
      <div className="grid grid-cols-1 gap-y-8">
        <div className="flex items-start gap-x-2">
          <FastDelivery />
          <div>
            <span className="text-label">{t("product.fastDelivery")}</span>
            <p className="max-w-sm text-body-editorial text-editorial-fg-subtle">
              {t("product.fastDeliveryDesc")}
            </p>
          </div>
        </div>
        <div className="flex items-start gap-x-2">
          <Refresh />
          <div>
            <span className="text-label">{t("product.simpleExchanges")}</span>
            <p className="max-w-sm text-body-editorial text-editorial-fg-subtle">
              {t("product.simpleExchangesDesc")}
            </p>
          </div>
        </div>
        <div className="flex items-start gap-x-2">
          <Back />
          <div>
            <span className="text-label">{t("product.easyReturns")}</span>
            <p className="max-w-sm text-body-editorial text-editorial-fg-subtle">
              {t("product.easyReturnsDesc")}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductTabs
