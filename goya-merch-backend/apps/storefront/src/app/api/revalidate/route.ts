import { revalidatePath } from "next/cache"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret")

  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 })
  }

  // Revalidate all pages from the root layout down so every visitor sees
  // fresh product data regardless of their individual cache_id cookie.
  revalidatePath("/", "layout")

  return NextResponse.json({ revalidated: true })
}
