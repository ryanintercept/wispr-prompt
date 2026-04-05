import type { AppMode } from '../../types';

interface ModeToggleProps {
  mode: AppMode;
  onChange: (mode: AppMode) => void;
}

export function ModeToggle({ mode, onChange }: ModeToggleProps) {
  return (
    <div className="inline-flex bg-border/50 rounded-lg p-0.5">
      <button
        onClick={() => onChange('quick')}
        className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${
          mode === 'quick'
            ? 'bg-surface text-text shadow-sm'
            : 'text-text-secondary hover:text-text'
        }`}
      >
        Quick
      </button>
      <button
        onClick={() => onChange('advanced')}
        className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${
          mode === 'advanced'
            ? 'bg-surface text-text shadow-sm'
            : 'text-text-secondary hover:text-text'
        }`}
      >
        Advanced
      </button>
    </div>
  );
}
