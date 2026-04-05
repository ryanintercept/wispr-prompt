import { RefreshCw, FileText } from 'lucide-react';
import { CopyButton } from './CopyButton';
import { PromptDisplay } from './PromptDisplay';
import { LoadingState } from '../shared/LoadingState';
import type { TargetModel } from '../../types';

interface OutputPanelProps {
  prompt: string;
  isOptimizing: boolean;
  targetModel: TargetModel;
  onRegenerate: () => void;
}

export function OutputPanel({ prompt, isOptimizing, targetModel, onRegenerate }: OutputPanelProps) {
  const hasPrompt = prompt.length > 0;

  return (
    <div className="flex flex-col bg-surface rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.08)] border border-border overflow-hidden lg:min-h-[480px]">
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <div className="flex items-center gap-2">
          <FileText size={16} className="text-text-secondary" />
          <span className="text-sm font-medium text-text">
            Optimized for {targetModel === 'claude' ? 'Claude' : 'GPT'}
          </span>
        </div>
        {hasPrompt && !isOptimizing && (
          <div className="flex items-center gap-2">
            <button
              onClick={onRegenerate}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-border/50 text-text-secondary hover:bg-border hover:text-text transition-all"
            >
              <RefreshCw size={14} />
              Regen
            </button>
            <CopyButton text={prompt} />
          </div>
        )}
      </div>

      {isOptimizing ? (
        <LoadingState />
      ) : hasPrompt ? (
        <PromptDisplay prompt={prompt} />
      ) : (
        <div className="flex-1 flex items-center justify-center p-8 min-h-[200px]">
          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-border/30 flex items-center justify-center mx-auto mb-3">
              <FileText size={20} className="text-text-secondary/50" />
            </div>
            <p className="text-sm text-text-secondary">
              Your optimized prompt will appear here
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
