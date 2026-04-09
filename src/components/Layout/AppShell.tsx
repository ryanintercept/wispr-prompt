import { AudioWaveform } from 'lucide-react';
import { ModeToggle } from '../shared/ModeToggle';
import { useScrollProgress } from '../../hooks/useScrollProgress';
import type { AppMode } from '../../types';

interface AppShellProps {
  mode: AppMode;
  onModeChange: (mode: AppMode) => void;
  isDemoMode: boolean;
  onToggleDemoMode: () => void;
  children: React.ReactNode;
}

export function AppShell({ mode, onModeChange, isDemoMode, onToggleDemoMode, children }: AppShellProps) {
  const progress = useScrollProgress();

  return (
    <div className="min-h-screen bg-bg">
      {/* Scroll progress bar */}
      <div
        className="fixed top-0 left-0 h-[2px] bg-primary z-50 transition-none"
        style={{ width: `${progress}%` }}
      />
      <header className="sticky top-0 z-40 bg-bg/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <AudioWaveform size={18} className="text-white" />
              </div>
              <h1 className="text-lg font-bold text-text tracking-tight">
                Wispr Prompt
              </h1>
              {isDemoMode && (
                <button
                  onClick={onToggleDemoMode}
                  className="px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 hover:bg-amber-500/30 transition-colors"
                  title="Click to toggle demo mode"
                >
                  Demo
                </button>
              )}
            </div>
            <div className="flex items-center gap-2">
              <ModeToggle mode={mode} onChange={onModeChange} />
            </div>
          </div>
        </div>
      </header>

      {children}

      <footer className="border-t border-border py-4 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs text-text-secondary text-center">
            Built by Ryan for{' '}
            <a
              href="https://wisprflow.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary-hover transition-colors font-medium"
            >
              Wispr Flow
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
