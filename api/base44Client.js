// api/base44Client.js (MOCK-API-Client)

// Dieses Objekt simuliert die von Base44 bereitgestellte Datenbank-API.
export const base44 = {
  entities: {
    // 1. Termine (Appointment)
    Appointment: {
      create: async (data) => {
        console.log("MOCK: Termin erstellt mit Daten:", data);
        return { 
            id: 'mock-12345678', 
            ...data, 
            created_date: new Date().toISOString() 
        };
      },
      list: async () => {
        console.log("MOCK: Terminliste geladen");
        return []; // Gibt ein leeres Array zurück
      },
      update: async (id, data) => {
        console.log(`MOCK: Termin ${id} aktualisiert`, data);
        return { id, ...data };
      },
    },
    
    // 2. Benachrichtigungen (BookingNotification)
    BookingNotification: {
      list: async () => {
        console.log("MOCK: Benachrichtigungsliste geladen");
        return [];
      },
      update: async (id, data) => {
        console.log(`MOCK: Benachrichtigung ${id} aktualisiert`, data);
        return { id, ...data };
      },
    },

    // 3. Reifenbestand (TyreInventory)
    TyreInventory: {
      list: async () => {
        console.log("MOCK: Reifenbestand geladen");
        return [];
      },
    }
  }
};