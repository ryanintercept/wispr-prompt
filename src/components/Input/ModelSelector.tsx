import type { TargetModel } from '../../types';
import { MODEL_LABELS } from '../../types';

interface ModelSelectorProps {
  value: TargetModel;
  onChange: (model: TargetModel) => void;
}

const MODELS: TargetModel[] = ['claude', 'gpt', 'gemini', 'llama', 'reasoning'];

export function ModelSelector({ value, onChange }: ModelSelectorProps) {
  return (
    <div className="inline-flex flex-wrap gap-1 bg-border/50 rounded-lg p-0.5">
      {MODELS.map((model) => (
        <button
          key={model}
          onClick={() => onChange(model)}
          className={`px-2.5 py-1.5 text-xs font-medium rounded-md transition-all ${
            value === model
              ? 'bg-surface text-primary shadow-sm'
              : 'text-text-secondary hover:text-text'
          }`}
        >
          {MODEL_LABELS[model]}
        </button>
      ))}
    </div>
  );
}
