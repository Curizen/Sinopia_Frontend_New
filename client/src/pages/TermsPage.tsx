import { PublicLayout } from '@/components/layouts/PublicLayout';

export default function TermsPage() {
  return (
    <PublicLayout>
      <div className="py-16 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* German Version */}
          <section className="mb-16">
            <h1 className="font-display text-4xl font-bold mb-2">
              Allgemeine Geschäftsbedingungen (AGB)
            </h1>
            <p className="text-xl text-muted-foreground mb-2">Sinopia Deutschland GmbH</p>
            <p className="text-sm text-muted-foreground mb-8">Stand: 27.01.2026</p>
            
            <div className="prose prose-lg max-w-none text-muted-foreground space-y-8">
              
              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">§ 1 Geltungsbereich und Begriffsbestimmungen</h2>
                <p className="mb-4">
                  (1) Diese Allgemeinen Geschäftsbedingungen (nachfolgend „AGB") gelten für alle Verträge zwischen der Sinopia Deutschland GmbH (nachfolgend „Anbieter") und dem Kunden (nachfolgend „Kunde") über die Nutzung der vom Anbieter bereitgestellten digitalen Plattform und Dienstleistungen.
                </p>
                <p className="mb-4">
                  (2) Abweichende, entgegenstehende oder ergänzende Allgemeine Geschäftsbedingungen des Kunden werden nur dann Vertragsbestandteil, wenn und soweit der Anbieter ihrer Geltung ausdrücklich schriftlich zugestimmt hat.
                </p>
                <p>
                  (3) Der Begriff „Kunde" umfasst sowohl Verbraucher als auch Unternehmer im Sinne der §§ 13, 14 BGB.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">§ 2 Vertragsgegenstand</h2>
                <p className="mb-4">
                  (1) Der Anbieter betreibt eine digitale Plattform, die Unternehmen und Fachkräfte (Skill Giver und Skill Searcher) zusammenführt, um geschäftliche Anwendungsfälle in konkrete Ergebnisse zu verwandeln.
                </p>
                <p className="mb-4">
                  (2) Die Plattform ermöglicht die Vermittlung von Fähigkeiten, das Matching von Anforderungen und Kompetenzen sowie die Nutzung von KI-gestützten Funktionen zur Optimierung der Zusammenarbeit.
                </p>
                <p>
                  (3) Der genaue Leistungsumfang ergibt sich aus der jeweiligen Leistungsbeschreibung auf der Plattform sowie etwaigen individuellen Vereinbarungen.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">§ 3 Vertragsschluss</h2>
                <p className="mb-4">
                  (1) Die Darstellung der Dienstleistungen auf der Plattform stellt kein rechtlich bindendes Angebot, sondern eine Aufforderung zur Abgabe eines Angebots dar.
                </p>
                <p className="mb-4">
                  (2) Der Vertrag kommt durch die Registrierung des Kunden auf der Plattform und die Bestätigung durch den Anbieter zustande.
                </p>
                <p>
                  (3) Der Anbieter behält sich das Recht vor, Registrierungen ohne Angabe von Gründen abzulehnen.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">§ 4 Leistungserbringung</h2>
                <p className="mb-4">
                  (1) Der Anbieter erbringt seine Leistungen nach bestem Wissen und Gewissen und unter Einsatz der vereinbarten technischen Mittel.
                </p>
                <p className="mb-4">
                  (2) Eine Garantie für die ununterbrochene Verfügbarkeit der Plattform wird nicht übernommen. Wartungsarbeiten werden nach Möglichkeit angekündigt.
                </p>
                <p>
                  (3) Der Anbieter ist berechtigt, die Plattform weiterzuentwickeln und anzupassen, sofern dies den Vertragszweck nicht wesentlich beeinträchtigt.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">§ 5 Pflichten des Kunden</h2>
                <p className="mb-4">
                  (1) Der Kunde verpflichtet sich, bei der Registrierung wahrheitsgemäße Angaben zu machen und diese aktuell zu halten.
                </p>
                <p className="mb-4">
                  (2) Der Kunde ist für die Geheimhaltung seiner Zugangsdaten selbst verantwortlich und haftet für alle Aktivitäten, die unter seinem Konto stattfinden.
                </p>
                <p className="mb-4">
                  (3) Der Kunde verpflichtet sich, die Plattform nicht missbräuchlich zu nutzen, insbesondere keine rechtswidrigen Inhalte hochzuladen oder zu verbreiten.
                </p>
                <p>
                  (4) Der Kunde stellt den Anbieter von allen Ansprüchen Dritter frei, die aufgrund einer schuldhaften Verletzung dieser Pflichten entstehen.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">§ 6 Vergütung und Preise</h2>
                <p className="mb-4">
                  (1) Die Nutzung der Plattform kann kostenpflichtig sein. Die aktuellen Preise sind auf der Plattform einsehbar.
                </p>
                <p className="mb-4">
                  (2) Alle Preise verstehen sich zuzüglich der gesetzlichen Mehrwertsteuer, sofern nicht anders angegeben.
                </p>
                <p>
                  (3) Preisänderungen werden dem Kunden rechtzeitig mitgeteilt und gelten ab dem nächsten Abrechnungszeitraum.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">§ 7 Zahlungsbedingungen</h2>
                <p className="mb-4">
                  (1) Die Zahlung erfolgt nach Rechnungsstellung durch den Anbieter. Rechnungen sind innerhalb von 14 Tagen nach Erhalt ohne Abzug zu begleichen.
                </p>
                <p className="mb-4">
                  (2) Bei Zahlungsverzug ist der Anbieter berechtigt, Verzugszinsen in gesetzlicher Höhe zu erheben.
                </p>
                <p>
                  (3) Der Kunde kann nur mit unbestrittenen oder rechtskräftig festgestellten Forderungen aufrechnen.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">§ 8 Verzug, Leistungsstörungen, Höhere Gewalt</h2>
                <p className="mb-4">
                  (1) Der Anbieter haftet nicht für Verzögerungen oder Ausfälle, die auf Umstände zurückzuführen sind, die außerhalb seines Einflussbereichs liegen (höhere Gewalt).
                </p>
                <p className="mb-4">
                  (2) Zu höherer Gewalt zählen insbesondere Naturkatastrophen, Pandemien, behördliche Maßnahmen, Streiks und technische Störungen bei Drittanbietern.
                </p>
                <p>
                  (3) Im Falle höherer Gewalt werden die vertraglichen Pflichten für die Dauer der Beeinträchtigung ausgesetzt.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">§ 9 Haftung</h2>
                <p className="mb-4">
                  (1) Der Anbieter haftet unbeschränkt für Schäden aus der Verletzung des Lebens, des Körpers oder der Gesundheit sowie bei Vorsatz und grober Fahrlässigkeit.
                </p>
                <p className="mb-4">
                  (2) Bei leichter Fahrlässigkeit haftet der Anbieter nur bei Verletzung wesentlicher Vertragspflichten (Kardinalpflichten), begrenzt auf den vorhersehbaren, vertragstypischen Schaden.
                </p>
                <p>
                  (3) Eine weitergehende Haftung ist ausgeschlossen, soweit gesetzlich zulässig.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">§ 10 Mängel und Gewährleistung</h2>
                <p className="mb-4">
                  (1) Der Kunde ist verpflichtet, Mängel unverzüglich nach deren Entdeckung schriftlich anzuzeigen.
                </p>
                <p className="mb-4">
                  (2) Der Anbieter wird Mängel im Rahmen seiner technischen und wirtschaftlichen Möglichkeiten beheben.
                </p>
                <p>
                  (3) Die Gewährleistungsfrist für Mängel beträgt 12 Monate ab Leistungserbringung, sofern nicht gesetzlich eine längere Frist vorgeschrieben ist.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">§ 11 Vertragsbeendigung</h2>
                <p className="mb-4">
                  (1) Der Vertrag kann von beiden Parteien unter Einhaltung einer Kündigungsfrist von 30 Tagen zum Monatsende ordentlich gekündigt werden.
                </p>
                <p className="mb-4">
                  (2) Das Recht zur außerordentlichen Kündigung aus wichtigem Grund bleibt unberührt.
                </p>
                <p>
                  (3) Die Kündigung bedarf der Textform (z. B. E-Mail).
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">§ 12 Widerruf durch den Kunden</h2>
                <p className="mb-4">
                  (1) Verbrauchern steht ein gesetzliches Widerrufsrecht gemäß §§ 312g, 355 BGB zu.
                </p>
                <p className="mb-4">
                  (2) Der Widerruf ist innerhalb von 14 Tagen nach Vertragsschluss ohne Angabe von Gründen möglich.
                </p>
                <p>
                  (3) Zur Ausübung des Widerrufsrechts genügt eine eindeutige Erklärung gegenüber dem Anbieter.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">§ 13 Urheberrechte und Nutzungsrechte</h2>
                <p className="mb-4">
                  (1) Alle Inhalte der Plattform (Texte, Grafiken, Software, etc.) sind urheberrechtlich geschützt und Eigentum des Anbieters oder lizenzierter Dritter.
                </p>
                <p className="mb-4">
                  (2) Der Kunde erhält ein einfaches, nicht übertragbares Nutzungsrecht an den Inhalten für die Dauer des Vertrages.
                </p>
                <p>
                  (3) Eine Vervielfältigung, Verbreitung oder öffentliche Zugänglichmachung ohne Zustimmung ist untersagt.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">§ 14 Vertraulichkeit</h2>
                <p className="mb-4">
                  (1) Beide Parteien verpflichten sich, alle im Rahmen der Zusammenarbeit erhaltenen vertraulichen Informationen geheim zu halten.
                </p>
                <p className="mb-4">
                  (2) Diese Verpflichtung gilt auch nach Beendigung des Vertragsverhältnisses fort.
                </p>
                <p>
                  (3) Ausgenommen sind Informationen, die öffentlich bekannt sind oder ohne Verschulden bekannt werden.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">§ 15 Datenschutz</h2>
                <p className="mb-4">
                  (1) Der Anbieter verarbeitet personenbezogene Daten gemäß den geltenden datenschutzrechtlichen Bestimmungen, insbesondere der DSGVO.
                </p>
                <p className="mb-4">
                  (2) Einzelheiten zur Datenverarbeitung sind in der Datenschutzerklärung auf der Plattform einsehbar.
                </p>
                <p>
                  (3) Der Kunde willigt in die Verarbeitung seiner Daten zum Zweck der Vertragserfüllung ein.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">§ 16 Schlussbestimmungen</h2>
                <p className="mb-4">
                  (1) Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss des UN-Kaufrechts.
                </p>
                <p className="mb-4">
                  (2) Gerichtsstand ist, soweit gesetzlich zulässig, der Sitz des Anbieters.
                </p>
                <p className="mb-4">
                  (3) Sollten einzelne Bestimmungen unwirksam sein oder werden, bleibt die Wirksamkeit der übrigen Bestimmungen unberührt.
                </p>
                <p>
                  (4) Änderungen und Ergänzungen dieser AGB bedürfen der Textform.
                </p>
              </section>

            </div>
          </section>

          {/* Divider */}
          <hr className="border-t border-border my-12" />

          {/* English Version */}
          <section>
            <h1 className="font-display text-4xl font-bold mb-2">
              Terms and Conditions
            </h1>
            <p className="text-xl text-muted-foreground mb-2">Sinopia Deutschland GmbH</p>
            <p className="text-sm text-muted-foreground mb-8">Last updated: January 27, 2026</p>
            
            <div className="prose prose-lg max-w-none text-muted-foreground space-y-8">
              
              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">Section 1: Scope and Definitions</h2>
                <p className="mb-4">
                  (1) These Terms and Conditions (hereinafter "Terms") apply to all contracts between Sinopia Deutschland GmbH (hereinafter "Service Provider") and the customer (hereinafter "Customer") regarding the use of the digital platform and services provided by the Service Provider.
                </p>
                <p className="mb-4">
                  (2) Deviating, conflicting, or supplementary terms and conditions of the Customer shall only become part of the contract if and to the extent that the Service Provider has expressly agreed to their validity in writing.
                </p>
                <p>
                  (3) The term "Customer" includes both consumers and entrepreneurs within the meaning of Sections 13 and 14 of the German Civil Code (BGB).
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">Section 2: Subject Matter of the Services</h2>
                <p className="mb-4">
                  (1) The Service Provider operates a digital platform that connects businesses and professionals (Skill Givers and Skill Searchers) to transform business use cases into concrete results.
                </p>
                <p className="mb-4">
                  (2) The platform enables the matching of skills, the alignment of requirements and competencies, and the use of AI-powered features to optimize collaboration.
                </p>
                <p>
                  (3) The exact scope of services is determined by the respective service description on the platform and any individual agreements.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">Section 3: Conclusion of Contract</h2>
                <p className="mb-4">
                  (1) The presentation of services on the platform does not constitute a legally binding offer, but rather an invitation to submit an offer.
                </p>
                <p className="mb-4">
                  (2) The contract is concluded upon the Customer's registration on the platform and confirmation by the Service Provider.
                </p>
                <p>
                  (3) The Service Provider reserves the right to reject registrations without stating reasons.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">Section 4: Service Delivery</h2>
                <p className="mb-4">
                  (1) The Service Provider shall perform its services to the best of its knowledge and ability, using the agreed technical resources.
                </p>
                <p className="mb-4">
                  (2) No guarantee is provided for the uninterrupted availability of the platform. Maintenance work will be announced in advance whenever possible.
                </p>
                <p>
                  (3) The Service Provider is entitled to further develop and adapt the platform, provided this does not significantly impair the purpose of the contract.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">Section 5: Customer Obligations</h2>
                <p className="mb-4">
                  (1) The Customer undertakes to provide truthful information during registration and to keep this information up to date.
                </p>
                <p className="mb-4">
                  (2) The Customer is responsible for keeping their access credentials confidential and is liable for all activities that take place under their account.
                </p>
                <p className="mb-4">
                  (3) The Customer undertakes not to misuse the platform, in particular not to upload or distribute unlawful content.
                </p>
                <p>
                  (4) The Customer shall indemnify the Service Provider against all claims by third parties arising from a culpable breach of these obligations.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">Section 6: Fees and Pricing</h2>
                <p className="mb-4">
                  (1) The use of the platform may be subject to fees. Current prices are available on the platform.
                </p>
                <p className="mb-4">
                  (2) All prices are exclusive of statutory VAT, unless otherwise stated.
                </p>
                <p>
                  (3) Price changes will be communicated to the Customer in good time and shall apply from the next billing period.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">Section 7: Payment Terms</h2>
                <p className="mb-4">
                  (1) Payment is due upon invoicing by the Service Provider. Invoices are to be paid in full within 14 days of receipt.
                </p>
                <p className="mb-4">
                  (2) In the event of late payment, the Service Provider is entitled to charge default interest at the statutory rate.
                </p>
                <p>
                  (3) The Customer may only offset claims that are undisputed or have been established by final court judgment.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">Section 8: Delay, Service Disruptions, Force Majeure</h2>
                <p className="mb-4">
                  (1) The Service Provider shall not be liable for delays or outages caused by circumstances beyond its control (force majeure).
                </p>
                <p className="mb-4">
                  (2) Force majeure includes, in particular, natural disasters, pandemics, government actions, strikes, and technical failures of third-party providers.
                </p>
                <p>
                  (3) In the event of force majeure, contractual obligations shall be suspended for the duration of the disruption.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">Section 9: Liability</h2>
                <p className="mb-4">
                  (1) The Service Provider is fully liable for damages resulting from injury to life, body, or health, as well as for intentional misconduct and gross negligence.
                </p>
                <p className="mb-4">
                  (2) In the case of slight negligence, the Service Provider is only liable for breach of material contractual obligations (cardinal obligations), limited to the foreseeable, contract-typical damage.
                </p>
                <p>
                  (3) Any further liability is excluded to the extent permitted by law.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">Section 10: Defects and Claims</h2>
                <p className="mb-4">
                  (1) The Customer is obliged to report defects in writing immediately upon discovery.
                </p>
                <p className="mb-4">
                  (2) The Service Provider shall remedy defects within its technical and economic capabilities.
                </p>
                <p>
                  (3) The warranty period for defects is 12 months from the provision of services, unless a longer period is required by law.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">Section 11: Termination of Contract</h2>
                <p className="mb-4">
                  (1) The contract may be terminated by either party with 30 days' notice to the end of the month.
                </p>
                <p className="mb-4">
                  (2) The right to extraordinary termination for good cause remains unaffected.
                </p>
                <p>
                  (3) Termination must be in text form (e.g., email).
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">Section 12: Cancellation by the Customer</h2>
                <p className="mb-4">
                  (1) Consumers have a statutory right of withdrawal pursuant to Sections 312g and 355 of the German Civil Code (BGB).
                </p>
                <p className="mb-4">
                  (2) Withdrawal is possible within 14 days of conclusion of the contract without giving reasons.
                </p>
                <p>
                  (3) To exercise the right of withdrawal, a clear declaration to the Service Provider is sufficient.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">Section 13: Copyright and Usage Rights</h2>
                <p className="mb-4">
                  (1) All content on the platform (texts, graphics, software, etc.) is protected by copyright and is the property of the Service Provider or licensed third parties.
                </p>
                <p className="mb-4">
                  (2) The Customer receives a simple, non-transferable right to use the content for the duration of the contract.
                </p>
                <p>
                  (3) Reproduction, distribution, or public display without consent is prohibited.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">Section 14: Confidentiality</h2>
                <p className="mb-4">
                  (1) Both parties undertake to keep confidential all confidential information received in the course of the collaboration.
                </p>
                <p className="mb-4">
                  (2) This obligation shall continue to apply after termination of the contractual relationship.
                </p>
                <p>
                  (3) Excluded is information that is publicly known or becomes known without fault.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">Section 15: Data Protection</h2>
                <p className="mb-4">
                  (1) The Service Provider processes personal data in accordance with applicable data protection regulations, in particular the GDPR.
                </p>
                <p className="mb-4">
                  (2) Details on data processing can be found in the Privacy Policy on the platform.
                </p>
                <p>
                  (3) The Customer consents to the processing of their data for the purpose of contract fulfillment.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">Section 16: Final Provisions</h2>
                <p className="mb-4">
                  (1) German law shall apply, excluding the UN Convention on Contracts for the International Sale of Goods.
                </p>
                <p className="mb-4">
                  (2) The place of jurisdiction, to the extent permitted by law, is the registered office of the Service Provider.
                </p>
                <p className="mb-4">
                  (3) If individual provisions are or become invalid, the validity of the remaining provisions shall remain unaffected.
                </p>
                <p>
                  (4) Amendments and additions to these Terms require text form.
                </p>
              </section>

            </div>
          </section>
          
        </div>
      </div>
    </PublicLayout>
  );
}
