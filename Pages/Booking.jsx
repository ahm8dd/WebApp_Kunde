import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { base44 } from "@/api/base44Client";
import { Calendar, Clock, User, Mail, Phone, MessageSquare, CheckCircle, X } from "lucide-react";

const services = [
  {
    name: "Reifenwechsel",
    price: 20,
    duration: "30 min",
    description: "Schneller Austausch für alle Fahrzeuge"
  },
  {
    name: "Auswuchten",
    price: 25,
    duration: "30 min",
    description: "Perfektes Gleichgewicht für besseres Handling"
  },
  {
    name: "Reparatur",
    price: 30,
    duration: "45 min",
    description: "Professionelle Reparatur von Reifenschäden"
  },
  {
    name: "Einlagerung",
    price: 5,
    duration: "15 min",
    description: "Sichere Lagerung für Saisonreifen (pro Monat)"
  }
];

const getTimeSlotsForDay = (dayOfWeek) => {
  if (dayOfWeek === 0) {
    return [];
  }
  
  if (dayOfWeek === 6) {
    return [
      "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
      "12:00", "12:30", "13:00", "13:30", "14:00", "14:30"
    ];
  }
  
  return [
    "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30",
    "16:00", "16:30", "17:00", "17:30"
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
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState(1);
  const [createdAppointment, setCreatedAppointment] = useState(null);
  const [error, setError] = useState("");
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);

  useEffect(() => {
    if (formData.preferred_date) {
      const date = new Date(formData.preferred_date);
      const dayOfWeek = date.getDay();
      setAvailableTimeSlots(getTimeSlotsForDay(dayOfWeek));
      const selectedTime = formData.preferred_time;
      const newSlots = getTimeSlotsForDay(dayOfWeek);
      if (selectedTime && !newSlots.includes(selectedTime)) {
        setFormData(prev => ({ ...prev, preferred_time: "" }));
      }
    }
  }, [formData.preferred_date]);

  const selectedService = services.find(s => s.name === formData.service);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (error) setError("");
  };

  const validateForm = () => {
    const { client_name, email, phone, service, preferred_date, preferred_time } = formData;
    
    if (!client_name.trim()) return "Bitte geben Sie Ihren Namen ein";
    if (!email.trim()) return "Bitte geben Sie Ihre E-Mail-Adresse ein";
    if (!email.includes("@")) return "Bitte geben Sie eine gültige E-Mail-Adresse ein";
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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('de-DE', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
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
      const appointmentData = {
        ...formData,
        service_price: selectedService?.price,
        duration: selectedService?.duration,
        status: "confirmed"
      };

      const appointment = await base44.entities.Appointment.create(appointmentData);
      setCreatedAppointment(appointment);
      setStep(3);
    } catch (error) {
      console.error('Booking submission failed:', error);
      setError('Ein technischer Fehler ist aufgetreten. Bitte versuchen Sie es erneut oder rufen Sie uns direkt an: +49 201 1234 5678');
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
      message: ""
    });
    setStep(1);
    setCreatedAppointment(null);
    setError("");
    setAvailableTimeSlots([]);
  };

  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  const getDayName = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const dayOfWeek = date.getDay();
    if (dayOfWeek === 0) return "Sonntag (Geschlossen)";
    if (dayOfWeek === 6) return "Samstag (bis 15:00 Uhr)";
    return "";
  };

  return (
    <div className="pt-32 pb-24 bg-gradient-to-b from-[#59546c]/5 to-white min-h-screen">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-[#0e131f] mb-4">
            Termin buchen
          </h1>
          <p className="text-xl text-[#8b939c]">
            Buchen Sie jetzt Ihren Termin bei M&M Reifenservice
          </p>
        </motion.div>

        <div className="bg-white rounded-3xl shadow-2xl p-8">
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm"
            >
              {error}
            </motion.div>
          )}

          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="text-center mb-8">
                <p className="text-[#8b939c]">Schritt 1 von 2: Service auswählen</p>
              </div>

              <div className="grid gap-4">
                {services.map((service) => (
                  <div
                    key={service.name}
                    onClick={() => {
                      handleInputChange('service', service.name);
                      setStep(2);
                    }}
                    className={`p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 hover:shadow-lg ${
                      formData.service === service.name
                        ? 'border-[#ff0035] bg-[#ff0035]/5'
                        : 'border-gray-200 hover:border-[#ff0035]/50'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-semibold text-[#0e131f] mb-2">
                          {service.name}
                        </h3>
                        <p className="text-sm text-[#8b939c] mb-2">{service.description}</p>
                        <p className="text-sm text-[#8b939c]">⏱️ {service.duration}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-[#ff0035]">
                          {service.price}€
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="text-center mb-8">
                <p className="text-[#8b939c]">Schritt 2 von 2: Ihre Daten</p>
                <div className="mt-4 p-4 bg-[#ff0035]/5 rounded-xl">
                  <p className="text-lg text-[#0e131f] font-semibold">
                    {formData.service} - {selectedService?.price}€
                  </p>
                  <p className="text-sm text-[#8b939c]">{selectedService?.duration}</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#0e131f] mb-2">
                      <User className="w-4 h-4 inline mr-2" />
                      Vollständiger Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.client_name}
                      onChange={(e) => handleInputChange('client_name', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#ff0035] transition-colors duration-300"
                      placeholder="Max Mustermann"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#0e131f] mb-2">
                      <Mail className="w-4 h-4 inline mr-2" />
                      E-Mail-Adresse *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#ff0035] transition-colors duration-300"
                      placeholder="max@beispiel.de"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#0e131f] mb-2">
                    <Phone className="w-4 h-4 inline mr-2" />
                    Telefonnummer *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#ff0035] transition-colors duration-300"
                    placeholder="+49 201 1234 5678"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#0e131f] mb-2">
                      <Calendar className="w-4 h-4 inline mr-2" />
                      Wunschdatum *
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.preferred_date}
                      onChange={(e) => handleInputChange('preferred_date', e.target.value)}
                      min={getTomorrowDate()}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#ff0035] transition-colors duration-300"
                    />
                    {formData.preferred_date && getDayName(formData.preferred_date) && (
                      <p className="text-xs text-[#ff0035] mt-2">
                        {getDayName(formData.preferred_date)}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#0e131f] mb-2">
                      <Clock className="w-4 h-4 inline mr-2" />
                      Wunschzeit *
                    </label>
                    <select
                      required
                      value={formData.preferred_time}
                      onChange={(e) => handleInputChange('preferred_time', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#ff0035] transition-colors duration-300"
                      disabled={!formData.preferred_date}
                    >
                      <option value="">Uhrzeit wählen</option>
                      {availableTimeSlots.map((time) => (
                        <option key={time} value={time}>{time} Uhr</option>
                      ))}
                    </select>
                    {formData.preferred_date && availableTimeSlots.length === 0 && (
                      <p className="text-xs text-red-600 mt-2">
                        Sonntags haben wir geschlossen
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#0e131f] mb-2">
                    <MessageSquare className="w-4 h-4 inline mr-2" />
                    Besondere Wünsche (Optional)
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#ff0035] transition-colors duration-300 resize-none"
                    placeholder="Z.B. Reifengröße, besondere Wünsche..."
                  />
                </div>

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex-1 py-3 px-6 border border-gray-300 rounded-xl font-medium text-[#0e131f] hover:bg-gray-50 transition-colors duration-300"
                  >
                    Zurück
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 py-3 px-6 bg-[#ff0035] text-white rounded-xl font-medium hover:bg-[#d9002d] transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Wird gebucht...
                      </>
                    ) : (
                      'Termin bestätigen'
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-6 py-8"
            >
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              
              <div>
                <h3 className="text-3xl font-bold text-[#0e131f] mb-2">
                  Termin bestätigt!
                </h3>
                <p className="text-[#8b939c]">
                  Vielen Dank, {formData.client_name}. Wir freuen uns auf Ihren Besuch.
                </p>
              </div>

              <div className="bg-[#ff0035]/5 rounded-2xl p-6 text-left border-2 border-[#ff0035]/30 mx-auto max-w-lg">
                <h4 className="font-bold text-[#0e131f] mb-4 text-center">
                  📋 Ihre Terminbestätigung
                </h4>
                
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <strong className="text-[#0e131f]">Buchungs-Nr.:</strong>
                    <span className="text-[#ff0035] font-mono">#{createdAppointment?.id?.slice(-8)?.toUpperCase()}</span>
                  </div>
                  
                  <div className="w-full h-[1px] bg-[#ff0035]/30"></div>
                  
                  <div className="flex justify-between">
                    <strong className="text-[#0e131f]">Service:</strong>
                    <span className="text-[#8b939c]">{createdAppointment?.service}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <strong className="text-[#0e131f]">Preis:</strong>
                    <span className="text-[#ff0035] font-bold">{selectedService?.price}€</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <strong className="text-[#0e131f]">Dauer:</strong>
                    <span className="text-[#8b939c]">{selectedService?.duration}</span>
                  </div>
                  
                  <div className="w-full h-[1px] bg-[#ff0035]/30"></div>
                  
                  <div className="flex justify-between">
                    <strong className="text-[#0e131f]">Datum:</strong>
                    <span className="text-[#8b939c]">{formatDate(createdAppointment?.preferred_date)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <strong className="text-[#0e131f]">Uhrzeit:</strong>
                    <span className="font-bold text-[#8b939c]">{createdAppointment?.preferred_time} Uhr</span>
                  </div>
                </div>
              </div>

              <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 text-left">
                <p className="text-sm text-orange-800">
                  <strong>📍 Adresse:</strong> Sulterkamp 58, 45356 Essen<br/>
                  <strong>📞 Telefon:</strong> +49 201 1234 5678
                </p>
              </div>

              <button
                onClick={resetForm}
                className="w-full py-3 px-6 bg-[#ff0035] text-white rounded-xl font-medium hover:bg-[#d9002d] transition-colors duration-300"
              >
                Fertig
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}