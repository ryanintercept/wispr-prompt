import { AudioWaveform } from 'lucide-react';
import { useFadeIn } from '../../hooks/useFadeIn';

export function WisprCallout() {
  const { ref, isVisible } = useFadeIn();

  return (
    <section className="py-16 px-4">
      <div ref={ref} className={`max-w-2xl mx-auto fade-in-up ${isVisible ? 'visible' : ''}`}>
        <div className="rounded-2xl bg-primary/5 border border-primary/20 p-8 text-center">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center mx-auto mb-4">
            <AudioWaveform size={20} className="text-white" />
          </div>
          <h3 className="text-lg font-bold text-text mb-2">Why this matters for Wispr</h3>
          <p className="text-sm text-text-secondary leading-relaxed max-w-lg mx-auto">
            Wispr Flow already lets developers speak instead of type. Wispr Prompt is the
            natural next step — making that voice input <em>useful</em> for AI workflows.
            Together, they complete the Voice OS vision: speak naturally, get structured results.
          </p>
          <a
            href="https://wisprflow.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 mt-5 text-sm font-semibold text-primary hover:text-primary-hover transition-colors"
          >
            Learn more about Wispr Flow &rarr;
          </a>
        </div>
      </div>
    </section>
  );
}
