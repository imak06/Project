import React, { useState, useEffect } from 'react';
import { User, Save, Upload, Sparkles, Plus, X } from 'lucide-react';
import api from '../../api/client';
import { useToast } from '../../components/common/Toast';

export default function ProfileManager() {
  const { addToast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newInterest, setNewInterest] = useState('');

  const [form, setForm] = useState({
    name: 'Arik Maitra',
    title: 'Full-Stack Developer | MERN Stack Developer | Tech Enthusiast',
    typingTitles: ['Full-Stack Developer', 'MERN Stack Developer', 'Frontend Developer', 'Tech Enthusiast'],
    heroSubtitle: 'Building modern digital experiences with code, creativity, and curiosity.',
    aboutMe: '',
    careerGoals: '',
    currentLearning: '',
    interests: ['Cricket', 'Badminton', 'Technology and Software Development'],
    profileImage: '',
    resumeUrl: '',
    email: 'arikmaitra071@gmail.com',
    phone: '',
    location: '',
    socialLinks: {
      github: '',
      linkedin: '',
      twitter: '',
      leetcode: ''
    }
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get('/profile');
        if (res.data.success && res.data.data) {
          const p = res.data.data;
          setForm({
            name: p.name || 'Arik Maitra',
            title: p.title || '',
            typingTitles: p.typingTitles?.length ? p.typingTitles : ['Full-Stack Developer'],
            heroSubtitle: p.heroSubtitle || '',
            aboutMe: p.aboutMe || '',
            careerGoals: p.careerGoals || '',
            currentLearning: p.currentLearning || '',
            interests: p.interests?.length ? p.interests : ['Cricket', 'Badminton'],
            profileImage: p.profileImage || '',
            resumeUrl: p.resumeUrl || '',
            email: p.email || 'arikmaitra071@gmail.com',
            phone: p.phone || '',
            location: p.location || '',
            socialLinks: {
              github: p.socialLinks?.github || '',
              linkedin: p.socialLinks?.linkedin || '',
              twitter: p.socialLinks?.twitter || '',
              leetcode: p.socialLinks?.leetcode || ''
            }
          });
        }
      } catch (err) {
        addToast('Failed to load profile data', 'error');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleAddTypingTitle = () => {
    if (newTitle.trim()) {
      setForm(prev => ({ ...prev, typingTitles: [...prev.typingTitles, newTitle.trim()] }));
      setNewTitle('');
    }
  };

  const handleRemoveTypingTitle = (index) => {
    setForm(prev => ({
      ...prev,
      typingTitles: prev.typingTitles.filter((_, i) => i !== index)
    }));
  };

  const handleAddInterest = () => {
    if (newInterest.trim()) {
      setForm(prev => ({ ...prev, interests: [...prev.interests, newInterest.trim()] }));
      setNewInterest('');
    }
  };

  const handleRemoveInterest = (index) => {
    setForm(prev => ({
      ...prev,
      interests: prev.interests.filter((_, i) => i !== index)
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await api.put('/profile', form);
      if (res.data.success) {
        addToast('Profile updated successfully!', 'success');
      }
    } catch (err) {
      addToast(err.response?.data?.message || 'Failed to update profile', 'error');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="text-center py-20 text-slate-500">Loading profile data...</div>;
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-xl font-bold text-white">Profile & Bio Management</h1>
        <p className="text-xs text-slate-400">
          Edit your public name, titles, about me narrative, career goals, contact details, and social links.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        
        {/* Core Info */}
        <div className="glass p-6 rounded-2xl border border-white/10 space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono text-brand-400">
            1. Core Personal Details
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-mono uppercase text-slate-400">Full Name *</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-dark-950 border border-white/10 text-white text-xs focus:border-brand-500 outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono uppercase text-slate-400">Professional Title *</label>
              <input
                type="text"
                required
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-dark-950 border border-white/10 text-white text-xs focus:border-brand-500 outline-none"
              />
            </div>
          </div>

          {/* Typing Animation Titles */}
          <div className="space-y-2 pt-2">
            <label className="text-xs font-mono uppercase text-slate-400">Hero Section Cycling Titles</label>
            <div className="flex flex-wrap gap-2">
              {form.typingTitles.map((t, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-full bg-brand-500/20 text-brand-300 border border-brand-500/30 text-xs font-mono flex items-center gap-1.5"
                >
                  <span>{t}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveTypingTitle(idx)}
                    className="hover:text-rose-400"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2 max-w-md pt-1">
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Add title (e.g. AWS Cloud Practitioner)"
                className="flex-1 px-3 py-1.5 rounded-xl bg-dark-950 border border-white/10 text-white text-xs focus:border-brand-500 outline-none"
              />
              <button
                type="button"
                onClick={handleAddTypingTitle}
                className="px-3 py-1.5 rounded-xl bg-brand-600 text-white text-xs font-semibold"
              >
                Add
              </button>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-mono uppercase text-slate-400">Hero Subheading</label>
            <input
              type="text"
              value={form.heroSubtitle}
              onChange={(e) => setForm({ ...form, heroSubtitle: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-dark-950 border border-white/10 text-white text-xs focus:border-brand-500 outline-none"
            />
          </div>
        </div>

        {/* Narrative & Goals */}
        <div className="glass p-6 rounded-2xl border border-white/10 space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono text-brand-400">
            2. Narrative, Goals & Interests
          </h3>

          <div className="space-y-1">
            <label className="text-xs font-mono uppercase text-slate-400">About Me Text *</label>
            <textarea
              rows={4}
              required
              value={form.aboutMe}
              onChange={(e) => setForm({ ...form, aboutMe: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-dark-950 border border-white/10 text-white text-xs focus:border-brand-500 outline-none resize-none leading-relaxed"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-mono uppercase text-slate-400">Career Objective & Vision</label>
            <textarea
              rows={2}
              value={form.careerGoals}
              onChange={(e) => setForm({ ...form, careerGoals: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-dark-950 border border-white/10 text-white text-xs focus:border-brand-500 outline-none resize-none leading-relaxed"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-mono uppercase text-slate-400">Currently Learning & Exploring</label>
            <input
              type="text"
              value={form.currentLearning}
              onChange={(e) => setForm({ ...form, currentLearning: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-dark-950 border border-white/10 text-white text-xs focus:border-brand-500 outline-none"
            />
          </div>

          {/* Interests Tags */}
          <div className="space-y-2 pt-2">
            <label className="text-xs font-mono uppercase text-slate-400">Interests & Hobbies (Beyond Code)</label>
            <div className="flex flex-wrap gap-2">
              {form.interests.map((item, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300 text-xs flex items-center gap-1.5"
                >
                  <span>{item}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveInterest(idx)}
                    className="hover:text-rose-400"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2 max-w-md pt-1">
              <input
                type="text"
                value={newInterest}
                onChange={(e) => setNewInterest(e.target.value)}
                placeholder="e.g. Cricket, Badminton, Chess"
                className="flex-1 px-3 py-1.5 rounded-xl bg-dark-950 border border-white/10 text-white text-xs focus:border-brand-500 outline-none"
              />
              <button
                type="button"
                onClick={handleAddInterest}
                className="px-3 py-1.5 rounded-xl bg-brand-600 text-white text-xs font-semibold"
              >
                Add
              </button>
            </div>
          </div>
        </div>

        {/* Assets & Contact Information */}
        <div className="glass p-6 rounded-2xl border border-white/10 space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono text-brand-400">
            3. Media Assets & Contact Details
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-mono uppercase text-slate-400">Profile Image URL</label>
              <input
                type="text"
                value={form.profileImage}
                onChange={(e) => setForm({ ...form, profileImage: e.target.value })}
                placeholder="https://..."
                className="w-full px-3 py-2 rounded-xl bg-dark-950 border border-white/10 text-white text-xs focus:border-brand-500 outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono uppercase text-slate-400">Resume PDF Path or URL</label>
              <input
                type="text"
                value={form.resumeUrl}
                onChange={(e) => setForm({ ...form, resumeUrl: e.target.value })}
                placeholder="/resume.pdf"
                className="w-full px-3 py-2 rounded-xl bg-dark-950 border border-white/10 text-white text-xs focus:border-brand-500 outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-mono uppercase text-slate-400">Contact Email *</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-dark-950 border border-white/10 text-white text-xs focus:border-brand-500 outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono uppercase text-slate-400">Phone</label>
              <input
                type="text"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-dark-950 border border-white/10 text-white text-xs focus:border-brand-500 outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono uppercase text-slate-400">Location</label>
              <input
                type="text"
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                placeholder="Dehradun / Kolkata, India"
                className="w-full px-3 py-2 rounded-xl bg-dark-950 border border-white/10 text-white text-xs focus:border-brand-500 outline-none"
              />
            </div>
          </div>

          {/* Social Links */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="space-y-1">
              <label className="text-xs font-mono uppercase text-slate-400">GitHub Profile URL</label>
              <input
                type="url"
                value={form.socialLinks.github}
                onChange={(e) => setForm({ ...form, socialLinks: { ...form.socialLinks, github: e.target.value } })}
                placeholder="https://github.com/..."
                className="w-full px-3 py-2 rounded-xl bg-dark-950 border border-white/10 text-white text-xs focus:border-brand-500 outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono uppercase text-slate-400">LinkedIn Profile URL</label>
              <input
                type="url"
                value={form.socialLinks.linkedin}
                onChange={(e) => setForm({ ...form, socialLinks: { ...form.socialLinks, linkedin: e.target.value } })}
                placeholder="https://linkedin.com/in/..."
                className="w-full px-3 py-2 rounded-xl bg-dark-950 border border-white/10 text-white text-xs focus:border-brand-500 outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono uppercase text-slate-400">Twitter (X) URL</label>
              <input
                type="url"
                value={form.socialLinks.twitter}
                onChange={(e) => setForm({ ...form, socialLinks: { ...form.socialLinks, twitter: e.target.value } })}
                placeholder="https://twitter.com/..."
                className="w-full px-3 py-2 rounded-xl bg-dark-950 border border-white/10 text-white text-xs focus:border-brand-500 outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono uppercase text-slate-400">LeetCode URL</label>
              <input
                type="url"
                value={form.socialLinks.leetcode}
                onChange={(e) => setForm({ ...form, socialLinks: { ...form.socialLinks, leetcode: e.target.value } })}
                placeholder="https://leetcode.com/..."
                className="w-full px-3 py-2 rounded-xl bg-dark-950 border border-white/10 text-white text-xs focus:border-brand-500 outline-none"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-3 rounded-xl text-sm font-semibold bg-brand-600 hover:bg-brand-500 text-white shadow-glow-sm transition-all flex items-center gap-2 disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Saving Profile...' : 'Save Profile Changes'}</span>
          </button>
        </div>

      </form>
    </div>
  );
}
