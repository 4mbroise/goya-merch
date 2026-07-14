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
  Row,
  Column,
  Button,
  render,
} from "react-email"

export type OrderAdminConfirmationData = {
  customerName: string
  orderNumber: string
  orderDate: string
  items: {
    title: string
    variant: string
    quantity: number
    totalPrice: string
  }[]
  subtotal: string
  shipping: string
  total: string
  shippingAddress: {
    address: string
    city: string
    postalCode: string
    country: string
  }
  adminOrderUrl: string
}

function OrderAdminConfirmationEmail({ data }: { data: OrderAdminConfirmationData }) {
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
              Nouvelle commande reçue
            </Heading>
            <Text style={{ color: "#999999", fontSize: "14px", margin: "0 0 32px 0" }}>
              Une nouvelle commande a été passée par {data.customerName}.
            </Text>

            {/* Order meta */}
            <Section style={{ backgroundColor: "#0d0d0d", borderRadius: "6px", padding: "16px", marginBottom: "32px" }}>
              <Row>
                <Column style={{ color: "#666666", fontSize: "12px" }}>Numéro de commande</Column>
                <Column style={{ color: "#ffffff", fontSize: "13px", fontWeight: 600, textAlign: "right" }}>#{data.orderNumber}</Column>
              </Row>
              <Row style={{ paddingTop: "8px" }}>
                <Column style={{ color: "#666666", fontSize: "12px" }}>Date</Column>
                <Column style={{ color: "#cccccc", fontSize: "13px", textAlign: "right" }}>{data.orderDate}</Column>
              </Row>
            </Section>

            {/* Items */}
            <Section style={{ marginBottom: "24px" }}>
              <Row style={{ borderBottom: "1px solid #2a2a2a", paddingBottom: "12px" }}>
                <Column style={{ color: "#666666", fontSize: "11px", fontWeight: 600 }}>Article</Column>
                <Column style={{ color: "#666666", fontSize: "11px", fontWeight: 600, textAlign: "center", width: "50px" }}>Qté</Column>
                <Column style={{ color: "#666666", fontSize: "11px", fontWeight: 600, textAlign: "right", width: "80px" }}>Prix</Column>
              </Row>
              {data.items.map((item, i) => (
                <Row key={i} style={{ borderBottom: "1px solid #2a2a2a", padding: "12px 0" }}>
                  <Column>
                    <Text style={{ color: "#ffffff", fontWeight: 600, margin: 0, fontSize: "14px" }}>{item.title}</Text>
                    <Text style={{ color: "#999999", fontSize: "12px", margin: "2px 0 0 0" }}>{item.variant}</Text>
                  </Column>
                  <Column style={{ color: "#cccccc", fontSize: "13px", textAlign: "center", width: "50px" }}>{item.quantity}</Column>
                  <Column style={{ color: "#cccccc", fontSize: "13px", textAlign: "right", width: "80px" }}>{item.totalPrice}</Column>
                </Row>
              ))}
            </Section>

            {/* Totals */}
            <Section style={{ marginBottom: "32px" }}>
              <Row style={{ padding: "4px 0" }}>
                <Column style={{ color: "#999999", fontSize: "13px" }}>Sous-total</Column>
                <Column style={{ color: "#cccccc", fontSize: "13px", textAlign: "right" }}>{data.subtotal}</Column>
              </Row>
              <Row style={{ padding: "4px 0" }}>
                <Column style={{ color: "#999999", fontSize: "13px" }}>Livraison</Column>
                <Column style={{ color: "#cccccc", fontSize: "13px", textAlign: "right" }}>{data.shipping}</Column>
              </Row>
              <Hr style={{ borderColor: "#2a2a2a", margin: "12px 0 8px 0" }} />
              <Row>
                <Column style={{ color: "#ffffff", fontSize: "15px", fontWeight: 700 }}>Total</Column>
                <Column style={{ color: "#ffffff", fontSize: "15px", fontWeight: 700, textAlign: "right" }}>{data.total}</Column>
              </Row>
            </Section>

            {/* Shipping address */}
            <Section style={{ backgroundColor: "#0d0d0d", borderRadius: "6px", padding: "16px", marginBottom: "24px" }}>
              <Text style={{ color: "#666666", fontSize: "11px", margin: "0 0 8px 0" }}>
                ADRESSE DE LIVRAISON
              </Text>
              <Text style={{ color: "#cccccc", fontSize: "13px", lineHeight: "1.6", margin: 0 }}>
                {data.shippingAddress.address}<br />
                {data.shippingAddress.postalCode} {data.shippingAddress.city}<br />
                {data.shippingAddress.country}
              </Text>
            </Section>

            {/* Process order button */}
            <Section style={{ textAlign: "center", marginBottom: "24px" }}>
              <Button
                href={data.adminOrderUrl}
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
                Traiter la commande
              </Button>
            </Section>

            {/* Withdrawal notice — legally required in France */}
            <Section style={{ border: "1px solid #2a2a2a", borderRadius: "6px", padding: "16px" }}>
              <Text style={{ color: "#666666", fontSize: "11px", margin: "0 0 8px 0" }}>
                DROIT DE RÉTRACTATION
              </Text>
              <Text style={{ color: "#777777", fontSize: "12px", lineHeight: "1.6", margin: 0 }}>
                Conformément à l'article L221-18 du Code de la consommation, le client dispose d'un délai de{" "}
                <strong style={{ color: "#999999" }}>14 jours</strong> à compter de la réception de sa commande
                pour exercer son droit de rétractation, sans avoir à justifier de motifs.
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

export async function renderOrderAdminConfirmationEmail(data: OrderAdminConfirmationData): Promise<string> {
  return render(<OrderAdminConfirmationEmail data={data} />)
}
