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
  const [activeTab, setActiveTab] = useState("bookings"); // 'bookings' oder 'inventory'
  const [appointments, setAppointments] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  // Auth
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");

  // Inventory Modal
  const [showAddModal, setShowAddModal] = useState(false);
  const [newItem, setNewItem] = useState({
    brand: "",
    model: "",
    size: "",
    season: "Sommer",
    price: "",
    quantity: 4,
  });

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
    try {
      // Bookings
      const { data: bookingsData, error: bookingsError } = await supabase
        .from("bookings")
        .select("*")
        .order("created_at", { ascending: false });
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
      await supabase
        .from("bookings")
        .update({ status: newStatus })
        .eq("id", booking.id);

      // 2. Update UI
      setAppointments((prev) =>
        prev.map((a) => (a.id === booking.id ? { ...a, status: newStatus } : a))
      );

      // 3. Open Mail
      openMailClient(booking, actionType);
    } catch (error) {
      alert(error.message);
    }
  };

  const openMailClient = (booking, type) => {
    if (!booking.email) return alert("Keine Email!");
    const dateStr = formatDate(booking.requested_date);
    let subject = "",
      body = "";

    if (type === "confirm") {
      subject = `✅ Terminbestätigung: MM Reifendienst am ${dateStr}`;
      body = `Hallo ${booking.client_name},\n\nwir bestätigen hiermit Ihren Termin am ${dateStr} um ${booking.requested_time} Uhr für ${booking.service}.\n\nOrt: Sulterkamp 58, Essen.\n\nBitte seien Sie pünktlich.\n\nMit freundlichen Grüßen,\nMM Reifendienst`;
    } else {
      subject = `Info zu Ihrer Terminanfrage`;
      body = `Hallo ${booking.client_name},\n\nleider können wir den Termin am ${dateStr} nicht bestätigen. Bitte rufen Sie uns unter 0201 25908194 an.\n\nMit freundlichen Grüßen,\nMM Reifendienst`;
    }
    window.location.href = `mailto:${
      booking.email
    }?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  // --- LOGIK: INVENTORY ---
  const updateStock = async (id, val) => {
    await supabase
      .from("inventory")
      .update({ quantity: parseInt(val) })
      .eq("id", id);
  };
  const deleteInventoryItem = async (id) => {
    if (!window.confirm("Löschen?")) return;
    await supabase.from("inventory").delete().eq("id", id);
    setInventory((prev) => prev.filter((i) => i.id !== id));
  };
  const addNewInventoryItem = async () => {
    await supabase.from("inventory").insert([newItem]);
    setShowAddModal(false);
    loadData();
    setNewItem({
      brand: "",
      model: "",
      size: "",
      season: "Sommer",
      price: "",
      quantity: 4,
    });
  };

  // --- HELPER ---
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      return new Date(dateString).toLocaleDateString("de-DE", {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
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
      (appointment.service || "").toLowerCase().includes(searchL);
    const matchesDate =
      !dateFilter || appointment.requested_date === dateFilter;
    return matchesStatus && matchesSearch && matchesDate;
  });

  const pendingCount = appointments.filter(
    (a) => a.status === "pending"
  ).length;

  // CSV Export
  const exportToCSV = () => {
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
        <div className="bg-white p-8 rounded-xl shadow-lg w-96">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
            MM Admin Login
          </h2>
          <input
            type="password"
            className="w-full p-3 border border-gray-300 rounded mb-4"
            placeholder="Passwort"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && checkLogin()}
          />
          <button
            onClick={checkLogin}
            className="w-full text-white p-3 rounded font-bold"
            style={{ backgroundColor: ACCENT_COLOR }}
          >
            Anmelden
          </button>
        </div>
      </div>
    );
  }

  // --- DASHBOARD LAYOUT (DEIN DESIGN) ---
  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-10 px-4">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <Car className="w-8 h-8" style={{ color: ACCENT_COLOR }} />
            <div>
              <h1 className="text-3xl font-serif font-bold text-[#0F0F0F]">
                M&M Reifenservice Admin
              </h1>
              <p className="text-gray-600">Buchungsverwaltung & Lager</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* TABS SCHALTER */}
            <div className="bg-white p-1 rounded-lg shadow-sm border border-gray-200 flex">
              <button
                onClick={() => setActiveTab("bookings")}
                className={`px-4 py-2 rounded-md font-medium transition-colors ${
                  activeTab === "bookings"
                    ? "bg-gray-100 text-gray-900"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Termine
              </button>
              <button
                onClick={() => setActiveTab("inventory")}
                className={`px-4 py-2 rounded-md font-medium transition-colors ${
                  activeTab === "inventory"
                    ? "bg-gray-100 text-gray-900"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Lager
              </button>
            </div>

            <button
              onClick={loadData}
              className="p-2 bg-white rounded-lg shadow-sm hover:bg-gray-50 text-gray-600"
              title="Aktualisieren"
            >
              <RefreshCw
                className={`w-5 h-5 ${loading ? "animate-spin" : ""}`}
              />
            </button>
            <button
              onClick={() => setIsAuthenticated(false)}
              className="bg-red-50 text-red-600 p-2 rounded-lg hover:bg-red-100"
              title="Abmelden"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>

        {/* --- TAB: BOOKINGS --- */}
        {activeTab === "bookings" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {/* STATS CARDS (DEIN DESIGN) */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-100">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3"
                  style={{ backgroundColor: LIGHT_BG_COLOR }}
                >
                  <Calendar
                    className="w-6 h-6"
                    style={{ color: PRIMARY_COLOR }}
                  />
                </div>
                <p
                  className="text-2xl font-bold"
                  style={{ color: PRIMARY_COLOR }}
                >
                  {appointments.length}
                </p>
                <p className="text-sm text-gray-500">Gesamtbuchungen</p>
              </div>
              <div className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-100">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <AlertCircle className="w-6 h-6 text-yellow-600" />
                </div>
                <p className="text-2xl font-bold text-yellow-600">
                  {pendingCount}
                </p>
                <p className="text-sm text-gray-500">Offene Anfragen</p>
              </div>
              <div className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-100">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <p className="text-2xl font-bold text-green-600">
                  {appointments.filter((a) => a.status === "confirmed").length}
                </p>
                <p className="text-sm text-gray-500">Bestätigt</p>
              </div>
              <div className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-100">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3"
                  style={{ backgroundColor: LIGHT_BG_COLOR }}
                >
                  <Euro className="w-6 h-6" style={{ color: ACCENT_COLOR }} />
                </div>
                <p
                  className="text-2xl font-bold"
                  style={{ color: ACCENT_COLOR }}
                >
                  {formatCurrency(
                    appointments.reduce(
                      (sum, apt) => sum + (Number(apt.service_price) || 0),
                      0
                    )
                  )}
                </p>
                <p className="text-sm text-gray-500">Gesamtumsatz (Est.)</p>
              </div>
            </div>

            {/* BENACHRICHTIGUNGEN (Pending Appointments) */}
            {pendingCount > 0 && (
              <div className="bg-orange-50 border border-orange-200 rounded-2xl p-6 mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <Bell className="w-6 h-6 text-orange-600" />
                  <h3 className="font-bold text-orange-800">
                    {pendingCount} neue Anfrage(n) zu bearbeiten
                  </h3>
                </div>
                <div className="space-y-3">
                  {appointments
                    .filter((a) => a.status === "pending")
                    .map((apt) => (
                      <div
                        key={apt.id}
                        className="bg-white rounded-xl p-4 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
                      >
                        <div>
                          <p className="font-bold text-gray-900">
                            {apt.client_name}{" "}
                            <span className="font-normal text-gray-500">
                              möchte
                            </span>{" "}
                            {apt.service}
                          </p>
                          <p className="text-sm text-gray-500">
                            {formatDate(apt.requested_date)} um{" "}
                            {apt.requested_time} Uhr • {apt.phone}
                          </p>
                          {apt.message && (
                            <p className="text-xs text-gray-400 italic mt-1">
                              "{apt.message}"
                            </p>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleProcessBooking(apt, "cancel")}
                            className="flex items-center gap-1 px-3 py-2 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg text-sm font-medium transition-colors"
                          >
                            <XCircle size={16} /> Ablehnen & Mail
                          </button>
                          <button
                            onClick={() => handleProcessBooking(apt, "confirm")}
                            className="flex items-center gap-1 px-4 py-2 bg-green-600 text-white hover:bg-green-700 rounded-lg text-sm font-bold shadow-sm transition-colors"
                          >
                            <CheckCircle size={16} /> Bestätigen & Mail
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* FILTER & LISTE (DEIN DESIGN) */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <div className="flex flex-col lg:flex-row gap-4 items-center justify-between mb-6">
                <div className="flex gap-4 flex-1 w-full">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Suche..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#ff0035]"
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
                  className="flex items-center gap-2 text-white px-6 py-3 rounded-xl font-medium transition-colors"
                  style={{ backgroundColor: PRIMARY_COLOR }}
                >
                  <Download className="w-5 h-5" /> Export CSV
                </button>
              </div>

              {/* DEINE TABLE STRUKTUR */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="p-4 text-sm font-semibold text-gray-600">
                        Datum
                      </th>
                      <th className="p-4 text-sm font-semibold text-gray-600">
                        Kunde
                      </th>
                      <th className="p-4 text-sm font-semibold text-gray-600">
                        Service
                      </th>
                      <th className="p-4 text-sm font-semibold text-gray-600">
                        Kontakt
                      </th>
                      <th className="p-4 text-sm font-semibold text-gray-600">
                        Status
                      </th>
                      <th className="p-4 text-sm font-semibold text-gray-600 text-right">
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
                          <div className="font-bold text-gray-800">
                            {formatDate(booking.requested_date)}
                          </div>
                          <div className="text-sm text-gray-500 flex items-center gap-1">
                            <Clock size={12} /> {booking.requested_time}
                          </div>
                        </td>
                        <td className="p-4 font-medium text-gray-800">
                          {booking.client_name}
                        </td>
                        <td className="p-4 text-gray-600">{booking.service}</td>
                        <td className="p-4 text-sm">
                          <div className="font-medium">{booking.phone}</div>
                          <div className="text-gray-500">{booking.email}</div>
                        </td>
                        <td className="p-4">
                          <span
                            className={`px-2 py-1 rounded text-xs font-bold border ${
                              statusColors[booking.status] ||
                              statusColors.pending
                            }`}
                          >
                            {booking.status === "pending"
                              ? "Offen"
                              : booking.status === "confirmed"
                              ? "Bestätigt"
                              : booking.status}
                          </span>
                        </td>
                        <td className="p-4 text-right flex justify-end gap-2">
                          {/* MAIL BUTTON */}
                          <button
                            onClick={() => openMailClient(booking, "confirm")}
                            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded"
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
                                className="p-2 bg-green-100 text-green-600 rounded hover:bg-green-200"
                                title="Bestätigen & Mail"
                              >
                                <CheckCircle size={18} />
                              </button>
                              <button
                                onClick={() =>
                                  handleProcessBooking(booking, "cancel")
                                }
                                className="p-2 bg-red-100 text-red-600 rounded hover:bg-red-200"
                                title="Absagen & Mail"
                              >
                                <XCircle size={18} />
                              </button>
                            </>
                          )}
                          {booking.status === "confirmed" && (
                            <button
                              onClick={() =>
                                handleProcessBooking(booking, "cancel")
                              }
                              className="p-2 text-gray-400 hover:text-red-600"
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
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-4 border-b flex justify-between items-center bg-gray-50">
                <div className="relative w-full max-w-xs">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Reifen suchen..."
                    className="pl-9 pr-4 py-2 w-full border rounded-lg text-sm"
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <button
                  onClick={() => setShowAddModal(true)}
                  className="bg-[#ff0035] text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2"
                >
                  <Plus size={16} /> Neu
                </button>
              </div>
              <table className="w-full text-left">
                <thead className="bg-gray-100 border-b">
                  <tr>
                    <th className="p-4 text-sm font-semibold text-gray-600">
                      Reifen
                    </th>
                    <th className="p-4 text-sm font-semibold text-gray-600">
                      Größe
                    </th>
                    <th className="p-4 text-sm font-semibold text-gray-600">
                      Bestand
                    </th>
                    <th className="p-4 text-sm font-semibold text-gray-600">
                      Preis
                    </th>
                    <th className="p-4 text-right"></th>
                  </tr>
                </thead>
                <tbody>
                  {inventory
                    .filter((i) =>
                      (i.brand || "")
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())
                    )
                    .map((item) => (
                      <tr key={item.id} className="border-b hover:bg-gray-50">
                        <td className="p-4">
                          <div className="font-bold text-gray-800">
                            {item.brand}
                          </div>
                          <div className="text-sm text-gray-500">
                            {item.model}
                          </div>
                        </td>
                        <td className="p-4 text-sm">
                          {item.size}{" "}
                          <span className="text-gray-400">({item.season})</span>
                        </td>
                        <td className="p-4">
                          <input
                            type="number"
                            defaultValue={item.quantity}
                            onBlur={(e) => updateStock(item.id, e.target.value)}
                            className={`w-16 p-1 border rounded text-center font-bold ${
                              item.quantity < 4
                                ? "text-red-500 bg-red-50"
                                : "text-gray-800"
                            }`}
                          />
                        </td>
                        <td className="p-4 font-bold text-gray-800">
                          {formatCurrency(item.price)}
                        </td>
                        <td className="p-4 text-right">
                          <button
                            onClick={() => deleteInventoryItem(item.id)}
                            className="text-gray-400 hover:text-red-600 p-2"
                          >
                            <Trash2 size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
              {inventory.length === 0 && (
                <div className="p-12 text-center text-gray-400">
                  Keine Reifen im Bestand.
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>

      {/* MODAL ADD ITEM */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-2xl">
            <h3 className="text-xl font-bold mb-4 text-gray-900">
              Neuen Reifen hinzufügen
            </h3>
            <div className="space-y-3">
              <input
                placeholder="Marke"
                className="w-full p-2 border rounded"
                value={newItem.brand}
                onChange={(e) =>
                  setNewItem({ ...newItem, brand: e.target.value })
                }
              />
              <input
                placeholder="Modell"
                className="w-full p-2 border rounded"
                value={newItem.model}
                onChange={(e) =>
                  setNewItem({ ...newItem, model: e.target.value })
                }
              />
              <div className="flex gap-2">
                <input
                  placeholder="Größe"
                  className="w-full p-2 border rounded"
                  value={newItem.size}
                  onChange={(e) =>
                    setNewItem({ ...newItem, size: e.target.value })
                  }
                />
                <select
                  className="p-2 border rounded"
                  value={newItem.season}
                  onChange={(e) =>
                    setNewItem({ ...newItem, season: e.target.value })
                  }
                >
                  <option>Sommer</option>
                  <option>Winter</option>
                  <option>Ganzjahres</option>
                </select>
              </div>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Preis"
                  className="w-full p-2 border rounded"
                  value={newItem.price}
                  onChange={(e) =>
                    setNewItem({ ...newItem, price: e.target.value })
                  }
                />
                <input
                  type="number"
                  placeholder="Menge"
                  className="w-full p-2 border rounded"
                  value={newItem.quantity}
                  onChange={(e) =>
                    setNewItem({ ...newItem, quantity: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="flex gap-2 mt-6 justify-end">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
              >
                Abbrechen
              </button>
              <button
                onClick={addNewInventoryItem}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Speichern
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
