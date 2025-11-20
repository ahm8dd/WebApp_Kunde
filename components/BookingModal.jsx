import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "../supabaseClient";
import {
  Calendar,
  Clock,
  User,
  Mail,
  Phone,
  MessageSquare,
  Check,
  X,
  Info, // Neu für den "Pending" Status
} from "lucide-react";

const services = [
  {
    name: "Radwechsel",
    price: 20,
    duration: "30 min",
    description: "Schneller Austausch (4 Räder)",
  },
  {
    name: "Reifenmontage (Stahl)",
    price: 12.5,
    duration: "45 min",
    description: "Montage inkl. Wuchten (pro Rad)",
  },
  {
    name: "Reifenmontage (Alu)",
    price: 15.0,
    duration: "45 min",
    description: "Montage inkl. Wuchten (pro Rad)",
  },
  {
    name: "Reifeneinlagerung",
    price: 30,
    duration: "15 min",
    description: "Sichere Lagerung für eine Saison",
  },
];

const getTimeSlotsForDay = (dayOfWeek) => {
  if (dayOfWeek === 0) return []; // Sonntag geschlossen

  if (dayOfWeek === 6) {
    // Samstag 9-15 Uhr
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

  // Montag bis Freitag 9-18 Uhr
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

export default function BookingModal({ isOpen, onClose, initialService }) {
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
  const [createdAppointment, setCreatedAppointment] = useState(null);
  const [error, setError] = useState("");
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);

  // Service vorauswählen, wenn über Props übergeben
  useEffect(() => {
    if (initialService) {
      setFormData((prev) => ({ ...prev, service: initialService.name }));
      setStep(2);
    }
  }, [initialService]);

  // Zeitslots berechnen
  useEffect(() => {
    if (formData.preferred_date) {
      const date = new Date(formData.preferred_date);
      const dayOfWeek = date.getDay();
      const slots = getTimeSlotsForDay(dayOfWeek);
      setAvailableTimeSlots(slots);

      // Zeit zurücksetzen, falls am neuen Tag nicht verfügbar
      const selectedTime = formData.preferred_time;
      if (selectedTime && !slots.includes(selectedTime)) {
        setFormData((prev) => ({ ...prev, preferred_time: "" }));
      }
    }
  }, [formData.preferred_date]);

  const selectedService = services.find((s) => s.name === formData.service);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (error) setError("");
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("de-DE", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      // 1. Daten vorbereiten (Mapping für Supabase Tabelle 'bookings')
      const appointmentData = {
        client_name: formData.client_name,
        email: formData.email,
        phone: formData.phone,
        service: formData.service,
        service_price: selectedService?.price,
        // WICHTIG: Mapping auf die korrekten DB-Spalten
        requested_date: formData.preferred_date,
        requested_time: formData.preferred_time,
        message: formData.message,
        status: "pending", // WICHTIG: Status ist erst mal 'pending'
        created_at: new Date().toISOString(),
      };

      // 2. In Supabase einfügen
      const { data, error: supabaseError } = await supabase
        .from("bookings")
        .insert([appointmentData])
        .select();

      if (supabaseError) throw supabaseError;

      // 3. Erfolgs-Status setzen
      setCreatedAppointment(appointmentData);
      setStep(3);
    } catch (error) {
      console.error("Booking Error:", error);
      setError(
        "Fehler bei der Übermittlung. Bitte rufen Sie uns an: 0201 25908194"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    // Reset Formular
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
    setCreatedAppointment(null);
    setError("");
    onClose();
  };

  // Morgen als min-Date setzen
  const getMinDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 bg-[#0e131f] rounded-t-3xl p-6 flex items-center justify-between z-10">
              <div className="flex items-center gap-3">
                <span className="text-white font-bold text-xl">
                  MM Reifendienst
                </span>
              </div>
              <button
                onClick={handleClose}
                className="w-10 h-10 rounded-full bg-[#38405f] hover:bg-[#59546c] transition-colors duration-200 flex items-center justify-center"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            <div className="p-6">
              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm font-medium">
                  ⚠️ {error}
                </div>
              )}

              {/* SCHRITT 1: SERVICE */}
              {step === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <div className="text-center mb-8">
                    <p className="text-[#8b939c] font-medium uppercase text-sm tracking-wider">
                      Schritt 1 von 2
                    </p>
                    <h2 className="text-2xl font-bold text-[#0e131f]">
                      Service auswählen
                    </h2>
                  </div>
                  <div className="grid gap-4">
                    {services.map((service) => (
                      <div
                        key={service.name}
                        onClick={() => {
                          handleInputChange("service", service.name);
                          setStep(2);
                        }}
                        className={`p-6 rounded-xl border-2 cursor-pointer transition-all hover:shadow-lg flex justify-between items-center ${
                          formData.service === service.name
                            ? "border-[#ff0035] bg-[#ff0035]/5"
                            : "border-gray-200 hover:border-[#ff0035]/50"
                        }`}
                      >
                        <div>
                          <h3 className="text-lg font-bold text-[#0e131f] mb-1">
                            {service.name}
                          </h3>
                          <p className="text-sm text-[#8b939c]">
                            {service.description} • {service.duration}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-xl font-bold text-[#ff0035]">
                            {service.price === 12.5 ? "12,50" : service.price}€
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* SCHRITT 2: DATEN */}
              {step === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <div className="text-center mb-6">
                    <p className="text-[#8b939c] font-medium uppercase text-sm tracking-wider">
                      Schritt 2 von 2
                    </p>
                    <h2 className="text-2xl font-bold text-[#0e131f]">
                      Ihre Daten & Termin
                    </h2>
                    <div className="mt-2 inline-block px-3 py-1 bg-gray-100 rounded-lg text-sm font-medium text-gray-600">
                      Gewählt: {formData.service}
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
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
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#ff0035]"
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
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#ff0035]"
                          placeholder="max@beispiel.de"
                        />
                      </div>
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
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#ff0035]"
                        placeholder="0123 456789"
                      />
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
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
                          min={getMinDate()}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#ff0035]"
                        />
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
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#ff0035]"
                          disabled={!formData.preferred_date}
                        >
                          <option value="">Bitte wählen...</option>
                          {availableTimeSlots.map((time) => (
                            <option key={time} value={time}>
                              {time} Uhr
                            </option>
                          ))}
                        </select>
                      </div>
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
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#ff0035] resize-none"
                        placeholder="Z.B. Reifengröße 205/55 R16"
                      />
                    </div>
                    <div className="flex gap-4 pt-2">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="px-6 py-3 border border-gray-300 rounded-xl font-medium text-[#0e131f] hover:bg-gray-50"
                      >
                        Zurück
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-1 py-3 px-6 bg-[#ff0035] text-white rounded-xl font-bold hover:bg-[#d9002d] disabled:opacity-50 shadow-lg transform active:scale-95 transition-all"
                      >
                        {isSubmitting ? "Wird gesendet..." : "Termin anfragen"}
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}

              {/* SCHRITT 3: BESTÄTIGUNG (Status: Pending) */}
              {step === 3 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center space-y-6 py-8"
                >
                  {/* Icon: Info/Check in Orange/Gelb um zu signalisieren "Warte auf Bestätigung" */}
                  <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto shadow-inner">
                    <Info className="w-10 h-10 text-orange-500" />
                  </div>

                  <div>
                    <h3 className="text-3xl font-bold text-[#0e131f] mb-2">
                      Anfrage erhalten!
                    </h3>
                    <p className="text-gray-600 text-lg">
                      Vielen Dank, {formData.client_name}.
                    </p>
                    <p className="text-gray-500 mt-2 max-w-md mx-auto">
                      Wir haben Ihren Wunschtermin notiert. <br />
                      <strong>
                        Sie erhalten in Kürze eine endgültige Bestätigung per
                        E-Mail oder Telefon.
                      </strong>
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-2xl p-6 text-left border border-gray-200 mx-auto max-w-lg">
                    <h4 className="font-bold text-[#0e131f] mb-4 text-center uppercase text-xs tracking-widest">
                      Zusammenfassung
                    </h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <strong className="text-[#0e131f]">Service:</strong>
                        <span className="text-gray-600">
                          {createdAppointment?.service}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <strong className="text-[#0e131f]">Datum:</strong>
                        <span className="text-gray-600">
                          {formatDate(createdAppointment?.requested_date)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <strong className="text-[#0e131f]">Zeit:</strong>
                        <span className="text-gray-600">
                          {createdAppointment?.requested_time} Uhr
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleClose}
                    className="w-full py-3 px-6 bg-[#0e131f] text-white rounded-xl font-medium hover:bg-gray-800 transition-colors"
                  >
                    Fenster schließen
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
