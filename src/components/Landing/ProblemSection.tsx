import { Mic, Brain, Target } from 'lucide-react';

const problems = [
  {
    icon: Mic,
    title: 'Voice is fast',
    description: 'You can speak 3x faster than you type. Voice-first tools like Wispr Flow prove it.',
  },
  {
    icon: Brain,
    title: 'But LLMs need structure',
    description: 'Models perform dramatically better with clear context, constraints, and formatting.',
  },
  {
    icon: Target,
    title: 'Bridge the gap',
    description: 'Wispr Prompt turns your natural speech into prompts that actually get results.',
  },
];

export function ProblemSection() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">The problem</p>
        <h2 className="text-2xl sm:text-3xl font-bold text-text mb-4">
          Voice is the fastest way to think.
          <br />
          <span className="text-text-secondary font-medium">But LLMs need structure.</span>
        </h2>
        <p className="text-text-secondary max-w-lg mx-auto mb-14">
          There's a gap between how developers naturally communicate and what AI models need to perform well.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {problems.map(({ icon: Icon, title, description }) => (
            <div key={title} className="flex flex-col items-center text-center gap-3 p-6 rounded-2xl bg-surface border border-border">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Icon size={22} className="text-primary" />
              </div>
              <p className="text-sm font-semibold text-text">{title}</p>
              <p className="text-xs text-text-secondary leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
