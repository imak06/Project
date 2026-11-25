import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Briefcase, Calendar, MapPin } from 'lucide-react';
import api from '../../api/client';
import Modal from '../../components/common/Modal';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import { useToast } from '../../components/common/Toast';

export default function ExperienceManager() {
  const { addToast } = useToast();
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingExp, setEditingExp] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  const initialForm = {
    role: '',
    company: '',
    employmentType: 'Internship',
    location: 'Remote',
    startDate: '',
    endDate: '',
    current: false,
    description: '',
    technologies: '',
    order: 0
  };

  const [form, setForm] = useState(initialForm);

  const fetchExperiences = async () => {
    try {
      const res = await api.get('/experiences');
      if (res.data.success) {
        setExperiences(res.data.data);
      }
    } catch (err) {
      addToast('Failed to load experience entries', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExperiences();
  }, []);

  const handleOpenAdd = () => {
    setEditingExp(null);
    setForm(initialForm);
    setModalOpen(true);
  };

  const handleOpenEdit = (exp) => {
    setEditingExp(exp);
    setForm({
      role: exp.role || '',
      company: exp.company || '',
      employmentType: exp.employmentType || 'Internship',
      location: exp.location || 'Remote',
      startDate: exp.startDate || '',
      endDate: exp.endDate || '',
      current: exp.current || false,
      description: exp.description || '',
      technologies: Array.isArray(exp.technologies) ? exp.technologies.join(', ') : '',
      order: exp.order || 0
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      technologies: form.technologies.split(',').map(t => t.trim()).filter(Boolean)
    };

    try {
      if (editingExp) {
        await api.put(`/experiences/${editingExp._id}`, payload);
        addToast('Experience entry updated', 'success');
      } else {
        await api.post('/experiences', payload);
        addToast('Experience entry created', 'success');
      }
      setModalOpen(false);
      fetchExperiences();
    } catch (err) {
      addToast(err.response?.data?.message || 'Failed to save experience', 'error');
    }
  };

  const handleDelete = async () => {
    if (!confirmDeleteId) return;
    try {
      await api.delete(`/experiences/${confirmDeleteId}`);
      addToast('Experience entry deleted', 'success');
      fetchExperiences();
    } catch (err) {
      addToast('Failed to delete experience', 'error');
    } finally {
      setConfirmDeleteId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white">Experience Timeline</h1>
          <p className="text-xs text-slate-400">Manage work history, internships, and open-source contributions.</p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-brand-600 hover:bg-brand-500 text-white transition-all flex items-center gap-2 shadow-glow-sm self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Experience</span>
        </button>
      </div>

      <div className="space-y-4">
        {experiences.map((exp) => (
          <div key={exp._id} className="glass p-6 rounded-2xl border border-white/10 flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-brand-500/20 text-brand-300 font-semibold">
                  {exp.employmentType}
                </span>
                {exp.current && (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300">
                    Currently Working
                  </span>
                )}
              </div>

              <h3 className="text-base font-bold text-white">{exp.role}</h3>
              <p className="text-xs font-semibold text-brand-400">{exp.company}</p>

              <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                </span>
                {exp.location && (
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    {exp.location}
                  </span>
                )}
              </div>

              <p className="text-xs text-slate-300 whitespace-pre-line pt-2">{exp.description}</p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => handleOpenEdit(exp)}
                className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
                title="Edit"
              >
                <Edit className="w-4 h-4" />
              </button>
              <button
                onClick={() => setConfirmDeleteId(exp._id)}
                className="p-2 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-white/5 transition-colors"
                title="Delete"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}

        {experiences.length === 0 && (
          <div className="text-center py-12 text-slate-500">
            No experience records found.
          </div>
        )}
      </div>

      {/* Add / Edit Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingExp ? 'Edit Experience' : 'Add Experience'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-mono uppercase text-slate-400">Role / Title *</label>
              <input
                type="text"
                required
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
                placeholder="Full-Stack Developer Intern"
                className="w-full px-3 py-2 rounded-xl bg-dark-950 border border-white/10 text-white text-xs focus:border-brand-500 outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono uppercase text-slate-400">Organization / Company *</label>
              <input
                type="text"
                required
                value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
                placeholder="Company Name"
                className="w-full px-3 py-2 rounded-xl bg-dark-950 border border-white/10 text-white text-xs focus:border-brand-500 outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-mono uppercase text-slate-400">Employment Type</label>
              <select
                value={form.employmentType}
                onChange={(e) => setForm({ ...form, employmentType: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-dark-950 border border-white/10 text-white text-xs focus:border-brand-500 outline-none"
              >
                <option value="Internship">Internship</option>
                <option value="Full-Time">Full-Time</option>
                <option value="Part-Time">Part-Time</option>
                <option value="Freelance">Freelance</option>
                <option value="Open Source">Open Source</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono uppercase text-slate-400">Location</label>
              <input
                type="text"
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                placeholder="Remote or Dehradun, India"
                className="w-full px-3 py-2 rounded-xl bg-dark-950 border border-white/10 text-white text-xs focus:border-brand-500 outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-mono uppercase text-slate-400">Start Date *</label>
              <input
                type="text"
                required
                value={form.startDate}
                onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                placeholder="Aug 2024"
                className="w-full px-3 py-2 rounded-xl bg-dark-950 border border-white/10 text-white text-xs focus:border-brand-500 outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono uppercase text-slate-400">End Date</label>
              <input
                type="text"
                disabled={form.current}
                value={form.endDate}
                onChange={(e) => setForm({ ...form, endDate: e.target.value })}
                placeholder={form.current ? 'Present' : 'Dec 2024'}
                className="w-full px-3 py-2 rounded-xl bg-dark-950 border border-white/10 text-white text-xs focus:border-brand-500 outline-none disabled:opacity-50"
              />
            </div>
          </div>

          <div className="flex items-center">
            <label className="flex items-center gap-2 text-xs font-mono text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={form.current}
                onChange={(e) => setForm({ ...form, current: e.target.checked })}
                className="rounded border-white/10 text-brand-600 focus:ring-0"
              />
              <span>I currently work here</span>
            </label>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-mono uppercase text-slate-400">Description *</label>
            <textarea
              rows={4}
              required
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Responsibilities, achievements, impact..."
              className="w-full px-3 py-2 rounded-xl bg-dark-950 border border-white/10 text-white text-xs focus:border-brand-500 outline-none resize-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-mono uppercase text-slate-400">Technologies (comma separated)</label>
            <input
              type="text"
              value={form.technologies}
              onChange={(e) => setForm({ ...form, technologies: e.target.value })}
              placeholder="React.js, Node.js, Express, MongoDB"
              className="w-full px-3 py-2 rounded-xl bg-dark-950 border border-white/10 text-white text-xs focus:border-brand-500 outline-none"
            />
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
              className="px-5 py-2 rounded-xl text-xs font-semibold bg-brand-600 hover:bg-brand-500 text-white"
            >
              {editingExp ? 'Save Changes' : 'Add Experience'}
            </button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        isOpen={!!confirmDeleteId}
        onClose={() => setConfirmDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Experience"
        message="Are you sure you want to remove this experience entry?"
        confirmText="Delete"
      />
    </div>
  );
}
