// utils.js

/**
 * Erstellt die URL für eine Seite basierend auf dem Seitennamen.
 */
export const createPageUrl = (pageName) => {
  if (pageName === "Home") return "/";
  if (pageName === "AdminBookings") return "/admin/bookings";
  
  // Alle anderen Seiten verwenden den Seitennamen als Pfad
  return `/${pageName}`;
};