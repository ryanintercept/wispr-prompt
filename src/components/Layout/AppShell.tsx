import { AudioWaveform } from 'lucide-react';
import { ModeToggle } from '../shared/ModeToggle';
import type { AppMode } from '../../types';

interface AppShellProps {
  mode: AppMode;
  onModeChange: (mode: AppMode) => void;
  isDemoMode: boolean;
  onToggleDemoMode: () => void;
  children: React.ReactNode;
}

export function AppShell({ mode, onModeChange, isDemoMode, onToggleDemoMode, children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-bg">
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
                  className="px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded-full bg-amber-100 text-amber-700 border border-amber-200 hover:bg-amber-200 transition-colors"
                  title="Click to toggle demo mode"
                >
                  Demo
                </button>
              )}
            </div>
            <ModeToggle mode={mode} onChange={onModeChange} />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {children}
      </main>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-border">
        <p className="text-xs font-semibold uppercase tracking-widest text-text-secondary text-center mb-8">How it works</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
          {[
            {
              step: '01',
              icon: '🎤',
              title: 'Speak or type',
              description: 'Dump your raw, messy prompt — voice or keyboard. No need to structure it.',
            },
            {
              step: '02',
              icon: '✨',
              title: 'Optimize',
              description: 'AI extracts context, objective, and constraints, then formats for your target model.',
            },
            {
              step: '03',
              icon: '📋',
              title: 'Copy & use',
              description: 'Paste the structured prompt directly into Claude or ChatGPT for better results.',
            },
          ].map(({ step, icon, title, description }) => (
            <div key={step} className="flex flex-col items-center text-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-surface border border-border flex items-center justify-center text-2xl">
                {icon}
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-primary mb-1">{step}</p>
                <p className="text-sm font-semibold text-text mb-1">{title}</p>
                <p className="text-xs text-text-secondary leading-relaxed">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

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
