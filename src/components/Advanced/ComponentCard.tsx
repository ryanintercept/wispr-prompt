import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface ComponentCardProps {
  icon: string;
  label: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export function ComponentCard({ icon, label, children, defaultOpen = true }: ComponentCardProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border border-border rounded-xl overflow-hidden bg-surface">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-3 py-2.5 text-left hover:bg-bg transition-colors"
      >
        <div className="flex items-center gap-2">
          <span className="text-sm">{icon}</span>
          <span className="text-xs font-semibold text-text uppercase tracking-wide">{label}</span>
        </div>
        {isOpen ? <ChevronUp size={14} className="text-text-secondary" /> : <ChevronDown size={14} className="text-text-secondary" />}
      </button>
      {isOpen && (
        <div className="px-3 pb-3 border-t border-border">
          <div className="pt-2">
            {children}
          </div>
        </div>
      )}
    </div>
  );
}
