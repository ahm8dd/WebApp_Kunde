import React from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Phone, Mail, Instagram, MapPin, X, Menu } from "lucide-react";
import BookingModal from "@/components/BookingModal";
import SeoSchema from "@/components/SeoSchema";
import SEO, { pageSEO } from "@/components/SEO";
import LoadingScreen from "@/components/LoadingScreen";

// TikTok Icon Component
const TikTokIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

export default function Layout({ children, currentPageName }) {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isBookingOpen, setIsBookingOpen] = React.useState(false);
  const [initialService, setInitialService] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);

  // Get SEO data for current page
  const currentSEO = pageSEO[location.pathname] || pageSEO["/"];

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100); 
    };

    const scrollHandler = (e) => handleScroll();
    window.addEventListener('scroll', scrollHandler, { passive: true });

    const openBookingModal = () => {
      setInitialService(null);
      setIsBookingOpen(true);
    };
    
    const openBookingModalWithService = (event) => {
      setInitialService(event.detail.service);
      setIsBookingOpen(true);
    };

    window.addEventListener('open-booking-modal', openBookingModal);
    window.addEventListener('open-booking-modal-with-service', openBookingModalWithService);

    return () => {
      window.removeEventListener('scroll', scrollHandler);
      window.removeEventListener('open-booking-modal', openBookingModal);
      window.removeEventListener('open-booking-modal-with-service', openBookingModalWithService);
    };
  }, []);

  const handleLoadingComplete = React.useCallback(() => {
    setIsLoading(false);
  }, []);

  const handleCloseBookingModal = React.useCallback(() => {
    setIsBookingOpen(false);
    setInitialService(null);
  }, []);

  const navigationItems = React.useMemo(() => [
    { name: "Home", url: "/" },
    { name: "Services", url: createPageUrl("Services") },
    { name: "Reifenbestand", url: createPageUrl("TyreStock") },
    { name: "Termin buchen", url: createPageUrl("Booking") },
    { name: "Über uns", url: createPageUrl("Team") }
  ], []);

  const isAdminMode = React.useMemo(() => {
    return location.search.includes('admin=true') || 
           location.pathname.includes('admin') ||
           location.pathname.includes('AdminBookings') ||
           currentPageName === 'AdminBookings';
  }, [location.pathname, location.search, currentPageName]);

  const adminNavigationItems = React.useMemo(() => [
    ...navigationItems,
    ...(isAdminMode ? [{ name: "Admin Bookings", url: createPageUrl("AdminBookings") }] : [])
  ], [navigationItems, isAdminMode]);

  const currentNavItems = isAdminMode ? adminNavigationItems : navigationItems;

  if (isLoading) {
    return <LoadingScreen onLoadingComplete={handleLoadingComplete} />;
  }

  return (
    <div className="min-h-screen bg-white font-sans">
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
            ? 'bg-[#0e131f] shadow-lg border-b border-[#38405f]'
            : 'bg-[#0e131f]/90 md:bg-transparent md:backdrop-blur-sm'
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
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68e646aa23203e440181174d/01d013296_Artboard-7.jpg" 
                alt="M&M Reifenservice Logo" 
                className={`h-10 w-auto object-contain transition-all duration-300 ${
                  isScrolled ? 'brightness-100' : 'brightness-125'
                }`}
                style={{ imageRendering: 'crisp-edges' }}
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {currentNavItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.url}
                  className={`text-sm font-medium transition-all duration-300 hover:text-[#ff0035] ${
                    location.pathname === item.url 
                      ? 'text-[#ff0035] border-b-2 border-[#ff0035] pb-1'
                      : isScrolled ? 'text-white/90' : 'text-white'
                  }`}
                  aria-current={location.pathname === item.url ? 'page' : undefined}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden lg:block">
              <button 
                onClick={() => window.dispatchEvent(new CustomEvent('open-booking-modal'))}
                className="bg-[#ff0035] text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-[#d9002d] transition-all hover:scale-105 shadow-xl"
                aria-label="Online Termin buchen"
              >
                Jetzt buchen 
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="lg:hidden p-2 text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Menü schließen" : "Menü öffnen"}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>
      
      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-[#0e131f] z-40 flex flex-col items-center justify-center lg:hidden">
          <nav className="flex flex-col items-center gap-8" aria-label="Mobile Navigation">
            {currentNavItems.map((item) => (
              <Link
                key={item.name}
                to={item.url}
                onClick={() => setIsMenuOpen(false)}
                className={`text-2xl font-medium transition-colors hover:text-[#ff0035] ${
                  location.pathname === item.url ? 'text-[#ff0035]' : 'text-white'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <button 
              onClick={() => {
                setIsMenuOpen(false);
                window.dispatchEvent(new CustomEvent('open-booking-modal'));
              }}
              className="mt-8 bg-[#ff0035] text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-[#d9002d]"
            >
              Jetzt buchen
            </button>
          </nav>
        </div>
      )}

      {/* Main Content */}
      <main className="relative">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-[#0e131f] text-white border-t-8 border-[#ff0035]" role="contentinfo">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Brand */}
            <div>
              <div className="mb-6">
                <img 
                  src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68e646aa23203e440181174d/01d013296_Artboard-7.jpg" 
                  alt="M&M Reifenservice Logo" 
                  className="h-14 w-auto object-contain mb-4 filter brightness-125"
                />
              </div>
              <p className="text-sm text-[#8b939c] mb-6">
                Ihr Profi für schnellen, professionellen Reifenservice in Essen.
              </p>
              <div className="flex gap-4">
                <a 
                  href="https://instagram.com/mm_reifenservice" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-[#38405f] rounded-full flex items-center justify-center hover:bg-[#ff0035] transition-colors"
                  aria-label="Besuchen Sie uns auf Instagram"
                >
                  <Instagram className="w-5 h-5 text-white" />
                </a>
                <a 
                  href="https://tiktok.com/@mm_reifenservice" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-[#38405f] rounded-full flex items-center justify-center hover:bg-[#ff0035] transition-colors"
                  aria-label="Folgen Sie uns auf TikTok"
                >
                  <TikTokIcon className="w-5 h-5 text-white" />
                </a>
              </div>
            </div>

            {/* Navigation & Info Sections */}
            <div>
              <h3 className="text-lg font-semibold mb-6 text-white border-b border-[#38405f] pb-2">Unsere Services</h3>
              <ul className="space-y-3 text-sm">
                <li><Link to={createPageUrl("Services")} className="text-[#8b939c] hover:text-white transition-colors">Reifenwechsel</Link></li>
                <li><Link to={createPageUrl("Services")} className="text-[#8b939c] hover:text-white transition-colors">Auswuchten</Link></li>
                <li><Link to={createPageUrl("Services")} className="text-[#8b939c] hover:text-white transition-colors">Reparatur</Link></li>
                <li><Link to={createPageUrl("Services")} className="text-[#8b939c] hover:text-white transition-colors">Einlagerung</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-6 text-white border-b border-[#38405f] pb-2">Kontakt</h3>
              <address className="space-y-4 text-sm not-italic">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#ff0035] flex-shrink-0" />
                  <span className="text-[#8b939c]">Sulterkamp 58, 45356 Essen</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-[#ff0035]" />
                  <a href="tel:+4920112345678" className="text-[#8b939c] hover:text-[#ff0035] transition-colors">+49 201 1234 5678</a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-[#ff0035]" />
                  <a href="mailto:info@mm-reifen.de" className="text-[#8b939c] hover:text-[#ff0035] transition-colors">info@mm-reifen.de</a>
                </div>
              </address>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-6 text-white border-b border-[#38405f] pb-2">Öffnungszeiten</h3>
              <div className="space-y-2 text-sm text-[#8b939c]">
                <p>Mo - Fr: <span className="text-white">8:00 - 18:00 Uhr</span></p>
                <p>Sa: <span className="text-white">9:00 - 15:00 Uhr</span></p>
                <p className="text-[#ff0035] font-medium">So: Geschlossen</p>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 pt-8 border-t border-[#38405f] flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-[#8b939c]">
              © 2024 M&M Reifenservice. Alle Rechte vorbehalten.
            </p>
            <nav className="flex gap-6 text-sm" aria-label="Footer Navigation">
              <Link to={createPageUrl("Sitemap")} className="text-[#8b939c] hover:text-[#ff0035] transition-colors">Sitemap</Link>
              <Link to={createPageUrl("Datenschutz")} className="text-[#8b939c] hover:text-[#ff0035] transition-colors">Datenschutz</Link>
              <Link to={createPageUrl("Impressum")} className="text-[#8b939c] hover:text-[#ff0035] transition-colors">Impressum</Link>
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