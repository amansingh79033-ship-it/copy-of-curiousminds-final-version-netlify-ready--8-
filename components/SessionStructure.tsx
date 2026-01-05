
import React from 'react';
import { Clock, Users, BookOpen, Calendar, Zap, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';

interface SessionStructureProps {
  onBook: () => void;
}

const SessionStructure: React.FC<SessionStructureProps> = ({ onBook }) => {
  const tiers = [
    {
      title: "Diagnostic Demo",
      price: "FREE",
      description: "Comprehensive 45-min alignment session.",
      features: [
        "In-depth 1:1 with Coach",
        "Approach Methodology Briefing",
        "Full Review of All Engines",
        "Learning Gap Analysis"
      ],
      isMain: false,
      icon: Zap,
      accent: "text-cyan-400"
    },
    {
      title: "Synthesis Session",
      price: "$22",
      unit: "/ hr",
      description: "Standard high-density 1-on-1 session.",
      features: [
        "Human-Led Instruction",
        "Full Syllabus Integration",
        "Real-world Simulation",
        "Active Problem Solving"
      ],
      isMain: true,
      icon: ShieldCheck,
      accent: "text-cyan-400"
    },
    {
      title: "Weekly Rhythm",
      price: "6 Days",
      unit: "/ week",
      description: "Consistent high-intensity learning cycle.",
      features: [
        "5 Core Progress Days",
        "+1 Flexible Deep-Dive",
        "Circumstancial Expansion",
        "Progressive Complexity"
      ],
      isMain: false,
      icon: Calendar,
      accent: "text-purple-400"
    }
  ];

  return (
    <section className="py-24 sm:py-32 px-4 bg-transparent relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 sm:mb-24">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/5 border border-white/10 rounded-full mb-6">
            <span className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse"></span>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-cyan-400">Operational Architecture</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-black text-white italic uppercase tracking-tighter mb-6">
            Beyond <span className="text-cyan-500">Autonomous</span> Learning
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-lg font-light leading-relaxed">
            CuriousMinds integrates elite human coaching with AI-powered engines to deliver 100% syllabus alignment at a sustainable $22 price point.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {tiers.map((tier, i) => (
            <div 
              key={i} 
              className={`relative p-8 sm:p-12 rounded-[2.5rem] border transition-all duration-500 group ${
                tier.isMain 
                  ? 'bg-cyan-500/5 border-cyan-500/30 scale-105 z-10 shadow-[0_40px_80px_-20px_rgba(34,211,238,0.1)]' 
                  : 'bg-white/[0.02] border-white/10 hover:border-white/20'
              }`}
            >
              {tier.isMain && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-cyan-500 rounded-full text-black text-[10px] font-black uppercase tracking-widest">
                  Standard Node
                </div>
              )}
              
              <div className="flex flex-col h-full">
                <div className="mb-8">
                  <tier.icon className={`w-10 h-10 mb-6 ${tier.accent}`} />
                  <h3 className="text-2xl font-black text-white uppercase italic tracking-tight mb-2">{tier.title}</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-black text-white">{tier.price}</span>
                    {tier.unit && <span className="text-gray-600 font-bold uppercase text-xs">{tier.unit}</span>}
                  </div>
                  <p className="text-gray-500 text-sm mt-4 font-light italic">{tier.description}</p>
                </div>

                <div className="space-y-4 mb-10 flex-1">
                  {tier.features.map((feature, j) => (
                    <div key={j} className="flex items-center gap-3">
                      <CheckCircle2 className={`w-4 h-4 shrink-0 ${tier.isMain || tier.title.includes('Demo') ? 'text-cyan-500' : 'text-gray-700'}`} />
                      <span className="text-xs sm:text-sm text-gray-300 font-medium">{feature}</span>
                    </div>
                  ))}
                </div>

                <button 
                  onClick={onBook}
                  className={`w-full py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 active:scale-95 ${
                    tier.isMain 
                      ? 'bg-cyan-600 text-white shadow-xl hover:bg-cyan-500' 
                      : 'bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {tier.price === 'FREE' ? 'Book Free Demo' : 'Secure Slot'} <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Detailed Mechanics */}
        <div className="mt-16 sm:mt-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-white/[0.02] border border-white/5 p-8 sm:p-16 rounded-[3rem]">
           <div className="space-y-8">
              <h3 className="text-3xl font-black text-white italic uppercase tracking-tighter">Operational <span className="text-cyan-500">Framework</span></h3>
              <div className="space-y-6">
                 <div className="flex gap-6">
                    <div className="w-12 h-12 rounded-2xl bg-cyan-600/10 border border-cyan-500/20 flex items-center justify-center shrink-0">
                       <Clock className="w-6 h-6 text-cyan-400" />
                    </div>
                    <div>
                       <h4 className="text-white font-bold text-lg">1-Hour Synthesis Sessions</h4>
                       <p className="text-gray-500 text-sm leading-relaxed italic">High-density engagement windows focused on resolving complex academic nodes through active simulation ($22/hr).</p>
                    </div>
                 </div>
                 <div className="flex gap-6">
                    <div className="w-12 h-12 rounded-2xl bg-purple-600/10 border border-purple-500/20 flex items-center justify-center shrink-0">
                       <Users className="w-6 h-6 text-purple-400" />
                    </div>
                    <div>
                       <h4 className="text-white font-bold text-lg">Elite Human Coaching</h4>
                       <p className="text-gray-500 text-sm leading-relaxed italic">Not a bot. A certified synthesis coach facilitates every session, providing in-depth 1:1 guidance across all engines.</p>
                    </div>
                 </div>
                 <div className="flex gap-6">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-600/10 border border-cyan-500/20 flex items-center justify-center shrink-0">
                       <BookOpen className="w-6 h-6 text-emerald-400" />
                    </div>
                    <div>
                       <h4 className="text-white font-bold text-lg">Academic Syllabus Mapping</h4>
                       <p className="text-gray-500 text-sm leading-relaxed italic">We ingest your specific K-12 or University curriculum. Every session directly impacts your real-world grades.</p>
                    </div>
                 </div>
              </div>
           </div>
           <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-[4rem] border border-white/5 flex items-center justify-center overflow-hidden">
                 <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:40px_40px]"></div>
                 <div className="relative z-10 text-center space-y-4">
                    <div className="text-7xl font-black text-white italic tracking-tighter opacity-20">5+1</div>
                    <p className="text-[10px] font-black uppercase tracking-[0.5em] text-gray-500">6-Day Operational Cycle</p>
                    <div className="max-w-[240px] mx-auto text-xs text-gray-400 leading-relaxed font-light italic">
                       "Consistency is the catalyst. 5 days of scheduled growth + 1 flexible deep-dive node for circumstantial expansion."
                    </div>
                 </div>
                 {/* Visual Decor */}
                 <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-cyan-500/20 blur-[60px] rounded-full"></div>
                 <div className="absolute -top-10 -left-10 w-40 h-40 bg-purple-500/20 blur-[60px] rounded-full"></div>
              </div>
           </div>
        </div>
      </div>
    </section>
  );
};

export default SessionStructure;
