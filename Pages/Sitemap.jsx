
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

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
      name: "Termin buchen",
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
    <div className="pt-32 pb-24 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold text-[#0e131f] mb-4">
            Sitemap
          </h1>
          <p className="text-xl text-[#8b939c]">
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
              className="bg-[#59546c]/5 rounded-xl p-8"
            >
              <h2 className="text-2xl font-bold text-[#0e131f] mb-6">{category}</h2>
              <ul className="space-y-4">
                {pages.map((page, index) => (
                  <li key={index}>
                    <Link
                      to={page.url}
                      className="group block"
                    >
                      <h3 className="text-lg font-semibold text-[#ff0035] group-hover:text-[#d9002d] transition-colors mb-1">
                        {page.name}
                      </h3>
                      <p className="text-sm text-[#8b939c]">{page.description}</p>
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
          className="bg-[#ff0035] rounded-xl p-8 text-white text-center"
        >
          <h2 className="text-3xl font-bold mb-4">Bereit für Ihren Reifenwechsel?</h2>
          <p className="text-lg mb-6">Buchen Sie jetzt online Ihren Wunschtermin!</p>
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('open-booking-modal'))}
            className="bg-white text-[#ff0035] px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition-all"
          >
            Jetzt buchen
          </button>
        </motion.div>
      </div>
    </div>
  );
}