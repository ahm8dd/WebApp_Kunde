import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

// --- KONSTANTEN BASIEREND AUF PALETTE ---
const ACCENT_COLOR = "#ff0035"; // Rot
const DARK_COLOR = "#0e131f"; 
const BG_COLOR = "#8b939c"; // NEUER HINTERGRUND
const LIGHT_TEXT_COLOR = "#F0F0F0"; // NEUE TEXTFARBE
const DARK_BOX_COLOR = "#0e131f"; // Dunkle Boxen
// ----------------------------------------

const sitePages = {
  "Hauptseiten": [
    {
      name: "Home",
      url: "/",
      description: "Willkommen bei M&M Reifenservice - Ihr Reifenexperte in Essen"
    },
    {
      name: "Services",
      url: createPageUrl("Services"),
      description: "Alle unsere Reifenservices: Wechsel, Auswuchten, Reparatur und Einlagerung"
    },
    {
      name: "Reifenbestand",
      url: createPageUrl("TyreStock"),
      description: "Durchsuchen Sie unseren verfügbaren Reifenbestand"
    },
    {
      name: "Termin buchen / Kontakt",
      url: createPageUrl("Contact"),
      description: "Buchen Sie Ihren Termin online oder finden Sie unseren Standort"
    },
    {
      name: "Über uns",
      url: createPageUrl("Team"),
      description: "Lernen Sie unser erfahrenes Team kennen"
    }
  ],
  "Rechtliches": [
    {
      name: "Impressum",
      url: createPageUrl("Impressum"),
      description: "Rechtliche Informationen und Angaben zum Unternehmen"
    },
    {
      name: "Datenschutz",
      url: createPageUrl("Datenschutz"),
      description: "Informationen zum Datenschutz und Umgang mit Ihren Daten"
    }
  ]
};

export default function Sitemap() {
  return (
    <div className="pt-32 pb-24 min-h-screen" style={{ backgroundColor: BG_COLOR }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className={`text-5xl font-bold mb-4`} style={{ color: DARK_COLOR }}>
            Sitemap
          </h1>
          <p className={`text-xl`} style={{ color: LIGHT_TEXT_COLOR }}>
            Alle Seiten unserer Website auf einen Blick
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          {Object.entries(sitePages).map(([category, pages], categoryIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: categoryIndex * 0.1 }}
              className={`rounded-xl p-8`}
              style={{ backgroundColor: DARK_BOX_COLOR }}
            >
              <h2 className={`text-2xl font-bold mb-6`} style={{ color: LIGHT_TEXT_COLOR }}>{category}</h2>
              <ul className="space-y-4">
                {pages.map((page, index) => (
                  <li key={index}>
                    <Link
                      to={page.url}
                      className="group block"
                    >
                      <h3 className={`text-lg font-semibold group-hover:text-[#d9002d] transition-colors mb-1`} style={{ color: ACCENT_COLOR }}>
                        {page.name}
                      </h3>
                      <p className={`text-sm`} style={{ color: LIGHT_TEXT_COLOR }}>{page.description}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className={`rounded-xl p-8 text-white text-center`}
          style={{ backgroundColor: ACCENT_COLOR }}
        >
          <h2 className="text-3xl font-bold mb-4">Bereit für Ihren Reifenwechsel?</h2>
          <p className="text-lg mb-6">Buchen Sie jetzt online Ihren Wunschtermin!</p>
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('open-booking-modal'))}
            className={`bg-white px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition-all`}
            style={{ color: ACCENT_COLOR }}
          >
            Jetzt buchen
          </button>
        </motion.div>
      </div>
    </div>
  );
}