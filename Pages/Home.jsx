import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Clock, Shield, Star, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "../utils";

// --- KONSTANTEN BASIEREND AUF PALETTE ---
const ACCENT_COLOR = "#ff0035"; // Rot
const DARK_COLOR = "#0e131f"; // Dunkelste Farbe (Für Hero Overlay & Text auf hellen Elementen)
const MEDIUM_COLOR = "#59546c"; // Graublau (Original Akzentton für helle Hintergründe)
// Ich verwende Ihre gespeicherte Telefonnummer und Adresse für die Links
const BUSINESS_PHONE = "0201 25908194";
const DISPLAY_PHONE = "0201 25908194";
const GOOGLE_MAPS_LINK =
  "https://www.google.com/maps/place/Sulterkamp+58,+45356+Essen";
// ----------------------------------------

// NEU: HINWEIS FÜR TERMINLOSEN SERVICE
const WALK_IN_MESSAGE = (
  <span className="text-2xl font-bold text-white bg-[#ff0035] p-3 rounded-lg shadow-2xl inline-block mt-4 mb-6">
    KEIN TERMIN NÖTIG!
  </span>
);

const services = [
  {
    id: 1,
    title: "Radwechsel",
    description:
      "Schneller Austausch für alle Fahrzeuge. Professionell und zuverlässig.",
    price: "ab 25€", // Korrigiert
    icon: "🚗",
    image: "/imgs/radwechsel.jpg",
  },
  {
    id: 2,
    title: "Räder Auswuchten",
    description:
      "Perfektes Gleichgewicht für besseres Handling und längere Lebensdauer.",
    price: "ab 40€", // Korrigiert
    icon: "⚖️",
    image: "imgs/wuchten.jpg",
  },
  {
    id: 3,
    title: "Reifenreparatur",
    description:
      "Professionelle Reparatur von Reifenschäden. Schnell und fachgerecht.",
    price: "ab 15€", // Korrigiert
    icon: "🔧",
    image: "imgs/reifen_reparatur.jpg",
  },
  {
    id: 4,
    title: "Reifeneinlagerung",
    description: "Sichere Lagerung für Saisonreifen in optimalen Bedingungen.",
    price: "ab 25€", // Korrigiert
    icon: "📦",
    image: "imgs/reifen_lager.png",
  },
];

const testimonials = [
  {
    name: "Hadi M.",
    location: "Essen",
    text: "Super Service! Reifen in 20 Min gewechselt. Sehr empfehlenswert!",
    rating: 5,
  },
  {
    name: "Jara E.T.",
    location: "Essen",
    text: "Günstig und zuverlässig. Beste Werkstatt in Essen.",
    rating: 5,
  },
  {
    name: "Elissar M.",
    location: "Essen",
    text: "Professionelles Team und faire Preise. Top!",
    rating: 5,
  },
];

// ANGEPASST: Fügt den Haupt-USP hinzu
const features = [
  { icon: Clock, text: "Express-Service", color: ACCENT_COLOR },
  { icon: Shield, text: "Geprüfte Qualität", color: ACCENT_COLOR },
  { icon: Phone, text: "Ohne Termin", color: ACCENT_COLOR }, // NEUER FOKUS
];
// ----------------------------------------------------------------------

export default function Home() {
  return (
    <div>
      {/* Hero Section (BLEIBT DUNKEL) */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=2400&q=90"
            alt="Reifenwechsel Service in Essen - M&M Reifenservice"
            className="w-full h-full object-cover"
          />
          {/* Hero Overlay */}
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
            <h1 className="text-5xl md:text-7xl font-bold mb-4 leading-tight">
              Ihr Reifen Partner in Essen <br />
            </h1>

            {/* NEU: TERMINLOSER SERVICE PROMINENT HERVORGEHOBEN */}
            {WALK_IN_MESSAGE}

            <p className="text-xl md:text-2xl mb-8 text-gray-200">
              Professioneller Reifen-Service, schnell und ohne Termin. Wir
              halten Sie mit Top-Qualität zu unschlagbaren Preisen sicher auf
              der Straße.
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
              <a
                href={GOOGLE_MAPS_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className={`bg-[#ff0035] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#d9002d] transition-all hover:scale-105 shadow-xl flex items-center justify-center gap-2`}
              >
                <MapPin className="w-6 h-6 mr-2" />
                Adresse finden & Losfahren
              </a>

              {/* Anrufen Button - angepasst */}
              <a
                href={`tel:${BUSINESS_PHONE.replace(/\s/g, "")}`}
                className="bg-white/10 backdrop-blur-sm text-white border-2 border-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-[#0e131f] transition-all flex items-center justify-center"
              >
                <Phone className="w-6 h-6 mr-2" />
                Anrufen ({DISPLAY_PHONE})
              </a>
            </div>

            {/* Urgency Element - ANGEPASST AUF TERMINLOSEN SERVICE */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="mt-8 bg-black/30 backdrop-blur-sm rounded-xl p-4 max-w-md border border-[#ff0035]/30"
            >
              <p className="text-sm text-gray-200">
                ⭐ Keine Wartezeit für einen Termin! Fahren Sie direkt zu uns
                und wir kümmern uns um Ihre Reifen.
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* ÜBERGANG 1 WURDE ENTFERNT */}
      </section>

      {/* Services Section (Bleibt weiß) */}
      <section className="py-20 bg-white">
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
              Wir bieten eine Reihe von Reifenservices an – spontan und ohne
              Termindruck.
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
                  <h3 className="text-xl font-bold text-[#0e131f] mb-2">
                    {service.title}
                  </h3>
                  <p className="text-[#8b939c] text-sm mb-4">
                    {service.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-[#ff0035]">
                      {service.price}
                    </span>
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

      {/* Why Choose Us (Bleibt Original-Off-White) */}
      <section className="py-20 bg-[#59546c]/10">
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
              {
                icon: Clock,
                title: "Schnell & Effizient",
                desc: "Service in unter 30 Minuten",
              },
              {
                icon: Phone, // Icon für spontanen Service
                title: "Einfach Vorbeikommen",
                desc: "Kein Termin nötig – kommen Sie jederzeit vorbei!",
              },
              {
                icon: Star,
                title: "Faire Preise",
                desc: "Top Preis-Leistungs-Verhältnis",
              },
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
                <h3 className="text-xl font-bold text-[#0e131f] mb-3">
                  {item.title}
                </h3>
                <p className="text-[#8b939c]">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials (Bleibt weiß) */}
      <section className="py-20 bg-white relative">
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
                    <Star
                      key={i}
                      className="w-5 h-5 text-[#ff0035] fill-current"
                    />
                  ))}
                </div>
                <p className="text-[#8b939c] mb-6 italic">
                  "{testimonial.text}"
                </p>
                <div>
                  <p className="font-bold text-[#0e131f]">{testimonial.name}</p>
                  <p className="text-sm text-[#8b939c]">
                    {testimonial.location}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section (Bleibt rot) */}
      <section className="py-20 bg-[#ff0035] text-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Kein Termin nötig – Einfach vorbeikommen!
            </h2>
            <p className="text-xl mb-10 text-white/90">
              Sparen Sie Zeit und Nerven. Wir sind für Sie da, wenn Sie uns
              brauchen.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/Contact" // <-- HIER WIRD AUF /Contact WEITERGELEITET
                className="bg-white text-[#ff0035] px-10 py-5 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all hover:scale-105 shadow-xl inline-flex items-center gap-3"
              >
                Noch Fragen? Kontakt aufnehmen
                <ArrowRight className="w-6 h-6" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
