import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Wrench,
  Award,
  Users,
  Clock,
  Shield,
  Star,
  Zap, // Für die Betonung der Schnelligkeit/Spontanität
  MapPin,
} from "lucide-react";

// --- KONSTANTEN BASIEREND AUF ORIGINAL PALETTE ---
const ACCENT_COLOR = "#ff0035"; // Rot
const DARK_COLOR = "#0e131f"; // Dunkel (Text auf Weiß)
const LIGHT_BG = "#59546c"; // Graublau (Basis für Transparenz)
const MEDIUM_COLOR = "#8b939c"; // Mittelgrau (Text/Akzente)
// ----------------------------------------

export default function Team() {
  return (
    // Hintergrund auf BG_WHITE setzen
    <div className="pt-32 pb-24 min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* HEADER SECTION - Fokus auf Spontaneität */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold mb-6" style={{ color: DARK_COLOR }}>
            Über M&M Reifenservice
          </h1>
          <p
            className="text-xl max-w-3xl mx-auto"
            style={{ color: MEDIUM_COLOR }}
          >
            Ihr Partner für schnelle, professionelle Reifenlösungen in Essen –
            ganz ohne Terminvereinbarung!
          </p>
        </motion.div>

        {/* --- HR --- */}
        <hr className="border-gray-200 mb-16" />

        {/* COMPANY INFO - Betonung des Kundennutzens */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          // Hintergrund auf Original: leicht transparentes Graublau
          className={`rounded-2xl p-8 md:p-12 mb-16 shadow-inner`} // Schatten für Tiefe
          style={{ backgroundColor: LIGHT_BG + "0F" }}
        >
          <div className="max-w-4xl mx-auto text-center">
            <h2
              className="text-3xl font-bold mb-6"
              style={{ color: DARK_COLOR }}
            >
              Qualität trifft Flexibilität
            </h2>
            <p
              className="text-lg mb-6 leading-relaxed"
              style={{ color: MEDIUM_COLOR }}
            >
              Bei M&M Reifenservice steht Ihre Zeitersparnis an erster Stelle.
              Wir bieten Ihnen einen kompletten Reifenservice (Wechsel, Wuchten,
              Reparatur) von erfahrenen Fachkräften, bei dem Sie keinen Termin
              benötigen. Kommen Sie einfach während unserer Öffnungszeiten
              vorbei und wir kümmern uns sofort um Ihr Fahrzeug.
            </p>
            <p
              className="text-lg leading-relaxed font-semibold"
              style={{ color: ACCENT_COLOR }}
            >
              Zuverlässigkeit, faire Preise und die Freiheit, spontan zu sein –
              das ist unser Versprechen.
            </p>
          </div>
        </motion.div>

        {/* OUR VALUES - USP ist jetzt der oberste Punkt */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2
              className="text-3xl font-bold mb-4"
              style={{ color: DARK_COLOR }}
            >
              Unsere Stärken auf einen Blick
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                icon: Zap, // Geändert: Starkes Icon für Spontanität
                title: "OHNE TERMIN",
                description:
                  "Einfach vorbeikommen! Wir sind flexibel und nehmen uns direkt Zeit für Sie.",
              },
              {
                icon: Clock,
                title: "Express-Service",
                description:
                  "Reifenwechsel in unter 30 Minuten. Keine langen Wartezeiten.",
              },
              {
                icon: Award,
                title: "Qualität & Erfahrung",
                description:
                  "Zertifizierte Fachkräfte mit langjähriger Erfahrung.",
              },
              {
                icon: Shield,
                title: "Sicherheit garantiert",
                description:
                  "Fachgerechte Montage und Qualitätskontrolle für Ihre Sicherheit.",
              },
              {
                icon: Star,
                title: "Faire Preise",
                description:
                  "Transparente Preisgestaltung ohne versteckte Kosten.",
              },
              {
                icon: Wrench,
                title: "Moderne Technik",
                description:
                  "Neueste Ausrüstung für präzisen und professionellen Service.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl transition-all"
              >
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center mb-6`}
                  style={{ backgroundColor: ACCENT_COLOR + "10" }}
                >
                  <item.icon
                    className="w-8 h-8"
                    style={{ color: ACCENT_COLOR }}
                  />
                </div>
                <h3
                  className="text-xl font-bold mb-3"
                  style={{ color: DARK_COLOR }}
                >
                  {item.title}
                </h3>
                <p style={{ color: MEDIUM_COLOR }}>{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Section - Fokus auf Besuch */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`rounded-2xl p-12 text-center text-white`}
          style={{ backgroundColor: ACCENT_COLOR }}
        >
          <h2 className="text-3xl font-bold mb-4">
            Besuchen Sie uns noch heute – ganz ohne Termin!
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Ihre Sicherheit beginnt bei den Reifen. Kommen Sie einfach vorbei
            oder rufen Sie uns an: 0201 25908194.
          </p>
          <Link
            to="/Contact"
            className="bg-white px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition-all inline-flex items-center gap-2"
            style={{ color: ACCENT_COLOR }}
          >
            <MapPin className="w-5 h-5" />
            Unsere Adresse in Essen finden
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
