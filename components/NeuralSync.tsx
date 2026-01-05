
import React, { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, Zap, X, Loader2, Waves, ShieldCheck, User, Phone, CheckCircle2, Play, Square, Info, ArrowUpRight } from 'lucide-react';
import { mockBackend } from '../services/mockBackend';

const NeuralSync: React.FC = () => {
  const [status, setStatus] = useState<'IDLE' | 'COUNTDOWN' | 'RECORDING' | 'FORM' | 'SUCCESS'>('IDLE');
  const [countdown, setCountdown] = useState(3);
  const [recordTime, setRecordTime] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [audioBase64, setAudioBase64] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: '', phone: '' });
  
  const timerRef = useRef<number | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const recordIntervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (isHovered && status === 'IDLE') {
      setStatus('COUNTDOWN');
      setCountdown(3);
      timerRef.current = window.setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            startRecording();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (!isHovered && status === 'COUNTDOWN') {
      if (timerRef.current) clearInterval(timerRef.current);
      setStatus('IDLE');
    }
  }, [isHovered]);

  const blobToBase64 = (blob: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const base64 = await blobToBase64(audioBlob);
        setAudioBase64(base64);
        setStatus('FORM');
      };

      mediaRecorder.start();
      setStatus('RECORDING');
      setRecordTime(0);
      
      recordIntervalRef.current = window.setInterval(() => {
        setRecordTime(prev => {
          if (prev >= 29) {
            stopRecording();
            return 30;
          }
          return prev + 1;
        });
      }, 1000);
    } catch (err) {
      console.error("Mic access denied", err);
      setStatus('IDLE');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(t => t.stop());
    }
    if (recordIntervalRef.current) clearInterval(recordIntervalRef.current);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const userId = mockBackend.getCurrentSessionId();
    const user = mockBackend.getCurrentUser();
    
    mockBackend.saveNeuralComm({
        userId,
        name: formData.name || user?.name || 'Visitor',
        phone: formData.phone || user?.phone || '---',
        audioBlobUrl: audioBase64 || undefined,
        duration: recordTime,
        location: user?.location || { city: 'Unknown', country: 'Global', lat: 0, lng: 0, flag: '' }
    });

    setStatus('SUCCESS');
    setTimeout(() => {
        setStatus('IDLE');
        setAudioBase64(null);
        setFormData({ name: '', phone: '' });
    }, 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-10 mb-24 relative z-50">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-10">
        
        {/* Card 1: Founder's Mandate */}
        <div className="glass-panel rounded-[2.5rem] sm:rounded-[4rem] p-8 sm:p-16 border border-white/10 relative overflow-hidden flex flex-col justify-center">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/[0.03] to-transparent pointer-events-none"></div>
            <div className="relative z-10 space-y-6 sm:space-y-10">
                <div className="relative inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full group/tooltip">
                    <Zap className="w-4 h-4 text-cyan-400" />
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-cyan-400">The Architect's Vision</span>
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-3 py-1.5 bg-black/95 border border-white/10 rounded-lg text-[8px] font-black uppercase tracking-[0.2em] text-cyan-400 opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-2xl z-50">
                      Neural Roadmap Strategy
                    </div>
                </div>
                
                <div className="space-y-4">
                    <h3 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white italic tracking-tighter leading-[0.95] uppercase">
                        Ready to join the <span className="text-cyan-500">ed-revolution?</span>
                    </h3>
                    <p className="text-[10px] sm:text-xs font-black text-gray-500 uppercase tracking-[0.5em] italic">
                        Direct Uplink to Aman Kumar Singh
                    </p>
                </div>

                <div className="space-y-6">
                    <p className="text-gray-400 text-lg sm:text-xl font-light leading-relaxed italic border-l-4 border-cyan-600 pl-6 sm:pl-10">
                        "We aren't just building a tool; we're establishing a foundation for the next generation. My vision is to eliminate the memory-based cycle and replace it with <span className="text-white font-bold">application and synthesis.</span>"
                    </p>
                </div>

                <div className="flex items-center gap-8 pt-4">
                    <div className="relative flex items-center gap-2 group/tooltip">
                        <ShieldCheck className="w-4 h-4 text-cyan-500/60" />
                        <span className="text-[9px] font-black uppercase tracking-widest text-gray-600">Secure Protocol</span>
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-3 py-1.5 bg-black/95 border border-white/10 rounded-lg text-[8px] font-black uppercase tracking-[0.2em] text-cyan-400 opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-2xl z-50">
                          AES-256 Identification
                        </div>
                    </div>
                    <div className="relative flex items-center gap-2 group/tooltip">
                        <Waves className="w-4 h-4 text-purple-500/60" />
                        <span className="text-[9px] font-black uppercase tracking-widest text-gray-600">Verification Active</span>
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-3 py-1.5 bg-black/95 border border-white/10 rounded-lg text-[8px] font-black uppercase tracking-[0.2em] text-purple-400 opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-2xl z-50">
                          Biometric Voice Validation
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Card 2: Neural Uplink (Interaction) */}
        <div 
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="glass-panel rounded-[2.5rem] sm:rounded-[4rem] p-8 sm:p-12 border border-white/10 relative overflow-hidden group transition-all duration-500 hover:border-cyan-500/30 flex flex-col items-center justify-center min-h-[450px] tilt-card"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-cyan-500/5 opacity-50 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
          
          <div className="relative z-10 w-full max-w-sm flex flex-col items-center justify-center h-full">
             
             {status === 'IDLE' && (
                <div className="text-center animate-in fade-in duration-500 space-y-8">
                   <div className="relative group/tooltip">
                      <div className="absolute -inset-4 bg-cyan-500/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto relative z-10 group-hover:scale-110 transition-transform duration-700 group-hover:border-cyan-500/40 shadow-2xl">
                         <Mic className="w-10 h-10 sm:w-14 sm:h-14 text-gray-500 group-hover:text-cyan-400 transition-colors" />
                      </div>
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-6 px-3 py-1.5 bg-black/95 border border-cyan-500/30 rounded-lg text-[8px] font-black uppercase tracking-[0.2em] text-cyan-400 opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-[0_0_20px_rgba(34,211,238,0.2)] z-50">
                        Hold Cursor to Start Capture
                      </div>
                   </div>
                   
                   <div className="space-y-4">
                      <h4 className="text-2xl sm:text-3xl font-black text-white italic uppercase tracking-tighter">Establish <span className="text-cyan-500">Uplink</span></h4>
                      <p className="text-gray-500 text-[10px] sm:text-xs uppercase leading-relaxed tracking-widest max-w-[240px] mx-auto font-medium">
                        Hold cursor here to transmit a <span className="text-white font-bold">30-second briefing</span> directly to our founder.
                      </p>
                   </div>

                   <div className="relative flex justify-center pt-4 group/tooltip">
                      <div className="p-3 bg-white/5 rounded-full border border-white/10 animate-bounce">
                         <ArrowUpRight className="w-5 h-5 text-gray-600" />
                      </div>
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 px-3 py-1.5 bg-black/95 border border-white/10 rounded-lg text-[8px] font-black uppercase tracking-[0.2em] text-gray-400 opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-2xl z-50">
                        Direct Access Mode
                      </div>
                   </div>
                </div>
             )}

             {status === 'COUNTDOWN' && (
                <div className="text-center">
                   <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-cyan-500/20 flex items-center justify-center mx-auto mb-8 relative">
                      <div className="absolute inset-0 border-4 border-cyan-500 rounded-full animate-[ping_1s_infinite] opacity-20"></div>
                      <span className="text-6xl font-black text-cyan-400 italic">{countdown}</span>
                   </div>
                   <p className="text-cyan-400 font-black uppercase tracking-[0.4em] text-xs">Calibrating Path...</p>
                </div>
             )}

             {status === 'RECORDING' && (
                <div className="text-center w-full space-y-8">
                   <div className="flex items-end justify-center gap-1.5 h-16 sm:h-20">
                      {[...Array(18)].map((_, i) => (
                        <div key={i} className="w-1.5 sm:w-2 bg-red-500 rounded-full animate-wave" style={{ height: `${20 + Math.random() * 80}%`, animationDelay: `${i * 0.04}s` }}></div>
                      ))}
                   </div>
                   <div className="space-y-2">
                      <div className="text-5xl font-mono text-red-500 font-bold tracking-tighter">00:{recordTime.toString().padStart(2, '0')}</div>
                      <p className="text-red-500/50 text-[10px] font-black uppercase tracking-widest">Transmitting Live</p>
                   </div>
                   <button 
                     onClick={stopRecording}
                     className="px-10 py-4 bg-red-600 hover:bg-red-500 text-white rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-[0_20px_40px_rgba(220,38,38,0.3)] flex items-center gap-3 mx-auto active:scale-95"
                   >
                     <Square className="w-4 h-4 fill-current" /> Terminate and Send
                   </button>
                </div>
             )}

             {status === 'FORM' && (
                <form onSubmit={handleSubmit} className="w-full space-y-5 animate-in slide-in-from-bottom-4">
                   <div className="text-center mb-6">
                      <div className="inline-flex items-center gap-2 text-green-400 text-[10px] font-black uppercase tracking-widest bg-green-500/10 px-4 py-2 rounded-full border border-green-500/20">
                         <CheckCircle2 className="w-4 h-4" /> Frequency Captured
                      </div>
                   </div>
                   <div className="space-y-3">
                      <div className="relative group">
                         <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 group-focus-within:text-cyan-500 transition-colors" />
                         <input 
                           type="text" placeholder="Identity Signature (Optional)" 
                           value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                           className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white outline-none focus:border-cyan-500/50 text-xs transition-all" 
                         />
                      </div>
                      <div className="relative group">
                         <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 group-focus-within:text-cyan-500 transition-colors" />
                         <input 
                           type="tel" placeholder="Return Path / Phone (Optional)" 
                           value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})}
                           className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white outline-none focus:border-cyan-500/50 text-xs transition-all" 
                         />
                      </div>
                   </div>
                   <button type="submit" className="w-full py-5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-[0_20px_40px_rgba(8,145,178,0.2)] transition-all active:scale-95">
                      Verify and Transmit
                   </button>
                   <button type="button" onClick={() => setStatus('IDLE')} className="w-full py-2 text-gray-600 hover:text-gray-400 font-bold uppercase text-[9px] tracking-widest transition-colors">Abort Connection</button>
                </form>
             )}

             {status === 'SUCCESS' && (
                <div className="text-center animate-in zoom-in-95 space-y-8">
                   <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-green-500/10 border border-green-500/40 flex items-center justify-center mx-auto shadow-[0_0_80px_rgba(34,197,94,0.15)] relative">
                      <div className="absolute inset-0 bg-green-500/20 rounded-full animate-ping opacity-20"></div>
                      <ShieldCheck className="w-12 h-12 sm:w-16 sm:h-16 text-green-500" />
                   </div>
                   <div className="space-y-3">
                      <h4 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tighter italic">Signal Delivered</h4>
                      <p className="text-gray-500 text-[10px] sm:text-xs uppercase font-medium tracking-widest leading-relaxed max-w-[280px] mx-auto">
                        Your transmission has been ingested into the architectural node. Aman will review shortly.
                      </p>
                   </div>
                </div>
             )}
          </div>

        </div>
      </div>
      <style>{`
        @keyframes wave {
          0%, 100% { transform: scaleY(0.4); }
          50% { transform: scaleY(1.5); }
        }
        .animate-wave {
          animation: wave 1s ease-in-out infinite;
          transform-origin: bottom;
        }
        .tilt-card {
          transition: transform 0.8s cubic-bezier(0.23, 1, 0.32, 1), border-color 0.5s ease;
          transform-style: preserve-3d;
          perspective: 1200px;
        }
        .tilt-card:hover {
          transform: rotateX(8deg) rotateY(-2deg) translateY(-8px);
        }
      `}</style>
    </div>
  );
};

export default NeuralSync;
