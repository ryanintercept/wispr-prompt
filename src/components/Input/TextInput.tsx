interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
  interimTranscript: string;
  isRecording: boolean;
  onSubmit?: () => void;
}

export function TextInput({ value, onChange, interimTranscript, isRecording, onSubmit }: TextInputProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      e.preventDefault();
      onSubmit?.();
    }
  };

  return (
    <div className="relative flex-1">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Paste or type your messy prompt here..."
        className="w-full h-full min-h-[150px] lg:min-h-[250px] p-4 bg-transparent text-text text-sm leading-relaxed resize-none outline-none placeholder:text-gray-400 font-sans"
      />
      {isRecording && interimTranscript && (
        <div className="absolute bottom-3 left-4 right-4 text-sm text-text-secondary italic opacity-60">
          {interimTranscript}
        </div>
      )}
    </div>
  );
}
