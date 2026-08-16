import { Metadata } from "next"

import { Container, Heading, Text } from "@modules/common/components/ui"

export const metadata: Metadata = {
  title: "Conditions Générales de Vente",
  description:
    "Conditions générales de vente de la boutique en ligne GOYA — merchandising officiel.",
}

export default async function CGVPage() {
  return (
    <div className="content-container">
      <div className="py-8">
        <Container>
          <Heading level="h1" className="mb-6 text-ui-fg-base">
            Conditions Générales de Vente
          </Heading>

          <div className="flex flex-col gap-y-4 text-ui-fg-base">
            {/* Objet */}
            <section>
              <Heading level="h2" className="mb-2 text-ui-fg-base">
                1. Objet
              </Heading>
              <Text className="text-ui-fg-muted">
                Les présentes Conditions Générales de Vente (CGV) régissent
                l&apos;ensemble des ventes de produits effectuées via le site
                internet goya.xyz par l&apos;entité GOYA, dont les coordonnées
                sont précisées à l&apos;article 10. Elles définissent les droits
                et obligations des parties dans le cadre de la vente en ligne de
                marchandises officielles (merchandising) du groupe GOYA.
              </Text>
            </section>

            {/* Commandes */}
            <section>
              <Heading level="h2" className="mb-2 text-ui-fg-base">
                2. Commandes
              </Heading>
              <Text className="text-ui-fg-muted">
                Le Client passe commande sur le site goya.xyz en sélectionnant
                les articles souhaités et en validant son panier. La commande
                est confirmée après paiement. GOYA confirme la commande par
                e-mail à l&apos;adresse renseignée par le Client. GOYA se
                réserve le droit de refuser ou d&apos;annuler toute commande
                pour motif légitime, notamment en cas de litige antérieur ou
                d&apos;indisponibilité des produits.
              </Text>
            </section>

            {/* Prix et paiement */}
            <section>
              <Heading level="h2" className="mb-2 text-ui-fg-base">
                3. Prix et Paiement
              </Heading>
              <Text className="text-ui-fg-muted">
                Les prix sont indiqués en euros (€), toutes taxes comprises
                (TTC), hors frais de livraison. GOYA se réserve le droit de
                modifier ses prix à tout moment, les produits étant facturés au
                tarif en vigueur lors de la validation de la commande. Le
                paiement est effectué par carte bancaire ou tout autre moyen de
                paiement proposé sur le site. Le débit est effectué au moment de
                la confirmation de la commande.
              </Text>
            </section>

            {/* Livraison */}
            <section>
              <Heading level="h2" className="mb-2 text-ui-fg-base">
                4. Livraison
              </Heading>
              <Text className="text-ui-fg-muted">
                La livraison est effectuée à l&apos;adresse indiquée par le
                Client lors de la commande. Les délais de livraison sont
                communiqués avant la validation de la commande et peuvent varier
                selon la destination. GOYA ne saurait être tenu responsable des
                retards de livraison imputables au transporteur ou à un cas de
                force majeure. En cas de retard significatif, le Client peut
                annuler sa commande dans les conditions prévues par la
                réglementation applicable.
              </Text>
            </section>

            {/* Droit de rétractation */}
            <section>
              <Heading level="h2" className="mb-2 text-ui-fg-base">
                5. Droit de Rétractation
              </Heading>
              <Text className="text-ui-fg-muted">
                Conformément à la législation française, le Client dispose d&apos;un
                délai de quatorze (14) jours à compter de la réception des
                produits pour exercer son droit de rétractation, sans avoir à
                justifier de motifs ni à payer de pénalité, à l&apos;exception des
                frais de retour. Pour exercer ce droit, le Client doit notifier
                sa décision par e-mail à l&apos;adresse contact@goya.xyz ou par
                courrier à l&apos;adresse postale de GOYA. Les produits doivent
                être retournés dans leur état d&apos;origine, complets et dans leur
                emballage d&apos;origine, dans un délai de quatorze (14) jours
                suivant la communication de la décision de rétractation.
                Conformément à l&apos;article L221-28 du Code de la consommation, le
                droit de rétractation ne s&apos;applique pas aux biens
                personnalisés ou confectionnés selon les spécifications du
                Client.
              </Text>
            </section>

            {/* Retours et remboursements */}
            <section>
              <Heading level="h2" className="mb-2 text-ui-fg-base">
                6. Retours et Remboursements
              </Heading>
              <Text className="text-ui-fg-muted">
                Les frais de retour sont à la charge du Client, sauf en cas
                d&apos;erreur de la part de GOYA ou de produit défectueux. Le
                remboursement sera effectué dans un délai maximum de quatorze
                (14) jours à compter de la réception du produit retourné. Le
                remboursement s&apos;effectuera sur le même moyen de paiement que
                celui utilisé lors de la commande. GOYA se réserve le droit de
                refuser tout retour si le produit présente des traces
                d&apos;utilisation ou de détérioration anormale.
              </Text>
            </section>

            {/* Propriété intellectuelle */}
            <section>
              <Heading level="h2" className="mb-2 text-ui-fg-base">
                7. Propriété Intellectuelle
              </Heading>
              <Text className="text-ui-fg-muted">
                Tous les éléments du site goya.xyz (textes, images, logos,
                marques, designs) sont la propriété exclusive de GOYA ou de ses
                ayants droit. Toute reproduction, représentation, modification
                ou exploitation, même partielle, sans autorisation écrite
                préalable est interdite et constituerait une contrefaçon
                sanctionnée par le Code de la propriété intellectuelle.
              </Text>
            </section>

            {/* Responsabilité */}
            <section>
              <Heading level="h2" className="mb-2 text-ui-fg-base">
                8. Responsabilité
              </Heading>
              <Text className="text-ui-fg-muted">
                GOYA ne saurait être tenu responsable des dommages indirects
                résultant de l&apos;utilisation des produits achetés sur le site. La
                responsabilité de GOYA est limitée au montant de la commande
                concernée. GOYA ne pourra être tenu responsable en cas de force
                majeure telle que définie par la jurisprudence française.
              </Text>
            </section>

            {/* Droit applicable */}
            <section>
              <Heading level="h2" className="mb-2 text-ui-fg-base">
                9. Droit Applicable
              </Heading>
              <Text className="text-ui-fg-muted">
                Les présentes CGV sont soumises au droit français. Tout litige
                relatif à l&apos;interprétation ou à l&apos;exécution des présentes sera
                soumis aux tribunaux compétents français. Le Client est informé
                qu&apos;il peut recourir à la plateforme de règlement en ligne des
                litiges de consommation accessible à l&apos;adresse
                ec.europa.eu/consumers/odr.
              </Text>
            </section>

            {/* Contact */}
            <section>
              <Heading level="h2" className="mb-2 text-ui-fg-base">
                10. Contact
              </Heading>
              <Text className="text-ui-fg-muted">
                Pour toute question relative aux présentes CGV ou à vos
                commandes, vous pouvez nous contacter :
              </Text>
              <div className="flex flex-col gap-y-1 mt-2 text-ui-fg-muted text-sm">
                <span>GOYA — [Adresse à compléter]</span>
                <span>SIRET : [SIRET à compléter]</span>
                <span>E-mail : contact@goya.xyz</span>
                <span>Site web : goya.xyz</span>
              </div>
            </section>
          </div>
        </Container>
      </div>
    </div>
  )
}
