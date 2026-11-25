import React from 'react';
import { ArrowUp, Mail, Heart, Code2 } from 'lucide-react';
import { Github, Linkedin, Twitter } from './SocialIcons';

export default function Footer({ profile, settings }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();
  const social = profile?.socialLinks || settings?.socialLinks || {};

  return (
    <footer className="relative bg-dark-950 light:bg-slate-100 border-t border-white/10 light:border-black/5 pt-16 pb-12 overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-28 bg-gradient-to-t from-brand-500/10 via-brand-accent/5 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/10 light:border-black/5">
          
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2 font-mono text-2xl font-bold text-white light:text-slate-900">
              <span className="w-2.5 h-2.5 rounded-full bg-brand-400 animate-pulse" />
              {settings?.logoText || 'ARIK.'}
            </div>
            <p className="text-sm text-slate-400 light:text-slate-600 max-w-md leading-relaxed">
              {profile?.title || 'Full-Stack Developer | MERN Stack Developer | Tech Enthusiast'}
            </p>
            <p className="text-xs text-slate-500 max-w-sm">
              {settings?.footerText || 'Designed & Engineered with modern MERN architecture, Tailwind CSS & Framer Motion.'}
            </p>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-300 light:text-slate-800 font-semibold mb-4">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm text-slate-400 light:text-slate-600">
              <li><a href="#home" className="hover:text-brand-400 transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-brand-400 transition-colors">About Journey</a></li>
              <li><a href="#skills" className="hover:text-brand-400 transition-colors">Tech Stack</a></li>
              <li><a href="#projects" className="hover:text-brand-400 transition-colors">Featured Projects</a></li>
              <li><a href="#contact" className="hover:text-brand-400 transition-colors">Get In Touch</a></li>
            </ul>
          </div>

          {/* Social Links & Connect */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-300 light:text-slate-800 font-semibold mb-4">
              Connect
            </h4>
            <div className="flex flex-wrap gap-2.5 mb-6">
              {social.github && (
                <a
                  href={social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-dark-900 light:bg-white border border-white/10 light:border-black/10 flex items-center justify-center text-slate-400 hover:text-white light:hover:text-slate-900 hover:border-brand-500/50 hover:shadow-glow-sm transition-all"
                  aria-label="GitHub"
                >
                  <Github className="w-4 h-4" />
                </a>
              )}
              {social.linkedin && (
                <a
                  href={social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-dark-900 light:bg-white border border-white/10 light:border-black/10 flex items-center justify-center text-slate-400 hover:text-white light:hover:text-slate-900 hover:border-brand-500/50 hover:shadow-glow-sm transition-all"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              )}
              {social.twitter && (
                <a
                  href={social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-dark-900 light:bg-white border border-white/10 light:border-black/10 flex items-center justify-center text-slate-400 hover:text-white light:hover:text-slate-900 hover:border-brand-500/50 hover:shadow-glow-sm transition-all"
                  aria-label="Twitter"
                >
                  <Twitter className="w-4 h-4" />
                </a>
              )}
              {profile?.email && (
                <a
                  href={`mailto:${profile.email}`}
                  className="w-10 h-10 rounded-xl bg-dark-900 light:bg-white border border-white/10 light:border-black/10 flex items-center justify-center text-slate-400 hover:text-white light:hover:text-slate-900 hover:border-brand-500/50 hover:shadow-glow-sm transition-all"
                  aria-label="Email"
                >
                  <Mail className="w-4 h-4" />
                </a>
              )}
            </div>

            <div className="text-xs text-slate-500">
              <span>Status: </span>
              <span className="text-emerald-400 font-medium inline-flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                Open to Opportunities
              </span>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {currentYear} Arik Maitra. All rights reserved.</p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-dark-900 light:bg-white border border-white/10 light:border-black/10 hover:border-brand-500/40 text-slate-400 hover:text-white light:hover:text-slate-900 transition-all group"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
}
