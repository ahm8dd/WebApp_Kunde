import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

// Werkstatt-Akzentfarbe
const PRIMARY_COLOR = "#005691";
const ACCENT_COLOR_CLASS = `text-[${PRIMARY_COLOR}]`;

const testimonials = [
  {
    id: 1,
    name: "Thomas Schmidt",
    role: "Aussendienstmitarbeiter",
    rating: 5,
    text: "Absolut professionell und unglaublich schnell! Mein Reifenwechsel war in unter 20 Minuten erledigt, und das Auswuchten war perfekt. Der Service ist erstklassig, und die Preise sind fair. Der beste Reifenservice in Essen!",
    image_url: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/8e0908ef4_image.png?w=800&q=90"
  },
  {
    id: 2,
    name: "Laura Wagner",
    role: "Studentin",
    rating: 5,
    text: "Ich habe meine Winterreifen hier eingelagert. Alles verlief reibungslos, das Personal war sehr freundlich und hat mir alles genau erklärt. Fühle mich hier sehr gut aufgehoben und werde definitiv wiederkommen.",
    image_url: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/845cb87f5_image.png?w=800&q=90"
  },
  {
    id: 3,
    name: "Michael Berger",
    role: "Handwerker",
    rating: 4,
    text: "Top-Leistung, wenn es um Felgeninstandsetzung geht. Meine Felgen sehen wieder aus wie neu, und das zu einem vernünftigen Preis. Die Expertise und Sorgfalt sind unübertroffen. Ich kann diese Werkstatt nur empfehlen.",
    image_url: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/1acf8ba01_image.png?w=800&q=90"
  },
  {
    id: 4,
    name: "Sabine Koch",
    role: "Unternehmensinhaberin",
    rating: 5,
    text: "Vom ersten Anruf bis zur Abholung des Wagens: schnelle Terminvergabe, klare Kommunikation und hervorragende Arbeit. Ich schätze die Transparenz und die ehrliche Beratung sehr. So muss ein Reifenservice sein!",
    image_url: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/088f1f218_image.png?w=800&q=90"
  },
  {
    id: 5,
    name: "Dr. Peter Müller",
    role: "Chemiker",
    rating: 4,
    text: "Als Vielfahrer brauche ich einen zuverlässigen Partner. M&M Reifenservice bietet genau das: qualifizierte Montage und Premium-Reifen. Kein Vibrieren, perfekte Spurhaltung. Die Investition in Qualität lohnt sich hier.",
    image_url: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/7cf2b68ad_image.png?w=800&q=90"
  },
  {
    id: 6,
    name: "Jennifer Roy",
    role: "Projektmanagerin",
    rating: 5,
    text: "Ich hatte einen Platten, und sie haben mir sofort geholfen. Die Reifenreparatur war schnell und super günstig. Der Service ist freundlich und lösungsorientiert. Mein neuer Lieblings-Reifenservice in Essen!",
    image_url: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/2ffc407b6_image.png?w=800&q=90"
  }
];

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageError, setImageError] = useState({});
  const intervalRef = useRef(null);

  // Function to start the automatic slideshow
  const startSlideshow = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    // Beachte: Timer auf 2000ms (2 Sekunden) ist sehr schnell für Lesbarkeit,
    // evtl. auf 5000ms erhöhen (5s)
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000); // Erhöht auf 5 Sekunden für bessere Lesbarkeit
  };

  // Function to reset the slideshow timer (used after manual interaction)
  const resetSlideshow = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    startSlideshow();
  };

  useEffect(() => {
    startSlideshow();
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    resetSlideshow();
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    resetSlideshow();
  };

  const goToTestimonial = (index) => {
    setCurrentIndex(index);
    resetSlideshow();
  };

  const handleImageError = (testimonialId) => {
    setImageError(prev => ({ ...prev, [testimonialId]: true }));
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section
      className="py-12 relative overflow-hidden bg-gray-50" // Leichter Hintergrund
      onMouseEnter={() => clearInterval(intervalRef.current)}
      onMouseLeave={startSlideshow}
    >
      <div className="relative max-w-4xl mx-auto px-6">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Quote Icon in Akzentfarbe */}
            <Quote className={`absolute -top-2 -right-2 w-16 h-16 text-[${PRIMARY_COLOR}]/20`} /> 
            
            <h2 className="font-serif text-4xl lg:text-5xl font-light italic text-[#0F0F0F] mb-8 relative z-10">
              Kundenstimmen
            </h2>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="space-y-6"
              >
                <div className="flex justify-center mb-4">
                  <div className="w-24 h-24 rounded-full overflow-hidden shadow-lg border-4 border-white bg-gray-200">
                    {imageError[currentTestimonial.id] ? (
                      // Fallback bei fehlendem Bild, Farbschema anpassen
                      <div className={`w-full h-full bg-[${PRIMARY_COLOR}] flex items-center justify-center`}>
                        <span className="text-white font-bold text-lg">
                          {currentTestimonial.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                    ) : (
                      <img
                        src={currentTestimonial.image_url}
                        alt={`${currentTestimonial.name}, zufriedener Kunde von M&M Reifenservice`}
                        className="w-full h-full object-cover"
                        onError={() => handleImageError(currentTestimonial.id)}
                      />
                    )}
                  </div>
                </div>

                <p className="font-sans text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto min-h-[120px]">
                  {currentTestimonial.text}
                </p>

                <div className="flex justify-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 transition-colors duration-300 ${
                        i < currentTestimonial.rating
                          // Akzentfarbe für Sterne
                          ? ACCENT_COLOR_CLASS + ' fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>

                <div>
                  <h4 className="font-serif text-xl font-semibold text-[#0F0F0F]">
                    {currentTestimonial.name}
                  </h4>
                  <p className="font-sans text-sm text-gray-500 uppercase tracking-wider">
                    {currentTestimonial.role}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-8 mt-8">
              <div className="flex items-center gap-4">
                <button
                  onClick={prevTestimonial}
                  className={`w-10 h-10 bg-white border border-gray-300 rounded-full flex items-center justify-center text-gray-600 hover:bg-[${PRIMARY_COLOR}] hover:text-white transition-all duration-300`}
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={nextTestimonial}
                  className={`w-10 h-10 bg-white border border-gray-300 rounded-full flex items-center justify-center text-gray-600 hover:bg-[${PRIMARY_COLOR}] hover:text-white transition-all duration-300`}
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Dots Indicator */}
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToTestimonial(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentIndex
                        // Akzentfarbe für den aktiven Dot
                        ? `bg-[${PRIMARY_COLOR}] w-6`
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}