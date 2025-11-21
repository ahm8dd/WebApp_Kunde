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
  CheckCircle,
  XCircle,
  Search,
  Download,
  AlertCircle,
  Car,
  Wrench,
  Package,
  Euro,
  Trash2,
  Plus,
  Layers,
  LogOut,
  RefreshCw,
  Bell,
  Send,
  Save, // Neu: Speichern-Icon
  Edit, // Neu: Bearbeiten-Icon (optional)
} from "lucide-react";

// --- DEINE ORIGINAL PALETTE & KONSTANTEN ---
const ACCENT_COLOR = "#ff0035"; // Rot
const PRIMARY_COLOR = "#38405f"; // Dunkelblau/Grau
const LIGHT_BG_COLOR = "#E8F4F8"; // Helles, neutrales Blau/Grau

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
  confirmed: "bg-green-100 text-green-800 border-green-200",
  completed: "bg-blue-100 text-blue-800 border-blue-200",
  cancelled: "bg-red-100 text-red-800 border-red-200",
};

export default function AdminBookings() {
  // State
  const [activeTab, setActiveTab] = useState("bookings");
  const [appointments, setAppointments] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [inventorySearchTerm, setInventorySearchTerm] = useState(""); // Neu: Separater Suchbegriff für Lager

  // Auth
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");

  // Inventory Modal & Inline Edit
  const [showAddModal, setShowAddModal] = useState(false);
  const [newItem, setNewItem] = useState({
    brand: "",
    model: "",
    size: "",
    season: "Sommer",
    price: "",
    quantity: 4,
    condition: "Neu", // Hinzugefügt
  });
  const [editedItem, setEditedItem] = useState(null); // Speichert die ID des gerade bearbeiteten Elements

  // --- USE EFFECT & LOAD DATA ---
  useEffect(() => {
    if (isAuthenticated) {
      loadData();
    }
  }, [isAuthenticated]);

  const checkLogin = () => {
    if (password === "admin123") setIsAuthenticated(true);
    else alert("Falsches Passwort!");
  };

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      // Bookings
      const { data: bookingsData, error: bookingsError } = await supabase
        .from("bookings")
        .select("*")
        .order("requested_date", { ascending: true }) // Sortierung nach Datum
        .order("requested_time", { ascending: true }); // und Zeit
      if (bookingsError) throw bookingsError;

      // Inventory
      const { data: inventoryData, error: inventoryError } = await supabase
        .from("inventory")
        .select("*")
        .order("brand", { ascending: true });
      if (inventoryError) throw inventoryError;

      setAppointments(bookingsData || []);
      setInventory(inventoryData || []);
    } catch (error) {
      console.error("Ladefehler:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // --- LOGIK: ONE-CLICK PROCESS (Status + Mail) ---
  const handleProcessBooking = async (booking, actionType) => {
    const newStatus = actionType === "confirm" ? "confirmed" : "cancelled";
    try {
      // 1. Update DB
      const { error: updateError } = await supabase
        .from("bookings")
        .update({ status: newStatus })
        .eq("id", booking.id);
      if (updateError) throw updateError;

      // 2. Update UI
      setAppointments((prev) =>
        prev.map((a) => (a.id === booking.id ? { ...a, status: newStatus } : a))
      );

      // 3. Open Mail
      openMailClient(booking, actionType);
    } catch (error) {
      alert(`Fehler beim Verarbeiten: ${error.message}`);
    }
  };

  const openMailClient = (booking, type) => {
    if (!booking.email) return alert("Keine Email!");
    const dateStr = formatDate(booking.requested_date);
    let subject = "",
      body = "";

    if (type === "confirm") {
      subject = `✅ Terminbestätigung: MM Reifendienst am ${dateStr}`;
      body = `Hallo ${booking.client_name},\n\nwir bestätigen hiermit Ihren Termin am ${dateStr} um ${booking.requested_time} Uhr für ${booking.service}. Bitte beachten Sie, dass Sie OHNE Termin gebucht haben. Die Zeit dient uns nur zur Planung.\n\nOrt: Sulterkamp 58, 45356 Essen.\n\nMit freundlichen Grüßen,\nMM Reifendienst`;
    } else {
      subject = `Info zu Ihrer Terminanfrage`;
      body = `Hallo ${booking.client_name},\n\nleider können wir den Termin am ${dateStr} nicht bestätigen. Bitte rufen Sie uns unter 0201 25908194 an.\n\nMit freundlichen Grüßen,\nMM Reifendienst`;
    }
    window.location.href = `mailto:${
      booking.email
    }?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  // --- LOGIK: INVENTORY (NEU: INLINE EDIT) ---

  // Speichert eine einzelne geänderte Eigenschaft in der DB
  const handleUpdateInventoryField = async (item, field, value) => {
    if (!value || value === item[field]) return;

    // Setze das Bearbeitungs-Highlight zurück
    setEditedItem(null);

    try {
      const parsedValue =
        field === "price" || field === "quantity" ? parseFloat(value) : value;

      const { error: updateError } = await supabase
        .from("inventory")
        .update({ [field]: parsedValue })
        .eq("id", item.id);

      if (updateError) throw updateError;

      // Aktualisiere UI
      setInventory((prev) =>
        prev.map((i) => (i.id === item.id ? { ...i, [field]: parsedValue } : i))
      );
    } catch (error) {
      alert(`Fehler beim Speichern der Änderung: ${error.message}`);
      loadData(); // Lade Daten neu, falls Fehler auftritt
    }
  };

  const deleteInventoryItem = async (id) => {
    if (!window.confirm("Soll dieser Reifen wirklich gelöscht werden?")) return;
    try {
      const { error: deleteError } = await supabase
        .from("inventory")
        .delete()
        .eq("id", id);
      if (deleteError) throw deleteError;
      setInventory((prev) => prev.filter((i) => i.id !== id));
    } catch (error) {
      alert(`Fehler beim Löschen: ${error.message}`);
    }
  };

  const addNewInventoryItem = async () => {
    if (!newItem.brand || !newItem.size || !newItem.price) {
      return alert("Bitte Marke, Größe und Preis eingeben.");
    }
    try {
      const { error: insertError } = await supabase.from("inventory").insert([
        {
          ...newItem,
          price: parseFloat(newItem.price),
          quantity: parseInt(newItem.quantity),
        },
      ]);
      if (insertError) throw insertError;

      setShowAddModal(false);
      loadData();
      setNewItem({
        brand: "",
        model: "",
        size: "",
        season: "Sommer",
        price: "",
        quantity: 4,
        condition: "Neu",
      });
    } catch (error) {
      alert(`Fehler beim Hinzufügen: ${error.message}`);
    }
  };

  // --- HELPER ---
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      return new Date(dateString).toLocaleDateString("de-DE", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    } catch {
      return dateString;
    }
  };
  const formatDateTime = (dateString) => {
    if (!dateString) return "N/A";
    try {
      return new Date(dateString).toLocaleString("de-DE", {
        dateStyle: "medium",
        timeStyle: "short",
      });
    } catch {
      return dateString;
    }
  };
  const formatCurrency = (val) =>
    new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "EUR",
    }).format(val || 0);

  // --- FILTER ---
  const filteredAppointments = appointments.filter((appointment) => {
    const matchesStatus =
      statusFilter === "all" || appointment.status === statusFilter;
    const searchL = searchTerm.toLowerCase();
    const matchesSearch =
      (appointment.client_name || "").toLowerCase().includes(searchL) ||
      (appointment.service || "").toLowerCase().includes(searchL) ||
      (appointment.phone || "").toLowerCase().includes(searchL) ||
      (appointment.email || "").toLowerCase().includes(searchL);
    const matchesDate =
      !dateFilter || appointment.requested_date === dateFilter;
    return matchesStatus && matchesSearch && matchesDate;
  });

  const filteredInventory = inventory.filter((item) => {
    const searchL = inventorySearchTerm.toLowerCase();
    return (
      (item.brand || "").toLowerCase().includes(searchL) ||
      (item.model || "").toLowerCase().includes(searchL) ||
      (item.size || "").toLowerCase().includes(searchL)
    );
  });

  const pendingCount = appointments.filter(
    (a) => a.status === "pending"
  ).length;

  // CSV Export (bleibt gleich)
  const exportToCSV = () => {
    // ... CSV Export Logik
    const csvContent = [
      [
        "Erstellt",
        "Kunde",
        "Email",
        "Telefon",
        "Service",
        "Preis",
        "Datum",
        "Zeit",
        "Status",
      ].join(";"),
      ...filteredAppointments.map((apt) =>
        [
          formatDateTime(apt.created_at),
          apt.client_name,
          apt.email,
          apt.phone,
          apt.service,
          apt.service_price,
          apt.requested_date,
          apt.requested_time,
          apt.status,
        ].join(";")
      ),
    ].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `buchungen.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // --- LOGIN SCREEN ---
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-xl shadow-2xl w-96">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
            MM Admin Login
          </h2>
          <input
            type="password"
            className="w-full p-3 border border-gray-300 rounded-lg mb-4"
            placeholder="Passwort"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && checkLogin()}
          />
          <button
            onClick={checkLogin}
            className="w-full text-white p-3 rounded-lg font-bold transition-colors hover:opacity-90"
            style={{ backgroundColor: ACCENT_COLOR }}
          >
            Anmelden
          </button>
        </div>
      </div>
    );
  }

  // --- DASHBOARD LAYOUT (VERBESSERTES DESIGN) ---
  return (
    <div className="min-h-screen bg-gray-50 pt-10 pb-10 px-4">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div
          className="flex justify-between items-start mb-10 p-4 bg-white rounded-2xl shadow-md border-t-4"
          style={{ borderColor: PRIMARY_COLOR }}
        >
          <div className="flex items-center gap-4">
            <Car className="w-10 h-10" style={{ color: PRIMARY_COLOR }} />
            <div>
              <h1 className="text-3xl font-bold text-[#0F0F0F]">
                M&M Reifenservice Admin 🛠️
              </h1>
              <p className="text-gray-600">Buchungsverwaltung & Lagerbestand</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* TABS SCHALTER */}
            <div className="bg-gray-100 p-1 rounded-xl shadow-inner flex">
              <button
                onClick={() => setActiveTab("bookings")}
                className={`px-4 py-2 rounded-lg font-bold text-sm transition-all flex items-center gap-2 ${
                  activeTab === "bookings"
                    ? "bg-white text-gray-900 shadow-md"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <Calendar size={18} /> Termine
                {pendingCount > 0 && (
                  <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {pendingCount}
                  </span>
                )}
              </button>
              <button
                onClick={() => setActiveTab("inventory")}
                className={`px-4 py-2 rounded-lg font-bold text-sm transition-all flex items-center gap-2 ${
                  activeTab === "inventory"
                    ? "bg-white text-gray-900 shadow-md"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <Package size={18} /> Lager
              </button>
            </div>

            <button
              onClick={loadData}
              className="p-3 bg-white rounded-xl shadow-sm hover:bg-gray-100 text-gray-600 border border-gray-200"
              title="Aktualisieren"
            >
              <RefreshCw
                className={`w-5 h-5 ${loading ? "animate-spin" : ""}`}
              />
            </button>
            <button
              onClick={() => setIsAuthenticated(false)}
              className="bg-red-50 text-red-600 p-3 rounded-xl hover:bg-red-100 border border-red-200"
              title="Abmelden"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>

        {/* --- TAB: BOOKINGS --- */}
        {activeTab === "bookings" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {/* STATS CARDS (DESIGN ANPASSUNG) */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              {/* Gesamteinnahmen (Rot Akzent) */}
              <div
                className="bg-white rounded-2xl p-6 shadow-lg border-l-4"
                style={{ borderColor: ACCENT_COLOR }}
              >
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-500 font-semibold uppercase">
                    Gesamtumsatz (Est.)
                  </p>
                  <Euro className="w-5 h-5" style={{ color: ACCENT_COLOR }} />
                </div>
                <p
                  className="text-3xl font-extrabold mt-2"
                  style={{ color: ACCENT_COLOR }}
                >
                  {formatCurrency(
                    appointments.reduce(
                      (sum, apt) => sum + (Number(apt.service_price) || 0),
                      0
                    )
                  )}
                </p>
              </div>

              {/* Offene Anfragen (Gelb) */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-yellow-400">
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-500 font-semibold uppercase">
                    Offene Anfragen
                  </p>
                  <AlertCircle className="w-5 h-5 text-yellow-600" />
                </div>
                <p className="text-3xl font-extrabold text-yellow-600 mt-2">
                  {pendingCount}
                </p>
              </div>

              {/* Bestätigt (Grün) */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-green-500">
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-500 font-semibold uppercase">
                    Bestätigt
                  </p>
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <p className="text-3xl font-extrabold text-green-600 mt-2">
                  {appointments.filter((a) => a.status === "confirmed").length}
                </p>
              </div>

              {/* Gesamtbuchungen (Primärfarbe) */}
              <div
                className="bg-white rounded-2xl p-6 shadow-lg border-l-4"
                style={{ borderColor: PRIMARY_COLOR }}
              >
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-500 font-semibold uppercase">
                    Gesamtbuchungen
                  </p>
                  <Calendar
                    className="w-5 h-5"
                    style={{ color: PRIMARY_COLOR }}
                  />
                </div>
                <p
                  className="text-3xl font-extrabold mt-2"
                  style={{ color: PRIMARY_COLOR }}
                >
                  {appointments.length}
                </p>
              </div>
            </div>

            {/* BENACHRICHTIGUNGEN (Pending Appointments) */}
            <AnimatePresence>
              {pendingCount > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-orange-50 border border-orange-300 rounded-2xl p-6 mb-8 shadow-sm"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Bell className="w-6 h-6 text-orange-600" />
                    <h3 className="font-bold text-lg text-orange-800">
                      {pendingCount} neue Terminanfrage(n) zur Bearbeitung
                    </h3>
                  </div>
                  <div className="space-y-4">
                    {appointments
                      .filter((a) => a.status === "pending")
                      .slice(0, 3) // Zeige nur die ersten 3 in der Benachrichtigung an
                      .map((apt) => (
                        <div
                          key={apt.id}
                          className="bg-white rounded-xl p-4 shadow-md flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 border border-gray-100"
                        >
                          <div className="flex flex-col md:flex-row gap-4 items-start">
                            <div className="text-center bg-gray-100 p-2 rounded-lg flex-shrink-0">
                              <p className="font-extrabold text-xl text-gray-900">
                                {apt.requested_time}
                              </p>
                              <p className="text-xs text-gray-500">
                                {formatDate(apt.requested_date)}
                              </p>
                            </div>
                            <div>
                              <p className="font-bold text-base text-gray-900">
                                {apt.client_name}
                                <span className="font-normal text-gray-500 mx-2">
                                  möchte
                                </span>
                                <span className="text-red-600 font-extrabold">
                                  {apt.service}
                                </span>
                              </p>
                              <p className="text-sm text-gray-500">
                                {apt.phone} | {apt.email}
                              </p>
                              {apt.message && (
                                <p className="text-xs text-gray-400 italic mt-1">
                                  "{apt.message}"
                                </p>
                              )}
                            </div>
                          </div>
                          <div className="flex gap-2 flex-shrink-0 w-full lg:w-auto">
                            <button
                              onClick={() =>
                                handleProcessBooking(apt, "cancel")
                              }
                              className="flex-1 lg:flex-none flex items-center justify-center gap-1 px-3 py-2 text-red-600 bg-red-100 hover:bg-red-200 rounded-lg text-sm font-medium transition-colors"
                            >
                              <XCircle size={16} /> Ablehnen
                            </button>
                            <button
                              onClick={() =>
                                handleProcessBooking(apt, "confirm")
                              }
                              className="flex-1 lg:flex-none flex items-center justify-center gap-1 px-4 py-2 bg-green-600 text-white hover:bg-green-700 rounded-lg text-sm font-bold shadow-md transition-colors"
                            >
                              <CheckCircle size={16} /> Bestätigen
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* FILTER & LISTE */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <div className="flex flex-col lg:flex-row gap-4 items-center justify-between mb-6">
                <div className="flex gap-4 flex-1 w-full">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Suche (Name, Service, Telefon, E-Mail)..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-1"
                      style={{ focusRingColor: ACCENT_COLOR }}
                    />
                  </div>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-4 py-3 border border-gray-200 rounded-xl bg-white outline-none"
                  >
                    <option value="all">Alle Status</option>
                    <option value="pending">Offen</option>
                    <option value="confirmed">Bestätigt</option>
                    <option value="completed">Abgeschlossen</option>
                    <option value="cancelled">Storniert</option>
                  </select>
                  <input
                    type="date"
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                    className="px-4 py-3 border border-gray-200 rounded-xl outline-none"
                  />
                </div>
                <button
                  onClick={exportToCSV}
                  className="flex items-center gap-2 text-white px-6 py-3 rounded-xl font-bold transition-colors hover:opacity-90 w-full lg:w-auto flex-shrink-0"
                  style={{ backgroundColor: PRIMARY_COLOR }}
                >
                  <Download className="w-5 h-5" /> Export CSV
                </button>
              </div>

              {/* TABLE STRUKTUR */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-gray-100 border-b">
                    <tr>
                      <th className="p-4 text-sm font-bold text-gray-700 w-[120px]">
                        Datum / Zeit
                      </th>
                      <th className="p-4 text-sm font-bold text-gray-700">
                        Kunde
                      </th>
                      <th className="p-4 text-sm font-bold text-gray-700">
                        Service
                      </th>
                      <th className="p-4 text-sm font-bold text-gray-700 w-[150px]">
                        Status
                      </th>
                      <th className="p-4 text-sm font-bold text-gray-700 text-right w-[150px]">
                        Aktionen
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAppointments.map((booking) => (
                      <tr
                        key={booking.id}
                        className="border-b hover:bg-gray-50"
                      >
                        <td className="p-4">
                          <div className="font-bold text-gray-900">
                            {formatDate(booking.requested_date)}
                          </div>
                          <div className="text-xs text-gray-500 flex items-center gap-1">
                            <Clock size={12} /> {booking.requested_time} Uhr
                          </div>
                        </td>
                        <td className="p-4 text-sm">
                          <div className="font-bold text-gray-800 flex items-center gap-1">
                            <User size={14} className="text-gray-400" />{" "}
                            {booking.client_name}
                          </div>
                          <div className="text-gray-500 flex items-center gap-1">
                            <Phone size={12} /> {booking.phone}
                          </div>
                          <div className="text-gray-500 text-xs flex items-center gap-1">
                            <Mail size={12} /> {booking.email}
                          </div>
                        </td>
                        <td className="p-4 text-gray-600 text-sm">
                          <div className="font-medium">{booking.service}</div>
                          {booking.service_price > 0 && (
                            <div
                              className="text-xs font-bold"
                              style={{ color: ACCENT_COLOR }}
                            >
                              {formatCurrency(booking.service_price)} Est.
                            </div>
                          )}
                        </td>
                        <td className="p-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-bold border ${
                              statusColors[booking.status] ||
                              statusColors.pending
                            }`}
                          >
                            {booking.status === "pending"
                              ? "Offen"
                              : booking.status === "confirmed"
                              ? "Bestätigt"
                              : booking.status === "completed"
                              ? "Abgeschlossen"
                              : "Storniert"}
                          </span>
                        </td>
                        <td className="p-4 text-right flex justify-end gap-2">
                          {/* QUICK ACTIONS */}
                          <button
                            onClick={() => openMailClient(booking, "confirm")}
                            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Mail senden"
                          >
                            <Send size={16} />
                          </button>

                          {booking.status === "pending" && (
                            <>
                              <button
                                onClick={() =>
                                  handleProcessBooking(booking, "confirm")
                                }
                                className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors"
                                title="Bestätigen & Mail"
                              >
                                <CheckCircle size={18} />
                              </button>
                              <button
                                onClick={() =>
                                  handleProcessBooking(booking, "cancel")
                                }
                                className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                                title="Absagen & Mail"
                              >
                                <XCircle size={18} />
                              </button>
                            </>
                          )}
                          {(booking.status === "confirmed" ||
                            booking.status === "completed") && (
                            <button
                              onClick={() =>
                                handleProcessBooking(booking, "cancel")
                              }
                              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Stornieren"
                            >
                              <XCircle size={18} />
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {filteredAppointments.length === 0 && (
                  <div className="p-12 text-center text-gray-400">
                    Keine Buchungen gefunden.
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* --- TAB: INVENTORY --- */}
        {activeTab === "inventory" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="p-6 border-b flex justify-between items-center bg-gray-50">
                <div className="relative w-full max-w-sm">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Marke, Modell oder Größe suchen..."
                    className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-xl text-sm outline-none focus:ring-1"
                    onChange={(e) => setInventorySearchTerm(e.target.value)}
                    style={{ focusRingColor: ACCENT_COLOR }}
                  />
                </div>
                <button
                  onClick={() => setShowAddModal(true)}
                  className="bg-[#ff0035] text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 transition-colors hover:opacity-90 shadow-md"
                >
                  <Plus size={16} /> Neuen Artikel hinzufügen
                </button>
              </div>

              {/* TABLE INVENTORY (MIT INLINE BEARBEITUNG) */}
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-gray-100 border-b">
                    <tr>
                      <th className="p-4 text-sm font-bold text-gray-700 w-[20%]">
                        Marke & Modell
                      </th>
                      <th className="p-4 text-sm font-bold text-gray-700 w-[15%]">
                        Größe / Saison
                      </th>
                      <th className="p-4 text-sm font-bold text-gray-700 w-[10%]">
                        Zustand
                      </th>
                      <th className="p-4 text-sm font-bold text-gray-700 w-[15%]">
                        Preis pro Stk.
                      </th>
                      <th className="p-4 text-sm font-bold text-gray-700 w-[10%]">
                        Lagerbestand
                      </th>
                      <th className="p-4 text-right w-[100px]">Aktion</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredInventory.map((item) => (
                      <tr key={item.id} className="border-b hover:bg-gray-50">
                        {/* Marke & Modell */}
                        <td className="p-4 text-sm">
                          <input
                            type="text"
                            defaultValue={item.brand}
                            onFocus={() => setEditedItem(item.id)}
                            onBlur={(e) =>
                              handleUpdateInventoryField(
                                item,
                                "brand",
                                e.target.value
                              )
                            }
                            className="font-bold text-gray-800 bg-transparent border-none w-full p-1 focus:outline-none focus:ring-1 focus:bg-white rounded"
                            style={{
                              borderColor:
                                editedItem === item.id
                                  ? ACCENT_COLOR
                                  : "transparent",
                            }}
                          />
                          <input
                            type="text"
                            defaultValue={item.model}
                            onFocus={() => setEditedItem(item.id)}
                            onBlur={(e) =>
                              handleUpdateInventoryField(
                                item,
                                "model",
                                e.target.value
                              )
                            }
                            className="text-gray-500 bg-transparent border-none w-full p-1 text-xs focus:outline-none focus:ring-1 focus:bg-white rounded"
                            style={{
                              borderColor:
                                editedItem === item.id
                                  ? ACCENT_COLOR
                                  : "transparent",
                            }}
                          />
                        </td>

                        {/* Größe / Saison */}
                        <td className="p-4 text-sm">
                          <input
                            type="text"
                            defaultValue={item.size}
                            onFocus={() => setEditedItem(item.id)}
                            onBlur={(e) =>
                              handleUpdateInventoryField(
                                item,
                                "size",
                                e.target.value
                              )
                            }
                            className="font-medium text-gray-800 bg-transparent border-none w-full p-1 focus:outline-none focus:ring-1 focus:bg-white rounded"
                            style={{
                              borderColor:
                                editedItem === item.id
                                  ? ACCENT_COLOR
                                  : "transparent",
                            }}
                          />
                          <select
                            defaultValue={item.season}
                            onFocus={() => setEditedItem(item.id)}
                            onBlur={(e) =>
                              handleUpdateInventoryField(
                                item,
                                "season",
                                e.target.value
                              )
                            }
                            className="text-gray-500 bg-transparent border-none w-full p-1 text-xs outline-none focus:ring-1 focus:bg-white rounded"
                            style={{
                              borderColor:
                                editedItem === item.id
                                  ? ACCENT_COLOR
                                  : "transparent",
                            }}
                          >
                            <option>Sommer</option>
                            <option>Winter</option>
                            <option>Ganzjahres</option>
                          </select>
                        </td>

                        {/* Zustand */}
                        <td className="p-4 text-sm">
                          <select
                            defaultValue={item.condition || "Neu"}
                            onFocus={() => setEditedItem(item.id)}
                            onBlur={(e) =>
                              handleUpdateInventoryField(
                                item,
                                "condition",
                                e.target.value
                              )
                            }
                            className="text-gray-800 bg-transparent border-none w-full p-1 focus:outline-none focus:ring-1 focus:bg-white rounded"
                            style={{
                              borderColor:
                                editedItem === item.id
                                  ? ACCENT_COLOR
                                  : "transparent",
                            }}
                          >
                            <option>Neu</option>
                            <option>Gebraucht - Sehr gut</option>
                            <option>Gebraucht - Gut</option>
                          </select>
                        </td>

                        {/* Preis */}
                        <td className="p-4 font-bold text-gray-800 text-sm">
                          <div className="flex items-center">
                            <input
                              type="number"
                              defaultValue={item.price}
                              onFocus={() => setEditedItem(item.id)}
                              onBlur={(e) =>
                                handleUpdateInventoryField(
                                  item,
                                  "price",
                                  e.target.value
                                )
                              }
                              className="w-20 p-1 border rounded text-right font-bold focus:outline-none focus:ring-1 focus:bg-white"
                              style={{
                                borderColor:
                                  editedItem === item.id
                                    ? ACCENT_COLOR
                                    : "transparent",
                                color: ACCENT_COLOR,
                              }}
                            />
                            <span className="ml-1">€</span>
                          </div>
                        </td>

                        {/* Bestand */}
                        <td className="p-4">
                          <input
                            type="number"
                            defaultValue={item.quantity}
                            onFocus={() => setEditedItem(item.id)}
                            onBlur={(e) =>
                              handleUpdateInventoryField(
                                item,
                                "quantity",
                                e.target.value
                              )
                            }
                            className={`w-16 p-1 border rounded text-center font-bold focus:outline-none focus:ring-1 ${
                              item.quantity < 4
                                ? "text-red-600 bg-red-50"
                                : "text-gray-800"
                            }`}
                            style={{
                              borderColor:
                                editedItem === item.id
                                  ? ACCENT_COLOR
                                  : "transparent",
                            }}
                          />
                        </td>

                        {/* Aktion */}
                        <td className="p-4 text-right">
                          <button
                            onClick={() => deleteInventoryItem(item.id)}
                            className="text-gray-400 hover:text-red-600 p-2 rounded-lg hover:bg-red-50"
                            title="Artikel löschen"
                          >
                            <Trash2 size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {filteredInventory.length === 0 && (
                <div className="p-12 text-center text-gray-400">
                  Keine Reifen gefunden, die zur Suche passen.
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>

      {/* MODAL ADD ITEM */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              className="bg-white rounded-xl p-8 w-full max-w-lg shadow-2xl"
            >
              <h3
                className="text-2xl font-bold mb-6"
                style={{ color: PRIMARY_COLOR }}
              >
                Neuen Reifen hinzufügen ➕
              </h3>
              <div className="space-y-4">
                <input
                  placeholder="Marke (z.B. Michelin)"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-opacity-50"
                  style={{ focusRingColor: ACCENT_COLOR }}
                  value={newItem.brand}
                  onChange={(e) =>
                    setNewItem({ ...newItem, brand: e.target.value })
                  }
                />
                <input
                  placeholder="Modell (z.B. Pilot Sport 4)"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-opacity-50"
                  style={{ focusRingColor: ACCENT_COLOR }}
                  value={newItem.model}
                  onChange={(e) =>
                    setNewItem({ ...newItem, model: e.target.value })
                  }
                />
                <div className="grid grid-cols-2 gap-3">
                  <input
                    placeholder="Größe (z.B. 205/55 R16)"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-opacity-50"
                    style={{ focusRingColor: ACCENT_COLOR }}
                    value={newItem.size}
                    onChange={(e) =>
                      setNewItem({ ...newItem, size: e.target.value })
                    }
                  />
                  <select
                    className="p-3 border border-gray-300 rounded-lg focus:ring focus:ring-opacity-50"
                    style={{ focusRingColor: ACCENT_COLOR }}
                    value={newItem.season}
                    onChange={(e) =>
                      setNewItem({ ...newItem, season: e.target.value })
                    }
                  >
                    <option>Sommer</option>
                    <option>Winter</option>
                    <option>Ganzjahres</option>
                  </select>
                  <select
                    className="p-3 border border-gray-300 rounded-lg focus:ring focus:ring-opacity-50"
                    style={{ focusRingColor: ACCENT_COLOR }}
                    value={newItem.condition}
                    onChange={(e) =>
                      setNewItem({ ...newItem, condition: e.target.value })
                    }
                  >
                    <option>Neu</option>
                    <option>Gebraucht - Sehr gut</option>
                    <option>Gebraucht - Gut</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="number"
                    placeholder="Preis (€ pro Stück)"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-opacity-50"
                    style={{ focusRingColor: ACCENT_COLOR }}
                    value={newItem.price}
                    onChange={(e) =>
                      setNewItem({ ...newItem, price: e.target.value })
                    }
                  />
                  <input
                    type="number"
                    placeholder="Menge (Stück)"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-opacity-50"
                    style={{ focusRingColor: ACCENT_COLOR }}
                    value={newItem.quantity}
                    onChange={(e) =>
                      setNewItem({ ...newItem, quantity: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="flex gap-3 mt-8 justify-end">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="px-6 py-3 text-gray-600 hover:bg-gray-100 rounded-xl font-medium transition-colors"
                >
                  Abbrechen
                </button>
                <button
                  onClick={addNewInventoryItem}
                  className="px-6 py-3 text-white rounded-xl font-bold transition-colors hover:opacity-90 shadow-lg"
                  style={{ backgroundColor: ACCENT_COLOR }}
                >
                  <Save size={18} className="inline mr-2" /> Speichern
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
