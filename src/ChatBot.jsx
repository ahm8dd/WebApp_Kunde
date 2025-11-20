import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot } from "lucide-react";
// WICHTIG: Pfad muss stimmen. Wenn ChatBot.jsx im src Ordner ist und supabaseClient auch:
import { supabase } from "../supabaseClient";

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [inventoryContext, setInventoryContext] = useState(
    "Lade Bestandsdaten..."
  );

  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hallo! 👋 Ich bin der digitale Assistent von MM Reifendienst.\n\nIch kann dir sagen, ob wir deine Wunschreifen auf Lager haben oder Fragen zu Preisen beantworten.\n\nWie kann ich helfen?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // --- NEU: LIVE DATEN AUS SUPABASE LADEN ---
  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const { data, error } = await supabase
          .from("inventory")
          .select("*")
          .gt("quantity", 0); // Nur was wirklich da ist (> 0)

        if (error) throw error;

        if (!data || data.length === 0) {
          setInventoryContext("Aktuell keine Reifen im System gelistet.");
          return;
        }

        // Wir formatieren die Daten in einen lesbaren Text für die KI
        const stockList = data
          .map(
            (item) =>
              `- ${item.brand} ${item.model} (${item.size}, ${item.season}): ${item.quantity} Stück verfügbar, Preis: ${item.price}€`
          )
          .join("\n");

        setInventoryContext(stockList);
      } catch (err) {
        console.error("Fehler beim Laden des Inventars für Bot:", err);
        setInventoryContext("Reifenbestand konnte nicht geladen werden.");
      }
    };

    fetchInventory();
  }, []);

  // --- DAS GEHIRN (System Prompt mit Live-Daten) ---
  const getSystemPrompt = () => {
    return `Du bist der freundliche KI-Mitarbeiter von "MM Reifendienst" in Essen (Sulterkamp 58, Tel: 0201 25908194).

    DEINE WICHTIGSTE AUFGABE:
    Prüfe immer die unten stehende "LIVE-LAGERLISTE", wenn der Kunde nach Reifen fragt.
    - Wenn der Reifen da ist: Nenne Marke, Modell, Preis und Menge.
    - Wenn er NICHT da ist: Sag ehrlich, dass er nicht vorrätig ist, aber bestellt werden kann (Kunde soll anrufen).
    
    --- LIVE-LAGERLISTE (Aktueller Bestand aus der Datenbank) ---
    ${inventoryContext}
    -----------------------------------------------------------

    ALLGEMEINE PREISE (Dienstleistung):
    - Radwechsel: ab 20€
    - Montage Stahl: ab 12,50€ / Alu: ab 15,00€
    - Einlagerung: 30€/Saison
    
    REGELN:
    1. Du kannst KEINE Termine fest buchen. Bitte den Kunden, anzurufen oder das Kontaktformular zu nutzen.
    2. Antworte kurz und prägnant.
    3. Sei höflich und professionell ("Du" ist okay).
    
    Heute ist der: ${new Date().toLocaleDateString("de-DE")}`;
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputText,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setIsTyping(true);

    try {
      // 1. API Key aus .env holen
      const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
      if (!apiKey) throw new Error("API Key fehlt in .env Datei");

      // 2. Kontext aufbauen (System + letzte 4 Nachrichten für Gesprächsverlauf)
      const history = messages.slice(-4).map((msg) => ({
        role: msg.sender === "bot" ? "assistant" : "user",
        content: msg.text,
      }));

      const apiMessages = [
        { role: "system", content: getSystemPrompt() }, // Hier steckt jetzt das Live-Inventar drin!
        ...history,
        { role: "user", content: userMessage.text },
      ];

      // 3. Fetch Request an OpenAI
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo", // Schnell und günstig
            messages: apiMessages,
            temperature: 0.5, // Geringere Kreativität = präzisere Fakten zum Bestand
          }),
        }
      );

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error.message);
      }

      const botResponseText = data.choices[0].message.content;

      const botMessage = {
        id: Date.now() + 1,
        text: botResponseText,
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Chat error:", error);
      const errorMessage = {
        id: Date.now() + 1,
        text: "Entschuldigung, ich habe Verbindungsprobleme. 🔧 Bitte ruf uns direkt an: 0201 25908194",
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 bg-blue-600 text-white rounded-full shadow-2xl z-40 flex items-center justify-center transition-all duration-300 ${
          isOpen ? "scale-0" : "scale-100"
        } w-16 h-16`}
      >
        <MessageCircle className="w-8 h-8" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            className="fixed bottom-4 right-4 w-[calc(100%-2rem)] max-w-sm h-[500px] bg-white rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden border border-gray-200"
          >
            {/* Header */}
            <div className="bg-blue-700 text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bot className="w-6 h-6" />
                <div>
                  <h3 className="font-bold">MM Reifendienst</h3>
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                    <p className="text-xs opacity-90">Online & Verbunden</p>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="hover:bg-white/20 rounded-full p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Nachrichten */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] p-3 rounded-2xl text-sm whitespace-pre-wrap shadow-sm ${
                      message.sender === "user"
                        ? "bg-blue-600 text-white rounded-tr-none"
                        : "bg-white text-gray-800 border border-gray-100 rounded-tl-none"
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white p-3 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 border-t bg-white">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Frage nach Reifengröße..."
                  className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:border-blue-600 text-sm bg-gray-50"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputText.trim()}
                  className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-50 transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
