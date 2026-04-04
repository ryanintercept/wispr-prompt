import { useState, useCallback } from 'react';
import { optimizeQuick, extractComponents, formatComponents } from '../services/optimizer';
import { mockOptimizeQuick, mockExtractComponents, mockFormatComponents } from '../services/mockOptimizer';
import type { ExtractedComponents, OptimizationResult, TargetModel, TaskType } from '../types';

interface UseOptimizerReturn {
  isOptimizing: boolean;
  isExtracting: boolean;
  error: string | null;
  result: OptimizationResult | null;
  components: ExtractedComponents | null;
  optimize: (rawInput: string, targetModel: TargetModel, taskTypeOverride?: TaskType, exampleId?: string | null) => Promise<void>;
  extract: (rawInput: string, exampleId?: string | null) => Promise<void>;
  formatFromComponents: (components: ExtractedComponents, targetModel: TargetModel, exampleId?: string | null) => Promise<void>;
  setComponents: (components: ExtractedComponents) => void;
  clearError: () => void;
  reset: () => void;
}

export function useOptimizer(demoMode: boolean): UseOptimizerReturn {
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [isExtracting, setIsExtracting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<OptimizationResult | null>(null);
  const [components, setComponents] = useState<ExtractedComponents | null>(null);

  const optimize = useCallback(async (rawInput: string, targetModel: TargetModel, taskTypeOverride?: TaskType, exampleId?: string | null) => {
    setIsOptimizing(true);
    setError(null);
    try {
      const optimizationResult = demoMode
        ? await mockOptimizeQuick(rawInput, targetModel, taskTypeOverride, exampleId ?? null)
        : await optimizeQuick(rawInput, targetModel, taskTypeOverride);
      setResult(optimizationResult);
      setComponents(optimizationResult.components);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Optimization failed');
    } finally {
      setIsOptimizing(false);
    }
  }, [demoMode]);

  const extract = useCallback(async (rawInput: string, exampleId?: string | null) => {
    setIsExtracting(true);
    setError(null);
    try {
      const extracted = demoMode
        ? await mockExtractComponents(rawInput, exampleId ?? null)
        : await extractComponents(rawInput);
      setComponents(extracted);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Extraction failed');
    } finally {
      setIsExtracting(false);
    }
  }, [demoMode]);

  const formatFromComponents = useCallback(async (comps: ExtractedComponents, targetModel: TargetModel, exampleId?: string | null) => {
    setIsOptimizing(true);
    setError(null);
    try {
      const prompt = demoMode
        ? await mockFormatComponents(comps, targetModel, exampleId ?? null)
        : await formatComponents(comps, targetModel);
      setResult({
        optimizedPrompt: prompt,
        components: comps,
        targetModel,
        taskType: comps.task_type,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Formatting failed');
    } finally {
      setIsOptimizing(false);
    }
  }, [demoMode]);

  const clearError = useCallback(() => setError(null), []);
  const reset = useCallback(() => {
    setResult(null);
    setComponents(null);
    setError(null);
  }, []);

  return {
    isOptimizing,
    isExtracting,
    error,
    result,
    components,
    optimize,
    extract,
    formatFromComponents,
    setComponents,
    clearError,
    reset,
  };
}
