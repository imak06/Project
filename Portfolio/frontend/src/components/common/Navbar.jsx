import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { 
  Sun, Moon, Menu, X, Download, ShieldCheck, 
  ExternalLink, Code2, Sparkles, Terminal 
} from 'lucide-react';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Experience', href: '#experience' },
  { name: 'Education', href: '#education' },
  { name: 'Achievements', href: '#achievements' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar({ settings, profile }) {
  const { isDark, toggleTheme } = useTheme();
  const { isAuthenticated } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      // Active section highlight detection
      const sections = navLinks.map(l => l.href.substring(1));
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 180 && rect.bottom >= 180) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (location.pathname !== '/') {
      window.location.href = `/${href}`;
      return;
    }
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const resumeUrl = profile?.resumeUrl || settings?.resumeFile || '/resume.pdf';

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-dark-950/80 light:bg-white/80 backdrop-blur-md border-b border-white/10 light:border-black/5 shadow-lg shadow-black/20' 
        : 'bg-transparent py-2'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo Brand */}
          <Link 
            to="/" 
            className="flex items-center gap-2.5 group cursor-pointer"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-accent via-brand-500 to-brand-cyan p-[1.5px] shadow-glow-sm transition-transform duration-300 group-hover:scale-105">
              <div className="w-full h-full bg-dark-950 light:bg-white rounded-[10px] flex items-center justify-center">
                <Code2 className="w-5 h-5 text-brand-400 group-hover:text-brand-300 transition-colors" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-mono text-xl font-bold tracking-tight text-white light:text-slate-900 group-hover:text-brand-400 transition-colors">
                {settings?.logoText || 'ARIK.'}
              </span>
              <span className="text-[10px] uppercase tracking-widest text-slate-400 -mt-1 hidden sm:block">
                Full-Stack Dev
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-dark-900/60 light:bg-slate-100/80 px-4 py-1.5 rounded-full border border-white/10 light:border-black/5 backdrop-blur-md">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-200 ${
                    isActive
                      ? 'bg-brand-500/20 text-brand-300 light:bg-brand-500/10 light:text-brand-600 font-semibold shadow-inner-glow'
                      : 'text-slate-300 light:text-slate-600 hover:text-white light:hover:text-slate-900 hover:bg-white/5'
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </nav>

          {/* Right Action Icons & Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="p-2.5 rounded-xl text-slate-400 hover:text-white light:hover:text-slate-900 hover:bg-white/5 light:hover:bg-slate-200 border border-transparent hover:border-white/10 transition-all"
              title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
            </button>

            {/* Admin Portal Shortcut */}
            <Link
              to="/admin"
              className="p-2.5 rounded-xl text-slate-400 hover:text-brand-300 hover:bg-white/5 border border-transparent hover:border-white/10 transition-all flex items-center gap-1.5"
              title="Admin CMS Dashboard"
            >
              <ShieldCheck className={`w-4 h-4 ${isAuthenticated ? 'text-emerald-400' : 'text-slate-400'}`} />
              <span className="text-xs font-mono hidden xl:inline">CMS</span>
            </Link>

            {/* Resume Download Button */}
            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              download="Arik_Maitra_Resume.pdf"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium bg-gradient-to-r from-brand-600 to-brand-accent hover:from-brand-500 hover:to-brand-violet text-white shadow-glow-sm hover:shadow-glow-md transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Resume</span>
            </a>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-white/5 border border-white/10 transition-all"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-dark-900/95 light:bg-white/95 backdrop-blur-xl border-b border-white/10 px-4 pt-3 pb-6 space-y-2 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="grid grid-cols-2 gap-1.5">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-brand-500/20 text-brand-300 font-semibold'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </div>

          <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              download
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-xs font-medium bg-brand-600 hover:bg-brand-500 text-white"
            >
              <Download className="w-4 h-4" />
              Download Resume
            </a>
            <Link
              to="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-2 rounded-xl text-xs text-slate-400 hover:text-white border border-white/10"
            >
              <ShieldCheck className="w-4 h-4" />
              Admin Dashboard Login
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
