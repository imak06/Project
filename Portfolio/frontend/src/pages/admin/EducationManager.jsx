import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, GraduationCap } from 'lucide-react';
import api from '../../api/client';
import Modal from '../../components/common/Modal';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import { useToast } from '../../components/common/Toast';

export default function EducationManager() {
  const { addToast } = useToast();
  const [education, setEducation] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingEdu, setEditingEdu] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  const initialForm = {
    degree: '',
    institution: '',
    fieldOfStudy: 'Computer Science and Engineering',
    startYear: '2024',
    endYear: '2028',
    expectedGraduation: true,
    grade: '',
    description: '',
    order: 0
  };

  const [form, setForm] = useState(initialForm);

  const fetchEdu = async () => {
    try {
      const res = await api.get('/education');
      if (res.data.success) {
        setEducation(res.data.data);
      }
    } catch (err) {
      addToast('Failed to load education entries', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEdu();
  }, []);

  const handleOpenAdd = () => {
    setEditingEdu(null);
    setForm(initialForm);
    setModalOpen(true);
  };

  const handleOpenEdit = (edu) => {
    setEditingEdu(edu);
    setForm({
      degree: edu.degree || '',
      institution: edu.institution || '',
      fieldOfStudy: edu.fieldOfStudy || '',
      startYear: edu.startYear || '',
      endYear: edu.endYear || '',
      expectedGraduation: edu.expectedGraduation || false,
      grade: edu.grade || '',
      description: edu.description || '',
      order: edu.order || 0
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingEdu) {
        await api.put(`/education/${editingEdu._id}`, form);
        addToast('Education record updated', 'success');
      } else {
        await api.post('/education', form);
        addToast('Education record added', 'success');
      }
      setModalOpen(false);
      fetchEdu();
    } catch (err) {
      addToast(err.response?.data?.message || 'Failed to save education', 'error');
    }
  };

  const handleDelete = async () => {
    if (!confirmDeleteId) return;
    try {
      await api.delete(`/education/${confirmDeleteId}`);
      addToast('Education record deleted', 'success');
      fetchEdu();
    } catch (err) {
      addToast('Failed to delete education', 'error');
    } finally {
      setConfirmDeleteId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white">Education History</h1>
          <p className="text-xs text-slate-400">Manage academic degrees, institutions, and dates.</p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-brand-600 hover:bg-brand-500 text-white transition-all flex items-center gap-2 shadow-glow-sm self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Education</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {education.map((edu) => (
          <div key={edu._id} className="glass p-6 rounded-2xl border border-white/10 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-brand-500/20 text-brand-300">
                  {edu.startYear} - {edu.endYear} {edu.expectedGraduation ? '(Expected)' : ''}
                </span>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleOpenEdit(edu)}
                    className="p-1 rounded text-slate-400 hover:text-white"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setConfirmDeleteId(edu._id)}
                    className="p-1 rounded text-slate-400 hover:text-rose-400"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <h3 className="text-base font-bold text-white mt-1">{edu.degree}</h3>
              <p className="text-xs font-semibold text-brand-400">{edu.institution}</p>
              {edu.fieldOfStudy && (
                <p className="text-xs text-slate-400">{edu.fieldOfStudy}</p>
              )}
              {edu.description && (
                <p className="text-xs text-slate-300 pt-2">{edu.description}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingEdu ? 'Edit Education' : 'Add Education'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-mono uppercase text-slate-400">Degree *</label>
            <input
              type="text"
              required
              value={form.degree}
              onChange={(e) => setForm({ ...form, degree: e.target.value })}
              placeholder="e.g. B.Tech in Computer Science Engineering"
              className="w-full px-3 py-2 rounded-xl bg-dark-950 border border-white/10 text-white text-xs focus:border-brand-500 outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-mono uppercase text-slate-400">Institution *</label>
            <input
              type="text"
              required
              value={form.institution}
              onChange={(e) => setForm({ ...form, institution: e.target.value })}
              placeholder="e.g. ICFAI University Dehradun"
              className="w-full px-3 py-2 rounded-xl bg-dark-950 border border-white/10 text-white text-xs focus:border-brand-500 outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-mono uppercase text-slate-400">Start Year *</label>
              <input
                type="text"
                required
                value={form.startYear}
                onChange={(e) => setForm({ ...form, startYear: e.target.value })}
                placeholder="2024"
                className="w-full px-3 py-2 rounded-xl bg-dark-950 border border-white/10 text-white text-xs focus:border-brand-500 outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono uppercase text-slate-400">End Year *</label>
              <input
                type="text"
                required
                value={form.endYear}
                onChange={(e) => setForm({ ...form, endYear: e.target.value })}
                placeholder="2028"
                className="w-full px-3 py-2 rounded-xl bg-dark-950 border border-white/10 text-white text-xs focus:border-brand-500 outline-none"
              />
            </div>
          </div>

          <div className="flex items-center">
            <label className="flex items-center gap-2 text-xs font-mono text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={form.expectedGraduation}
                onChange={(e) => setForm({ ...form, expectedGraduation: e.target.checked })}
                className="rounded border-white/10 text-brand-600 focus:ring-0"
              />
              <span>Expected Graduation Year</span>
            </label>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-mono uppercase text-slate-400">Description</label>
            <textarea
              rows={3}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Key coursework, honors, focus areas..."
              className="w-full px-3 py-2 rounded-xl bg-dark-950 border border-white/10 text-white text-xs focus:border-brand-500 outline-none resize-none"
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
              Save Record
            </button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        isOpen={!!confirmDeleteId}
        onClose={() => setConfirmDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Education Record"
        message="Are you sure you want to remove this academic history entry?"
        confirmText="Delete"
      />
    </div>
  );
}
