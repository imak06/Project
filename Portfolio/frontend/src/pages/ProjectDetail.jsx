import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Calendar, Tag, CheckCircle2 } from 'lucide-react';
import { Github } from '../components/common/SocialIcons';
import api from '../api/client';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import LampInteractiveDemo from '../components/common/LampInteractiveDemo';

export default function ProjectDetail() {
  const { slugOrId } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await api.get(`/projects/${slugOrId}`);
        if (res.data.success) {
          setProject(res.data.data);
        }
      } catch (err) {
        console.error('Project not found');
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [slugOrId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-950 flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-brand-500 border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-dark-950 flex flex-col items-center justify-center p-4 text-center space-y-4">
        <h2 className="text-2xl font-bold text-white">Project Not Found</h2>
        <p className="text-xs text-slate-400">The project you are looking for may have been unpublished or removed.</p>
        <Link to="/" className="px-4 py-2 rounded-xl bg-brand-600 text-white text-xs font-semibold">
          Return to Portfolio
        </Link>
      </div>
    );
  }

  const isLamp = project.title.toUpperCase().includes('LAMP');

  return (
    <div className="min-h-screen bg-dark-950 text-slate-100 flex flex-col">
      <Navbar />
      
      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 w-full space-y-8">
        
        {/* Back Link */}
        <Link
          to="/#projects"
          className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Projects</span>
        </Link>

        {/* Header Title & Categories */}
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-brand-500/20 text-brand-300 text-xs font-mono font-semibold">
              {project.category}
            </span>
            {project.completionDate && (
              <span className="flex items-center gap-1.5 text-xs font-mono text-slate-400">
                <Calendar className="w-3.5 h-3.5" />
                {project.completionDate}
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            {project.title}
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl">
            {project.shortDescription}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-4 pt-2">
          {project.liveDemoUrl && (
            <a
              href={project.liveDemoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl text-xs font-semibold bg-brand-600 hover:bg-brand-500 text-white flex items-center gap-2 shadow-glow-sm transition-all"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Launch Live Application</span>
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl text-xs font-semibold bg-dark-900 border border-white/10 hover:border-brand-500/40 text-slate-200 flex items-center gap-2 transition-all"
            >
              <Github className="w-4 h-4" />
              <span>View Source Code</span>
            </a>
          )}
        </div>

        {/* Hero Cover Image */}
        <div className="rounded-3xl overflow-hidden border border-white/15 shadow-2xl max-h-[500px] w-full">
          <img
            src={project.thumbnail}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Special interactive lamp if LAMP project */}
        {isLamp && (
          <div className="pt-6">
            <h3 className="text-sm font-mono uppercase text-slate-400 mb-4 tracking-wider">
              Interactive Lamp Demo
            </h3>
            <LampInteractiveDemo />
          </div>
        )}

        {/* Deep dive description */}
        {project.detailedDescription && (
          <div className="glass p-6 sm:p-8 rounded-3xl border border-white/10 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono text-brand-400">
              Architecture & Implementation Details
            </h3>
            <div className="text-sm text-slate-300 leading-relaxed whitespace-pre-line">
              {project.detailedDescription}
            </div>
          </div>
        )}

        {/* Technologies Used */}
        <div className="glass p-6 sm:p-8 rounded-3xl border border-white/10 space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono text-brand-400">
            Technologies & Frameworks
          </h3>
          <div className="flex flex-wrap gap-2.5">
            {project.technologies.map((t, idx) => (
              <span
                key={idx}
                className="px-3.5 py-1.5 rounded-xl bg-dark-950 border border-white/10 text-xs font-mono text-slate-200 flex items-center gap-2"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-brand-400" />
                <span>{t}</span>
              </span>
            ))}
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
