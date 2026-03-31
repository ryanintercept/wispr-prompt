export type TaskType = 'build' | 'debug' | 'refactor' | 'explain' | 'architect' | 'review' | 'test' | 'document';

export type TargetModel = 'claude' | 'gpt';

export type AppMode = 'quick' | 'advanced';

export interface ExtractedComponents {
  task_type: TaskType;
  context: string | null;
  objective: string;
  tech_stack: string[];
  constraints: string[];
  expected_output: string | null;
  edge_cases: string | null;
  priority: string | null;
  ambiguities: string[];
}

export interface OptimizationResult {
  optimizedPrompt: string;
  components: ExtractedComponents;
  targetModel: TargetModel;
  taskType: TaskType;
}

export interface AppState {
  rawInput: string;
  isRecording: boolean;
  targetModel: TargetModel;
  taskType: TaskType | 'auto';
  mode: AppMode;
  components: ExtractedComponents | null;
  optimizedPrompt: string;
  isOptimizing: boolean;
  isExtracting: boolean;
  error: string | null;
}

export const TASK_TYPE_LABELS: Record<TaskType, string> = {
  build: 'Build',
  debug: 'Debug',
  refactor: 'Refactor',
  explain: 'Explain',
  architect: 'Architect',
  review: 'Review',
  test: 'Test',
  document: 'Document',
};
