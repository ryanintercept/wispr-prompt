import { useFadeIn } from '../../hooks/useFadeIn';
import { BeforeAfterDemo } from './BeforeAfterDemo';

export function ProblemSection() {
  const { ref, isVisible } = useFadeIn();

  return (
    <section className="py-24 px-4">
      <div ref={ref} className={`max-w-5xl mx-auto text-center fade-in-up ${isVisible ? 'visible' : ''}`}>
        <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">The problem</p>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-text mb-4 tracking-tight leading-[1.1]">
          Voice is the fastest way to think.
          <br />
          <span className="text-text-secondary font-medium">But LLMs need structure.</span>
        </h2>
        <p className="text-text-secondary max-w-xl mx-auto text-base">
          See the difference for yourself:
        </p>

        <BeforeAfterDemo />
      </div>
    </section>
  );
}
