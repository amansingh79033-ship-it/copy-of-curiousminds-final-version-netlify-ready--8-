
import React, { useState } from 'react';
import { UserProfile } from '../types';
import { mockBackend } from '../services/mockBackend';
import { Sparkles, ArrowRight, X, AlertCircle, Phone } from 'lucide-react';

interface RegistrationModalProps {
  onSuccess: (user: UserProfile) => void;
  onMoreInfo?: () => void;
  onClose: () => void;
}

const RegistrationModal: React.FC<RegistrationModalProps> = ({ onSuccess, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'STUDENT' as 'STUDENT' | 'PARENT',
    profession: '',
    testEdEngines: false,
    concernMessage: ''
  });

  const [error, setError] = useState<string | null>(null);

  const validatePhone = (phone: string) => {
    const clean = phone.trim().replace(/[\s\-\(\)]/g, '');
    const phonePattern = /^(\+)?(00)?[0-9]{8,15}$/;
    
    if (!phonePattern.test(clean)) {
        return "Please enter a valid phone number (e.g., +919876543210).";
    }

    let normalized = clean;
    if (normalized.startsWith('+')) normalized = normalized.substring(1);
    else if (normalized.startsWith('00')) normalized = normalized.substring(2);

    const blockedPrefixes = ['92', '98']; 
    if (blockedPrefixes.some(p => normalized.startsWith(p))) {
        return "Service temporarily restricted in this region.";
    }

    return null;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (formData.type === 'PARENT' && !formData.profession.trim()) {
      setError("Please specify your profession.");
      return;
    }

    const phoneError = validatePhone(formData.phone);
    if (phoneError) {
        setError(phoneError);
        return;
    }

    const newUser = mockBackend.registerUser(formData);
    onSuccess(newUser);
  };

  return (
    <div className="fixed inset-0 z-[150] bg-black/90 backdrop-blur-md overflow-y-auto px-4 py-8 sm:py-12 flex justify-center items-center" onClick={onClose} data-lenis-prevent>
        <div className="relative w-full max-w-lg bg-[#0a0a0a] border border-white/10 rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-10 shadow-[0_0_100px_rgba(34,211,238,0.15)] animate-in zoom-in-95 duration-300" onClick={(e) => e.stopPropagation()}>
          <button onClick={onClose} className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 transition-colors active:scale-90"><X className="w-5 h-5" /></button>
          
          <div className="text-center mb-6 sm:mb-8 mt-4 sm:mt-0">
             <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl mx-auto flex items-center justify-center mb-4 shadow-xl shadow-cyan-900/40">
                <Sparkles className="text-white w-6 h-6 sm:w-7 sm:h-7" />
             </div>
             <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2 tracking-tight">Claim Your Spot</h2>
             <p className="text-gray-400 text-xs sm:text-sm max-w-xs mx-auto leading-relaxed">Join the group and start learning. Default access: 3 searches per engine.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
             {error && (
                <div className="p-3 sm:p-4 bg-red-500/10 border border-red-500/20 rounded-xl sm:rounded-2xl flex items-center gap-3 text-red-400 text-xs sm:text-sm animate-in shake duration-300">
                    <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                    <p className="font-medium">{error}</p>
                </div>
             )}

             <div className="space-y-2">
                <label className="text-[9px] sm:text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Identity</label>
                <div className="grid grid-cols-2 gap-3">
                   <button type="button" onClick={() => setFormData({...formData, type: 'STUDENT'})} className={`py-3 sm:py-4 rounded-xl sm:rounded-2xl border font-bold text-xs sm:text-sm transition-all ${formData.type === 'STUDENT' ? 'bg-cyan-500 border-cyan-500 text-black shadow-lg shadow-cyan-900/20' : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'}`}>Student</button>
                   <button type="button" onClick={() => setFormData({...formData, type: 'PARENT'})} className={`py-3 sm:py-4 rounded-xl sm:rounded-2xl border font-bold text-xs sm:text-sm transition-all ${formData.type === 'PARENT' ? 'bg-purple-600 border-purple-600 text-white shadow-lg shadow-purple-900/20' : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'}`}>Parent</button>
                </div>
             </div>

             <div className="space-y-3 sm:space-y-4">
                <input required className="w-full bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl px-5 py-3.5 sm:py-4 text-white focus:border-cyan-500/50 outline-none transition-all placeholder:text-gray-600 text-sm" placeholder="Full Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                <input required type="email" className="w-full bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl px-5 py-3.5 sm:py-4 text-white focus:border-cyan-500/50 outline-none transition-all placeholder:text-gray-600 text-sm" placeholder="Email Address" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                <div className="relative">
                    <input required type="tel" className="w-full bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl px-5 py-3.5 sm:py-4 pl-12 text-white focus:border-cyan-500/50 outline-none transition-all placeholder:text-gray-600 text-sm" placeholder="Phone Number" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                    <Phone className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                </div>
             </div>

             {formData.type === 'PARENT' && (
               <div className="space-y-4 pt-2 animate-in fade-in slide-in-from-top-2">
                  <input required className="w-full bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl px-5 py-3.5 sm:py-4 text-white focus:border-purple-500/50 outline-none transition-all placeholder:text-gray-600 text-sm" placeholder="Profession" value={formData.profession} onChange={e => setFormData({...formData, profession: e.target.value})} />
                  <div className="flex items-center gap-3 p-4 bg-white/5 rounded-xl sm:rounded-2xl border border-white/5 cursor-pointer hover:bg-white/10 transition-colors" onClick={() => setFormData({...formData, testEdEngines: !formData.testEdEngines})}>
                     <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-lg border flex items-center justify-center shrink-0 transition-all ${formData.testEdEngines ? 'bg-green-500 border-green-500' : 'border-gray-500'}`}>
                        {formData.testEdEngines && <Sparkles className="w-3 h-3 text-black" />}
                     </div>
                     <p className="text-[11px] sm:text-sm font-medium text-white select-none">Enroll for early testing</p>
                  </div>
               </div>
             )}

             <button type="submit" className="w-full mt-4 sm:mt-6 bg-white text-black font-black py-4 sm:py-5 rounded-xl sm:rounded-[1.5rem] hover:bg-cyan-400 transition-all active:scale-[0.98] flex items-center justify-center gap-3 shadow-2xl text-xs sm:text-sm uppercase tracking-widest">
                Get Access Now <ArrowRight className="w-4 h-4 sm:w-5 h-5" />
             </button>
             
             <p className="text-center text-[9px] sm:text-[10px] text-gray-500 uppercase tracking-widest mt-4">Secure Learning Environment</p>
          </form>
        </div>
    </div>
  );
};

export default RegistrationModal;
