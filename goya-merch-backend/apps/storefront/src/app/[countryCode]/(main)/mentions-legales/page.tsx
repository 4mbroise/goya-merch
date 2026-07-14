import { Metadata } from "next"

import { Container, Heading, Text } from "@modules/common/components/ui"

export const metadata: Metadata = {
  title: "Mentions Légales",
  description: "Mentions légales du site goya.xyz — boutique officielle GOYA.",
}

export default async function MentionsLegalesPage() {
  return (
    <div className="content-container">
      <div className="py-8">
        <Container>
          <Heading level="h1" className="mb-6 text-ui-fg-base">
            Mentions Légales
          </Heading>

          <div className="flex flex-col gap-y-4 text-ui-fg-base">
            {/* Éditeur du site */}
            <section>
              <Heading level="h2" className="mb-2 text-ui-fg-base">
                1. Éditeur du Site
              </Heading>
              <Text className="text-ui-fg-muted">
                Le site goya.xyz est édité par l&apos;entité GOYA, dont les
                coordonnées sont les suivantes :
              </Text>
              <div className="flex flex-col gap-y-1 mt-2 text-ui-fg-muted text-sm">
                <span>Dénomination : GOYA</span>
                <span>Forme juridique : [Forme juridique à compléter]</span>
                <span>Capital social : [Capital social à compléter]</span>
                <span>Numéro SIRET : [SIRET à compléter]</span>
                <span>
                  Registre du commerce : [RCS à compléter]
                </span>
                <span>Siège social : [Adresse à compléter]</span>
                <span>Numéro de TVA intracommunautaire : [TVA à compléter]</span>
                <span>E-mail : contact@goya.xyz</span>
                <span>Téléphone : [Téléphone à compléter]</span>
              </div>
            </section>

            {/* Directeur de la publication */}
            <section>
              <Heading level="h2" className="mb-2 text-ui-fg-base">
                2. Directeur de la Publication
              </Heading>
              <Text className="text-ui-fg-muted">
                Le directeur de la publication est [Nom du représentant légal à
                compléter].
              </Text>
            </section>

            {/* Hébergement */}
            <section>
              <Heading level="h2" className="mb-2 text-ui-fg-base">
                3. Hébergement
              </Heading>
              <Text className="text-ui-fg-muted">
                Le site goya.xyz est hébergé par :
              </Text>
              <div className="flex flex-col gap-y-1 mt-2 text-ui-fg-muted text-sm">
                <span>[Nom de l&apos;hébergeur à compléter]</span>
                <span>[Adresse de l&apos;hébergeur à compléter]</span>
                <span>[Téléphone de l&apos;hébergeur à compléter]</span>
              </div>
            </section>

            {/* Propriété intellectuelle */}
            <section>
              <Heading level="h2" className="mb-2 text-ui-fg-base">
                4. Propriété Intellectuelle
              </Heading>
              <Text className="text-ui-fg-muted">
                L&apos;ensemble du contenu du site goya.xyz (structure, textes,
                images, illustrations, logos, marques, vidéos, sons) est protégé
                par le droit d&apos;auteur et le droit de la propriété
                intellectuelle. Toute représentation, reproduction,
                modification ou exploitation, totale ou partielle, sans
                l&apos;autorisation écrite et préalable de GOYA est strictement
                interdite et pourra constituer une contrefaçon au sens des
                articles L335-2 et suivants du Code de la propriété
                intellectuelle.
              </Text>
            </section>

            {/* Données personnelles / RGPD */}
            <section>
              <Heading level="h2" className="mb-2 text-ui-fg-base">
                5. Données Personnelles
              </Heading>
              <Text className="text-ui-fg-muted">
                Le site goya.xyz collecte et traite des données personnelles
                dans le cadre de la gestion des commandes et de la relation
                client. Conformément au Règlement Général sur la Protection des
                Données (RGPD) et à la loi Informatique et Libertés, le Client
                dispose d&apos;un droit d&apos;accès, de rectification, d&apos;effacement et
                de portabilité de ses données, ainsi que d&apos;un droit
                d&apos;opposition et de limitation du traitement. Pour exercer ces
                droits, contacter GOYA par e-mail à contact@goya.xyz. Pour plus
                d&apos;informations, consultez notre{" "}
                <a
                  href="/politique-de-confidentialite"
                  className="underline hover:text-ui-fg-base"
                >
                  Politique de Confidentialité
                </a>
                .
              </Text>
            </section>

            {/* Cookies */}
            <section>
              <Heading level="h2" className="mb-2 text-ui-fg-base">
                6. Cookies
              </Heading>
              <Text className="text-ui-fg-muted">
                Le site goya.xyz peut utiliser des cookies nécessaires au bon
                fonctionnement du site et à la gestion des sessions. Certains
                cookies tiers peuvent être déposés pour l&apos;analyse d&apos;audience et
                les fonctionnalités de paiement. Le Client peut configurer ses
                préférences en matière de cookies dans les paramètres de son
                navigateur. Pour en savoir plus, consultez notre{" "}
                <a
                  href="/politique-de-confidentialite"
                  className="underline hover:text-ui-fg-base"
                >
                  Politique de Confidentialité
                </a>
                .
              </Text>
            </section>

            {/* Contact */}
            <section>
              <Heading level="h2" className="mb-2 text-ui-fg-base">
                7. Contact
              </Heading>
              <Text className="text-ui-fg-muted">
                Pour toute question relative aux mentions légales, vous pouvez
                nous contacter :
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
