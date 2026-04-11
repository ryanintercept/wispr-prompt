import { useFadeIn } from '../../hooks/useFadeIn';

const MODELS = [
  { label: 'Claude', color: 'text-orange-400', dot: 'bg-orange-400' },
  { label: 'GPT-4o', color: 'text-emerald-400', dot: 'bg-emerald-400' },
  { label: 'Gemini', color: 'text-blue-400', dot: 'bg-blue-400' },
  { label: 'Llama', color: 'text-purple-400', dot: 'bg-purple-400' },
  { label: 'o1 / o3', color: 'text-slate-300', dot: 'bg-slate-300' },
];

export function ModelStrip() {
  const { ref, isVisible } = useFadeIn();

  return (
    <div ref={ref} className={`fade-in-up ${isVisible ? 'visible' : ''} py-6 px-4`}>
      <div className="max-w-2xl mx-auto flex flex-col items-center gap-3">
        <p className="text-[11px] uppercase tracking-widest text-text-secondary/50 font-medium">
          Optimized for every model
        </p>
        <div className="flex items-center gap-2 flex-wrap justify-center">
          {MODELS.map((m, i) => (
            <div
              key={m.label}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border bg-surface/50 animate-fade-in"
              style={{ animationDelay: `${i * 80}ms`, animationFillMode: 'both' }}
            >
              <div className={`w-1.5 h-1.5 rounded-full ${m.dot}`} />
              <span className={`text-xs font-medium ${m.color}`}>{m.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
