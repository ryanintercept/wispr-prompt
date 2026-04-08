import { ArrowDown } from 'lucide-react';
import { AnimatedWaveform } from './AnimatedWaveform';

export function LandingHero() {
  const scrollToDashboard = () => {
    document.getElementById('dashboard')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-[90vh] flex flex-col items-center justify-center text-center px-4 relative overflow-hidden">
      {/* Gradient orbs for depth */}
      <div className="gradient-orb bg-primary/30 w-[500px] h-[500px] -top-20 -left-32 animate-float" />
      <div className="gradient-orb bg-primary/20 w-[400px] h-[400px] top-1/2 -right-20 animate-float" style={{ animationDelay: '2s' }} />

      <div className="relative z-10">
        <div className="reveal-up reveal-delay-1 mb-8 inline-block">
          <AnimatedWaveform bars={9} className="w-32" />
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-text tracking-tight leading-[1.05] max-w-4xl">
          <span className="reveal-up reveal-delay-2 inline-block">Stop rambling.</span>
          <br />
          <span className="reveal-up reveal-delay-3 inline-block text-primary">Start engineering.</span>
        </h1>

        <p className="reveal-up reveal-delay-4 mt-8 text-lg sm:text-xl text-text-secondary max-w-xl mx-auto leading-relaxed">
          Voice is the future of developer input. Turn messy spoken prompts into structured, model-optimized instructions.
        </p>

        <div className="reveal-up reveal-delay-4 mt-10" style={{ animationDelay: '0.7s' }}>
          <button
            onClick={scrollToDashboard}
            className="btn-shine inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-semibold rounded-xl hover:bg-primary-hover transition-all text-base shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5"
          >
            Try it now
            <ArrowDown size={18} />
          </button>
        </div>
      </div>

      <div className="absolute bottom-8 animate-pulse-ring z-10">
        <ArrowDown size={20} className="text-text-secondary/40" />
      </div>
    </section>
  );
}
