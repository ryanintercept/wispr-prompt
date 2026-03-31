import type { TargetModel } from '../../types';

interface ModelSelectorProps {
  value: TargetModel;
  onChange: (model: TargetModel) => void;
}

export function ModelSelector({ value, onChange }: ModelSelectorProps) {
  return (
    <div className="inline-flex bg-gray-100 rounded-lg p-0.5">
      <button
        onClick={() => onChange('claude')}
        className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
          value === 'claude'
            ? 'bg-white text-primary shadow-sm'
            : 'text-text-secondary hover:text-text'
        }`}
      >
        Claude
      </button>
      <button
        onClick={() => onChange('gpt')}
        className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
          value === 'gpt'
            ? 'bg-white text-primary shadow-sm'
            : 'text-text-secondary hover:text-text'
        }`}
      >
        GPT
      </button>
    </div>
  );
}
