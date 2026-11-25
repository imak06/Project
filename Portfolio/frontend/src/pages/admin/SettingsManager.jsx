import React, { useState, useEffect } from 'react';
import { Settings, Save, Globe, Sparkles } from 'lucide-react';
import api from '../../api/client';
import { useToast } from '../../components/common/Toast';

export default function SettingsManager() {
  const { addToast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    siteName: 'Arik Maitra - Portfolio',
    logoText: 'ARIK.',
    metaTitle: 'Arik Maitra | Full-Stack MERN Developer',
    metaDescription: 'Personal portfolio of Arik Maitra, a Computer Science Engineering student and aspiring Full-Stack MERN Developer.',
    footerText: 'Designed & Engineered with passion by Arik Maitra. Built with MERN Stack, Tailwind CSS & Framer Motion.',
    contactEmail: 'arikmaitra071@gmail.com',
    themePreference: 'dark'
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await api.get('/settings');
        if (res.data.success && res.data.data) {
          const s = res.data.data;
          setForm({
            siteName: s.siteName || 'Arik Maitra - Portfolio',
            logoText: s.logoText || 'ARIK.',
            metaTitle: s.metaTitle || '',
            metaDescription: s.metaDescription || '',
            footerText: s.footerText || '',
            contactEmail: s.contactEmail || 'arikmaitra071@gmail.com',
            themePreference: s.themePreference || 'dark'
          });
        }
      } catch (err) {
        addToast('Failed to load website settings', 'error');
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await api.put('/settings', form);
      if (res.data.success) {
        addToast('Global website settings saved!', 'success');
      }
    } catch (err) {
      addToast(err.response?.data?.message || 'Failed to save settings', 'error');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="text-center py-20 text-slate-500">Loading settings...</div>;
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-xl font-bold text-white">Global Website Settings</h1>
        <p className="text-xs text-slate-400">
          Configure branding labels, SEO tags, footer disclaimers, and system defaults.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="glass p-6 rounded-2xl border border-white/10 space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono text-brand-400">
            Branding & Navigation
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-mono uppercase text-slate-400">Navbar Logo Text</label>
              <input
                type="text"
                required
                value={form.logoText}
                onChange={(e) => setForm({ ...form, logoText: e.target.value })}
                placeholder="ARIK."
                className="w-full px-3 py-2 rounded-xl bg-dark-950 border border-white/10 text-white text-xs focus:border-brand-500 outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono uppercase text-slate-400">Website Title</label>
              <input
                type="text"
                required
                value={form.siteName}
                onChange={(e) => setForm({ ...form, siteName: e.target.value })}
                placeholder="Arik Maitra - Portfolio"
                className="w-full px-3 py-2 rounded-xl bg-dark-950 border border-white/10 text-white text-xs focus:border-brand-500 outline-none"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-mono uppercase text-slate-400">Default Contact Email</label>
            <input
              type="email"
              required
              value={form.contactEmail}
              onChange={(e) => setForm({ ...form, contactEmail: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-dark-950 border border-white/10 text-white text-xs focus:border-brand-500 outline-none"
            />
          </div>
        </div>

        <div className="glass p-6 rounded-2xl border border-white/10 space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono text-brand-400">
            Search Engine Optimization (SEO)
          </h3>

          <div className="space-y-1">
            <label className="text-xs font-mono uppercase text-slate-400">Meta Title</label>
            <input
              type="text"
              value={form.metaTitle}
              onChange={(e) => setForm({ ...form, metaTitle: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-dark-950 border border-white/10 text-white text-xs focus:border-brand-500 outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-mono uppercase text-slate-400">Meta Description</label>
            <textarea
              rows={3}
              value={form.metaDescription}
              onChange={(e) => setForm({ ...form, metaDescription: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-dark-950 border border-white/10 text-white text-xs focus:border-brand-500 outline-none resize-none leading-relaxed"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-mono uppercase text-slate-400">Footer Text</label>
            <input
              type="text"
              value={form.footerText}
              onChange={(e) => setForm({ ...form, footerText: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-dark-950 border border-white/10 text-white text-xs focus:border-brand-500 outline-none"
            />
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-3 rounded-xl text-sm font-semibold bg-brand-600 hover:bg-brand-500 text-white shadow-glow-sm transition-all flex items-center gap-2 disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Saving...' : 'Save Website Settings'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
