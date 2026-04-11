import { useFadeIn } from '../../hooks/useFadeIn';

const PHASES = [
  {
    tag: 'Now',
    tagColor: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/25',
    dotColor: 'bg-emerald-400',
    title: 'Universal LLM Prompting',
    description: 'Voice input optimized for every major model. Claude\'s XML structure, GPT\'s system/user split, Gemini\'s collaborative framing, o1\'s concise goal format — automatically.',
    items: ['Claude', 'GPT-4o', 'Gemini', 'Llama', 'o1 / o3'],
  },
  {
    tag: 'Next',
    tagColor: 'bg-primary/15 text-primary border-primary/25',
    dotColor: 'bg-primary',
    title: 'Domain-Specialized Prompts',
    description: 'Prompt optimization that understands the destination. Figma plugins and Midjourney have entirely different prompt grammars than LLMs — the tool should know that.',
    items: ['Figma / design prompts', 'Midjourney & DALL-E', 'Cursor & GitHub Copilot', 'Replit & v0'],
  },
  {
    tag: 'Vision',
    tagColor: 'bg-amber-500/15 text-amber-400 border-amber-500/25',
    dotColor: 'bg-amber-400',
    title: 'The Universal Prompt Layer',
    description: 'Flow already knows what app you\'re in and what you\'re doing. Prompt optimization becomes a silent layer on top of every AI tool — no UI, just better output every time you speak.',
    items: ['Context-aware by app', 'Model detected from speech', 'Zero extra steps', 'Works everywhere Flow works'],
  },
];

export function WhatsNext() {
  const { ref, isVisible } = useFadeIn();

  return (
    <section className="py-24 px-4">
      <div ref={ref} className={`max-w-4xl mx-auto fade-in-up ${isVisible ? 'visible' : ''}`}>
        <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-3 text-center">
          Roadmap
        </p>
        <h2 className="text-3xl sm:text-4xl font-bold text-text mb-4 tracking-tight leading-[1.1] text-center">
          Just the beginning.
        </h2>
        <p className="text-text-secondary max-w-xl mx-auto text-base text-center mb-16">
          Multi-model prompting is the foundation. Here's where this goes.
        </p>

        <div className="relative">
          {/* Vertical timeline line */}
          <div className="absolute left-6 top-8 bottom-8 w-px bg-border hidden sm:block" />

          <div className="flex flex-col gap-8">
            {PHASES.map((phase, i) => (
              <div
                key={i}
                className="sm:pl-16 relative animate-fade-in"
                style={{ animationDelay: `${i * 120}ms`, animationFillMode: 'both' }}
              >
                {/* Timeline dot */}
                <div className={`hidden sm:flex absolute left-0 top-6 w-12 h-12 rounded-full border border-border bg-bg items-center justify-center`}>
                  <div className={`w-2.5 h-2.5 rounded-full ${phase.dotColor}`} />
                </div>

                <div className="rounded-2xl border border-border bg-surface p-6 hover:border-border/80 transition-colors">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${phase.tagColor} mb-2`}>
                        {phase.tag}
                      </span>
                      <h3 className="text-base font-bold text-text">{phase.title}</h3>
                    </div>
                  </div>

                  <p className="text-sm text-text-secondary leading-relaxed mb-4">
                    {phase.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {phase.items.map(item => (
                      <span
                        key={item}
                        className="px-2.5 py-1 text-xs font-medium rounded-lg bg-border/40 text-text-secondary border border-border/60"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Closing thought */}
        <div className="mt-12 rounded-2xl border border-primary/20 bg-primary/5 p-6 text-center">
          <p className="text-sm text-text-secondary leading-relaxed max-w-2xl mx-auto">
            The opportunity is a <span className="text-text font-medium">universal prompting layer</span> — one that sits inside Flow and knows not just <em>what you said</em>, but <em>where it's going</em> and <em>which model is listening</em>. That's what makes Flow indispensable for AI-native developers.
          </p>
        </div>
      </div>
    </section>
  );
}
