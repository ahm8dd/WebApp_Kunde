import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from "../supabaseClient";
import {
  Search,
  Package,
  CheckCircle,
  AlertCircle,
  Zap,
  Wind,
  Snowflake,
  Sun,
  Calendar,
  Phone,
  Mail,
  Tag, // Neu: Für Preis/Angebot
} from "lucide-react";

// --- KONSTANTEN ---
const ACCENT_COLOR = "#ff0035"; // Rot
const DARK_COLOR = "#0e131f";
const MEDIUM_COLOR = "#8b939c"; // Mittelgrau
const LIGHT_BG = "#59546c"; // Graublau
const BUSINESS_PHONE = "0201 25908194";
const BUSINESS_EMAIL = "info@mmreifenessen.de";

const seasonIcons = {
  Sommer: Sun,
  Winter: Snowflake,
  Ganzjahres: Calendar,
};

const seasonColors = {
  Sommer: "bg-yellow-100/50 text-yellow-800", // Farben für die Badges
  Winter: "bg-blue-100/50 text-blue-800",
  Ganzjahres: "bg-green-100/50 text-green-800",
};

export default function TyreStock() {
  const [tyres, setTyres] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [seasonFilter, setSeasonFilter] = useState("all");
  const [conditionFilter, setConditionFilter] = useState("all");
  const [sortBy, setSortBy] = useState("brand");

  useEffect(() => {
    loadTyres();
  }, []);

  // Behält die ursprüngliche Supabase-Ladelogik bei
  const loadTyres = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("inventory")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setTyres(data || []);
    } catch (error) {
      console.error("Fehler beim Laden der Reifen:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredTyres = tyres.filter((tyre) => {
    const matchesSearch =
      tyre.brand?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tyre.model?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tyre.size?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesSeason =
      seasonFilter === "all" || tyre.season === seasonFilter;
    const matchesCondition =
      conditionFilter === "all" || tyre.condition === conditionFilter;

    return matchesSearch && matchesSeason && matchesCondition;
  });

  const sortedTyres = [...filteredTyres].sort((a, b) => {
    switch (sortBy) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "brand":
        return (a.brand || "").localeCompare(b.brand || "");
      case "quantity":
        return b.quantity - a.quantity;
      default:
        return 0;
    }
  });

  if (isLoading) {
    return (
      <div className="pt-32 pb-24 bg-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div
            className="w-12 h-12 border-4 border-t-transparent rounded-full animate-spin mx-auto mb-4"
            style={{ borderColor: ACCENT_COLOR, borderTopColor: "transparent" }}
          ></div>
          <p style={{ color: MEDIUM_COLOR }}>Reifenbestand wird geladen...</p>
        </div>
      </div>
    );
  }

  // --- KOMPONENTE FÜR EINE EINZELNE REIFENKARTE (NEUES LAYOUT) ---
  const TyreCard = ({ tyre, index }) => {
    const SeasonIcon = seasonIcons[tyre.season] || Calendar;
    const inStock = tyre.quantity > 0;
    const isNew = tyre.condition === "Neu";

    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05 }}
        className={`bg-white rounded-xl shadow-lg p-6 border-2 transition-all 
                    ${
                      inStock
                        ? "border-gray-100 hover:border-[#ff0035]/50"
                        : "border-dashed border-gray-200 opacity-60"
                    }`}
      >
        {/* Top Section: Brand, Model, Badges */}
        <div className="flex justify-between items-start mb-4 border-b pb-4 border-gray-100">
          <div>
            <h3
              className="text-2xl font-bold mb-1"
              style={{ color: DARK_COLOR }}
            >
              {tyre.brand}
            </h3>
            <p className="text-lg" style={{ color: MEDIUM_COLOR }}>
              {tyre.model}
            </p>
          </div>
          <div className="flex flex-col items-end gap-1">
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${
                seasonColors[tyre.season]
              }`}
            >
              <SeasonIcon className="w-3 h-3" />
              {tyre.season}
            </span>
            {isNew && (
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 flex items-center gap-1">
                <Tag className="w-3 h-3" /> Neu
              </span>
            )}
          </div>
        </div>

        {/* Technical Details Grid */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-3 mb-6">
          <DetailItem title="Größe" value={tyre.size} />
          <DetailItem title="Zustand" value={tyre.condition} />

          {/* EU Labels, falls vorhanden */}
          {tyre.fuel_efficiency && (
            <DetailItem
              title="Kraftstoff"
              value={tyre.fuel_efficiency}
              icon={Zap}
            />
          )}
          {tyre.wet_grip && (
            <DetailItem title="Nässe" value={tyre.wet_grip} icon={Wind} />
          )}
          {tyre.noise_level && (
            <DetailItem title="Lautstärke" value={`${tyre.noise_level} dB`} />
          )}
        </div>

        {/* Bottom Section: Price & Action */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div>
            <p className="text-3xl font-extrabold" style={{ color: "GREEN" }}>
              {tyre.price}€
            </p>
            <p className="text-xs" style={{ color: MEDIUM_COLOR }}>
              pro Reifen
            </p>
          </div>

          <div className="text-right">
            <p
              className="text-sm font-semibold mb-1"
              style={{ color: inStock ? "green" : ACCENT_COLOR }}
            >
              {inStock ? `${tyre.quantity} Stück auf Lager` : "Ausverkauft"}
            </p>
            {inStock ? (
              <a
                href={`tel:${BUSINESS_PHONE.replace(/\s/g, "")}`}
                className={`text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors hover:bg-[#d9002d] flex items-center gap-1`}
                style={{ backgroundColor: ACCENT_COLOR }}
              >
                <Phone className="w-4 h-4" /> Jetzt anfragen
              </a>
            ) : (
              <button
                disabled
                className={`text-white px-4 py-2 rounded-lg text-sm font-medium opacity-50 cursor-not-allowed`}
                style={{ backgroundColor: DARK_COLOR }}
              >
                Kontakt aufnehmen
              </button>
            )}
          </div>
        </div>
      </motion.div>
    );
  };

  // Hilfskomponente für Details in der Card
  const DetailItem = ({ title, value, icon: Icon }) => (
    <div className="flex flex-col">
      <span
        className="text-xs font-medium uppercase"
        style={{ color: MEDIUM_COLOR }}
      >
        {title}
      </span>
      <span className="text-base font-semibold" style={{ color: DARK_COLOR }}>
        {Icon && (
          <Icon
            className="w-4 h-4 inline mr-1"
            style={{ color: ACCENT_COLOR }}
          />
        )}
        {value}
      </span>
    </div>
  );
  // -------------------------------------------------------------------------

  return (
    <div className="pt-32 pb-24 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold mb-4" style={{ color: DARK_COLOR }}>
            Unser aktueller Reifenbestand
          </h1>
          <p
            className="text-xl max-w-3xl mx-auto"
            style={{ color: MEDIUM_COLOR }}
          >
            Alle verfügbaren Markenreifen im Überblick. Kommen Sie ohne Termin
            zur Montage vorbei!
          </p>
        </motion.div>

        {/* Filters */}
        <div
          className={`rounded-xl p-6 mb-8 border border-gray-100 shadow-md`}
          style={{ backgroundColor: LIGHT_BG + "0F" }}
        >
          <div className="grid md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Marke, Modell oder Größe..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#ff0035] transition-colors"
              />
            </div>

            <select
              value={seasonFilter}
              onChange={(e) => setSeasonFilter(e.target.value)}
              className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none"
            >
              <option value="all">Alle Saisons</option>
              <option value="Sommer">Sommerreifen</option>
              <option value="Winter">Winterreifen</option>
              <option value="Ganzjahres">Ganzjahresreifen</option>
            </select>

            <select
              value={conditionFilter}
              onChange={(e) => setConditionFilter(e.target.value)}
              className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none"
            >
              <option value="all">Alle Zustände</option>
              <option value="Neu">Neu</option>
              <option value="Gebraucht - Sehr gut">Gebraucht - Sehr gut</option>
              <option value="Gebraucht - Gut">Gebraucht - Gut</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none"
            >
              <option value="brand">Sortieren: Marke</option>
              <option value="price-asc">Preis: Niedrig → Hoch</option>
              <option value="price-desc">Preis: Hoch → Niedrig</option>
              <option value="quantity">Verfügbarkeit</option>
            </select>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6" style={{ color: MEDIUM_COLOR }}>
          {sortedTyres.length} {sortedTyres.length === 1 ? "Reifen" : "Reifen"}
          gefunden
        </div>

        {/* Tyres Grid (Kartenansicht) */}
        {sortedTyres.length === 0 ? (
          <div
            className={`text-center py-16 rounded-xl border-2 border-dashed border-gray-200`}
            style={{ backgroundColor: LIGHT_BG + "0F" }}
          >
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3
              className="text-xl font-semibold mb-2"
              style={{ color: DARK_COLOR }}
            >
              Keine Reifen gefunden
            </h3>
            <p style={{ color: MEDIUM_COLOR }}>
              Versuchen Sie, Ihre Filter anzupassen oder rufen Sie uns an:{" "}
              <a
                href={`tel:${BUSINESS_PHONE.replace(/\s/g, "")}`}
                className="font-medium"
                style={{ color: ACCENT_COLOR }}
              >
                {BUSINESS_PHONE}
              </a>
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedTyres.map((tyre, index) => (
              <TyreCard key={tyre.id} tyre={tyre} index={index} />
            ))}
          </div>
        )}

        {/* Info Box */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className={`mt-12 text-white rounded-xl p-8 shadow-2xl`}
          style={{ backgroundColor: ACCENT_COLOR }}
        >
          <div className="flex items-start gap-4">
            <AlertCircle className="w-6 h-6 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-xl font-bold mb-2">
                Ihre Wunschreifen nicht dabei?
              </h3>
              <p className="mb-4">
                Wir können fast jeden Reifen innerhalb von 24-48 Stunden für Sie
                bestellen. Kommen Sie einfach zur Montage ohne Termin vorbei,
                sobald die Reifen geliefert sind!
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={`tel:${BUSINESS_PHONE.replace(/\s/g, "")}`}
                  className={`bg-white px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors flex items-center justify-center gap-2`}
                  style={{ color: ACCENT_COLOR }}
                >
                  <Phone className="w-4 h-4" />
                  Jetzt anrufen
                </a>
                <a
                  href={`mailto:${BUSINESS_EMAIL}`}
                  className={`px-6 py-2 rounded-lg font-medium hover:bg-[#4d5678] transition-colors flex items-center justify-center gap-2`}
                  style={{ backgroundColor: DARK_COLOR }}
                >
                  <Mail className="w-4 h-4" />
                  E-Mail schreiben
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
