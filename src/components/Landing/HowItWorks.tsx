import { useFadeIn } from '../../hooks/useFadeIn';

const steps = [
  {
    step: '01',
    icon: '\u{1F3A4}',
    title: 'Speak or type',
    description: 'Dump your raw, messy prompt \u2014 voice or keyboard. No need to structure it.',
  },
  {
    step: '02',
    icon: '\u2728',
    title: 'Optimize',
    description: 'AI extracts context, objective, and constraints, then formats for your target model.',
  },
  {
    step: '03',
    icon: '\u{1F4CB}',
    title: 'Copy & use',
    description: 'Paste the structured prompt directly into Claude or ChatGPT for better results.',
  },
];

export function HowItWorks() {
  const { ref, isVisible } = useFadeIn();

  return (
    <section className="py-20 px-4">
      <div ref={ref} className={`max-w-3xl mx-auto text-center fade-in-up ${isVisible ? 'visible' : ''}`}>
        <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">How it works</p>
        <h2 className="text-2xl sm:text-3xl font-bold text-text mb-12">
          Three steps to a better prompt
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {steps.map(({ step, icon, title, description }) => (
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
      </div>
    </section>
  );
}
