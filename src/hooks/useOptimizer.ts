import { useState, useCallback } from 'react';
import { optimizeQuick, extractComponents, formatComponents } from '../services/optimizer';
import type { ExtractedComponents, OptimizationResult, TargetModel, TaskType } from '../types';

interface UseOptimizerReturn {
  isOptimizing: boolean;
  isExtracting: boolean;
  error: string | null;
  result: OptimizationResult | null;
  components: ExtractedComponents | null;
  optimize: (rawInput: string, targetModel: TargetModel, taskTypeOverride?: TaskType) => Promise<void>;
  extract: (rawInput: string) => Promise<void>;
  formatFromComponents: (components: ExtractedComponents, targetModel: TargetModel) => Promise<void>;
  setComponents: (components: ExtractedComponents) => void;
  clearError: () => void;
}

export function useOptimizer(): UseOptimizerReturn {
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [isExtracting, setIsExtracting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<OptimizationResult | null>(null);
  const [components, setComponents] = useState<ExtractedComponents | null>(null);

  const optimize = useCallback(async (rawInput: string, targetModel: TargetModel, taskTypeOverride?: TaskType) => {
    setIsOptimizing(true);
    setError(null);
    try {
      const optimizationResult = await optimizeQuick(rawInput, targetModel, taskTypeOverride);
      setResult(optimizationResult);
      setComponents(optimizationResult.components);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Optimization failed');
    } finally {
      setIsOptimizing(false);
    }
  }, []);

  const extract = useCallback(async (rawInput: string) => {
    setIsExtracting(true);
    setError(null);
    try {
      const extracted = await extractComponents(rawInput);
      setComponents(extracted);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Extraction failed');
    } finally {
      setIsExtracting(false);
    }
  }, []);

  const formatFromComponents = useCallback(async (comps: ExtractedComponents, targetModel: TargetModel) => {
    setIsOptimizing(true);
    setError(null);
    try {
      const prompt = await formatComponents(comps, targetModel);
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
  }, []);

  const clearError = useCallback(() => setError(null), []);

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
  };
}
