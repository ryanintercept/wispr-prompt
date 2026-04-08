import { ArrowRight, Mic, FileCode } from 'lucide-react';

const messy = `okay so i need to build like a dashboard thing for users to track their workouts, it should show like the past week and let them add new ones, oh and it needs to work on mobile too, using react`;

const structured = `<context>
Building a workout tracking dashboard for end users.
</context>

<objective>
Create a responsive React dashboard that displays
the past week of workouts and allows adding new entries.
</objective>

<tech_stack>
React, mobile-responsive
</tech_stack>

<constraints>
- Must work on mobile devices
- Display past 7 days of workout data
- Support creating new workout entries
</constraints>`;

export function BeforeAfterDemo() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 md:gap-3 items-stretch max-w-5xl mx-auto mt-12">
      {/* Before */}
      <div className="rounded-2xl border border-border bg-surface overflow-hidden shadow-sm">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-border">
          <div className="w-7 h-7 rounded-lg bg-error/10 flex items-center justify-center">
            <Mic size={14} className="text-error" />
          </div>
          <span className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
            Raw voice input
          </span>
        </div>
        <div className="p-5 text-left">
          <p className="text-sm text-text leading-relaxed font-sans italic">
            "{messy}"
          </p>
        </div>
      </div>

      {/* Arrow */}
      <div className="flex items-center justify-center md:px-2">
        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shadow-lg shadow-primary/30">
          <ArrowRight size={18} className="text-white md:rotate-0 rotate-90" />
        </div>
      </div>

      {/* After */}
      <div className="rounded-2xl border border-primary/30 bg-surface overflow-hidden shadow-lg shadow-primary/10">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-primary/5">
          <div className="w-7 h-7 rounded-lg bg-primary/15 flex items-center justify-center">
            <FileCode size={14} className="text-primary" />
          </div>
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">
            Optimized prompt
          </span>
        </div>
        <div className="p-5 text-left">
          <pre className="text-xs text-text leading-relaxed font-mono whitespace-pre-wrap">
            {structured}
          </pre>
        </div>
      </div>
    </div>
  );
}
