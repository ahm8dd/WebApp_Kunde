import React from "react";
import { motion } from "framer-motion";
import { Shield, Lock, Eye, Database, Mail } from "lucide-react";

// --- KONSTANTEN BASIEREND AUF GESPEICHERTEN DATEN ---
const BUSINESS_NAME = "M&M Reifenservice";
const ADDRESS_LINE1 = "Sulterkamp 58";
const ADDRESS_LINE2 = "45356 Essen";
const PHONE = "0201 25908194";
const EMAIL = "info@mmreifenessen.de";

// Wichtig: Die Datenschutz-E-Mail wird auf die allgemeine E-Mail umgestellt.
const DATENSCHUTZ_EMAIL = EMAIL; 

const DARK_COLOR = "#0e131f"; 
const ACCENT_COLOR = "#ff0035"; // Rot
const MEDIUM_COLOR = "#8b939c"; // Mittelgrau für Fließtext
const LIGHT_BG = "#59546c"; // Graublau für Hintergrund (als Basis für Transparenz)
// ----------------------------------------------------

export default function Datenschutz() {
  return (
    <div className="pt-32 pb-24 bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className={`text-5xl font-bold mb-12 text-center`} style={{ color: DARK_COLOR }}>
            Datenschutzerklärung
          </h1>

          <div className="space-y-8" style={{ color: MEDIUM_COLOR }}>
            <div className={`rounded-xl p-6`} style={{ backgroundColor: LIGHT_BG + '0F' }}>
              <h2 className={`text-2xl font-bold mb-4 flex items-center gap-3`} style={{ color: DARK_COLOR }}>
                <Shield className="w-6 h-6" style={{ color: ACCENT_COLOR }} />
                Datenschutz
              </h2>
              <h3 className={`text-lg font-bold mb-2`} style={{ color: DARK_COLOR }}>Allgemeine Hinweise</h3>
              <p className={`mb-4`}>
                Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten
                passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie
                persönlich identifiziert werden können.
              </p>

              <h3 className={`text-lg font-bold mb-2`} style={{ color: DARK_COLOR }}>Datenerfassung auf dieser Website</h3>
              <p>
                <strong>Wer ist verantwortlich für die Datenerfassung auf dieser Website?</strong><br />
                Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber ({BUSINESS_NAME}). Dessen Kontaktdaten
                können Sie dem Impressum dieser Website entnehmen.
              </p>
            </div>

            <div className={`rounded-xl p-6`} style={{ backgroundColor: LIGHT_BG + '0F' }}>
              <h2 className={`text-2xl font-bold mb-4 flex items-center gap-3`} style={{ color: DARK_COLOR }}>
                <Database className="w-6 h-6" style={{ color: ACCENT_COLOR }} />
                2. Hosting
              </h2>
<<<<<<< HEAD
              <p>
                Wir hosten die Inhalte unserer Website bei folgendem Anbieter: [Ihr Hosting-Anbieter]
=======
              <p className="text-[#8b939c]">
                Wir hosten die Inhalte unserer Website bei folgendem Anbieter: [IONOS SE].<br /><br />
                <strong>Datenschutzinformationen des Hosting-Anbieters:</strong><br />
                Der Hosting-Anbieter erhebt, verarbeitet und nutzt Ihre Daten nur im Rahmen der gesetzlichen
                Bestimmungen. Weitere Informationen hierzu finden Sie in der Datenschutzerklärung des Anbieters:
                <a href="https://www.ionos.de/terms-gtc/privacy-policy/" className="text-[#ff0035] hover:underline">
                  https://www.ionos.de/terms-gtc/privacy-policy/
                </a>
>>>>>>> 6abfd2bef49573cf2b3ceb00142c1c97edaae6e9
              </p>
            </div>

            <div className={`rounded-xl p-6`} style={{ backgroundColor: LIGHT_BG + '0F' }}>
              <h2 className={`text-2xl font-bold mb-4 flex items-center gap-3`} style={{ color: DARK_COLOR }}>
                <Eye className="w-6 h-6" style={{ color: ACCENT_COLOR }} />
                3. Allgemeine Hinweise und Pflichtinformationen
              </h2>
              <h3 className={`text-lg font-bold mb-2`} style={{ color: DARK_COLOR }}>Datenschutz</h3>
              <p className="mb-4">
                Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre
                personenbezogenen Daten vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften sowie
                dieser Datenschutzerklärung.
              </p>

              <h3 className={`text-lg font-bold mb-2`} style={{ color: DARK_COLOR }}>Hinweis zur verantwortlichen Stelle</h3>
              <p className="mb-4">
                Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:<br /><br />
<<<<<<< HEAD
                **{BUSINESS_NAME}**<br />
                {ADDRESS_LINE1}<br />
                {ADDRESS_LINE2}<br /><br />
                Telefon: **{PHONE}**<br />
                E-Mail: **{EMAIL}**
=======
                M&M Reifenservice<br />
                Sulterkamp 58<br />
                45356 Essen<br /><br />
                Telefon: +49 201 25908194<br />
                E-Mail: info@mmreifenessen.de
>>>>>>> 6abfd2bef49573cf2b3ceb00142c1c97edaae6e9
              </p>
            </div>

            <div className={`rounded-xl p-6`} style={{ backgroundColor: LIGHT_BG + '0F' }}>
              <h2 className={`text-2xl font-bold mb-4 flex items-center gap-3`} style={{ color: DARK_COLOR }}>
                <Lock className="w-6 h-6" style={{ color: ACCENT_COLOR }} />
                4. Datenerfassung auf dieser Website
              </h2>

              <h3 className={`text-lg font-bold mb-2`} style={{ color: DARK_COLOR }}>Cookies</h3>
              <p className="mb-4">
                Unsere Internetseiten verwenden teilweise so genannte Cookies. Cookies richten auf Ihrem Rechner keinen
                Schaden an und enthalten keine Viren. Cookies dienen dazu, unser Angebot nutzerfreundlicher, effektiver
                und sicherer zu machen.
              </p>

              <h3 className={`text-lg font-bold mb-2`} style={{ color: DARK_COLOR }}>Server-Log-Dateien</h3>
              <p className="mb-4">
                Der Provider der Seiten erhebt und speichert automatisch Informationen in so genannten Server-Log-Dateien,
                die Ihr Browser automatisch an uns übermittelt. Dies sind:
              </p>
              <ul className="list-disc list-inside mb-4 space-y-1">
                <li>Browsertyp und Browserversion</li>
                <li>verwendetes Betriebssystem</li>
                <li>Referrer URL</li>
                <li>Hostname des zugreifenden Rechners</li>
                <li>Uhrzeit der Serveranfrage</li>
                <li>IP-Adresse</li>
              </ul>

              <h3 className={`text-lg font-bold mb-2`} style={{ color: DARK_COLOR }}>Kontaktformular</h3>
              <p>
                Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular
                inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall
                von Anschlussfragen bei uns gespeichert.
              </p>
            </div>

            <div className={`rounded-xl p-6`} style={{ backgroundColor: LIGHT_BG + '0F' }}>
              <h2 className={`text-2xl font-bold mb-4 flex items-center gap-3`} style={{ color: DARK_COLOR }}>
                <Mail className="w-6 h-6" style={{ color: ACCENT_COLOR }} />
                5. Ihre Rechte
              </h2>
              <p className="mb-4">
                Sie haben jederzeit das Recht:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>Auskunft über Ihre bei uns gespeicherten personenbezogenen Daten zu erhalten</li>
                <li>Berichtigung unrichtiger personenbezogener Daten zu verlangen</li>
                <li>Löschung Ihrer bei uns gespeicherten personenbezogenen Daten zu verlangen</li>
                <li>Einschränkung der Datenverarbeitung zu verlangen</li>
                <li>Widerspruch gegen die Verarbeitung Ihrer Daten einzulegen</li>
                <li>Datenübertragbarkeit zu verlangen</li>
              </ul>
            </div>

            <div className={`rounded-lg p-6 border-2`} style={{ borderColor: ACCENT_COLOR, color: MEDIUM_COLOR }}>
              <h3 className={`text-lg font-bold mb-3`} style={{ color: DARK_COLOR }}>Kontakt bei Datenschutzfragen</h3>
              <p>
                Wenn Sie Fragen zum Datenschutz haben, schreiben Sie uns bitte eine E-Mail oder wenden Sie sich
                direkt an die für den Datenschutz verantwortliche Person in unserer Organisation:
              </p>
              <p className="mt-3">
<<<<<<< HEAD
                <a href={`mailto:${DATENSCHUTZ_EMAIL}`} className={`hover:underline font-medium`} style={{ color: ACCENT_COLOR }}>
                  {DATENSCHUTZ_EMAIL}
=======
                <a href="mailto:info@mmreifenessen.de" className="text-[#ff0035] hover:underline font-medium">
                  info@mmreifenessen.de
>>>>>>> 6abfd2bef49573cf2b3ceb00142c1c97edaae6e9
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