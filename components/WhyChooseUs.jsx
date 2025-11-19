import React from "react";
import { motion } from "framer-motion";
// Neue Icons für Werkstatt-Themen
import { Bolt, Wrench, Shield, Car } from "lucide-react"; 

// Farbpalette
const PRIMARY_TEXT_COLOR = "#38405f"; // Dunkelblau/Grau für Text
const ACCENT_COLOR = "#ff0035"; // Rot für Akzente
const LIGHT_BG_COLOR = "#E8F4F8"; // Sehr helles, neutrales Blau für Hintergrund
const DARK_BG_COLOR = "#38405f"; // Dunkler Akzent für Blur

const features = [
  {
    icon: Bolt, // Blitz für Geschwindigkeit/Technologie
    title: "Technologie für Präzision",
    subtitle: "SCHNELL & GENAU",
    description: "Wir setzen modernste Wucht- und Montagetechnik ein, um Fehlerquellen auszuschließen und eine perfekte Reifenleistung zu gewährleisten."
  },
  {
    icon: Wrench, // Schraubenschlüssel für Expertise
    title: "Experten am Werk",
    subtitle: "ZERTIFIZIERTES TEAM",
    description: "Unser Team besteht aus erfahrenen, geschulten Fachkräften, die jeden Service mit höchster Sorgfalt und Know-how durchführen."
  },
  {
    icon: Shield, // Schild für Sicherheit
    title: "Ihre Sicherheit Priorität",
    subtitle: "VERLÄSSLICHKEIT",
    description: "Von der Produktauswahl bis zur Endkontrolle steht Ihre Sicherheit an erster Stelle. Vertrauen Sie auf geprüfte Qualität und Haltbarkeit."
  }
];

export default function WhyChooseUs() {
  return (
    <section id="why-us" className="pt-20 md:pt-24 lg:pt-28 pb-16 md:pb-20 lg:pb-24 bg-gradient-to-b from-[#F8F2EC] to-white relative overflow-hidden">
      {/* Enhanced Background Decorations (Anpassung der Farbe) */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.3, rotate: 45 }}
        whileInView={{ opacity: 0.1, scale: 1, rotate: 0 }}
        transition={{ duration: 2.5, ease: "easeOut", delay: 0.3 }}
        viewport={{ once: true }}
        className="absolute bottom-10 left-10"
      >
        {/* Blur in Dunkelblau/Grau als dezenter Hintergrundeffekt */}
        <div className="w-96 h-96 rounded-full blur-3xl" style={{ backgroundColor: DARK_BG_COLOR, opacity: 0.15 }} />
      </motion.div>

      <div className="mx-auto my-1 px-6 max-w-7xl lg:px-8">
        <div className="grid grid-cols-1 items-center">
          {/* Centered Content */}
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9, rotateX: 15 }}
            whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
            transition={{ duration: 1.2, ease: "easeOut", type: "spring", stiffness: 100 }}
            viewport={{ once: true }}
            className="space-y-8 text-center"
          >
            {/* Header */}
            <div>
              <motion.div 
                initial={{ opacity: 0, scale: 0, rotate: -180 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 200 }}
                viewport={{ once: true }}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 mb-6`}
                style={{ backgroundColor: LIGHT_BG_COLOR }}
              >
                <Car className={`w-4 h-4`} style={{ color: ACCENT_COLOR }} />
                <span className={`font-sans text-sm font-medium uppercase tracking-wider`} style={{ color: PRIMARY_TEXT_COLOR }}>IHR ZUVERLÄSSIGER REIFENSERVICE IN ESSEN</span>
              </motion.div>
              
              <motion.h2 
                initial={{ opacity: 0, y: 50, skewY: 5 }}
                whileInView={{ opacity: 1, y: 0, skewY: 0 }}
                transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
                viewport={{ once: true }}
                className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
              >
                <span className="text-[#0F0F0F]">Warum M&M Reifenservice</span>
                <br />
                <span style={{ color: ACCENT_COLOR }}>Die bessere Wahl ist</span>
              </motion.h2>
              
              <motion.p 
                initial={{ opacity: 0, y: 30, filter: 'blur(5px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
                viewport={{ once: true }}
                className="font-sans text-lg text-gray-600 leading-relaxed mb-8 max-w-3xl mx-auto"
              >
                Erleben Sie den Unterschied: Bei uns trifft modernste Technik auf echte Expertise. Unsere zertifizierten Spezialisten sorgen für die maximale Lebensdauer Ihrer Reifen und garantieren höchste Sicherheit auf der Straße.
              </motion.p>
            </div>

            {/* Features List */}
            <div className="space-y-8 max-w-2xl mx-auto text-left">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100, rotateY: index % 2 === 0 ? -30 : 30, scale: 0.8 }}
                  whileInView={{ opacity: 1, x: 0, rotateY: 0, scale: 1 }}
                  transition={{ 
                    duration: 1.2, 
                    delay: index * 0.3,
                    type: "spring",
                    stiffness: 100,
                    damping: 15
                  }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, x: 10 }}
                  className="flex items-start gap-4 group cursor-pointer"
                >
                  {/* Icon */}
                  <motion.div 
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.3 + 0.2, type: "spring", stiffness: 200 }}
                    viewport={{ once: true }}
                    whileHover={{ rotate: 360, scale: 1.2 }}
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center group-hover:bg-[${ACCENT_COLOR}] transition-all duration-500 flex-shrink-0`}
                    style={{ backgroundColor: LIGHT_BG_COLOR }}
                  >
                    <feature.icon className={`w-7 h-7 group-hover:text-white transition-colors duration-300`} style={{ color: ACCENT_COLOR }} />
                  </motion.div>
                  
                  {/* Content */}
                  <div className="flex-1">
                    <motion.h3 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: index * 0.3 + 0.4 }}
                      viewport={{ once: true }}
                      className="font-serif text-xl font-bold mb-1 group-hover:text-[#0F0F0F] transition-colors duration-300"
                      style={{ color: PRIMARY_TEXT_COLOR }}
                    >
                      {feature.title}
                    </motion.h3>
                    <motion.p 
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.3 + 0.5 }}
                      viewport={{ once: true }}
                      className={`font-sans text-sm font-medium uppercase tracking-wider mb-2`}
                      style={{ color: ACCENT_COLOR }}
                    >
                      {feature.subtitle}
                    </motion.p>
                    <motion.p 
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.3 + 0.6 }}
                      viewport={{ once: true }}
                      className="font-sans text-gray-600 leading-relaxed"
                    >
                      {feature.description}
                    </motion.p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.5 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1, delay: 1.2, type: "spring", stiffness: 150 }}
              viewport={{ once: true }}
              className="pt-4"
            >
              <motion.button 
                whileHover={{ scale: 1.05, boxShadow: `0 20px 40px rgba(255, 0, 53, 0.3)` }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.dispatchEvent(new CustomEvent('open-booking-modal'))}
                className={`text-white px-8 py-4 rounded-full font-sans font-medium transition-all duration-300 shadow-lg`}
                style={{ backgroundColor: ACCENT_COLOR, color: 'white' }}
              >
                Jetzt unverbindlichen Termin buchen
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}