import React from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Phone, Mail, Instagram, MapPin, X, Menu } from "lucide-react";
import BookingModal from "@/components/BookingModal";
import SeoSchema from "@/components/SeoSchema";
import SEO, { pageSEO } from "@/components/SEO";
import LoadingScreen from "@/components/LoadingScreen";
import LogoImg from "@/imgs/logo_weiss.png"; // Korrigierter Importpfad

// --- KONSTANTEN BASIEREND AUF GESPEICHERTEN DATEN & PALETTE ---
const ACCENT_COLOR = "#ff0035"; // Rot
const DARK_COLOR = "#0e131f";
const MEDIUM_BLUE = "#38405f"; // Dunkelgrau/Blau für Trennlinien/Hover
const BG_COLOR = "#8b939c"; // NEUER HINTERGRUND
const LIGHT_TEXT_COLOR = "#F0F0F0"; // NEUE TEXTFARBE für Lesbarkeit auf BG_COLOR
// ---------------------------------------------------------------

const BUSINESS_DATA = {
  phone: "0201 25908194",
  email: "info@mmreifenessen.de",
  address: "Sulterkamp 58, 45356 Essen",
  openingHours: {
    weekdays: "9:00 - 18:00 Uhr",
    saturday: "9:00 - 15:00 Uhr",
    sunday: "Geschlossen",
  },
};

// TikTok Icon Component
const TikTokIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
);

export default function Layout({ children, currentPageName }) {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isBookingOpen, setIsBookingOpen] = React.useState(false);
  const [initialService, setInitialService] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);

  const currentSEO = pageSEO[location.pathname] || pageSEO["/"];

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    const scrollHandler = (e) => handleScroll();
    window.addEventListener("scroll", scrollHandler, { passive: true });

    const openBookingModal = () => {
      setInitialService(null);
      setIsBookingOpen(true);
    };

    const openBookingModalWithService = (event) => {
      setInitialService(event.detail.service);
      setIsBookingOpen(true);
    };

    window.addEventListener("open-booking-modal", openBookingModal);
    window.addEventListener(
      "open-booking-modal-with-service",
      openBookingModalWithService
    );

    return () => {
      window.removeEventListener("scroll", scrollHandler);
      window.removeEventListener("open-booking-modal", openBookingModal);
      window.removeEventListener(
        "open-booking-modal-with-service",
        openBookingModalWithService
      );
    };
  }, []);

  const handleLoadingComplete = React.useCallback(() => {
    setIsLoading(false);
  }, []);

  const handleCloseBookingModal = React.useCallback(() => {
    setIsBookingOpen(false);
    setInitialService(null);
  }, []);

  const navigationItems = React.useMemo(
    () => [
      { name: "Home", url: "/" },
      { name: "Services", url: createPageUrl("Services") },
      { name: "Reifenbestand", url: createPageUrl("TyreStock") },
      { name: "Kontaktdaten", url: createPageUrl("Contact") },
      { name: "Über uns", url: createPageUrl("Team") },
    ],
    []
  );

  const isAdminMode = React.useMemo(() => {
    return (
      location.search.includes("admin=true") ||
      location.pathname.includes("admin") ||
      location.pathname.includes("AdminBookings") ||
      currentPageName === "AdminBookings"
    );
  }, [location.pathname, location.search, currentPageName]);

  const adminNavigationItems = React.useMemo(
    () => [
      ...navigationItems,
      ...(isAdminMode
        ? [{ name: "Admin Bookings", url: createPageUrl("AdminBookings") }]
        : []),
    ],
    [navigationItems, isAdminMode]
  );

  const currentNavItems = isAdminMode ? adminNavigationItems : navigationItems;

  if (isLoading) {
    return <LoadingScreen onLoadingComplete={handleLoadingComplete} />;
  }

  return (
    <div className="min-h-screen bg-white font-sans">
      <style jsx>{`
        :root {
          --primary-red: ${ACCENT_COLOR};
          --dark-blue: ${DARK_COLOR};
          --medium-blue: ${MEDIUM_BLUE};
          --light-gray: ${LIGHT_TEXT_COLOR};
        }

        @import url("https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap");

        * {
          box-sizing: border-box;
        }

        body {
          font-family: "Roboto", sans-serif;
          text-rendering: optimizeLegibility;
          -webkit-font-smoothing: antialiased;
          /* FIX: Hintergrundfarbe des gesamten Bodys auf das neue Grau setzen */
          background-color: ${BG_COLOR};
        }

        .glass-nav {
          backdrop-filter: blur(12px);
          background: ${DARK_COLOR}E6;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
        }

        .nav-transition {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>

      {/* SEO Components */}
      <SEO
        title={currentSEO.title}
        description={currentSEO.description}
        keywords={currentSEO.keywords}
      />
      <SeoSchema />

      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 py-3 transition-all duration-300 ${
          isScrolled
            ? "bg-[#0e131f] shadow-lg border-b border-[#38405f]"
            : "bg-[#0e131f] md:bg-[#0e131f]"
        }`}
        role="navigation"
        aria-label="Hauptnavigation"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo - FIXED: Much smaller size */}
            <Link
              to="/"
              className="flex items-center w-auto max-w-[120px]"
              aria-label="M&M Reifenservice - Zur Startseite"
            >
              <img
                src={LogoImg} // LOKALER IMPORT
                alt="M&M Reifenservice Logo"
                className={`h-10 w-auto object-contain transition-all duration-300 ${
                  isScrolled ? "brightness-100" : "brightness-125"
                }`}
                style={{ imageRendering: "crisp-edges" }}
              />
            </Link>

            {/* Desktop Navigation */}
            {/*<div className="hidden lg:flex items-center gap-8">
              {currentNavItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.url}
                  className={`text-sm font-medium px-3 py-2 transition-all duration-300 hover:text-[${ACCENT_COLOR}] ${
                    location.pathname === item.url
                      ? `text-[${ACCENT_COLOR}]`
                      : "text-white/90"
                  }`}
                  aria-current={
                    location.pathname === item.url ? "page" : undefined
                  }
                >
                  {item.name}
                </Link>
              ))}
            </div>/*}

            {/* CTA Button */}
            {/*<div className="hidden lg:block">
              <button
                onClick={() =>
                  window.dispatchEvent(new CustomEvent("open-booking-modal"))
                }
                className={`text-white px-6 py-3 rounded-lg text-sm font-semibold hover:bg-[#d9002d] transition-all hover:scale-105 shadow-lg`}
                style={{ backgroundColor: ACCENT_COLOR }}
                aria-label="Online Termin buchen"
              >
                Jetzt buchen
              </button>
              </div>*/}

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Menü schließen" : "Menü öffnen"}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div
          className={`fixed inset-0 z-40 flex flex-col items-center justify-center lg:hidden`}
          style={{ backgroundColor: DARK_COLOR }}
        >
          <nav
            className="flex flex-col items-center gap-8"
            aria-label="Mobile Navigation"
          >
            {currentNavItems.map((item) => (
              <Link
                key={item.name}
                to={item.url}
                onClick={() => setIsMenuOpen(false)}
                className={`text-2xl font-medium transition-colors hover:text-[${ACCENT_COLOR}] ${
                  location.pathname === item.url
                    ? `text-[${ACCENT_COLOR}]`
                    : "text-white"
                }`}
              >
                {item.name}
              </Link>
            ))}

            {/*<button
              onClick={() => {
                setIsMenuOpen(false);
                window.dispatchEvent(new CustomEvent("open-booking-modal"));
              }}
              className={`mt-8 text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-[#d9002d]`}
              style={{ backgroundColor: ACCENT_COLOR }}
            >
              Jetzt buchen
            </button>
            */}
          </nav>
        </div>
      )}

      {/* Main Content */}
      <main className="relative">{children}</main>

      {/* Footer */}
      <footer
        className="text-white"
        style={{ backgroundColor: DARK_COLOR }}
        role="contentinfo"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Brand */}
            <div>
              <div className="mb-6">
                <img
                  src={LogoImg} // LOKALER IMPORT
                  alt="M&M Reifenservice Logo"
                  className="h-14 w-auto object-contain mb-4 filter brightness-125"
                />
              </div>
              <p className={`text-sm mb-6`} style={{ color: LIGHT_TEXT_COLOR }}>
                Schneller, professioneller Reifenservice in Essen.
              </p>
              <div className="flex gap-4">
                <a
                  href="https://instagram.com/mmreifen"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-10 h-10 rounded-full flex items-center justify-center hover:bg-[#d9002d] transition-colors`}
                  style={{ backgroundColor: ACCENT_COLOR }}
                  aria-label="Besuchen Sie uns auf Instagram"
                >
                  <Instagram className="w-5 h-5 text-white" />
                </a>
                <a
                  href="https://tiktok.com/@mm.reifen"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-10 h-10 rounded-full flex items-center justify-center hover:bg-[#d9002d] transition-colors`}
                  style={{ backgroundColor: ACCENT_COLOR }}
                  aria-label="Folgen Sie uns auf TikTok"
                >
                  <TikTokIcon className="w-5 h-5 text-white" />
                </a>
              </div>
            </div>

            {/* Navigation & Info Sections */}
            <div>
              <h3
                className={`text-lg font-semibold mb-6`}
                style={{ color: ACCENT_COLOR }}
              >
                Unsere Services
              </h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link
                    to={createPageUrl("Services")}
                    className={`hover:text-[${ACCENT_COLOR}] transition-colors`}
                    style={{ color: LIGHT_TEXT_COLOR }}
                  >
                    Reifenwechsel
                  </Link>
                </li>
                <li>
                  <Link
                    to={createPageUrl("Services")}
                    className={`hover:text-[${ACCENT_COLOR}] transition-colors`}
                    style={{ color: LIGHT_TEXT_COLOR }}
                  >
                    Auswuchten
                  </Link>
                </li>
                <li>
                  <Link
                    to={createPageUrl("Services")}
                    className={`hover:text-[${ACCENT_COLOR}] transition-colors`}
                    style={{ color: LIGHT_TEXT_COLOR }}
                  >
                    Reparatur
                  </Link>
                </li>
                <li>
                  <Link
                    to={createPageUrl("Services")}
                    className={`hover:text-[${ACCENT_COLOR}] transition-colors`}
                    style={{ color: LIGHT_TEXT_COLOR }}
                  >
                    Einlagerung
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3
                className={`text-lg font-semibold mb-6`}
                style={{ color: ACCENT_COLOR }}
              >
                Kontakt
              </h3>
              <address className="space-y-4 text-sm not-italic">
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=M%26M+Reifenservice+Sulterkamp+Essen(
                    /\s/g,
                    "+"
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 hover:text-white transition-colors"
                >
                  <MapPin
                    className="w-5 h-5 flex-shrink-0"
                    style={{ color: ACCENT_COLOR }}
                  />
                  <span style={{ color: LIGHT_TEXT_COLOR }}>
                    {BUSINESS_DATA.address}
                  </span>
                </a>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5" style={{ color: ACCENT_COLOR }} />
                  <a
                    href={`tel:${BUSINESS_DATA.phone.replace(/\s/g, "")}`}
                    className={`hover:text-[${ACCENT_COLOR}] transition-colors`}
                    style={{ color: LIGHT_TEXT_COLOR }}
                  >
                    {BUSINESS_DATA.phone}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5" style={{ color: ACCENT_COLOR }} />
                  <a
                    href={`mailto:${BUSINESS_DATA.email}`}
                    className={`hover:text-[${ACCENT_COLOR}] transition-colors`}
                    style={{ color: LIGHT_TEXT_COLOR }}
                  >
                    {BUSINESS_DATA.email}
                  </a>
                </div>
              </address>
            </div>

            <div>
              <h3
                className={`text-lg font-semibold mb-6`}
                style={{ color: ACCENT_COLOR }}
              >
                Öffnungszeiten
              </h3>
              <div
                className="space-y-2 text-sm"
                style={{ color: LIGHT_TEXT_COLOR }}
              >
                <p>Mo - Fr: {BUSINESS_DATA.openingHours.weekdays}</p>
                <p>Sa: {BUSINESS_DATA.openingHours.saturday}</p>
                <p>So: {BUSINESS_DATA.openingHours.sunday}</p>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div
            className="mt-12 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4"
            style={{ borderColor: MEDIUM_BLUE }}
          >
            <p className="text-sm" style={{ color: LIGHT_TEXT_COLOR }}>
              {" "}
              © 2025 M&M Reifenservice. Alle Rechte vorbehalten.
            </p>
            <nav className="flex gap-6 text-sm" aria-label="Footer Navigation">
              <Link
                to={createPageUrl("Sitemap")}
                className={`hover:text-[${ACCENT_COLOR}] transition-colors`}
                style={{ color: LIGHT_TEXT_COLOR }}
              >
                Sitemap
              </Link>
              <Link
                to={createPageUrl("Datenschutz")}
                className={`hover:text-[${ACCENT_COLOR}] transition-colors`}
                style={{ color: LIGHT_TEXT_COLOR }}
              >
                Datenschutz
              </Link>
              <Link
                to={createPageUrl("Impressum")}
                className={`hover:text-[${ACCENT_COLOR}] transition-colors`}
                style={{ color: LIGHT_TEXT_COLOR }}
              >
                Impressum
              </Link>
            </nav>
          </div>
        </div>
      </footer>

      <BookingModal
        isOpen={isBookingOpen}
        onClose={handleCloseBookingModal}
        initialService={initialService}
      />
    </div>
  );
}
