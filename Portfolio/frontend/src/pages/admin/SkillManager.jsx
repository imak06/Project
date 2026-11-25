import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Cpu, Sparkles, Search } from 'lucide-react';
import api from '../../api/client';
import Modal from '../../components/common/Modal';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import { useToast } from '../../components/common/Toast';

const categories = [
  'Frontend Development',
  'Backend Development',
  'Database',
  'Programming Languages',
  'Tools and Technologies',
  'Cloud Computing'
];

const levels = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];

export default function SkillManager() {
  const { addToast } = useToast();
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterCat, setFilterCat] = useState('All');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  const initialForm = {
    name: '',
    category: 'Frontend Development',
    proficiency: 85,
    level: 'Advanced',
    icon: 'Code',
    featured: true,
    order: 0
  };

  const [form, setForm] = useState(initialForm);

  const fetchSkills = async () => {
    try {
      const res = await api.get('/skills');
      if (res.data.success) {
        setSkills(res.data.data);
      }
    } catch (err) {
      addToast('Failed to load skills', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const handleOpenAdd = () => {
    setEditingSkill(null);
    setForm(initialForm);
    setModalOpen(true);
  };

  const handleOpenEdit = (skill) => {
    setEditingSkill(skill);
    setForm({
      name: skill.name || '',
      category: skill.category || 'Frontend Development',
      proficiency: skill.proficiency || 85,
      level: skill.level || 'Advanced',
      icon: skill.icon || 'Code',
      featured: skill.featured ?? true,
      order: skill.order || 0
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingSkill) {
        await api.put(`/skills/${editingSkill._id}`, form);
        addToast('Skill updated successfully', 'success');
      } else {
        await api.post('/skills', form);
        addToast('Skill added successfully', 'success');
      }
      setModalOpen(false);
      fetchSkills();
    } catch (err) {
      addToast(err.response?.data?.message || 'Failed to save skill', 'error');
    }
  };

  const handleDelete = async () => {
    if (!confirmDeleteId) return;
    try {
      await api.delete(`/skills/${confirmDeleteId}`);
      addToast('Skill deleted successfully', 'success');
      fetchSkills();
    } catch (err) {
      addToast('Failed to delete skill', 'error');
    } finally {
      setConfirmDeleteId(null);
    }
  };

  const filtered = filterCat === 'All' ? skills : skills.filter(s => s.category === filterCat);

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white">Skills & Technologies</h1>
          <p className="text-xs text-slate-400">Manage tech stack items displayed in the public Skills section.</p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-brand-600 hover:bg-brand-500 text-white transition-all flex items-center gap-2 shadow-glow-sm self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Skill</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setFilterCat('All')}
          className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
            filterCat === 'All' ? 'bg-brand-600 text-white' : 'bg-dark-900 text-slate-400 hover:text-white'
          }`}
        >
          All ({skills.length})
        </button>
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setFilterCat(c)}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
              filterCat === c ? 'bg-brand-600 text-white' : 'bg-dark-900 text-slate-400 hover:text-white'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((skill) => (
          <div key={skill._id} className="glass p-5 rounded-2xl border border-white/10 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 text-slate-400 border border-white/5">
                  {skill.category}
                </span>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleOpenEdit(skill)}
                    className="p-1 rounded text-slate-400 hover:text-brand-300"
                  >
                    <Edit className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setConfirmDeleteId(skill._id)}
                    className="p-1 rounded text-slate-400 hover:text-rose-400"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <h3 className="text-sm font-bold text-white mt-1">{skill.name}</h3>
              <p className="text-xs text-brand-400 font-mono mt-0.5">{skill.level}</p>
            </div>

            <div className="mt-4 space-y-1">
              <div className="flex justify-between text-[11px] font-mono text-slate-400">
                <span>Proficiency</span>
                <span>{skill.proficiency}%</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-dark-950 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-brand-600 to-brand-cyan"
                  style={{ width: `${skill.proficiency}%` }}
                />
              </div>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="col-span-full text-center py-12 text-slate-500">
            No skills registered under this category.
          </div>
        )}
      </div>

      {/* Modal Form */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingSkill ? 'Edit Skill' : 'Add New Skill'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-mono uppercase text-slate-400">Skill Name *</label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="e.g. React.js, Express.js, AWS"
              className="w-full px-3 py-2 rounded-xl bg-dark-950 border border-white/10 text-white text-xs focus:border-brand-500 outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
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

            <div className="space-y-1">
              <label className="text-xs font-mono uppercase text-slate-400">Level *</label>
              <select
                value={form.level}
                onChange={(e) => setForm({ ...form, level: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-dark-950 border border-white/10 text-white text-xs focus:border-brand-500 outline-none"
              >
                {levels.map(l => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-xs font-mono text-slate-400">
              <label className="uppercase">Proficiency ({form.proficiency}%)</label>
            </div>
            <input
              type="range"
              min="10"
              max="100"
              value={form.proficiency}
              onChange={(e) => setForm({ ...form, proficiency: Number(e.target.value) })}
              className="w-full accent-brand-500"
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
              {editingSkill ? 'Save Skill' : 'Add Skill'}
            </button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        isOpen={!!confirmDeleteId}
        onClose={() => setConfirmDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Skill"
        message="Are you sure you want to remove this skill from your tech stack?"
        confirmText="Delete Skill"
      />

    </div>
  );
}
