import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Calendar, Clock, User, Mail, Phone, MessageSquare, 
  Eye, CheckCircle, XCircle, Filter, Search, Download,
  AlertCircle, Star, MapPin, RefreshCw, Car, Wrench, Package, Euro
} from "lucide-react";
import { Appointment } from "@/entities/Appointment";
import { BookingNotification } from "@/entities/BookingNotification";

// --- START: PALETTE & KONSTANTEN FÜR M&M REIFENSERVICE ---
const ACCENT_COLOR = "#ff0035"; // Rot
const PRIMARY_COLOR = "#38405f"; // Dunkelblau/Grau
const LIGHT_BG_COLOR = "#E8F4F8"; // Helles, neutrales Blau/Grau

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
  confirmed: "bg-green-100 text-green-800 border-green-200", 
  completed: "bg-blue-100 text-blue-800 border-blue-200",
  cancelled: "bg-red-100 text-red-800 border-red-200"
};
// --- END: PALETTE & KONSTANTEN ---


export default function AdminBookings() {
  const [appointments, setAppointments] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  // Add console log to confirm component is loading
  console.log('AdminBookings component loaded');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Starting to load appointment data...');
      
      // Initialize with empty arrays
      let appointmentsData = [];
      let notificationsData = [];
      
      // Try to load appointments with better error handling
      try {
        appointmentsData = await Appointment.list("-created_date", 100);
        console.log('Appointments loaded successfully:', appointmentsData?.length || 0);
      } catch (aptError) {
        console.warn('Failed to load appointments (this might be expected if no appointments exist yet):', aptError);
        appointmentsData = [];
      }
      
      // Try to load notifications with better error handling
      try {
        notificationsData = await BookingNotification.list("-created_date", 100);
        console.log('Notifications loaded successfully:', notificationsData?.length || 0);
      } catch (notError) {
        console.warn('Failed to load notifications (this might be expected if no notifications exist yet):', notError);
        notificationsData = [];
      }
      
      setAppointments(appointmentsData || []);
      setNotifications(notificationsData || []);
      
      console.log('Data loading completed successfully');
      
    } catch (error) {
      console.error('Critical error during data loading:', error);
      setError(`Failed to load booking data: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const updateAppointmentStatus = async (appointmentId, newStatus) => {
    try {
      await Appointment.update(appointmentId, { status: newStatus });
      await loadData();
      console.log(`Appointment ${appointmentId} updated to ${newStatus}`);
    } catch (error) {
      console.error('Failed to update appointment status:', error);
      alert('Failed to update appointment status. Please try again.');
    }
  };

  const markNotificationAsViewed = async (notificationId) => {
    try {
      await BookingNotification.update(notificationId, { notification_status: "viewed" });
      await loadData();
      console.log(`Notification ${notificationId} marked as viewed`);
    } catch (error) {
      console.error('Failed to update notification:', error);
    }
  };

  // Anpassung der Formatierung auf deutsches Format
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('de-DE', { 
        weekday: 'short', 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      });
    } catch {
      return dateString;
    }
  };

  // Anpassung der Formatierung auf deutsches Format
  const formatDateTime = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      return date.toLocaleString('de-DE', { 
        dateStyle: 'medium',
        timeStyle: 'short'
      });
    } catch {
      return dateString;
    }
  };

  const filteredAppointments = appointments.filter(appointment => {
    if (!appointment) return false;
    
    const matchesStatus = statusFilter === "all" || appointment.status === statusFilter;
    const matchesSearch = 
      (appointment.client_name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (appointment.email || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (appointment.phone || '').includes(searchTerm) ||
      (appointment.service || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDate = !dateFilter || appointment.preferred_date === dateFilter;
    
    return matchesStatus && matchesSearch && matchesDate;
  });

  const exportToCSV = () => {
    const csvContent = [
      ["Date Created", "Client Name", "Email", "Phone", "Service", "Price (€)", "Appointment Date", "Time", "Status", "Message"].join(";"), // Semikolon als Trenner
      ...filteredAppointments.map(apt => [
        formatDateTime(apt.created_date),
        apt.client_name || '',
        apt.email || '',
        apt.phone || '',
        apt.service || '',
        apt.service_price || '',
        apt.preferred_date || '',
        apt.preferred_time || '',
        apt.status || '',
        (apt.message || "").replace(/;/g, ",") // Kommas im Text durch Semikolon ersetzen
      ].join(";"))
    ].join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mmreifenservice_bookings_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Show loading state
  if (loading) {
    console.log('Rendering loading state');
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center pt-20">
        <div className="text-center">
          {/* Ladeanimation in Rot */}
          <div className="w-16 h-16 border-4 border-t-transparent rounded-full animate-spin mx-auto mb-4" style={{ borderColor: ACCENT_COLOR, borderTopColor: 'transparent' }}></div>
          <p className="text-gray-600">Lade Buchungs-Dashboard von M&M Reifenservice...</p>
          <p className="text-sm text-gray-500 mt-2">Bitte warten Sie, während die Daten abgerufen werden</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    console.log('Rendering error state:', error);
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center pt-20">
        <div className="text-center max-w-md">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">Fehler beim Laden des Dashboards</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={loadData}
            className={`text-white px-6 py-2 rounded-lg hover:bg-[${PRIMARY_COLOR}] transition-colors`}
            style={{ backgroundColor: ACCENT_COLOR }} // Roter Button
          >
            Erneut versuchen
          </button>
        </div>
      </div>
    );
  }

  console.log('Rendering main dashboard with', appointments.length, 'appointments');

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <Car className={`w-8 h-8`} style={{ color: ACCENT_COLOR }} />
                <div>
                  <h1 className="text-3xl font-serif font-bold text-[#0F0F0F]">M&M Reifenservice Admin</h1>
                  <p className="text-gray-600">Buchungsverwaltung Dashboard</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              <button
                onClick={loadData}
                className={`flex items-center gap-2 text-gray-600 hover:text-[${ACCENT_COLOR}] transition-colors`}
              >
                <RefreshCw className="w-5 h-5" />
                Aktualisieren
              </button>
              <div className="text-right">
                <p className={`text-2xl font-bold`} style={{ color: ACCENT_COLOR }}>{appointments.length}</p>
                <p className="text-sm text-gray-600">Gesamtbuchungen</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-green-600">
                  {appointments.filter(a => a.status === 'confirmed').length}
                </p>
                <p className="text-sm text-gray-600">Bestätigt</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* System Status */}
        <div className={`border border-green-200 rounded-lg p-4 mb-8`} style={{ backgroundColor: LIGHT_BG_COLOR }}>
          <h4 className="font-bold text-green-800 mb-2">✅ Systemstatus</h4>
          <p className="text-sm text-green-700">Dashboard erfolgreich geladen</p>
          <p className="text-sm text-green-700">Gesamtzahl Termine: {appointments.length}</p>
          <p className="text-sm text-green-700">Gefilterte Termine: {filteredAppointments.length}</p>
          <p className="text-sm text-green-700">Benachrichtigungen: {notifications.length}</p>
        </div>

        {/* Filters and Controls */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Suche nach Name, E-Mail, Telefon oder Service..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[${ACCENT_COLOR}] transition-colors`}
                />
              </div>

              {/* Status Filter */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className={`px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[${ACCENT_COLOR}] transition-colors`}
              >
                <option value="all">Alle Status</option>
                <option value="pending">Offen</option>
                <option value="confirmed">Bestätigt</option>
                <option value="completed">Abgeschlossen</option>
                <option value="cancelled">Storniert</option>
              </select>

              {/* Date Filter */}
              <input
                type="date"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className={`px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[${ACCENT_COLOR}] transition-colors`}
              />
            </div>

            {/* Export Button */}
            <button
              onClick={exportToCSV}
              className={`flex items-center gap-2 text-white px-6 py-3 rounded-xl font-medium hover:bg-[${PRIMARY_COLOR}] transition-colors duration-300`}
              style={{ backgroundColor: ACCENT_COLOR }}
            >
              <Download className="w-5 h-5" />
              Export CSV
            </button>
          </div>
        </div>

        {/* Recent Notifications Alert */}
        {notifications.filter(n => n.notification_status === 'pending').length > 0 && (
          <div className="bg-orange-50 border border-orange-200 rounded-2xl p-6 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <AlertCircle className="w-6 h-6 text-orange-600" />
              <h3 className="font-bold text-orange-800">
                {notifications.filter(n => n.notification_status === 'pending').length} neue Buchungsanfragen
              </h3>
            </div>
            <div className="space-y-2">
              {notifications.filter(n => n.notification_status === 'pending').slice(0, 3).map(notification => (
                <div key={notification.id} className="flex items-center justify-between bg-white rounded-lg p-3">
                  <div>
                    <span className="font-medium">{notification.client_name}</span>
                    <span className="text-gray-600 ml-2">buchte {notification.service_name}</span>
                    <span className="text-sm text-gray-500 ml-2">
                      am {formatDate(notification.appointment_date)} um {notification.appointment_time} Uhr
                    </span>
                  </div>
                  <button
                    onClick={() => markNotificationAsViewed(notification.id)}
                    className={`text-sm text-white px-3 py-1 rounded-lg hover:bg-[${PRIMARY_COLOR}] transition-colors`}
                    style={{ backgroundColor: ACCENT_COLOR }}
                  >
                    Als gelesen markieren
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Appointments Grid */}
        <div className="grid gap-6">
          {filteredAppointments.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
              <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {appointments.length === 0 ? 'Noch keine Buchungen vorhanden' : 'Keine Buchungen entsprechen den Filtern'}
              </h3>
              <p className="text-gray-600">
                {appointments.length === 0 
                  ? 'Sobald Kunden Termine buchen, erscheinen diese hier.'
                  : 'Versuchen Sie, die Filter oder Suchbegriffe anzupassen.'
                }
              </p>
              {appointments.length === 0 && (
                <button
                  onClick={() => window.dispatchEvent(new CustomEvent('open-booking-modal'))}
                  className={`mt-4 text-white px-6 py-2 rounded-lg hover:bg-[${PRIMARY_COLOR}] transition-colors`}
                  style={{ backgroundColor: ACCENT_COLOR }}
                >
                  Buchungssystem testen
                </button>
              )}
            </div>
          ) : (
            filteredAppointments.map((appointment) => (
              <motion.div
                key={appointment.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center`} style={{ backgroundColor: LIGHT_BG_COLOR }}>
                        <User className={`w-6 h-6`} style={{ color: ACCENT_COLOR }} />
                      </div>
                      <div>
                        <h3 className="font-serif text-xl font-bold text-[#0F0F0F]">
                          {appointment.client_name || 'N/A'}
                        </h3>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mt-1">
                          <div className="flex items-center gap-1">
                            <Mail className="w-4 h-4" />
                            <a 
                              href={`mailto:${appointment.email}`} 
                              className={`hover:text-[${ACCENT_COLOR}] break-all`}
                            >
                              {appointment.email || 'N/A'}
                            </a>
                          </div>
                          <div className="flex items-center gap-1">
                            <Phone className="w-4 h-4" />
                            <a 
                              href={`tel:${appointment.phone}`} 
                              className={`hover:text-[${ACCENT_COLOR}]`}
                            >
                              {appointment.phone || 'N/A'}
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${statusColors[appointment.status] || statusColors.pending}`}>
                        {appointment.status ? appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1) : 'Offen'}
                      </span>
                      <span className="text-xs text-gray-500">
                        #{appointment.id ? (appointment.id).slice(-8).toUpperCase() : 'N/A'}
                      </span>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <Wrench className={`w-4 h-4`} style={{ color: ACCENT_COLOR }} />
                      <div>
                        <p className="font-medium text-[#0F0F0F]">{appointment.service || 'N/A'}</p>
                        <p className="text-sm text-gray-600">
                          {/* Anpassung der Währung und des Formats auf Euro/Deutsch */}
                          {appointment.service_price ? `€ ${Number(appointment.service_price).toLocaleString('de-DE', { minimumFractionDigits: 2 })}` : 'Preis N/A'}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-blue-600" />
                      <div>
                        <p className="font-medium text-[#0F0F0F]">{formatDate(appointment.preferred_date)}</p>
                        <p className="text-sm text-gray-600">Termin Datum</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-green-600" />
                      <div>
                        <p className="font-medium text-[#0F0F0F]">{appointment.preferred_time || 'N/A'} Uhr</p>
                        <p className="text-sm text-gray-600">{appointment.duration || 'Dauer N/A'}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-gray-400" />
                      <div>
                        <p className="font-medium text-[#0F0F0F]">{formatDateTime(appointment.created_date)}</p>
                        <p className="text-sm text-gray-600">Gebucht am</p>
                      </div>
                    </div>
                  </div>

                  {appointment.message && (
                    <div className="bg-gray-50 rounded-lg p-3 mb-4">
                      <div className="flex items-start gap-2">
                        <MessageSquare className="w-4 h-4 text-gray-400 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-gray-700 mb-1">Sonderwünsche:</p>
                          <p className="text-sm text-gray-600">{appointment.message}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="text-sm text-gray-500">
                      Zuletzt aktualisiert: {formatDateTime(appointment.updated_date)}
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {appointment.status === 'pending' && (
                        <>
                          <button
                            onClick={() => updateAppointmentStatus(appointment.id, 'confirmed')}
                            className="flex items-center gap-1 bg-green-600 text-white px-3 py-1 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
                          >
                            <CheckCircle className="w-4 h-4" />
                            Bestätigen
                          </button>
                          <button
                            onClick={() => updateAppointmentStatus(appointment.id, 'cancelled')}
                            className="flex items-center gap-1 bg-red-600 text-white px-3 py-1 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors"
                          >
                            <XCircle className="w-4 h-4" />
                            Stornieren
                          </button>
                        </>
                      )}
                      
                      {appointment.status === 'confirmed' && (
                        <button
                          onClick={() => updateAppointmentStatus(appointment.id, 'completed')}
                          className="flex items-center gap-1 bg-blue-600 text-white px-3 py-1 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                        >
                          <CheckCircle className="w-4 h-4" />
                          Als abgeschlossen markieren
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>

        {/* Summary Stats */}
        <div className="mt-12 grid md:grid-cols-4 gap-6">
          <div className="bg-white rounded-2xl p-6 text-center shadow-sm">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3`} style={{ backgroundColor: LIGHT_BG_COLOR }}>
              <Calendar className={`w-6 h-6`} style={{ color: PRIMARY_COLOR }} />
            </div>
            <p className={`text-2xl font-bold`} style={{ color: PRIMARY_COLOR }}>
              {appointments.filter(a => a.status === 'pending').length}
            </p>
            <p className="text-sm text-gray-600">Offene Anfragen</p>
          </div>
          
          <div className="bg-white rounded-2xl p-6 text-center shadow-sm">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <p className="text-2xl font-bold text-green-600">
              {appointments.filter(a => a.status === 'confirmed').length}
            </p>
            <p className="text-sm text-gray-600">Bestätigte Termine</p>
          </div>
          
          <div className="bg-white rounded-2xl p-6 text-center shadow-sm">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Package className="w-6 h-6 text-purple-600" />
            </div>
            <p className="text-2xl font-bold text-purple-600">
              {appointments.filter(a => a.status === 'completed').length}
            </p>
            <p className="text-sm text-gray-600">Abgeschlossene Aufträge</p>
          </div>
          
          <div className="bg-white rounded-2xl p-6 text-center shadow-sm">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3`} style={{ backgroundColor: LIGHT_BG_COLOR }}>
              <Euro className={`w-6 h-6`} style={{ color: ACCENT_COLOR }} />
            </div>
            <p className={`text-2xl font-bold`} style={{ color: ACCENT_COLOR }}>
              {/* Berechnung und Formatierung des Gesamtumsatzes in Euro */}
              {appointments.reduce((sum, apt) => sum + (Number(apt.service_price) || 0), 0).toLocaleString('de-DE', { minimumFractionDigits: 2 })} €
            </p>
            <p className="text-sm text-gray-600">Geschätzter Gesamtumsatz</p>
          </div>
        </div>
      </div>
    </div>
  );
}