
import React from 'react';
import { X, ArrowRight, BrainCircuit, Sparkles, Waves, BarChart3, AlertCircle, Quote, ShieldCheck, Globe, Zap, Target, UserCheck, Activity, Terminal, Fingerprint } from 'lucide-react';

interface MissionPageProps {
  onClose: () => void;
}

const MissionPage: React.FC<MissionPageProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-[300] bg-[#050505] overflow-y-auto custom-scrollbar animate-in slide-in-from-right-10 duration-500" data-lenis-prevent>
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none"></div>
      
      {/* Navigation */}
      <nav className="sticky top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-xl border-b border-white/5 px-6 sm:px-12 py-6 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-cyan-600 rounded-xl flex items-center justify-center shadow-lg">
            <BrainCircuit className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-xl font-black tracking-tighter uppercase italic">Curious<span className="text-cyan-500">Minds</span></h2>
        </div>
        <button onClick={onClose} className="p-3 bg-white/5 hover:bg-white/10 rounded-full text-white transition-all active:scale-90 group border border-white/10">
          <X className="w-6 h-6 group-hover:rotate-90 transition-transform" />
        </button>
      </nav>

      {/* Hero Content */}
      <header className="relative pt-24 pb-16 px-6 sm:px-12 max-w-7xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-cyan-500/10 border border-cyan-500/20 rounded-full mb-8">
          <Globe className="w-4 h-4 text-cyan-400" />
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-cyan-400">Global Mission Protocol</span>
        </div>
        <h1 className="text-5xl sm:text-7xl md:text-8xl font-black text-white leading-[1.1] sm:leading-[0.9] tracking-tighter italic uppercase mb-12">
          The Death of <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-600">Rote Memorization.</span>
        </h1>
        <p className="text-xl sm:text-3xl text-gray-400 font-light max-w-4xl leading-relaxed italic">
          We are rebuilding the neural pathway between academic concepts and real-world execution. Traditional systems measure retention; we measure <span className="text-white font-bold underline decoration-cyan-500 underline-offset-8">Synthesis.</span>
        </p>
      </header>

      {/* Founder's Mandate Section */}
      <section className="py-24 px-6 sm:px-12 relative overflow-hidden">
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-[120px] -translate-x-1/2"></div>
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
          
          {/* Stylized Founder Card */}
          <div className="lg:w-[450px] shrink-0">
             <div className="relative group">
                <div className="absolute -inset-2 bg-gradient-to-tr from-cyan-500/20 to-purple-500/20 rounded-[4rem] blur-2xl opacity-50"></div>
                <div className="relative bg-[#0a0a0a] border border-white/10 rounded-[3.5rem] p-10 overflow-hidden">
                    <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:30px_30px]"></div>
                    <div className="relative z-10 flex flex-col items-center">
                       <div className="w-48 h-56 rounded-[2.5rem] bg-gray-950 border border-white/5 overflow-hidden mb-8 relative shadow-2xl">
                          <div className="absolute top-0 left-0 w-full h-1 bg-cyan-400/30 animate-[scan_3s_linear_infinite]"></div>
                          <div className="absolute inset-0 flex items-center justify-center">
                             <UserCheck className="w-20 h-20 text-white/5" />
                          </div>
                          <div className="absolute bottom-4 left-0 w-full text-center">
                             <span className="text-[8px] font-black uppercase tracking-[0.5em] text-cyan-500/80">Arch-Node Active</span>
                          </div>
                       </div>
                       
                       <div className="text-center mb-8">
                          <h3 className="text-3xl font-black text-white italic uppercase tracking-tighter leading-none mb-2">Aman Kumar Singh</h3>
                          <p className="text-[10px] font-mono text-gray-500 uppercase tracking-[0.5em]">The Architect // Founder</p>
                       </div>

                       <div className="w-full space-y-3">
                          <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                             <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest">Vision Status</span>
                             <span className="text-[10px] font-bold text-cyan-400 uppercase italic">Executing</span>
                          </div>
                          <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                             <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest">Protocol</span>
                             <span className="text-[10px] font-bold text-purple-400 uppercase italic">Neural Sync</span>
                          </div>
                       </div>
                    </div>
                </div>
             </div>
          </div>

          {/* Vision Content */}
          <div className="flex-1 space-y-10 relative z-10">
             <div className="flex items-center gap-4">
                <Terminal className="w-5 h-5 text-cyan-500" />
                <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.6em]">The Architect's Mandate</span>
             </div>
             
             <h2 className="text-4xl sm:text-6xl font-black text-white leading-tight tracking-tighter italic uppercase">
                "We aren't building <br/> 
                <span className="text-cyan-500">another platform.</span> <br/>
                We're building <span className="text-gray-600">an engine."</span>
             </h2>

             <div className="space-y-6 text-gray-400 text-lg sm:text-xl font-light leading-relaxed italic border-l-4 border-cyan-600 pl-8">
                <p>
                  "The current education system is a 19th-century storage protocol that we're still forcing 21st-century minds to run on. It's failing. My vision for CuriousMinds is simple: <span className="text-white font-bold">Eradicate the abstraction.</span>"
                </p>
                <p>
                  "We are focusing on the $22/session sweet spot where human guidance meets algorithmic precision. This isn't about passing exams; it's about engineering the top 1% of global problem solvers."
                </p>
             </div>

             <div className="flex flex-wrap gap-4 pt-4">
                <div className="flex items-center gap-3 px-6 py-3 bg-white/5 rounded-2xl border border-white/10 group hover:border-cyan-500/40 transition-all">
                   <Target className="w-4 h-4 text-cyan-400" />
                   <span className="text-[10px] font-black text-white uppercase tracking-widest">Market Alignment</span>
                </div>
                <div className="flex items-center gap-3 px-6 py-3 bg-white/5 rounded-2xl border border-white/10 group hover:border-purple-500/40 transition-all">
                   <ShieldCheck className="w-4 h-4 text-purple-400" />
                   <span className="text-[10px] font-black text-white uppercase tracking-widest">Neural Integrity</span>
                </div>
                <div className="flex items-center gap-3 px-6 py-3 bg-white/5 rounded-2xl border border-white/10 group hover:border-emerald-500/40 transition-all">
                   <Zap className="w-4 h-4 text-emerald-400" />
                   <span className="text-[10px] font-black text-white uppercase tracking-widest">Execution Priority</span>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-24 px-6 sm:px-12 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div className="space-y-10">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-red-500/20 rounded-2xl flex items-center justify-center border border-red-500/30">
                <AlertCircle className="w-6 h-6 text-red-500" />
              </div>
              <h2 className="text-3xl font-black uppercase italic tracking-tight text-white">The Problem Statement</h2>
            </div>
            
            <div className="space-y-6 text-gray-400 text-lg leading-relaxed">
              <p>
                Modern educational institutions are still operating on an industrial-era firmware. Students are treated as storage drives rather than synthesis engines.
              </p>
              <div className="bg-white/5 border border-white/10 rounded-3xl p-8 space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between items-end">
                    <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Knowledge Decay Rate</span>
                    <span className="text-xl font-black text-red-500">70%</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full w-[70%] bg-red-600"></div>
                  </div>
                  <p className="text-[10px] text-gray-600">Students forget 70% of rote-learned material within 24 hours without application.</p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-end">
                    <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Skill Applicability Gap</span>
                    <span className="text-xl font-black text-orange-500">82%</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full w-[82%] bg-orange-600"></div>
                  </div>
                  <p className="text-[10px] text-gray-600">Percentage of employers stating recent graduates lack required problem-solving skills.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-8 bg-black border border-white/5 rounded-[2.5rem] space-y-6 group hover:border-red-500/30 transition-all">
              <BarChart3 className="w-10 h-10 text-gray-600 group-hover:text-red-500 transition-colors" />
              <h3 className="text-xl font-black text-white uppercase italic">Data Point 01</h3>
              <p className="text-sm text-gray-500 leading-relaxed italic">
                Studies from the World Economic Forum suggest that 65% of children entering primary school today will end up working in jobs that don't yet exist.
              </p>
              <p className="text-[8px] text-gray-700 uppercase font-mono mt-auto">Source: WEF Future of Jobs</p>
            </div>
            <div className="p-8 bg-black border border-white/5 rounded-[2.5rem] space-y-6 group hover:border-orange-500/30 transition-all">
              <Zap className="w-10 h-10 text-gray-600 group-hover:text-orange-500 transition-colors" />
              <h3 className="text-xl font-black text-white uppercase italic">Data Point 02</h3>
              <p className="text-sm text-gray-500 leading-relaxed italic">
                Rote learning systems focus on the 'Left Brain' logic but ignore 'Adaptive Intelligence' required for crisis management and high-stakes synthesis.
              </p>
              <p className="text-[8px] text-gray-700 uppercase font-mono mt-auto">Source: Cognitive Research Associates</p>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="py-24 px-6 sm:px-12">
        <div className="max-w-7xl mx-auto text-center mb-24">
          <h2 className="text-4xl sm:text-6xl font-black text-white italic uppercase tracking-tighter mb-8">The CuriousMinds <span className="text-cyan-500">Framework</span></h2>
          <p className="text-xl text-gray-500 max-w-3xl mx-auto font-light leading-relaxed">
            We are deploying three integrated intelligence layers to bridge the gap between "knowing" and "doing".
          </p>
        </div>

        <div className="max-w-7xl mx-auto space-y-12">
          {/* Solution 1 */}
          <div className="flex flex-col lg:flex-row gap-12 items-center bg-white/[0.02] border border-white/5 p-8 sm:p-16 rounded-[3rem] sm:rounded-[4rem] group hover:border-cyan-500/20 transition-all">
            <div className="lg:w-1/3 flex justify-center">
              <div className="w-48 h-48 sm:w-64 sm:h-64 rounded-full bg-cyan-600/10 border border-cyan-500/20 flex items-center justify-center shadow-2xl relative overflow-hidden">
                <BrainCircuit className="w-24 h-24 sm:w-32 sm:h-32 text-cyan-400 group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/10 to-transparent"></div>
              </div>
            </div>
            <div className="lg:w-2/3 space-y-6 text-center lg:text-left">
              <span className="text-[10px] font-black text-cyan-500 uppercase tracking-widest">Intelligence Layer 01</span>
              <h3 className="text-3xl sm:text-5xl font-black text-white uppercase italic tracking-tighter">Synthesis Engine</h3>
              <p className="text-lg text-gray-400 leading-relaxed font-light">
                Our core technology generates infinite real-world scenarios calibrated to the student's current grade and topic. Instead of asking "What is a circuit?", we ask "You are on Mars, your life support has 10% power, and the primary relay is blown. Use the available copper filaments to bypass the system."
              </p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-4">
                <span className="px-4 py-2 bg-white/5 rounded-full text-[10px] font-black uppercase text-gray-500 border border-white/5">Contextual Reasoning</span>
                <span className="px-4 py-2 bg-white/5 rounded-full text-[10px] font-black uppercase text-gray-500 border border-white/5">Dynamic Complexity</span>
              </div>
            </div>
          </div>

          {/* Solution 2 */}
          <div className="flex flex-col lg:flex-row-reverse gap-12 items-center bg-white/[0.02] border border-white/5 p-8 sm:p-16 rounded-[3rem] sm:rounded-[4rem] group hover:border-purple-500/20 transition-all">
            <div className="lg:w-1/3 flex justify-center">
              <div className="w-48 h-48 sm:w-64 sm:h-64 rounded-full bg-purple-600/10 border border-purple-500/20 flex items-center justify-center shadow-2xl relative overflow-hidden">
                <Sparkles className="w-24 h-24 sm:w-32 sm:h-32 text-purple-400 group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-500/10 to-transparent"></div>
              </div>
            </div>
            <div className="lg:w-2/3 space-y-6 text-center lg:text-left">
              <span className="text-[10px] font-black text-purple-500 uppercase tracking-widest">Intelligence Layer 02</span>
              <h3 className="text-3xl sm:text-5xl font-black text-white uppercase italic tracking-tighter">beYOU Engine</h3>
              <p className="text-lg text-gray-400 leading-relaxed font-light">
                A success prediction engine that models your "Future Winning Self". By analyzing micro-traits and career aspirations, it provides a challenging, persona-driven chat interface where you can consult with your 40-year-old successful self to reverse-engineer the path from today's classroom to tomorrow's boardroom.
              </p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-4">
                <span className="px-4 py-2 bg-white/5 rounded-full text-[10px] font-black uppercase text-gray-500 border border-white/5">Persona Modeling</span>
                <span className="px-4 py-2 bg-white/5 rounded-full text-[10px] font-black uppercase text-gray-500 border border-white/5">Success Pathing</span>
              </div>
            </div>
          </div>

          {/* Solution 3 */}
          <div className="flex flex-col lg:flex-row gap-12 items-center bg-white/[0.02] border border-white/5 p-8 sm:p-16 rounded-[3rem] sm:rounded-[4rem] group hover:border-emerald-500/20 transition-all">
            <div className="lg:w-1/3 flex justify-center">
              <div className="w-48 h-48 sm:w-64 sm:h-64 rounded-full bg-emerald-600/10 border border-emerald-500/20 flex items-center justify-center shadow-2xl relative overflow-hidden">
                <Waves className="w-24 h-24 sm:w-32 sm:h-32 text-emerald-400 group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/10 to-transparent"></div>
              </div>
            </div>
            <div className="lg:w-2/3 space-y-6 text-center lg:text-left">
              <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Intelligence Layer 03</span>
              <h3 className="text-3xl sm:text-5xl font-black text-white uppercase italic tracking-tighter">Engine Ocean</h3>
              <p className="text-lg text-gray-400 leading-relaxed font-light">
                An adaptive educational discovery hub. It resolves inquiries by stripping away fluff and delivering "Humanized Briefings" combined with "Nexus Deep Dives." It scales with your marks requirement and academic node, ensuring precision over noise.
              </p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-4">
                <span className="px-4 py-2 bg-white/5 rounded-full text-[10px] font-black uppercase text-gray-500 border border-white/5">Adaptive Retrieval</span>
                <span className="px-4 py-2 bg-white/5 rounded-full text-[10px] font-black uppercase text-gray-500 border border-white/5">Multi-Modal Briefing</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Quote */}
      <footer className="py-32 px-6 sm:px-12 text-center max-w-5xl mx-auto">
        <Quote className="w-16 h-16 text-cyan-500/10 mx-auto mb-8" />
        <h4 className="text-3xl sm:text-5xl font-black text-white italic tracking-tighter mb-12">
          "The future belongs to the <span className="text-cyan-500">Problem Solvers</span>, not the Exam Takers."
        </h4>
        <div className="h-px w-24 bg-cyan-600 mx-auto mb-12"></div>
        <button 
          onClick={onClose}
          className="px-12 py-6 bg-white text-black font-black rounded-full text-xs uppercase tracking-[0.3em] hover:bg-cyan-500 transition-all shadow-2xl flex items-center justify-center gap-4 mx-auto group"
        >
          Activate Learning Lab <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
        </button>
      </footer>
      
      <style>{`
        @keyframes scan {
            0% { top: 0%; opacity: 0; }
            5% { opacity: 1; }
            95% { opacity: 1; }
            100% { top: 100%; opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default MissionPage;
