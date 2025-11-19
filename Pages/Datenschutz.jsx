
import React from "react";
import { motion } from "framer-motion";
import { Shield, Lock, Eye, Database, Mail } from "lucide-react";

export default function Datenschutz() {
  return (
    <div className="pt-32 pb-24 bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-5xl font-bold text-[#0e131f] mb-12 text-center">
            Datenschutzerklärung
          </h1>

          <div className="space-y-8 text-[#8b939c]">
            <div className="bg-[#59546c]/5 rounded-xl p-6">
              <h2 className="text-2xl font-bold text-[#0e131f] mb-4 flex items-center gap-3">
                <Shield className="w-6 h-6 text-[#ff0035]" />
                Datenschutz
              </h2>
              <h3 className="text-lg font-bold text-[#0e131f] mb-2">Allgemeine Hinweise</h3>
              <p className="text-[#8b939c] mb-4">
                Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten
                passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie
                persönlich identifiziert werden können.
              </p>

              <h3 className="text-lg font-bold text-[#0e131f] mb-2">Datenerfassung auf dieser Website</h3>
              <p className="text-[#8b939c]">
                <strong>Wer ist verantwortlich für die Datenerfassung auf dieser Website?</strong><br />
                Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten
                können Sie dem Impressum dieser Website entnehmen.
              </p>
            </div>

            <div className="bg-[#59546c]/5 rounded-xl p-6">
              <h2 className="text-2xl font-bold text-[#0e131f] mb-4 flex items-center gap-3">
                <Database className="w-6 h-6 text-[#ff0035]" />
                2. Hosting
              </h2>
              <p className="text-[#8b939c]">
                Wir hosten die Inhalte unserer Website bei folgendem Anbieter: [IONOS SE].<br /><br />
                <strong>Datenschutzinformationen des Hosting-Anbieters:</strong><br />
                Der Hosting-Anbieter erhebt, verarbeitet und nutzt Ihre Daten nur im Rahmen der gesetzlichen
                Bestimmungen. Weitere Informationen hierzu finden Sie in der Datenschutzerklärung des Anbieters:
                <a href="https://www.ionos.de/terms-gtc/privacy-policy/" className="text-[#ff0035] hover:underline">
                  https://www.ionos.de/terms-gtc/privacy-policy/
                </a>
              </p>
            </div>

            <div className="bg-[#59546c]/5 rounded-xl p-6">
              <h2 className="text-2xl font-bold text-[#0e131f] mb-4 flex items-center gap-3">
                <Eye className="w-6 h-6 text-[#ff0035]" />
                3. Allgemeine Hinweise und Pflichtinformationen
              </h2>
              <h3 className="text-lg font-bold text-[#0e131f] mb-2">Datenschutz</h3>
              <p className="text-[#8b939c] mb-4">
                Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre
                personenbezogenen Daten vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften sowie
                dieser Datenschutzerklärung.
              </p>

              <h3 className="text-lg font-bold text-[#0e131f] mb-2">Hinweis zur verantwortlichen Stelle</h3>
              <p className="text-[#8b939c] mb-4">
                Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:<br /><br />
                M&M Reifenservice<br />
                Sulterkamp 58<br />
                45356 Essen<br /><br />
                Telefon: +49 201 25908194<br />
                E-Mail: info@mmreifenessen.de
              </p>
            </div>

            <div className="bg-[#59546c]/5 rounded-xl p-6">
              <h2 className="text-2xl font-bold text-[#0e131f] mb-4 flex items-center gap-3">
                <Lock className="w-6 h-6 text-[#ff0035]" />
                4. Datenerfassung auf dieser Website
              </h2>

              <h3 className="text-lg font-bold text-[#0e131f] mb-2">Cookies</h3>
              <p className="text-[#8b939c] mb-4">
                Unsere Internetseiten verwenden teilweise so genannte Cookies. Cookies richten auf Ihrem Rechner keinen
                Schaden an und enthalten keine Viren. Cookies dienen dazu, unser Angebot nutzerfreundlicher, effektiver
                und sicherer zu machen.
              </p>

              <h3 className="text-lg font-bold text-[#0e131f] mb-2">Server-Log-Dateien</h3>
              <p className="text-[#8b939c] mb-4">
                Der Provider der Seiten erhebt und speichert automatisch Informationen in so genannten Server-Log-Dateien,
                die Ihr Browser automatisch an uns übermittelt. Dies sind:
              </p>
              <ul className="list-disc list-inside text-[#8b939c] mb-4 space-y-1">
                <li>Browsertyp und Browserversion</li>
                <li>verwendetes Betriebssystem</li>
                <li>Referrer URL</li>
                <li>Hostname des zugreifenden Rechners</li>
                <li>Uhrzeit der Serveranfrage</li>
                <li>IP-Adresse</li>
              </ul>

              <h3 className="text-lg font-bold text-[#0e131f] mb-2">Kontaktformular</h3>
              <p className="text-[#8b939c]">
                Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular
                inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall
                von Anschlussfragen bei uns gespeichert.
              </p>
            </div>

            <div className="bg-[#59546c]/5 rounded-xl p-6">
              <h2 className="text-2xl font-bold text-[#0e131f] mb-4 flex items-center gap-3">
                <Mail className="w-6 h-6 text-[#ff0035]" />
                5. Ihre Rechte
              </h2>
              <p className="text-[#8b939c] mb-4">
                Sie haben jederzeit das Recht:
              </p>
              <ul className="list-disc list-inside text-[#8b939c] space-y-2">
                <li>Auskunft über Ihre bei uns gespeicherten personenbezogenen Daten zu erhalten</li>
                <li>Berichtigung unrichtiger personenbezogener Daten zu verlangen</li>
                <li>Löschung Ihrer bei uns gespeicherten personenbezogenen Daten zu verlangen</li>
                <li>Einschränkung der Datenverarbeitung zu verlangen</li>
                <li>Widerspruch gegen die Verarbeitung Ihrer Daten einzulegen</li>
                <li>Datenübertragbarkeit zu verlangen</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg p-6 border-2 border-[#ff0035]">
              <h3 className="text-lg font-bold text-[#0e131f] mb-3">Kontakt bei Datenschutzfragen</h3>
              <p className="text-[#8b939c]">
                Wenn Sie Fragen zum Datenschutz haben, schreiben Sie uns bitte eine E-Mail oder wenden Sie sich
                direkt an die für den Datenschutz verantwortliche Person in unserer Organisation:
              </p>
              <p className="mt-3">
                <a href="mailto:info@mmreifenessen.de" className="text-[#ff0035] hover:underline font-medium">
                  info@mmreifenessen.de
                </a>
              </p>
            </div>
          </div>

          <div className="text-center mt-8">
            <p className="text-sm text-gray-500">
              Stand: {new Date().toLocaleDateString('de-DE', { year: 'numeric', month: 'long' })}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
