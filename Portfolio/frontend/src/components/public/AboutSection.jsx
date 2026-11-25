import React from 'react';
import { 
  GraduationCap, Target, Lightbulb, Compass, 
  Sparkles, Award, CheckCircle2, Heart, Code2, BookOpen 
} from 'lucide-react';

export default function AboutSection({ profile }) {
  const interests = profile?.interests?.length 
    ? profile.interests 
    : ['Cricket', 'Badminton', 'Technology and Software Development', 'Competitive Programming', 'UI/UX Design'];

  return (
    <section id="about" className="py-24 relative overflow-hidden bg-dark-900/40 light:bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-300 text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Personal Journey & Vision</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white light:text-slate-900 tracking-tight">
            Engineering with <span className="text-gradient-primary">Curiosity & Purpose</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-400 light:text-slate-600">
            A look into who I am, my development philosophies, and my trajectory as a software engineer.
          </p>
        </div>

        {/* Split Layout: Bio & Highlights */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Left Side: Personal Introduction & Philosophy */}
          <div className="lg:col-span-7 space-y-6">
            <div className="glass-card p-6 sm:p-8 rounded-2xl border border-white/10 space-y-5">
              <h3 className="text-xl font-bold text-white light:text-slate-900 flex items-center gap-2.5">
                <Code2 className="w-5 h-5 text-brand-400" />
                <span>About Me</span>
              </h3>
              
              <div className="text-slate-300 light:text-slate-600 leading-relaxed space-y-4 text-sm sm:text-base whitespace-pre-line">
                {profile?.aboutMe || (
                  `I am a Computer Science Engineering student passionate about building modern, scalable, and interactive web applications. I enjoy exploring new technologies, solving problems, and transforming creative ideas into functional digital experiences.

My goal is to become a skilled Full-Stack MERN Developer with expertise in cloud computing and AWS.`
                )}
              </div>

              {/* Career Goals Callout */}
              <div className="p-4 rounded-xl bg-brand-500/10 border border-brand-500/20 space-y-1.5">
                <div className="flex items-center gap-2 text-brand-300 font-semibold text-xs font-mono uppercase tracking-wider">
                  <Target className="w-4 h-4 text-brand-400" />
                  <span>Career Objective</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 light:text-slate-700 leading-relaxed">
                  {profile?.careerGoals || 'To become an impactful Full-Stack MERN Developer with comprehensive mastery of AWS cloud infrastructure, microservices, and high-performance frontend interfaces.'}
                </p>
              </div>

              {/* Current Learning Interests */}
              <div className="p-4 rounded-xl bg-violet-500/10 border border-violet-500/20 space-y-1.5">
                <div className="flex items-center gap-2 text-violet-300 font-semibold text-xs font-mono uppercase tracking-wider">
                  <BookOpen className="w-4 h-4 text-violet-400" />
                  <span>Currently Exploring & Learning</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 light:text-slate-700 leading-relaxed">
                  {profile?.currentLearning || 'AWS Cloud Architecture (S3, EC2, Lambda), Docker containerization, System Design fundamentals, and Advanced GSAP interactive animations.'}
                </p>
              </div>

              {/* Interests & Hobbies Tags */}
              <div className="pt-2">
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 light:text-slate-500 mb-2.5 flex items-center gap-1.5">
                  <Heart className="w-3.5 h-3.5 text-rose-400" />
                  <span>Interests Beyond Coding</span>
                </h4>
                <div className="flex flex-wrap gap-2">
                  {interests.map((interest, idx) => (
                    <span 
                      key={idx}
                      className="px-3 py-1 rounded-full text-xs font-medium bg-dark-950 light:bg-white border border-white/10 light:border-black/10 text-slate-300 light:text-slate-700 hover:border-brand-500/40 transition-colors"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* Right Side: Educational Snapshot & Engineering Values */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            
            {/* Academic Snapshot Card */}
            <div className="glass-card p-6 sm:p-7 rounded-2xl border border-white/10 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-brand-500/10 text-brand-400 flex items-center justify-center">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white light:text-slate-900">
                      B.Tech in Computer Science
                    </h4>
                    <p className="text-xs text-brand-400">
                      ICFAI University Dehradun
                    </p>
                  </div>
                </div>
                <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-brand-500/20 text-brand-300 border border-brand-500/30">
                  2024 - 2028
                </span>
              </div>
              <p className="text-xs text-slate-400 light:text-slate-600 leading-relaxed">
                Pursuing comprehensive undergraduate engineering studies with strong emphasis on software architecture, algorithms, and cloud integration.
              </p>
            </div>

            {/* Schooling card */}
            <div className="glass-card p-6 sm:p-7 rounded-2xl border border-white/10 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white light:text-slate-900">
                      Higher Secondary
                    </h4>
                    <p className="text-xs text-amber-400">
                      DAV Public School
                    </p>
                  </div>
                </div>
                <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Completed 2024
                </span>
              </div>
              <p className="text-xs text-slate-400 light:text-slate-600 leading-relaxed">
                Solid academic grounding in mathematics and science, leading into computer science specialization.
              </p>
            </div>

            {/* Core Values Terminal Widget */}
            <div className="glass-card p-6 rounded-2xl border border-white/10 bg-dark-950/70 light:bg-slate-100 font-mono text-xs space-y-3">
              <div className="text-xs uppercase tracking-wider text-slate-400 flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-brand-cyan" />
                <span>Engineering Values</span>
              </div>
              <div className="space-y-2 text-slate-300 light:text-slate-700">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Clean, modular, and maintainable code</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Pixel-perfect, accessible UI/UX</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Continuous learning & adaptation to new tech</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
