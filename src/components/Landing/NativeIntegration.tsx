import { Mic, Sparkles, Code2, ArrowRight } from 'lucide-react';
import { useFadeIn } from '../../hooks/useFadeIn';

const STEPS = [
  {
    icon: Mic,
    label: 'Voice Window Detects Intent',
    detail: '"OK this is a prompt for Claude — I need a React dashboard with..."',
    accent: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  },
  {
    icon: Sparkles,
    label: 'Auto-Structures in Background',
    detail: 'Identifies task type, extracts constraints, maps to Claude\'s XML format — all behind the scenes.',
    accent: 'bg-primary/10 text-primary border-primary/20',
  },
  {
    icon: Code2,
    label: 'Optimized Prompt Ready to Send',
    detail: 'User speaks naturally. The structured prompt lands in their IDE, ChatGPT, or API — no extra steps.',
    accent: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  },
];

export function NativeIntegration() {
  const { ref, isVisible } = useFadeIn();

  return (
    <section className="py-24 px-4">
      <div ref={ref} className={`max-w-4xl mx-auto fade-in-up ${isVisible ? 'visible' : ''}`}>
        <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-3 text-center">
          The vision
        </p>
        <h2 className="text-3xl sm:text-4xl font-bold text-text mb-3 tracking-tight leading-[1.1] text-center">
          Native to Wispr Flow
        </h2>
        <p className="text-text-secondary max-w-xl mx-auto text-base text-center mb-14">
          No separate app. No extra tab. Prompt optimization lives inside the voice window
          you already use — triggered by what you say.
        </p>

        {/* Flow diagram */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-0 items-start">
          {STEPS.map((step, i) => (
            <div key={i} className="flex flex-col items-center relative">
              {/* Arrow between steps (desktop only) */}
              {i < STEPS.length - 1 && (
                <div className="hidden md:flex absolute right-0 top-10 translate-x-1/2 z-10 text-text-secondary/30">
                  <ArrowRight size={20} />
                </div>
              )}

              <div className={`w-16 h-16 rounded-2xl border flex items-center justify-center mb-4 ${step.accent}`}>
                <step.icon size={24} />
              </div>
              <h3 className="text-sm font-semibold text-text mb-2 text-center">
                {step.label}
              </h3>
              <p className="text-xs text-text-secondary text-center max-w-[220px] leading-relaxed">
                {step.detail}
              </p>
            </div>
          ))}
        </div>

        {/* Model detection callout */}
        <div className="mt-14 rounded-2xl bg-surface border border-border p-6 md:p-8">
          <h3 className="text-sm font-semibold text-text mb-4">Model-Aware Formatting</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex items-start gap-3 rounded-xl bg-border/30 p-4">
              <div className="text-xs font-mono text-primary mt-0.5 shrink-0">"...prompt for Claude"</div>
              <ArrowRight size={14} className="text-text-secondary mt-0.5 shrink-0" />
              <div className="text-xs text-text-secondary">XML tags, imperative voice, structured sections</div>
            </div>
            <div className="flex items-start gap-3 rounded-xl bg-border/30 p-4">
              <div className="text-xs font-mono text-primary mt-0.5 shrink-0">"...prompt for GPT"</div>
              <ArrowRight size={14} className="text-text-secondary mt-0.5 shrink-0" />
              <div className="text-xs text-text-secondary">System/User split, markdown headers, role-setting</div>
            </div>
            <div className="flex items-start gap-3 rounded-xl bg-border/30 p-4">
              <div className="text-xs font-mono text-primary mt-0.5 shrink-0">"...prompt for Gemini"</div>
              <ArrowRight size={14} className="text-text-secondary mt-0.5 shrink-0" />
              <div className="text-xs text-text-secondary">Conversational structure, collaborative framing</div>
            </div>
            <div className="flex items-start gap-3 rounded-xl bg-border/30 p-4">
              <div className="text-xs font-mono text-primary mt-0.5 shrink-0">"...send to o1"</div>
              <ArrowRight size={14} className="text-text-secondary mt-0.5 shrink-0" />
              <div className="text-xs text-text-secondary">Ultra-concise, goal-focused, no step-by-step</div>
            </div>
          </div>
          <p className="text-xs text-text-secondary mt-5 leading-relaxed">
            The voice window already knows <em>where</em> you're typing. Prompt optimization adds knowledge of <em>which model</em> you're talking to — formatting your thoughts into the structure each LLM responds to best.
          </p>
        </div>
      </div>
    </section>
  );
}
