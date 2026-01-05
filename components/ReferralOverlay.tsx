
import React, { useState } from 'react';
import { Gift, X, Copy, CheckCircle2, ShieldCheck, Ticket, Users, TrendingUp, Sparkles } from 'lucide-react';
import { UserProfile } from '../types';

interface ReferralOverlayProps {
  onClose: () => void;
  currentUser: UserProfile | null;
  onRegister: () => void;
}

const ReferralOverlay: React.FC<ReferralOverlayProps> = ({ onClose, currentUser, onRegister }) => {
  const [redeemCode, setRedeemCode] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const referralCode = currentUser?.referralCode || "---";

  const handleCopy = () => {
     if (currentUser && currentUser.referralCode && currentUser.referralCode !== "---") {
        navigator.clipboard.writeText(currentUser.referralCode);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
     } else if (!currentUser) {
        alert("Please register to get your unique referral code.");
     }
  };

  const handleRedeem = (e: React.FormEvent) => {
      e.preventDefault();
      if (!redeemCode.trim()) return;
      alert(`Validating code: ${redeemCode.toUpperCase()}... Verification successful. Credits will be applied to your next session.`);
      setRedeemCode('');
  };

  return (
    <div 
      className="fixed inset-0 z-[160] bg-black/95 backdrop-blur-xl overflow-y-auto custom-scrollbar animate-in fade-in duration-300"
      data-lenis-prevent
    >
       {/* Background Noise & Glows */}
       <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
       <div className="fixed -top-[10%] -left-[10%] w-[50%] h-[50%] bg-emerald-600/10 rounded-full blur-[120px] pointer-events-none"></div>
       <div className="fixed -bottom-[10%] -right-[10%] w-[50%] h-[50%] bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none"></div>

       <div className="min-h-full w-full flex items-center justify-center p-4 sm:p-8 md:p-12">
          <div className="w-full max-w-5xl relative">
             <button 
                onClick={onClose}
                className="absolute -top-4 -right-4 sm:top-4 sm:right-4 z-50 p-3 bg-white/5 hover:bg-white/10 rounded-full text-white transition-all active:scale-90 border border-white/10 backdrop-blur-md"
             >
                <X className="w-6 h-6" />
             </button>

             <div className="w-full bg-black border border-white/5 rounded-[2.5rem] sm:rounded-[4rem] overflow-hidden shadow-2xl relative p-6 sm:p-10 md:p-16 lg:p-20">
                <div className="relative z-10 flex flex-col items-center">
                   
                   <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full mb-8">
                      <Sparkles className="w-4 h-4 text-emerald-400" />
                      <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-400">Growth Protocol</span>
                   </div>

                   <h2 className="text-4xl sm:text-6xl md:text-7xl font-black text-white mb-6 tracking-tighter uppercase italic text-center leading-none">
                      Education <span className="text-emerald-500">Chain</span> Reaction
                   </h2>
                   
                   <p className="text-lg md:text-xl text-gray-400 mb-16 font-light max-w-2xl text-center leading-relaxed italic">
                      Every node added to our network strengthens the collective intelligence. We incentivize growth through direct and indirect referrals.
                   </p>

                   {/* Enhanced Tiers Grid */}
                   <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 w-full">
                      <div className="group bg-white/[0.03] border border-white/10 rounded-[2rem] p-8 transition-all hover:bg-white/[0.05] hover:border-emerald-500/30 flex flex-col items-center text-center">
                          <div className="p-4 bg-emerald-500/10 rounded-2xl mb-6 text-emerald-500 group-hover:scale-110 transition-transform">
                             <Users className="w-8 h-8" />
                          </div>
                          <div className="text-5xl font-black text-white mb-2 tracking-tighter italic">$10</div>
                          <div className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400/80 mb-4">Direct Connection</div>
                          <p className="text-xs text-gray-500 leading-relaxed italic">Earn immediately when a student joins using your signature.</p>
                      </div>

                      <div className="group bg-white/[0.03] border border-white/10 rounded-[2rem] p-8 transition-all hover:bg-white/[0.05] hover:border-yellow-500/30 flex flex-col items-center text-center">
                          <div className="p-4 bg-yellow-500/10 rounded-2xl mb-6 text-yellow-500 group-hover:scale-110 transition-transform">
                             <TrendingUp className="w-8 h-8" />
                          </div>
                          <div className="text-5xl font-black text-white mb-2 tracking-tighter italic">+$5</div>
                          <div className="text-[10px] font-black uppercase tracking-[0.2em] text-yellow-400/80 mb-4">Network Growth</div>
                          <p className="text-xs text-gray-500 leading-relaxed italic">Passive yield from connections made by your direct invites.</p>
                      </div>

                      <div className="group bg-white/[0.03] border border-white/10 rounded-[2rem] p-8 transition-all hover:bg-white/[0.05] hover:border-cyan-500/30 flex flex-col items-center text-center">
                          <div className="p-4 bg-cyan-500/10 rounded-2xl mb-6 text-cyan-500 group-hover:scale-110 transition-transform">
                             <Gift className="w-8 h-8" />
                          </div>
                          <div className="text-5xl font-black text-white mb-2 tracking-tighter italic">+$2</div>
                          <div className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-400/80 mb-4">Community Bonus</div>
                          <p className="text-xs text-gray-500 leading-relaxed italic">Third-tier network effects as the CuriousMinds web expands.</p>
                      </div>
                   </div>

                   {/* Interaction Sections */}
                   <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
                      {/* Left: Your Identity */}
                      <div className="bg-white/[0.02] border border-white/5 p-8 sm:p-12 rounded-[2.5rem] flex flex-col h-full relative group">
                         <div className="absolute inset-0 bg-emerald-500/[0.02] opacity-0 group-hover:opacity-100 transition-opacity rounded-[2.5rem]"></div>
                         <div className="relative z-10 flex flex-col h-full">
                            <p className="text-emerald-400 text-[10px] font-black uppercase tracking-widest mb-6 flex items-center gap-3">
                               <ShieldCheck className="w-4 h-4" /> Unique Node Signature
                            </p>
                            <div className="flex flex-col sm:flex-row items-stretch gap-4 mb-8">
                               <div className="flex-1 bg-black/60 border border-white/10 rounded-2xl p-6 text-2xl sm:text-3xl font-mono text-white tracking-[0.4em] text-center shadow-inner flex items-center justify-center">
                                  {referralCode}
                               </div>
                               <button 
                                  onClick={handleCopy} 
                                  className={`p-6 rounded-2xl transition-all active:scale-95 flex items-center justify-center ${isCopied ? 'bg-emerald-500 text-white' : 'bg-white text-black hover:bg-emerald-400'}`}
                               >
                                  {isCopied ? <CheckCircle2 className="w-8 h-8" /> : <Copy className="w-8 h-8" />}
                                </button>
                            </div>
                            <p className="text-[10px] text-gray-500 leading-relaxed uppercase tracking-widest mt-auto">
                               Share this signature. Rewards are credited to your CuriousMinds wallet in real-time upon verification.
                            </p>
                         </div>
                      </div>

                      {/* Right: Validation */}
                      <div className="bg-white/[0.02] border border-white/5 p-8 sm:p-12 rounded-[2.5rem] flex flex-col group">
                         <div className="absolute inset-0 bg-cyan-500/[0.02] opacity-0 group-hover:opacity-100 transition-opacity rounded-[2.5rem]"></div>
                         <div className="relative z-10">
                            <p className="text-cyan-400 text-[10px] font-black uppercase tracking-widest mb-6 flex items-center gap-3">
                               <Ticket className="w-4 h-4" /> Redeem Signature
                            </p>
                            <form onSubmit={handleRedeem} className="space-y-4">
                               <input 
                                  value={redeemCode}
                                  onChange={e => setRedeemCode(e.target.value)}
                                  placeholder="ENTER SIGNATURE..." 
                                  className="w-full bg-black/60 border border-white/10 rounded-2xl p-6 text-xl font-mono text-white tracking-widest text-center uppercase outline-none focus:border-cyan-500/50 transition-all placeholder:text-gray-800"
                               />
                               <button 
                                 type="submit"
                                 disabled={!redeemCode.trim()}
                                 className="w-full py-5 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-30 disabled:hover:bg-cyan-600 text-white rounded-2xl font-black text-xs uppercase tracking-[0.3em] transition-all active:scale-[0.98] shadow-2xl"
                               >
                                  Validate Node
                               </button>
                            </form>
                            {!currentUser && (
                               <button 
                                 onClick={() => { onClose(); onRegister(); }}
                                 className="mt-6 w-full text-[10px] font-black uppercase text-gray-500 hover:text-white transition-colors tracking-[0.2em]"
                               >
                                 Identification Required. Join Now →
                               </button>
                            )}
                         </div>
                      </div>
                   </div>
                </div>
             </div>
          </div>
       </div>
       <style>{`
          .custom-scrollbar::-webkit-scrollbar { width: 4px; }
          .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
          .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
       `}</style>
    </div>
  );
};

export default ReferralOverlay;
