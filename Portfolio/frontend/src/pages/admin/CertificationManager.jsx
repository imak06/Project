import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Award, Trophy, ExternalLink } from 'lucide-react';
import api from '../../api/client';
import Modal from '../../components/common/Modal';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import { useToast } from '../../components/common/Toast';

const certCategories = ['Certificates', 'Hackathons', 'Achievements', 'Competitions', 'Workshops', 'Technical events'];

export default function CertificationManager() {
  const { addToast } = useToast();
  const [certs, setCerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCert, setEditingCert] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  const initialForm = {
    title: '',
    issuer: '',
    issueDate: '2024',
    credentialId: '',
    credentialUrl: '',
    category: 'Certificates',
    description: '',
    order: 0
  };

  const [form, setForm] = useState(initialForm);

  const fetchCerts = async () => {
    try {
      const res = await api.get('/certifications');
      if (res.data.success) {
        setCerts(res.data.data);
      }
    } catch (err) {
      addToast('Failed to load certifications', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCerts();
  }, []);

  const handleOpenAdd = () => {
    setEditingCert(null);
    setForm(initialForm);
    setModalOpen(true);
  };

  const handleOpenEdit = (cert) => {
    setEditingCert(cert);
    setForm({
      title: cert.title || '',
      issuer: cert.issuer || '',
      issueDate: cert.issueDate || '',
      credentialId: cert.credentialId || '',
      credentialUrl: cert.credentialUrl || '',
      category: cert.category || 'Certificates',
      description: cert.description || '',
      order: cert.order || 0
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingCert) {
        await api.put(`/certifications/${editingCert._id}`, form);
        addToast('Certification updated successfully', 'success');
      } else {
        await api.post('/certifications', form);
        addToast('Certification added successfully', 'success');
      }
      setModalOpen(false);
      fetchCerts();
    } catch (err) {
      addToast(err.response?.data?.message || 'Failed to save certification', 'error');
    }
  };

  const handleDelete = async () => {
    if (!confirmDeleteId) return;
    try {
      await api.delete(`/certifications/${confirmDeleteId}`);
      addToast('Certification deleted successfully', 'success');
      fetchCerts();
    } catch (err) {
      addToast('Failed to delete certification', 'error');
    } finally {
      setConfirmDeleteId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white">Achievements & Certifications</h1>
          <p className="text-xs text-slate-400">Manage credentials, hackathon wins, and technical certificates.</p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-brand-600 hover:bg-brand-500 text-white transition-all flex items-center gap-2 shadow-glow-sm self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Credential</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {certs.map((c) => (
          <div key={c._id} className="glass p-5 rounded-2xl border border-white/10 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 text-slate-300">
                  {c.category}
                </span>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleOpenEdit(c)}
                    className="p-1 rounded text-slate-400 hover:text-white"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setConfirmDeleteId(c._id)}
                    className="p-1 rounded text-slate-400 hover:text-rose-400"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <h3 className="text-sm font-bold text-white">{c.title}</h3>
              <p className="text-xs text-brand-400 font-semibold">{c.issuer}</p>
              <p className="text-[11px] font-mono text-slate-400">Issued: {c.issueDate}</p>
              {c.description && (
                <p className="text-xs text-slate-300 pt-1 line-clamp-2">{c.description}</p>
              )}
            </div>

            {c.credentialUrl && (
              <a
                href={c.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 pt-2 border-t border-white/5 text-[11px] font-mono text-brand-400 flex items-center gap-1 hover:underline"
              >
                <span>View Link</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        ))}
      </div>

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingCert ? 'Edit Credential' : 'Add Credential'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-mono uppercase text-slate-400">Title *</label>
            <input
              type="text"
              required
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="e.g. AWS Certified Cloud Practitioner"
              className="w-full px-3 py-2 rounded-xl bg-dark-950 border border-white/10 text-white text-xs focus:border-brand-500 outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-mono uppercase text-slate-400">Issuing Organization *</label>
              <input
                type="text"
                required
                value={form.issuer}
                onChange={(e) => setForm({ ...form, issuer: e.target.value })}
                placeholder="Amazon Web Services"
                className="w-full px-3 py-2 rounded-xl bg-dark-950 border border-white/10 text-white text-xs focus:border-brand-500 outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono uppercase text-slate-400">Category</label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-dark-950 border border-white/10 text-white text-xs focus:border-brand-500 outline-none"
              >
                {certCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-mono uppercase text-slate-400">Issue Date *</label>
              <input
                type="text"
                required
                value={form.issueDate}
                onChange={(e) => setForm({ ...form, issueDate: e.target.value })}
                placeholder="2024"
                className="w-full px-3 py-2 rounded-xl bg-dark-950 border border-white/10 text-white text-xs focus:border-brand-500 outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono uppercase text-slate-400">Credential URL</label>
              <input
                type="url"
                value={form.credentialUrl}
                onChange={(e) => setForm({ ...form, credentialUrl: e.target.value })}
                placeholder="https://..."
                className="w-full px-3 py-2 rounded-xl bg-dark-950 border border-white/10 text-white text-xs focus:border-brand-500 outline-none"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-mono uppercase text-slate-400">Description</label>
            <textarea
              rows={3}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Key skills demonstrated..."
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
              Save Credential
            </button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        isOpen={!!confirmDeleteId}
        onClose={() => setConfirmDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Credential"
        message="Are you sure you want to remove this certification/achievement?"
        confirmText="Delete"
      />
    </div>
  );
}
