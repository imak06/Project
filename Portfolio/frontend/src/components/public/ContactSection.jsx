import React, { useState } from 'react';
import { 
  Mail, MapPin, Phone, Send, CheckCircle2, AlertCircle, Sparkles 
} from 'lucide-react';
import { Github, Linkedin, Twitter } from '../common/SocialIcons';
import api from '../../api/client';
import { useToast } from '../common/Toast';

export default function ContactSection({ profile, settings }) {
  const { addToast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      addToast('Please fill out all required fields', 'error');
      return;
    }

    setSubmitting(true);
    try {
      const res = await api.post('/messages', formData);
      if (res.data.success) {
        setSubmitted(true);
        addToast('Message sent successfully! I will reply shortly.', 'success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to send message. Please try again or email directly.';
      addToast(msg, 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const email = profile?.email || settings?.contactEmail || 'arikmaitra071@gmail.com';
  const social = profile?.socialLinks || settings?.socialLinks || {};

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-dark-900/40 light:bg-slate-50">
      {/* Background spotlights */}
      <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-brand-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-300 text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Initiate Collaboration</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white light:text-slate-900 tracking-tight">
            Let's Build Something <span className="text-gradient-primary">Remarkable</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-400 light:text-slate-600">
            Have a project in mind, an engineering role opening, or want to discuss full-stack & cloud technologies? Drop me a message!
          </p>
        </div>

        {/* Contact Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch max-w-6xl mx-auto">
          
          {/* Left Contact Details Card */}
          <div className="lg:col-span-5 flex flex-col justify-between glass-card p-6 sm:p-8 rounded-3xl border border-white/10 space-y-8">
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-white light:text-slate-900">
                Contact Information
              </h3>
              <p className="text-sm text-slate-400 light:text-slate-600 leading-relaxed">
                I am actively seeking software engineering internships, junior developer roles, and high-impact web development collaborations.
              </p>

              <div className="space-y-4 pt-2">
                <a
                  href={`mailto:${email}`}
                  className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-dark-950/60 light:bg-white border border-white/5 hover:border-brand-500/40 text-slate-300 light:text-slate-700 hover:text-white transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-brand-500/10 text-brand-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400">Direct Email</div>
                    <div className="text-xs sm:text-sm font-semibold">{email}</div>
                  </div>
                </a>

                {profile?.location && (
                  <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-dark-950/60 light:bg-white border border-white/5 text-slate-300 light:text-slate-700">
                    <div className="w-10 h-10 rounded-xl bg-brand-violet/10 text-brand-violet flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400">Location</div>
                      <div className="text-xs sm:text-sm font-semibold">{profile.location}</div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Social Link Badges */}
            <div className="pt-6 border-t border-white/10">
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">
                Professional Profiles
              </h4>
              <div className="flex items-center gap-3">
                {social.github && (
                  <a
                    href={social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-dark-950 light:bg-white border border-white/10 hover:border-brand-500/50 text-slate-400 hover:text-white transition-all hover:-translate-y-0.5"
                    title="GitHub"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                )}
                {social.linkedin && (
                  <a
                    href={social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-dark-950 light:bg-white border border-white/10 hover:border-brand-500/50 text-slate-400 hover:text-white transition-all hover:-translate-y-0.5"
                    title="LinkedIn"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                )}
                {social.twitter && (
                  <a
                    href={social.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-dark-950 light:bg-white border border-white/10 hover:border-brand-500/50 text-slate-400 hover:text-white transition-all hover:-translate-y-0.5"
                    title="Twitter"
                  >
                    <Twitter className="w-5 h-5" />
                  </a>
                )}
              </div>
            </div>

          </div>

          {/* Right Contact Form */}
          <div className="lg:col-span-7 glass-card p-6 sm:p-10 rounded-3xl border border-white/10 shadow-2xl">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 space-y-4 animate-in zoom-in-95">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-white light:text-slate-900">
                  Message Dispatched!
                </h3>
                <p className="text-sm text-slate-400 max-w-sm">
                  Thank you for reaching out. Your message has been logged in my dashboard inbox, and I will get back to you promptly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-brand-600 hover:bg-brand-500 text-white transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono uppercase tracking-wider text-slate-400 font-medium">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Jane Doe"
                      className="w-full px-4 py-3 rounded-xl bg-dark-950/70 light:bg-slate-50 border border-white/10 light:border-black/10 text-white light:text-slate-900 text-sm placeholder:text-slate-500 focus:outline-none focus:border-brand-500 transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono uppercase tracking-wider text-slate-400 font-medium">
                      Your Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="jane@company.com"
                      className="w-full px-4 py-3 rounded-xl bg-dark-950/70 light:bg-slate-50 border border-white/10 light:border-black/10 text-white light:text-slate-900 text-sm placeholder:text-slate-500 focus:outline-none focus:border-brand-500 transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono uppercase tracking-wider text-slate-400 font-medium">
                    Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Project Inquiry / Job Opportunity"
                    className="w-full px-4 py-3 rounded-xl bg-dark-950/70 light:bg-slate-50 border border-white/10 light:border-black/10 text-white light:text-slate-900 text-sm placeholder:text-slate-500 focus:outline-none focus:border-brand-500 transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono uppercase tracking-wider text-slate-400 font-medium">
                    Your Message *
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project or role details..."
                    className="w-full px-4 py-3 rounded-xl bg-dark-950/70 light:bg-slate-50 border border-white/10 light:border-black/10 text-white light:text-slate-900 text-sm placeholder:text-slate-500 focus:outline-none focus:border-brand-500 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-brand-600 via-brand-accent to-brand-violet hover:from-brand-500 hover:to-brand-500 text-white shadow-glow-sm hover:shadow-glow-md transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{submitting ? 'Sending Message...' : 'Send Message'}</span>
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
