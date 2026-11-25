import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FolderGit2, Cpu, Briefcase, Award, Mail, 
  Plus, ExternalLink, Eye, ArrowUpRight, CheckCircle2, 
  Sparkles, Clock, AlertCircle, FileText 
} from 'lucide-react';
import api from '../../api/client';

export default function DashboardOverview() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get('/stats');
        if (res.data.success) {
          setData(res.data);
        }
      } catch (err) {
        console.error('Failed to load stats:', err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="w-8 h-8 rounded-full border-2 border-brand-500 border-t-transparent animate-spin" />
      </div>
    );
  }

  const stats = data?.stats || {};
  const recentMessages = data?.recentActivity?.messages || [];
  const recentProjects = data?.recentActivity?.projects || [];

  return (
    <div className="space-y-8">
      
      {/* Welcome Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-brand-600/20 via-brand-accent/20 to-brand-violet/20 border border-brand-500/30 p-6 sm:p-8 relative overflow-hidden backdrop-blur-xl">
        <div className="max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/20 text-brand-300 text-xs font-mono font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Developer CMS Active</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Welcome back, Arik!
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Here is what's happening on your portfolio today. Add projects, update your tech stack, manage job inquiries, and adjust your global website settings.
          </p>
        </div>

        {/* Quick Action Shortcuts */}
        <div className="flex flex-wrap items-center gap-3 mt-6">
          <Link
            to="/admin/projects"
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-brand-600 hover:bg-brand-500 text-white transition-all flex items-center gap-2 shadow-glow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Project</span>
          </Link>
          <Link
            to="/admin/skills"
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/15 text-white transition-all flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Skill</span>
          </Link>
          <Link
            to="/admin/messages"
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/15 text-white transition-all flex items-center gap-2"
          >
            <Mail className="w-4 h-4" />
            <span>Check Inbox ({stats.unreadMessages || 0})</span>
          </Link>
        </div>
      </div>

      {/* Metrics Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        
        {/* Total Projects */}
        <div className="glass p-5 rounded-2xl border border-white/10 space-y-3">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-mono uppercase tracking-wider">Projects</span>
            <div className="w-8 h-8 rounded-lg bg-brand-500/15 text-brand-400 flex items-center justify-center">
              <FolderGit2 className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
              {stats.totalProjects || 0}
            </div>
            <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-1">
              <span className="text-emerald-400 font-semibold">{stats.publishedProjects || 0} Published</span>
              <span>•</span>
              <span className="text-amber-400">{stats.draftProjects || 0} Drafts</span>
            </div>
          </div>
        </div>

        {/* Total Skills */}
        <div className="glass p-5 rounded-2xl border border-white/10 space-y-3">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-mono uppercase tracking-wider">Technologies</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/15 text-emerald-400 flex items-center justify-center">
              <Cpu className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
              {stats.totalSkills || 0}
            </div>
            <div className="text-[11px] text-slate-400 mt-1">
              Categorized across full-stack & cloud
            </div>
          </div>
        </div>

        {/* Experience & Education */}
        <div className="glass p-5 rounded-2xl border border-white/10 space-y-3">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-mono uppercase tracking-wider">Timeline Entries</span>
            <div className="w-8 h-8 rounded-lg bg-amber-500/15 text-amber-400 flex items-center justify-center">
              <Briefcase className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
              {(stats.totalExperiences || 0) + (stats.totalEducation || 0)}
            </div>
            <div className="text-[11px] text-slate-400 mt-1">
              {stats.totalExperiences || 0} Roles • {stats.totalEducation || 0} Academic
            </div>
          </div>
        </div>

        {/* Contact Messages */}
        <div className="glass p-5 rounded-2xl border border-white/10 space-y-3">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-mono uppercase tracking-wider">Messages</span>
            <div className="w-8 h-8 rounded-lg bg-rose-500/15 text-rose-400 flex items-center justify-center">
              <Mail className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
              {stats.totalMessages || 0}
            </div>
            <div className="text-[11px] text-slate-400 mt-1">
              <span className="text-rose-400 font-semibold">{stats.unreadMessages || 0} unread</span> submissions
            </div>
          </div>
        </div>

      </div>

      {/* Two-Column Detail View: Recent Projects & Recent Messages */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Recent Projects Table */}
        <div className="glass rounded-2xl border border-white/10 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <FolderGit2 className="w-4 h-4 text-brand-400" />
              <span>Recent Projects</span>
            </h3>
            <Link to="/admin/projects" className="text-xs text-brand-400 hover:text-brand-300 font-medium">
              Manage All →
            </Link>
          </div>

          <div className="divide-y divide-white/5">
            {recentProjects.map((p) => (
              <div key={p._id} className="py-3 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 overflow-hidden">
                  <img
                    src={p.thumbnail}
                    alt={p.title}
                    className="w-10 h-10 rounded-lg object-cover shrink-0 border border-white/10"
                  />
                  <div className="overflow-hidden">
                    <p className="text-xs font-semibold text-white truncate">{p.title}</p>
                    <p className="text-[11px] text-slate-400">{p.category}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                    p.status === 'published' 
                      ? 'bg-emerald-500/20 text-emerald-300' 
                      : 'bg-amber-500/20 text-amber-300'
                  }`}>
                    {p.status}
                  </span>
                </div>
              </div>
            ))}

            {recentProjects.length === 0 && (
              <p className="text-xs text-slate-500 py-4 text-center">No projects registered yet.</p>
            )}
          </div>
        </div>

        {/* Recent Messages */}
        <div className="glass rounded-2xl border border-white/10 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Mail className="w-4 h-4 text-rose-400" />
              <span>Recent Contact Inquiries</span>
            </h3>
            <Link to="/admin/messages" className="text-xs text-brand-400 hover:text-brand-300 font-medium">
              View Inbox →
            </Link>
          </div>

          <div className="divide-y divide-white/5">
            {recentMessages.map((m) => (
              <div key={m._id} className="py-3 flex items-center justify-between gap-4">
                <div className="overflow-hidden">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-white truncate">{m.name}</span>
                    {!m.isRead && (
                      <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0" title="Unread" />
                    )}
                  </div>
                  <p className="text-[11px] text-slate-400 truncate">{m.subject}</p>
                </div>

                <span className="text-[10px] font-mono text-slate-500 shrink-0">
                  {new Date(m.createdAt).toLocaleDateString()}
                </span>
              </div>
            ))}

            {recentMessages.length === 0 && (
              <p className="text-xs text-slate-500 py-4 text-center">No messages received yet.</p>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
