import { useEffect } from 'react';
import { CheckCircle, XCircle, X } from 'lucide-react';

interface ToastProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
  duration?: number;
}

export function Toast({ message, type, onClose, duration = 3000 }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-[fadeIn_0.2s_ease-out]">
      <div className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg border ${
        type === 'success'
          ? 'bg-white border-emerald-200 text-emerald-700'
          : 'bg-white border-red-200 text-red-700'
      }`}>
        {type === 'success' ? <CheckCircle size={18} /> : <XCircle size={18} />}
        <span className="text-sm font-medium">{message}</span>
        <button onClick={onClose} className="ml-2 opacity-50 hover:opacity-100 transition-opacity">
          <X size={14} />
        </button>
      </div>
    </div>
  );
}
