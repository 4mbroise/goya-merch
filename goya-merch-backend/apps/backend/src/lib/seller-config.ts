export const SELLER_INFO = {
  name: process.env.SELLER_NAME || "GOYA Merchandise",
  address: process.env.SELLER_ADDRESS || "",
  city: process.env.SELLER_CITY || "",
  email: process.env.SELLER_EMAIL || "contact@goya-merch.fr",
  siret: process.env.SELLER_SIRET,
  tvaNumber: process.env.SELLER_TVA_NUMBER,
  tvaExempt: process.env.SELLER_TVA_EXEMPT === "true",
}

export const TVA_RATE = parseFloat(process.env.TVA_RATE || "20")
