import React, { useState } from 'react';
import { 
  FolderGit2, ExternalLink, Sparkles, 
  Search, Filter, ArrowUpRight, CheckCircle2, Eye 
} from 'lucide-react';
import { Github } from '../common/SocialIcons';
import ProjectDetailModal from './ProjectDetailModal';
import LampInteractiveDemo from '../common/LampInteractiveDemo';

const categories = ['All', 'Full-Stack', 'MERN Stack', 'Frontend', 'Backend', 'UI/UX Design'];

export default function ProjectsSection({ projects = [] }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);
  const [showLampDemo, setShowLampDemo] = useState(false);

  // Filter only published projects for public display
  const publishedProjects = projects.filter(p => p.status === 'published');

  const filteredProjects = publishedProjects.filter((project) => {
    const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;
    const matchesSearch = 
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.technologies.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  const featuredProjects = publishedProjects.filter(p => p.featured);
  const lampProject = publishedProjects.find(p => p.title.toUpperCase().includes('LAMP'));

  return (
    <section id="projects" className="py-24 relative overflow-hidden bg-dark-900/60 light:bg-slate-50/80">
      {/* Background radial glow */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-brand-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-300 text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Featured Engineering Work</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white light:text-slate-900 tracking-tight">
            Crafted Projects & <span className="text-gradient-primary">Digital Solutions</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-400 light:text-slate-600">
            A curated showcase of real-world full-stack web applications, interactive interfaces, and architectural prototypes.
          </p>
        </div>

        {/* Featured Spotlight: LAMP LOGIN PAGE Highlight with Interactive Demo Toggle */}
        {lampProject && (
          <div className="mb-16 rounded-3xl bg-gradient-to-r from-amber-500/10 via-brand-500/10 to-brand-violet/10 border border-amber-500/30 p-6 sm:p-8 relative overflow-hidden backdrop-blur-xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs font-mono font-semibold flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    Featured Interactive Showcase
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-white/10 text-slate-300 text-xs font-mono">
                    GSAP + MorphSVG
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-white light:text-slate-900 tracking-tight">
                  {lampProject.title}
                </h3>

                <p className="text-slate-300 light:text-slate-700 text-sm sm:text-base leading-relaxed">
                  {lampProject.shortDescription}
                </p>

                <div className="flex flex-wrap gap-2 pt-1">
                  {lampProject.technologies.map((tech, idx) => (
                    <span 
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-dark-950/80 light:bg-white text-xs font-mono text-slate-300 light:text-slate-700 border border-white/10"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-3">
                  <button
                    onClick={() => setShowLampDemo(!showLampDemo)}
                    className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-amber-500 hover:bg-amber-400 text-slate-950 transition-all flex items-center gap-2 shadow-lg shadow-amber-500/20"
                  >
                    <Eye className="w-4 h-4" />
                    <span>{showLampDemo ? 'Hide Interactive Demo' : 'Try Interactive Lamp Here'}</span>
                  </button>

                  <button
                    onClick={() => setSelectedProject(lampProject)}
                    className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/20 text-white transition-all"
                  >
                    View Project Details
                  </button>

                  {lampProject.githubUrl && (
                    <a
                      href={lampProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xl bg-dark-950 light:bg-white border border-white/10 text-slate-300 hover:text-white transition-colors"
                      title="GitHub Repository"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}

                  {lampProject.liveDemoUrl && (
                    <a
                      href={lampProject.liveDemoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xl bg-dark-950 light:bg-white border border-white/10 text-slate-300 hover:text-white transition-colors"
                      title="Live Demo"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>

              {/* Lamp project image preview */}
              <div className="lg:col-span-5 flex justify-center">
                <div 
                  onClick={() => setShowLampDemo(!showLampDemo)}
                  className="cursor-pointer group relative rounded-2xl overflow-hidden border border-white/20 shadow-2xl max-w-sm w-full"
                >
                  <img
                    src={lampProject.thumbnail}
                    alt={lampProject.title}
                    className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-white">
                    <span className="font-mono text-amber-300 font-semibold">Click to toggle live demo</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>

            {/* Embedded Interactive Lamp Demo */}
            {showLampDemo && (
              <div className="mt-8 pt-8 border-t border-white/10">
                <LampInteractiveDemo />
              </div>
            )}
          </div>
        )}

        {/* Filter and Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
                  selectedCategory === cat
                    ? 'bg-brand-600 text-white shadow-glow-sm'
                    : 'bg-dark-900 light:bg-slate-200 text-slate-400 light:text-slate-700 hover:text-white border border-white/5 hover:border-brand-500/30'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects or stack..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-dark-900 light:bg-white border border-white/10 light:border-black/10 text-white light:text-slate-900 text-xs placeholder:text-slate-500 focus:outline-none focus:border-brand-500 transition-colors"
            />
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project._id || project.slug}
              className="glass-card rounded-2xl overflow-hidden border border-white/10 flex flex-col justify-between group hover:border-brand-500/50 hover:shadow-glow-md transition-all duration-300"
            >
              <div>
                {/* Thumbnail Image */}
                <div 
                  className="relative h-48 w-full overflow-hidden bg-dark-950 cursor-pointer"
                  onClick={() => setSelectedProject(project)}
                >
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/20 to-transparent" />
                  
                  {/* Category Pill */}
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-dark-950/80 backdrop-blur-md text-brand-300 text-[10px] font-mono border border-white/10">
                    {project.category}
                  </span>

                  {project.featured && (
                    <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-amber-500/80 backdrop-blur-md text-slate-950 text-[10px] font-mono font-bold flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      Featured
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 space-y-3">
                  <h3 
                    onClick={() => setSelectedProject(project)}
                    className="text-lg font-bold text-white light:text-slate-900 group-hover:text-brand-300 transition-colors cursor-pointer"
                  >
                    {project.title}
                  </h3>

                  <p className="text-xs text-slate-400 light:text-slate-600 line-clamp-3 leading-relaxed">
                    {project.shortDescription}
                  </p>

                  {/* Technology Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {project.technologies.slice(0, 4).map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-md bg-white/5 light:bg-slate-100 text-[11px] font-mono text-slate-300 light:text-slate-700 border border-white/5"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="px-2 py-0.5 rounded-md bg-white/5 text-[11px] font-mono text-slate-400">
                        +{project.technologies.length - 4}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="px-6 py-4 border-t border-white/10 light:border-black/5 bg-dark-950/40 light:bg-slate-50 flex items-center justify-between">
                <button
                  onClick={() => setSelectedProject(project)}
                  className="text-xs font-semibold text-brand-400 hover:text-brand-300 flex items-center gap-1.5 transition-colors"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>View Details</span>
                </button>

                <div className="flex items-center gap-2">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
                      title="GitHub"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                  {project.liveDemoUrl && (
                    <a
                      href={project.liveDemoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
                      title="Live Demo"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Empty state */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-16 text-slate-500 space-y-2">
            <p className="text-sm">No projects found matching your search criteria.</p>
          </div>
        )}

      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <ProjectDetailModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}
