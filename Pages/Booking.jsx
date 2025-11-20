import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { supabase } from "../supabaseClient";
import {
  Calendar,
  Clock,
  User,
  Mail,
  Phone,
  MessageSquare,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

const ACCENT_COLOR = "#ff0035";
const PRIMARY_TEXT_COLOR = "#38405f";
const NEUTRAL_BG_COLOR = "#59546c";

const services = [
  {
    name: "Radwechsel",
    price: 25,
    duration: "30 min",
    description: "Schneller Austausch von Sommer- auf Winterreifen o.ä.",
  },
  {
    name: "Räder Auswuchten",
    price: 40,
    duration: "30 min",
    description: "Perfektes Gleichgewicht für mehr Fahrkomfort und Sicherheit",
  },
  {
    name: "Reifenreparatur",
    price: 15,
    duration: "15 min",
    description: "Professionelle Reparatur von Einfahrschäden",
  },
  {
    name: "Reifeneinlagerung",
    price: 25,
    duration: "15 min",
    description: "Sichere Lagerung für eine Saison (kompletter Satz)",
  },
];

const getTimeSlotsForDay = (dayOfWeek) => {
  if (dayOfWeek === 0) return [];
  if (dayOfWeek === 6) {
    return [
      "09:00",
      "09:30",
      "10:00",
      "10:30",
      "11:00",
      "11:30",
      "12:00",
      "12:30",
      "13:00",
      "13:30",
      "14:00",
      "14:30",
    ];
  }
  return [
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
  ];
};

export default function BookingPage() {
  const [formData, setFormData] = useState({
    client_name: "",
    email: "",
    phone: "",
    service: "",
    preferred_date: "",
    preferred_time: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState(1);
  const [createdAppointmentId, setCreatedAppointmentId] = useState(null);
  const [error, setError] = useState("");
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);

  useEffect(() => {
    if (formData.preferred_date) {
      const date = new Date(formData.preferred_date);
      const dayOfWeek = date.getDay();
      const slots = getTimeSlotsForDay(dayOfWeek);
      setAvailableTimeSlots(slots);

      if (formData.preferred_time && !slots.includes(formData.preferred_time)) {
        setFormData((prev) => ({ ...prev, preferred_time: "" }));
      }
    }
  }, [formData.preferred_date]);

  const selectedService = services.find((s) => s.name === formData.service);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (error) setError("");
  };

  const validateForm = () => {
    const {
      client_name,
      email,
      phone,
      service,
      preferred_date,
      preferred_time,
    } = formData;

    if (!client_name.trim()) return "Bitte geben Sie Ihren Namen ein";
    if (!email.trim() || !email.includes("@"))
      return "Bitte geben Sie eine gültige E-Mail-Adresse ein";
    if (!phone.trim()) return "Bitte geben Sie Ihre Telefonnummer ein";
    if (!service) return "Bitte wählen Sie einen Service aus";
    if (!preferred_date) return "Bitte wählen Sie ein Datum aus";
    if (!preferred_time) return "Bitte wählen Sie eine Uhrzeit aus";

    const selectedDate = new Date(preferred_date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      return "Bitte wählen Sie ein zukünftiges Datum";
    }

    const dayOfWeek = selectedDate.getDay();
    if (dayOfWeek === 0) {
      return "Sonntags haben wir geschlossen. Bitte wählen Sie einen anderen Tag.";
    }

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const bookingPayload = {
        client_name: formData.client_name,
        email: formData.email,
        phone: formData.phone,
        service: formData.service,
        service_price: selectedService?.price || 0,
        requested_date: formData.preferred_date,
        requested_time: formData.preferred_time,
        message: formData.message,
        status: "pending", // WICHTIG: Neue Buchungen immer auf "pending"
        created_at: new Date().toISOString(),
      };

      const { data, error: supabaseError } = await supabase
        .from("bookings")
        .insert([bookingPayload])
        .select();

      if (supabaseError) throw supabaseError;

      if (data && data.length > 0) {
        setCreatedAppointmentId(data[0].id);
      } else {
        setCreatedAppointmentId("NEU-" + Date.now());
      }

      setStep(3);
    } catch (error) {
      console.error("Booking submission failed:", error);
      setError(
        `Ein technischer Fehler ist aufgetreten. Bitte rufen Sie uns an: 0201 25908194`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      client_name: "",
      email: "",
      phone: "",
      service: "",
      preferred_date: "",
      preferred_time: "",
      message: "",
    });
    setStep(1);
    setCreatedAppointmentId(null);
    setError("");
    setAvailableTimeSlots([]);
  };

  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  };

  const getDayName = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const dayOfWeek = date.getDay();
    if (dayOfWeek === 0) return "Sonntag (Geschlossen)";
    if (dayOfWeek === 6) return "Samstag (9:00 - 15:00 Uhr)";
    return "";
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleDateString("de-DE", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div
      className={`pt-32 pb-24 bg-gradient-to-b from-[${NEUTRAL_BG_COLOR}]/5 to-white min-h-screen`}
    >
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-[#0e131f] mb-4">
            Termin buchen
          </h1>
          <p className={`text-xl text-[${PRIMARY_TEXT_COLOR}]`}>
            Ihr Termin bei <strong>M&M Reifenservice</strong> in Essen
          </p>
        </motion.div>

        <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm"
            >
              {error}
            </motion.div>
          )}

          {/* SCHRITT 1: SERVICE WAHL */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="text-center mb-8">
                <p
                  className={`text-[${PRIMARY_TEXT_COLOR}] uppercase tracking-widest text-sm font-bold`}
                >
                  Schritt 1 von 2
                </p>
                <h2 className="text-2xl font-bold mt-2">
                  Welchen Service benötigen Sie?
                </h2>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {services.map((service) => (
                  <div
                    key={service.name}
                    onClick={() => {
                      handleInputChange("service", service.name);
                      setStep(2);
                    }}
                    className={`p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 hover:shadow-lg flex flex-col justify-between ${
                      formData.service === service.name
                        ? `border-[${ACCENT_COLOR}] bg-[${ACCENT_COLOR}]/5`
                        : "border-gray-100 hover:border-red-200"
                    }`}
                  >
                    <div>
                      <h3 className="text-lg font-bold text-[#0e131f] mb-2">
                        {service.name}
                      </h3>
                      <p className="text-sm text-gray-500 mb-4">
                        {service.description}
                      </p>
                    </div>
                    <div className="flex justify-between items-center mt-2 pt-4 border-t border-gray-100">
                      <span className="text-sm font-medium text-gray-500 flex items-center gap-1">
                        <Clock className="w-4 h-4" /> {service.duration}
                      </span>
                      <span
                        className={`text-xl font-bold`}
                        style={{ color: ACCENT_COLOR }}
                      >
                        {service.price} €
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* SCHRITT 2: DATEN & ZEIT */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="text-center mb-6">
                <p
                  className={`text-[${PRIMARY_TEXT_COLOR}] uppercase tracking-widest text-sm font-bold`}
                >
                  Schritt 2 von 2
                </p>
                <h2 className="text-2xl font-bold mt-2">
                  Ihre Kontaktdaten & Wunschtermin
                </h2>
                <div
                  className={`mt-4 inline-block px-4 py-1 rounded-full text-sm font-medium bg-red-50 text-red-600`}
                >
                  {formData.service} ({selectedService?.price}€)
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-bold text-gray-900 flex items-center gap-2 border-b pb-2">
                      <User className="w-4 h-4" /> Persönliches
                    </h3>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                        Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.client_name}
                        onChange={(e) =>
                          handleInputChange("client_name", e.target.value)
                        }
                        className="w-full px-4 py-3 bg-gray-50 border-transparent focus:bg-white border focus:border-red-500 rounded-xl transition-all outline-none"
                        placeholder="Max Mustermann"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                        E-Mail *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                        className="w-full px-4 py-3 bg-gray-50 border-transparent focus:bg-white border focus:border-red-500 rounded-xl transition-all outline-none"
                        placeholder="max@beispiel.de"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                        Telefon *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) =>
                          handleInputChange("phone", e.target.value)
                        }
                        className="w-full px-4 py-3 bg-gray-50 border-transparent focus:bg-white border focus:border-red-500 rounded-xl transition-all outline-none"
                        placeholder="0201 25908194"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-bold text-gray-900 flex items-center gap-2 border-b pb-2">
                      <Calendar className="w-4 h-4" /> Zeitplan
                    </h3>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                        Wunschdatum *
                      </label>
                      <input
                        type="date"
                        required
                        value={formData.preferred_date}
                        onChange={(e) =>
                          handleInputChange("preferred_date", e.target.value)
                        }
                        min={getTomorrowDate()}
                        className="w-full px-4 py-3 bg-gray-50 border-transparent focus:bg-white border focus:border-red-500 rounded-xl transition-all outline-none"
                      />
                      {formData.preferred_date && (
                        <p className="text-xs mt-1 text-red-500 font-medium">
                          {getDayName(formData.preferred_date)}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                        Uhrzeit *
                      </label>
                      <select
                        required
                        value={formData.preferred_time}
                        onChange={(e) =>
                          handleInputChange("preferred_time", e.target.value)
                        }
                        disabled={
                          !formData.preferred_date ||
                          availableTimeSlots.length === 0
                        }
                        className="w-full px-4 py-3 bg-gray-50 border-transparent focus:bg-white border focus:border-red-500 rounded-xl transition-all outline-none disabled:opacity-50"
                      >
                        <option value="">Zeit wählen...</option>
                        {availableTimeSlots.map((time) => (
                          <option key={time} value={time}>
                            {time} Uhr
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                        Nachricht (Optional)
                      </label>
                      <textarea
                        value={formData.message}
                        onChange={(e) =>
                          handleInputChange("message", e.target.value)
                        }
                        rows={2}
                        className="w-full px-4 py-3 bg-gray-50 border-transparent focus:bg-white border focus:border-red-500 rounded-xl transition-all outline-none resize-none"
                        placeholder="Z.B. Reifengröße 205/55 R16..."
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="px-6 py-3 rounded-xl font-bold text-gray-600 hover:bg-gray-100 transition-colors"
                  >
                    Zurück
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`flex-1 py-3 px-6 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transform active:scale-95 transition-all flex items-center justify-center gap-2`}
                    style={{ backgroundColor: ACCENT_COLOR }}
                  >
                    {isSubmitting ? "Verarbeite..." : "Terminanfrage senden"}
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {/* SCHRITT 3: BESTÄTIGUNG - ÜBERARBEITET */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-8 py-8"
            >
              {/* Icon mit Info statt Erfolg */}
              <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <AlertCircle className="w-12 h-12 text-orange-600" />
              </div>

              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">
                  Anfrage erfolgreich gesendet!
                </h3>
                <p className="text-gray-600 max-w-md mx-auto">
                  Danke, {formData.client_name}! Ihre Terminanfrage wurde an uns
                  übermittelt und ist momentan{" "}
                  <strong className="text-orange-600">in Prüfung</strong>.
                </p>
              </div>

              {/* Hinweis Box */}
              <div className="bg-orange-50 border-l-4 border-orange-500 p-6 max-w-lg mx-auto text-left rounded-xl">
                <div className="flex items-start gap-3">
                  <Clock className="w-6 h-6 text-orange-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">
                      ⏳ Warten auf Bestätigung
                    </h4>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      Wir prüfen Ihre Anfrage und melden uns innerhalb von{" "}
                      <strong>24 Stunden</strong> per E-Mail oder Telefon zur
                      finalen Terminbestätigung.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-2xl p-6 max-w-md mx-auto border border-gray-200 text-left space-y-3">
                <div className="flex justify-between border-b border-gray-200 pb-2">
                  <span className="text-gray-500">Datum:</span>
                  <span className="font-bold text-gray-800">
                    {formatDate(formData.preferred_date)}
                  </span>
                </div>
                <div className="flex justify-between border-b border-gray-200 pb-2">
                  <span className="text-gray-500">Uhrzeit:</span>
                  <span className="font-bold text-gray-800">
                    {formData.preferred_time} Uhr
                  </span>
                </div>
                <div className="flex justify-between border-b border-gray-200 pb-2">
                  <span className="text-gray-500">Service:</span>
                  <span className="font-bold text-gray-800">
                    {formData.service}
                  </span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="text-gray-500">Preis ca.:</span>
                  <span className="font-bold text-red-600">
                    {selectedService?.price} €
                  </span>
                </div>
                {createdAppointmentId && (
                  <div className="text-center pt-4 text-xs text-gray-400">
                    Referenz-ID: #{String(createdAppointmentId).slice(-6)}
                  </div>
                )}
              </div>

              <button
                onClick={() => (window.location.href = "/")}
                className="px-8 py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 transition-colors shadow-lg"
              >
                Zurück zur Startseite
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
