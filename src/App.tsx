import { useState, useCallback, useRef, useEffect } from 'react';
import { AppShell } from './components/Layout/AppShell';
import { LandingHero } from './components/Landing/LandingHero';
import { ProblemSection } from './components/Landing/ProblemSection';
import { HowItWorks } from './components/Landing/HowItWorks';
import { WisprCallout } from './components/Landing/WisprCallout';
import { NativeIntegration } from './components/Landing/NativeIntegration';
import { DashboardSection } from './components/Landing/DashboardSection';
import { InputPanel } from './components/Input/InputPanel';
import { OutputPanel } from './components/Output/OutputPanel';
import { ComponentEditor } from './components/Advanced/ComponentEditor';
import { Toast } from './components/shared/Toast';
import { useVoiceInput } from './hooks/useVoiceInput';
import { useOptimizer } from './hooks/useOptimizer';
import { useDarkMode } from './hooks/useDarkMode';
import type { AppMode, TargetModel, TaskType } from './types';

function App() {
  const [mode, setMode] = useState<AppMode>('quick');
  const [rawInput, setRawInput] = useState('');
  const [targetModel, setTargetModel] = useState<TargetModel>('claude');
  const [taskType, setTaskType] = useState<TaskType | 'auto'>('auto');
  const [isDemoMode, setIsDemoMode] = useState(true);
  const [selectedExampleId, setSelectedExampleId] = useState<string | null>(null);

  const darkMode = useDarkMode();
  const outputRef = useRef<HTMLDivElement>(null);
  const optimizer = useOptimizer(isDemoMode);

  const handleTranscript = useCallback((text: string) => {
    setRawInput((prev) => (prev ? prev + ' ' + text : text));
    setSelectedExampleId(null);
  }, []);

  const voice = useVoiceInput(handleTranscript);

  const handleExampleSelect = useCallback((id: string, input: string) => {
    setSelectedExampleId(id);
    setRawInput(input);
    optimizer.reset();
  }, [optimizer]);

  const handleOptimize = useCallback(() => {
    if (!rawInput.trim()) return;

    if (mode === 'advanced') {
      optimizer.extract(rawInput, selectedExampleId);
    } else {
      const override = taskType === 'auto' ? undefined : taskType;
      optimizer.optimize(rawInput, targetModel, override, selectedExampleId);
    }
  }, [rawInput, targetModel, taskType, mode, optimizer, selectedExampleId]);

  const handleRegenerate = useCallback(() => {
    if (!rawInput.trim()) return;
    const override = taskType === 'auto' ? undefined : taskType;
    optimizer.optimize(rawInput, targetModel, override, selectedExampleId);
  }, [rawInput, targetModel, taskType, optimizer, selectedExampleId]);

  const handleReoptimize = useCallback(() => {
    if (optimizer.components) {
      optimizer.formatFromComponents(optimizer.components, targetModel, selectedExampleId);
    }
  }, [optimizer, targetModel, selectedExampleId]);

  const handleModelChange = useCallback((model: TargetModel) => {
    setTargetModel(model);
    if (optimizer.components && optimizer.result) {
      optimizer.formatFromComponents(optimizer.components, model, selectedExampleId);
    }
  }, [optimizer, selectedExampleId]);

  // Mobile scroll-to-output after optimization completes
  useEffect(() => {
    if (optimizer.result && outputRef.current && window.innerWidth < 1024) {
      outputRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [optimizer.result]);

  const isWorking = optimizer.isOptimizing || optimizer.isExtracting;

  return (
    <AppShell mode={mode} onModeChange={setMode} isDemoMode={isDemoMode} onToggleDemoMode={() => setIsDemoMode(!isDemoMode)} isDark={darkMode.isDark} onToggleTheme={darkMode.toggle}>
      <LandingHero />
      <ProblemSection />
      <HowItWorks />
      <WisprCallout />
      <NativeIntegration />

      <DashboardSection>
        <div className={`grid gap-6 ${
          mode === 'advanced' && optimizer.components
            ? 'grid-cols-1 lg:grid-cols-3'
            : 'grid-cols-1 lg:grid-cols-2'
        }`}>
          <InputPanel
            rawInput={rawInput}
            onInputChange={setRawInput}
            onExampleSelect={handleExampleSelect}
            targetModel={targetModel}
            onModelChange={handleModelChange}
            taskType={taskType}
            onTaskTypeChange={setTaskType}
            detectedTaskType={optimizer.result?.taskType ?? null}
            isRecording={voice.isRecording}
            isVoiceSupported={voice.isSupported}
            interimTranscript={voice.interimTranscript}
            onToggleRecording={voice.toggleRecording}
            onOptimize={handleOptimize}
            isOptimizing={isWorking}
          />

          {mode === 'advanced' && optimizer.components && (
            <ComponentEditor
              components={optimizer.components}
              onChange={optimizer.setComponents}
              onReoptimize={handleReoptimize}
              isOptimizing={optimizer.isOptimizing}
            />
          )}

          <div ref={outputRef}>
            <OutputPanel
              prompt={optimizer.result?.optimizedPrompt ?? ''}
              isOptimizing={optimizer.isOptimizing}
              targetModel={targetModel}
              onRegenerate={handleRegenerate}
            />
          </div>
        </div>
      </DashboardSection>

      {optimizer.error && (
        <Toast
          message={optimizer.error}
          type="error"
          onClose={optimizer.clearError}
        />
      )}
    </AppShell>
  );
}

export default App;
