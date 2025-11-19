import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
// Lucide-Icons angepasst für Werkstatt-Themen
import { Gauge, MapPin, Users, Award, Bolt, Car, ArrowRight } from "lucide-react";

// Werkstatt-Akzentfarbe (z.B. Tiefes Blau oder Orange)
// Ich verwende hier ein Tiefes Blau: #005691
const PRIMARY_COLOR = "#005691";
const LIGHT_COLOR = "#EFEFEF";

const slides = [
  {
    id: 1,
    // Bild-URL: Hier sollten Bilder von Reifen, Montagen oder der Werkstatt sein
    image_url: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/831601306_14.jpg?w=2560&q=90",
    headline: "Ihr Experte für Reifen & Autoservice",
    subheading: "Qualität, Sicherheit und Service in Ihrer Nähe",
    description: "Wir bieten professionelle Reifenmontage, modernste Achsvermessung und zuverlässigen Reparaturservice für alle Fahrzeugmarken. Fahren Sie sicher und komfortabel.",
    cta_text: "TERMIN JETZT VEREINBAREN",
    isH1: true,
  },
  {
    id: 2,
    // Bild-URL: Hier ein Bild von Auswuchtmaschinen oder der Annahme
    image_url: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/07d005974_12.jpg?w=2560&q=90",
    headline: "Reifenwechsel zum Festpreis",
    subheading: "Schnell, zuverlässig und transparent",
    description: "Saisonwechsel leicht gemacht: Wir wechseln Ihre Reifen schnell, wuchten sie präzise aus und lagern auf Wunsch Ihre Garnitur fachgerecht ein.",
    cta_text: "PREISE & SERVICES ANSEHEN",
    isH1: false,
  },
  {
    id: 3,
    // Bild-URL: Hier ein Bild von Mechanikern bei der Arbeit oder Premium-Felgen
    image_url: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/4289f0848_13.jpg?w=2560&q=90",
    headline: "Hochwertige Felgen- und Reifengarantie",
    subheading: "Ihre Sicherheit ist unser Versprechen",
    description: "Wir arbeiten ausschließlich mit Premium-Marken und modernster Technik. Vertrauen Sie auf zertifizierte Qualität und die Erfahrung unserer Fachkräfte.",
    cta_text: "ZU UNSEREN PARTNERN",
    isH1: false,
  }
];

// Trust indicators data
const trustIndicators = [
  { icon: Users, text: "TÜV-Zertifizierte Werkstatt", color: "text-white" },
  { icon: Award, text: "Top Service 2024 (5-Sterne)", color: `text-[${PRIMARY_COLOR}]` },
  { icon: MapPin, text: "Zentrale Stadtlage", color: "text-white" }
];

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  const currentSlide = slides[currentIndex];

  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Images with Super Responsive Design */}
      <AnimatePresence initial={false}>
        <motion.div
          key={currentIndex}
          className="absolute inset-0 w-full h-full"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        >
          <img
            // HINWEIS: Ersetze diese URLs durch Bilder, die zur Werkstatt passen!
            src={currentSlide.image_url}
            alt={`Reifen- & Autoservice ${currentSlide.headline}. ${currentSlide.subheading}`}
            className="w-full h-full object-cover object-center"
            style={{
              objectPosition: 'center center',
              objectFit: 'cover',
              width: '100%',
              height: '100%',
              minHeight: '100vh',
              maxWidth: '100vw'
            }}
          />
        </motion.div>
      </AnimatePresence>
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent z-10" />

      {/* Content */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 sm:pt-36 md:pt-40 pb-16 sm:pb-20">
        <div className="w-full max-w-6xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-white space-y-6 sm:space-y-8"
            >
              {/* Main Headline - Enhanced Glow Effect */}
              {currentSlide.isH1 ? (
                <h1 className="font-serif font-medium leading-[1.1] text-white text-[clamp(2rem,8vw,5rem)]">
                  {currentSlide.headline}
                  <br />
                  <span className={`block text-[${PRIMARY_COLOR}] enhanced-glow-text mt-4 sm:mt-6 text-[0.85em]`}>
                    {currentSlide.subheading}
                  </span>
                </h1>
              ) : (
                <h2 className="font-serif font-medium leading-[1.1] text-white text-[clamp(2rem,8vw,5rem)]">
                  {currentSlide.headline}
                  <br />
                  <span className={`block text-[${PRIMARY_COLOR}] enhanced-glow-text mt-4 sm:mt-6 text-[0.85em]`}>
                    {currentSlide.subheading}
                  </span>
                </h2>
              )}

              {/* Description - Responsive Text */}
              <p className="text-gray-100 text-[clamp(1.125rem,4vw,1.5rem)] font-light leading-relaxed max-w-4xl">
                {currentSlide.description}
              </p>
              
              {/* Trust Indicators - Responsive Layout */}
              <div className="flex flex-wrap gap-4 sm:gap-6 pt-2 sm:pt-4">
                {trustIndicators.map((indicator, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    className="flex items-center gap-2"
                  >
                    <indicator.icon className={`w-4 h-4 sm:w-5 sm:h-5 ${indicator.color}`} />
                    <span className="text-xs sm:text-sm font-medium text-white/90">{indicator.text}</span>
                  </motion.div>
                ))}
              </div>
              
              {/* CTA Buttons - Super Responsive */}
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 pt-4 sm:pt-6">
                <button
                  onClick={() => window.dispatchEvent(new CustomEvent('open-booking-modal'))}
                  // Akzentfarbe im Button angepasst
                  className={`group bg-[${PRIMARY_COLOR}] text-white px-6 sm:px-8 lg:px-10 py-4 sm:py-5 rounded-full font-sans font-semibold text-sm sm:text-base lg:text-lg hover:bg-opacity-90 transition-all duration-500 hover:scale-105 shadow-2xl hover:shadow-[${PRIMARY_COLOR}]/30 flex items-center justify-center gap-2 sm:gap-3 min-h-[48px] sm:min-h-[56px] lg:min-h-[60px] w-full sm:w-auto`}
                  style={{ backgroundColor: PRIMARY_COLOR, boxShadow: `0 10px 15px -3px rgba(0, 86, 145, 0.3)` }}
                >
                  <span className="text-center leading-tight">
                    {currentSlide.cta_text}
                  </span>
                  <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-2 transition-transform duration-300 flex-shrink-0" />
                </button>
                
                <button
                  onClick={() => window.location.href = 'tel:+491234567890'}
                  className="group bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 px-6 sm:px-8 py-4 sm:py-5 rounded-full font-sans font-semibold text-sm sm:text-base lg:text-lg hover:bg-white hover:text-[#0F0F0F] transition-all duration-500 flex items-center justify-center gap-2 sm:gap-3 min-h-[48px] sm:min-h-[56px] lg:min-h-[60px] w-full sm:w-auto"
                >
                  <span className="whitespace-nowrap">Rufen Sie uns an: 0123 4567890</span>
                </button>
              </div>

              {/* Urgency Element - Responsive */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
                className={`bg-black/30 backdrop-blur-sm rounded-2xl p-4 sm:p-6 max-w-sm sm:max-w-md border border-[${PRIMARY_COLOR}]/30`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Bolt className={`w-4 h-4 text-[${PRIMARY_COLOR}] flex-shrink-0`} />
                  <span className={`text-[${PRIMARY_COLOR}] font-medium text-xs sm:text-sm`}>AKTION</span>
                </div>
                <p className="text-white/90 text-xs sm:text-sm leading-relaxed">
                  Buchen Sie jetzt Ihren Reifenwechsel und erhalten Sie eine kostenlose Achsvermessungs-Prüfung!
                </p>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation Dots - Responsive Positioning */}
      <div className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 z-30 flex gap-2 sm:gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
              currentIndex === index ? "bg-white scale-125" : "bg-white/50 hover:bg-white"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Enhanced CSS for perfect responsiveness and a subtle, faded glow effect */}
      <style jsx>{`
        /* Der Glow-Effekt wurde auf die Werkstatt-Akzentfarbe angepasst */
        .enhanced-glow-text {
          text-shadow: 
            0 0 5px rgba(0, 86, 145, 0.5),
            0 0 15px rgba(0, 86, 145, 0.3);
          filter: drop-shadow(0 0 4px rgba(0, 86, 145, 0.3));
        }
        
        @media (max-width: 640px) {
          .enhanced-glow-text {
            text-shadow: 
              0 0 3px rgba(0, 86, 145, 0.6),
              0 0 8px rgba(0, 86, 145, 0.4);
            filter: drop-shadow(0 0 2px rgba(0, 86, 145, 0.4));
          }
        }
        
        @media (min-width: 641px) and (max-width: 1024px) {
          .enhanced-glow-text {
            text-shadow: 
              0 0 4px rgba(0, 86, 145, 0.5),
              0 0 12px rgba(0, 86, 145, 0.3);
            filter: drop-shadow(0 0 3px rgba(0, 86, 145, 0.3));
          }
        }
        
        @media (min-width: 1025px) {
          .enhanced-glow-text {
             text-shadow: 
              0 0 5px rgba(0, 86, 145, 0.5),
              0 0 15px rgba(0, 86, 145, 0.3);
            filter: drop-shadow(0 0 4px rgba(0, 86, 145, 0.3));
          }
        }
      `}</style>
    </section>
  );
}