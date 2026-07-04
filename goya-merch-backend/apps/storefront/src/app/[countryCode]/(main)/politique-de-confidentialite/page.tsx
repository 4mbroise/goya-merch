import { Metadata } from "next"

import { Container, Heading, Text } from "@modules/common/components/ui"

export const metadata: Metadata = {
  title: "Politique de Confidentialité",
  description:
    "Politique de confidentialité et de protection des données personnelles de goya.xyz.",
}

export default async function PolitiqueConfidentialitePage() {
  return (
    <div className="content-container">
      <div className="py-8">
        <Container>
          <Heading level="h1" className="mb-6 text-ui-fg-base">
            Politique de Confidentialité
          </Heading>

          <div className="flex flex-col gap-y-4 text-ui-fg-base">
            {/* Responsable du traitement */}
            <section>
              <Heading level="h2" className="mb-2 text-ui-fg-base">
                1. Responsable du Traitement
              </Heading>
              <Text className="text-ui-fg-muted">
                Le responsable du traitement des données à caractère personnel
                collectées sur le site goya.xyz est l&apos;entité GOYA :
              </Text>
              <div className="flex flex-col gap-y-1 mt-2 text-ui-fg-muted text-sm">
                <span>GOYA — [Adresse à compléter]</span>
                <span>SIRET : [SIRET à compléter]</span>
                <span>E-mail : contact@goya.xyz</span>
              </div>
            </section>

            {/* Données collectées */}
            <section>
              <Heading level="h2" className="mb-2 text-ui-fg-base">
                2. Données Collectées
              </Heading>
              <Text className="text-ui-fg-muted">
                Dans le cadre de l&apos;utilisation du site et de la gestion des
                commandes, GOYA collecte les données suivantes :
              </Text>
              <ul className="list-disc pl-6 mt-2 text-ui-fg-muted text-sm flex flex-col gap-y-1">
                <li>
                  Données d&apos;identification : nom, prénom, adresse e-mail,
                  adresse postale, numéro de téléphone
                </li>
                <li>
                  Données de commande : produits achetés, montant, date,
                  historique des commandes
                </li>
                <li>
                  Données de paiement : informations de transaction (le site
                  utilise un prestataire de paiement sécurisé et ne conserve pas
                  les numéros de carte bancaire)
                </li>
                <li>
                  Données de navigation : adresse IP, type de navigateur,
                  pages visitées, durée de la session
                </li>
              </ul>
            </section>

            {/* Finalités du traitement */}
            <section>
              <Heading level="h2" className="mb-2 text-ui-fg-base">
                3. Finalités du Traitement
              </Heading>
              <Text className="text-ui-fg-muted">
                Les données collectées sont utilisées aux fins suivantes :
              </Text>
              <ul className="list-disc pl-6 mt-2 text-ui-fg-muted text-sm flex flex-col gap-y-1">
                <li>
                  Gestion et traitement des commandes et des paiements
                </li>
                <li>
                  Communication avec le Client (confirmation de commande,
                  suivi de livraison, service client)
                </li>
                <li>
                  Envoi d&apos;informations commerciales et promotionnelles
                  (uniquement avec le consentement du Client)
                </li>
                <li>
                  Amélioration du site et de l&apos;expérience utilisateur
                </li>
                <li>
                  Respect des obligations légales et réglementaires (facturation,
                  comptabilité)
                </li>
                <li>
                  Lutte contre la fraude et sécurisation des paiements
                </li>
              </ul>
            </section>

            {/* Base légale */}
            <section>
              <Heading level="h2" className="mb-2 text-ui-fg-base">
                4. Base Légale du Traitement
              </Heading>
              <Text className="text-ui-fg-muted">
                Le traitement des données personnelles repose sur les bases
                légales suivantes :
              </Text>
              <ul className="list-disc pl-6 mt-2 text-ui-fg-muted text-sm flex flex-col gap-y-1">
                <li>
                  L&apos;exécution du contrat de vente (article 6.1.b du RGPD)
                  pour la gestion des commandes
                </li>
                <li>
                  Le consentement (article 6.1.a du RGPD) pour l&apos;envoi de
                  communications marketing et l&apos;utilisation de cookies non
                  essentiels
                </li>
                <li>
                  L&apos;obligation légale (article 6.1.c du RGPD) pour la
                  facturation et la comptabilité
                </li>
                <li>
                  L&apos;intérêt légitime (article 6.1.f du RGPD) pour
                  l&apos;amélioration du site et la prévention de la fraude
                </li>
              </ul>
            </section>

            {/* Durée de conservation */}
            <section>
              <Heading level="h2" className="mb-2 text-ui-fg-base">
                5. Durée de Conservation
              </Heading>
              <Text className="text-ui-fg-muted">
                Les données personnelles sont conservées pour la durée
                nécessaire à la réalisation des finalités pour lesquelles elles
                ont été collectées :
              </Text>
              <ul className="list-disc pl-6 mt-2 text-ui-fg-muted text-sm flex flex-col gap-y-1">
                <li>
                  Données de commande et facturation : conservées pendant la
                  durée légale de 10 ans (obligation comptable)
                </li>
                <li>
                  Données clients : conservées pendant 3 ans à compter du
                  dernier contact actif
                </li>
                <li>
                  Données de navigation et cookies : conservées pour une durée
                  maximale de 13 mois
                </li>
                <li>
                  Données marketing : conservées jusqu&apos;au retrait du
                  consentement
                </li>
              </ul>
            </section>

            {/* Destinataires */}
            <section>
              <Heading level="h2" className="mb-2 text-ui-fg-base">
                6. Destinataires des Données
              </Heading>
              <Text className="text-ui-fg-muted">
                Les données collectées sont destinées aux services internes de
                GOYA. Elles peuvent être transmises aux tiers suivants, dans la
                limite de leurs attributions :
              </Text>
              <ul className="list-disc pl-6 mt-2 text-ui-fg-muted text-sm flex flex-col gap-y-1">
                <li>
                  Prestataires de paiement (Stripe) pour le traitement des
                  transactions
                </li>
                <li>
                  Transporteurs pour la livraison des commandes
                </li>
                <li>
                  Hébergeur du site pour la maintenance technique
                </li>
                <li>
                  Autorités compétentes en cas d&apos;obligation légale
                </li>
              </ul>
              <Text className="text-ui-fg-muted mt-2">
                GOYA s&apos;assure que ses sous-traitants respectent la
                réglementation applicable en matière de protection des données.
              </Text>
            </section>

            {/* Droits des personnes */}
            <section>
              <Heading level="h2" className="mb-2 text-ui-fg-base">
                7. Droits des Personnes Concernées
              </Heading>
              <Text className="text-ui-fg-muted">
                Conformément au RGPD et à la loi Informatique et Libertés,
                toute personne physique dont les données sont traitées dispose
                des droits suivants :
              </Text>
              <ul className="list-disc pl-6 mt-2 text-ui-fg-muted text-sm flex flex-col gap-y-1">
                <li>Droit d&apos;accès (article 15 RGPD)</li>
                <li>Droit de rectification (article 16 RGPD)</li>
                <li>Droit à l&apos;effacement (droit à l&apos;oubli — article 17 RGPD)</li>
                <li>Droit à la limitation du traitement (article 18 RGPD)</li>
                <li>Droit à la portabilité des données (article 20 RGPD)</li>
                <li>Droit d&apos;opposition (article 21 RGPD)</li>
                <li>
                  Droit de retirer son consentement à tout moment, sans
                  préjudice de la licéité du traitement effectué avant le retrait
                </li>
                <li>
                  Droit d&apos;introduire une réclamation auprès de la CNIL
                  (www.cnil.fr)
                </li>
              </ul>
              <Text className="text-ui-fg-muted mt-2">
                Pour exercer ces droits, le Client peut contacter GOYA par
                e-mail à contact@goya.xyz ou par courrier à l&apos;adresse postale
                indiquée à l&apos;article 1. GOYA s&apos;engage à répondre dans un délai
                d&apos;un (1) mois à compter de la réception de la demande.
              </Text>
            </section>

            {/* Cookies */}
            <section>
              <Heading level="h2" className="mb-2 text-ui-fg-base">
                8. Cookies
              </Heading>
              <Text className="text-ui-fg-muted">
                Le site goya.xyz utilise des cookies et technologies similaires
                pour assurer le fonctionnement du site, améliorer
                l&apos;expérience utilisateur et établir des statistiques de
                fréquentation.
              </Text>
              <Text className="text-ui-fg-muted mt-2">
                <strong>Cookies essentiels :</strong> nécessaires au
                fonctionnement du site (gestion de session, authentification,
                panier). Ils ne nécessitent pas de consentement préalable.
              </Text>
              <Text className="text-ui-fg-muted mt-2">
                <strong>Cookies d&apos;analyse :</strong> utilisés pour mesurer
                l&apos;audience et les performances du site (pages visitées,
                durée des sessions). Ces cookies ne sont déposés qu&apos;avec le
                consentement du visiteur.
              </Text>
              <Text className="text-ui-fg-muted mt-2">
                <strong>Cookies tiers :</strong> peuvent être déposés par nos
                prestataires de paiement et de livraison pour assurer leurs
                services.
              </Text>
              <Text className="text-ui-fg-muted mt-2">
                Le Client peut configurer ses préférences en matière de cookies
                à tout moment via les paramètres de son navigateur ou via le
                bandeau cookies présent lors de sa première visite.
              </Text>
            </section>

            {/* Contact */}
            <section>
              <Heading level="h2" className="mb-2 text-ui-fg-base">
                9. Contact
              </Heading>
              <Text className="text-ui-fg-muted">
                Pour toute question relative à la présente politique de
                confidentialité ou à l&apos;exercice de vos droits, vous pouvez nous
                contacter :
              </Text>
              <div className="flex flex-col gap-y-1 mt-2 text-ui-fg-muted text-sm">
                <span>E-mail : contact@goya.xyz</span>
                <span>Adresse : [Adresse à compléter]</span>
              </div>
            </section>
          </div>
        </Container>
      </div>
    </div>
  )
}
