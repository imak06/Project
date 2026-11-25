import React, { useState } from 'react';
import { Award, Trophy, ExternalLink, Calendar, Sparkles, CheckCircle2 } from 'lucide-react';

const certCategories = ['All', 'Certificates', 'Hackathons', 'Achievements', 'Competitions', 'Workshops'];

export default function AchievementsSection({ certifications = [] }) {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredCerts = activeCategory === 'All'
    ? certifications
    : certifications.filter(c => c.category === activeCategory);

  return (
    <section id="achievements" className="py-24 relative overflow-hidden bg-dark-950 light:bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-300 text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Excellence & Credentials</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white light:text-slate-900 tracking-tight">
            Achievements & <span className="text-gradient-primary">Certifications</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-400 light:text-slate-600">
            Validated certifications, competitive hackathons, and technical honors earned.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {certCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
                activeCategory === cat
                  ? 'bg-brand-600 text-white shadow-glow-sm'
                  : 'bg-dark-900 light:bg-slate-100 text-slate-400 light:text-slate-600 hover:text-white border border-white/5 hover:border-brand-500/30'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCerts.map((cert) => (
            <div
              key={cert._id || cert.title}
              className="glass-card p-6 rounded-2xl border border-white/10 flex flex-col justify-between hover:border-brand-500/50 hover:shadow-glow-sm transition-all duration-300 group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    {cert.category === 'Hackathons' ? <Trophy className="w-5 h-5" /> : <Award className="w-5 h-5" />}
                  </div>
                  <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-white/5 text-slate-300 border border-white/10">
                    {cert.category}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white light:text-slate-900 group-hover:text-brand-300 transition-colors">
                  {cert.title}
                </h3>

                <p className="text-xs font-semibold text-brand-400">
                  {cert.issuer}
                </p>

                <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Issued: {cert.issueDate}</span>
                </div>

                {cert.description && (
                  <p className="text-xs text-slate-400 light:text-slate-600 leading-relaxed pt-2 border-t border-white/5">
                    {cert.description}
                  </p>
                )}
              </div>

              {cert.credentialUrl && (
                <div className="mt-5 pt-3 border-t border-white/10">
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-brand-400 hover:text-brand-300 transition-colors"
                  >
                    <span>Verify Credential</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredCerts.length === 0 && (
          <div className="text-center py-12 text-slate-500">
            No certifications or achievements in this category.
          </div>
        )}

      </div>
    </section>
  );
}
