import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Datenschutzerklärung",
  description: "Datenschutzerklärung der Website pascalsterzik.com.",
  alternates: { canonical: "/datenschutz" },
  robots: { index: true, follow: true },
};

/**
 * Lifted from the retired sterzik-solutions site and FACT-CORRECTED:
 *  - controller e-mail → pascal@pascalsterzik.com
 *  - first-person singular voice (Einzelunternehmen)
 *  - processor list rewritten to match what THIS site actually uses:
 *      Vercel (hosting), Tally (audit application form), Cal.com (booking),
 *      self-hosted fonts (no Google Fonts), no analytics / no marketing cookies.
 *
 * ── FLAGS for Pascal (verify before the Phase-5 production launch) ──────────
 *  1. Vercel: insert exact registered address; confirm an AVV/DPA is in place.
 *  2. Tally: confirm the exact legal entity + address, sign the AVV, and that
 *     the real form is live (the form is a placeholder until you provide it).
 *  3. Cal.com vs Calendly: confirm which booking tool you use, its entity, and
 *     sign the AVV. If you switch to Calendly, replace this section.
 *  4. If you later add analytics/tracking or any cookies, this page MUST be
 *     updated (and a cookie/consent banner likely added).
 *  5. Have a lawyer / Datenschutzbeauftragter review the final text.
 */
export default function DatenschutzPage() {
  return (
    <>
      <section className="page-top">
        <div className="container">
          <article className="legal" lang="de">
            <h1 className="display-l">Datenschutzerklärung</h1>

            <section>
              <h2>1. Datenschutz auf einen Blick</h2>

              <h3>Allgemeine Hinweise</h3>
              <p>
                Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren
                personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene
                Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.
              </p>

              <h3>Datenerfassung auf dieser Website</h3>
              <p>
                <strong>Wer ist verantwortlich für die Datenerfassung auf dieser Website?</strong>
                <br />
                Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen
                Kontaktdaten können Sie dem Abschnitt „Verantwortliche Stelle&quot; dieser
                Datenschutzerklärung entnehmen.
              </p>
              <p>
                <strong>Wie erfasse ich Ihre Daten?</strong>
                <br />
                Ihre Daten werden zum einen dadurch erhoben, dass Sie mir diese mitteilen. Hierbei
                kann es sich z.B. um Daten handeln, die Sie in eine Anfrage per E-Mail, in das
                Bewerbungsformular für das Growth-Audit oder bei einer Terminbuchung eingeben. Andere
                Daten werden automatisch beim Besuch der Website durch die IT-Systeme des
                Hosting-Anbieters erfasst. Das sind vor allem technische Daten (z.B. Internetbrowser,
                Betriebssystem oder Uhrzeit des Seitenaufrufs).
              </p>
            </section>

            <section>
              <h2>2. Verantwortliche Stelle</h2>
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
                <br />
                <br />
                E-Mail: <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
              </p>
              <p>
                Verantwortliche Stelle ist die natürliche oder juristische Person, die allein oder
                gemeinsam mit anderen über die Zwecke und Mittel der Verarbeitung von
                personenbezogenen Daten entscheidet.
              </p>
            </section>

            <section>
              <h2>3. Hosting</h2>
              <p>
                Diese Website wird extern bei Vercel gehostet. Anbieter ist die Vercel Inc., USA
                (nachfolgend „Vercel&quot;). Wenn Sie diese Website besuchen, erfasst Vercel
                verschiedene Logfiles inklusive Ihrer IP-Adresse. Die Erfassung dient der
                technischen Bereitstellung, Auslieferung und Sicherheit der Website.
              </p>
              <p>
                Die Verwendung von Vercel erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Ich
                habe ein berechtigtes Interesse an einer möglichst zuverlässigen und sicheren
                Darstellung meiner Website. Eine etwaige Datenübermittlung in die USA wird auf die
                Standardvertragsklauseln der EU-Kommission gestützt. Weitere Informationen finden Sie
                in der Datenschutzerklärung von Vercel unter{" "}
                <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">
                  vercel.com/legal/privacy-policy
                </a>
                .
              </p>
            </section>

            <section>
              <h2>4. Datenerfassung auf dieser Website</h2>

              <h3>Server-Log-Dateien</h3>
              <p>
                Der Hosting-Anbieter dieser Seiten erhebt und speichert automatisch Informationen in
                so genannten Server-Log-Dateien, die Ihr Browser automatisch übermittelt. Dies sind:
                Browsertyp und Browserversion, verwendetes Betriebssystem, Referrer URL, Hostname des
                zugreifenden Rechners, Uhrzeit der Serveranfrage und IP-Adresse. Eine Zusammenführung
                dieser Daten mit anderen Datenquellen wird nicht vorgenommen. Rechtsgrundlage ist
                Art. 6 Abs. 1 lit. f DSGVO.
              </p>

              <h3>Anfrage per E-Mail</h3>
              <p>
                Wenn Sie mir per E-Mail Anfragen zukommen lassen, werden Ihre Angaben inklusive der
                von Ihnen angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von
                Anschlussfragen bei mir gespeichert. Diese Daten gebe ich nicht ohne Ihre Einwilligung
                weiter. Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO, sofern
                Ihre Anfrage mit der Anbahnung eines Vertrags zusammenhängt, im Übrigen auf Grundlage
                meines berechtigten Interesses an der Bearbeitung (Art. 6 Abs. 1 lit. f DSGVO).
              </p>

              <h3>Bewerbung für das Growth-Audit (Tally)</h3>
              <p>
                Die Bewerbung für das kostenlose Growth-Audit erfolgt über ein Online-Formular des
                Anbieters Tally (Tally BV, Belgien). Wenn Sie das Formular ausfüllen und absenden,
                werden die von Ihnen eingegebenen Daten (z.B. Name, E-Mail-Adresse, Angaben zu Ihrer
                Marke und Ihrem Geschäft) durch Tally verarbeitet und mir zur Bearbeitung der
                Bewerbung bereitgestellt. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (Durchführung
                vorvertraglicher Maßnahmen). Es besteht ein Auftragsverarbeitungsvertrag mit dem
                Anbieter. Weitere Informationen finden Sie in der Datenschutzerklärung von Tally unter{" "}
                <a href="https://tally.so/help/gdpr" target="_blank" rel="noopener noreferrer">
                  tally.so/help/gdpr
                </a>
                .
              </p>

              <h3>Terminbuchung (Cal.com)</h3>
              <p>
                Für die Buchung von Gesprächsterminen nutze ich den Dienst Cal.com (Cal.com, Inc.,
                USA). Wenn Sie über den Buchungslink einen Termin vereinbaren, werden die von Ihnen
                angegebenen Daten (z.B. Name, E-Mail-Adresse und Terminwunsch) durch Cal.com
                verarbeitet. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO. Eine etwaige
                Datenübermittlung in die USA wird auf die Standardvertragsklauseln der EU-Kommission
                gestützt. Weitere Informationen finden Sie in der Datenschutzerklärung von Cal.com
                unter{" "}
                <a href="https://cal.com/privacy" target="_blank" rel="noopener noreferrer">
                  cal.com/privacy
                </a>
                .
              </p>

              <h3>Schriftarten (selbst gehostet)</h3>
              <p>
                Diese Website nutzt zur einheitlichen Darstellung von Schriftarten selbst gehostete
                Schriften (self-hosted via next/font). Beim Aufruf der Seiten werden keine
                Verbindungen zu Servern Dritter (z.B. Google Fonts) aufgebaut; die Schriften werden
                direkt vom Hosting-Anbieter dieser Website ausgeliefert.
              </p>

              <h3>Keine Analyse-Tools und keine Marketing-Cookies</h3>
              <p>
                Derzeit setze ich auf dieser Website keine Analyse- oder Tracking-Tools und keine
                Cookies zu Marketing- oder Analysezwecken ein. Sollte sich dies ändern, wird diese
                Datenschutzerklärung entsprechend angepasst.
              </p>
            </section>

            <section>
              <h2>5. SSL- bzw. TLS-Verschlüsselung</h2>
              <p>
                Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung
                vertraulicher Inhalte eine SSL- bzw. TLS-Verschlüsselung. Eine verschlüsselte
                Verbindung erkennen Sie daran, dass die Adresszeile des Browsers von „http://&quot;
                auf „https://&quot; wechselt.
              </p>
            </section>

            <section>
              <h2>6. Ihre Rechte</h2>
              <p>
                Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und
                Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein
                Recht auf Berichtigung oder Löschung dieser Daten sowie auf Einschränkung der
                Verarbeitung und ein Recht auf Datenübertragbarkeit. Wenn Sie eine Einwilligung zur
                Datenverarbeitung erteilt haben, können Sie diese Einwilligung jederzeit für die
                Zukunft widerrufen.
              </p>
              <p>
                Ihnen steht zudem ein Beschwerderecht bei der zuständigen Aufsichtsbehörde zu.
                Hierzu sowie zu weiteren Fragen zum Thema Datenschutz können Sie sich jederzeit an
                mich wenden.
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
