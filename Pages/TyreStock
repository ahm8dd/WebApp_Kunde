
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { TyreInventory } from "@/entities/TyreInventory";
import { Search, Filter, CheckCircle, AlertCircle, Package, Zap, Snowflake, Sun, Calendar } from "lucide-react";

const seasonIcons = {
  "Sommerreifen": Sun,
  "Winterreifen": Snowflake,
  "Ganzjahresreifen": Calendar
};

const seasonColors = {
  "Sommerreifen": "bg-yellow-100 text-yellow-800",
  "Winterreifen": "bg-blue-100 text-blue-800",
  "Ganzjahresreifen": "bg-green-100 text-green-800"
};

export default function TyreStock() {
  const [tyres, setTyres] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Renamed from loading to isLoading
  const [searchTerm, setSearchTerm] = useState("");
  const [seasonFilter, setSeasonFilter] = useState("all");
  const [conditionFilter, setConditionFilter] = useState("all");
  const [sortBy, setSortBy] = useState("brand");

  useEffect(() => {
    loadTyres();
  }, []);

  const loadTyres = async () => {
    try {
      const data = await TyreInventory.list("-created_date", 100);
      setTyres(data);
    } catch (error) {
      console.error("Fehler beim Laden der Reifen:", error);
    } finally {
      setIsLoading(false); // Updated usage
    }
  };

  const filteredTyres = tyres.filter(tyre => {
    const matchesSearch =
      tyre.brand?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tyre.model?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tyre.size?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesSeason = seasonFilter === "all" || tyre.season === seasonFilter;
    const matchesCondition = conditionFilter === "all" || tyre.condition === conditionFilter;

    return matchesSearch && matchesSeason && matchesCondition;
  });

  const sortedTyres = [...filteredTyres].sort((a, b) => {
    switch(sortBy) {
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

  if (isLoading) { // Updated usage
    return (
      <div className="pt-32 pb-24 bg-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#ff0035] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#8b939c]">Reifenbestand wird geladen...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-[#0e131f] mb-4">
            Unser Reifenbestand
          </h1>
          <p className="text-xl text-[#8b939c] max-w-3xl mx-auto">
            Durchsuchen Sie unseren aktuellen Reifenbestand
          </p>
        </motion.div>

        {/* Filters */}
        <div className="bg-[#59546c]/5 rounded-xl p-6 mb-8">
          <div className="grid lg:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Marke, Modell oder Größe..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#ff0035]"
              />
            </div>

            {/* Season Filter */}
            <select
              value={seasonFilter}
              onChange={(e) => setSeasonFilter(e.target.value)}
              className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#ff0035]"
            >
              <option value="all">Alle Saisons</option>
              <option value="Sommerreifen">Sommerreifen</option>
              <option value="Winterreifen">Winterreifen</option>
              <option value="Ganzjahresreifen">Ganzjahresreifen</option>
            </select>

            {/* Condition Filter */}
            <select
              value={conditionFilter}
              onChange={(e) => setConditionFilter(e.target.value)}
              className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#ff0035]"
            >
              <option value="all">Alle Zustände</option>
              <option value="Neu">Neu</option>
              <option value="Gebraucht - Sehr gut">Gebraucht - Sehr gut</option>
              <option value="Gebraucht - Gut">Gebraucht - Gut</option>
            </select>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#ff0035]"
            >
              <option value="brand">Sortieren: Marke</option>
              <option value="price-asc">Preis: Niedrig → Hoch</option>
              <option value="price-desc">Preis: Hoch → Niedrig</option>
              <option value="quantity">Verfügbarkeit</option>
            </select>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6 text-[#8b939c]">
          {sortedTyres.length} {sortedTyres.length === 1 ? 'Reifen' : 'Reifen'} gefunden
        </div>

        {/* Tyres Grid */}
        {sortedTyres.length === 0 ? (
          <div className="text-center py-16 bg-[#59546c]/5 rounded-xl">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-[#0e131f] mb-2">
              Keine Reifen gefunden
            </h3>
            <p className="text-[#8b939c]">
              Versuchen Sie, Ihre Filter anzupassen oder rufen Sie uns an: +49 201 1234 5678
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedTyres.map((tyre, index) => {
              const SeasonIcon = seasonIcons[tyre.season] || Calendar;
              const inStock = tyre.quantity > 0;

              return (
                <motion.div
                  key={tyre.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white rounded-xl border-2 border-gray-100 overflow-hidden hover:border-[#ff0035] hover:shadow-lg transition-all"
                >
                  {/* Image */}
                  <div className="h-48 bg-gray-100 flex items-center justify-center relative">
                    {tyre.image_url ? (
                      <img
                        src={tyre.image_url}
                        alt={`${tyre.brand} ${tyre.model}`}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Package className="w-16 h-16 text-gray-300" />
                    )}

                    {/* Stock Badge */}
                    <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-medium ${
                      inStock ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                    }`}>
                      {inStock ? `${tyre.quantity} verfügbar` : 'Ausverkauft'}
                    </div>
                  </div>

                  <div className="p-5">
                    {/* Brand & Model */}
                    <div className="mb-3">
                      <h3 className="text-xl font-bold text-[#0e131f]">
                        {tyre.brand}
                      </h3>
                      <p className="text-[#8b939c]">{tyre.model}</p>
                    </div>

                    {/* Size & Season */}
                    <div className="flex items-center gap-2 mb-3">
                      <span className="bg-[#ff0035]/10 text-[#ff0035] px-3 py-1 rounded-full text-sm font-medium">
                        {tyre.size}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${seasonColors[tyre.season]}`}>
                        <SeasonIcon className="w-3 h-3" />
                        {tyre.season}
                      </span>
                    </div>

                    {/* Condition */}
                    <div className="mb-3">
                      <span className="text-sm text-[#8b939c]">
                        Zustand: <strong>{tyre.condition}</strong>
                      </span>
                    </div>

                    {/* Features */}
                    {tyre.features && tyre.features.length > 0 && (
                      <div className="mb-4 space-y-1">
                        {tyre.features.slice(0, 3).map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-sm text-[#8b939c]">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* EU Labels */}
                    {(tyre.fuel_efficiency || tyre.wet_grip || tyre.noise_level) && (
                      <div className="mb-4 flex items-center gap-2 text-xs text-gray-500">
                        {tyre.fuel_efficiency && (
                          <span className="bg-green-100 text-green-700 px-2 py-1 rounded">
                            Kraftstoff: {tyre.fuel_efficiency}
                          </span>
                        )}
                        {tyre.wet_grip && (
                          <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded">
                            Nässe: {tyre.wet_grip}
                          </span>
                        )}
                        {tyre.noise_level && (
                          <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded">
                            {tyre.noise_level} dB
                          </span>
                        )}
                      </div>
                    )}

                    {/* Price & Action */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div>
                        <p className="text-2xl font-bold text-[#ff0035]">
                          {tyre.price}€
                        </p>
                        <p className="text-xs text-[#8b939c]">pro Reifen</p>
                      </div>
                      <button
                        onClick={() => window.dispatchEvent(new CustomEvent('open-booking-modal'))}
                        className="bg-[#ff0035] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#e6002f] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={!inStock}
                      >
                        {inStock ? 'Anfragen' : 'Nicht verfügbar'}
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Info Box - Nur Anrufen und Mail */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12 bg-[#ff0035] text-white rounded-xl p-8"
        >
          <div className="flex items-start gap-4">
            <AlertCircle className="w-6 h-6 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-xl font-bold mb-2">Reifen nicht dabei?</h3>
              <p className="mb-4">
                Wir können fast jeden Reifen innerhalb von 24-48 Stunden für Sie bestellen.
                Rufen Sie uns an oder schreiben Sie uns eine E-Mail.
              </p>
              <div className="flex gap-3">
                <a
                  href="tel:+4920112345678"
                  className="bg-white text-[#ff0035] px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                >
                  Jetzt anrufen
                </a>
                <a
                  href="mailto:info@mm-reifen.de"
                  className="bg-[#0e131f] text-white px-6 py-2 rounded-lg font-medium hover:bg-[#2a2f42] transition-colors"
                >
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
