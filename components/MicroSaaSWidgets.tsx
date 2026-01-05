
import React, { useState } from 'react';
import { X, Calculator, Zap, Target, TrendingUp, BrainCircuit, Sparkles, ArrowRight, Gauge, Layers } from 'lucide-react';

interface MicroSaaSWidgetsProps {
  onClose: () => void;
}

const MicroSaaSWidgets: React.FC<MicroSaaSWidgetsProps> = ({ onClose }) => {
  const [activeWidget, setActiveWidget] = useState<'GPA' | 'RETENTION' | 'CAREER' | null>(null);

  return (
    <div className="fixed inset-0 z-[250] bg-black/98 backdrop-blur-3xl overflow-y-auto custom-scrollbar animate-in fade-in duration-500" data-lenis-prevent>
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-6 sm:px-12 py-12 sm:py-24 relative">
        <button onClick={onClose} className="absolute top-8 right-8 p-3 bg-white/5 hover:bg-white/10 rounded-full text-white transition-all group z-50">
          <X className="w-6 h-6 group-hover:rotate-90 transition-transform" />
        </button>

        <div className="mb-16 sm:mb-24">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-cyan-500/10 border border-cyan-500/20 rounded-full mb-6">
            <Calculator className="w-4 h-4 text-cyan-400" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-cyan-400">Curious Toolkit</span>
          </div>
          <h2 className="text-4xl sm:text-7xl font-black text-white italic uppercase tracking-tighter leading-none mb-8">
            Engineering as <span className="text-cyan-500">Marketing.</span>
          </h2>
          <p className="text-xl sm:text-2xl text-gray-500 font-light max-w-3xl leading-relaxed italic">
            Standalone computational modules designed for high-precision academic modeling and zero-marginal-cost scaling.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {/* Widget 1: Synthesis ROI Calculator */}
          <div className="glass-panel p-8 sm:p-12 rounded-[2.5rem] border border-white/10 hover:border-cyan-500/30 transition-all group relative overflow-hidden flex flex-col h-full">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-cyan-500/10 blur-[40px] rounded-full group-hover:bg-cyan-500/20 transition-all"></div>
            <div className="relative z-10 mb-auto">
              <div className="w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center mb-8 border border-cyan-500/20 group-hover:scale-110 transition-transform">
                <Gauge className="w-6 h-6 text-cyan-400" />
              </div>
              <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter mb-4">Retention Index</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-8 italic">Calculate the exponential decay of knowledge using rote vs. synthesis methods.</p>
            </div>
            <button onClick={() => setActiveWidget('RETENTION')} className="w-full py-4 bg-white/5 group-hover:bg-white/10 text-white rounded-xl font-black text-[10px] uppercase tracking-widest border border-white/5 transition-all flex items-center justify-center gap-3">
              Compute Node <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Widget 2: Predictive Success Modeler */}
          <div className="glass-panel p-8 sm:p-12 rounded-[2.5rem] border border-white/10 hover:border-purple-500/30 transition-all group relative overflow-hidden flex flex-col h-full">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-purple-500/10 blur-[40px] rounded-full group-hover:bg-purple-500/20 transition-all"></div>
            <div className="relative z-10 mb-auto">
              <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center mb-8 border border-purple-500/20 group-hover:scale-110 transition-transform">
                <Target className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter mb-4">Success Predictor</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-8 italic">Micro-trait analysis engine for long-term career trajectory alignment.</p>
            </div>
            <button onClick={() => setActiveWidget('CAREER')} className="w-full py-4 bg-white/5 group-hover:bg-white/10 text-white rounded-xl font-black text-[10px] uppercase tracking-widest border border-white/5 transition-all flex items-center justify-center gap-3">
              Model Self <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Widget 3: GPA to IQ Mapper */}
          <div className="glass-panel p-8 sm:p-12 rounded-[2.5rem] border border-white/10 hover:border-emerald-500/30 transition-all group relative overflow-hidden flex flex-col h-full">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-emerald-500/10 blur-[40px] rounded-full group-hover:bg-emerald-500/20 transition-all"></div>
            <div className="relative z-10 mb-auto">
              <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-8 border border-emerald-500/20 group-hover:scale-110 transition-transform">
                <Layers className="w-6 h-6 text-emerald-400" />
              </div>
              <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter mb-4">IQ Synergy Map</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-8 italic">Map classroom performance against real-world adaptive intelligence scores.</p>
            </div>
            <button onClick={() => setActiveWidget('GPA')} className="w-full py-4 bg-white/5 group-hover:bg-white/10 text-white rounded-xl font-black text-[10px] uppercase tracking-widest border border-white/5 transition-all flex items-center justify-center gap-3">
              Initialize Map <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Overlay for Active Widgets */}
        {activeWidget && (
          <div className="fixed inset-0 z-[300] bg-black/95 flex items-center justify-center p-6">
            <div className="bg-[#0a0a0a] border border-white/10 rounded-[3rem] p-10 sm:p-16 max-w-2xl w-full shadow-3xl relative">
              <button onClick={() => setActiveWidget(null)} className="absolute top-8 right-8 text-gray-500 hover:text-white transition-colors">
                <X className="w-6 h-6" />
              </button>
              <div className="text-center space-y-6">
                <h4 className="text-3xl font-black text-white uppercase italic tracking-tighter">Module Under Calibration</h4>
                <div className="w-24 h-24 bg-cyan-500/10 rounded-full mx-auto flex items-center justify-center border border-cyan-500/20 animate-pulse">
                  <BrainCircuit className="w-10 h-10 text-cyan-400" />
                </div>
                <p className="text-gray-400 italic text-lg leading-relaxed">
                  "Engineering as Marketing" nodes are being synchronized with the global database. Join our waitlist to be the first to access standalone toolkit modules.
                </p>
                <button onClick={() => setActiveWidget(null)} className="px-12 py-5 bg-white text-black font-black uppercase tracking-widest rounded-2xl hover:bg-cyan-400 transition-all active:scale-95 shadow-2xl">
                  Close Protocol
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MicroSaaSWidgets;
