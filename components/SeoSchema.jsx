import React from 'react';

// This component injects advanced, SEO-friendly structured data for M&M Reifenservice
export default function SeoSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "AutomotiveBusiness",
        "@id": "https://www.mmreifenessen.de/#organization",
        "name": "M&M Reifenservice",
        "url": "https://www.mmreifenessen.de/",
        "logo": "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68e646aa23203e440181174d/01d013296_Artboard-7.jpg",
        "description": "Professioneller Reifenservice in Essen-Sulterkamp. Schneller Reifenwechsel in unter 30 Minuten, Auswuchten, Reparatur und Einlagerung zu fairen Preisen. Jetzt online Termin buchen!",
        "image": "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68e646aa23203e440181174d/01d013296_Artboard-7.jpg",
        "telephone": "0201 25908194",
        "email": "info@mmreifenessen.de",
        "priceRange": "€€",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Sulterkamp 58",
          "addressLocality": "Essen",
          "postalCode": "45356",
          "addressRegion": "Nordrhein-Westfalen",
          "addressCountry": "DE"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "51.455644",
          "longitude": "7.068838"
        },
        "openingHoursSpecification": [
          { 
            "@type": "OpeningHoursSpecification", 
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], 
            "opens": "09:00", // Geändert von 08:00
            "closes": "18:00" 
          },
          { 
            "@type": "OpeningHoursSpecification", 
            "dayOfWeek": "Saturday", 
            "opens": "09:00", 
            "closes": "15:00" 
          }
        ],
        "sameAs": [
          "https://www.instagram.com/mm_reifenservice",
          "https://www.tiktok.com/@mm_reifenservice"
        ],
        "areaServed": {
          "@type": "GeoCircle",
          "geoMidpoint": {
            "@type": "GeoCoordinates",
            "latitude": "51.455644",
            "longitude": "7.068838"
          },
          "geoRadius": "20000"
        },
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Reifenservice Leistungen",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Reifenwechsel",
                "description": "Schneller und professioneller Reifenwechsel für alle Fahrzeugtypen"
              },
              "price": "15",
              "priceCurrency": "EUR"
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Auswuchten",
                "description": "Präzises Auswuchten für alle Reifengrößen"
              },
              "price": "20",
              "priceCurrency": "EUR"
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Reifenreparatur",
                "description": "Professionelle Reparatur von Reifenschäden"
              },
              "price": "25",
              "priceCurrency": "EUR"
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Reifeneinlagerung",
                "description": "Sichere Lagerung Ihrer Saisonreifen"
              },
              "price": "5",
              "priceCurrency": "EUR"
            }
          ]
        }
      },
      {
        "@type": "WebSite",
        "@id": "https://www.mmreifenessen.de/#website",
        "url": "https://www.mmreifenessen.de/",
        "name": "M&M Reifenservice Essen",
        "publisher": { "@id": "https://www.mmreifenessen.de/#organization" },
        "inLanguage": "de-DE"
      },
      {
        "@type": "LocalBusiness",
        "name": "M&M Reifenservice",
        "image": "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68e646aa23203e440181174d/01d013296_Artboard-7.jpg",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Sulterkamp 58",
          "addressLocality": "Essen",
          "postalCode": "45356",
          "addressCountry": "DE"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "51.455644",
          "longitude": "7.068838"
        },
        "url": "https://www.mmreifenessen.de/",
        "telephone": "0201 25908194",
        "priceRange": "€€",
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            "opens": "09:00", // Geändert von 08:00
            "closes": "18:00"
          },
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": "Saturday",
            "opens": "09:00",
            "closes": "15:00"
          }
        ]
      },
      {
        "@type": "Review",
        "itemReviewed": { "@id": "https://www.mmreifenessen.de/#organization" },
        "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
        "author": { "@type": "Person", "name": "Anna M." },
        "reviewBody": "Super Service! Reifen in 20 Min gewechselt. Sehr empfehlenswert!"
      },
      {
        "@type": "Review",
        "itemReviewed": { "@id": "https://www.mmreifenessen.de/#organization" },
        "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
        "author": { "@type": "Person", "name": "Thomas K." },
        "reviewBody": "Günstig und zuverlässig. Beste Werkstatt in Sulterkamp."
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}