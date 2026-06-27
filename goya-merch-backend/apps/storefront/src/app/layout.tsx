import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next"
import "styles/globals.css"

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
  title: "GOYA — Official Merch",
  description:
    "La boutique officielle de GOYA. T-shirts, vinyles et accessoires.",
  icons: [{ rel: "icon", url: "/icon.svg" }],
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="bg-white text-grey-90">
        <main className="relative">{props.children}</main>
      </body>
    </html>
  )
}
