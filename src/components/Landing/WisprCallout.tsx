import { useFadeIn } from '../../hooks/useFadeIn';

// Wispr Flow's actual mic icon from their CDN
const WISPR_MIC_URL = 'https://cdn.prod.website-files.com/682f84b3838c89f8ff7667db/68335d5ca4a30e3a678bf92d_mic-icon.svg';
// Wispr Flow's actual app icon
const WISPR_APP_ICON_URL = 'https://cdn.prod.website-files.com/682f84b3838c89f8ff7667db/69d91e94a9c949c8dbd78faa_App%20Icon.png';

export function WisprCallout() {
  const { ref, isVisible } = useFadeIn();

  return (
    <section className="py-16 px-4">
      <div ref={ref} className={`max-w-2xl mx-auto fade-in-up ${isVisible ? 'visible' : ''}`}>
        <div className="rounded-2xl bg-primary/5 border border-primary/20 p-8 text-center">
          {/* Wispr Flow app icon + mic — actual brand assets */}
          <div className="flex items-center justify-center gap-3 mb-5">
            <img
              src={WISPR_APP_ICON_URL}
              alt="Flow app icon"
              className="w-10 h-10 rounded-xl"
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />
            <img
              src={WISPR_MIC_URL}
              alt="Flow mic"
              className="w-7 h-7 opacity-70 invert"
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />
          </div>

          <h3 className="text-lg font-bold text-text mb-2">Why this matters for Flow</h3>
          <p className="text-sm text-text-secondary leading-relaxed max-w-lg mx-auto">
            Flow already turns speech into polished writing — <span className="text-text font-medium">4× faster than typing</span>. Wispr Prompt is the next layer: making that voice input <em>structured</em> for AI workflows. Together, they complete the Voice OS vision.
          </p>
          <a
            href="https://wisprflow.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 mt-5 text-sm font-semibold text-primary hover:text-primary-hover transition-colors"
          >
            Learn more about Flow &rarr;
          </a>
        </div>
      </div>
    </section>
  );
}
