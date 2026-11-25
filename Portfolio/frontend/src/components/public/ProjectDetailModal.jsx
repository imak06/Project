import React from 'react';
import Modal from '../common/Modal';
import { ExternalLink, Calendar, Tag, Layers, CheckCircle2 } from 'lucide-react';
import { Github } from '../common/SocialIcons';

export default function ProjectDetailModal({ project, onClose }) {
  if (!project) return null;

  return (
    <Modal isOpen={!!project} onClose={onClose} title={project.title} maxWidth="max-w-3xl">
      <div className="space-y-6">
        
        {/* Cover Image */}
        <div className="relative rounded-xl overflow-hidden border border-white/10 max-h-72 w-full">
          <img
            src={project.thumbnail}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Details & Metadata */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/10 light:border-black/5">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-brand-500/20 text-brand-300 text-xs font-mono font-semibold border border-brand-500/30">
              {project.category}
            </span>
            {project.completionDate && (
              <span className="flex items-center gap-1.5 text-xs font-mono text-slate-400">
                <Calendar className="w-3.5 h-3.5" />
                {project.completionDate}
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl text-xs font-medium bg-dark-950 light:bg-slate-100 text-slate-200 light:text-slate-800 border border-white/10 hover:border-brand-500/50 flex items-center gap-2 transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>GitHub Code</span>
              </a>
            )}

            {project.liveDemoUrl && (
              <a
                href={project.liveDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl text-xs font-medium bg-brand-600 hover:bg-brand-500 text-white flex items-center gap-2 transition-colors shadow-glow-sm"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Live Demo</span>
              </a>
            )}
          </div>
        </div>

        {/* Short Summary */}
        <div className="space-y-2">
          <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
            Overview
          </h4>
          <p className="text-sm text-slate-200 light:text-slate-700 leading-relaxed">
            {project.shortDescription}
          </p>
        </div>

        {/* Detailed Description */}
        {project.detailedDescription && (
          <div className="space-y-2">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
              Deep Dive & Implementation
            </h4>
            <div className="text-xs sm:text-sm text-slate-300 light:text-slate-600 leading-relaxed whitespace-pre-line bg-dark-950/60 light:bg-slate-50 p-4 rounded-xl border border-white/5">
              {project.detailedDescription}
            </div>
          </div>
        )}

        {/* Technologies List */}
        <div className="space-y-2">
          <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-brand-400" />
            <span>Technologies & Tools Used</span>
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-lg bg-dark-950 light:bg-white border border-white/10 light:border-black/10 text-xs font-mono text-brand-300 light:text-brand-600 flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-3 h-3 text-brand-400" />
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Project Gallery if available */}
        {project.gallery && project.gallery.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
              Project Gallery
            </h4>
            <div className="grid grid-cols-2 gap-3">
              {project.gallery.map((imgUrl, idx) => (
                <img
                  key={idx}
                  src={imgUrl}
                  alt={`${project.title} screenshot ${idx + 1}`}
                  className="rounded-xl border border-white/10 h-36 w-full object-cover"
                />
              ))}
            </div>
          </div>
        )}

      </div>
    </Modal>
  );
}
