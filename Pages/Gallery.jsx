import React from "react";
import { motion } from "framer-motion";
// Icons: Car für Thema, ArrowRight für Hover-Effekt
import { Car, ArrowRight } from "lucide-react"; 

// --- KONSTANTEN BASIEREND AUF PALETTE ---
const ACCENT_COLOR = "#ff0035"; // Rot
const DARK_COLOR = "#0e131f"; 
const MEDIUM_COLOR = "#38405f"; // Dunkelblau/Grau
const LIGHT_BG = "#F8F2EC"; // Ursprünglicher Hintergrund
// ----------------------------------------

const galleryImages = [
  {
    src: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/287fd6130_13.jpg?w=1200&q=90",
    title: "Kundenannahme & Wartebereich",
    category: "Service"
  },
  {
    src: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/831601306_14.jpg?w=1200&q=90",
    title: "Montagehalle",
    category: "Werkstatt"
  },
  {
    src: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/7b593983f_15.jpg?w=1200&q=90",
    title: "Auswuchtstation", 
    category: "Technik"
  },
  {
    src: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/572e1afba_16.jpg?w=1200&q=90",
    title: "Premium Reifenlager",
    category: "Einlagerung"
  },
  {
    src: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/5e03cef8d_17.jpg?w=1200&q=90",
    title: "Reifen-Sortiment", 
    category: "Produkte" 
  },
  {
    src: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/1d99ea153_24.jpg?w=1200&q=90",
    title: "Team bei der Arbeit",
    category: "Werkstatt"
  },
  {
    src: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/601ccd748_1.jpg?w=1200&q=90",
    title: "Spezialwerkzeuge",
    category: "Technik"
  },
  {
    src: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/0d0096c79_2.jpg?w=1200&q=90",
    title: "Detailansicht Montage",
    category: "Service"
  },
  {
    src: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/664dc3f67_15.jpg?w=1200&q=90",
    title: "Reifen mit Felge",
    category: "Produkte"
  }
];

export default function Gallery() {
  return (
    <div className={`pt-32 pb-24 bg-gradient-to-b from-[${LIGHT_BG}] to-white min-h-screen`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className={`inline-flex items-center gap-2 rounded-full px-4 py-2 mb-6`} style={{ backgroundColor: ACCENT_COLOR + '10' }}>
            <Car className="w-4 h-4" style={{ color: ACCENT_COLOR }} />
            <span className={`text-sm font-medium`} style={{ color: MEDIUM_COLOR }}>Ein Blick hinter die Kulissen</span>
          </div>
          
          <h1 className="font-serif font-medium text-[length:var(--font-h1)] mb-6 leading-tight" style={{ color: DARK_COLOR }}>
            M&M Reifenservice: Ihre Werkstatt in Essen
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-[1.618]">
            Verschaffen Sie sich einen Eindruck von unserer modernen Werkstatt, der Technologie, die wir nutzen, 
            und unseren freundlichen Servicebereichen.
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-[clamp(1rem,2vw,2.5rem)]">
          {galleryImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.8, 
                delay: index * 0.1,
                ease: "easeOut"
              }}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-3xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2">
                {/* Image */}
                <div className="relative h-80 overflow-hidden">
                  <img
                    src={image.src}
                    alt={`${image.title} bei M&M Reifenservice in Essen.`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Overlay Content */}
                  <div className="absolute inset-0 flex items-end justify-start p-6 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="text-white">
                      <span className={`inline-block text-white px-3 py-1 rounded-full text-xs font-medium mb-2`} style={{ backgroundColor: ACCENT_COLOR }}>
                        {image.category}
                      </span>
                      <h3 className="font-serif text-xl font-bold">
                        {image.title}
                      </h3>
                    </div>
                  </div>

                  {/* Hover Icon */}
                  <div className="absolute top-4 right-4 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                    <ArrowRight className="w-5 h-5" style={{ color: ACCENT_COLOR }} />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16"
        >
          <div className={`rounded-3xl p-12 shadow-lg border border-[${MEDIUM_COLOR}]/20`} style={{ backgroundColor: ACCENT_COLOR + '0F' }}>
            <h2 className="font-serif text-[length:var(--font-h2)] font-bold mb-4" style={{ color: DARK_COLOR }}>
              Lust auf einen schnellen Service?
            </h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto leading-[1.618]">
              Buchen Sie jetzt Ihren Reifenwechsel oder einen anderen Service online. Wir sind für Sie da!
            </p>
            <button 
              onClick={() => window.dispatchEvent(new CustomEvent('open-booking-modal'))}
              className={`text-white px-8 py-4 rounded-full font-medium transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl`}
              style={{ backgroundColor: ACCENT_COLOR }}
            >
              Jetzt Termin vereinbaren
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}