import React from "react";
import { useLocation } from "react-router-dom";

export default function SEO({ 
  title, 
  description, 
  keywords,
  image,
  type = "website"
}) {
  const location = useLocation();
  const baseUrl = window.location.origin;
  const currentUrl = `${baseUrl}${location.pathname}`;

  // Default values
  const defaultTitle = "M&M Reifenservice Essen | Schneller Reifenwechsel & Service";
  const defaultDescription = "Professioneller Reifenservice in Essen-Sulterkamp. Reifenwechsel in 30 Min ✓ Auswuchten ✓ Einlagerung ✓ Faire Preise ✓ Jetzt online Termin buchen!";
  const defaultKeywords = "Reifenwechsel Essen, Reifenservice Essen, Reifen Essen, Auswuchten Essen, Reifeneinlagerung Essen, Autowerkstatt Essen, M&M Reifenservice";
  const defaultImage = `${baseUrl}/logo.jpg`;

  const seoTitle = title || defaultTitle;
  const seoDescription = description || defaultDescription;
  const seoKeywords = keywords || defaultKeywords;
  const seoImage = image || defaultImage;

  React.useEffect(() => {
    // Set document title
    document.title = seoTitle;

    // Set or update meta tags
    const setMetaTag = (name, content, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      
      element.setAttribute('content', content);
    };

    // Standard meta tags
    setMetaTag('description', seoDescription);
    setMetaTag('keywords', seoKeywords);
    setMetaTag('author', 'M&M Reifenservice');
    setMetaTag('robots', 'index, follow');
    setMetaTag('language', 'German');
    setMetaTag('revisit-after', '7 days');

    // Open Graph tags
    setMetaTag('og:title', seoTitle, true);
    setMetaTag('og:description', seoDescription, true);
    setMetaTag('og:type', type, true);
    setMetaTag('og:url', currentUrl, true);
    setMetaTag('og:image', seoImage, true);
    setMetaTag('og:site_name', 'M&M Reifenservice', true);
    setMetaTag('og:locale', 'de_DE', true);

    // Twitter Card tags
    setMetaTag('twitter:card', 'summary_large_image');
    setMetaTag('twitter:title', seoTitle);
    setMetaTag('twitter:description', seoDescription);
    setMetaTag('twitter:image', seoImage);

    // Geo tags for local SEO
    setMetaTag('geo.region', 'DE-NW');
    setMetaTag('geo.placename', 'Essen');
    setMetaTag('geo.position', '51.455644;7.068838');
    setMetaTag('ICBM', '51.455644, 7.068838');

    // Set canonical link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', currentUrl);

  }, [seoTitle, seoDescription, seoKeywords, seoImage, currentUrl, type]);

  return null;
}

// SEO configurations for each page
export const pageSEO = {
  "/": {
    title: "M&M Reifenservice Essen | Schneller Reifenwechsel in 30 Min",
    description: "Professioneller Reifenservice in Essen-Sulterkamp ⭐ Reifenwechsel in unter 30 Min ✓ Auswuchten ✓ Reparatur ✓ Einlagerung ✓ Faire Preise ✓ Online Terminbuchung",
    keywords: "Reifenwechsel Essen, Reifenservice Essen Sulterkamp, schneller Reifenwechsel, Reifen Essen, Autowerkstatt Essen, M&M Reifenservice"
  },
  "/Services": {
    title: "Reifenservice Leistungen | M&M Reifenservice Essen",
    description: "Alle Reifenservices auf einen Blick: Reifenwechsel ab 15€ ✓ Auswuchten 20€ ✓ Reparatur ✓ Einlagerung ✓ Komplett-Check ✓ Professionell & günstig in Essen",
    keywords: "Reifenwechsel Preis Essen, Auswuchten Kosten, Reifenreparatur Essen, Reifeneinlagerung Essen, Reifenservice Preise"
  },
  "/TyreStock": {
    title: "Reifenbestand & Verfügbarkeit | M&M Reifenservice Essen",
    description: "Großer Reifenbestand in Essen ⭐ Sommerreifen ✓ Winterreifen ✓ Ganzjahresreifen ✓ Alle Größen ✓ Top Marken ✓ Sofort verfügbar ✓ Faire Preise",
    keywords: "Reifen kaufen Essen, Sommerreifen Essen, Winterreifen Essen, Reifenbestand, Reifen Lagerverkauf Essen"
  },
  "/Booking": {
    title: "Online Termin buchen | M&M Reifenservice Essen",
    description: "Jetzt online Termin buchen für Reifenwechsel in Essen ⏰ Schnelle Terminvergabe ✓ Flexible Zeiten ✓ Mo-Fr 8-18 Uhr ✓ Sa 9-15 Uhr ✓ Einfache Buchung",
    keywords: "Reifenwechsel Termin online buchen, Reifenservice Termin Essen, Werkstatt Terminbuchung Essen"
  },
  "/Team": {
    title: "Über uns - Ihr Reifenspezialist in Essen | M&M Reifenservice",
    description: "Erfahrenes Team mit langjähriger Expertise ⭐ Moderne Technik ✓ Zertifizierte Mechaniker ✓ Kundenservice ✓ Qualität & Sicherheit garantiert in Essen",
    keywords: "Reifenservice Essen Team, professionelle Autowerkstatt Essen, zertifizierte Mechaniker Essen, Qualität Reifenwechsel"
  },
  "/Contact": {
    title: "Kontakt & Anfahrt | M&M Reifenservice Essen-Sulterkamp",
    description: "M&M Reifenservice Essen ☎ +49 201 1234 5678 📍 Sulterkamp 58, 45356 Essen ⏰ Mo-Fr 8-18 Uhr, Sa 9-15 Uhr ✓ Kostenlose Parkplätze ✓ Gute Erreichbarkeit",
    keywords: "M&M Reifenservice Kontakt, Reifenservice Essen Adresse, Sulterkamp 58 Essen, Telefon Reifenwechsel Essen"
  },
  "/Sitemap": {
    title: "Sitemap - Alle Seiten im Überblick | M&M Reifenservice",
    description: "Übersicht aller Seiten von M&M Reifenservice Essen: Services, Buchung, Kontakt, Reifenbestand und mehr. Schnell finden, was Sie suchen.",
    keywords: "Sitemap M&M Reifenservice, Website Übersicht, Navigation Reifenservice Essen"
  },
  "/Impressum": {
    title: "Impressum | M&M Reifenservice Essen",
    description: "Impressum und rechtliche Angaben gemäß § 5 TMG von M&M Reifenservice, Sulterkamp 58, 45356 Essen. Kontakt und Haftungshinweise.",
    keywords: "Impressum M&M Reifenservice, Rechtliche Hinweise, Kontaktdaten"
  },
  "/Datenschutz": {
    title: "Datenschutzerklärung | M&M Reifenservice Essen",
    description: "Datenschutzerklärung von M&M Reifenservice Essen. Informationen zur Datenverarbeitung, Cookies, Kontaktformular und Ihren Rechten gemäß DSGVO.",
    keywords: "Datenschutz M&M Reifenservice, DSGVO, Datenschutzerklärung Essen"
  },
  "/AdminBookings": {
    title: "Admin Buchungsverwaltung | M&M Reifenservice",
    description: "Admin-Bereich zur Verwaltung von Buchungen und Terminen.",
    keywords: "Admin, Buchungsverwaltung, Terminverwaltung"
  }
};