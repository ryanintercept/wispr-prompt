import { Sparkles } from 'lucide-react';
import { VoiceInput } from './VoiceInput';
import { TextInput } from './TextInput';
import { ModelSelector } from './ModelSelector';
import { TaskTypeSelector } from './TaskTypeSelector';
import type { TargetModel, TaskType } from '../../types';

interface InputPanelProps {
  rawInput: string;
  onInputChange: (value: string) => void;
  targetModel: TargetModel;
  onModelChange: (model: TargetModel) => void;
  taskType: TaskType | 'auto';
  onTaskTypeChange: (type: TaskType | 'auto') => void;
  detectedTaskType: TaskType | null;
  isRecording: boolean;
  isVoiceSupported: boolean;
  interimTranscript: string;
  onToggleRecording: () => void;
  onOptimize: () => void;
  isOptimizing: boolean;
}

export function InputPanel({
  rawInput,
  onInputChange,
  targetModel,
  onModelChange,
  taskType,
  onTaskTypeChange,
  detectedTaskType,
  isRecording,
  isVoiceSupported,
  interimTranscript,
  onToggleRecording,
  onOptimize,
  isOptimizing,
}: InputPanelProps) {
  const canOptimize = rawInput.trim().length > 0 && !isOptimizing;

  return (
    <div className="flex flex-col bg-surface rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.08)] border border-border overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <div className="flex items-center gap-3">
          <VoiceInput
            isRecording={isRecording}
            isSupported={isVoiceSupported}
            onToggle={onToggleRecording}
          />
          <span className="text-sm text-text-secondary">
            {isRecording ? 'Listening...' : 'Speak or type your prompt'}
          </span>
        </div>
        <ModelSelector value={targetModel} onChange={onModelChange} />
      </div>

      <TextInput
        value={rawInput}
        onChange={onInputChange}
        interimTranscript={interimTranscript}
        isRecording={isRecording}
        onSubmit={canOptimize ? onOptimize : undefined}
      />

      <div className="px-4 py-3 border-t border-border space-y-3">
        <TaskTypeSelector
          detected={detectedTaskType}
          selected={taskType}
          onChange={onTaskTypeChange}
        />

        <button
          onClick={onOptimize}
          disabled={!canOptimize}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-primary-hover disabled:opacity-40 disabled:cursor-not-allowed transition-all"
        >
          <Sparkles size={16} />
          {isOptimizing ? 'Optimizing...' : 'Optimize'}
          {!isOptimizing && (
            <kbd className="ml-1 text-xs opacity-60 font-mono hidden sm:inline">
              {navigator.platform?.includes('Mac') ? '⌘' : 'Ctrl'}+↵
            </kbd>
          )}
        </button>
      </div>
    </div>
  );
}
