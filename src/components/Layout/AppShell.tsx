import { AudioWaveform } from 'lucide-react';
import { ModeToggle } from '../shared/ModeToggle';
import { useScrollProgress } from '../../hooks/useScrollProgress';
import type { AppMode } from '../../types';

interface AppShellProps {
  mode: AppMode;
  onModeChange: (mode: AppMode) => void;
  children: React.ReactNode;
}

export function AppShell({ mode, onModeChange, children }: AppShellProps) {
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
            </div>
            <div className="flex items-center gap-2">
              <ModeToggle mode={mode} onChange={onModeChange} />
            </div>
          </div>
        </div>
      </header>

      {children}

      <footer className="border-t border-border py-6 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center gap-3">
          <p className="text-xs text-text-secondary">Built by Ryan as a feature concept for</p>
          <a
            href="https://wisprflow.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="opacity-60 hover:opacity-100 transition-opacity"
          >
            <img
              src="https://cdn.prod.website-files.com/682f84b3838c89f8ff7667db/683215c6f233131a07d8bafc_navbar_logo.svg"
              alt="Flow"
              className="h-5 invert"
            />
          </a>
        </div>
      </footer>
    </div>
  );
}
