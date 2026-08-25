import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bot, X, Send, User, MessageSquare } from 'lucide-react';
import { Country, allCountries } from '../../data/countriesList';

interface Message {
  id: string;
  text: string;
  sender: 'bot' | 'user';
  options?: string[];
  actionPayload?: any;
  actionType?: 'OPEN_MODAL' | 'LINK';
}

interface ChatbotProps {
  onOpenModal: (country: Country) => void;
}

export function Chatbot({ onOpenModal }: ChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      // Show when scrolled past 500px, similar to StickyMobileCTA
      setIsVisible(window.scrollY > 500);
    };
    
    // Check initial position
    handleScroll();
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('open-chatbot', handleOpen);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('open-chatbot', handleOpen);
    };
  }, []);

  // Initial greeting
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: '1',
          text: "Hello! I'm your VisaOVisa Assistant. How can I help you today?",
          sender: 'bot',
          options: ['Check Visa Requirements', 'Contact Support', 'Application Process']
        }
      ]);
    }
  }, [isOpen, messages.length]);

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = async (text: string) => {
    if (!text.trim()) return;

    // Add user message
    const userMsg: Message = { id: Date.now().toString(), text, sender: 'user' };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Simulate network delay
    setTimeout(() => {
      const response = generateBotResponse(text);
      setMessages(prev => [...prev, response]);
      setIsTyping(false);
    }, 800);
  };

  const generateBotResponse = (text: string): Message => {
    const lower = text.toLowerCase();
    
    // Check for explicit commands from quick options
    if (lower.includes('contact support') || lower.includes('contact') || lower.includes('phone')) {
      return {
        id: Date.now().toString(),
        text: 'You can reach us directly on WhatsApp or call us at +91 98730 05319 or +91 97172 48203. Our team is available Mon-Sat 10AM-7PM.',
        sender: 'bot',
        options: ['Check Visa Requirements']
      };
    }
    
    if (lower.includes('application process') || lower.includes('process') || lower.includes('time')) {
      return {
        id: Date.now().toString(),
        text: 'Our process is simple: 1. Free Consultation 2. Document Preparation 3. Application & Follow-up 4. Visa Delivered! Would you like to check specific requirements?',
        sender: 'bot',
        options: ['Check Visa Requirements']
      };
    }

    if (lower.includes('check visa requirements') || lower === 'visa' || lower === 'requirements') {
      return {
        id: Date.now().toString(),
        text: 'Which country are you planning to visit? (e.g. France, Japan, UAE)',
        sender: 'bot'
      };
    }

    // Keyword matching for countries
    for (const country of allCountries) {
      if (lower.includes(country.name.toLowerCase())) {
        return {
          id: Date.now().toString(),
          text: `Great! We process Tourist and Business visas for ${country.name}. Would you like to see the detailed checklist?`,
          sender: 'bot',
          options: [`View ${country.name} Requirements`],
          actionType: 'OPEN_MODAL',
          actionPayload: country
        };
      }
    }

    // General fallback
    return {
      id: Date.now().toString(),
      text: "I can help you with Visa requirements, processing times, and contact info. Just type a country name like 'Spain' or 'Thailand' to get started!",
      sender: 'bot',
      options: ['Check Visa Requirements', 'Contact Support']
    };
  };

  const handleOptionClick = (option: string, msg: Message) => {
    if (msg.actionType === 'OPEN_MODAL' && msg.actionPayload) {
      onOpenModal(msg.actionPayload);
      setIsOpen(false); // Optionally close chat when opening modal
      return;
    }
    handleSend(option);
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Floating Action Button */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        className={`fixed bottom-[11.5rem] right-6 z-50 md:bottom-48 md:right-8 group ${isOpen ? 'pointer-events-none' : ''}`}
      >
        {/* Tooltip */}
        <div className={`absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-white text-primary px-4 py-2 rounded-xl shadow-xl text-sm font-bold whitespace-nowrap transition-all duration-300 pointer-events-none ${isOpen ? 'opacity-0' : 'opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0'}`}>
          Chat with AI
          <div className="absolute right-[-5px] top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-white rotate-45 rounded-sm" />
        </div>

        <button
          onClick={() => setIsOpen(true)}
          className={`w-16 h-16 bg-[#0A1628] text-white rounded-full flex items-center justify-center hover:bg-[#1a2b4a] hover:-translate-y-1.5 hover:scale-105 transition-all duration-300 relative shadow-[0_8px_24px_rgba(10,22,40,0.5)] ${isOpen ? 'scale-0 opacity-0' : ''}`}
          aria-label="Open AI Assistant"
        >
          <MessageSquare className="w-7 h-7 drop-shadow-sm" />
        </button>
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[100] w-[90vw] max-w-[380px] h-[550px] max-h-[85vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-100"
          >
            {/* Header */}
            <div className="bg-[#0A1628] text-white px-5 py-4 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <Bot className="w-5 h-5 text-[#C9A84C]" />
                </div>
                <div>
                  <h3 className="font-bold text-sm">VisaOVisa Assistant</h3>
                  <p className="text-xs text-white/70">Online & ready to help</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-gray-50/50">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {msg.sender === 'bot' && (
                    <div className="w-6 h-6 bg-[#0A1628] rounded-full flex items-center justify-center mr-2 shrink-0 mt-1">
                      <Bot className="w-3.5 h-3.5 text-white" />
                    </div>
                  )}
                  
                  <div className="flex flex-col max-w-[80%] gap-2">
                    <div className={`px-4 py-2.5 rounded-2xl text-sm shadow-sm ${
                      msg.sender === 'user' 
                        ? 'bg-[#0A1628] text-white rounded-tr-sm' 
                        : 'bg-white text-gray-800 border border-gray-100 rounded-tl-sm'
                    }`}>
                      {msg.text}
                    </div>
                    
                    {/* Options (only for bot) */}
                    {msg.options && msg.options.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-1">
                        {msg.options.map((opt, i) => (
                          <button
                            key={i}
                            onClick={() => handleOptionClick(opt, msg)}
                            className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-colors text-left ${
                              msg.actionType === 'OPEN_MODAL' 
                                ? 'bg-[#C9A84C] border-[#C9A84C] text-[#0A1628] hover:bg-[#b59540]' 
                                : 'bg-white border-gray-200 text-gray-700 hover:border-[#0A1628] hover:text-[#0A1628]'
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="w-6 h-6 bg-[#0A1628] rounded-full flex items-center justify-center mr-2 shrink-0 mt-1">
                    <Bot className="w-3.5 h-3.5 text-white" />
                  </div>
                  <div className="bg-white border border-gray-100 px-4 py-3 rounded-2xl rounded-tl-sm flex items-center gap-1 shadow-sm">
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-gray-100 shrink-0">
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend(input);
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/50 focus:border-[#C9A84C] transition-all"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isTyping}
                  className="w-10 h-10 bg-[#0A1628] text-white rounded-xl flex items-center justify-center hover:bg-[#1a2b4a] disabled:opacity-50 disabled:hover:bg-[#0A1628] transition-colors shrink-0"
                >
                  <Send className="w-4 h-4 ml-[-2px]" />
                </button>
              </form>
              <div className="text-center mt-2">
                <span className="text-[10px] text-gray-400 font-medium tracking-wide">Powered by Static AI</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
