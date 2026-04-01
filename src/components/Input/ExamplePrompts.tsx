import { EXAMPLES } from '../../data/examples';
import { TASK_TYPE_LABELS } from '../../types';

interface ExamplePromptsProps {
  onSelect: (id: string, rawInput: string) => void;
}

export function ExamplePrompts({ onSelect }: ExamplePromptsProps) {
  return (
    <div className="px-4 pb-3">
      <p className="text-xs text-text-secondary mb-2 font-medium">Try an example:</p>
      <div className="grid grid-cols-2 gap-2">
        {EXAMPLES.map((example) => (
          <button
            key={example.id}
            onClick={() => onSelect(example.id, example.rawInput)}
            className="flex items-start gap-2.5 p-3 text-left bg-gray-50 border border-border rounded-xl hover:bg-gray-100 hover:border-gray-300 transition-all group"
          >
            <span className="text-lg leading-none mt-0.5">{example.icon}</span>
            <div className="min-w-0">
              <span className="text-sm font-medium text-text group-hover:text-primary transition-colors">
                {example.label}
              </span>
              <span className="block text-[10px] text-text-secondary mt-0.5 uppercase tracking-wide font-medium">
                {TASK_TYPE_LABELS[example.category]}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
