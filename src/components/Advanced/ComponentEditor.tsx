import { ArrowRight } from 'lucide-react';
import { ComponentCard } from './ComponentCard';
import { TechStackTags } from './TechStackTags';
import { TaskTypeSelector } from '../Input/TaskTypeSelector';
import type { ExtractedComponents, TaskType } from '../../types';

interface ComponentEditorProps {
  components: ExtractedComponents;
  onChange: (components: ExtractedComponents) => void;
  onReoptimize: () => void;
  isOptimizing: boolean;
}

function EditableField({ value, onChange, multiline = false }: { value: string; onChange: (v: string) => void; multiline?: boolean }) {
  if (multiline) {
    return (
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={3}
        className="w-full text-xs text-text bg-bg border border-border rounded-lg px-3 py-2 outline-none focus:border-primary/50 resize-none transition-colors leading-relaxed"
      />
    );
  }
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full text-xs text-text bg-bg border border-border rounded-lg px-3 py-2 outline-none focus:border-primary/50 transition-colors"
    />
  );
}

function EditableList({ items, onChange }: { items: string[]; onChange: (items: string[]) => void }) {
  const updateItem = (index: number, value: string) => {
    const updated = [...items];
    updated[index] = value;
    onChange(updated);
  };

  const removeItem = (index: number) => {
    onChange(items.filter((_, i) => i !== index));
  };

  const addItem = () => {
    onChange([...items, '']);
  };

  return (
    <div className="space-y-1.5">
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-1.5">
          <input
            type="text"
            value={item}
            onChange={(e) => updateItem(index, e.target.value)}
            className="flex-1 text-xs text-text bg-bg border border-border rounded-lg px-3 py-1.5 outline-none focus:border-primary/50 transition-colors"
          />
          <button
            onClick={() => removeItem(index)}
            className="text-xs text-text-secondary hover:text-error transition-colors px-1"
          >
            x
          </button>
        </div>
      ))}
      <button
        onClick={addItem}
        className="text-xs text-primary hover:text-primary-hover font-medium transition-colors"
      >
        + Add item
      </button>
    </div>
  );
}

export function ComponentEditor({ components, onChange, onReoptimize, isOptimizing }: ComponentEditorProps) {
  const update = (field: keyof ExtractedComponents, value: unknown) => {
    onChange({ ...components, [field]: value });
  };

  return (
    <div className="flex flex-col bg-surface rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.08)] border border-border overflow-hidden">
      <div className="px-4 py-3 border-b border-border">
        <span className="text-sm font-medium text-text">Extracted Components</span>
      </div>

      <div className="flex-1 overflow-auto p-3 space-y-2">
        <ComponentCard icon="🏷" label="Task Type">
          <TaskTypeSelector
            detected={null}
            selected={components.task_type}
            onChange={(type) => {
              if (type !== 'auto') update('task_type', type as TaskType);
            }}
          />
        </ComponentCard>

        <ComponentCard icon="📝" label="Context">
          <EditableField
            value={components.context || ''}
            onChange={(v) => update('context', v || null)}
            multiline
          />
        </ComponentCard>

        <ComponentCard icon="🎯" label="Objective">
          <EditableField
            value={components.objective}
            onChange={(v) => update('objective', v)}
            multiline
          />
        </ComponentCard>

        <ComponentCard icon="🔧" label="Tech Stack">
          <TechStackTags
            tags={components.tech_stack}
            onChange={(tags) => update('tech_stack', tags)}
          />
        </ComponentCard>

        <ComponentCard icon="⚠️" label="Constraints">
          <EditableList
            items={components.constraints}
            onChange={(items) => update('constraints', items)}
          />
        </ComponentCard>

        {components.expected_output !== null && (
          <ComponentCard icon="📦" label="Expected Output" defaultOpen={false}>
            <EditableField
              value={components.expected_output || ''}
              onChange={(v) => update('expected_output', v || null)}
              multiline
            />
          </ComponentCard>
        )}

        {components.edge_cases !== null && (
          <ComponentCard icon="🔍" label="Edge Cases" defaultOpen={false}>
            <EditableField
              value={components.edge_cases || ''}
              onChange={(v) => update('edge_cases', v || null)}
              multiline
            />
          </ComponentCard>
        )}

        {components.ambiguities.length > 0 && (
          <ComponentCard icon="❓" label="Ambiguities" defaultOpen={false}>
            <EditableList
              items={components.ambiguities}
              onChange={(items) => update('ambiguities', items)}
            />
          </ComponentCard>
        )}
      </div>

      <div className="px-3 py-3 border-t border-border">
        <button
          onClick={onReoptimize}
          disabled={isOptimizing}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-primary-hover disabled:opacity-40 disabled:cursor-not-allowed transition-all"
        >
          Re-optimize
          <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
}
