import React, { useState, useEffect } from 'react';
import { 
  Mail, Trash2, CheckCircle2, Clock, 
  Search, Reply, Eye, Sparkles, AlertCircle 
} from 'lucide-react';
import api from '../../api/client';
import Modal from '../../components/common/Modal';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import { useToast } from '../../components/common/Toast';

export default function MessageInbox() {
  const { addToast } = useToast();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // 'all', 'unread', 'read'
  const [search, setSearch] = useState('');
  
  const [activeMessage, setActiveMessage] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  const fetchMessages = async () => {
    try {
      const res = await api.get('/messages');
      if (res.data.success) {
        setMessages(res.data.data);
      }
    } catch (err) {
      addToast('Failed to load messages', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleOpenMessage = async (msg) => {
    setActiveMessage(msg);
    if (!msg.isRead) {
      try {
        await api.put(`/messages/${msg._id}/read-status`, { isRead: true });
        setMessages(prev => prev.map(m => m._id === msg._id ? { ...m, isRead: true } : m));
      } catch (err) {
        console.error('Failed to update read status');
      }
    }
  };

  const handleToggleRead = async (msg, e) => {
    e.stopPropagation();
    try {
      const res = await api.put(`/messages/${msg._id}/read-status`, { isRead: !msg.isRead });
      if (res.data.success) {
        setMessages(prev => prev.map(m => m._id === msg._id ? { ...m, isRead: !m.isRead } : m));
        addToast(res.data.message, 'info');
      }
    } catch (err) {
      addToast('Failed to change read status', 'error');
    }
  };

  const handleDelete = async () => {
    if (!confirmDeleteId) return;
    try {
      await api.delete(`/messages/${confirmDeleteId}`);
      addToast('Message deleted', 'success');
      setMessages(prev => prev.filter(m => m._id !== confirmDeleteId));
      if (activeMessage?._id === confirmDeleteId) {
        setActiveMessage(null);
      }
    } catch (err) {
      addToast('Failed to delete message', 'error');
    } finally {
      setConfirmDeleteId(null);
    }
  };

  const filtered = messages.filter(m => {
    const matchFilter = 
      filter === 'all' || 
      (filter === 'unread' && !m.isRead) || 
      (filter === 'read' && m.isRead);

    const matchSearch = 
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.email.toLowerCase().includes(search.toLowerCase()) ||
      m.subject.toLowerCase().includes(search.toLowerCase()) ||
      m.message.toLowerCase().includes(search.toLowerCase());

    return matchFilter && matchSearch;
  });

  const unreadCount = messages.filter(m => !m.isRead).length;

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <span>Contact Messages Inbox</span>
            {unreadCount > 0 && (
              <span className="px-2.5 py-0.5 rounded-full bg-rose-500 text-white text-xs font-mono font-bold">
                {unreadCount} new
              </span>
            )}
          </h1>
          <p className="text-xs text-slate-400">
            Incoming inquiries and collaboration requests submitted via the public contact form.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="glass p-4 rounded-2xl border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
              filter === 'all' ? 'bg-brand-600 text-white' : 'bg-dark-900 text-slate-400 hover:text-white'
            }`}
          >
            All ({messages.length})
          </button>
          <button
            onClick={() => setFilter('unread')}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
              filter === 'unread' ? 'bg-brand-600 text-white' : 'bg-dark-900 text-slate-400 hover:text-white'
            }`}
          >
            Unread ({unreadCount})
          </button>
          <button
            onClick={() => setFilter('read')}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
              filter === 'read' ? 'bg-brand-600 text-white' : 'bg-dark-900 text-slate-400 hover:text-white'
            }`}
          >
            Read ({messages.length - unreadCount})
          </button>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search sender, subject or text..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-dark-900 border border-white/10 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-brand-500"
          />
        </div>
      </div>

      {/* Messages List Table */}
      <div className="glass rounded-2xl border border-white/10 overflow-hidden">
        <div className="divide-y divide-white/5">
          {filtered.map((msg) => (
            <div
              key={msg._id}
              onClick={() => handleOpenMessage(msg)}
              className={`p-4 sm:p-5 flex items-center justify-between gap-4 cursor-pointer hover:bg-white/[0.03] transition-colors ${
                !msg.isRead ? 'bg-brand-500/[0.03]' : ''
              }`}
            >
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="shrink-0">
                  <span className={`w-2.5 h-2.5 rounded-full inline-block ${
                    !msg.isRead ? 'bg-brand-400 ring-4 ring-brand-400/20' : 'bg-slate-700'
                  }`} />
                </div>

                <div className="overflow-hidden">
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-semibold ${!msg.isRead ? 'text-white' : 'text-slate-300'}`}>
                      {msg.name}
                    </span>
                    <span className="text-[11px] text-slate-500 font-mono hidden sm:inline">
                      &lt;{msg.email}&gt;
                    </span>
                  </div>

                  <p className={`text-xs truncate max-w-xl ${!msg.isRead ? 'text-slate-200 font-medium' : 'text-slate-400'}`}>
                    <span className="text-slate-300 font-semibold">{msg.subject}</span> — {msg.message}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <span className="text-[10px] font-mono text-slate-500 hidden sm:inline">
                  {new Date(msg.createdAt).toLocaleDateString()}
                </span>

                <button
                  type="button"
                  onClick={(e) => handleToggleRead(msg, e)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-brand-300 hover:bg-white/5"
                  title={msg.isRead ? 'Mark as Unread' : 'Mark as Read'}
                >
                  <Mail className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setConfirmDeleteId(msg._id);
                  }}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-white/5"
                  title="Delete Message"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="text-center py-12 text-slate-500">
              No messages found.
            </div>
          )}
        </div>
      </div>

      {/* View Message Modal */}
      {activeMessage && (
        <Modal
          isOpen={!!activeMessage}
          onClose={() => setActiveMessage(null)}
          title={activeMessage.subject}
          maxWidth="max-w-2xl"
        >
          <div className="space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-white/10">
              <div>
                <p className="text-sm font-bold text-white">{activeMessage.name}</p>
                <a
                  href={`mailto:${activeMessage.email}`}
                  className="text-xs font-mono text-brand-400 hover:underline"
                >
                  {activeMessage.email}
                </a>
              </div>
              <span className="text-xs font-mono text-slate-400">
                {new Date(activeMessage.createdAt).toLocaleString()}
              </span>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-mono uppercase text-slate-400">Message Content</h4>
              <div className="p-4 rounded-xl bg-dark-950 border border-white/5 text-slate-200 text-xs sm:text-sm leading-relaxed whitespace-pre-line">
                {activeMessage.message}
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <button
                type="button"
                onClick={() => setConfirmDeleteId(activeMessage._id)}
                className="px-3 py-1.5 rounded-xl text-xs text-rose-400 hover:bg-rose-500/10 flex items-center gap-1.5"
              >
                <Trash2 className="w-4 h-4" />
                <span>Delete</span>
              </button>

              <div className="flex items-center gap-2">
                <a
                  href={`mailto:${activeMessage.email}?subject=Re: ${encodeURIComponent(activeMessage.subject)}`}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-brand-600 hover:bg-brand-500 text-white flex items-center gap-2 shadow-glow-sm"
                >
                  <Reply className="w-4 h-4" />
                  <span>Reply via Email</span>
                </a>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={!!confirmDeleteId}
        onClose={() => setConfirmDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Message"
        message="Are you sure you want to permanently delete this message inquiry?"
        confirmText="Delete Message"
      />

    </div>
  );
}
