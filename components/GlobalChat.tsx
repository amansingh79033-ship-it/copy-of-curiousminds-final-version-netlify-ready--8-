
import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles, Volume2, Loader2 } from 'lucide-react';
import { globalChatResponse, generateSpeech } from '../services/geminiService';
import { ChatMessage, UserProfile } from '../types';
import { mockBackend } from '../services/mockBackend';

interface GlobalChatProps {
  currentUser: UserProfile | null;
}

const GlobalChat: React.FC<GlobalChatProps> = ({ currentUser }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [history, setHistory] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [leadCaptured, setLeadCaptured] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [history, isOpen, loading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;
    
    const userMsg = input;
    setInput('');
    setHistory(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    // Lead Capsule Implementation: Capture on first question for non-admins
    if (!leadCaptured && (!currentUser || currentUser.role === 'VISITOR' || currentUser.role === 'JOINED')) {
        const userId = currentUser?.id || mockBackend.getCurrentSessionId();
        const userIp = currentUser?.ip || "unknown";
        const userLoc = currentUser?.location || { city: 'Unknown', country: 'Global', lat: 0, lng: 0, flag: '🌐' };
        const device = currentUser?.device || (navigator.userAgent.includes('Mobile') ? 'Mobile' : 'Desktop');

        mockBackend.captureLead({
            userId,
            name: currentUser?.name || 'Anonymous Visitor',
            email: currentUser?.email || 'unassigned@lead.internal',
            firstQuery: userMsg,
            location: userLoc,
            device,
            ip: userIp
        });
        setLeadCaptured(true);
    }

    try {
      const response = await globalChatResponse(userMsg, history);
      setHistory(prev => [...prev, { role: 'model', text: response || "I couldn't think of a response." }]);
    } catch (e) {
      setHistory(prev => [...prev, { role: 'model', text: "Connection error. Please try again." }]);
    } finally {
      setLoading(false);
    }
  };

  const playAudio = async (text: string) => {
      const buffer = await generateSpeech(text);
      if (buffer) {
          const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
          const source = ctx.createBufferSource();
          source.buffer = buffer;
          source.connect(ctx.destination);
          source.start(0);
      }
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[200] flex flex-col items-end pointer-events-none">
      {isOpen && (
        <div 
          className="mb-4 w-[calc(100vw-2rem)] sm:w-96 h-[60vh] sm:h-[500px] max-h-[600px] bg-[#050505] border border-white/10 rounded-[1.5rem] sm:rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-300 pointer-events-auto"
          data-lenis-prevent
        >
          {/* Header */}
          <div className="p-4 sm:p-5 bg-gradient-to-r from-cyan-950/40 to-blue-950/40 border-b border-white/5 flex justify-between items-center shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-cyan-600/20 flex items-center justify-center border border-cyan-500/20">
                <Sparkles className="w-4 h-4 text-cyan-400" />
              </div>
              <div>
                <span className="font-black text-white text-xs sm:text-sm uppercase tracking-tighter italic">Curious Assistant</span>
                <p className="text-[7px] text-cyan-500 uppercase font-black tracking-widest leading-none mt-0.5">Neural Node Active</p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)} 
              className="p-2 bg-white/5 hover:bg-white/10 rounded-full text-gray-400 hover:text-white transition-all active:scale-90"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Chat Area */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 custom-scrollbar bg-black/40">
            {history.length === 0 && (
                <div className="flex flex-col items-center justify-center h-full text-center space-y-4 opacity-40 py-10">
                    <div className="p-4 bg-white/5 rounded-full">
                       <MessageSquare className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest max-w-[200px]">
                        Uplink established. How can I assist your synthesis today?
                    </p>
                </div>
            )}
            {history.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
                <div className={`max-w-[85%] p-3.5 rounded-2xl text-[11px] sm:text-xs leading-relaxed shadow-sm ${msg.role === 'user' ? 'bg-cyan-600 text-white rounded-tr-none' : 'bg-white/5 text-gray-200 border border-white/5 rounded-tl-none'}`}>
                  <div className="whitespace-pre-wrap break-words">
                    {msg.text}
                  </div>
                  {msg.role === 'model' && (
                      <button 
                        onClick={() => playAudio(msg.text)} 
                        className="mt-2 text-cyan-500 hover:text-cyan-400 flex items-center gap-1.5 opacity-60 hover:opacity-100 transition-all text-[9px] font-black uppercase tracking-widest"
                      >
                        <Volume2 className="w-3 h-3" /> Listen
                      </button>
                  )}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                 <div className="bg-white/5 border border-white/5 p-3 rounded-2xl rounded-tl-none flex items-center gap-3">
                    <Loader2 className="w-3 h-3 animate-spin text-cyan-500" />
                    <span className="text-[9px] text-gray-500 font-black uppercase tracking-widest">Processing...</span>
                 </div>
              </div>
            )}
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-3 sm:p-4 border-t border-white/5 bg-[#080808] flex gap-2 shrink-0">
            <input 
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Inquire pattern..."
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-cyan-500/50 transition-all placeholder:text-gray-700"
            />
            <button 
              type="submit" 
              disabled={loading || !input.trim()} 
              className="p-3 bg-cyan-600 text-white rounded-xl hover:bg-cyan-500 disabled:opacity-20 transition-all active:scale-90 shadow-lg shadow-cyan-900/20"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-cyan-600 to-blue-700 rounded-full flex items-center justify-center shadow-[0_20px_40px_rgba(34,211,238,0.2)] hover:scale-110 active:scale-95 transition-all group pointer-events-auto relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity"></div>
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <MessageSquare className="w-6 h-6 text-white" />
        )}
      </button>
    </div>
  );
};

export default GlobalChat;
