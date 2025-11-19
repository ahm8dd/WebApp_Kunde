import React from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function Contact() {
  return (
    <div className="pt-32 pb-24 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold text-[#0e131f] mb-6">
            Besuchen Sie uns jetzt!
          </h1>
          <p className="text-xl text-[#8b939c]">
            Wir freuen uns auf Ihren Besuch in Essen. Kontaktieren Sie uns für
            Fragen oder Terminvereinbarungen.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-xl overflow-hidden shadow-lg"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2484.267719843847!2d7.068837615746308!3d51.45564427962756!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47b8c2e1e8e1e1e1%3A0x1e1e1e1e1e1e1e1!2sSulterkamp%2058%2C%2045356%20Essen!5e0!3m2!1sde!2sde!4v1234567890123!5m2!1sde!2sde"
              width="100%"
              height="450"
              style = {{ border: 0 }}
              allowFullScreen
              loading="lazy"
              title="M&M Reifenservice Standort"
            />
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-8"
          >
            <div className="bg-[#59546c]/5 rounded-xl p-8">
              <h2 className="text-2xl font-bold text-[#0e131f] mb-6">Kontaktinformationen</h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#ff0035]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-[#ff0035]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#0e131f] mb-1">Adresse</h3>
                    <p className="text-[#8b939c]">Sulterkamp 58<br />45356 Essen</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#ff0035]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-[#ff0035]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#0e131f] mb-1">Telefon</h3>
                    <a href="tel:+4920125908194" className="text-[#ff0035] hover:text-[#d9002d]">
                      +49 201 25908194 
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#ff0035]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-[#ff0035]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#0e131f] mb-1">E-Mail</h3>
                    <a href="mailto:info@mmreifenessen.de" className="text-[#ff0035] hover:text-[#d9002d]">
                      info@mmreifenessen.de
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#ff0035]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-[#ff0035]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#0e131f] mb-2">Öffnungszeiten</h3>
                    <div className="space-y-1 text-[#8b939c]">
                      <p>Mo - Fr: 9:00 - 18:00 Uhr</p>
                      <p>Sa: 9:00 - 15:00 Uhr</p>
                      <p className="text-[#ff0035] font-medium">So: Geschlossen</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#ff0035] rounded-xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Termin buchen</h3>
              <p className="mb-6">Buchen Sie jetzt online und sichern Sie sich Ihren Wunschtermin!</p>
              <button
                onClick={() => {
                  window.dispatchEvent(new CustomEvent('open-booking-modal'));
                }}
                className="bg-white text-[#ff0035] px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition-all w-full"
              >
                Jetzt buchen
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}