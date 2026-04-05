import { AudioWaveform, ArrowDown } from 'lucide-react';

export function LandingHero() {
  const scrollToDashboard = () => {
    document.getElementById('dashboard')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-[90vh] flex flex-col items-center justify-center text-center px-4 relative">
      <div className="animate-fade-in">
        <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center mx-auto mb-8">
          <AudioWaveform size={32} className="text-white" />
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-text tracking-tight leading-tight max-w-3xl">
          Stop rambling.
          <br />
          <span className="text-primary">Start engineering.</span>
        </h1>

        <p className="mt-6 text-lg sm:text-xl text-text-secondary max-w-xl mx-auto leading-relaxed">
          Voice is the future of developer input. Turn messy spoken prompts into structured, model-optimized instructions.
        </p>

        <button
          onClick={scrollToDashboard}
          className="mt-10 inline-flex items-center gap-2 px-8 py-3.5 bg-primary text-white font-semibold rounded-xl hover:bg-primary-hover transition-colors text-base"
        >
          Try it now
          <ArrowDown size={18} />
        </button>
      </div>

      <div className="absolute bottom-8 animate-pulse-ring">
        <ArrowDown size={20} className="text-text-secondary/40" />
      </div>
    </section>
  );
}
