import React from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

// --- KONSTANTEN BASIEREND AUF GESPEICHERTEN DATEN ---
const ACCENT_COLOR = "#ff0035"; // Rot
const DARK_COLOR = "#0e131f";
const MEDIUM_COLOR = "#59546c"; // Graublau

const BUSINESS_DATA = {
  address: "Sulterkamp 58, 45356 Essen",
  phone: "0201 25908194",
  email: "info@mmreifenessen.de",
  // Geo-Koordinaten für Essen (ungefähr) - für die Karteneinbettung
  lat: "51.4815",
  lng: "7.0181",
  openingHours: [
    { day: "Mo - Fr", time: "9:00 - 18:00 Uhr" },
    { day: "Sa", time: "9:00 - 15:00 Uhr" },
    { day: "So", time: "Geschlossen" },
  ],
};
// ----------------------------------------------------

export default function Contact() {
  // Erstellt die Google Maps Embed URL mit der Adresse
  const mapUrl = `https://maps.google.com/maps?q=${encodeURIComponent(
    BUSINESS_DATA.address
  )}&t=&z=14&ie=UTF8&iwloc=&output=embed`;

  return (
    <div className="pt-32 pb-24 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1
            className={`text-5xl font-bold mb-6`}
            style={{ color: DARK_COLOR }}
          >
            Ihr Reifenservice in Essen
          </h1>
          <p className={`text-xl`} style={{ color: MEDIUM_COLOR }}>
            Wir freuen uns auf Ihren Besuch
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-xl overflow-hidden shadow-2xl"
          >
            <iframe
              src={mapUrl}
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="M&M Reifenservice Standort"
            />
          </motion.div>

          {/* Contact Info & CTA */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-8"
          >
            <div
              className={`rounded-xl p-8`}
              style={{ backgroundColor: MEDIUM_COLOR + "10" }}
            >
              <h2
                className={`text-2xl font-bold mb-6`}
                style={{ color: DARK_COLOR }}
              >
                Kontaktinformationen
              </h2>

              <div className="space-y-6">
                {/* ADRESSE */}
                <div className="flex items-start gap-4">
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0`}
                    style={{ backgroundColor: ACCENT_COLOR + "15" }}
                  >
                    <MapPin
                      className="w-6 h-6"
                      style={{ color: ACCENT_COLOR }}
                    />
                  </div>
                  <div>
                    <h3
                      className={`font-bold mb-1`}
                      style={{ color: DARK_COLOR }}
                    >
                      Adresse
                    </h3>
                    <p className={`text-lg`} style={{ color: MEDIUM_COLOR }}>
                      {BUSINESS_DATA.address.split(",")[0]}
                      <br />
                      {BUSINESS_DATA.address.split(",")[1].trim()}
                    </p>
                  </div>
                </div>

                {/* TELEFON */}
                <div className="flex items-start gap-4">
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0`}
                    style={{ backgroundColor: ACCENT_COLOR + "15" }}
                  >
                    <Phone
                      className="w-6 h-6"
                      style={{ color: ACCENT_COLOR }}
                    />
                  </div>
                  <div>
                    <h3
                      className={`font-bold mb-1`}
                      style={{ color: DARK_COLOR }}
                    >
                      Telefon
                    </h3>
                    <a
                      href={`tel:${BUSINESS_DATA.phone.replace(/\s/g, "")}`}
                      className={`text-lg hover:underline`}
                      style={{ color: ACCENT_COLOR }}
                    >
                      {BUSINESS_DATA.phone}
                    </a>
                  </div>
                </div>

                {/* E-MAIL */}
                <div className="flex items-start gap-4">
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0`}
                    style={{ backgroundColor: ACCENT_COLOR + "15" }}
                  >
                    <Mail className="w-6 h-6" style={{ color: ACCENT_COLOR }} />
                  </div>
                  <div>
                    <h3
                      className={`font-bold mb-1`}
                      style={{ color: DARK_COLOR }}
                    >
                      E-Mail
                    </h3>
                    <a
                      href={`mailto:${BUSINESS_DATA.email}`}
                      className={`text-lg hover:underline`}
                      style={{ color: ACCENT_COLOR }}
                    >
                      {BUSINESS_DATA.email}
                    </a>
                  </div>
                </div>

                {/* ÖFFNUNGSZEITEN */}
                <div className="flex items-start gap-4">
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0`}
                    style={{ backgroundColor: ACCENT_COLOR + "15" }}
                  >
                    <Clock
                      className="w-6 h-6"
                      style={{ color: ACCENT_COLOR }}
                    />
                  </div>
                  <div>
                    <h3
                      className={`font-bold mb-2`}
                      style={{ color: DARK_COLOR }}
                    >
                      Öffnungszeiten
                    </h3>
                    <div
                      className="space-y-1 text-sm"
                      style={{ color: MEDIUM_COLOR }}
                    >
                      {BUSINESS_DATA.openingHours.map((oh, index) => (
                        <p
                          key={index}
                          className={oh.day.includes("So") ? `font-medium` : ""}
                        >
                          {oh.day}: {oh.time}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Banner */}
            {/* <div className={`rounded-xl p-8 text-white`} style={{ backgroundColor: ACCENT_COLOR }}>
              <h3 className="text-2xl font-bold mb-4">Termin buchen</h3>
              <p className="mb-6">Buchen Sie jetzt online und sichern Sie sich Ihren Wunschtermin – schnell und unkompliziert!</p>
              <motion.button
                whileHover={{ scale: 1.02, boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)' }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  window.dispatchEvent(new CustomEvent('open-booking-modal'));
                }}
                className={`bg-white text-lg px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition-all w-full`}
                style={{ color: ACCENT_COLOR }}
              >
                Jetzt Termin vereinbaren
              </motion.button>
            </div> */}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
