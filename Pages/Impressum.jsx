
import React from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Building } from "lucide-react";

export default function Impressum() {
  return (
    <div className="pt-32 pb-24 bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-5xl font-bold text-[#0e131f] mb-12 text-center">
            Impressum
          </h1>

          <div className="space-y-8 text-[#8b939c]">
            <div className="bg-[#59546c]/5 rounded-xl p-6">
              <h2 className="text-2xl font-bold text-[#0e131f] mb-4 flex items-center gap-3">
                <Building className="w-6 h-6 text-[#ff0035]" />
                Angaben gemäß § 5 TMG
              </h2>
              <div className="space-y-2">
                <p className="font-bold text-lg">M&M Reifenservice</p>
                <p>Inhaber: [Mohamad Mouait]</p>
              </div>
            </div>

            <div className="bg-[#59546c]/5 rounded-xl p-6">
              <h2 className="text-2xl font-bold text-[#0e131f] mb-4 flex items-center gap-3">
                <MapPin className="w-6 h-6 text-[#ff0035]" />
                Adresse
              </h2>
              <div className="space-y-1">
                <p>Sulterkamp 58</p>
                <p>45356 Essen</p>
                <p>Deutschland</p>
              </div>
            </div>

            <div className="bg-[#59546c]/5 rounded-xl p-6">
              <h2 className="text-2xl font-bold text-[#0e131f] mb-4 flex items-center gap-3">
                <Phone className="w-6 h-6 text-[#ff0035]" />
                Kontakt
              </h2>
              <div className="space-y-2">
                <p><strong>Telefon:</strong> <a href="tel:0201 25908194" className="text-[#ff0035] hover:underline">+49 201 1234 5678</a></p>
                <p><strong>E-Mail:</strong> <a href="mailto:info@mmreifenessen.de" className="text-[#ff0035] hover:underline">info@mm-reifen.de</a></p>
              </div>
            </div>

            <div className="bg-[#59546c]/5 rounded-xl p-6">
              <h2 className="text-2xl font-bold text-[#0e131f] mb-4">Umsatzsteuer-ID</h2>
              <p>
                Umsatzsteuer-Identifikationsnummer gemäß §27 a Umsatzsteuergesetz:<br />
                <span className="font-mono">[Ihre USt-IdNr.]</span>
              </p>
            </div>

            <div className="bg-[#59546c]/5 rounded-xl p-6">
              <h2 className="text-2xl font-bold text-[#0e131f] mb-4">Verantwortlich für den Inhalt</h2>
              <p>
                [Mohamad Mouait]<br />
                Sulterkamp 58<br />
                45356 Essen
              </p>
            </div>

            <div className="bg-[#59546c]/5 rounded-xl p-6">
              <h2 className="text-2xl font-bold text-[#0e131f] mb-4">EU-Streitschlichtung</h2>
              <p>
                Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: 
                <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" className="text-[#ff0035] hover:underline ml-1">
                  https://ec.europa.eu/consumers/odr
                </a>
              </p>
            </div>

            <div className="bg-[#59546c]/5 rounded-xl p-6">
              <h2 className="text-2xl font-bold text-[#0e131f] mb-4">Verbraucherstreitbeilegung</h2>
              <p>
                Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer 
                Verbraucherschlichtungsstelle teilzunehmen.
              </p>
            </div>

            <div className="bg-[#59546c]/5 rounded-xl p-6">
              <h2 className="text-2xl font-bold text-[#0e131f] mb-4">Haftungsausschluss</h2>
              <h3 className="text-lg font-bold text-[#0e131f] mb-2">Haftung für Inhalte</h3>
              <p className="mb-4">
                Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den 
                allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht 
                verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen 
                zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
              </p>
              
              <h3 className="text-lg font-bold text-[#0e131f] mb-2">Haftung für Links</h3>
              <p>
                Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. 
                Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten 
                Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
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