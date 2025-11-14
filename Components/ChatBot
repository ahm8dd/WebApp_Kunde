
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Sparkles, Bot, User } from "lucide-react";
import { Appointment } from "@/entities/Appointment";
import { InvokeLLM } from "@/integrations/Core";

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm Serenity, your AI assistant at SERENITY Spa & Salon. I can help you with:\n\n🔹 Book appointments for any of our 42+ services\n🔹 Check service prices and details\n🔹 Find your existing bookings\n🔹 Get directions and contact info\n🔹 Learn about our organic treatments\n🔹 Answer wellness questions\n\nHow can I assist you today?",
      sender: "bot",
      timestamp: new Date()
    }
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

  const getSystemPrompt = async () => {
    // Get current appointments for context
    const recentAppointments = await Appointment.list("-created_date", 50);
    
    return `You are Serenity, an AI assistant for SERENITY Spa & Salon, Kolkata's premier luxury wellness destination specializing in organic spa treatments. You are friendly, professional, knowledgeable about wellness and beauty, and always helpful.

SERENITY Spa & Salon Information:
- Location: P-145, Sector A, Metropolitan Co-Operative Housing Society Limited, Tangra, Kolkata, West Bengal 700105
- Phone: +91 98765 43210
- Email: info@serenitysalon.in, serenitybycece@gmail.com
- Hours: 
  * Monday-Friday: 10:00 AM - 8:00 PM
  * Saturday: 9:00 AM - 7:00 PM  
  * Sunday: 10:00 AM - 6:00 PM
- Specializes in: 100% organic, chemical-free treatments using state-of-the-art equipment and highly skilled professionals

COMPLETE & UPDATED SERVICES MENU:

NAILS PRICE LIST:
- Gel polish: ₹500
- Soft Gel Extension: ₹1500
- Acrylic Extension: ₹1800
- Douyin Nail Extension: ₹2500 (starting)
- Nail Art Add-Ons: French Tip (+₹500), Ombré (+₹500), Chrome (+₹400), Custom Art (from ₹200)
- Gel Remove: ₹200
- Classic Care Manicure: ₹700
- Royal Korean Ritual Manicure: ₹1500
- Classic Care Pedicure: ₹1000
- Royal Korean Ritual Pedicure: ₹2000
- Royal Korean Ritual Duo (Mani + Pedi): ₹3000

LASH EXTENSION PRICE LIST:
- Classic Lash Extension: ₹2000
- Hybrid Lash Extension: ₹2200
- Wispy Lash Extension: ₹2200
- Volume Lashes: ₹2500
- Lash Lift: ₹1500

PERMANENT MAKEUP PRICE LIST:
- Microblading: ₹6000
- Microshading: ₹6000
- Combine Brows: ₹7000
- Brow Touch up: ₹4500
- Lip Neutralisation / Lip Blush: ₹5000
- Lip Touch up: ₹2500
- Permanent Eyeliner (Upper OR Lower): ₹5000
- Eyeliner Touch up (single): ₹2500
- Permanent Eyeliner (Upper & Lower): ₹9000
- Eyeliner Touch up (upper & lower): ₹4500

SKIN TREATMENTS:
- Hydra Facial: ₹2000
- Stayve Korean BBGlow: ₹2500
- Hydra & BBGlow Combo: ₹4000
- Cece’s Signature Facial: ₹3000

MASSAGE THERAPY:
- Swedish Massage: ₹2,500 (60 min)
- Japanese Head Spa: ₹3,500 (90 min)
- Thai Dry Massage: ₹3,000 (75 min)
- Foot Massage: ₹1,500 (45 min)
- Head and Shoulder Massage: ₹1,200 (30 min)
- Deep Tissue Massage: ₹3,500 (60 min)

LASER HAIR REMOVAL:
- Underarm Laser: ₹1,000 (30 min)
- Bikini Laser: ₹2,000 (45 min)
- Full Leg Laser: ₹2,000 (90 min)
- Half Leg Laser: ₹1,500 (60 min)
- Full Arm Laser: ₹1,500 (60 min)
- Full Face Laser: ₹1,500 (45 min)
- Full Body Laser: ₹12,999 (240 min)
...and more. Refer to main list for others like back, stomach, etc.

HAIR SERVICES:
- Women Hair Cut: ₹800 (60 min)
- Men Hair Cut: ₹500 (45 min)
- Hair Wash & Style: ₹700 (60 min)
- Hair Spa: ₹1,500 starting (90 min)
- Keratin Treatment: ₹3,000 starting (240 min)
- Hair Colouring: ₹3,500 starting (180 min)
- Hair Straightening: ₹3,000 starting (240 min)
...and more.

Recent Appointments Context (for reference when clients ask about existing bookings):
${recentAppointments.map(apt => `- ${apt.client_name} (${apt.email}, ${apt.phone}): ${apt.service} on ${apt.preferred_date} at ${apt.preferred_time} - Status: ${apt.status}`).join('\n')}

Your capabilities:
1. Help clients choose the right service based on their needs using the updated price list.
2. Provide detailed information about treatments, benefits, and pricing.
3. Guide clients through booking process (explain they'll need to use the booking form for final confirmation).
4. Help clients find their existing appointments using email or phone number.
5. Answer questions about organic treatments, spa policies, and wellness advice.
6. Provide directions and contact information
7. Explain the benefits of organic vs chemical treatments
8. Recommend service combinations for optimal results
9. Discuss aftercare and maintenance for treatments

Guidelines:
- Always use the NEW prices. Be very precise.
- For combo pricing (e.g., Gel polish with manicure), calculate it for the user (e.g., "A Classic Care Manicure is ₹700 and adding Gel Polish for ₹500 would make it a total of ₹1200.").
- Always be warm, professional, and spa-like in tone.
- Use emojis sparingly but effectively (✨, 🌿, 💆‍♀️, etc.).
- Promote the spa's organic, chemical-free philosophy.
- If you can't find specific information, suggest they call +91 98765 43210.
- If someone wants to book, guide them step-by-step but explain they'll need to use the booking form for final confirmation
- For existing appointment queries, search by email or phone number in the recent appointments
- Always mention that we're located in Kolkata when relevant
- Suggest service combinations when appropriate (e.g., Hair Spa + Hair Cut, Manicure + Pedicure)
- Explain the benefits of regular treatments for best results

Current date: ${new Date().toISOString().split('T')[0]}
Current time: ${new Date().toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata' })}

Remember: You represent a luxury spa brand, so maintain that premium, caring, and knowledgeable tone throughout all interactions.`;
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputText,
      sender: "user",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText("");
    setIsTyping(true);

    try {
      const systemPrompt = await getSystemPrompt();
      
      const response = await InvokeLLM({
        prompt: `${systemPrompt}

User message: ${inputText}

Please respond as Serenity, the AI assistant for SERENITY Spa & Salon. Be helpful, friendly, professional, and provide accurate information about services, appointments, and spa-related topics. Format your response nicely with line breaks where appropriate for better readability.`,
        add_context_from_internet: false
      });

      const botMessage = {
        id: Date.now() + 1,
        text: response,
        sender: "bot",
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage = {
        id: Date.now() + 1,
        text: "I apologize, but I'm experiencing technical difficulties. Please call us directly at +91 98765 43210 or visit our contact page for assistance. Our team will be happy to help you! ✨",
        sender: "bot",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 bg-gradient-to-r from-[#C8A882] to-[#FF5C8D] text-white rounded-full shadow-2xl z-40 flex items-center justify-center transition-all duration-300 ${isOpen ? 'scale-0' : 'scale-100'} w-16 h-16`}
        aria-label="Open AI chat assistant"
      >
        <MessageCircle className="w-6 h-6" />
        <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
          <Sparkles className="w-3 h-3 text-white" />
        </div>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-4 right-4 w-[calc(100%-2rem)] max-w-sm h-[75vh] sm:bottom-6 sm:right-6 sm:w-96 sm:h-[600px] bg-white rounded-3xl shadow-2xl z-50 flex flex-col overflow-hidden border border-[#C8A882]/20"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#C8A882] to-[#FF5C8D] text-white p-4 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center relative">
                  <Bot className="w-5 h-5" />
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold">Serenity AI</h3>
                  <p className="text-xs opacity-90">SERENITY Spa Assistant • Online</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                aria-label="Close chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start gap-2 max-w-[85%]`}>
                    {message.sender === 'bot' && (
                      <div className="w-8 h-8 rounded-full bg-[#FF5C8D] flex items-center justify-center flex-shrink-0">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                    )}
                    <div className={`p-3 rounded-2xl ${message.sender === 'user' ? 'bg-[#C8A882] text-white ml-2' : 'bg-gray-100 text-gray-800'}`}>
                      <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">{message.text}</p>
                      <p className={`text-xs mt-1 text-right ${message.sender === 'user' ? 'text-white/70' : 'text-gray-500'}`}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                    {message.sender === 'user' && (
                      <div className="w-8 h-8 rounded-full bg-[#C8A882] flex items-center justify-center flex-shrink-0">
                        <User className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
              
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="flex items-start gap-2">
                    <div className="w-8 h-8 rounded-full bg-[#FF5C8D] flex items-center justify-center">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div className="bg-gray-100 p-3 rounded-2xl">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions */}
            <div className="px-4 py-2 border-t border-gray-200 bg-gray-50">
              <div className="flex gap-2 mb-2 overflow-x-auto">
                <button
                  onClick={() => setInputText("I want to book an appointment")}
                  className="px-3 py-1 bg-[#C8A882] text-white text-xs rounded-full whitespace-nowrap hover:bg-[#FF5C8D] transition-colors"
                >
                  📅 Book Now
                </button>
                <button
                  onClick={() => setInputText("Show me your services and prices")}
                  className="px-3 py-1 bg-[#C8A882] text-white text-xs rounded-full whitespace-nowrap hover:bg-[#FF5C8D] transition-colors"
                >
                  💰 Prices
                </button>
                <button
                  onClick={() => setInputText("Where are you located?")}
                  className="px-3 py-1 bg-[#C8A882] text-white text-xs rounded-full whitespace-nowrap hover:bg-[#FF5C8D] transition-colors"
                >
                  📍 Location
                </button>
              </div>
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about services, booking, prices..."
                  className="flex-1 px-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:border-[#C8A882] transition-colors"
                  disabled={isTyping}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputText.trim() || isTyping}
                  className="w-10 h-10 bg-gradient-to-r from-[#C8A882] to-[#FF5C8D] text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Send message"
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
