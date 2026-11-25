import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Lock, Mail, ArrowRight, ShieldCheck, Sparkles, AlertCircle, KeyRound } from 'lucide-react';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleQuickFill = () => {
    setEmail('arikmaitra071@gmail.com');
    setPassword('AdminPassword123!');
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      const result = await login(email, password);
      if (result.success) {
        navigate('/admin');
      } else {
        setError(result.message || 'Invalid credentials');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please verify credentials.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark-950 flex items-center justify-center p-4 relative overflow-hidden bg-grid-pattern">
      {/* Background spotlights */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-brand-500/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        
        {/* Brand Header */}
        <div className="text-center mb-8 space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-600 via-brand-accent to-brand-cyan text-white shadow-glow-md mb-2">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            Admin CMS Portal
          </h1>
          <p className="text-xs text-slate-400">
            Secure administrative control system for Arik Maitra's portfolio
          </p>
        </div>

        {/* Card Form */}
        <div className="glass p-8 rounded-3xl border border-white/10 shadow-2xl space-y-6">
          
          {error && (
            <div className="p-3.5 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2.5 animate-in fade-in">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-mono uppercase tracking-wider text-slate-400">
                Admin Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="arikmaitra071@gmail.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-dark-900 border border-white/10 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-brand-500 transition-colors"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono uppercase tracking-wider text-slate-400">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-dark-900 border border-white/10 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-brand-500 transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-brand-600 via-brand-accent to-brand-violet hover:from-brand-500 hover:to-brand-500 text-white shadow-glow-sm hover:shadow-glow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <span>{submitting ? 'Authenticating...' : 'Sign In to Dashboard'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick autofill helper for the owner/tester */}
          <div className="pt-4 border-t border-white/10 space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-mono">Quick test access:</span>
              <button
                type="button"
                onClick={handleQuickFill}
                className="text-xs font-mono text-brand-400 hover:text-brand-300 flex items-center gap-1 transition-colors"
              >
                <KeyRound className="w-3.5 h-3.5" />
                <span>Auto-fill Demo Credentials</span>
              </button>
            </div>
          </div>

          <div className="text-center pt-2">
            <Link
              to="/"
              className="text-xs text-slate-500 hover:text-slate-300 transition-colors"
            >
              ← Back to public portfolio
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
}
