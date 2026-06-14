import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Impressum",
  description: "Impressum von Pascal Sterzik, Sterzik Solutions.",
  alternates: { canonical: "/impressum" },
  robots: { index: true, follow: true },
};

/**
 * Lifted from the retired sterzik-solutions site and FACT-CORRECTED against
 * business-info.md / personal-info.md:
 *  - contact e-mail set to pascal@pascalsterzik.com per the build brief
 *  - name / address / USt-IdNr verified
 *  - statutory references modernised: § 5 TMG → § 5 DDG, § 7 TMG → § 7 DDG,
 *    § 55 RStV → § 18 MStV (TMG was superseded by the DDG in 2024).
 *  - first-person singular voice (Einzelunternehmen, one person).
 * NOTE for Pascal: have these confirmed by your Steuerberater/lawyer before launch.
 */
export default function ImpressumPage() {
  return (
    <>
      <section className="page-top">
        <div className="container">
          <article className="legal" lang="de">
            <h1 className="display-l">Impressum</h1>

            <section>
              <h2>Angaben gemäß § 5 DDG</h2>
              <p>
                Pascal Sterzik
                <br />
                Sterzik Solutions
                <br />
                {siteConfig.address.street}
                <br />
                {siteConfig.address.postalCode} {siteConfig.address.city}
                <br />
                Deutschland
              </p>
            </section>

            <section>
              <h2>Kontakt</h2>
              <p>
                E-Mail:{" "}
                <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
              </p>
            </section>

            <section>
              <h2>Umsatzsteuer-ID</h2>
              <p>
                Umsatzsteuer-Identifikationsnummer gemäß § 27a Umsatzsteuergesetz:
                <br />
                {siteConfig.ustId}
              </p>
            </section>

            <section>
              <h2>Redaktionell verantwortlich gemäß § 18 Abs. 2 MStV</h2>
              <p>
                Pascal Sterzik
                <br />
                {siteConfig.address.street}
                <br />
                {siteConfig.address.postalCode} {siteConfig.address.city}
              </p>
            </section>

            <section>
              <h2>Haftungsausschluss</h2>

              <h3>Haftung für Inhalte</h3>
              <p>
                Die Inhalte meiner Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit,
                Vollständigkeit und Aktualität der Inhalte kann ich jedoch keine Gewähr übernehmen.
                Als Diensteanbieter bin ich gemäß § 7 Abs. 1 DDG für eigene Inhalte auf diesen Seiten
                nach den allgemeinen Gesetzen verantwortlich.
              </p>

              <h3>Haftung für Links</h3>
              <p>
                Mein Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte ich
                keinen Einfluss habe. Deshalb kann ich für diese fremden Inhalte auch keine Gewähr
                übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter
                oder Betreiber der Seiten verantwortlich.
              </p>

              <h3>Urheberrecht</h3>
              <p>
                Die durch den Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten
                unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung,
                Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes
                bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
              </p>
            </section>
          </article>
        </div>
      </section>

      <section className="section section--ink">
        <div className="container">
          <SiteFooter bare />
        </div>
      </section>
    </>
  );
}
