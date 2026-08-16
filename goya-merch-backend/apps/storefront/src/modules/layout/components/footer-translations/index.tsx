"use client"

import { useTranslations } from "next-intl"
import { Text, clx } from "@modules/common/components/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

type FooterCategory = {
  id: string
  name: string
  handle: string
  parent_category?: unknown
  category_children?: { name: string; handle: string; id: string }[]
}

type FooterCollection = {
  id: string
  title: string
  handle: string
}

type FooterTranslationsProps = {
  productCategories: FooterCategory[] | null
  collections: FooterCollection[]
}

export default function FooterTranslations({
  productCategories,
  collections,
}: FooterTranslationsProps) {
  const t = useTranslations()

  return (
    <>
      <div className="text-small-regular gap-10 md:gap-x-16 grid grid-cols-2 sm:grid-cols-3">
        {productCategories && productCategories?.length > 0 && (
          <div className="flex flex-col gap-y-2">
            <span className="text-label text-editorial-ink">
              {t("footer.categories")}
            </span>
            <ul
              className="grid grid-cols-1 gap-2"
              data-testid="footer-categories"
            >
              {productCategories?.slice(0, 6).map((c) => {
                if (c.parent_category) {
                  return
                }

                const children =
                  c.category_children?.map((child) => ({
                    name: child.name,
                    handle: child.handle,
                    id: child.id,
                  })) || null

                return (
                  <li
                    className="flex flex-col gap-2 text-editorial-fg-subtle txt-small"
                    key={c.id}
                  >
                    <LocalizedClientLink
                      className={clx(
                        "hover:text-editorial-ink",
                        children && "txt-small-plus"
                      )}
                      href={`/categories/${c.handle}`}
                      data-testid="category-link"
                    >
                      {c.name}
                    </LocalizedClientLink>
                    {children && (
                      <ul className="grid grid-cols-1 ml-3 gap-2">
                        {children &&
                          children.map((child) => (
                            <li key={child.id}>
                              <LocalizedClientLink
                                className="hover:text-editorial-ink"
                                href={`/categories/${child.handle}`}
                                data-testid="category-link"
                              >
                                {child.name}
                              </LocalizedClientLink>
                            </li>
                          ))}
                      </ul>
                    )}
                  </li>
                )
              })}
            </ul>
          </div>
        )}
        {collections && collections.length > 0 && (
          <div className="flex flex-col gap-y-2">
            <span className="text-label text-editorial-ink">
              {t("footer.collections")}
            </span>
            <ul
              className={clx(
                "grid grid-cols-1 gap-2 text-editorial-fg-subtle txt-small",
                {
                  "grid-cols-2": (collections?.length || 0) > 3,
                }
              )}
            >
              {collections?.slice(0, 6).map((c) => (
                <li key={c.id}>
                  <LocalizedClientLink
                    className="hover:text-editorial-ink"
                    href={`/collections/${c.handle}`}
                  >
                    {c.title}
                  </LocalizedClientLink>
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="flex flex-col gap-y-2">
          <span className="text-label text-editorial-ink">{t("footer.goya")}</span>
          <ul className="grid grid-cols-1 gap-y-2 text-editorial-fg-subtle txt-small">
            <li>
              <a
                href="https://goya.xyz"
                target="_blank"
                rel="noreferrer"
                className="hover:text-editorial-ink"
              >
                {t("footer.website")}
              </a>
            </li>
            <li>
              <a
                href="https://instagram.com/goya"
                target="_blank"
                rel="noreferrer"
                className="hover:text-editorial-ink"
              >
                {t("footer.instagram")}
              </a>
            </li>
            <li className="mt-2 border-t border-editorial-border pt-2">
              <span className="text-label text-editorial-ink">
                {t("footer.informationsLegales")}
              </span>
              <ul className="grid grid-cols-1 gap-y-2 mt-2">
                <li>
                  <LocalizedClientLink
                    className="hover:text-editorial-ink"
                    href="/cgv"
                  >
                    {t("footer.cgv")}
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    className="hover:text-editorial-ink"
                    href="/mentions-legales"
                  >
                    {t("footer.mentionsLegales")}
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    className="hover:text-editorial-ink"
                    href="/politique-de-confidentialite"
                  >
                    {t("footer.politiqueDeConfidentialite")}
                  </LocalizedClientLink>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex w-full mb-16 justify-between text-editorial-fg-muted">
        <Text className="text-breadcrumb">
          {t("footer.copyright", { year: new Date().getFullYear() })}
        </Text>
      </div>
    </>
  )
}
