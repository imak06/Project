import React from 'react';
import { GraduationCap, Calendar, MapPin, Award, Sparkles, BookOpen } from 'lucide-react';

export default function EducationSection({ education = [] }) {
  return (
    <section id="education" className="py-24 relative overflow-hidden bg-dark-900/50 light:bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-300 text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Academic Background</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white light:text-slate-900 tracking-tight">
            Education & <span className="text-gradient-primary">Qualifications</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-400 light:text-slate-600">
            Rigorous undergraduate computer science engineering education and foundational schooling.
          </p>
        </div>

        {/* Education Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {education.map((edu, idx) => (
            <div
              key={edu._id || idx}
              className="glass-card p-6 sm:p-8 rounded-2xl border border-white/10 flex flex-col justify-between hover:border-brand-500/50 hover:shadow-glow-sm transition-all duration-300"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <div className="w-12 h-12 rounded-xl bg-brand-500/10 text-brand-400 border border-brand-500/20 flex items-center justify-center">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-mono px-3 py-1 rounded-full bg-brand-500/20 text-brand-300 border border-brand-500/30">
                    {edu.startYear} - {edu.endYear} {edu.expectedGraduation ? '(Expected)' : ''}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white light:text-slate-900">
                    {edu.degree}
                  </h3>
                  <p className="text-sm font-semibold text-brand-400 mt-0.5">
                    {edu.institution}
                  </p>
                  {edu.fieldOfStudy && (
                    <p className="text-xs text-slate-400 light:text-slate-500 mt-1 flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                      <span>{edu.fieldOfStudy}</span>
                    </p>
                  )}
                </div>

                {edu.description && (
                  <p className="text-xs sm:text-sm text-slate-300 light:text-slate-600 leading-relaxed whitespace-pre-line pt-2 border-t border-white/5">
                    {edu.description}
                  </p>
                )}
              </div>

              {edu.grade && (
                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-slate-400">
                  <span>Honors / Status:</span>
                  <span className="text-emerald-400 font-semibold">{edu.grade}</span>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
