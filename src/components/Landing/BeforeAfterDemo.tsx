import { ArrowRight, Mic, FileCode, RotateCcw } from 'lucide-react';
import { useState, useEffect, useRef, useCallback } from 'react';
import { useFadeIn } from '../../hooks/useFadeIn';

const messy = `okay so i need to build like a dashboard thing for users to track their workouts, it should show like the past week and let them add new ones, oh and it needs to work on mobile too, using react`;

const structured = `<context>
Building a workout tracking dashboard for end users.
</context>

<objective>
Create a responsive React dashboard that displays
the past week of workouts and allows adding new entries.
</objective>

<tech_stack>
React, mobile-responsive
</tech_stack>

<constraints>
- Must work on mobile devices
- Display past 7 days of workout data
- Support creating new workout entries
</constraints>`;

function SyntaxHighlight({ text }: { text: string }) {
  const parts = text.split(/(<\/?[a-z_]+>)/g);
  return (
    <>
      {parts.map((part, i) =>
        /^<\/?[a-z_]+>$/.test(part) ? (
          <span key={i} className="text-primary/80">{part}</span>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

export function BeforeAfterDemo() {
  const { ref, isVisible } = useFadeIn();
  const [typedMessy, setTypedMessy] = useState('');
  const [showStructured, setShowStructured] = useState(false);
  const [structuredChars, setStructuredChars] = useState(0);
  const [done, setDone] = useState(false);
  const hasStarted = useRef(false);
  const timers = useRef<ReturnType<typeof setInterval>[]>([]);

  const runAnimation = useCallback(() => {
    timers.current.forEach(clearInterval);
    timers.current = [];
    setTypedMessy('');
    setShowStructured(false);
    setStructuredChars(0);
    setDone(false);

    let i = 0;
    const typeInterval = setInterval(() => {
      i++;
      setTypedMessy(messy.slice(0, i));
      if (i >= messy.length) {
        clearInterval(typeInterval);
        const t = setTimeout(() => {
          setShowStructured(true);
          let j = 0;
          const buildInterval = setInterval(() => {
            j += 3;
            setStructuredChars(j);
            if (j >= structured.length) {
              setStructuredChars(structured.length);
              clearInterval(buildInterval);
              setDone(true);
            }
          }, 12);
          timers.current.push(buildInterval);
        }, 400);
        timers.current.push(t as unknown as ReturnType<typeof setInterval>);
      }
    }, 18);
    timers.current.push(typeInterval);
  }, []);

  useEffect(() => {
    if (!isVisible || hasStarted.current) return;
    hasStarted.current = true;
    runAnimation();
    return () => timers.current.forEach(clearInterval);
  }, [isVisible, runAnimation]);

  return (
    <div ref={ref} className={`mt-12 fade-in-up ${isVisible ? 'visible' : ''}`}>
    {done && (
      <div className="flex justify-center mb-4">
        <button
          onClick={runAnimation}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-text-secondary hover:text-text border border-border hover:border-text-secondary/40 rounded-lg transition-all"
        >
          <RotateCcw size={12} />
          Replay
        </button>
      </div>
    )}
    <div className={`grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 md:gap-3 items-stretch max-w-5xl mx-auto`}>
      {/* Before */}
      <div className="rounded-2xl border border-border bg-surface overflow-hidden shadow-sm">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-border">
          <div className="w-7 h-7 rounded-lg bg-error/10 flex items-center justify-center">
            <Mic size={14} className="text-error" />
          </div>
          <span className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
            Raw voice input
          </span>
        </div>
        <div className="p-5 text-left min-h-[120px]">
          <p className="text-sm text-text leading-relaxed font-sans italic">
            "{typedMessy}
            {typedMessy.length < messy.length && (
              <span className="inline-block w-0.5 h-4 bg-text-secondary ml-0.5 animate-pulse align-middle" />
            )}
            {typedMessy.length >= messy.length && '"'}
          </p>
        </div>
      </div>

      {/* Arrow */}
      <div className="flex items-center justify-center md:px-2">
        <div className={`w-10 h-10 rounded-full bg-primary flex items-center justify-center shadow-lg shadow-primary/30 transition-all duration-500 ${showStructured ? 'scale-110 shadow-primary/50' : ''}`}>
          <ArrowRight size={18} className="text-white md:rotate-0 rotate-90" />
        </div>
      </div>

      {/* After */}
      <div className="rounded-2xl border border-primary/30 bg-surface overflow-hidden shadow-lg shadow-primary/10">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-primary/5">
          <div className="w-7 h-7 rounded-lg bg-primary/15 flex items-center justify-center">
            <FileCode size={14} className="text-primary" />
          </div>
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">
            Optimized prompt
          </span>
        </div>
        <div className="p-5 text-left min-h-[120px]">
          <pre className="text-xs text-text leading-relaxed font-mono whitespace-pre-wrap">
            {showStructured && (
              <>
                <SyntaxHighlight text={structured.slice(0, structuredChars)} />
                {structuredChars < structured.length && (
                  <span className="inline-block w-0.5 h-3 bg-primary ml-0.5 animate-pulse align-middle" />
                )}
              </>
            )}
          </pre>
        </div>
      </div>
    </div>
    </div>
  );
}
