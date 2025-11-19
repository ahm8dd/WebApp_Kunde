import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, Clock } from "lucide-react";

// --- KONSTANTEN BASIEREND AUF ORIGINAL PALETTE ---
const ACCENT_COLOR = "#ff0035"; // Rot
const DARK_COLOR = "#0e131f"; // Dunkel (Text auf Weiß)
const MEDIUM_COLOR = "#8b939c"; // Mittelgrau (Text/Akzente)
const LIGHT_ACCENT_COLOR = "#59546c"; // Graublau (Basis für Transparenz)
// ----------------------------------------

const servicesData = [
  {
    id: 1,
    name: "Radwechsel",
    description: "Schneller und professioneller Radwechsel für alle Fahrzeugtypen (Montage von Kompletträdern). Inklusive Sichtprüfung und Luftdruckkontrolle.",
    price: 25, 
    duration: "30 min",
    image: "https://images.unsplash.com/photo-1486262715619-67b5e0b08d3?w=800&q=80",
    features: ["Sichtprüfung", "Luftdruckkontrolle", "Fachgerechte Montage"]
  },
  {
    id: 2,
    name: "Räder Auswuchten",
    description: "Präzises Auswuchten für alle Reifengrößen. Beseitigt Unwuchten, verbessert das Handling und minimiert Vibrationen.",
    price: 40, 
    duration: "30 min",
    image: "https://images.unsplash.com/photo-1449130015084-2eae8ee6f4d4?w=800&q=80",
    features: ["Alle 4 Räder", "Präzise Technik", "Gewichte inkl."]
  },
  {
    id: 3,
    name: "Reifenwechsel mit Auswuchten",
    description: "Komplettservice: Wechsel der Reifen auf die Felgen (Montage) plus professionelles Auswuchten. Das Rundum-Sorglos-Paket.",
    price: 50,
    duration: "60 min",
    image: "https://images.unsplash.com/photo-1625047509168-a7026f36de04?w=800&q=80",
    features: ["Montage & Wuchten", "Ventilkontrolle", "Achsvermessungs-Check"]
  },
  {
    id: 4,
    name: "Reifenreparatur",
    description: "Professionelle Reparatur von Reifenschäden nach den strengen ETRTO-Richtlinien. Wir flicken Löcher und kleine Beschädigungen fachgerecht.",
    price: 15,
    duration: "45 min",
    image: "https://images.unsplash.com/photo-1625047509168-a7002f36de04?w=800&q=80",
    features: ["Schadensprüfung", "Professionelle Reparatur", "Qualitätsgarantie"]
  },
  {
    id: 5,
    name: "Reifeneinlagerung",
    description: "Sichere Lagerung Ihrer Saisonreifen in optimalen Bedingungen (trocken, temperiert und dunkel) für maximale Lebensdauer.",
    price: 25,
    duration: "Pro Saison",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    features: ["Reifen-Check vor Einlagerung", "Optimale Bedingungen", "Versichert"]
  },
  {
    id: 6,
    name: "Felgeninstandsetzung",
    description: "Reparatur und Aufbereitung von Aluminium- oder Stahlfelgen. Entfernung von Kratzern und Bordsteinschäden.",
    price: 80,
    duration: "Individuell",
    image: "https://images.unsplash.com/photo-1625047509168-a7026f36de04?w=800&q=80",
    features: ["Kratzer entfernen", "Lackaufbereitung", "Wiederherstellung der Optik"]
  },
];

const ServiceGridContent = ({ services }) => (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
              className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>

              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className={`text-xl font-bold`} style={{ color: DARK_COLOR }}>{service.name}</h3>
                  <span className={`text-white px-3 py-1 rounded-full text-sm font-bold`} style={{ backgroundColor: ACCENT_COLOR }}>
                    {service.price ? `ab € ${service.price.toLocaleString('de-DE')}` : 'Preis auf Anfrage'}
                  </span>
                </div>

                <p className={`text-sm mb-4 leading-relaxed`} style={{ color: MEDIUM_COLOR }}>
                  {service.description}
                </p>

                <div className="space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className={`flex items-center gap-2 text-sm`} style={{ color: MEDIUM_COLOR }}>
                      <CheckCircle className="w-4 h-4" style={{ color: ACCENT_COLOR }} />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  {service.duration && (
                    <span className={`text-sm`} style={{ color: MEDIUM_COLOR }}>
                        <Clock className="w-4 h-4 inline mr-1" />
                        {service.duration}
                    </span>
                  )}
                  
                  <button
                    onClick={() => window.dispatchEvent(new CustomEvent('open-booking-modal-with-service', {
                      detail: { 
                        service: { 
                            name: service.name, 
                            price: service.price 
                        } 
                      }
                    }))}
                    className={`font-medium flex items-center gap-1 hover:text-[#d9002d]`}
                    style={{ color: ACCENT_COLOR }}
                  >
                    Buchen
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
        ))}
    </div>
);


export default function Services() {
  return (
    // Hintergrund auf BG_WHITE setzen
    <div className="pt-32 pb-24 min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className={`text-5xl font-bold mb-6`} style={{ color: DARK_COLOR }}>
            Unsere Reifenservices
          </h1>
          <p className={`text-xl max-w-3xl mx-auto`} style={{ color: MEDIUM_COLOR }}>
            Professionelle Reifenservices zu fairen Preisen. Schnell und zuverlässig.
          </p>
        </motion.div>

        {/* Services Grid Content */}
        <ServiceGridContent services={servicesData} /> 

        {/* CTA Banner für weitere Services oder individuelle Anfragen */}
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className={`mt-16 p-8 rounded-xl text-center shadow-lg`}
            style={{ backgroundColor: ACCENT_COLOR + '10' }}
        >
            <h3 className={`text-2xl font-bold mb-4`} style={{ color: DARK_COLOR }}>Nicht fündig geworden?</h3>
            <p className={`text-lg mb-6`} style={{ color: MEDIUM_COLOR }}>Kontaktieren Sie uns für individuelle Anfragen oder komplexere Reparaturen.</p>
            <a
                href={`tel:020125908194`}
                className={`text-white px-8 py-4 rounded-full font-medium transition-all duration-300 hover:scale-105`}
                style={{ backgroundColor: ACCENT_COLOR }}
            >
                Jetzt anrufen: 0201 25908194
            </a>
        </motion.div>
      </div>
    </div>
  );
}