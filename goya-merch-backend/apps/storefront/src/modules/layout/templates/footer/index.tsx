import Image from "next/image"
import { listCategories } from "@lib/data/categories"
import { listCollections } from "@lib/data/collections"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import FooterTranslations from "@modules/layout/components/footer-translations"

export default async function Footer() {
  const { collections } = await listCollections({
    fields: "*products",
  })
  const productCategories = await listCategories()

  return (
    <footer className="border-t border-editorial-border w-full">
      <div className="content-container flex flex-col w-full">
        <div className="flex flex-col gap-y-6 xsmall:flex-row items-start justify-between py-24">
          <div>
            <LocalizedClientLink
              href="/"
              className="flex items-center"
            >
              <Image
                src="/Typo.svg"
                alt="GOYA"
                width={140}
                height={53}
                className="h-8 w-auto"
              />
            </LocalizedClientLink>
          </div>
          <FooterTranslations
            productCategories={productCategories}
            collections={collections || []}
          />
        </div>
      </div>
    </footer>
  )
}
