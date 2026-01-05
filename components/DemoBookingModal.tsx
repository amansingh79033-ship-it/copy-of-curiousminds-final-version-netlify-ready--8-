
import React, { useState } from 'react';
import { X, Calendar, ArrowRight, CheckCircle2, ShieldCheck, Zap, User, Mail, Phone, GraduationCap, Target } from 'lucide-react';
import { mockBackend } from '../services/mockBackend';

interface DemoBookingModalProps {
  onClose: () => void;
  userId: string;
}

const DemoBookingModal: React.FC<DemoBookingModalProps> = ({ onClose, userId }) => {
  const [step, setStep] = useState<'FORM' | 'SUCCESS'>('FORM');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    grade: '',
    focusArea: 'Synthesis Engine'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mockBackend.saveDemoBooking({
      userId,
      ...formData
    });
    setStep('SUCCESS');
  };

  return (
    <div className="fixed inset-0 z-[300] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-300 overflow-y-auto custom-scrollbar" data-lenis-prevent>
      <div className="bg-[#050505] border border-white/10 w-full max-w-xl rounded-[1.5rem] sm:rounded-[2.5rem] shadow-2xl relative overflow-hidden flex flex-col my-auto">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600"></div>
        
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 bg-white/5 hover:bg-white/10 rounded-full text-white transition-all active:scale-90 z-20"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-10 md:p-12">
          {step === 'FORM' ? (
            <div className="space-y-6 sm:space-y-8 animate-in fade-in slide-in-from-bottom-4">
              <div className="text-center space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full">
                  <Zap className="w-3 h-3 text-cyan-400" />
                  <span className="text-[9px] font-black uppercase tracking-widest text-cyan-400">Limited Capacity Cohort</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-white italic tracking-tighter uppercase leading-none">
                  Book Your <span className="text-cyan-500">Free Demo</span>
                </h2>
                <p className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-widest leading-relaxed">
                  45-min In-depth 1:1 // Full Engine Review
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 group-focus-within:text-cyan-500 transition-colors" />
                    <input required className="w-full bg-white/5 border border-white/10 rounded-xl py-3 sm:py-3.5 pl-12 pr-4 text-white outline-none focus:border-cyan-500/50 text-sm placeholder:text-gray-600" placeholder="Full Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                  </div>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 group-focus-within:text-cyan-500 transition-colors" />
                    <input required type="email" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 sm:py-3.5 pl-12 pr-4 text-white outline-none focus:border-cyan-500/50 text-sm placeholder:text-gray-600" placeholder="Email Address" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="relative group">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 group-focus-within:text-cyan-500 transition-colors" />
                    <input required className="w-full bg-white/5 border border-white/10 rounded-xl py-3 sm:py-3.5 pl-12 pr-4 text-white outline-none focus:border-cyan-500/50 text-sm placeholder:text-gray-600" placeholder="Phone Number" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                  </div>
                  <div className="relative group">
                    <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 group-focus-within:text-cyan-500 transition-colors" />
                    <select required className="w-full bg-white/5 border border-white/10 rounded-xl py-3 sm:py-3.5 pl-12 pr-4 text-white outline-none focus:border-cyan-500/50 text-sm appearance-none cursor-pointer placeholder:text-gray-600" value={formData.grade} onChange={e => setFormData({...formData, grade: e.target.value})}>
                      <option value="" disabled className="bg-black">Academic Node</option>
                      {[...Array(12)].map((_, i) => <option key={i} value={i+1} className="bg-black">Grade {i+1}</option>)}
                      <option value="University" className="bg-black">University</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[9px] font-black text-gray-600 uppercase tracking-[0.2em] ml-1 flex items-center gap-2">
                    <Target className="w-3 h-3" /> Initial Focus Area
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {['Synthesis Engine', 'beYOU Engine', 'Engine Ocean', 'Academic Mapping'].map(area => (
                      <button 
                        key={area} 
                        type="button" 
                        onClick={() => setFormData({...formData, focusArea: area})} 
                        className={`py-2.5 sm:py-3 rounded-lg border text-[8px] sm:text-[9px] font-black uppercase tracking-widest transition-all ${formData.focusArea === area ? 'bg-cyan-500/20 border-cyan-500 text-cyan-400' : 'bg-white/5 border-white/10 text-gray-600'}`}
                      >
                        {area}
                      </button>
                    ))}
                  </div>
                </div>

                <button 
                  type="submit" 
                  className="w-full py-4 sm:py-5 bg-white text-black font-black rounded-xl text-xs uppercase tracking-[0.3em] transition-all active:scale-[0.98] shadow-[0_20px_40px_rgba(255,255,255,0.1)] hover:bg-cyan-400 flex items-center justify-center gap-3 mt-4"
                >
                  Confirm Free Slot <ArrowRight className="w-4 h-4" />
                </button>

                <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[8px] text-gray-600 font-bold uppercase tracking-widest pt-4">
                  <span className="flex items-center gap-1.5"><ShieldCheck className="w-3 h-3 text-cyan-500" /> Professional Coach</span>
                  <span className="flex items-center gap-1.5"><Calendar className="w-3 h-3 text-cyan-500" /> 24h Confirmation</span>
                </div>
              </form>
            </div>
          ) : (
            <div className="text-center space-y-6 sm:space-y-8 py-6 sm:py-10 animate-in zoom-in-95">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center mx-auto shadow-[0_0_60px_rgba(34,211,238,0.15)]">
                <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12 text-cyan-400" />
              </div>
              <div className="space-y-3">
                <h2 className="text-2xl sm:text-3xl font-black text-white italic uppercase tracking-tighter">Request Received</h2>
                <p className="text-[11px] sm:text-xs text-gray-500 uppercase tracking-widest leading-relaxed max-w-sm mx-auto px-2">
                  Your 45-min free diagnostic demo is being scheduled. A coach will contact you via <span className="text-cyan-400">{formData.phone}</span> shortly.
                </p>
              </div>
              <button 
                onClick={onClose} 
                className="px-10 sm:px-12 py-3.5 sm:py-4 bg-white/5 hover:bg-white/10 text-white rounded-full font-black text-[10px] uppercase tracking-widest border border-white/10 transition-all active:scale-95"
              >
                Close Interface
              </button>
            </div>
          )}
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

export default DemoBookingModal;
