import React, { useState } from 'react';
import { 
  Code, Layers, Database, Cpu, Cloud, Wrench, 
  Sparkles, Terminal, CheckCircle2, ChevronRight 
} from 'lucide-react';

const categories = [
  'All',
  'Frontend Development',
  'Backend Development',
  'Database',
  'Programming Languages',
  'Tools and Technologies',
  'Cloud Computing'
];

export default function SkillsSection({ skills = [] }) {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredSkills = activeCategory === 'All'
    ? skills
    : skills.filter(s => s.category === activeCategory);

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Frontend Development': return <Code className="w-4 h-4 text-brand-400" />;
      case 'Backend Development': return <Cpu className="w-4 h-4 text-emerald-400" />;
      case 'Database': return <Database className="w-4 h-4 text-amber-400" />;
      case 'Programming Languages': return <Terminal className="w-4 h-4 text-brand-violet" />;
      case 'Cloud Computing': return <Cloud className="w-4 h-4 text-brand-cyan" />;
      default: return <Wrench className="w-4 h-4 text-slate-400" />;
    }
  };

  const getLevelColor = (level) => {
    switch (level) {
      case 'Expert': return 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30';
      case 'Advanced': return 'bg-brand-500/15 text-brand-300 border-brand-500/30';
      case 'Intermediate': return 'bg-amber-500/15 text-amber-300 border-amber-500/30';
      default: return 'bg-slate-500/15 text-slate-400 border-slate-500/30';
    }
  };

  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-dark-950 light:bg-white">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-10 w-96 h-96 bg-brand-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-brand-violet/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-300 text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Technical Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white light:text-slate-900 tracking-tight">
            Skills & <span className="text-gradient-primary">Technology Stack</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-400 light:text-slate-600">
            A comprehensive overview of programming languages, libraries, and frameworks I leverage to build scalable systems.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-medium transition-all duration-200 flex items-center gap-2 ${
                activeCategory === cat
                  ? 'bg-brand-600 text-white shadow-glow-sm scale-105'
                  : 'bg-dark-900 light:bg-slate-100 text-slate-400 light:text-slate-600 hover:text-white light:hover:text-slate-900 border border-white/5 light:border-black/5 hover:border-brand-500/30'
              }`}
            >
              {cat !== 'All' && getCategoryIcon(cat)}
              <span>{cat}</span>
              {cat === 'All' && (
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-white/20 text-white font-mono">
                  {skills.length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {filteredSkills.map((skill) => (
            <div
              key={skill._id || skill.name}
              className="glass-card p-5 rounded-2xl border border-white/10 flex flex-col justify-between group hover:border-brand-500/50 transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-dark-950 light:bg-white border border-white/10 flex items-center justify-center text-brand-400 group-hover:scale-110 group-hover:text-brand-300 transition-all">
                      {getCategoryIcon(skill.category)}
                    </div>
                    <h3 className="text-sm font-bold text-white light:text-slate-900 group-hover:text-brand-300 transition-colors">
                      {skill.name}
                    </h3>
                  </div>

                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${getLevelColor(skill.level || 'Advanced')}`}>
                    {skill.level || 'Advanced'}
                  </span>
                </div>

                <p className="text-[11px] text-slate-400 light:text-slate-500 mb-4 flex items-center gap-1">
                  <span>{skill.category}</span>
                </p>
              </div>

              {/* Proficiency Progress Bar */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="text-slate-400">Mastery</span>
                  <span className="text-brand-400 font-semibold">{skill.proficiency || 85}%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-dark-950 light:bg-slate-200 overflow-hidden border border-white/5">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-brand-600 via-brand-500 to-brand-cyan transition-all duration-1000"
                    style={{ width: `${skill.proficiency || 85}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty state */}
        {filteredSkills.length === 0 && (
          <div className="text-center py-12 text-slate-500">
            No skills found in this category.
          </div>
        )}

      </div>
    </section>
  );
}
