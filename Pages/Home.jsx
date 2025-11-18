import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Clock, Shield, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

const services = [
  {
    id: 1,
    title: "Reifenwechsel",
    description: "Schneller Austausch für alle Fahrzeuge. Professionell und zuverlässig.",
    price: "ab 15€",
    icon: "🚗",
    image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&q=80"
  },
  {
    id: 2,
    title: "Auswuchten",
    description: "Perfektes Gleichgewicht für besseres Handling und längere Lebensdauer.",
    price: "20€",
    icon: "⚖️",
    image: "https://images.unsplash.com/photo-1449130015084-2eae8ee6f4d4?w=800&q=80"
  },
  {
    id: 3,
    title: "Reparatur",
    description: "Professionelle Reparatur von Reifenschäden. Schnell und fachgerecht.",
    price: "25€",
    icon: "🔧",
    image: "https://images.unsplash.com/photo-1625047509168-a7026f36de04?w=800&q=80"
  },
  {
    id: 4,
    title: "Einlagerung",
    description: "Sichere Lagerung für Saisonreifen in optimalen Bedingungen.",
    price: "5€/Monat",
    icon: "📦",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80"
  }
];

const testimonials = [
  {
    name: "Anna M.",
    location: "Essen",
    text: "Super Service! Reifen in 20 Min gewechselt. Sehr empfehlenswert!",
    rating: 5
  },
  {
    name: "Thomas K.",
    location: "Essen",
    text: "Günstig und zuverlässig. Beste Werkstatt in Sulterkamp.",
    rating: 5
  },
  {
    name: "Maria S.",
    location: "Essen",
    text: "Professionelles Team und faire Preise. Top!",
    rating: 5
  }
];

const features = [
  { icon: Clock, text: "Unter 30 Min", color: "#ff0035" }, 
  { icon: Shield, text: "100% Sicher", color: "#ff0035" }
];

export default function Home() {
  return (
    <div>
      {/* Hero Section - min-h-screen entfernt, um unnötigen Leerraum zu vermeiden */}
      <section className="relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=2400&q=90"
            alt="Reifenwechsel Service in Essen - M&M Reifenservice"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0e131f]/95 via-[#0e131f]/80 to-transparent" />
        </div>

        {/* Content - NEU: pt-32 (um die Navigationsleiste zu umgehen) und pb-12 (kompakter) */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-12"> 
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white max-w-3xl"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Schnellster Reifenservice in Essen
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 text-gray-200">
              Lassen Sie Ihre Reifen in unter 30 Minuten wechseln. Professioneller Service zu unschlagbaren Preisen.
            </p>

            {/* Features */}
            <div className="flex flex-wrap gap-6 mb-10">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="flex items-center gap-2"
                >
                  <feature.icon className="w-6 h-6 text-[#ff0035]" />
                  <span className="font-medium">{feature.text}</span>
                </motion.div>
              ))}
            </div>

            {/* CTA Buttons - Abstände beibehalten */}
            <div className="flex flex-col sm:flex-row gap-8 sm:gap-12">
              <button
                onClick={() => window.dispatchEvent(new CustomEvent('open-booking-modal'))}
                className="bg-[#ff0035] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#d9002d] transition-all hover:scale-105 shadow-xl flex items-center justify-center gap-2"
              >
                Jetzt buchen
                <ArrowRight className="w-6 h-6" />
              </button>
              
              <a
                href="tel:+4920112345678"
                className="bg-white/10 backdrop-blur-sm text-white border-2 border-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-[#0e131f] transition-all flex items-center justify-center"
              >
                Anrufen: +49 201 1234 5678
              </a>
            </div>

            {/* Urgency Element */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="mt-8 bg-black/30 backdrop-blur-sm rounded-xl p-4 max-w-md border border-[#ff0035]/30"
            >
              <p className="text-sm text-gray-200">
                ⚡ <strong className="text-[#ff0035]">Heute noch verfügbar!</strong> Buchen Sie jetzt und sparen Sie 10% auf den ersten Service.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services Section - Vertikaler Abstand aggressiv reduziert (py-12) */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12" // KORRIGIERT: Abstand zur darunterliegenden Sektion
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#0e131f] mb-4">
              Unsere Services
            </h2>
            <p className="text-xl text-[#8b939c] max-w-2xl mx-auto">
              Wir bieten eine Reihe von Reifenservices, um Sie sicher auf der Straße zu halten.
            </p>
          </motion.div>

          {/* Horizontaler Abstand (gap-16) bleibt für sauberes Design */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-16">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
                className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
                
                <div className="p-6">
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <h3 className="text-xl font-bold text-[#0e131f] mb-2">{service.title}</h3>
                  <p className="text-[#8b939c] text-sm mb-4">{service.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-[#ff0035]">{service.price}</span>
                    <Link
                      to={createPageUrl("Services")}
                      className="text-[#ff0035] hover:text-[#d9002d] font-medium flex items-center gap-1"
                    >
                      Mehr erfahren
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us - Vertikaler Abstand aggressiv reduziert (py-12) */}
      <section className="py-12 bg-[#59546c]/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12" // KORRIGIERT
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#0e131f] mb-4">
              Warum M&M Reifenservice?
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-16">
            {[
              { icon: Clock, title: "Schnell & Effizient", desc: "Service in unter 30 Minuten" },
              { icon: Shield, title: "Qualität & Sicherheit", desc: "Zertifizierte Mechaniker" },
              { icon: Star, title: "Faire Preise", desc: "Top Preis-Leistungs-Verhältnis" }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-white rounded-xl p-8 shadow-lg text-center"
              >
                <div className="w-16 h-16 bg-[#ff0035]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <item.icon className="w-8 h-8 text-[#ff0035]" />
                </div>
                <h3 className="text-xl font-bold text-[#0e131f] mb-3">{item.title}</h3>
                <p className="text-[#8b939c]">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials - Vertikaler Abstand aggressiv reduziert (py-12) */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12" // KORRIGIERT
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#0e131f] mb-4">
              Was unsere Kunden sagen
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-16">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-[#59546c]/10 rounded-xl p-8 shadow-lg"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-[#ff0035] fill-current" />
                  ))}
                </div>
                <p className="text-[#8b939c] mb-6 italic">&quot;{testimonial.text}&quot;</p>
                <div>
                  <p className="font-bold text-[#0e131f]">{testimonial.name}</p>
                  <p className="text-sm text-[#8b939c]">{testimonial.location}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Vertikaler Abstand aggressiv reduziert (py-12) */}
      <section className="py-12 bg-[#ff0035] text-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Bereit für Ihren Reifenwechsel?
            </h2>
            <p className="text-xl mb-10 text-white/90">
              Buchen Sie jetzt online und profitieren Sie von unserem schnellen Service!
            </p>
            <button
              onClick={() => window.dispatchEvent(new CustomEvent('open-booking-modal'))}
              className="bg-white text-[#ff0035] px-10 py-5 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all hover:scale-105 shadow-xl inline-flex items-center gap-3"
            >
              Termin vereinbaren
              <ArrowRight className="w-6 h-6" />
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}