import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle } from "lucide-react";

const servicesData = [
  {
    id: 1,
    name: "Reifenwechsel",
    description: "Schneller und professioneller Reifenwechsel für alle Fahrzeugtypen. Inklusive Sichtprüfung und Luftdruckkontrolle. Unsere zertifizierten Mechaniker sorgen für einen sicheren Wechsel in kürzester Zeit.",
    price: 15,
    duration: "30 min",
    image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&q=80",
    features: ["Sichtprüfung", "Luftdruckkontrolle", "Fachgerechte Montage"]
  },
  {
    id: 2,
    name: "Reifenwechsel mit Auswuchten",
    description: "Komplettservice: Reifenwechsel plus professionelles Auswuchten für optimale Fahreigenschaften. Verhindert Vibrationen und erhöht die Lebensdauer Ihrer Reifen.",
    price: 30,
    duration: "45 min",
    image: "https://images.unsplash.com/photo-1449130015084-2eae8ee6f4d4?w=800&q=80",
    features: ["Reifenwechsel", "Auswuchten", "Ventilkontrolle", "Luftdruck"]
  },
  {
    id: 3,
    name: "Auswuchten",
    description: "Präzises Auswuchten für alle Reifengrößen. Beseitigt Unwuchten und sorgt für ruhigen Lauf. Wichtig für gleichmäßigen Reifenverschleiß.",
    price: 20,
    duration: "30 min",
    image: "https://images.unsplash.com/photo-1625047509168-a7026f36de04?w=800&q=80",
    features: ["Alle 4 Räder", "Präzise Technik", "Gewichte inkl."]
  },
  {
    id: 4,
    name: "Reifenreparatur",
    description: "Professionelle Reparatur von Reifenschäden. Wir flicken Löcher und kleine Beschädigungen fachgerecht.",
    price: 25,
    duration: "45 min",
    image: "https://images.unsplash.com/photo-1625047509168-a7026f36de04?w=800&q=80",
    features: ["Schadensprüfung", "Professionelle Reparatur", "Qualitätsgarantie"]
  },
  {
    id: 5,
    name: "Reifeneinlagerung (Sommer)",
    description: "Sichere Lagerung Ihrer Sommerreifen in optimalen Bedingungen. Trocken, temperiert und professionell gestapelt für maximale Lebensdauer.",
    price: 5,
    duration: "Per Monat",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    features: ["Trockene Lagerung", "Temperaturkontrolle", "Diebstahlschutz"]
  },
  {
    id: 6,
    name: "Reifeneinlagerung (Winter)",
    description: "Sichere Lagerung Ihrer Winterreifen während der warmen Monate. Fachgerechte Aufbewahrung verlängert die Lebensdauer erheblich.",
    price: 5,
    duration: "Per Monat",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    features: ["Professionelle Lagerung", "Optimale Bedingungen", "Versichert"]
  },
  {
    id: 7,
    name: "Komplett-Check",
    description: "Umfassende Inspektion Ihrer Reifen und Räder. Profiltiefenmessung, Sichtprüfung auf Schäden, Luftdruckkontrolle und fachmännische Beratung.",
    price: 15,
    duration: "20 min",
    image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&q=80",
    features: ["Profiltiefe", "Schadenscheck", "Luftdruck", "Beratung"]
  },
  {
    id: 8,
    name: "Ventilwechsel",
    description: "Austausch defekter oder alter Ventile. Verhindert Luftverlust und ist wichtig für die Sicherheit. Wird bei jedem Reifenwechsel empfohlen.",
    price: 10,
    duration: "15 min",
    image: "https://images.unsplash.com/photo-1625047509168-a7026f36de04?w=800&q=80",
    features: ["Neue Ventile", "Dichtungsprüfung", "Schneller Service"]
  }
];

export default function Services() {
  return (
    <div className="pt-32 pb-24 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold text-[#0e131f] mb-6">
            Unsere Reifenservices
          </h1>
          <p className="text-xl text-[#8b939c] max-w-3xl mx-auto">
            Professionelle Reifenservices zu fairen Preisen. Schnell und zuverlässig.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service, index) => (
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
                  <h3 className="text-xl font-bold text-[#0e131f]">{service.name}</h3>
                  <span className="bg-[#ff0035] text-white px-3 py-1 rounded-full text-sm font-bold">
                    ab {service.price}€
                  </span>
                </div>

                <p className="text-[#8b939c] text-sm mb-4 leading-relaxed">
                  {service.description}
                </p>

                <div className="space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-[#8b939c]">
                      <CheckCircle className="w-4 h-4 text-[#ff0035]" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <span className="text-sm text-[#8b939c]">⏱️ {service.duration}</span>
                  <button
                    onClick={() => window.dispatchEvent(new CustomEvent('open-booking-modal-with-service', {
                      detail: { service: { name: service.name, price: service.price } }
                    }))}
                    className="text-[#ff0035] hover:text-[#d9002d] font-medium flex items-center gap-1"
                  >
                    Buchen
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}