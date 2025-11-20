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

/**
 * Komponente für das Kontaktformular.
 * Verwendet FormSubmit für die Weiterleitung der E-Mail.
 */
const ContactForm = ({ email, darkColor, accentColor, mediumColor }) => {
  // Wichtig: Dies ist der Endpunkt, an den die Daten gesendet werden
  const FORM_ENDPOINT = `https://formsubmit.co/${email}`;

  return (
    // Das Formular verwendet die 'action' und 'method' Attribute, um FormSubmit zu aktivieren.
    <form
      action={FORM_ENDPOINT}
      method="POST"
      className={`p-8 rounded-xl shadow-2xl space-y-6`}
      style={{ backgroundColor: MEDIUM_COLOR + "10" }}
    >
      <h2 className={`text-2xl font-bold`} style={{ color: darkColor }}>
        Senden Sie uns eine Nachricht
      </h2>
      <p className="text-sm pb-2" style={{ color: mediumColor }}>
        Felder mit * sind Pflichtfelder.
      </p>

      {/* VERSTECKTE FELDER FÜR FORMSUBMIT KONFIGURATION */}
      {/* Leitet den Benutzer nach Erfolg zurück auf die Kontaktseite */}
      <input type="hidden" name="_next" value={window.location.href} />
      {/* Verhindert, dass FormSubmit Captchas anzeigt, wenn Sie die E-Mail bestätigt haben */}
      <input
        type="hidden"
        name="_subject"
        value="Neue Kontaktanfrage über Website M&M Reifenservice"
      />

      {/* 2. **Wichtig:** name-Attribute müssen gesetzt sein */}

      {/* Name */}
      <input
        type="text"
        name="Name"
        placeholder="Ihr Name *"
        required
        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-offset-2 transition-colors"
        style={{ borderColor: mediumColor + "50", outlineColor: accentColor }}
      />

      {/* Email */}
      <input
        type="email"
        name="E-Mail"
        placeholder="Ihre E-Mail-Adresse *"
        required
        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-offset-2 transition-colors"
        style={{ borderColor: mediumColor + "50", outlineColor: accentColor }}
      />

      {/* Betreff */}
      <input
        type="text"
        name="Betreff"
        placeholder="Betreff"
        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-offset-2 transition-colors"
        style={{ borderColor: mediumColor + "50", outlineColor: accentColor }}
      />

      {/* Nachricht */}
      <textarea
        name="Nachricht"
        rows="4"
        placeholder="Ihre Nachricht *"
        required
        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-offset-2 transition-colors"
        style={{ borderColor: mediumColor + "50", outlineColor: accentColor }}
      ></textarea>

      {/* DATENSCHUTZ-CHECKBOX (Jetzt funktionsfähig) */}
      <div
        className="flex items-start gap-2 text-sm"
        style={{ color: mediumColor }}
      >
        {/* Korrektur der Checkbox-Styling: 'accent-color' wird korrekt über CSS Style gesetzt */}
        <input
          type="checkbox"
          id="privacy"
          name="Datenschutz_Einverstaendnis"
          required
          // Wichtig: margin-right hinzufügen, um Abstand zum Label zu schaffen
          className="mt-1 flex-shrink-0 w-4 h-4 mr-1"
          // Der 'accent-color' CSS-Wert färbt die Checkbox bei Auswahl
          style={{ accentColor: accentColor }}
        />
        <label htmlFor="privacy" className="cursor-pointer">
          Ich habe die{" "}
          <a
            href="/Datenschutz"
            className="underline"
            style={{ color: accentColor }}
          >
            Datenschutzerklärung
          </a>{" "}
          gelesen und bin mit der Verarbeitung meiner Daten einverstanden. *
        </label>
      </div>

      {/* Senden Button */}
      <motion.button
        type="submit"
        className={`w-full text-white text-lg font-bold py-3 rounded-lg transition-all shadow-md flex items-center justify-center`}
        style={{ backgroundColor: accentColor }}
        whileHover={{
          scale: 1.02,
          boxShadow: "0 10px 20px rgba(255, 0, 53, 0.4)",
        }}
        whileTap={{ scale: 0.98 }}
      >
        Nachricht senden
      </motion.button>
    </form>
  );
};

// --- HAUPTKOMPONENTE CONTACT ---
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

        {/* Layout: Karte, Info und Formular */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* LINKER BLOCK: Karte */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-xl overflow-hidden shadow-2xl mb-12"
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

          {/* RECHTER BLOCK: Kontaktinformationen und Formular */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-8"
          >
            {/* Kontaktinformationen */}
            <div
              className={`rounded-xl p-8 shadow-xl`}
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

            {/* Kontaktformular */}
            <div className="mt-8">
              <ContactForm
                email={BUSINESS_DATA.email}
                darkColor={DARK_COLOR}
                accentColor={ACCENT_COLOR}
                mediumColor={MEDIUM_COLOR}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
