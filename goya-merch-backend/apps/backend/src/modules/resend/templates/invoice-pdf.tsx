import React from "react"

// @react-pdf/renderer is ESM-only. We use a dynamic import to avoid
// CJS/ESM compatibility issues at compile time.
let _pdfRenderer: any = null

async function getPDFRenderer() {
  if (!_pdfRenderer) {
    _pdfRenderer = await import("@react-pdf/renderer")
  }
  return _pdfRenderer
}

export type InvoiceData = {
  invoiceNumber: string
  invoiceDate: string
  orderId: string
  seller: {
    name: string
    address: string
    city: string
    email: string
    siret?: string
    tvaNumber?: string
    tvaExempt?: boolean
  }
  customer: {
    firstName: string
    lastName: string
    address: string
    city: string
    postalCode: string
    country: string
    email: string
  }
  items: {
    description: string
    quantity: number
    unitPriceHT: number
    totalHT: number
  }[]
  subtotalHT: number
  shippingTTC: number
  tvaRate: number
  tvaAmount: number
  totalTTC: number
  currency: string
  paymentMethod: string
}

function formatMoney(amount: number, currency: string): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(amount)
}

export async function generateInvoicePDF(data: InvoiceData): Promise<Buffer> {
  const { Document, Page, Text, View, StyleSheet, renderToBuffer } =
    await getPDFRenderer()

  const styles = StyleSheet.create({
    page: {
      fontFamily: "Helvetica",
      fontSize: 10,
      padding: 48,
      color: "#1a1a1a",
      backgroundColor: "#ffffff",
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 40,
    },
    brandName: {
      fontSize: 24,
      fontFamily: "Helvetica-Bold",
      letterSpacing: 4,
      color: "#000000",
    },
    brandSub: {
      fontSize: 9,
      color: "#666666",
      marginTop: 4,
    },
    invoiceTitle: {
      fontSize: 14,
      fontFamily: "Helvetica-Bold",
      textAlign: "right",
      color: "#000000",
    },
    invoiceMeta: {
      fontSize: 9,
      color: "#666666",
      textAlign: "right",
      marginTop: 4,
      lineHeight: 1.6,
    },
    addressSection: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 32,
    },
    addressBlock: {
      width: "45%",
    },
    addressLabel: {
      fontSize: 8,
      fontFamily: "Helvetica-Bold",
      textTransform: "uppercase",
      letterSpacing: 1,
      color: "#999999",
      marginBottom: 6,
    },
    addressText: {
      fontSize: 9,
      lineHeight: 1.6,
      color: "#333333",
    },
    divider: {
      borderBottomWidth: 1,
      borderBottomColor: "#e5e5e5",
      marginBottom: 16,
    },
    tableHeader: {
      flexDirection: "row",
      backgroundColor: "#f5f5f5",
      padding: "8 12",
      marginBottom: 4,
    },
    tableHeaderText: {
      fontSize: 8,
      fontFamily: "Helvetica-Bold",
      textTransform: "uppercase",
      letterSpacing: 0.5,
      color: "#666666",
    },
    tableRow: {
      flexDirection: "row",
      padding: "8 12",
      borderBottomWidth: 1,
      borderBottomColor: "#f0f0f0",
    },
    colDescription: { width: "50%" },
    colQty: { width: "15%", textAlign: "center" },
    colUnitPrice: { width: "17.5%", textAlign: "right" },
    colTotal: { width: "17.5%", textAlign: "right" },
    cellText: {
      fontSize: 9,
      color: "#333333",
    },
    totalsSection: {
      marginTop: 24,
      alignItems: "flex-end",
    },
    totalsTable: {
      width: "40%",
    },
    totalsRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      padding: "4 0",
    },
    totalsLabel: {
      fontSize: 9,
      color: "#666666",
    },
    totalsValue: {
      fontSize: 9,
      color: "#333333",
    },
    totalDivider: {
      borderBottomWidth: 1,
      borderBottomColor: "#333333",
      marginVertical: 6,
    },
    grandTotalLabel: {
      fontSize: 11,
      fontFamily: "Helvetica-Bold",
      color: "#000000",
    },
    grandTotalValue: {
      fontSize: 11,
      fontFamily: "Helvetica-Bold",
      color: "#000000",
    },
    footer: {
      position: "absolute",
      bottom: 32,
      left: 48,
      right: 48,
    },
    footerDivider: {
      borderBottomWidth: 1,
      borderBottomColor: "#e5e5e5",
      marginBottom: 10,
    },
    footerText: {
      fontSize: 8,
      color: "#999999",
      textAlign: "center",
      lineHeight: 1.6,
    },
  })

  const InvoiceDocument = ({ docData }: { docData: InvoiceData }) => (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.brandName}>GOYA</Text>
            <Text style={styles.brandSub}>Merchandise</Text>
          </View>
          <View>
            <Text style={styles.invoiceTitle}>FACTURE</Text>
            <Text style={styles.invoiceMeta}>
              N° {docData.invoiceNumber}
              {"\n"}
              Date : {docData.invoiceDate}
              {"\n"}
              Commande : #{docData.orderId.slice(-8).toUpperCase()}
            </Text>
          </View>
        </View>

        {/* Addresses */}
        <View style={styles.addressSection}>
          <View style={styles.addressBlock}>
            <Text style={styles.addressLabel}>Vendeur</Text>
            <Text style={styles.addressText}>
              {docData.seller.name}
              {"\n"}
              {docData.seller.address}
              {"\n"}
              {docData.seller.city}
              {"\n"}
              {docData.seller.email}
              {docData.seller.siret
                ? `\nSIRET : ${docData.seller.siret}`
                : ""}
              {docData.seller.tvaExempt
                ? "\nTVA non applicable, art. 293B CGI"
                : docData.seller.tvaNumber
                  ? `\nN° TVA : ${docData.seller.tvaNumber}`
                  : ""}
            </Text>
          </View>
          <View style={styles.addressBlock}>
            <Text style={styles.addressLabel}>Client</Text>
            <Text style={styles.addressText}>
              {docData.customer.firstName} {docData.customer.lastName}
              {"\n"}
              {docData.customer.address}
              {"\n"}
              {docData.customer.postalCode} {docData.customer.city}
              {"\n"}
              {docData.customer.country}
              {"\n"}
              {docData.customer.email}
            </Text>
          </View>
        </View>

        <View style={styles.divider} />

        {/* Table header */}
        <View style={styles.tableHeader}>
          <Text style={[styles.tableHeaderText, styles.colDescription]}>
            Désignation
          </Text>
          <Text style={[styles.tableHeaderText, styles.colQty]}>Qté</Text>
          <Text style={[styles.tableHeaderText, styles.colUnitPrice]}>
            Prix unitaire HT
          </Text>
          <Text style={[styles.tableHeaderText, styles.colTotal]}>
            Total HT
          </Text>
        </View>

        {/* Items */}
        {docData.items.map((item, i) => (
          <View key={i} style={styles.tableRow}>
            <Text style={[styles.cellText, styles.colDescription]}>
              {item.description}
            </Text>
            <Text style={[styles.cellText, styles.colQty]}>{item.quantity}</Text>
            <Text style={[styles.cellText, styles.colUnitPrice]}>
              {formatMoney(item.unitPriceHT, docData.currency)}
            </Text>
            <Text style={[styles.cellText, styles.colTotal]}>
              {formatMoney(item.totalHT, docData.currency)}
            </Text>
          </View>
        ))}

        {/* Totals */}
        <View style={styles.totalsSection}>
          <View style={styles.totalsTable}>
            <View style={styles.totalsRow}>
              <Text style={styles.totalsLabel}>Sous-total HT</Text>
              <Text style={styles.totalsValue}>
                {formatMoney(docData.subtotalHT, docData.currency)}
              </Text>
            </View>
            <View style={styles.totalsRow}>
              <Text style={styles.totalsLabel}>Livraison TTC</Text>
              <Text style={styles.totalsValue}>
                {docData.shippingTTC === 0
                  ? "Offert"
                  : formatMoney(docData.shippingTTC, docData.currency)}
              </Text>
            </View>
            {docData.seller.tvaExempt ? (
              <View style={styles.totalsRow}>
                <Text style={styles.totalsLabel}>TVA</Text>
                <Text style={styles.totalsValue}>Non applicable</Text>
              </View>
            ) : (
              <View style={styles.totalsRow}>
                <Text style={styles.totalsLabel}>
                  TVA ({docData.tvaRate}%)
                </Text>
                <Text style={styles.totalsValue}>
                  {formatMoney(docData.tvaAmount, docData.currency)}
                </Text>
              </View>
            )}
            <View style={styles.totalDivider} />
            <View style={styles.totalsRow}>
              <Text style={styles.grandTotalLabel}>Total TTC</Text>
              <Text style={styles.grandTotalValue}>
                {formatMoney(docData.totalTTC, docData.currency)}
              </Text>
            </View>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <View style={styles.footerDivider} />
          <Text style={styles.footerText}>
            Paiement reçu par {docData.paymentMethod} — Merci pour votre
            commande !{"\n"}
            GOYA Merchandise — {docData.seller.email}
          </Text>
        </View>
      </Page>
    </Document>
  )

  return renderToBuffer(
    <InvoiceDocument docData={data} />
  ) as Promise<Buffer>
}