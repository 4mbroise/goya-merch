import { cookies } from "next/headers"
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

export default async function RootLayout(props: { children: React.ReactNode }) {
  const cookieStore = await cookies()
  const localeCookie = cookieStore.get("_medusa_locale")?.value
  const lang = localeCookie ? localeCookie.split("-")[0] : "fr"

  return (
    <html lang={lang}>
      <body className="bg-white text-grey-90">
        {props.children}
      </body>
    </html>
  )
}
