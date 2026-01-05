
import React from 'react';
import { X, Quote, ArrowRight, BrainCircuit, UserCheck, Globe, Cpu, Activity, Terminal, ShieldAlert, Fingerprint } from 'lucide-react';

interface VisionModalProps {
  onClose: () => void;
  onAction: () => void;
}

const VisionModal: React.FC<VisionModalProps> = ({ onClose, onAction }) => {
  return (
    <div className="fixed inset-0 z-[150] bg-black/98 backdrop-blur-3xl flex items-center justify-center p-0 sm:p-4 animate-in fade-in duration-500" onClick={onClose}>
        <div 
          className="bg-[#020202] border-x sm:border border-white/10 w-full max-w-7xl h-full sm:h-[90vh] sm:rounded-[3.5rem] shadow-[0_0_150px_rgba(34,211,238,0.08)] relative overflow-hidden flex flex-col lg:flex-row"
          onClick={e => e.stopPropagation()}
          data-lenis-prevent
        >
            {/* Header Mobile Title */}
            <div className="lg:hidden p-6 border-b border-white/5 flex justify-between items-center bg-black shrink-0">
                <div className="flex items-center gap-3">
                    <Terminal className="w-4 h-4 text-cyan-500" />
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white">Vision Uplink</span>
                </div>
                <button onClick={onClose} className="p-2 bg-white/5 rounded-full"><X className="w-5 h-5 text-white" /></button>
            </div>

            {/* Left Column: The Architect (Founder Card) */}
            <div className="lg:w-[400px] bg-[#050505] border-b lg:border-b-0 lg:border-r border-white/5 p-8 lg:p-12 flex flex-col relative overflow-hidden shrink-0">
                <div className="absolute inset-0 bg-grid-white/[0.015] bg-[size:25px_25px]"></div>
                <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-cyan-500/5 to-transparent"></div>
                
                <div className="relative z-10 flex-1 flex flex-col items-center justify-center">
                    {/* Founder ID Badge UI */}
                    <div className="w-full space-y-6 lg:space-y-8">
                        <div className="relative group mx-auto w-fit">
                            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/50 to-blue-500/50 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                            <div className="relative w-40 h-48 lg:w-56 lg:h-64 rounded-[2rem] bg-gray-950 border border-white/10 overflow-hidden shadow-2xl">
                                <div className="absolute top-0 left-0 w-full h-1 bg-cyan-400/40 shadow-[0_0_15px_cyan] animate-[scan_3s_linear_infinite] z-20"></div>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <UserCheck className="w-20 lg:w-24 h-20 lg:h-24 text-white/5" />
                                </div>
                                <div className="absolute bottom-0 left-0 w-full p-3 lg:p-4 bg-gradient-to-t from-black to-transparent text-center">
                                    <p className="text-[7px] lg:text-[8px] font-black text-cyan-400 uppercase tracking-[0.4em] mb-1">Auth: Level 01</p>
                                    <div className="flex gap-1 justify-center">
                                        {[...Array(5)].map((_, i) => <div key={i} className="w-1.5 h-0.5 bg-cyan-500/50"></div>)}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="text-center space-y-1">
                            <h2 className="text-2xl lg:text-4xl font-black text-white tracking-tighter uppercase italic leading-none">Aman Singh</h2>
                            <p className="text-[8px] lg:text-[10px] font-mono tracking-[0.6em] uppercase text-gray-500">Master Architect</p>
                        </div>

                        <div className="hidden sm:block space-y-2 pt-2">
                            <div className="flex items-center justify-between p-3 bg-white/[0.02] border border-white/5 rounded-xl">
                                <div className="flex items-center gap-3">
                                    <Activity className="w-3 h-3 text-cyan-500" />
                                    <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Uplink</span>
                                </div>
                                <span className="text-[9px] font-bold text-white uppercase italic">Active</span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-white/[0.02] border border-white/5 rounded-xl">
                                <div className="flex items-center gap-3">
                                    <Globe className="w-3 h-3 text-purple-500" />
                                    <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Region</span>
                                </div>
                                <span className="text-[9px] font-bold text-white uppercase italic">Global Hub</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="relative z-10 pt-6 mt-auto flex flex-col items-center hidden lg:flex">
                    <div className="w-12 h-1 bg-cyan-500/20 rounded-full mb-3"></div>
                    <p className="text-[7px] font-mono tracking-[0.8em] text-gray-700 uppercase">Core Vision Node V4</p>
                </div>
            </div>

            {/* Right Column: The Manifesto (Content) */}
            <div className="flex-1 overflow-y-auto custom-scrollbar relative bg-[#010101] scroll-smooth overscroll-contain" style={{ WebkitOverflowScrolling: 'touch' }}>
                <button onClick={onClose} className="hidden lg:flex absolute top-10 right-10 z-[60] p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-white transition-all group backdrop-blur-md active:scale-90">
                    <X className="w-6 h-6 group-hover:rotate-90 transition-transform" />
                </button>

                <div className="p-8 lg:p-24 space-y-16 lg:space-y-24 max-w-5xl relative z-10">
                    
                    {/* Section 01: Hero Quote */}
                    <div className="space-y-8 lg:space-y-12">
                        <div className="flex items-center gap-4">
                            <span className="text-[10px] font-black text-cyan-500 bg-cyan-500/10 px-3 py-1 rounded-md border border-cyan-500/20 uppercase tracking-[0.3em]">01 // Manifesto</span>
                            <div className="h-px flex-1 bg-white/5"></div>
                        </div>
                        
                        <div className="relative">
                            <Quote className="absolute -top-12 -left-8 lg:-top-16 lg:-left-12 w-20 lg:w-32 h-20 lg:h-32 text-cyan-500/5 rotate-6" />
                            <h3 className="text-4xl lg:text-8xl font-black text-white leading-[0.9] tracking-tighter italic uppercase">
                                Killing <br/>
                                <span className="text-cyan-500">Memorization</span> <br/>
                                <span className="text-gray-800">For Good.</span>
                            </h3>
                        </div>

                        <p className="text-lg lg:text-3xl text-gray-400 font-light leading-relaxed italic border-l-4 border-cyan-600 pl-6 lg:pl-12">
                            "Education today is a storage protocol. We are building an <span className="text-white font-bold underline decoration-cyan-500/50 underline-offset-8">Execution Engine</span>. Success is not what you remember; it's what you can build."
                        </p>
                    </div>

                    {/* Section 02: Strategic Mandate */}
                    <div className="space-y-8 lg:space-y-12">
                         <div className="flex items-center gap-4">
                            <span className="text-[10px] font-black text-purple-500 bg-purple-500/10 px-3 py-1 rounded-md border border-purple-500/20 uppercase tracking-[0.3em]">02 // Strategy</span>
                            <div className="h-px flex-1 bg-white/5"></div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-10">
                            {[
                                { 
                                    title: "Cognitive Shift", 
                                    icon: BrainCircuit, 
                                    desc: "Moving from 10% retention to 100% application using simulated real-world failure states.",
                                    color: "cyan"
                                },
                                { 
                                    title: "Neural Pathing", 
                                    icon: Activity, 
                                    desc: "Identifying micro-traits that align students with the top 1% of global leadership nodes.",
                                    color: "purple"
                                },
                                { 
                                    title: "Execution Hub", 
                                    icon: Cpu, 
                                    desc: "Absolute syllabus alignment delivered through multi-modal briefings at a sustainable price.",
                                    color: "emerald"
                                },
                                { 
                                    title: "Global Impact", 
                                    icon: Globe, 
                                    desc: "Democratizing elite problem-solving frameworks for every academic node globally.",
                                    color: "blue"
                                }
                            ].map((item, i) => (
                                <div key={i} className="p-6 lg:p-10 bg-white/[0.02] border border-white/5 rounded-[2rem] lg:rounded-[2.5rem] group hover:bg-white/[0.04] hover:border-white/10 transition-all">
                                    <div className="w-12 lg:w-14 h-12 lg:h-14 rounded-xl lg:rounded-2xl bg-white/5 flex items-center justify-center mb-6 lg:mb-8 border border-white/5 group-hover:scale-110 transition-transform duration-500">
                                        <item.icon className="w-6 lg:w-7 h-6 lg:h-7 text-white/40 group-hover:text-white transition-colors" />
                                    </div>
                                    <h4 className="text-xl lg:text-2xl font-black text-white uppercase italic tracking-tighter mb-3 lg:mb-4">{item.title}</h4>
                                    <p className="text-gray-500 text-xs lg:text-sm leading-relaxed italic group-hover:text-gray-300 transition-colors">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Section 03: Final Call */}
                    <div className="pt-16 lg:pt-24 border-t border-white/5 pb-16">
                        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 bg-cyan-600/5 border border-cyan-500/10 p-8 lg:p-16 rounded-[2rem] lg:rounded-[3rem] relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-10 opacity-[0.03] hidden lg:block">
                                <ShieldAlert className="w-64 h-64 text-cyan-400 rotate-12" />
                            </div>
                            <div className="space-y-3 text-center lg:text-left relative z-10">
                                <h4 className="text-3xl lg:text-5xl font-black text-white tracking-tighter uppercase italic leading-none">Initialize <span className="text-cyan-500">Sync?</span></h4>
                                <p className="text-[10px] lg:text-sm text-gray-500 uppercase tracking-[0.4em] font-black">Join the architectural elite.</p>
                            </div>
                            <button 
                                onClick={onAction}
                                className="w-full lg:w-auto px-10 lg:px-16 py-6 lg:py-8 bg-white text-black font-black rounded-full text-xs lg:text-sm uppercase tracking-[0.4em] hover:bg-cyan-400 transition-all flex items-center justify-center gap-4 group shadow-[0_20px_60px_rgba(255,255,255,0.1)] active:scale-95 relative z-10"
                            >
                                Execute Protocol <ArrowRight className="w-5 lg:w-6 h-5 lg:h-6 group-hover:translate-x-3 transition-transform" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <style>{`
            @keyframes scan {
                0% { top: 0%; opacity: 0; }
                5% { opacity: 1; }
                95% { opacity: 1; }
                100% { top: 100%; opacity: 0; }
            }
            .custom-scrollbar::-webkit-scrollbar { width: 4px; }
            .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
            .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.05); border-radius: 20px; }
            .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.1); }
        `}</style>
    </div>
  );
};

export default VisionModal;
