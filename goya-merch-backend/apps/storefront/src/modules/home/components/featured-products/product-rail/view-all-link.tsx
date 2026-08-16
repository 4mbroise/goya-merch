"use client"

import { useTranslations } from "next-intl"
import InteractiveLink from "@modules/common/components/interactive-link"

type ViewAllLinkProps = {
  href: string
}

export default function ViewAllLink({ href }: ViewAllLinkProps) {
  const t = useTranslations()

  return (
    <InteractiveLink href={href}>
      {t("product.viewAll")}
    </InteractiveLink>
  )
}
