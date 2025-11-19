import React from "react";
import { motion } from "framer-motion";
import { Wrench, Award, Users, Clock, Shield, Star, CheckCircle } from "lucide-react";

// --- KONSTANTEN BASIEREND AUF ORIGINAL PALETTE ---
const ACCENT_COLOR = "#ff0035"; // Rot
const DARK_COLOR = "#0e131f"; // Dunkel (Text auf Weiß)
const LIGHT_BG = "#59546c"; // Graublau (Basis für Transparenz)
const MEDIUM_COLOR = "#8b939c"; // Mittelgrau (Text/Akzente)
// ----------------------------------------

export default function Team() {
  return (
<<<<<<< HEAD
    // Hintergrund auf BG_WHITE setzen
    <div className="pt-32 pb-24 min-h-screen bg-white">
=======
    // Vertikaler Platz am Ende reduziert (pb-24 auf pb-12)
    <div className="pt-32 pb-12 bg-white min-h-screen">
>>>>>>> 6abfd2bef49573cf2b3ceb00142c1c97edaae6e9
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10" // mb-16 auf mb-10 reduziert
        >
          <h1 className="text-5xl font-bold mb-6" style={{ color: DARK_COLOR }}>
            Über M&M Reifenservice
          </h1>
          <p className="text-xl max-w-3xl mx-auto" style={{ color: MEDIUM_COLOR }}>
            Ihr zuverlässiger Partner für professionellen Reifenservice in Essen
          </p>
        </motion.div>

        {/* Company Info - Jetzt kompakter und mit weniger Abstand nach unten */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
<<<<<<< HEAD
          // Hintergrund auf Original: leicht transparentes Graublau
          className={`rounded-2xl p-8 md:p-12 mb-16`}
          style={{ backgroundColor: LIGHT_BG + '0F' }} 
=======
          className="bg-[#59546c]/5 rounded-2xl p-10 mb-10" // mb-16 auf mb-10 reduziert, Padding kompakter
>>>>>>> 6abfd2bef49573cf2b3ceb00142c1c97edaae6e9
        >
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6" style={{ color: DARK_COLOR }}>
              Qualität und Service seit Jahren
            </h2>
            <p className="text-lg mb-6 leading-relaxed" style={{ color: MEDIUM_COLOR }}>
              Bei M&M Reifenservice steht Ihre Sicherheit an erster Stelle. Unser erfahrenes Team 
              bietet Ihnen schnellen, zuverlässigen und professionellen Service rund um Ihre Reifen. 
              Von Reifenwechsel über Auswuchten bis hin zur Einlagerung – wir kümmern wir uns um alles.
            </p>
            <p className="text-lg leading-relaxed" style={{ color: MEDIUM_COLOR }}>
              Unsere Werkstatt in Essen-Sulterkamp ist mit modernster Technik ausgestattet und 
              unser Team verfügt über langjährige Erfahrung im Reifenservice. Wir arbeiten schnell, 
              präzise und zu fairen Preisen.
            </p>
          </div>
        </motion.div>

        {/* Our Values - Abstand nach unten und zum Titel reduziert */}
        <div className="mb-10"> {/* mb-16 auf mb-10 reduziert */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8" // Abstand zu den Kacheln reduziert (mb-12 auf mb-8)
          >
            <h2 className="text-3xl font-bold mb-4" style={{ color: DARK_COLOR }}>
              Unsere Stärken
            </h2>
          </motion.div>

          {/* Grid Kacheln - Abstand auf gap-12 erhöht (luftiger) */}
          <div className="grid md:grid-cols-3 gap-12"> 
            {[
              {
                icon: Clock,
                title: "Schneller Service",
                description: "Reifenwechsel in unter 30 Minuten. Keine langen Wartezeiten."
              },
              {
                icon: Award,
                title: "Qualität & Erfahrung",
                description: "Zertifizierte Fachkräfte mit langjähriger Erfahrung."
              },
              {
                icon: Shield,
                title: "Sicherheit garantiert",
                description: "Fachgerechte Montage und Qualitätskontrolle für Ihre Sicherheit."
              },
              {
                icon: Star,
                title: "Faire Preise",
                description: "Transparente Preisgestaltung ohne versteckte Kosten."
              },
              {
                icon: Users,
                title: "Kundenservice",
                description: "Freundliche Beratung und individuelle Lösungen für Sie."
              },
              {
                icon: Wrench,
                title: "Moderne Technik",
                description: "Neueste Ausrüstung für präzisen und professionellen Service."
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl transition-all"
              >
<<<<<<< HEAD
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6`} style={{ backgroundColor: ACCENT_COLOR + '10' }}>
                  <item.icon className="w-8 h-8" style={{ color: ACCENT_COLOR }} />
=======
                <div className="w-16 h-16 bg-[#ff0035]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <item.icon className="w-8 h-8 text-[#ff0035]" />
>>>>>>> 6abfd2bef49573cf2b3ceb00142c1c97edaae6e9
                </div>
                <h3 className="text-xl font-bold mb-3" style={{ color: DARK_COLOR }}>{item.title}</h3>
                <p style={{ color: MEDIUM_COLOR }}>{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Section - Abstand zum letzten Element reduziert, mt-10 hinzugefügt */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
<<<<<<< HEAD
          className={`rounded-2xl p-12 text-center text-white`}
          style={{ backgroundColor: ACCENT_COLOR }}
=======
          className="bg-[#ff0035] rounded-2xl p-12 text-center text-white mt-10" // mt-10 (40px) für klare Trennung
>>>>>>> 6abfd2bef49573cf2b3ceb00142c1c97edaae6e9
        >
          <h2 className="text-3xl font-bold mb-4">
            Überzeugen Sie sich selbst!
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Buchen Sie noch heute einen Termin und erleben Sie unseren erstklassigen Service.
          </p>
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('open-booking-modal'))}
            className={`bg-white text-xl px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition-all hover:scale-105 shadow-xl`}
            style={{ color: ACCENT_COLOR }}
          >
            Jetzt Termin buchen
          </button>
        </motion.div>
      </div>
    </div>
  );
}