interface PromptDisplayProps {
  prompt: string;
}

export function PromptDisplay({ prompt }: PromptDisplayProps) {
  return (
    <div className="flex-1 overflow-auto p-4 animate-fade-in">
      <pre className="text-sm leading-relaxed font-mono text-text whitespace-pre-wrap break-words">
        {prompt}
      </pre>
    </div>
  );
}
