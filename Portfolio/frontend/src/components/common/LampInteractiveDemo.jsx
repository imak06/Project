import React, { useState } from 'react';
import { Lightbulb, Lock, Mail, ArrowRight, Sparkles } from 'lucide-react';

export default function LampInteractiveDemo() {
  const [lampOn, setLampOn] = useState(true);
  const [cordPulled, setCordPulled] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [demoSuccess, setDemoSuccess] = useState(false);

  const toggleLamp = () => {
    setCordPulled(true);
    setTimeout(() => {
      setLampOn(prev => !prev);
      setCordPulled(false);
    }, 200);
  };

  const handleDemoSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      setDemoSuccess(true);
      setTimeout(() => setDemoSuccess(false), 3000);
    }
  };

  return (
    <div className={`relative w-full rounded-2xl overflow-hidden border transition-all duration-700 ${
      lampOn 
        ? 'bg-[#0b0f19] border-brand-500/30 shadow-[0_0_50px_-10px_rgba(99,102,241,0.25)]' 
        : 'bg-[#030407] border-white/5 shadow-none'
    }`}>
      {/* Light cone overlay */}
      {lampOn && (
        <div className="absolute top-16 left-1/2 -translate-x-1/2 w-[340px] sm:w-[460px] h-[360px] bg-gradient-to-b from-amber-300/25 via-brand-500/10 to-transparent blur-2xl pointer-events-none transition-opacity duration-700" />
      )}

      {/* Top Banner Tag */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-white/10 bg-black/30 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
          <span className="text-xs font-mono font-medium text-amber-300 uppercase tracking-wider">
            Interactive Live Concept • Lamp Login Page
          </span>
        </div>
        <button
          onClick={toggleLamp}
          className="text-xs px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-white font-mono transition-colors flex items-center gap-1.5"
        >
          <Lightbulb className={`w-3.5 h-3.5 ${lampOn ? 'text-amber-400' : 'text-slate-500'}`} />
          <span>{lampOn ? 'Turn Off Light' : 'Turn On Light'}</span>
        </button>
      </div>

      <div className="p-6 sm:p-10 flex flex-col items-center justify-center relative">
        {/* SVG Hanging Lamp Assembly */}
        <div className="relative flex flex-col items-center mb-6">
          {/* Wire */}
          <div className="w-[2px] h-14 bg-gradient-to-b from-slate-600 to-slate-400" />
          
          {/* Lamp shade */}
          <div className={`w-24 h-12 rounded-t-[50px] border-b-2 border-amber-400 transition-all duration-300 ${
            lampOn 
              ? 'bg-gradient-to-b from-slate-700 to-amber-500/80 shadow-[0_0_30px_rgba(245,158,11,0.8)]' 
              : 'bg-slate-800'
          }`} />

          {/* Glowing bulb */}
          <div className={`w-6 h-6 rounded-full -mt-2 transition-all duration-300 ${
            lampOn ? 'bg-amber-200 shadow-[0_0_20px_10px_rgba(251,191,36,0.6)]' : 'bg-slate-700'
          }`} />

          {/* Draggable/Pullable Cord with bead */}
          <button
            onClick={toggleLamp}
            title="Click to pull cord and switch lamp"
            className="group flex flex-col items-center mt-1 cursor-pointer transition-transform duration-200 active:translate-y-3"
          >
            <div className={`w-[2px] transition-all duration-200 ${
              cordPulled ? 'h-16 bg-amber-400' : 'h-10 bg-slate-500 group-hover:bg-amber-300'
            }`} />
            <div className={`w-3.5 h-3.5 rounded-full transition-all duration-200 ${
              lampOn ? 'bg-amber-400 group-hover:scale-125' : 'bg-slate-400 group-hover:bg-amber-400'
            }`} />
            <span className="text-[10px] font-mono text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity mt-1">
              Pull cord
            </span>
          </button>
        </div>

        {/* Dynamic Form revealing upon lamp state */}
        <div className={`w-full max-w-sm transition-all duration-700 ${
          lampOn 
            ? 'opacity-100 translate-y-0 filter-none pointer-events-auto' 
            : 'opacity-10 translate-y-4 filter blur-[2px] pointer-events-none'
        }`}>
          <div className="glass p-6 sm:p-8 rounded-2xl border border-white/10 shadow-2xl space-y-4">
            <div className="text-center space-y-1">
              <h4 className="text-base font-semibold text-white flex items-center justify-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Interactive Access Demo</span>
              </h4>
              <p className="text-xs text-slate-400">
                Created with SVG, GSAP Morph & Draggable logic
              </p>
            </div>

            {demoSuccess ? (
              <div className="p-4 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-center text-xs space-y-1 animate-in zoom-in-95">
                <p className="font-semibold">Demo Authentication Successful!</p>
                <p className="text-slate-400">Physics cord triggered form visibility cleanly.</p>
              </div>
            ) : (
              <form onSubmit={handleDemoSubmit} className="space-y-3">
                <div>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="developer@example.com"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-dark-950/70 border border-white/10 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-dark-950/70 border border-white/10 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-amber-500 via-brand-500 to-brand-accent hover:from-amber-400 hover:to-brand-violet text-white transition-all shadow-glow-sm flex items-center justify-center gap-2 group"
                >
                  <span>Test Interactive Logic</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
