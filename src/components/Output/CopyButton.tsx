import { Copy, Check } from 'lucide-react';
import { useClipboard } from '../../hooks/useClipboard';

interface CopyButtonProps {
  text: string;
}

export function CopyButton({ text }: CopyButtonProps) {
  const { copied, copy } = useClipboard();

  return (
    <button
      onClick={() => copy(text)}
      className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
        copied
          ? 'bg-emerald-50 text-success border border-emerald-200'
          : 'bg-gray-100 text-text-secondary hover:bg-gray-200 hover:text-text'
      }`}
    >
      {copied ? <Check size={14} /> : <Copy size={14} />}
      {copied ? 'Copied!' : 'Copy'}
    </button>
  );
}
