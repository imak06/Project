import React from 'react';
import Modal from './Modal';
import { AlertTriangle } from 'lucide-react';

export default function ConfirmDialog({ isOpen, onClose, onConfirm, title = 'Confirm Action', message = 'Are you sure you want to proceed?', confirmText = 'Delete', isDestructive = true }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} maxWidth="max-w-md">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
            isDestructive ? 'bg-rose-500/10 text-rose-400' : 'bg-brand-500/10 text-brand-400'
          }`}>
            <AlertTriangle className="w-5 h-5" />
          </div>
          <p className="text-sm text-slate-300 light:text-slate-600">
            {message}
          </p>
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10 light:border-black/5">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-medium text-slate-300 light:text-slate-700 hover:bg-white/5 light:hover:bg-slate-100 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={`px-4 py-2 rounded-xl text-xs font-semibold text-white transition-all shadow-sm ${
              isDestructive
                ? 'bg-rose-600 hover:bg-rose-500 shadow-rose-600/30'
                : 'bg-brand-600 hover:bg-brand-500 shadow-brand-600/30'
            }`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </Modal>
  );
}
