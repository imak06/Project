import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, Download, Mail, Terminal, Sparkles, 
  Code2, ExternalLink, ChevronDown, CheckCircle2 
} from 'lucide-react';
import { Github, Linkedin } from '../common/SocialIcons';

export default function HeroSection({ profile, settings }) {
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  const titles = profile?.typingTitles?.length 
    ? profile.typingTitles 
    : ['Full-Stack Developer', 'MERN Stack Developer', 'Frontend Developer', 'Tech Enthusiast'];

  useEffect(() => {
    const handleTyping = () => {
      const fullText = titles[currentTitleIndex % titles.length];
      if (isDeleting) {
        setCurrentText(fullText.substring(0, currentText.length - 1));
        setTypingSpeed(40);
      } else {
        setCurrentText(fullText.substring(0, currentText.length + 1));
        setTypingSpeed(110);
      }

      if (!isDeleting && currentText === fullText) {
        setTimeout(() => setIsDeleting(true), 1600);
      } else if (isDeleting && currentText === '') {
        setIsDeleting(false);
        setCurrentTitleIndex((prev) => prev + 1);
        setTypingSpeed(300);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentTitleIndex, titles, typingSpeed]);

  const resumeUrl = profile?.resumeUrl || settings?.resumeFile || '/resume.pdf';

  return (
    <section id="home" className="relative min-h-screen pt-28 pb-20 flex items-center justify-center overflow-hidden bg-grid-pattern">
      {/* Background radial gradient spotlights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-500/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-brand-violet/15 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[350px] h-[350px] bg-brand-cyan/10 rounded-full blur-[90px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Heading, Animated Typing, Subheading, CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Status Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-300 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Available for Full-Stack Roles & Projects</span>
            </div>

            {/* Main Greeting & Name */}
            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-extrabold tracking-tight text-white light:text-slate-900 leading-none">
              Hi, I'm <span className="text-gradient-primary">{profile?.name || 'Arik Maitra'}</span>.
            </h1>

            {/* Typing dynamic title */}
            <div className="h-12 sm:h-14 flex items-center justify-center lg:justify-start">
              <span className="text-xl sm:text-3xl font-semibold font-mono text-slate-300 light:text-slate-700">
                A passionate{' '}
                <span className="text-brand-cyan border-b-2 border-brand-cyan/60 pb-0.5">
                  {currentText}
                </span>
                <span className="animate-pulse text-brand-400">|</span>
              </span>
            </div>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-slate-400 light:text-slate-600 max-w-2xl leading-relaxed mx-auto lg:mx-0">
              {profile?.heroSubtitle || 'Building modern digital experiences with code, creativity, and curiosity.'}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <a
                href="#projects"
                className="px-6 py-3.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-brand-600 via-brand-accent to-brand-violet hover:from-brand-500 hover:to-brand-500 text-white shadow-glow-sm hover:shadow-glow-md transition-all duration-300 flex items-center gap-2 hover:-translate-y-0.5"
              >
                <span>Explore My Work</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                download="Arik_Maitra_Resume.pdf"
                className="px-6 py-3.5 rounded-xl text-sm font-semibold bg-dark-900 light:bg-white text-slate-200 light:text-slate-800 border border-white/10 light:border-black/10 hover:border-brand-500/40 hover:bg-white/5 transition-all flex items-center gap-2"
              >
                <Download className="w-4 h-4 text-brand-400" />
                <span>Download Resume</span>
              </a>

              <a
                href="#contact"
                className="px-6 py-3.5 rounded-xl text-sm font-semibold bg-transparent hover:bg-white/5 text-slate-400 hover:text-white border border-transparent hover:border-white/10 transition-all flex items-center gap-2"
              >
                <Mail className="w-4 h-4" />
                <span>Contact Me</span>
              </a>
            </div>

            {/* Quick stats pills */}
            <div className="pt-8 border-t border-white/10 light:border-black/5 grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0">
              <div className="p-3 rounded-xl bg-dark-900/50 light:bg-white/50 border border-white/5 light:border-black/5 text-center">
                <div className="text-xl sm:text-2xl font-bold font-mono text-white light:text-slate-900">
                  {profile?.stats?.projectsCount || '14'}+
                </div>
                <div className="text-[11px] uppercase tracking-wider text-slate-400 light:text-slate-500 mt-0.5">
                  Projects Built
                </div>
              </div>
              <div className="p-3 rounded-xl bg-dark-900/50 light:bg-white/50 border border-white/5 light:border-black/5 text-center">
                <div className="text-xl sm:text-2xl font-bold font-mono text-brand-400">
                  MERN
                </div>
                <div className="text-[11px] uppercase tracking-wider text-slate-400 light:text-slate-500 mt-0.5">
                  Full-Stack Core
                </div>
              </div>
              <div className="p-3 rounded-xl bg-dark-900/50 light:bg-white/50 border border-white/5 light:border-black/5 text-center">
                <div className="text-xl sm:text-2xl font-bold font-mono text-amber-400">
                  2028
                </div>
                <div className="text-[11px] uppercase tracking-wider text-slate-400 light:text-slate-500 mt-0.5">
                  B.Tech CSE ICFAI
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Developer Terminal / Floating Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md">
              
              {/* Outer Glow frame */}
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-brand-500 via-brand-violet to-brand-cyan opacity-40 blur-lg transition-opacity duration-500" />
              
              {/* Terminal / Code Window */}
              <div className="relative rounded-2xl bg-dark-900/95 light:bg-white/95 border border-white/15 light:border-black/10 shadow-2xl overflow-hidden backdrop-blur-xl">
                
                {/* Window top bar */}
                <div className="flex items-center justify-between px-4 py-3 bg-dark-950/80 light:bg-slate-100 border-b border-white/10 light:border-black/5">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400">
                    <Terminal className="w-3.5 h-3.5 text-brand-400" />
                    <span>arik@dev-workstation: ~</span>
                  </div>
                  <div className="w-12" />
                </div>

                {/* Developer Profile Card Inside Terminal */}
                <div className="p-5 space-y-4 font-mono text-xs">
                  {/* Avatar and Info Header */}
                  <div className="flex items-center gap-4 pb-4 border-b border-white/10 light:border-black/5">
                    <div className="relative">
                      <img
                        src={profile?.profileImage || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800'}
                        alt={profile?.name || 'Arik Maitra'}
                        className="w-16 h-16 rounded-2xl object-cover border-2 border-brand-500/50 shadow-md"
                      />
                      <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-dark-900" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white light:text-slate-900 font-sans">
                        {profile?.name || 'Arik Maitra'}
                      </h3>
                      <p className="text-brand-400 text-[11px]">
                        @arikmaitra • CSE '28
                      </p>
                      <p className="text-slate-400 text-[11px] mt-0.5">
                        ICFAI University Dehradun
                      </p>
                    </div>
                  </div>

                  {/* Terminal Code Snapshot */}
                  <div className="space-y-1.5 text-slate-300 light:text-slate-700 bg-dark-950/60 light:bg-slate-50 p-3.5 rounded-xl border border-white/5">
                    <p><span className="text-brand-violet">const</span> engineer = {'{'}</p>
                    <p className="pl-4">name: <span className="text-emerald-400">'{profile?.name || "Arik Maitra"}'</span>,</p>
                    <p className="pl-4">stack: [<span className="text-amber-300">'MongoDB'</span>, <span className="text-amber-300">'Express'</span>, <span className="text-amber-300">'React'</span>, <span className="text-amber-300">'Node'</span>],</p>
                    <p className="pl-4">cloudTarget: <span className="text-brand-cyan">'AWS Certified Dev'</span>,</p>
                    <p className="pl-4">passion: <span className="text-emerald-400">'Scalable & Interactive Web'</span>,</p>
                    <p className="pl-4">currentlyBuilding: <span className="text-brand-400">'LAMP Login & Cloud Platforms'</span></p>
                    <p>{'};'}</p>
                  </div>

                  {/* Floating Action Tags */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-slate-300 text-[10px]">
                      ⚡ GSAP MorphSVG
                    </span>
                    <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-slate-300 text-[10px]">
                      🚀 REST APIs
                    </span>
                    <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-slate-300 text-[10px]">
                      ☁️ AWS Cloud
                    </span>
                  </div>

                </div>

              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Down arrow indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-slate-500 animate-bounce">
        <span className="text-[10px] font-mono uppercase tracking-widest">Scroll</span>
        <ChevronDown className="w-4 h-4" />
      </div>
    </section>
  );
}
