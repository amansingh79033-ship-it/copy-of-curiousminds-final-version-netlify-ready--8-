
import React, { useState, useEffect } from 'react';
import { Brain, Rocket, Palette, Sparkles, BarChart3, Users, MessageCircle, Zap, Target, Clock, FlaskConical, ArrowUpRight } from 'lucide-react';

interface ImpactSectionProps {
  onRegister: () => void;
}

const FEATURES = [
  { icon: Target, title: "Strong & Weak Areas Identification" },
  { icon: Zap, title: "Future Aspirations & Tech Alignment" },
  { icon: Clock, title: "Learning Pace Analysis" },
  { icon: Brain, title: "Cognitive Style Assessment" },
  { icon: Rocket, title: "Project-Based Learning" },
  { icon: Palette, title: "Creative Problem Solving" },
  { icon: Sparkles, title: "Future Skills Builder" }
];

const ImpactSection: React.FC<ImpactSectionProps> = ({ onRegister }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % FEATURES.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [isHovered]);

  const currentFeature = FEATURES[activeIndex];

  return (
    <section className="py-24 px-6 relative overflow-hidden border-t border-white/5 bg-gradient-to-b from-[#050505] to-black">
      {/* Background Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-900/10 rounded-full blur-[120px] pointer-events-none"></div>
      
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16 md:gap-24">
        
        {/* Left: Text Content */}
        <div className="flex-1 space-y-8 text-center md:text-left relative z-10">
           <h2 className="text-3xl md:text-5xl font-bold leading-tight font-['Space_Grotesk']">
             <span className="text-gray-400 text-lg md:text-xl font-normal block mb-6 tracking-wide uppercase">We are curious to tell you...</span>
             98% of the time, we have experienced <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">more than 100% change</span> in 3 weeks.
           </h2>
           <p className="text-xl text-gray-400 font-light leading-relaxed max-w-lg mx-auto md:mx-0">
             Through our unique approach to education and learning, we unlock the potential that traditional methods ignore.
           </p>
           
           <button 
             onClick={onRegister}
             className="group relative px-8 py-4 bg-white text-black rounded-full font-bold text-lg hover:scale-105 transition-all flex items-center gap-3 mx-auto md:mx-0 shadow-[0_0_30px_rgba(255,255,255,0.2)] overflow-hidden"
           >
             <span className="relative z-10">Book your slot to our very first cohort</span>
             <span className="relative z-10 px-2 py-0.5 bg-black text-white text-[10px] font-bold uppercase tracking-wider rounded">Coming Soon!</span>
             <ArrowUpRight className="relative z-10 w-5 h-5 ml-1" />
             <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-white opacity-0 group-hover:opacity-100 transition-opacity"></div>
           </button>
        </div>

        {/* Right: Swiping Card Stack */}
        <div className="flex-1 w-full flex justify-center perspective-1000">
           <div className="relative w-full max-w-sm aspect-[3.5/4.5] group/stack">
              
              {/* Stack Layer 3 (Bottom) */}
              <div className="absolute top-12 left-8 w-full h-full rounded-[2.5rem] opacity-30 scale-90 -z-30 transition-all duration-700 rotate-6 bg-gradient-to-br from-cyan-600 to-blue-700 blur-[1px]"></div>

              {/* Stack Layer 2 (Middle) */}
              <div className="absolute top-6 left-4 w-full h-full rounded-[2.5rem] opacity-60 scale-95 -z-20 transition-all duration-700 rotate-3 bg-gradient-to-br from-cyan-600 to-blue-700 shadow-2xl"></div>

              {/* Main Card */}
              <div 
                 onMouseEnter={() => setIsHovered(true)}
                 onMouseLeave={() => setIsHovered(false)}
                 className={`relative w-full h-full rounded-[2.5rem] p-10 flex flex-col items-center justify-center text-center shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] overflow-hidden transition-all duration-500 transform hover:-translate-y-2 hover:rotate-0
                   ${isHovered ? 'bg-[#0a0a0a] border border-white/20' : 'bg-gradient-to-br from-cyan-500 to-blue-600'}
                 `}
              >
                 {/* Noise Texture */}
                 <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30 mix-blend-overlay pointer-events-none"></div>
                 
                 {/* Hover Glow */}
                 <div className={`absolute top-0 right-0 w-64 h-64 rounded-full blur-[60px] transform translate-x-1/2 -translate-y-1/2 transition-opacity duration-500 ${isHovered ? 'bg-cyan-500/20 opacity-100' : 'opacity-0'}`}></div>

                 {/* Content Wrapper */}
                 <div key={activeIndex} className="relative z-10 w-full h-full flex flex-col items-center justify-center gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    
                    {/* Icon Container */}
                    <div className={`w-28 h-28 rounded-[2rem] flex items-center justify-center transition-colors duration-300 ${isHovered ? 'bg-white/5 border border-white/10' : 'bg-white/20 backdrop-blur-md shadow-inner border border-white/10'}`}>
                       <currentFeature.icon className="w-12 h-12 text-white" />
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-3xl md:text-4xl font-bold text-white leading-tight font-['Space_Grotesk'] drop-shadow-md">
                      {currentFeature.title}
                    </h3>

                 </div>

                 {/* Progress Bar - Only visible when NOT hovered */}
                 {!isHovered && (
                    <div className="absolute bottom-10 left-10 right-10 h-1.5 bg-black/20 rounded-full overflow-hidden">
                       <div key={activeIndex} className="h-full bg-white/90 animate-[progress_2s_linear_forward] rounded-full"></div>
                    </div>
                 )}
              </div>
           </div>
        </div>
      </div>
      <style>{`
        @keyframes progress {
          from { width: 0%; }
          to { width: 100%; }
        }
        .perspective-1000 {
            perspective: 1000px;
        }
      `}</style>
    </section>
  );
};

export default ImpactSection;
