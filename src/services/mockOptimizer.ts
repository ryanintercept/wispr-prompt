import { getExampleById, EXAMPLES } from '../data/examples';
import type { ExtractedComponents, OptimizationResult, TargetModel, TaskType } from '../types';

function delay(): Promise<void> {
  const ms = 800 + Math.random() * 400;
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function findExample(exampleId: string | null) {
  if (exampleId) {
    return getExampleById(exampleId) ?? EXAMPLES[0];
  }
  return EXAMPLES[0];
}

export async function mockOptimizeQuick(
  _rawInput: string,
  targetModel: TargetModel,
  taskTypeOverride: TaskType | undefined,
  exampleId: string | null,
): Promise<OptimizationResult> {
  await delay();
  const example = findExample(exampleId);
  return {
    optimizedPrompt: example.optimizedPrompts[targetModel],
    components: { ...example.components },
    targetModel,
    taskType: taskTypeOverride || example.components.task_type,
  };
}

export async function mockExtractComponents(
  _rawInput: string,
  exampleId: string | null,
): Promise<ExtractedComponents> {
  await delay();
  const example = findExample(exampleId);
  return { ...example.components };
}

export async function mockFormatComponents(
  _components: ExtractedComponents,
  targetModel: TargetModel,
  exampleId: string | null,
): Promise<string> {
  await delay();
  const example = findExample(exampleId);
  return example.optimizedPrompts[targetModel];
}
