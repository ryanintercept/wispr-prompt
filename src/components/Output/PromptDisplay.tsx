interface PromptDisplayProps {
  prompt: string;
}

type Segment = { text: string; type: 'tag' | 'header' | 'inst' | 'bold' | 'normal' };

function tokenize(prompt: string): Segment[] {
  const segments: Segment[] = [];
  // Split on XML tags, markdown headers, [INST] markers, and **bold** markers
  const regex = /(<\/?[a-z_]+>|\[(?:INST|\/INST)\]|^#{1,3} .+$|\*\*[^*]+\*\*)/gm;
  let last = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(prompt)) !== null) {
    if (match.index > last) {
      segments.push({ text: prompt.slice(last, match.index), type: 'normal' });
    }
    const token = match[0];
    if (/^<\/?[a-z_]+>$/.test(token)) {
      segments.push({ text: token, type: 'tag' });
    } else if (/^\[(?:INST|\/INST)\]$/.test(token)) {
      segments.push({ text: token, type: 'inst' });
    } else if (/^#{1,3} /.test(token)) {
      segments.push({ text: token, type: 'header' });
    } else if (/^\*\*[^*]+\*\*$/.test(token)) {
      segments.push({ text: token, type: 'bold' });
    } else {
      segments.push({ text: token, type: 'normal' });
    }
    last = match.index + token.length;
  }

  if (last < prompt.length) {
    segments.push({ text: prompt.slice(last), type: 'normal' });
  }

  return segments;
}

export function PromptDisplay({ prompt }: PromptDisplayProps) {
  const segments = tokenize(prompt);

  return (
    <div className="flex-1 overflow-auto p-4 animate-fade-in">
      <pre className="text-sm leading-relaxed font-mono text-text whitespace-pre-wrap break-words">
        {segments.map((seg, i) => {
          switch (seg.type) {
            case 'tag':
              return <span key={i} className="text-primary/70">{seg.text}</span>;
            case 'inst':
              return <span key={i} className="text-amber-500 dark:text-amber-400">{seg.text}</span>;
            case 'header':
              return <span key={i} className="text-primary font-semibold">{seg.text}</span>;
            case 'bold':
              return <span key={i} className="text-text font-semibold">{seg.text}</span>;
            default:
              return <span key={i}>{seg.text}</span>;
          }
        })}
      </pre>
    </div>
  );
}
