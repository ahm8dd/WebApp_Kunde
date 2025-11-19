import React from "react";
import { motion } from "framer-motion";
// Geänderte Icons für Werkstatt-Themen
import { Gauge, Bolt, Award, Wrench } from "lucide-react"; 

// Farbpalette
const PRIMARY_TEXT_COLOR = "#38405f";
const ACCENT_COLOR = "#ff0035"; // Rot
const LIGHT_BG_COLOR = "#E8F4F8"; // Helles, neutrales Blau/Grau für Akzenthintergründe

const features = [
  {
    icon: Gauge, // Messgerät für Präzision
    title: "Modernste Wucht-Technologie",
    description: "Wir nutzen fortschrittliche Ausrüstung für präzises Wuchten und Achsvermessung, um Ihre Fahrsicherheit zu maximieren."
  },
  {
    icon: Bolt, // Blitz für Geschwindigkeit/Reparatur
    title: "Schneller, zuverlässiger Service",
    description: "Reifenwechsel in Rekordzeit und professionelle, schnelle Reparaturen, damit Sie keine Zeit verlieren."
  },
  {
    icon: Award, // Auszeichnung für Qualität
    title: "Zertifizierte Meisterqualität",
    description: "Unsere Fachkräfte sind hochqualifiziert und garantieren höchste Standards bei Montage und Service."
  },
  {
    icon: Wrench, // Schraubenschlüssel für umfassenden Service
    title: "Umfassender Reifenservice",
    description: "Von der Einlagerung über die Felgeninstandsetzung bis zur Montage – alles aus einer Hand."
  }
];

// Die LeafDecoration-Komponente wird entfernt/auskommentiert, da sie nicht themenrelevant ist.

export default function WhatWeDo() {
  return (
    <section className="py-16 md:py-20 lg:py-24 bg-white relative overflow-hidden">
      
      {/* Die Hintergrund-Dekorationen (LeafDecoration) werden entfernt,
          da sie nicht zum Werkstatt-Thema passen. */}
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 80, scale: 0.8 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut", type: "spring", stiffness: 100 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.p 
            initial={{ opacity: 0, letterSpacing: "0.1em" }}
            whileInView={{ opacity: 1, letterSpacing: "0.3em" }}
            transition={{ duration: 1, delay: 0.3 }}
            viewport={{ once: true }}
            className="font-sans text-sm text-gray-500 mb-4 tracking-wider uppercase"
          >
            Die M&M Reifenservice Garantie
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 50, skewX: 10 }}
            whileInView={{ opacity: 1, y: 0, skewX: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
            viewport={{ once: true }}
            className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-[#0F0F0F] leading-tight mb-6"
          >
            Ihre Vorteile bei uns<br />
            <motion.span 
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
              style={{ color: ACCENT_COLOR }} // Roter Akzent
            >
              Qualität und Präzision
            </motion.span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 30, filter: 'blur(5px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1, delay: 1, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed"
          >
            Bei M&M Reifenservice kombinieren wir jahrelange Erfahrung mit modernster Werkstatttechnik. Wir sorgen dafür, dass Ihre Reifen perfekt montiert, gewuchtet und gelagert werden. Vertrauen Sie auf Experten.
          </motion.p>
        </motion.div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Image */}
          <motion.div
            initial={{ opacity: 0, x: -150, rotate: -15, scale: 0.7 }}
            whileInView={{ opacity: 1, x: 0, rotate: 0, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut", type: "spring", stiffness: 80 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="lg:col-span-3 flex justify-center lg:justify-start"
          >
            <motion.div 
              whileHover={{ boxShadow: `0 30px 60px rgba(56, 64, 95, 0.3)` }} // Shadow in Primary Color
              className="w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-full overflow-hidden shadow-lg"
            >
              <img
                // Bild ersetzen (z.B. Nahaufnahme eines Reifens oder Werkzeugs)
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/c85593c6e_3.jpg?w=800&q=90"
                alt="Werkstattansicht mit modernen Geräten bei M&M Reifenservice"
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
              />
            </motion.div>
          </motion.div>

          {/* Center Features */}
          <div className="lg:col-span-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ 
                    opacity: 0, 
                    y: 100, 
                    scale: 0.7,
                    rotateX: index % 2 === 0 ? 45 : -45,
                    rotateY: index % 2 === 0 ? -20 : 20
                  }}
                  whileInView={{ 
                    opacity: 1, 
                    y: 0, 
                    scale: 1,
                    rotateX: 0,
                    rotateY: 0
                  }}
                  transition={{ 
                    duration: 1.5, 
                    delay: index * 0.2,
                    type: "spring",
                    stiffness: 100,
                    damping: 15
                  }}
                  viewport={{ once: true }}
                  whileHover={{ 
                    scale: 1.08, 
                    y: -10,
                    rotateZ: index % 2 === 0 ? 2 : -2,
                    boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
                  }}
                  className="flex items-start gap-4 group cursor-pointer"
                >
                  {/* Icon */}
                  <motion.div 
                    initial={{ scale: 0, rotate: -360 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    transition={{ 
                      duration: 1, 
                      delay: index * 0.2 + 0.3,
                      type: "spring",
                      stiffness: 300
                    }}
                    viewport={{ once: true }}
                    whileHover={{ 
                      rotate: 180, 
                      scale: 1.3,
                      backgroundColor: ACCENT_COLOR // Roter Hover-Hintergrund
                    }}
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500`}
                    style={{ backgroundColor: LIGHT_BG_COLOR }}
                  >
                    <feature.icon 
                      className="w-6 h-6 transition-colors duration-300 group-hover:text-white"
                      style={{ color: ACCENT_COLOR }} // Rotes Icon
                    />
                  </motion.div>
                  
                  {/* Content */}
                  <div>
                    <motion.h3 
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8, delay: index * 0.2 + 0.5 }}
                      viewport={{ once: true }}
                      className="font-serif text-xl font-bold text-[#0F0F0F] mb-2 transition-colors duration-300"
                      style={{ color: PRIMARY_TEXT_COLOR }}
                    >
                      {feature.title}
                    </motion.h3>
                    <motion.p 
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.2 + 0.7 }}
                      viewport={{ once: true }}
                      className="font-sans text-sm text-gray-600 leading-relaxed"
                    >
                      {feature.description}
                    </motion.p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, x: 150, rotate: 15, scale: 0.7 }}
            whileInView={{ opacity: 1, x: 0, rotate: 0, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut", type: "spring", stiffness: 80, delay: 0.3 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.1, rotate: -5 }}
            className="lg:col-span-3 flex justify-center lg:justify-end"
          >
            <motion.div 
              whileHover={{ boxShadow: `0 30px 60px rgba(255, 0, 53, 0.3)` }} // Shadow in Accent Color
              className="w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-full overflow-hidden shadow-lg"
            >
              <img
                // Bild ersetzen (z.B. Reifenlager oder Felgenreparatur)
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/81c836a67_4.jpg?w=800&q=90"
                alt="Ein Mechaniker bei der Arbeit an einem Rad"
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
              />
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 1.5, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <motion.button 
            whileHover={{ 
              scale: 1.1, 
              boxShadow: `0 20px 40px rgba(255, 0, 53, 0.3)` // Roter Shadow
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.dispatchEvent(new CustomEvent('open-booking-modal'))}
            className={`bg-white text-[#0F0F0F] px-8 py-4 rounded-full font-sans font-semibold transition-all duration-300 shadow-lg text-lg border-2 border-[${ACCENT_COLOR}]`}
            style={{ backgroundColor: ACCENT_COLOR, color: 'white' }}
          >
            Jetzt Ihren Termin online buchen
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}