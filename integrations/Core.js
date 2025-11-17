// integrations/Core.js (MOCK-INTEGRATION für ChatBot)

/**
 * Mock-Funktion zur Simulation der Base44 LLM (Large Language Model) Integration.
 */
export async function InvokeLLM({ prompt, add_context_from_internet }) {
  console.log("MOCK: InvokeLLM called. Returning generic response.");

  const mockResponse = `Hallo! Ich bin Serenity, Ihr KI-Assistent. 
  
Es tut mir leid, ich bin für ein Spa-Projekt konzipiert, aber ich kann Ihnen sagen, dass M&M Reifenservice in Essen schnellen und professionellen Service bietet. 
  
Bitte nutzen Sie das Buchungsformular für einen Termin oder rufen Sie uns direkt an: **+49 201 1234 5678**.`;
  
  return mockResponse;
}