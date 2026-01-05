
import React, { useState, useEffect, useRef } from 'react';
import { X, GraduationCap, Briefcase, Rocket, Sparkles, BrainCircuit, ArrowRight, Target, Zap, ChevronRight, Layers, Waves, Search } from 'lucide-react';
import FlyingPosters from './FlyingPosters';
import Lenis from 'lenis';

interface ProductCapabilitiesProps {
  onClose: () => void;
  onExplore: (productId: string) => void;
}

const products = [
  {
    id: 'synthesis',
    title: "Synthesis Engine",
    subtitle: "Real-world Simulation",
    description: "Stop memorizing. Start solving. Infinite, AI-generated academic scenarios that test application over retention.",
    gradientClass: "bg-gradient-to-r from-cyan-600 to-blue-600",
    icon: BrainCircuit,
    badge: "Core Engine",
    badgeIcon: Zap,
    badgeColor: "text-cyan-300",
    glowColor: "bg-cyan-500"
  },
  {
    id: 'beyou',
    title: "beYOU Engine",
    subtitle: "Predictive Career Modeling",
    description: "Converse with your winning self. Analyze micro-traits and reverse-engineer your success trajectory.",
    gradientClass: "bg-gradient-to-r from-violet-600 to-indigo-600",
    icon: Sparkles,
    badge: "Flagship Product",
    badgeIcon: Sparkles,
    badgeColor: "text-yellow-300",
    glowColor: "bg-purple-500"
  },
  {
    id: 'ocean',
    title: "Engine Ocean",
    subtitle: "Adaptive Educational Search",
    description: "The world's first adaptive educational search. Deep-dive results optimized for human learning and AI analysis.",
    gradientClass: "bg-gradient-to-r from-emerald-600 to-teal-700",
    icon: Waves,
    badge: "Intelligence Hub",
    badgeIcon: Search,
    badgeColor: "text-emerald-300",
    glowColor: "bg-emerald-500"
  }
];

const ProductCapabilities: React.FC<ProductCapabilitiesProps> = ({ onClose, onExplore }) => {
  const [activeIndex, setActiveIndex] = useState(0); 
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const lenis = new Lenis({
      wrapper: containerRef.current,
      content: containerRef.current.firstElementChild as HTMLElement,
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });
    function raf(time: number) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => { setActiveIndex((prev) => (prev + 1) % products.length); }, 3500);
    return () => clearInterval(interval);
  }, [isHovered]);

  const currentProduct = products[activeIndex];
  const nextProduct = products[(activeIndex + 1) % products.length];

  const posterImages = [
    'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1634152962476-4b8a00e1915c?q=80&w=1000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1614728263952-84ea256f9679?q=80&w=1000&auto=format&fit=crop',
  ];

  return (
    <div className="fixed inset-0 z-[140] bg-[#050505] animate-in fade-in duration-500 flex flex-col md:flex-row overflow-hidden">
      
      <button 
        onClick={onClose}
        className="absolute top-6 right-6 z-[160] p-2.5 sm:p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors backdrop-blur-md border border-white/10 group active:scale-90"
      >
        <X className="w-5 h-5 sm:w-6 h-6 group-hover:rotate-90 transition-transform" />
      </button>

      <div ref={containerRef} className="w-full md:w-[60%] h-full overflow-y-auto no-scrollbar relative z-20 bg-[#050505] border-r border-white/5">
        <div className="p-6 sm:p-10 md:p-14 lg:p-20 max-w-4xl mx-auto space-y-12 sm:space-y-16 pb-32">
          
          <div className="space-y-5 pt-12 md:pt-0">
             <div className="flex items-center gap-2 text-cyan-400 font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em]">
                <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span>
                Integrated Ecosystem
             </div>
             <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black font-['Space_Grotesk'] text-white leading-[1.1] tracking-tighter italic uppercase">
                Three Engines. <br className="hidden sm:block"/>
                <span className="text-gray-600">Infinite Synthesis.</span>
             </h2>
             <p className="text-gray-400 max-w-2xl leading-relaxed text-sm sm:text-lg font-light">
                CuriousMinds deploys three distinct cognitive layers designed to eliminate classroom abstraction and deliver absolute neural clarity.
             </p>
          </div>

          {/* STACK - AUDITED FOR MOBILE HEIGHTS */}
          <div className="relative py-12 px-2 flex justify-center h-[450px] sm:h-[500px] lg:h-[600px]">
             <div className="relative w-full max-w-[300px] sm:max-w-md lg:max-w-lg h-full mx-auto">
                <div className={`absolute top-10 left-8 w-full h-full rounded-[2.5rem] sm:rounded-[3.5rem] opacity-20 scale-[0.85] -z-30 transition-all duration-700 rotate-12 ${nextProduct.gradientClass} blur-[2px]`}></div>
                <div className={`absolute top-5 left-4 w-full h-full rounded-[2.5rem] sm:rounded-[3.5rem] opacity-40 scale-[0.92] -z-20 transition-all duration-700 rotate-6 ${nextProduct.gradientClass} shadow-2xl`}></div>

                <div 
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  className={`relative w-full h-full rounded-[2.5rem] sm:rounded-[3.5rem] p-8 sm:p-10 lg:p-14 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.9)] overflow-hidden group transform hover:-translate-y-2 hover:rotate-0 transition-all duration-500 border border-white/5
                    ${isHovered ? 'bg-black' : currentProduct.gradientClass}
                  `}
                >
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30 mix-blend-overlay pointer-events-none"></div>
                    
                    <div className="relative z-10 flex flex-col h-full justify-between">
                      <div className="space-y-6">
                          <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-[9px] sm:text-[10px] font-black uppercase tracking-widest border border-white/10">
                              <currentProduct.badgeIcon className={`w-4 h-4 ${isHovered ? 'text-white' : currentProduct.badgeColor}`} /> 
                              {currentProduct.badge}
                          </div>
                          
                          <div className="transition-all duration-500">
                              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black font-['Space_Grotesk'] mb-3 leading-tight text-white tracking-tighter italic uppercase">
                                  {currentProduct.title}
                              </h3>
                              <h4 className="text-xs sm:text-base lg:text-xl mb-6 font-medium text-white/70 uppercase tracking-widest">
                                  {currentProduct.subtitle}
                              </h4>
                              
                              <p className="text-sm sm:text-lg lg:text-xl leading-relaxed max-w-lg text-white/90 font-light line-clamp-5 sm:line-clamp-none">
                                  {currentProduct.description}
                              </p>
                          </div>
                      </div>

                      <div className="flex flex-col gap-4 mt-auto">
                          <button 
                            onClick={() => onExplore(currentProduct.id)}
                            className="w-full px-8 py-4 sm:py-5 rounded-full font-black transition-all flex items-center justify-center gap-3 shadow-2xl bg-white text-black active:scale-95 text-[10px] sm:text-xs lg:text-sm uppercase tracking-[0.3em]"
                          >
                            Synchronize <ChevronRight className="w-5 h-5" />
                          </button>
                      </div>
                    </div>

                    {!isHovered && (
                      <div className="absolute bottom-0 left-0 h-1.5 bg-white/10 w-full">
                        <div key={activeIndex} className="h-full bg-white animate-[progress_3.5s_linear_forward]"></div>
                      </div>
                    )}
                </div>
             </div>
          </div>

          <div className="space-y-8 pt-10 border-t border-white/5">
             <h3 className="text-xl sm:text-2xl font-black text-white flex items-center gap-4 tracking-tighter uppercase italic">
                <Layers className="w-6 h-6 text-gray-600" />
                Performance Matrix
             </h3>
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="glass-panel p-6 sm:p-8 rounded-[2rem] border-l-4 border-cyan-500 hover:bg-white/5 transition-all group">
                   <h4 className="text-lg font-black text-white mb-3 uppercase tracking-tighter italic">Neural Learning</h4>
                   <p className="text-gray-500 text-xs sm:text-sm leading-relaxed font-light">
                      98.2% accuracy in predicting skill acquisition speed through the Synthesis layer.
                   </p>
                </div>
                <div className="glass-panel p-6 sm:p-8 rounded-[2rem] border-l-4 border-purple-500 hover:bg-white/5 transition-all group">
                   <h4 className="text-lg font-black text-white mb-3 uppercase tracking-tighter italic">Career Pathing</h4>
                   <p className="text-gray-500 text-xs sm:text-sm leading-relaxed font-light">
                      beYOU models future industry shifts and aligns your persona for high-value leadership nodes.
                   </p>
                </div>
             </div>
          </div>
        </div>
      </div>

      <div className="hidden md:block w-[40%] relative bg-black">
         <div className="absolute inset-0 z-10 bg-gradient-to-b from-[#050505] via-transparent to-[#050505] pointer-events-none"></div>
         <div className="absolute inset-0 z-20 text-center flex flex-col items-center justify-center mix-blend-difference px-10">
            <h3 className="text-7xl lg:text-9xl font-black text-white tracking-tighter opacity-20 hover:opacity-100 transition-all duration-700 cursor-default uppercase italic leading-none">SHIFT</h3>
            <p className="text-[10px] lg:text-xs font-mono tracking-[0.8em] text-gray-400 mt-6 uppercase">Perspective Engine</p>
         </div>
         <FlyingPosters items={posterImages} planeWidth={400} planeHeight={500} className="w-full h-full opacity-40 grayscale hover:grayscale-0 transition-all duration-1000" />
      </div>
      
      <style>{`
        @keyframes progress { from { width: 0%; } to { width: 100%; } }
      `}</style>
    </div>
  );
};

export default ProductCapabilities;
