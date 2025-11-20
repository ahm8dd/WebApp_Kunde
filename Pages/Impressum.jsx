import React from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Building } from "lucide-react";

// --- KONSTANTEN BASIEREND AUF GESPEICHERTEN DATEN ---
const BUSINESS_NAME = "M&M Reifenservice";
const ADDRESS_LINE1 = "Sulterkamp 58";
const ADDRESS_LINE2 = "45356 Essen";
const PHONE = "0201 25908194";
const EMAIL = "info@mmreifenessen.de";

// Farbpalette
const DARK_COLOR = "#0e131f";
const ACCENT_COLOR = "#ff0035"; // Rot
const MEDIUM_COLOR = "#8b939c"; // Mittelgrau für Fließtext
const LIGHT_BG = "#59546c"; // Graublau für Hintergrund (als Basis für Transparenz)
// ----------------------------------------------------

export default function Impressum() {
  // Hinweis: Der Platzhalter für den Inhaber/Verantwortlichen muss manuell ausgefüllt werden.
  const INHABER_PLACEHOLDER = "Mohamad Mouait";

  return (
    <div className="pt-32 pb-24 bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1
            className={`text-5xl font-bold mb-12 text-center`}
            style={{ color: DARK_COLOR }}
          >
            Impressum
          </h1>

          <div className="space-y-8" style={{ color: MEDIUM_COLOR }}>
            <div
              className={`rounded-xl p-6`}
              style={{ backgroundColor: LIGHT_BG + "0F" }}
            >
              <h2
                className={`text-2xl font-bold mb-4 flex items-center gap-3`}
                style={{ color: DARK_COLOR }}
              >
                <Building className="w-6 h-6" style={{ color: ACCENT_COLOR }} />
                Angaben gemäß § 5 TMG
              </h2>
              <div className="space-y-2">
                <p className="font-bold text-lg">{BUSINESS_NAME}</p>
                <p>Inhaber: {INHABER_PLACEHOLDER}</p>
              </div>
            </div>

            <div
              className={`rounded-xl p-6`}
              style={{ backgroundColor: LIGHT_BG + "0F" }}
            >
              <h2
                className={`text-2xl font-bold mb-4 flex items-center gap-3`}
                style={{ color: DARK_COLOR }}
              >
                <MapPin className="w-6 h-6" style={{ color: ACCENT_COLOR }} />
                Adresse
              </h2>
              <div className="space-y-1">
                <p>{ADDRESS_LINE1}</p>
                <p>{ADDRESS_LINE2}</p>
                <p>Deutschland</p>
              </div>
            </div>

            <div
              className={`rounded-xl p-6`}
              style={{ backgroundColor: LIGHT_BG + "0F" }}
            >
              <h2
                className={`text-2xl font-bold mb-4 flex items-center gap-3`}
                style={{ color: DARK_COLOR }}
              >
                <Phone className="w-6 h-6" style={{ color: ACCENT_COLOR }} />
                Kontakt
              </h2>
              <div className="space-y-2">
                <p>
                  <strong>Telefon:</strong>
                  <a
                    href={`tel:${PHONE.replace(/\s/g, "")}`}
                    className={`hover:underline ml-1`}
                    style={{ color: ACCENT_COLOR }}
                  >
                    {PHONE}
                  </a>
                </p>
                <p>
                  <strong>E-Mail:</strong>
                  <a
                    href={`mailto:${EMAIL}`}
                    className={`hover:underline ml-1`}
                    style={{ color: ACCENT_COLOR }}
                  >
                    {EMAIL}
                  </a>
                </p>
              </div>
            </div>

            <div
              className={`rounded-xl p-6`}
              style={{ backgroundColor: LIGHT_BG + "0F" }}
            >
              <h2
                className={`text-2xl font-bold mb-4`}
                style={{ color: DARK_COLOR }}
              >
                Umsatzsteuer-ID
              </h2>
              <p>
                Umsatzsteuer-Identifikationsnummer gemäß §27 a
                Umsatzsteuergesetz:
                <br />
                <span className="font-mono">Ust-IdNr. folgt</span>
              </p>
            </div>

            <div
              className={`rounded-xl p-6`}
              style={{ backgroundColor: LIGHT_BG + "0F" }}
            >
              <h2
                className={`text-2xl font-bold mb-4`}
                style={{ color: DARK_COLOR }}
              >
                Verantwortlich für den Inhalt
              </h2>
              <p>
                M&M Reifenservice
                <br />
                Sulterkamp 58
                <br />
                45356 Essen
              </p>
            </div>

            <div
              className={`rounded-xl p-6`}
              style={{ backgroundColor: LIGHT_BG + "0F" }}
            >
              <h2
                className={`text-2xl font-bold mb-4`}
                style={{ color: DARK_COLOR }}
              >
                EU-Streitschlichtung
              </h2>
              <p>
                Die Europäische Kommission stellt eine Plattform zur
                Online-Streitbeilegung (OS) bereit:
                <a
                  href="https://ec.europa.eu/consumers/odr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`hover:underline ml-1`}
                  style={{ color: ACCENT_COLOR }}
                >
                  https://ec.europa.eu/consumers/odr
                </a>
              </p>
            </div>

            <div
              className={`rounded-xl p-6`}
              style={{ backgroundColor: LIGHT_BG + "0F" }}
            >
              <h2
                className={`text-2xl font-bold mb-4`}
                style={{ color: DARK_COLOR }}
              >
                Verbraucherstreitbeilegung
              </h2>
              <p>
                Wir sind nicht bereit oder verpflichtet, an
                Streitbeilegungsverfahren vor einer
                Verbraucherschlichtungsstelle teilzunehmen.
              </p>
            </div>

            <div
              className={`rounded-xl p-6`}
              style={{ backgroundColor: LIGHT_BG + "0F" }}
            >
              <h2
                className={`text-2xl font-bold mb-4`}
                style={{ color: DARK_COLOR }}
              >
                Haftungsausschluss
              </h2>
              <h3
                className={`text-lg font-bold mb-2`}
                style={{ color: DARK_COLOR }}
              >
                Haftung für Inhalte
              </h3>
              <p className="mb-4">
                Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene
                Inhalte auf diesen Seiten nach den allgemeinen Gesetzen
                verantwortlich. Nach §§ 8 bis 10 TMG sind wir als
                Diensteanbieter jedoch nicht verpflichtet, übermittelte oder
                gespeicherte fremde Informationen zu überwachen oder nach
                Umständen zu forschen, die auf eine rechtswidrige Tätigkeit
                hinweisen.
              </p>

              <h3
                className={`text-lg font-bold mb-2`}
                style={{ color: DARK_COLOR }}
              >
                Haftung für Links
              </h3>
              <p>
                Unser Angebot enthält Links zu externen Websites Dritter, auf
                deren Inhalte wir keinen Einfluss haben. Deshalb können wir für
                diese fremden Inhalte auch keine Gewähr übernehmen. Für die
                Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter
                oder Betreiber der Seiten verantwortlich.
              </p>
            </div>
          </div>

          <div className="text-center mt-8">
            <p className="text-sm text-gray-500">
              Stand:{" "}
              {new Date().toLocaleDateString("de-DE", {
                year: "numeric",
                month: "long",
              })}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
