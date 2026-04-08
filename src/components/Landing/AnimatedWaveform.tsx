interface AnimatedWaveformProps {
  bars?: number;
  className?: string;
}

export function AnimatedWaveform({ bars = 7, className = '' }: AnimatedWaveformProps) {
  return (
    <div className={`flex items-center justify-center gap-1 h-12 ${className}`}>
      {Array.from({ length: bars }).map((_, i) => (
        <div
          key={i}
          className="waveform-bar w-1 h-full bg-primary rounded-full"
          style={{ animationDelay: `${i * 0.1}s` }}
        />
      ))}
    </div>
  );
}
