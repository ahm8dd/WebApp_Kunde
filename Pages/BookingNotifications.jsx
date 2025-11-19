import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { BookingNotification } from "@/entities/BookingNotification";
import { Bell, Phone, Mail, Clock, Calendar, User, CheckCircle, AlertCircle, Wrench, Car, Package } from "lucide-react";

// --- START: PALETTE & KONSTANTEN FÜR M&M REIFENSERVICE ---
const ACCENT_COLOR = "#ff0035"; // Rot
const PRIMARY_TEXT_COLOR = "#38405f"; // Dunkelblau/Grau für Text
const LIGHT_BG_COLOR = "#E8F4F8"; // Helles, neutrales Blau/Grau

const statusColors = {
  pending: "bg-orange-100 text-orange-700",
  viewed: "bg-blue-100 text-blue-700",
  contacted: "bg-green-100 text-green-700"
};
// --- END: PALETTE & KONSTANTEN ---

export default function BookingNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    try {
      const data = await BookingNotification.list('-created_date', 50);
      setNotifications(data);
    } catch (error) {
      console.error('Failed to load notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateNotificationStatus = async (id, status) => {
    try {
      await BookingNotification.update(id, { notification_status: status });
      loadNotifications();
    } catch (error) {
      console.error('Failed to update notification:', error);
    }
  };

  const filteredNotifications = notifications.filter(notification => {
    if (filter === "all") return true;
    return notification.notification_status === filter;
  });

  // Anpassung der Formatierung auf deutsches Format
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleDateString('de-DE', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (e) {
      return dateString;
    }
  };

  if (loading) {
    return (
      <div className={`pt-32 pb-24 bg-[${LIGHT_BG_COLOR}] min-h-screen flex items-center justify-center`}>
        <div className="text-center">
          {/* Ladeanimation in Rot */}
          <div className="w-12 h-12 border-4 border-t-transparent rounded-full animate-spin mx-auto mb-4" style={{ borderColor: ACCENT_COLOR, borderTopColor: 'transparent' }}></div>
          <p className="text-gray-600">Lade Buchungsbenachrichtigungen...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`pt-32 pb-24 bg-[${LIGHT_BG_COLOR}] min-h-screen`}>
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="font-serif text-4xl font-bold text-[#0F0F0F] mb-4">
            Neue Buchungsanfragen
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
<<<<<<< HEAD
            Verwalten und verfolgen Sie alle eingehenden Terminanfragen von Ihrer Website.
=======
            Manage and track all incoming appointment bookings from your website.
>>>>>>> 6abfd2bef49573cf2b3ceb00142c1c97edaae6e9
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {[
            { key: "all", label: "Alle", count: notifications.length },
            { key: "pending", label: "Neu (Offen)", count: notifications.filter(n => n.notification_status === 'pending').length },
            { key: "viewed", label: "Gesehen", count: notifications.filter(n => n.notification_status === 'viewed').length },
            { key: "contacted", label: "Kontaktiert", count: notifications.filter(n => n.notification_status === 'contacted').length }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 flex items-center gap-2 ${
                filter === tab.key
                  // Aktiver Tab in Rot
                  ? 'text-white shadow-lg'
                  : `bg-white text-gray-600 hover:text-[${ACCENT_COLOR}] border border-gray-200`
              }`}
              style={{ backgroundColor: filter === tab.key ? ACCENT_COLOR : 'white' }}
            >
              {tab.label}
              <span className={`px-2 py-1 rounded-full text-xs ${
                filter === tab.key ? 'bg-white/20' : 'bg-gray-100'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Notifications List */}
        {filteredNotifications.length === 0 ? (
          <div className="text-center py-16">
            <Bell className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">Keine Benachrichtigungen gefunden</h3>
            <p className="text-gray-500">
              {filter === "all" 
                ? "Es liegen noch keine Buchungsanfragen vor. Sie erscheinen hier, sobald Kunden Termine buchen."
                : `Momentan keine ${tab.label} Benachrichtigungen.`
              }
            </p>
          </div>
        ) : (
          <div className="grid gap-6">
            {filteredNotifications.map((notification, index) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${
                        notification.notification_status === 'pending' ? 'bg-orange-400' :
                        notification.notification_status === 'viewed' ? 'bg-blue-400' :
                        'bg-green-400'
                      }`}></div>
                      <div>
                        <h3 className="font-serif text-xl font-bold text-[#0F0F0F]">
                          Neue Buchung: {notification.service_name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          Buchungs-ID: #{notification.booking_id?.slice(-8)?.toUpperCase()}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        statusColors[notification.notification_status]
                      }`}>
                        {notification.notification_status === 'pending' ? 'Offen' : 
                         notification.notification_status === 'viewed' ? 'Gesehen' : 
                         'Kontaktiert'}
                      </span>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Client Information */}
                    <div className="space-y-3">
                      <h4 className={`font-semibold text-gray-800 flex items-center gap-2`} style={{ color: PRIMARY_TEXT_COLOR }}>
                        <User className="w-4 h-4" />
                        Kundeninformation
                      </h4>
                      <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm">
                        <p><strong>Name:</strong> {notification.client_name}</p>
                        <p><strong>E-Mail:</strong> 
                          <a href={`mailto:${notification.client_email}`} className="text-blue-600 hover:underline ml-1">
                            {notification.client_email}
                          </a>
                        </p>
                        <p><strong>Telefon:</strong> 
                          <a href={`tel:${notification.client_phone}`} className="text-green-600 hover:underline ml-1">
                            {notification.client_phone}
                          </a>
                        </p>
                      </div>
                    </div>

                    {/* Appointment Details */}
                    <div className="space-y-3">
                      <h4 className={`font-semibold text-gray-800 flex items-center gap-2`} style={{ color: PRIMARY_TEXT_COLOR }}>
                        <Calendar className="w-4 h-4" />
                        Termin-Details
                      </h4>
                      <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm">
                        <p><strong>Service:</strong> {notification.service_name}</p>
                        <p><strong>Preis:</strong> 
                          <span className={`font-bold ml-1`} style={{ color: ACCENT_COLOR }}>
                            € {notification.service_price?.toLocaleString('de-DE', { minimumFractionDigits: 2 })}
                          </span>
                        </p>
                        <p><strong>Dauer:</strong> {notification.service_duration}</p>
                        <p><strong>Datum:</strong> {formatDate(notification.appointment_date)}</p>
                        <p><strong>Uhrzeit:</strong> {notification.appointment_time} Uhr</p>
                        {notification.special_requests && (
                          <p><strong>Sonderwünsche:</strong> {notification.special_requests}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-3 mt-6 pt-4 border-t border-gray-100">
                    <a
                      href={`tel:${notification.client_phone}`}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                    >
                      <Phone className="w-4 h-4" />
                      Kunden anrufen
                    </a>
                    <a
                      href={`mailto:${notification.client_email}`}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                    >
                      <Mail className="w-4 h-4" />
                      E-Mail senden
                    </a>
                    
                    {notification.notification_status === 'pending' && (
                      <button
                        onClick={() => updateNotificationStatus(notification.id, 'viewed')}
                        className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors flex items-center gap-2"
                      >
                        <CheckCircle className="w-4 h-4" />
                        Als gesehen markieren
                      </button>
                    )}
                    
                    {notification.notification_status === 'viewed' && (
                      <button
                        onClick={() => updateNotificationStatus(notification.id, 'contacted')}
                        className={`text-white px-4 py-2 rounded-lg hover:bg-[${PRIMARY_TEXT_COLOR}] transition-colors flex items-center gap-2`}
                        style={{ backgroundColor: ACCENT_COLOR }}
                      >
                        <CheckCircle className="w-4 h-4" />
                        Als kontaktiert markieren
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}