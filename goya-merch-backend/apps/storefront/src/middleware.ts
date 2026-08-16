import { HttpTypes } from "@medusajs/types"
import { NextRequest, NextResponse } from "next/server"
import createMiddleware from "next-intl/middleware"

const locales = ["fr", "en"] as const
const defaultLocale = "fr"

const BACKEND_URL = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL
const PUBLISHABLE_API_KEY = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY
const DEFAULT_REGION = process.env.NEXT_PUBLIC_DEFAULT_REGION || "fr"

const regionMapCache = {
  regionMap: new Map<string, HttpTypes.StoreRegion>(),
  regionMapUpdated: Date.now(),
}

async function getRegionMap(cacheId: string) {
  const { regionMap, regionMapUpdated } = regionMapCache

  if (!BACKEND_URL) {
    throw new Error(
      "Middleware.ts: Error fetching regions. Did you set up regions in your Medusa Admin and define a NEXT_PUBLIC_MEDUSA_BACKEND_URL environment variable."
    )
  }

  if (
    !regionMap.keys().next().value ||
    regionMapUpdated < Date.now() - 3600 * 1000
  ) {
    const response = await fetch(`${BACKEND_URL}/store/regions`, {
      method: "GET",
      headers: {
        "x-publishable-api-key": PUBLISHABLE_API_KEY!,
      },
      next: {
        revalidate: 3600,
        tags: [`regions-${cacheId}`],
      },
      cache: "force-cache",
    })

    if (!response.ok) {
      throw new Error(`Backend returned ${response.status}`)
    }

    const json = await response.json()
    const { regions } = json

    if (!regions?.length) {
      return new Map<string, HttpTypes.StoreRegion>()
    }

    regions.forEach((region: HttpTypes.StoreRegion) => {
      region.countries?.forEach((c) => {
        regionMapCache.regionMap.set(c.iso_2 ?? "", region)
      })
    })

    regionMapCache.regionMapUpdated = Date.now()
  }

  return regionMapCache.regionMap
}

/**
 * Extracts the countryCode from the second path segment (first is locale).
 */
async function getCountryCode(request: NextRequest, regionMap: Map<string, HttpTypes.StoreRegion>) {
  let countryCode: string | undefined

  const pathParts = request.nextUrl.pathname.split("/").filter(Boolean)
  // pathParts[0] = locale, pathParts[1] = countryCode
  const urlCountryCode = pathParts[1]?.toLowerCase()

  const cloudflareCountryCode = (request as { cf?: { country?: string } }).cf?.country?.toLowerCase()
  const vercelCountryCode = request.headers.get("x-vercel-ip-country")?.toLowerCase()

  if (urlCountryCode && regionMap.has(urlCountryCode)) {
    countryCode = urlCountryCode
  } else if (cloudflareCountryCode && regionMap.has(cloudflareCountryCode)) {
    countryCode = cloudflareCountryCode
  } else if (vercelCountryCode && regionMap.has(vercelCountryCode)) {
    countryCode = vercelCountryCode
  } else if (regionMap.has(DEFAULT_REGION)) {
    countryCode = DEFAULT_REGION
  } else if (regionMap.keys().next().value) {
    countryCode = regionMap.keys().next().value
  }

  return countryCode
}

/**
 * next-intl middleware: handles locale detection/negotiation/redirect.
 */
const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: "always",
})

/**
 * Main middleware: chains intl locale handling + Medusa region logic.
 * - next-intl runs first (detects locale, prepends it if missing)
 * - Then we ensure countryCode (region) is set in the URL
 */
export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.includes(".")) {
    return NextResponse.next()
  }

  // Step 1: Let next-intl handle locale detection/redirect
  const intlResponse = intlMiddleware(request)

  // If next-intl issued a redirect, we need to modify it to add countryCode
  // before following it. Build the target URL with countryCode baked in.
  if (intlResponse.status === 307 || intlResponse.status === 308) {
    const redirectUrl = new URL(intlResponse.headers.get("location") || "/", request.url)
    const intlPathParts = redirectUrl.pathname.split("/").filter(Boolean)
    const intlLocale = intlPathParts[0]

    // Get countryCode for the locale (fr locale → fr country)
    const cacheIdCookie = request.cookies.get("_medusa_cache_id")
    const cacheId = cacheIdCookie?.value || crypto.randomUUID()
    const regionMap = await getRegionMap(cacheId)
    const countryCode = await getCountryCode(request, regionMap)
    const country = countryCode || DEFAULT_REGION

    // Rebuild path: /{locale} → /{locale}/{country}
    const newPath = `/${intlLocale}/${country}`
    redirectUrl.pathname = newPath

    const response = NextResponse.redirect(redirectUrl, 307)
    if (!cacheIdCookie) {
      response.cookies.set("_medusa_cache_id", cacheId, { maxAge: 60 * 60 * 24 })
    }
    return response
  }

  // Step 2: No redirect from intl — locale was already in URL. Ensure countryCode is present.
  const cacheIdCookie = request.cookies.get("_medusa_cache_id")
  const cacheId = cacheIdCookie?.value || crypto.randomUUID()

  const regionMap = await getRegionMap(cacheId)
  const countryCode = await getCountryCode(request, regionMap)

  const country = countryCode || DEFAULT_REGION
  const pathParts = request.nextUrl.pathname.split("/").filter(Boolean)

  // pathParts[0] = locale, pathParts[1] = countryCode (if present)
  const currentLocale = pathParts[0]
  const urlHasCountry = pathParts[1]?.toLowerCase() === country.toLowerCase()

  // If the URL already starts with a locale, ensure countryCode is present
  const urlStartsWithLocale = locales.includes(currentLocale as (typeof locales)[number])
  if (urlStartsWithLocale) {
    if (!urlHasCountry) {
      // URL is /{locale}/... but missing countryCode — redirect to add it
      const newPath = `/${currentLocale}/${country}${request.nextUrl.pathname.substring(`/${currentLocale}`.length)}${request.nextUrl.search}`
      const redirectUrl = new URL(newPath, request.url)
      const response = NextResponse.redirect(redirectUrl, 307)
      if (!cacheIdCookie) {
        response.cookies.set("_medusa_cache_id", cacheId, { maxAge: 60 * 60 * 24 })
      }
      return response
    }
    if (!cacheIdCookie) {
      const response = NextResponse.next()
      response.cookies.set("_medusa_cache_id", cacheId, { maxAge: 60 * 60 * 24 })
      return response
    }
    return NextResponse.next()
  }

  if (urlHasCountry) {
    if (!cacheIdCookie) {
      const response = NextResponse.next()
      response.cookies.set("_medusa_cache_id", cacheId, {
        maxAge: 60 * 60 * 24,
      })
      return response
    }
    return NextResponse.next()
  }

  // Redirect to add missing countryCode segment while preserving locale
  const redirectPath =
    request.nextUrl.pathname === "/" ? "" : request.nextUrl.pathname
  const queryString = request.nextUrl.search || ""
  const redirectUrl = `${request.nextUrl.origin}/${currentLocale}/${country}${redirectPath}${queryString}`

  return NextResponse.redirect(redirectUrl, 307)
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|images|assets|png|svg|jpg|jpeg|gif|webp).*)",
  ],
}
