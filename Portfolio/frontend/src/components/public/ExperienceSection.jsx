import React from 'react';
import { Briefcase, Calendar, MapPin, Sparkles, CheckCircle2 } from 'lucide-react';

export default function ExperienceSection({ experiences = [] }) {
  return (
    <section id="experience" className="py-24 relative overflow-hidden bg-dark-950 light:bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-300 text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Career Milestones</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white light:text-slate-900 tracking-tight">
            Work Experience & <span className="text-gradient-primary">Roles</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-400 light:text-slate-600">
            Professional track record, internships, and engineering contributions.
          </p>
        </div>

        {/* Vertical Timeline */}
        <div className="max-w-3xl mx-auto relative">
          {/* Vertical central glowing line */}
          <div className="absolute top-2 bottom-2 left-4 sm:left-1/2 sm:-translate-x-1/2 w-[2px] bg-gradient-to-b from-brand-500 via-brand-violet to-brand-cyan/20" />

          <div className="space-y-12">
            {experiences.map((exp, index) => {
              const isEven = index % 2 === 0;
              return (
                <div 
                  key={exp._id || index}
                  className={`relative flex flex-col sm:flex-row items-start ${
                    isEven ? 'sm:flex-row-reverse' : ''
                  }`}
                >
                  {/* Timeline Glowing Node */}
                  <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-dark-950 light:bg-white border-2 border-brand-500 flex items-center justify-center z-10 shadow-[0_0_15px_rgba(99,102,241,0.5)]">
                    <div className="w-2.5 h-2.5 rounded-full bg-brand-400 animate-pulse" />
                  </div>

                  {/* Spacer for alternate layout */}
                  <div className="hidden sm:block sm:w-1/2" />

                  {/* Content Card */}
                  <div className={`ml-12 sm:ml-0 sm:w-1/2 ${
                    isEven ? 'sm:pr-10' : 'sm:pl-10'
                  } w-full`}>
                    <div className="glass-card p-6 rounded-2xl border border-white/10 hover:border-brand-500/40 transition-all duration-300">
                      
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                        <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-full bg-brand-500/15 text-brand-300 border border-brand-500/20">
                          {exp.employmentType || 'Internship'}
                        </span>
                        
                        {exp.current && (
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                            Present Role
                          </span>
                        )}
                      </div>

                      <h3 className="text-base sm:text-lg font-bold text-white light:text-slate-900">
                        {exp.role}
                      </h3>

                      <div className="text-sm font-medium text-brand-400 mb-2">
                        {exp.company}
                      </div>

                      <div className="flex items-center gap-4 text-xs font-mono text-slate-400 mb-4">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-slate-500" />
                          {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                        </span>
                        {exp.location && (
                          <span className="flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5 text-slate-500" />
                            {exp.location}
                          </span>
                        )}
                      </div>

                      <div className="text-xs sm:text-sm text-slate-300 light:text-slate-600 leading-relaxed whitespace-pre-line mb-4">
                        {exp.description}
                      </div>

                      {/* Tech Chips */}
                      {exp.technologies && exp.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/5">
                          {exp.technologies.map((t, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-0.5 rounded-md bg-white/5 text-[11px] font-mono text-slate-300"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      )}

                    </div>
                  </div>

                </div>
              );
            })}
          </div>

          {experiences.length === 0 && (
            <div className="text-center py-12 text-slate-500">
              No experience records added yet.
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
