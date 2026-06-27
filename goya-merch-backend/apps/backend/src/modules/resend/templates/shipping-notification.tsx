import * as React from "react"
import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Heading,
  Text,
  Hr,
  Button,
  render,
} from "react-email"

export type ShippingNotificationData = {
  customerName: string
  orderNumber: string
  trackingNumber: string
  trackingUrl: string
  carrier: string
  estimatedDelivery?: string
  items: {
    title: string
    variant: string
    quantity: number
  }[]
  shippingAddress: {
    address: string
    city: string
    postalCode: string
    country: string
  }
}

function ShippingNotificationEmail({ data }: { data: ShippingNotificationData }) {
  return (
    <Html lang="fr">
      <Head />
      <Body style={{ backgroundColor: "#0d0d0d", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", margin: 0, padding: 0 }}>
        <Container style={{ maxWidth: "600px", margin: "0 auto", padding: "40px 20px" }}>

          {/* Brand header */}
          <Section style={{ textAlign: "center", paddingBottom: "40px" }}>
            <Heading style={{ fontSize: "28px", fontWeight: 800, letterSpacing: "6px", color: "#ffffff", margin: 0 }}>
              GOYA
            </Heading>
            <Text style={{ fontSize: "11px", letterSpacing: "2px", color: "#666666", margin: "4px 0 0 0" }}>
              Merchandise
            </Text>
          </Section>

          {/* Main card */}
          <Section style={{ backgroundColor: "#1a1a1a", borderRadius: "8px", padding: "40px" }}>
            <Heading as="h1" style={{ fontSize: "22px", fontWeight: 700, color: "#ffffff", margin: "0 0 8px 0" }}>
              Ta commande est en route 🚚
            </Heading>
            <Text style={{ color: "#999999", fontSize: "14px", margin: "0 0 32px 0" }}>
              Salut {data.customerName}, ta commande #{data.orderNumber} a été expédiée.
            </Text>

            {/* Tracking info */}
            <Section style={{ backgroundColor: "#0d0d0d", borderRadius: "6px", padding: "24px", marginBottom: "32px", textAlign: "center" }}>
              <Text style={{ color: "#666666", fontSize: "11px", margin: "0 0 8px 0" }}>
                NUMÉRO DE SUIVI
              </Text>
              <Text style={{ color: "#ffffff", fontSize: "20px", fontWeight: 700, letterSpacing: "2px", margin: "0 0 4px 0" }}>
                {data.trackingNumber}
              </Text>
              <Text style={{ color: "#666666", fontSize: "12px", margin: "0 0 16px 0" }}>
                {data.carrier}{data.estimatedDelivery ? ` · Livraison estimée : ${data.estimatedDelivery}` : ""}
              </Text>
              <Button
                href={data.trackingUrl}
                style={{
                  backgroundColor: "#ffffff",
                  color: "#000000",
                  fontSize: "13px",
                  fontWeight: 600,
                  padding: "12px 28px",
                  borderRadius: "4px",
                  textDecoration: "none",
                  display: "inline-block",
                }}
              >
                Suivre mon colis
              </Button>
            </Section>

            {/* Items summary */}
            <Section style={{ marginBottom: "24px" }}>
              <Text style={{ color: "#666666", fontSize: "11px", margin: "0 0 12px 0" }}>
                ARTICLES EXPÉDIÉS
              </Text>
              {data.items.map((item, i) => (
                <Section key={i} style={{ borderBottom: "1px solid #2a2a2a", padding: "10px 0" }}>
                  <Text style={{ color: "#ffffff", fontSize: "13px", fontWeight: 600, margin: 0 }}>
                    {item.title}
                    <span style={{ color: "#999999", fontWeight: 400 }}> × {item.quantity}</span>
                  </Text>
                  <Text style={{ color: "#999999", fontSize: "12px", margin: "2px 0 0 0" }}>
                    {item.variant}
                  </Text>
                </Section>
              ))}
            </Section>

            {/* Delivery address */}
            <Section style={{ backgroundColor: "#0d0d0d", borderRadius: "6px", padding: "16px" }}>
              <Text style={{ color: "#666666", fontSize: "11px", margin: "0 0 8px 0" }}>
                ADRESSE DE LIVRAISON
              </Text>
              <Text style={{ color: "#cccccc", fontSize: "13px", lineHeight: "1.6", margin: 0 }}>
                {data.shippingAddress.address}<br />
                {data.shippingAddress.postalCode} {data.shippingAddress.city}<br />
                {data.shippingAddress.country}
              </Text>
            </Section>
          </Section>

          {/* Footer */}
          <Section style={{ paddingTop: "32px", textAlign: "center" }}>
            <Text style={{ color: "#444444", fontSize: "12px", margin: 0, lineHeight: "1.6" }}>
              Des questions ? Contacte-nous à contact@goya-merch.fr
            </Text>
            <Text style={{ color: "#333333", fontSize: "11px", margin: "16px 0 0 0" }}>
              © {new Date().getFullYear()} GOYA Merchandise. Tous droits réservés.
            </Text>
          </Section>

        </Container>
      </Body>
    </Html>
  )
}

export async function renderShippingNotificationEmail(data: ShippingNotificationData): Promise<string> {
  return render(<ShippingNotificationEmail data={data} />)
}
