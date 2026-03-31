import { useState, useCallback, useRef, useEffect } from 'react';
import { createSpeechRecognition, isSpeechSupported } from '../services/speechRecognition';

interface UseVoiceInputReturn {
  isRecording: boolean;
  isSupported: boolean;
  interimTranscript: string;
  toggleRecording: () => void;
}

export function useVoiceInput(onTranscript: (text: string) => void): UseVoiceInputReturn {
  const [isRecording, setIsRecording] = useState(false);
  const [interimTranscript, setInterimTranscript] = useState('');
  const recognitionRef = useRef<ReturnType<typeof createSpeechRecognition>>(null);
  const isSupported = isSpeechSupported();

  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const toggleRecording = useCallback(() => {
    if (isRecording) {
      recognitionRef.current?.stop();
      setIsRecording(false);
      setInterimTranscript('');
      return;
    }

    const recognition = createSpeechRecognition(
      (transcript, isFinal) => {
        if (isFinal) {
          onTranscript(transcript);
          setInterimTranscript('');
        } else {
          setInterimTranscript(transcript);
        }
      },
      (error) => {
        console.error('Speech recognition error:', error);
        setIsRecording(false);
        setInterimTranscript('');
      },
    );

    if (recognition) {
      recognitionRef.current = recognition;
      recognition.start();
      setIsRecording(true);
    }
  }, [isRecording, onTranscript]);

  return { isRecording, isSupported, interimTranscript, toggleRecording };
}
