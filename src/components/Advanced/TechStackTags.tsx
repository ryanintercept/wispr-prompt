import { useState } from 'react';
import { X, Plus } from 'lucide-react';

interface TechStackTagsProps {
  tags: string[];
  onChange: (tags: string[]) => void;
}

export function TechStackTags({ tags, onChange }: TechStackTagsProps) {
  const [inputValue, setInputValue] = useState('');

  const addTag = () => {
    const trimmed = inputValue.trim();
    if (trimmed && !tags.includes(trimmed)) {
      onChange([...tags, trimmed]);
      setInputValue('');
    }
  };

  const removeTag = (index: number) => {
    onChange(tags.filter((_, i) => i !== index));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-1.5">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="inline-flex items-center gap-1 px-2.5 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full"
          >
            {tag}
            <button
              onClick={() => removeTag(index)}
              className="hover:text-primary-hover transition-colors"
            >
              <X size={12} />
            </button>
          </span>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Add technology..."
          className="flex-1 px-3 py-1.5 text-xs bg-gray-50 border border-border rounded-lg outline-none focus:border-primary/50 transition-colors"
        />
        <button
          onClick={addTag}
          disabled={!inputValue.trim()}
          className="p-1.5 text-text-secondary hover:text-primary disabled:opacity-30 transition-colors"
        >
          <Plus size={14} />
        </button>
      </div>
    </div>
  );
}
