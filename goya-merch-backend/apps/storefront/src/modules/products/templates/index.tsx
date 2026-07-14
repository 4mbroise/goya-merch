import React, { Suspense } from "react"

import ImageGallery from "@modules/products/components/image-gallery"
import ProductActions from "@modules/products/components/product-actions"
import ProductOnboardingCta from "@modules/products/components/product-onboarding-cta"
import ProductTabs from "@modules/products/components/product-tabs"
import RelatedProducts from "@modules/products/components/related-products"
import ProductInfo from "@modules/products/templates/product-info"
import SkeletonRelatedProducts from "@modules/skeletons/templates/skeleton-related-products"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { notFound } from "next/navigation"
import { HttpTypes } from "@medusajs/types"

import ProductActionsWrapper from "./product-actions-wrapper"

type ProductTemplateProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  countryCode: string
  images: HttpTypes.StoreProductImage[]
}

const ProductTemplate: React.FC<ProductTemplateProps> = ({
  product,
  region,
  countryCode,
  images,
}) => {
  if (!product || !product.id) {
    return notFound()
  }

  return (
    <>
      <div
        className="content-container flex flex-col small:flex-row small:items-start py-6 relative"
        data-testid="product-container"
      >
        {/* Left column — Image Gallery (~55%) */}
        <div className="block w-full small:w-[55%] relative">
          <ImageGallery images={images} productTitle={product.title} />
        </div>
        {/* Right column — Product info, options, tabs (~45%, sticky) */}
        <div className="flex flex-col w-full small:w-[45%] small:sticky small:top-48 small:self-start px-8 small:px-12 py-8 gap-y-8">
          {/* Breadcrumb */}
          <div className="text-breadcrumb text-editorial-fg-subtle">
            <LocalizedClientLink href="/store" className="hover:underline">
              SHOP
            </LocalizedClientLink>
            {product.collection && (
              <>
                <span className="mx-1">/</span>
                <LocalizedClientLink
                  href={`/collections/${product.collection.handle}`}
                  className="hover:underline"
                >
                  {product.collection.title}
                </LocalizedClientLink>
              </>
            )}
            <span className="mx-1">/</span>
            <span>{product.title}</span>
          </div>
          <ProductInfo product={product} />
          <ProductTabs product={product} />
          <ProductOnboardingCta />
          <Suspense
            fallback={
              <ProductActions
                disabled={true}
                product={product}
              />
            }
          >
            <ProductActionsWrapper id={product.id} region={region} />
          </Suspense>
        </div>
      </div>
      <div
        className="content-container my-16 small:my-32"
        data-testid="related-products-container"
      >
        <Suspense fallback={<SkeletonRelatedProducts />}>
          <RelatedProducts product={product} countryCode={countryCode} />
        </Suspense>
      </div>
    </>
  )
}

export default ProductTemplate
