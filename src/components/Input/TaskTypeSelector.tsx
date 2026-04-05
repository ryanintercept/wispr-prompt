import type { TaskType } from '../../types';
import { TASK_TYPE_LABELS } from '../../types';

interface TaskTypeSelectorProps {
  detected: TaskType | null;
  selected: TaskType | 'auto';
  onChange: (type: TaskType | 'auto') => void;
}

const ALL_TYPES: TaskType[] = ['build', 'debug', 'refactor', 'explain', 'architect', 'review', 'test', 'document'];

export function TaskTypeSelector({ detected, selected, onChange }: TaskTypeSelectorProps) {
  return (
    <div className="flex flex-wrap gap-1.5">
      <button
        onClick={() => onChange('auto')}
        className={`px-2.5 py-1 text-xs font-medium rounded-full transition-all ${
          selected === 'auto'
            ? 'bg-primary text-white'
            : 'bg-border/50 text-text-secondary hover:bg-border'
        }`}
      >
        Auto{detected ? ` (${TASK_TYPE_LABELS[detected]})` : ''}
      </button>
      {ALL_TYPES.map((type) => (
        <button
          key={type}
          onClick={() => onChange(type)}
          className={`px-2.5 py-1 text-xs font-medium rounded-full transition-all ${
            selected === type
              ? 'bg-primary text-white'
              : 'bg-border/50 text-text-secondary hover:bg-border'
          }`}
        >
          {TASK_TYPE_LABELS[type]}
        </button>
      ))}
    </div>
  );
}
