import { Mic, MicOff } from 'lucide-react';

interface VoiceInputProps {
  isRecording: boolean;
  isSupported: boolean;
  onToggle: () => void;
}

export function VoiceInput({ isRecording, isSupported, onToggle }: VoiceInputProps) {
  if (!isSupported) {
    return (
      <div className="text-xs text-text-secondary text-center py-2">
        Voice input not supported in this browser. Try Chrome.
      </div>
    );
  }

  return (
    <button
      onClick={onToggle}
      className={`relative flex items-center justify-center w-12 h-12 rounded-full transition-all ${
        isRecording
          ? 'bg-red-500 text-white shadow-lg shadow-red-500/25'
          : 'bg-border/50 text-text-secondary hover:bg-border hover:text-text'
      }`}
      title={isRecording ? 'Stop recording' : 'Start recording'}
    >
      {isRecording && (
        <span className="absolute inset-0 rounded-full bg-red-400 animate-pulse-ring" />
      )}
      <span className="relative">
        {isRecording ? <MicOff size={20} /> : <Mic size={20} />}
      </span>
    </button>
  );
}
