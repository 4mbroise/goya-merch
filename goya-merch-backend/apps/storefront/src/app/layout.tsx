import { cookies } from "next/headers"
import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next"
import { Manrope } from "next/font/google"
import "styles/globals.css"

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
  weight: ["200", "300", "400", "500", "600", "700", "800"],
})

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
    <html lang={lang} className={manrope.variable}>
      <body className="bg-editorial-cream text-editorial-ink font-sans">
        {props.children}
      </body>
    </html>
  )
}
