import React, { useState, useEffect } from 'react';
import { 
  Plus, Edit, Trash2, ExternalLink, Search, 
  Sparkles, CheckCircle2, Eye, Star, Upload, Image as ImageIcon 
} from 'lucide-react';
import { Github } from '../../components/common/SocialIcons';
import api from '../../api/client';
import Modal from '../../components/common/Modal';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import { useToast } from '../../components/common/Toast';

const categories = ['Full-Stack', 'MERN Stack', 'Frontend', 'Backend', 'UI/UX Design', 'Other'];

export default function ProjectManager() {
  const { addToast } = useToast();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');

  // Modal form states
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [uploading, setUploading] = useState(false);

  const initialForm = {
    title: '',
    shortDescription: '',
    detailedDescription: '',
    thumbnail: '',
    technologies: '',
    category: 'Full-Stack',
    githubUrl: '',
    liveDemoUrl: '',
    featured: false,
    status: 'published',
    order: 0,
    completionDate: '2024'
  };

  const [form, setForm] = useState(initialForm);

  const fetchProjects = async () => {
    try {
      const res = await api.get('/projects/admin/all');
      if (res.data.success) {
        setProjects(res.data.data);
      }
    } catch (err) {
      addToast('Failed to load projects', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleOpenAdd = () => {
    setEditingProject(null);
    setForm(initialForm);
    setModalOpen(true);
  };

  const handleOpenEdit = (project) => {
    setEditingProject(project);
    setForm({
      title: project.title || '',
      shortDescription: project.shortDescription || '',
      detailedDescription: project.detailedDescription || '',
      thumbnail: project.thumbnail || '',
      technologies: Array.isArray(project.technologies) ? project.technologies.join(', ') : '',
      category: project.category || 'Full-Stack',
      githubUrl: project.githubUrl || '',
      liveDemoUrl: project.liveDemoUrl || '',
      featured: project.featured || false,
      status: project.status || 'published',
      order: project.order || 0,
      completionDate: project.completionDate || '2024'
    });
    setModalOpen(true);
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    setUploading(true);
    try {
      const res = await api.post('/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      if (res.data.success) {
        setForm(prev => ({ ...prev, thumbnail: res.data.url }));
        addToast('Thumbnail uploaded successfully', 'success');
      }
    } catch (err) {
      addToast('File upload failed', 'error');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      technologies: form.technologies.split(',').map(t => t.trim()).filter(Boolean)
    };

    try {
      if (editingProject) {
        await api.put(`/projects/${editingProject._id}`, payload);
        addToast('Project updated successfully', 'success');
      } else {
        await api.post('/projects', payload);
        addToast('Project created successfully', 'success');
      }
      setModalOpen(false);
      fetchProjects();
    } catch (err) {
      addToast(err.response?.data?.message || 'Failed to save project', 'error');
    }
  };

  const handleDelete = async () => {
    if (!confirmDeleteId) return;
    try {
      await api.delete(`/projects/${confirmDeleteId}`);
      addToast('Project deleted successfully', 'success');
      fetchProjects();
    } catch (err) {
      addToast('Failed to delete project', 'error');
    } finally {
      setConfirmDeleteId(null);
    }
  };

  const filtered = projects.filter(p => {
    const matchCat = filterCategory === 'All' || p.category === filterCategory;
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.shortDescription.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white">Project Management</h1>
          <p className="text-xs text-slate-400">Add, update, feature, or publish projects on your live portfolio.</p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-brand-600 hover:bg-brand-500 text-white transition-all flex items-center gap-2 shadow-glow-sm self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Project</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="glass p-4 rounded-2xl border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search projects..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-dark-900 border border-white/10 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-brand-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="w-full sm:w-auto px-3 py-2 rounded-xl bg-dark-900 border border-white/10 text-xs text-slate-300 focus:outline-none focus:border-brand-500"
          >
            <option value="All">All Categories</option>
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>

      {/* Projects Table */}
      <div className="glass rounded-2xl border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-dark-950/70 border-b border-white/10 text-slate-400 font-mono uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">Project</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Featured</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Stack</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.map((p) => (
                <tr key={p._id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={p.thumbnail}
                        alt={p.title}
                        className="w-12 h-12 rounded-lg object-cover shrink-0 border border-white/10 bg-dark-950"
                      />
                      <div>
                        <div className="font-bold text-white text-sm">{p.title}</div>
                        <div className="text-[11px] text-slate-400 line-clamp-1 max-w-xs">{p.shortDescription}</div>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-slate-300">
                    <span className="px-2.5 py-1 rounded-md bg-white/5 text-[11px] font-mono">
                      {p.category}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    {p.featured ? (
                      <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-mono flex items-center gap-1 w-fit">
                        <Star className="w-3 h-3 fill-amber-300" />
                        Featured
                      </span>
                    ) : (
                      <span className="text-slate-500 text-[10px] font-mono">Regular</span>
                    )}
                  </td>

                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium ${
                      p.status === 'published'
                        ? 'bg-emerald-500/20 text-emerald-300'
                        : 'bg-amber-500/20 text-amber-300'
                    }`}>
                      {p.status}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1 max-w-xs">
                      {p.technologies?.slice(0, 3).map((t, i) => (
                        <span key={i} className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-white/5 text-slate-300">
                          {t}
                        </span>
                      ))}
                      {p.technologies?.length > 3 && (
                        <span className="text-[10px] font-mono text-slate-500">+{p.technologies.length - 3}</span>
                      )}
                    </div>
                  </td>

                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleOpenEdit(p)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-brand-300 hover:bg-white/5 transition-colors"
                        title="Edit Project"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setConfirmDeleteId(p._id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-white/5 transition-colors"
                        title="Delete Project"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filtered.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center py-8 text-slate-500">
                    No projects found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Project Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingProject ? 'Edit Project' : 'Create New Project'}
        maxWidth="max-w-2xl"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-mono uppercase text-slate-400">Project Title *</label>
              <input
                type="text"
                required
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="e.g. LAMP LOGIN PAGE"
                className="w-full px-3 py-2 rounded-xl bg-dark-950 border border-white/10 text-white text-xs focus:border-brand-500 outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono uppercase text-slate-400">Category *</label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-dark-950 border border-white/10 text-white text-xs focus:border-brand-500 outline-none"
              >
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-mono uppercase text-slate-400">Short Summary *</label>
            <input
              type="text"
              required
              value={form.shortDescription}
              onChange={(e) => setForm({ ...form, shortDescription: e.target.value })}
              placeholder="Brief description for project card..."
              className="w-full px-3 py-2 rounded-xl bg-dark-950 border border-white/10 text-white text-xs focus:border-brand-500 outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-mono uppercase text-slate-400">Detailed Description (Full Deep-Dive)</label>
            <textarea
              rows={4}
              value={form.detailedDescription}
              onChange={(e) => setForm({ ...form, detailedDescription: e.target.value })}
              placeholder="Architecture, plugins used, implementation details..."
              className="w-full px-3 py-2 rounded-xl bg-dark-950 border border-white/10 text-white text-xs focus:border-brand-500 outline-none resize-none"
            />
          </div>

          {/* Thumbnail URL or File Upload */}
          <div className="space-y-1">
            <label className="text-xs font-mono uppercase text-slate-400">Cover Thumbnail *</label>
            <div className="flex gap-2">
              <input
                type="text"
                required
                value={form.thumbnail}
                onChange={(e) => setForm({ ...form, thumbnail: e.target.value })}
                placeholder="Image URL or upload file..."
                className="flex-1 px-3 py-2 rounded-xl bg-dark-950 border border-white/10 text-white text-xs focus:border-brand-500 outline-none"
              />
              <label className="px-3 py-2 rounded-xl bg-dark-900 border border-white/10 hover:border-brand-500 text-xs text-slate-300 cursor-pointer flex items-center gap-1.5">
                <Upload className="w-3.5 h-3.5" />
                <span>{uploading ? 'Uploading...' : 'Upload'}</span>
                <input type="file" onChange={handleFileUpload} accept="image/*" className="hidden" />
              </label>
            </div>
            {form.thumbnail && (
              <img src={form.thumbnail} alt="Preview" className="h-20 rounded-lg object-cover border border-white/10 mt-2" />
            )}
          </div>

          <div className="space-y-1">
            <label className="text-xs font-mono uppercase text-slate-400">Technologies (comma separated) *</label>
            <input
              type="text"
              required
              value={form.technologies}
              onChange={(e) => setForm({ ...form, technologies: e.target.value })}
              placeholder="React.js, Node.js, GSAP, MongoDB"
              className="w-full px-3 py-2 rounded-xl bg-dark-950 border border-white/10 text-white text-xs focus:border-brand-500 outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-mono uppercase text-slate-400">GitHub Repository URL</label>
              <input
                type="url"
                value={form.githubUrl}
                onChange={(e) => setForm({ ...form, githubUrl: e.target.value })}
                placeholder="https://github.com/..."
                className="w-full px-3 py-2 rounded-xl bg-dark-950 border border-white/10 text-white text-xs focus:border-brand-500 outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono uppercase text-slate-400">Live Demo URL</label>
              <input
                type="url"
                value={form.liveDemoUrl}
                onChange={(e) => setForm({ ...form, liveDemoUrl: e.target.value })}
                placeholder="https://..."
                className="w-full px-3 py-2 rounded-xl bg-dark-950 border border-white/10 text-white text-xs focus:border-brand-500 outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-2">
            <div className="space-y-1">
              <label className="text-xs font-mono uppercase text-slate-400">Status</label>
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-dark-950 border border-white/10 text-white text-xs focus:border-brand-500 outline-none"
              >
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono uppercase text-slate-400">Completion Year</label>
              <input
                type="text"
                value={form.completionDate}
                onChange={(e) => setForm({ ...form, completionDate: e.target.value })}
                placeholder="2024"
                className="w-full px-3 py-2 rounded-xl bg-dark-950 border border-white/10 text-white text-xs focus:border-brand-500 outline-none"
              />
            </div>

            <div className="flex items-center pt-5">
              <label className="flex items-center gap-2 text-xs font-mono text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.featured}
                  onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                  className="rounded border-white/10 text-brand-600 focus:ring-0"
                />
                <span>Featured Project</span>
              </label>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl text-xs font-semibold bg-brand-600 hover:bg-brand-500 text-white transition-all shadow-glow-sm"
            >
              {editingProject ? 'Save Changes' : 'Create Project'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={!!confirmDeleteId}
        onClose={() => setConfirmDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Project"
        message="Are you sure you want to delete this project? This will permanently remove it from your public portfolio."
        confirmText="Delete Project"
      />

    </div>
  );
}
